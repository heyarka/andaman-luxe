import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-beach-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      {/* Bottom gradient fade into background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 mb-8"
        >
          <Star className="h-4 w-4 text-accent" fill="currentColor" />
          <span className="text-xs font-semibold tracking-wider uppercase text-accent">
            #1 Rated Andaman Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-gradient-gold font-extrabold drop-shadow-lg">Paradise</span>
          <br />
          <span className="text-gradient-blue font-extrabold drop-shadow-lg">Found Here</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 drop-shadow-sm"
        >
          Experience the untouched beauty of the Andaman Islands with our curated
          luxury packages and bespoke itineraries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#explore"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground btn-primary-glow transition-all hover:brightness-110"
          >
            Explore Andaman
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/book"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-foreground/5"
          >
            View Packages
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
