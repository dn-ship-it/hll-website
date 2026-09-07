"use client";

import { useMemo, useState } from "react";

import type { TeamMember, TeamPageContent } from "@/data/team-page";
import { MediaPlaceholder, SectionTitle } from "@/components/marketing/home/primitives";

import { TeamSectionLabel } from "./team-chrome";

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article>
      <MediaPlaceholder
        className={`aspect-[3/4] w-full ${
          member.featured
            ? "min-h-[clamp(14rem,32vw,20rem)]"
            : "min-h-[clamp(12rem,28vw,18rem)]"
        }`}
        label={member.name}
      />
      <p className="mt-4 text-sm font-medium text-black">{member.name}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-black/50">{member.role}</p>
      <p className="mt-2 text-[10px] uppercase leading-5 tracking-[0.12em] text-black/45">
        {member.bio}
      </p>
    </article>
  );
}

export function TeamGridSection({
  content,
  members,
  accentColor,
}: {
  content: TeamPageContent["grid"];
  members: TeamMember[];
  accentColor: string;
}) {
  const [activeFilter, setActiveFilter] = useState<(typeof content.filters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return members;
    return members.filter((member) => member.department === activeFilter);
  }, [activeFilter, members]);

  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <TeamSectionLabel title={content.eyebrow} accentColor={accentColor} />
        <SectionTitle>{content.title}</SectionTitle>

        <div className="mt-8 flex flex-wrap gap-2">
          {content.filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.14em] transition ${
                activeFilter === filter.id
                  ? "border-black/25 bg-black text-white"
                  : "border-black/12 bg-white text-black/60 hover:border-black/25"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div
          className="mt-10 grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))",
          }}
        >
          {filtered.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-sm text-black/55">No team members in this group yet.</p>
        ) : null}
      </div>
    </section>
  );
}
