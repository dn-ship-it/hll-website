import nodemailer from "nodemailer";

/**
 * Emails a new Contact enquiry through Google Workspace (SMTP), chosen by Hannan on 21 Nov. Set in Vercel:
 * SMTP_HOST (smtp.gmail.com), SMTP_PORT (465), SMTP_USER (the sending account), SMTP_PASS (its App Password) and
 * ENQUIRY_TO (who receives them, comma-separated). Without them nothing is sent; the enquiry is still saved.
 */
export type EnquiryMail = { name: string; email: string; message: string; source: string };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function enquiryEmailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.ENQUIRY_TO);
}

/** One connection setup, reused while the server stays warm. */
let transport: nodemailer.Transporter | null = null;
function getTransport() {
  if (transport) return transport;
  const port = Number(process.env.SMTP_PORT || 465);
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // Give up after 10s rather than nodemailer's 2-minute defaults if the mail server hangs.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });
  return transport;
}

export async function sendEnquiryEmail(e: EnquiryMail) {
  if (!enquiryEmailConfigured()) return false;
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["How did you hear about us", e.source || "-"],
  ];
  await getTransport().sendMail({
    from: `"Hyper Lychee Labs website" <${process.env.SMTP_USER}>`,
    to: process.env.ENQUIRY_TO,
    // Reply goes straight to the person who wrote in.
    replyTo: { name: e.name, address: e.email },
    subject: `New enquiry from ${e.name}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${e.message}`,
    html: `<table cellpadding="4">${rows
      .map(([k, v]) => `<tr><td><b>${escape(k)}</b></td><td>${escape(v)}</td></tr>`)
      .join("")}</table><p><b>Message</b></p><p style="white-space:pre-wrap">${escape(e.message)}</p>`,
  });
  return true;
}
