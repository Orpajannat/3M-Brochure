"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Layers3, Printer, ScanLine } from "lucide-react";
import SectionHeading, { container } from "./SectionHeading";
import { useServicesEnhanced } from "./ServicesMotion";

const capabilities = [
  {
    id: "offset",
    label: "Offset printing",
    icon: Printer,
    title: "Color that stays true to your brand.",
    description:
      "Our offset division brings together extensive prepress services and sophisticated 4- and 5-color printing technology for smooth, efficient production.",
    points: [
      "Color separation and platemaking",
      "Electronic inking on press",
      "Small and large ticketing orders",
    ],
    image: "offset-printing",
    alt: "Multi-color offset presses on the production floor",
    note: "4 & 5 COLOR",
    caption: "From prepress to the finished impression",
  },
  {
    id: "laser",
    label: "High-speed laser",
    icon: ScanLine,
    title: "Variable information. Consistent quality.",
    description:
      "Cost-effective laser printing delivers offset-quality results for demanding ticketing needs. Encode adhesive labels and integrated hangtags with the flexibility your SKUs require.",
    points: [
      "Variable encoding for labels and hangtags",
      "No minimum run requirement by SKU",
      "Flexibility, speed, and cost savings",
    ],
    image: "prepress",
    alt: "Printed label and ticket artwork in the brochure production workspace",
    note: "VARIABLE DATA",
    caption: "A flexible approach to individual SKUs",
  },
  {
    id: "woven",
    label: "Woven labels",
    icon: Layers3,
    title: "An identity in every thread.",
    description:
      "Choose production methods, weaves, and yarns that suit your individual branding requirements, with a wide selection of stock yarn colors and finishes.",
    points: [
      "Broadloom and needleloom production",
      "Twill, taffeta, satin, and damask weaves",
      "Stock yarn colors and a variety of finishes",
    ],
    image: "quality-control",
    alt: "A production specialist examining branding artwork and color samples",
    note: "CUSTOM FINISHES",
    caption: "Production choices tailored to your identity",
  },
];

export default function ProductionCapabilities() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const id = useId();
  const enhanced = useServicesEnhanced();
  function handleKeyDown(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % capabilities.length;
    else if (event.key === "ArrowLeft")
      next = (index + capabilities.length - 1) % capabilities.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = capabilities.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      id="production"
      data-services-section="production"
      aria-label="Production capabilities"
      className="scroll-mt-24 bg-[#e7ebdf] py-16 sm:py-20 lg:py-28"
    >
      <div className={container}>
        <div className="mb-9 grid items-end gap-6 md:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            number="02"
            eyebrow="THE PRODUCTION PLAYBOOK"
            title={
              <>
                A method for
                <br />
                <span className="font-serif font-normal italic text-[#a52d21]">
                  every mark.
                </span>
              </>
            }
          />
          <p
            className="max-w-sm text-sm leading-[1.9] text-[#64695e] md:justify-self-end"
            data-sv-reveal="rise"
          >
            Different techniques. The same attention to detail. Explore the
            production capabilities behind your next branding program.
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Printing and label capabilities"
          className={`${enhanced ? "flex" : "hidden"} mb-6 flex-wrap gap-2`}
          data-production-tabs
        >
          {capabilities.map(({ id: tabId, label, icon: Icon }, index) => (
            <button
              key={tabId}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#b6c1aa] bg-transparent px-4 py-3 text-[11px] font-medium text-[#47553b] transition-colors hover:bg-[#d2dcc8] aria-selected:border-[#252722] aria-selected:bg-[#252722] aria-selected:text-white aria-selected:hover:bg-[#41483a] aria-selected:hover:text-white sm:px-5 sm:text-xs"
            >
              <Icon size={17} aria-hidden="true" />
              {label}
              <span aria-hidden="true" className="ml-1 font-mono text-[9px]">
                0{index + 1}
              </span>
            </button>
          ))}
        </div>
        {capabilities.map((item, index) => (
          <div
            key={item.id}
            id={`${id}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={enhanced ? `${id}-tab-${index}` : undefined}
            aria-label={enhanced ? undefined : item.label}
            tabIndex={0}
            data-production-panel
            data-active={active === index}
            className={`${!enhanced || active === index ? "grid" : "hidden"} mt-5 overflow-hidden rounded-[28px] border border-[#cbd3c0] bg-[#fffdf8] lg:grid-cols-[1.05fr_1fr]`}
          >
            <div className="group relative min-h-[280px] overflow-hidden bg-[#cfd8c3] sm:min-h-[380px] lg:min-h-[520px]">
              <Image
                src={`/image/services/${item.image}.webp`}
                alt={item.alt}
                fill
                sizes="(min-width:1440px) 660px,(min-width:1024px) 48vw,90vw"
                className="object-cover transition duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162014]/85 via-transparent to-transparent" />
              <span className="absolute top-6 left-6 rounded-full border border-white/50 bg-[#252722]/40 px-4 py-2 font-mono text-[9px] tracking-[.08em] text-white backdrop-blur-md">
                {item.note}
              </span>
              <p className="absolute right-7 bottom-7 left-7 max-w-[300px] text-xl leading-snug tracking-[-.025em] text-white sm:text-2xl">
                {item.caption}
              </p>
            </div>
            <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-12">
              <span className="font-mono text-[9px] tracking-[.13em] text-[#a52d21]">
                THE CRAFT / 0{index + 1}
              </span>
              <h3 className="mt-5 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.1] font-medium tracking-[-.05em]">
                {item.title}
              </h3>
              <p className="mt-6 text-[13px] leading-[1.9] text-[#64695e]">
                {item.description}
              </p>
              <ul className="mt-7 space-y-3.5">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-xs leading-relaxed text-[#4d5a43]"
                  >
                    <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-[#e7ebdf]">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="#start-a-project"
                className="group mt-8 inline-flex min-h-11 items-center gap-3 self-start text-xs font-semibold"
              >
                <span>Discuss your requirements</span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="text-[#a52d21] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
