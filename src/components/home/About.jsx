"use client"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, Globe2, Sparkles } from "lucide-react"

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
      className={`abt-reveal abt-${variant} ${inView ? "abt-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function CountUp({ to, duration = 1600 }) {
  const [ref, inView] = useInView(0.4)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    let start
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return <span ref={ref}>{val}</span>
}

/* heading words slide up from behind a mask once the section scrolls in */
function Words({ text, start = 0, red = false }) {
  const [ref, inView] = useInView(0.3)
  return (
    <span ref={ref} className="block">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i} className="mr-[.25em] inline-block overflow-hidden pb-[.12em] align-bottom">
            <span
              className={`abt-word inline-block ${inView ? "abt-word-in" : ""} ${red ? "bg-gradient-to-r from-[#B92220] to-[#ff6b66] bg-clip-text text-transparent" : ""}`}
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

const highlights = [
  { icon: Building2, title: "Established 1988", desc: "Founded in Canada as part of Label Bank Asia with decades of manufacturing expertise." },
  { icon: Globe2, title: "Global Reach", desc: "State-of-the-art facilities delivering private branding solutions to retailers worldwide." },
  { icon: Sparkles, title: "Uncompromising Quality", desc: "Delivering the most cost-effective, premium private branding and source tagging programs." },
]

const keyPoints = [
  "Environmentally aware manufacturing",
  "On-demand digital & laser printing",
  "72-hour standard production turnaround",
  "Comprehensive source tagging & packaging",
]

/* ---------- section ---------- */

export default function About() {
  const visualRef = useRef(null)

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || !visualRef.current) return
    const r = visualRef.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    visualRef.current.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`)
    visualRef.current.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`)
  }
  const onLeave = () => {
    visualRef.current?.style.setProperty("--rx", "0deg")
    visualRef.current?.style.setProperty("--ry", "0deg")
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 text-slate-800 sm:py-20 lg:py-28">
      {/* oversized outlined year + soft glows */}
      <span
        aria-hidden="true"
        className="abt-year pointer-events-none absolute -right-6 top-6 select-none text-[clamp(8rem,26vw,22rem)] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(185,34,32,.22)]"
      >
        1988
      </span>
      <div className="abt-float pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#B92220]/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="abt-float pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-rose-300/25 blur-3xl sm:h-96 sm:w-96" style={{ animationDelay: "-5s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: arch-shaped image */}
          <div className="lg:col-span-5">
            <Reveal variant="zoom">
              <div
                ref={visualRef}
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                className="relative mx-auto w-full max-w-sm px-3 pb-8 pt-4 sm:max-w-md lg:max-w-none"
              >
                {/* offset outline arch */}
                <span className="abt-slide absolute inset-x-3 bottom-8 top-4 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2rem] border-2 border-[#B92220] sm:translate-x-5 sm:translate-y-5" />

                <div className="relative transition-transform duration-500 [transform-style:preserve-3d] [transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]">
                  <div className="abt-clip group relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-[#0a0a0a] shadow-2xl shadow-[#B92220]/20">
                    <Image
                      src="/image/Home1.jpeg"
                      alt="3M Label Limited Reception Desk"
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 40vw"
                      className="abt-img object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-[#B92220]/10" />
                    <div className="abt-scan absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-transparent to-white/30" />

                    <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/25 bg-white/15 p-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffb3ae] sm:text-xs">Client-Centric Excellence</p>
                      <p className="mt-1 text-xs font-medium leading-snug text-white sm:text-sm">
                        Dedicated hospitality and customer service team ensuring seamless partnerships.
                      </p>
                    </div>
                  </div>

                  {/* ring badge with years counter */}
                  <div className="abt-bob absolute -right-1 top-10 sm:-right-6" style={{ transform: "translateZ(70px)" }}>
                    <div className="relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-[#B92220] to-[#8f1a18] text-white shadow-xl shadow-[#B92220]/40 sm:h-32 sm:w-32">
                      <svg viewBox="0 0 120 120" aria-hidden="true" className="abt-spin absolute inset-0 h-full w-full">
                        <defs>
                          <path id="abt-ring" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
                        </defs>
                        <text className="fill-white text-[9.5px] font-bold uppercase">
                          <textPath href="#abt-ring" textLength="292" lengthAdjust="spacing">
                            Years of industry experience •{" "}
                          </textPath>
                        </text>
                      </svg>
                      <span className="text-2xl font-black sm:text-3xl">
                        <CountUp to={35} />+
                      </span>
                    </div>
                  </div>

                  {/* black certification badge */}
                  <div className="absolute -left-2 -bottom-4 sm:-left-6" style={{ transform: "translateZ(50px)" }}>
                    <div className="flex items-center gap-3 rounded-2xl bg-[#0a0a0a] py-3 pl-3 pr-5 text-white shadow-xl shadow-black/25 transition-transform duration-300 hover:scale-105">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#B92220]">
                        <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="leading-tight">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-white/60 sm:text-xs">Quality Certified</p>
                        <p className="text-xs font-bold sm:text-sm">ISO 9001:2015 &amp; OEKO-TEX</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: copy */}
          <div className="flex flex-col lg:col-span-7">
            <Reveal variant="zoom">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-[#B92220]/25 bg-[#B92220]/5 px-4 py-2 text-xs font-semibold text-[#B92220] sm:text-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#B92220]/60 [animation-duration:2.2s] motion-reduce:animate-none" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#B92220]" />
                </span>
                About 3M Label Limited
              </span>
            </Reveal>

            <h2 className="mt-5 text-3xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl">
              <Words text="Branding Programs for" />
              <Words text="Leading Retailers Worldwide" start={4} red />
            </h2>

            <Reveal variant="left" delay={150}>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                3M Label Limited (a sister concern of Label Bank Asia) was founded in Canada in 1988. We are a professional supplier of private label branding materials, specializing in apparel branding solutions, high-speed offset printing, woven labels, and specialty packaging.
              </p>
            </Reveal>

            <Reveal variant="left" delay={250}>
              <blockquote className="relative mt-5 max-w-2xl overflow-hidden rounded-2xl bg-[#0a0a0a] py-4 pl-6 pr-5 text-sm font-medium italic text-white sm:text-base">
                <span className="abt-bar absolute inset-y-0 left-0 w-1.5 bg-[#B92220]" />
                &ldquo;Our mission is not to be the biggest in this business, simply the best!&rdquo;
              </blockquote>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {keyPoints.map((point, i) => (
                <Reveal key={point} variant="left" delay={300 + i * 90}>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#B92220]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-slate-800">{point}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {highlights.map((item, i) => {
                const Icon = item.icon
                return (
                  <Reveal key={item.title} variant="up" delay={i * 130}>
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B92220] hover:shadow-xl hover:shadow-[#B92220]/20">
                      <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-[#B92220] to-[#8f1a18] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                      <div className="relative">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0a0a0a] text-white transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-white group-hover:text-[#B92220]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h3 className="mt-4 text-sm font-black text-slate-900 transition-colors duration-300 group-hover:text-white sm:text-base">{item.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-white/85 sm:text-[13px]">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal variant="up" delay={200}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#products"
                  className="abt-shine group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#0a0a0a] py-4 pl-7 pr-5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#B92220] hover:shadow-xl hover:shadow-[#B92220]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B92220]"
                >
                  Explore Offerings
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#0a0a0a] px-7 py-3.5 text-sm font-bold text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:border-[#B92220] hover:text-[#B92220] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B92220]"
                >
                  Get in Touch
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* stats band */}
        <Reveal variant="up" delay={100} className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-[#0a0a0a] text-white shadow-2xl shadow-black/20 sm:grid-cols-3">
            {[
              { value: <CountUp to={1988} />, unit: "", label: "Founded in Canada" },
              { value: <CountUp to={35} />, unit: "+", label: "Years of industry experience" },
              { value: <CountUp to={72} />, unit: "hrs", label: "Standard production turnaround" },
            ].map((s, i) => (
              <div key={s.label} className="abt-stat group relative border-t border-white/10 px-6 py-7 first:border-t-0 sm:border-l sm:border-t-0 sm:px-8 sm:py-9 sm:first:border-l-0">
                <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-[#B92220] transition-transform duration-700 group-hover:scale-x-100" />
                <strong className="block text-5xl font-black tracking-tight tabular-nums sm:text-6xl">
                  {s.value}
                  <span className="ml-1 text-2xl text-[#ff6b66]">{s.unit}</span>
                </strong>
                <p className="mt-2 text-sm text-white/65">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .abt-reveal {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22,1,.36,1),
                      transform .9s cubic-bezier(.22,1,.36,1),
                      filter .9s ease;
        }
        .abt-up    { transform: translateY(50px) scale(.97); filter: blur(8px); }
        .abt-left  { transform: translateX(-60px); filter: blur(8px); }
        .abt-right { transform: translateX(80px); filter: blur(8px); }
        .abt-zoom  { transform: scale(.6); filter: blur(10px); }
        .abt-in    { opacity: 1; transform: none; filter: blur(0); }

        .abt-word { transform: translateY(115%) rotate(5deg); filter: blur(6px); transition: transform 1s cubic-bezier(.22,1,.36,1), filter 1s ease; }
        .abt-word-in { transform: none; filter: blur(0); }

        .abt-clip  { animation: abtClip 1.5s cubic-bezier(.22,1,.36,1) .3s backwards; }
        .abt-img   { animation: abtZoom 2.2s cubic-bezier(.22,1,.36,1) .3s backwards; }
        .abt-slide { animation: abtSlide 1.2s cubic-bezier(.22,1,.36,1) 1.2s backwards; }
        .abt-scan  { animation: abtScan 5.5s ease-in-out 2s infinite; }
        .abt-bob   { animation: abtBob 6s ease-in-out infinite; }
        .abt-spin  { animation: abtSpin 16s linear infinite; }
        .abt-year  { animation: abtYear 12s ease-in-out infinite; }
        .abt-float { animation: abtFloat 10s ease-in-out infinite; }
        .abt-bar   { transform-origin: top; animation: abtBar 3s ease-in-out infinite; }

        .abt-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.3), transparent);
          transform: skewX(-20deg);
          transition: left .9s ease;
          pointer-events: none;
        }
        .abt-shine:hover::after { left: 140%; }

        @keyframes abtClip  { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes abtZoom  { from { transform: scale(1.4); } to { transform: scale(1); } }
        @keyframes abtSlide { from { transform: translate(0,0); opacity: 0; } }
        @keyframes abtScan  { 0% { transform: translateY(-120%); } 55%, 100% { transform: translateY(560%); } }
        @keyframes abtBob   { 0%,100% { translate: 0 0; } 50% { translate: 0 -12px; } }
        @keyframes abtSpin  { to { transform: rotate(360deg); } }
        @keyframes abtYear  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(18px); } }
        @keyframes abtFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-30px) scale(1.12); } }
        @keyframes abtBar   { 0%,100% { transform: scaleY(.55); } 50% { transform: scaleY(1); } }

        @media (prefers-reduced-motion: reduce) {
          .abt-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .abt-word { transform: none !important; filter: none !important; transition: none !important; }
          .abt-clip, .abt-img, .abt-slide, .abt-scan, .abt-bob, .abt-spin, .abt-year, .abt-float, .abt-bar { animation: none !important; }
        }
      `}</style>
    </section>
  )
}