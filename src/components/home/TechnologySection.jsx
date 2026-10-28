"use client"
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Printer,
  Zap,
  Clock,
  Cpu,
  ArrowRight,
  Sparkles,
  Send,
  Layers,
  Scissors,
  Truck,
} from "lucide-react"

/* ---------- animation helpers (no extra libraries needed) ---------- */

// Fires once when the element scrolls into view
function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, inView]
}

// Wraps anything and makes it burst in when scrolled to
// variants: up | left | right | zoom | flip
function Reveal({ children, variant = "up", delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.15)
  return (
    <div
      ref={ref}
      className={`tech-reveal tech-${variant} ${inView ? "tech-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Headline where each word slides up from behind a mask
function SplitWords({ text, highlightFrom = 999 }) {
  const [ref, inView] = useInView(0.3)
  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] pr-[0.25em] align-bottom"
        >
          <span
            className={`tech-word inline-block ${inView ? "tech-word-in" : ""} ${
              i >= highlightFrom ? "text-[#B92220]" : "text-slate-900"
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

// Number that counts up when visible
function CountUp({ to }) {
  const [ref, inView] = useInView(0.4)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    let start
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / 1600, 1)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{val}</span>
}

// Card that tilts in 3D and shows a red spotlight following the cursor
function TiltCard({ children, className = "" }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || e.pointerType === "touch") return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty("--mx", `${x}px`)
    el.style.setProperty("--my", `${y}px`)
    const rx = (y / r.height - 0.5) * -10
    const ry = (x / r.width - 0.5) * 10
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tech-tilt ${className}`}
    >
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  )
}

/* ---------- data ---------- */

const techFeatures = [
  {
    icon: Printer,
    title: "5-Color High-Speed Offset",
    desc: "Equipped with automated prepress color separation and electronic inking for consistent, vibrant print runs.",
    tag: "Prepress Automation",
    variant: "left",
  },
  {
    icon: Zap,
    title: "Variable Laser Encoding",
    desc: "Zero minimum run requirements per SKU with rapid offset-quality barcode and hangtag encoding.",
    tag: "Zero Minimums",
    variant: "right",
  },
  {
    icon: Clock,
    title: "72-Hour Rapid Turnaround",
    desc: "EDI-integrated workflow enabling same-day production on urgent orders and rapid global shipping.",
    tag: "Rapid Dispatch",
    variant: "left",
  },
  {
    icon: Cpu,
    title: "Computerized Precision Cutting",
    desc: "Automated trimming and sorting systems guaranteeing pinpoint accuracy and uniform product dimensions.",
    tag: "Pinpoint Accuracy",
    variant: "right",
  },
]

const ticker = [
  "5-Color Offset",
  "Variable Laser Encoding",
  "EDI Integrated",
  "Precision Cutting",
  "72-Hour Turnaround",
  "Zero Minimums",
]

const steps = [
  { icon: Send, title: "EDI Order", desc: "Electronic order entry and confirmation" },
  { icon: Layers, title: "Prepress", desc: "Automated color separation" },
  { icon: Printer, title: "Print & Encode", desc: "Offset and variable laser" },
  { icon: Scissors, title: "Cut & Sort", desc: "Computerized trimming" },
  { icon: Truck, title: "Dispatch", desc: "Same-day on rush orders" },
]

/* ---------- pipeline (order -> dispatch) ---------- */

function Pipeline() {
  const [ref, inView] = useInView(0.25)

  return (
    <div ref={ref} className="relative mt-20 sm:mt-24">
      <Reveal variant="up" className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B92220]">
          How it flows
        </p>
        <h3 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
          From order to dispatch
        </h3>
      </Reveal>

      <div className="relative">
        {/* connecting line - desktop (horizontal) */}
        <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-slate-200 md:block">
          <div
            className={`h-full origin-left bg-gradient-to-r from-[#B92220] to-[#ff6b66] transition-transform duration-[2200ms] ease-out ${
              inView ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* connecting line - mobile (vertical) */}
        <div className="absolute bottom-7 left-7 top-7 w-px bg-slate-200 md:hidden">
          <div
            className={`h-full origin-top bg-gradient-to-b from-[#B92220] to-[#ff6b66] transition-transform duration-[2200ms] ease-out ${
              inView ? "scale-y-100" : "scale-y-0"
            }`}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} variant="zoom" delay={i * 150}>
                <div className="flex items-start gap-4 md:flex-col md:items-center md:px-2 md:text-center">
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-white text-[#B92220] transition-all duration-500 ${
                      inView
                        ? "border-[#B92220] shadow-[0_0_24px_rgba(185,34,32,0.35)]"
                        : "border-slate-300"
                    }`}
                    style={{ transitionDelay: `${500 + i * 380}ms` }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="pt-1 md:pt-3">
                    <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                    <p className="mt-1 text-sm leading-snug text-slate-600">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ---------- main section ---------- */

export default function TechnologySection() {
  return (
    <section
      id="technology"
      className="relative w-full overflow-hidden bg-white py-16 text-slate-900 sm:py-24 lg:py-32"
    >
      {/* ===== animated background ===== */}
      <div className="tech-grid pointer-events-none absolute inset-0" />
      <div className="tech-float pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#B92220]/15 blur-3xl sm:h-96 sm:w-96" />
      <div
        className="tech-float pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl sm:h-96 sm:w-96"
        style={{ animationDelay: "-4s" }}
      />
      <div className="tech-scan pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6b66] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== heading ===== */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal variant="zoom">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B92220]/40 bg-[#B92220]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#B92220]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B92220] opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B92220]" />
              </span>
              Advanced Technology
            </div>
          </Reveal>

          <h2 className="mt-6 text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <SplitWords
              text="State-of-the-Art Manufacturing & EDI Systems"
              highlightFrom={1}
            />
          </h2>

          <Reveal variant="up" delay={500}>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Our integrated prepress, digital laser, and electronic data interchange (EDI)
              systems streamline complex ticketing orders with maximum accuracy and speed.
            </p>
          </Reveal>
        </div>

        {/* ===== scrolling ticker ===== */}
        <Reveal variant="up" delay={200} className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden border-y border-slate-200 bg-white/70 py-4">
            <div className="tech-marquee flex w-max whitespace-nowrap">
              {[...ticker, ...ticker].map((t, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 pr-8 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 sm:gap-10 sm:pr-10 sm:text-sm"
                >
                  {t}
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B92220]" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ===== main grid ===== */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* 72h card with rotating border */}
          <Reveal variant="left" className="h-full lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-3xl p-[2px] shadow-xl shadow-[#B92220]/10">
              <div
                className="tech-spin pointer-events-none absolute"
                style={{
                  inset: "-100%",
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, transparent 220deg, #B92220 300deg, #ff6b66 340deg, transparent 360deg)",
                }}
              />
              <div className="relative flex h-full flex-col justify-between gap-8 rounded-[22px] bg-white p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B92220]">
                    <Sparkles className="h-4 w-4" />
                    <span>Fast Delivery Commitment</span>
                  </div>

                  <div className="mt-6 flex items-end leading-none">
                    <span className="text-7xl font-black text-slate-900 sm:text-8xl">
                      <CountUp to={72} />
                    </span>
                    <span className="pb-2 text-3xl font-black text-[#B92220] sm:pb-3 sm:text-4xl">
                      h
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
                    Standard Turnaround Time
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    EDI electronic order processing enables same-day dispatch for urgent
                    production runs.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#B92220] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#B92220]/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#d02a27] hover:shadow-xl hover:shadow-[#B92220]/40 active:translate-y-0 sm:w-auto sm:self-start"
                >
                  <span>Consult Engineering Team</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* 2x2 feature cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {techFeatures.map((feat, idx) => {
              const Icon = feat.icon
              return (
                <Reveal
                  key={feat.title}
                  variant={feat.variant}
                  delay={idx * 140}
                  className="h-full"
                >
                  <TiltCard className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <span className="absolute -top-1 right-4 select-none text-6xl font-black text-slate-900/[0.06] transition-colors duration-500 group-hover:text-[#B92220]/20">
                      0{idx + 1}
                    </span>

                    <div className="flex items-center justify-between gap-3">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#B92220]/15 text-[#B92220] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#B92220] group-hover:text-white">
                        <span className="absolute inset-0 animate-ping rounded-2xl bg-[#B92220]/30 [animation-duration:2.5s] motion-reduce:animate-none" />
                        <Icon className="relative h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700 transition-colors group-hover:border-[#B92220]/50 group-hover:text-[#B92220]">
                        {feat.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#B92220]">
                      {feat.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                      {feat.desc}
                    </p>

                    {/* line that draws across on hover */}
                    <span className="mt-6 block h-px w-full bg-slate-200">
                      <span className="block h-px w-0 bg-gradient-to-r from-[#B92220] to-[#ff6b66] transition-all duration-700 group-hover:w-full" />
                    </span>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* ===== order -> dispatch pipeline ===== */}
        <Pipeline />
      </div>

      {/* ===== keyframes + reveal styles ===== */}
      <style>{`
        .tech-reveal {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22,1,.36,1),
                      transform .9s cubic-bezier(.22,1,.36,1),
                      filter .9s ease;
        }
        .tech-up    { transform: translateY(60px) scale(.96); filter: blur(10px); }
        .tech-left  { transform: translateX(-80px) rotate(-3deg); filter: blur(8px); }
        .tech-right { transform: translateX(80px) rotate(3deg); filter: blur(8px); }
        .tech-zoom  { transform: scale(.5); filter: blur(12px); }
        .tech-flip  { transform: perspective(900px) rotateX(-70deg) translateY(40px); transform-origin: top; }
        .tech-in    { opacity: 1; transform: none; filter: blur(0); }

        .tech-word {
          transform: translateY(110%) rotate(6deg);
          transition: transform .8s cubic-bezier(.22,1,.36,1);
        }
        .tech-word-in { transform: none; }

        .tech-tilt {
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform .2s ease-out, border-color .4s ease;
        }
        .tech-tilt::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(185,34,32,.3), transparent 60%);
          opacity: 0;
          transition: opacity .4s ease;
          pointer-events: none;
        }
        .tech-tilt:hover { border-color: rgba(185,34,32,.6); box-shadow: 0 20px 40px -12px rgba(185,34,32,.25); }
        .tech-tilt:hover::before { opacity: 1; }

        .tech-grid {
          background-image:
            linear-gradient(rgba(15,23,42,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,.06) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
          animation: techGrid 6s linear infinite;
        }
        .tech-float   { animation: techFloat 10s ease-in-out infinite; }
        .tech-scan    { animation: techScan 8s linear infinite; }
        .tech-spin    { animation: techSpin 5s linear infinite; }
        .tech-marquee { animation: techMarquee 28s linear infinite; }
        .tech-marquee:hover { animation-play-state: paused; }

        @keyframes techGrid    { to { background-position: 48px 48px; } }
        @keyframes techFloat   { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-50px) scale(1.15); } }
        @keyframes techScan    { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes techSpin    { to { transform: rotate(360deg); } }
        @keyframes techMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        @media (prefers-reduced-motion: reduce) {
          .tech-reveal, .tech-word { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .tech-grid, .tech-float, .tech-scan, .tech-spin, .tech-marquee { animation: none !important; }
        }
      `}</style>
    </section>
  )
}