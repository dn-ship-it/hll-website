"use client";

import { useState } from "react";

import type { ContactOffice } from "@/data/contact-page";

/** Figma "Contact – v2 (accordion)": the countries in this order; any other
 *  country in the CMS follows them. */
const COUNTRY_ORDER = ["India", "United States", "Saudi Arabia", "Netherlands"];
const FLAGS: Record<string, string> = {
  India: "/assets/contact/flags/in.svg",
  "United States": "/assets/contact/flags/us.svg",
  "Saudi Arabia": "/assets/contact/flags/sa.svg",
  Netherlands: "/assets/contact/flags/nl.svg",
};

const LABEL = "hll-label text-[10px] uppercase leading-[1.2] text-[var(--hll-dark-grey)] lg:text-[12px]";
const VALUE = "text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]";

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className={LABEL} style={{ fontFamily: "var(--hll-font-functional)" }}>
        {label}
      </p>
      <div className={`mt-[6px] lg:mt-2 ${VALUE}`}>{children}</div>
    </div>
  );
}

/**
 * QA CT-02: one accordion row per country (flag, name, plus / minus), the
 * first open on load and one open at a time, as the job description's. An
 * open country lists its offices: company, address, and phone and email
 * where they're filled in the CMS.
 */
export function ContactOffices({ offices }: { offices: readonly ContactOffice[] }) {
  const byCountry = new Map<string, ContactOffice[]>();
  for (const office of offices) {
    byCountry.set(office.country, [...(byCountry.get(office.country) ?? []), office]);
  }
  const rank = (country: string) => {
    const i = COUNTRY_ORDER.indexOf(country);
    return i < 0 ? COUNTRY_ORDER.length : i;
  };
  const countries = [...byCountry.keys()].sort((a, b) => rank(a) - rank(b));
  const [open, setOpen] = useState<string | null>(countries[0] ?? null);

  return (
    <div>
      <div data-line className="-mx-3 h-px bg-[var(--hll-mid-grey)] lg:mx-0" />
      {countries.map((country) => {
        const isOpen = open === country;
        const id = `office-${country.toLowerCase().replace(/[^a-z]+/g, "-")}`;
        return (
          <div key={country}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : country)}
              className="flex w-full cursor-pointer items-center gap-5 py-[13px] text-left lg:py-[13px] lg:pl-[3px] lg:pr-[41px]"
            >
              {FLAGS[country] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={FLAGS[country]} alt="" className="size-7 shrink-0 rounded-full lg:size-9" />
              ) : (
                <span aria-hidden className="size-7 shrink-0 rounded-full bg-[var(--hll-light-grey)] lg:size-9" />
              )}
              <span className="flex-1 text-[10px] uppercase leading-[1.2] tracking-[0.25em] text-[var(--hll-dark-grey)] lg:text-[14px]">
                {country}
              </span>
              <span aria-hidden className="text-[18px] leading-none text-[var(--hll-dark-grey)] lg:text-[20px]">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div id={id} hidden={!isOpen}>
              <ul className="space-y-12 pb-12 pt-6 lg:ml-[28.4%] lg:space-y-[70px] lg:pb-[50px] lg:pt-[18px]">
                {(byCountry.get(country) ?? []).map((office) => (
                  <li key={office.id}>
                    <p className="text-[20px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(1.92*var(--vw)),1.8125rem)]">
                      {office.company}
                    </p>
                    <div className="mt-6 space-y-6 lg:mt-[22px] lg:space-y-[22px]">
                      {office.address ? (
                        <Detail label="Address">
                          <p className="whitespace-pre-line">{office.address}</p>
                        </Detail>
                      ) : null}
                      {office.phone || office.email ? (
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-0">
                          {office.phone ? (
                            <Detail label="Phone">
                              <a href={`tel:${office.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                                {office.phone}
                              </a>
                            </Detail>
                          ) : null}
                          {office.email ? (
                            <Detail label="Email">
                              <a href={`mailto:${office.email}`} className="break-all hover:underline">
                                {office.email}
                              </a>
                            </Detail>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div data-line className="-mx-3 h-px bg-[var(--hll-mid-grey)] lg:mx-0" />
          </div>
        );
      })}
    </div>
  );
}
