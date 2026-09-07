"use client";

import { useState } from "react";

import type { ContactFormField, ContactPageContent } from "@/data/contact-page";
import { SectionTitle } from "@/components/marketing/home/primitives";

import {
  ContactFieldLabel,
  ContactSelect,
  ContactTextarea,
  ContactTextInput,
} from "./contact-chrome";

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;
type FormStatus = "idle" | "success" | "error";

function validateField(field: ContactFormField, value: string): string | null {
  const trimmed = value.trim();

  if (field.required && !trimmed) {
    return `${field.label} is required.`;
  }

  if (field.type === "email" && trimmed) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return "Enter a valid email address.";
    }
  }

  if (field.id === "message" && trimmed && trimmed.length < 20) {
    return "Message should be at least 20 characters.";
  }

  return null;
}

function validateForm(fields: readonly ContactFormField[], values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of fields) {
    const error = validateField(field, values[field.id] ?? "");
    if (error) errors[field.id] = error;
  }

  return errors;
}

export function ContactFormSection({ data }: { data: ContactPageContent["form"] }) {
  const initialValues = Object.fromEntries(data.fields.map((field) => [field.id, ""]));
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(data.fields, values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      // UI-only submission — wire to POST /api/contact when backend is ready.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="contact-form">
      <SectionTitle>{data.title}</SectionTitle>

      {status === "success" ? (
        <p
          className="mt-6 rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          {data.successMessage}
        </p>
      ) : null}

      {status === "error" && Object.keys(errors).length === 0 ? (
        <p
          className="mt-6 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {data.errorMessage}
        </p>
      ) : null}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        {data.fields.map((field) => {
          const error = errors[field.id];
          const value = values[field.id] ?? "";

          return (
            <div key={field.id}>
              <ContactFieldLabel htmlFor={field.id} required={field.required}>
                {field.label}
              </ContactFieldLabel>

              <div className="mt-2">
                {field.type === "textarea" ? (
                  <ContactTextarea
                    id={field.id}
                    name={field.id}
                    value={value}
                    placeholder={field.placeholder}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${field.id}-error` : undefined}
                    onChange={(event) => handleChange(field.id, event.target.value)}
                  />
                ) : field.type === "select" ? (
                  <ContactSelect
                    id={field.id}
                    name={field.id}
                    value={value}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${field.id}-error` : undefined}
                    onChange={(event) => handleChange(field.id, event.target.value)}
                  >
                    <option value="">Select a topic</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </ContactSelect>
                ) : (
                  <ContactTextInput
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={value}
                    placeholder={field.placeholder}
                    autoComplete={field.type === "email" ? "email" : "name"}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${field.id}-error` : undefined}
                    onChange={(event) => handleChange(field.id, event.target.value)}
                  />
                )}
              </div>

              {error ? (
                <p id={`${field.id}-error`} className="mt-2 text-xs text-red-600" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex rounded-full border border-black/20 bg-black px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : data.submitLabel}
        </button>
      </form>
    </div>
  );
}
