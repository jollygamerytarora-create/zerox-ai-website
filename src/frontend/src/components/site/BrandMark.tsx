export default function BrandMark() {
  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src="/media/jollytech-og.jpg"
        alt="JollyTech Logo"
        className="h-12 w-12 rounded-full object-cover"
        style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.4))" }}
        width={48}
        height={48}
      />
      <span
        className="font-display text-xl font-extrabold tracking-[0.22em] text-fuchsia-300"
        style={{ textShadow: "0 0 12px rgba(168,85,247,0.45)" }}
      >
        JOLLYTECH
      </span>
    </div>
  );
}
