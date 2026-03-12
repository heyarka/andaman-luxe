import { motion } from "framer-motion";
import seaWalking from "@/assets/sea-walking.jpg";
import honeymoon2 from "@/assets/honeymoon-2.jpg";
import honeymoon3 from "@/assets/honeymoon-3.jpg";
import parasailing from "@/assets/parasailing.jpg";
import ferryServices from "@/assets/ferry-services.jpg";
import waterSports from "@/assets/water-sports.jpg";

const experiences = [
  { title: "Scuba Diving", desc: "Dive into crystal-clear waters", image: seaWalking },
  { title: "Private Island Tours", desc: "Exclusive island hopping", image: honeymoon2 },
  { title: "Honeymoon Escapes", desc: "Romantic getaways for two", image: honeymoon3 },
  { title: "Luxury Resorts", desc: "World-class stays", image: parasailing },
  { title: "Sunset Cruises", desc: "Golden hour on the water", image: ferryServices },
  { title: "Water Adventures", desc: "Thrilling aquatic activities", image: waterSports },
];

const ExperiencesSection = () => {
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
            Experiences
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Experiences You'll Never Forget
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[400px] md:h-[440px] rounded-2xl overflow-hidden snap-start group cursor-pointer"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {exp.title}
                </h3>
                <p className="text-sm text-white/60 font-body font-light">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-4 md:hidden">
          <span className="text-xs text-muted-foreground/50 font-body">Swipe for more →</span>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
