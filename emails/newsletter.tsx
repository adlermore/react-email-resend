import {
  Html, Head, Body, Container, Section,
  Heading, Text, Button, Preview, Hr, Link, Img,
} from 'react-email';

interface NewsletterEmailProps {
  title?: string;
  previewText?: string;
  companyName?: string;
  issueNumber?: string;
  articles?: Array<{ title: string; summary: string; url: string }>;
  unsubscribeUrl?: string;
}

export default function NewsletterEmail({
  title = 'The Weekly Digest',
  previewText = 'Your weekly roundup of top stories',
  companyName = 'Acme Newsletter',
  issueNumber = '#42',
  articles = [
    { title: 'The Future of AI in 2026', summary: 'As AI models become increasingly capable, we explore what this means for developers, businesses, and society at large.', url: 'https://example.com/article1' },
    { title: '10 Productivity Hacks for Remote Teams', summary: 'Working from anywhere is the new normal. Here are 10 proven strategies to keep your distributed team aligned and productive.', url: 'https://example.com/article2' },
    { title: 'Open Source Spotlight: Tools We Love', summary: 'This week we highlight three open-source tools that have been making waves in the developer community.', url: 'https://example.com/article3' },
  ],
  unsubscribeUrl = 'https://example.com/unsubscribe',
}: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={issueLabel}>Issue {issueNumber}</Text>
            <Heading style={headerHeading}>{title}</Heading>
            <Text style={headerSubtitle}>Your curated digest — delivered weekly</Text>
          </Section>

          {articles.map((article, i) => (
            <Section key={i} style={articleSection}>
              <Heading as="h2" style={articleTitle}>{article.title}</Heading>
              <Text style={articleSummary}>{article.summary}</Text>
              <Link href={article.url} style={readMoreLink}>Read more →</Link>
              {i < articles.length - 1 && <Hr style={divider} />}
            </Section>
          ))}

          <Section style={ctaSection}>
            <Text style={ctaText}>Enjoying the newsletter? Share it with a friend.</Text>
            <Button href="https://example.com/share" style={button}>Share This Issue</Button>
          </Section>

          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you subscribed to {companyName}.
              <br />
              <Link href={unsubscribeUrl} style={footerLink}>Unsubscribe</Link>
              {' · '}
              <Link href="https://example.com/privacy" style={footerLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#f9fafb', fontFamily: 'Georgia, serif', margin: 0, padding: '40px 0' };
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' };
const header = { backgroundColor: '#0f172a', padding: '40px', textAlign: 'center' as const };
const issueLabel = { color: '#818cf8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: '0 0 8px' };
const headerHeading = { color: '#f8fafc', fontSize: '28px', fontWeight: '700', margin: '0 0 8px' };
const headerSubtitle = { color: '#94a3b8', fontSize: '14px', margin: 0 };
const articleSection = { padding: '32px 40px' };
const articleTitle = { fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 10px', lineHeight: '1.3' };
const articleSummary = { fontSize: '15px', lineHeight: '1.7', color: '#4b5563', margin: '0 0 12px' };
const readMoreLink = { color: '#4f46e5', fontSize: '14px', fontWeight: '600', textDecoration: 'none' };
const ctaSection = { backgroundColor: '#f1f5f9', padding: '32px 40px', textAlign: 'center' as const };
const ctaText = { fontSize: '15px', color: '#374151', margin: '0 0 16px' };
const button = { backgroundColor: '#4f46e5', color: '#ffffff', padding: '12px 28px', borderRadius: '6px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' };
const divider = { borderColor: '#e5e7eb', margin: '0' };
const footer = { padding: '24px 40px' };
const footerText = { fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const, lineHeight: '1.5', margin: 0 };
const footerLink = { color: '#9ca3af', textDecoration: 'underline' };
