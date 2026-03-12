import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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
    text: "An amazing adventure for our family! The kids absolutely loved the snorkeling and glass-bottom boat rides. The accommodations were top-notch and the staff was incredibly hospitable.",
    rating: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-10 md:py-16 px-5 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-accent mb-2">
            Guest Reviews
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
            Stories of Paradise
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Read authentic reviews from our valued guests who have experienced the
            magic of the Andaman Islands with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 md:p-6 flex flex-col"
            >
              <Quote className="h-6 w-6 text-accent/40 mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                "{review.text}"
              </p>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 text-accent" fill="currentColor" />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
