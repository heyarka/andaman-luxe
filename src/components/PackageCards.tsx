import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, CheckCircle2, Star, RefreshCw, MessageCircle, Phone, Mail, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import HorizontalScroll from "@/components/HorizontalScroll";
import honeymoon1 from "@/assets/honeymoon-1.jpg";
import honeymoon2 from "@/assets/honeymoon-2.jpg";
import honeymoon3 from "@/assets/honeymoon-3.jpg";

interface PackageCardsProps {
  tripType: string;
  profile?: string;
  onStartOver: () => void;
}

const honeymoonPackages = [
  { slug: "romantic-radhanagar-retreat", name: "Romantic Radhanagar Retreat", duration: "4D/3N", islands: "2 Islands", priceUSD: "$275", priceINR: "₹22,999", image: honeymoon1, recommended: false, features: ["Beachfront cottage stay", "Candlelit dinner at Radhanagar", "Couples spa at resort", "Sunset cruise at Chidiya Tapu"] },
  { slug: "island-romance-getaway", name: "Island Romance Getaway", duration: "6D/5N", islands: "3 Islands", priceUSD: "$469", priceINR: "₹38,999", image: honeymoon2, recommended: true, features: ["Private yacht sunset cruise", "Bioluminescent kayaking", "Couples photoshoot at Neil Island", "Luxury resort stay"] },
  { slug: "luxury-andaman-honeymoon", name: "Luxury Andaman Honeymoon", duration: "8D/7N", islands: "4 Islands", priceUSD: "$779", priceINR: "₹64,999", image: honeymoon3, recommended: false, features: ["Private yacht day trip", "Seaplane scenic flight", "Overwater villa experience", "Dedicated butler service"] },
];

const familyPackages = [
  { slug: "andaman-family-explorer", name: "Andaman Family Explorer", duration: "4D/3N", islands: "2 Islands", priceUSD: "$229", priceINR: "₹18,999", image: honeymoon1, recommended: false, features: ["Family-friendly resort with pool", "Glass-bottom boat at North Bay", "Cellular Jail heritage tour", "Radhanagar Beach day trip"] },
  { slug: "island-hopping-family-fun", name: "Island Hopping Family Fun", duration: "6D/5N", islands: "3 Islands", priceUSD: "$399", priceINR: "₹32,999", image: honeymoon2, recommended: true, features: ["Snorkeling for all ages", "Baratang Limestone Cave trek", "Bicycle tour of Neil Island", "Bioluminescent kayaking"] },
  { slug: "grand-andaman-family-vacation", name: "Grand Andaman Family Vacation", duration: "8D/7N", islands: "4 Islands", priceUSD: "$659", priceINR: "₹54,999", image: honeymoon3, recommended: false, features: ["Baratang Limestone Caves trip", "Private boat to secluded beach", "Intro scuba for teens", "All-inclusive dining"] },
];

const adventurePackages = [
  { slug: "thrill-seeker", name: "Andaman Thrill-Seeker Expedition", duration: "6D/5N", islands: "3 Islands", priceUSD: "$420", priceINR: "₹34,999", image: honeymoon1, recommended: true, features: ["Introductory Scuba Dive", "Night Kayaking in Mangroves", "Elephant Beach Jungle Trek", "Baratang Limestone Caves"] },
  { slug: "extreme-andaman-challenge", name: "Extreme Andaman Challenge", duration: "8D/7N", islands: "4 Islands", priceUSD: "$639", priceINR: "₹52,999", image: honeymoon2, recommended: false, features: ["PADI Open Water Certification", "Mud Volcano trek at Baratang", "Mangrove survival kayaking", "Jungle camping on Havelock"] },
  { slug: "ultimate-andaman-explorer", name: "Ultimate Andaman Explorer", duration: "10D/9N", islands: "5 Islands", priceUSD: "$899", priceINR: "₹74,999", image: honeymoon3, recommended: false, features: ["Helicopter scenic flight", "Barren Island volcano cruise", "Advanced scuba at Cinque Island", "Live-aboard boat experience"] },
];

const seniorPackages = [
  { slug: "peaceful-andaman-escape", name: "Peaceful Andaman Escape", duration: "5D/4N", islands: "2 Islands", priceUSD: "$299", priceINR: "₹24,999", image: honeymoon1, recommended: false, features: ["Accessible heritage tours", "Glass-bottom boat coral viewing", "Ayurvedic spa session", "Gentle Radhanagar Beach walk"] },
  { slug: "golden-andaman-retreat", name: "Golden Andaman Retreat", duration: "7D/6N", islands: "3 Islands", priceUSD: "$519", priceINR: "₹42,999", image: honeymoon2, recommended: true, features: ["Private AC car throughout", "Guided bird-watching walk", "Cooking class experience", "Sunset photography tour"] },
  { slug: "premium-andaman-leisure", name: "Premium Andaman Leisure", duration: "9D/8N", islands: "4 Islands", priceUSD: "$759", priceINR: "₹62,999", image: honeymoon3, recommended: false, features: ["Personal travel assistant", "Daily wellness program", "Ross Island heritage walk", "Sunset cruise experience"] },
];

function getPackages(tripType: string) {
  if (tripType.includes("Honeymoon")) return honeymoonPackages;
  if (tripType.includes("Family")) return familyPackages;
  if (tripType.includes("Friends") || tripType.includes("Adventure")) return adventurePackages;
  if (tripType.includes("Senior")) return seniorPackages;
  return honeymoonPackages;
}

const PackageCards = ({ tripType, profile = "Indian Resident", onStartOver }: PackageCardsProps) => {
  const packages = getPackages(tripType);
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = useState<typeof packages[0] | null>(null);
  const [focusedIdx, setFocusedIdx] = useState<number>(packages.findIndex(p => p.recommended) ?? 0);
  const getPrice = (pkg: typeof packages[0]) => isInternational ? pkg.priceUSD : pkg.priceINR;

  const handleBookClick = (pkg: typeof packages[0]) => { setSelectedPkg(pkg); };

  const handleGoToContact = () => {
    if (selectedPkg) {
      const price = getPrice(selectedPkg);
      navigate(`/contact?package=${encodeURIComponent(selectedPkg.name)}&duration=${encodeURIComponent(selectedPkg.duration)}&price=${encodeURIComponent(price)}`);
    }
  };

  const handleWhatsApp = () => {
    if (selectedPkg) {
      const price = getPrice(selectedPkg);
      const message = `Hi! I'm interested in booking the "${selectedPkg.name}" package (${selectedPkg.duration}, ${price} per person). Could you share more details?`;
      window.location.href = `https://wa.me/918637327297?text=${encodeURIComponent(message)}`;
    }
  };

  const handleCall = () => { window.open("tel:+918637327297", "_self"); };

  const handleEmail = () => {
    if (selectedPkg) {
      const price = getPrice(selectedPkg);
      const subject = `Booking Inquiry: ${selectedPkg.name} Package`;
      const body = `Hi,\n\nI'm interested in the "${selectedPkg.name}" package (${selectedPkg.duration}, ${price} per person).\n\nPlease share more details.\n\nThank you!`;
      window.open(`mailto:contact@andamanluxe.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6 md:mb-10">
        <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-accent/15 mx-auto mb-2 md:mb-4">
          <Star className="h-5 w-5 md:h-7 md:w-7 text-accent" />
        </div>
        <h1 className="font-display text-xl md:text-5xl font-bold text-foreground mb-1 md:mb-3">
          Your <span className="text-gradient-hero italic">Perfect Packages</span>
        </h1>
        <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4">Handpicked experiences curated just for you</p>
        <button onClick={onStartOver} className="inline-flex items-center gap-1.5 text-xs md:text-sm text-accent hover:text-accent/80 transition-colors font-medium">
          <RefreshCw className="h-3.5 w-3.5 md:h-4 md:w-4" /> Start Over
        </button>
      </div>

      {/* Package Cards - Horizontal scroll on mobile */}
      <div className="mb-6 md:mb-12">
        <HorizontalScroll className="md:grid-cols-3">
          {packages.map((pkg, i) => {
            const isFocused = focusedIdx === i;
            return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, scale: isFocused ? 1 : 0.92 }}
              transition={{ duration: 0.4, delay: i * 0.15, scale: { duration: 0.3 } }}
              onClick={() => setFocusedIdx(i)}
              className={`rounded-xl md:rounded-2xl overflow-hidden shrink-0 w-[75vw] md:w-auto snap-center cursor-pointer transition-all duration-300 ${
                isFocused
                  ? "border-2 border-accent shadow-lg shadow-accent/10 z-10"
                  : "border border-foreground/10 opacity-70"
              } bg-card`}
            >
              {pkg.recommended && (
                <div className="bg-accent text-accent-foreground text-center py-1.5 md:py-2 text-[10px] md:text-sm font-bold flex items-center justify-center gap-1.5">
                  <Star className="h-3 w-3 md:h-4 md:w-4" fill="currentColor" /> RECOMMENDED <Star className="h-3 w-3 md:h-4 md:w-4" fill="currentColor" />
                </div>
              )}

              <div className="h-32 md:h-48 overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 md:p-6">
                <h3 className="font-display text-sm md:text-xl font-bold text-foreground mb-1 md:mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-3 text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3 md:h-4 md:w-4" /> {pkg.duration}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3 md:h-4 md:w-4" /> {pkg.islands}</span>
                </div>

                <p className="mb-2 md:mb-4">
                  <span className="text-lg md:text-2xl font-bold text-accent">{getPrice(pkg)}</span>
                  <span className="text-[10px] md:text-sm text-muted-foreground"> per person</span>
                </p>

                <ul className="space-y-1 md:space-y-2 mb-4 md:mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 md:gap-2 text-[10px] md:text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBookClick(pkg)}
                  className={`w-full rounded-lg py-2 md:py-3 text-[10px] md:text-sm font-semibold transition-all mb-2 md:mb-3 ${
                    pkg.recommended ? "bg-accent text-accent-foreground hover:brightness-110" : "bg-accent/15 text-accent hover:bg-accent/25"
                  }`}
                >
                  Book This Package
                </button>
                <button
                  onClick={() => navigate(`/package/${pkg.slug}`)}
                  className="w-full rounded-lg py-2 md:py-3 text-[10px] md:text-sm font-semibold border border-foreground/10 text-foreground hover:bg-muted/50 transition-all"
                >
                  View Details
                </button>
              </div>
            </motion.div>
            );
          })}
        </HorizontalScroll>
      </div>

      {/* Booking Confirmation Dialog */}
      <Dialog open={!!selectedPkg} onOpenChange={(open) => !open && setSelectedPkg(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl border-foreground/10 bg-card p-0 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent" />
          <div className="p-5 md:p-8">
            <DialogHeader className="text-center sm:text-center mb-4 md:mb-6">
              <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-accent/15 mx-auto mb-3 md:mb-4">
                <Sparkles className="h-5 w-5 md:h-7 md:w-7 text-accent" />
              </div>
              <DialogTitle className="font-display text-lg md:text-2xl font-bold text-foreground">You're Ready to Book!</DialogTitle>
              <DialogDescription className="text-xs md:text-base text-muted-foreground mt-2">
                Great choice! You've selected the <span className="font-semibold text-accent">{selectedPkg?.name}</span> package ({selectedPkg?.duration}, {selectedPkg ? getPrice(selectedPkg) : ''}/person).
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 md:space-y-3">
              <button onClick={handleGoToContact} className="w-full rounded-xl bg-accent text-accent-foreground py-3 text-xs md:text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2">
                Fill Out Contact Form <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
              <div className="flex items-center gap-3 my-1">
                <div className="h-px flex-1 bg-foreground/10" />
                <span className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">or reach us directly</span>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <button onClick={handleWhatsApp} className="flex flex-col items-center gap-1.5 md:gap-2 rounded-xl border border-foreground/10 py-3 md:py-4 px-2 hover:bg-accent/5 hover:border-accent/30 transition-all">
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                  <span className="text-[10px] md:text-xs font-semibold text-foreground">WhatsApp</span>
                </button>
                <button onClick={handleCall} className="flex flex-col items-center gap-1.5 md:gap-2 rounded-xl border border-foreground/10 py-3 md:py-4 px-2 hover:bg-accent/5 hover:border-accent/30 transition-all">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                  <span className="text-[10px] md:text-xs font-semibold text-foreground">Call Us</span>
                </button>
                <button onClick={handleEmail} className="flex flex-col items-center gap-1.5 md:gap-2 rounded-xl border border-foreground/10 py-3 md:py-4 px-2 hover:bg-accent/5 hover:border-accent/30 transition-all">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                  <span className="text-[10px] md:text-xs font-semibold text-foreground">Email</span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Section */}
      <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
        <h3 className="font-display text-sm md:text-xl font-bold text-foreground mb-1 md:mb-2">Need Help Deciding?</h3>
        <p className="text-[10px] md:text-base text-muted-foreground mb-3 md:mb-6">Our travel experts are here to help you choose the perfect package</p>
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <button className="rounded-lg bg-accent text-accent-foreground px-4 py-2 md:px-8 md:py-3 text-[10px] md:text-sm font-semibold hover:brightness-110 transition-all">Talk to an Expert</button>
          <button onClick={() => navigate("/customize")} className="rounded-lg border border-foreground/10 text-foreground px-4 py-2 md:px-8 md:py-3 text-[10px] md:text-sm font-semibold hover:bg-muted/50 transition-all">Customize</button>
        </div>
      </div>
    </div>
  );
};

export default PackageCards;
