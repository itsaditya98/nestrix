export const SectionDivider = () => {
  return (
    <div className="relative h-32 overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      </div>
      
      {/* Center ornament */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse"></div>
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/30 animate-ping"></div>
        </div>
      </div>
      
      {/* Decorative lines */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
        <div className="absolute top-0 left-1/2 w-px h-8 bg-gradient-to-b from-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 w-px h-8 bg-gradient-to-t from-primary/20 to-transparent"></div>
      </div>
    </div>
  );
};
