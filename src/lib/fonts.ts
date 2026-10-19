import {
  Bricolage_Grotesque,
  DM_Sans,
  DM_Serif_Display,
  Fraunces,
  JetBrains_Mono,
  Outfit,
  Plus_Jakarta_Sans,
  Sora,
  Space_Grotesk,
} from "next/font/google";

/**
 * Every typeface any design uses. Each exposes a CSS variable; the design tokens in
 * globals.css pick which ones a site actually uses, so browsers only download those.
 * Only the shared body face is preloaded; preloading every design's fonts would cost each page ~8 extra requests.
 */
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap", preload: false });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap", preload: false });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap", preload: false });
const dmSerif = DM_Serif_Display({ variable: "--font-dm-serif", subsets: ["latin"], weight: "400", display: "swap", preload: false });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap", preload: false });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap", preload: false });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap", preload: false });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap", preload: false });

export const fontVariables = [jakarta, sora, bricolage, dmSans, dmSerif, fraunces, outfit, spaceGrotesk, jetbrains].map((f) => f.variable).join(" ");
