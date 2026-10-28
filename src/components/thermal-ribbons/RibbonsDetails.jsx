"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveRight, Printer } from "lucide-react";
import { useId, useRef, useState } from "react";

const tabs = ["Flat head", "Corner edge", "Label stock", "Enquiry details"];
const codes = ["FH / 01", "CE / 02", "LS / 03", "BR / 04"];

export default function RibbonsDetails({ options }) {
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
            ".tr-page .tr-spec-tabs{display:none}.tr-page .tr-spec-panel[data-active=false]{display:flex!important}.tr-page .tr-spec-panel{margin-bottom:20px}"
          }
        </style>
      </noscript>
      <div className="tr-studio-layout">
        <div className="tr-print-study" data-tr-reveal="pop" data-tr-tilt>
          <div className="tr-stage-inner">
            <div className="tr-study-top">
              <Printer size={20} aria-hidden="true" />
              <span>PRINTHEAD STUDY / {codes[active]}</span>
            </div>
            <div className="tr-study-image">
              <Image
                src="/image/products/corner-edge-ribbons.webp"
                alt="Thermal transfer ribbon rolls from the near and corner-edge collection"
                fill
                sizes="(min-width:1440px) 440px,(min-width:901px) 39vw,85vw"
              />
            </div>
            <div className="tr-study-scan" aria-hidden="true" />
            <div className="tr-study-bottom">
              <span>START WITH THE PRINTHEAD.</span>
              <strong>{tabs[active]}</strong>
              <MoveRight size={25} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="tr-studio-copy" data-tr-reveal="rise">
          <p className="tr-studio-kicker">EXPLORE THE PRODUCT FAMILIES</p>
          <div
            ref={tablist}
            className="tr-spec-tabs"
            role="tablist"
            aria-label="Printing specification options"
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
              className="tr-spec-panel"
              data-active={active === index}
            >
              <span className="tr-spec-number">0{index + 1}</span>
              <div>
                <h3>{option.label}</h3>
                <p>{option.value}</p>
              </div>
              <ArrowUpRight size={22} aria-hidden="true" />
            </div>
          ))}
          <div className="tr-studio-note">
            <span aria-hidden="true">↳</span>
            <p>
              Start with your printer model and label stock.
              <br />
              <strong>
                Confirm compatibility and dimensions with our team.
              </strong>
            </p>
          </div>
          <Link href="/contact" className="tr-button tr-button-lime">
            <span>Discuss your print setup</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
