/* ============================================================
   ADXC Social — content hub
   Route: /
   One card per content type. Add a new set by adding an entry
   to SECTIONS and a matching preview below.
   ============================================================ */

import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo, LOGO_ON_LIGHT } from "@/components/brand/logo"

export const metadata: Metadata = {
  title: "Content",
}

/* ---------- mini-post previews (decorative) ---------- */

function Mini({ className, style, children }: { className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div
      style={style}
      className={cn("@container absolute aspect-square overflow-hidden rounded-md shadow-lg ring-1 ring-black/5", className)}
    >
      {children}
    </div>
  )
}

/** Placeholder text line */
function Line({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-[5cqw] rounded-full bg-current", className)} style={{ width: w }} />
}

function TemplatesPreview() {
  return (
    <>
      <Mini className="left-[8%] top-[18%] w-[42%] -rotate-6 bg-white text-neutral-900" style={LOGO_ON_LIGHT}>
        <div className="flex h-full flex-col p-[9cqw]">
          <Line w="70%" className="opacity-80" />
          <Line w="45%" className="mt-[3cqw] opacity-80" />
          <div className="mt-auto space-y-[4cqw]">
            {[78, 56, 34].map((v, i) => (
              <span key={v} className="block h-[5cqw] rounded-full bg-neutral-100">
                <span
                  className={cn("block h-full rounded-full", ["bg-chart-1", "bg-chart-2", "bg-chart-3"][i])}
                  style={{ width: `${v}%` }}
                />
              </span>
            ))}
          </div>
          <Logo className="mt-[7cqw] h-[8cqw]" />
        </div>
      </Mini>
      <Mini className="right-[8%] top-[18%] w-[42%] rotate-6 bg-neutral-950 text-neutral-50">
        <div className="flex h-full flex-col p-[9cqw]">
          <Logo className="h-[8cqw]" />
          <p className="mt-auto text-[30cqw] font-semibold leading-[0.85] tracking-[-0.06em] text-brand-300">71%</p>
          <Line w="80%" className="mt-[5cqw] opacity-50" />
        </div>
      </Mini>
      <Mini className="left-1/2 top-[10%] w-[46%] -translate-x-1/2 bg-brand-600 text-neutral-50">
        <div className="bg-grid bg-grid-sm absolute inset-0 opacity-30" aria-hidden />
        <div className="relative flex h-full flex-col p-[9cqw]">
          <span className="w-fit rounded-full px-[4cqw] py-[2cqw] text-[5cqw] font-semibold ring-1 ring-neutral-50/30">
            Agentic data exchange
          </span>
          <p className="mt-auto text-[11cqw] font-semibold leading-[1] tracking-[-0.035em]">
            Premium consumer data, one query at a time.
          </p>
          <Logo className="mt-[7cqw] h-[8cqw]" />
        </div>
      </Mini>
    </>
  )
}

const TILE: CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 50% 50%, transparent 30%, var(--color-brand-700) 31% 35%, transparent 36%)," +
    "conic-gradient(from 45deg, var(--color-brand-900) 25%, var(--color-brand-950) 0 50%, var(--color-brand-900) 0 75%, var(--color-brand-950) 0)",
  backgroundSize: "18cqw 18cqw",
}

function WebSummitPreview() {
  return (
    <>
      <Mini className="left-[6%] top-[22%] w-[38%] -rotate-3 bg-brand-950 text-neutral-50">
        <div className="absolute inset-0 opacity-70" style={TILE} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 from-35% to-transparent" aria-hidden />
        <div className="relative flex h-full flex-col p-[9cqw]">
          <Logo className="h-[8cqw]" />
          <p className="mt-auto text-[13cqw] font-semibold leading-[0.95] tracking-[-0.035em]">
            Heading to Web Summit.
          </p>
        </div>
      </Mini>
      <Mini className="right-[6%] top-[22%] w-[38%] rotate-3 bg-brand-600 text-neutral-50">
        <div className="flex h-full flex-col p-[9cqw]">
          <Logo className="h-[8cqw]" />
          <p className="mt-auto text-[16cqw] font-semibold leading-[0.9] tracking-[-0.04em]">
            Obrigado,
            <br />
            <span className="text-brand-200">Lisboa.</span>
          </p>
        </div>
      </Mini>
      <Mini className="left-1/2 top-[12%] w-[44%] -translate-x-1/2 bg-neutral-950 text-neutral-50">
        <div className="bg-grid bg-grid-sm absolute inset-0 opacity-15" aria-hidden />
        <div className="relative flex h-full flex-col p-[9cqw]">
          <div className="flex items-center justify-between">
            <Logo className="h-[8cqw]" />
            <span className="inline-flex items-center gap-[2cqw] rounded-full bg-red-500 px-[3.5cqw] py-[1.5cqw] text-[5cqw] font-semibold">
              <span className="size-[3cqw] rounded-full bg-white" /> Live
            </span>
          </div>
          <p className="mt-auto text-[52cqw] font-bold leading-[0.8] tracking-[-0.07em] text-transparent [-webkit-text-stroke:1cqw_var(--color-brand-400)]">
            07
          </p>
          <p className="mt-[4cqw] text-[9cqw] font-semibold leading-none">days to Lisbon.</p>
        </div>
      </Mini>
    </>
  )
}

function CarouselsPreview() {
  const slides = [
    "bg-brand-600 text-neutral-50",
    "bg-neutral-50 text-neutral-900",
    "bg-white text-neutral-900",
    "bg-neutral-100 text-neutral-900",
    "bg-brand-950 text-neutral-50",
  ]
  return (
    <div className="absolute inset-x-[7%] top-1/2 flex -translate-y-1/2">
      {slides.map((c, i) => (
        <div
          key={i}
          style={{ zIndex: slides.length - i, ...(c.includes("text-neutral-900") ? LOGO_ON_LIGHT : {}) }}
          className={cn(
            "@container relative aspect-square w-[34%] shrink-0 overflow-hidden rounded-md shadow-lg ring-1 ring-black/5",
            i > 0 && "-ml-[17.5%]",
            c,
          )}
        >
          <div className="flex h-full flex-col p-[9cqw]">
            <div className="flex items-center justify-between">
              <Logo className="h-[9cqw]" />
              <span className="font-mono text-[7cqw] opacity-60">0{i + 1}</span>
            </div>
            {i === 0 ? (
              <p className="mt-auto text-[16cqw] font-semibold leading-[0.92] tracking-[-0.04em]">How ADXC works.</p>
            ) : (
              <div className="mt-auto">
                <p className="font-mono text-[8cqw] font-semibold text-brand-500">Step 0{i}</p>
                <Line w="80%" className="mt-[4cqw] opacity-80" />
                <Line w="50%" className="mt-[4cqw] opacity-80" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------- sections ---------- */

const SECTIONS = [
  {
    href: "/templates",
    title: "Templates",
    meta: ["20 templates", "Square · Portrait · Landscape"],
    preview: <TemplatesPreview />,
    tint: "bg-brand-50",
  },
  {
    href: "/websummit",
    title: "Web Summit 2026",
    meta: ["30 posts", "Before · During · After"],
    preview: <WebSummitPreview />,
    tint: "bg-brand-100",
  },
  {
    href: "/carousels",
    title: "Carousels",
    meta: ["7 sets", "5 slides each"],
    preview: <CarouselsPreview />,
    tint: "bg-neutral-100",
  },
]

export default function ContentHubPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-10">
      <header className="mx-auto mb-10 flex max-w-6xl items-end justify-between gap-6">
        <div>
          <p className="text-caption text-muted-foreground">ADXC · Social</p>
          <h1 className="mt-3">Content</h1>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group overflow-hidden rounded-xl bg-card ring-1 ring-border transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <div className={cn("relative aspect-[4/3] overflow-hidden", s.tint)} aria-hidden>
              <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]">{s.preview}</div>
            </div>
            <div className="flex items-start justify-between gap-4 border-t border-border p-5">
              <div>
                <h4>{s.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{s.meta.join(" · ")}</p>
              </div>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
