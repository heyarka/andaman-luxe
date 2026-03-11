import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationGrid from "@/components/DestinationGrid";
import ExperiencesSection from "@/components/ExperiencesSection";
import RecommendedPackages from "@/components/RecommendedPackages";
import TripBuilder from "@/components/TripBuilder";
import StatsSection from "@/components/StatsSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import GallerySection from "@/components/GallerySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DestinationGrid />
      <ExperiencesSection />
      <RecommendedPackages />
      <TripBuilder />
      <StatsSection />
      <TestimonialsCarousel />
      <GallerySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
