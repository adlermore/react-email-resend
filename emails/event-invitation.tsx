import {
  Html, Head, Body, Container, Section,
  Heading, Text, Button, Preview, Hr, Link,
} from 'react-email';

interface EventInvitationEmailProps {
  recipientName?: string;
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventDescription?: string;
  rsvpUrl?: string;
  organizerName?: string;
  companyName?: string;
}

export default function EventInvitationEmail({
  recipientName = 'Alex',
  eventName = 'Annual Tech Summit 2026',
  eventDate = 'Friday, June 20, 2026',
  eventTime = '9:00 AM – 5:00 PM PST',
  eventLocation = 'The Moscone Center, San Francisco, CA',
  eventDescription = 'Join us for a full day of inspiring talks, hands-on workshops, and networking opportunities with the brightest minds in tech. Keynotes, demos, and more await.',
  rsvpUrl = 'https://example.com/rsvp',
  organizerName = 'Sarah Johnson',
  companyName = 'TechCorp Events',
}: EventInvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;re invited to {eventName} — RSVP inside</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={heroSection}>
            <Text style={inviteTag}>You&apos;re Invited</Text>
            <Heading style={eventTitle}>{eventName}</Heading>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Dear {recipientName},</Text>
            <Text style={description}>{eventDescription}</Text>

            <Section style={detailsBox}>
              <Text style={detailRow}>
                <strong style={detailIcon}>📅</strong> {eventDate}
              </Text>
              <Text style={detailRow}>
                <strong style={detailIcon}>🕐</strong> {eventTime}
              </Text>
              <Text style={detailRow}>
                <strong style={detailIcon}>📍</strong> {eventLocation}
              </Text>
            </Section>

            <Section style={ctaSection}>
              <Button href={rsvpUrl} style={acceptButton}>✓ Accept Invitation</Button>
              <Button href={`${rsvpUrl}?decline=true`} style={declineButton}>Decline</Button>
            </Section>

            <Hr style={divider} />

            <Text style={organizerText}>
              This invitation was sent by {organizerName} on behalf of {companyName}.
              <br />
              Questions? Reply to this email or visit{' '}
              <Link href="https://example.com/event" style={link}>our event page</Link>.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              © 2026 {companyName} ·{' '}
              <Link href="https://example.com/unsubscribe" style={footerLink}>Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#0f172a', fontFamily: 'system-ui, sans-serif', margin: 0, padding: '40px 0' };
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden' };
const heroSection = { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '60px 40px', textAlign: 'center' as const };
const inviteTag = { color: '#c4b5fd', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '2px', margin: '0 0 16px' };
const eventTitle = { color: '#ffffff', fontSize: '30px', fontWeight: '800', margin: 0, lineHeight: '1.2' };
const content = { padding: '40px' };
const greeting = { fontSize: '16px', color: '#e2e8f0', margin: '0 0 16px' };
const description = { fontSize: '15px', lineHeight: '1.7', color: '#94a3b8', margin: '0 0 28px' };
const detailsBox = { backgroundColor: '#0f172a', borderRadius: '8px', padding: '20px 24px', margin: '0 0 32px' };
const detailRow = { fontSize: '14px', color: '#e2e8f0', margin: '0 0 10px', lineHeight: '1.5' };
const detailIcon = { marginRight: '8px' };
const ctaSection = { textAlign: 'center' as const, margin: '0 0 32px' };
const acceptButton = { backgroundColor: '#4f46e5', color: '#ffffff', padding: '14px 32px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', display: 'inline-block', marginRight: '12px' };
const declineButton = { backgroundColor: 'transparent', color: '#94a3b8', padding: '14px 24px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block', border: '1px solid #334155' };
const divider = { borderColor: '#334155' };
const organizerText = { fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0' };
const link = { color: '#818cf8', textDecoration: 'underline' };
const footer = { backgroundColor: '#0f172a', padding: '20px 40px' };
const footerText = { fontSize: '12px', color: '#475569', textAlign: 'center' as const, margin: 0 };
const footerLink = { color: '#475569', textDecoration: 'underline' };
