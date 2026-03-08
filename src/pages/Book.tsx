import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Plane, Home, Users, Heart, Smile, Coffee, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import HorizontalScroll from "@/components/HorizontalScroll";
import PackageCards from "@/components/PackageCards";

const profiles = [
  { icon: Globe, title: "International Traveler", description: "Visiting India from abroad" },
  { icon: Plane, title: "NRI (Non-Resident Indian)", description: "Coming home to explore India" },
  { icon: Home, title: "Indian Resident", description: "Exploring within India" },
];

const tripTypes = [
  { icon: Heart, title: "Honeymoon Couples", description: "Romantic escapes & intimate experiences" },
  { icon: Users, title: "Friends & Adventure", description: "Gen Z groups seeking thrills & fun" },
  { icon: Smile, title: "Family Vacation", description: "Parents with kids, all ages welcome" },
  { icon: Coffee, title: "Senior Travelers", description: "Relaxed pace, comfort & culture" },
];

const stepLabels = ["Choose Your Profile", "Select Your Travel Style", "Your Perfect Packages"];

const Book = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<string | null>(null);
  const [tripType, setTripType] = useState<string | null>(null);

  const handleProfileSelect = (title: string) => { setProfile(title); setStep(2); };
  const handleTripSelect = (title: string) => { setTripType(title); setStep(3); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-3 md:mb-4">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center">
                <button onClick={() => { if (s < step) setStep(s); }} className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full text-xs md:text-sm font-bold transition-all ${step >= s ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {step > s ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : s}
                </button>
                {i < 2 && <div className={`w-10 md:w-24 h-0.5 mx-1.5 md:mx-2 transition-all ${step > s ? "bg-accent" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] md:text-sm text-muted-foreground mb-6 md:mb-12">Step {step}: {stepLabels[step - 1]}</p>

          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-6 md:mb-12">
            {step === 1 && (
              <>
                <h1 className="font-display text-xl md:text-5xl font-bold text-foreground mb-1 md:mb-3">Let's Find Your <span className="text-gradient-hero italic">Perfect Trip</span></h1>
                <p className="text-xs md:text-base text-muted-foreground">First, tell us a little about yourself</p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="font-display text-xl md:text-5xl font-bold text-foreground mb-1 md:mb-3">Who Are You <span className="text-gradient-hero italic">Traveling With?</span></h1>
                <p className="text-xs md:text-base text-muted-foreground">We'll curate the perfect experience for your group</p>
              </>
            )}
            {step === 3 && null}
          </motion.div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}>
                <HorizontalScroll className="md:grid-cols-3">
                  {profiles.map((p) => (
                    <button
                      key={p.title}
                      onClick={() => handleProfileSelect(p.title)}
                      className={`glass-card rounded-xl md:rounded-2xl p-4 md:p-8 text-left transition-all hover:border-accent/50 hover:bg-accent/5 shrink-0 w-[70vw] md:w-auto snap-center ${profile === p.title ? "border-accent bg-accent/10" : ""}`}
                    >
                      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-accent/15 mb-3 md:mb-5">
                        <p.icon className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      </div>
                      <h3 className="font-display text-sm md:text-lg font-bold text-foreground mb-0.5 md:mb-1">{p.title}</h3>
                      <p className="text-[10px] md:text-sm text-muted-foreground">{p.description}</p>
                    </button>
                  ))}
                </HorizontalScroll>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}>
                <button onClick={() => setStep(1)} className="mb-4 md:mb-8 inline-flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" /> Back</button>
                <HorizontalScroll className="md:grid-cols-4">
                  {tripTypes.map((t) => (
                    <button
                      key={t.title}
                      onClick={() => handleTripSelect(t.title)}
                      className={`glass-card rounded-xl md:rounded-2xl p-4 md:p-6 text-center transition-all hover:border-accent/50 hover:bg-accent/5 shrink-0 w-[40vw] md:w-auto snap-center ${tripType === t.title ? "border-accent bg-accent/10" : ""}`}
                    >
                      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-accent/15 mb-3 md:mb-5 mx-auto">
                        <t.icon className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      </div>
                      <h3 className="font-display text-xs md:text-base font-bold text-foreground mb-0.5 md:mb-1">{t.title}</h3>
                      <p className="text-[9px] md:text-xs text-muted-foreground">{t.description}</p>
                    </button>
                  ))}
                </HorizontalScroll>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}>
                <button onClick={() => setStep(2)} className="mb-4 md:mb-8 inline-flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" /> Back</button>
                <PackageCards tripType={tripType || "Honeymoon Couples"} profile={profile || "Indian Resident"} onStartOver={() => { setStep(1); setProfile(null); setTripType(null); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SectionDivider />

      {/* Contact Info Section */}
      <section className="px-4 md:px-6 pb-8 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="container mx-auto max-w-4xl">
          <p className="text-[10px] md:text-sm font-semibold uppercase tracking-wider text-accent mb-2 md:mb-4 text-center">Get In Touch</p>
          <h2 className="font-display text-xl md:text-4xl font-bold text-foreground text-center mb-1 md:mb-3">Plan Your Journey</h2>
          <p className="text-xs md:text-base text-muted-foreground text-center mb-6 md:mb-12 max-w-xl mx-auto">Our travel experts are ready to create your perfect Andaman experience</p>
          <HorizontalScroll className="md:grid-cols-3">
            {[
              { title: "Phone", lines: ["+91 86373 27297"] },
              { title: "Email", lines: ["contact@andamanluxe.com"] },
              { title: "Office", lines: ["Port Blair, A&N Islands", "India - 744101"] },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 text-center shrink-0 w-[60vw] md:w-auto snap-center">
                <h4 className="font-display text-sm md:text-lg font-bold text-foreground mb-1 md:mb-3">{item.title}</h4>
                {item.lines.map((line) => (<p key={line} className="text-[10px] md:text-sm text-muted-foreground">{line}</p>))}
              </div>
            ))}
          </HorizontalScroll>
        </motion.div>
      </section>

      <SectionDivider />
      <ReviewsSection />
      <SectionDivider />
      <Footer />
    </div>
  );
};

export default Book;
