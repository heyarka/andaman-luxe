import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PathCards from "@/components/PathCards";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PathCards />
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Index;
