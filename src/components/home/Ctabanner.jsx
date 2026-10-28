"use client"
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Mail, Phone, Quote } from "lucide-react"

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
      className={`cta-reveal cta-${variant} ${inView ? "cta-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ---------- section ---------- */

export default function Ctabanner() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#B92220] via-[#a31d1b] to-[#7d1513] shadow-2xl shadow-[#B92220]/30">
            {/* decorative background */}
            <div className="cta-dots pointer-events-none absolute inset-0" />
            <div className="cta-float pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl sm:h-80 sm:w-80" />
            <div
              className="cta-float pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-rose-300/20 blur-2xl sm:h-80 sm:w-80"
              style={{ animationDelay: "-5s" }}
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
              {/* mission quote */}
              <div className="lg:col-span-7">
                <Reveal variant="left" delay={150}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                    <Quote className="h-7 w-7" />
                  </div>
                </Reveal>

                <Reveal variant="left" delay={250}>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-rose-200">
                    Our Mission
                  </p>
                </Reveal>

                <Reveal variant="left" delay={350}>
                  <h2 className="mt-3 text-2xl font-black leading-snug text-white sm:text-3xl lg:text-4xl">
                    To deliver the most cost effective branding programs in the world
                    for a select group of leading retailers.
                  </h2>
                </Reveal>

                <Reveal variant="left" delay={500}>
                  <p className="mt-5 text-lg font-semibold text-rose-100 sm:text-xl">
                    We do not aim to be the biggest in this business...{" "}
                    <span className="cta-shimmer font-black">simply the best.</span>
                  </p>
                </Reveal>
              </div>

              {/* call to action card */}
              <div className="lg:col-span-5">
                <Reveal variant="right" delay={300}>
                  <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md sm:p-8">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      Let&rsquo;s talk about your program
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-rose-100 sm:text-base">
                      Contact us today for a confidential review of your program
                      requirements.
                    </p>

                    <Link
                      href="/contact"
                      className="cta-btn group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#B92220] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                    >
                      <span className="relative z-10">Request a Quote</span>
                      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <div className="mt-6 flex flex-col gap-3 border-t border-white/20 pt-6 text-sm text-white">
                      <a
                        href="tel:+8801678077001"
                        className="group flex items-center gap-3 transition-colors hover:text-rose-200"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:scale-110">
                          <Phone className="h-4 w-4" />
                        </span>
                        <span>+88 01678 077 001</span>
                      </a>
                      <a
                        href="mailto:jahirul@3mlabel.com"
                        className="group flex items-center gap-3 break-all transition-colors hover:text-rose-200"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:scale-110">
                          <Mail className="h-4 w-4" />
                        </span>
                        <span>jahirul@3mlabel.com</span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .cta-reveal {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22,1,.36,1),
                      transform .9s cubic-bezier(.22,1,.36,1),
                      filter .9s ease;
        }
        .cta-up    { transform: translateY(50px) scale(.97); filter: blur(8px); }
        .cta-left  { transform: translateX(-60px); filter: blur(8px); }
        .cta-right { transform: translateX(60px); filter: blur(8px); }
        .cta-zoom  { transform: scale(.92); filter: blur(10px); }
        .cta-in    { opacity: 1; transform: none; filter: blur(0); }

        .cta-dots {
          background-image: radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px);
          background-size: 24px 24px;
          -webkit-mask-image: linear-gradient(135deg, #000, transparent 70%);
          mask-image: linear-gradient(135deg, #000, transparent 70%);
          animation: ctaDots 8s linear infinite;
        }

        .cta-float { animation: ctaFloat 10s ease-in-out infinite; }

        .cta-shimmer {
          background: linear-gradient(90deg, #fff 0%, #fecaca 40%, #fff 60%, #fff 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: ctaShimmer 3s linear infinite;
        }

        .cta-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -80%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(185,34,32,.18), transparent);
          transform: skewX(-20deg);
          animation: ctaSweep 3.2s ease-in-out infinite;
        }

        @keyframes ctaDots    { to { background-position: 24px 24px; } }
        @keyframes ctaFloat   { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-30px) scale(1.12); } }
        @keyframes ctaShimmer { to { background-position: -200% 0; } }
        @keyframes ctaSweep   { 0% { left: -80%; } 60%,100% { left: 140%; } }

        @media (prefers-reduced-motion: reduce) {
          .cta-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .cta-dots, .cta-float, .cta-shimmer, .cta-btn::after { animation: none !important; }
          .cta-shimmer { color: #fff; background: none; }
        }
      `}</style>
    </section>
  )
}