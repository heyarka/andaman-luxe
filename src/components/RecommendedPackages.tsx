import { motion } from "framer-motion";
import { Clock, MapPin, Users, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HorizontalScroll from "@/components/HorizontalScroll";
import honeymoon1 from "@/assets/honeymoon-1.jpg";
import honeymoon2 from "@/assets/honeymoon-2.jpg";
import honeymoon3 from "@/assets/honeymoon-3.jpg";
import snorkeling from "@/assets/snorkeling.jpg";

const recommendedPackages = [
  {
    slug: "island-hopping-family-fun",
    name: "Family Paradise",
    category: "Premium",
    duration: "6 Days",
    price: "₹32K",
    people: "4–6 people",
    location: "Andaman",
    image: honeymoon1,
    featured: false,
    description: "Perfect family vacation with kid-friendly activities, comfortable accommodations, and fun for all ages",
    features: ["Kid-friendly activities", "Family rooms", "Safe water sports"],
  },
  {
    slug: "island-romance-getaway",
    name: "Honeymoon Special",
    category: "Premium",
    duration: "6 Days",
    price: "₹38K",
    people: "2 people",
    location: "Andaman",
    image: honeymoon2,
    featured: true,
    description: "Perfect 5 nights 6 days romantic itinerary with time-optimized schedule for couples",
    features: ["Candlelit beach dinners", "Couple spa treatments", "Private beach picnic"],
  },
  {
    slug: "thrill-seeker",
    name: "Standard Andaman",
    category: "Premium",
    duration: "6 Days",
    price: "₹25K",
    people: "2–6 people",
    location: "Andaman",
    image: honeymoon3,
    featured: false,
    description: "Budget-friendly complete Andaman tour covering all major attractions",
    features: ["All major islands covered", "Essential water activities", "Comfortable hotels"],
  },
  {
    slug: "golden-andaman-retreat",
    name: "Luxury Retreat",
    category: "Premium",
    duration: "7 Days",
    price: "₹42K",
    people: "2–4 people",
    location: "Andaman",
    image: snorkeling,
    featured: false,
    description: "Premium leisure experience with private tours, sunset cruises, and luxury stays",
    features: ["Private AC car throughout", "Sunset photography tour", "Cooking class experience"],
  },
];

const RecommendedPackages = () => {
  const navigate = useNavigate();

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-accent uppercase tracking-[0.2em] text-xs md:text-sm font-medium">
            Curated for You
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Recommended Packages
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            Our most loved travel experiences, handpicked across every travel style
          </p>
        </motion.div>

        <HorizontalScroll className="md:grid-cols-2 lg:grid-cols-4">
          {recommendedPackages.map((pkg, i) => (
            <motion.div
              key={pkg.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group w-[84vw] md:w-auto snap-center shrink-0"
            >
              <div className="rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                {/* Image area */}
                <div className="relative h-52 md:h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Premium badge */}
                  <span className="absolute top-3 left-3 z-10 bg-[hsl(217,91%,60%)] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-black/30">
                    <Star className="h-3 w-3" fill="hsl(45,93%,58%)" stroke="hsl(45,93%,58%)" />
                    PREMIUM
                  </span>
                  {/* Price overlay */}
                  <div className="absolute bottom-3 right-3 z-10 text-right">
                    <span className="text-white text-[9px] md:text-[10px] uppercase tracking-wider font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] block">
                      Starting From
                    </span>
                    <span className="text-white text-xl md:text-2xl font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {pkg.price}
                    </span>
                  </div>
                  {/* Duration badge */}
                  <span className="absolute bottom-3 left-3 z-10 bg-[hsl(217,91%,60%)] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-black/30">
                    <Clock className="h-3 w-3" />
                    {pkg.duration.toUpperCase()}
                  </span>
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2 leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* People & Location */}
                  <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> {pkg.people}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {pkg.location}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-5 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs md:text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => navigate(`/package/${pkg.slug}`)}
                    className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      pkg.featured
                        ? "bg-[hsl(217,91%,60%)] text-white hover:bg-[hsl(217,91%,50%)] shadow-lg shadow-[hsl(217,91%,60%)]/20"
                        : "border border-border text-foreground hover:bg-muted/50"
                    }`}
                  >
                    View Package Details <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </HorizontalScroll>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-7 md:mt-10"
        >
          <button
            onClick={() => navigate("/explore")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-sm font-medium"
          >
            View All Packages <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendedPackages;
