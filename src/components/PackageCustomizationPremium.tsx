import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Accessibility,
  BadgeCheck,
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
  X,
} from "lucide-react";
import { packageCustomizationData } from "@/data/packageCustomizationData";

type SelectedPackage = {
  slug: string;
  name: string;
  duration: string;
};

interface PackageCustomizationPremiumProps {
  open: boolean;
  selectedPackage: SelectedPackage | null;
  requestType?: "customize" | "book";
  onClose: () => void;
}

type TripPace = "Relaxed" | "Balanced" | "Adventure";
type StayClass = "Standard Resort" | "Deluxe Hotel" | "Luxury Villa" | "Premium Suite";
type MealPlan = "No Meals" | "Breakfast Only" | "Half Board" | "Full Board";
type TransferMode = "Shared Ferry + Shared Cab" | "Premium Ferry + Private Cab" | "Private Yacht + Luxury Cab";

type OptionCardProps = {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  badge?: string;
};

const islands = [
  "Havelock Island",
  "Neil Island",
  "Ross Island",
  "North Bay",
  "Baratang Island",
  "Long Island",
  "Rangat",
  "Diglipur",
];

const popularIslands = ["Havelock Island", "Neil Island"];

const activities = [
  "Scuba Diving",
  "Snorkeling",
  "Sea Walk",
  "Kayaking",
  "Mangrove Tour",
  "Sunset Cruise",
  "Jet Ski",
  "Glass Bottom Boat",
  "Trekking",
  "Photography Tour",
  "Fishing Charter",
  "Bioluminescence Tour",
];

const roomPreferences = [
  "Ocean View Room",
  "Interconnecting Rooms",
  "King Bed",
  "Twin Beds",
  "Ground Floor Room",
  "Quiet Zone",
];

const dietaryNeeds = ["Vegetarian", "Vegan", "Jain Meals", "Halal", "Gluten-Free", "Kids Menu"];

const addOns = [
  "Birthday Decoration",
  "Anniversary Setup",
  "Private Candlelight Dinner",
  "Proposal Setup",
  "Drone Photoshoot",
  "Travel Insurance",
  "Airport Lounge Access",
  "Local SIM + eSIM Help",
];

const supportNeeds = [
  "Wheelchair Access",
  "Senior-Friendly Itinerary",
  "Infant-Friendly Transfers",
  "On-Trip Doctor On Call",
  "Extra Break Days",
  "Flexible Check-In/Out",
];

const stayClassPrice: Record<StayClass, string> = {
  "Standard Resort": "$",
  "Deluxe Hotel": "$$",
  "Luxury Villa": "$$$",
  "Premium Suite": "$$$$",
};

function OptionCard({ label, description, selected, onClick, badge }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-xl border px-4 py-3 text-left transition-all ${
        selected
          ? "border-amber-400 bg-amber-50/80 shadow-[0_10px_24px_-16px_rgba(245,158,11,0.75)]"
          : "border-foreground/10 bg-background hover:border-amber-300/70"
      }`}
    >
      {badge ? (
        <span className="absolute left-2 top-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
          {badge}
        </span>
      ) : null}
      <p className={`text-sm font-semibold ${selected ? "text-amber-600" : "text-foreground"} ${badge ? "mt-3" : ""}`}>{label}</p>
      {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
      {selected ? <CheckCircle2 className="absolute right-2 top-2 h-4 w-4 text-amber-600" /> : null}
    </button>
  );
}

export const PackageCustomizationPremium = ({ open, selectedPackage, requestType = "customize", onClose }: PackageCustomizationPremiumProps) => {
  const packageDetails = selectedPackage
    ? (packageCustomizationData as Record<string, { includedDestinations: string[]; includedActivities: string[] }>)[selectedPackage.slug]
    : null;

  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [tripPace, setTripPace] = useState<TripPace>("Balanced");
  const [selectedIslands, setSelectedIslands] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [stayClass, setStayClass] = useState<StayClass>("Deluxe Hotel");
  const [mealPlan, setMealPlan] = useState<MealPlan>("Half Board");
  const [transferMode, setTransferMode] = useState<TransferMode>("Premium Ferry + Private Cab");
  const [selectedRoomPrefs, setSelectedRoomPrefs] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const [budgetPerPerson, setBudgetPerPerson] = useState("INR 45,000 - 75,000");
  const [specialRequests, setSpecialRequests] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setDays(7);
    setTravelers(2);
    setRooms(1);
    setTripPace("Balanced");
    setSelectedIslands(packageDetails?.includedDestinations?.length ? packageDetails.includedDestinations : ["Havelock Island", "Neil Island"]);
    setSelectedActivities(packageDetails?.includedActivities?.length ? packageDetails.includedActivities : ["Snorkeling"]);
    setStayClass("Deluxe Hotel");
    setMealPlan("Half Board");
    setTransferMode("Premium Ferry + Private Cab");
    setSelectedRoomPrefs(["Ocean View Room"]);
    setSelectedDietary([]);
    setSelectedAddOns([]);
    setSelectedSupport([]);
    setBudgetPerPerson("INR 45,000 - 75,000");
    setSpecialRequests("");
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setSubmitError("");
    setIsSubmitting(false);
    setSubmitted(false);
  }, [open, packageDetails]);

  const totalSelections = useMemo(() => {
    return selectedIslands.length + selectedActivities.length + selectedRoomPrefs.length + selectedDietary.length + selectedAddOns.length + selectedSupport.length;
  }, [selectedActivities.length, selectedAddOns.length, selectedDietary.length, selectedIslands.length, selectedRoomPrefs.length, selectedSupport.length]);

  const toggleFromList = (
    value: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const submitRequest = async () => {
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

    const packageName = selectedPackage?.name ?? "Custom Andaman Package";
    const duration = `${days} Days / ${Math.max(days - 1, 0)} Nights`;
    const subject = "New Custom Package Request - Andaman Luxe";
    const selectedIslandsText = selectedIslands.length ? selectedIslands.join(", ") : "None";
    const selectedActivitiesText = selectedActivities.length ? selectedActivities.join(", ") : "None";
    const roomPreferencesText = selectedRoomPrefs.length ? selectedRoomPrefs.join(", ") : "None";
    const dietaryNeedsText = selectedDietary.length ? selectedDietary.join(", ") : "None";
    const addOnsText = selectedAddOns.length ? selectedAddOns.join(", ") : "None";
    const supportNeedsText = selectedSupport.length ? selectedSupport.join(", ") : "None";

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
      `Duration: ${duration}`,
      `Travelers: ${travelers}`,
      `Rooms: ${rooms}`,
      `Trip Pace: ${tripPace}`,
      "",
      "Customization:",
      `Selected Islands: ${selectedIslandsText}`,
      `Selected Activities: ${selectedActivitiesText}`,
      "",
      `Accommodation: ${stayClass}`,
      `Meal Plan: ${mealPlan}`,
      `Transfer Mode: ${transferMode}`,
      `Room Preferences: ${roomPreferencesText}`,
      `Dietary Needs: ${dietaryNeedsText}`,
      `Celebrations & Add-ons: ${addOnsText}`,
      `Accessibility & Support: ${supportNeedsText}`,
      `Budget Comfort Range: ${budgetPerPerson}`,
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
    formData.append("duration", duration);
    formData.append("travelers", String(travelers));
    formData.append("rooms", String(rooms));
    formData.append("trip_pace", tripPace);
    formData.append("selected_islands", selectedIslandsText);
    formData.append("selected_activities", selectedActivitiesText);
    formData.append("accommodation", stayClass);
    formData.append("meal_plan", mealPlan);
    formData.append("transfer_mode", transferMode);
    formData.append("room_preferences", roomPreferencesText);
    formData.append("dietary_needs", dietaryNeedsText);
    formData.append("add_ons", addOnsText);
    formData.append("support_needs", supportNeedsText);
    formData.append("budget_range", budgetPerPerson);
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

      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-foreground/10 bg-card p-0 sm:max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_45%)]" />
          <div className="relative p-4 md:p-8">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-foreground/10 bg-background/80 p-2 hover:bg-muted"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6 md:mb-8 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50 p-4 md:p-6">
                  <div className="mb-2 flex items-center gap-2 text-amber-700">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Premium Planner</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Customize Your Package</h2>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    You&apos;re customizing: {selectedPackage?.name ?? "your selected package"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You can adjust this package before submitting your request.
                  </p>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-4">
                  <div className="rounded-xl border border-foreground/10 bg-background p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-600" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Duration</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="rounded-full border border-foreground/10 p-2" onClick={() => setDays((prev) => Math.max(3, prev - 1))}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-amber-600">{days}</p>
                        <p className="text-xs text-muted-foreground">Days / {days - 1} Nights</p>
                      </div>
                      <button className="rounded-full border border-foreground/10 p-2" onClick={() => setDays((prev) => Math.min(15, prev + 1))}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-foreground/10 bg-background p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-amber-600" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Travelers</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="rounded-full border border-foreground/10 p-2" onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-amber-600">{travelers}</p>
                        <p className="text-xs text-muted-foreground">People</p>
                      </div>
                      <button className="rounded-full border border-foreground/10 p-2" onClick={() => setTravelers((prev) => Math.min(20, prev + 1))}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-foreground/10 bg-background p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-amber-600" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rooms</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="rounded-full border border-foreground/10 p-2" onClick={() => setRooms((prev) => Math.max(1, prev - 1))}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-amber-600">{rooms}</p>
                        <p className="text-xs text-muted-foreground">Rooms Needed</p>
                      </div>
                      <button className="rounded-full border border-foreground/10 p-2" onClick={() => setRooms((prev) => Math.min(10, prev + 1))}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-foreground/10 bg-background p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-600" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Trip Style</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["Relaxed", "Balanced", "Adventure"] as TripPace[]).map((pace) => (
                        <button
                          key={pace}
                          onClick={() => setTripPace(pace)}
                          className={`rounded-md px-2 py-1 text-[11px] font-semibold ${tripPace === pace ? "bg-amber-500 text-white" : "border border-foreground/10 text-foreground"}`}
                        >
                          {pace}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Select Islands</h3>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {islands.map((island) => (
                        <OptionCard
                          key={island}
                          label={island}
                          selected={selectedIslands.includes(island)}
                          onClick={() => toggleFromList(island, selectedIslands, setSelectedIslands)}
                          badge={popularIslands.includes(island) ? "Popular" : undefined}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Waves className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Activities & Experiences</h3>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {activities.map((activity) => (
                        <OptionCard
                          key={activity}
                          label={activity}
                          selected={selectedActivities.includes(activity)}
                          onClick={() => toggleFromList(activity, selectedActivities, setSelectedActivities)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Accommodation</h3>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {(Object.keys(stayClassPrice) as StayClass[]).map((option) => (
                        <OptionCard
                          key={option}
                          label={option}
                          description={`Class: ${stayClassPrice[option]}`}
                          selected={stayClass === option}
                          onClick={() => setStayClass(option)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <UtensilsCrossed className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Meals & Dietary</h3>
                    </div>
                    <div className="mb-2 grid gap-2 sm:grid-cols-2">
                      {(["No Meals", "Breakfast Only", "Half Board", "Full Board"] as MealPlan[]).map((option) => (
                        <OptionCard
                          key={option}
                          label={option}
                          selected={mealPlan === option}
                          onClick={() => setMealPlan(option)}
                        />
                      ))}
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {dietaryNeeds.map((diet) => (
                        <OptionCard
                          key={diet}
                          label={diet}
                          selected={selectedDietary.includes(diet)}
                          onClick={() => toggleFromList(diet, selectedDietary, setSelectedDietary)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Car className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Transfers & Logistics</h3>
                    </div>
                    <div className="space-y-2">
                      {([
                        "Shared Ferry + Shared Cab",
                        "Premium Ferry + Private Cab",
                        "Private Yacht + Luxury Cab",
                      ] as TransferMode[]).map((mode) => (
                        <OptionCard
                          key={mode}
                          label={mode}
                          selected={transferMode === mode}
                          onClick={() => setTransferMode(mode)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <ConciergeBell className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Room Preferences</h3>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {roomPreferences.map((pref) => (
                        <OptionCard
                          key={pref}
                          label={pref}
                          selected={selectedRoomPrefs.includes(pref)}
                          onClick={() => toggleFromList(pref, selectedRoomPrefs, setSelectedRoomPrefs)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Celebrations & Add-ons</h3>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {addOns.map((item) => (
                        <OptionCard
                          key={item}
                          label={item}
                          selected={selectedAddOns.includes(item)}
                          onClick={() => toggleFromList(item, selectedAddOns, setSelectedAddOns)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Accessibility className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Accessibility & Support</h3>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {supportNeeds.map((item) => (
                        <OptionCard
                          key={item}
                          label={item}
                          selected={selectedSupport.includes(item)}
                          onClick={() => toggleFromList(item, selectedSupport, setSelectedSupport)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-foreground/10 bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">Budget Comfort Range</h3>
                    </div>
                    <div className="grid gap-2">
                      {[
                        "INR 20,000 - 45,000",
                        "INR 45,000 - 75,000",
                        "INR 75,000 - 120,000",
                        "INR 120,000+",
                      ].map((range) => (
                        <OptionCard
                          key={range}
                          label={range}
                          selected={budgetPerPerson === range}
                          onClick={() => setBudgetPerPerson(range)}
                        />
                      ))}
                    </div>
                  </section>
                </div>

                <section className="mt-4 rounded-2xl border border-foreground/10 bg-card p-4">
                  <h3 className="mb-2 font-display text-lg font-bold text-foreground">Special Requests (Optional)</h3>
                  <textarea
                    value={specialRequests}
                    onChange={(event) => setSpecialRequests(event.target.value)}
                    placeholder="Anything specific? Flight timings, accessibility, kids needs, celebrations, workation setup, or private experiences."
                    className="min-h-24 w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-300 focus:outline-none"
                  />
                </section>

                <section className="mt-4 rounded-2xl border border-foreground/10 bg-card p-4">
                  <h3 className="mb-3 font-display text-lg font-bold text-foreground">Contact Details</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Full Name *"
                      className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-300 focus:outline-none"
                      required
                    />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      placeholder="Phone Number / WhatsApp Number *"
                      className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-300 focus:outline-none"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email (Optional)"
                    className="mt-3 w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-300 focus:outline-none"
                  />
                </section>

                {submitError ? (
                  <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-foreground">
                    {submitError}
                  </div>
                ) : null}

                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50/40 p-4 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{totalSelections}</span> preferences selected • {days} days • {travelers} travelers • {rooms} rooms
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={submitRequest}
                      disabled={isSubmitting}
                      className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white hover:bg-amber-600"
                    >
                      {isSubmitting ? "Submitting..." : requestType === "book" ? "Submit Booking Request" : "Submit Custom Package Request"}
                    </button>
                    <button
                      onClick={onClose}
                      className="rounded-xl border border-foreground/15 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <CheckCircle2 className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">Customization Request Sent</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                  Your request has been submitted successfully. Our team will contact you shortly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white hover:bg-amber-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
