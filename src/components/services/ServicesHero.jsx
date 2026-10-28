import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  ChevronRight,
  Layers3,
  MoveUpRight,
} from "lucide-react";
import { action, container } from "./SectionHeading";

const words = [
  "IDEAS INTO IDENTITY",
  "DETAILS INTO DIFFERENCE",
  "ORDERS INTO OPPORTUNITY",
];
export default function ServicesHero() {
  return (
    <section
      data-services-section="hero"
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-[#f6f4ef] pt-7 sm:pt-9"
    >
      <div className={container}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d7dacd] pb-6 text-[10px] text-[#64695e]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#a52d21]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={11} />
              </li>
              <li aria-current="page">Services</li>
            </ol>
          </nav>
          <span className="font-mono text-[9px] tracking-[.1em]">
            THE SERVICE STUDIO / 3M LABEL LIMITED
          </span>
        </div>
        <div className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.06fr_1fr] lg:gap-10 lg:py-20">
          <div className="min-w-0" data-sv-reveal="rise">
            <p className="flex items-center gap-3 font-mono text-[10px] font-medium tracking-[.14em] text-[#a52d21]">
              <span className="size-2 rounded-full bg-[#dd4937]" />
              YOUR BRAND, FROM EVERY ANGLE
            </p>
            <h1
              id="services-title"
              className="mt-7 text-[clamp(3.5rem,8vw,7.5rem)] leading-[.95] font-medium tracking-[-.075em]"
            >
              <span className="block">Big ideas.</span>
              <span className="mt-1 block font-serif font-normal italic text-[#c43d2c]">
                Made real.
              </span>
            </h1>
            <p className="mt-7 max-w-[420px] text-sm leading-[1.9] text-[#64695e] sm:mt-9 sm:text-base">
              From the first label to the final shipment. Branding, printing,
              and packaging services, connected around your business.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#our-services" className={action}>
                <span>Explore our services</span>
                <ArrowDown
                  size={17}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-y-1"
                />
              </a>
              <a
                href="#start-a-project"
                className="group inline-flex min-h-12 items-center gap-3 text-xs font-semibold"
              >
                <span>Bring us your brief</span>
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="text-[#a52d21] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4 border-t border-[#d7dacd] pt-6">
              <div className="flex -space-x-2" aria-hidden="true">
                {["01", "02", "03"].map((item, index) => (
                  <span
                    key={item}
                    className={`grid size-9 place-items-center rounded-full border-2 border-[#f6f4ef] font-mono text-[9px] ${index === 0 ? "bg-[#252722] text-white" : index === 1 ? "bg-[#dd4937] text-white" : "bg-[#dce3d4] text-[#37462b]"}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed text-[#64695e]">
                Branding. Production. Distribution.
                <br />
                <strong className="font-medium text-[#252722]">
                  One connected service.
                </strong>
              </p>
            </div>
          </div>
          <div
            className="relative mx-auto w-full max-w-[570px] pb-12 pl-2 sm:pl-5"
            data-sv-reveal="pop"
          >
            <div
              className="pointer-events-none absolute inset-x-4 top-5 bottom-10 rotate-6 rounded-t-[48%] rounded-b-[38%] border border-[#dd4937]/50 sm:inset-x-8"
              aria-hidden="true"
            />
            <div className="group relative aspect-[.96] overflow-hidden rounded-t-[48%] rounded-b-[30%] bg-[#dfe4d6]">
              <Image
                src="/image/services/offset-printing.webp"
                alt="Offset printing presses on the 3M Label production floor"
                fill
                preload
                sizes="(min-width:1440px) 560px,(min-width:1024px) 45vw,90vw"
                className="object-cover grayscale-[.75] transition duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#182018]/65 via-transparent to-transparent" />
              <div className="absolute top-16 left-1/2 w-[74%] -translate-x-1/2 rounded-2xl bg-[#182018]/75 p-3 text-white sm:p-4">
                <span className="font-mono text-[8px] tracking-[.08em]">
                  WHERE YOUR BRAND TAKES SHAPE
                </span>
                <p className="mt-2 text-base leading-tight tracking-[-.04em] sm:text-2xl">
                  People. Process.
                  <br />
                  <span className="font-serif italic">A little obsession.</span>
                </p>
              </div>
            </div>
            <div
              data-sv-motion="spin"
              className="absolute -top-3 right-0 grid size-20 place-items-center rounded-full bg-[#dd4937] text-white shadow-lg sm:-top-5 sm:size-24"
              aria-hidden="true"
            >
              <Asterisk size={53} strokeWidth={1.1} />
            </div>
            <div
              data-sv-motion="float"
              className="absolute bottom-0 left-0 w-[min(275px,95%)] rounded-2xl border border-[#d7dacd] bg-[#fffdf8] p-5 shadow-[0_15px_35px_#25272212] sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-lg bg-[#f9e4de] p-2.5 text-[#a52d21]">
                  <Layers3 size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <MoveUpRight
                  size={23}
                  aria-hidden="true"
                  className="text-[#a52d21]"
                />
              </div>
              <p className="mt-4 text-lg font-medium tracking-[-.035em]">
                The details do the talking.
              </p>
              <p className="mt-1.5 text-[10px] text-[#64695e]">
                LABELS / PRINT / PACKAGING
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 border-y border-[#d7dacd] sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: "72",
              unit: "HOURS",
              label: "Brochure standard turnaround",
              note: "Confirm your program timing with us.",
            },
            {
              value: "4 & 5",
              unit: "COLOR",
              label: "Offset printing technology",
              note: "Prepress through to production.",
            },
            {
              value: "0",
              unit: "MINIMUM",
              label: "Laser print runs per SKU",
              note: "For variable label and hangtag encoding.",
            },
            {
              value: "EDI",
              unit: "CONNECTED",
              label: "Orders through to delivery",
              note: "Online visibility across your program.",
            },
          ].map((item, index) => (
            <div
              key={item.label}
              data-sv-reveal="rise"
              data-sv-delay={index * 80}
              className="border-[#d7dacd] px-5 py-6 not-last:border-b sm:even:border-l sm:odd:pl-0 sm:nth-last-2:border-b-0 lg:border-b-0 lg:not-first:border-l lg:not-first:pl-6"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <strong className="text-4xl font-medium tracking-[-.06em]">
                  {item.value}
                </strong>
                <span className="font-mono text-[9px] text-[#a52d21]">
                  {item.unit}
                </span>
              </div>
              <p className="mt-3 text-xs font-medium">{item.label}</p>
              <p className="mt-1.5 text-[10px] leading-relaxed text-[#64695e]">
                {item.note}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-6 py-5 font-mono text-[8px] tracking-[.1em] text-[#64695e]">
          <span>CONSIDERED FROM THE FIRST DETAIL.</span>
          <a
            href="#our-services"
            className="inline-flex items-center gap-2 text-[#a52d21]"
          >
            MEET YOUR NEXT PARTNER
            <ArrowDownRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div
        className="overflow-hidden bg-[#252722] py-4 text-[#f6f4ef] sm:py-5"
        aria-hidden="true"
      >
        <div data-sv-motion="marquee" className="flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {words.map((word) => (
                <span
                  key={word}
                  className="mr-8 flex items-center gap-8 whitespace-nowrap text-xl font-medium tracking-[-.035em] sm:text-3xl"
                >
                  {word}
                  <Asterisk size={25} className="text-[#ef8f7e]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
