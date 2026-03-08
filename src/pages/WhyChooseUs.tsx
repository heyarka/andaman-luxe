import { motion } from "framer-motion";
import { Users, ShieldCheck, Star, Phone, MessageCircle, Sparkles, MapPin, Clock, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import heroBeach from "@/assets/hero-beach.jpg";

const reasons = [
  {
    icon: Users,
    title: "Local Experts",
    description: "Our team consists of locals who know every hidden gem of the islands.",
  },
  {
    icon: ShieldCheck,
    title: "100% Transparent",
    description: "No hidden charges. What you see is exactly what you pay.",
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "We partner only with the best rated hotels and service providers.",
  },
];

const stats = [
  { value: "500+", label: "Happy Travelers", description: "Across the globe who have experienced the magic of Andaman with us" },
  { value: "15+", label: "Years Experience", description: "Of crafting unforgettable journeys through the Andaman Islands" },
  { value: "100%", label: "Satisfaction Rate", description: "Our commitment to excellence ensures every trip exceeds expectations" },
];

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-12 md:pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Left: Image with overlay card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-xl md:rounded-2xl overflow-hidden h-48 md:h-[32rem]">
                <img
                  src={heroBeach}
                  alt="Beautiful Andaman beach at sunset"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 glass-card rounded-lg md:rounded-xl p-3 md:p-5 flex items-center gap-3 md:gap-4">
                <div className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full bg-accent/20 shrink-0">
                  <Phone className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-xs md:text-base font-bold text-foreground">24/7 On-Trip Support</h4>
                  <p className="text-[10px] md:text-sm text-muted-foreground">We are always just a call away.</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-[10px] md:text-sm font-semibold uppercase tracking-wider text-accent mb-2 md:mb-4 flex items-center gap-1.5 md:gap-2">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4" /> Why Choose Luxury Andamans
              </p>
              <h1 className="font-display text-xl md:text-5xl font-bold text-foreground leading-tight mb-1 md:mb-2">
                We Don't Just Plan Trips, We Craft
              </h1>
              <h1 className="font-display text-xl md:text-5xl font-bold text-gradient-hero italic mb-4 md:mb-10">
                Memories
              </h1>

              {/* Reasons */}
              <div className="space-y-3 md:space-y-8 mb-4 md:mb-10">
                {reasons.map((r, i) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 md:gap-4"
                  >
                    <div className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl bg-accent/10 shrink-0">
                      <r.icon className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-xs md:text-lg font-bold text-foreground mb-0.5 md:mb-1">{r.title}</h3>
                      <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <a
                  href="tel:+918637327297"
                  className="inline-flex items-center gap-1.5 md:gap-2 rounded-lg border border-foreground/10 px-3 py-2 md:px-6 md:py-3 text-[10px] md:text-sm font-semibold text-foreground hover:bg-muted/50 transition-all"
                >
                  <Phone className="h-3 w-3 md:h-4 md:w-4" /> CALL
                </a>
                <a
                  href="/book"
                  className="inline-flex items-center gap-1.5 md:gap-2 rounded-lg bg-accent text-accent-foreground px-3 py-2 md:px-6 md:py-3 text-[10px] md:text-sm font-semibold hover:brightness-110 transition-all"
                >
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4" /> Get Best Quote
                </a>
                <a
                  href="https://wa.me/918637327297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 md:gap-2 rounded-lg border border-foreground/10 px-3 py-2 md:px-6 md:py-3 text-[10px] md:text-sm font-semibold text-foreground hover:bg-muted/50 transition-all"
                >
                  <MessageCircle className="h-3 w-3 md:h-4 md:w-4" /> WHATSAPP
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-xl md:rounded-2xl p-3 md:p-8 text-center"
              >
                <p className="font-display text-xl md:text-5xl font-bold text-accent mb-0.5 md:mb-2">{stat.value}</p>
                <h3 className="font-display text-[10px] md:text-lg font-bold text-foreground mb-0.5 md:mb-2">{stat.label}</h3>
                <p className="text-[9px] md:text-sm text-muted-foreground leading-relaxed hidden md:block">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-10 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-12"
          >
            <p className="text-[10px] md:text-sm font-semibold uppercase tracking-wider text-accent mb-2 md:mb-4">Our Promise</p>
            <h2 className="font-display text-xl md:text-4xl font-bold text-foreground">
              What Sets Us <span className="text-gradient-hero italic">Apart</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: MapPin, title: "Island Born", desc: "Our founders were born and raised in the Andaman Islands. We know every secret beach." },
              { icon: Clock, title: "Instant Response", desc: "Average response time under 5 minutes. Your questions never wait." },
              { icon: Award, title: "Award Winning", desc: "Recognized by leading travel platforms for excellence in service." },
              { icon: ShieldCheck, title: "Safe & Secure", desc: "Licensed and insured operations with trained guides and safety equipment." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl md:rounded-2xl p-3 md:p-6 text-center"
              >
                <div className="flex h-8 w-8 md:h-14 md:w-14 items-center justify-center rounded-full bg-accent/10 mx-auto mb-2 md:mb-4">
                  <item.icon className="h-4 w-4 md:h-7 md:w-7 text-accent" />
                </div>
                <h3 className="font-display text-xs md:text-lg font-bold text-foreground mb-1 md:mb-2">{item.title}</h3>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default WhyChooseUs;
