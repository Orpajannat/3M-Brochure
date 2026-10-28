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
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  Check,
  MoveUpRight,
  Pause,
  Play,
  ScanLine,
} from "lucide-react";

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
  { name: "Sedex", src: "/image/certifications/sedex.png", short: "SEDEX" },
];
const points = ["Quality", "Safety", "Sustainability"];
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const wideSnapshot = () => window.matchMedia("(min-width: 1024px)").matches;
const subscribeLayout = (callback) => {
  const media = window.matchMedia("(min-width: 1024px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const container =
  "mx-auto w-[calc(100%-2.5rem)] max-w-[1280px] sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]";

export default function Certifications() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const enhanced = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const vertical = useSyncExternalStore(
    subscribeLayout,
    wideSnapshot,
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
          duration = 52000;
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
          duration = 4200;
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
                        ? "translateY(35px) scale(.88)"
                        : "translateY(35px)",
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
        const x = ((pointer.x - bounds.left) / bounds.width - 0.5) * 9;
        const y = -((pointer.y - bounds.top) / bounds.height - 0.5) * 7;
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
    if (!panel?.animate || media.matches) return;
    const animation = panel.animate(
      [
        { opacity: 0, transform: "translateY(25px) scale(.9) rotate(2deg)" },
        { opacity: 1, transform: "translateY(0) scale(1) rotate(0deg)" },
      ],
      { duration: 700, easing: "cubic-bezier(.16,1,.3,1)" },
    );
    const reduce = () => {
      if (media.matches) animation.cancel();
    };
    media.addEventListener("change", reduce);
    return () => {
      animation.cancel();
      media.removeEventListener("change", reduce);
    };
  }, [active, enhanced, paused]);

  function handleKey(event, index) {
    let next;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % certifications.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index + certifications.length - 1) % certifications.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = certifications.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      ref={root}
      id="certifications"
      data-certifications
      data-paused={paused}
      aria-labelledby="certifications-title"
      className="relative isolate w-full min-w-0 overflow-hidden bg-[#171d18] py-16 font-sans text-[#f3f1e7] [--cert-focus:#f0ad98] selection:bg-[#f0ad98] selection:text-[#252c22] data-[paused=true]:[&_*]:transition-none motion-reduce:[&_*]:transition-none [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[var(--cert-focus)] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[var(--cert-focus)] [&_[tabindex='0']:focus-visible]:outline-2 [&_[tabindex='0']:focus-visible]:outline-offset-4 [&_[tabindex='0']:focus-visible]:outline-[var(--cert-focus)] sm:py-20 lg:py-28"
    >
      <div
        data-cert-motion="glow"
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 -z-10 size-[430px] rounded-full bg-[#b5533c]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 -right-24 -z-10 size-[620px] rounded-full border border-[#56644c]/25"
      >
        <div className="absolute inset-16 rounded-full border border-[#56644c]/25" />
        <div className="absolute inset-32 rounded-full border border-[#56644c]/25" />
      </div>
      <div className={container}>
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#485442] pb-6">
          <p className="flex items-center gap-3 font-mono text-[9px] tracking-[.12em] text-[#efad99]">
            <span className="size-2 rounded-full bg-[#ed9a83]" />
            CERTIFICATIONS &amp; INITIATIVES
          </p>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            className={`${enhanced ? "inline-flex" : "hidden"} min-h-11 items-center gap-2 rounded-full border border-[#69775f] px-4 py-2.5 text-[10px] font-medium text-[#e4ebdb] transition-colors hover:bg-[#34412e] motion-reduce:hidden`}
          >
            {paused ? (
              <Play size={12} aria-hidden="true" />
            ) : (
              <Pause size={12} aria-hidden="true" />
            )}
            {paused ? "Resume motion" : "Pause motion"}
          </button>
        </div>
        <div className="grid items-end gap-8 pt-10 pb-10 sm:pt-12 sm:pb-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
          <div data-cert-reveal="rise">
            <h2
              id="certifications-title"
              className="text-[clamp(2.3rem,4.7vw,4.7rem)] leading-[1.04] font-medium tracking-[-.055em]"
            >
              Proof in the details.
              <br />
              <span className="font-serif font-normal italic text-[#efad99]">
                Confidence in the making.
              </span>
            </h2>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {points.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full border border-[#65735a] px-3.5 py-2 text-[10px] text-[#dce6d2]"
                >
                  <Check
                    size={12}
                    aria-hidden="true"
                    className="text-[#eaaa94]"
                  />
                  {point}
                </span>
              ))}
            </div>
          </div>
          <div
            data-cert-reveal="rise"
            data-cert-delay="150"
            className="flex items-end gap-6 lg:justify-self-end"
          >
            <span
              aria-hidden="true"
              className="text-[clamp(4.5rem,8vw,7rem)] leading-[.8] font-light tracking-[-.08em] text-[#d2dcc4]"
            >
              05<span className="text-[#efad99]">.</span>
            </span>
            <div className="max-w-[240px]">
              <p className="font-mono text-[9px] tracking-[.1em] text-[#efad99]">
                FIVE MARKS. ONE COLLECTION.
              </p>
              <p className="mt-3 text-xs leading-[1.9] text-[#bbc7b0]">
                Explore the marks featured in our collection and talk to our
                team about your program&apos;s documentation requirements.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`grid gap-6 ${enhanced ? "lg:grid-cols-[.76fr_1.24fr] lg:gap-8" : "grid-cols-1"}`}
        >
          <div
            className={enhanced ? "min-w-0" : "hidden"}
            data-cert-reveal="rise"
          >
            <p className="mb-4 font-mono text-[8px] tracking-[.12em] text-[#bbc7b0]">
              SELECT A MARK / EXPLORE THE COLLECTION
            </p>
            <div
              role={enhanced ? "tablist" : undefined}
              aria-label="Standards and initiatives"
              aria-orientation={vertical ? "vertical" : "horizontal"}
              className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-2.5"
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
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => handleKey(event, index)}
                  className="group flex min-h-[72px] w-full items-center gap-2.5 rounded-2xl border border-[#59674f] bg-[#212a20] px-3 py-3 text-left text-[#dce6d2] transition duration-300 hover:translate-x-1 hover:border-[#93a481] hover:bg-[#2f3d29] aria-selected:border-[#f3f1e7] aria-selected:bg-[#f3f1e7] aria-selected:text-[#252c22] aria-selected:hover:bg-[#e3e8d9] aria-selected:hover:text-[#252c22] lg:min-h-[78px] lg:gap-5 lg:px-6 lg:py-4"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[9px] opacity-80"
                  >
                    0{index + 1}
                  </span>
                  <span className="min-w-0 text-[13px] leading-[1.3] font-medium tracking-[-.025em] sm:text-sm lg:text-lg">
                    {cert.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto hidden size-8 shrink-0 place-items-center rounded-full border border-current opacity-80 lg:grid"
                  >
                    <ArrowDownRight
                      size={17}
                      className="transition-transform group-hover:-rotate-45"
                    />
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-5 flex items-start gap-2.5 text-[10px] leading-[1.85] text-[#bbc7b0]">
              <ScanLine
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#efad99]"
              />
              A closer look at the identities behind the collection.
            </p>
          </div>
          <div
            ref={stage}
            data-cert-stage
            data-cert-reveal="pop"
            className={`relative grid min-w-0 overflow-hidden rounded-[28px] border border-[#a9b59b] bg-[#e9eddf] p-4 text-[#252c22] [perspective:1100px] [--cert-focus:#993524] sm:p-7 ${enhanced ? "min-h-[460px] place-items-center sm:min-h-[560px]" : ""}`}
          >
            <div
              aria-hidden="true"
              className={
                enhanced ? "pointer-events-none absolute inset-0" : "hidden"
              }
            >
              <div
                className="absolute top-1/2 left-1/2 size-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9cae88]/60"
                data-cert-motion="orbit"
              >
                <span className="absolute top-1/2 -left-1.5 size-3 rounded-full bg-[#b94c36]" />
                <span className="absolute top-[11%] right-[11%] size-2 rounded-full bg-[#70865a]" />
              </div>
              <div
                className="absolute top-1/2 left-1/2 size-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#9aaa88]"
                data-cert-motion="counter-orbit"
              >
                <span className="absolute right-[14%] bottom-[14%] size-2 rounded-full bg-[#b94c36]" />
              </div>
              <span className="absolute top-5 left-5 font-mono text-[8px] tracking-[.1em] text-[#5e6b50]">
                THE CONFIDENCE COLLECTION
              </span>
              <span className="absolute right-5 bottom-5 font-mono text-[8px] tracking-[.1em] text-[#5e6b50]">
                DETAILS WORTH A CLOSER LOOK
              </span>
              <div
                data-cert-motion="sweep"
                className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div
              ref={tilt}
              data-cert-tilt
              className={
                enhanced
                  ? "relative z-10 w-full max-w-[560px] px-1 sm:px-4"
                  : "relative grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3"
              }
            >
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
                  className={`${!enhanced || active === index ? "flex" : "hidden"} min-h-[365px] min-w-0 flex-col justify-between rounded-3xl border border-[#ccd3bf] bg-[#fffef9] p-5 shadow-[0_18px_45px_#27341c12] sm:min-h-[420px] sm:p-7`}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[#dce1d2] pb-4">
                    <span className="font-mono text-[8px] tracking-[.1em] text-[#5e6b50]">
                      COLLECTION / {cert.short}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[9px] text-[#8b3e2d]"
                    >
                      0{index + 1} / 05
                    </span>
                  </div>
                  <div className="relative mx-auto my-5 h-[140px] w-full max-w-[260px] sm:h-[175px]">
                    <Image
                      src={cert.src}
                      alt={`${cert.name} mark`}
                      fill
                      sizes="(min-width:640px) 260px,180px"
                      className="object-contain px-4 py-2"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[8px] tracking-[.1em] text-[#5e6b50]">
                      FEATURED IN OUR COLLECTION
                    </p>
                    <h3 className="mt-2.5 text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.1] font-medium tracking-[-.045em]">
                      {cert.name}
                    </h3>
                    <div
                      aria-hidden="true"
                      className="mt-5 flex items-center justify-between gap-4"
                    >
                      <span className="h-px w-12 bg-[#a9b59b]" />
                      <MoveUpRight
                        size={22}
                        strokeWidth={1.3}
                        className="text-[#8b3e2d]"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div
          data-cert-reveal="rise"
          className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#53614a] bg-[#20291f] px-5 py-5 sm:flex-row sm:items-center sm:px-7"
        >
          <div>
            <p className="text-sm font-medium tracking-[-.015em]">
              Your requirements. A closer conversation.
            </p>
            <p className="mt-2 max-w-xl text-xs leading-[1.85] text-[#bbc7b0]">
              Ask our team about the documentation relevant to your branding
              program.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex min-h-12 shrink-0 items-center justify-between gap-5 rounded-full bg-[#f3f1e7] px-5 py-3.5 text-[11px] font-semibold text-[#252c22] transition duration-300 hover:-translate-y-1 hover:bg-[#e7c3b2] [--cert-focus:#f0ad98]"
          >
            <span>Discuss documentation</span>
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-12 overflow-hidden border-y border-[#485442] py-4 sm:mt-16 sm:py-5"
      >
        <div data-cert-motion="marquee" className="flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex min-w-[100vw] shrink-0 items-center justify-around"
            >
              {[...points, ...points, ...points].map((point, index) => (
                <span
                  key={`${point}-${index}`}
                  className={`mr-8 flex items-center gap-8 whitespace-nowrap text-[clamp(2.4rem,6.5vw,5.8rem)] leading-none font-medium tracking-[-.06em] sm:mr-12 sm:gap-12 ${index % 3 === 1 ? "font-serif font-normal italic text-[#efad99]" : "text-[#dce6d2]"}`}
                >
                  {point}
                  <Asterisk
                    size={36}
                    strokeWidth={1.1}
                    data-cert-motion={index < 3 ? "orbit" : undefined}
                    className="text-[#efad99]"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
