import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Minus, Plus, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const styles = ["Adventure", "Honeymoon", "Family", "Luxury"] as const;

const itineraryPreviews: Record<string, string[]> = {
  Adventure: ["Port Blair sightseeing", "Havelock scuba diving", "Baratang caves trek", "North Bay snorkeling", "Ross Island exploration"],
  Honeymoon: ["Port Blair arrival & dinner", "Havelock beach day", "Private sunset cruise", "Neil Island retreat", "Candlelight farewell dinner"],
  Family: ["Cellular Jail & museum", "Glass-bottom boat ride", "Elephant Beach picnic", "Neil Island cycling", "Shopping & departure"],
  Luxury: ["5-star resort check-in", "Private island tour", "Spa & wellness day", "Yacht sunset cruise", "Fine dining & departure"],
};

const TripBuilder = () => {
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState([50000]);
  const [style, setStyle] = useState<typeof styles[number]>("Honeymoon");
  const [showPlan, setShowPlan] = useState(false);

  const itinerary = itineraryPreviews[style].slice(0, days);

  return (
    <section className="py-14 md:py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3 font-body font-medium">
            Trip Planner
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Build Your Perfect Trip
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-border bg-card p-6 md:p-10 space-y-8"
        >
          {/* Travelers & Days */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-muted-foreground font-body font-medium uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" /> Travelers
              </label>
              <div className="flex items-center gap-4 mt-2">
                <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-2xl font-bold text-foreground w-8 text-center">{travelers}</span>
                <button onClick={() => setTravelers(Math.min(10, travelers + 1))} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body font-medium uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Days
              </label>
              <div className="flex items-center gap-4 mt-2">
                <button onClick={() => setDays(Math.max(2, days - 1))} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-2xl font-bold text-foreground w-8 text-center">{days}</span>
                <button onClick={() => setDays(Math.min(10, days + 1))} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs text-muted-foreground font-body font-medium uppercase tracking-wider mb-4 block">
              Budget per person
            </label>
            <Slider
              value={budget}
              onValueChange={setBudget}
              min={10000}
              max={200000}
              step={5000}
              className="mt-3"
            />
            <p className="text-right text-sm text-foreground font-semibold mt-2 font-body">
              ₹{budget[0].toLocaleString("en-IN")}
            </p>
          </div>

          {/* Travel Style */}
          <div>
            <label className="text-xs text-muted-foreground font-body font-medium uppercase tracking-wider mb-4 block">
              Travel Style
            </label>
            <div className="flex flex-wrap gap-3">
              {styles.map((s) => (
                <button
                  key={s}
                  onClick={() => { setStyle(s); setShowPlan(false); }}
                  className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                    style === s
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => setShowPlan(true)}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground btn-primary-glow transition-all duration-300 hover:brightness-110 font-body"
          >
            <Sparkles className="h-4 w-4" />
            Generate My Trip Plan
          </button>

          {/* Itinerary Preview */}
          {showPlan && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4 }}
              className="border-t border-border pt-6"
            >
              <h4 className="font-display text-lg font-bold text-foreground mb-4">
                Your {days}-Day {style} Itinerary
              </h4>
              <div className="space-y-3">
                {itinerary.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center font-body">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground font-body">Day {i + 1}</p>
                      <p className="text-sm text-muted-foreground font-body">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 font-body">
                Estimated cost: ₹{(budget[0] * travelers).toLocaleString("en-IN")} for {travelers} travelers
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TripBuilder;
