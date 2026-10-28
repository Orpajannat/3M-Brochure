"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Ruler } from "lucide-react";
import { useId, useRef, useState } from "react";

const tabs = ["Collection", "Design details", "Dimensions", "Coordination"];

export default function NarrowDetails({ options }) {
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
            ".ni-page .ni-spec-tabs{display:none}.ni-page .ni-spec-panel[data-active=false]{display:flex!important}.ni-page .ni-spec-panel{margin-bottom:20px}"
          }
        </style>
      </noscript>
      <div className="ni-studio-layout">
        <div className="ni-material-study" data-ni-reveal="pop" data-ni-tilt>
          <div className="ni-stage-inner">
            <div className="ni-study-top">
              <span>MATERIAL STUDY / DRAWSTRINGS</span>
              <Ruler size={19} aria-hidden="true" />
            </div>
            <div className="ni-ruler-rail" aria-hidden="true" />
            <div className="ni-study-image">
              <Image
                src="/image/products/drawstrings.webp"
                alt="Colored drawstring cords and finished ends from the accessory collection"
                fill
                sizes="(min-width: 1440px) 440px, (min-width: 901px) 38vw, 85vw"
              />
            </div>
            <div className="ni-study-caption">
              <span>YOUR SPECIFICATIONS.</span>
              <strong>OUR STARTING POINT.</strong>
            </div>
            <div className="ni-study-label" aria-hidden="true">
              <span>0{active + 1}</span>
              <span>{tabs[active].toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="ni-studio-copy" data-ni-reveal="rise">
          <p className="ni-studio-kicker">COORDINATE THE DETAILS</p>
          <div
            ref={tablist}
            className="ni-spec-tabs"
            role="tablist"
            aria-label="Accessory specification options"
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
              className="ni-spec-panel"
              data-active={active === index}
            >
              <span className="ni-spec-number">0{index + 1}</span>
              <div>
                <h3>{option.label}</h3>
                <p>{option.value}</p>
              </div>
              <ArrowDownRight size={25} aria-hidden="true" />
            </div>
          ))}
          <div className="ni-studio-note">
            <span aria-hidden="true">↳</span>
            <p>
              Start with your garment and accessory needs.
              <br />
              <strong>We’ll review the complete picture with you.</strong>
            </p>
          </div>
          <Link href="/contact" className="ni-button ni-button-dark">
            Discuss your specifications{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
