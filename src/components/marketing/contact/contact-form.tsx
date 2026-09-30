"use client";

import { useActionState } from "react";

import { HLLButton } from "@/components/hll";
import type { ContactPageContent } from "@/data/contact-page";

import { sendEnquiry, type EnquiryState } from "./actions";

const LABEL =
  "block text-[14px] uppercase leading-[1.16] tracking-[0.25em] text-[var(--hll-dark-grey)]";
const FIELD =
  "block w-full bg-transparent text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)] outline-none";

/**
 * Figma Contact form: uppercase labels 13px in from a Mid Grey hairline that
 * runs the 864px column; "How can we help?" gets the tall field.
 */
export function ContactForm({ data }: { data: ContactPageContent["form"] }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(
    sendEnquiry,
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="text-[clamp(1.5rem,2.38vw,2.25rem)] leading-[1.16] text-[var(--hll-dark-grey)]"
      >
        {data.successMessage}
      </p>
    );
  }

  return (
    <form action={action} noValidate data-fade-up>
      {data.fields.map((field) => {
        const error = state.errors?.[field.id];
        const tall = field.type === "textarea";
        return (
          <div key={field.id} className="mb-[84px]">
            <label
              htmlFor={`contact-${field.id}`}
              className={`pl-[13px] ${LABEL}`}
            >
              {field.label}
            </label>
            {tall ? (
              <textarea
                id={`contact-${field.id}`}
                name={field.id}
                required={field.required}
                aria-invalid={Boolean(error)}
                rows={5}
                className={`${FIELD} mt-[7px] h-[182px] resize-none px-[13px]`}
              />
            ) : (
              <input
                id={`contact-${field.id}`}
                name={field.id}
                type={field.type}
                required={field.required}
                aria-invalid={Boolean(error)}
                autoComplete={
                  field.type === "email"
                    ? "email"
                    : field.id === "name"
                      ? "name"
                      : "off"
                }
                className={`${FIELD} mt-[7px] h-[25px] px-[13px]`}
              />
            )}
            <div
              data-line
              className={`h-px ${error ? "bg-[#FA2427]" : "bg-[var(--hll-mid-grey)]"}`}
            />
            {error ? (
              <p
                role="alert"
                className="mt-2 pl-[13px] text-[14px] text-[#FA2427]"
              >
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      {state.status === "error" && !state.errors ? (
        <p
          role="alert"
          className="-mt-10 mb-8 pl-[13px] text-[14px] text-[#FA2427]"
        >
          {data.errorMessage}
        </p>
      ) : null}

      <div className="-mt-5 flex justify-end pr-[13px]">
        <HLLButton
          as="button"
          type="submit"
          variant="contact"
          size="md"
          isLoading={pending}
        >
          {data.submitLabel}
        </HLLButton>
      </div>
    </form>
  );
}
