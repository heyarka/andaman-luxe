import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import heroBeachBg from "@/assets/hero-beach-bg.jpg";

const DiscountPopup = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  const digitsOnly = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (digitsOnly.length < 8) {
      toast({
        title: "Enter a valid phone number",
        description: "Please use at least 8 digits so our team can contact you.",
      });
      return;
    }

    toast({
      title: "10% offer unlocked",
      description: "Our travel team will contact you shortly.",
    });

    setOpen(false);
    navigate("/book", { state: { discountCode: "WELCOME10", phone: digitsOnly } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[96vw] max-w-md rounded-3xl border border-white/20 bg-slate-900 p-0 shadow-2xl overflow-hidden">
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBeachBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/65 to-slate-950/85" />

          <div className="relative p-6 sm:p-7">
            <div className="mb-4 inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/15 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100 backdrop-blur-md">
              10% OFF WELCOME OFFER
            </div>

            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="font-display text-4xl leading-[0.95] font-bold text-white drop-shadow-sm">
                Special Offer
              </DialogTitle>
              <DialogDescription className="text-sm text-white/80">
                Unlock exclusive deals for your Andaman trip.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-5 rounded-2xl border border-white/25 bg-white/15 p-4 backdrop-blur-xl">
              <label htmlFor="discount-phone" className="sr-only">
                Phone number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                <Input
                  id="discount-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                  className="h-12 rounded-xl border-white/30 bg-white/90 pl-10 text-base text-slate-800 placeholder:text-slate-500"
                  maxLength={20}
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 text-base font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] hover:from-amber-600 hover:to-orange-600"
              >
                Get 10% Offer
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-xs text-white/75">
                By submitting, you agree to receive trip updates and offer details.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountPopup;
