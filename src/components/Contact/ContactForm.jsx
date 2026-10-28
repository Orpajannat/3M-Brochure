"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Mail, PenLine } from "lucide-react";
import ContactLabel from "./ContactUi";
import { useContactEnhanced } from "./ContactMotion";

const field =
  "block min-h-12 w-full min-w-0 rounded-xl border border-[#d9d3e6] bg-[#fffdf9] px-4 py-3.5 text-base text-[#262338] sm:text-sm placeholder:text-[#73667f] transition focus:border-[#6250a6] focus:ring-4 focus:ring-[#6250a6]/10 focus:outline-none";
const label = "mb-2.5 block text-[11px] font-medium text-[#484056]";

export default function ContactForm() {
  const [draft, setDraft] = useState(null);
  const enhanced = useContactEnhanced();
  const [messageLength, setMessageLength] = useState(0);
  function prepareEmail(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();
    for (const [name, value] of [
      ["name", fullName],
      ["message", message],
    ]) {
      if (value) continue;
      const input = form.elements.namedItem(name);
      input.setCustomValidity(
        name === "name"
          ? "Please enter your name."
          : "Please enter your message.",
      );
      input.reportValidity();
      return;
    }
    const subject = `Website enquiry: ${service || "General enquiry"}`;
    const body = [
      message,
      "",
      "---",
      `Name: ${fullName}`,
      `Email: ${email}`,
      ...(company ? [`Company: ${company}`] : []),
      `Interested in: ${service || "General enquiry"}`,
    ].join("\r\n");
    setDraft(
      `mailto:jahirul@3mlabel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }
  function handleInput(event) {
    if (typeof event.target.setCustomValidity === "function")
      event.target.setCustomValidity("");
    if (event.target.name === "message")
      setMessageLength(event.target.value.length);
    if (draft) setDraft(null);
  }
  return (
    <div
      id="contact-enquiry"
      data-contact-form
      className="min-w-0 scroll-mt-28"
      data-ct-reveal="rise"
    >
      <ContactLabel number="01">
        A LITTLE ABOUT YOUR NEXT BIG THING
      </ContactLabel>
      <h2
        id="contact-form-title"
        className="mt-5 text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08] font-medium tracking-[-.055em]"
      >
        Leave a little
        <br />
        <span className="font-serif font-normal italic text-[#6250a6]">
          possibility.
        </span>
      </h2>
      <div className="mt-8 rounded-3xl border border-[#d9d3e6] bg-white p-6 sm:p-8 xl:p-10">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#eee8f8] text-[#6250a6]">
            <PenLine size={21} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-xl font-medium tracking-[-.035em]">
              Tell us about it.
            </h3>
            <p
              id="contact-form-help"
              className="mt-2 text-xs leading-[1.85] text-[#686279]"
            >
              We&apos;ll prepare an enquiry for you to review and send through
              your email app.
            </p>
          </div>
        </div>
        <p
          id="contact-form-recipient"
          className="mt-5 rounded-xl border border-[#e3ddef] bg-[#f6f3fb] px-4 py-3 text-[11px] leading-relaxed text-[#686279]"
        >
          Your draft will be addressed to our{" "}
          <span className="font-medium text-[#5d4798]">Bangladesh team.</span>
        </p>
        <form
          action="mailto:jahirul@3mlabel.com"
          method="post"
          encType="text/plain"
          onSubmit={prepareEmail}
          onInput={handleInput}
          aria-label="Project enquiry"
          aria-describedby="contact-form-help contact-form-recipient"
          className="mt-7"
        >
          <fieldset className="min-w-0 border-0 p-0">
            <legend className="mb-5 font-mono text-[9px] tracking-[.12em] text-[#5d4798]">
              01 / LET&apos;S GET ACQUAINTED
            </legend>
            <div className="grid min-w-0 gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="contact-name" className={label}>
                  Your name{" "}
                  <span aria-hidden="true" className="text-[#a23142]">
                    *
                  </span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  required
                  maxLength={120}
                  className={field}
                />
              </div>
              <div className="min-w-0">
                <label htmlFor="contact-email" className={label}>
                  Email address{" "}
                  <span aria-hidden="true" className="text-[#a23142]">
                    *
                  </span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  maxLength={254}
                  className={field}
                />
              </div>
              <div className="min-w-0 sm:col-span-2">
                <label htmlFor="contact-company" className={label}>
                  Company{" "}
                  <span className="font-normal text-[#686279]">(optional)</span>
                </label>
                <input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Your company or brand"
                  maxLength={160}
                  className={field}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="mt-8 min-w-0 border-0 border-t border-[#e4dfec] p-0 pt-6">
            <legend className="pr-4 font-mono text-[9px] tracking-[.12em] text-[#5d4798]">
              02 / WHAT DO YOU HAVE IN MIND?
            </legend>
            <div className="space-y-5">
              <div className="min-w-0">
                <label htmlFor="contact-service" className={label}>
                  What can we help with?
                </label>
                <div className="relative">
                  <select
                    id="contact-service"
                    name="service"
                    defaultValue="General enquiry"
                    className={`${field} appearance-none pr-11`}
                  >
                    <option>General enquiry</option>
                    <option>Branding &amp; garment accessories</option>
                    <option>Offset printing</option>
                    <option>High-speed laser printing</option>
                    <option>Woven labels</option>
                    <option>Packaging &amp; distribution</option>
                    <option>Existing order support</option>
                  </select>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#6250a6]"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <label htmlFor="contact-message" className={label}>
                  Your message{" "}
                  <span aria-hidden="true" className="text-[#a23142]">
                    *
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your products, quantities, or any questions you have..."
                  required
                  maxLength={3000}
                  className={`${field} min-h-40 resize-y leading-[1.8]`}
                />
                <div className="mt-2.5 flex flex-wrap items-start justify-between gap-3 text-[10px] text-[#686279]">
                  <span className="max-w-[230px] leading-relaxed">
                    Artwork details, dimensions, and quantities are a helpful
                    starting point.
                  </span>
                  <span
                    aria-hidden="true"
                    className={`${enhanced ? "inline" : "hidden"} font-mono`}
                  >
                    {messageLength} / 3000
                  </span>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="mt-7 flex flex-col items-stretch justify-between gap-4 border-t border-[#e4dfec] pt-6 sm:flex-row sm:items-center">
            <p className="text-[10px] text-[#686279]">* Required fields</p>
            <button
              type="submit"
              className="group inline-flex min-h-12 items-center justify-between gap-6 rounded-full bg-[#6250a6] px-6 py-3.5 text-xs font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#493681]"
            >
              <span>Prepare email</span>
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </div>
          <div role="status" aria-live="polite" aria-atomic="true">
            {draft && (
              <div className="mt-6 rounded-2xl border border-[#c8b8e6] bg-[#f0eafa] p-5">
                <div className="flex items-start gap-3">
                  <Check
                    size={19}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#5d4798]"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Email draft prepared.</p>
                    <p className="mt-2 text-xs leading-[1.85] text-[#686279]">
                      Open your draft to review and send it in your email app.
                      Your message has not been sent.
                    </p>
                    <a
                      href={draft}
                      data-email-draft
                      className="group mt-3 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-[#5d4798]"
                    >
                      <span>Open email draft</span>
                      <ArrowUpRight
                        size={17}
                        aria-hidden="true"
                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </a>
                    <p className="mt-2 text-[11px] leading-[1.8] text-[#686279]">
                      If your email app does not open, email{" "}
                      <a
                        href="mailto:jahirul@3mlabel.com"
                        className="break-all font-medium text-[#5d4798] underline underline-offset-4"
                      >
                        jahirul@3mlabel.com
                      </a>{" "}
                      directly.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <noscript>
            <p className="mt-5 text-xs leading-[1.9] text-[#686279]">
              Submitting opens your email app. You can also email{" "}
              <a
                href="mailto:jahirul@3mlabel.com"
                className="font-medium text-[#5d4798] underline underline-offset-4"
              >
                jahirul@3mlabel.com
              </a>{" "}
              directly.
            </p>
          </noscript>
        </form>
        <div className="mt-7 flex items-start gap-3 border-t border-[#e4dfec] pt-5">
          <Mail
            size={16}
            aria-hidden="true"
            className="mt-1 shrink-0 text-[#6250a6]"
          />
          <p className="text-[11px] leading-[1.9] text-[#686279]">
            Prefer a direct conversation?{" "}
            <a
              href="tel:+8801787659782"
              className="inline-flex min-h-8 items-center gap-1 font-medium text-[#5d4798]"
            >
              Give us a call
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
