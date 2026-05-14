import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { sendEmailSMTP } from '@/lib/nodemailer';
import { prisma } from '@/lib/db';
import { sendEmailSchema, parseRecipients, emailSchema } from '@/lib/validators';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = sendEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.message }, { status: 400 });
    }

    const { to, subject, html, from } = parsed.data;
    const recipients = parseRecipients(to);

    const validRecipients = recipients.filter((email) => {
      const result = emailSchema.safeParse(email);
      return result.success;
    });

    if (validRecipients.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid recipients' }, { status: 400 });
    }

    const useResend = !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_xxxxxxxxxxxxx';

    let result;
    if (useResend) {
      const { data, error } = await resend.emails.send({
        from: from || 'noreply@steply.tech',
        to: validRecipients,
        subject,
        html,
      });
      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }
      result = data;
    } else {
      await sendEmailSMTP({ to: validRecipients.join(','), subject, html, from });
      result = { id: 'smtp-sent' };
    }

    if (body.templateId) {
      await prisma.sendLog.create({
        data: {
          templateId: body.templateId,
          to: validRecipients.join(', '),
          subject,
          status: 'sent',
        },
      });
      await prisma.template.update({
        where: { id: body.templateId },
        data: { sendCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
