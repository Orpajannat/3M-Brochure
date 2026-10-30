"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import {
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

/*
  Structure (top to bottom, all on one 12-column grid):
    1. Slim ticker
    2. Header: headline (7 cols) + intro (4 cols)
    3. Three-point strip with hairline dividers
    4. One module: [ rail of five marks ] / [ detail + controls ]
    5. Contact bar

  Type: Instrument Serif (one weight, so no font-bold on serif) + DM Sans.
  Palette: white #ffffff / black #0a0a0a / red #c8102e / warm grey #faf9f7 / grey #f5f4f2
*/

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cert-serif",
});
const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cert-sans",
});

const certifications = [
  { name: "ISO 9001:2015", src: "/image/certifications/iso.png", short: "ISO" },
  { name: "FSC", src: "/image/certifications/fsc.png", short: "FSC" },
  {
    name: "OEKO-TEX Standard 100",
    src: "/image/certifications/oeko-tex.png",
    short: "OEKO-TEX",
  },
  {
    name: "Global Recycled Standard",
    src: "/image/certifications/grs.png",
    short: "GRS",
  },
  { name: "Sedex", src: "/image/certifications/sedex.png", short: "Sedex" },
];
const points = ["Quality", "Safety", "Sustainability"];
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const container =
  "mx-auto w-[calc(100%-2.5rem)] max-w-[1180px] sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]";
const display = "font-[family-name:var(--font-cert-serif)] font-normal";
const count = certifications.length;
const last = count - 1;

export default function Certifications() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const enhanced = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const root = useRef(null);
  const stage = useRef(null);
  const tilt = useRef(null);
  const tabs = useRef([]);
  const id = useId();

  useEffect(() => {
    if (!enhanced) return;
    const element = root.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const owned = new Set();
    let loops = [];
    let revealObserver;
    let viewportObserver;
    let pointerAnimation;
    let frame = 0;
    let pointer = { x: 0, y: 0 };

    function animate(node, keyframes, options) {
      if (!node?.animate) return null;
      const animation = node.animate(keyframes, options);
      owned.add(animation);
      if (options.iterations !== Infinity)
        animation.onfinish = () => {
          owned.delete(animation);
          animation.cancel();
        };
      return animation;
    }
    function stop() {
      revealObserver?.disconnect();
      viewportObserver?.disconnect();
      owned.forEach((animation) => animation.cancel());
      owned.clear();
      loops = [];
      cancelAnimationFrame(frame);
      frame = 0;
      pointerAnimation?.cancel();
    }
    function setup() {
      stop();
      if (paused || media.matches) return;
      element.querySelectorAll("[data-cert-motion]").forEach((node) => {
        let frames;
        let duration;
        const type = node.dataset.certMotion;
        if (type === "orbit" || type === "counter-orbit") {
          frames = [
            { transform: "rotate(0deg)" },
            { transform: `rotate(${type === "orbit" ? 360 : -360}deg)` },
          ];
          duration = type === "orbit" ? 24000 : 36000;
        }
        if (type === "marquee") {
          frames = [
            { transform: "translateX(0)" },
            { transform: "translateX(-50%)" },
          ];
          duration = 60000;
        }
        if (type === "sweep") {
          frames = [
            {
              transform: "translateX(-130%) skewX(-18deg)",
              opacity: 0,
              offset: 0,
            },
            { opacity: 0.5, offset: 0.2 },
            {
              transform: "translateX(440%) skewX(-18deg)",
              opacity: 0,
              offset: 0.7,
            },
            {
              transform: "translateX(440%) skewX(-18deg)",
              opacity: 0,
              offset: 1,
            },
          ];
          duration = 5200;
        }
        if (type === "glow") {
          frames = [
            { transform: "translate(0,0) scale(1)", opacity: 0.35 },
            { transform: "translate(35px,-25px) scale(1.12)", opacity: 0.65 },
            { transform: "translate(0,0) scale(1)", opacity: 0.35 },
          ];
          duration = 9500;
        }
        if (!frames) return;
        const animation = animate(node, frames, {
          duration,
          iterations: Infinity,
          easing: type === "glow" ? "ease-in-out" : "linear",
        });
        if (animation) {
          animation.pause();
          loops.push(animation);
        }
      });
      if ("IntersectionObserver" in window) {
        viewportObserver = new IntersectionObserver(
          ([entry]) =>
            loops.forEach((animation) =>
              entry.isIntersecting ? animation.play() : animation.pause(),
            ),
          { threshold: 0 },
        );
        viewportObserver.observe(element);
        revealObserver = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const node = entry.target;
              node.dataset.certVisible = "true";
              animate(
                node,
                [
                  {
                    opacity: 0,
                    transform:
                      node.dataset.certReveal === "pop"
                        ? "translateY(30px) scale(.97)"
                        : "translateY(30px)",
                  },
                  { opacity: 1, transform: "translateY(0) scale(1)" },
                ],
                {
                  duration: 900,
                  delay: Number(node.dataset.certDelay || 0),
                  easing: "cubic-bezier(.16,1,.3,1)",
                  fill: "backwards",
                },
              );
              revealObserver.unobserve(node);
            }),
          { threshold: 0.08, rootMargin: "0px 0px -16px 0px" },
        );
        element
          .querySelectorAll("[data-cert-reveal]:not([data-cert-visible])")
          .forEach((node) => revealObserver.observe(node));
      } else loops.forEach((animation) => animation.play());
    }
    function pointerMove(event) {
      if (
        paused ||
        media.matches ||
        event.pointerType !== "mouse" ||
        !tilt.current
      )
        return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = stage.current.getBoundingClientRect();
        const x = ((pointer.x - bounds.left) / bounds.width - 0.5) * 2.5;
        const y = -((pointer.y - bounds.top) / bounds.height - 0.5) * 2;
        const from = getComputedStyle(tilt.current).transform;
        pointerAnimation?.cancel();
        pointerAnimation = tilt.current.animate(
          [
            { transform: from },
            { transform: `rotateX(${y}deg) rotateY(${x}deg)` },
          ],
          { duration: 400, fill: "forwards", easing: "ease-out" },
        );
      });
    }
    function pointerLeave() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!tilt.current) return;
      const from = getComputedStyle(tilt.current).transform;
      pointerAnimation?.cancel();
      if (paused || media.matches) return;
      pointerAnimation = tilt.current.animate(
        [{ transform: from }, { transform: "none" }],
        { duration: 450, easing: "ease-out" },
      );
    }
    const stageElement = stage.current;
    setup();
    media.addEventListener("change", setup);
    if (finePointer) {
      stageElement.addEventListener("pointermove", pointerMove);
      stageElement.addEventListener("pointerleave", pointerLeave);
    }
    return () => {
      stop();
      media.removeEventListener("change", setup);
      stageElement.removeEventListener("pointermove", pointerMove);
      stageElement.removeEventListener("pointerleave", pointerLeave);
    };
  }, [enhanced, paused]);

  useEffect(() => {
    if (!enhanced || paused) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const panel = root.current.querySelector(
      '[data-cert-panel][data-active="true"]',
    );
    if (!panel || media.matches) return;
    const animations = [];
    const plate = panel.querySelector("[data-cert-disc]");
    if (panel.animate)
      animations.push(
        panel.animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 600, easing: "cubic-bezier(.16,1,.3,1)" },
        ),
      );
    if (plate?.animate)
      animations.push(
        plate.animate(
          [
            { opacity: 0, transform: "scale(.82) rotate(-8deg)" },
            { opacity: 1, transform: "scale(1) rotate(0deg)" },
          ],
          {
            duration: 900,
            delay: 120,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "backwards",
          },
        ),
      );
    const reduce = () => {
      if (media.matches) animations.forEach((animation) => animation.cancel());
    };
    media.addEventListener("change", reduce);
    return () => {
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener("change", reduce);
    };
  }, [active, enhanced, paused]);

  function go(next, focus = false) {
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  }
  function handleKey(event, index) {
    let next;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + count - 1) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    go(next, true);
  }

  const iconButton =
    "grid size-10 place-items-center rounded-full border border-black/15 text-black transition-colors duration-300 hover:border-[#c8102e] hover:bg-[#c8102e] hover:text-white";

  return (
    <section
      ref={root}
      id="certifications"
      data-certifications
      data-paused={paused}
      aria-labelledby="certifications-title"
      className={`${serif.variable} ${sans.variable} relative isolate w-full min-w-0 overflow-hidden bg-white pb-20 font-[family-name:var(--font-cert-sans)] text-[#0a0a0a] [--cert-focus:#c8102e] selection:bg-[#c8102e] selection:text-white data-[paused=true]:[&_*]:transition-none motion-reduce:[&_*]:transition-none [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[var(--cert-focus)] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[var(--cert-focus)] [&_[tabindex='0']:focus-visible]:outline-2 [&_[tabindex='0']:focus-visible]:outline-offset-4 [&_[tabindex='0']:focus-visible]:outline-[var(--cert-focus)] sm:pb-28`}
    >
      {/* 1. Ticker */}
      <div
        aria-hidden="true"
        className="overflow-hidden bg-[#0a0a0a] py-2.5 text-xs text-white/80"
      >
        <div data-cert-motion="marquee" className="flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex min-w-[100vw] shrink-0 items-center justify-around"
            >
              {[...points, ...points, ...points, ...points].map(
                (point, index) => (
                  <span
                    key={`${point}-${index}`}
                    className="mr-10 flex items-center gap-10 whitespace-nowrap"
                  >
                    {point}
                    <Asterisk
                      size={12}
                      strokeWidth={2.4}
                      data-cert-motion={index < 4 ? "orbit" : undefined}
                      className="text-[#e0222f]"
                    />
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        data-cert-motion="glow"
        aria-hidden="true"
        className="pointer-events-none absolute top-24 -right-40 -z-10 size-[460px] rounded-full bg-[#c8102e]/[.06] blur-3xl"
      />

      <div className={`${container} pt-16 sm:pt-24`}>
        {/* 2. Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2
            id="certifications-title"
            data-cert-reveal="rise"
            className={`${display} text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.08] tracking-[-.015em] lg:col-span-7`}
          >
            Proof in the details.
            <br />
            <span className="text-[#c8102e] italic">
              Confidence in the making.
            </span>
          </h2>
          <p
            data-cert-reveal="rise"
            data-cert-delay="120"
            className="max-w-md text-sm leading-[1.85] text-black/65 lg:col-span-4 lg:col-start-9"
          >
            Five marks, one collection. Explore the marks featured in our
            collection and talk to our team about your program&apos;s
            documentation requirements.
          </p>
        </div>

        {/* 3. Points strip */}
        <ul
          data-cert-reveal="rise"
          className="mt-10 grid grid-cols-3 border-y border-black/10"
        >
          {points.map((point) => (
            <li
              key={point}
              className="flex items-center justify-center gap-2 border-r border-black/10 px-2 py-4 text-[13px] last:border-r-0 sm:justify-start sm:gap-3 sm:px-6 sm:text-sm"
            >
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#c8102e] text-white">
                <Check size={11} strokeWidth={3} aria-hidden="true" />
              </span>
              {point}
            </li>
          ))}
        </ul>

        {/* 4. Module */}
        <div
          ref={stage}
          data-cert-stage
          data-cert-reveal="pop"
          className="mt-10 min-w-0 [perspective:1400px] sm:mt-14"
        >
          <div
            ref={tilt}
            data-cert-tilt
            className={
              enhanced
                ? "overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_40px_70px_-40px_rgba(0,0,0,.18)]"
                : "grid gap-6"
            }
          >
            {/* rail zone */}
            <div
              className={`${enhanced ? "block" : "hidden"} border-b border-black/10 bg-[#faf9f7] px-4 pt-6 pb-8 sm:px-10 sm:pt-8 sm:pb-10`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-black/55">Choose a certification</p>
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  aria-pressed={paused}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium transition-colors hover:border-black hover:bg-black hover:text-white motion-reduce:hidden"
                >
                  {paused ? (
                    <Play size={12} aria-hidden="true" />
                  ) : (
                    <Pause size={12} aria-hidden="true" />
                  )}
                  {paused ? "Resume motion" : "Pause motion"}
                </button>
              </div>

              <div className="relative mt-8">
                <div
                  aria-hidden="true"
                  className="absolute top-[31px] right-[10%] left-[10%] h-[2px] overflow-hidden bg-black/10 sm:top-[39px]"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-[#c8102e] transition-[width] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                    style={{ width: `${(active / last) * 100}%` }}
                  />
                  <div
                    data-cert-motion="sweep"
                    className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  />
                </div>
                <div
                  role={enhanced ? "tablist" : undefined}
                  aria-label="Standards and initiatives"
                  aria-orientation="horizontal"
                  className="relative grid grid-cols-5"
                >
                  {certifications.map((cert, index) => (
                    <button
                      key={cert.name}
                      ref={(node) => {
                        tabs.current[index] = node;
                      }}
                      id={`${id}-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-label={cert.name}
                      aria-selected={active === index}
                      aria-controls={`${id}-panel-${index}`}
                      tabIndex={active === index ? 0 : -1}
                      onClick={() => go(index)}
                      onKeyDown={(event) => handleKey(event, index)}
                      className="group flex min-w-0 flex-col items-center gap-4 px-1 text-center"
                    >
                      <span className="relative grid size-16 place-items-center sm:size-20">
                        <span
                          aria-hidden="true"
                          data-cert-motion="orbit"
                          className="absolute -inset-2 rounded-full border border-[#c8102e]/60 opacity-0 transition-opacity duration-500 group-aria-selected:opacity-100"
                        >
                          <span className="absolute top-1/2 -left-[3px] size-1.5 rounded-full bg-[#c8102e]" />
                        </span>
                        <span
                          aria-hidden="true"
                          data-cert-motion="counter-orbit"
                          className="absolute -inset-4 rounded-full border border-black/10 opacity-0 transition-opacity duration-500 group-aria-selected:opacity-100"
                        >
                          <span className="absolute top-[12%] right-[12%] size-1 rounded-full bg-black/50" />
                        </span>
                        <span className="relative size-full overflow-hidden rounded-full border border-black/15 bg-white transition duration-300 group-hover:-translate-y-1 group-hover:border-black group-aria-selected:border-[#c8102e] group-aria-selected:shadow-[0_10px_24px_rgba(200,16,46,.18)]">
                          <Image
                            src={cert.src}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-contain p-3 grayscale transition duration-300 group-hover:grayscale-0 group-aria-selected:grayscale-0 sm:p-4"
                          />
                        </span>
                      </span>
                      <span className="flex min-h-[2.4em] items-start text-xs leading-snug text-black/50 transition-colors group-hover:text-black group-aria-selected:font-medium group-aria-selected:text-black sm:text-sm">
                        <span className="sm:hidden">{cert.short}</span>
                        <span className="hidden sm:inline">{cert.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* detail zone */}
            <div
              className={
                enhanced ? "relative p-4 sm:p-6" : "grid gap-6"
              }
            >
              <div
                aria-hidden="true"
                className={`${enhanced ? "block" : "hidden"} pointer-events-none absolute inset-x-4 top-0 z-10 h-0 sm:inset-x-10`}
              >
                <span
                  className="absolute -top-2 size-4 rotate-45 border-t border-l border-black/10 bg-white transition-[left] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{ left: `calc(${active * 20 + 10}% - 8px)` }}
                />
              </div>

              {certifications.map((cert, index) => (
                <article
                  key={cert.name}
                  id={`${id}-panel-${index}`}
                  data-cert-panel={index}
                  data-active={active === index}
                  role={enhanced ? "tabpanel" : undefined}
                  aria-labelledby={enhanced ? `${id}-tab-${index}` : undefined}
                  aria-label={enhanced ? undefined : cert.name}
                  tabIndex={enhanced ? 0 : undefined}
                  className={`${!enhanced || active === index ? "grid" : "hidden"} min-w-0 gap-6 lg:grid-cols-[1fr_.85fr] lg:gap-10 ${enhanced ? "" : "rounded-2xl border border-black/10 p-4"}`}
                >
                  {/* copy column */}
                  <div className="order-2 flex min-w-0 flex-col justify-between gap-10 px-2 pt-2 pb-2 sm:px-4 lg:order-1 lg:py-4">
                    <p className="flex items-center gap-2.5 text-sm font-medium">
                      <span
                        aria-hidden="true"
                        className="size-2 rounded-full bg-[#c8102e]"
                      />
                      Featured in our collection
                    </p>
                    <div>
                      <h3
                        className={`${display} text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.1] tracking-[-.01em] [overflow-wrap:anywhere]`}
                      >
                        {cert.name}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-[1.85] text-black/65">
                        Ask our team which documentation applies to your
                        branding program, and how this mark fits into your
                        order.
                      </p>
                    </div>
                    <div
                      className={`${enhanced ? "flex" : "hidden"} items-center justify-between gap-4 border-t border-black/10 pt-5`}
                    >
                      <span className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/70">
                        {cert.short}
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="mr-1 text-xs text-black/50"
                        >
                          {index + 1} / {count}
                        </span>
                        <button
                          type="button"
                          aria-label="Previous certification"
                          onClick={() => go((index + last) % count, true)}
                          className={iconButton}
                        >
                          <ChevronLeft size={18} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next certification"
                          onClick={() => go((index + 1) % count, true)}
                          className={iconButton}
                        >
                          <ChevronRight size={18} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* visual column */}
                  <div className="relative order-1 grid min-h-[260px] place-items-center overflow-hidden rounded-2xl bg-[#f5f4f2] p-6 lg:order-2 lg:min-h-[340px]">
                    <div
                      aria-hidden="true"
                      data-cert-motion="sweep"
                      className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/90 to-transparent"
                    />
                    <div className="relative aspect-square w-full max-w-[230px]">
                      <div
                        aria-hidden="true"
                        data-cert-motion="orbit"
                        className="absolute -inset-[8%] rounded-full border border-[#c8102e]/40"
                      >
                        <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-[#c8102e]" />
                      </div>
                      <div
                        aria-hidden="true"
                        data-cert-motion="counter-orbit"
                        className="absolute -inset-[22%] rounded-full border border-black/10"
                      >
                        <span className="absolute right-[14%] bottom-[14%] size-1.5 rounded-full bg-black/60" />
                      </div>
                      <div
                        data-cert-disc
                        className="absolute inset-0 rounded-full bg-white shadow-[0_14px_34px_rgba(0,0,0,.08)]"
                      >
                        <Image
                          src={cert.src}
                          alt={`${cert.name} mark`}
                          fill
                          sizes="230px"
                          className="object-contain p-[16%]"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Contact bar */}
        <div
          data-cert-reveal="rise"
          className="relative mt-10 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-[#c8102e] px-6 py-8 text-white [--cert-focus:#ffffff] sm:mt-14 sm:px-10 md:flex-row md:items-center"
        >
          <div
            data-cert-motion="glow"
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-white/25 blur-3xl"
          />
          <div className="relative">
            <p
              className={`${display} text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.15] tracking-[-.01em]`}
            >
              Your requirements. A closer conversation.
            </p>
            <p className="mt-2 max-w-md text-sm leading-[1.85] text-white/80">
              Ask our team about the documentation relevant to your branding
              program.
            </p>
          </div>
          <Link
            href="/contact"
            className="group relative inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-white"
          >
            <span>Discuss documentation</span>
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}