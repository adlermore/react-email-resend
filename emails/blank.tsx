import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Link,
} from 'react-email';

interface BlankEmailProps {
  companyName?: string;
  title?: string;
  content?: string;
}

export default function BlankEmail({
  companyName = 'Your Company',
  title = 'Email Title',
  content = 'Your email content goes here.',
}: BlankEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerHeading}>{companyName}</Heading>
          </Section>
          <Section style={contentSection}>
            <Heading as="h2" style={h2}>{title}</Heading>
            <Text style={text}>{content}</Text>
          </Section>
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              © 2026 {companyName}. All rights reserved.{' '}
              <Link href="https://example.com/unsubscribe" style={footerLink}>Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#f4f4f5', fontFamily: 'system-ui, sans-serif', margin: 0, padding: '40px 0' };
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' };
const header = { backgroundColor: '#111827', padding: '24px 40px' };
const headerHeading = { color: '#ffffff', fontSize: '20px', fontWeight: '700', margin: 0 };
const contentSection = { padding: '40px' };
const h2 = { fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 16px' };
const text = { fontSize: '15px', lineHeight: '1.7', color: '#374151', margin: 0 };
const divider = { borderColor: '#e5e7eb', margin: '0' };
const footer = { padding: '20px 40px' };
const footerText = { fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const, margin: 0 };
const footerLink = { color: '#9ca3af', textDecoration: 'underline' };
