import { Bricolage_Grotesque, DM_Sans, DM_Serif_Display, Fraunces, Plus_Jakarta_Sans, Sora } from "next/font/google";

/**
 * Every typeface any design uses. Each exposes a CSS variable; the design tokens in
 * globals.css pick which ones a site actually uses, so browsers only download those.
 */
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });
const dmSerif = DM_Serif_Display({ variable: "--font-dm-serif", subsets: ["latin"], weight: "400", display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const fontVariables = [jakarta, sora, bricolage, dmSans, dmSerif, fraunces].map((f) => f.variable).join(" ");
