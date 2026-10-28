import Distribution from "@/components/services/Distribution";
import ProductionCapabilities from "@/components/services/ProductionCapabilities";
import QualityControl from "@/components/services/QualityControl";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServicesCta from "@/components/services/ServicesCta";
import ServicesFaq from "@/components/services/ServicesFaq";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesMotion from "@/components/services/ServicesMotion";
import ServicesOverview from "@/components/services/ServicesOverview";

export const metadata = {
  title: "Services | 3M Label Limited",
  description:
    "Explore private label branding, offset and laser printing, woven labels, EDI order management, quality control, and distribution services from 3M Label Limited.",
};

export default function ServicesPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-clip">
      <ServicesMotion>
        <ServicesHero />
        <ServicesOverview />
        <ProductionCapabilities />
        <ServiceProcess />
        <QualityControl />
        <Distribution />
        <ServicesFaq />
        <ServicesCta />
      </ServicesMotion>
    </main>
  );
}
