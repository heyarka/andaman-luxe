import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 md:py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-1 mb-2 md:mb-4">
              <span className="font-display text-base md:text-lg font-bold text-foreground">Andaman</span>
              <span className="font-display text-base md:text-lg font-bold text-gradient-gold">Luxe</span>
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Your gateway to the most beautiful islands in the Bay of Bengal. Luxury travel, redefined.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs md:text-sm font-bold text-foreground mb-2 md:mb-4">Quick Links</h4>
            <div className="flex flex-col gap-1.5 md:gap-2">
              {["Home", "Explore", "Why Choose Us", "Calculator", "Contact"].map((item) => (
                <Link key={item} to={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs md:text-sm text-muted-foreground hover:text-accent transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs md:text-sm font-bold text-foreground mb-2 md:mb-4">Destinations</h4>
            <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
              <span>Havelock Island</span>
              <span>Neil Island</span>
              <span>Port Blair</span>
              <span>Baratang Island</span>
              <span>Ross Island</span>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-xs md:text-sm font-bold text-foreground mb-2 md:mb-4">Contact</h4>
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                Port Blair, Andaman Islands
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                +91 86373 27297
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                contact@andamanluxe.com
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 md:mt-12 pt-4 md:pt-8 text-center">
          <p className="text-[10px] md:text-xs text-muted-foreground">
            © 2026 Andaman Luxe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
