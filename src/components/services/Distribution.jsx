import Image from "next/image";
import {
  ArrowUpRight,
  Boxes,
  ChevronDown,
  MapPin,
  PackageCheck,
  Route,
  Truck,
} from "lucide-react";
import SectionHeading, { action, container } from "./SectionHeading";

const options = [
  {
    title: "Direct to your vendors",
    icon: Truck,
    description:
      "Ship directly to your vendors, with online tracking and delivery confirmations. Our traffic management team selects the carrier for each market.",
  },
  {
    title: "Consolidated for your business",
    icon: Boxes,
    description:
      "Consolidate shipments to your local or regional buying office for vendor pick-up, according to your distribution requirements.",
  },
];
export default function Distribution() {
  return (
    <section
      id="distribution"
      data-services-section="distribution"
      aria-label="Distribution and tracking"
      className="scroll-mt-24 bg-[#e7ebdf] py-16 sm:py-20 lg:py-28"
    >
      <div
        className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}
      >
        <div>
          <SectionHeading
            number="05"
            eyebrow="YOUR BRAND, ON ITS WAY"
            title={
              <>
                Good work travels.
                <br />
                <span className="font-serif font-normal italic text-[#a52d21]">
                  We see it through.
                </span>
              </>
            }
            description="Our traffic management team selects the right carrier for each market and follows your packages through to delivery, with updated shipping reports on a weekly basis."
          />
          <div className="mt-8 space-y-3">
            {options.map(({ title, icon: Icon, description }, index) => (
              <details
                key={title}
                name="service-delivery-route"
                open={index === 0}
                data-delivery-option
                data-sv-reveal="rise"
                className="group rounded-2xl border border-[#c7d0bc] bg-[#f6f4ef] transition-colors open:border-[#8d9f7c] open:bg-[#fffdf8]"
              >
                <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 rounded-2xl p-5 pr-6 [&::-webkit-details-marker]:hidden">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#dfe6d6] text-[#455d36]">
                    <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <h3 className="min-w-0 text-base leading-snug font-medium tracking-[-.025em]">
                    {title}
                  </h3>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="ml-auto shrink-0 text-[#536549] transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="px-5 pb-6 text-xs leading-[1.9] text-[#64695e] sm:pl-[76px]">
                  {description}
                </p>
              </details>
            ))}
          </div>
          <a href="#start-a-project" className={`${action} mt-7`}>
            <span>Discuss your distribution needs</span>
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
        <div
          className="min-w-0 rounded-[28px] bg-[#252d25] p-5 text-[#f6f4ef] sm:p-7"
          data-sv-reveal="pop"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[#53614a] pb-5">
            <p className="font-mono text-[9px] tracking-[.1em]">
              FROM OUR FLOOR TO YOUR DOOR
            </p>
            <Route
              size={22}
              strokeWidth={1.4}
              aria-hidden="true"
              className="shrink-0 text-[#e8b29f]"
            />
          </div>
          <div
            className="relative my-7 h-[205px] sm:h-[235px]"
            role="img"
            aria-label="Delivery routes from production directly to a vendor, or through a buying office for vendor pick-up"
          >
            <svg
              viewBox="0 0 500 230"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-[#b2c39e]"
              fill="none"
              aria-hidden="true"
            >
              <path
                data-sv-motion="dash"
                d="M75 47 C160 0 340 0 425 47 M75 47 C75 170 170 195 250 195 S425 170 425 47"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="5 9"
              />
              <circle cx="75" cy="47" r="22" className="fill-[#dd4937]" />
              <circle cx="425" cy="47" r="22" className="fill-[#dfe6d6]" />
              <circle cx="250" cy="195" r="22" className="fill-[#e8b29f]" />
            </svg>
            <div
              className="absolute top-[14%] left-[15%] -translate-x-1/2 text-[#fffdf8]"
              aria-hidden="true"
            >
              <PackageCheck size={22} />
            </div>
            <div
              className="absolute top-[14%] left-[85%] -translate-x-1/2 text-[#34462b]"
              aria-hidden="true"
            >
              <Truck size={22} />
            </div>
            <div
              className="absolute top-[79%] left-1/2 -translate-x-1/2 text-[#593729]"
              aria-hidden="true"
            >
              <MapPin size={22} />
            </div>
            <span className="absolute top-[34%] left-0 w-[30%] text-center font-mono text-[8px] tracking-[.04em]">
              PRODUCTION
            </span>
            <span className="absolute top-[34%] right-0 w-[30%] text-center font-mono text-[8px] tracking-[.04em]">
              YOUR VENDOR
            </span>
            <span className="absolute top-[59%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] tracking-[.04em] text-[#e8b29f]">
              BUYING OFFICE
            </span>
          </div>
          <div className="relative aspect-[2.1] overflow-hidden rounded-2xl bg-[#44523b]">
            <Image
              src="/image/services/distribution.webp"
              alt="Packed goods prepared for distribution and delivery"
              fill
              sizes="(min-width:1440px) 550px,(min-width:1024px) 42vw,85vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2a1d]/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-xs font-medium">
              The final mile matters.
            </p>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 font-mono text-[8px] text-[#c3c9bc]">
            <li>Carrier selection</li>
            <li>Online tracking</li>
            <li>Weekly reports</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
