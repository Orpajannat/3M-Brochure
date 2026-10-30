"use client";

import { useEffect, useRef, useState } from "react";
import { DM_Sans, Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-story-serif",
});

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-story-sans",
});

const chapters = [
  {
    year: "1988",
    label: "THE BEGINNING",
    title: "A foundation built on precision.",
    text: "Our journey began in Canada with a commitment to quality, dependable service, and attention to every detail.",
    number: "01",
  },
  {
    year: "GLOBAL",
    label: "EXPANDING CONNECTIONS",
    title: "Growing beyond boundaries.",
    text: "International connections brought together expertise, production capabilities, and new opportunities.",
    number: "02",
  },
  {
    year: "TODAY",
    label: "BUILT ON TRUST",
    title: "One purpose. Multiple connections.",
    text: "Our connection with Label Bank Asia and operations across Bangladesh and Thailand supports our continuing journey.",
    number: "03",
  },
];

const services = [
  "Garment Accessories",
  "Thermal Branding Labels",
  "Offset Swing Tickets",
  "Retail Packaging",
  "Source Tagging",
  "EDI Integration",
  "Private Labeling",
  "Precision Quality Control",
];

const heroLines = [
  [{ t: "The" }, { t: "details" }, { t: "make" }],
  [{ t: "the", red: true }, { t: "difference.", red: true }],
];

const missionWords = ["Not", "to", "be", "the", "biggest."];
const closingWords = ["Good", "work", "lives", "in", "the", "details."];
const fxCycle = ["sudden-zoom-in", "sudden-pop-up", "sudden-appear", "sudden-zoom-out"];

const sentence = (value) => value.charAt(0) + value.slice(1).toLowerCase();

export default function CompanyStory() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [hold, setHold] = useState(false);
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const yearRef = useRef(null);
  const leaveTimer = useRef(0);

  function goTo(next) {
    if (next === active) return;
    setPrevious(active);
    setActive(next);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setPrevious(null), 520);
  }

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    root.classList.add("story-ready");

    // Force initial elements to trigger immediately on load
    root.querySelectorAll(".fx").forEach((node) => node.classList.add("in"));

    let lastScrollY = window.scrollY;

    const reveal = new IntersectionObserver(
      (entries) => {
        const isScrollingDown = window.scrollY > lastScrollY;
        lastScrollY = window.scrollY;

        entries.forEach((entry) => {
          const el = entry.target;

          if (entry.isIntersecting) {
            el.classList.remove("out-top", "out-bottom");
            el.classList.add("in");
          } else {
            el.classList.remove("in");
            if (isScrollingDown) {
              el.classList.add("out-top");
              el.classList.remove("out-bottom");
            } else {
              el.classList.add("out-bottom");
              el.classList.remove("out-top");
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    root.querySelectorAll(".fx").forEach((node) => reveal.observe(node));

    let scrollFrame = 0;
    const measure = () => {
      scrollFrame = 0;
      const box = root.getBoundingClientRect();
      const total = box.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -box.top / total)) : 0;
      root.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const hero = heroRef.current;
    let moveFrame = 0;
    const onMove = (event) => {
      const box = hero.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - 0.5) * 2;
      const y = ((event.clientY - box.top) / box.height - 0.5) * 2;
      if (moveFrame) return;
      moveFrame = requestAnimationFrame(() => {
        moveFrame = 0;
        hero.style.setProperty("--mx", x.toFixed(3));
        hero.style.setProperty("--my", y.toFixed(3));
      });
    };
    const onLeave = () => {
      hero.style.setProperty("--mx", "0");
      hero.style.setProperty("--my", "0");
    };
    if (hero && fine && !reduce) {
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
    }

    const yearEl = yearRef.current;
    let countFrame = 0;
    if (yearEl && !reduce) {
      const from = 1900;
      const to = 1988;
      const duration = 1400;
      const start = performance.now() + 400;
      yearEl.textContent = String(from);
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = 1 - Math.pow(1 - t, 4);
        yearEl.textContent = String(Math.round(from + (to - from) * eased));
        if (t < 1) countFrame = requestAnimationFrame(tick);
      };
      countFrame = requestAnimationFrame(tick);
    }

    return () => {
      reveal.disconnect();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(moveFrame);
      cancelAnimationFrame(countFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      hero?.removeEventListener("pointermove", onMove);
      hero?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const renderChapter = (item, className, hidden) => (
    <div
      className={`chapter-view flex min-h-[380px] flex-col justify-between p-8 sm:min-h-[420px] sm:p-12 ${className}`}
      aria-hidden={hidden ? "true" : undefined}
    >
      <span className="giant serif" aria-hidden="true">
        {item.number}
      </span>
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-10 bg-[#C21F30]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#C21F30]">
            Chapter {item.number}
          </span>
        </div>
        <h3 className="serif mt-6 max-w-lg text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.05] tracking-tight text-[#171717]">
          {item.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-7 text-black/70">
          {item.text}
        </p>
      </div>
      <div className="relative z-10 mt-10 flex items-center justify-between border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-wider text-black/50">
        <span>Our continuing journey</span>
        <span className="font-bold text-[#C21F30]">{item.number} / 03</span>
      </div>
    </div>
  );

  return (
    <section
      ref={rootRef}
      className={`${serif.variable} ${sans.variable} company-story relative bg-[#F7F7F8] text-[#171717] [overflow-x:clip]`}
    >
      <div className="scroll-bar" aria-hidden="true" />

      {/* HERO SECTION */}
      <div ref={heroRef} className="hero relative overflow-hidden bg-[#111111] py-20 text-white md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div className="hero-copy z-10">
            <div className="fx mb-8 flex items-center gap-3" data-fx="sudden-appear">
              <span className="ping" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#F06A70]">
                A story of quality · Since 1988
              </p>
            </div>

            <h1 className="serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.98] tracking-tight">
              {heroLines.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word, wi) => {
                    const order = li * 3 + wi;
                    return (
                      <span key={word.t} className="inline-block overflow-hidden">
                        <span
                          className={`fx word inline-block ${word.red ? "text-[#F06A70] italic" : ""}`}
                          data-fx="slam"
                          style={{ "--d": `${100 + order * 120}ms` }}
                        >
                          {word.t}
                        </span>{" "}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p
              className="fx mt-8 max-w-lg text-base leading-8 text-white/70"
              data-fx="sudden-pop-up"
              style={{ "--d": "700ms" }}
            >
              Our story is shaped by thoughtful solutions, lasting
              partnerships, and an unwavering commitment to quality.
            </p>

            <div
              className="fx mt-10 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-white/50"
              data-fx="wipe"
              style={{ "--d": "900ms" }}
            >
              <span className="h-0.5 w-14 bg-[#F06A70]" />
              Precision in every detail
            </div>
          </div>

          <div className="hero-visual relative mx-auto aspect-square w-full max-w-[460px]">
            <div className="parallax absolute inset-0">
              <span className="radar" />
              <span className="radar" style={{ animationDelay: "1.2s" }} />
              <span className="radar" style={{ animationDelay: "2.4s" }} />
              <div
                className="fx absolute inset-[12%]"
                data-fx="sudden-zoom-in"
                style={{ "--d": "300ms" }}
              >
                <div className="disc flex flex-col items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-2xl border border-white/10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F06A70]">Established</span>
                  <span
                    ref={yearRef}
                    className="serif my-1 text-[clamp(3.5rem,7vw,5rem)] leading-none tabular-nums"
                  >
                    1988
                  </span>
                  <span className="text-xs font-medium text-white/60">Canada</span>
                </div>
              </div>
            </div>

            {[
              ["Quality", "top-[2%] left-[-2%]", "600ms", "0s"],
              ["Partnership", "top-[48%] right-[-6%]", "800ms", "0.8s"],
              ["Progress", "bottom-[2%] left-[6%]", "1000ms", "1.6s"],
            ].map(([label, position, delay, floatDelay], i) => (
              <div
                key={label}
                className={`fx absolute ${position}`}
                data-fx={fxCycle[i + 1]}
                style={{ "--d": delay }}
              >
                <span className="chip" style={{ "--fd": floatDelay }}>
                  <i />
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHAPTERS SECTION */}
      <div className="border-t border-black/10 bg-[#EFECE6] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="fx flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            data-fx="sudden-pop-up"
          >
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C21F30]">
                Our Evolution
              </p>
              <h2 className="serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.02] tracking-tight">
                Every chapter
                <br />
                <span className="text-black/40 italic">
                  moves us forward.
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-black/60">
              Different milestones. One continuing commitment to precision craftsmanship.
            </p>
          </div>

          <div
            className="mt-12"
            onPointerEnter={() => setHold(true)}
            onPointerLeave={() => setHold(false)}
            onFocus={() => setHold(true)}
            onBlur={() => setHold(false)}
          >
            <div
              role="tablist"
              aria-label="Company chapters"
              className="grid grid-cols-3 gap-4 sm:gap-8"
              style={{ "--ps": hold ? "paused" : "running" }}
            >
              {chapters.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  role="tab"
                  id={`story-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls="story-panel"
                  onClick={() => goTo(index)}
                  className={`stab cursor-pointer text-left ${active === index ? "stab-on" : ""}`}
                >
                  <span className="relative block h-1 overflow-hidden rounded-full bg-black/10">
                    {active === index && (
                      <span
                        key={active}
                        className="fill"
                        onAnimationEnd={(event) => {
                          if (event.animationName.includes("progressFill"))
                            goTo((active + 1) % chapters.length);
                        }}
                      />
                    )}
                  </span>
                  <span className="serif mt-4 block text-2xl font-normal sm:text-3xl">
                    {sentence(item.year)}
                  </span>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-black/50">
                    {sentence(item.label)}
                  </span>
                </button>
              ))}
            </div>

            <div
              id="story-panel"
              role="tabpanel"
              aria-labelledby={`story-tab-${active}`}
              className="stage relative mt-10 overflow-hidden rounded-3xl bg-white shadow-xl border border-black/5"
            >
              <span className="stage-corner" aria-hidden="true" />
              {previous !== null &&
                renderChapter(chapters[previous], "ch-leave", true)}
              <div key={active} className="ch-enter">
                {renderChapter(chapters[active], "", false)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="mission relative isolate overflow-hidden bg-[#0A0A0A] px-6 py-28 text-white md:py-36">
        <div className="mrings" aria-hidden="true">
          <span className="mring" />
          <span className="mring" style={{ animationDelay: "1.2s" }} />
          <span className="mring red" style={{ animationDelay: "2.4s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <p
            className="fx mb-6 text-xs font-bold uppercase tracking-widest text-[#F06A70]"
            data-fx="sudden-appear"
          >
            What We Believe
          </p>

          <h2 className="serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-tight">
            <span className="block">
              {missionWords.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden">
                  <span
                    className="fx word inline-block"
                    data-fx="sudden-pop-up"
                    style={{ "--d": `${i * 100}ms` }}
                  >
                    {word}
                  </span>{" "}
                </span>
              ))}
            </span>
            <span
              className="fx word mission-emphasis block text-[#F06A70] italic"
              data-fx="slam"
              style={{ "--d": "800ms" }}
            >
              Simply the best.
            </span>
          </h2>

          <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <p
              className="fx max-w-xl text-base leading-8 text-white/70"
              data-fx="sudden-zoom-out"
              style={{ "--d": "1000ms" }}
            >
              We focus on getting the details right, maintaining high
              standards, and building relationships that stand the test of
              time.
            </p>
            <div
              className="fx shrink-0"
              data-fx="sudden-zoom-in"
              style={{ "--d": "1200ms" }}
            >
              <div className="mission-symbol grid size-16 place-items-center rounded-full border border-[#F06A70]/40 bg-[#F06A70]/10 text-2xl text-[#F06A70]">
                ✳
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES GRID SECTION */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div
          className="fx flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          data-fx="sudden-pop-up"
        >
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C21F30]">
              Our Capabilities
            </p>
            <h2 className="serif text-[clamp(2.2rem,3.8vw,3.2rem)] leading-[1.05] tracking-tight">
              The right details.
              <br />
              <span className="text-black/40 italic">
                The right solutions.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-black/60">
            A range of services designed to support products from concept to delivery.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {services.map((service, index) => (
            <li
              key={service}
              className="fx"
              data-fx={fxCycle[index % 4]}
              style={{
                "--d": `${(index % 4) * 80 + Math.floor(index / 4) * 180}ms`,
              }}
            >
              <div className="tile group">
                <div className="relative z-10 flex items-start justify-between">
                  <span className="tile-num serif text-lg font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="tile-arrow text-lg font-bold">↗</span>
                </div>
                <span className="tile-name serif relative z-10 text-xl leading-[1.1] sm:text-2xl font-normal">
                  {service}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CLOSING SECTION */}
      <div className="closing relative isolate overflow-hidden border-t border-black/10 px-6 py-28 sm:px-8 md:py-36 bg-white">
        <div className="mx-auto max-w-7xl">
          <p
            className="fx mb-6 text-xs font-bold uppercase tracking-widest text-[#C21F30]"
            data-fx="sudden-appear"
          >
            Looking Ahead
          </p>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="serif max-w-3xl text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.02] tracking-tight">
              {closingWords.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden">
                  <span
                    className={`fx word inline-block ${i === closingWords.length - 1 ? "text-[#C21F30] italic" : ""}`}
                    data-fx="slam"
                    style={{ "--d": `${i * 100}ms` }}
                  >
                    {word}
                  </span>{" "}
                </span>
              ))}
            </h2>
            <p
              className="fx max-w-sm text-base leading-7 text-black/60"
              data-fx="sudden-pop-up"
              style={{ "--d": "700ms" }}
            >
              Moving forward with the same focus on quality, trust, and lasting
              partnerships.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .company-story {
          font-family: var(--font-story-sans), system-ui, sans-serif;
        }
        .serif {
          font-family: var(--font-story-serif), Georgia, serif;
        }

        .scroll-bar {
          position: sticky;
          top: 0;
          z-index: 60;
          height: 4px;
          margin-bottom: -4px;
          background: #c21f30;
          transform: scaleX(var(--p, 0));
          transform-origin: left;
        }

        /* Initial Hidden State */
        .story-ready .fx {
          opacity: 0;
          will-change: transform, opacity, filter;
        }

        /* Sudden Entrance Animations */
        .story-ready .fx.in {
          opacity: 1;
          animation-duration: 650ms;
          animation-delay: var(--d, 0ms);
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Sudden Disappearance Animations */
        .story-ready .fx.out-top {
          animation: exitTop 450ms cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
        }
        .story-ready .fx.out-bottom {
          animation: exitBottom 450ms cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
        }

        .fx.in[data-fx="sudden-zoom-in"] { animation-name: suddenZoomIn; }
        .fx.in[data-fx="sudden-zoom-out"] { animation-name: suddenZoomOut; }
        .fx.in[data-fx="sudden-pop-up"] { animation-name: suddenPopUp; }
        .fx.in[data-fx="sudden-appear"] { animation-name: suddenAppear; }
        .fx.in[data-fx="slam"] { animation-name: suddenSlam; }
        .fx.in[data-fx="wipe"] { animation-name: wipeReveal; }

        @keyframes suddenZoomIn {
          0% { opacity: 0; transform: scale(0.05); }
          60% { opacity: 1; transform: scale(1.18); }
          85% { transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes suddenZoomOut {
          0% { opacity: 0; transform: scale(3.2); filter: blur(18px); }
          65% { opacity: 1; filter: blur(0); transform: scale(0.94); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        @keyframes suddenPopUp {
          0% { opacity: 0; transform: translateY(120px) scale(0.8); }
          65% { opacity: 1; transform: translateY(-12px) scale(1.03); }
          85% { transform: translateY(3px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes suddenAppear {
          0% { opacity: 0; transform: scale(1.3); }
          15% { opacity: 1; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes suddenSlam {
          0% { opacity: 0; transform: scale(4) translateY(-40px); filter: blur(12px); }
          50% { opacity: 1; transform: scale(0.9); filter: blur(0); }
          75% { transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        @keyframes wipeReveal {
          0% { opacity: 0; clip-path: inset(0 100% 0 0); }
          100% { opacity: 1; clip-path: inset(0 0 0 0); }
        }

        @keyframes exitTop {
          0% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
          100% { opacity: 0; transform: scale(1.8) translateY(-60px); filter: blur(14px); }
        }

        @keyframes exitBottom {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.2) translateY(60px); filter: blur(8px); }
        }

        .ping {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #f06a70;
        }
        .ping::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #f06a70;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .parallax {
          transform: translate(
            calc(var(--mx, 0) * 18px),
            calc(var(--my, 0) * 18px)
          );
          transition: transform 250ms ease-out;
        }
        .radar {
          position: absolute;
          inset: 0%;
          border: 1.5px solid rgba(240, 106, 112, 0.35);
          border-radius: 50%;
          opacity: 0;
          animation: radar 3.5s cubic-bezier(0.15, 0.85, 0.35, 1.2) infinite;
        }
        .disc {
          width: 100%;
          height: 100%;
          animation: pulseScale 4s ease-in-out infinite;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 999px;
          background: rgba(26, 26, 26, 0.85);
          backdrop-filter: blur(8px);
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          box-shadow: 0 16px 32px -10px rgba(0, 0, 0, 0.5);
          animation: floatY 3.5s ease-in-out var(--fd, 0s) infinite;
        }
        .chip i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #f06a70;
        }

        .stab {
          padding-bottom: 6px;
          color: #171717;
          transition: transform 200ms ease;
        }
        .stab:hover { transform: translateY(-2px); }
        .stab:not(.stab-on) { opacity: 0.45; }
        .stab:not(.stab-on):hover { opacity: 0.85; }
        .fill {
          position: absolute;
          inset: 0;
          background: #c21f30;
          transform-origin: left;
          animation: progressFill 5.5s linear forwards;
          animation-play-state: var(--ps, running);
        }
        .stage-corner {
          position: absolute;
          top: 0;
          left: 0;
          width: 48px;
          height: 48px;
          border-top: 3px solid #c21f30;
          border-left: 3px solid #c21f30;
          z-index: 5;
        }
        .chapter-view { position: relative; height: 100%; }
        .ch-enter { animation: chEnter 500ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .ch-leave {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          animation: chLeave 400ms cubic-bezier(0.7, 0, 0.84, 0) both;
        }
        .giant {
          position: absolute;
          right: -0.05em;
          bottom: -0.2em;
          font-size: clamp(10rem, 24vw, 18rem);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 2px rgba(194, 31, 48, 0.15);
          pointer-events: none;
        }

        .tile {
          position: relative;
          display: flex;
          min-height: 160px;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
          overflow: hidden;
          padding: 20px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          background: #fff;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease, color 200ms ease, border-color 200ms ease;
        }
        .tile::before {
          content: "";
          position: absolute;
          right: -20%;
          bottom: -50%;
          width: 160%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #c21f30;
          transform: scale(0);
          transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tile:hover {
          z-index: 2;
          transform: translateY(-6px) scale(1.04);
          border-color: #c21f30;
          color: #fff;
          box-shadow: 0 24px 48px -18px rgba(194, 31, 48, 0.5);
        }
        .tile:hover::before { transform: scale(1); }
        .tile-num { color: #c21f30; transition: color 200ms ease; }
        .tile:hover .tile-num { color: #fff; }
        .tile-arrow { color: rgba(0, 0, 0, 0.3); transition: transform 250ms ease, color 200ms ease; }
        .tile:hover .tile-arrow { color: #fff; transform: translate(4px, -4px) scale(1.2); }

        @keyframes radar {
          0% { opacity: 0.9; transform: scale(0.2); }
          100% { opacity: 0; transform: scale(1.4); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          80%, 100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes progressFill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes chEnter {
          0% { opacity: 0; transform: scale(0.3) translateY(60px); filter: blur(12px); }
          70% { opacity: 1; transform: scale(1.03); filter: blur(0); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes chLeave {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.8); filter: blur(16px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .company-story * { animation: none !important; transition: none !important; }
          .story-ready .fx { opacity: 1 !important; transform: none !important; filter: none !important; }
        }
      `}</style>
    </section>
  );
}