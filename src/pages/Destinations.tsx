import { motion } from "framer-motion";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import rossSmithImg from "@/assets/ross-smith.jpg";
import cellularJailImg from "@/assets/cellular-jail.jpg";

const destinations = [
  {
    image: rossSmithImg,
    badge: "Natural Wonder",
    location: "North Andaman",
    title: "Ross & Smith Islands",
    description: "Twin islands connected by a natural white sand bridge that appears during low tide",
    tags: ["Natural Sandbar", "Crystal Clear Waters", "Snorkeling Paradise"],
  },
  {
    image: cellularJailImg,
    badge: "Historical Site",
    location: "Port Blair",
    title: "Cellular Jail",
    description: "Historic colonial prison and national memorial honoring India's freedom fighters",
    tags: ["Light & Sound Show", "Freedom Struggle Museum", "Colonial Architecture"],
  },
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 mb-6"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold tracking-wider uppercase text-accent">
            Explore Andaman
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-bold text-gradient-hero mb-6"
        >
          Discover Paradise
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
        >
          From pristine beaches to historic monuments, explore the best destinations that make Andaman a truly unforgettable experience
        </motion.p>
      </section>

      {/* Destination Cards */}
      <section className="px-6 pb-16">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <span className="absolute top-4 left-4 z-10 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {dest.badge}
                </span>
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{dest.location}</span>
                </div>
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-2xl font-bold text-accent mb-2">
                  {dest.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {dest.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {dest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground italic">More destinations coming soon...</p>
        </div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Destinations;
