import React from "react";
import Image from "next/image";
import { 
  Building2, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: Building2,
      title: "Established 1988",
      desc: "Founded in Canada as part of Label Bank Asia with decades of manufacturing expertise.",
    },
    {
      icon: Globe2,
      title: "Global Reach",
      desc: "State-of-the-art facilities delivering private branding solutions to retailers worldwide.",
    },
    {
      icon: Sparkles,
      title: "Uncompromising Quality",
      desc: "Delivering the most cost-effective, premium private branding and source tagging programs.",
    },
  ];

  const keyPoints = [
    "Environmentally aware manufacturing",
    "On-demand digital & laser printing",
    "72-hour standard production turnaround",
    "Comprehensive source tagging & packaging",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28 text-slate-800">
      {/* Background Soft Red Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-rose-100/60 blur-3xl animate-pulse" />
      <div 
        className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-red-100/50 blur-3xl animate-pulse [animation-delay:2s]" 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: HD Reception Image with Responsive Floating Elements */}
          <div className="lg:col-span-6 relative w-full">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              
              {/* Back Decorative Frame (Soft Red Accent) */}
              <div className="absolute -inset-2 sm:-inset-4 rounded-3xl bg-gradient-to-tr from-rose-100 via-rose-50 to-red-100 opacity-90 blur-md sm:blur-lg transform -rotate-1 transition-transform duration-500 hover:rotate-0" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-rose-100 bg-white shadow-xl shadow-rose-950/5 transition-all duration-500 hover:border-rose-200 hover:scale-[1.01] group">
                {/* Responsive Aspect Ratio Image Box */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/image/Home1.jpeg"
                    alt="3M Label Limited Reception Desk"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                </div>

                {/* Glassmorphism Bottom Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md p-3 sm:p-4 border border-white/60 shadow-lg transition-all duration-300 group-hover:bg-white/95">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-rose-600">
                    Client-Centric Excellence
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5 leading-snug">
                    Dedicated hospitality and customer service team ensuring seamless partnerships.
                  </p>
                </div>
              </div>

              {/* Floating Badge Top Right (Visible on sm+) */}
              <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md border border-rose-100 p-3 sm:p-4 shadow-xl shadow-rose-950/10 animate-[bounce_4s_infinite_ease-in-out]">
                <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                  <span className="text-base sm:text-lg font-extrabold">35+</span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-400">Years of</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Industry Experience</p>
                </div>
              </div>

              {/* Floating Badge Bottom Left */}
              <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 p-3 sm:p-4 text-white shadow-lg shadow-rose-600/25 transition-transform duration-300 hover:scale-105">
                <p className="text-[10px] sm:text-xs font-medium text-rose-100">Quality Certified</p>
                <p className="text-xs sm:text-sm font-bold">ISO 9001:2015 & OEKO-TEX</p>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Copy & Feature Grid */}
          <div className="lg:col-span-6 flex flex-col justify-center mt-6 lg:mt-0">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-rose-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-rose-700 border border-rose-100 mb-4">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              About 3M Label Limited
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Branding Programs for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-500 bg-clip-text text-transparent">
                Leading Retailers Worldwide
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              3M Label Limited (a sister concern of Label Bank Asia) was founded in Canada in 1988[cite: 1, 2]. We are a professional supplier of private label branding materials, specializing in apparel branding solutions, high-speed offset printing, woven labels, and specialty packaging[cite: 2, 3].
            </p>

            <blockquote className="mt-4 border-l-4 border-rose-500 bg-rose-50/60 rounded-r-xl py-3 px-4 text-slate-700 font-medium italic text-xs sm:text-sm">
              &ldquo;Our mission is not to be the biggest in this business, simply the best!&rdquo;[cite: 2]
            </blockquote>

            {/* Bullet List */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">{point}</span>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="group relative rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-rose-200 hover:bg-white hover:shadow-xl hover:shadow-rose-950/5 hover:-translate-y-1"
                  >
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition-colors duration-300 group-hover:bg-rose-600 group-hover:text-white">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="mt-3 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-rose-200 transition-all duration-300 hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Offerings
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
              >
                Get in Touch
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}