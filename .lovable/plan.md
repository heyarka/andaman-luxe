

# Premium Homepage Redesign Plan

This is a major overhaul of the homepage to transform it from a basic travel agency site into a luxury destination brand experience. Given the scope, I'll break this into phases that can be implemented incrementally.

## Available Assets

We have these images to work with: `hero-beach-bg.jpg`, `hero-beach.jpg`, `honeymoon-1/2/3.jpg`, `cellular-jail.jpg`, `destinations.jpg`, `ross-smith.jpg`, `parasailing.jpg`, `sea-walking.jpg`, `snorkeling.jpg`, `water-sports.jpg`, `ferry-services.jpg`, `makruzz.jpg`, `govt-ferry.jpg`.

## Typography Change

Switch from Montserrat to **Playfair Display** for headings (elegant serif) and **Inter** for body text. Update Google Fonts import, CSS variables, and Tailwind config.

## New Homepage Sections (in order)

### 1. Hero Section — Full Redesign
- Full-screen (`min-h-screen`) parallax background image with dark gradient overlay (not white)
- Large Playfair Display heading: "Discover Paradise in the Andaman Islands"
- Elegant subtext in Inter
- Two CTAs: "Plan Your Trip" (gold/accent filled) + "Explore Destinations" (outlined white)
- Animated scroll-down chevron indicator at bottom
- Smooth framer-motion fade-in stagger for all elements

### 2. Explore the Islands — Destination Discovery
- Section title: "Explore the Islands"
- Grid of 5 large image tiles (2-col + 3-col layout or masonry-like)
- Each tile: full background image, dark overlay, destination name, hover zoom effect (`scale-105` + overlay lighten)
- Destinations: Havelock, Neil, Ross, Baratang, North Bay
- Uses existing assets where available, placeholder for others

### 3. Experiences — Horizontal Scroll
- Title: "Experiences You'll Never Forget"
- Horizontally scrollable cards (using existing `HorizontalScroll` component)
- 6 cinematic cards: Scuba Diving, Private Island Tours, Honeymoon Escapes, Luxury Resorts, Sunset Cruises, Water Adventures
- Each card: tall aspect ratio, background image, gradient overlay, title + short description, hover lift animation

### 4. Smart Trip Builder
- Title: "Build Your Perfect Andaman Trip"
- Clean card UI with: traveler count (+/- buttons), days selector, budget slider (using existing Slider component), travel style pills (Adventure/Honeymoon/Family/Luxury)
- "Generate My Trip Plan" accent button
- On click: shows a simple estimated itinerary preview (client-side mock)

### 5. Social Proof Stats
- Dark/accent background section
- 4 stats in a row: 4.9 Rating, 10,000+ Travelers, 500+ Trips, #1 Rated
- Animated counters using framer-motion `useInView` + count-up effect

### 6. Testimonials — Premium Carousel
- Title: "What Our Guests Say"
- Sliding carousel (using embla-carousel-react, already installed)
- Each card: quote, star rating, traveler name, location
- Elegant serif quote typography, larger cards

### 7. Moments from Andaman — Gallery
- Pinterest-style masonry grid using CSS columns
- Uses existing asset images
- Hover zoom + lightbox (dialog overlay showing full image)

### 8. Conversion CTA Section
- Gradient background (sunset tones: warm gold to deep blue)
- Large heading: "Your Island Escape Awaits"
- Two buttons: "Plan My Trip" + "Talk to a Travel Expert"
- Soft glow effects on buttons

### 9. Footer (keep existing, minor refinements)

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/index.css` | Update fonts, add new utility classes, dark overlay styles |
| `tailwind.config.ts` | Update font families, add new animations |
| `src/pages/Index.tsx` | Rebuild with all new sections |
| `src/components/HeroSection.tsx` | Full rewrite — cinematic hero |
| `src/components/DestinationGrid.tsx` | **New** — island discovery tiles |
| `src/components/ExperiencesSection.tsx` | **New** — horizontal scroll experiences |
| `src/components/TripBuilder.tsx` | **New** — interactive trip planner |
| `src/components/StatsSection.tsx` | **New** — animated counters |
| `src/components/TestimonialsCarousel.tsx` | **New** — embla carousel testimonials |
| `src/components/GallerySection.tsx` | **New** — masonry gallery with lightbox |
| `src/components/CTASection.tsx` | **New** — conversion section |
| `src/components/PathCards.tsx` | Remove (replaced by new sections) |
| `src/components/ReviewsSection.tsx` | Remove (replaced by carousel) |
| `src/components/SectionDivider.tsx` | Remove (no longer needed) |

## Animations Strategy

- All sections use framer-motion `whileInView` for scroll reveal
- Cards use `hover:scale-105 hover:-translate-y-1` with shadow lift
- Buttons get `transition-all duration-300` with glow on hover
- Hero uses staggered children animation
- Stats use `useInView` triggered count-up
- Gallery images use `hover:scale-110` within `overflow-hidden` containers

## Spacing

Consistent `py-20 md:py-28` for all sections (roughly 80-112px). No empty gaps.

## Mobile

- Destination grid stacks to single column
- Experiences section stays horizontal scroll with snap
- Trip builder stacks vertically
- Stats go 2x2 grid
- Gallery reduces to 2 columns
- All tap targets minimum 44px

## Implementation Order

Due to the large scope, I recommend implementing in 3-4 rounds:

1. **Round 1**: Typography + Hero + Destination Grid + Stats
2. **Round 2**: Experiences + Trip Builder + CTA Section  
3. **Round 3**: Testimonials Carousel + Gallery + Final polish

