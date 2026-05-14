import {
  Html, Head, Body, Container, Section,
  Heading, Text, Button, Preview, Hr, Link,
} from 'react-email';

interface PasswordResetEmailProps {
  username?: string;
  resetUrl?: string;
  expiresIn?: string;
  companyName?: string;
}

export default function PasswordResetEmail({
  username = 'User',
  resetUrl = 'https://example.com/reset?token=abc123',
  expiresIn = '1 hour',
  companyName = 'Acme Inc',
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your {companyName} password</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={lockIcon}>🔐</Text>
            <Heading style={heading}>Password Reset Request</Heading>
          </Section>

          <Section style={content}>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              We received a request to reset the password for your {companyName} account.
              Click the button below to set a new password.
            </Text>

            <Section style={buttonContainer}>
              <Button href={resetUrl} style={button}>Reset Password</Button>
            </Section>

            <Text style={warningText}>
              ⚠️ This link expires in <strong>{expiresIn}</strong>.
            </Text>

            <Hr style={divider} />

            <Text style={smallText}>
              If you didn&apos;t request a password reset, you can safely ignore this email.
              Your password won&apos;t change.
            </Text>
            <Text style={smallText}>
              For security, never share this link with anyone. {companyName} will never ask for it.
            </Text>

            <Text style={smallText}>
              Having trouble? Copy and paste this URL into your browser:
              <br />
              <Link href={resetUrl} style={urlLink}>{resetUrl}</Link>
            </Text>
          </Section>

          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              © 2026 {companyName}. This is an automated security email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#f4f4f5', fontFamily: 'system-ui, sans-serif', margin: 0, padding: '40px 0' };
const container = { maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' };
const header = { padding: '40px 40px 24px', textAlign: 'center' as const };
const lockIcon = { fontSize: '48px', margin: '0 0 16px', display: 'block' };
const heading = { fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 };
const content = { padding: '0 40px 32px' };
const text = { fontSize: '15px', lineHeight: '1.6', color: '#374151', margin: '0 0 16px' };
const buttonContainer = { textAlign: 'center' as const, margin: '28px 0' };
const button = { backgroundColor: '#dc2626', color: '#ffffff', padding: '14px 32px', borderRadius: '6px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', display: 'inline-block' };
const warningText = { fontSize: '14px', color: '#92400e', backgroundColor: '#fef3c7', padding: '12px 16px', borderRadius: '6px', margin: '0 0 24px', borderLeft: '4px solid #f59e0b' };
const smallText = { fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: '0 0 12px' };
const urlLink = { color: '#4f46e5', wordBreak: 'break-all' as const, fontSize: '12px' };
const divider = { borderColor: '#e5e7eb' };
const footer = { padding: '16px 40px 24px' };
const footerText = { fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const, margin: 0 };
