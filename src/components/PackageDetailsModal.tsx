import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, X, AlertCircle } from "lucide-react";
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
      <DialogContent className="w-[98vw] max-w-lg sm:max-w-2xl rounded-3xl sm:rounded-2xl border-foreground/10 bg-card p-0 h-[95vh] max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex flex-col h-full w-full">
          <div className="relative p-2.5 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4 border-b border-foreground/5">
            <button
              onClick={handleClose}
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 rounded-full p-1.5 hover:bg-foreground/10 transition-colors z-20 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>

            {selectedPackage && (
              <div className="pr-8">
                <DialogTitle className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight">
                  {selectedPackage.name}
                </DialogTitle>
                <div className="flex items-baseline gap-2 mt-0.5 sm:mt-1">
                  <p className="text-lg sm:text-xl font-bold text-accent">
                    {getPrice(selectedPackage)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedPackage.duration}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-y-auto flex-1 p-2.5 sm:p-4 min-h-0">
            {!bookingConfirmed ? (
              <>
                {selectedPackage && packageDetails ? (
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-xs sm:text-sm">Package Highlights</h3>
                      <ul className="space-y-0.5 text-xs text-muted-foreground">
                        {packageDetails.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-1.5">
                            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-accent flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-xs sm:text-sm">Itinerary</h3>
                      <div className="flex gap-1 overflow-x-auto pb-1">
                        {packageDetails.itinerary.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveDay(i)}
                            className={`shrink-0 rounded px-1.5 py-0.5 text-xs transition-colors whitespace-nowrap font-semibold ${
                              activeDay === i
                                ? "bg-accent text-accent-foreground"
                                : "border border-foreground/10 text-muted-foreground hover:border-accent/40"
                            }`}
                          >
                            Day {i + 1}
                          </button>
                        ))}
                      </div>
                      <div className="mt-1 rounded-lg border border-foreground/10 bg-background/70 p-2">
                        <p className="font-semibold text-foreground text-xs">{packageDetails.itinerary[activeDay]?.title}</p>
                        <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                          {packageDetails.itinerary[activeDay]?.activities.map((activity, index) => (
                            <li key={index} className="flex items-start gap-1.5">
                              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent flex-shrink-0" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid gap-1.5 grid-cols-2">
                      <div className="rounded-lg border border-foreground/10 bg-card/70 p-2">
                        <div className="mb-1 flex items-center gap-1">
                          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-100 shrink-0">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          </div>
                          <h3 className="font-semibold text-foreground text-xs">Included</h3>
                        </div>
                        <ul className="space-y-0.5">
                          {packageDetails.included.map((item) => (
                            <li key={item} className="flex items-start gap-1 text-xs text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 h-2 w-2 shrink-0 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg border border-foreground/10 bg-card/70 p-2">
                        <div className="mb-1 flex items-center gap-1">
                          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-red-100 shrink-0">
                            <AlertCircle className="h-3 w-3 text-red-500" />
                          </div>
                          <h3 className="font-semibold text-foreground text-xs">Not Included</h3>
                        </div>
                        <ul className="space-y-0.5">
                          {packageDetails.notIncluded.map((item) => (
                            <li key={item} className="flex items-start gap-1 text-xs text-muted-foreground">
                              <AlertCircle className="mt-0.5 h-2 w-2 shrink-0 text-red-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Package details are unavailable.
                  </p>
                )}
              </>
            ) : (
              <div className="text-center py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/15 mx-auto mb-2">
                  <svg
                    className="h-5 w-5 text-green-500"
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
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-1">
                  Booking Confirmed!
                </h3>
                <p className="text-xs text-muted-foreground leading-tight">
                  Our team will contact you shortly.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-foreground/5 p-2.5 sm:p-4 bg-card shadow-lg">
            {!bookingConfirmed && (
              <div className="flex flex-col gap-1.5 w-full">
                <button
                  onClick={handleCustomizeClick}
                  className="btn-frosted-blue-soft w-full rounded-lg font-semibold py-2 sm:py-2.5 text-xs sm:text-sm active:scale-95 transition-all"
                >
                  Customize
                </button>
                <button
                  onClick={handleBookClick}
                  className="btn-frosted-blue w-full rounded-lg font-semibold py-2 sm:py-2.5 text-xs sm:text-sm active:scale-95 transition-all shadow-md"
                >
                  Book Now
                </button>
              </div>
            )}
            {bookingConfirmed && (
              <button
                onClick={handleClose}
                className="btn-frosted-blue w-full rounded-lg font-semibold py-2 sm:py-2.5 text-xs sm:text-sm transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
