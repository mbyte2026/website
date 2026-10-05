export default function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={light ? "/logo-mark.png" : "/img_rb.png"}
        alt="Mbyte logo"
        className={`w-full h-full object-contain ${light ? "" : "drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"}`}
      />
    </div>
  );
}
