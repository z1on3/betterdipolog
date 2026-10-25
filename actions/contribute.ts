"use server";

import { z } from "zod";
import { checkRateLimit, getClientIp, verifyCaptcha } from "@/lib/formGuard";

type ActionResult = { success: true } | { success: false; error: string };

// Discord field limits are 1024 chars. We cap at 1000 to be safe.
const formSchema = z.object({
  type: z.enum(["suggest", "report"]),
  title: z
    .string()
    .trim()
    .min(2, "Title is too short")
    .max(150, "Title is too long"),
  category: z
    .string()
    .trim()
    .min(2, "Category is too short")
    .max(100, "Category is too long"),
  details: z
    .string()
    .trim()
    .min(5, "Details are too short")
    .max(1000, "Details exceed 1000 characters"),
  // Email can be a valid email, or an empty string (since it's optional)
  email: z.union([z.string().email(), z.string().length(0)]).optional(),
});

// "Report an issue" (homepage) — outdated or incorrect information on the site.
const reportSchema = z.object({
  targetInfo: z
    .string()
    .trim()
    .min(2, "Please say which information is wrong")
    .max(150, "Keep this under 150 characters"),
  description: z
    .string()
    .trim()
    .min(5, "Please explain the correction")
    .max(1000, "Explanation exceeds 1000 characters"),
  referenceUrl: z.union([z.string().url().max(500), z.string().length(0)]),
  email: z.union([z.string().email(), z.string().length(0)]),
});

type DiscordField = { name: string; value: string; inline?: boolean };

async function sendToDiscord(
  title: string,
  color: number,
  fields: DiscordField[],
) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("Discord webhook URL not configured.");

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `🚨 **New Community Submission**`,
      // Never ping @everyone/@here/roles from user-supplied text.
      allowed_mentions: { parse: [] },
      embeds: [{ title, color, fields, timestamp: new Date().toISOString() }],
    }),
  });

  if (!response.ok)
    throw new Error(`Failed to send to Discord: ${response.status}`);
}

// Runs the shared abuse checks; returns an error message or null when clear.
async function guard(
  scope: string,
  captchaToken: string | null | undefined,
): Promise<string | null> {
  const ip = await getClientIp();
  if (!(await checkRateLimit(ip, scope))) {
    return "You are submitting too fast. Please wait a minute.";
  }
  if (!(await verifyCaptcha(captchaToken, ip))) {
    return "CAPTCHA verification failed. Please try again.";
  }
  return null;
}

function firstError(fieldErrors: Record<string, string[] | undefined>): string {
  for (const messages of Object.values(fieldErrors)) {
    if (messages?.length) return messages[0];
  }
  return "Please check your entries and try again.";
}

export async function submitContribution(
  formData: FormData,
  captchaToken: string,
): Promise<ActionResult> {
  // Wrap everything so network errors don't crash the server action
  try {
    const blocked = await guard("contribute", captchaToken);
    if (blocked) return { success: false, error: blocked };

    const validatedFields = formSchema.safeParse({
      type: formData.get("type"),
      title: formData.get("title"),
      category: formData.get("category"),
      details: formData.get("details"),
      email: formData.get("email"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: firstError(validatedFields.error.flatten().fieldErrors),
      };
    }

    const { type, title, category, details, email } = validatedFields.data;

    await sendToDiscord(
      type === "report" ? `Update/Fix: ${title}` : `New Service: ${title}`,
      type === "report" ? 15548997 : 5763719, // Red for report, Green for suggest
      [
        { name: "Category", value: category || "None", inline: true },
        { name: "Contact Email", value: email || "Anonymous", inline: true },
        {
          name: "Details / Procedures / Links",
          value: details || "No details provided.",
        },
      ],
    );

    return { success: true };
  } catch (error) {
    console.error("Webhook/Server error:", error);
    return {
      success: false,
      error: "Failed to submit. Please try again later.",
    };
  }
}

export async function submitReport(
  formData: FormData,
  captchaToken: string | null | undefined,
): Promise<ActionResult> {
  try {
    const blocked = await guard("report", captchaToken);
    if (blocked) return { success: false, error: blocked };

    const parsed = reportSchema.safeParse({
      targetInfo: formData.get("targetInfo") ?? "",
      description: formData.get("description") ?? "",
      referenceUrl: formData.get("referenceUrl") ?? "",
      email: formData.get("email") ?? "",
    });

    if (!parsed.success) {
      return {
        success: false,
        error: firstError(parsed.error.flatten().fieldErrors),
      };
    }

    const { targetInfo, description, referenceUrl, email } = parsed.data;

    await sendToDiscord(`Outdated/Incorrect Info: ${targetInfo}`, 16753920, [
      { name: "Contact Email", value: email || "Anonymous", inline: true },
      { name: "Reference", value: referenceUrl || "None", inline: true },
      { name: "Correction", value: description },
    ]);

    return { success: true };
  } catch (error) {
    console.error("Report webhook error:", error);
    return {
      success: false,
      error: "Failed to submit. Please try again later.",
    };
  }
}
