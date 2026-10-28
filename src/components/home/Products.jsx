"use client"
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Tags, FileText, Package, QrCode, Sparkles, Layers, ShieldCheck, ArrowRight } from "lucide-react"

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
      className={`prd-reveal prd-${variant} ${inView ? "prd-in" : ""} ${className}`}
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
      const p = Math.min((t - start) / 1200, 1)
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
              className={`prd-word inline-block ${inView ? "prd-word-in" : ""} ${red ? "bg-gradient-to-r from-[#B92220] to-[#ff6b66] bg-clip-text text-transparent" : ""}`}
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

/* 14-point starburst used as the "6 product lines" stamp */
const STAR = (() => {
  const n = 14
  const pts = []
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? 41 : 50
    const a = (i * Math.PI) / n
    pts.push(`${(50 + r * Math.sin(a)).toFixed(1)}% ${(50 - r * Math.cos(a)).toFixed(1)}%`)
  }
  return `polygon(${pts.join(",")})`
})()

/* ---------- data ---------- */

const productCategories = [
  {
    icon: Tags,
    title: "Garment Accessories & Hangtags",
    href: "/products/paper-items",
    subtitle: "Full 1 to 6 Color Printing",
    description: "Integrated hangtags and swing tickets featuring digital printing of variable data, unique tags on recycled or handmade paper stocks, woven labels, care labels, and size labels.",
    features: ["1 to 6 Color Printing", "Recycled & Handmade Paper", "Care & Size Labels", "Woven Label Weaves"],
    badge: "Core Product",
  },
  {
    icon: FileText,
    title: "Printed & Woven Labels",
    href: "/products/labels",
    subtitle: "Broadloom, Twill & Satin Damask",
    description: "Custom woven labels offered in broadloom, needleloom, twill, taffeta, and satin damask with a massive selection of stock yarn colors and unique finishes tailored to brand specifications.",
    features: ["Broadloom & Needleloom", "Satin Damask & Taffeta", "Custom Brand Logos", "High-Definition Weaving"],
    badge: "High Demand",
  },
  {
    icon: QrCode,
    title: "Security Tags & RFID",
    href: "/products",
    subtitle: "Source Tagging Solutions",
    description: "Advanced source tagging tags, security labels, and RFID encoding designed to streamline retail tracking, inventory control, and loss prevention.",
    features: ["RFID Integration", "EAS Security Tags", "SKU Barcode Encoding", "Automated Scanning"],
    badge: "Smart Tech",
  },
  {
    icon: Package,
    title: "Specialty Packaging",
    href: "/products/paper-items",
    subtitle: "Hard Goods & Retail Boxes",
    description: "Custom rigid presentation boxes, transparent packaging for underwear/apparel, and specialized packaging solutions built for industry-leading retail hard goods.",
    features: ["Hard Goods Packaging", "Rigid Presentation Boxes", "Transparent Windows", "Premium Retail Finish"],
    badge: "Retail Ready",
  },
  {
    icon: Sparkles,
    title: "Heat Transfer Labels",
    href: "/products/heat-transfer-labels",
    subtitle: "Tagless Comfort & Precision",
    description: "High-definition tagless heat transfer labels providing optimal skin comfort, vibrant multi-color graphics, and high durability against regular garment washing.",
    features: ["Tagless Comfort", "Wash-Resistant Print", "Vibrant Color Tones", "Soft Hand-Feel"],
    badge: "Popular",
  },
  {
    icon: Layers,
    title: "Narrow Items & Trims",
    href: "/products/narrow-items",
    subtitle: "Collar Bands, Elastics & Ribbons",
    description: "Essential garment trims including collar bands, drawstrings, tissue papers, branded elastics, lock strings, and thermal transfer ribbons for smooth in-house production.",
    features: ["Branded Elastics", "Drawstrings & Tissues", "Collar Bands & Ribbons", "Lock Strings & Seals"],
    badge: "Complete Trim",
  },
]

/* ---------- one hangtag-shaped card ---------- */

function TagCard({ item, index }) {
  const [ref, inView] = useInView(0.12)
  const Icon = item.icon

  return (
    <div
      ref={ref}
      className={`group relative pt-8 ${inView ? "prd-swing" : "opacity-0"}`}
      style={{ animationDelay: `${(index % 3) * 150}ms` }}
    >
      {/* string running into the punched hole */}
      <span className="absolute left-1/2 top-0 z-10 h-[3.6rem] w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent to-[#B92220]" />

      <div className="prd-card h-full drop-shadow-[0_18px_22px_rgba(10,10,10,.12)] transition-[filter] duration-500 group-hover:drop-shadow-[0_26px_30px_rgba(185,34,32,.35)]">
        <div className="prd-tag relative flex h-full flex-col overflow-hidden bg-white px-6 pb-6 pt-14 sm:px-8 sm:pb-8">
          {/* red fill rises from the bottom on hover */}
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-[#B92220] to-[#8f1a18] transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />

          {/* punched hole */}
          <span className="absolute left-1/2 top-4 h-5 w-5 -translate-x-1/2 rounded-full bg-neutral-100 shadow-[inset_0_2px_3px_rgba(0,0,0,.35)] ring-2 ring-[#0a0a0a] transition-colors duration-500 group-hover:ring-white" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className="prd-cut-sm grid h-14 w-14 place-items-center bg-[#0a0a0a] text-white transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-white group-hover:text-[#B92220]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-5xl font-black leading-none tracking-tighter text-transparent transition-all duration-500 [-webkit-text-stroke:1.5px_rgba(10,10,10,.2)] group-hover:[-webkit-text-stroke:1.5px_rgba(255,255,255,.55)]">
                0{index + 1}
              </span>
            </div>

            <span className="mt-6 inline-block self-start bg-[#B92220] px-2.5 py-1 text-[11px] font-bold text-white transition-colors duration-500 group-hover:bg-white group-hover:text-[#B92220]">
              {item.badge}
            </span>

            <h3 className="mt-3 text-xl font-black leading-tight tracking-tight text-slate-900 transition-colors duration-500 group-hover:text-white sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-1 text-sm font-bold text-[#B92220] transition-colors duration-500 group-hover:text-white/80">{item.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-500 group-hover:text-white/90">{item.description}</p>

            <ul className="mt-5 grid grid-cols-1 gap-2 border-t-2 border-dashed border-slate-200 pt-5 transition-colors duration-500 group-hover:border-white/40 min-[420px]:grid-cols-2">
              {item.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-700 transition-colors duration-500 group-hover:text-white">
                  <span className="h-2 w-2 shrink-0 rotate-45 bg-[#B92220] transition-colors duration-500 group-hover:bg-white" />
                  {feat}
                </li>
              ))}
            </ul>

            <Link
              href={item.href}
              className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-black text-[#0a0a0a] transition-colors duration-500 group-hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B92220]"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[position:0_100%] bg-no-repeat bg-[size:0_2px] pb-1 transition-[background-size] duration-500 group-hover:bg-[size:100%_2px]">
                Explore Products
              </span>
              <span className="prd-cut-sm grid h-9 w-9 place-items-center bg-[#0a0a0a] text-white transition-all duration-500 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#B92220]">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- section ---------- */

export default function Products() {
  return (
    <section id="products" className="relative w-full overflow-hidden bg-neutral-100 py-16 text-slate-800 sm:py-24 lg:py-28">
      {/* dot texture + glows */}
      <div className="prd-dots pointer-events-none absolute inset-0" />
      <div className="prd-float pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#B92220]/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="prd-float pointer-events-none absolute -right-24 top-2/3 h-72 w-72 rounded-full bg-rose-300/25 blur-3xl sm:h-96 sm:w-96" style={{ animationDelay: "-5s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <Reveal variant="left">
              <span className="inline-flex items-center gap-3 bg-white py-1.5 pl-1.5 pr-4 text-sm font-bold text-slate-900 shadow-sm [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]">
                <span className="grid h-8 w-8 place-items-center bg-[#B92220] text-white">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </span>
                Products &amp; Services
              </span>
            </Reveal>

            <h2 className="mt-6 text-3xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              <Words text="Comprehensive Private Label" />
              <Words text="Branding & Accessories Portfolio" start={3} red />
            </h2>

            <Reveal variant="up" delay={250}>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-lg">
                We offer a wide range of products to help you design brand labeling, high-speed offset printing, and specialty packaging that meets the unique needs of your organization.
              </p>
            </Reveal>
          </div>

          {/* starburst stamp */}
          <div className="lg:col-span-3 lg:justify-self-end">
            <Reveal variant="zoom" delay={200}>
              <div className="prd-bob relative grid h-32 w-32 place-items-center text-white sm:h-40 sm:w-40">
                <span className="prd-spin absolute inset-0 bg-gradient-to-br from-[#B92220] to-[#8f1a18]" style={{ clipPath: STAR }} />
                <span className="relative text-center leading-none">
                  <span className="block text-4xl font-black sm:text-5xl">
                    <CountUp to={productCategories.length} />
                  </span>
                  <span className="mt-1 block text-[11px] font-bold sm:text-xs">product lines</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* hangtag grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
          {productCategories.map((item, i) => (
            <TagCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* banner */}
        <Reveal variant="up" className="mt-14 sm:mt-20">
          <div className="prd-banner relative overflow-hidden bg-[#0a0a0a] px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <span className="prd-stripes pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-90 md:w-1/3" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h3 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">Looking for Custom Program Requirements?</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
                  We deliver the most cost-effective private branding program in the market with 72-hour standard turnarounds.
                </p>
              </div>
              <a
                href="/contact"
                className="prd-cut group inline-flex shrink-0 items-center gap-3 bg-white py-4 pl-7 pr-4 text-sm font-black text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:bg-[#B92220] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Request Pricing &amp; Samples
                <span className="prd-cut-sm grid h-9 w-9 place-items-center bg-[#0a0a0a] text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#B92220]">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .prd-reveal {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22,1,.36,1),
                      transform .9s cubic-bezier(.22,1,.36,1),
                      filter .9s ease;
        }
        .prd-up    { transform: translateY(50px) scale(.97); filter: blur(8px); }
        .prd-left  { transform: translateX(-60px); filter: blur(8px); }
        .prd-right { transform: translateX(80px); filter: blur(8px); }
        .prd-zoom  { transform: scale(.5); filter: blur(10px); }
        .prd-in    { opacity: 1; transform: none; filter: blur(0); }

        .prd-word { transform: translateY(115%) rotate(5deg); filter: blur(6px); transition: transform 1s cubic-bezier(.22,1,.36,1), filter 1s ease; }
        .prd-word-in { transform: none; filter: blur(0); }

        .prd-dots {
          background-image: radial-gradient(#0a0a0a 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: .07;
          -webkit-mask-image: linear-gradient(to bottom, #000, transparent 80%);
          mask-image: linear-gradient(to bottom, #000, transparent 80%);
        }

        /* chamfered corners: hangtag, buttons, banner */
        .prd-tag    { clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px)); }
        .prd-cut    { clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px)); }
        .prd-cut-sm { clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px)); }
        .prd-banner { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 34px), calc(100% - 34px) 100%, 0 100%); }

        .prd-stripes {
          background: linear-gradient(135deg, #B92220 25%, transparent 25% 50%, #B92220 50% 75%, transparent 75%);
          background-size: 40px 40px;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 70%);
          mask-image: linear-gradient(to right, transparent, #000 70%);
          animation: prdStripes 2.4s linear infinite;
        }

        .prd-swing { transform-origin: 50% 0; animation: prdSwing 2.2s cubic-bezier(.22,1,.36,1) backwards; }
        .prd-card  { transform-origin: 50% -2rem; }
        .group:hover .prd-card { animation: prdWiggle .9s ease; }

        .prd-float { animation: prdFloat 10s ease-in-out infinite; }
        .prd-spin  { animation: prdSpin 22s linear infinite; }
        .prd-bob   { animation: prdBob 6s ease-in-out infinite; }

        @keyframes prdSwing {
          0%   { opacity: 0; transform: translateY(-50px) rotate(-16deg); }
          30%  { opacity: 1; }
          40%  { transform: translateY(0) rotate(9deg); }
          60%  { transform: rotate(-5deg); }
          80%  { transform: rotate(2.5deg); }
          100% { transform: none; }
        }
        @keyframes prdWiggle  { 0%,100% { transform: rotate(0); } 25% { transform: rotate(2.2deg); } 55% { transform: rotate(-1.6deg); } 80% { transform: rotate(.6deg); } }
        @keyframes prdStripes { to { background-position: 40px 40px; } }
        @keyframes prdFloat   { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-30px) scale(1.12); } }
        @keyframes prdSpin    { to { transform: rotate(360deg); } }
        @keyframes prdBob     { 0%,100% { translate: 0 0; } 50% { translate: 0 -10px; } }

        @media (prefers-reduced-motion: reduce) {
          .prd-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .prd-word { transform: none !important; filter: none !important; transition: none !important; }
          .prd-swing, .prd-stripes, .prd-float, .prd-spin, .prd-bob, .group:hover .prd-card { animation: none !important; }
        }
      `}</style>
    </section>
  )
}