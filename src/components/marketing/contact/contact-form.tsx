"use client";

import { useActionState } from "react";

import { HLLButton } from "@/components/hll";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
import type { ContactPageContent } from "@/data/contact-page";

import { sendEnquiry, type EnquiryState } from "./actions";

const LABEL =
  "block text-[10px] uppercase leading-[1.16] tracking-[0.25em] text-[var(--hll-dark-grey)] lg:text-[14px]";
const FIELD =
  "block w-full bg-transparent text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] outline-none lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]";

/**
 * Figma Contact form: uppercase labels 13px in from a Mid Grey hairline that
 * runs the 864px column; "How can we help?" gets the tall field. Mobile: 10px
 * labels at the gutter, hairlines to 8px from the edges, fields 32px apart.
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
        className="text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] leading-[1.16] text-[var(--hll-dark-grey)]"
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
          <div key={field.id} className="mb-8 lg:mb-[84px]">
            <label
              htmlFor={`contact-${field.id}`}
              className={`lg:pl-[13px] ${LABEL}`}
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
                className={`${FIELD} mt-[6px] h-[148px] resize-none lg:mt-[7px] lg:h-[182px] lg:px-[13px]`}
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
                className={`${FIELD} h-[18px] lg:mt-[7px] lg:h-[25px] lg:px-[13px]`}
              />
            )}
            <div
              data-line
              className={`-mx-3 h-px lg:mx-0 ${error ? "bg-[#FA2427]" : "bg-[var(--hll-mid-grey)]"}`}
            />
            {error ? (
              <p
                role="alert"
                className="mt-2 text-[12px] text-[#FA2427] lg:pl-[13px] lg:text-[14px]"
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

      {/* Mobile: Submit centred 84px under the last hairline (its margin
          collapses with the field's 32px below). */}
      <div className="mt-[83px] flex justify-center lg:-mt-5 lg:justify-end lg:pr-[13px]">
        <HLLButton
          as="button"
          type="submit"
          variant="contact"
          size="md"
          isLoading={pending}
          className={BUTTON_MOBILE}
        >
          {data.submitLabel}
        </HLLButton>
      </div>
    </form>
  );
}
