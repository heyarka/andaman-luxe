import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-beach-bg.jpg";
import AnimatedExploreButton from "./AnimatedExploreButton";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 mb-6 font-body font-light"
        >
          Luxury Travel · Andaman Islands
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white mb-6"
        >
          Discover Paradise
          <br />
          <span className="italic font-normal">in the Andaman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10 font-body font-light leading-relaxed"
        >
          Curated luxury experiences, private island escapes,
          and unforgettable adventures await you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/book"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground btn-primary-glow transition-all duration-300 hover:brightness-110 font-body"
          >
            Plan Your Trip
            <ArrowRight className="h-4 w-4" />
          </a>
          <AnimatedExploreButton />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-body">Scroll</span>
        <ChevronDown className="h-5 w-5 text-white/40 animate-bounce-gentle" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
