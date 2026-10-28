import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  ChevronRight,
  Mail,
  MapPin,
  MoveUpRight,
  Phone,
} from "lucide-react";
import { contactAction, contactContainer } from "./ContactUi";

export default function ContactHero() {
  return (
    <section
      data-contact-section="hero"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-[#f3f1f8] pt-7 sm:pt-9"
    >
      <div className={contactContainer}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d9d3e6] pb-6 font-mono text-[9px] text-[#686279]">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#5d4798]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={10} />
              </li>
              <li aria-current="page">Contact us</li>
            </ol>
          </nav>
          <span className="tracking-[.08em]">
            A LITTLE HELLO. A LOT OF POSSIBILITY.
          </span>
        </div>
        <div className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-20">
          <div className="min-w-0" data-ct-reveal="rise">
            <p className="flex items-center gap-3 font-mono text-[10px] tracking-[.14em] text-[#5d4798]">
              <span className="size-2 rounded-full bg-[#6250a6]" />
              GOOD CONVERSATIONS START HERE
            </p>
            <h1
              id="contact-title"
              className="mt-7 text-[clamp(3.4rem,7.8vw,7rem)] leading-[.96] font-medium tracking-[-.07em]"
            >
              <span className="block">Hello there.</span>
              <span className="mt-1 block font-serif font-normal italic text-[#6250a6]">
                What&apos;s next?
              </span>
            </h1>
            <p className="mt-8 max-w-[420px] text-sm leading-[1.9] text-[#686279] sm:text-base">
              A new idea, a product enquiry, or a question. Tell us what you
              have in mind. We&apos;ll help you find your next step.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#contact-enquiry" className={contactAction}>
                <span>Write to us</span>
                <ArrowDown
                  size={17}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-y-1"
                />
              </a>
              <a
                href="#contact-offices"
                className="group inline-flex min-h-12 items-center gap-3 text-xs font-semibold"
              >
                <span>Find your team</span>
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="text-[#5d4798] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3 border-t border-[#d9d3e6] pt-6">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e5dff3] text-[#5d4798]">
                <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="text-[11px] leading-relaxed text-[#686279]">
                Bangladesh &amp; Thailand
                <br />
                <span className="font-medium text-[#262338]">
                  Two offices. One conversation.
                </span>
              </p>
            </div>
          </div>
          <div
            className="relative mx-auto flex min-h-[380px] w-full max-w-[530px] items-center justify-center py-8 sm:min-h-[480px] lg:min-h-[540px]"
            data-ct-reveal="pop"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 aspect-square -translate-y-1/2 rounded-full border border-[#c8bde1]"
            >
              <div className="absolute inset-8 rounded-full border border-[#d9d0e9]" />
              <div className="absolute inset-16 rounded-full bg-[#e7e1f2]" />
            </div>
            <svg
              viewBox="0 0 530 530"
              fill="none"
              className="pointer-events-none absolute inset-0 h-full w-full text-[#9988bd]"
              aria-hidden="true"
            >
              <path
                data-ct-motion="dash"
                d="M25 340C20 75 490 50 495 235S185 540 115 380"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeDasharray="5 9"
              />
            </svg>
            <div
              aria-hidden="true"
              className="absolute inset-x-[9%] top-[19%] bottom-[16%] rotate-6 rounded-3xl border border-[#d9c9bb] bg-[#f6e6d8]"
            />
            <div
              data-ct-motion="float"
              data-contact-postcard
              className="relative z-10 w-[88%] rounded-3xl border border-[#c9bfe0] bg-[#fffdf9] p-6 shadow-[0_25px_55px_#3d2d6020] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#e2ddeb] pb-5">
                <p className="max-w-[150px] font-mono text-[8px] leading-[1.8] tracking-[.11em] text-[#686279]">
                  TO: YOUR NEXT POSSIBILITY
                  <br />
                  FROM: 3M LABEL LIMITED
                </p>
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-dashed border-[#9d8bbd] bg-[#eee8f8] text-[#6250a6]">
                  <Mail size={23} strokeWidth={1.3} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-7 text-[clamp(2.3rem,4vw,3.7rem)] leading-[1.05] font-medium tracking-[-.055em]">
                Good things
                <br />
                <span className="font-serif font-normal italic text-[#6250a6]">
                  begin with hello.
                </span>
              </p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <div className="font-mono text-[8px] leading-[1.9] tracking-[.08em] text-[#686279]">
                  IDEAS WELCOME.
                  <br />
                  DETAILS APPRECIATED.
                </div>
                <MoveUpRight
                  size={33}
                  strokeWidth={1.2}
                  aria-hidden="true"
                  className="shrink-0 text-[#6250a6]"
                />
              </div>
            </div>
            <span
              data-ct-motion="spin"
              aria-hidden="true"
              className="absolute -top-1 right-0 z-20 grid size-[68px] place-items-center rounded-full bg-[#6250a6] text-white sm:top-2 sm:size-20"
            >
              <Asterisk size={43} strokeWidth={1.1} />
            </span>
            <div
              aria-hidden="true"
              className="absolute right-3 -bottom-2 left-3 flex items-center justify-center gap-4 font-mono text-[8px] tracking-[.12em] text-[#5d4798]"
            >
              <span>BD / BANGLADESH</span>
              <span className="h-px w-9 bg-[#a99ac4]" />
              <span>TH / THAILAND</span>
            </div>
          </div>
        </div>
        <div className="grid gap-0 border-t border-[#d9d3e6] sm:grid-cols-3">
          {[
            {
              icon: Mail,
              label: "A quick hello",
              value: "Email our Bangladesh team",
              href: "mailto:jahirul@3mlabel.com",
            },
            {
              icon: Phone,
              label: "Prefer a conversation?",
              value: "+88 01787 659 782",
              href: "tel:+8801787659782",
            },
            {
              icon: MapPin,
              label: "A little closer to you",
              value: "Meet our regional teams",
              href: "#contact-offices",
            },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="group flex min-w-0 items-center gap-4 border-[#d9d3e6] py-6 not-last:border-b sm:px-4 sm:not-first:border-l sm:not-last:border-b-0 sm:first:pl-0 lg:px-6"
            >
              <span className="text-[#6250a6]">
                <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] text-[#686279]">{label}</p>
                <p className="mt-1.5 text-xs font-medium leading-relaxed">
                  {value}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="ml-auto shrink-0 text-[#6250a6] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
