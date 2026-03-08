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
import honeymoon1 from "@/assets/honeymoon-1.jpg";
import honeymoon2 from "@/assets/honeymoon-2.jpg";
import honeymoon3 from "@/assets/honeymoon-3.jpg";

interface PackageCardsProps {
  tripType: string;
  profile?: string;
  onStartOver: () => void;
}

const honeymoonPackages = [
  { slug: "romantic-bliss", name: "Romantic Bliss", duration: "5D/4N", islands: "2 Islands", priceUSD: "$2,899", priceINR: "₹24,999", image: honeymoon1, recommended: false, features: ["Private beach villa with ocean view", "Candlelit dinner on the beach", "Couples spa & massage", "Sunset cruise for two"] },
  { slug: "paradise-romance", name: "Paradise Romance", duration: "7D/6N", islands: "3 Islands", priceUSD: "$4,999", priceINR: "₹42,999", image: honeymoon2, recommended: true, features: ["Luxury overwater bungalow", "Private yacht day tour", "Professional couple photoshoot", "Premium dining experiences", "Scuba diving for two"] },
  { slug: "ultimate-escape", name: "Ultimate Escape", duration: "10D/9N", islands: "4 Islands", priceUSD: "$7,999", priceINR: "₹67,999", image: honeymoon3, recommended: false, features: ["Presidential villa suite", "Helicopter island hopping", "Private chef & butler", "Unlimited spa treatments", "Exclusive beach access"] },
];

const familyPackages = [
  { slug: "family-fun", name: "Family Fun", duration: "5D/4N", islands: "2 Islands", priceUSD: "$1,999", priceINR: "₹16,999", image: honeymoon1, recommended: false, features: ["Family-friendly resort", "Kids activity programs", "Glass-bottom boat ride", "Beach picnic experience"] },
  { slug: "island-explorer", name: "Island Explorer", duration: "7D/6N", islands: "3 Islands", priceUSD: "$3,499", priceINR: "₹29,999", image: honeymoon2, recommended: true, features: ["Multi-island hopping tour", "Snorkeling for all ages", "Cultural village visits", "Mangrove kayaking", "Underwater sea walk"] },
  { slug: "grand-family", name: "Grand Family", duration: "10D/9N", islands: "4 Islands", priceUSD: "$5,999", priceINR: "₹49,999", image: honeymoon3, recommended: false, features: ["Premium family suite", "Private island day trip", "Adventure sports package", "Photography session", "All-inclusive dining"] },
];

const adventurePackages = [
  { slug: "thrill-seeker", name: "Thrill Seeker", duration: "4D/3N", islands: "2 Islands", priceUSD: "$1,499", priceINR: "₹12,999", image: honeymoon1, recommended: false, features: ["Scuba diving sessions", "Jet ski & parasailing", "Night beach bonfire", "Trekking expedition"] },
  { slug: "epic-adventure", name: "Epic Adventure", duration: "6D/5N", islands: "3 Islands", priceUSD: "$2,999", priceINR: "₹24,999", image: honeymoon2, recommended: true, features: ["Deep sea diving certification", "Island camping experience", "Kayaking & snorkeling", "Fishing trip", "Volcano mud trek"] },
  { slug: "ultimate-explorer", name: "Ultimate Explorer", duration: "9D/8N", islands: "5 Islands", priceUSD: "$5,499", priceINR: "₹45,999", image: honeymoon3, recommended: false, features: ["Helicopter tour", "Private speedboat", "Underwater photography", "Jungle survival camp", "Full adventure bundle"] },
];

const seniorPackages = [
  { slug: "serene-getaway", name: "Serene Getaway", duration: "5D/4N", islands: "2 Islands", priceUSD: "$2,199", priceINR: "₹18,999", image: honeymoon1, recommended: false, features: ["Comfortable resort stay", "Guided heritage walks", "Scenic boat cruise", "Wellness spa sessions"] },
  { slug: "golden-retreat", name: "Golden Retreat", duration: "7D/6N", islands: "3 Islands", priceUSD: "$3,799", priceINR: "₹31,999", image: honeymoon2, recommended: true, features: ["Premium accessible rooms", "Private car transfers", "Cultural excursions", "Gourmet dining", "Sunset photography tour"] },
  { slug: "platinum-leisure", name: "Platinum Leisure", duration: "10D/9N", islands: "4 Islands", priceUSD: "$6,499", priceINR: "₹54,999", image: honeymoon3, recommended: false, features: ["Luxury suite with sea view", "Personal travel assistant", "Daily wellness program", "Exclusive island tour", "All meals included"] },
];

function getPackages(tripType: string) {
  if (tripType.includes("Honeymoon")) return honeymoonPackages;
  if (tripType.includes("Family")) return familyPackages;
  if (tripType.includes("Friends") || tripType.includes("Adventure")) return adventurePackages;
  if (tripType.includes("Senior")) return seniorPackages;
  return honeymoonPackages;
}

const PackageCards = ({ tripType, onStartOver }: PackageCardsProps) => {
  const packages = getPackages(tripType);
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = useState<typeof packages[0] | null>(null);

  const whatsappNumber = "918637327297";

  const handleBookClick = (pkg: typeof packages[0]) => {
    setSelectedPkg(pkg);
  };

  const handleGoToContact = () => {
    if (selectedPkg) {
      navigate(`/contact?package=${encodeURIComponent(selectedPkg.name)}&duration=${encodeURIComponent(selectedPkg.duration)}&price=${encodeURIComponent(selectedPkg.price)}`);
    }
  };

  const handleWhatsApp = () => {
    if (selectedPkg) {
      const message = `Hi! I'm interested in booking the "${selectedPkg.name}" package (${selectedPkg.duration}, ${selectedPkg.price} per person). Could you share more details?`;
      window.location.href = `https://wa.me/918637327297?text=${encodeURIComponent(message)}`;
    }
  };

  const handleCall = () => {
    window.open("tel:+918637327297", "_self");
  };

  const handleEmail = () => {
    if (selectedPkg) {
      const subject = `Booking Inquiry: ${selectedPkg.name} Package`;
      const body = `Hi,\n\nI'm interested in the "${selectedPkg.name}" package (${selectedPkg.duration}, ${selectedPkg.price} per person).\n\nPlease share more details.\n\nThank you!`;
      window.open(`mailto:contact@andamanluxe.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 mx-auto mb-4">
          <Star className="h-7 w-7 text-accent" />
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
          Your <span className="text-gradient-hero italic">Perfect Packages</span>
        </h1>
        <p className="text-muted-foreground mb-4">Handpicked experiences curated just for you</p>
        <button
          onClick={onStartOver}
          className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
        >
          <RefreshCw className="h-4 w-4" /> Start Over
        </button>
      </div>

      {/* Package Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className={`rounded-2xl overflow-hidden ${
              pkg.recommended
                ? "border-2 border-accent shadow-lg shadow-accent/10"
                : "border border-foreground/10"
            } bg-card`}
          >
            {pkg.recommended && (
              <div className="bg-accent text-accent-foreground text-center py-2 text-sm font-bold flex items-center justify-center gap-2">
                <Star className="h-4 w-4" fill="currentColor" /> RECOMMENDED <Star className="h-4 w-4" fill="currentColor" />
              </div>
            )}

            <div className="h-48 overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {pkg.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {pkg.islands}
                </span>
              </div>

              <p className="mb-4">
                <span className="text-2xl font-bold text-accent">{pkg.price}</span>
                <span className="text-sm text-muted-foreground"> per person</span>
              </p>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBookClick(pkg)}
                className={`w-full rounded-lg py-3 text-sm font-semibold transition-all mb-3 ${
                  pkg.recommended
                    ? "bg-accent text-accent-foreground hover:brightness-110"
                    : "bg-accent/15 text-accent hover:bg-accent/25"
                }`}
              >
                Book This Package
              </button>
              <button
                onClick={() => navigate(`/package/${pkg.slug}`)}
                className="w-full rounded-lg py-3 text-sm font-semibold border border-foreground/10 text-foreground hover:bg-muted/50 transition-all"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Confirmation Dialog */}
      <Dialog open={!!selectedPkg} onOpenChange={(open) => !open && setSelectedPkg(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl border-foreground/10 bg-card p-0 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent" />

          <div className="p-6 md:p-8">
            <DialogHeader className="text-center sm:text-center mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 mx-auto mb-4">
                <Sparkles className="h-7 w-7 text-accent" />
              </div>
              <DialogTitle className="font-display text-2xl font-bold text-foreground">
                You're Ready to Book!
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2">
                Great choice! You've selected the{" "}
                <span className="font-semibold text-accent">{selectedPkg?.name}</span>{" "}
                package ({selectedPkg?.duration}, {selectedPkg?.price}/person). We'll take you to our contact section where you can share your details, or reach us directly.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              {/* Primary CTA: Go to Contact Form */}
              <button
                onClick={handleGoToContact}
                className="w-full rounded-xl bg-accent text-accent-foreground py-3.5 text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                Fill Out Contact Form
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="h-px flex-1 bg-foreground/10" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">or reach us directly</span>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>

              {/* Secondary options */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex flex-col items-center gap-2 rounded-xl border border-foreground/10 py-4 px-2 hover:bg-accent/5 hover:border-accent/30 transition-all"
                >
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  <span className="text-xs font-semibold text-foreground">WhatsApp</span>
                </button>
                <button
                  onClick={handleCall}
                  className="flex flex-col items-center gap-2 rounded-xl border border-foreground/10 py-4 px-2 hover:bg-accent/5 hover:border-accent/30 transition-all"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-xs font-semibold text-foreground">Call Us</span>
                </button>
                <button
                  onClick={handleEmail}
                  className="flex flex-col items-center gap-2 rounded-xl border border-foreground/10 py-4 px-2 hover:bg-accent/5 hover:border-accent/30 transition-all"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Email</span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Section */}
      <div className="glass-card rounded-2xl p-8 text-center">
        <h3 className="font-display text-xl font-bold text-foreground mb-2">Need Help Deciding?</h3>
        <p className="text-muted-foreground mb-6">Our travel experts are here to help you choose the perfect package</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="rounded-lg bg-accent text-accent-foreground px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all">
            Talk to an Expert
          </button>
          <button
            onClick={() => navigate("/customize")}
            className="rounded-lg border border-foreground/10 text-foreground px-8 py-3 text-sm font-semibold hover:bg-muted/50 transition-all"
          >
            Customize a Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCards;
