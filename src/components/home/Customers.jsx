"use client"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"

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

function Reveal({ children, variant = "up", delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.15)
  return (
    <div
      ref={ref}
      className={`cust-reveal cust-${variant} ${inView ? "cust-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function CountUp({ to, suffix = "" }) {
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

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/* ---------- data ---------- */

// Brand logos (crop from brochure page 11, save in /public/image/customers/)
const brands = [
  { name: "Okaidi-Obaibi", src: "/image/customers/okaidi-obaibi.png" },
  { name: "Arrow", src: "/image/customers/arrow.png" },
  { name: "Chipie", src: "/image/customers/chipie.png" },
  { name: "Jacadi", src: "/image/customers/jacadi.png" },
  { name: "Mufti", src: "/image/customers/mufti.png" },
  { name: "Indian Terrain", src: "/image/customers/indian-terrain.png" },
  { name: "Calvin Klein", src: "/image/customers/calvin-klein.png" },
  { name: "Flying Machine", src: "/image/customers/flying-machine.png" },
  { name: "Cleo", src: "/image/customers/cleo.png" },
  { name: "Tommy Hilfiger", src: "/image/customers/tommy-hilfiger.png" },
  { name: "Friedrich", src: "/image/customers/friedrich.png" },
]

// Client names from the brochure customer list
const clientsRow1 = [
  "ABA Fashion Ltd",
  "ABA Garments Ltd",
  "AKH Eco Apparels Ltd",
  "Alema Textile Ltd",
  "Anika Apparels Ltd",
  "APS Apparels Ltd",
  "Asrotex Ltd",
  "Astex Garments Ltd",
  "Bhis Apparels Ltd",
  "BMT International Ltd",
  "Bose Export",
  "Centex",
  "Chapter One",
  "Clamoon",
  "Comfort Apparels Ltd",
  "Consumer Knitex Ltd",
  "Cotton Club Ltd",
  "Crony Apparels Ltd",
]

const clientsRow2 = [
  "Crossline Knit Fabrics Ltd",
  "Dhaka Garments & Washing Ltd",
  "Dird Garments Ltd",
  "Divine Fabrics Ltd",
  "Fashion Island Ltd",
  "Fin Bangla Apparels Ltd",
  "Green Life Knitted Ltd",
  "Islam Knit Designs Ltd",
  "Jeans Plus Ltd",
  "JL Fashion Ltd",
  "Knit Asia Ltd",
  "Libas Textiles Ltd",
  "Mega Fashion Ltd",
  "Misami Garments Ltd",
  "Natural Denim",
  "Ocean Sweater",
  "Pioneer Knitwears",
  "Premier Knits",
]

const stats = [
  { to: 90, suffix: "+", label: "Valued customers" },
  { to: 1988, suffix: "", label: "Group founded" },
  { to: 72, suffix: "h", label: "Standard turnaround" },
  { to: 2, suffix: "", label: "Offices: Bangladesh & Thailand" },
]

/* ---------- section ---------- */

export default function Customers() {
  return (
    <section
      id="customers"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-16 sm:py-24"
    >
      {/* soft background glows */}
      <div className="cust-float pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#B92220]/10 blur-3xl sm:h-96 sm:w-96" />
      <div
        className="cust-float pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-rose-300/25 blur-3xl sm:h-96 sm:w-96"
        style={{ animationDelay: "-4s" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Reveal variant="zoom">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B92220]">
              Our Customers
            </p>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Trusted by brands and factories across the industry
            </h2>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              From global fashion labels to leading garment manufacturers, they rely on
              3M Label for their branding materials.
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} variant={i % 2 === 0 ? "left" : "right"} delay={i * 120}>
              <div className="group flex h-full flex-col items-center gap-1 rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#B92220]/50 hover:shadow-xl hover:shadow-[#B92220]/15 sm:p-7">
                <span className="text-4xl font-black text-[#B92220] sm:text-5xl">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </span>
                <span className="text-xs font-medium leading-snug text-slate-600 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* brand logos marquee (full width) */}
      <Reveal variant="up" delay={150} className="relative z-10 mt-14 sm:mt-20">
        <div className="cust-fade overflow-hidden">
          <div className="cust-marquee flex w-max">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="group mr-4 flex h-20 w-36 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B92220]/50 hover:shadow-lg sm:mr-6 sm:h-24 sm:w-48"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    fill
                    sizes="192px"
                    className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* client names - two rows moving in opposite directions */}
      <Reveal variant="up" delay={250} className="relative z-10 mt-6 space-y-4 sm:mt-8">
        {[
          { list: clientsRow1, reverse: false },
          { list: clientsRow2, reverse: true },
        ].map((row, r) => (
          <div key={r} className="cust-fade overflow-hidden">
            <div className={`${row.reverse ? "cust-marquee-rev" : "cust-marquee-slow"} flex w-max`}>
              {[...row.list, ...row.list].map((name, i) => (
                <span
                  key={i}
                  className="mr-3 shrink-0 whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition-colors duration-300 hover:border-[#B92220] hover:text-[#B92220] sm:mr-4 sm:text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>

      <style>{`
        .cust-reveal {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22,1,.36,1),
                      transform .9s cubic-bezier(.22,1,.36,1),
                      filter .9s ease;
        }
        .cust-up    { transform: translateY(50px) scale(.97); filter: blur(8px); }
        .cust-left  { transform: translateX(-60px) rotate(-2deg); filter: blur(8px); }
        .cust-right { transform: translateX(60px) rotate(2deg); filter: blur(8px); }
        .cust-zoom  { transform: scale(.6); filter: blur(10px); }
        .cust-in    { opacity: 1; transform: none; filter: blur(0); }

        .cust-fade {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          padding-block: 8px;
        }

        .cust-float { animation: custFloat 10s ease-in-out infinite; }
        .cust-marquee      { animation: custMarquee 40s linear infinite; }
        .cust-marquee-slow { animation: custMarquee 60s linear infinite; }
        .cust-marquee-rev  { animation: custMarquee 60s linear infinite reverse; }
        .cust-marquee:hover,
        .cust-marquee-slow:hover,
        .cust-marquee-rev:hover { animation-play-state: paused; }

        @keyframes custFloat   { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-40px) scale(1.12); } }
        @keyframes custMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        @media (prefers-reduced-motion: reduce) {
          .cust-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .cust-float, .cust-marquee, .cust-marquee-slow, .cust-marquee-rev { animation: none !important; }
        }
      `}</style>
    </section>
  )
}