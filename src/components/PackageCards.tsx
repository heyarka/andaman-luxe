import { motion } from "framer-motion";
import { Clock, MapPin, CheckCircle2, Star, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import honeymoon1 from "@/assets/honeymoon-1.jpg";
import honeymoon2 from "@/assets/honeymoon-2.jpg";
import honeymoon3 from "@/assets/honeymoon-3.jpg";

interface PackageCardsProps {
  tripType: string;
  onStartOver: () => void;
}

const honeymoonPackages = [
  {
    name: "Romantic Bliss",
    duration: "5D/4N",
    islands: "2 Islands",
    price: "$2,899",
    image: honeymoon1,
    recommended: false,
    features: [
      "Private beach villa with ocean view",
      "Candlelit dinner on the beach",
      "Couples spa & massage",
      "Sunset cruise for two",
    ],
  },
  {
    name: "Paradise Romance",
    duration: "7D/6N",
    islands: "3 Islands",
    price: "$4,999",
    image: honeymoon2,
    recommended: true,
    features: [
      "Luxury overwater bungalow",
      "Private yacht day tour",
      "Professional couple photoshoot",
      "Premium dining experiences",
      "Scuba diving for two",
    ],
  },
  {
    name: "Ultimate Escape",
    duration: "10D/9N",
    islands: "4 Islands",
    price: "$7,999",
    image: honeymoon3,
    recommended: false,
    features: [
      "Presidential villa suite",
      "Helicopter island hopping",
      "Private chef & butler",
      "Unlimited spa treatments",
      "Exclusive beach access",
    ],
  },
];

const familyPackages = [
  {
    name: "Family Fun",
    duration: "5D/4N",
    islands: "2 Islands",
    price: "$1,999",
    image: honeymoon1,
    recommended: false,
    features: [
      "Family-friendly resort",
      "Kids activity programs",
      "Glass-bottom boat ride",
      "Beach picnic experience",
    ],
  },
  {
    name: "Island Explorer",
    duration: "7D/6N",
    islands: "3 Islands",
    price: "$3,499",
    image: honeymoon2,
    recommended: true,
    features: [
      "Multi-island hopping tour",
      "Snorkeling for all ages",
      "Cultural village visits",
      "Mangrove kayaking",
      "Underwater sea walk",
    ],
  },
  {
    name: "Grand Family",
    duration: "10D/9N",
    islands: "4 Islands",
    price: "$5,999",
    image: honeymoon3,
    recommended: false,
    features: [
      "Premium family suite",
      "Private island day trip",
      "Adventure sports package",
      "Photography session",
      "All-inclusive dining",
    ],
  },
];

const adventurePackages = [
  {
    name: "Thrill Seeker",
    duration: "4D/3N",
    islands: "2 Islands",
    price: "$1,499",
    image: honeymoon1,
    recommended: false,
    features: [
      "Scuba diving sessions",
      "Jet ski & parasailing",
      "Night beach bonfire",
      "Trekking expedition",
    ],
  },
  {
    name: "Epic Adventure",
    duration: "6D/5N",
    islands: "3 Islands",
    price: "$2,999",
    image: honeymoon2,
    recommended: true,
    features: [
      "Deep sea diving certification",
      "Island camping experience",
      "Kayaking & snorkeling",
      "Fishing trip",
      "Volcano mud trek",
    ],
  },
  {
    name: "Ultimate Explorer",
    duration: "9D/8N",
    islands: "5 Islands",
    price: "$5,499",
    image: honeymoon3,
    recommended: false,
    features: [
      "Helicopter tour",
      "Private speedboat",
      "Underwater photography",
      "Jungle survival camp",
      "Full adventure bundle",
    ],
  },
];

const seniorPackages = [
  {
    name: "Serene Getaway",
    duration: "5D/4N",
    islands: "2 Islands",
    price: "$2,199",
    image: honeymoon1,
    recommended: false,
    features: [
      "Comfortable resort stay",
      "Guided heritage walks",
      "Scenic boat cruise",
      "Wellness spa sessions",
    ],
  },
  {
    name: "Golden Retreat",
    duration: "7D/6N",
    islands: "3 Islands",
    price: "$3,799",
    image: honeymoon2,
    recommended: true,
    features: [
      "Premium accessible rooms",
      "Private car transfers",
      "Cultural excursions",
      "Gourmet dining",
      "Sunset photography tour",
    ],
  },
  {
    name: "Platinum Leisure",
    duration: "10D/9N",
    islands: "4 Islands",
    price: "$6,499",
    image: honeymoon3,
    recommended: false,
    features: [
      "Luxury suite with sea view",
      "Personal travel assistant",
      "Daily wellness program",
      "Exclusive island tour",
      "All meals included",
    ],
  },
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

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 mx-auto mb-4">
          <Star className="h-7 w-7 text-accent" />
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
          Your <span className="text-accent italic">Perfect Packages</span>
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
            {/* Recommended badge */}
            {pkg.recommended && (
              <div className="bg-accent text-accent-foreground text-center py-2 text-sm font-bold flex items-center justify-center gap-2">
                <Star className="h-4 w-4" fill="currentColor" /> RECOMMENDED <Star className="h-4 w-4" fill="currentColor" />
              </div>
            )}

            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
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
                className={`w-full rounded-lg py-3 text-sm font-semibold transition-all mb-3 ${
                  pkg.recommended
                    ? "bg-accent text-accent-foreground hover:brightness-110"
                    : "bg-accent/15 text-accent hover:bg-accent/25"
                }`}
              >
                Book This Package
              </button>
              <button className="w-full rounded-lg py-3 text-sm font-semibold border border-foreground/10 text-foreground hover:bg-muted/50 transition-all">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

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
