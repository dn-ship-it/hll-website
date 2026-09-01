"use client";

import Image from "next/image";
import {
  animationKit,
  apis,
  assumptions,
  cursorMultiplier,
  existingHllPages,
  headline,
  hoursFor,
  ia,
  risks,
  scenarios,
  sources,
  workstreams,
} from "@/data/estimate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function days(hours: number) {
  return (hours / 8).toFixed(1);
}

function HourBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-cyan-400"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function EstimateDashboard() {
  const likely = hoursFor("likely");
  const opt = hoursFor("opt");
  const pess = hoursFor("pess");
  const uiLikely = hoursFor("likely", "UI");
  const apiLikely = hoursFor("likely", "API");
  const qaLikely = hoursFor("likely", "QA");
  const maxLikely = Math.max(...workstreams.map((w) => w.hours.likely));

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-zinc-100">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-cyan-400 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-black">
                DSGN. EXPLORATION
              </span>
              <span className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-zinc-400">
                HLL × Cornerstone India
              </span>
            </div>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
              {headline.recommendedDays} working days
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              To ship the Cornerstone UI with content APIs, using the LightFX
              animation kit you already have, and Cursor as the implementation
              tool. That is {headline.recommendedHours} hours for{" "}
              {headline.team}. Building the shaders from scratch would have
              added {headline.animationSavedWeeks} weeks.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-right">
            {[
              { label: "UI", value: `${days(uiLikely)}d` },
              { label: "APIs", value: `${days(apiLikely)}d` },
              { label: "QA", value: `${days(qaLikely)}d` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <div className="text-[11px] uppercase tracking-wide text-zinc-500">
                  {s.label}
                </div>
                <div className="mt-1 text-xl font-semibold tabular-nums">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue="summary">
          <TabsList className="mb-6 h-auto w-full flex-wrap justify-start gap-1 bg-white/5 p-1">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="work">Workstreams</TabsTrigger>
            <TabsTrigger value="apis">APIs</TabsTrigger>
            <TabsTrigger value="kit">Animation kit</TabsTrigger>
            <TabsTrigger value="risks">Assumptions</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-8">
            <section className="grid gap-4 md:grid-cols-3">
              {scenarios.map((s) => (
                <Card
                  key={s.id}
                  className={
                    "recommended" in s && s.recommended
                      ? "bg-[#141414] ring-1 ring-cyan-400/50"
                      : "bg-[#141414]"
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle>{s.name}</CardTitle>
                      {"recommended" in s && s.recommended ? (
                        <Badge className="bg-cyan-400 text-black">Recommended</Badge>
                      ) : null}
                    </div>
                    <CardDescription className="text-zinc-400">
                      {s.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-3xl font-semibold tabular-nums">
                        {s.days}
                      </div>
                      <div className="text-xs text-zinc-500">
                        working days · {s.hours} hours · {s.people}
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400">{s.fit}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="bg-[#141414]">
                <CardHeader>
                  <CardTitle>What the Figma file actually showed</CardTitle>
                  <CardDescription>
                    Node 16:3 is the project board, not a website screen. The
                    marketing frames live in the Pages cluster next to Cover.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-white/10">
                    <Image
                      src="/figma-board.webp"
                      alt="Figma file HLL Cornerstone India at 11 percent zoom, showing Cover, Pages, Status, Tags, and Master status rows"
                      width={1440}
                      height={900}
                      className="h-auto w-full"
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Cover is labelled “Cornerstone Website” by designer Anjali.
                    Status tags run Draft → In Dev → Released. Export is
                    restricted and Dev Mode needs a Figma login, so this
                    estimate infers IA from the animation kit variants rather
                    than a pixel-perfect screen count.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#141414]">
                <CardHeader>
                  <CardTitle>Inferred site map</CardTitle>
                  <CardDescription>
                    From HLLButton variants in the live docs playground.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-wide text-zinc-500">
                      Primary nav
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ia.nav.map((item) => (
                        <span
                          key={item.id}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs"
                          style={{ boxShadow: `inset 0 -2px 0 ${item.color}` }}
                        >
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-wide text-zinc-500">
                      Service verticals
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {ia.services.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2"
                        >
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${item.colors[0]}, ${item.colors[1]})`,
                            }}
                          />
                          <span className="text-sm">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Plus Home, shared chrome, and CMS-driven inner pages
                    (tenders, careers, media) that the current HLL site already
                    publishes.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Optimistic",
                  hours: opt,
                  note: "Pages cluster is ~12 templates; first-pass APIs",
                },
                {
                  label: "Likely",
                  hours: likely,
                  note: "Recommended planning number",
                },
                {
                  label: "Pessimistic",
                  hours: pess,
                  note: "Many unique Figma screens or bilingual in v1",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="rounded-xl border border-white/10 bg-[#141414] px-4 py-4"
                >
                  <div className="text-[11px] uppercase tracking-wide text-zinc-500">
                    {row.label}
                  </div>
                  <div className="mt-1 text-2xl font-semibold tabular-nums">
                    {days(row.hours)} days
                  </div>
                  <div className="text-xs text-zinc-500">{row.hours} hours</div>
                  <p className="mt-2 text-sm text-zinc-400">{row.note}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="mb-3 text-lg font-medium">Evidence used</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {sources.map((s) => (
                  <Card key={s.name} className="bg-[#141414]" size="sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{s.name}</CardTitle>
                        <Badge variant="outline">{s.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {s.detail}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="work" className="space-y-6">
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">
              Bottom-up hours for the recommended UI + APIs slice. One working
              day = 8 hours. Cursor speeds layout and CRUD; it does not remove
              Figma QA or WebGL performance work. Totals: optimistic {opt}h,
              likely {likely}h, pessimistic {pess}h.
            </p>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-zinc-400">Workstream</TableHead>
                    <TableHead className="text-zinc-400">Area</TableHead>
                    <TableHead className="text-right text-zinc-400">Opt</TableHead>
                    <TableHead className="text-right text-zinc-400">Likely</TableHead>
                    <TableHead className="text-right text-zinc-400">Pess</TableHead>
                    <TableHead className="hidden min-w-40 text-zinc-400 sm:table-cell">
                      Load
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workstreams.map((w) => (
                    <TableRow key={w.id} className="border-white/10">
                      <TableCell>
                        <div className="font-medium">{w.name}</div>
                        <div className="max-w-sm text-xs text-zinc-500">
                          {w.work}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{w.area}</Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {w.hours.opt}h
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium">
                        {w.hours.likely}h
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {w.hours.pess}h
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <HourBar value={w.hours.likely} max={maxLikely} />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-white/10 bg-white/5 font-medium">
                    <TableCell>Total</TableCell>
                    <TableCell />
                    <TableCell className="text-right tabular-nums">{opt}h</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {likely}h
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{pess}h</TableCell>
                    <TableCell className="hidden sm:table-cell" />
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-zinc-500">
              Cursor effect used in these numbers: {cursorMultiplier.uiBoilerplate}.{" "}
              {cursorMultiplier.apis}. {cursorMultiplier.shaders}.{" "}
              {cursorMultiplier.compliance}.
            </p>
          </TabsContent>

          <TabsContent value="apis" className="space-y-6">
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">
              APIs the recommended slice needs. Prefer a headless CMS
              (Payload) so editors are not a custom admin. Full RFP modules
              beyond this list: bilingual content, AI chatbot/FAQ, visitor
              counter, RTI, heritage, STQC-safe hosting.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {apis.map((group) => (
                <Card key={group.group} className="bg-[#141414]">
                  <CardHeader>
                    <CardTitle>{group.group}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="border-l-2 border-cyan-400/40 pl-3"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-[#141414]">
              <CardHeader>
                <CardTitle>Current lifecarehll.com surfaces to migrate later</CardTitle>
                <CardDescription>
                  Not all of these are unique templates. Most collapse into CMS
                  pages once the five nav templates exist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
                  {existingHllPages.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kit" className="space-y-6">
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">
              From{" "}
              <a
                className="text-cyan-400 underline-offset-2 hover:underline"
                href="https://hok-sdf-lensblur-lyart.vercel.app/docs.html"
              >
                the HLL Button docs
              </a>
              . These are component folders to copy into{" "}
              <code className="rounded bg-white/10 px-1">src/components/</code>
              — not a full app. Dependencies:{" "}
              <code className="rounded bg-white/10 px-1">three</code> and{" "}
              <code className="rounded bg-white/10 px-1">
                class-variance-authority
              </code>
              .
            </p>
            <div className="grid gap-3">
              {animationKit.map((c) => (
                <div
                  key={c.name}
                  className="grid gap-3 rounded-xl border border-white/10 bg-[#141414] p-4 sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{c.name}</h3>
                      <Badge variant="outline">{c.folder}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{c.role}</p>
                  </div>
                  <div className="text-sm sm:text-right">
                    <div className="text-zinc-500">If built new: {c.effortIfNew}</div>
                    <div className="text-cyan-300">With kit: {c.effortNow}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-medium">Assumptions</h2>
              <ul className="space-y-2 text-sm text-zinc-400">
                {assumptions.map((a) => (
                  <li key={a} className="rounded-lg border border-white/10 bg-[#141414] px-4 py-3">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="bg-white/10" />
            <div>
              <h2 className="mb-3 text-lg font-medium">Risks that move the date</h2>
              <Accordion>
                {risks.map((r, i) => (
                  <AccordionItem key={r.risk} value={`r-${i}`}>
                    <AccordionTrigger className="text-left text-zinc-100 hover:no-underline">
                      {r.risk}
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-400">
                      <p className="mb-2">
                        <span className="text-zinc-500">Impact: </span>
                        {r.impact}
                      </p>
                      <p>
                        <span className="text-zinc-500">Mitigation: </span>
                        {r.mitigation}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
