"use client"
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Printer, Zap, Clock, Cpu, ArrowRight, Sparkles, Send, Layers, Scissors, Truck } from "lucide-react"

/* ---------- animation helpers (no extra libraries needed) ---------- */

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

// variants: up | left | right | zoom
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
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] pr-[0.25em] align-bottom">
          <span
            className={`tech-word inline-block ${inView ? "tech-word-in" : ""} ${i >= highlightFrom ? "text-[#ff4d47]" : "text-white"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

function CountUp({ to, active }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf
    let start
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / 2200, 1)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to])

  return <span>{val}</span>
}

/* ---------- data ---------- */

const techFeatures = [
  { icon: Printer, title: "5-Color High-Speed Offset", desc: "Equipped with automated prepress color separation and electronic inking for consistent, vibrant print runs.", tag: "Prepress Automation", variant: "left" },
  { icon: Zap, title: "Variable Laser Encoding", desc: "Zero minimum run requirements per SKU with rapid offset-quality barcode and hangtag encoding.", tag: "Zero Minimums", variant: "right" },
  { icon: Clock, title: "72-Hour Rapid Turnaround", desc: "EDI-integrated workflow enabling same-day production on urgent orders and rapid global shipping.", tag: "Rapid Dispatch", variant: "left" },
  { icon: Cpu, title: "Computerized Precision Cutting", desc: "Automated trimming and sorting systems guaranteeing pinpoint accuracy and uniform product dimensions.", tag: "Pinpoint Accuracy", variant: "right" },
]

const ticker = ["5-Color Offset", "Variable Laser Encoding", "EDI Integrated", "Precision Cutting", "72-Hour Turnaround", "Zero Minimums"]

const steps = [
  { icon: Send, title: "EDI Order", desc: "Electronic order entry and confirmation" },
  { icon: Layers, title: "Prepress", desc: "Automated color separation" },
  { icon: Printer, title: "Print & Encode", desc: "Offset and variable laser" },
  { icon: Scissors, title: "Cut & Sort", desc: "Computerized trimming" },
  { icon: Truck, title: "Dispatch", desc: "Same-day on rush orders" },
]

/* ---------- radar-style gauge: ring fills to 72h ---------- */

const R = 88
const CIRC = 2 * Math.PI * R

function Gauge() {
  const [ref, inView] = useInView(0.3)
  return (
    <div ref={ref} className="relative mx-auto aspect-square w-[min(78vw,20rem)]">
      <div className="tech-radar absolute inset-[11%] rounded-full" />
      <svg viewBox="0 0 220 220" className="relative h-full w-full" aria-hidden="true">
        <g className="origin-center -rotate-90">
          <circle cx="110" cy="110" r={R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="10" />
          <circle
            cx="110"
            cy="110"
            r={R}
            fill="none"
            stroke="#B92220"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={inView ? 0 : CIRC}
            style={{ transition: "stroke-dashoffset 2.4s cubic-bezier(.22,1,.36,1) .3s", filter: "drop-shadow(0 0 8px rgba(185,34,32,.8))" }}
          />
        </g>
        {Array.from({ length: 60 }).map((_, i) => (
          <line
            key={i}
            x1="110" y1="2" x2="110" y2={i % 5 === 0 ? 11 : 7}
            stroke={i % 5 === 0 ? "#ff6b66" : "rgba(255,255,255,.35)"}
            strokeWidth={i % 5 === 0 ? 2 : 1}
            transform={`rotate(${i * 6} 110 110)`}
          />
        ))}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="flex items-end justify-center leading-none">
            <span className="text-6xl font-black tabular-nums sm:text-7xl"><CountUp to={72} active={inView} /></span>
            <span className="pb-1.5 text-2xl font-black text-[#ff4d47] sm:text-3xl">h</span>
          </div>
          <p className="mt-2 text-xs font-semibold text-white/70 sm:text-sm">Standard turnaround</p>
        </div>
      </div>
    </div>
  )
}

/* ---------- pipeline (order -> dispatch) with hexagon nodes ---------- */

function Pipeline() {
  const [ref, inView] = useInView(0.25)

  return (
    <div ref={ref} className="relative mt-20 sm:mt-28">
      <Reveal variant="up" className="mb-12 text-center">
        <p className="text-sm font-bold text-[#ff4d47]">How it flows</p>
        <h3 className="mt-2 text-2xl font-black text-white sm:text-4xl">From order to dispatch</h3>
      </Reveal>

      <div className="relative">
        {/* conveyor line: desktop */}
        <div className="absolute left-[10%] right-[10%] top-8 hidden h-[2px] bg-white/15 md:block">
          <div className={`h-full origin-left bg-gradient-to-r from-[#B92220] to-[#ff6b66] transition-transform duration-[2200ms] ease-out ${inView ? "scale-x-100" : "scale-x-0"}`} />
          <span className="tech-packet-x absolute -top-[3px] h-2 w-2 rotate-45 bg-white shadow-[0_0_12px_#fff]" />
          <span className="tech-packet-x absolute -top-[3px] h-2 w-2 rotate-45 bg-white shadow-[0_0_12px_#fff]" style={{ animationDelay: "-1.6s" }} />
        </div>
        {/* conveyor line: mobile */}
        <div className="absolute bottom-8 left-8 top-8 w-[2px] bg-white/15 md:hidden">
          <div className={`h-full origin-top bg-gradient-to-b from-[#B92220] to-[#ff6b66] transition-transform duration-[2200ms] ease-out ${inView ? "scale-y-100" : "scale-y-0"}`} />
          <span className="tech-packet-y absolute -left-[3px] h-2 w-2 rotate-45 bg-white shadow-[0_0_12px_#fff]" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} variant="zoom" delay={i * 150}>
                <div className="group flex items-start gap-5 md:flex-col md:items-center md:px-2 md:text-center">
                  <div className="tech-hex relative z-10 h-16 w-16 shrink-0 transition-all duration-500 group-hover:scale-110" style={{ background: inView ? "#B92220" : "rgba(255,255,255,.2)", transitionDelay: `${500 + i * 380}ms` }}>
                    <span className="tech-hex absolute inset-[2px] grid place-items-center bg-[#0a0a0a] text-[#ff6b66] transition-colors duration-500 group-hover:bg-[#B92220] group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="pt-1 md:pt-4">
                    <h4 className="text-base font-bold text-white">{step.title}</h4>
                    <p className="mt-1 text-sm leading-snug text-white/65">{step.desc}</p>
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
    <section id="technology" className="relative w-full overflow-hidden bg-[#0a0a0a] py-16 text-white sm:py-24 lg:py-32">
      {/* animated background */}
      <div className="tech-grid pointer-events-none absolute inset-0" />
      <div className="tech-float pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#B92220]/30 blur-3xl sm:h-96 sm:w-96" />
      <div className="tech-float pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-[#B92220]/20 blur-3xl sm:h-96 sm:w-96" style={{ animationDelay: "-4s" }} />
      <div className="tech-scan pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6b66] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading + gauge */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal variant="left">
              <span className="inline-flex -skew-x-12 items-center bg-[#B92220] px-5 py-2 text-xs font-bold text-white sm:text-sm">
                <span className="inline-flex skew-x-12 items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  Advanced Technology
                </span>
              </span>
            </Reveal>

            <h2 className="mt-6 text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <SplitWords text="State-of-the-Art Manufacturing & EDI Systems" highlightFrom={1} />
            </h2>

            <Reveal variant="up" delay={500}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Our integrated prepress, digital laser, and electronic data interchange (EDI) systems streamline complex ticketing orders with maximum accuracy and speed.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal variant="zoom" delay={200}>
              <Gauge />
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#ff6b66]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Fast Delivery Commitment
                </div>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/65">
                  EDI electronic order processing enables same-day dispatch for urgent production runs.
                </p>
                <Link
                  href="/contact"
                  className="group relative mt-5 inline-flex -skew-x-12 items-center bg-white px-8 py-4 text-sm font-black text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:bg-[#B92220] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="inline-flex skew-x-12 items-center gap-2">
                    Consult Engineering Team
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* tilted ticker band */}
        <Reveal variant="up" delay={200} className="mt-16 sm:mt-24">
          <div className="-mx-6 -rotate-1 overflow-hidden bg-[#B92220] py-3 shadow-[0_0_40px_rgba(185,34,32,.45)] sm:-mx-10">
            <div className="tech-marquee flex w-max whitespace-nowrap" aria-hidden="true">
              {[...ticker, ...ticker].map((t, i) => (
                <span key={i} className="flex items-center gap-6 pr-6 text-sm font-black text-white sm:gap-8 sm:pr-8 sm:text-lg">
                  {t}
                  <span className="h-2 w-2 rotate-45 bg-[#0a0a0a]" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* skewed spec rows */}
        <div className="mt-16 flex flex-col gap-4 sm:mt-20">
          {techFeatures.map((feat, idx) => {
            const Icon = feat.icon
            return (
              <Reveal key={feat.title} variant={feat.variant} delay={idx * 120}>
                <div className="group relative -skew-x-12 overflow-hidden border border-white/15 bg-white/[.04] transition-colors duration-500 hover:border-[#B92220]">
                  <span className="absolute inset-0 -translate-x-full bg-[#B92220] transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" />
                  <div className="relative grid skew-x-12 grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 px-7 py-6 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.3fr)_auto] md:gap-x-8 md:px-12">
                    <span className="tech-hex grid h-14 w-14 place-items-center bg-[#B92220] text-white transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-white group-hover:text-[#B92220]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <div>
                      <span className="text-xs font-bold text-[#ff6b66] transition-colors duration-500 group-hover:text-white/80">0{idx + 1} &nbsp;/&nbsp; {feat.tag}</span>
                      <h3 className="mt-1 text-lg font-black leading-tight sm:text-2xl">{feat.title}</h3>
                    </div>

                    <p className="col-span-2 text-sm leading-relaxed text-white/65 transition-colors duration-500 group-hover:text-white md:col-span-1">{feat.desc}</p>

                    <span className="hidden h-11 w-11 place-items-center rounded-full border border-white/30 transition-all duration-500 group-hover:translate-x-2 group-hover:border-white group-hover:bg-white group-hover:text-[#B92220] md:grid">
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Pipeline />
      </div>

      <style>{`
        .tech-reveal {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22,1,.36,1),
                      transform .9s cubic-bezier(.22,1,.36,1),
                      filter .9s ease;
        }
        .tech-up    { transform: translateY(60px) scale(.96); filter: blur(10px); }
        .tech-left  { transform: translateX(-80px); filter: blur(8px); }
        .tech-right { transform: translateX(80px); filter: blur(8px); }
        .tech-zoom  { transform: scale(.5); filter: blur(12px); }
        .tech-in    { opacity: 1; transform: none; filter: blur(0); }

        .tech-word { transform: translateY(110%) rotate(6deg); transition: transform .8s cubic-bezier(.22,1,.36,1); }
        .tech-word-in { transform: none; }

        .tech-hex { clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%); }

        .tech-radar {
          background: conic-gradient(from 0deg, transparent 0deg, transparent 290deg, rgba(185,34,32,.55) 360deg);
          -webkit-mask-image: radial-gradient(circle, #000 60%, transparent 100%);
          mask-image: radial-gradient(circle, #000 60%, transparent 100%);
          animation: techSpin 4s linear infinite;
        }

        .tech-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
          animation: techGrid 6s linear infinite;
        }
        .tech-float    { animation: techFloat 10s ease-in-out infinite; }
        .tech-scan     { animation: techScan 8s linear infinite; }
        .tech-marquee  { animation: techMarquee 28s linear infinite; }
        .tech-marquee:hover { animation-play-state: paused; }
        .tech-packet-x { animation: techPacketX 3.2s linear infinite; }
        .tech-packet-y { animation: techPacketY 3.2s linear infinite; }

        @keyframes techGrid    { to { background-position: 48px 48px; } }
        @keyframes techFloat   { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-50px) scale(1.15); } }
        @keyframes techScan    { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes techSpin    { to { transform: rotate(360deg); } }
        @keyframes techMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes techPacketX { from { left: 0; } to { left: 100%; } }
        @keyframes techPacketY { from { top: 0; } to { top: 100%; } }

        @media (prefers-reduced-motion: reduce) {
          .tech-reveal, .tech-word { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .tech-radar, .tech-grid, .tech-float, .tech-scan, .tech-marquee, .tech-packet-x, .tech-packet-y { animation: none !important; }
        }
      `}</style>
    </section>
  )
}