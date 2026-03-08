import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Calendar, Users, MapPin, Waves, Camera, Heart, Navigation,
  Building2, UtensilsCrossed, Minus, Plus, CheckCircle2, X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const islands = [
  { name: "Havelock Island", popular: true },
  { name: "Neil Island", popular: true },
  { name: "Ross Island", popular: false },
  { name: "North Bay", popular: false },
  { name: "Baratang Island", popular: false },
];

const activities = [
  { name: "Scuba Diving", icon: Waves },
  { name: "Snorkeling", icon: Waves },
  { name: "Photography Tour", icon: Camera },
  { name: "Sunset Cruise", icon: Heart },
  { name: "Island Hopping", icon: Navigation },
  { name: "Water Sports", icon: Waves },
];

const accommodations = [
  { name: "Standard Resort", description: "Comfortable & clean", price: "$" },
  { name: "Deluxe Hotel", description: "Ocean view rooms", price: "$$" },
  { name: "Luxury Villa", description: "Private pool & beach", price: "$$$" },
  { name: "Premium Suite", description: "Butler & concierge", price: "$$$$" },
];

const mealPlans = [
  { name: "No Meals", description: "Explore local restaurants" },
  { name: "Breakfast Only", description: "Start your day right" },
  { name: "Half Board", description: "Breakfast & dinner included" },
  { name: "Full Board", description: "All meals included" },
];

const CustomizePackage = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [selectedIslands, setSelectedIslands] = useState<string[]>(["Havelock Island", "Neil Island"]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState("Deluxe Hotel");
  const [selectedMeal, setSelectedMeal] = useState("Half Board");
  const [specialRequests, setSpecialRequests] = useState("");

  const toggleIsland = (name: string) => {
    setSelectedIslands((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const toggleActivity = (name: string) => {
    setSelectedActivities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleSubmit = () => {
    toast({
      title: "Custom Package Request Submitted!",
      description: "Our travel experts will contact you within 24 hours.",
    });
  };

  const sectionClass = "glass-card rounded-2xl p-6 md:p-8";
  const selectedClass = "border-accent bg-accent/10 text-accent";
  const unselectedClass = "border-foreground/10 hover:border-foreground/20";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 mx-auto mb-4">
              <Sparkles className="h-7 w-7 text-accent" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
              Customize Your <span className="text-gradient-hero italic">Dream Trip</span>
            </h1>
            <p className="text-muted-foreground">
              Build the perfect Andaman experience tailored to your preferences
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Duration & Travelers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Duration */}
              <div className={sectionClass}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">Duration</h3>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setDuration(Math.max(2, duration - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-accent">{duration}</span>
                    <p className="text-sm text-muted-foreground">Days / {duration - 1} Nights</p>
                  </div>
                  <button
                    onClick={() => setDuration(Math.min(21, duration + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Travelers */}
              <div className={sectionClass}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">Travelers</h3>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-accent">{travelers}</span>
                    <p className="text-sm text-muted-foreground">People</p>
                  </div>
                  <button
                    onClick={() => setTravelers(Math.min(20, travelers + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Select Islands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={sectionClass}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Select Islands to Visit</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {islands.map((island) => {
                  const isSelected = selectedIslands.includes(island.name);
                  return (
                    <button
                      key={island.name}
                      onClick={() => toggleIsland(island.name)}
                      className={`relative rounded-xl border p-4 text-center transition-all ${
                        isSelected ? selectedClass : unselectedClass
                      }`}
                    >
                      {island.popular && (
                        <span className="absolute top-2 left-2 text-xs font-semibold bg-accent/20 text-accent px-2 py-0.5 rounded-md">
                          Popular
                        </span>
                      )}
                      {isSelected && (
                        <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-accent" />
                      )}
                      <p className={`text-sm font-medium mt-3 ${isSelected ? "text-accent" : "text-foreground"}`}>
                        {island.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={sectionClass}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                  <Waves className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Activities & Experiences</h3>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4">
                {activities.map((activity) => {
                  const isSelected = selectedActivities.includes(activity.name);
                  const Icon = activity.icon;
                  return (
                    <button
                      key={activity.name}
                      onClick={() => toggleActivity(activity.name)}
                      className={`rounded-xl border p-3 md:p-4 flex flex-col md:flex-row items-center gap-1.5 md:gap-3 transition-all text-center md:text-left ${
                        isSelected ? selectedClass : unselectedClass
                      }`}
                    >
                      <Icon className={`h-4 w-4 md:h-5 md:w-5 shrink-0 ${isSelected ? "text-accent" : "text-muted-foreground"}`} />
                      <span className={`text-[11px] md:text-sm font-medium leading-tight ${isSelected ? "text-accent" : "text-foreground"}`}>
                        {activity.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Accommodation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={sectionClass}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Accommodation Type</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {accommodations.map((acc) => {
                  const isSelected = selectedAccommodation === acc.name;
                  return (
                    <button
                      key={acc.name}
                      onClick={() => setSelectedAccommodation(acc.name)}
                      className={`rounded-xl border p-4 text-left flex items-center justify-between transition-all ${
                        isSelected ? selectedClass : unselectedClass
                      }`}
                    >
                      <div>
                        <p className={`text-sm font-bold ${isSelected ? "text-accent" : "text-foreground"}`}>
                          {acc.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{acc.description}</p>
                      </div>
                      <span className={`text-sm font-bold ${isSelected ? "text-accent" : "text-accent/60"}`}>
                        {acc.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Meal Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={sectionClass}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                  <UtensilsCrossed className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Meal Plan</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {mealPlans.map((meal) => {
                  const isSelected = selectedMeal === meal.name;
                  return (
                    <button
                      key={meal.name}
                      onClick={() => setSelectedMeal(meal.name)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        isSelected ? selectedClass : unselectedClass
                      }`}
                    >
                      <p className={`text-sm font-bold ${isSelected ? "text-accent" : "text-foreground"}`}>
                        {meal.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{meal.description}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Special Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={sectionClass}
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                Special Requests (Optional)
              </h3>
              <textarea
                rows={4}
                maxLength={1000}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any dietary requirements, accessibility needs, celebration planning, or other special requests..."
                className="w-full rounded-lg border border-foreground/10 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none"
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-lg bg-accent text-accent-foreground py-4 text-sm font-bold hover:brightness-110 transition-all"
              >
                Submit Custom Package Request
              </button>
              <button
                onClick={() => navigate("/book")}
                className="rounded-lg border border-foreground/10 text-foreground px-8 py-4 text-sm font-semibold hover:bg-muted/50 transition-all"
              >
                Cancel
              </button>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-card rounded-2xl p-6 text-center border-accent/30"
            >
              <p className="text-sm text-muted-foreground">
                Our travel experts will review your customization and contact you within 24 hours with a personalized quote and itinerary.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomizePackage;
