import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, Users, MapPin, Trophy } from "lucide-react";

const stats = [
  { icon: Star, value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
  { icon: Users, value: 10000, suffix: "+", label: "Travelers Served", decimals: 0 },
  { icon: MapPin, value: 500, suffix: "+", label: "Trips Organized", decimals: 0 },
  { icon: Trophy, value: 1, suffix: "", prefix: "#", label: "Rated Andaman Planner", decimals: 0 },
];

function AnimatedCounter({ value, decimals, prefix, suffix, inView }: { value: number; decimals: number; prefix?: string; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString("en-IN");

  return (
    <span className="font-display text-4xl md:text-5xl font-bold text-white">
      {prefix}{display}{suffix}
    </span>
  );
}

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-dark py-14 md:py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="h-6 w-6 text-accent mx-auto mb-3" />
              <AnimatedCounter
                value={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
                inView={inView}
              />
              <p className="text-sm text-white/50 mt-2 font-body">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
