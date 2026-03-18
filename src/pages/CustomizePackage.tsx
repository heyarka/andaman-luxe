import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Accessibility,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  ConciergeBell,
  Heart,
  MapPin,
  Minus,
  Plus,
  Sparkles,
  UtensilsCrossed,
  Waves,
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
  { name: "Long Island", popular: false },
  { name: "Rangat", popular: false },
  { name: "Diglipur", popular: false },
];

const activities = [
  "Scuba Diving",
  "Snorkeling",
  "Sea Walk",
  "Kayaking",
  "Jet Ski",
  "Mangrove Tour",
  "Bioluminescence Tour",
  "Sunset Cruise",
  "Photography Tour",
  "Glass Bottom Boat",
  "Fishing Charter",
  "Island Hopping",
];

const accommodations = [
  { name: "Standard Resort", description: "Comfortable and clean", price: "$" },
  { name: "Deluxe Hotel", description: "Ocean view rooms", price: "$$" },
  { name: "Luxury Villa", description: "Private pool and beach", price: "$$$" },
  { name: "Premium Suite", description: "Butler and concierge", price: "$$$$" },
];

const mealPlans = [
  { name: "No Meals", description: "Explore local restaurants" },
  { name: "Breakfast Only", description: "Start your day right" },
  { name: "Half Board", description: "Breakfast and dinner included" },
  { name: "Full Board", description: "All meals included" },
];

const dietaryNeeds = ["Vegetarian", "Vegan", "Jain", "Halal", "Gluten-Free", "Kids Menu"];
const roomPreferences = ["Ocean View", "Interconnecting Rooms", "Twin Beds", "Ground Floor", "Quiet Room", "Bathtub"];
const transportModes = ["Shared Ferry + Shared Cab", "Premium Ferry + Private Cab", "Private Yacht + Luxury Cab"];
const specialAddOns = [
  "Birthday Decoration",
  "Anniversary Setup",
  "Private Candlelight Dinner",
  "Proposal Setup",
  "Drone Photoshoot",
  "Travel Insurance",
  "Late Check-out",
  "Workation Setup",
];
const supportOptions = [
  "Wheelchair Assistance",
  "Senior-Friendly Pace",
  "Infant Seat in Cab",
  "Doctor On Call",
  "Flexible Check-in",
  "Extra Rest Day",
];

const sectionClass = "rounded-3xl border border-foreground/10 bg-card/70 p-4 md:p-7 backdrop-blur-sm";
const selectedClass = "border-amber-400 bg-amber-50/80 text-amber-700 shadow-[0_14px_30px_-24px_rgba(245,158,11,0.9)]";
const unselectedClass = "border-foreground/10 bg-background hover:border-amber-300/70";

const CustomizePackage = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedIslands, setSelectedIslands] = useState<string[]>(["Havelock Island", "Neil Island"]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(["Snorkeling"]);
  const [selectedAccommodation, setSelectedAccommodation] = useState("Deluxe Hotel");
  const [selectedMeal, setSelectedMeal] = useState("Half Board");
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedRoomPrefs, setSelectedRoomPrefs] = useState<string[]>(["Ocean View"]);
  const [selectedTransport, setSelectedTransport] = useState("Premium Ferry + Private Cab");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState("INR 45,000 - 75,000");
  const [specialRequests, setSpecialRequests] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const toggleMultiSelect = (name: string, current: string[], setValue: (next: string[]) => void) => {
    setValue(current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  };

  const totalSelected = useMemo(() => {
    return (
      selectedIslands.length +
      selectedActivities.length +
      selectedDiet.length +
      selectedRoomPrefs.length +
      selectedAddOns.length +
      selectedSupport.length
    );
  }, [selectedActivities.length, selectedAddOns.length, selectedDiet.length, selectedIslands.length, selectedRoomPrefs.length, selectedSupport.length]);

  const handleSubmit = async () => {
    const normalizedName = fullName.trim();
    const normalizedPhone = phoneNumber.trim();
    const normalizedEmail = email.trim();
    const digitsOnlyPhone = normalizedPhone.replace(/\D/g, "");

    if (!normalizedName) {
      setSubmitError("Name is required.");
      return;
    }

    if (!normalizedPhone || digitsOnlyPhone.length < 8) {
      setSubmitError("Phone number is required and must be at least 8 digits.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const packageName = "Customize Your Dream Package";
    const durationText = `${duration} Days / ${Math.max(duration - 1, 0)} Nights`;
    const selectedIslandsText = selectedIslands.length ? selectedIslands.join(", ") : "None";
    const selectedActivitiesText = selectedActivities.length ? selectedActivities.join(", ") : "None";
    const roomPreferencesText = selectedRoomPrefs.length ? selectedRoomPrefs.join(", ") : "None";
    const dietaryNeedsText = selectedDiet.length ? selectedDiet.join(", ") : "None";
    const addOnsText = selectedAddOns.length ? selectedAddOns.join(", ") : "None";
    const supportNeedsText = selectedSupport.length ? selectedSupport.join(", ") : "None";
    const subject = "New Custom Package Request - Andaman Luxe";
    const clientCredentials = [
      `Name: ${normalizedName}`,
      `Phone / WhatsApp: ${normalizedPhone}`,
      `Email: ${normalizedEmail || "Not Provided"}`,
    ].join("\n");

    const message = [
      "Client Credentials:",
      `Name: ${normalizedName}`,
      `Phone / WhatsApp: ${normalizedPhone}`,
      `Email: ${normalizedEmail || "Not Provided"}`,
      "",
      "Package Details:",
      `Package Selected: ${packageName}`,
      `Duration: ${durationText}`,
      `Travelers: ${travelers}`,
      `Rooms: ${rooms}`,
      "",
      "Customization:",
      `Selected Islands: ${selectedIslandsText}`,
      `Selected Activities: ${selectedActivitiesText}`,
      `Accommodation: ${selectedAccommodation}`,
      `Meal Plan: ${selectedMeal}`,
      `Transfer Mode: ${selectedTransport}`,
      `Room Preferences: ${roomPreferencesText}`,
      `Dietary Needs: ${dietaryNeedsText}`,
      `Special Add-ons: ${addOnsText}`,
      `Accessibility & Support: ${supportNeedsText}`,
      `Budget Comfort Range: ${budgetRange}`,
      "",
      `Special Request: ${specialRequests.trim() || "None"}`,
    ].join("\n");

    const formData = new FormData();
    formData.append("access_key", "3b89840c-67a5-45d8-a4a4-342119d7c5de");
    formData.append("subject", subject);
    formData.append("from_name", normalizedName);
    formData.append("name", normalizedName);
    formData.append("phone", normalizedPhone);
    formData.append("whatsapp_number", normalizedPhone);
    formData.append("email", normalizedEmail || "not-provided@andamanluxe.local");
    formData.append("client_credentials", clientCredentials);
    formData.append("package_name", packageName);
    formData.append("duration", durationText);
    formData.append("travelers", String(travelers));
    formData.append("rooms", String(rooms));
    formData.append("selected_islands", selectedIslandsText);
    formData.append("selected_activities", selectedActivitiesText);
    formData.append("accommodation", selectedAccommodation);
    formData.append("meal_plan", selectedMeal);
    formData.append("transfer_mode", selectedTransport);
    formData.append("room_preferences", roomPreferencesText);
    formData.append("dietary_needs", dietaryNeedsText);
    formData.append("special_addons", addOnsText);
    formData.append("support_needs", supportNeedsText);
    formData.append("budget_range", budgetRange);
    formData.append("special_request", specialRequests.trim() || "None");
    formData.append("message", message);
    formData.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Web3Forms request failed");
      }

      toast({
        title: "Custom package request submitted",
        description: "Your request has been submitted successfully. Our team will contact you shortly.",
      });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-24 pt-28 md:px-6 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
              <Sparkles className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-5xl">
              Customize Your <span className="text-gradient-hero italic">Dream Package</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              Configure islands, experiences, stays, transfers, meals, and special services to build your perfect Andaman trip.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={sectionClass}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">Duration</h3>
              </div>
              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setDuration((prev) => Math.max(3, prev - 1))} className="rounded-full border border-foreground/10 p-3">
                  <Minus className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-600">{duration}</p>
                  <p className="text-sm text-muted-foreground">Days / {duration - 1} Nights</p>
                </div>
                <button onClick={() => setDuration((prev) => Math.min(20, prev + 1))} className="rounded-full border border-foreground/10 p-3">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={sectionClass}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <CheckCircle2 className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">Travelers</h3>
              </div>
              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setTravelers((prev) => Math.max(1, prev - 1))} className="rounded-full border border-foreground/10 p-3">
                  <Minus className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-600">{travelers}</p>
                  <p className="text-sm text-muted-foreground">People</p>
                </div>
                <button onClick={() => setTravelers((prev) => Math.min(20, prev + 1))} className="rounded-full border border-foreground/10 p-3">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={sectionClass}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <Building2 className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">Rooms</h3>
              </div>
              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setRooms((prev) => Math.max(1, prev - 1))} className="rounded-full border border-foreground/10 p-3">
                  <Minus className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-600">{rooms}</p>
                  <p className="text-sm text-muted-foreground">Rooms Needed</p>
                </div>
                <button onClick={() => setRooms((prev) => Math.min(12, prev + 1))} className="rounded-full border border-foreground/10 p-3">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="mt-4 grid gap-4">
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={sectionClass}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <MapPin className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">Select Islands to Visit</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                {islands.map((island) => {
                  const selected = selectedIslands.includes(island.name);
                  return (
                    <button
                      key={island.name}
                      onClick={() => toggleMultiSelect(island.name, selectedIslands, setSelectedIslands)}
                      className={`relative rounded-2xl border px-4 py-4 text-left transition-all ${selected ? selectedClass : unselectedClass}`}
                    >
                      {island.popular ? (
                        <span className="absolute left-2 top-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Popular</span>
                      ) : null}
                      {selected ? <CheckCircle2 className="absolute right-2 top-2 h-4 w-4 text-amber-600" /> : null}
                      <p className={`font-semibold ${island.popular ? "mt-4" : ""}`}>{island.name}</p>
                    </button>
                  );
                })}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={sectionClass}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <Waves className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">Activities and Experiences</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                {activities.map((activity) => {
                  const selected = selectedActivities.includes(activity);
                  return (
                    <button
                      key={activity}
                      onClick={() => toggleMultiSelect(activity, selectedActivities, setSelectedActivities)}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${selected ? selectedClass : unselectedClass}`}
                    >
                      <p className="font-semibold">{activity}</p>
                    </button>
                  );
                })}
              </div>
            </motion.section>

            <div className="grid gap-4 md:grid-cols-2">
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={sectionClass}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Building2 className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Accommodation Type</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {accommodations.map((item) => {
                    const selected = selectedAccommodation === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedAccommodation(item.name)}
                        className={`rounded-2xl border p-4 text-left transition-all ${selected ? selectedClass : unselectedClass}`}
                      >
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        <p className="mt-1 text-sm font-semibold text-amber-600">{item.price}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={sectionClass}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <UtensilsCrossed className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Meal Plan and Dietary</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {mealPlans.map((meal) => {
                    const selected = selectedMeal === meal.name;
                    return (
                      <button
                        key={meal.name}
                        onClick={() => setSelectedMeal(meal.name)}
                        className={`rounded-2xl border p-4 text-left transition-all ${selected ? selectedClass : unselectedClass}`}
                      >
                        <p className="font-semibold">{meal.name}</p>
                        <p className="text-xs text-muted-foreground">{meal.description}</p>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {dietaryNeeds.map((item) => {
                    const selected = selectedDiet.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleMultiSelect(item, selectedDiet, setSelectedDiet)}
                        className={`rounded-xl border px-3 py-2 text-left text-sm transition-all ${selected ? selectedClass : unselectedClass}`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={sectionClass}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Car className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Transfers and Logistics</h3>
                </div>
                <div className="grid gap-3">
                  {transportModes.map((mode) => {
                    const selected = selectedTransport === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => setSelectedTransport(mode)}
                        className={`rounded-2xl border px-4 py-3 text-left transition-all ${selected ? selectedClass : unselectedClass}`}
                      >
                        <p className="font-semibold">{mode}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className={sectionClass}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <ConciergeBell className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Room Preferences</h3>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {roomPreferences.map((item) => {
                    const selected = selectedRoomPrefs.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleMultiSelect(item, selectedRoomPrefs, setSelectedRoomPrefs)}
                        className={`rounded-xl border px-3 py-2 text-left text-sm transition-all ${selected ? selectedClass : unselectedClass}`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className={sectionClass}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Heart className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Special Add-ons</h3>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {specialAddOns.map((item) => {
                    const selected = selectedAddOns.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleMultiSelect(item, selectedAddOns, setSelectedAddOns)}
                        className={`rounded-xl border px-3 py-2 text-left text-sm transition-all ${selected ? selectedClass : unselectedClass}`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className={sectionClass}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Accessibility className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Accessibility and Support</h3>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {supportOptions.map((item) => {
                    const selected = selectedSupport.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleMultiSelect(item, selectedSupport, setSelectedSupport)}
                        className={`rounded-xl border px-3 py-2 text-left text-sm transition-all ${selected ? selectedClass : unselectedClass}`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className={sectionClass}>
              <h3 className="mb-4 font-display text-2xl font-bold text-foreground">Budget Comfort Range</h3>
              <div className="grid gap-2 md:grid-cols-4">
                {["INR 20,000 - 45,000", "INR 45,000 - 75,000", "INR 75,000 - 120,000", "INR 120,000+"].map((item) => {
                  const selected = budgetRange === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setBudgetRange(item)}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${selected ? selectedClass : unselectedClass}`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className={sectionClass}>
              <h3 className="mb-3 font-display text-2xl font-bold text-foreground">Special Requests (Optional)</h3>
              <textarea
                rows={4}
                maxLength={1000}
                value={specialRequests}
                onChange={(event) => setSpecialRequests(event.target.value)}
                placeholder="Any specific needs like celebrations, flight timing preferences, dietary care, accessibility, or workation setup..."
                className="w-full resize-none rounded-2xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-300 focus:outline-none"
              />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.675 }} className={sectionClass}>
              <h3 className="mb-3 font-display text-2xl font-bold text-foreground">Contact Details</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Full Name *"
                  className="w-full rounded-2xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-300 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="Phone Number / WhatsApp Number *"
                  className="w-full rounded-2xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-300 focus:outline-none"
                  required
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email (Optional)"
                className="mt-3 w-full rounded-2xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-300 focus:outline-none"
              />
            </motion.section>

            {submitError ? (
              <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-foreground">
                {submitError}
              </div>
            ) : null}

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-4 rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-display text-xl font-bold text-foreground">Ready for your personalized itinerary?</p>
                  <p className="text-sm text-muted-foreground">
                    {totalSelected} preferences selected • {duration}D/{duration - 1}N • {travelers} travelers • {rooms} rooms
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-3.5 text-sm font-extrabold tracking-wide text-white shadow-[0_18px_40px_-18px_rgba(245,158,11,0.95)] ring-2 ring-amber-300/60 transition-all duration-200 hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-600 hover:shadow-[0_22px_44px_-18px_rgba(245,158,11,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Custom Package Request"}
                  </button>
                  <button
                    onClick={() => navigate("/book")}
                    className="rounded-xl border border-foreground/15 bg-background px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomizePackage;
