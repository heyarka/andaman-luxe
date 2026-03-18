import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const reviews = [
  {
    name: "Priya & Arjun",
    location: "Bengaluru, India",
    text: "Our trip to the Andaman Islands was truly unforgettable! The pristine beaches and crystal-clear waters exceeded all our expectations. Every detail was perfectly planned.",
    rating: 5,
  },
  {
    name: "Sneha & Rahul",
    location: "Delhi, India",
    text: "The perfect romantic getaway. From serene sunsets to private candlelight dinners on the beach, every moment felt like a dream come true. Highly recommend!",
    rating: 5,
  },
  {
    name: "The Sharma Family",
    location: "Mumbai, India",
    text: "An amazing adventure for our family! The kids loved the snorkeling and glass-bottom boat rides. The accommodations were top-notch and the staff was incredibly hospitable.",
    rating: 5,
  },
  {
    name: "Meera & Vikram",
    location: "Hyderabad, India",
    text: "A once-in-a-lifetime experience! The scuba diving was breathtaking and the private beach dinner under the stars was the highlight of our honeymoon.",
    rating: 5,
  },
];

const TestimonialsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

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
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            What Our Guests Say
          </h2>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[32%]"
              >
                <div className="rounded-2xl border border-border bg-card p-7 md:p-8 h-full flex flex-col">
                  <Quote className="h-8 w-8 text-accent/30 mb-4" />
                  <p className="font-display text-base md:text-lg italic text-foreground/80 leading-relaxed flex-1 mb-6">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-accent" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-foreground font-body">{review.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
          <p className="text-[10px] tracking-wide uppercase text-muted-foreground/75">Swipe to read more stories</p>
          <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-8 bg-accent" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
