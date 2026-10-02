"use client";

import { useState } from "react";

import type { TeamMember } from "@/data/team-page";

/**
 * Figma Team mobile › Leadership: "Simple accordion that expands. Name and
 * title move below, image expands and description comes in." Collapsed rows
 * are a 93px photo with the name and role 12px right and a "+"; the open row's
 * photo grows to 319px with the name, role and bio under it and a "–".
 */
export function TeamAccordion({ people }: { people: TeamMember[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="px-5 lg:hidden">
      {people.map((person, i) => {
        const isOpen = open === person.id;
        const prevOpen = i > 0 && open === people[i - 1].id;
        return (
          <li
            key={person.id}
            className={`transition-[margin] duration-500 ${
              i === 0 ? "" : isOpen || prevOpen ? "mt-8" : "mt-[10px]"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : person.id)}
              className={`relative flex w-full text-left ${isOpen ? "flex-col" : "items-start gap-3"}`}
            >
              <span
                className={`block shrink-0 overflow-hidden rounded-lg bg-[#D9D9D9] transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? "size-[319px] max-w-full" : "size-[93px]"
                }`}
                style={
                  person.photoUrl
                    ? { background: `#D9D9D9 url(${person.photoUrl}) center / cover` }
                    : undefined
                }
              />
              <span className={isOpen ? "mt-2 block pr-8" : "block pr-8"}>
                <span className="block text-[24px] leading-[27.8px] text-black">{person.name}</span>
                <span
                  className="block text-[10px] uppercase leading-[12px] text-[var(--hll-dark-grey)]"
                  style={{ fontFamily: "var(--hll-font-functional)" }}
                >
                  {person.role}
                </span>
              </span>
              {/* "+" closed, "–" open: two 17px hairlines. */}
              <span
                aria-hidden
                className={`absolute right-0 size-[17px] ${isOpen ? "top-3" : "top-[5px]"}`}
              >
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-black" />
                <span
                  className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black transition-transform duration-300 ${
                    isOpen ? "scale-y-0" : ""
                  }`}
                />
              </span>
            </button>
            {isOpen && person.bio ? (
              <p className="mt-3 max-w-[318px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] [animation:page-intro-in_600ms_150ms_cubic-bezier(0.22,1,0.36,1)_both]">
                {person.bio}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
