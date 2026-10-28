import Image from "next/image";
import {
  Check,
  Crosshair,
  PackageCheck,
  Scissors,
  ShieldCheck,
} from "lucide-react";
import SectionHeading, { container } from "./SectionHeading";

const checks = [
  {
    icon: Crosshair,
    title: "Computerized precision",
    text: "Trimming and cutting for accurate, uniform product dimensions.",
  },
  {
    icon: Scissors,
    title: "Care in every finish",
    text: "Cutting, folding, and finishing receive the same attention as printing.",
  },
  {
    icon: PackageCheck,
    title: "Ready for distribution",
    text: "Sorting by SKU and packing to match your distribution requirements.",
  },
];

export default function QualityControl() {
  return (
    <section
      id="quality-control"
      data-services-section="quality"
      aria-label="Quality control and finishing"
      className="scroll-mt-24 bg-[#fffdf8] py-16 sm:py-20 lg:py-28"
    >
      <div
        className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}
      >
        <div className="relative min-w-0 pb-9" data-sv-reveal="pop">
          <div className="group relative aspect-[1.03] overflow-hidden rounded-[28px] bg-[#e5e8dc]">
            <Image
              src="/image/services/quality-control.webp"
              alt="A specialist inspecting printed artwork with a magnifier and color swatches"
              fill
              sizes="(min-width:1440px) 600px,(min-width:1024px) 43vw,90vw"
              className="object-cover transition duration-1000 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-5 rounded-2xl border border-white/60"
            />
            <span className="absolute top-8 left-8 rounded-full bg-[#fffdf8] px-4 py-2 font-mono text-[9px] tracking-[.06em] text-[#536549]">
              A CLOSER LOOK AT THE CRAFT
            </span>
            <div
              aria-hidden="true"
              className="absolute right-8 bottom-8 grid size-20 place-items-center rounded-full bg-[#dd4937] text-white"
            >
              <Crosshair size={40} strokeWidth={1} />
            </div>
          </div>
          <div className="absolute right-4 bottom-0 left-4 flex items-center gap-4 rounded-2xl border border-[#d7dacd] bg-[#f6f4ef] p-5 shadow-[0_12px_30px_#2527220a] sm:right-8 sm:left-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e0e7d6] text-[#455d36]">
              <ShieldCheck size={24} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <strong className="text-sm font-medium tracking-tight">
                Quality, kept in-house.
              </strong>
              <p className="mt-1 text-[10px] text-[#64695e]">
                People. Technology. Care.
              </p>
            </div>
            <Check
              size={19}
              className="ml-auto shrink-0 text-[#536f42]"
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <SectionHeading
            number="04"
            eyebrow="GOOD IN THE LITTLE THINGS"
            title={
              <>
                The difference
                <br />
                <span className="font-serif font-normal italic text-[#a52d21]">
                  is in the details.
                </span>
              </>
            }
            description="Our turnkey in-house operations combine trained staff, production technology, and stringent quality control measures throughout the process."
          />
          <div className="mt-7">
            {checks.map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                data-sv-reveal="rise"
                data-sv-delay={index * 80}
                className="flex items-start gap-4 border-b border-[#d7dacd] py-5 last:border-0"
              >
                <span className="mt-1 text-[#a52d21]">
                  <Icon size={23} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-medium tracking-[-.025em]">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-[1.85] text-[#64695e]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
