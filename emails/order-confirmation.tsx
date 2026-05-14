import {
  Html, Head, Body, Container, Section, Row, Column,
  Heading, Text, Button, Preview, Hr, Link,
} from 'react-email';

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface OrderConfirmationEmailProps {
  customerName?: string;
  orderId?: string;
  orderDate?: string;
  items?: OrderItem[];
  subtotal?: string;
  shipping?: string;
  tax?: string;
  total?: string;
  shippingAddress?: string;
  trackingUrl?: string;
  companyName?: string;
}

export default function OrderConfirmationEmail({
  customerName = 'Jane Smith',
  orderId = 'ORD-2026-00123',
  orderDate = 'May 13, 2026',
  items = [
    { name: 'Pro Subscription (Annual)', quantity: 1, price: '$99.00' },
    { name: 'Add-on: Extra Storage 100GB', quantity: 2, price: '$19.00' },
  ],
  subtotal = '$137.00',
  shipping = 'Free',
  tax = '$13.70',
  total = '$150.70',
  shippingAddress = '123 Main St, San Francisco, CA 94102',
  trackingUrl = 'https://example.com/orders/track',
  companyName = 'Acme Store',
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order #{orderId} is confirmed!</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerHeading}>{companyName}</Heading>
          </Section>

          <Section style={confirmBanner}>
            <Text style={confirmIcon}>✅</Text>
            <Heading as="h2" style={confirmHeading}>Order Confirmed!</Heading>
            <Text style={confirmSubtext}>
              Thank you, {customerName}. We&apos;re preparing your order.
            </Text>
          </Section>

          <Section style={content}>
            <Row>
              <Column>
                <Text style={metaLabel}>Order Number</Text>
                <Text style={metaValue}>{orderId}</Text>
              </Column>
              <Column>
                <Text style={metaLabel}>Order Date</Text>
                <Text style={metaValue}>{orderDate}</Text>
              </Column>
            </Row>

            <Hr style={divider} />

            <Heading as="h3" style={sectionTitle}>Order Summary</Heading>
            {items.map((item, i) => (
              <Row key={i} style={itemRow}>
                <Column style={{ width: '70%' }}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemQty}>Qty: {item.quantity}</Text>
                </Column>
                <Column style={{ textAlign: 'right' as const }}>
                  <Text style={itemPrice}>{item.price}</Text>
                </Column>
              </Row>
            ))}

            <Hr style={divider} />
            <Row style={totalsRow}>
              <Column><Text style={totalsLabel}>Subtotal</Text></Column>
              <Column style={{ textAlign: 'right' as const }}><Text style={totalsValue}>{subtotal}</Text></Column>
            </Row>
            <Row style={totalsRow}>
              <Column><Text style={totalsLabel}>Shipping</Text></Column>
              <Column style={{ textAlign: 'right' as const }}><Text style={totalsValue}>{shipping}</Text></Column>
            </Row>
            <Row style={totalsRow}>
              <Column><Text style={totalsLabel}>Tax</Text></Column>
              <Column style={{ textAlign: 'right' as const }}><Text style={totalsValue}>{tax}</Text></Column>
            </Row>
            <Hr style={divider} />
            <Row>
              <Column><Text style={totalLabel}>Total</Text></Column>
              <Column style={{ textAlign: 'right' as const }}><Text style={totalValue}>{total}</Text></Column>
            </Row>

            <Hr style={divider} />
            <Heading as="h3" style={sectionTitle}>Shipping Address</Heading>
            <Text style={addressText}>{shippingAddress}</Text>

            <Section style={ctaSection}>
              <Button href={trackingUrl} style={button}>Track Your Order</Button>
            </Section>
          </Section>

          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Contact us at <Link href="mailto:support@example.com" style={footerLink}>support@example.com</Link>
              <br />
              © 2026 {companyName}. All rights reserved.
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
const headerHeading = { color: '#ffffff', fontSize: '22px', fontWeight: '700', margin: 0 };
const confirmBanner = { backgroundColor: '#f0fdf4', padding: '32px 40px', textAlign: 'center' as const };
const confirmIcon = { fontSize: '40px', margin: '0 0 8px', display: 'block' };
const confirmHeading = { fontSize: '22px', fontWeight: '700', color: '#166534', margin: '0 0 8px' };
const confirmSubtext = { fontSize: '15px', color: '#374151', margin: 0 };
const content = { padding: '24px 40px' };
const metaLabel = { fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 4px' };
const metaValue = { fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 };
const sectionTitle = { fontSize: '16px', fontWeight: '700', color: '#111827', margin: '16px 0 12px' };
const itemRow = { margin: '0 0 8px' };
const itemName = { fontSize: '14px', color: '#111827', fontWeight: '500', margin: 0 };
const itemQty = { fontSize: '12px', color: '#6b7280', margin: '2px 0 0' };
const itemPrice = { fontSize: '14px', color: '#111827', fontWeight: '500', margin: 0 };
const totalsRow = { margin: '4px 0' };
const totalsLabel = { fontSize: '14px', color: '#6b7280', margin: 0 };
const totalsValue = { fontSize: '14px', color: '#374151', margin: 0 };
const totalLabel = { fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 };
const totalValue = { fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 };
const addressText = { fontSize: '14px', color: '#374151', lineHeight: '1.5', margin: 0 };
const ctaSection = { textAlign: 'center' as const, margin: '24px 0 0' };
const button = { backgroundColor: '#4f46e5', color: '#ffffff', padding: '12px 28px', borderRadius: '6px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' };
const divider = { borderColor: '#e5e7eb', margin: '16px 0' };
const footer = { padding: '16px 40px 24px' };
const footerText = { fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const, lineHeight: '1.6', margin: 0 };
const footerLink = { color: '#9ca3af', textDecoration: 'underline' };
