import { motion } from "framer-motion";
import { Clock, MapPin, ArrowRight, Heart, Users, Compass, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import honeymoon1 from "@/assets/honeymoon-1.jpg";
import honeymoon2 from "@/assets/honeymoon-2.jpg";
import honeymoon3 from "@/assets/honeymoon-3.jpg";

const recommendedPackages = [
  {
    slug: "island-romance-getaway",
    name: "Island Romance Getaway",
    category: "Honeymoon",
    categoryIcon: Heart,
    duration: "6D/5N",
    islands: "3 Islands",
    price: "₹38,999",
    image: honeymoon2,
    highlight: "Most Popular",
    description: "Private yacht cruises, bioluminescent kayaking, and luxury resort stays.",
  },
  {
    slug: "island-hopping-family-fun",
    name: "Island Hopping Family Fun",
    category: "Family",
    categoryIcon: Users,
    duration: "6D/5N",
    islands: "3 Islands",
    price: "₹32,999",
    image: honeymoon3,
    highlight: "Best for Families",
    description: "Snorkeling, limestone caves, bicycle tours, and bioluminescent kayaking.",
  },
  {
    slug: "thrill-seeker",
    name: "Thrill-Seeker Expedition",
    category: "Adventure",
    categoryIcon: Compass,
    duration: "6D/5N",
    islands: "3 Islands",
    price: "₹34,999",
    image: honeymoon1,
    highlight: "Top Adventure",
    description: "Scuba diving, night kayaking, jungle treks, and limestone cave explorations.",
  },
  {
    slug: "golden-andaman-retreat",
    name: "Golden Andaman Retreat",
    category: "Leisure",
    categoryIcon: Sun,
    duration: "7D/6N",
    islands: "3 Islands",
    price: "₹42,999",
    image: honeymoon2,
    highlight: "Premium Comfort",
    description: "Bird-watching, cooking classes, sunset photography, and private AC travel.",
  },
];

const RecommendedPackages = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {recommendedPackages.map((pkg, i) => {
            const Icon = pkg.categoryIcon;
            return (
              <motion.div
                key={pkg.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/package/${pkg.slug}`)}
              >
                <div className="rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 md:h-52 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Highlight badge */}
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full">
                      {pkg.highlight}
                    </span>
                    {/* Category badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90 text-xs font-medium">
                      <Icon className="h-3.5 w-3.5" />
                      {pkg.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5 flex flex-col flex-1">
                    <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-1.5 leading-tight">
                      {pkg.name}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm mb-3 leading-relaxed flex-1">
                      {pkg.description}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] md:text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {pkg.islands}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div>
                        <span className="text-lg md:text-xl font-bold text-accent">{pkg.price}</span>
                        <span className="text-[10px] md:text-xs text-muted-foreground"> /person</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-2 transition-all">
                        View <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all packages */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10 md:mt-14"
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
