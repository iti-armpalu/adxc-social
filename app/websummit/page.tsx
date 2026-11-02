/* ============================================================
   LinkedIn — Web Summit 2026 campaign (square 1080 × 1080)
   Route: /websummit
     ?phase=before | during | after | all   (default: before)
     &export=1   renders every post at 1080 × 1080 for export

   30 posts: 10 per phase. Shared "edition bar" + Lisbon tile
   motif tie the campaign together; phase is signalled by
   colour and the live dot (during).

   All numbers, quotes, names, dates and stand IDs are SAMPLE /
   placeholder copy. Replace before posting. Don't use Web
   Summit's own logo or marks without their brand approval.
   ============================================================ */

import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { Suspense } from "react"
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  ImageIcon,
  MapPin,
  Mic,
  QrCode,
  Quote,
  Tag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo, logoVarsFor } from "@/components/brand/logo"

export const metadata: Metadata = {
  title: "Web Summit posts",
  robots: { index: false, follow: false },
}

/* ---------- placeholders ---------- */
const STAND = "[A-000]"
const DATES = "[Dates]"
const URL = "adxc.ai/websummit"

/* ---------- shared building blocks ---------- */

const PAD = "p-[7.4cqw]"

/** Azulejo-inspired tile motif, built from the brand palette. */
const TILE: CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 50% 50%, transparent 30%, var(--color-brand-700) 31% 35%, transparent 36%)," +
    "conic-gradient(from 45deg, var(--color-brand-900) 25%, var(--color-brand-950) 0 50%, var(--color-brand-900) 0 75%, var(--color-brand-950) 0)",
  backgroundSize: "10cqw 10cqw",
}

type Phase = "before" | "during" | "after"

function Post({ n, name, className, children }: { n: string; name: string; className?: string; children: ReactNode }) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        style={logoVarsFor(className)}
        className={cn(
          "@container relative aspect-square w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-border",
          className,
        )}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
      <figcaption className="flex items-baseline gap-2 text-sm text-muted-foreground">
        <span className="font-mono text-xs">{n}</span>
        <span className="font-medium text-foreground">{name}</span>
      </figcaption>
    </figure>
  )
}

function Wordmark({
  className,
  variant,
  mark,
}: {
  className?: string
  variant?: "auto" | "mono"
  mark?: boolean
}) {
  // Size with text-* (logo height ≈ 1.15em); colour via currentColor or the post's light-bg vars
  return (
    <span className={cn("inline-flex items-center leading-none", className)}>
      <Logo variant={variant} mark={mark} className="h-[1.15em]" />
    </span>
  )
}

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[2.4cqw] font-semibold uppercase leading-none tracking-[0.12em]", className)}>{children}</p>
  )
}

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.8cqw] rounded-full px-[2.2cqw] py-[0.9cqw] text-[2.4cqw] font-semibold leading-none",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Top bar on every post: wordmark + event tag (+ live dot during the event). */
function EditionBar({ phase, className }: { phase: Phase; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Wordmark className="text-[3cqw]" />
      <span className="inline-flex items-center gap-[1.2cqw] text-[2.2cqw] font-semibold uppercase tracking-[0.12em] opacity-80">
        {phase === "during" && <span className="size-[1.6cqw] animate-pulse rounded-full bg-red-500" aria-hidden />}
        Web Summit 2026 · Lisbon
      </span>
    </div>
  )
}

function BottomBar({ left = `Stand ${STAND}`, right = URL, className }: { left?: string; right?: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between border-t border-current/15 pt-[2.6cqw] text-[2.6cqw] font-semibold", className)}>
      <span>{left}</span>
      <span className="opacity-70">{right}</span>
    </div>
  )
}

/** TODO: replace with event photography */
function PhotoSlot({ className, label = "Photo" }: { className?: string; label?: string }) {
  return (
    <div
      className={cn("relative grid place-items-center overflow-hidden bg-neutral-200 text-neutral-500", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent 0 1.2cqw, oklch(0% 0 0 / 0.04) 1.2cqw 2.4cqw)",
      }}
    >
      <span className="inline-flex items-center gap-[1cqw] text-[2.4cqw] font-semibold">
        <ImageIcon className="size-[3cqw]" />
        {label}
      </span>
    </div>
  )
}

function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-brand-600 font-bold text-neutral-50",
        "size-[11cqw] text-[3.4cqw]",
        className,
      )}
    >
      {initials}
    </span>
  )
}

function QrBox({ className }: { className?: string }) {
  // TODO: real QR for adxc.ai/websummit
  return (
    <div className={cn("grid shrink-0 place-items-center rounded-[0.8cqw] bg-white text-neutral-900", className)}>
      <QrCode className="size-[70%]" strokeWidth={1.25} />
    </div>
  )
}

function OutlineNumber({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-bold leading-[0.8] tracking-[-0.07em] text-transparent [-webkit-text-stroke:0.4cqw_currentColor]",
        className,
      )}
    >
      {children}
    </p>
  )
}

const H = "font-semibold tracking-[-0.035em]" // headline base

/* ============================================================
   BEFORE — build awareness, drive stand visits & meetings
   ============================================================ */

function B01() {
  return (
    <Post n="B01" name="Announcement" className="bg-brand-950 text-neutral-50">
      <div className="absolute inset-0 opacity-70" style={TILE} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 from-35% to-brand-950/10" aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="before" />
        <Eyebrow className="mt-auto text-brand-300">Announcing</Eyebrow>
        <p className={cn(H, "mt-[2.4cqw] text-[10cqw] leading-[0.98]")}>We&apos;re heading to Web Summit.</p>
        <div className="mt-[5cqw] grid grid-cols-2 gap-[2cqw] text-[2.8cqw]">
          <div className="rounded-[0.8cqw] bg-neutral-50/10 p-[3cqw] ring-1 ring-neutral-50/15">
            <p className="text-[2.2cqw] uppercase tracking-[0.12em] text-neutral-300">Stand</p>
            <p className="mt-[1cqw] text-[4.4cqw] font-bold">{STAND}</p>
          </div>
          <div className="rounded-[0.8cqw] bg-neutral-50/10 p-[3cqw] ring-1 ring-neutral-50/15">
            <p className="text-[2.2cqw] uppercase tracking-[0.12em] text-neutral-300">When</p>
            <p className="mt-[1cqw] text-[4.4cqw] font-bold">{DATES}</p>
          </div>
        </div>
      </div>
    </Post>
  )
}

function B02() {
  return (
    <Post n="B02" name="Countdown" className="bg-brand-600 text-neutral-50">
      <div className="bg-grid bg-grid-sm absolute inset-0 opacity-25" aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="before" />
        <OutlineNumber className="mt-auto text-[48cqw] text-neutral-50">14</OutlineNumber>
        <p className={cn(H, "mt-[3cqw] text-[8cqw] leading-none")}>days to Lisbon.</p>
        <BottomBar className="mt-[5cqw]" />
      </div>
    </Post>
  )
}

const slots = [
  { t: "10:00", booked: true },
  { t: "11:30", booked: false },
  { t: "13:00", booked: true },
  { t: "14:30", booked: false },
  { t: "16:00", booked: false },
  { t: "17:30", booked: true },
]

function B03() {
  return (
    <Post n="B03" name="Book a meeting" className="bg-neutral-50 text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="before" className="text-brand-600" />
        <p className={cn(H, "mt-[6cqw] text-[8cqw] leading-[1]")}>Let&apos;s meet in Lisbon.</p>
        <div className="mt-auto rounded-[0.8cqw] bg-white p-[4cqw] shadow-md ring-1 ring-neutral-200">
          <div className="flex items-center gap-[1.5cqw] text-[2.8cqw] font-semibold">
            <CalendarDays className="size-[3.2cqw] text-brand-600" />
            15 minutes with the team
          </div>
          <div className="mt-[3cqw] flex gap-[1.2cqw]">
            {["Day 1", "Day 2", "Day 3", "Day 4"].map((d, i) => (
              <span
                key={d}
                className={cn(
                  "flex-1 rounded-[0.4cqw] py-[1.4cqw] text-center text-[2.4cqw] font-semibold",
                  i === 1 ? "bg-brand-600 text-neutral-50" : "bg-neutral-100 text-neutral-500",
                )}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="mt-[2cqw] grid grid-cols-3 gap-[1.2cqw]">
            {slots.map((s) => (
              <span
                key={s.t}
                className={cn(
                  "rounded-[0.4cqw] py-[1.4cqw] text-center font-mono text-[2.4cqw] ring-1",
                  s.booked ? "text-neutral-300 line-through ring-neutral-100" : "text-neutral-900 ring-neutral-300",
                )}
              >
                {s.t}
              </span>
            ))}
          </div>
        </div>
        <BottomBar className="mt-[4cqw]" right="[Booking link]" />
      </div>
    </Post>
  )
}

const team = [
  { i: "AB", name: "[Name]", role: "[Role]" },
  { i: "CD", name: "[Name]", role: "[Role]" },
  { i: "EF", name: "[Name]", role: "[Role]" },
  { i: "GH", name: "[Name]", role: "[Role]" },
]

function B04() {
  return (
    <Post n="B04" name="Meet the team" className="bg-white text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="before" className="text-brand-600" />
        <p className={cn(H, "mt-[6cqw] text-[8cqw] leading-[1]")}>Who you&apos;ll meet.</p>
        <div className="mt-auto grid grid-cols-2 gap-[3cqw]">
          {team.map((m, idx) => (
            <div key={idx} className="flex items-center gap-[2.4cqw] rounded-[0.8cqw] bg-neutral-50 p-[3cqw] ring-1 ring-neutral-200">
              <Avatar initials={m.i} />
              <div>
                <p className="text-[3.2cqw] font-bold leading-tight">{m.name}</p>
                <p className="text-[2.6cqw] text-neutral-500">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
        <BottomBar className="mt-[5cqw]" />
      </div>
    </Post>
  )
}

function B05() {
  return (
    <Post n="B05" name="Live demo teaser" className="bg-neutral-950 text-neutral-50">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="before" />
        <p className={cn(H, "mt-[6cqw] text-[8cqw] leading-[1]")}>
          Ask anything.
          <br />
          <span className="text-brand-300">Watch it get priced.</span>
        </p>
        <div className="mt-auto rounded-[0.8cqw] bg-neutral-900 p-[4cqw] ring-1 ring-neutral-800">
          <p className="text-[3.4cqw] font-semibold">“How are Gen Z travellers picking destinations?”</p>
          <div className="mt-[3cqw] flex items-center gap-[1.5cqw]">
            <Chip className="bg-brand-950 text-brand-200 ring-1 ring-brand-800">
              <Tag className="size-[2.4cqw]" />
              Quoted $3.80
            </Chip>
            <Chip className="bg-emerald-950 text-emerald-300 ring-1 ring-emerald-800">
              <Check className="size-[2.4cqw]" />
              Abstract ready
            </Chip>
          </div>
        </div>
        <BottomBar className="mt-[5cqw]" left={`Live demos · Stand ${STAND}`} />
      </div>
    </Post>
  )
}

function B06() {
  return (
    <Post n="B06" name="Ticket" className="bg-brand-700 text-neutral-50">
      <div className="absolute inset-0 opacity-50" style={TILE} aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="before" />
        <p className={cn(H, "mt-[6cqw] text-[8cqw] leading-[1]")}>Your pass to premium data.</p>
        <div className="relative mt-auto flex rounded-[1cqw] bg-white text-neutral-900 shadow-xl">
          <div className="flex-1 p-[4.4cqw]">
            <Eyebrow className="text-brand-600">Admit one</Eyebrow>
            <p className="mt-[2cqw] text-[4.4cqw] font-bold leading-tight">Live ADXC demo</p>
            <div className="mt-[3cqw] flex gap-[5cqw] text-[2.6cqw]">
              <div>
                <p className="text-neutral-500">Stand</p>
                <p className="font-bold">{STAND}</p>
              </div>
              <div>
                <p className="text-neutral-500">When</p>
                <p className="font-bold">{DATES}</p>
              </div>
            </div>
          </div>
          <div className="relative grid w-[26cqw] place-items-center border-l-[0.4cqw] border-dashed border-neutral-200 p-[3cqw]">
            <span className="absolute -left-[2.2cqw] -top-[2cqw] size-[4cqw] rounded-full bg-brand-700" aria-hidden />
            <span className="absolute -bottom-[2cqw] -left-[2.2cqw] size-[4cqw] rounded-full bg-brand-700" aria-hidden />
            <QrBox className="size-[17cqw] bg-neutral-50" />
          </div>
        </div>
      </div>
    </Post>
  )
}

function B07() {
  const pin = 9
  return (
    <Post n="B07" name="Find us — floor plan" className="bg-neutral-100 text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="before" className="text-brand-600" />
        <p className={cn(H, "mt-[6cqw] text-[8cqw] leading-[1]")}>Find us here.</p>
        <div className="mt-auto grid grid-cols-6 gap-[1.2cqw]">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "grid aspect-[4/3] place-items-center rounded-[0.4cqw]",
                i === pin ? "bg-brand-600 text-neutral-50 shadow-lg" : "bg-neutral-200",
              )}
            >
              {i === pin && <MapPin className="size-[4cqw]" />}
            </div>
          ))}
        </div>
        <p className="mt-[3cqw] text-[2.8cqw] text-neutral-500">Floor plan illustrative · [Pavilion]</p>
        <BottomBar className="mt-[3cqw]" />
      </div>
    </Post>
  )
}

function B08() {
  return (
    <Post n="B08" name="Bring a question" className="bg-brand-50 text-brand-900">
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="before" />
        <OutlineNumber className="absolute -right-[4cqw] top-[10cqw] text-[70cqw] text-brand-200">?</OutlineNumber>
        <p className={cn(H, "relative mt-auto max-w-[85%] text-[9cqw] leading-[0.98]")}>
          Bring us your hardest consumer question.
        </p>
        <p className="relative mt-[3cqw] max-w-[78%] text-[3.4cqw] leading-[1.4] text-brand-800">
          We&apos;ll answer it live, and you&apos;ll see the price before you pay.
        </p>
        <BottomBar className="relative mt-[5cqw]" />
      </div>
    </Post>
  )
}

function B09() {
  return (
    <Post n="B09" name="Join the beta" className="bg-brand-600 text-neutral-50">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="before" />
        <p className={cn(H, "mt-auto text-[11cqw] leading-[0.95]")}>Skip the queue.</p>
        <div className="mt-[5cqw] flex items-end justify-between gap-[4cqw]">
          <div>
            <p className="text-[3.6cqw] font-medium leading-[1.3]">
              Join the ADXC beta
              <br />
              before Lisbon.
            </p>
            <Chip className="mt-[3cqw] bg-neutral-50 text-brand-700">
              {URL} <ArrowRight className="size-[2.4cqw]" />
            </Chip>
          </div>
          <QrBox className="size-[24cqw]" />
        </div>
      </div>
    </Post>
  )
}

const agenda = [
  { day: "Day 1", what: "Stand opens · live demos" },
  { day: "Day 2", what: "[Talk / panel]" },
  { day: "Day 3", what: "Partner meetups" },
  { day: "Day 4", what: "Final demos · see you next year" },
]

function B10() {
  return (
    <Post n="B10" name="Our week" className="bg-white text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="before" className="text-brand-600" />
        <p className={cn(H, "mt-[6cqw] text-[8cqw] leading-[1]")}>Our week in Lisbon.</p>
        <ol className="relative mt-auto space-y-[3.4cqw] border-l-[0.4cqw] border-neutral-200 pl-[5cqw]">
          {agenda.map((a, i) => (
            <li key={a.day} className="relative">
              <span
                className={cn(
                  "absolute -left-[6.6cqw] top-[0.6cqw] size-[2.8cqw] rounded-full ring-[0.8cqw] ring-white",
                  i === 0 ? "bg-brand-600" : "bg-neutral-300",
                )}
                aria-hidden
              />
              <p className="text-[2.4cqw] font-semibold uppercase tracking-[0.12em] text-neutral-500">{a.day}</p>
              <p className="mt-[0.6cqw] text-[3.6cqw] font-semibold">{a.what}</p>
            </li>
          ))}
        </ol>
        <BottomBar className="mt-[5cqw]" />
      </div>
    </Post>
  )
}

/* ============================================================
   DURING — live energy, social proof, drive footfall
   ============================================================ */

function D01() {
  return (
    <Post n="D01" name="Live from Lisbon" className="bg-brand-950 text-neutral-50">
      <PhotoSlot className="absolute inset-x-0 top-0 h-[60%]" label="Stand photo" />
      <div className={cn("absolute inset-x-0 bottom-0 flex h-[40%] flex-col", PAD)}>
        <Chip className="self-start bg-red-500 text-white">
          <span className="size-[1.4cqw] animate-pulse rounded-full bg-white" aria-hidden />
          Live
        </Chip>
        <p className={cn(H, "mt-[2.4cqw] text-[9cqw] leading-none")}>Live from Lisbon.</p>
        <BottomBar className="mt-auto" />
      </div>
      <div className={cn("absolute inset-x-0 top-0 text-neutral-900", PAD)}>
        <EditionBar phase="during" />
      </div>
    </Post>
  )
}

const dayStats = [
  { v: "312", l: "conversations" },
  { v: "148", l: "questions answered live" },
  { v: "27", l: "countries" },
  { v: "4", l: "new partners" },
]

function D02() {
  return (
    <Post n="D02" name="Day in numbers" className="bg-neutral-950 text-neutral-50">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="during" />
        <p className={cn(H, "mt-[6cqw] text-[8cqw] leading-[1]")}>
          Day 1, <span className="text-brand-300">in numbers.</span>
        </p>
        <div className="mt-auto grid grid-cols-2 gap-px overflow-hidden rounded-[0.8cqw] bg-neutral-800">
          {dayStats.map((s) => (
            <div key={s.l} className="bg-neutral-950 p-[4cqw]">
              <p className="text-[10cqw] font-semibold leading-none tracking-[-0.05em]">{s.v}</p>
              <p className="mt-[1.5cqw] text-[2.8cqw] text-neutral-400">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-[3cqw] text-[2.2cqw] text-neutral-500">Sample figures</p>
      </div>
    </Post>
  )
}

function D03() {
  return (
    <Post n="D03" name="Question of the day" className="bg-neutral-100 text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="during" className="text-brand-600" />
        <Eyebrow className="mt-[6cqw] text-neutral-500">Question of the day · Day 2</Eyebrow>
        <div className="mt-[3cqw] flex flex-1 flex-col rounded-[0.8cqw] bg-white p-[5cqw] shadow-md">
          <p className="text-[5cqw] font-bold leading-[1.12] tracking-[-0.02em]">
            Do European founders trust AI-generated market research?
          </p>
          <div className="mt-[3cqw] flex gap-[1.5cqw]">
            <Chip className="bg-brand-50 text-brand-700">
              <Tag className="size-[2.4cqw]" />
              Quoted $2.60
            </Chip>
            <Chip className="bg-neutral-100 text-neutral-600">Asked at our stand</Chip>
          </div>
          <p className="mt-auto text-[3.2cqw] leading-[1.45] text-neutral-600">
            Only when sources are named. Attribution beats speed as the deciding factor…
          </p>
        </div>
        <BottomBar className="mt-[4cqw]" />
      </div>
    </Post>
  )
}

function D04() {
  return (
    <Post n="D04" name="Overheard at the stand" className="bg-brand-600 text-neutral-50">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="during" />
        <Quote className="mt-[6cqw] size-[11cqw] fill-brand-400 text-brand-400" />
        <p className="mt-[3cqw] text-[6.4cqw] font-medium leading-[1.18] tracking-[-0.025em]">
          “[Real visitor quote. Short, specific, in their words.]”
        </p>
        <div className="mt-auto flex items-center gap-[3cqw]">
          <Avatar initials="AB" className="bg-neutral-50 text-brand-700" />
          <div>
            <p className="text-[3.2cqw] font-bold">[Name]</p>
            <p className="text-[2.6cqw] text-brand-200">[Title], [Company]</p>
          </div>
          <Eyebrow className="ml-auto text-brand-200">Overheard at {STAND}</Eyebrow>
        </div>
      </div>
    </Post>
  )
}

function D05() {
  return (
    <Post n="D05" name="Photo grid" className="bg-white text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="during" className="text-brand-600" />
        <div className="mt-[4cqw] grid flex-1 grid-cols-2 grid-rows-2 gap-[1.6cqw]">
          <PhotoSlot className="row-span-2 rounded-[0.8cqw]" />
          <PhotoSlot className="rounded-[0.8cqw]" />
          <PhotoSlot className="rounded-[0.8cqw]" />
        </div>
        <p className={cn(H, "mt-[4cqw] text-[6cqw] leading-none")}>Scenes from Stand {STAND}.</p>
      </div>
    </Post>
  )
}

function D06() {
  return (
    <Post n="D06" name="Still open" className="bg-neutral-50 text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="during" className="text-brand-600" />
        <Clock className="mt-auto size-[14cqw] text-brand-600" strokeWidth={1.5} />
        <p className={cn(H, "mt-[4cqw] text-[12cqw] leading-[0.95]")}>Still here.</p>
        <p className="mt-[3cqw] text-[3.6cqw] text-neutral-600">
          Stand {STAND} is open until <b className="text-neutral-900">[18:00]</b> today.
        </p>
        <div className="mt-[4cqw] h-[1.6cqw] rounded-full bg-neutral-200">
          <div className="h-full w-[68%] rounded-full bg-brand-600" />
        </div>
        <div className="mt-[1.2cqw] flex justify-between font-mono text-[2.2cqw] text-neutral-500">
          <span>[10:00]</span>
          <span>[18:00]</span>
        </div>
        <BottomBar className="mt-[4cqw]" />
      </div>
    </Post>
  )
}

const topics = [
  { label: "Gen Z spending", value: 38, color: "bg-chart-1" },
  { label: "AI adoption at work", value: 27, color: "bg-chart-2" },
  { label: "Sustainability claims", value: 19, color: "bg-chart-3" },
  { label: "Travel intent", value: 16, color: "bg-chart-4" },
]

function D07() {
  return (
    <Post n="D07" name="Most asked today" className="bg-white text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="during" className="text-brand-600" />
        <p className={cn(H, "mt-[6cqw] text-[7cqw] leading-[1.02]")}>What everyone asked us today.</p>
        <div className="mt-auto space-y-[3cqw]">
          {topics.map((t) => (
            <div key={t.label}>
              <div className="mb-[1.2cqw] flex justify-between text-[2.8cqw] font-semibold">
                <span>{t.label}</span>
                <span className="text-neutral-500">{t.value}%</span>
              </div>
              <div className="h-[3cqw] rounded-full bg-neutral-100">
                <div className={cn("h-full rounded-full", t.color)} style={{ width: `${t.value * 2}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-[4cqw] text-[2.2cqw] text-neutral-500">Share of questions asked at the stand · Sample data</p>
      </div>
    </Post>
  )
}

function D08() {
  return (
    <Post n="D08" name="On stage" className="bg-brand-950 text-neutral-50">
      <div className="absolute inset-x-0 bottom-0 h-[38%] opacity-60" style={TILE} aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="during" />
        <Chip className="mt-[6cqw] self-start bg-neutral-50/10 text-neutral-50 ring-1 ring-neutral-50/20">
          <Mic className="size-[2.4cqw]" />
          On stage
        </Chip>
        <p className={cn(H, "mt-[3cqw] text-[8cqw] leading-[1]")}>[Talk title: why agents need premium data]</p>
        <div className="mt-auto flex items-center gap-[3cqw] rounded-[0.8cqw] bg-brand-950/80 p-[3cqw] ring-1 ring-neutral-50/15 backdrop-blur">
          <Avatar initials="AB" />
          <div className="text-[2.8cqw]">
            <p className="text-[3.2cqw] font-bold">[Speaker name]</p>
            <p className="text-neutral-300">[Stage] · [Time]</p>
          </div>
        </div>
      </div>
    </Post>
  )
}

function D09() {
  return (
    <Post n="D09" name="Running counter" className="bg-brand-600 text-neutral-50">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="during" />
        <p className="mt-auto text-[26cqw] font-semibold leading-[0.85] tracking-[-0.06em]">1,248</p>
        <p className={cn(H, "mt-[3cqw] max-w-[80%] text-[5.6cqw] leading-[1.1]")}>
          questions answered at Web Summit so far.
        </p>
        <div className="mt-[5cqw] flex gap-[0.8cqw]" aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className={cn("h-[4cqw] flex-1 rounded-[0.2cqw]", i < 17 ? "bg-neutral-50" : "bg-neutral-50/25")} />
          ))}
        </div>
        <BottomBar className="mt-[4cqw]" left="Sample figure" />
      </div>
    </Post>
  )
}

function D10() {
  return (
    <Post n="D10" name="Final day" className="bg-neutral-950 text-neutral-50">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="during" />
        <Chip className="mt-auto self-start bg-orange-500 text-neutral-950">Final day</Chip>
        <p className={cn(H, "mt-[3cqw] text-[11cqw] leading-[0.95]")}>
          Last chance to <span className="text-orange-400">catch us.</span>
        </p>
        <p className="mt-[3cqw] text-[3.4cqw] text-neutral-300">
          Stand {STAND} closes at [time]. Bring a question, leave with an answer.
        </p>
        <BottomBar className="mt-[5cqw]" />
      </div>
    </Post>
  )
}

/* ============================================================
   AFTER — thank, recap, convert the attention
   ============================================================ */

function A01() {
  return (
    <Post n="A01" name="Obrigado" className="bg-brand-950 text-neutral-50">
      <div className="absolute inset-0 opacity-60" style={TILE} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 from-30% to-transparent" aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="after" />
        <p className={cn(H, "mt-auto text-[15cqw] leading-[0.9]")}>
          Obrigado,
          <br />
          <span className="text-brand-300">Lisboa.</span>
        </p>
        <p className="mt-[4cqw] max-w-[80%] text-[3.4cqw] text-neutral-300">
          Thank you to everyone who stopped by Stand {STAND}.
        </p>
      </div>
    </Post>
  )
}

const recap = [
  { v: "1,600+", l: "conversations at the stand" },
  { v: "4,200", l: "questions answered live" },
  { v: "12", l: "partnership conversations" },
]

function A02() {
  return (
    <Post n="A02" name="Recap in numbers" className="bg-neutral-50 text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="after" className="text-brand-600" />
        <p className={cn(H, "mt-[6cqw] text-[7cqw] leading-[1]")}>Web Summit, by the numbers.</p>
        <div className="mt-auto divide-y divide-neutral-200">
          {recap.map((r) => (
            <div key={r.l} className="flex items-baseline justify-between gap-[4cqw] py-[3cqw]">
              <span className="text-[11cqw] font-semibold leading-none tracking-[-0.05em] text-brand-600">{r.v}</span>
              <span className="max-w-[40%] text-right text-[3cqw] text-neutral-600">{r.l}</span>
            </div>
          ))}
        </div>
        <p className="mt-[2cqw] text-[2.2cqw] text-neutral-500">Sample figures</p>
      </div>
    </Post>
  )
}

function A03() {
  return (
    <Post n="A03" name="Carousel cover — top questions" className="bg-brand-700 text-neutral-50">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--color-brand-500),transparent_60%)] opacity-70"
        aria-hidden
      />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="after" />
        <p className={cn(H, "mt-auto text-[9.6cqw] leading-[0.98]")}>
          The 5 questions everyone asked us at Web Summit.
        </p>
        <div className="mt-[6cqw] flex items-center justify-between">
          <div className="flex gap-[1.2cqw]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={cn("h-[1.2cqw] rounded-full", i === 0 ? "w-[6cqw] bg-neutral-50" : "w-[1.2cqw] bg-neutral-50/35")}
              />
            ))}
          </div>
          <span className="inline-flex items-center gap-[1.5cqw] text-[3cqw] font-semibold">
            Swipe <ArrowRight className="size-[3.4cqw]" />
          </span>
        </div>
      </div>
    </Post>
  )
}

const takeaways = [
  "[Takeaway one, in one line.]",
  "[Takeaway two, in one line.]",
  "[Takeaway three, in one line.]",
]

function A04() {
  return (
    <Post n="A04" name="Takeaways" className="bg-white text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="after" className="text-brand-600" />
        <p className={cn(H, "mt-[6cqw] text-[8cqw] leading-[1]")}>3 things we learned in Lisbon.</p>
        <ol className="mt-auto space-y-[3cqw]">
          {takeaways.map((t, i) => (
            <li key={i} className="flex items-start gap-[3cqw] border-t border-neutral-200 pt-[3cqw]">
              <span className="font-mono text-[3.2cqw] font-semibold text-brand-600">0{i + 1}</span>
              <span className="text-[3.8cqw] font-semibold leading-[1.25]">{t}</span>
            </li>
          ))}
        </ol>
        <BottomBar className="mt-[5cqw]" left="Full write-up" right="adxc.ai/blog" />
      </div>
    </Post>
  )
}

function A05() {
  return (
    <Post n="A05" name="Photo highlight" className="bg-neutral-900 text-neutral-50">
      <PhotoSlot className="absolute inset-0" label="Hero event photo" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="after" className="text-neutral-900" />
        <p className={cn(H, "mt-auto text-[8cqw] leading-[1]")}>
          Four days. One stand.
          <br />
          Thousands of questions.
        </p>
      </div>
    </Post>
  )
}

function A06() {
  return (
    <Post n="A06" name="Missed us?" className="bg-brand-600 text-neutral-50">
      <div className="bg-grid bg-grid-sm absolute inset-0 opacity-25" aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="after" />
        <p className={cn(H, "mt-auto text-[11cqw] leading-[0.95]")}>Missed us in Lisbon?</p>
        <div className="mt-[5cqw] flex items-end justify-between gap-[4cqw]">
          <div>
            <p className="text-[3.6cqw] font-medium leading-[1.3]">The beta is still open.</p>
            <Chip className="mt-[3cqw] bg-neutral-50 text-brand-700">
              {URL} <ArrowRight className="size-[2.4cqw]" />
            </Chip>
          </div>
          <QrBox className="size-[22cqw]" />
        </div>
      </div>
    </Post>
  )
}

function A07() {
  return (
    <Post n="A07" name="Met in Lisbon — partner" className="bg-white text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="after" className="text-brand-600" />
        <Eyebrow className="mt-auto text-brand-600">Met in Lisbon. Now on ADXC.</Eyebrow>
        <div className="mt-[4cqw] flex items-center gap-[4cqw]">
          <span className="grid h-[22cqw] flex-1 place-items-center rounded-[0.8cqw] bg-neutral-100 text-[5cqw] font-bold text-neutral-400">
            [Partner]
          </span>
          <span className="text-[6cqw] font-light text-neutral-300">×</span>
          <span className="grid h-[22cqw] flex-1 place-items-center rounded-[0.8cqw] bg-brand-600 text-neutral-50">
            <Wordmark variant="mono" className="text-[7cqw]" />
          </span>
        </div>
        <p className="mt-[4cqw] text-[3.6cqw] leading-[1.4] text-neutral-600">
          [One line on what the partnership unlocks for brands and AI platforms.]
        </p>
        <BottomBar className="mt-[5cqw]" left="Announcement" right="adxc.ai" />
      </div>
    </Post>
  )
}

function A08() {
  return (
    <Post n="A08" name="The big insight" className="bg-neutral-950 text-neutral-50">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="after" />
        <p className={cn(H, "mt-auto text-[7.4cqw] leading-[1.06] text-neutral-400")}>
          Almost every AI team we met in Lisbon had the same problem:
        </p>
        <p className={cn(H, "mt-[3cqw] text-[7.4cqw] leading-[1.06] text-brand-300")}>
          their agents can&apos;t reach premium data.
        </p>
        <BottomBar className="mt-[6cqw]" left="That's what we're fixing." right="adxc.ai" />
      </div>
    </Post>
  )
}

function A09() {
  return (
    <Post n="A09" name="Team thank-you" className="bg-neutral-100 text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <EditionBar phase="after" className="text-brand-600" />
        <div className="mt-auto flex">
          {["AB", "CD", "EF", "GH", "IJ"].map((i, idx) => (
            <Avatar
              key={i}
              initials={i}
              className={cn(
                "size-[15cqw] text-[4.4cqw] ring-[0.8cqw] ring-neutral-100",
                idx > 0 && "-ml-[3.4cqw]",
                idx % 2 === 1 && "bg-brand-800",
              )}
            />
          ))}
        </div>
        <p className={cn(H, "mt-[5cqw] text-[8cqw] leading-[1]")}>From all of us: thank you.</p>
        <p className="mt-[3cqw] text-[3.4cqw] text-neutral-600">
          To every founder, marketer and builder who brought us a question.
        </p>
        <BottomBar className="mt-[5cqw]" left="Team ADXC" right="adxc.ai" />
      </div>
    </Post>
  )
}

function A10() {
  return (
    <Post n="A10" name="Até já" className="bg-brand-950 text-neutral-50">
      <div className="absolute inset-x-0 top-0 h-[45%] opacity-60" style={TILE} aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-transparent to-brand-950" aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <EditionBar phase="after" />
        <p className={cn(H, "mt-auto text-[14cqw] leading-[0.9]")}>Até já.</p>
        <p className="mt-[3cqw] text-[3.6cqw] text-neutral-300">See you soon, Lisbon. Next up: [what&apos;s next].</p>
        <BottomBar className="mt-[6cqw]" left="Follow ADXC for what's next" right="adxc.ai" />
      </div>
    </Post>
  )
}

/* ---------- page ---------- */

const PHASES: Record<Phase, { label: string; blurb: string; posts: (() => ReactNode)[] }> = {
  before: {
    label: "Before",
    blurb: "Awareness, stand visits and meetings",
    posts: [B01, B02, B03, B04, B05, B06, B07, B08, B09, B10],
  },
  during: {
    label: "During",
    blurb: "Live energy, social proof, footfall",
    posts: [D01, D02, D03, D04, D05, D06, D07, D08, D09, D10],
  },
  after: {
    label: "After",
    blurb: "Thank, recap, convert the attention",
    posts: [A01, A02, A03, A04, A05, A06, A07, A08, A09, A10],
  },
}

const PHASE_KEYS = Object.keys(PHASES) as Phase[]

async function WebSummitPostsPageContent({
  searchParams,
}: {
  searchParams: Promise<{ phase?: string; export?: string }>
}) {
  const sp = await searchParams
  const active = sp.phase === "all" ? "all" : PHASE_KEYS.includes(sp.phase as Phase) ? (sp.phase as Phase) : "before"
  const exportMode = sp.export === "1"
  const shown = active === "all" ? PHASE_KEYS : [active]
  const tabs: { key: Phase | "all"; label: string }[] = [
    ...PHASE_KEYS.map((k) => ({ key: k, label: PHASES[k].label })),
    { key: "all", label: "All 30" },
  ]

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-10">
      <header className="mx-auto mb-10 max-w-6xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← All content
        </Link>
        <p className="text-caption mt-6 text-muted-foreground">LinkedIn · Web Summit 2026 campaign · 1080 × 1080</p>
        <h1 className="mt-3">Web Summit posts</h1>

        <nav className="mt-8 inline-flex flex-wrap gap-1 rounded-lg bg-muted p-1" aria-label="Campaign phase">
          {tabs.map((t) => (
            <Link
              key={t.key}
              prefetch={true}
              href={`?phase=${t.key}${exportMode ? "&export=1" : ""}`}
              scroll={false}
              aria-current={t.key === active ? "page" : undefined}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                t.key === active ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl space-y-16" style={exportMode ? { maxWidth: 1080 } : undefined}>
        {shown.map((k) => (
          <section key={k}>
            <div className="mb-6 flex items-baseline gap-3">
              <h3>{PHASES[k].label}</h3>
              <p className="text-sm text-muted-foreground">{PHASES[k].blurb}</p>
            </div>
            <div className={cn("grid gap-10", exportMode ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
              {PHASES[k].posts.map((Design, i) => (
                <Design key={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

/* Cache Components: searchParams is request-time data, so it renders inside <Suspense>. */
export default function WebSummitPostsPage({ searchParams }: { searchParams: Promise<{ phase?: string; export?: string }> }) {
  return (
    <Suspense fallback={null}>
      <WebSummitPostsPageContent searchParams={searchParams} />
    </Suspense>
  )
}
