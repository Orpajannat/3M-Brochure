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

// repeated so the scrolling rows never show a gap, even on wide screens
const rowOne = [...certifications, ...certifications, ...certifications, ...certifications]
const rowTwo = [...rowOne].reverse()

const points = ["Quality", "Safety", "Sustainability"]

/* ---------- one scrolling row of badges ---------- */

function BadgeRow({ items, reverse = false }) {
  return (
    <div className="cert-fade overflow-hidden py-2">
      <div className={`${reverse ? "cert-marquee-rev" : "cert-marquee"} flex w-max`}>
        {items.map((cert, i) => (
          <div
            key={i}
            className="cert-tile group mr-4 flex h-28 w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:mr-6 sm:h-36 sm:w-56 sm:p-4"
          >
            {/* red bar that draws across the top on hover */}
            <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#B92220] to-[#ff6b66] transition-transform duration-500 group-hover:scale-x-100" />

            <div className="relative h-12 w-full sm:h-16">
              <Image
                src={cert.src}
                alt={cert.name}
                fill
                sizes="224px"
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="flex items-center gap-1 text-center text-[11px] font-bold leading-tight text-slate-700 transition-colors duration-300 group-hover:text-[#B92220] sm:text-xs">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[#B92220]" />
              {cert.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- section ---------- */

export default function Certifications() {
  return (
    <section className="relative w-full overflow-hidden border-b border-gray-200 bg-white py-14 sm:py-20">
      {/* soft animated glows */}
      <div className="cert-float pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#B92220]/10 blur-3xl sm:h-96 sm:w-96" />
      <div
        className="cert-float pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-rose-300/25 blur-3xl sm:h-96 sm:w-96"
        style={{ animationDelay: "-4s" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* left: message */}
          <div className="lg:col-span-4">
            <Reveal variant="zoom">
              <div className="flex items-center gap-4">
                {/* red circle with a spinning dashed ring */}
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
                  <span className="cert-spin absolute inset-0 rounded-full border-2 border-dashed border-[#B92220]/50" />
                  <span className="flex h-[78%] w-[78%] items-center justify-center rounded-full bg-gradient-to-br from-[#B92220] to-[#8f1a18] text-5xl font-black text-white shadow-lg shadow-[#B92220]/30 sm:text-6xl">
                    <CountUp to={5} />
                  </span>
                </div>
                <span className="text-sm font-bold uppercase leading-tight tracking-[0.15em] text-slate-500">
                  Global
                  <br />
                  certifications
                </span>
              </div>
            </Reveal>

            <Reveal variant="left" delay={120}>
              <h2 className="mt-6 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
                Certified for quality, safety and sustainability
              </h2>
            </Reveal>

            <Reveal variant="left" delay={220}>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Recognized international standards behind every label, tag and package we
                make.
              </p>
            </Reveal>

            <div className="mt-6 flex flex-wrap gap-3">
              {points.map((point, i) => (
                <Reveal key={point} variant="zoom" delay={320 + i * 120}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#B92220]/25 bg-[#B92220]/5 px-4 py-2 text-sm font-semibold text-[#B92220]">
                    <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#B92220] text-white">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#B92220]/40 [animation-duration:2.5s] motion-reduce:animate-none" />
                      <Check className="relative h-3 w-3" strokeWidth={3} />
                    </span>
                    {point}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: two rows of badges scrolling in opposite directions */}
          <div className="lg:col-span-8">
            <Reveal variant="right" delay={150}>
              <div className="relative space-y-1 overflow-hidden rounded-3xl border border-[#B92220]/15 bg-gradient-to-br from-rose-50 via-white to-rose-50 py-4 shadow-lg shadow-[#B92220]/5 sm:space-y-2 sm:py-6">
                <BadgeRow items={rowOne} />
                <BadgeRow items={rowTwo} reverse />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

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

        .cert-fade {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }

        .cert-tile {
          position: relative;
          overflow: hidden;
          transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
        }
        .cert-tile::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(185,34,32,.12), transparent);
          transform: skewX(-20deg);
          transition: left .9s ease;
          pointer-events: none;
        }
        .cert-tile:hover {
          transform: translateY(-6px);
          border-color: rgba(185,34,32,.5);
          box-shadow: 0 16px 32px -10px rgba(185,34,32,.3);
        }
        .cert-tile:hover::after { left: 140%; }

        .cert-float { animation: certFloat 10s ease-in-out infinite; }
        .cert-spin  { animation: certSpin 14s linear infinite; }
        .cert-marquee     { animation: certMarquee 40s linear infinite; }
        .cert-marquee-rev { animation: certMarquee 46s linear infinite reverse; }
        .cert-marquee:hover,
        .cert-marquee-rev:hover { animation-play-state: paused; }

        @keyframes certFloat   { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-30px) scale(1.12); } }
        @keyframes certSpin    { to { transform: rotate(360deg); } }
        @keyframes certMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        @media (prefers-reduced-motion: reduce) {
          .cert-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .cert-float, .cert-spin, .cert-marquee, .cert-marquee-rev { animation: none !important; }
        }
      `}</style>
    </section>
  )
}