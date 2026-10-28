import About from "@/components/home/About";
import Certifications from "@/components/home/Certifications";
import Ctabanner from "@/components/home/Ctabanner";
import Customers from "@/components/home/Customers";
import Herobanner from "@/components/home/Herobanner";
import Products from "@/components/home/Products";
import TechnologySection from "@/components/home/TechnologySection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Herobanner />
      <Certifications/>
      <About/>
      <Products/>
      <WhyChooseUs/>
      <TechnologySection/>
      <Customers/>
      <Ctabanner/>
    </main>
  );
}
