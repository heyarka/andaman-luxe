import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { packageCustomizationData, type PackageCustomizationDetails } from "@/data/packageCustomizationData";

type SelectedPackage = {
  slug: string;
  name: string;
  duration: string;
};

interface PackageCustomizationModalProps {
  open: boolean;
  selectedPackage: SelectedPackage | null;
  onClose: () => void;
}

export const PackageCustomizationModal = ({ open, selectedPackage, onClose }: PackageCustomizationModalProps) => {
  const packageDetails: PackageCustomizationDetails | null = selectedPackage
    ? packageCustomizationData[selectedPackage.slug] || null
    : null;

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [hotelType, setHotelType] = useState<"Budget" | "Premium" | "Luxury">("Premium");
  const [notes, setNotes] = useState("");
  const [quoteRequested, setQuoteRequested] = useState(false);

  useEffect(() => {
    if (!open || !packageDetails) return;
    setSelectedDestinations(packageDetails.includedDestinations);
    setSelectedActivities(packageDetails.includedActivities);
    setHotelType("Premium");
    setNotes("");
    setQuoteRequested(false);
  }, [open, selectedPackage?.slug]);

  const toggleSelection = (value: string, current: string[], setter: (next: string[]) => void) => {
    if (current.includes(value)) {
      setter(current.filter((item) => item !== value));
      return;
    }
    setter([...current, value]);
  };

  const handleRequestQuote = () => {
    setQuoteRequested(true);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl rounded-2xl border-foreground/10 bg-card p-0 overflow-hidden max-h-[90vh]">
        <div className="p-5 md:p-8 overflow-y-auto">
          <DialogHeader className="mb-5">
            <DialogTitle className="font-display text-xl md:text-2xl text-foreground">Customize This Package</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Tailor your itinerary and send a customization request.
            </DialogDescription>
          </DialogHeader>

          {selectedPackage && packageDetails ? (
            <div className="space-y-6">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="font-display text-lg font-bold text-foreground mb-1">{selectedPackage.name}</p>
                <p className="text-sm text-muted-foreground">Duration: {selectedPackage.duration}</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Included Destinations</p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {packageDetails.includedDestinations.map((destination) => (
                    <li key={destination}>{destination}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Included Activities</p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {packageDetails.includedActivities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-3">Add / Remove Destinations</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {packageDetails.availableDestinations.map((destination) => (
                    <label key={destination} className="flex items-center gap-2 rounded-lg border border-foreground/10 p-2 text-sm text-foreground hover:bg-muted/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedDestinations.includes(destination)}
                        onChange={() => toggleSelection(destination, selectedDestinations, setSelectedDestinations)}
                      />
                      {destination}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-3">Select Activities</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {packageDetails.availableActivities.map((activity) => (
                    <label key={activity} className="flex items-center gap-2 rounded-lg border border-foreground/10 p-2 text-sm text-foreground hover:bg-muted/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(activity)}
                        onChange={() => toggleSelection(activity, selectedActivities, setSelectedActivities)}
                      />
                      {activity}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-3">Hotel Type</p>
                <div className="flex flex-wrap gap-2">
                  {(["Budget", "Premium", "Luxury"] as const).map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setHotelType(option)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        hotelType === option
                          ? "bg-primary text-primary-foreground"
                          : "border border-primary/20 text-primary hover:bg-primary/10"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Notes</p>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Add preferences like room type, dietary needs, transfer timings, etc."
                  className="w-full min-h-24 rounded-lg border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {quoteRequested ? (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-foreground">
                  Thank you! Our team will contact you shortly to finalize your customized itinerary and pricing.
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="btn-frosted-blue flex-1 rounded-lg font-semibold py-3 transition-colors"
                >
                  Request Custom Quote
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-frosted-blue-soft flex-1 rounded-lg font-semibold py-3 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Package customization details are currently unavailable.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
