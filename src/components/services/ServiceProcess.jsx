import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  PackageCheck,
  Palette,
  Printer,
  Truck,
} from "lucide-react";
import SectionHeading, { container } from "./SectionHeading";

const steps = [
  {
    icon: ClipboardList,
    title: "Order & connect",
    text: "Direct internet order entry, confirmations, and change orders through our EDI-based system.",
  },
  {
    icon: Palette,
    title: "Prepare & proof",
    text: "Color separation, platemaking, and production preparation for your branding requirements.",
  },
  {
    icon: Printer,
    title: "Print & produce",
    text: "Offset, laser, and label production matched to your product and variable-data needs.",
  },
  {
    icon: PackageCheck,
    title: "Finish & check",
    text: "Computerized cutting, folding, SKU sorting, and careful in-house quality control.",
  },
  {
    icon: Truck,
    title: "Ship & track",
    text: "Carrier selection, vendor delivery, online tracking, and delivery confirmations.",
  },
];

export default function ServiceProcess() {
  return (
    <section
      id="how-we-work"
      data-services-section="process"
      aria-label="How we work"
      className="relative scroll-mt-24 overflow-hidden bg-[#252d25] [--sv-focus:#f2b6a7] py-16 text-[#f6f4ef] sm:py-20 lg:py-28"
    >
      <div
        className="pointer-events-none absolute -top-32 -right-20 size-[500px] rounded-full border border-[#58624f]/50"
        aria-hidden="true"
      >
        <div className="absolute inset-12 rounded-full border border-[#58624f]/50" />
        <div className="absolute inset-24 rounded-full border border-[#58624f]/50" />
      </div>
      <div className={`${container} relative`}>
        <div className="grid items-end gap-7 md:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            number="03"
            eyebrow="THE WAY IT ALL CONNECTS"
            title={
              <>
                From a first thought.
                <br />
                <span className="font-serif font-normal italic text-[#f2b6a7]">
                  To the final mile.
                </span>
              </>
            }
            light
          />
          <p
            data-sv-reveal="rise"
            className="max-w-sm text-sm leading-[1.9] text-[#c3c9bc] md:justify-self-end"
          >
            Our EDI-based system keeps orders, production, inventory, and
            delivery reporting connected at every stage.
          </p>
        </div>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              data-sv-reveal="pop"
              data-sv-delay={index * 90}
              className="group relative min-w-0 rounded-2xl border border-[#53614a] bg-[#2d382b] p-6 transition duration-500 hover:-translate-y-1 hover:bg-[#37452f] md:last:col-span-2 xl:last:col-span-1"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-[#718463] text-[#ebbcac]">
                  <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] text-[#aeba9f]">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-9 text-xl leading-[1.15] font-medium tracking-[-.035em]">
                {title}
              </h3>
              <p className="mt-4 text-xs leading-[1.9] text-[#c3c9bc]">
                {text}
              </p>
              <span
                aria-hidden="true"
                className="mt-8 inline-flex text-[#e6a896]"
              >
                <ArrowRight
                  size={23}
                  className="transition-transform group-hover:translate-x-2"
                />
              </span>
            </li>
          ))}
        </ol>
        <div
          data-sv-reveal="rise"
          className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-[#53614a] px-6 py-5 sm:flex-row sm:items-center"
        >
          <p className="flex items-center gap-3 text-xs leading-relaxed text-[#d2d9cb]">
            <span className="size-2 shrink-0 rounded-full bg-[#e9a491]" />
            Online visibility into inventory, production, and delivery.
          </p>
          <a
            href="#distribution"
            className="inline-flex min-h-10 shrink-0 items-center gap-3 text-[11px] font-medium text-[#f2b6a7]"
          >
            Explore distribution
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
