import PageHero from "@/components/landing/PageHero";
import ContactContent from "@/components/contact/ContactContent";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <PageHero
        title="Contact Us"
        subtitle="Have questions? We're here to help. Reach out to our team."
      />
      <ContactContent />
    </main>
  );
}
