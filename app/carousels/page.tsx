/* ============================================================
   LinkedIn carousels — square 1080 × 1080, 5 slides each
   Route: /carousels
     &export=1  → every slide at 1080 × 1080, stacked, for export
                  (combine the 5 slides into one PDF to upload
                  as a LinkedIn document post)

   A  How ADXC works (buyers)
   B  How ADXC works for data providers
   C  Hello, LinkedIn (company intro)
   D  Why we built ADXC (founding story)
   E  4 myths about premium data and AI
   F  ADXC in 4 numbers (product facts)
   G  What would you ask? (one question per role)

   A thin "thread" line runs along the bottom edge and continues
   from slide to slide, so the set reads as one strip when swiped.

   Prices, figures, roadmap items and questions are SAMPLE copy only.
   [Bracketed] text is a placeholder.
   ============================================================ */

import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { Suspense } from "react"
import {
  ArrowRight,
  Bot,
  Briefcase,
  Check,
  Database,
  FileText,
  Lock,
  Plus,
  ShoppingBag,
  Tag,
  TriangleAlert,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo, logoVarsFor } from "@/components/brand/logo"

export const metadata: Metadata = {
  title: "LinkedIn carousels",
  robots: { index: false, follow: false },
}

/* ---------- shared building blocks ---------- */

const PAD = "p-[7.4cqw]"
const H = "font-semibold tracking-[-0.035em]"
const TOTAL = 5

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

/** One carousel slide: header with progress, continuous thread line, content. */
function Slide({
  n,
  className,
  accent = "bg-current",
  bg,
  children,
}: {
  n: number
  className?: string
  accent?: string
  bg?: ReactNode
  children: ReactNode
}) {
  return (
    <figure className="flex snap-start flex-col gap-3">
      <div
        style={logoVarsFor(className)}
        className={cn(
          "@container relative aspect-square w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-border",
          className,
        )}
      >
        {bg}
        {/* thread: starts on slide 1, runs off the right edge, continues on the next slide */}
        <div
          className="pointer-events-none absolute bottom-[3.7cqw] h-[0.3cqw] bg-current opacity-25"
          style={{ left: n === 1 ? "7.4cqw" : 0, right: n === TOTAL ? "7.4cqw" : 0 }}
          aria-hidden
        />
        <span
          className={cn("absolute bottom-[3.7cqw] size-[1.6cqw] translate-y-[0.65cqw] rounded-full", accent)}
          style={{ left: `calc(7.4cqw + ${(n - 1) * 20}%)` }}
          aria-hidden
        />
        <div className={cn("relative flex h-full flex-col", PAD)}>
          <div className="flex items-center justify-between">
            <Wordmark className="text-[3cqw]" />
            <div className="flex items-center gap-[2cqw]">
              <div className="flex gap-[0.8cqw]" aria-hidden>
                {Array.from({ length: TOTAL }).map((_, i) => (
                  <span
                    key={i}
                    className={cn("h-[0.9cqw] w-[3cqw] rounded-full", i < n ? accent : "bg-current opacity-20")}
                  />
                ))}
              </div>
              <span className="font-mono text-[2.4cqw] opacity-70">
                0{n} / 0{TOTAL}
              </span>
            </div>
          </div>
          {children}
        </div>
      </div>
      <figcaption className="text-sm text-muted-foreground">
        <span className="font-mono text-xs">Slide {n}</span>
      </figcaption>
    </figure>
  )
}

function Step({ num, title, body, accent }: { num: string; title: ReactNode; body: ReactNode; accent: string }) {
  return (
    <div className="mt-[6cqw]">
      <p className={cn("font-mono text-[2.8cqw] font-semibold", accent)}>Step {num}</p>
      <p className={cn(H, "mt-[1.6cqw] text-[9cqw] leading-[0.98]")}>{title}</p>
      <p className="mt-[2.4cqw] max-w-[88%] text-[3.4cqw] leading-[1.4] opacity-70">{body}</p>
    </div>
  )
}

function Next({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-[4cqw] inline-flex items-center gap-[1.2cqw] text-[2.6cqw] font-semibold opacity-60", className)}>
      Next: {children} <ArrowRight className="size-[2.8cqw]" />
    </p>
  )
}

/* ============================================================
   CAROUSEL A — How ADXC works (brands, agencies, AI teams)
   ============================================================ */

function A1() {
  return (
    <Slide
      n={1}
      className="bg-brand-600 text-neutral-50"
      accent="bg-neutral-50"
      bg={<div className="bg-grid bg-grid-sm absolute inset-0 opacity-25" aria-hidden />}
    >
      <Eyebrow className="mt-auto text-brand-200">The basics</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[14cqw] leading-[0.9]")}>
        How ADXC
        <br />
        works.
      </p>
      <p className="mt-[4cqw] max-w-[80%] text-[3.8cqw] leading-[1.35] text-brand-100">
        Premium consumer data for your AI agent, in four steps.
      </p>
      <p className="mt-[6cqw] inline-flex items-center gap-[1.5cqw] text-[3cqw] font-semibold">
        Swipe <ArrowRight className="size-[3.4cqw]" />
      </p>
    </Slide>
  )
}

function A2() {
  return (
    <Slide n={2} className="bg-neutral-50 text-neutral-900" accent="bg-brand-600">
      <Step
        num="01"
        accent="text-brand-600"
        title="Ask."
        body="Your AI agent sends a question to ADXC, straight from the tools you already use."
      />
      <div className="mt-auto space-y-[2cqw]">
        <div className="ml-auto w-fit max-w-[85%] rounded-[2.4cqw] rounded-br-[0.4cqw] bg-brand-600 px-[3.6cqw] py-[2.8cqw] text-[3.4cqw] leading-[1.35] text-neutral-50">
          What makes Gen Z switch skincare brands?
        </div>
        <p className="flex items-center justify-end gap-[1cqw] text-[2.4cqw] text-neutral-500">
          <Bot className="size-[2.8cqw]" /> sent by your AI agent
        </p>
      </div>
      <Next>routing</Next>
    </Slide>
  )
}

const providers = [
  { name: "YouGov", hit: true },
  { name: "Reddit", hit: true },
  { name: "X", hit: false },
  { name: "Quid", hit: true },
  { name: "US Census", hit: false },
]

function A3() {
  return (
    <Slide n={3} className="bg-white text-neutral-900" accent="bg-brand-600">
      <Step
        num="02"
        accent="text-brand-600"
        title="We route it."
        body="ADXC finds the premium providers that can answer it, automatically."
      />
      <div className="mt-auto flex flex-col items-center">
        <span className="grid h-[9cqw] place-items-center rounded-[0.6cqw] bg-brand-600 px-[5cqw] text-neutral-50">
          <Wordmark variant="mono" className="text-[3.6cqw]" />
        </span>
        <span className="h-[3cqw] w-[0.4cqw] bg-neutral-300" aria-hidden />
        <span className="h-[0.4cqw] w-[80%] bg-neutral-300" aria-hidden />
        <div className="flex w-full justify-between">
          {providers.map((p) => (
            <div key={p.name} className="flex flex-col items-center">
              <span className={cn("h-[3cqw] w-[0.4cqw]", p.hit ? "bg-brand-600" : "bg-neutral-200")} aria-hidden />
              <span
                className={cn(
                  "inline-flex items-center gap-[0.6cqw] rounded-full px-[1.6cqw] py-[1cqw] text-[2.2cqw] font-semibold",
                  p.hit ? "bg-brand-50 text-brand-700 ring-1 ring-brand-300" : "bg-neutral-100 text-neutral-400",
                )}
              >
                {p.hit && <Check className="size-[2.2cqw]" />}
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Next>the price</Next>
    </Slide>
  )
}

function A4() {
  return (
    <Slide n={4} className="bg-neutral-100 text-neutral-900" accent="bg-brand-600">
      <Step
        num="03"
        accent="text-brand-600"
        title="See the price first."
        body="A hard quote and a synthesised abstract. Nothing is charged yet."
      />
      <div className="mt-auto rounded-[0.8cqw] bg-white p-[4.4cqw] shadow-md">
        <div className="flex items-center justify-between">
          <Chip className="bg-brand-50 text-brand-700">
            <Tag className="size-[2.4cqw]" />
            Quoted
          </Chip>
          <span className="text-[7cqw] font-semibold leading-none tracking-[-0.04em]">$3.80</span>
        </div>
        <p className="mt-[3cqw] text-[3cqw] leading-[1.45] text-neutral-600">
          Ingredient transparency beats price. Switching is triggered by peer reviews, not ads…
        </p>
        <div className="mt-[3cqw] flex justify-between border-t border-neutral-200 pt-[2.4cqw] font-mono text-[2.4cqw]">
          <span className="text-neutral-500">Charged so far</span>
          <span className="font-bold text-brand-600">$0.00</span>
        </div>
      </div>
      <Next>approve</Next>
    </Slide>
  )
}

function A5() {
  return (
    <Slide n={5} className="bg-brand-950 text-neutral-50" accent="bg-brand-400">
      <Step
        num="04"
        accent="text-brand-300"
        title="Approve. Get the answer."
        body="Pay only for the answers you want. Raw data is never exposed."
      />
      <div className="mt-auto flex items-center gap-[3cqw]">
        <span className="inline-flex items-center gap-[1.2cqw] rounded-[0.3cqw] bg-neutral-50 px-[3.6cqw] py-[2.2cqw] text-[3cqw] font-semibold text-brand-800">
          Approve $3.80 <ArrowRight className="size-[3cqw]" />
        </span>
        <span className="inline-flex items-center gap-[1cqw] text-[2.8cqw] text-emerald-300">
          <Check className="size-[3cqw]" /> Full answer unlocked
        </span>
      </div>
      <div className="mt-[5cqw] flex items-center justify-between rounded-[0.8cqw] bg-neutral-50/10 p-[3.4cqw] ring-1 ring-neutral-50/15">
        <p className="text-[3.4cqw] font-semibold">Load credit. Ask. Approve.</p>
        <p className="text-[3cqw] font-semibold text-brand-300">adxc.ai</p>
      </div>
    </Slide>
  )
}

/* ============================================================
   CAROUSEL B — How ADXC works for data providers
   ============================================================ */

function B1() {
  return (
    <Slide
      n={1}
      className="bg-neutral-950 text-neutral-50"
      accent="bg-cyan-400"
      bg={
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,var(--color-cyan-800),transparent_55%)] opacity-80"
          aria-hidden
        />
      }
    >
      <Eyebrow className="mt-auto text-cyan-300">For data providers</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[11cqw] leading-[0.92]")}>
        How ADXC works for data providers.
      </p>
      <p className="mt-[4cqw] max-w-[82%] text-[3.8cqw] leading-[1.35] text-neutral-300">
        Earn from the AI economy, without handing over your data.
      </p>
      <p className="mt-[6cqw] inline-flex items-center gap-[1.5cqw] text-[3cqw] font-semibold">
        Swipe <ArrowRight className="size-[3.4cqw]" />
      </p>
    </Slide>
  )
}

function FlowNode({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  return (
    <div className="flex flex-col items-center gap-[1.6cqw]">
      <span className={cn("grid size-[16cqw] place-items-center rounded-[0.8cqw]", className)}>{children}</span>
      <span className="text-[2.4cqw] font-semibold opacity-70">{label}</span>
    </div>
  )
}

function B2() {
  return (
    <Slide n={2} className="bg-neutral-950 text-neutral-50" accent="bg-cyan-400">
      <Step
        num="01"
        accent="text-cyan-300"
        title="Connect once."
        body="Bring your dataset to ADXC. It becomes reachable by AI agents through one exchange."
      />
      <div className="mt-auto flex items-center justify-between">
        <FlowNode label="Your data" className="bg-cyan-950 text-cyan-300 ring-1 ring-cyan-800">
          <Database className="size-[7cqw]" />
        </FlowNode>
        <ArrowRight className="mb-[4cqw] size-[5cqw] text-neutral-600" />
        <FlowNode label="ADXC" className="bg-brand-600 text-neutral-50">
          <Wordmark mark variant="mono" className="text-[7cqw]" />
        </FlowNode>
        <ArrowRight className="mb-[4cqw] size-[5cqw] text-neutral-600" />
        <FlowNode label="AI agents" className="bg-neutral-900 text-neutral-300 ring-1 ring-neutral-800">
          <Bot className="size-[7cqw]" />
        </FlowNode>
      </div>
      <Next>matching</Next>
    </Slide>
  )
}

const incoming = [
  { q: "How do UK Gen Z rate oat milk brands?", match: true },
  { q: "Which US states lead EV adoption?", match: false },
  { q: "What drives UK grocery switching?", match: true },
]

function B3() {
  return (
    <Slide n={3} className="bg-neutral-900 text-neutral-50" accent="bg-cyan-400">
      <Step
        num="02"
        accent="text-cyan-300"
        title="Get matched."
        body="When a question fits your coverage, ADXC routes it to you."
      />
      <div className="mt-auto space-y-[1.8cqw]">
        {incoming.map((r) => (
          <div
            key={r.q}
            className={cn(
              "flex items-center justify-between gap-[3cqw] rounded-[0.6cqw] px-[3cqw] py-[2.4cqw] text-[2.8cqw]",
              r.match ? "bg-cyan-950 ring-1 ring-cyan-800" : "bg-neutral-950 text-neutral-500",
            )}
          >
            <span className="font-medium">{r.q}</span>
            <span
              className={cn(
                "shrink-0 text-[2.2cqw] font-semibold uppercase tracking-[0.08em]",
                r.match ? "text-cyan-300" : "text-neutral-600",
              )}
            >
              {r.match ? "Routed to you" : "Not a match"}
            </span>
          </div>
        ))}
      </div>
      <Next>protection</Next>
    </Slide>
  )
}

function B4() {
  return (
    <Slide n={4} className="bg-neutral-950 text-neutral-50" accent="bg-cyan-400">
      <Step
        num="03"
        accent="text-cyan-300"
        title="Stay protected."
        body="Only synthesised answers leave the exchange. Your raw rows never do."
      />
      <div className="mt-auto flex items-center gap-[3cqw]">
        <div className="relative flex-1 overflow-hidden rounded-[0.6cqw] bg-neutral-900 p-[2.6cqw] font-mono text-[2.2cqw] leading-[1.8] text-neutral-500 ring-1 ring-neutral-800">
          <div className="blur-[0.5cqw]" aria-hidden>
            <p>id · region · age · score</p>
            <p>0412 · UK-N · 24 · 0.82</p>
            <p>0413 · UK-S · 31 · 0.47</p>
            <p>0414 · UK-L · 19 · 0.91</p>
          </div>
          <span className="absolute inset-0 grid place-items-center">
            <span className="inline-flex items-center gap-[1cqw] rounded-full bg-neutral-950 px-[2.4cqw] py-[1.2cqw] text-[2.4cqw] font-semibold text-neutral-200 ring-1 ring-neutral-700">
              <Lock className="size-[2.6cqw]" /> Raw data stays put
            </span>
          </span>
        </div>
        <ArrowRight className="size-[4.4cqw] shrink-0 text-neutral-600" />
        <div className="flex-1 rounded-[0.6cqw] bg-white p-[2.6cqw] text-neutral-900">
          <p className="text-[2.2cqw] font-semibold uppercase tracking-[0.1em] text-cyan-700">Answer</p>
          <p className="mt-[1.2cqw] text-[2.6cqw] leading-[1.4]">
            Younger UK buyers favour oat milk for taste, not sustainability…
          </p>
        </div>
      </div>
      <Next>earning</Next>
    </Slide>
  )
}

const weeks = [12, 18, 15, 26, 31, 29, 42, 48]

function B5() {
  const max = Math.max(...weeks)
  return (
    <Slide n={5} className="bg-cyan-950 text-neutral-50" accent="bg-cyan-300">
      <Step
        num="04"
        accent="text-cyan-300"
        title="Earn per query."
        body="Every approved answer that draws on your data earns for you."
      />
      <div className="mt-auto">
        <div className="flex h-[18cqw] items-end gap-[1.6cqw]">
          {weeks.map((w, i) => (
            <span
              key={i}
              className={cn("flex-1 rounded-t-[0.4cqw]", i === weeks.length - 1 ? "bg-cyan-300" : "bg-cyan-700")}
              style={{ height: `${(w / max) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-[1.4cqw] flex justify-between text-[2.2cqw] text-cyan-200/70">
          <span>Queries answered with your data, weekly</span>
          <span>Sample data</span>
        </div>
      </div>
      <div className="mt-[4cqw] flex items-center justify-between rounded-[0.8cqw] bg-neutral-50/10 p-[3.4cqw] ring-1 ring-neutral-50/15">
        <p className="text-[3.4cqw] font-semibold">Become a provider</p>
        <p className="text-[3cqw] font-semibold text-cyan-300">adxc.ai/[providers]</p>
      </div>
    </Slide>
  )
}

/* ============================================================
   CAROUSEL C — Hello, LinkedIn (company intro)
   ============================================================ */

function C1() {
  return (
    <Slide n={1} className="bg-neutral-50 text-neutral-900" accent="bg-brand-600">
      <Eyebrow className="mt-auto text-brand-600">New here</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[14cqw] leading-[0.9]")}>
        Hello,
        <br />
        LinkedIn.
      </p>
      <p className={cn(H, "mt-[2cqw] text-[8cqw] leading-none text-brand-600")}>We&apos;re ADXC.</p>
      <p className="mt-[4cqw] max-w-[78%] text-[3.6cqw] leading-[1.35] text-neutral-600">
        A new way for AI agents to reach premium consumer data.
      </p>
      <p className="mt-[5cqw] inline-flex items-center gap-[1.5cqw] text-[3cqw] font-semibold">
        Swipe <ArrowRight className="size-[3.4cqw]" />
      </p>
    </Slide>
  )
}

function C2() {
  return (
    <Slide n={2} className="bg-white text-neutral-900" accent="bg-brand-600">
      <Eyebrow className="mt-[6cqw] text-brand-600">What we do</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[7.6cqw] leading-[1.02]")}>
        We connect AI agents to premium consumer data.{" "}
        <span className="text-neutral-400">You pay per question.</span>
      </p>
      <div className="mt-auto flex items-center justify-between gap-[2cqw]">
        <span className="inline-flex items-center gap-[1.2cqw] rounded-[0.6cqw] bg-neutral-100 px-[3cqw] py-[2.4cqw] text-[2.8cqw] font-semibold">
          <Bot className="size-[3.4cqw]" /> Your AI agent
        </span>
        <ArrowRight className="size-[4cqw] shrink-0 text-neutral-300" />
        <span className="grid place-items-center rounded-[0.6cqw] bg-brand-600 px-[3cqw] py-[2.4cqw] text-neutral-50">
          <Wordmark variant="mono" className="text-[3cqw]" />
        </span>
        <ArrowRight className="size-[4cqw] shrink-0 text-neutral-300" />
        <span className="rounded-[0.6cqw] bg-neutral-100 px-[3cqw] py-[2.4cqw] text-[2.8cqw] font-semibold">
          Premium sources
        </span>
      </div>
      <p className="mt-[3cqw] text-[2.6cqw] text-neutral-500">YouGov · Reddit · X · Quid · US Census · more to come</p>
      <Next>who it&apos;s for</Next>
    </Slide>
  )
}

const audiences = [
  { icon: ShoppingBag, who: "Brands", need: "Fast, sourced answers about consumers" },
  { icon: Briefcase, who: "Agencies", need: "Insight and spend tracked by client" },
  { icon: Bot, who: "AI platforms", need: "One API to premium data" },
  { icon: Database, who: "Data providers", need: "A new revenue channel into AI" },
]

function C3() {
  return (
    <Slide n={3} className="bg-neutral-100 text-neutral-900" accent="bg-brand-600">
      <Eyebrow className="mt-[6cqw] text-brand-600">Who it&apos;s for</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[8cqw] leading-[1]")}>Built for four kinds of teams.</p>
      <div className="mt-auto grid grid-cols-2 gap-[2.4cqw]">
        {audiences.map((a) => (
          <div key={a.who} className="rounded-[0.8cqw] bg-white p-[3.6cqw] shadow-xs ring-1 ring-neutral-200">
            <span className="grid size-[7cqw] place-items-center rounded-full bg-brand-50 text-brand-600">
              <a.icon className="size-[3.6cqw]" />
            </span>
            <p className="mt-[2.4cqw] text-[3.6cqw] font-bold leading-tight">{a.who}</p>
            <p className="mt-[0.8cqw] text-[2.6cqw] leading-snug text-neutral-500">{a.need}</p>
          </div>
        ))}
      </div>
      <Next>what&apos;s different</Next>
    </Slide>
  )
}

const principles = [
  { t: "Price before you pay", b: "Every question is hard-quoted up front." },
  { t: "Answers, not raw data", b: "Providers keep control. You get a synthesised result." },
  { t: "No contracts", b: "Load credit, ask, approve. That's it." },
]

function C4() {
  return (
    <Slide n={4} className="bg-white text-neutral-900" accent="bg-brand-600">
      <Eyebrow className="mt-[6cqw] text-brand-600">What&apos;s different</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[8cqw] leading-[1]")}>Three things we won&apos;t compromise on.</p>
      <ol className="mt-auto">
        {principles.map((p, i) => (
          <li key={p.t} className="flex gap-[3cqw] border-t border-neutral-200 py-[3cqw]">
            <span className="font-mono text-[3cqw] font-semibold text-brand-600">0{i + 1}</span>
            <div>
              <p className="text-[4cqw] font-bold leading-tight">{p.t}</p>
              <p className="mt-[0.8cqw] text-[2.8cqw] text-neutral-500">{p.b}</p>
            </div>
          </li>
        ))}
      </ol>
    </Slide>
  )
}

function C5() {
  return (
    <Slide
      n={5}
      className="bg-brand-600 text-neutral-50"
      accent="bg-neutral-50"
      bg={<div className="bg-grid bg-grid-sm absolute inset-0 opacity-25" aria-hidden />}
    >
      <p className={cn(H, "mt-auto text-[13cqw] leading-[0.92]")}>Follow along.</p>
      <p className="mt-[4cqw] max-w-[82%] text-[3.8cqw] leading-[1.4] text-brand-100">
        We&apos;ll share what we&apos;re building, what we learn, and the questions people bring us.
      </p>
      <div className="mt-[6cqw] flex flex-wrap items-center gap-[2cqw]">
        <span className="inline-flex items-center gap-[1.2cqw] rounded-[0.3cqw] bg-neutral-50 px-[3.4cqw] py-[2cqw] text-[3cqw] font-semibold text-brand-700">
          <Plus className="size-[3cqw]" /> Follow ADXC
        </span>
        <span className="text-[2.8cqw] font-semibold text-brand-100">adxc.ai</span>
      </div>
    </Slide>
  )
}

/* ============================================================
   CAROUSEL D — Why we built ADXC (founding story)
   ============================================================ */

function D1() {
  return (
    <Slide n={1} className="bg-brand-950 text-neutral-50" accent="bg-brand-400">
      <Eyebrow className="mt-auto text-brand-300">Why we built ADXC</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[10cqw] leading-[0.96]")}>
        AI agents are only as smart as the data they can reach.
      </p>
      <p className="mt-[6cqw] inline-flex items-center gap-[1.5cqw] text-[3cqw] font-semibold">
        Swipe <ArrowRight className="size-[3.4cqw]" />
      </p>
    </Slide>
  )
}

function D2() {
  const rows = [
    ["Term", "12 months"],
    ["Minimum spend", "$$$,$$$"],
    ["Seats", "5"],
    ["Use in AI tools", "Not permitted"],
  ]
  return (
    <Slide n={2} className="bg-brand-950 text-neutral-50" accent="bg-brand-400">
      <Eyebrow className="mt-[6cqw] text-brand-300">The problem</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[8.4cqw] leading-[1]")}>The best consumer data sits behind contracts.</p>
      <div className="relative mt-auto ml-auto w-[78%] rotate-2 rounded-[0.6cqw] bg-white p-[4cqw] text-neutral-900 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-[1cqw] text-[2.8cqw] font-bold">
            <FileText className="size-[3.2cqw] text-neutral-400" /> Data licence agreement
          </span>
          <Lock className="size-[3.2cqw] text-neutral-400" />
        </div>
        <div className="mt-[2.4cqw] divide-y divide-neutral-100 font-mono text-[2.4cqw]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between py-[1.2cqw]">
              <span className="text-neutral-500">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <Next className="text-neutral-50">so what happens?</Next>
    </Slide>
  )
}

function D3() {
  return (
    <Slide n={3} className="bg-brand-950 text-neutral-50" accent="bg-brand-400">
      <Eyebrow className="mt-[6cqw] text-brand-300">So</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[11cqw] leading-[0.95]")}>Agents guess.</p>
      <div className="mt-auto space-y-[2.4cqw]">
        <div className="ml-auto w-fit max-w-[80%] rounded-[2.4cqw] rounded-br-[0.4cqw] bg-brand-600 px-[3.6cqw] py-[2.4cqw] text-[3cqw]">
          How do UK parents feel about screen time this year?
        </div>
        <div className="flex items-end gap-[2cqw]">
          <span className="grid size-[7cqw] shrink-0 place-items-center rounded-full bg-neutral-50 text-neutral-900">
            <Bot className="size-[3.8cqw]" />
          </span>
          <div className="max-w-[82%] rounded-[2.4cqw] rounded-bl-[0.4cqw] bg-neutral-50/10 px-[3.6cqw] py-[2.8cqw] text-[3cqw] leading-[1.4] ring-1 ring-neutral-50/15">
            I couldn&apos;t find recent data, but based on general trends…
            <span className="mt-[2cqw] flex items-center gap-[1cqw] text-[2.4cqw] font-semibold text-orange-300">
              <TriangleAlert className="size-[2.8cqw]" /> No source · No date
            </span>
          </div>
        </div>
      </div>
      <Next className="text-neutral-50">our bet</Next>
    </Slide>
  )
}

function D4() {
  return (
    <Slide n={4} className="bg-brand-950 text-neutral-50" accent="bg-brand-400">
      <Eyebrow className="mt-[6cqw] text-brand-300">Our bet</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[9cqw] leading-[0.98]")}>
        Pay for the answer, <span className="text-brand-300">not the licence.</span>
      </p>
      <div className="mt-auto grid grid-cols-2 gap-[3cqw]">
        <div className="rounded-[0.8cqw] bg-neutral-50/5 p-[4cqw] ring-1 ring-neutral-50/10">
          <p className="text-[2.4cqw] font-semibold uppercase tracking-[0.1em] text-neutral-400">Before</p>
          <p className="mt-[2cqw] text-[5cqw] font-semibold leading-tight text-neutral-400 line-through decoration-[0.4cqw]">
            Annual licence
          </p>
          <p className="mt-[1.4cqw] text-[2.6cqw] text-neutral-500">Months to sign, before one answer</p>
        </div>
        <div className="rounded-[0.8cqw] bg-neutral-50 p-[4cqw] text-neutral-900">
          <p className="text-[2.4cqw] font-semibold uppercase tracking-[0.1em] text-brand-600">With ADXC</p>
          <p className="mt-[2cqw] text-[5cqw] font-semibold leading-tight">One answer</p>
          <p className="mt-[1.4cqw] text-[2.6cqw] text-neutral-500">Priced up front · paid on approval</p>
        </div>
      </div>
    </Slide>
  )
}

const roadmap = [
  { when: "Now", what: "Premium consumer data for AI agents", on: true },
  { when: "Next", what: "[More providers and categories]", on: false },
  { when: "Later", what: "[Where we're heading]", on: false },
]

function D5() {
  return (
    <Slide n={5} className="bg-brand-950 text-neutral-50" accent="bg-brand-400">
      <Eyebrow className="mt-[6cqw] text-brand-300">Where we&apos;re going</Eyebrow>
      <p className={cn(H, "mt-[2.4cqw] text-[9cqw] leading-[0.98]")}>We&apos;re just getting started.</p>
      <ol className="mt-auto space-y-[2cqw]">
        {roadmap.map((r) => (
          <li
            key={r.when}
            className={cn(
              "flex items-center gap-[3cqw] rounded-[0.6cqw] p-[3cqw]",
              r.on ? "bg-brand-600" : "bg-neutral-50/5 ring-1 ring-neutral-50/10",
            )}
          >
            <span className="w-[12cqw] text-[2.6cqw] font-semibold uppercase tracking-[0.1em] opacity-70">{r.when}</span>
            <span className="text-[3.2cqw] font-semibold">{r.what}</span>
          </li>
        ))}
      </ol>
      <p className="mt-[4cqw] text-[3cqw] font-semibold text-brand-300">Follow ADXC to build it with us · adxc.ai</p>
    </Slide>
  )
}

/* ============================================================
   CAROUSEL E — 4 myths about premium data and AI
   ============================================================ */

function E1() {
  return (
    <Slide n={1} className="bg-brand-600 text-neutral-50" accent="bg-neutral-50">
      <OutlineQ className="text-brand-400" />
      <Eyebrow className="relative mt-auto text-brand-200">Myth-busting</Eyebrow>
      <p className={cn(H, "relative mt-[2.4cqw] max-w-[85%] text-[11cqw] leading-[0.94]")}>
        4 myths about premium data and AI.
      </p>
      <p className="relative mt-[6cqw] inline-flex items-center gap-[1.5cqw] text-[3cqw] font-semibold">
        Swipe <ArrowRight className="size-[3.4cqw]" />
      </p>
    </Slide>
  )
}

function OutlineQ({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "pointer-events-none absolute -right-[6cqw] top-[6cqw] text-[80cqw] font-bold leading-none text-transparent [-webkit-text-stroke:0.4cqw_currentColor]",
        className,
      )}
      aria-hidden
    >
      ?
    </p>
  )
}

function MythSlide({ n, num, myth, fact, last }: { n: number; num: number; myth: string; fact: ReactNode; last?: boolean }) {
  return (
    <Slide n={n} className="bg-white text-neutral-900" accent="bg-brand-600">
      <p className="mt-[5cqw] font-mono text-[2.8cqw] font-semibold text-brand-600">Myth {num} of 4</p>
      <div className="mt-[3cqw] rounded-[0.8cqw] bg-neutral-100 p-[4.4cqw]">
        <Chip className="bg-neutral-200 text-neutral-600">
          <X className="size-[2.4cqw]" /> Myth
        </Chip>
        <p className="mt-[2.4cqw] text-[5.6cqw] font-semibold leading-[1.1] tracking-[-0.025em] text-neutral-500 line-through decoration-red-500 decoration-[0.45cqw]">
          {myth}
        </p>
      </div>
      <div className="mt-[2.4cqw] flex-1 rounded-[0.8cqw] bg-brand-600 p-[4.4cqw] text-neutral-50">
        <Chip className="bg-neutral-50/15 text-neutral-50">
          <Check className="size-[2.4cqw]" /> Fact
        </Chip>
        <p className="mt-[2.4cqw] text-[5.6cqw] font-semibold leading-[1.12] tracking-[-0.025em]">{fact}</p>
      </div>
      {last && <p className="mt-[3cqw] text-[2.8cqw] font-semibold text-brand-600">See how it works · adxc.ai</p>}
    </Slide>
  )
}

const E2 = () => (
  <MythSlide n={2} num={1} myth="Premium data needs a 12-month contract." fact="On ADXC you load credit and pay per question." />
)
const E3 = () => (
  <MythSlide
    n={3}
    num={2}
    myth="AI can just use what's on the open web."
    fact="The open web isn't a representative sample. Premium sources answer what scraping can't."
  />
)
const E4 = () => (
  <MythSlide
    n={4}
    num={3}
    myth="Selling data to AI means giving it away."
    fact="Raw data never leaves ADXC. Only synthesised answers do."
  />
)
const E5 = () => (
  <MythSlide
    n={5}
    num={4}
    myth="You only find out the cost afterwards."
    fact="Every question is hard-quoted before anything is charged."
    last
  />
)

/* ============================================================
   CAROUSEL F — ADXC by the numbers (product facts)
   ============================================================ */

function F1() {
  return (
    <Slide
      n={1}
      className="bg-neutral-950 text-neutral-50"
      accent="bg-brand-400"
      bg={<div className="bg-grid bg-grid-sm absolute inset-0 opacity-15" aria-hidden />}
    >
      <Eyebrow className="relative mt-auto text-brand-300">By the numbers</Eyebrow>
      <p className={cn(H, "relative mt-[2.4cqw] text-[13cqw] leading-[0.92]")}>
        ADXC in
        <br />4 numbers.
      </p>
      <p className="relative mt-[6cqw] inline-flex items-center gap-[1.5cqw] text-[3cqw] font-semibold">
        Swipe <ArrowRight className="size-[3.4cqw]" />
      </p>
    </Slide>
  )
}

function NumberSlide({
  n,
  value,
  label,
  note,
  className,
  accent,
  valueClass,
  extra,
}: {
  n: number
  value: string
  label: string
  note: string
  className: string
  accent: string
  valueClass: string
  extra?: ReactNode
}) {
  return (
    <Slide n={n} className={className} accent={accent}>
      <p className={cn("mt-auto text-[40cqw] font-semibold leading-[0.8] tracking-[-0.07em]", valueClass)}>{value}</p>
      <p className={cn(H, "mt-[4cqw] max-w-[85%] text-[7cqw] leading-[1.02]")}>{label}</p>
      <p className="mt-[2.4cqw] max-w-[85%] text-[3.2cqw] leading-[1.4] opacity-70">{note}</p>
      {extra}
    </Slide>
  )
}

const F2 = () => (
  <NumberSlide
    n={2}
    value="$0"
    label="charged before you approve."
    note="You see a hard quote and an abstract first. Don't like it? Don't pay."
    className="bg-white text-neutral-900"
    accent="bg-brand-600"
    valueClass="text-brand-600"
  />
)
const F3 = () => (
  <NumberSlide
    n={3}
    value="0"
    label="rows of raw data exposed."
    note="Every result is a synthesised answer. Providers keep their data."
    className="bg-neutral-100 text-neutral-900"
    accent="bg-brand-600"
    valueClass="text-neutral-900"
  />
)
const F4 = () => (
  <NumberSlide
    n={4}
    value="1"
    label="API for every premium source."
    note="Connect once. ADXC routes each question to the right providers."
    className="bg-brand-600 text-neutral-50"
    accent="bg-neutral-50"
    valueClass="text-neutral-50"
  />
)
const F5 = () => (
  <NumberSlide
    n={5}
    value="5+"
    label="premium sources, and counting."
    note="Check this figure before posting."
    className="bg-brand-950 text-neutral-50"
    accent="bg-brand-400"
    valueClass="text-brand-300"
    extra={
      <div className="mt-[3cqw] flex flex-wrap gap-[1.2cqw]">
        {["YouGov", "Reddit", "X", "Quid", "US Census"].map((p) => (
          <span key={p} className="rounded-full bg-neutral-50/10 px-[2cqw] py-[0.8cqw] text-[2.4cqw] font-semibold ring-1 ring-neutral-50/15">
            {p}
          </span>
        ))}
      </div>
    }
  />
)

/* ============================================================
   CAROUSEL G — What would you ask? (one question per role)
   ============================================================ */

function G1() {
  return (
    <Slide n={1} className="bg-neutral-950 text-neutral-50" accent="bg-neutral-50">
      <OutlineQ className="text-neutral-800" />
      <Eyebrow className="relative mt-auto text-neutral-400">By role</Eyebrow>
      <p className={cn(H, "relative mt-[2.4cqw] text-[13cqw] leading-[0.92]")}>What would you ask?</p>
      <p className="relative mt-[4cqw] max-w-[80%] text-[3.6cqw] leading-[1.4] text-neutral-400">
        The kinds of questions ADXC is built to answer.
      </p>
      <p className="relative mt-[5cqw] inline-flex items-center gap-[1.5cqw] text-[3cqw] font-semibold">
        Swipe <ArrowRight className="size-[3.4cqw]" />
      </p>
    </Slide>
  )
}

function RoleSlide({
  n,
  icon: Icon,
  role,
  question,
  footer,
  className,
  accent,
  tint,
}: {
  n: number
  icon: typeof Bot
  role: string
  question: string
  footer: ReactNode
  className: string
  accent: string
  tint: string
}) {
  return (
    <Slide n={n} className={className} accent={accent}>
      <div className="mt-[6cqw] flex items-center gap-[2cqw]">
        <span className={cn("grid size-[8cqw] place-items-center rounded-full", tint)}>
          <Icon className="size-[4cqw]" />
        </span>
        <Eyebrow>{role}</Eyebrow>
      </div>
      <p className={cn(H, "mt-[5cqw] text-[8cqw] leading-[1.02]")}>“{question}”</p>
      <div className="mt-auto">{footer}</div>
    </Slide>
  )
}

const G2 = () => (
  <RoleSlide
    n={2}
    icon={ShoppingBag}
    role="Brand marketer"
    question="Why are Gen Z leaving our category?"
    className="bg-brand-50 text-brand-950"
    accent="bg-brand-600"
    tint="bg-brand-600 text-neutral-50"
    footer={
      <div className="flex flex-wrap gap-[1.4cqw]">
        <Chip className="bg-white text-brand-700 ring-1 ring-brand-200">
          <Tag className="size-[2.4cqw]" /> Quoted $[x]
        </Chip>
        <Chip className="bg-white text-brand-700 ring-1 ring-brand-200">Answer in minutes</Chip>
      </div>
    }
  />
)
const G3 = () => (
  <RoleSlide
    n={3}
    icon={Briefcase}
    role="Agency strategist"
    question="How will [client]'s audience react to a price rise?"
    className="bg-white text-neutral-900"
    accent="bg-chart-2"
    tint="bg-chart-2 text-neutral-50"
    footer={
      <div className="flex items-center justify-between rounded-[0.6cqw] bg-neutral-100 px-[3cqw] py-[2.4cqw] font-mono text-[2.6cqw]">
        <span className="text-neutral-500">Billed to</span>
        <span className="font-semibold">[Client] · Brief 04</span>
      </div>
    }
  />
)
const G4 = () => (
  <RoleSlide
    n={4}
    icon={Bot}
    role="AI platform"
    question="Can my agent answer consumer questions with real sources?"
    className="bg-neutral-950 text-neutral-50"
    accent="bg-chart-5"
    tint="bg-neutral-50 text-neutral-950"
    footer={
      <pre className="overflow-hidden rounded-[0.6cqw] bg-neutral-900 p-[3cqw] font-mono text-[2.5cqw] leading-[1.6] ring-1 ring-neutral-800">
        <code>
          <span className="text-emerald-400">POST</span> /v2/orgs/<span className="text-neutral-500">{"{org_id}"}</span>/query
        </code>
      </pre>
    }
  />
)
const G5 = () => (
  <RoleSlide
    n={5}
    icon={Database}
    role="Data provider"
    question="Which questions is my data answering?"
    className="bg-cyan-950 text-neutral-50"
    accent="bg-cyan-300"
    tint="bg-cyan-300 text-cyan-950"
    footer={
      <>
        <div className="space-y-[1.4cqw]">
          {[
            ["Grocery switching", 42],
            ["Gen Z beauty", 31],
            ["EV intent", 18],
          ].map(([t, v]) => (
            <div key={t} className="flex items-center gap-[2cqw] text-[2.6cqw]">
              <span className="w-[28cqw] shrink-0">{t}</span>
              <span className="h-[2cqw] rounded-full bg-cyan-300" style={{ width: `${Number(v)}%` }} />
            </div>
          ))}
        </div>
        <p className="mt-[3cqw] text-[2.6cqw] font-semibold text-cyan-300">What would you ask? · adxc.ai</p>
      </>
    }
  />
)

/* ---------- page ---------- */

const CAROUSELS = [
  {
    id: "how-it-works",
    title: "How ADXC works",
    blurb: "For brands, agencies and AI teams · cover + 4 steps",
    slides: [A1, A2, A3, A4, A5],
  },
  {
    id: "data-providers",
    title: "How ADXC works for data providers",
    blurb: "Supply side · cover + 4 steps",
    slides: [B1, B2, B3, B4, B5],
  },
  {
    id: "hello",
    title: "Hello, LinkedIn",
    blurb: "Company intro · first post",
    slides: [C1, C2, C3, C4, C5],
  },
  {
    id: "why",
    title: "Why we built ADXC",
    blurb: "Founding story · problem → bet → roadmap",
    slides: [D1, D2, D3, D4, D5],
  },
  {
    id: "myths",
    title: "4 myths about premium data and AI",
    blurb: "Myth vs fact",
    slides: [E1, E2, E3, E4, E5],
  },
  {
    id: "numbers",
    title: "ADXC in 4 numbers",
    blurb: "Product facts",
    slides: [F1, F2, F3, F4, F5],
  },
  {
    id: "by-role",
    title: "What would you ask?",
    blurb: "One question per audience",
    slides: [G1, G2, G3, G4, G5],
  },
]

async function CarouselsPageContent({ searchParams }: { searchParams: Promise<{ export?: string }> }) {
  const { export: exp } = await searchParams
  const exportMode = exp === "1"

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-10">
      <header className="mx-auto mb-10 max-w-7xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← All content
        </Link>
        <p className="text-caption mt-6 text-muted-foreground">LinkedIn · Carousels · 1080 × 1080 · 5 slides</p>
        <h1 className="mt-3">Carousels</h1>
        {!exportMode && (
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Jump to carousel">
            {CAROUSELS.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                {c.title}
              </a>
            ))}
          </nav>
        )}
      </header>

      <div className="mx-auto max-w-7xl space-y-16" style={exportMode ? { maxWidth: 1080 } : undefined}>
        {CAROUSELS.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-8">
            <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3>{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.blurb}</p>
            </div>
            <div
              className={cn(
                "grid gap-3",
                exportMode
                  ? "grid-cols-1 gap-10"
                  : "snap-x snap-mandatory auto-cols-[80%] grid-flow-col overflow-x-auto pb-4 sm:auto-cols-[42%] lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-5 lg:overflow-visible",
              )}
            >
              {c.slides.map((S, i) => (
                <S key={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

/* Cache Components: searchParams is request-time data, so it renders inside <Suspense>. */
export default function CarouselsPage({ searchParams }: { searchParams: Promise<{ export?: string }> }) {
  return (
    <Suspense fallback={null}>
      <CarouselsPageContent searchParams={searchParams} />
    </Suspense>
  )
}
