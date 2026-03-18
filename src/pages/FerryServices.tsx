import { motion } from "framer-motion";
import { Ship, Clock, Users, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import makruzzImg from "@/assets/makruzz.jpg";
import ferryImg from "@/assets/ferry-services.jpg";
import govtFerryImg from "@/assets/govt-ferry.jpg";

const ferries = [
  {
    image: makruzzImg, badge: "Premium Private Ferry", price: "₹1,000 - ₹2,500", title: "Makruzz Cruises",
    description: "Premium high-speed catamaran service offering luxury travel between islands.",
    travelTime: "Fast (1.5 - 2 hours)", capacity: "300 passengers",
    routes: ["Port Blair - Havelock", "Havelock - Neil Island", "Neil Island - Port Blair"],
    features: ["Air Conditioned", "Entertainment", "Snacks Available", "Premium Seating"],
  },
  {
    image: ferryImg, badge: "Private Ferry", price: "₹900 - ₹2,000", title: "Green Ocean",
    description: "Reliable and comfortable private ferry service connecting major islands.",
    travelTime: "Moderate (2 - 2.5 hours)", capacity: "250 passengers",
    routes: ["Port Blair - Havelock", "Port Blair - Neil Island", "Inter-island Routes"],
    features: ["Comfortable Seating", "Refreshments", "Safety Equipment", "Professional Crew"],
  },
  {
    image: govtFerryImg, badge: "Government Operated", price: "₹300 - ₹800", title: "Government Ferries",
    description: "Budget-friendly option operated by the government with multiple daily sailings.",
    travelTime: "Slow (2.5 - 4 hours)", capacity: "500+ passengers",
    routes: ["All Major Islands", "Remote Islands", "Daily Schedules"],
    features: ["Most Affordable", "Multiple Sailings", "All Routes", "Large Capacity"],
  },
];

const FerryServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 mb-6">
          <Ship className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold tracking-wider uppercase text-accent">Ferry Services & Inter-Island Travel</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold text-gradient-hero mb-6">
          Navigate the Islands
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Complete guide to ferry services in Andaman
        </motion.p>
      </section>

      <section className="px-6 pb-12 md:pb-20">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ferries.map((ferry, i) => (
            <motion.div key={ferry.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <span className="absolute top-4 left-4 z-10 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{ferry.badge}</span>
                <div className="absolute bottom-4 left-4 z-10 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5">
                  <span className="text-xs font-medium text-foreground">{ferry.price}</span>
                </div>
                <img src={ferry.image} alt={ferry.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{ferry.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{ferry.description}</p>
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-secondary/50 p-4 mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Travel Time</p>
                    <p className="text-sm font-medium text-foreground">{ferry.travelTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                    <p className="text-sm font-medium text-foreground">{ferry.capacity}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground mb-2">Popular Routes:</p>
                <div className="flex flex-col gap-1.5 mb-5">
                  {ferry.routes.map((r) => (
                    <div key={r} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Ship className="h-3 w-3 text-primary shrink-0" /> {r}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-foreground mb-2">Features:</p>
                <div className="grid grid-cols-2 gap-2">
                  {ferry.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-primary shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionDivider />
      <ReviewsSection />
      <SectionDivider />
      <Footer />
    </div>
  );
};

export default FerryServices;
