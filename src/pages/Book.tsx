import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Plane, Home, Users, Heart, Smile, Coffee, Calendar, User, Mail, Phone, MessageSquare, ArrowRight, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const profiles = [
  {
    icon: Globe,
    title: "International Traveler",
    description: "Visiting India from abroad",
  },
  {
    icon: Plane,
    title: "NRI (Non-Resident Indian)",
    description: "Coming home to explore India",
  },
  {
    icon: Home,
    title: "Indian Resident",
    description: "Exploring within India",
  },
];

const tripTypes = [
  { icon: Heart, title: "Honeymoon Couples", description: "Romantic escapes & intimate experiences" },
  { icon: Users, title: "Friends & Adventure", description: "Gen Z groups seeking thrills & fun" },
  { icon: Smile, title: "Family Vacation", description: "Parents with kids, all ages welcome" },
  { icon: Coffee, title: "Senior Travelers", description: "Relaxed pace, comfort & culture" },
];

const stepLabels = ["Choose Your Profile", "Select Your Travel Style", "Your Details"];

const Book = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<string | null>(null);
  const [tripType, setTripType] = useState<string | null>(null);

  const handleProfileSelect = (title: string) => {
    setProfile(title);
    setStep(2);
  };

  const handleTripSelect = (title: string) => {
    setTripType(title);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => {
                    if (s < step) setStep(s);
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    step >= s
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </button>
                {i < 2 && (
                  <div
                    className={`w-16 md:w-24 h-0.5 mx-2 transition-all ${
                      step > s ? "bg-accent" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mb-12">
            Step {step}: {stepLabels[step - 1]}
          </p>

          {/* Title */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            {step === 1 && (
              <>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
                  Let's Find Your <span className="text-accent italic">Perfect Trip</span>
                </h1>
                <p className="text-muted-foreground">First, tell us a little about yourself</p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
                  Who Are You <span className="text-accent italic">Traveling With?</span>
                </h1>
                <p className="text-muted-foreground">We'll curate the perfect experience for your group</p>
              </>
            )}
            {step === 3 && (
              <>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
                  Let's Find Your <span className="text-accent italic">Perfect Trip</span>
                </h1>
                <p className="text-muted-foreground">Almost there! Fill in your details</p>
              </>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Step 1: Profile */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {profiles.map((p) => (
                  <button
                    key={p.title}
                    onClick={() => handleProfileSelect(p.title)}
                    className={`glass-card rounded-2xl p-8 text-left transition-all hover:border-accent/50 hover:bg-accent/5 ${
                      profile === p.title ? "border-accent bg-accent/10" : ""
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 mb-5">
                      <p.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setStep(1)}
                  className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {tripTypes.map((t) => (
                    <button
                      key={t.title}
                      onClick={() => handleTripSelect(t.title)}
                      className={`glass-card rounded-2xl p-6 text-center transition-all hover:border-accent/50 hover:bg-accent/5 ${
                        tripType === t.title ? "border-accent bg-accent/10" : ""
                      }`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 mb-5 mx-auto">
                        <t.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-display text-base font-bold text-foreground mb-1">
                        {t.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{t.description}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Form */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
                  <form className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="text" placeholder="John" className="w-full rounded-lg border border-foreground/10 bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="text" placeholder="Doe" className="w-full rounded-lg border border-foreground/10 bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="email" placeholder="john@example.com" className="w-full rounded-lg border border-foreground/10 bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="tel" placeholder="+91 98765 43210" className="w-full rounded-lg border border-foreground/10 bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Travel Dates</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="text" placeholder="Select your preferred dates" className="w-full rounded-lg border border-foreground/10 bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <textarea rows={4} placeholder="Tell us about your dream trip..." className="w-full rounded-lg border border-foreground/10 bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground btn-primary-glow transition-all hover:brightness-110">
                        Send Message
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4 text-center">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
            Plan Your Journey
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Our travel experts are ready to create your perfect Andaman experience
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Phone",
                lines: ["+91 98765 43210", "+91 98765 43211"],
              },
              {
                title: "Email",
                lines: ["info@andamanluxe.com", "bookings@andamanluxe.com"],
              },
              {
                title: "Office",
                lines: ["Port Blair, Andaman & Nicobar Islands", "India - 744101"],
              },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 text-center">
                <h4 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h4>
                {item.lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Book;
