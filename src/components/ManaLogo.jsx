export function ManaLogo({ compact = false }) {
  return (
    <div className={`flex ${compact ? 'items-center gap-3' : 'flex-col items-center gap-4'}`}>
      <div className="relative">
        <div className="logo-ring h-20 w-20 animate-spinSlow rounded-[30%] p-[2px] shadow-glow sm:h-24 sm:w-24">
          <div className="flex h-full w-full items-center justify-center rounded-[28%] bg-[#060816]">
            <div className="logo-core relative flex h-12 w-12 items-center justify-center rounded-[28%] border border-cyan-300/40 sm:h-14 sm:w-14">
              <span className="text-lg font-black tracking-[0.35em] text-white sm:text-xl">M</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-2 rounded-[30%] border border-cyan-300/10" />
      </div>
      {!compact && (
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-cyan-200">Animated Core</p>
          <p className="mt-1 text-sm text-mana-muted">Futuristic identity for the Mana developer platform</p>
        </div>
      )}
    </div>
  );
}
