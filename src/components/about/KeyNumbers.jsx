"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  Palette,
  Globe2,
  Zap,
  CheckCircle2,
  TrendingUp,
  Leaf,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Hooks & helpers                                                    */
/* ------------------------------------------------------------------ */

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduce(!!m?.matches);
  }, []);
  return reduce;
}

function useInView(threshold = 0.25) {
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

function useCountUp(to, active, { from = 0, duration = 1800 } = {}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, from, duration, reduce]);
  return value;
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.12);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const trackPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/* ------------------------------------------------------------------ */
/*  Data (copy unchanged)                                              */
/* ------------------------------------------------------------------ */

const stats = [
  {
    icon: Calendar,
    label: "Established In Canada",
    description: "Over 3 decades of private labeling & garment accessory expertise.",
    highlight: "35+ Years Experience",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    icon: Clock,
    label: "Standard Delivery Turnaround",
    description: "Fast-track production with same-day dispatch available for rush EDI orders.",
    highlight: "Rapid Dispatch",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    icon: Palette,
    label: "Color Printing Precision",
    description:
      "High-speed offset & digital laser printing with automated prepress color separation.",
    highlight: "Offset & Digital",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    icon: Globe2,
    label: "Global Production Network",
    description:
      "Key sister concern of Label Bank Asia with manufacturing hubs in Bangladesh & Thailand.",
    highlight: "Asia & North America",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
];

const highlightsBar = [
  { icon: Zap, title: "Zero MOQ", text: "Laser encoding per SKU" },
  { icon: CheckCircle2, title: "ISO 9001:2015", text: "Certified Quality System" },
  { icon: Leaf, title: "OEKO-TEX / FSC", text: "Eco-Friendly Materials" },
  { icon: TrendingUp, title: "EDI Integrated", text: "Automated Tracking & Entry" },
];

const valueClass =
  "text-3xl font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-rose-600 sm:text-4xl lg:text-5xl";

/* ------------------------------------------------------------------ */
/*  Shared tile shell                                                  */
/* ------------------------------------------------------------------ */

function TileShell({ index, data, span = "", delay = 0, children }) {
  const [ref, inView] = useInView(0.3);
  const Icon = data.icon;
  return (
    <Reveal delay={delay} className={`h-full ${span}`}>
      <div
        ref={ref}
        onMouseMove={trackPointer}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-950/10 sm:p-8"
      >
        {/* cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(244,63,94,0.13), transparent 70%)",
          }}
        />
        {/* top bar fills on hover */}
        <span
          aria-hidden
          className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-rose-500 to-red-500 transition-transform duration-700 ease-out group-hover:scale-x-100"
        />

        <div className="relative z-10 flex flex-1 flex-col">
          {/* header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-inner transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs font-bold tracking-widest text-slate-300 transition-colors group-hover:text-rose-400">
                {String(index + 1).padStart(2, "0")} / 04
              </span>
            </div>
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${data.badgeColor}`}
            >
              {data.highlight}
            </span>
          </div>

          {/* tile-specific visual + value */}
          <div className="flex-1">{children(inView)}</div>

          {/* text */}
          <h3 className="mt-3 text-sm font-bold text-slate-800 sm:text-base">{data.label}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
            {data.description}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-rose-600">
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Verified Capability
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-0 group-hover:animate-ping group-hover:opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  01 · Odometer + timeline                                           */
/* ------------------------------------------------------------------ */

function Odometer({ value, active }) {
  const reduce = useReducedMotion();
  return (
    <div
      className="flex text-6xl font-black leading-none tracking-tighter tabular-nums text-slate-900 transition-colors duration-300 group-hover:text-rose-600 sm:text-7xl lg:text-8xl"
      role="img"
      aria-label={value}
    >
      {String(value)
        .split("")
        .map((d, i) => (
          <div key={i} className="h-[1em] overflow-hidden" aria-hidden>
            <div
              className="flex flex-col"
              style={{
                transform: `translateY(-${active ? (Number(d) + 10) * 5 : 0}%)`,
                transition: reduce
                  ? "none"
                  : `transform ${1.7 + i * 0.45}s cubic-bezier(.16,1,.3,1)`,
              }}
            >
              {Array.from({ length: 20 }, (_, n) => (
                <span key={n} className="block h-[1em] text-center leading-none">
                  {n % 10}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

function TileYears({ inView }) {
  const marks = [
    { label: "1988", at: 0 },
    { label: "2000", at: 31.6 },
    { label: "2010", at: 57.9 },
    { label: "2020", at: 84.2, hideSm: true },
    { label: "Today", at: 100 },
  ];
  return (
    <div className="relative">
      {/* ghost numeral */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-6 select-none text-[7rem] font-black leading-none text-transparent sm:text-[9rem]"
        style={{ WebkitTextStroke: "1.5px rgba(244,63,94,0.18)" }}
      >
        35+
      </span>

      <div className="relative">
        <Odometer value="1988" active={inView} />

        {/* timeline */}
        <div className="mt-8 px-3 sm:px-4">
          <div className="relative h-1.5 rounded-full bg-slate-100">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-400 to-red-600"
              style={{
                width: inView ? "100%" : "0%",
                transition: "width 2.6s cubic-bezier(.65,0,.35,1) .3s",
              }}
            />
            <span
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-rose-600 shadow-[0_0_14px_4px_rgba(244,63,94,0.5)]"
              style={{
                left: inView ? "100%" : "0%",
                transition: "left 2.6s cubic-bezier(.65,0,.35,1) .3s",
              }}
            />
            {marks.map((m) => (
              <span
                key={m.label}
                className="absolute top-0 h-1.5 w-px bg-slate-300"
                style={{ left: `${m.at}%` }}
              />
            ))}
          </div>
          <div className="relative mt-2 h-4">
            {marks.map((m, i) => (
              <span
                key={m.label}
                className={`absolute font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 ${
                  m.hideSm ? "hidden sm:block" : ""
                } ${
                  i === 0 ? "" : i === marks.length - 1 ? "-translate-x-full" : "-translate-x-1/2"
                }`}
                style={{ left: `${m.at}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  02 · 72-hour dial                                                  */
/* ------------------------------------------------------------------ */

function TileHours({ inView }) {
  const hours = useCountUp(72, inView, { duration: 2200 });
  return (
    <div>
      <div className="mx-auto mb-4 h-36 w-36 sm:h-40 sm:w-40">
        <svg viewBox="0 0 140 140" className="h-full w-full" aria-hidden>
          {Array.from({ length: 72 }, (_, i) => {
            const major = i % 24 === 0;
            return (
              <line
                key={i}
                x1="70"
                x2="70"
                y1={major ? 3 : 7}
                y2={major ? 19 : 15}
                strokeWidth={major ? 2.6 : 1.6}
                strokeLinecap="round"
                transform={`rotate(${i * 5} 70 70)`}
                style={{
                  stroke: inView ? (major ? "#be123c" : "#f43f5e") : "#e2e8f0",
                  transition: "stroke .4s",
                  transitionDelay: `${i * 28}ms`,
                }}
              />
            );
          })}
          <g className="kn-hand">
            <line x1="70" y1="70" x2="70" y2="30" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
          </g>
          <circle cx="70" cy="70" r="4" fill="#e11d48" />
          <circle cx="70" cy="70" r="9" fill="none" stroke="#fda4af" strokeWidth="1" />
          <text x="70" y="104" textAnchor="middle" className="fill-slate-400" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="2">
            HRS
          </text>
        </svg>
      </div>
      <p className={valueClass}>
        <span className="tabular-nums">{hours}</span> Hours
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  03 · Ink overprint                                                 */
/* ------------------------------------------------------------------ */

const INKS = [
  { name: "Cyan", color: "#00aeef" },
  { name: "Magenta", color: "#ec008c" },
  { name: "Yellow", color: "#ffe600" },
  { name: "Black", color: "#1f2937" },
  { name: "Spot Rose", color: "#fb7185" },
  { name: "Spot Amber", color: "#f59e0b" },
];

function TileInks({ inView }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setStep((s) => (s % 6) + 1), 1100);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="min-w-0 truncate rounded-md bg-slate-900 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
          Ink {step}/6 · {INKS[step - 1].name}
        </span>
        {/* registration mark */}
        <svg viewBox="0 0 40 40" className="kn-reg h-8 w-8 flex-shrink-0 text-slate-400 transition-colors group-hover:text-rose-500" aria-hidden>
          <circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </div>

      <div className="mb-6 flex h-20 items-center justify-center [--d:clamp(2.5rem,11vw,3.75rem)] [--ov:calc(var(--d)*-0.32)] group-hover:[--ov:calc(var(--d)*-0.07)]">
        {INKS.map((ink, i) => {
          const active = step === i + 1;
          return (
            <span
              key={ink.name}
              title={ink.name}
              className="block h-[var(--d)] w-[var(--d)] flex-shrink-0 rounded-full mix-blend-multiply transition-[margin,transform,opacity] duration-500"
              style={{
                backgroundColor: ink.color,
                marginLeft: i === 0 ? 0 : "var(--ov)",
                opacity: inView ? 0.88 : 0,
                transform: `scale(${inView ? (active ? 1.14 : 1) : 0})`,
                transitionDelay: inView && !active ? `${i * 110}ms` : "0ms",
                zIndex: active ? 10 : 1,
              }}
            />
          );
        })}
      </div>
      <p className={valueClass}>1 to 6</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  04 · Network map                                                   */
/* ------------------------------------------------------------------ */

const ARCS = {
  ca_bd: "M70 62 Q 170 -8 292 96",
  bd_th: "M292 96 Q 322 112 332 152",
  ca_th: "M70 62 Q 200 236 332 152",
};
const NODES = [
  { id: "ca", x: 70, y: 62, label: "CANADA", anchor: "start", dx: -4, dy: 24 },
  { id: "bd", x: 292, y: 96, label: "BANGLADESH", anchor: "end", dx: -14, dy: 4 },
  { id: "th", x: 332, y: 152, label: "THAILAND", anchor: "end", dx: -14, dy: 28 },
];

function TileNetwork({ inView }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="mx-auto mb-4 max-w-2xl overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80">
        <svg viewBox="0 0 400 190" className="block h-auto w-full" aria-hidden>
          <defs>
            <pattern id="kn-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="400" height="190" fill="url(#kn-dots)" />

          {Object.entries(ARCS).map(([k, d]) => (
            <path
              key={k}
              d={d}
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="4 6"
              className="kn-march stroke-rose-300 transition-colors duration-500 group-hover:stroke-rose-600"
              style={{ opacity: inView ? 1 : 0, transition: "opacity 1s .4s, stroke .5s" }}
            />
          ))}

          {inView && !reduce &&
            [
              ["ca_bd", "0s", "4.2s"],
              ["ca_th", "1.4s", "5s"],
              ["bd_th", "2.4s", "2.6s"],
            ].map(([k, begin, dur]) => (
              <circle key={k} r="3.6" fill="#e11d48">
                <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={ARCS[k]} />
              </circle>
            ))}

          {NODES.map((n, i) => (
            <g
              key={n.id}
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity .6s",
                transitionDelay: `${i * 200}ms`,
              }}
            >
              <circle cx={n.x} cy={n.y} r="9" className="kn-node-ring fill-rose-500/30" />
              <circle cx={n.x} cy={n.y} r="5.5" fill="#e11d48" stroke="#fff" strokeWidth="2" />
              <text
                x={n.x + n.dx}
                y={n.y + n.dy}
                textAnchor={n.anchor}
                fontSize="13"
                fontWeight="700"
                letterSpacing="1"
                fontFamily="ui-monospace, monospace"
                className="fill-slate-500"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className={valueClass}>Multinational</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function KeyNumbers() {
  return (
    <section
      id="key-numbers"
      className="relative w-full bg-slate-50/70 py-16 text-slate-800 [overflow:clip] sm:py-24 lg:py-32"
    >
      <style>{`
        @keyframes kn-drift-a { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(60px,-40px) scale(1.15);} }
        @keyframes kn-drift-b { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-70px,50px) scale(1.2);} }
        @keyframes kn-shimmer { 0% { background-position: 0% 50%;} 100% { background-position: 200% 50%;} }
        @keyframes kn-ruler { from { background-position: 0 100%, 0 100%;} to { background-position: -50px 100%, -50px 100%;} }
        @keyframes kn-spin { to { transform: rotate(360deg);} }
        @keyframes kn-march { to { stroke-dashoffset: -20;} }
        @keyframes kn-node { 0% { transform: scale(.7); opacity: .9;} 100% { transform: scale(2.4); opacity: 0;} }
        @keyframes kn-scan { 0% { left: -30%;} 100% { left: 110%;} }
        @keyframes kn-bounce-soft { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-3px);} }

        .kn-drift-a { animation: kn-drift-a 16s ease-in-out infinite; }
        .kn-drift-b { animation: kn-drift-b 20s ease-in-out infinite; }
        .kn-shimmer { background-size: 200% auto; animation: kn-shimmer 5s linear infinite; }
        .kn-ruler { animation: kn-ruler 4s linear infinite; }
        .kn-hand { transform-box: view-box; transform-origin: 70px 70px; animation: kn-spin 6s linear infinite; }
        .kn-reg { animation: kn-spin 12s linear infinite; }
        .kn-march { animation: kn-march 1.2s linear infinite; }
        .kn-node-ring { transform-box: fill-box; transform-origin: center; animation: kn-node 2.4s ease-out infinite; }
        .kn-scan { animation: kn-scan 5.5s ease-in-out infinite; }
        .kn-soft { animation: kn-bounce-soft 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .kn-drift-a, .kn-drift-b, .kn-shimmer, .kn-ruler, .kn-hand, .kn-reg,
          .kn-march, .kn-node-ring, .kn-scan, .kn-soft { animation: none !important; }
        }
      `}</style>

      {/* background grid + glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(244,63,94,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,63,94,0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div aria-hidden className="kn-drift-a pointer-events-none absolute left-1/2 top-1/2 h-80 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100/60 blur-3xl sm:h-96 sm:w-[700px]" />
      <div aria-hidden className="kn-drift-b pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-red-100/50 blur-3xl sm:h-96 sm:w-96" />

      {/* print crop marks */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "bottom-3 left-3 border-b border-l",
        "bottom-3 right-3 border-b border-r",
      ].map((c) => (
        <span key={c} aria-hidden className={`pointer-events-none absolute h-5 w-5 border-rose-300 sm:h-7 sm:w-7 ${c}`} />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============ Header ============ */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 shadow-sm transition-transform duration-300 hover:scale-105">
              <TrendingUp className="kn-soft h-4 w-4 flex-shrink-0 text-rose-600" />
              <span>Scale &amp; Performance</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              3M Label Limited <br className="hidden sm:inline" />
              <span className="kn-shimmer bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 bg-clip-text text-transparent">
                By The Numbers
              </span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm md:text-base">
              Our operational capacity and technological infrastructure are engineered to meet the
              stringent demands of top-tier global apparel retailers.
            </p>
          </Reveal>
          {/* moving ruler */}
          <Reveal delay={300} className="w-full">
            <div
              aria-hidden
              className="kn-ruler mx-auto mt-8 h-3 w-full max-w-xl opacity-80 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right,#fb7185 0 1px,transparent 1px 10px), linear-gradient(to right,#e11d48 0 2px,transparent 2px)",
                backgroundSize: "50px 45%, 50px 100%",
                backgroundRepeat: "repeat-x, repeat-x",
                backgroundPosition: "0 100%, 0 100%",
              }}
            />
          </Reveal>
        </div>

        {/* ============ Bento ============ */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <TileShell index={0} data={stats[0]} span="md:col-span-2 lg:col-span-7">
            {(v) => <TileYears inView={v} />}
          </TileShell>
          <TileShell index={1} data={stats[1]} span="lg:col-span-5" delay={120}>
            {(v) => <TileHours inView={v} />}
          </TileShell>
          <TileShell index={2} data={stats[2]} span="lg:col-span-5" delay={120}>
            {(v) => <TileInks inView={v} />}
          </TileShell>
          <TileShell index={3} data={stats[3]} span="md:col-span-2 lg:col-span-7" delay={240}>
            {(v) => <TileNetwork inView={v} />}
          </TileShell>
        </div>

        {/* ============ Scanner strip ============ */}
        <Reveal className="mt-12 sm:mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-rose-900/60 bg-gradient-to-r from-slate-950 via-rose-950 to-slate-900 p-4 shadow-2xl shadow-rose-950/30 sm:p-6 lg:p-8">
            <div aria-hidden className="kn-drift-a pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-600/20 blur-3xl" />

            {/* scanner beam */}
            <div aria-hidden className="kn-scan pointer-events-none absolute inset-y-0 z-0 w-1/4">
              <div className="h-full w-full bg-gradient-to-r from-transparent to-rose-500/25" />
              <div className="absolute inset-y-0 right-0 w-[2px] bg-rose-400 shadow-[0_0_18px_4px_rgba(251,113,133,0.8)]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {highlightsBar.map((b) => {
                const BIcon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="group relative flex items-center gap-4 rounded-2xl border border-dashed border-rose-800/70 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:-rotate-1 hover:border-rose-400/70 hover:bg-white/[0.07]"
                  >
                    {/* punch hole */}
                    <span aria-hidden className="absolute right-3 top-3 h-2 w-2 rounded-full border border-rose-700/70 bg-slate-950" />
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-rose-400 transition-all duration-300 group-hover:scale-110 group-hover:border-rose-500 group-hover:bg-rose-600 group-hover:text-white">
                      <BIcon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white transition-colors group-hover:text-rose-300 sm:text-base">
                        {b.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-rose-200/80">{b.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}