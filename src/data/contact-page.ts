export type ContactFormField = {
  id: string;
  label: string;
  type: "text" | "email" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
};

export type ContactLocation = {
  id: string;
  city: string;
  address: string;
  label?: string;
};

export type ContactPageContent = {
  breadcrumb: readonly string[];
  accentColor: string;
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  form: {
    title: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
    fields: ContactFormField[];
  };
  details: {
    eyebrow: string;
    title: string;
    email: string;
    linkedin: string;
    linkedinLabel: string;
  };
  locations: {
    eyebrow: string;
    title: string;
    items: ContactLocation[];
  };
};

export const contactPageContent: ContactPageContent = {
  breadcrumb: ["Contact"],
  accentColor: "#076EB8",
  hero: {
    eyebrow: "Contact",
    headline: "Let's start a conversation",
    description:
      "Share your project timeline, design references, or integration constraints. We'll respond with a delivery plan and next steps.",
  },
  form: {
    title: "Write to us",
    submitLabel: "Send message",
    successMessage: "Thanks — your message has been received. We'll be in touch shortly.",
    errorMessage: "Something went wrong. Please check the form and try again.",
    fields: [
      {
        id: "name",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Your name",
      },
      {
        id: "email",
        label: "Work email",
        type: "email",
        required: true,
        placeholder: "you@company.com",
      },
      {
        id: "company",
        label: "Company",
        type: "text",
        placeholder: "Organization",
      },
      {
        id: "topic",
        label: "Topic",
        type: "select",
        required: true,
        options: [
          "General enquiry",
          "Services",
          "Engagement model",
          "Careers",
          "Partnership",
        ],
      },
      {
        id: "message",
        label: "Message",
        type: "textarea",
        required: true,
        placeholder: "Tell us about your project or question…",
      },
    ] satisfies ContactFormField[],
  },
  details: {
    eyebrow: "Reach us",
    title: "Direct channels",
    email: "hello@hyperlychee.com",
    linkedin: "https://linkedin.com/company/hyper-lychee-labs",
    linkedinLabel: "LinkedIn",
  },
  locations: {
    eyebrow: "Offices",
    title: "Find us",
    items: [
      {
        id: "santa-clara",
        city: "Santa Clara",
        label: "HQ",
        address: "Laird Circle, Santa Clara, CA 95054, USA",
      },
      {
        id: "global",
        city: "Global delivery",
        address: "India · Netherlands · Bangladesh",
      },
    ] satisfies ContactLocation[],
  },
};

