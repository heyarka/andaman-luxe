import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const packageName = searchParams.get("package");
  const packageDuration = searchParams.get("duration");
  const packagePrice = searchParams.get("price");

  const prefillMessage = packageName
    ? `Hi, I'm interested in booking the "${packageName}" package (${packageDuration}, ${packagePrice}/person). Please get in touch with me to discuss further details.`
    : "";

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", travelDates: "", message: prefillMessage });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "3b89840c-67a5-45d8-a4a4-342119d7c5de",
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          travel_dates: form.travelDates,
          message: form.message,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: "Message sent!", description: "Our team will get back to you within 24 hours." });
        setForm({ firstName: "", lastName: "", email: "", phone: "", travelDates: "", message: "" });
      } else {
        toast({ title: "Failed to send message", description: "Please try again later.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-12 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/crew.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/40 to-slate-900/55" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="inline-block text-sm font-semibold uppercase tracking-wider text-white border border-white/45 rounded-full px-4 py-1.5 mb-4 backdrop-blur-sm bg-white/10">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-sm">
            Plan Your <span className="italic text-sky-200">Journey</span>
          </h1>
          <p className="text-white/90 max-w-xl mx-auto">
            Our travel experts are ready to create your perfect Andaman experience
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-6 pb-12 md:pb-20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Let's Create Magic Together
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-10">
                Whether you're planning a romantic getaway, family vacation, or adventure trip, our team will craft a bespoke experience tailored to your desires.
              </p>
              <div className="space-y-8">
                {[
                  { icon: Phone, title: "Phone", lines: ["+91 86373 27297"] },
                  { icon: Mail, title: "Email", lines: ["contact@andamanluxe.com"] },
                  { icon: MapPin, title: "Office", lines: ["Port Blair, Andaman & Nicobar Islands", "India - 744101"] },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 shrink-0">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground mb-1">{item.title}</h4>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm text-muted-foreground">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">First Name</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" maxLength={50} className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" maxLength={50} className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" maxLength={100} className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Phone</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" maxLength={20} className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Travel Dates</label>
                  <input name="travelDates" value={form.travelDates} onChange={handleChange} placeholder="e.g., March 15-22, 2026" maxLength={50} className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your dream vacation..." maxLength={1000} rows={4} className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none" />
                </div>
                <button type="submit" disabled={sending} className="btn-frosted-blue w-full rounded-lg py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send className="h-4 w-4" />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />
      <ReviewsSection />
      <SectionDivider />
      <Footer />
    </div>
  );
};

export default Contact;
