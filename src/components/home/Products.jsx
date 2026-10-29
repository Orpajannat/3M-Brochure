"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Tags, FileText, Package, QrCode, Sparkles, Layers, ArrowRight } from "lucide-react"

/*
  Brand tokens, taken from the 3M Label Limited logo + brochure
  ink   #1B1718  logo black
  gray  #635C5E  logo ring gray
  red   #E01C24  logo "3M" red
  mint  #BFE6D6  brochure panel color
  Product photos live in /public/images/products/ (see product-images folder)
*/

/* ---------- helpers ---------- */

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
      ([e]) => {
        if (e.isIntersecting) {
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

/* live visibility (used to run the auto-tour only while the section is on screen) */
function useVisible(ref) {
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return vis
}

function useMedia(query) {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [query])
  return m
}

function Words({ text, start = 0, className = "" }) {
  const [ref, inView] = useInView(0.3)
  return (
    <span ref={ref} className={`block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i} className="mr-[.22em] inline-block overflow-hidden pb-[.14em] align-bottom">
            <span className={`prd-word inline-block ${inView ? "prd-word-in" : ""}`} style={{ transitionDelay: `${(start + i) * 70}ms` }}>
              {w}
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}

/* little concentric-ring mark, echoing the logo */
function RingMark({ on = false, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={`prd-mark shrink-0 ${on ? "prd-mark-on" : ""}`}>
      <circle cx="16" cy="16" r="14" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="9.5" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="4.5" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="1.6" className="prd-mark-dot" stroke="none" />
    </svg>
  )
}

/* ---------- product art for the one line with no brochure photo ---------- */

function RfidArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="RFID security tag emitting a signal">
      <rect width="200" height="200" fill="#EEF0F0" />
      <g transform="rotate(-14 100 104)">
        <rect x="30" y="70" width="130" height="64" rx="10" fill="#fff" stroke="#1B1718" strokeWidth="2.5" />
        <g fill="none" stroke="#635C5E" strokeWidth="1.6">
          <rect x="44" y="82" width="102" height="40" rx="3" />
          <rect x="52" y="90" width="86" height="24" rx="2" />
          <path d="M60 98 H130" />
          <path d="M60 106 H130" />
        </g>
        <rect x="83" y="92" width="24" height="20" rx="3" fill="#E01C24" />
      </g>
      <g fill="none" stroke="#E01C24" strokeLinecap="round" strokeWidth="3">
        <path className="prd-wave" d="M158 56 a30 30 0 0 1 14 22" style={{ animationDelay: "0s" }} />
        <path className="prd-wave" d="M164 40 a50 50 0 0 1 24 38" style={{ animationDelay: ".25s" }} />
        <path className="prd-wave" d="M170 24 a70 70 0 0 1 34 54" style={{ animationDelay: ".5s" }} />
      </g>
    </svg>
  )
}

function PlateInner({ item }) {
  if (item.Art) return <item.Art />
  return (
    <img
      src={item.img}
      alt={item.alt}
      loading="lazy"
      draggable={false}
      className={`h-full w-full ${item.fit === "contain" ? "object-contain p-[9%]" : "object-cover"}`}
    />
  )
}

/* ---------- data ---------- */

const IMG = "/image/"
const productCategories = [
  {
    icon: Tags,
    img: `${IMG}/hangtags.webp`,
    alt: "Assorted printed hangtags and swing tickets",
    fit: "contain",
    title: "Garment Accessories & Hangtags",
    href: "/products/paper-items",
    subtitle: "Full 1 to 6 Color Printing",
    description: "Integrated hangtags and swing tickets featuring digital printing of variable data, unique tags on recycled or handmade paper stocks, woven labels, care labels, and size labels.",
    features: ["1 to 6 Color Printing", "Recycled & Handmade Paper", "Care & Size Labels", "Woven Label Weaves"],
    badge: "Core Product",
  },
  {
    icon: FileText,
    img: `${IMG}/labels.webp`,
    alt: "Rolls of printed care and size labels",
    fit: "cover",
    title: "Printed & Woven Labels",
    href: "/products/labels",
    subtitle: "Broadloom, Twill & Satin Damask",
    description: "Custom woven labels offered in broadloom, needleloom, twill, taffeta, and satin damask with a massive selection of stock yarn colors and unique finishes tailored to brand specifications.",
    features: ["Broadloom & Needleloom", "Satin Damask & Taffeta", "Custom Brand Logos", "High-Definition Weaving"],
    badge: "High Demand",
  },
  {
    icon: QrCode,
    Art: RfidArt,
    title: "Security Tags & RFID",
    href: "/products",
    subtitle: "Source Tagging Solutions",
    description: "Advanced source tagging tags, security labels, and RFID encoding designed to streamline retail tracking, inventory control, and loss prevention.",
    features: ["RFID Integration", "EAS Security Tags", "SKU Barcode Encoding", "Automated Scanning"],
    badge: "Smart Tech",
  },
  {
    icon: Package,
    img: `${IMG}/packaging.webp`,
    alt: "Rigid retail shoe box with open lid",
    fit: "contain",
    title: "Specialty Packaging",
    href: "/products/paper-items",
    subtitle: "Hard Goods & Retail Boxes",
    description: "Custom rigid presentation boxes, transparent packaging for underwear/apparel, and specialized packaging solutions built for industry-leading retail hard goods.",
    features: ["Hard Goods Packaging", "Rigid Presentation Boxes", "Transparent Windows", "Premium Retail Finish"],
    badge: "Retail Ready",
  },
  {
    icon: Sparkles,
    img: `${IMG}/heat-transfer.webp`,
    alt: "Tagless heat transfer label being peeled from a t-shirt",
    fit: "cover",
    title: "Heat Transfer Labels",
    href: "/products/heat-transfer-labels",
    subtitle: "Tagless Comfort & Precision",
    description: "High-definition tagless heat transfer labels providing optimal skin comfort, vibrant multi-color graphics, and high durability against regular garment washing.",
    features: ["Tagless Comfort", "Wash-Resistant Print", "Vibrant Color Tones", "Soft Hand-Feel"],
    badge: "Popular",
  },
  {
    icon: Layers,
    img: `${IMG}/trims.webp`,
    alt: "Branded elastic waistbands and trims",
    fit: "cover",
    title: "Narrow Items & Trims",
    href: "/products/narrow-items",
    subtitle: "Collar Bands, Elastics & Ribbons",
    description: "Essential garment trims including collar bands, drawstrings, tissue papers, branded elastics, lock strings, and thermal transfer ribbons for smooth in-house production.",
    features: ["Branded Elastics", "Drawstrings & Tissues", "Collar Bands & Ribbons", "Lock Strings & Seals"],
    badge: "Complete Trim",
  },
]

const RING_TEXT = "Hangtags  ◆  Woven Labels  ◆  RFID & EAS Tags  ◆  Specialty Packaging  ◆  Heat Transfer Labels  ◆  Narrow Items & Trims  ◆  "
const TOUR_MS = 6500

/* ---------- stage (desktop) ---------- */

function Stage({ active, setActive, paused, auto }) {
  const ref = useRef(null)
  const [inViewRef, inView] = useInView(0.2)
  const n = productCategories.length

  const onMove = (e) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--px", "0")
    el.style.setProperty("--py", "0")
  }

  const item = productCategories[active]

  return (
    <div ref={inViewRef} className="mx-auto w-full" style={{ maxWidth: "min(100%, calc(100svh - 8rem))" }}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`prd-stage relative aspect-square w-full overflow-hidden rounded-[36px] bg-[#1B1718] ${inView ? "prd-stage-in" : ""}`}
      >
        {/* glow */}
        <div className="prd-glow pointer-events-none absolute inset-0" />

        {/* rings: thick/thin pairs like the logo */}
        <svg viewBox="0 0 600 600" className="prd-rings pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <defs>
            <path id="prdTextPath" d="M300 300 m-252 0 a252 252 0 1 1 504 0 a252 252 0 1 1 -504 0" />
          </defs>
          <g stroke="#635C5E">
            <circle cx="300" cy="300" r="156" strokeWidth="7" />
            <circle cx="300" cy="300" r="182" strokeWidth="2" />
            <circle cx="300" cy="300" r="210" strokeWidth="11" strokeOpacity=".75" />
            <circle cx="300" cy="300" r="232" strokeWidth="2" strokeOpacity=".8" />
          </g>
          <g className="prd-spin-rev" stroke="#635C5E" strokeOpacity=".7">
            <circle cx="300" cy="300" r="278" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
          </g>
          <g className="prd-orbit">
            <circle cx="300" cy="90" r="6" fill="#E01C24" />
            <circle cx="300" cy="90" r="14" stroke="#E01C24" strokeOpacity=".35" strokeWidth="1.5" />
          </g>
          <g className="prd-spin-slow">
            <text fill="#9A9294" fontSize="12.5" fontWeight="600" letterSpacing="2">
              <textPath href="#prdTextPath" textLength="1570" lengthAdjust="spacing">{RING_TEXT}</textPath>
            </text>
          </g>
        </svg>

        {/* pulse emitted on every change */}
        <span key={`p1-${active}`} className="prd-pulse pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[45%] rounded-full border-2 border-[#E01C24]" />
        <span key={`p2-${active}`} className="prd-pulse pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[45%] rounded-full border border-white/60" style={{ animationDelay: ".22s" }} />

        {/* product plates */}
        {productCategories.map((p, i) => (
          <div
            key={p.title}
            aria-hidden="true"
            className={`prd-plate absolute left-1/2 top-1/2 aspect-square w-[45%] overflow-hidden rounded-full bg-white ${i === active ? "prd-plate-on" : ""}`}
          >
            <PlateInner item={p} />
          </div>
        ))}

        {/* progress / tour */}
        <div className="absolute inset-x-6 top-6 z-10 flex gap-2 sm:inset-x-8 sm:top-8">
          {productCategories.map((p, i) => (
            <div key={p.title} role="presentation" onClick={() => setActive(i)} className="group/seg flex h-6 flex-1 cursor-pointer items-center">
              <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/20 transition-[height] duration-300 group-hover/seg:h-[5px]">
                <span
                  key={i === active ? `a-${active}-${auto}` : `s-${i}`}
                  className={`absolute inset-0 origin-left rounded-full ${i < active ? "bg-white/70" : "bg-[#E01C24]"} ${i > active ? "scale-x-0" : ""} ${i === active && auto ? "prd-prog" : ""} ${paused ? "prd-paused" : ""}`}
                  style={{ "--tour": `${TOUR_MS}ms` }}
                  onAnimationEnd={(e) => {
                    if (i === active && e.animationName === "prdProg") setActive((active + 1) % n)
                  }}
                />
              </span>
            </div>
          ))}
        </div>

        {/* caption */}
        <div key={`c-${active}`} className="prd-caption absolute inset-x-6 bottom-6 z-10 flex flex-col items-start gap-3 sm:inset-x-8 sm:bottom-8">
          <span className="rounded-full bg-[#BFE6D6] px-3 py-1 text-xs font-bold text-[#1B1718]">{item.badge}</span>
          <p className="max-w-[80%] text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl xl:text-[1.75rem]">{item.title}</p>
        </div>
      </div>
    </div>
  )
}

/* ---------- section ---------- */

export default function Products() {
  const [active, setActive] = useState(0)
  const [hold, setHold] = useState(false)
  const sectionRef = useRef(null)
  const visible = useVisible(sectionRef)
  const isLg = useMedia("(min-width: 1024px)")
  const reduced = useMedia("(prefers-reduced-motion: reduce)")
  const [listRef, listIn] = useInView(0.1)

  const auto = isLg && visible && !reduced
  const pick = useCallback((i) => setActive(i), [])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full overflow-x-clip bg-[#F2F3F3] py-16 text-[#1B1718] sm:py-24 lg:py-28"
      style={{ "--serif": '"Instrument Serif", "Cormorant Garamond", Georgia, "Times New Roman", serif' }}
    >
      {/* big ripple rings, the logo's motif, bleeding off the corner */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 800 800" fill="none" className="prd-breathe absolute -right-72 -top-72 h-[800px] w-[800px] text-[#635C5E] opacity-[.16]" stroke="currentColor">
          {[120, 170, 230, 290, 360].map((r, i) => (
            <circle key={r} cx="400" cy="400" r={r} strokeWidth={i % 2 ? 2 : 9} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-3 text-sm font-semibold text-[#635C5E]">
              <RingMark on size={26} />
              Products &amp; Services
              <span className="h-px w-12 bg-[#635C5E]/40" />
            </span>
            <h2 className="mt-6 text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl xl:text-[4.4rem]">
              <Words text="Comprehensive Private Label" />
              <Words text="Branding & Accessories Portfolio" start={3} className="prd-serif font-normal italic tracking-[-0.01em] text-[#635C5E]" />
            </h2>
          </div>
          <p className="prd-fade max-w-md text-base leading-relaxed text-[#1B1718]/70 sm:text-lg lg:col-span-4 lg:pb-2">
            We offer a wide range of products to help you design brand labeling, high-speed offset printing, and specialty packaging that meets the unique needs of your organization.
          </p>
        </div>

        {/* index + stage */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <ul
            ref={listRef}
            className="border-b border-[#1B1718]/15 lg:col-span-5"
            onMouseEnter={() => setHold(true)}
            onMouseLeave={() => setHold(false)}
            onFocus={() => setHold(true)}
            onBlur={() => setHold(false)}
          >
            {productCategories.map((item, i) => {
              const on = active === i
              const Icon = item.icon
              return (
                <li
                  key={item.title}
                  className={`prd-row border-t border-[#1B1718]/15 ${listIn ? "prd-row-in" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`prd-body-${i}`}
                    onClick={() => pick(i)}
                    className="group flex w-full items-center gap-4 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E01C24] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F3F3] sm:py-6"
                  >
                    <RingMark on={on} />
                    <span
                      className={`flex-1 text-[1.4rem] font-semibold leading-tight tracking-tight transition-colors duration-500 sm:text-3xl ${
                        on ? "text-[#1B1718]" : "text-[#1B1718]/35 group-hover:text-[#1B1718]/75"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? "border-[#E01C24] bg-[#E01C24] text-white" : "border-[#1B1718]/20 text-[#1B1718]/50 group-hover:border-[#1B1718]/50"}`}>
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                  </button>

                  <div
                    id={`prd-body-${i}`}
                    className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className={`flex flex-col gap-6 pb-8 transition-[opacity,visibility] duration-500 sm:pl-[44px] md:flex-row md:items-center lg:flex-col lg:items-start ${on ? "visible opacity-100" : "invisible opacity-0"}`}>
                        {/* thumbnail for tablet/mobile, where the stage is hidden */}
                        <div className="relative m-5 w-44 shrink-0 sm:w-52 lg:hidden">
                          <span className="absolute -inset-3 rounded-full border border-[#635C5E]/40" />
                          <span className="absolute -inset-5 rounded-full border-[5px] border-[#635C5E]/15" />
                          <div className="relative aspect-square overflow-hidden rounded-full bg-white ring-1 ring-[#1B1718]/10">
                            <PlateInner item={item} />
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-bold text-[#E01C24]">{item.subtitle}</p>
                          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#1B1718]/70">{item.description}</p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {item.features.map((f) => (
                              <li key={f} className="rounded-full bg-[#BFE6D6] px-3 py-1.5 text-xs font-semibold text-[#1B1718]">
                                {f}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={item.href}
                            className="prd-link group/l mt-6 inline-flex items-center gap-3 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E01C24]"
                          >
                            <span className="prd-underline">Explore Products</span>
                            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1B1718] text-white transition-all duration-300 group-hover/l:translate-x-1 group-hover/l:bg-[#E01C24]">
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div
            className="hidden lg:col-span-7 lg:block lg:self-start lg:sticky lg:top-24"
            onMouseEnter={() => setHold(true)}
            onMouseLeave={() => setHold(false)}
          >
            <Stage active={active} setActive={pick} paused={hold} auto={auto} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-[#1B1718]/15 pt-10 sm:mt-24 md:flex-row md:items-center">
          <div className="flex items-center gap-5 sm:gap-7">
            <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" fill="none" aria-hidden="true">
              <circle cx="50" cy="50" r="47" stroke="#635C5E" strokeWidth="1.2" className="prd-spin-slow" strokeDasharray="2 5" strokeLinecap="round" />
              <circle cx="50" cy="50" r="38" stroke="#635C5E" strokeWidth="5" />
              <circle cx="50" cy="50" r="28" stroke="#635C5E" strokeWidth="1.2" />
              <text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="700" fill="#E01C24" fontStyle="italic" fontFamily="Georgia, serif">72h</text>
            </svg>
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">Looking for Custom Program Requirements?</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1B1718]/65 sm:text-base">
                We deliver the most cost-effective private branding program in the market with 72-hour standard turnarounds.
              </p>
            </div>
          </div>

          <a
            href="/contact"
            className="prd-cta group relative inline-flex shrink-0 items-center gap-4 overflow-hidden rounded-full bg-[#1B1718] py-2 pl-8 pr-2 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E01C24]"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-[#E01C24] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
            <span className="relative">Request Pricing &amp; Samples</span>
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-white text-[#1B1718] transition-transform duration-500 group-hover:rotate-[-45deg]">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .prd-serif { font-family: var(--serif); }

        .prd-word { transform: translateY(112%); transition: transform 1s cubic-bezier(.22,1,.36,1); }
        .prd-word-in { transform: none; }

        .prd-fade { animation: prdFade 1s .5s both cubic-bezier(.22,1,.36,1); }
        .prd-row { opacity: 0; transform: translateY(22px); transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1); }
        .prd-row-in { opacity: 1; transform: none; }

        /* ring mark */
        .prd-mark { stroke: #635C5E; stroke-opacity: .55; transition: stroke .5s ease, stroke-opacity .5s ease; }
        .prd-mark-dot { fill: #635C5E; transition: fill .5s ease; }
        .prd-mark-on { stroke: #E01C24; stroke-opacity: 1; }
        .prd-mark-on .prd-mark-dot { fill: #E01C24; }
        .prd-mark-on circle:nth-child(2) { transform-origin: 16px 16px; animation: prdMarkPulse 2.4s ease-in-out infinite; }

        /* stage */
        .prd-stage { clip-path: circle(0% at 50% 50%); }
        .prd-stage-in { animation: prdStageIn 1.5s cubic-bezier(.22,1,.36,1) forwards; }
        .prd-stage { --px: 0; --py: 0; }
        .prd-glow { background: radial-gradient(circle at 50% 50%, rgba(224,28,36,.30), transparent 46%); animation: prdBreatheGlow 6s ease-in-out infinite; }
        .prd-rings { transform: translate(calc(var(--px) * -9px), calc(var(--py) * -9px)); transition: transform 1.1s cubic-bezier(.22,1,.36,1); }

        .prd-plate { transform: translate(-50%,-50%) translate(calc(var(--px) * 16px), calc(var(--py) * 16px)) scale(.84); opacity: 0;
          box-shadow: 0 40px 90px -30px rgba(0,0,0,.9);
          transition: opacity .7s ease, transform 1s cubic-bezier(.22,1,.36,1); }
        .prd-plate-on { opacity: 1; transform: translate(-50%,-50%) translate(calc(var(--px) * 16px), calc(var(--py) * 16px)) scale(1); }
        .prd-plate > * { clip-path: circle(0% at 50% 50%); transition: clip-path 1.1s cubic-bezier(.22,1,.36,1); }
        .prd-plate-on > * { clip-path: circle(72% at 50% 50%); }

        .prd-pulse { transform: translate(-50%,-50%) scale(1); opacity: 0; animation: prdPulse 1.6s cubic-bezier(.22,1,.36,1) both; }
        .prd-caption { animation: prdCaption .8s .12s cubic-bezier(.22,1,.36,1) both; }

        .prd-prog { animation: prdProg var(--tour) linear forwards; }
        .prd-paused { animation-play-state: paused; }

        .prd-orbit { transform-origin: 300px 300px; animation: prdSpin 16s linear infinite; }
        .prd-spin-slow { transform-origin: 300px 300px; animation: prdSpin 90s linear infinite; }
        .prd-spin-rev { transform-origin: 300px 300px; animation: prdSpin 60s linear infinite reverse; }
        .prd-breathe { animation: prdBreathe 9s ease-in-out infinite; }
        .prd-wave { animation: prdWave 1.8s ease-in-out infinite; opacity: .2; }

        /* link underline */
        .prd-underline { background: linear-gradient(currentColor,currentColor) 0 100% / 0 2px no-repeat; padding-bottom: 3px; transition: background-size .5s cubic-bezier(.22,1,.36,1); }
        .prd-link:hover .prd-underline { background-size: 100% 2px; }

        @keyframes prdFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes prdStageIn { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(75% at 50% 50%); } }
        @keyframes prdPulse { 0% { opacity: .9; transform: translate(-50%,-50%) scale(1); } 100% { opacity: 0; transform: translate(-50%,-50%) scale(2.1); } }
        @keyframes prdCaption { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes prdProg { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes prdSpin { to { transform: rotate(360deg); } }
        @keyframes prdBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes prdBreatheGlow { 0%,100% { opacity: .75; } 50% { opacity: 1; } }
        @keyframes prdWave { 0%,100% { opacity: .15; } 50% { opacity: 1; } }
        @keyframes prdMarkPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.14); } }

        @media (prefers-reduced-motion: reduce) {
          .prd-word { transform: none !important; transition: none !important; }
          .prd-row { opacity: 1 !important; transform: none !important; transition: none !important; }
          .prd-fade, .prd-pulse, .prd-caption, .prd-orbit, .prd-spin-slow, .prd-spin-rev, .prd-breathe, .prd-glow, .prd-wave, .prd-mark-on circle { animation: none !important; }
          .prd-stage { clip-path: none !important; animation: none !important; }
          .prd-plate, .prd-rings, .prd-plate > * { transition: none !important; }
          .prd-pulse { opacity: 0 !important; }
          .prd-wave { opacity: 1 !important; }
        }
      `}</style>
    </section>
  )
}