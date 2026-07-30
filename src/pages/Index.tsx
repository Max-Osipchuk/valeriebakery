import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { faqData } from "@/components/FAQSection";

const SITE_URL = "https://valeriebakery.lovable.app";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Valerie Bakery",
      url: `${SITE_URL}/`,
      inLanguage: "ru-RU",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Valerie Bakery",
      description:
        "Торты и десерты на заказ в Санкт-Петербурге. Натуральные ингредиенты, ручная работа, индивидуальный декор.",
      url: `${SITE_URL}/`,
      telephone: "+7 981 938-43-24",
      priceRange: "₽₽",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Санкт-Петербург",
        addressCountry: "RU",
      },
      areaServed: "Санкт-Петербург",
      sameAs: ["https://www.instagram.com/_valerie_bakery"],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Valerie Bakery — Торты на заказ в Санкт-Петербурге</title>
        <meta
          name="description"
          content="Торты и десерты на заказ в Санкт-Петербурге. Натуральные ингредиенты, ручная работа, индивидуальный декор. Закажите торт мечты!"
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content="Valerie Bakery — Торты на заказ в Санкт-Петербурге" />
        <meta
          property="og:description"
          content="Торты и десерты на заказ в Санкт-Петербурге. Натуральные ингредиенты, ручная работа, индивидуальный декор."
        />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <MenuSection />
        <GallerySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
