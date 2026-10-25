"use client";

import { useActionState, useState } from "react";

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
  // "Send another message" starts a fresh form.
  const [round, setRound] = useState(0);
  return <EnquiryForm key={round} data={data} onAgain={() => setRound((r) => r + 1)} />;
}

function EnquiryForm({
  data,
  onAgain,
}: {
  data: ContactPageContent["form"];
  onAgain: () => void;
}) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(
    sendEnquiry,
    { status: "idle" },
  );

  if (state.status === "success") {
    return <MessageSent data={data} sent={state.sent} onAgain={onAgain} />;
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

const RECAP_LABEL =
  "hll-label text-[11px] uppercase leading-[1.2] text-[var(--hll-mid-grey)] lg:text-[12px]";
const RECAP_VALUE =
  "mt-2 text-[16px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]";

/**
 * Figma "Contact – Message sent" (QA, 25 Oct: the old one-liner sat out of
 * line with the page): in the form's place, a ticked "Message sent" label,
 * "Thanks, <first name>." with the reply time, a recap of what was sent
 * between two hairlines, and "Send another message".
 */
function MessageSent({
  data,
  sent,
  onAgain,
}: {
  data: ContactPageContent["form"];
  sent?: EnquiryState["sent"];
  onAgain: () => void;
}) {
  const first = sent?.name.split(/\s+/)[0];
  return (
    <div role="status">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--hll-dark-grey)]"
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4.2 3.6 6.6 9 1"
              stroke="var(--hll-dark-grey)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p
          className="text-[11px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]"
          style={{ fontFamily: "var(--hll-font-functional)" }}
        >
          Message sent
        </p>
      </div>

      <p className="mt-5 text-[28px] font-light leading-[1.18] text-[var(--hll-dark-grey)] lg:mt-7 lg:text-[clamp(1.75rem,calc(2.65*var(--vw)),2.5rem)] lg:leading-[1.15]">
        {first ? `Thanks, ${first}. ` : "Thanks. "}
        {data.successMessage}
      </p>

      {sent ? (
        <div className="mt-5 space-y-4 border-y border-[#E3E3E3] py-[18px] lg:mt-7 lg:space-y-5 lg:py-6">
          <div className="space-y-4 lg:grid lg:max-w-[832px] lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <dl>
              <dt className={RECAP_LABEL} style={{ fontFamily: "var(--hll-font-functional)" }}>Name</dt>
              <dd className={RECAP_VALUE}>{sent.name}</dd>
            </dl>
            <dl>
              <dt className={RECAP_LABEL} style={{ fontFamily: "var(--hll-font-functional)" }}>Email</dt>
              <dd className={`break-all ${RECAP_VALUE}`}>{sent.email}</dd>
            </dl>
          </div>
          <dl className="lg:max-w-[832px]">
            <dt className={RECAP_LABEL} style={{ fontFamily: "var(--hll-font-functional)" }}>Your message</dt>
            <dd className={`whitespace-pre-line ${RECAP_VALUE}`}>{sent.message}</dd>
          </dl>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onAgain}
        className="mt-5 text-[11px] uppercase leading-[1.2] tracking-[0.06em] text-[var(--hll-dark-grey)] underline underline-offset-2 hover:opacity-60 lg:mt-7 lg:text-[12px]"
        style={{ fontFamily: "var(--hll-font-functional)" }}
      >
        Send another message
      </button>
    </div>
  );
}
