import { motion } from "framer-motion";
import heroBeach from "@/assets/hero-beach.jpg";
import honeymoon1 from "@/assets/honeymoon-1.jpg";
import rossSmith from "@/assets/ross-smith.jpg";
import destinations from "@/assets/destinations.jpg";
import snorkeling from "@/assets/snorkeling.jpg";

const islands = [
  { name: "Havelock Island", subtitle: "Pristine beaches & coral reefs", image: heroBeach },
  { name: "Neil Island", subtitle: "Tranquil tropical paradise", image: honeymoon1 },
  { name: "Ross Island", subtitle: "Historic colonial ruins", image: rossSmith },
  { name: "Baratang Island", subtitle: "Limestone caves & mangroves", image: destinations },
  { name: "North Bay", subtitle: "Snorkeling & marine life", image: snorkeling },
];

const DestinationGrid = () => {
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
            Destinations
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Explore the Islands
          </h2>
        </motion.div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[240px] md:auto-rows-[280px]">
          {islands.map((island, i) => (
            <motion.a
              key={island.name}
              href="/destinations"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`destination-tile cursor-pointer group ${
                i === 0 ? "sm:col-span-2 lg:col-span-2 sm:row-span-2 sm:auto-rows-auto" : ""
              }`}
              style={i === 0 ? { gridRow: "span 2" } : undefined}
            >
              <img
                src={island.image}
                alt={island.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-7">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {island.name}
                </h3>
                <p className="text-sm text-white/60 font-body font-light">
                  {island.subtitle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid;
