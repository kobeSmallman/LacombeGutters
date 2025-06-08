import { Metadata } from 'next';

// Define metadata directly in the layout file
export const metadata: Metadata = {
  title: "Our Services | Lacombe Gutters",
  description: "Professional gutter, eavestrough, soffit & fascia services in Central Alberta. 40+ years of combined experience. Free estimates. Call today!",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
