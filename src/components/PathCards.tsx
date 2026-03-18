import { motion } from "framer-motion";
import { Compass, CalendarCheck, MapPin, Waves, Ship, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const PathCards = () => {
  return (
    <section id="explore" className="relative py-8 md:py-16 px-5 md:px-6">
      {/* Section header */}
      <div className="container mx-auto max-w-4xl text-center mb-6 md:mb-10">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-accent mb-2">
          Start Here
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
          How Can We Help?
        </h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 max-w-3xl">
        {/* Explore Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 mb-5">
            <Compass className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
            New to Andaman?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Explore destinations, water sports, ferries & more.
          </p>
          <div className="flex flex-col gap-2.5 w-full text-left mb-6">
            {[
              { icon: MapPin, text: "Destinations" },
              { icon: Waves, text: "Water Sports" },
              { icon: Ship, text: "Ferry Services" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
          <a
            href="/explore"
            className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-foreground/5"
          >
            Explore
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Book Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 mb-5">
            <CalendarCheck className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
            Ready to Book?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Plan your perfect getaway with our trip finder.
          </p>
          <div className="flex flex-col gap-2.5 w-full text-left mb-6">
            {[
              { icon: Sparkles, text: "Curated Packages" },
              { icon: CheckCircle, text: "Custom Itineraries" },
              { icon: Sparkles, text: "Instant Booking" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
          <a
            href="/book"
            className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-primary-glow transition-all hover:brightness-110"
          >
            Find Your Trip
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PathCards;
