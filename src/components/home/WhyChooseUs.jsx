import React from "react";
import { 
  DollarSign, 
  Clock, 
  Leaf, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: DollarSign,
      title: "Cost-Effective Pricing",
      description: "Delivering the most cost-effective private branding programs in the market without compromising on premium quality standards.",
      tag: "Best Value",
      gradient: "from-rose-500/10 to-red-500/5",
      borderHover: "hover:border-rose-300",
    },
    {
      icon: Clock,
      title: "72-Hour Turnaround",
      description: "Fast 72-hour standard production turnaround times with same-day dispatch capabilities available for urgent rush orders.",
      tag: "Rapid Delivery",
      gradient: "from-rose-500/10 to-pink-500/5",
      borderHover: "hover:border-rose-300",
    },
    {
      icon: Cpu,
      title: "Advanced EDI Systems",
      description: "Seamless internet order entry, automated SKU tracking, live production reporting, and online courier delivery confirmations.",
      tag: "Digital Track",
      gradient: "from-red-500/10 to-orange-500/5",
      borderHover: "hover:border-rose-300",
    },
    {
      icon: Leaf,
      title: "Eco-Aware Manufacturing",
      description: "Environmentally conscious operations utilizing FSC-certified recycled paper stocks and OEKO-TEX compliant sustainable materials.",
      tag: "Sustainable",
      gradient: "from-emerald-500/10 to-teal-500/5",
      borderHover: "hover:border-emerald-300",
    },
  ];

  const statHighlights = [
    { label: "Established In", value: "1988", icon: ShieldCheck },
    { label: "Standard Turnaround", value: "72 Hours", icon: Zap },
    { label: "Color Precision", value: "1 to 6 Colors", icon: CheckCircle2 },
    { label: "Global Reach", value: "Worldwide", icon: Globe },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-24 lg:py-32 text-slate-800 overflow-hidden">
      {/* Dynamic Animated Ambient Background Glows */}
      <div className="pointer-events-none absolute top-1/4 -right-20 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-rose-200/40 blur-3xl animate-pulse" />
      <div 
        className="pointer-events-none absolute bottom-1/4 -left-20 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-red-200/30 blur-3xl animate-pulse [animation-delay:3s]" 
      />

      {/* Main Responsive Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 border border-rose-200 shadow-sm mb-4 transition-transform duration-300 hover:scale-105">
            <CheckCircle2 className="h-4 w-4 text-rose-600 flex-shrink-0 animate-bounce" />
            <span>Why Choose 3M Label Limited</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Engineered to Deliver the <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-500 bg-clip-text text-transparent">
              Ultimate Branding Programs
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
            &ldquo;Our mission is not to be the biggest in this business, simply the best!&rdquo; Experience precision, speed, and cost efficiency tailored for leading retailers.
          </p>
        </div>

        {/* Core Value Grid: Responsive 1 Col -> 2 Cols -> 4 Cols */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-950/10 ${item.borderHover}`}
              >
                {/* Subtle Gradient Back-glow on Hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-inner transition-all duration-500 group-hover:bg-rose-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 border border-slate-200 transition-colors group-hover:bg-rose-50 group-hover:text-rose-700 group-hover:border-rose-200">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600 transition-colors">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Discover Advantages</span>
                  <div className="h-7 w-7 rounded-full bg-rose-50 flex items-center justify-center transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modern Interactive Stat Highlights Bar */}
        <div className="mt-12 sm:mt-16 lg:mt-20 relative rounded-3xl border border-rose-100 bg-gradient-to-r from-rose-900 via-red-900 to-rose-950 p-6 sm:p-10 shadow-xl shadow-rose-950/20 text-white overflow-hidden">
          {/* Internal Decorative Shimmer */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-rose-800/60">
            {statHighlights.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center justify-center group ${
                    idx > 0 ? "pt-6 sm:pt-0" : ""
                  }`}
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-rose-300 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20">
                    <StatIcon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs font-medium text-rose-200 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}