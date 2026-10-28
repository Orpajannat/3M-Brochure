"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  Target,
  Award,
  Zap,
  BadgeDollarSign,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "", direction = "up" }) {
  const [ref, inView] = useInView();
  const from =
    direction === "left"
      ? "-translate-x-8"
      : direction === "right"
      ? "translate-x-8"
      : "translate-y-8";
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${from}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

const trackSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const spotlightBg = {
  background:
    "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(244,63,94,0.16), transparent 70%)",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    title: "Service Quality",
    description:
      "Precision quality control on every garment accessory, thermal label, swing ticket and retail pack we ship.",
    icon: ShieldCheck,
    accent: "from-rose-500/10 to-red-500/5",
  },
  {
    title: "Speed",
    description:
      "A standard dispatch turnaround of 72 hours, backed by source-tagging infrastructure and EDI integration.",
    icon: Zap,
    accent: "from-rose-500/10 to-pink-500/5",
  },
  {
    title: "Competitive Pricing",
    description:
      "Manufacturing hubs across Bangladesh and Thailand keep our pricing structures competitive for brand managers.",
    icon: BadgeDollarSign,
    accent: "from-red-500/10 to-rose-600/5",
  },
];

const STATEMENT = "Our mission is not to be the biggest in this business, simply the best!";
const HIGHLIGHT_FROM = 10; // index of the word where the gradient starts ("simply")

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Mission() {
  const [quoteRef, quoteInView] = useInView(0.35);
  const words = STATEMENT.split(" ");

  return (
    <section
      id="mission"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-rose-50/40 to-white py-16 sm:py-24 lg:py-32 text-slate-800"
    >
      <style>{`
        @keyframes ms-drift-a { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(50px,-30px) scale(1.15);} }
        @keyframes ms-drift-b { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-60px,40px) scale(1.2);} }
        @keyframes ms-spin { to { transform: rotate(360deg);} }
        @keyframes ms-spin-rev { to { transform: rotate(-360deg);} }
        @keyframes ms-pulse-ring { 0% { transform: scale(.85); opacity: .55;} 100% { transform: scale(1.9); opacity: 0;} }
        @keyframes ms-shimmer-text { 0% { background-position: 0% 50%;} 100% { background-position: 200% 50%;} }
        @keyframes ms-wiggle { 0%,100% { transform: rotate(0) scale(1.1);} 25% { transform: rotate(-10deg) scale(1.15);} 75% { transform: rotate(10deg) scale(1.15);} }
        @keyframes ms-slide { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }

        .ms-drift-a { animation: ms-drift-a 16s ease-in-out infinite; }
        .ms-drift-b { animation: ms-drift-b 20s ease-in-out infinite; }
        .ms-orbit { animation: ms-spin var(--dur, 24s) linear infinite; animation-delay: var(--delay, 0s); }
        .ms-orbit-counter { animation: ms-spin-rev var(--dur, 24s) linear infinite; animation-delay: var(--delay, 0s); }
        .ms-orbit-slow { animation: ms-spin 60s linear infinite; }
        .ms-ring { animation: ms-pulse-ring 2.6s ease-out infinite; }
        .ms-shimmer-text { background-size: 200% auto; animation: ms-shimmer-text 5s linear infinite; }
        .ms-line { animation: ms-slide 3.5s ease-in-out infinite; }
        .group:hover .ms-wiggle { animation: ms-wiggle .6s ease-in-out; }

        @media (prefers-reduced-motion: reduce) {
          .ms-drift-a, .ms-drift-b, .ms-orbit, .ms-orbit-counter, .ms-orbit-slow,
          .ms-ring, .ms-shimmer-text, .ms-line { animation: none !important; }
          .group:hover .ms-wiggle { animation: none !important; }
        }
      `}</style>

      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(244,63,94,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,63,94,0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div aria-hidden className="ms-drift-a pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl sm:h-96 sm:w-96" />
      <div aria-hidden className="ms-drift-b pointer-events-none absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-red-200/50 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============ Statement + orbit ============ */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-rose-200/80 bg-rose-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 shadow-sm backdrop-blur-md transition-transform duration-300 hover:scale-105">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-600" />
                </span>
                <span>Our Mission</span>
              </div>
            </Reveal>

            {/* Word-by-word reveal: the one orchestrated moment on this section */}
            <h2
              ref={quoteRef}
              className="text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              aria-label={STATEMENT}
            >
              {words.map((w, i) => {
                const highlighted = i >= HIGHLIGHT_FROM;
                return (
                  <span
                    key={i}
                    aria-hidden
                    style={{ transitionDelay: `${quoteInView ? i * 70 : 0}ms` }}
                    className={`mr-[0.25em] inline-block transition-all duration-700 ease-out ${
                      quoteInView ? "translate-y-0 opacity-100 blur-0" : "translate-y-5 opacity-0 blur-sm"
                    } ${
                      highlighted
                        ? "ms-shimmer-text bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {w}
                  </span>
                );
              })}
            </h2>

            <Reveal delay={400}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
                We don’t measure ourselves by size. We measure ourselves by the service quality, speed
                and pricing that brand managers can compare for themselves.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <a
                href="#contact"
                className="group/cta relative mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-rose-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all duration-300 hover:scale-[1.02] hover:bg-rose-500 hover:shadow-rose-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 active:scale-[0.98] sm:text-sm"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
                />
                <span className="relative">Compare Our Service</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
              </a>
            </Reveal>
          </div>

          {/* Right: orbit visual */}
          <div className="lg:col-span-5">
            <Reveal direction="right" delay={200}>
              <div className="relative mx-auto aspect-square w-[calc(100%-3rem)] max-w-[272px] sm:max-w-[352px]">
                {/* rings */}
                <div className="ms-orbit-slow absolute inset-0 rounded-full border-2 border-dashed border-rose-200" />
                <div className="absolute inset-[14%] rounded-full border border-rose-200/80" />
                <div className="absolute inset-[30%] rounded-full border border-rose-100" />

                {/* orbiting icons: 3 evenly spaced on the outer ring */}
                {[
                  { Icon: Award, delay: "0s" },
                  { Icon: Zap, delay: "-8s" },
                  { Icon: ShieldCheck, delay: "-16s" },
                ].map(({ Icon, delay }, i) => (
                  <div
                    key={i}
                    className="ms-orbit absolute inset-0"
                    style={{ "--dur": "24s", "--delay": delay }}
                  >
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <div className="ms-orbit-counter" style={{ "--dur": "24s", "--delay": delay }}>
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-100 bg-white text-rose-600 shadow-lg shadow-rose-950/10 transition-all duration-300 hover:scale-110 hover:bg-rose-600 hover:text-white sm:h-12 sm:w-12">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="group relative">
                    <span aria-hidden className="ms-ring absolute inset-0 rounded-3xl bg-rose-500/40" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-600 to-red-600 text-white shadow-2xl shadow-rose-600/40 transition-transform duration-500 hover:scale-110 hover:rotate-6 sm:h-28 sm:w-28">
                      <Target className="h-11 w-11 sm:h-12 sm:w-12" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ============ Pillars ============ */}
        <div className="relative mt-16 sm:mt-20 lg:mt-24">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <Sparkles className="h-5 w-5 flex-shrink-0 text-rose-600" />
              <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                What we ask you to compare
              </h3>
              <div className="relative ml-2 hidden h-px flex-1 overflow-hidden bg-rose-100 sm:block">
                <span className="ms-line absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 150} className="h-full">
                  <div
                    onMouseMove={trackSpotlight}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-950/10 sm:p-8"
                  >
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={spotlightBg}
                    />
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-rose-500 to-red-500 transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />

                    <div className="relative z-10">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-rose-600 group-hover:text-white">
                        <Icon className="ms-wiggle h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-rose-600">
                        {item.title}
                      </h4>
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}