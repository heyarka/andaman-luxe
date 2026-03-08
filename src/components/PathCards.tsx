import { motion } from "framer-motion";
import { Compass, CalendarCheck, MapPin, Waves, Ship, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const PathCards = () => {
  return (
    <section id="explore" className="relative py-8 md:py-24 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-2 gap-3 md:gap-8 max-w-5xl">
        {/* Explore Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-xl md:rounded-2xl p-3 md:p-8 flex flex-col items-center text-center"
        >
          <div className="flex h-9 w-9 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/15 mb-2 md:mb-6">
            <Compass className="h-4 w-4 md:h-8 md:w-8 text-primary" />
          </div>
          <h3 className="font-display text-xs md:text-2xl font-bold text-foreground mb-1 md:mb-3">
            New to Andaman?
          </h3>
          <p className="text-muted-foreground text-[9px] md:text-sm leading-relaxed mb-2 md:mb-8 line-clamp-3 md:line-clamp-none">
            Explore destinations, water sports, ferries & more.
          </p>
          <div className="flex flex-col gap-1 md:gap-3 w-full text-left mb-2 md:mb-8">
            {[
              { icon: MapPin, text: "Destinations" },
              { icon: Waves, text: "Water Sports" },
              { icon: Ship, text: "Ferry Services" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 md:gap-3 text-[9px] md:text-sm text-muted-foreground">
                <item.icon className="h-2.5 w-2.5 md:h-4 md:w-4 text-primary shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
          <a
            href="/explore"
            className="mt-auto w-full inline-flex items-center justify-center gap-1 md:gap-2 rounded-lg border border-foreground/20 px-2 py-1.5 md:px-6 md:py-3 text-[9px] md:text-sm font-semibold text-foreground transition-all hover:bg-foreground/5"
          >
            Explore
            <ArrowRight className="h-2.5 w-2.5 md:h-4 md:w-4" />
          </a>
        </motion.div>

        {/* Book Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-xl md:rounded-2xl p-3 md:p-8 flex flex-col items-center text-center"
        >
          <div className="flex h-9 w-9 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/15 mb-2 md:mb-6">
            <CalendarCheck className="h-4 w-4 md:h-8 md:w-8 text-primary" />
          </div>
          <h3 className="font-display text-xs md:text-2xl font-bold text-foreground mb-1 md:mb-3">
            Ready to Book?
          </h3>
          <p className="text-muted-foreground text-[9px] md:text-sm leading-relaxed mb-2 md:mb-8 line-clamp-3 md:line-clamp-none">
            Plan your perfect getaway with our trip finder.
          </p>
          <div className="flex flex-col gap-1 md:gap-3 w-full text-left mb-2 md:mb-8">
            {[
              { icon: Sparkles, text: "Curated Packages" },
              { icon: CheckCircle, text: "Custom Itineraries" },
              { icon: Sparkles, text: "Instant Booking" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 md:gap-3 text-[9px] md:text-sm text-muted-foreground">
                <item.icon className="h-2.5 w-2.5 md:h-4 md:w-4 text-primary shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
          <a
            href="/book"
            className="mt-auto w-full inline-flex items-center justify-center gap-1 md:gap-2 rounded-lg bg-primary px-2 py-1.5 md:px-6 md:py-3 text-[9px] md:text-sm font-semibold text-primary-foreground btn-primary-glow transition-all hover:brightness-110"
          >
            Find Your Trip
            <ArrowRight className="h-2.5 w-2.5 md:h-4 md:w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PathCards;
