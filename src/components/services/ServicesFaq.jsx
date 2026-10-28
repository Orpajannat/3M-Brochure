import { ArrowUpRight, Plus } from "lucide-react";
import SectionHeading, { container } from "./SectionHeading";

const questions = [
  {
    question: "What is your standard production turnaround?",
    answer:
      "Our brochure specifies a standard turnaround of 72 hours and same-day production for rush urgent orders. Contact our team to confirm the requirements and timing for your particular program. Production turnaround is separate from shipping time.",
  },
  {
    question: "Is there a minimum order for laser printing?",
    answer:
      "Our high-speed laser printing service has no minimum run requirements by SKU. This applies to the laser print offering for variable encoding of adhesive labels and integrated hangtags. Discuss other production methods and quantities with our team.",
  },
  {
    question: "Can you manage variable data and different SKUs?",
    answer:
      "Yes. Our laser printing supports variable encoding for labels and integrated hangtags. We also offer hangtags and swing tickets with digital printing of variable data, plus postpress sorting by SKU.",
  },
  {
    question: "How can I follow my order and shipment?",
    answer:
      "Our EDI-based system supports internet order entry, confirmations, change orders, and online inventory, production, and delivery reporting. Distribution services include online tracking, delivery confirmations, and updated weekly shipping reports.",
  },
  {
    question: "Can shipments go directly to our vendors?",
    answer:
      "Yes. We can ship directly to vendors or consolidate shipments to your local or regional buying office for vendor pick-up, according to your requirements.",
  },
];

export default function ServicesFaq() {
  return (
    <section
      data-services-section="faq"
      aria-label="Frequently asked service questions"
      className="bg-[#fffdf8] py-16 sm:py-20 lg:py-28"
    >
      <div
        className={`${container} grid items-start gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20`}
      >
        <div>
          <SectionHeading
            number="06"
            eyebrow="BEFORE WE BEGIN"
            title={
              <>
                A little clarity.
                <br />
                <span className="font-serif font-normal italic text-[#a52d21]">
                  A better beginning.
                </span>
              </>
            }
            description="Good questions make good partnerships. Here are a few things to know about your next branding program."
          />
          <a
            href="mailto:jahirul@3mlabel.com"
            className="group mt-6 inline-flex min-h-12 items-center gap-3 text-xs font-semibold"
          >
            <span>Ask us something else</span>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="text-[#a52d21] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
          <div
            aria-hidden="true"
            className="mt-9 hidden size-28 items-center justify-center rounded-full border border-[#cbd1c0] font-serif text-7xl italic text-[#a52d21] lg:flex"
          >
            ?
          </div>
        </div>
        <div data-services-faq className="border-t border-[#d7dacd]">
          {questions.map(({ question, answer }, index) => (
            <details
              key={question}
              data-sv-reveal="rise"
              data-sv-delay={index * 50}
              className="group border-b border-[#d7dacd]"
            >
              <summary className="flex cursor-pointer list-none items-start gap-4 py-6 pr-2 [&::-webkit-details-marker]:hidden">
                <span className="mt-1.5 font-mono text-[9px] text-[#a52d21]">
                  0{index + 1}
                </span>
                <h3 className="min-w-0 text-base leading-[1.5] font-medium tracking-[-.02em] transition-colors group-hover:text-[#a52d21] sm:text-lg">
                  {question}
                </h3>
                <Plus
                  size={20}
                  aria-hidden="true"
                  className="mt-1.5 ml-auto shrink-0 text-[#a52d21] transition-transform group-open:rotate-45"
                />
              </summary>
              <div className="pr-7 pb-7 pl-8">
                <p className="text-xs leading-[1.95] text-[#64695e] sm:text-[13px]">
                  {answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
