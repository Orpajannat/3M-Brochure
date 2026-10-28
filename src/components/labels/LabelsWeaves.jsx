"use client";

import { useId, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";

const weaves = [
  {
    name: "Twill",
    note: "One of the weave choices in our woven-label collection. Share your artwork to discuss a twill label for your program.",
  },
  {
    name: "Taffeta",
    note: "Explore taffeta as part of your woven-label brief, alongside your dimensions, yarn colors, and preferred finish.",
  },
  {
    name: "Satin",
    note: "A satin weave is available within our label range. Our team can review it against your branding and garment requirements.",
  },
  {
    name: "Damask",
    note: "Consider damask for your woven brand label. Send your design so we can review the weave, colors, and finishing together.",
  },
];

export default function LabelsWeaves() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef(null);

  function handleKey(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % weaves.length;
    if (event.key === "ArrowLeft")
      next = (index + weaves.length - 1) % weaves.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = weaves.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current.children[next].focus();
  }

  return (
    <div className="lp-weave-selector">
      <div className="lp-weave-label">
        <span>FIND YOUR TEXTURE</span>
        <span>0{active + 1} / 04</span>
      </div>
      <div
        ref={tabs}
        className="lp-weave-tabs"
        role="tablist"
        aria-label="Woven label weave choices"
      >
        {weaves.map((weave, index) => (
          <button
            key={weave.name}
            id={`${id}-tab-${index}`}
            role="tab"
            type="button"
            aria-selected={active === index}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKey(event, index)}
          >
            <span
              className={`lp-weave-swatch lp-swatch-${index}`}
              aria-hidden="true"
            />
            {weave.name}
          </button>
        ))}
      </div>
      {weaves.map((weave, index) => (
        <div
          key={weave.name}
          id={`${id}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
          className="lp-weave-panel"
        >
          <ArrowDownRight size={22} aria-hidden="true" />
          <p>{weave.note}</p>
        </div>
      ))}
    </div>
  );
}
