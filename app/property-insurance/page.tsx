import PageHero from "@/components/landing/PageHero";
import PropertyProductsSection from "@/components/property-insurance/PropertyProductsSection";
import OtherInsuranceCategories from "@/components/property-insurance/OtherInsuranceCategories";

export const metadata = {
  title: "Property Insurance | Kolanut Africa",
  description:
    "Our Property Insurance Product reimburses you in the event of damage or theft of your property. It also provides cover for injuries incurred on your property.",
};

const HERO_IMAGE =
  "/images/property.jpg";

export default function PropertyInsurancePage() {
   const products = [
    {
      title: "Tenant Policy",
      description: "Protect household items and personal effects.",
      href: "/property-insurance/tenant-policy",
      image: "/images/tenant.png",
    },
    {
      title: "Homeowner Policy",
      description: "Full protection for building, contents, and liabilities",
      href: "/property-insurance/homeowner-policy",
      image: "/images/homeowner.png",
    },
    {
      title: "Landlord's Policy",
      description: "Covers building, loss of rent and tenant-related risks",
      href: "/property-insurance/landlord-policy",
      image: "/images/landlord.png",
    },
  ];
  return (
    <main className="min-h-screen bg-page-bg">
      {/* Hero */}
      <PageHero
        title="Property Insurance"
        subtitle="Our Property Insurance Product reimburse you in the event of damage or theft of your property. It also provides a cover for injuries incurred on your property."
        image={HERO_IMAGE}
      />

      {/* Product cards */}
      <PropertyProductsSection products={products} />

      {/* Other categories */}
      <OtherInsuranceCategories />
    </main>
  );
}
