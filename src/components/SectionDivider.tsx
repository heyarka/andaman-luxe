const SectionDivider = () => {
  return (
    <div className="flex items-center justify-center py-1 md:py-2 px-6">
      <div className="h-px flex-1 max-w-[120px] md:max-w-[200px] bg-gradient-to-r from-transparent to-accent/40" />
      <div className="mx-3 md:mx-4 flex items-center gap-1.5 md:gap-2">
        <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-accent/60" />
        <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-accent" />
        <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-accent/60" />
      </div>
      <div className="h-px flex-1 max-w-[120px] md:max-w-[200px] bg-gradient-to-l from-transparent to-accent/40" />
    </div>
  );
};

export default SectionDivider;
