"use server";

import { getPayloadClient } from "@/lib/payload/client";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  errors?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Stores a Contact page message in the CMS (Enquiries). */
export async function sendEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();
  const data = {
    name: read("name"),
    email: read("email"),
    message: read("message"),
    source: read("source"),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please add your name.";
  if (!EMAIL.test(data.email)) errors.email = "Please add a valid email.";
  if (!data.message) errors.message = "Please tell us how we can help.";
  if (Object.keys(errors).length) return { status: "error", errors };

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "enquiries",
      data,
      overrideAccess: true,
    });
    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
