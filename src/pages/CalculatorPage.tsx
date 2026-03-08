import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, MapPin, Minus, Plus, Hotel, UtensilsCrossed, Waves, ShieldCheck, ArrowLeft, ArrowRight, Sparkles, Plane, CheckCircle2, ShoppingBag, Fish, Anchor, Wind, Ship, Sailboat, Camera, Flame, Sofa, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import honeymoon1 from "@/assets/honeymoon-1.jpg";
import honeymoon2 from "@/assets/honeymoon-2.jpg";
import honeymoon3 from "@/assets/honeymoon-3.jpg";

const destinations = [
  { name: "Port Blair", desc: "Capital & History Hub", cost: 3500, image: honeymoon1 },
  { name: "Havelock Island", desc: "Beaches & Diving", cost: 4000, image: honeymoon2 },
  { name: "Neil Island", desc: "Pristine & Serene", cost: 2500, image: honeymoon3 },
  { name: "Baratang", desc: "Caves & Mangroves", cost: 5000, image: honeymoon1 },
  { name: "Diglipur", desc: "Nature & Turtle Nesting", cost: 10000, image: honeymoon2 },
  { name: "Little Andaman", desc: "Surfing & Wildlife", cost: 4000, image: honeymoon3 },
];

const hotelTiers = [
  { name: "Budget", desc: "Clean & comfortable stays", multiplier: 1 },
  { name: "Standard", desc: "3-star quality hotels", multiplier: 1.5 },
  { name: "Premium", desc: "4-star luxury resorts", multiplier: 2.2 },
  { name: "Ultra Luxury", desc: "5-star world-class", multiplier: 3.5 },
];

const mealPlans = [
  { name: "No Meals", desc: "Explore on your own", cost: 0 },
  { name: "Breakfast Only", desc: "Start your day right", cost: 400 },
  { name: "Half Board", desc: "Breakfast + Dinner", cost: 900 },
  { name: "Full Board", desc: "All meals included", cost: 1400 },
];

const activities = [
  { name: "Scuba Diving", cost: 5000, icon: Fish, popular: true },
  { name: "Sea Walking", cost: 4000, icon: Anchor, popular: false },
  { name: "Snorkeling", cost: 1500, icon: Waves, popular: true },
  { name: "Parasailing", cost: 3500, icon: Wind, popular: false },
  { name: "Night Kayaking", cost: 3500, icon: Sailboat, popular: true },
  { name: "Glass Bottom Boat", cost: 2500, icon: Ship, popular: false },
  { name: "Jet Ski Ride", cost: 1500, icon: Waves, popular: false },
  { name: "Semi Submarine", cost: 2500, icon: Anchor, popular: false },
  { name: "Sofa Ride", cost: 1000, icon: Sofa, popular: false },
  { name: "Banana Ride", cost: 1000, icon: Waves, popular: false },
  { name: "Candlelight Dinner", cost: 8000, icon: Flame, popular: false },
  { name: "Photography Tour", cost: 6000, icon: Camera, popular: false },
];

const extras = [
  { name: "Travel Insurance", cost: 1000, desc: "Comprehensive coverage" },
  { name: "Photography Package", cost: 5000, desc: "Professional shoot" },
  { name: "Airport Transfers", cost: 2000, desc: "Private pickup & drop" },
  { name: "SIM Card & WiFi", cost: 500, desc: "Stay connected" },
];

const tabs = ["Trip", "Stay", "Fun", "Extras"];

const CalculatorPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDest, setSelectedDest] = useState<number[]>([0, 1, 2]);
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(5);
  const [hotelTier, setHotelTier] = useState(1);
  const [mealPlan, setMealPlan] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<number[]>([0, 1]);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([0]);
  const [includeFlights, setIncludeFlights] = useState(false);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [miscPercent, setMiscPercent] = useState(10);

  const toggleDest = (i: number) =>
    setSelectedDest((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  const toggleActivity = (i: number) =>
    setSelectedActivities((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  const toggleExtra = (i: number) =>
    setSelectedExtras((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const estimate = useMemo(() => {
    const destCost = selectedDest.reduce((sum, i) => sum + destinations[i].cost, 0);
    const accommodation = Math.round((destCost * hotelTiers[hotelTier].multiplier * days) / (selectedDest.length || 1));
    const meals = mealPlans[mealPlan].cost * days * travelers;
    const transfers = 2000 * travelers;
    const ferry = 1800 * selectedDest.length * travelers;
    const actCost = selectedActivities.reduce((sum, i) => sum + activities[i].cost, 0) * travelers;
    const extCost = selectedExtras.reduce((sum, i) => sum + extras[i].cost, 0) * travelers;
    const flights = includeFlights ? 12000 * travelers : 0;
    const insurance = includeInsurance ? 500 * travelers : 0;
    const subtotal = accommodation + meals + transfers + ferry + actCost + extCost + flights + insurance;
    const misc = Math.round(subtotal * (miscPercent / 100));
    const gst = Math.round((subtotal + misc) * 0.05);
    const total = subtotal + misc + gst;

    return { accommodation, meals, transfers, ferry, activities: actCost, flights, insurance, misc, gst, total };
  }, [selectedDest, travelers, days, hotelTier, mealPlan, selectedActivities, selectedExtras, includeFlights, includeInsurance, miscPercent]);

  const breakdown = [
    { label: "Accommodation", value: estimate.accommodation, color: "bg-accent" },
    { label: "Meals", value: estimate.meals, color: "bg-green-500" },
    { label: "Transfers (Cabs)", value: estimate.transfers, color: "bg-green-500" },
    { label: "Ferry Tickets", value: estimate.ferry, color: "bg-green-500" },
    { label: "Activities", value: estimate.activities, color: "bg-green-500" },
    { label: "Flights", value: estimate.flights, color: "bg-blue-500" },
    { label: "Insurance", value: estimate.insurance, color: "bg-green-500" },
    { label: "Misc. Budget", value: estimate.misc, color: "bg-pink-500" },
    { label: "GST (5%)", value: estimate.gst, color: "bg-muted-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-8 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 mx-auto mb-4">
            <Calculator className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
            Plan Your <span className="text-gradient-hero italic">Dream Escape</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Calculate your perfect Andaman getaway with our interactive cost estimator. Customize every detail and get instant pricing for 2025-2026.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Left: Tabs & Content */}
            <div>
              {/* Tabs */}
              <div className="grid grid-cols-4 gap-1 bg-muted/30 rounded-xl p-1 mb-8">
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`rounded-lg py-3 text-sm font-semibold transition-all ${
                      activeTab === i
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab: Trip */}
              {activeTab === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="font-display text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" /> Where do you want to go?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {destinations.map((d, i) => (
                      <button
                        key={d.name}
                        onClick={() => toggleDest(i)}
                        className={`rounded-xl overflow-hidden border transition-all text-left ${
                          selectedDest.includes(i)
                            ? "border-accent bg-accent/5"
                            : "border-foreground/10 hover:border-accent/30"
                        }`}
                      >
                        <div className="h-28 overflow-hidden relative">
                          <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                          {selectedDest.includes(i) && (
                            <div className="absolute top-2 right-2 h-6 w-6 bg-accent rounded-full flex items-center justify-center">
                              <span className="text-accent-foreground text-xs font-bold">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold text-foreground text-sm">{d.name}</h4>
                          <p className="text-xs text-muted-foreground">{d.desc}</p>
                          <p className="text-xs text-accent font-semibold mt-1">₹{d.cost.toLocaleString()}/day</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Travelers & Days */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-5">
                      <p className="text-sm text-muted-foreground mb-3">How many travelers?</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="h-10 w-10 rounded-lg border border-foreground/10 flex items-center justify-center hover:bg-muted/50 shrink-0">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-2xl font-bold text-accent w-8 text-center">{travelers}</span>
                        <button onClick={() => setTravelers(Math.min(20, travelers + 1))} className="h-10 w-10 rounded-lg border border-foreground/10 flex items-center justify-center hover:bg-muted/50 shrink-0">
                          <Plus className="h-4 w-4" />
                        </button>
                        <span className="text-sm text-muted-foreground">persons</span>
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-5">
                      <p className="text-sm text-muted-foreground mb-3">How long is your trip?</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setDays(Math.max(2, days - 1))} className="h-10 w-10 rounded-lg border border-foreground/10 flex items-center justify-center hover:bg-muted/50 shrink-0">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-2xl font-bold text-accent w-8 text-center">{days}</span>
                        <button onClick={() => setDays(Math.min(21, days + 1))} className="h-10 w-10 rounded-lg border border-foreground/10 flex items-center justify-center hover:bg-muted/50 shrink-0">
                          <Plus className="h-4 w-4" />
                        </button>
                        <span className="text-sm text-muted-foreground">days</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab: Stay */}
              {activeTab === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="font-display text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" /> Choose your accommodation
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {hotelTiers.map((h, i) => (
                      <button
                        key={h.name}
                        onClick={() => setHotelTier(i)}
                        className={`glass-card rounded-xl p-5 text-left transition-all ${
                          hotelTier === i ? "border-accent bg-accent/5" : "hover:border-accent/30"
                        }`}
                      >
                        <Hotel className="h-6 w-6 text-accent mb-2" />
                        <h4 className="font-bold text-foreground">{h.name}</h4>
                        <p className="text-xs text-muted-foreground">{h.desc}</p>
                      </button>
                    ))}
                  </div>

                  <h3 className="font-display text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" /> Select meal plan
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {mealPlans.map((m, i) => (
                      <button
                        key={m.name}
                        onClick={() => setMealPlan(i)}
                        className={`glass-card rounded-xl p-5 text-left transition-all ${
                          mealPlan === i ? "border-accent bg-accent/5" : "hover:border-accent/30"
                        }`}
                      >
                        <UtensilsCrossed className="h-6 w-6 text-accent mb-2" />
                        <h4 className="font-bold text-foreground">{m.name}</h4>
                        <p className="text-xs text-muted-foreground">{m.desc}</p>
                        {m.cost > 0 && <p className="text-xs text-accent font-semibold mt-1">₹{m.cost}/person/day</p>}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab: Fun */}
              {activeTab === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="font-display text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" /> Pick your activities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activities.map((a, i) => (
                      <button
                        key={a.name}
                        onClick={() => toggleActivity(i)}
                        className={`glass-card rounded-xl p-4 flex items-center gap-3 text-left transition-all ${
                          selectedActivities.includes(i) ? "border-accent bg-accent/5" : "hover:border-accent/30"
                        }`}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${
                          selectedActivities.includes(i) ? "bg-accent/20" : "bg-muted/50"
                        }`}>
                          <a.icon className={`h-5 w-5 ${selectedActivities.includes(i) ? "text-accent" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-bold text-foreground text-sm">{a.name}</h4>
                            {a.popular && (
                              <span className="text-[10px] font-bold bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                                <Star className="h-2.5 w-2.5" fill="currentColor" /> Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-accent font-semibold mt-0.5">+₹{a.cost.toLocaleString()}/person</p>
                        </div>
                        {selectedActivities.includes(i) && (
                          <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab: Extras */}
              {activeTab === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Add-ons */}
                  <h3 className="font-display text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" /> Add-ons & extras
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {extras.map((e, i) => (
                      <button
                        key={e.name}
                        onClick={() => toggleExtra(i)}
                        className={`glass-card rounded-xl p-5 text-left transition-all ${
                          selectedExtras.includes(i) ? "border-accent bg-accent/5" : "hover:border-accent/30"
                        }`}
                      >
                        <ShieldCheck className="h-6 w-6 text-accent mb-2" />
                        <h4 className="font-bold text-foreground">{e.name}</h4>
                        <p className="text-xs text-muted-foreground">{e.desc}</p>
                        <p className="text-xs text-accent font-semibold mt-1">₹{e.cost.toLocaleString()}/person</p>
                      </button>
                    ))}
                  </div>

                  {/* Travel Essentials */}
                  <h3 className="font-display text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" /> Travel Essentials
                  </h3>
                  <div className="space-y-4 mb-10">
                    <button
                      onClick={() => setIncludeFlights(!includeFlights)}
                      className={`w-full glass-card rounded-xl p-5 flex items-center justify-between transition-all ${
                        includeFlights ? "border-accent bg-accent/5" : "hover:border-accent/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Plane className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div className="text-left min-w-0">
                          <h4 className="font-bold text-foreground text-sm">Include Flight Estimates</h4>
                          <p className="text-xs text-muted-foreground">Approx. ₹12,000/person round-trip</p>
                        </div>
                      </div>
                      <div className={`h-7 w-12 rounded-full transition-all flex items-center px-0.5 shrink-0 ${includeFlights ? "bg-accent" : "bg-muted"}`}>
                        <div className={`h-6 w-6 rounded-full bg-background shadow transition-transform ${includeFlights ? "translate-x-5" : "translate-x-0"}`} />
                      </div>
                    </button>

                    <button
                      onClick={() => setIncludeInsurance(!includeInsurance)}
                      className={`w-full glass-card rounded-xl p-5 flex items-center justify-between transition-all ${
                        includeInsurance ? "border-accent bg-accent/5" : "hover:border-accent/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <ShieldCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div className="text-left min-w-0">
                          <h4 className="font-bold text-foreground text-sm">Add Travel Insurance</h4>
                          <p className="text-xs text-muted-foreground">₹500/person - Recommended</p>
                        </div>
                      </div>
                      <div className={`h-7 w-12 rounded-full transition-all flex items-center px-0.5 shrink-0 ${includeInsurance ? "bg-accent" : "bg-muted"}`}>
                        <div className={`h-6 w-6 rounded-full bg-background shadow transition-transform ${includeInsurance ? "translate-x-5" : "translate-x-0"}`} />
                      </div>
                    </button>
                  </div>

                  {/* Miscellaneous Budget */}
                  <h3 className="font-display text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" /> Miscellaneous Budget
                  </h3>
                  <div className="glass-card rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4 gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <ShoppingBag className="h-5 w-5 text-accent shrink-0" />
                        <h4 className="font-bold text-foreground text-sm truncate">Extra Budget (Shopping, Tips, Snacks)</h4>
                      </div>
                      <span className="text-sm font-bold text-accent bg-accent/15 px-3 py-1 rounded-lg shrink-0">{miscPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={1}
                      value={miscPercent}
                      onChange={(e) => setMiscPercent(Number(e.target.value))}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0%</span>
                      <span>10%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Nav Buttons */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                  disabled={activeTab === 0}
                  className="inline-flex items-center gap-2 rounded-lg border border-foreground/10 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-all disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={() => setActiveTab(Math.min(3, activeTab + 1))}
                  disabled={activeTab === 3}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-30"
                >
                  Next Step <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right: Estimate Sidebar */}
            <div className="lg:sticky lg:top-24 h-fit">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display text-xl font-bold text-foreground">Your Estimate</h3>
                  <Calculator className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-6">Detailed cost breakdown</p>

                {/* Total */}
                <div className="rounded-xl bg-accent/10 p-5 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Total Estimated Cost</p>
                  <p className="text-3xl font-bold text-accent">₹{estimate.total.toLocaleString()}</p>
                </div>

                {/* Progress bar */}
                <div className="h-2 rounded-full bg-muted/30 mb-6 overflow-hidden flex">
                  {breakdown.map((b, i) => {
                    const pct = estimate.total > 0 ? (b.value / estimate.total) * 100 : 0;
                    return pct > 0 ? (
                      <div key={i} className={`${b.color} h-full`} style={{ width: `${pct}%` }} />
                    ) : null;
                  })}
                </div>

                {/* Line items */}
                <div className="space-y-3 mb-6">
                  {breakdown.map((b) => (
                    <div key={b.label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span className={`h-2 w-2 rounded-full ${b.color}`} />
                        {b.label}
                      </span>
                      <span className="font-semibold text-foreground">₹{b.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full rounded-lg bg-accent text-accent-foreground py-3 text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" /> Book Now & Finalize
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default CalculatorPage;
