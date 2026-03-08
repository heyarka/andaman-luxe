import { useRef, useState, useEffect } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScroll = ({ children, className = "" }: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative md:contents">
      {/* Fade edges as scroll hints */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-200 md:hidden ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-200 md:hidden ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={scrollRef}
        className={`flex md:grid gap-3 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-2 md:pb-0 ${className}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>

      {/* Scroll dots indicator */}
      {canScrollRight && (
        <div className="flex items-center justify-center gap-1 mt-2 md:hidden">
          <span className="text-[9px] text-muted-foreground/60">Swipe for more</span>
          <span className="text-muted-foreground/60 text-[9px]">→</span>
        </div>
      )}
    </div>
  );
};

export default HorizontalScroll;
