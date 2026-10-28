"use client"
import React, { useEffect, useRef, useState } from "react"
import { DollarSign, Clock, Leaf, Cpu, CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react"

/* ---------- small animation helpers ---------- */

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
      className={`wcu-reveal wcu-${variant} ${inView ? "wcu-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function CountUp({ to }) {
  const [ref, inView] = useInView(0.4)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    let start
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / 1500, 1)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{val}</span>
}

/* heading words slide up from behind a mask */
function Words({ text, start = 0, red = false }) {
  const [ref, inView] = useInView(0.3)
  return (
    <span ref={ref} className="block">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i} className="mr-[.25em] inline-block overflow-hidden pb-[.12em] align-bottom">
            <span
              className={`wcu-word inline-block ${inView ? "wcu-word-in" : ""} ${red ? "bg-gradient-to-r from-[#B92220] to-[#ff6b66] bg-clip-text text-transparent" : ""}`}
              style={{ transitionDelay: `${(start + i) * 90}ms` }}
            >
              {w}
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}

/* ---------- data ---------- */

// each ticket gets its own white / red / black colourway (full class names so Tailwind keeps them)
const themes = [
  { body: "bg-white text-slate-900", desc: "text-slate-600", stub: "bg-[#0a0a0a] text-white", icon: "bg-[#B92220] text-white", tag: "bg-[#0a0a0a] text-white", arrow: "bg-[#0a0a0a] text-white", line: "text-[#B92220]", inset: "shadow-[inset_0_0_0_2px_#0a0a0a]" },
  { body: "bg-[#B92220] text-white", desc: "text-white/85", stub: "bg-[#8f1a18] text-white", icon: "bg-white text-[#B92220]", tag: "bg-white text-[#B92220]", arrow: "bg-white text-[#B92220]", line: "text-white", inset: "" },
  { body: "bg-[#0a0a0a] text-white", desc: "text-white/70", stub: "bg-[#B92220] text-white", icon: "bg-white text-[#0a0a0a]", tag: "bg-[#B92220] text-white", arrow: "bg-[#B92220] text-white", line: "text-[#ff6b66]", inset: "" },
  { body: "bg-white text-slate-900", desc: "text-slate-600", stub: "bg-[#B92220] text-white", icon: "bg-[#0a0a0a] text-white", tag: "bg-[#B92220] text-white", arrow: "bg-[#B92220] text-white", line: "text-[#B92220]", inset: "shadow-[inset_0_0_0_2px_#0a0a0a]" },
]

const advantages = [
  { icon: DollarSign, title: "Cost-Effective Pricing", description: "Delivering the most cost-effective private branding programs in the market without compromising on premium quality standards.", tag: "Best Value" },
  { icon: Clock, title: "72-Hour Turnaround", description: "Fast 72-hour standard production turnaround times with same-day dispatch capabilities available for urgent rush orders.", tag: "Rapid Delivery" },
  { icon: Cpu, title: "Advanced EDI Systems", description: "Seamless internet order entry, automated SKU tracking, live production reporting, and online courier delivery confirmations.", tag: "Digital Track" },
  { icon: Leaf, title: "Eco-Aware Manufacturing", description: "Environmentally conscious operations utilizing FSC-certified recycled paper stocks and OEKO-TEX compliant sustainable materials.", tag: "Sustainable" },
]

const statHighlights = [
  { label: "Established In", value: <CountUp to={1988} />, unit: "", icon: ShieldCheck },
  { label: "Standard Turnaround", value: <CountUp to={72} />, unit: "Hours", icon: Zap },
  { label: "Color Precision", value: "1 to 6", unit: "Colors", icon: CheckCircle2 },
  { label: "Global Reach", value: "Worldwide", unit: "", icon: Globe },
]

/* ---------- one perforated ticket; the stack sticks to the top while scrolling ---------- */

function Ticket({ item, index }) {
  const [ref, inView] = useInView(0.1)
  const t = themes[index % themes.length]
  const Icon = item.icon

  return (
    <div
      ref={ref}
      className={`wcu-reveal wcu-up ${inView ? "wcu-in" : ""} group sticky top-[calc(5rem_+_var(--i)_*_3.4rem)] sm:top-[calc(6rem_+_var(--i)_*_4rem)]`}
      style={{ "--i": index }}
    >
      <div className="drop-shadow-[0_20px_26px_rgba(10,10,10,.18)] transition-[filter,transform] duration-500 group-hover:-translate-y-1 group-hover:drop-shadow-[0_28px_34px_rgba(185,34,32,.35)]">
        <div className={`wcu-ticket relative grid min-h-[13.5rem] grid-cols-[var(--stub)_1fr] overflow-hidden ${t.body} ${t.inset}`}>
          {/* stub */}
          <div className={`relative flex flex-col items-center justify-between border-r-2 border-dashed border-white/50 py-5 ${t.stub}`}>
            <span className={`grid h-11 w-11 place-items-center rounded-full transition-transform duration-700 group-hover:rotate-[360deg] sm:h-14 sm:w-14 ${t.icon}`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </span>
            <span className="rotate-180 text-3xl font-black leading-none tracking-tighter opacity-40 [writing-mode:vertical-rl] sm:text-5xl">
              0{index + 1}
            </span>
          </div>

          {/* body */}
          <div className="relative flex flex-col p-5 sm:p-8">
            <span className="wcu-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-[20deg] bg-white/20 transition-[left] duration-[900ms] group-hover:left-[130%]" />
            <div className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h3 className="text-lg font-black leading-tight tracking-tight sm:text-2xl">{item.title}</h3>
              <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${t.tag}`}>{item.tag}</span>
            </div>
            <p className={`relative mt-3 max-w-xl text-sm leading-relaxed ${t.desc}`}>{item.description}</p>
            <div className={`relative mt-auto flex items-center gap-3 pt-5 text-sm font-bold ${t.line}`}>
              <span className="transition-transform duration-300 group-hover:translate-x-1">Discover Advantages</span>
              <span className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-2 ${t.arrow}`}>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="h-[2px] flex-1 origin-left scale-x-0 bg-current opacity-40 transition-transform duration-700 group-hover:scale-x-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- section ---------- */

export default function WhyChooseUs() {
  return (
    <section className="relative w-full bg-white py-16 text-slate-800 [overflow:clip] sm:py-24 lg:py-32">
      {/* dot texture + glows */}
      <div className="wcu-dots pointer-events-none absolute inset-0" />
      <div className="wcu-float pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-[#B92220]/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="wcu-float pointer-events-none absolute -left-24 bottom-1/4 h-72 w-72 rounded-full bg-rose-300/25 blur-3xl sm:h-96 sm:w-96" style={{ animationDelay: "-5s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* left: pinned heading */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Reveal variant="zoom">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[#0a0a0a] py-2 pl-2 pr-4 text-xs font-bold text-white sm:text-sm">
                <span className="relative grid h-6 w-6 place-items-center rounded-full bg-[#B92220]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#B92220]/60 [animation-duration:2.4s] motion-reduce:animate-none" />
                  <CheckCircle2 className="relative h-3.5 w-3.5" aria-hidden="true" />
                </span>
                Why Choose 3M Label Limited
              </span>
            </Reveal>

            <h2 className="mt-6 text-3xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl">
              <Words text="Engineered to Deliver the" />
              <Words text="Ultimate Branding Programs" start={5} red />
            </h2>

            <Reveal variant="left" delay={250}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600 sm:text-lg">
                &ldquo;Our mission is not to be the biggest in this business, simply the best!&rdquo; Experience precision, speed, and cost efficiency tailored for leading retailers.
              </p>
            </Reveal>

            <Reveal variant="left" delay={350}>
              <div className="mt-6 flex items-center gap-3 text-sm font-bold text-slate-500">
                <span className="h-[2px] w-12 bg-[#B92220]" />
                <span className="hidden lg:inline">Scroll to stack the tickets</span>
                <span className="lg:hidden">Scroll to see all four</span>
              </div>
            </Reveal>
          </div>

          {/* right: stacking tickets */}
          <div className="flex flex-col gap-8 pb-4 lg:col-span-7 lg:gap-12">
            {advantages.map((item, i) => (
              <Ticket key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* round stat dials */}
        <div className="mt-20 grid grid-cols-2 justify-items-center gap-5 sm:mt-28 sm:gap-8 lg:grid-cols-4">
          {statHighlights.map((s, i) => {
            const SIcon = s.icon
            return (
              <Reveal key={s.label} variant="zoom" delay={i * 130} className="w-full max-w-[14rem]">
                <div className="group relative">
                  <span className="wcu-spin absolute -inset-2 rounded-full border-2 border-dashed border-[#B92220]/70" />
                  <div className="relative grid aspect-square place-items-center rounded-full bg-[#0a0a0a] p-4 text-center text-white shadow-xl shadow-black/20 transition-all duration-500 group-hover:scale-[1.04] group-hover:bg-[#B92220]">
                    <div>
                      <span className="mx-auto mb-1 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-[#ff6b66] transition-colors duration-500 group-hover:bg-white group-hover:text-[#B92220]">
                        <SIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <strong className="block text-[clamp(1.35rem,3.2vw,2.2rem)] font-black leading-none tracking-tight tabular-nums">{s.value}</strong>
                      {s.unit && <span className="mt-0.5 block text-sm font-bold text-[#ff6b66] transition-colors duration-500 group-hover:text-white">{s.unit}</span>}
                      <span className="mt-1.5 block text-[11px] font-medium text-white/65 group-hover:text-white/90 sm:text-xs">{s.label}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      <style>{`
        .wcu-reveal {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22,1,.36,1),
                      transform .9s cubic-bezier(.22,1,.36,1),
                      filter .9s ease;
        }
        .wcu-up    { transform: translateY(50px) scale(.97); filter: blur(8px); }
        .wcu-left  { transform: translateX(-60px); filter: blur(8px); }
        .wcu-right { transform: translateX(80px); filter: blur(8px); }
        .wcu-zoom  { transform: scale(.5); filter: blur(10px); }
        .wcu-in    { opacity: 1; transform: none; filter: blur(0); }

        .wcu-word { transform: translateY(115%) rotate(5deg); filter: blur(6px); transition: transform 1s cubic-bezier(.22,1,.36,1), filter 1s ease; }
        .wcu-word-in { transform: none; filter: blur(0); }

        .wcu-dots {
          background-image: radial-gradient(#0a0a0a 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: .06;
          -webkit-mask-image: linear-gradient(to bottom, #000, transparent 75%);
          mask-image: linear-gradient(to bottom, #000, transparent 75%);
        }

        /* ticket: round notches cut into the top and bottom edge where the stub meets the body */
        .wcu-ticket {
          --stub: 4.75rem;
          border-radius: 1.5rem;
          -webkit-mask-image: radial-gradient(circle 13px at var(--stub) 0, transparent 98%, #000), radial-gradient(circle 13px at var(--stub) 100%, transparent 98%, #000);
          mask-image: radial-gradient(circle 13px at var(--stub) 0, transparent 98%, #000), radial-gradient(circle 13px at var(--stub) 100%, transparent 98%, #000);
          -webkit-mask-composite: source-in;
          mask-composite: intersect;
        }
        @media (min-width: 640px) { .wcu-ticket { --stub: 7rem; border-radius: 2rem; } }

        .wcu-float { animation: wcuFloat 10s ease-in-out infinite; }
        .wcu-spin  { animation: wcuSpin 18s linear infinite; }

        @keyframes wcuFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-30px) scale(1.12); } }
        @keyframes wcuSpin  { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .wcu-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .wcu-word { transform: none !important; filter: none !important; transition: none !important; }
          .wcu-float, .wcu-spin { animation: none !important; }
        }
      `}</style>
    </section>
  )
}