"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function HeatMotion({ children }) {
  const root = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = root.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [...element.querySelectorAll("[data-ht-reveal]")];
    let observer;
    let frame = 0;
    const cleanups = [];

    function revealAll() {
      nodes.forEach((node) => {
        node.removeAttribute("data-ht-pending");
        node.setAttribute("data-ht-visible", "true");
      });
    }

    function setupReveals() {
      observer?.disconnect();
      if (media.matches || !("IntersectionObserver" in window)) {
        revealAll();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-ht-visible", "true");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      nodes.forEach((node) => {
        if (node.getAttribute("data-ht-visible") === "true") return;
        if (node.getBoundingClientRect().top < window.innerHeight - 24) {
          node.setAttribute("data-ht-visible", "true");
          return;
        }
        node.setAttribute("data-ht-pending", "true");
        observer.observe(node);
      });
    }

    function updateProgress() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const distance = Math.max(1, element.offsetHeight - window.innerHeight);
        element.style.setProperty(
          "--ht-progress",
          String(Math.max(0, Math.min(1, -bounds.top / distance))),
        );
        frame = 0;
      });
    }

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      element.querySelectorAll("[data-ht-tilt]").forEach((stage) => {
        function tilt(event) {
          if (media.matches || element.dataset.paused === "true") return;
          const bounds = stage.getBoundingClientRect();
          stage.style.setProperty(
            "--ht-tilt-x",
            `${(-(event.clientY - bounds.top - bounds.height / 2) / bounds.height) * 8}deg`,
          );
          stage.style.setProperty(
            "--ht-tilt-y",
            `${((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 8}deg`,
          );
        }
        function reset() {
          stage.style.setProperty("--ht-tilt-x", "0deg");
          stage.style.setProperty("--ht-tilt-y", "0deg");
        }
        stage.addEventListener("pointermove", tilt);
        stage.addEventListener("pointerleave", reset);
        cleanups.push(() => {
          stage.removeEventListener("pointermove", tilt);
          stage.removeEventListener("pointerleave", reset);
          reset();
        });
      });
    }

    setupReveals();
    updateProgress();
    media.addEventListener("change", setupReveals);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
      media.removeEventListener("change", setupReveals);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      nodes.forEach((node) => node.removeAttribute("data-ht-pending"));
    };
  }, []);

  return (
    <div ref={root} className="ht-motion-root" data-paused={paused}>
      <div className="ht-progress" aria-hidden="true" />
      {children}
      <button
        type="button"
        className="ht-motion-toggle"
        onClick={() => setPaused((current) => !current)}
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
