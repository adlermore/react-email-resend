import {
  Html, Head, Body, Container, Section,
  Heading, Text, Button, Preview, Hr, Link,
} from 'react-email';

interface WelcomeEmailProps {
  username?: string;
  companyName?: string;
  loginUrl?: string;
}

export default function WelcomeEmail({
  username = 'User',
  companyName = 'Acme Inc',
  loginUrl = 'https://example.com/login',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {companyName} — you&apos;re all set!</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerHeading}>{companyName}</Heading>
          </Section>
          <Section style={content}>
            <Heading as="h2" style={h2}>Welcome, {username}! 🎉</Heading>
            <Text style={text}>
              We&apos;re thrilled to have you on board. Your account is ready and you can start
              exploring everything {companyName} has to offer right away.
            </Text>
            <Text style={text}>Here&apos;s what you can do next:</Text>
            <Text style={listItem}>✅ Complete your profile</Text>
            <Text style={listItem}>✅ Explore our features</Text>
            <Text style={listItem}>✅ Invite your team</Text>
            <Button href={loginUrl} style={button}>Get Started →</Button>
            <Text style={smallText}>
              If you have any questions, reply to this email or visit our{' '}
              <Link href="https://example.com/help" style={link}>Help Center</Link>.
            </Text>
          </Section>
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              © 2026 {companyName}. All rights reserved.
              <br />
              <Link href="https://example.com/unsubscribe" style={footerLink}>Unsubscribe</Link>
              {' · '}
              <Link href="https://example.com/privacy" style={footerLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#f4f4f5', fontFamily: 'system-ui, sans-serif', margin: 0, padding: '40px 0' };
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' };
const header = { backgroundColor: '#4f46e5', padding: '32px 40px' };
const headerHeading = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: 0 };
const content = { padding: '40px' };
const h2 = { fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 16px' };
const text = { fontSize: '15px', lineHeight: '1.6', color: '#374151', margin: '0 0 12px' };
const listItem = { fontSize: '15px', lineHeight: '1.6', color: '#374151', margin: '4px 0', paddingLeft: '8px' };
const button = { backgroundColor: '#4f46e5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontWeight: '600', fontSize: '15px', textDecoration: 'none', display: 'inline-block', margin: '20px 0' };
const smallText = { fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: '16px 0 0' };
const link = { color: '#4f46e5', textDecoration: 'underline' };
const divider = { borderColor: '#e5e7eb', margin: '0' };
const footer = { padding: '24px 40px' };
const footerText = { fontSize: '12px', color: '#9ca3af', lineHeight: '1.5', textAlign: 'center' as const, margin: 0 };
const footerLink = { color: '#9ca3af', textDecoration: 'underline' };
