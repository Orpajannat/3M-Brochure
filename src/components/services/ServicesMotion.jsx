"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
export function useServicesEnhanced() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

export default function ServicesMotion({ children }) {
  const root = useRef(null);
  const [paused, setPaused] = useState(false);
  const enhanced = useServicesEnhanced();
  useEffect(() => {
    const element = root.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set();
    let observer;
    function stop() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }
    function animate(node, frames, options) {
      if (!node.animate) return;
      const animation = node.animate(frames, options);
      animations.add(animation);
      animation.onfinish = () => {
        animations.delete(animation);
        animation.cancel();
      };
    }
    function setup() {
      stop();
      if (paused || media.matches) return;
      element.querySelectorAll("[data-sv-motion]").forEach((node) => {
        const type = node.dataset.svMotion;
        if (type === "float")
          animate(
            node,
            [
              { transform: "translateY(0) rotate(-3deg)" },
              { transform: "translateY(-15px) rotate(1deg)" },
              { transform: "translateY(0) rotate(-3deg)" },
            ],
            { duration: 6500, iterations: Infinity, easing: "ease-in-out" },
          );
        if (type === "spin")
          animate(
            node,
            [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
            { duration: 30000, iterations: Infinity },
          );
        if (type === "marquee")
          animate(
            node,
            [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
            { duration: 35000, iterations: Infinity },
          );
        if (type === "dash")
          animate(node, [{ strokeDashoffset: 0 }, { strokeDashoffset: -56 }], {
            duration: 4000,
            iterations: Infinity,
          });
      });
      if (!("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const node = entry.target;
            node.dataset.svVisible = "true";
            const pop = node.dataset.svReveal === "pop";
            animate(
              node,
              [
                {
                  opacity: 0,
                  transform: pop
                    ? "translateY(38px) scale(.92)"
                    : "translateY(32px)",
                },
                { opacity: 1, transform: "translateY(0) scale(1)" },
              ],
              {
                duration: 850,
                delay: Number(node.dataset.svDelay || 0),
                easing: "cubic-bezier(.16,1,.3,1)",
                fill: "backwards",
              },
            );
            observer.unobserve(node);
          });
        },
        { threshold: 0.09, rootMargin: "0px 0px -20px 0px" },
      );
      element
        .querySelectorAll("[data-sv-reveal]:not([data-sv-visible])")
        .forEach((node) => observer.observe(node));
    }
    setup();
    media.addEventListener("change", setup);
    return () => {
      stop();
      media.removeEventListener("change", setup);
    };
  }, [paused]);

  return (
    <div
      ref={root}
      data-services-page
      data-paused={paused}
      className="relative isolate bg-[#f6f4ef] font-sans text-[#252722] [--sv-focus:#a52d21] selection:bg-[#dd4937] selection:text-white data-[paused=true]:[&_*]:transition-none motion-reduce:[&_*]:transition-none [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[var(--sv-focus)] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[var(--sv-focus)] [&_summary:focus-visible]:outline-2 [&_summary:focus-visible]:outline-offset-4 [&_summary:focus-visible]:outline-[var(--sv-focus)] [&_[tabindex='0']:focus-visible]:outline-2 [&_[tabindex='0']:focus-visible]:outline-offset-4 [&_[tabindex='0']:focus-visible]:outline-[var(--sv-focus)]"
    >
      {children}
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        className={`${enhanced ? "inline-flex" : "hidden"} fixed right-4 bottom-4 z-40 items-center gap-2 rounded-full border border-white/30 bg-[#252722] px-4 py-3 text-[11px] font-medium text-white shadow-lg transition-colors hover:bg-[#a52d21] focus-visible:ring-4 focus-visible:ring-white motion-reduce:hidden sm:right-6 sm:bottom-6`}
      >
        {paused ? (
          <Play size={13} aria-hidden="true" />
        ) : (
          <Pause size={13} aria-hidden="true" />
        )}
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </div>
  );
}
