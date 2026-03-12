import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Star, Clock, MapPin, CheckCircle2, X, Calendar,
  Hotel, UtensilsCrossed, Ship, ShieldCheck, Phone, Mail, Info,
  Sparkles, MessageCircle, ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPackageBySlug } from "@/data/packageDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PackageDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pkg = getPackageBySlug(slug || "");
  const [activeDay, setActiveDay] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  const handleWhatsApp = () => {
    if (pkg) {
      const message = `Hi! I'm interested in booking the "${pkg.name}" package (${pkg.duration}, ${pkg.price}/person). Could you share more details?`;
      window.location.href = `https://wa.me/918637327297?text=${encodeURIComponent(message)}`;
    }
  };
  const handleCall = () => window.open("tel:+918637327297", "_self");
  const handleEmail = () => {
    if (pkg) {
      const subject = `Booking Inquiry: ${pkg.name} Package`;
      const body = `Hi,\n\nI'm interested in the "${pkg.name}" package (${pkg.duration}, ${pkg.price}/person).\n\nPlease share more details.\n\nThank you!`;
      window.open(`mailto:contact@andamanluxe.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self");
    }
  };
  const handleGoToContact = () => {
    if (pkg) {
      navigate(`/contact?package=${encodeURIComponent(pkg.name)}&duration=${encodeURIComponent(pkg.duration)}&price=${encodeURIComponent(pkg.price)}`);
    }
  };

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Package Not Found</h1>
          <button onClick={() => navigate("/book")} className="text-accent hover:underline">Back to Packages</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />

      <section className="pt-24 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Packages
          </button>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden h-64 md:h-96 mb-8"
          >
            <img src={pkg.heroImage} alt={pkg.name} className="w-full h-full object-cover" />
            {pkg.recommended && (
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Star className="h-4 w-4" fill="currentColor" /> RECOMMENDED
              </div>
            )}
          </motion.div>

          {/* Title & Price Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 md:p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{pkg.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-accent" /> {pkg.duration}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-accent" /> {pkg.islands}</span>
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent" fill="currentColor" />
                    ))}
                    <span className="ml-1">{pkg.rating} ({pkg.reviews} reviews)</span>
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-foreground/85">Starting from</p>
                <p className="text-3xl md:text-4xl font-bold text-accent">{pkg.price}</p>
                <p className="text-sm text-foreground/75">per person</p>
                <button onClick={() => setShowBooking(true)} className="mt-3 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:brightness-110 transition-all text-sm">
                  Book This Package
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mt-6">
              {pkg.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground border border-foreground/10 rounded-lg p-2.5 md:p-3">
                  <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-4 italic">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pkg.gallery.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden h-40 md:h-48">
                  <img src={img} alt={`${pkg.name} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Itinerary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 md:p-8 mb-8"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 italic">Detailed Itinerary</h2>
            
            {/* Day Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
              {pkg.itinerary.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                    activeDay === i
                      ? "bg-accent text-accent-foreground"
                      : "border border-foreground/10 text-muted-foreground hover:border-accent/50"
                  }`}
                >
                  Day {i + 1}
                </button>
              ))}
            </div>

            {/* Active Day Content */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-xl bg-accent/15 shrink-0">
                <Calendar className="h-4 w-4 md:h-6 md:w-6 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground">Day {activeDay + 1}</p>
                <h3 className="font-display text-base md:text-xl font-bold text-foreground mb-3 md:mb-4">{pkg.itinerary[activeDay].title}</h3>
                <ul className="space-y-2 md:space-y-3">
                  {pkg.itinerary[activeDay].activities.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-base text-muted-foreground">
                      <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-accent mt-1.5 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Included / Not Included */}
          <div className="grid grid-cols-2 gap-3 md:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl md:rounded-2xl p-3 md:p-8"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-green-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5 md:h-5 md:w-5 text-green-500" />
                </div>
                <h3 className="font-display text-xs md:text-xl font-bold text-foreground">Included</h3>
              </div>
              <ul className="space-y-1.5 md:space-y-3">
                {pkg.included.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 md:gap-3 text-[10px] md:text-base text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="glass-card rounded-xl md:rounded-2xl p-3 md:p-8"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-red-500/20">
                  <X className="h-3.5 w-3.5 md:h-5 md:w-5 text-red-500" />
                </div>
                <h3 className="font-display text-xs md:text-xl font-bold text-foreground">Not Included</h3>
              </div>
              <ul className="space-y-1.5 md:space-y-3">
                {pkg.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 md:gap-3 text-[10px] md:text-base text-muted-foreground">
                    <X className="h-3 w-3 md:h-4 md:w-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Hotel, label: "Accommodation", value: pkg.accommodation },
              { icon: UtensilsCrossed, label: "Meals", value: pkg.meals },
              { icon: Ship, label: "Transfers", value: pkg.transfers },
              { icon: ShieldCheck, label: "Safety", value: pkg.safety },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-5">
                <item.icon className="h-6 w-6 text-accent mb-3" />
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Important Info & Need Help */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-6">Important Information</h3>
              <ul className="space-y-3">
                {pkg.importantInfo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-muted-foreground">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-6">Need Help?</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call Us</p>
                    <p className="font-bold text-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Us</p>
                    <p className="font-bold text-foreground">info@andamanluxe.com</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const message = `Hi! I'd like to chat about the "${pkg.name}" package (${pkg.duration}, ${pkg.price}/person). Can you help me?`;
                  window.location.href = `https://wa.me/918637327297?text=${encodeURIComponent(message)}`;
                }}
                className="mt-6 w-full rounded-lg border border-foreground/10 py-3 text-sm font-semibold text-accent hover:bg-accent/5 transition-all"
              >
                Chat with Expert
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-foreground/10 z-50">
        <div className="container mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div>
            <h4 className="font-display font-bold text-foreground">{pkg.name}</h4>
            <p className="text-sm text-foreground/80">
              Starting from <span className="text-accent font-bold text-lg">{pkg.price}</span> per person
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg border border-foreground/10 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-all"
            >
              Back
            </button>
            <button onClick={() => setShowBooking(true)} className="rounded-lg bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:brightness-110 transition-all">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="sm:max-w-md rounded-2xl border-foreground/10 bg-card p-0 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent" />
          <div className="p-5 md:p-8">
            <DialogHeader className="text-center sm:text-center mb-4 md:mb-6">
              <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-accent/15 mx-auto mb-3 md:mb-4">
                <Sparkles className="h-5 w-5 md:h-7 md:w-7 text-accent" />
              </div>
              <DialogTitle className="font-display text-lg md:text-2xl font-bold text-foreground">You're Ready to Book!</DialogTitle>
              <DialogDescription className="text-xs md:text-base text-muted-foreground mt-2">
                Great choice! You've selected the <span className="font-semibold text-accent">{pkg?.name}</span> package ({pkg?.duration}, {pkg?.price}/person).
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

      <Footer />
    </div>
  );
};

export default PackageDetailPage;
