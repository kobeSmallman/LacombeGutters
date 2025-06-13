import FAQSchema from "@/components/faq/FAQSchema";

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQSchema />
      {children}
    </>
  );
}
