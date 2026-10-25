import { z } from "zod";

// Dipolog's Bids and Awards page publishes procurement documents as dated PDF
// links (one PDF per BAC posting date, often bundling several Invitations to
// Bid), not as per-project records. So an entry is a dated document, and the
// project-level fields (reference no., office, stage) simply don't exist.
export const BidNoticeSchema = z.object({
  // ISO date exactly as labeled on the city page; absent for undated links.
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  year: z.number().int(),
  // Extra text shown next to the date on the city page (e.g. "Additional").
  note: z.string().optional(),
  pdfUrl: z.string().url(),
});

export const AwardNoticeSchema = z.object({
  type: z.enum(["NOA", "NTP"]),
  period: z.string(),
  year: z.number().int(),
  pdfUrl: z.string().url(),
});

export const BacMinutesSchema = z.object({
  period: z.string(),
  year: z.number().int(),
  pdfUrl: z.string().url(),
});

export const BidsSchema = z.object({
  source: z.object({ title: z.string(), url: z.string().url() }),
  retrievedAt: z.string(),
  notices: z.array(BidNoticeSchema),
  awards: z.array(AwardNoticeSchema),
  bacMinutes: z.array(BacMinutesSchema),
});

export type BidNotice = z.infer<typeof BidNoticeSchema>;
export type AwardNotice = z.infer<typeof AwardNoticeSchema>;
export type BacMinutes = z.infer<typeof BacMinutesSchema>;
export type BidsData = z.infer<typeof BidsSchema>;

export const AWARD_LABELS: Record<AwardNotice["type"], string> = {
  NOA: "Notices of Award",
  NTP: "Notices to Proceed",
};

export function formatNoticeDate(iso: string): string {
  // Parse as a calendar date (no timezone shift).
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
