import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import ContactLabel from "./ContactUi";

const offices = [
  {
    country: "Bangladesh",
    code: "BD",
    label: "PRODUCTION & SALES",
    name: "Md. Jahirul Islam",
    role: "Country Manager",
    address: "Raju Plaza, Gouripur, Ashulia, Savar, Dhaka - 1341, Bangladesh",
    phones: [
      { label: "+88 01787 659 782", href: "tel:+8801787659782" },
      { label: "+88 01678 077 001", href: "tel:+8801678077001" },
    ],
    email: "jahirul@3mlabel.com",
  },
  {
    country: "Thailand",
    code: "TH",
    label: "ASIA OFFICE",
    name: "Siriporn Yawichai",
    role: "3M Label Thailand",
    address:
      "14/3 Moo 10, Tambon Buakkang, Amphur Sankamphang, Chiang Mai 50130, Thailand",
    phones: [{ label: "+66 8 9700 3695", href: "tel:+66897003695" }],
    email: "sy@labelbankasia.com",
  },
];

export default function OfficeDetails() {
  return (
    <aside
      id="contact-offices"
      aria-labelledby="contact-offices-title"
      className="min-w-0 scroll-mt-28"
    >
      <div data-ct-reveal="rise">
        <ContactLabel number="02">PEOPLE, NOT JUST AN ADDRESS</ContactLabel>
        <h2
          id="contact-offices-title"
          className="mt-5 text-[clamp(2rem,3.5vw,3rem)] leading-[1.08] font-medium tracking-[-.05em]"
        >
          Closer to
          <br />
          <span className="font-serif font-normal italic text-[#6250a6]">
            your business.
          </span>
        </h2>
        <p className="mt-5 max-w-sm text-[13px] leading-[1.9] text-[#686279]">
          Connect directly with our offices in Bangladesh and Thailand. Find the
          right people for your next conversation.
        </p>
      </div>
      <div className="mt-8 space-y-5">
        {offices.map((office, index) => (
          <article
            key={office.code}
            data-contact-office
            data-ct-reveal="pop"
            data-ct-delay={index * 120}
            aria-labelledby={`office-${office.code}`}
            className={`min-w-0 rounded-3xl border p-6 sm:p-7 ${index === 0 ? "border-[#322d48] bg-[#322d48] text-[#faf7ff] [--ct-focus:#d9cfff]" : "border-[#e0d5c7] bg-[#fcf4e8] text-[#332d3b]"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={`font-mono text-[8px] tracking-[.11em] ${index === 0 ? "text-[#c9bfe3]" : "text-[#725e7c]"}`}
                >
                  {office.label}
                </p>
                <h3
                  id={`office-${office.code}`}
                  className="mt-3 text-[32px] leading-tight font-medium tracking-[-.045em]"
                >
                  {office.country}
                </h3>
              </div>
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-full border font-mono text-xs ${index === 0 ? "border-[#85759f] text-[#e0d4fa]" : "border-[#bb9fc5] text-[#72508c]"}`}
              >
                {office.code}
              </span>
            </div>
            <div
              className={`mt-6 border-t pt-5 ${index === 0 ? "border-[#655973]" : "border-[#dbcbbd]"}`}
            >
              <p className="text-base font-medium tracking-[-.02em]">
                {office.name}
              </p>
              <p
                className={`mt-1.5 text-[11px] ${index === 0 ? "text-[#c9bfe3]" : "text-[#725e7c]"}`}
              >
                {office.role}
              </p>
            </div>
            <address className="mt-6 space-y-3 not-italic">
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  aria-hidden="true"
                  className={`mt-1 shrink-0 ${index === 0 ? "text-[#c4b1ec]" : "text-[#806091]"}`}
                />
                <p
                  className={`text-xs leading-[1.9] ${index === 0 ? "text-[#ded6eb]" : "text-[#6e6076]"}`}
                >
                  {office.address}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone
                  size={16}
                  aria-hidden="true"
                  className={`mt-3 shrink-0 ${index === 0 ? "text-[#c4b1ec]" : "text-[#806091]"}`}
                />
                <div className="min-w-0">
                  {office.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="flex min-h-11 items-center text-xs font-medium decoration-current underline-offset-4 hover:underline"
                    >
                      {phone.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail
                  size={16}
                  aria-hidden="true"
                  className={`mt-3 shrink-0 ${index === 0 ? "text-[#c4b1ec]" : "text-[#806091]"}`}
                />
                <a
                  href={`mailto:${office.email}`}
                  className="flex min-h-11 min-w-0 items-center break-all text-xs font-medium decoration-current underline-offset-4 hover:underline"
                >
                  {office.email}
                </a>
              </div>
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get directions to the ${office.country} office on Google Maps (opens in a new tab)`}
              className={`group mt-5 inline-flex min-h-11 items-center gap-3 border-b pb-1 text-[11px] font-medium ${index === 0 ? "border-[#9381b3] text-[#e0d4fa]" : "border-[#b59ec1] text-[#72508c]"}`}
            >
              <span>Get directions</span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </article>
        ))}
      </div>
    </aside>
  );
}
