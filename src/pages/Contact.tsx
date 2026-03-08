import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const Contact = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", travelDates: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent!", description: "Our team will get back to you within 24 hours." });
      setForm({ firstName: "", lastName: "", email: "", phone: "", travelDates: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent border border-accent/30 rounded-full px-4 py-1.5 mb-4">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Plan Your <span className="text-gradient-hero italic">Journey</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our travel experts are ready to create your perfect Andaman experience
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Let's Create Magic Together
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-10">
                Whether you're planning a romantic getaway, family vacation, or adventure trip, our team will craft a bespoke experience tailored to your desires.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground mb-1">Phone</h4>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43211</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 shrink-0">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">info@andamanluxe.com</p>
                    <p className="text-sm text-muted-foreground">bookings@andamanluxe.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground mb-1">Office</h4>
                    <p className="text-sm text-muted-foreground">Port Blair, Andaman & Nicobar Islands</p>
                    <p className="text-sm text-muted-foreground">India - 744101</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">First Name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      maxLength={50}
                      className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Last Name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      maxLength={50}
                      className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    maxLength={100}
                    className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    maxLength={20}
                    className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Travel Dates</label>
                  <input
                    name="travelDates"
                    value={form.travelDates}
                    onChange={handleChange}
                    placeholder="e.g., March 15-22, 2026"
                    maxLength={50}
                    className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your dream vacation..."
                    maxLength={1000}
                    rows={4}
                    className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-lg bg-accent text-accent-foreground py-3 text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Contact;
