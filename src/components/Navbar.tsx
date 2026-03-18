import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Why Choose Us", path: "/why-choose-us" },
  { label: "Calculator", path: "/calculator" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-1">
          <span className="font-display text-xl font-bold text-foreground">Andaman</span>
          <span className="font-display text-xl font-bold text-gradient-gold">Luxe</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === item.path ? "text-accent" : "text-foreground/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/customize"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all btn-primary-glow hover:brightness-110"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex items-center gap-1.5 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="text-sm font-semibold">{mobileOpen ? "Close" : "Menu"}</span>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-card overflow-hidden border-t border-border"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/customize"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground text-center btn-primary-glow"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
