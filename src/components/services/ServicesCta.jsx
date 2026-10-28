import Link from "next/link";
import { ArrowRight, ArrowUpRight, Asterisk, Mail, Phone } from "lucide-react";
import { container } from "./SectionHeading";

export default function ServicesCta() {
  return (
    <section
      id="start-a-project"
      data-services-section="contact"
      aria-labelledby="services-contact-title"
      className="relative scroll-mt-24 overflow-hidden bg-[#bf3c2d] py-10 text-[#fffdf8] [--sv-focus:#fffdf8] sm:py-12 lg:py-14"
    >
      <div
        className="pointer-events-none absolute -top-32 left-[30%] size-[650px] rounded-full border border-white/10"
        aria-hidden="true"
      >
        <div className="absolute inset-16 rounded-full border border-white/10" />
        <div className="absolute inset-32 rounded-full border border-white/10" />
      </div>
      <div className={`${container} relative`}>
        <div className="flex flex-wrap items-center justify-between gap-5 font-mono text-[9px] tracking-[.1em]">
          <p className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[#fffdf8]" />
            PRIDE IN SERVICE. POSSIBILITY IN EVERY DETAIL.
          </p>
          <span>LET&apos;S MAKE SOMETHING MATTER.</span>
        </div>
        <div className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.3fr_.8fr] lg:gap-10 lg:py-20">
          <div data-sv-reveal="rise">
            <h2
              id="services-contact-title"
              className="text-[clamp(3.2rem,9.1vw,8rem)] leading-[.98] font-medium tracking-[-.065em]"
            >
              Let&apos;s make
              <br />
              <span className="font-serif font-normal italic">it happen.</span>
            </h2>
            <p className="mt-7 max-w-[400px] text-sm leading-[1.9] text-[#fff0e7]">
              Tell us about your branding program. Our team is ready for a
              confidential review of your requirements.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex min-h-12 items-center gap-3 border-b border-[#fffdf8]/60 pb-1 text-xs font-medium"
            >
              <span>Start with your brief</span>
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div
            className="relative mx-auto w-full max-w-[420px] rounded-[28px] border border-[#fffdf8]/30 bg-[#fffdf8] p-7 text-[#252722] [--sv-focus:#a52d21] sm:p-9"
            data-sv-reveal="pop"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[9px] tracking-[.1em] text-[#a52d21]">
                YOUR NEXT CHAPTER
                <br />
                STARTS WITH A CONVERSATION.
              </span>
              <span
                data-sv-motion="spin"
                aria-hidden="true"
                className="text-[#dd4937]"
              >
                <Asterisk size={42} strokeWidth={1.1} />
              </span>
            </div>
            <p className="mt-12 text-3xl leading-tight font-medium tracking-[-.045em]">
              A good idea
              <br />
              deserves good people.
            </p>
            <a
              href="mailto:jahirul@3mlabel.com"
              className="group mt-7 flex min-h-12 items-center justify-between gap-4 rounded-full bg-[#252722] px-5 py-3.5 text-xs font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-[#a52d21]"
            >
              <span>Start a conversation</span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </a>
            <div className="mt-7 space-y-1 border-t border-[#d7dacd] pt-5">
              <a
                href="tel:+8801787659782"
                className="flex min-h-11 items-center gap-3 text-xs text-[#56634c] hover:text-[#a52d21]"
              >
                <Phone size={15} aria-hidden="true" className="shrink-0" />
                +88 01787 659 782
              </a>
              <a
                href="mailto:jahirul@3mlabel.com"
                className="flex min-h-11 items-center gap-3 text-xs text-[#56634c] hover:text-[#a52d21]"
              >
                <Mail size={15} aria-hidden="true" className="shrink-0" />
                jahirul@3mlabel.com
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/30 pt-6 font-mono text-[8px] tracking-[.06em] text-[#ffe4d7]">
          <span>3M LABEL LIMITED / THE SERVICE STUDIO</span>
          <span>YOUR VISION. OUR NEXT CHAPTER.</span>
        </div>
      </div>
    </section>
  );
}
