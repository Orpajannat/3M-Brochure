"use client";

import { ArrowDownRight, ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState } from "react";

const tabs = ["Printing", "Variable data", "Paper stocks", "Prepress"];
const boardNames = [
  ["Your brand.", "In color."],
  ["Every detail.", "Made yours."],
  ["Paper with", "personality."],
  ["Ready for", "the press."],
];

export default function PaperPrintStudio({ options }) {
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
    <div className="pp-studio-layout">
      <noscript>
        <style>
          {
            ".pp-page .pp-tech-tabs{display:none}.pp-page .pp-tech-panel[data-active=false]{display:flex!important}.pp-page .pp-tech-panel{margin-bottom:20px}"
          }
        </style>
      </noscript>
      <div
        className={`pp-print-board pp-board-mode-${active}`}
        data-pp-reveal="pop"
        data-pp-tilt
      >
        <div className="pp-stage-inner">
          <span className="pp-board-cross pp-cross-a" aria-hidden="true">
            +
          </span>
          <span className="pp-board-cross pp-cross-b" aria-hidden="true">
            +
          </span>
          <div className="pp-print-plates" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="pp-print-sheet" aria-hidden="true">
            <span>THE PRINT STUDIO / 3M LABEL LIMITED</span>
            <strong>
              {boardNames[active][0]}
              <br />
              <em>{boardNames[active][1]}</em>
            </strong>
            <Asterisk size={40} strokeWidth={1.2} />
            <div className="pp-sheet-rules">
              <i />
              <i />
              <i />
            </div>
            <span className="pp-sheet-bottom">
              PRINT / PERSONALIZE / PRESENT
            </span>
          </div>
          <span className="pp-board-code" aria-hidden="true">
            C + M + Y + K
          </span>
        </div>
      </div>
      <div className="pp-studio-copy" data-pp-reveal="rise">
        <p className="pp-studio-kicker">YOUR DESIGN. THE POSSIBILITIES.</p>
        <div
          ref={tablist}
          className="pp-tech-tabs"
          role="tablist"
          aria-label="Paper production options"
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
            className="pp-tech-panel"
            data-active={active === index}
          >
            <span className="pp-tech-number">0{index + 1}</span>
            <div>
              <h3>{option.label}</h3>
              <p>{option.value}</p>
            </div>
            <ArrowDownRight size={25} aria-hidden="true" />
          </div>
        ))}
        <div className="pp-studio-note">
          <span aria-hidden="true">↳</span>
          <p>
            Bring your artwork, wording, and format.
            <br />
            <strong>We’ll review the right combination with you.</strong>
          </p>
        </div>
        <Link href="/contact" className="pp-button pp-button-lavender">
          Talk through the possibilities{" "}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
