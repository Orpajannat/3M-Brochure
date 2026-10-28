"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Award,
  Globe2,
  Target,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Hooks & small helpers                                              */
/* ------------------------------------------------------------------ */

// Fires once when the element scrolls into view
function useInView(threshold = 0.15) {
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

// Counts from `from` to `to` once `active` becomes true
function useCountUp(to, active, { from = 0, duration = 1800 } = {}) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!active) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, from, duration]);

  return value;
}

// Scroll-reveal wrapper with stagger delay
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

// Writes the cursor position into CSS variables for spotlight effects
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

const milestones = [
  {
    year: "1988",
    title: "Establishment in Canada",
    description:
      "Founded in Canada with a vision to deliver world-class apparel accessories and private labeling solutions.",
    icon: Building2,
    accent: "from-rose-500/10 to-red-500/5",
  },
  {
    year: "Global Hubs",
    title: "Label Bank Asia Synergy",
    description:
      "Operates as a key sister concern of Label Bank Asia, expanding manufacturing hubs across Bangladesh and Thailand.",
    icon: Globe2,
    accent: "from-rose-500/10 to-pink-500/5",
  },
  {
    year: "Core Mission",
    title: "Commitment to Excellence",
    description:
      'Driven by a clear operational principle: "Our mission is not to be the biggest in this business, simply the best!"',
    icon: Target,
    accent: "from-red-500/10 to-rose-600/5",
  },
];

const ticker = [
  "Garment Accessories",
  "Thermal Branding Labels",
  "Offset Swing Tickets",
  "Retail Packaging",
  "Source Tagging",
  "EDI Integration",
  "Private Labeling",
  "Precision Quality Control",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CompanyStory() {
  // Dark card: tilt + counters
  const [cardRef, cardInView] = useInView(0.3);
  const year = useCountUp(1988, cardInView, { from: 1900, duration: 1800 });
  const hours = useCountUp(72, cardInView, { from: 0, duration: 1600 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
    trackSpotlight(e);
  };

  return (
    <section
      id="company-story"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white py-16 sm:py-24 lg:py-32 text-slate-800"
    >
      {/* Keyframes live here so no tailwind.config changes are needed */}
      <style>{`
        @keyframes cs-drift-a { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(60px,-40px) scale(1.15);} }
        @keyframes cs-drift-b { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-70px,50px) scale(1.2);} }
        @keyframes cs-float { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-14px);} }
        @keyframes cs-rise { 0% { transform: translateY(0) scale(1); opacity: 0;} 15% { opacity: .8;} 100% { transform: translateY(-260px) scale(.4); opacity: 0;} }
        @keyframes cs-shimmer-text { 0% { background-position: 0% 50%;} 100% { background-position: 200% 50%;} }
        @keyframes cs-marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }
        @keyframes cs-spin { to { transform: rotate(360deg);} }
        @keyframes cs-travel { 0% { left: 0; opacity: 0;} 10% { opacity: 1;} 90% { opacity: 1;} 100% { left: 100%; opacity: 0;} }
        @keyframes cs-wiggle { 0%,100% { transform: rotate(0) scale(1.1);} 25% { transform: rotate(-10deg) scale(1.15);} 75% { transform: rotate(10deg) scale(1.15);} }
        @keyframes cs-ring { 0% { transform: scale(.9); opacity: .6;} 100% { transform: scale(1.8); opacity: 0;} }

        .cs-drift-a { animation: cs-drift-a 16s ease-in-out infinite; }
        .cs-drift-b { animation: cs-drift-b 20s ease-in-out infinite; }
        .cs-float { animation: cs-float 6s ease-in-out infinite; }
        .cs-rise { animation: cs-rise 7s ease-in infinite; }
        .cs-shimmer-text { background-size: 200% auto; animation: cs-shimmer-text 5s linear infinite; }
        .cs-marquee { animation: cs-marquee 32s linear infinite; }
        .cs-marquee-wrap:hover .cs-marquee { animation-play-state: paused; }
        .cs-spin { animation: cs-spin 6s linear infinite; }
        .cs-travel { animation: cs-travel 5s ease-in-out infinite; }
        .cs-ring { animation: cs-ring 2.4s ease-out infinite; }
        .group:hover .cs-wiggle { animation: cs-wiggle .6s ease-in-out; }

        @media (prefers-reduced-motion: reduce) {
          .cs-drift-a, .cs-drift-b, .cs-float, .cs-rise, .cs-shimmer-text,
          .cs-marquee, .cs-spin, .cs-travel, .cs-ring { animation: none !important; }
          .group:hover .cs-wiggle { animation: none !important; }
        }
      `}</style>

      {/* ---------- Ambient background ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(244,63,94,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,63,94,0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="cs-drift-a pointer-events-none absolute top-1/4 -left-28 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-rose-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="cs-drift-b pointer-events-none absolute bottom-1/4 -right-28 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-red-200/50 blur-3xl"
      />
      {/* Rising particles */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-72 hidden sm:block">
        {[8, 22, 37, 52, 66, 81, 93].map((left, i) => (
          <span
            key={left}
            className="cs-rise absolute bottom-0 h-1.5 w-1.5 rounded-full bg-rose-400/70"
            style={{ left: `${left}%`, animationDelay: `${i * 1.1}s`, animationDuration: `${6 + (i % 3)}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============ Top grid ============ */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Left column ---------- */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2.5 self-start rounded-full border border-rose-200/80 bg-rose-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 shadow-sm backdrop-blur-md transition-transform duration-300 hover:scale-105">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-600" />
                </span>
                <span>Our Legacy &amp; Heritage</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Over 3 Decades of <br className="hidden sm:inline" />
                <span className="cs-shimmer-text bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 bg-clip-text text-transparent">
                  Global Branding Leadership
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 text-sm font-normal leading-relaxed text-slate-600 sm:text-base lg:text-lg">
                Established in Canada in 1988, 3M Label Limited has grown into a premier multinational
                manufacturer and global supplier of high-grade garment accessories, thermal branding
                labels, offset swing tickets, and specialized retail packaging.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-3.5 text-xs leading-relaxed text-slate-600 sm:text-sm lg:text-base">
                As a core sister concern of{" "}
                <strong className="font-semibold text-slate-900">Label Bank Asia</strong>, we provide
                seamless source-tagging infrastructure, EDI integration, and precision quality control
                tailored to the world’s leading fashion retailers and private label brands.
              </p>
            </Reveal>

            {/* Moving ticker */}
            <Reveal delay={350}>
              <div className="cs-marquee-wrap relative mt-7 overflow-hidden rounded-2xl border border-rose-100 bg-white/70 py-3 backdrop-blur [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <div className="cs-marquee flex w-max items-center gap-3 pr-3">
                  {[...ticker, ...ticker].map((t, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-rose-100 bg-rose-50/70 px-3.5 py-1.5 text-xs font-semibold text-rose-700 transition-colors duration-300 hover:bg-rose-600 hover:text-white sm:text-[13px]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Mission card with rotating conic border + spotlight */}
            <Reveal delay={450}>
              <div className="group relative mt-8 overflow-hidden rounded-3xl p-[1.5px] shadow-lg shadow-rose-950/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-950/15">
                {/* spinning gradient border */}
                <div
                  aria-hidden
                  className="cs-spin absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 [background:conic-gradient(from_0deg,transparent_0deg,#f43f5e_70deg,transparent_140deg,transparent_220deg,#ef4444_290deg,transparent_360deg)]"
                  style={{ transformOrigin: "center" }}
                />
                <div
                  onMouseMove={trackSpotlight}
                  className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-rose-50 via-white to-white p-6 sm:p-7"
                >
                  {/* spotlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={spotlightBg}
                  />
                  {/* shimmer sweep */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/70 to-white/0 transition-transform duration-1000 group-hover:translate-x-full"
                  />

                  <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                    <div className="relative flex-shrink-0">
                      <span aria-hidden className="cs-ring absolute inset-0 rounded-2xl bg-rose-500/40" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 sm:h-14 sm:w-14">
                        <Award className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-600">
                        <Sparkles className="h-3.5 w-3.5 transition-transform duration-700 group-hover:rotate-180" />
                        Core Corporate Philosophy
                      </span>
                      <blockquote className="mt-1 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                        &ldquo;Our mission is not to be the biggest in this business, simply the best!&rdquo;
                      </blockquote>
                      <p className="mt-1.5 text-xs text-slate-600 sm:text-sm">
                        We invite brand managers to compare our service quality, speed, and competitive
                        pricing structures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- Right column: dark tilt card ---------- */}
          <div className="lg:col-span-5">
            <Reveal direction="right" delay={200}>
              <div className="cs-float mx-auto max-w-xl lg:max-w-none" style={{ perspective: "1200px" }}>
                <div
                  ref={cardRef}
                  onMouseMove={handleTilt}
                  onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-rose-900/60 bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900 p-6 text-white shadow-2xl shadow-rose-950/30 transition-transform duration-200 ease-out sm:p-9"
                >
                  {/* internal orbs */}
                  <div aria-hidden className="cs-drift-a pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-600/30 blur-3xl" />
                  <div aria-hidden className="cs-drift-b pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />
                  {/* cursor spotlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(251,113,133,0.18), transparent 70%)",
                    }}
                  />

                  {/* Header */}
                  <div className="relative z-10 mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-rose-900/70 pb-5 sm:mb-8">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-600/20 text-rose-400">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        Key Highlights
                      </h3>
                    </div>
                    <span className="rounded-full border border-rose-500/30 bg-rose-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-300">
                      Global Scale
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="relative z-10 space-y-4 sm:space-y-5">
                    {[
                      {
                        value: year,
                        label: "Established in Canada",
                        icon: ShieldCheck,
                      },
                      {
                        value: `${hours} Hours`,
                        label: "Standard Dispatch Turnaround",
                        icon: Zap,
                      },
                      {
                        value: "Label Bank Asia",
                        label: "Multinational Sister Concern",
                        icon: Globe2,
                      },
                    ].map((row, i) => {
                      const RowIcon = row.icon;
                      return (
                        <div
                          key={row.label}
                          style={{
                            transitionDelay: `${cardInView ? 300 + i * 150 : 0}ms`,
                          }}
                          className={`group/row relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-all duration-700 hover:translate-x-1 hover:border-rose-400/40 hover:bg-white/10 ${
                            cardInView ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                          }`}
                        >
                          {/* left accent bar grows on hover */}
                          <span
                            aria-hidden
                            className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-rose-400 transition-transform duration-300 group-hover/row:scale-y-100"
                          />
                          <div className="min-w-0">
                            <p className="break-words text-2xl font-black leading-tight tabular-nums tracking-tight text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                              {row.value}
                            </p>
                            <p className="mt-0.5 text-xs font-medium text-rose-200">{row.label}</p>
                          </div>
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 transition-all duration-300 group-hover/row:bg-rose-500 group-hover/row:text-white">
                            <RowIcon className="cs-wiggle h-5 w-5" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 mt-7 border-t border-rose-900/80 pt-6 sm:mt-8">
                    <a
                      href="#contact"
                      className="group/cta relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-rose-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all duration-300 hover:scale-[1.02] hover:bg-rose-500 hover:shadow-rose-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 active:scale-[0.98] sm:text-sm"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
                      />
                      <span className="relative">Connect With Our Regional Teams</span>
                      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ============ Milestones ============ */}
        <div className="relative mt-16 sm:mt-20 lg:mt-24">
          {/* Connecting line with travelling dot (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[56px] z-0 hidden h-px border-t-2 border-dashed border-rose-200 md:block"
          >
            <span className="cs-travel absolute -top-[7px] h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_14px_4px_rgba(244,63,94,0.55)]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 150} className="h-full">
                  <div
                    onMouseMove={trackSpotlight}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-950/10 sm:p-8"
                  >
                    {/* accent back-glow */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                    {/* cursor spotlight */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={spotlightBg}
                    />
                    {/* top progress bar fills on hover */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-rose-500 to-red-500 transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />

                    <div className="relative z-10">
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-rose-600 group-hover:text-white">
                          <Icon className="cs-wiggle h-6 w-6" />
                        </div>
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 transition-colors group-hover:border-rose-200 group-hover:bg-rose-50 group-hover:text-rose-700">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-rose-600">
                        {item.title}
                      </h3>

                      <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-rose-600">
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        Explore Milestone
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white">
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
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