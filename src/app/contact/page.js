import ContactForm from "@/components/Contact/ContactForm";
import ContactHero from "@/components/Contact/ContactHero";
import ContactMotion from "@/components/Contact/ContactMotion";
import ContactNotes from "@/components/Contact/ContactNotes";
import OfficeDetails from "@/components/Contact/OfficeDetails";
import { contactContainer } from "@/components/Contact/ContactUi";

export const metadata = {
  title: "Contact Us | 3M Label Limited",
  description:
    "Contact 3M Label Limited in Bangladesh and Thailand for private label branding, garment accessories, printing, and packaging enquiries.",
};

export default function ContactPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-clip">
      <ContactMotion>
        <ContactHero />
        <section
          data-contact-section="enquiry"
          aria-label="Office contacts and project enquiry"
          className="bg-[#faf8fd] py-16 sm:py-20 lg:py-24"
        >
          <div
            className={`${contactContainer} grid items-start gap-14 lg:grid-cols-[1.2fr_.9fr] lg:gap-12 xl:gap-16`}
          >
            <ContactForm />
            <OfficeDetails />
          </div>
        </section>
        <ContactNotes />
      </ContactMotion>
    </main>
  );
}
