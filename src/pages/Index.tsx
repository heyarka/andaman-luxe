import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RecommendedPackages from "@/components/RecommendedPackages";
import TripBuilder from "@/components/TripBuilder";
import StatsSection from "@/components/StatsSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <RecommendedPackages />
      <TripBuilder />
      <TestimonialsCarousel />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
