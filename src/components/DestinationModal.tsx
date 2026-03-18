import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DestinationModalProps {
  destination: {
    title: string;
    detailedDescription: string;
    highlights: string[];
    topActivities: string[];
    bestTime: string;
  } | null;
  onClose: () => void;
  onViewPackages: () => void;
}

export const DestinationModal = ({ destination, onClose, onViewPackages }: DestinationModalProps) => {
  const [showBookingNotice, setShowBookingNotice] = useState(false);

  if (!destination) return null;

  const handleBookNowClick = () => {
    setShowBookingNotice(true);
  };

  const handleViewPackages = () => {
    setShowBookingNotice(false);
    onClose();
    onViewPackages();
  };

  return (
    <AnimatePresence>
      {destination && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-background rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
              {/* Header */}
              <div className="sticky top-0 z-20 bg-background/95 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border-b border-primary/20 px-8 py-8 flex items-start justify-between">
                <div className="flex flex-col pr-8">
                  <h2 className="font-display text-3xl font-bold text-accent mb-3">{destination.title}</h2>
                  <p className="text-muted-foreground text-sm">Discover the magic</p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-primary/20 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-6 w-6 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 py-8 space-y-8">
                {/* Description */}
                <div className="flex flex-col">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">About</h3>
                  <p className="text-muted-foreground mt-0 leading-[1.6]">{destination.detailedDescription}</p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">Key Highlights</h3>
                  <ul className="space-y-2">
                    {destination.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-primary font-bold mt-1">•</span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Top Activities */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">Top Activities</h3>
                  <div className="flex flex-wrap gap-3">
                    {destination.topActivities.map((activity, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20"
                      >
                        {activity}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Best Time */}
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">Best Time to Visit</h3>
                  <p className="text-muted-foreground">{destination.bestTime}</p>
                </div>

                {/* CTA */}
                <div className="flex gap-4 pt-4">
                  <button onClick={handleBookNowClick} className="flex-1 rounded-lg bg-primary text-primary-foreground font-semibold py-3 hover:bg-primary/90 transition-colors">
                    Book Now
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-primary/30 text-primary font-semibold py-3 hover:bg-primary/5 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <Dialog open={showBookingNotice} onOpenChange={setShowBookingNotice}>
            <DialogContent className="sm:max-w-lg rounded-2xl border-foreground/10 bg-card p-0 overflow-hidden">
              <div className="p-6 md:p-8">
                <DialogHeader className="mb-5 text-left">
                  <DialogTitle className="font-display text-xl md:text-2xl text-foreground">Booking Guidance</DialogTitle>
                  <DialogDescription className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    You cannot directly book a single destination. Please choose a travel package first, then customize it according to your preferences. Our team will connect with you and provide a personalized quotation.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleViewPackages}
                    className="flex-1 rounded-lg bg-primary text-primary-foreground font-semibold py-3 hover:bg-primary/90 transition-colors"
                  >
                    View Packages
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingNotice(false)}
                    className="flex-1 rounded-lg border border-primary/30 text-primary font-semibold py-3 hover:bg-primary/5 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </AnimatePresence>
  );
};
