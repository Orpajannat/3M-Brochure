import {
  ArrowDownRight,
  Barcode,
  Globe2,
  Layers3,
  Network,
  Printer,
  Scissors,
} from "lucide-react";
import SectionHeading, { container } from "./SectionHeading";

const services = [
  {
    icon: Layers3,
    title: "Branding & garment accessories",
    description:
      "A coordinated identity across woven, care, and size labels, heat transfers, hangtags, security tags / RFID, and custom accessories.",
    tags: ["Woven labels", "Hangtags", "Packaging"],
    href: "#production",
    number: "01",
  },
  {
    icon: Printer,
    title: "Offset printing",
    description:
      "From color separation and platemaking to electronic inking on 4- and 5-color presses, for both small and large ticketing orders.",
    tags: ["Prepress", "Color separation"],
    href: "#production",
    number: "02",
  },
  {
    icon: Barcode,
    title: "High-speed laser printing",
    description:
      "Offset-quality variable encoding for adhesive labels and integrated hangtags, with no minimum run requirements by SKU.",
    tags: ["Variable data", "Flexible runs"],
    href: "#production",
    number: "03",
  },
  {
    icon: Scissors,
    title: "Postpress & quality control",
    description:
      "Computerized trimming, accurate cutting, folding, and SKU sorting, with careful checks throughout in-house production.",
    tags: ["Precision finishing", "SKU sorting"],
    href: "#quality-control",
    number: "04",
  },
  {
    icon: Network,
    title: "EDI & order management",
    description:
      "Internet order entry, confirmations, change orders, and online inventory, production, and delivery reporting.",
    tags: ["Order visibility", "Online reporting"],
    href: "#how-we-work",
    number: "05",
  },
  {
    icon: Globe2,
    title: "Distribution & tracking",
    description:
      "Direct-to-vendor shipping or consolidated delivery to buying offices, supported by carrier selection and online tracking.",
    tags: ["Consolidated shipping", "Tracking"],
    href: "#distribution",
    number: "06",
  },
];

export default function ServicesOverview() {
  return (
    <section
      id="our-services"
      data-services-section="overview"
      aria-label="Our services"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-28"
    >
      <div className={container}>
        <div className="mb-10 grid items-end gap-6 md:grid-cols-[1.2fr_1fr] lg:mb-14">
          <SectionHeading
            number="01"
            eyebrow="THE SERVICES, CONNECTED"
            title={
              <>
                Six disciplines.
                <br />
                <span className="font-serif font-normal italic text-[#a52d21]">
                  One direction.
                </span>
              </>
            }
          />
          <p
            data-sv-reveal="rise"
            className="max-w-md text-sm leading-[1.9] text-[#64695e] md:justify-self-end"
          >
            One coordinated partner for your brand labeling, printing, and
            packaging requirements. Every service shaped around the needs of
            your organization.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map(
            ({ icon: Icon, title, description, tags, href, number }, index) => (
              <article
                key={title}
                data-service-card
                data-sv-reveal="pop"
                data-sv-delay={(index % 3) * 80}
                className={`group relative isolate flex min-w-0 flex-col overflow-hidden rounded-3xl border p-6 transition duration-500 hover:-translate-y-1 sm:p-7 ${index === 0 ? "border-[#ccd5c3] bg-[#dfe6d6] lg:row-span-2" : index === 5 ? "border-[#252722] bg-[#252722] text-white [--sv-focus:#f2b6a7] md:col-span-2 lg:col-span-3" : "border-[#deded5] bg-[#fffdf8] hover:border-[#c5cbb9]"}`}
              >
                {index === 0 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-12 -right-16 -z-10 size-64 rounded-full border border-[#adbaa1]"
                  >
                    <div className="absolute inset-7 rounded-full border border-[#adbaa1]" />
                    <div className="absolute inset-14 rounded-full border border-[#adbaa1]" />
                  </div>
                )}
                <div
                  className={`flex items-start justify-between gap-5 ${index === 0 ? "mb-16 lg:mb-auto lg:pb-24" : "mb-7"}`}
                >
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${index === 5 ? "bg-white/10 text-[#f2b6a7]" : index === 0 ? "bg-[#f6f4ef]/70 text-[#3b4d30]" : "bg-[#f6e9e2] text-[#a52d21]"}`}
                  >
                    <Icon size={24} strokeWidth={1.45} aria-hidden="true" />
                  </span>
                  <span
                    className={`font-mono text-[10px] ${index === 5 ? "text-[#b9c3ae]" : "text-[#5e6952]"}`}
                  >
                    /{number}
                  </span>
                </div>
                <div
                  className={
                    index === 5
                      ? "grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end"
                      : ""
                  }
                >
                  <div>
                    <h3
                      className={`${index === 0 ? "text-[32px] sm:text-[37px]" : "text-2xl"} leading-[1.12] font-medium tracking-[-.045em]`}
                    >
                      <a href={href} className="inline-flex items-start gap-4">
                        <span>{title}</span>
                        <ArrowDownRight
                          size={24}
                          aria-hidden="true"
                          className="mt-1 shrink-0 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                        />
                      </a>
                    </h3>
                    {index === 0 && (
                      <p className="mt-4 font-mono text-[9px] tracking-[.1em] text-[#536549]">
                        YOUR IDENTITY, IN EVERY DETAIL.
                      </p>
                    )}
                  </div>
                  <div>
                    <p
                      className={`mt-4 text-[13px] leading-[1.85] ${index === 5 ? "text-[#c3c9bc] lg:mt-0" : "text-[#5b6453]"}`}
                    >
                      {description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-3 py-1.5 text-[9px] ${index === 5 ? "border-[#65705a] text-[#dce3d4]" : "border-[#c7cdbd] text-[#56634c]"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
