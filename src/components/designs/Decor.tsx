/** Decorative, aria-hidden SVG motifs used by the design variants. */

// [x, width, height] of generic towers; heights tuned so the spire stands clear of everything.
const TOWERS: [number, number, number][] = [
  [0, 70, 70], [62, 46, 110], [104, 58, 84], [160, 40, 140], [196, 64, 96], [258, 36, 170], [292, 70, 118],
  [360, 44, 88], [402, 60, 150], [460, 38, 104], [496, 74, 132], [568, 42, 196], [608, 66, 120], [672, 50, 90],
  [720, 58, 160], [776, 40, 112], [814, 70, 140], [882, 46, 98], [926, 52, 182], [1076, 60, 150], [1134, 44, 112],
  [1176, 72, 136], [1246, 40, 176], [1284, 64, 102], [1346, 50, 128], [1394, 60, 92],
];

/** Dubai-style skyline with a stepped supertall spire. */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <g fill="currentColor">
        {TOWERS.map(([x, w, h]) => (
          <rect key={x} x={x} y={320 - h} width={w} height={h} rx={2} />
        ))}
        {/* Supertall: stepped tiers tapering to a needle. */}
        <path d="M990 320V214h-14v-34h10v-46h8V86h6V40h2V0h2v40h2v46h6v48h8v46h10v34h-14v106z" />
        {/* Sail-shaped hotel on the right. */}
        <path d="M1452 320h-60c0-90 18-170 52-226l8 6c-24 60-30 140-30 220z" opacity="0.8" />
      </g>
    </svg>
  );
}

/** Tiny twinkling dots for night skies. Deterministic positions so SSR is stable. */
export function Stars({ count = 40, className = "" }: { count?: number; className?: string }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 61.8) % 60,
    r: i % 5 === 0 ? 1.4 : 0.8,
    o: 0.25 + ((i * 7) % 10) / 20,
  }));
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className={className} aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r / 10} fill="white" opacity={d.o} />
      ))}
    </svg>
  );
}

/** Eight-point star lattice (two overlapping squares), the classic Arabian geometric motif. */
export function StarPattern({ className = "", id = "stars" }: { className?: string; id?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="18" y="18" width="28" height="28" />
            <rect x="18" y="18" width="28" height="28" transform="rotate(45 32 32)" />
            <circle cx="32" cy="32" r="5" />
            <path d="M0 0l12 12M64 0L52 12M0 64l12-12M64 64L52 52" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** One large eight-point star, used as a hero emblem. */
export function BigStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="45" y="45" width="110" height="110" />
        <rect x="45" y="45" width="110" height="110" transform="rotate(45 100 100)" />
        <rect x="70" y="70" width="60" height="60" />
        <rect x="70" y="70" width="60" height="60" transform="rotate(45 100 100)" />
        <circle cx="100" cy="100" r="16" />
      </g>
    </svg>
  );
}

/** Decorative barcode for the boarding-pass stub. Bar widths are a fixed sequence. */
export function Barcode({ className = "" }: { className?: string }) {
  const bars = [3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2];
  let x = 0;
  return (
    <svg viewBox="0 0 90 40" preserveAspectRatio="none" className={className} aria-hidden="true">
      {bars.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={40} fill="currentColor" /> : null;
        x += w + 0.4;
        return rect;
      })}
    </svg>
  );
}

/** Pointed-arch outline (mihrab-style), drawn as concentric lines. */
export function ArchLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 520" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor">
        {[0, 18, 36].map((o) => (
          <path
            key={o}
            strokeWidth={o === 0 ? 1.5 : 1}
            d={`M${20 + o} 520V${230 + o / 2}C${20 + o} ${110 + o} ${120 + o / 2} ${40 + o} 200 ${10 + o}C${280 - o / 2} ${40 + o} ${380 - o} ${110 + o} ${380 - o} ${230 + o / 2}V520`}
          />
        ))}
      </g>
    </svg>
  );
}

/** Layered mountain ridges (Hajar-style), two tones. */
export function Mountains({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path fill="currentColor" opacity="0.55" d="M0 260V150l90-48 70 30 110-92 90 64 70-26 120 88 100-70 90 40 130-104 110 82 90-30 120 70 90-46 70 30v122z" />
      <path fill="currentColor" d="M0 260V196l120-52 80 36 120-70 100 58 90-22 140 64 110-50 120 44 100-62 130 54 110-28 120 46v86z" />
    </svg>
  );
}

/** Soft double wave, used as a section divider and seascape. */
export function Waves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path fill="currentColor" opacity="0.5" d="M0 60c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v60H0z" />
      <path fill="currentColor" d="M0 84c120-24 240-24 360 0s240 24 360 0 240-24 360 0 240 24 360 0v36H0z" />
    </svg>
  );
}

// Rough relative positions so a Gulf route reads geographically; unknown places fall back to slots.
const PLACE_XY: Record<string, [number, number]> = {
  kuwait: [150, 46],
  "saudi arabia": [112, 168],
  ksa: [112, 168],
  bahrain: [214, 118],
  qatar: [248, 146],
  uae: [306, 176],
  "united arab emirates": [306, 176],
  oman: [348, 236],
};
// Labels default to the upper right of a node; these sit elsewhere to keep clear of the route.
const LABEL_AT: Record<string, { dx: number; dy: number; anchor: "start" | "end" }> = {
  "saudi arabia": { dx: -12, dy: 22, anchor: "end" },
  ksa: { dx: -12, dy: 22, anchor: "end" },
  oman: { dx: -10, dy: 26, anchor: "end" },
};
const SLOTS: [number, number][] = [[70, 60], [160, 110], [250, 70], [330, 120], [90, 220], [200, 200], [290, 250], [360, 50]];

/** Multi-country route map: nodes for each place joined by a flowing dashed route. */
export function RouteMap({ places, className = "", dark = false }: { places: string[]; className?: string; dark?: boolean }) {
  let slot = 0;
  const nodes = places.map((p) => ({ name: p, xy: PLACE_XY[p.toLowerCase()] ?? SLOTS[slot++ % SLOTS.length] }));
  // Visit nodes north-to-south-east so the route doesn't zig-zag.
  const ordered = [...nodes].sort((a, b) => a.xy[1] + a.xy[0] * 0.3 - (b.xy[1] + b.xy[0] * 0.3));
  const d = ordered.map((n, i) => `${i ? "L" : "M"}${n.xy[0]} ${n.xy[1]}`).join(" ");
  const label = dark ? "#fff" : "var(--ink)";
  return (
    <svg viewBox="0 0 420 290" className={className} aria-hidden="true">
      <path d={d} fill="none" stroke="var(--brand)" strokeOpacity="0.25" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="var(--brand)" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" className="dash-flow" />
      {nodes.map((n) => (
        <g key={n.name} transform={`translate(${n.xy[0]} ${n.xy[1]})`}>
          <circle r="14" fill="var(--brand)" opacity="0.12" />
          <circle r="6" fill="var(--brand)" />
          <circle r="2.2" fill="var(--accent)" />
          <text
            x={LABEL_AT[n.name.toLowerCase()]?.dx ?? 12}
            y={LABEL_AT[n.name.toLowerCase()]?.dy ?? -10}
            textAnchor={LABEL_AT[n.name.toLowerCase()]?.anchor ?? "start"}
            fontSize="12"
            fontFamily="var(--font-jetbrains), monospace"
            fill={label}
          >
            {n.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
