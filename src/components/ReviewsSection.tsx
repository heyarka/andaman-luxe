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
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
            Guest Reviews
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Stories of Paradise
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Read authentic reviews from our valued guests who have experienced the
            magic of the Andaman Islands with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col"
            >
              <Quote className="h-8 w-8 text-accent/40 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                "{review.text}"
              </p>
              <div className="flex items-center gap-2 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-accent" fill="currentColor" />
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
