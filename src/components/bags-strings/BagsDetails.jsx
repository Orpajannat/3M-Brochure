"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Link2 } from "lucide-react";
import { useId, useRef, useState } from "react";

const tabs = [
  "Bag collection",
  "Print content",
  "Attachments",
  "Packing brief",
];

export default function BagsDetails({ options }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tablist = useRef(null);
  function handleKey(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tablist.current.children[next].focus();
  }
  return (
    <>
      <noscript>
        <style>
          {
            ".bs-page .bs-spec-tabs{display:none}.bs-page .bs-spec-panel[data-active=false]{display:flex!important}.bs-page .bs-spec-panel{margin-bottom:20px}"
          }
        </style>
      </noscript>
      <div className="bs-studio-layout">
        <div className="bs-packaging-study" data-bs-reveal="pop" data-bs-tilt>
          <div className="bs-stage-inner">
            <div className="bs-study-top">
              <span>CONNECTION STUDY / BRANDED STRINGS</span>
              <Link2 size={20} aria-hidden="true" />
            </div>
            <svg
              className="bs-connection-loop"
              viewBox="0 0 500 500"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M40 390C-10 170 430 20 450 170S100 480 130 300 370 230 470 390"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="5 8"
              />
            </svg>
            <div className="bs-study-image">
              <Image
                src="/image/products/branded-lock-strings.webp"
                alt="Lock strings with circular branded seals from the packaging collection"
                fill
                sizes="(min-width: 1440px) 430px, (min-width: 901px) 38vw, 85vw"
              />
            </div>
            <div className="bs-study-caption">
              <span>THE BRAND CONNECTION.</span>
              <strong>RIGHT DOWN TO THE SEAL.</strong>
            </div>
            <div className="bs-study-label" aria-hidden="true">
              <span>0{active + 1}</span>
              <span>{tabs[active].toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="bs-studio-copy" data-bs-reveal="rise">
          <p className="bs-studio-kicker">CONNECT THE WHOLE PROGRAM</p>
          <div
            ref={tablist}
            className="bs-spec-tabs"
            role="tablist"
            aria-label="Packaging specification options"
          >
            {tabs.map((name, index) => (
              <button
                key={name}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={active === index}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => handleKey(event, index)}
              >
                {name}
              </button>
            ))}
          </div>
          {options.map((option, index) => (
            <div
              key={option.label}
              id={`${id}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${index}`}
              tabIndex={0}
              className="bs-spec-panel"
              data-active={active === index}
            >
              <span className="bs-spec-number">0{index + 1}</span>
              <div>
                <h3>{option.label}</h3>
                <p>{option.value}</p>
              </div>
              <ArrowDownRight size={25} aria-hidden="true" />
            </div>
          ))}
          <div className="bs-studio-note">
            <span aria-hidden="true">↳</span>
            <p>
              The bag, the artwork, and the tag attachment.
              <br />
              <strong>Let’s review the full combination together.</strong>
            </p>
          </div>
          <Link href="/contact" className="bs-button bs-button-blue">
            <span>Discuss your packaging brief</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}

