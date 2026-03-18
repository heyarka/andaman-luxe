import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/90 via-accent to-primary/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(36,100%,60%,0.3),transparent_60%)]" />

      <div className="relative z-10 container mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Your Island Escape
          <br />
          <span className="italic font-normal">Awaits</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base md:text-lg text-white/70 font-body font-light mb-10 max-w-lg mx-auto"
        >
          Let us craft the perfect Andaman experience tailored just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/book"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] font-body"
          >
            Plan My Trip
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/70 font-body"
          >
            <MessageCircle className="h-4 w-4" />
            Talk to a Travel Expert
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
