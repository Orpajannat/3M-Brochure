import React from "react";
import { 
  Tags, 
  FileText, 
  Package, 
  QrCode, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

export default function Products() {
  const productCategories = [
    {
      icon: Tags,
      title: "Garment Accessories & Hangtags",
      subtitle: "Full 1 to 6 Color Printing",
      description: "Integrated hangtags and swing tickets featuring digital printing of variable data, unique tags on recycled or handmade paper stocks, woven labels, care labels, and size labels.",
      features: ["1 to 6 Color Printing", "Recycled & Handmade Paper", "Care & Size Labels", "Woven Label Weaves"],
      badge: "Core Product",
    },
    {
      icon: FileText,
      title: "Printed & Woven Labels",
      subtitle: "Broadloom, Twill & Satin Damask",
      description: "Custom woven labels offered in broadloom, needleloom, twill, taffeta, and satin damask with a massive selection of stock yarn colors and unique finishes tailored to brand specifications.",
      features: ["Broadloom & Needleloom", "Satin Damask & Taffeta", "Custom Brand Logos", "High-Definition Weaving"],
      badge: "High Demand",
    },
    {
      icon: QrCode,
      title: "Security Tags & RFID",
      subtitle: "Source Tagging Solutions",
      description: "Advanced source tagging tags, security labels, and RFID encoding designed to streamline retail tracking, inventory control, and loss prevention.",
      features: ["RFID Integration", "EAS Security Tags", "SKU Barcode Encoding", "Automated Scanning"],
      badge: "Smart Tech",
    },
    {
      icon: Package,
      title: "Specialty Packaging",
      subtitle: "Hard Goods & Retail Boxes",
      description: "Custom rigid presentation boxes, transparent packaging for underwear/apparel, and specialized packaging solutions built for industry-leading retail hard goods.",
      features: ["Hard Goods Packaging", "Rigid Presentation Boxes", "Transparent Windows", "Premium Retail Finish"],
      badge: "Retail Ready",
    },
    {
      icon: Sparkles,
      title: "Heat Transfer Labels",
      subtitle: "Tagless Comfort & Precision",
      description: "High-definition tagless heat transfer labels providing optimal skin comfort, vibrant multi-color graphics, and high durability against regular garment washing.",
      features: ["Tagless Comfort", "Wash-Resistant Print", "Vibrant Color Tones", "Soft Hand-Feel"],
      badge: "Popular",
    },
    {
      icon: Layers,
      title: "Narrow Items & Trims",
      subtitle: "Collar Bands, Elastics & Ribbons",
      description: "Essential garment trims including collar bands, drawstrings, tissue papers, branded elastics, lock strings, and thermal transfer ribbons for smooth in-house production.",
      features: ["Branded Elastics", "Drawstrings & Tissues", "Collar Bands & Ribbons", "Lock Strings & Seals"],
      badge: "Complete Trim",
    },
  ];

  return (
    <section id="products" className="relative w-full bg-slate-50/60 py-14 sm:py-20 lg:py-28 text-slate-800 overflow-hidden">
      {/* Background Soft Red Accent Blur */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[350px] sm:h-96 sm:w-[600px] rounded-full bg-rose-100/40 blur-3xl animate-pulse" />

      {/* Main Responsive Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 border border-rose-200 shadow-sm mb-4 transition-transform duration-300 hover:scale-105">
            <ShieldCheck className="h-4 w-4 text-rose-600 flex-shrink-0" />
            <span>Products & Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Comprehensive Private Label <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-500 bg-clip-text text-transparent">
              Branding & Accessories Portfolio
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
            We offer a wide range of products to help you design brand labeling, high-speed offset printing, and specialty packaging that meets the unique needs of your organization.
          </p>
        </div>

        {/* Product Cards Grid: 1 Col (Mobile), 2 Cols (Tablet), 3 Cols (Desktop) */}
        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {productCategories.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 lg:p-8 shadow-sm transition-all duration-500 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-950/10 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex h-11 w-11 sm:h-13 sm:w-13 lg:h-14 lg:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-rose-50 text-rose-600 transition-all duration-500 group-hover:bg-rose-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                    </div>
                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-rose-700 border border-rose-100">
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-rose-600">
                    {item.subtitle}
                  </span>
                  <h3 className="mt-1 text-base sm:text-lg lg:text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                        <span className="text-[10px] sm:text-xs font-medium text-slate-600">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="mt-5 pt-4 flex items-center justify-between border-t border-slate-100/80 text-xs font-bold text-rose-600 transition-colors group-hover:text-rose-700">
                    <span>Explore Specifications</span>
                    <div className="h-7 w-7 rounded-full bg-rose-50 flex items-center justify-center transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Responsive Bottom Banner Callout */}
        <div className="mt-10 sm:mt-14 lg:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-rose-600/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">Looking for Custom Program Requirements?</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-rose-100 leading-relaxed max-w-xl">
              We deliver the most cost-effective private branding program in the market with 72-hour standard turnarounds.
            </p>
          </div>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-rose-600 shadow-md transition-all duration-300 hover:bg-rose-50 hover:scale-105 active:scale-100 flex-shrink-0"
          >
            <span>Request Pricing & Samples</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </section>
  );
}