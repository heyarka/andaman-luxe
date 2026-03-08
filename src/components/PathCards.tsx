import { motion } from "framer-motion";
import { Compass, CalendarCheck, MapPin, Waves, Ship, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const PathCards = () => {
  return (
    <section id="explore" className="relative py-24 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-5xl">
        {/* Explore Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 flex flex-col items-center text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 mb-6">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            New to Andaman?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Explore our comprehensive guide to destinations, water sports, ferries,
            and everything you need to know before planning your trip.
          </p>
          <div className="flex flex-col gap-3 w-full text-left mb-8">
            {[
              { icon: MapPin, text: "Discover Hidden Destinations" },
              { icon: Waves, text: "Explore Water Sports & Activities" },
              { icon: Ship, text: "Learn About Ferry Services" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
          <a
            href="/explore"
            className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-foreground/5"
          >
            Explore Andaman
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Book Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-2xl p-8 flex flex-col items-center text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 mb-6">
            <CalendarCheck className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            Ready to Book?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Already researched? Jump straight into planning your perfect Andaman
            getaway with our personalized trip finder.
          </p>
          <div className="flex flex-col gap-3 w-full text-left mb-8">
            {[
              { icon: Sparkles, text: "Curated Package Selection" },
              { icon: CheckCircle, text: "Personalized Itineraries" },
              { icon: Sparkles, text: "Instant Booking & Customization" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
          <a
            href="/book"
            className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground btn-primary-glow transition-all hover:brightness-110"
          >
            Find Your Perfect Trip
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PathCards;
