/* ============================================================
   LinkedIn post design explorations
   Route: /templates
     ?format=square     1080 × 1080 (default)
     ?format=portrait   1080 × 1350
     ?format=landscape  1200 × 627
     &export=1          renders every post at true pixel size
                        for screenshots / copying into Figma

   Each of the 20 templates adapts to all three formats, so they
   work as one template family. Sizing uses container-query
   units (cqmin = 1% of the post's shorter side), so type and
   spacing scale with the frame.

   All stats, prices and quotes are SAMPLE copy for layout only.
   Swap in real ADXC answers before anything is posted.
   ============================================================ */

import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { Suspense } from "react"
import {
  ArrowRight,
  Bot,
  Briefcase,
  Check,
  CheckCircle2,
  Lock,
  MessageSquare,
  QrCode,
  Quote,
  Sparkles,
  Tag,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo, logoVarsFor } from "@/components/brand/logo"

export const metadata: Metadata = {
  title: "Templates",
  robots: { index: false, follow: false },
}

/* ---------- formats ---------- */

type Format = "square" | "portrait" | "landscape"

const FORMATS: Record<Format, { label: string; size: string; ratio: string; exportW: number; cols: string }> = {
  square: { label: "Square", size: "1080 × 1080", ratio: "1 / 1", exportW: 1080, cols: "sm:grid-cols-2 lg:grid-cols-3" },
  portrait: { label: "Portrait", size: "1080 × 1350", ratio: "4 / 5", exportW: 1080, cols: "sm:grid-cols-2 lg:grid-cols-3" },
  landscape: { label: "Landscape", size: "1200 × 627", ratio: "1200 / 627", exportW: 1200, cols: "lg:grid-cols-2" },
}

const FORMAT_KEYS = Object.keys(FORMATS) as Format[]

/** Pick a value per format; portrait and landscape fall back to square. */
function pick<T>(f: Format, v: { s: T; p?: T; l?: T }): T {
  if (f === "landscape") return v.l ?? v.s
  if (f === "portrait") return v.p ?? v.s
  return v.s
}

type P = { f: Format }

/* ---------- shared building blocks ---------- */

const PAD = "p-[7.4cqmin]" // ≈ 80px safe margin at 1080

function Post({
  f,
  n,
  name,
  className,
  children,
}: {
  f: Format
  n: number
  name: string
  className?: string
  children: ReactNode
}) {
  const style: CSSProperties = { aspectRatio: FORMATS[f].ratio, ...logoVarsFor(className) }
  return (
    <figure className="flex flex-col gap-3">
      <div
        style={style}
        className={cn(
          "relative w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-border [container-type:size]",
          className,
        )}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
      <figcaption className="flex items-baseline gap-2 text-sm text-muted-foreground">
        <span className="font-mono text-xs">{String(n).padStart(2, "0")}</span>
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

function Footer({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between text-[2.6cqmin]", className)}>
      <Wordmark className="text-[3cqmin]" />
      <span className="font-medium opacity-70">adxc.ai</span>
    </div>
  )
}

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.8cqmin] rounded-full px-[2.2cqmin] py-[0.9cqmin] text-[2.4cqmin] font-semibold leading-none",
        className,
      )}
    >
      {children}
    </span>
  )
}

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[2.4cqmin] font-semibold uppercase leading-none tracking-[0.12em]", className)}>
      {children}
    </p>
  )
}

/**
 * Two-part layout: `lead` (headline) + `visual` (card, chart, list…).
 * Stacked top-to-bottom in square/portrait, side by side in landscape.
 */
function Split({
  f,
  lead,
  visual,
  footer = true,
  leadWidth = "w-[40%]",
  className,
}: {
  f: Format
  lead: ReactNode
  visual: ReactNode
  footer?: boolean
  leadWidth?: string
  className?: string
}) {
  if (f === "landscape") {
    return (
      <div className={cn("relative flex h-full gap-[7cqmin]", PAD, className)}>
        <div className={cn("flex shrink-0 flex-col", leadWidth)}>
          {lead}
          {footer && <Footer className="mt-auto pt-[4cqmin]" />}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">{visual}</div>
      </div>
    )
  }
  return (
    <div className={cn("relative flex h-full flex-col", PAD, className)}>
      {lead}
      <div className="mt-auto pt-[4cqmin]">{visual}</div>
      {footer && <Footer className="mt-[5cqmin]" />}
    </div>
  )
}

/* ---------- 01 Statement on grid ---------- */
function P01({ f }: P) {
  return (
    <Post f={f} n={1} name="Statement on grid" className="bg-brand-600 text-neutral-50">
      <div className="bg-grid bg-grid-sm absolute inset-0 opacity-30" aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <Chip className="self-start bg-neutral-50/10 text-neutral-50 ring-1 ring-neutral-50/25">
          Agentic data exchange
        </Chip>
        <p
          className={cn(
            "mt-auto font-semibold leading-[1.02] tracking-[-0.035em]",
            pick(f, { s: "text-[8.6cqmin]", p: "text-[10cqmin]", l: "max-w-[75%] text-[11cqmin]" }),
          )}
        >
          Premium consumer data, one query at a time.
        </p>
        <Footer className="mt-[6cqmin]" />
      </div>
    </Post>
  )
}

/* ---------- 02 Answer card ---------- */
function P02({ f }: P) {
  const wide = f === "landscape"
  const question = "How do UK Gen Z shoppers feel about secondhand fashion?"
  return (
    <Post f={f} n={2} name="Answer card" className="bg-neutral-100 text-neutral-900">
      <Split
        f={f}
        leadWidth="w-[38%]"
        lead={
          <>
            <Eyebrow className="text-brand-600">Asked on ADXC</Eyebrow>
            {wide && (
              <p className="mt-[4cqmin] text-[7cqmin] font-bold leading-[1.1] tracking-[-0.025em]">{question}</p>
            )}
          </>
        }
        visual={
          <div className="flex flex-col rounded-[0.8cqmin] bg-white p-[5cqmin] shadow-md">
            {!wide && (
              <p
                className={cn(
                  "mb-[3cqmin] font-bold leading-[1.15] tracking-[-0.02em]",
                  pick(f, { s: "text-[4.4cqmin]", p: "text-[5.4cqmin]" }),
                )}
              >
                {question}
              </p>
            )}
            <div className="flex items-center gap-[1.5cqmin]">
              <Chip className="bg-brand-50 text-brand-700">
                <Tag className="size-[2.4cqmin]" />
                Quoted $3.80
              </Chip>
              <Chip className="bg-neutral-100 text-neutral-600">3 providers</Chip>
            </div>
            <p className="mt-[3cqmin] text-[3cqmin] leading-[1.45] text-neutral-600">
              Resale reads as smart, not second-best. Price drives the first purchase; sustainability keeps them
              coming back…
            </p>
            <div className="mt-[4cqmin] flex items-center justify-between border-t border-neutral-200 pt-[3cqmin]">
              <div className="flex gap-[1cqmin] text-[2.2cqmin] font-semibold text-neutral-500">
                {["YouGov", "Reddit", "Quid"].map((s) => (
                  <span key={s} className="rounded-full border border-neutral-200 px-[1.6cqmin] py-[0.6cqmin]">
                    {s}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-[0.8cqmin] rounded-[0.3cqmin] bg-primary px-[2.4cqmin] py-[1.4cqmin] text-[2.4cqmin] font-semibold text-primary-foreground">
                Approve <ArrowRight className="size-[2.4cqmin]" />
              </span>
            </div>
          </div>
        }
      />
    </Post>
  )
}

/* ---------- 03 Big number ---------- */
function P03({ f }: P) {
  const wide = f === "landscape"
  const number = (
    <p
      className={cn(
        "font-semibold leading-[0.85] tracking-[-0.06em] text-brand-600",
        pick(f, { s: "text-[30cqmin]", p: "text-[38cqmin]", l: "text-[44cqmin]" }),
      )}
    >
      71<span className="align-top text-[0.5em]">%</span>
    </p>
  )
  const copy = (
    <>
      <p
        className={cn(
          "font-semibold leading-[1.15] tracking-[-0.02em]",
          pick(f, { s: "mt-[3cqmin] max-w-[80%] text-[4.6cqmin]", p: "mt-[4cqmin] text-[5.6cqmin]", l: "text-[6cqmin]" }),
        )}
      >
        of US parents research toys on Reddit before buying.
      </p>
      <p className="mt-[2.5cqmin] text-[2.4cqmin] text-neutral-500">
        Sample figure · Synthesised from YouGov + Reddit via ADXC
      </p>
    </>
  )
  return (
    <Post f={f} n={3} name="Big number" className="bg-white text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <Eyebrow className="text-neutral-500">Consumer signal</Eyebrow>
        {wide ? (
          <div className="mt-auto flex items-end gap-[6cqmin]">
            {number}
            <div className="pb-[3cqmin]">{copy}</div>
          </div>
        ) : (
          <div className="mt-auto">
            {number}
            {copy}
          </div>
        )}
        <Footer className="mt-[5cqmin]" />
      </div>
    </Post>
  )
}

/* ---------- 04 Event — Web Summit ---------- */
function P04({ f }: P) {
  const wide = f === "landscape"
  const headline = (
    <p
      className={cn(
        "font-semibold leading-[0.95] tracking-[-0.04em]",
        pick(f, { s: "text-[12cqmin]", p: "text-[14cqmin]", l: "text-[13cqmin]" }),
      )}
    >
      Come find
      <br />
      us in Lisbon.
    </p>
  )
  const stand = (
    <div className="space-y-[1.4cqmin]">
      <p className="text-[2.4cqmin] uppercase tracking-[0.12em] text-neutral-300">Stand</p>
      <p className="text-[7cqmin] font-bold leading-none">[A-000]</p>
      <p className="text-[2.8cqmin] text-neutral-300">[Dates] · adxc.ai/websummit</p>
    </div>
  )
  // TODO: replace with the real /websummit QR code
  const qr = (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-[0.8cqmin] bg-white text-neutral-900",
        pick(f, { s: "size-[20cqmin]", l: "size-[34cqmin]" }),
      )}
    >
      <QrCode className="size-[70%]" strokeWidth={1.25} />
    </div>
  )
  return (
    <Post f={f} n={4} name="Event — Web Summit" className="bg-brand-950 text-neutral-50">
      <div
        className="absolute -right-[20cqmin] -top-[20cqmin] size-[70cqmin] rounded-full bg-brand-700/60 blur-[10cqmin]"
        aria-hidden
      />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <div className="flex items-center justify-between">
          <Eyebrow className="text-brand-300">Web Summit 2026 · Lisbon</Eyebrow>
          <Wordmark className="text-[3cqmin]" />
        </div>
        {wide ? (
          <div className="mt-auto flex items-end justify-between gap-[6cqmin]">
            <div className="space-y-[5cqmin]">
              {headline}
              {stand}
            </div>
            {qr}
          </div>
        ) : (
          <>
            <div className="mt-auto">{headline}</div>
            <div className="mt-[5cqmin] flex items-end justify-between gap-[4cqmin]">
              {stand}
              {qr}
            </div>
          </>
        )}
      </div>
    </Post>
  )
}

/* ---------- 05 Quote card ---------- */
function P05({ f }: P) {
  return (
    <Post f={f} n={5} name="Quote card" className="bg-neutral-50 text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <Quote className="size-[12cqmin] fill-brand-200 text-brand-200" />
        <p
          className={cn(
            "mt-[4cqmin] font-medium leading-[1.2] tracking-[-0.025em]",
            pick(f, { s: "text-[5.6cqmin]", p: "text-[6.8cqmin]", l: "max-w-[85%] text-[6.6cqmin]" }),
          )}
        >
          “[Quote goes here. Keep it under 25 words so it reads at a glance in the feed.]”
        </p>
        <div className="mt-auto flex items-center gap-[3cqmin]">
          <div className="grid size-[11cqmin] place-items-center rounded-full bg-brand-600 text-[3.6cqmin] font-bold text-neutral-50">
            AB
          </div>
          <div>
            <p className="text-[3.2cqmin] font-bold">[Name]</p>
            <p className="text-[2.6cqmin] text-neutral-500">[Title], [Company]</p>
          </div>
          <Wordmark className="ml-auto text-[3cqmin] text-brand-600" />
        </div>
      </div>
    </Post>
  )
}

/* ---------- 06 New provider ---------- */
function P06({ f }: P) {
  return (
    <Post f={f} n={6} name="New provider" className="bg-white text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <Chip className="self-start bg-emerald-50 text-emerald-700">
          <Sparkles className="size-[2.4cqmin]" />
          New on ADXC
        </Chip>
        <div className="my-auto py-[3cqmin]">
          <p className="text-[3.4cqmin] font-medium text-neutral-500">Now routing queries to</p>
          <p
            className={cn(
              "mt-[1.5cqmin] font-bold leading-[0.95] tracking-[-0.045em]",
              pick(f, { s: "text-[13cqmin]", p: "text-[15cqmin]", l: "text-[15cqmin]" }),
            )}
          >
            [Provider]
          </p>
          <p className="mt-[3cqmin] max-w-[85%] text-[3.4cqmin] leading-[1.4] text-neutral-600">
            [One line on what this data adds: category, coverage, freshness.]
          </p>
        </div>
        <div className="flex flex-wrap gap-[1.2cqmin]">
          {["YouGov", "Reddit", "X", "Quid", "US Census"].map((p) => (
            <span
              key={p}
              className="rounded-full bg-neutral-100 px-[2cqmin] py-[0.8cqmin] text-[2.4cqmin] font-semibold text-neutral-600"
            >
              {p}
            </span>
          ))}
          <span className="rounded-full bg-brand-600 px-[2cqmin] py-[0.8cqmin] text-[2.4cqmin] font-semibold text-neutral-50">
            + [Provider]
          </span>
        </div>
        <Footer className="mt-[4cqmin]" />
      </div>
    </Post>
  )
}

/* ---------- 07 How it works ---------- */
const steps = [
  { icon: MessageSquare, title: "Ask", body: "Your AI agent sends the question." },
  { icon: Tag, title: "See the price", body: "A hard quote and an abstract, before any charge." },
  { icon: CheckCircle2, title: "Approve", body: "Pay only for the answers you want." },
]

function P07({ f }: P) {
  return (
    <Post f={f} n={7} name="How it works" className="bg-neutral-50 text-neutral-900">
      <Split
        f={f}
        leadWidth="w-[36%]"
        lead={
          <>
            <Eyebrow className="text-brand-600">How ADXC works</Eyebrow>
            <p
              className={cn(
                "mt-[2.4cqmin] font-semibold leading-[1.05] tracking-[-0.03em]",
                pick(f, { s: "text-[6.4cqmin]", p: "text-[8cqmin]", l: "mt-[4cqmin] text-[8cqmin]" }),
              )}
            >
              Three steps. No contracts.
            </p>
          </>
        }
        visual={
          <ol className="space-y-[2.4cqmin]">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex items-center gap-[3cqmin] rounded-[0.8cqmin] bg-white p-[3cqmin] shadow-xs ring-1 ring-neutral-200"
              >
                <span className="font-mono text-[2.6cqmin] text-neutral-400">0{i + 1}</span>
                <span className="grid size-[8cqmin] shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <s.icon className="size-[4cqmin]" />
                </span>
                <div>
                  <p className="text-[3.4cqmin] font-bold leading-tight">{s.title}</p>
                  <p className="text-[2.8cqmin] leading-snug text-neutral-500">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        }
      />
    </Post>
  )
}

/* ---------- 08 Diagonal Q&A ---------- */
function P08({ f }: P) {
  const wide = f === "landscape"
  return (
    <Post f={f} n={8} name="Diagonal Q&A" className="bg-neutral-50 text-neutral-900">
      <div
        className={cn(
          "absolute inset-0 bg-brand-600",
          wide
            ? "[clip-path:polygon(0_0,58%_0,42%_100%,0_100%)]"
            : "[clip-path:polygon(0_0,100%_0,100%_38%,0_62%)]",
        )}
        aria-hidden
      />
      <div className={cn("relative flex h-full justify-between", PAD, wide ? "flex-row" : "flex-col")}>
        <div className={cn("text-neutral-50", wide ? "w-[38%]" : "max-w-[85%]")}>
          <Eyebrow className="text-brand-200">The question</Eyebrow>
          <p
            className={cn(
              "mt-[2.4cqmin] font-semibold leading-[1.08] tracking-[-0.03em]",
              pick(f, { s: "text-[6cqmin]", p: "text-[7.4cqmin]", l: "text-[7cqmin]" }),
            )}
          >
            What makes a coffee brand feel premium?
          </p>
        </div>
        <div className={cn("text-right", wide ? "w-[38%] self-end" : "ml-auto max-w-[78%]")}>
          <Eyebrow className="text-brand-600">The answer</Eyebrow>
          <p className="mt-[2.4cqmin] text-[4cqmin] font-medium leading-[1.25]">
            Origin stories, not price tags. Synthesised across 4 providers.
          </p>
          <Footer className="mt-[4cqmin]" />
        </div>
      </div>
    </Post>
  )
}

/* ---------- 09 Receipt ---------- */
const receiptRows = [
  ["Providers routed", "3"],
  ["Abstract", "Ready"],
  ["Raw data shared", "None"],
]

function P09({ f }: P) {
  const wide = f === "landscape"
  return (
    <Post f={f} n={9} name="Receipt" className="bg-neutral-200 text-neutral-900">
      <div
        className={cn(
          "flex h-full items-center justify-center",
          PAD,
          wide ? "flex-row-reverse gap-[10cqmin]" : "flex-col",
        )}
      >
        <div className="w-[72cqmin] shrink-0 -rotate-2 bg-white p-[5cqmin] font-mono text-[2.6cqmin] shadow-lg">
          <div className="flex items-center justify-between">
            <Wordmark className="font-sans text-[3.2cqmin]" />
            <span className="text-neutral-400">#Q-0427</span>
          </div>
          <div className="my-[3cqmin] border-t border-dashed border-neutral-300" />
          {receiptRows.map(([k, v]) => (
            <div key={k} className="flex justify-between py-[0.6cqmin]">
              <span className="text-neutral-500">{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="my-[3cqmin] border-t border-dashed border-neutral-300" />
          <div className="flex justify-between text-[3.4cqmin] font-bold">
            <span>Quoted</span>
            <span>$3.80</span>
          </div>
          <div className="flex justify-between text-[3.4cqmin] font-bold text-brand-600">
            <span>Charged</span>
            <span>$0.00</span>
          </div>
          <p className="mt-[3cqmin] text-center text-[2.2cqmin] text-neutral-500">
            Nothing is charged until you approve.
          </p>
        </div>
        <p
          className={cn(
            "font-semibold tracking-[-0.03em]",
            pick(f, {
              s: "mt-[7cqmin] text-center text-[5cqmin]",
              p: "mt-[10cqmin] text-center text-[7cqmin]",
              l: "text-[9cqmin] leading-[1]",
            }),
          )}
        >
          Know the {wide && <br />}price first.
        </p>
      </div>
    </Post>
  )
}

/* ---------- 10 Minimal type ---------- */
function P10({ f }: P) {
  const wide = f === "landscape"
  return (
    <Post f={f} n={10} name="Minimal type" className="bg-neutral-50 text-neutral-900">
      <div className={cn("flex h-full flex-col", PAD)}>
        <Wordmark className="text-[3cqmin] text-brand-600" />
        <p
          className={cn(
            "mt-auto font-medium leading-[0.88] tracking-[-0.06em]",
            pick(f, { s: "text-[19cqmin]", p: "text-[22cqmin]", l: "text-[19cqmin]" }),
          )}
        >
          Pay per{wide ? " " : <br />}query<span className="text-brand-600">.</span>
        </p>
        <div className="mt-[5cqmin] flex items-center justify-between border-t border-neutral-300 pt-[3cqmin] text-[2.8cqmin] text-neutral-600">
          <span>Premium consumer data for AI agents</span>
          <span className="font-semibold text-neutral-900">adxc.ai</span>
        </div>
      </div>
    </Post>
  )
}

/* ---------- 11 Data insight chart ---------- */
const bars = [
  { label: "Price", value: 64, color: "bg-chart-1" },
  { label: "Reviews", value: 48, color: "bg-chart-2" },
  { label: "Brand values", value: 31, color: "bg-chart-3" },
  { label: "Influencers", value: 22, color: "bg-chart-4" },
]

function P11({ f }: P) {
  return (
    <Post f={f} n={11} name="Data insight chart" className="bg-white text-neutral-900">
      <Split
        f={f}
        lead={
          <>
            <Eyebrow className="text-neutral-500">Asked on ADXC · Sample data</Eyebrow>
            <p
              className={cn(
                "mt-[2.4cqmin] font-semibold leading-[1.1] tracking-[-0.03em]",
                pick(f, { s: "text-[5.6cqmin]", p: "text-[7cqmin]", l: "mt-[4cqmin] text-[7cqmin]" }),
              )}
            >
              What drives a first purchase from a new skincare brand?
            </p>
          </>
        }
        visual={
          <div className="space-y-[3cqmin]">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="mb-[1.2cqmin] flex justify-between text-[2.8cqmin] font-semibold">
                  <span>{b.label}</span>
                  <span className="text-neutral-500">{b.value}%</span>
                </div>
                <div className="h-[3cqmin] rounded-full bg-neutral-100">
                  <div className={cn("h-full rounded-full", b.color)} style={{ width: `${b.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        }
      />
    </Post>
  )
}

/* ---------- 12 Myth vs fact ---------- */
function P12({ f }: P) {
  const wide = f === "landscape"
  const size = pick(f, { s: "text-[5.6cqmin]", p: "text-[7cqmin]", l: "text-[7cqmin]" })
  return (
    <Post f={f} n={12} name="Myth vs fact" className="bg-brand-600 text-neutral-50">
      <div className={cn("flex h-full", wide ? "flex-row" : "flex-col")}>
        <div className={cn("flex flex-1 flex-col justify-center bg-neutral-100 text-neutral-900", PAD)}>
          <Chip className="self-start bg-neutral-200 text-neutral-600">
            <X className="size-[2.4cqmin]" />
            Myth
          </Chip>
          <p
            className={cn(
              "mt-[3cqmin] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-500 line-through decoration-red-500 decoration-[0.5cqmin]",
              size,
            )}
          >
            Premium data means a 12-month contract.
          </p>
        </div>
        <div className={cn("flex flex-1 flex-col justify-center", PAD)}>
          <div className="flex items-center justify-between">
            <Chip className="bg-neutral-50/15 text-neutral-50">
              <Check className="size-[2.4cqmin]" />
              Fact
            </Chip>
            <Wordmark className="text-[3cqmin]" />
          </div>
          <p className={cn("mt-[3cqmin] font-semibold leading-[1.08] tracking-[-0.03em]", size)}>
            With ADXC you pay per query, and see the price first.
          </p>
        </div>
      </div>
    </Post>
  )
}

/* ---------- 13 Persona — agencies ---------- */
function P13({ f }: P) {
  return (
    <Post f={f} n={13} name="Persona — agencies" className="bg-white text-neutral-900">
      <div className="absolute inset-y-0 left-0 w-[2.4cqmin] bg-cyan-600" aria-hidden />
      <Split
        f={f}
        leadWidth="w-[46%]"
        lead={
          <>
            <div className="flex items-center gap-[2cqmin]">
              <span className="grid size-[8cqmin] place-items-center rounded-[0.6cqmin] bg-cyan-50 text-cyan-700">
                <Briefcase className="size-[4cqmin]" />
              </span>
              <Eyebrow className="text-cyan-700">For agencies</Eyebrow>
            </div>
            <p
              className={cn(
                "mt-[5cqmin] font-semibold leading-[1.04] tracking-[-0.035em]",
                pick(f, { s: "text-[7.4cqmin]", p: "text-[9cqmin]", l: "text-[8cqmin]" }),
              )}
            >
              Every query, attributed to the right client.
            </p>
          </>
        }
        visual={
          <ul className="space-y-[2.4cqmin] text-[3.2cqmin]">
            {[
              "Spend tracked by client and brief",
              "Query history you can show clients",
              "One credit balance for the team",
            ].map((t) => (
              <li key={t} className="flex items-center gap-[2cqmin]">
                <Check className="size-[3.4cqmin] shrink-0 text-cyan-600" />
                {t}
              </li>
            ))}
          </ul>
        }
      />
    </Post>
  )
}

/* ---------- 14 Developer / API ---------- */
function P14({ f }: P) {
  return (
    <Post f={f} n={14} name="Developer / API" className="bg-neutral-950 text-neutral-100">
      <Split
        f={f}
        footer={false}
        leadWidth="w-[34%]"
        lead={
          <>
            <div className="flex items-center justify-between">
              <Eyebrow className="text-brand-300">For AI platforms</Eyebrow>
              {f !== "landscape" && <Wordmark className="text-[3cqmin]" />}
            </div>
            <p
              className={cn(
                "mt-[3cqmin] font-semibold leading-[1.05] tracking-[-0.03em]",
                pick(f, { s: "text-[6cqmin]", p: "text-[8cqmin]", l: "mt-[5cqmin] text-[8cqmin]" }),
              )}
            >
              One endpoint.
              <br />
              Premium answers.
            </p>
            {f === "landscape" && <Wordmark className="mt-auto text-[3cqmin]" />}
          </>
        }
        visual={
          <pre className="overflow-hidden rounded-[0.8cqmin] bg-neutral-900 p-[4cqmin] font-mono text-[2.5cqmin] leading-[1.6] ring-1 ring-neutral-800">
            <code>
              <span className="text-emerald-400">POST</span> /v2/orgs/
              <span className="text-neutral-500">{"{org_id}"}</span>/query{"\n"}
              {"{ "}
              <span className="text-brand-300">&quot;question&quot;</span>:{" "}
              <span className="text-orange-300">&quot;How do Gen Z rate oat milk?&quot;</span>
              {" }\n\n"}
              <span className="text-neutral-500">{"// 200 OK"}</span>
              {"\n{\n  "}
              <span className="text-brand-300">&quot;paywalled&quot;</span>:{" "}
              <span className="text-cyan-300">true</span>,{"\n  "}
              <span className="text-brand-300">&quot;price&quot;</span>:{" "}
              <span className="text-orange-300">&quot;2.40&quot;</span>,{"\n  "}
              <span className="text-brand-300">&quot;abstract&quot;</span>:{" "}
              <span className="text-orange-300">&quot;Everyday, not niche…&quot;</span>
              {"\n}"}
            </code>
          </pre>
        }
      />
    </Post>
  )
}

/* ---------- 15 Launch on dot grid ---------- */
function P15({ f }: P) {
  return (
    <Post f={f} n={15} name="Launch on dot grid" className="bg-neutral-50 text-neutral-900">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className={cn("relative flex h-full flex-col items-center justify-center text-center", PAD)}>
        <div className="rounded-[0.6cqmin] bg-neutral-50 px-[6cqmin] py-[5cqmin] shadow-xl ring-1 ring-neutral-200">
          <Wordmark className={cn("text-brand-600", pick(f, { s: "text-[16cqmin]", p: "text-[18cqmin]" }))} />
          <p className="mt-[2.4cqmin] text-[4.2cqmin] font-semibold tracking-[-0.02em]">is now live.</p>
        </div>
        <p className="mt-[6cqmin] max-w-[75%] text-[3.2cqmin] text-neutral-600">
          The agentic data exchange for brands, agencies and AI platforms.
        </p>
      </div>
    </Post>
  )
}

/* ---------- 16 Inside your AI agent ---------- */
function P16({ f }: P) {
  const wide = f === "landscape"
  const headline = (
    <p
      className={cn(
        "font-semibold leading-[1.15] tracking-[-0.02em]",
        pick(f, { s: "text-[4.4cqmin]", p: "text-[6cqmin]", l: "mt-[4cqmin] text-[7cqmin] leading-[1.08]" }),
      )}
    >
      Premium data, right where you already work.
    </p>
  )
  const chat = (
    <div className="space-y-[3cqmin]">
      <div className="ml-auto w-fit max-w-[78%] rounded-[2.4cqmin] rounded-br-[0.4cqmin] bg-brand-600 px-[3.6cqmin] py-[2.6cqmin] text-[3.2cqmin] leading-[1.35] text-neutral-50">
        What do UK parents look for in a family car?
      </div>
      <div className="flex items-end gap-[2cqmin]">
        <span className="grid size-[7cqmin] shrink-0 place-items-center rounded-full bg-neutral-900 text-neutral-50">
          <Bot className="size-[3.8cqmin]" />
        </span>
        <div className="max-w-[82%] rounded-[2.4cqmin] rounded-bl-[0.4cqmin] bg-white px-[3.6cqmin] py-[3cqmin] text-[3cqmin] leading-[1.4] shadow-sm">
          <p>
            Found an answer across <b>3 providers</b>.
          </p>
          <p className="mt-[1.5cqmin] text-neutral-500">
            Boot space and running costs lead; safety ratings close the deal…
          </p>
          <div className="mt-[2.5cqmin] flex items-center justify-between gap-[2cqmin] border-t border-neutral-200 pt-[2.5cqmin]">
            <span className="font-bold">$2.90</span>
            <span className="inline-flex items-center gap-[0.8cqmin] rounded-[0.3cqmin] bg-primary px-[2.4cqmin] py-[1.2cqmin] text-[2.4cqmin] font-semibold text-primary-foreground">
              <Lock className="size-[2.4cqmin]" />
              Unlock full answer
            </span>
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Post f={f} n={16} name="Inside your AI agent" className="bg-neutral-100 text-neutral-900">
      {wide ? (
        <Split
          f={f}
          leadWidth="w-[36%]"
          lead={
            <>
              <Eyebrow className="text-neutral-500">Inside your AI agent</Eyebrow>
              {headline}
            </>
          }
          visual={chat}
        />
      ) : (
        <div className={cn("flex h-full flex-col", PAD)}>
          <div className="flex items-center justify-between">
            <Eyebrow className="text-neutral-500">Inside your AI agent</Eyebrow>
            <Wordmark className="text-[3cqmin] text-brand-600" />
          </div>
          <div className="mt-auto">{chat}</div>
          <div className="mt-[5cqmin]">{headline}</div>
        </div>
      )}
    </Post>
  )
}

/* ---------- 17 See / never see ---------- */
function P17({ f }: P) {
  return (
    <Post f={f} n={17} name="See / never see" className="bg-white text-neutral-900">
      <Split
        f={f}
        leadWidth="w-[32%]"
        lead={
          <p
            className={cn(
              "font-semibold leading-[1.05] tracking-[-0.03em]",
              pick(f, { s: "text-[6.4cqmin]", p: "text-[8cqmin]", l: "text-[8cqmin]" }),
            )}
          >
            What you get.
            <br />
            <span className="text-neutral-400">What you don&apos;t.</span>
          </p>
        }
        visual={
          <div className="grid grid-cols-2 gap-[3cqmin]">
            <div className="rounded-[0.8cqmin] bg-brand-50 p-[4cqmin]">
              <Eyebrow className="text-brand-700">You see</Eyebrow>
              <ul className="mt-[3cqmin] space-y-[2cqmin] text-[3cqmin] font-medium leading-tight">
                {["The price, upfront", "An abstract first", "Every source named"].map((t) => (
                  <li key={t} className="flex items-start gap-[1.5cqmin]">
                    <Check className="mt-[0.2cqmin] size-[3cqmin] shrink-0 text-brand-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[0.8cqmin] bg-neutral-100 p-[4cqmin]">
              <Eyebrow className="text-neutral-500">You never see</Eyebrow>
              <ul className="mt-[3cqmin] space-y-[2cqmin] text-[3cqmin] font-medium leading-tight text-neutral-500">
                {["Surprise charges", "Annual contracts", "Raw data dumps"].map((t) => (
                  <li key={t} className="flex items-start gap-[1.5cqmin]">
                    <X className="mt-[0.2cqmin] size-[3cqmin] shrink-0 text-neutral-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      />
    </Post>
  )
}

/* ---------- 18 Carousel cover ---------- */
function P18({ f }: P) {
  return (
    <Post f={f} n={18} name="Carousel cover" className="bg-brand-700 text-neutral-50">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--color-brand-500),transparent_60%)] opacity-70"
        aria-hidden
      />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <div className="flex items-center justify-between">
          <Wordmark className="text-[3cqmin]" />
          <span className="font-mono text-[2.6cqmin] text-brand-200">01 / 06</span>
        </div>
        <p
          className={cn(
            "mt-auto font-semibold leading-[0.98] tracking-[-0.04em]",
            pick(f, { s: "text-[10cqmin]", p: "text-[12cqmin]", l: "max-w-[75%] text-[11cqmin]" }),
          )}
        >
          5 questions brands asked ADXC this month
        </p>
        <div className="mt-[6cqmin] flex items-center justify-between">
          <div className="flex gap-[1.2cqmin]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-[1.2cqmin] rounded-full",
                  i === 0 ? "w-[6cqmin] bg-neutral-50" : "w-[1.2cqmin] bg-neutral-50/35",
                )}
              />
            ))}
          </div>
          <span className="inline-flex items-center gap-[1.5cqmin] text-[3cqmin] font-semibold">
            Swipe <ArrowRight className="size-[3.4cqmin]" />
          </span>
        </div>
      </div>
    </Post>
  )
}

/* ---------- 19 Old way vs ADXC ---------- */
const compareRows = [
  ["Contract", "12 months", "None"],
  ["Price known", "After", "Before"],
  ["You pay for", "Access", "Answers"],
  ["Time to insight", "Weeks", "Minutes"],
]

function P19({ f }: P) {
  return (
    <Post f={f} n={19} name="Old way vs ADXC" className="bg-neutral-50 text-neutral-900">
      <Split
        f={f}
        leadWidth="w-[34%]"
        lead={
          <p
            className={cn(
              "font-semibold leading-[1.05] tracking-[-0.03em]",
              pick(f, { s: "text-[6.4cqmin]", p: "text-[8cqmin]", l: "text-[8cqmin]" }),
            )}
          >
            Consumer research,
            <br />
            rebuilt for agents.
          </p>
        }
        visual={
          <div className="relative">
            <div className="absolute inset-y-0 right-0 w-[30%] rounded-[0.8cqmin] bg-brand-600" aria-hidden />
            <div className="relative grid grid-cols-[1fr_30%_30%] text-[3cqmin]">
              <span />
              <span className="py-[2.4cqmin] text-center font-semibold text-neutral-500">Traditional</span>
              <span className="py-[2.4cqmin] text-center font-bold text-neutral-50">ADXC</span>
              {compareRows.flatMap(([k, a, b]) => [
                <span key={`${k}-k`} className="border-t border-neutral-200 py-[2.4cqmin] font-semibold">
                  {k}
                </span>,
                <span
                  key={`${k}-a`}
                  className="border-t border-neutral-200 py-[2.4cqmin] text-center text-neutral-500"
                >
                  {a}
                </span>,
                <span
                  key={`${k}-b`}
                  className="border-t border-neutral-50/20 py-[2.4cqmin] text-center font-semibold text-neutral-50"
                >
                  {b}
                </span>,
              ])}
            </div>
          </div>
        }
      />
    </Post>
  )
}

/* ---------- 20 Countdown ---------- */
function P20({ f }: P) {
  const wide = f === "landscape"
  const number = (
    <p
      className={cn(
        "font-bold leading-[0.8] tracking-[-0.07em] text-transparent [-webkit-text-stroke:0.4cqmin_var(--color-brand-400)]",
        pick(f, { s: "text-[44cqmin]", p: "text-[56cqmin]", l: "text-[58cqmin]" }),
      )}
    >
      07
    </p>
  )
  const copy = (
    <>
      <p
        className={cn(
          "font-semibold leading-none tracking-[-0.03em]",
          pick(f, { s: "mt-[3cqmin] text-[7cqmin]", p: "mt-[4cqmin] text-[8cqmin]", l: "text-[9cqmin] leading-[1]" }),
        )}
      >
        days until {wide && <br />}Lisbon.
      </p>
      <p className="mt-[2.4cqmin] text-[3cqmin] text-neutral-400">Join the beta → adxc.ai/websummit</p>
    </>
  )
  return (
    <Post f={f} n={20} name="Countdown" className="bg-neutral-950 text-neutral-50">
      <div className="bg-grid bg-grid-sm absolute inset-0 opacity-15" aria-hidden />
      <div className={cn("relative flex h-full flex-col", PAD)}>
        <div className="flex items-center justify-between">
          <Eyebrow className="text-brand-300">Web Summit 2026</Eyebrow>
          <Wordmark className="text-[3cqmin]" />
        </div>
        {wide ? (
          <div className="mt-auto flex items-end gap-[6cqmin]">
            {number}
            <div className="pb-[1cqmin]">{copy}</div>
          </div>
        ) : (
          <div className="mt-auto">
            {number}
            {copy}
          </div>
        )}
      </div>
    </Post>
  )
}

const DESIGNS = [P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20]

/* ---------- page ---------- */
async function LinkedInPostDesignsPageContent({
  searchParams,
}: {
  searchParams: Promise<{ format?: string; export?: string }>
}) {
  const sp = await searchParams
  const f: Format = sp.format === "portrait" || sp.format === "landscape" ? sp.format : "square"
  const exportMode = sp.export === "1"

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-10">
      <header className="mx-auto mb-10 max-w-6xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← All content
        </Link>
        <p className="text-caption mt-6 text-muted-foreground">LinkedIn · 20 templates</p>
        <h1 className="mt-3">Templates</h1>

        <nav className="mt-8 inline-flex flex-wrap gap-1 rounded-lg bg-muted p-1" aria-label="Post format">
          {FORMAT_KEYS.map((k) => (
            <Link
              key={k}
              prefetch={true}
              href={`?format=${k}${exportMode ? "&export=1" : ""}`}
              scroll={false}
              aria-current={k === f ? "page" : undefined}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                k === f ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {FORMATS[k].label}
              <span className="ml-2 font-mono text-xs opacity-60">{FORMATS[k].size}</span>
            </Link>
          ))}
        </nav>
      </header>

      <div
        style={exportMode ? { width: FORMATS[f].exportW } : undefined}
        className={cn("mx-auto grid gap-10", exportMode ? "grid-cols-1" : cn("max-w-6xl grid-cols-1", FORMATS[f].cols))}
      >
        {DESIGNS.map((Design, i) => (
          <Design key={i} f={f} />
        ))}
      </div>
    </main>
  )
}

/* Cache Components: searchParams is request-time data, so it renders inside <Suspense>. */
export default function LinkedInPostDesignsPage({ searchParams }: { searchParams: Promise<{ format?: string; export?: string }> }) {
  return (
    <Suspense fallback={null}>
      <LinkedInPostDesignsPageContent searchParams={searchParams} />
    </Suspense>
  )
}
