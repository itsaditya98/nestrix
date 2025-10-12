export const SectionDivider = () => {
  return (
    <div className="relative h-16 overflow-hidden flex items-center">
      {/* Animated gradient line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      
      {/* Center ornament */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary/30 animate-ping"></div>
        </div>
      </div>
    </div>
  );
};
