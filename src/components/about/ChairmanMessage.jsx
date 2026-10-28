"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  Quote,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
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

// 0 → 1 as the element scrolls through the viewport (drives the reading rail)
function useScrollProgress(ref) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const next = (vh * 0.75 - r.top) / r.height;
      setP(Math.max(0, Math.min(1, next)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return p;
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
        inView ? "opacity-100 translate-x-0 translate-y-0 blur-0" : `opacity-0 blur-sm ${from}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

const trackPointer = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const BARS = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 1, 4, 2, 1, 2, 3, 1, 2];
const CHECKS = [
  "Established in Canada (1988)",
  "Multinational Hubs in Bangladesh & Thailand",
  "Uncompromising Quality & 72-Hour Turnaround",
];
const SEAL_TEXT = "3M LABEL LIMITED • SINCE 1988 • LABEL BANK ASIA • ";
const BIG_TEXT = "SIMPLY THE BEST \u2022 SINCE 1988 \u2022 ";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ChairmanMessage() {
  const [tagRef, tagInView] = useInView(0.25);
  const [quoteRef, quoteInView] = useInView(0.5);
  const [signRef, signInView] = useInView(0.6);
  const paperRef = useRef(null);
  const progress = useScrollProgress(paperRef);

  return (
    <section
      id="chairman-message"
      className="relative w-full bg-white py-16 text-slate-800 [overflow:clip] sm:py-24 lg:py-32"
    >
      <style>{`
        @keyframes cm-drift-a { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(60px,-40px) scale(1.15);} }
        @keyframes cm-drift-b { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-70px,50px) scale(1.2);} }
        @keyframes cm-sway { 0%,100% { transform: rotate(calc(var(--amp, 1deg) * -1));} 50% { transform: rotate(var(--amp, 1deg));} }
        @keyframes cm-spin { to { transform: rotate(360deg);} }
        @keyframes cm-marquee-l { from { transform: translateX(0);} to { transform: translateX(-50%);} }
        @keyframes cm-marquee-r { from { transform: translateX(-50%);} to { transform: translateX(0);} }
        @keyframes cm-shimmer-text { 0% { background-position: 0% 50%;} 100% { background-position: 200% 50%;} }
        @keyframes cm-bar { 0%,100% { transform: scaleY(1);} 50% { transform: scaleY(.45);} }
        @keyframes cm-sheen { 0% { transform: translateX(-120%) skewX(-18deg);} 60%,100% { transform: translateX(260%) skewX(-18deg);} }
        @keyframes cm-bounce-soft { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-3px);} }

        .cm-drift-a { animation: cm-drift-a 16s ease-in-out infinite; }
        .cm-drift-b { animation: cm-drift-b 20s ease-in-out infinite; }
        .cm-sway { --amp: 1deg; transform-origin: 50% 0; animation: cm-sway 6s ease-in-out infinite; }
        @media (min-width: 640px) { .cm-sway { --amp: 2.5deg; } }
        .cm-sway-wrap:hover .cm-sway { animation-play-state: paused; }
        .cm-spin { animation: cm-spin 22s linear infinite; }
        .cm-marquee-l { animation: cm-marquee-l 40s linear infinite; }
        .cm-marquee-r { animation: cm-marquee-r 46s linear infinite; }
        .cm-shimmer-text { background-size: 200% auto; animation: cm-shimmer-text 5s linear infinite; }
        .cm-bar { transform-origin: bottom; animation: cm-bar 1.8s ease-in-out infinite; }
        .cm-sheen { animation: cm-sheen 6s ease-in-out infinite; }
        .cm-soft { animation: cm-bounce-soft 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .cm-drift-a, .cm-drift-b, .cm-sway, .cm-spin, .cm-marquee-l, .cm-marquee-r,
          .cm-shimmer-text, .cm-bar, .cm-sheen, .cm-soft { animation: none !important; }
        }
      `}</style>

      {/* ---------- Ambient background ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:radial-gradient(rgba(244,63,94,0.28)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />
      <div aria-hidden className="cm-drift-a pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-rose-100/70 blur-3xl sm:h-96 sm:w-96" />
      <div aria-hidden className="cm-drift-b pointer-events-none absolute -right-24 bottom-1/3 h-72 w-72 rounded-full bg-red-100/60 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============ Header ============ */}
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center sm:mb-16">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 shadow-sm transition-transform duration-300 hover:scale-105">
              <Sparkles className="cm-soft h-4 w-4 flex-shrink-0 text-rose-600" />
              <span>Leadership &amp; Vision</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              A Message From Our <br className="hidden sm:inline" />
              <span className="cm-shimmer-text bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 bg-clip-text text-transparent">
                Executive Leadership
              </span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm md:text-base">
              Guiding 3M Label Limited with a steadfast dedication to superior private branding
              solutions, rapid turnarounds, and enduring client partnerships since 1988.
            </p>
          </Reveal>
        </div>

        {/* ============ Tag + letter ============ */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Left: swinging hang-tag ---------- */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <Reveal direction="left" delay={150}>
              <div className="cm-sway-wrap mx-auto max-w-md lg:max-w-none">
                <div className="cm-sway flex flex-col items-center">
                  {/* string */}
                  <div className="h-12 w-px bg-gradient-to-b from-transparent via-rose-300 to-rose-500 sm:h-16" />
                  <div className="-mb-2.5 h-5 w-5 rounded-full border-2 border-rose-400 bg-white shadow-inner" />

                  {/* tag body */}
                  <div
                    ref={tagRef}
                    onMouseMove={trackPointer}
                    className="group relative w-full overflow-hidden rounded-3xl border border-rose-900/60 bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900 p-7 pt-10 text-white shadow-2xl shadow-rose-950/30 sm:p-10 sm:pt-12"
                  >
                    {/* glow orbs */}
                    <div aria-hidden className="cm-drift-a pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-600/30 blur-3xl" />
                    <div aria-hidden className="cm-drift-b pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />
                    {/* cursor light */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(251,113,133,0.22), transparent 70%)",
                      }}
                    />
                    {/* idle sheen */}
                    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 overflow-hidden">
                      <div className="cm-sheen h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    <div className="relative z-10">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-rose-400 shadow-inner transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <Quote className="h-7 w-7" />
                      </div>

                      <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        Executive Office
                      </h3>
                      <p className="mt-1 text-xs font-medium text-rose-200 sm:text-sm">
                        3M Label Limited &amp; Label Bank Asia
                      </p>

                      <ul className="mt-8 space-y-3 border-t border-rose-900/80 pt-6">
                        {CHECKS.map((c, i) => (
                          <li
                            key={c}
                            style={{ transitionDelay: `${tagInView ? 300 + i * 150 : 0}ms` }}
                            className={`group/item flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 text-xs text-slate-200 transition-all duration-700 hover:translate-x-1 hover:border-rose-400/30 hover:bg-white/5 sm:text-sm ${
                              tagInView ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                            }`}
                          >
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-rose-400 transition-transform duration-300 group-hover/item:scale-125" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>

                      {/* barcode footer */}
                      <div className="mt-8 border-t border-rose-900/80 pt-6">
                        <div className="flex h-8 items-end overflow-hidden" aria-hidden>
                          {BARS.map((w, i) => (
                            <span
                              key={i}
                              className="cm-bar mr-[2px] h-full flex-shrink-0 rounded-[1px] bg-rose-300/70"
                              style={{ width: `${w}px`, animationDelay: `${i * 70}ms` }}
                            />
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-300">
                            Global Standards
                          </span>
                          <ShieldCheck className="h-6 w-6 text-rose-400 transition-transform duration-500 group-hover:scale-125" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- Right: the letter ---------- */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={200}>
              <div
                ref={paperRef}
                onMouseMove={trackPointer}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 pl-8 shadow-sm backdrop-blur transition-all duration-500 hover:border-rose-200 hover:shadow-2xl hover:shadow-rose-950/10 sm:p-9 sm:pl-12"
              >
                {/* cursor light */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(244,63,94,0.10), transparent 70%)",
                  }}
                />

                {/* reading-progress rail */}
                <div aria-hidden className="absolute bottom-6 left-3 top-6 w-[3px] overflow-hidden rounded-full bg-rose-100 sm:left-5">
                  <div
                    className="w-full origin-top rounded-full bg-gradient-to-b from-rose-500 to-red-600"
                    style={{ height: `${progress * 100}%`, transition: "height 120ms linear" }}
                  />
                </div>

                {/* rotating seal */}
                <div className="absolute right-3 top-3 hidden h-28 w-28 sm:block lg:right-5 lg:top-5 lg:h-32 lg:w-32" aria-hidden>
                  <svg viewBox="0 0 200 200" className="cm-spin absolute inset-0 h-full w-full">
                    <defs>
                      <path id="cm-seal-path" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" />
                    </defs>
                    <text fill="#e11d48" fontSize="15" fontWeight="700" letterSpacing="2">
                      <textPath href="#cm-seal-path" textLength="470" lengthAdjust="spacing">
                        {SEAL_TEXT}
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-[26%] flex items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition-transform duration-500 group-hover:scale-110">
                    <Award className="h-6 w-6 lg:h-7 lg:w-7" />
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="block text-xs font-bold uppercase tracking-wider text-rose-600 sm:pr-28 lg:pr-36">
                    Chairman&apos;s Perspective
                  </span>

                  <h3
                    ref={quoteRef}
                    className="mt-2 text-xl font-bold leading-snug text-slate-900 sm:pr-28 sm:text-2xl lg:pr-36 lg:text-[1.7rem]"
                  >
                    &ldquo;Our mission is not to be the biggest in this business,{" "}
                    <span
                      className="bg-gradient-to-r from-rose-200 to-rose-300/80 bg-bottom bg-no-repeat"
                      style={{
                        backgroundSize: quoteInView ? "100% 42%" : "0% 42%",
                        transition: "background-size 1.2s cubic-bezier(.2,.8,.2,1) .4s",
                      }}
                    >
                      simply the best!
                    </span>
                    &rdquo;
                  </h3>

                  <div className="mt-6 space-y-4 text-xs leading-relaxed text-slate-600 sm:text-sm md:text-base">
                    <Reveal delay={100}>
                      <p className="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-black first-letter:leading-[0.9] first-letter:text-rose-600 sm:first-letter:text-6xl">
                        Since our inception in Canada in 1988, our guiding philosophy has remained
                        unwavering: delivering exceptional value, rapid turnarounds, and flawless
                        private branding solutions for apparel retailers worldwide.
                      </p>
                    </Reveal>
                    <Reveal delay={200}>
                      <p>
                        Through our strategic integration with Label Bank Asia and advanced
                        state-of-the-art manufacturing hubs across Bangladesh and Thailand, we combine
                        cutting-edge EDI order management systems with eco-aware manufacturing
                        practices.
                      </p>
                    </Reveal>
                    <Reveal delay={300}>
                      <p>
                        We invite brand directors and procurement leaders to compare our pricing
                        structures, material quality, and service reliability. We remain committed to
                        being your most trusted global partner in garment accessories.
                      </p>
                    </Reveal>
                  </div>

                  {/* sign-off */}
                  <div
                    ref={signRef}
                    className="mt-8 flex flex-col justify-between gap-5 border-t border-slate-200/80 pt-6 sm:flex-row sm:items-center"
                  >
                    <div>
                      {/* handwritten-style signature that draws itself */}
                      <svg viewBox="0 0 200 56" className="h-10 w-36 text-rose-600 sm:h-12 sm:w-44" aria-hidden>
                        <path
                          d="M4 40 C 18 4, 30 4, 30 30 S 42 54, 56 24 S 72 8, 78 34 S 98 50, 112 20 C 122 4, 132 46, 152 30 S 178 18, 196 32"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pathLength="1"
                          style={{
                            strokeDasharray: 1,
                            strokeDashoffset: signInView ? 0 : 1,
                            transition: "stroke-dashoffset 2.4s cubic-bezier(.65,0,.35,1) .2s",
                          }}
                        />
                      </svg>
                      <p className="text-sm font-extrabold text-slate-900 sm:text-base">Board of Directors</p>
                      <p className="text-xs font-medium text-slate-500">3M Label Limited &amp; Sister Concerns</p>
                    </div>

                    <a
                      href="#contact"
                      className="group/cta relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-rose-600 px-6 py-3 text-xs font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 active:scale-[0.98] sm:text-sm"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
                      />
                      <span className="relative">Contact Executive Office</span>
                      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ============ Giant moving type ============ */}
        <div
          aria-hidden
          className="mt-16 select-none space-y-1 overflow-hidden sm:mt-24 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <div className="cm-marquee-l flex w-max whitespace-nowrap">
            {[0, 1].map((k) => (
              <span
                key={k}
                className="pr-6 text-5xl font-black uppercase tracking-tight text-transparent sm:text-7xl lg:text-8xl"
                style={{ WebkitTextStroke: "1.5px rgba(244,63,94,0.45)" }}
              >
                {BIG_TEXT.repeat(3)}
              </span>
            ))}
          </div>
          <div className="cm-marquee-r flex w-max whitespace-nowrap">
            {[0, 1].map((k) => (
              <span
                key={k}
                className="pr-6 text-5xl font-black uppercase tracking-tight text-rose-100 sm:text-7xl lg:text-8xl"
              >
                {BIG_TEXT.repeat(3)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}