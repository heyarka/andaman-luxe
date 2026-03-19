import { useRef, useState, useEffect } from "react";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  showEdgeFade?: boolean;
  mobilePeek?: boolean;
  initialCenterIndex?: number;
  focusedCardIndex?: number;
  provokeSwipe?: boolean;
}

const HorizontalScroll = ({
  children,
  className = "",
  showEdgeFade = true,
  mobilePeek = false,
  initialCenterIndex,
  focusedCardIndex,
  provokeSwipe = false,
}: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasAutoCentered = useRef(false);
  const hasNudged = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const firstChild = el.firstElementChild as HTMLElement | null;
    const lastChild = el.lastElementChild as HTMLElement | null;
    if (firstChild && lastChild) {
      const containerRect = el.getBoundingClientRect();
      const firstRect = firstChild.getBoundingClientRect();
      const lastRect = lastChild.getBoundingClientRect();
      const edgeTolerance = 3;

      // Show left arrow only when content extends past the left edge.
      setCanScrollLeft(firstRect.left < containerRect.left - edgeTolerance);
      // Show right arrow only when content extends past the right edge.
      setCanScrollRight(lastRect.right > containerRect.right + edgeTolerance);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }

    const maxScroll = Math.max(1, el.scrollWidth - el.clientWidth);
    setScrollProgress(Math.min(1, Math.max(0, el.scrollLeft / maxScroll)));
  };

  const activeDot = Math.min(2, Math.floor(scrollProgress * 2.99));
  const showHint = canScrollLeft || canScrollRight;

  const centerIndex = (index: number, behavior: ScrollBehavior) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;

    const containerRect = el.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    const deltaLeft = childRect.left - containerRect.left;
    const target = el.scrollLeft + deltaLeft - (containerRect.width - childRect.width) / 2;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = Math.max(0, Math.min(target, maxScroll));
    el.scrollTo({ left, behavior });
  };

  const nudge = () => {
    const el = scrollRef.current;
    if (!el || hasNudged.current || !showHint) return;
    hasNudged.current = true;
    const step = Math.max(36, Math.min(56, el.clientWidth * 0.12));
    el.scrollBy({ left: step, behavior: "smooth" });
    window.setTimeout(() => {
      el.scrollBy({ left: -step, behavior: "smooth" });
    }, 380);
  };

  useEffect(() => {
    hasAutoCentered.current = false;
    hasNudged.current = false;
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      checkScroll();
      if (!hasAutoCentered.current && typeof initialCenterIndex === "number") {
        centerIndex(initialCenterIndex, "auto");
        hasAutoCentered.current = true;
      }
    });
    ro.observe(el);

    const raf1 = window.requestAnimationFrame(() => {
      if (typeof initialCenterIndex === "number") {
        centerIndex(initialCenterIndex, "auto");
        hasAutoCentered.current = true;
      }
      window.requestAnimationFrame(() => {
        if (typeof initialCenterIndex === "number") {
          centerIndex(initialCenterIndex, "auto");
          hasAutoCentered.current = true;
        }
        if (provokeSwipe) nudge();
      });
    });
    const timer = window.setTimeout(() => {
      if (typeof initialCenterIndex === "number") {
        centerIndex(initialCenterIndex, "auto");
        hasAutoCentered.current = true;
      }
      if (provokeSwipe) nudge();
    }, 200);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
      window.cancelAnimationFrame(raf1);
      window.clearTimeout(timer);
    };
  }, [initialCenterIndex]);

  useEffect(() => {
    if (typeof focusedCardIndex !== "number") return;
    setTimeout(() => {
      centerIndex(focusedCardIndex, "smooth");
    }, 50);
  }, [focusedCardIndex]);

  return (
    <div className="relative md:contents">
      {showEdgeFade && showHint && (
        <>
          <div className="absolute left-0 top-0 bottom-10 w-10 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-10 w-10 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />
        </>
      )}

      <div
        ref={scrollRef}
        className={`flex md:grid gap-2 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-2 md:pb-0 ${mobilePeek ? "px-[15vw]" : ""} md:px-0 ${className}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            className: `${(child as React.ReactElement).props.className || ""} snap-center`,
          })
        )}
      </div>

      {provokeSwipe && showHint && (
        <>
          {canScrollLeft && (
            <motion.button
              type="button"
              onClick={() => scrollRef.current?.scrollBy({ left: -Math.max(140, (scrollRef.current?.clientWidth || 0) * 0.42), behavior: "smooth" })}
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
              className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 h-6 w-6 rounded-full border border-accent/30 bg-background/75 text-accent shadow-sm backdrop-blur-sm flex items-center justify-center"
              aria-label="Scroll packages left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button
              type="button"
              onClick={() => scrollRef.current?.scrollBy({ left: Math.max(140, (scrollRef.current?.clientWidth || 0) * 0.42), behavior: "smooth" })}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
              className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 h-6 w-6 rounded-full border border-accent/30 bg-background/75 text-accent shadow-sm backdrop-blur-sm flex items-center justify-center"
              aria-label="Scroll packages right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </>
      )}

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
