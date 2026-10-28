"use client"
import { useEffect, useRef, useSyncExternalStore } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUp, ChevronRight, Globe, Mail, MapPin, Phone } from "lucide-react"

/* ---------- small animation helpers ---------- */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!element || media.matches || !("IntersectionObserver" in window)) return
    if (element.getBoundingClientRect().top < window.innerHeight) return

    element.setAttribute("data-ft-pending", "true")
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      element.setAttribute("data-ft-visible", "true")
      observer.disconnect()
    }, { threshold: 0.08 })
    observer.observe(element)

    function revealWithoutMotion() {
      if (!media.matches) return
      element.setAttribute("data-ft-visible", "true")
      observer.disconnect()
    }
    media.addEventListener("change", revealWithoutMotion)
    return () => {
      observer.disconnect()
      media.removeEventListener("change", revealWithoutMotion)
      element.removeAttribute("data-ft-pending")
    }
  }, [])

  return (
    <div ref={ref} className={`ft-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ---------- data ---------- */

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Customers", href: "/#customers" },
  { name: "Contact Us", href: "/contact" },
]

const productLinks = [
  { name: "Labels", href: "/products/labels" },
  { name: "Heat Transfer Labels", href: "/products/heat-transfer-labels" },
  { name: "Paper Items", href: "/products/paper-items" },
  { name: "Narrow Items", href: "/products/narrow-items" },
  { name: "Poly Bags & Lock Strings", href: "/products/poly-bags-lock-strings" },
  { name: "Thermal Transfer Ribbons", href: "/products/thermal-transfer-ribbons" },
]

const offices = [
  {
    country: "Bangladesh",
    contact: "Md. Jahirul Islam, Country Manager",
    address: "Raju Plaza, Gouripur, Ashulia, Savar, Dhaka - 1341, Bangladesh",
    phones: [
      { label: "+88 01787 659 782", href: "tel:+8801787659782" },
      { label: "+88 01678 077 001", href: "tel:+8801678077001" },
    ],
    email: "jahirul@3mlabel.com",
  },
  {
    country: "Thailand",
    contact: "Siriporn Yawichai, 3M Label Thailand",
    address: "14/3 Moo 10, Tambon Buakkang, Amphur Sankamphang, Chiang Mai 50130, Thailand",
    phones: [{ label: "+66 8 9700 3695", href: "tel:+66897003695" }],
    email: "sy@labelbankasia.com",
  },
]

// Keep the browser clock out of prerendering and provide a stable hydration snapshot.
const subscribeToYear = () => () => {}
const getCurrentYear = () => new Date().getFullYear()
const getServerYear = () => null

/* ---------- footer ---------- */

export default function Footer() {
  const year = useSyncExternalStore(subscribeToYear, getCurrentYear, getServerYear)

  const scrollTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
  }

  return (
    <footer className="ft-footer relative w-full overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#1c1e25] to-[#101114] text-white/70">
      {/* animated accent line on top */}
      <div className="ft-line absolute left-0 right-0 top-0 h-[3px]" />

      {/* soft background glow */}
      <div className="ft-float pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#B92220]/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* brand */}
          <Reveal className="lg:col-span-4">
            <Link href="/" className="inline-block max-w-full">
              <span className="inline-block max-w-full rounded-xl px-3 py-2">
                <Image src="/image/Logo2.png" alt="3M Label Limited" width={912} height={273} sizes="267px" className="h-20 w-auto max-w-full object-contain" />
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Branding programs for leading retailers. A Canada-based multinational
              garment accessories manufacturer and supplier.
            </p>
            <a
              href="https://www.labelbankasia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff6b66]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:rotate-12 group-hover:bg-[#B92220] group-hover:text-white">
                <Globe aria-hidden="true" className="h-4 w-4" />
              </span>
              www.labelbankasia.com
            </a>
          </Reveal>

          {/* quick links */}
          <Reveal delay={120} className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h2>
            <nav aria-label="Footer quick links">
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="ft-link group inline-flex items-center gap-1 text-sm">
                      <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 -ml-1 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* products */}
          <Reveal delay={240} className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Products
            </h2>
            <nav aria-label="Footer products">
              <ul className="mt-5 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="ft-link group inline-flex items-center gap-1 text-sm">
                      <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 -ml-1 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* offices */}
          <Reveal delay={360} className="sm:col-span-2 lg:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Our Offices
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {offices.map((office) => (
                <div
                  key={office.country}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#B92220]/40 hover:shadow-lg hover:shadow-[#B92220]/10"
                >
                  <p className="text-base font-bold text-[#ff6b66]">{office.country}</p>
                  <p className="mt-1 text-xs font-medium text-white/50">{office.contact}</p>

                  <div className="mt-3 space-y-2 text-sm">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${office.address} (opens in Google Maps in a new tab)`}
                      className="ft-link flex items-start gap-2.5"
                    >
                      <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6b66]" />
                      <span className="leading-snug">{office.address}</span>
                    </a>
                    {office.phones.map((phone) => (
                      <a
                        key={phone.href}
                        href={phone.href}
                        className="ft-link flex items-center gap-2.5"
                      >
                        <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-[#ff6b66]" />
                        <span>{phone.label}</span>
                      </a>
                    ))}
                    <a
                      href={`mailto:${office.email}`}
                      className="ft-link flex items-center gap-2.5 break-all"
                    >
                      <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-[#ff6b66]" />
                      <span>{office.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* bottom bar */}
        <Reveal delay={200}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-white/55 sm:flex-row sm:text-left sm:text-sm">
            <p>&copy; {year} 3M Label Limited. All rights reserved.</p>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Back to top"
              className="group flex items-center gap-2 font-semibold text-white/80 transition-colors hover:text-[#ff6b66]"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#B92220] group-hover:bg-[#B92220] group-hover:text-white">
                <ArrowUp aria-hidden="true" className="h-4 w-4" />
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      <style>{`
        .ft-reveal {
          opacity: 1;
          transform: none;
          filter: none;
          transition: opacity .8s cubic-bezier(.22,1,.36,1),
                      transform .8s cubic-bezier(.22,1,.36,1),
                      filter .8s ease;
        }
        .ft-reveal[data-ft-pending="true"]:not([data-ft-visible="true"]) { opacity: 0; transform: translateY(40px); filter: blur(6px); }
        .ft-reveal:focus-within { opacity: 1 !important; transform: none !important; filter: none !important; }
        .ft-footer :is(a, button):focus-visible { outline: 2px solid #ff6b66; outline-offset: 4px; border-radius: 3px; }

        .ft-line {
          background: linear-gradient(90deg, #B92220, #ff6b66, #B92220);
          background-size: 200% 100%;
          animation: ftLine 4s linear infinite;
        }
        .ft-float { animation: ftFloat 10s ease-in-out infinite; }

        .ft-link { position: relative; color: rgba(255,255,255,.7); transition: color .3s ease; }
        .ft-link:hover { color: #ff6b66; }

        @keyframes ftLine  { to { background-position: -200% 0; } }
        @keyframes ftFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,30px) scale(1.12); } }

        @media (prefers-reduced-motion: reduce) {
          .ft-footer *, .ft-footer *::before, .ft-footer *::after { animation: none !important; transition: none !important; }
          .ft-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .ft-line, .ft-float { animation: none !important; }
        }
      `}</style>
    </footer>
  )
}