import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, X } from "lucide-react";
import { getPackageBySlug } from "@/data/packageDetails";

type SelectedPackage = {
  slug: string;
  name: string;
  duration: string;
  priceINR: string;
  priceUSD: string;
};

interface PackageDetailsModalProps {
  open: boolean;
  selectedPackage: SelectedPackage | null;
  isInternational: boolean;
  onClose: () => void;
  onCustomize: (pkg: SelectedPackage, requestType: "customize" | "book") => void;
}

export const PackageDetailsModal = ({
  open,
  selectedPackage,
  isInternational,
  onClose,
  onCustomize,
}: PackageDetailsModalProps) => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const packageDetails = selectedPackage ? getPackageBySlug(selectedPackage.slug) : null;

  const getPrice = (pkg: SelectedPackage) =>
    isInternational ? pkg.priceUSD : pkg.priceINR;

  const handleBookClick = () => {
    if (selectedPackage) {
      onCustomize(selectedPackage, "book");
    }
  };

  const handleCustomizeClick = () => {
    if (selectedPackage) {
      onCustomize(selectedPackage, "customize");
    }
  };

  const handleClose = () => {
    setBookingConfirmed(false);
    setActiveDay(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl rounded-2xl border-foreground/10 bg-card p-0 max-h-[90vh] overflow-y-auto">
        <div className="relative p-6 md:p-8 pb-8 md:pb-10">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 rounded-full p-2 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {!bookingConfirmed ? (
            <>
              {selectedPackage && packageDetails ? (
                <div className="space-y-6">
                  <div>
                    <DialogTitle className="font-display text-3xl font-bold text-foreground mb-3">
                      {selectedPackage.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      Duration: {selectedPackage.duration}
                    </p>
                    <p className="text-2xl font-bold text-accent mt-2">
                      {getPrice(selectedPackage)}
                      <span className="text-sm font-normal text-muted-foreground">
                        {" "}
                        per person
                      </span>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Package Highlights</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {packageDetails.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Detailed Itinerary</h3>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {packageDetails.itinerary.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveDay(i)}
                          className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                            activeDay === i
                              ? "bg-accent text-accent-foreground"
                              : "border border-foreground/10 text-muted-foreground hover:border-accent/40"
                          }`}
                        >
                          Day {i + 1}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg border border-foreground/10 bg-background/70 p-3">
                      <p className="font-semibold text-foreground">{packageDetails.itinerary[activeDay]?.title}</p>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {packageDetails.itinerary[activeDay]?.activities.map((activity, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-foreground/10 bg-card/70 p-4">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground">Included</h3>
                      </div>
                      <ul className="space-y-2.5">
                        {packageDetails.included.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-foreground/10 bg-card/70 p-4">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100">
                          <X className="h-5 w-5 text-red-500" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground">Not Included</h3>
                      </div>
                      <ul className="space-y-2.5">
                        {packageDetails.notIncluded.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={handleCustomizeClick}
                      className="flex-1 rounded-lg border border-accent/30 text-accent font-semibold py-3 hover:bg-accent/5 transition-colors"
                    >
                      Customize This Package
                    </button>
                    <button
                      onClick={handleBookClick}
                      className="flex-1 rounded-lg bg-accent text-accent-foreground font-semibold py-3 hover:bg-accent/90 transition-colors"
                    >
                      Book This Package
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Package details are unavailable.
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-green-500/15 mx-auto mb-4">
                <svg
                  className="h-6 w-6 md:h-8 md:w-8 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our team will contact you shortly to confirm your booking and
                share complete details.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 rounded-lg bg-accent text-accent-foreground font-semibold py-3 px-6 hover:bg-accent/90 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
