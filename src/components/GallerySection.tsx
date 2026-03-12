import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import heroBeach from "@/assets/hero-beach.jpg";
import honeymoon1 from "@/assets/honeymoon-1.jpg";
import honeymoon2 from "@/assets/honeymoon-2.jpg";
import honeymoon3 from "@/assets/honeymoon-3.jpg";
import snorkeling from "@/assets/snorkeling.jpg";
import parasailing from "@/assets/parasailing.jpg";
import seaWalking from "@/assets/sea-walking.jpg";
import cellularJail from "@/assets/cellular-jail.jpg";

const images = [
  { src: heroBeach, alt: "Beach sunset in Andaman" },
  { src: snorkeling, alt: "Snorkeling in crystal waters" },
  { src: honeymoon1, alt: "Tropical paradise" },
  { src: parasailing, alt: "Parasailing adventure" },
  { src: honeymoon2, alt: "Island getaway" },
  { src: seaWalking, alt: "Sea walking experience" },
  { src: cellularJail, alt: "Cellular Jail heritage" },
  { src: honeymoon3, alt: "Romantic beach escape" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-14 md:py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3 font-body font-medium">
            Gallery
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Moments from Andaman
          </h2>
        </motion.div>

        <div className="masonry-gallery">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
