"use client"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { BadgeCheck, Check } from "lucide-react"

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
      className={`cert-reveal cert-${variant} ${inView ? "cert-in" : ""} ${className}`}
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
      const p = Math.min((t - start) / 1400, 1)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{val}</span>
}

/* ---------- data ---------- */

const certifications = [
  { name: "ISO 9001:2015", src: "/image/certifications/iso.png" },
  { name: "FSC", src: "/image/certifications/fsc.png" },
  { name: "OEKO-TEX Standard 100", src: "/image/certifications/oeko-tex.png" },
  { name: "Global Recycled Standard", src: "/image/certifications/grs.png" },
  { name: "Sedex", src: "/image/certifications/sedex.png" },
]

const points = ["Quality", "Safety", "Sustainability"]
const words = [...points, ...points, ...points, ...points]
const AUTOPLAY_MS = 4500

/* ---------- section ---------- */

export default function Certifications() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // auto-advance through the certificates; pauses while the pointer is over the panels
  useEffect(() => {
    if (paused || reduced) return
    const id = setTimeout(() => setActive((a) => (a + 1) % certifications.length), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [active, paused, reduced])

  return (
    <section className="relative w-full overflow-hidden border-b border-gray-200 bg-white py-16 sm:py-24">
      {/* dot texture + soft animated glows */}
      <div className="cert-dots pointer-events-none absolute inset-0" />
      <div className="cert-float pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#B92220]/10 blur-3xl sm:h-96 sm:w-96" />
      <div
        className="cert-float pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-rose-300/25 blur-3xl sm:h-96 sm:w-96"
        style={{ animationDelay: "-4s" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal variant="zoom">
              <div className="flex items-end gap-4">
                <span className="cert-num bg-gradient-to-b from-[#B92220] to-[#8f1a18] bg-clip-text text-[clamp(7rem,20vw,12rem)] font-black leading-[.78] tracking-tighter text-transparent tabular-nums">
                  <CountUp to={5} />
                </span>
                <span className="pb-2 text-sm font-black uppercase leading-tight tracking-[0.2em] text-slate-900">
                  Global
                  <br />
                  certifi&shy;cations
                  <span className="mt-3 block h-1 w-12 rounded-full bg-[#B92220]" />
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="left" delay={120}>
              <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl">
                Certified for quality, safety and sustainability
              </h2>
            </Reveal>
            <Reveal variant="left" delay={220}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-lg">
                Recognized international standards behind every label, tag and package we make.
              </p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-3">
              {points.map((point, i) => (
                <Reveal key={point} variant="zoom" delay={320 + i * 120}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] py-2 pl-2 pr-4 text-sm font-semibold text-white">
                    <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#B92220]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#B92220]/60 [animation-duration:2.5s] motion-reduce:animate-none" />
                      <Check className="relative h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {point}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* expanding certificate panels */}
        <Reveal variant="up" delay={200} className="mt-12 sm:mt-16">
          <div
            className="flex flex-col gap-3 md:h-[27rem] md:flex-row"
            onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
          >
            {certifications.map((cert, i) => {
              const on = i === active
              return (
                <button
                  key={cert.name}
                  type="button"
                  aria-pressed={on}
                  aria-label={cert.name}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className={`relative isolate overflow-hidden rounded-3xl bg-[#0a0a0a] text-left text-white shadow-lg shadow-black/10 transition-[flex,height] duration-700 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B92220] ${
                    on ? "h-80 md:h-auto md:flex-[4.5]" : "h-[4.5rem] md:h-auto md:flex-1"
                  }`}
                >
                  {/* red layer fades in on the active panel */}
                  <span
                    className={`absolute inset-0 -z-10 bg-gradient-to-br from-[#B92220] to-[#8f1a18] transition-opacity duration-700 ${on ? "opacity-100" : "opacity-0"}`}
                  />
                  {on && <span className="cert-sweep pointer-events-none absolute inset-y-0 -z-10 w-1/3" />}

                  {/* index */}
                  <span className={`absolute right-4 top-3 text-3xl font-black tabular-nums transition-colors duration-700 md:right-5 md:top-4 md:text-5xl ${on ? "text-white/30" : "text-white/10"}`}>
                    0{i + 1}
                  </span>

                  {/* logo tile morphs between small and large */}
                  <span
                    className={`absolute overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                      on ? "left-4 top-4 h-24 w-40 md:left-6 md:top-6 md:h-28 md:w-52" : "left-3 top-3 h-12 w-12 md:left-1/2 md:top-5 md:-translate-x-1/2"
                    }`}
                  >
                    <Image
                      src={cert.src}
                      alt=""
                      fill
                      sizes="208px"
                      className={`object-contain transition-all duration-700 ${on ? "p-3" : "p-1.5"}`}
                    />
                  </span>

                  {/* collapsed label */}
                  <span
                    className={`absolute left-[4.75rem] top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-bold transition-all duration-500 md:bottom-5 md:left-1/2 md:top-auto md:-translate-x-1/2 md:translate-y-0 md:rotate-180 md:[writing-mode:vertical-rl] ${
                      on ? "pointer-events-none opacity-0" : "opacity-100 delay-300"
                    }`}
                  >
                    {cert.name}
                  </span>

                  {/* expanded label */}
                  <span
                    className={`absolute bottom-5 left-4 right-4 transition-all duration-700 md:bottom-7 md:left-6 md:right-6 ${
                      on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                      <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                      Certified standard
                    </span>
                    <span className="mt-2 block text-2xl font-black leading-tight tracking-tight sm:text-3xl md:text-4xl">
                      {cert.name}
                    </span>
                  </span>

                  {/* autoplay progress */}
                  {on && !reduced && (
                    <span
                      key={`p-${active}`}
                      className="cert-progress absolute bottom-0 left-0 h-1 w-full origin-left bg-white/90"
                      style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      {/* giant scrolling words */}
      <Reveal variant="up" delay={100} className="mt-14 sm:mt-20">
        <div aria-hidden="true" className="cert-fade overflow-hidden border-y-2 border-[#0a0a0a] py-3 sm:py-4">
          <div className="cert-marquee flex w-max">
            {words.map((w, i) => (
              <span
                key={i}
                className={`flex items-center gap-5 whitespace-nowrap pr-5 text-[clamp(2.2rem,6.5vw,5.5rem)] font-black uppercase leading-none tracking-tighter sm:gap-8 sm:pr-8 ${
                  i % 3 === 0 ? "text-[#0a0a0a]" : i % 3 === 1 ? "text-[#B92220]" : "text-transparent [-webkit-text-stroke:1.5px_#0a0a0a]"
                }`}
              >
                {w}
                <span className="cert-spin inline-block text-[.55em] text-[#B92220]">✱</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <style>{`
        .cert-reveal {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22,1,.36,1),
                      transform .9s cubic-bezier(.22,1,.36,1),
                      filter .9s ease;
        }
        .cert-up    { transform: translateY(50px) scale(.97); filter: blur(8px); }
        .cert-left  { transform: translateX(-60px); filter: blur(8px); }
        .cert-right { transform: translateX(80px); filter: blur(8px); }
        .cert-zoom  { transform: scale(.5); filter: blur(10px); }
        .cert-in    { opacity: 1; transform: none; filter: blur(0); }

        .cert-dots {
          background-image: radial-gradient(#0a0a0a 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: .06;
          -webkit-mask-image: linear-gradient(to bottom, #000, transparent 70%);
          mask-image: linear-gradient(to bottom, #000, transparent 70%);
        }
        .cert-fade {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }

        .cert-sweep {
          left: -40%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.22), transparent);
          transform: skewX(-20deg);
          animation: certSweep 3.2s ease-in-out infinite;
        }
        .cert-progress { animation: certProgress linear forwards; }
        .cert-num { animation: certNum 4s ease-in-out infinite; }
        .cert-float { animation: certFloat 10s ease-in-out infinite; }
        .cert-spin  { animation: certSpin 8s linear infinite; }
        .cert-marquee { animation: certMarquee 38s linear infinite; }
        .cert-marquee:hover { animation-play-state: paused; }

        @keyframes certSweep    { 0% { left: -40%; } 60%, 100% { left: 140%; } }
        @keyframes certProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes certNum      { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes certFloat    { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-30px) scale(1.12); } }
        @keyframes certSpin     { to { transform: rotate(360deg); } }
        @keyframes certMarquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        @media (prefers-reduced-motion: reduce) {
          .cert-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .cert-sweep, .cert-progress, .cert-num, .cert-float, .cert-spin, .cert-marquee { animation: none !important; }
        }
      `}</style>
    </section>
  )
}