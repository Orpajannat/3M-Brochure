import { ArrowDown, ArrowUpRight, Mail, Plus } from "lucide-react";
import ContactLabel, { contactContainer } from "./ContactUi";

const notes = [
  {
    question: "What should I include in my enquiry?",
    answer:
      "Tell us about your brand, the products you need, dimensions, quantities, and any delivery requirements. Artwork details and style references help our team understand your program.",
  },
  {
    question: "Does the form send my message automatically?",
    answer:
      "The form prepares an email draft addressed to our Bangladesh team. Choose Open email draft, review it in your email app, and send it from there. You can also email the team directly using the address above.",
  },
  {
    question: "Can I contact the Thailand office directly?",
    answer:
      "Yes. The Thailand office card includes Siriporn Yawichai's direct email, phone number, address, and a directions link. The Bangladesh production and sales contacts are listed alongside it.",
  },
];
export default function ContactNotes() {
  return (
    <>
      <section
        data-contact-section="notes"
        aria-label="Before you get in touch"
        className="border-t border-[#ded7e9] bg-[#f7f5fb] py-16 sm:py-20"
      >
        <div
          className={`${contactContainer} grid items-start gap-9 lg:grid-cols-[.85fr_1.15fr] lg:gap-20`}
        >
          <div data-ct-reveal="rise">
            <ContactLabel number="03">A FEW HELPFUL DETAILS</ContactLabel>
            <h2 className="mt-5 text-[clamp(2rem,3.7vw,3.2rem)] leading-[1.08] font-medium tracking-[-.05em]">
              Before the
              <br />
              <span className="font-serif font-normal italic text-[#6250a6]">
                first hello.
              </span>
            </h2>
            <p className="mt-6 max-w-sm text-[13px] leading-[1.9] text-[#686279]">
              A little context makes the conversation easier. Here are a few
              things to know before you reach out.
            </p>
          </div>
          <div data-contact-faq className="border-t border-[#d9d3e6]">
            {notes.map(({ question, answer }, index) => (
              <details
                key={question}
                data-ct-reveal="rise"
                data-ct-delay={index * 75}
                className="group border-b border-[#d9d3e6]"
              >
                <summary className="flex cursor-pointer list-none items-start gap-4 py-6 pr-2 [&::-webkit-details-marker]:hidden">
                  <span className="mt-1.5 font-mono text-[9px] text-[#6250a6]">
                    0{index + 1}
                  </span>
                  <h3 className="min-w-0 text-base leading-[1.5] font-medium tracking-[-.02em] transition-colors group-hover:text-[#5d4798]">
                    {question}
                  </h3>
                  <Plus
                    size={19}
                    aria-hidden="true"
                    className="mt-1.5 ml-auto shrink-0 text-[#6250a6] transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="pr-6 pb-7 pl-8 text-xs leading-[1.95] text-[#686279] sm:text-[13px]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section
        data-contact-section="closing"
        aria-labelledby="contact-closing-title"
        className="relative overflow-hidden bg-[#322d48] py-14 text-[#faf7ff] [--ct-focus:#d9cfff] sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 size-[430px] rounded-full border border-[#74648c]/50"
        >
          <div className="absolute inset-12 rounded-full border border-[#74648c]/50" />
          <div className="absolute inset-24 rounded-full border border-[#74648c]/50" />
        </div>
        <div className={`${contactContainer} relative`}>
          <div className="grid items-end gap-9 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div data-ct-reveal="rise">
              <p className="flex items-center gap-3 font-mono text-[9px] tracking-[.12em] text-[#d5c9ef]">
                <Mail size={17} strokeWidth={1.4} aria-hidden="true" />
                GOOD IDEAS DESERVE A CONVERSATION
              </p>
              <h2
                id="contact-closing-title"
                className="mt-6 text-[clamp(2.7rem,6vw,5.4rem)] leading-[1.02] font-medium tracking-[-.055em]"
              >
                A hello is
                <br />
                <span className="font-serif font-normal italic text-[#d3c2fa]">
                  a good start.
                </span>
              </h2>
            </div>
            <div data-ct-reveal="pop" className="lg:pb-1">
              <p className="max-w-sm text-sm leading-[1.9] text-[#d1c6e2]">
                You bring the idea. We&apos;ll bring the people who can help you
                take the next step.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#contact-enquiry"
                  className="group inline-flex min-h-12 items-center justify-between gap-7 rounded-full bg-[#ded3f6] px-6 py-3.5 text-xs font-semibold text-[#382755] transition duration-300 hover:-translate-y-1 hover:bg-[#f0e9ff]"
                >
                  <span>Tell us what&apos;s next</span>
                  <ArrowDown
                    size={17}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-y-1"
                  />
                </a>
                <a
                  href="mailto:jahirul@3mlabel.com"
                  className="group inline-flex min-h-12 items-center gap-3 text-xs font-medium"
                >
                  <span>Or send a quick hello</span>
                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                    className="text-[#d3c2fa] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[#766589] pt-6 font-mono text-[8px] tracking-[.06em] text-[#d1c6e2]">
            <span>3M LABEL LIMITED / LET&apos;S CONNECT</span>
            <span>BANGLADESH + THAILAND</span>
          </div>
        </div>
      </section>
    </>
  );
}
