import { useRef, useState, useEffect } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScroll = ({ children, className = "" }: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const maxScroll = Math.max(1, el.scrollWidth - el.clientWidth);
    setScrollProgress(Math.min(1, Math.max(0, el.scrollLeft / maxScroll)));
  };

  const activeDot = Math.min(2, Math.floor(scrollProgress * 2.99));
  const showHint = canScrollLeft || canScrollRight;

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
      {showHint && (
        <>
          <div className="absolute left-0 top-0 bottom-10 w-10 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-10 w-10 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />
        </>
      )}

      <div
        ref={scrollRef}
        className={`flex md:grid gap-3 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-2 md:pb-0 ${className}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>

      {/* Mobile swipe guidance */}
      {showHint && (
        <div className="flex items-center justify-center gap-2 mt-2 md:hidden">
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dot === activeDot ? "w-4 bg-accent" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] tracking-wide uppercase text-muted-foreground/75">
            Swipe to see more
          </span>
        </div>
      )}
    </div>
  );
};

export default HorizontalScroll;
