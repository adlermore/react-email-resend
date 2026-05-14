import { NextResponse } from 'next/server';

const starterHtml: Record<string, string> = {
  welcome: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="background:#f4f4f5;margin:0;padding:40px 0;font-family:system-ui,sans-serif;">
<table width="600" align="center" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;">
  <tr><td style="background:#4f46e5;padding:32px 40px;">
    <h1 style="color:#fff;font-size:24px;font-weight:700;margin:0;">{{companyName}}</h1>
  </td></tr>
  <tr><td style="padding:40px;">
    <h2 style="font-size:22px;font-weight:700;color:#111;margin:0 0 16px;">Welcome, {{username}}! 🎉</h2>
    <p style="font-size:15px;line-height:1.7;color:#374151;margin:0 0 16px;">We're thrilled to have you on board. Your account is ready and you can start exploring everything {{companyName}} has to offer.</p>
    <p style="font-size:15px;color:#374151;margin:0 0 24px;">Here's what you can do next:</p>
    <p style="font-size:15px;color:#374151;margin:4px 0;">✅ Complete your profile</p>
    <p style="font-size:15px;color:#374151;margin:4px 0;">✅ Explore our features</p>
    <p style="font-size:15px;color:#374151;margin:4px 0 24px;">✅ Invite your team</p>
    <a href="{{loginUrl}}" style="background:#4f46e5;color:#fff;padding:12px 24px;border-radius:6px;font-weight:600;text-decoration:none;display:inline-block;">Get Started →</a>
  </td></tr>
  <tr><td style="border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;font-size:12px;color:#9ca3af;">© 2026 {{companyName}}. All rights reserved.</td></tr>
</table>
</body></html>`,

  newsletter: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="background:#f9fafb;margin:0;padding:40px 0;font-family:Georgia,serif;">
<table width="600" align="center" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;">
  <tr><td style="background:#0f172a;padding:40px;text-align:center;">
    <p style="color:#818cf8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Issue #{{issueNumber}}</p>
    <h1 style="color:#f8fafc;font-size:28px;font-weight:700;margin:0 0 8px;">{{title}}</h1>
    <p style="color:#94a3b8;font-size:14px;margin:0;">Your curated digest — delivered weekly</p>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    <h2 style="font-size:20px;font-weight:700;color:#111;margin:0 0 10px;">{{article1Title}}</h2>
    <p style="font-size:15px;line-height:1.7;color:#4b5563;margin:0 0 12px;">{{article1Summary}}</p>
    <a href="{{article1Url}}" style="color:#4f46e5;font-size:14px;font-weight:600;text-decoration:none;">Read more →</a>
  </td></tr>
  <tr><td style="border-top:1px solid #e5e7eb;padding:32px 40px;background:#f1f5f9;text-align:center;">
    <p style="font-size:15px;color:#374151;margin:0 0 16px;">Enjoying the newsletter? Share it with a friend.</p>
    <a href="{{shareUrl}}" style="background:#4f46e5;color:#fff;padding:12px 28px;border-radius:6px;font-weight:600;text-decoration:none;display:inline-block;">Share This Issue</a>
  </td></tr>
  <tr><td style="padding:20px 40px;text-align:center;font-size:12px;color:#9ca3af;">
    <a href="{{unsubscribeUrl}}" style="color:#9ca3af;">Unsubscribe</a> · <a href="#" style="color:#9ca3af;">Privacy Policy</a>
  </td></tr>
</table>
</body></html>`,

  'password-reset': `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="background:#f4f4f5;margin:0;padding:40px 0;font-family:system-ui,sans-serif;">
<table width="520" align="center" style="background:#fff;border-radius:8px;overflow:hidden;max-width:520px;">
  <tr><td style="padding:40px;text-align:center;">
    <p style="font-size:48px;margin:0 0 16px;">🔐</p>
    <h1 style="font-size:24px;font-weight:700;color:#111;margin:0;">Password Reset Request</h1>
  </td></tr>
  <tr><td style="padding:0 40px 32px;">
    <p style="font-size:15px;line-height:1.6;color:#374151;margin:0 0 16px;">Hi {{username}},</p>
    <p style="font-size:15px;line-height:1.6;color:#374151;margin:0 0 16px;">We received a request to reset the password for your {{companyName}} account. Click the button below to set a new password.</p>
    <p style="text-align:center;margin:28px 0;">
      <a href="{{resetUrl}}" style="background:#dc2626;color:#fff;padding:14px 32px;border-radius:6px;font-weight:700;text-decoration:none;display:inline-block;">Reset Password</a>
    </p>
    <p style="font-size:14px;color:#92400e;background:#fef3c7;padding:12px 16px;border-radius:6px;border-left:4px solid #f59e0b;margin:0 0 24px;">⚠️ This link expires in <strong>{{expiresIn}}</strong>.</p>
    <p style="font-size:13px;color:#6b7280;line-height:1.5;margin:0;">If you didn't request a password reset, you can safely ignore this email.</p>
  </td></tr>
  <tr><td style="border-top:1px solid #e5e7eb;padding:16px 40px;text-align:center;font-size:12px;color:#9ca3af;">© 2026 {{companyName}}. Security email.</td></tr>
</table>
</body></html>`,

  'order-confirmation': `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="background:#f4f4f5;margin:0;padding:40px 0;font-family:system-ui,sans-serif;">
<table width="600" align="center" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;">
  <tr><td style="background:#111827;padding:24px 40px;color:#fff;font-size:22px;font-weight:700;">{{companyName}}</td></tr>
  <tr><td style="background:#f0fdf4;padding:32px 40px;text-align:center;">
    <p style="font-size:40px;margin:0 0 8px;">✅</p>
    <h2 style="font-size:22px;font-weight:700;color:#166534;margin:0 0 8px;">Order Confirmed!</h2>
    <p style="font-size:15px;color:#374151;margin:0;">Thank you, {{customerName}}. We're preparing your order.</p>
  </td></tr>
  <tr><td style="padding:24px 40px;">
    <p style="font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 4px;">Order Number</p>
    <p style="font-size:14px;font-weight:600;color:#111;margin:0 0 20px;">{{orderId}}</p>
    <table width="100%" style="border-top:1px solid #e5e7eb;padding-top:16px;">
      <tr>
        <td style="font-size:14px;color:#111;padding:8px 0;width:70%;">{{item1Name}}</td>
        <td style="font-size:14px;color:#111;text-align:right;">{{item1Price}}</td>
      </tr>
    </table>
    <table width="100%" style="border-top:1px solid #e5e7eb;margin-top:12px;padding-top:12px;">
      <tr><td style="font-size:16px;font-weight:700;color:#111;">Total</td><td style="font-size:16px;font-weight:700;color:#111;text-align:right;">{{total}}</td></tr>
    </table>
    <p style="text-align:center;margin:24px 0 0;">
      <a href="{{trackingUrl}}" style="background:#4f46e5;color:#fff;padding:12px 28px;border-radius:6px;font-weight:600;text-decoration:none;display:inline-block;">Track Your Order</a>
    </p>
  </td></tr>
  <tr><td style="border-top:1px solid #e5e7eb;padding:16px 40px;text-align:center;font-size:12px;color:#9ca3af;">© 2026 {{companyName}}. All rights reserved.</td></tr>
</table>
</body></html>`,

  'event-invitation': `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="background:#0f172a;margin:0;padding:40px 0;font-family:system-ui,sans-serif;">
<table width="600" align="center" style="background:#1e293b;border-radius:12px;overflow:hidden;max-width:600px;">
  <tr><td style="background:#4f46e5;padding:60px 40px;text-align:center;">
    <p style="color:#c4b5fd;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;">You're Invited</p>
    <h1 style="color:#fff;font-size:30px;font-weight:800;margin:0;">{{eventName}}</h1>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Dear {{recipientName}},</p>
    <p style="font-size:15px;line-height:1.7;color:#94a3b8;margin:0 0 28px;">{{eventDescription}}</p>
    <table width="100%" style="background:#0f172a;border-radius:8px;padding:20px 24px;">
      <tr><td style="font-size:14px;color:#e2e8f0;padding:0 0 10px;">📅 {{eventDate}}</td></tr>
      <tr><td style="font-size:14px;color:#e2e8f0;padding:0 0 10px;">🕐 {{eventTime}}</td></tr>
      <tr><td style="font-size:14px;color:#e2e8f0;">📍 {{eventLocation}}</td></tr>
    </table>
    <p style="text-align:center;margin:32px 0 0;">
      <a href="{{rsvpUrl}}" style="background:#4f46e5;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block;margin-right:12px;">✓ Accept Invitation</a>
      <a href="{{rsvpUrl}}?decline=true" style="color:#94a3b8;padding:14px 24px;border-radius:8px;font-weight:600;text-decoration:none;display:inline-block;border:1px solid #334155;">Decline</a>
    </p>
  </td></tr>
  <tr><td style="background:#0f172a;padding:20px 40px;text-align:center;font-size:12px;color:#475569;">
    © 2026 {{companyName}} · <a href="#" style="color:#475569;">Unsubscribe</a>
  </td></tr>
</table>
</body></html>`,

  blank: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="background:#f4f4f5;margin:0;padding:40px 0;font-family:system-ui,sans-serif;">
<table width="600" align="center" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;">
  <tr><td style="background:#111827;padding:24px 40px;color:#fff;font-size:20px;font-weight:700;">{{companyName}}</td></tr>
  <tr><td style="padding:40px;">
    <h2 style="font-size:22px;font-weight:700;color:#111;margin:0 0 16px;">{{title}}</h2>
    <p style="font-size:15px;line-height:1.7;color:#374151;margin:0;">{{content}}</p>
  </td></tr>
  <tr><td style="border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;font-size:12px;color:#9ca3af;">© 2026 {{companyName}}. All rights reserved.</td></tr>
</table>
</body></html>`,
};

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const html = starterHtml[id];
  if (!html) {
    return NextResponse.json({ success: false, error: 'Starter not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, html });
}
