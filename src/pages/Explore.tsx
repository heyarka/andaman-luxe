import { motion } from "framer-motion";
import { MapPin, Waves, Ship, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import destinationsImg from "@/assets/destinations.jpg";
import waterSportsImg from "@/assets/water-sports.jpg";
import ferryImg from "@/assets/ferry-services.jpg";

const categories = [
  {
    icon: MapPin,
    title: "Destinations",
    description: "Discover pristine islands, hidden beaches, and natural wonders across the Andaman archipelago",
    image: destinationsImg,
    items: ["Ross & Smith Islands", "Havelock Island", "Neil Island", "Cellular Jail"],
    link: "/destinations",
  },
  {
    icon: Waves,
    title: "Water Sports",
    description: "Experience thrilling adventures with scuba diving, snorkeling, jet skiing, and more",
    image: waterSportsImg,
    items: ["Scuba Diving", "Snorkeling", "Sea Walking", "Parasailing"],
    link: "/water-sports",
  },
  {
    icon: Ship,
    title: "Ferry Services",
    description: "Explore inter-island ferry schedules, routes, pricing, and booking options",
    image: ferryImg,
    items: ["Makruzz Cruises", "Green Ocean", "Government Ferries", "Private Charters"],
    link: "/ferry-services",
  },
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative min-h-[88vh] md:min-h-screen flex items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Firefly.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-900/35 to-slate-950/55" />

        <div className="relative z-10 max-w-5xl mx-auto pt-20 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-white/25 bg-white/20 px-5 py-2 text-sm md:text-base font-semibold tracking-wide text-white backdrop-blur-md mb-6"
          >
            Explore Paradise
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] text-white mb-6"
          >
            Curated
            <br />
            <span className="text-sky-300">Adventures</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/90 max-w-3xl mx-auto text-xl md:text-5 leading-relaxed"
          >
            From deep sea diving to sunset cruises, discover unforgettable experiences tailored just for you in the Andaman Islands.
          </motion.p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-4 md:px-6 pt-8 md:pt-12 pb-10 md:pb-16">
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-xl md:rounded-2xl overflow-hidden flex flex-col ${
                i === 2 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="relative h-28 md:h-52 overflow-hidden">
                <cat.icon className="absolute top-2 left-2 md:top-4 md:left-4 h-4 w-4 md:h-6 md:w-6 text-primary z-10" />
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-3 md:p-6 flex flex-col flex-1">
                <h3 className="font-display text-sm md:text-xl font-bold text-foreground mb-1 md:mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3 md:mb-6 line-clamp-2 md:line-clamp-none">
                  {cat.description}
                </p>
                <ul className="flex flex-col gap-1 md:gap-2 mb-3 md:mb-6">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                      <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to={cat.link} className="mt-auto w-full inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg border border-foreground/20 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold text-foreground transition-all hover:bg-foreground/5">
                  Learn More
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <section className="px-4 md:px-6 pb-10 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-3xl glass-card rounded-xl md:rounded-2xl p-6 md:p-10 text-center"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Plan Your Trip?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Now that you've explored what Andaman has to offer, let's find the perfect package tailored just for you
          </p>
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground btn-primary-glow transition-all hover:brightness-110"
          >
            Find Your Perfect Trip
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <SectionDivider />
      <ReviewsSection />
      <SectionDivider />
      <Footer />
    </div>
  );
};

export default Explore;
