import { motion } from "framer-motion";
import { Waves, Sparkles, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import waterSportsImg from "@/assets/water-sports.jpg";
import snorkelingImg from "@/assets/snorkeling.jpg";
import seaWalkingImg from "@/assets/sea-walking.jpg";
import parasailingImg from "@/assets/parasailing.jpg";

const activities = [
  {
    image: waterSportsImg,
    price: "₹4,500 - ₹15,000",
    level: "Beginner to Advanced",
    title: "Scuba Diving",
    description: "Dive into the crystal-clear waters and explore vibrant coral reefs, exotic marine life, and underwater caves. Perfect for both beginners and certified divers.",
    location: "Havelock Island, Neil Island",
    duration: "3-4 hours",
    highlights: ["PADI Certified Instructors", "30+ Dive Sites", "Equipment Included", "Video Recording Available"],
  },
  {
    image: snorkelingImg,
    price: "₹500 - ₹1,500",
    level: "Easy - All Ages",
    title: "Snorkeling",
    description: "Experience the underwater world with ease. Snorkeling is perfect for families and those who want to witness marine beauty without deep diving.",
    location: "North Bay, Elephant Beach",
    duration: "1-2 hours",
    highlights: ["Shallow Reef Exploration", "Colorful Fish", "Life Jackets Provided", "Great for Kids"],
  },
  {
    image: seaWalkingImg,
    price: "₹3,500 - ₹4,500",
    level: "Easy - No Skills Required",
    title: "Sea Walking",
    description: "Walk on the ocean floor with a special helmet that allows you to breathe normally. No swimming skills required for this unique underwater adventure.",
    location: "North Bay, Havelock",
    duration: "30-45 minutes",
    highlights: ["No Swimming Required", "Underwater Photos", "Safe & Easy", "Unique Experience"],
  },
  {
    image: parasailingImg,
    price: "₹3,000 - ₹5,000",
    level: "Moderate - Adventure",
    title: "Parasailing",
    description: "Soar above the turquoise waters for breathtaking aerial views of the Andaman coastline. An unforgettable adrenaline rush over paradise.",
    location: "Corbyn's Cove, Port Blair",
    duration: "15-20 minutes",
    highlights: ["Aerial Views", "Professional Instructors", "Safety Gear Provided", "Photo & Video"],
  },
];

const WaterSports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 mb-6"
        >
          <Waves className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold tracking-wider uppercase text-accent">
            Water Sports & Activities
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-bold text-gradient-hero mb-6"
        >
          Thrilling Water Adventures
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
        >
          Experience the best water sports activities in Andaman – from peaceful snorkeling to adrenaline-pumping jet skiing and everything in between
        </motion.p>
      </section>

      {/* Activity Cards */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          {activities.map((act, i) => (
            <motion.div
              key={act.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <span className="absolute top-4 right-4 z-10 rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {act.price}
                </span>
                <div className="absolute bottom-4 left-4 z-10 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5">
                  <span className="text-xs font-medium text-foreground">{act.level}</span>
                </div>
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {act.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {act.description}
                </p>

                {/* Info Row */}
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-secondary/50 p-4 mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Best Location</p>
                    <p className="text-sm font-medium text-foreground">{act.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="text-sm font-medium text-foreground">{act.duration}</p>
                  </div>
                </div>

                {/* Highlights */}
                <p className="text-sm font-semibold text-foreground mb-3">Highlights:</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {act.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-primary shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default WaterSports;
