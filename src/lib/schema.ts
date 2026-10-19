import { z } from "zod";

/**
 * The contract every site in /sites/*.json must satisfy.
 * The research-and-build prompt outputs JSON in exactly this shape,
 * so a new domain needs content only, never code.
 */

const faq = z.object({
  q: z.string().min(5),
  a: z.string().min(20),
});

const section = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()).default([]),
  bullets: z.array(z.string()).optional(),
});

const iconName = z.enum([
  "bolt",
  "wifi",
  "shield",
  "globe",
  "phone",
  "wallet",
  "chat",
  "plane",
  "signal",
  "clock",
]);

const guide = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  title: z.string().max(70, "keep <title> under ~60-70 chars for SERPs"),
  description: z.string().min(70).max(170),
  h1: z.string(),
  /** Short label for the header nav (the first 3 guides are shown there). */
  navLabel: z.string().max(24),
  intro: z.string(),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sections: z.array(section).min(2),
  faqs: z.array(faq).default([]),
});

/** Template microcopy. Defaults suit travel eSIM sites; override per site for other niches. "{place}" = city or country. */
const copy = z
  .object({
    headerCta: z.string().max(14).default("Get eSIM"),
    /** Network badge in the hero phone's status bar. */
    signalLabel: z.string().max(4).default("5G"),
    benefitsEyebrow: z.string().default("Why an eSIM"),
    benefitsHeading: z.string().default("Built for travellers to {place}"),
    howItWorksHeading: z.string().default("Online in minutes, before you land"),
    inlineCta: z.string().default("Need data in {place}? Get an eSIM before you fly."),
    bannerHeading: z.string().default("Land in {place} already connected"),
    bannerBody: z.string().default("Pick a data plan, scan the QR code and skip the airport SIM queue."),
    deviceRows: z
      .array(z.tuple([z.string(), z.string()]))
      .max(3)
      .default([
        ["eSIM", "Active"],
        ["Data roaming", "On"],
        ["Network", "Best available"],
      ]),
  })
  .prefault({});

export const siteSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  domain: z.string(),
  aliases: z.array(z.string()).default([]),
  locale: z.string().default("en"),
  brand: z.object({
    name: z.string(),
    tagline: z.string(),
    primary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    primaryInk: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  }),
  /**
   * Visual design language. Each one has its own typography, layout, hero and section styles:
   * skyline (dark luxury city), geometric (sand + star patterns, editorial), boarding (airline / boarding pass),
   * arch (calm, centred, arch motifs).
   */
  design: z.enum(["skyline", "geometric", "boarding", "arch"]).default("skyline"),
  /** The business the site generates leads for. */
  partner: z.object({
    name: z.string(),
    url: z.url(),
    supportUrl: z.url().optional(),
    privacyUrl: z.url().optional(),
    termsUrl: z.url().optional(),
    /** Footer disclosure, e.g. "eSIM plans are sold and supported by". Partner name is appended as a link. */
    disclosure: z.string(),
  }),
  copy,
  market: z.object({
    country: z.string(),
    countryCode: z.string().length(2),
    city: z.string().optional(),
  }),
  cta: z.object({
    url: z.url(),
    label: z.string(),
    campaign: z.string(),
  }),
  analytics: z
    .object({
      ga4Id: z.string().optional(),
    })
    .default({}),
  seo: z.object({
    title: z.string().max(70),
    description: z.string().min(70).max(170),
    keywords: z.array(z.string()).default([]),
  }),
  home: z.object({
    hero: z.object({
      eyebrow: z.string(),
      h1: z.string(),
      subheading: z.string(),
      bullets: z.array(z.string()).max(4),
      deviceLabel: z.string(),
    }),
    stats: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(4),
    benefits: z
      .array(z.object({ icon: iconName, title: z.string(), body: z.string() }))
      .min(3),
    howItWorks: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .min(3)
      .max(4),
    networks: z
      .object({
        heading: z.string(),
        intro: z.string(),
        items: z.array(z.object({ name: z.string(), note: z.string() })),
      })
      .optional(),
    comparison: z
      .object({
        heading: z.string(),
        intro: z.string(),
        columns: z.tuple([z.string(), z.string(), z.string()]),
        rows: z.array(
          z.object({
            label: z.string(),
            values: z.tuple([z.string(), z.string(), z.string()]),
          }),
        ),
      })
      .optional(),
    sections: z.array(section).default([]),
    faqs: z.array(faq).min(4),
  }),
  guides: z.array(guide).default([]),
  about: z.object({
    heading: z.string(),
    description: z.string().min(70).max(170),
    paragraphs: z.array(z.string()).min(1),
  }),
});

export type Site = z.infer<typeof siteSchema>;
export type Guide = Site["guides"][number];
export type Faq = z.infer<typeof faq>;
export type IconName = z.infer<typeof iconName>;
export type Design = Site["design"];
