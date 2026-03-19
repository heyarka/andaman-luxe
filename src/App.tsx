import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Destinations from "./pages/Destinations";
import WaterSports from "./pages/WaterSports";
import FerryServices from "./pages/FerryServices";
import Book from "./pages/Book";
import CustomizePackage from "./pages/CustomizePackage";
import PackageDetailPage from "./pages/PackageDetailPage";
import WhyChooseUs from "./pages/WhyChooseUs";
import CalculatorPage from "./pages/CalculatorPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DiscountPopup from "./components/DiscountPopup";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search, location.hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/">
        <ScrollToTop />
        <DiscountPopup />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/water-sports" element={<WaterSports />} />
          <Route path="/ferry-services" element={<FerryServices />} />
          <Route path="/book" element={<Book />} />
          <Route path="/customize" element={<CustomizePackage />} />
          <Route path="/package/:slug" element={<PackageDetailPage />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
