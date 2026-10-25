export type ContactFormField = {
  id: "name" | "email" | "message" | "source";
  label: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
};

export type ContactOffice = {
  id: string;
  country: string;
  company: string;
  address: string;
  /** Shown under the address when filled in (QA CT-02). */
  phone?: string;
  email?: string;
  taxLabel?: string;
  taxId?: string;
};

/** Figma Desktop › Contact (1341:11841). */
export type ContactPageContent = {
  title: string;
  /** The line under the title (QA CT-02). */
  intro: string;
  form: {
    fields: ContactFormField[];
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
  };
  /** The 1452 × 396 image between the form and the offices. */
  image?: string | null;
  offices: {
    eyebrow: string;
    title: string;
    items: ContactOffice[];
  };
  getInTouch: {
    eyebrow: string;
    title: string;
    text: string;
    email: string;
    scheduleLabel: string;
    scheduleHref: string;
  };
};

export const contactPageContent: ContactPageContent = {
  title: "Contact",
  intro: "We reply to all messages and requests within 2 working days.",
  form: {
    fields: [
      { id: "name", label: "Your name", type: "text", required: true },
      { id: "email", label: "Your company email", type: "email", required: true },
      { id: "message", label: "How can we help?", type: "textarea", required: true },
      { id: "source", label: "How did you hear about us?", type: "text" },
    ],
    submitLabel: "Send message",
    successMessage: "Thanks — your message has reached us. We'll be in touch shortly.",
    errorMessage: "Something went wrong sending your message. Please try again, or email us directly.",
  },
  image: null,
  offices: {
    eyebrow: "Contact",
    title: "Our offices",
    items: [
      {
        id: "india-pune",
        country: "India",
        company: "Alpha OBS LLP",
        address: "Baner,\nPune – 411045, India",
        taxLabel: "GSTIN:",
        taxId: "27ABKFA6790L1ZS",
      },
      {
        id: "india-goa",
        country: "India",
        company: "Studio Poppy",
        address: "Parra,\nGoa 403517, India",
        taxLabel: "GSTIN:",
        taxId: "27ADNPH4729D1ZJ",
      },
      {
        id: "us",
        country: "United States",
        company: "Hyper Lychee Labs",
        address: "Laird Circle,\nSanta Clara – 95054, US",
        taxLabel: "EIN No:",
        taxId: "85-0798460",
      },
    ],
  },
  getInTouch: {
    eyebrow: "Contact",
    title: "Get in touch",
    text: "Prefer to talk it through? Book a call with us, or reach the office closest to you.",
    email: "hannan@hyperlycheelabs.com",
    scheduleLabel: "Schedule a call",
    // No booking link yet: opens an email asking for a call.
    scheduleHref: "mailto:hannan@hyperlycheelabs.com?subject=Schedule%20a%20call",
  },
};
