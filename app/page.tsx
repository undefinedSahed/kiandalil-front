import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import CitiesSection from "@/components/cities-section"
import StatsSection from "@/components/stats-section"
import FeaturedProperties from "@/components/featured-properties"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import FAQSection from "@/components/faq-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default async function HomePage() {

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CitiesSection />
      <StatsSection />
      <FeaturedProperties />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
