"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Cpu, Globe2, Layers3, Pause, Play, Printer, ScanLine } from "lucide-react"

const capabilities = [
  {
    id: "print",
    number: "01",
    name: "Color, perfected.",
    category: "Offset printing",
    icon: Printer,
    title: "Big runs.\nBeautifully consistent.",
    description: "Automated platemaking meets electronic ink control. Our 4 and 5-color offset presses bring your brand's colors to life, with the same attention to detail from the first sheet to the last.",
    metric: "12,000",
    unit: "sheets per hour",
    benchmark: "±0.01 mm registration tolerance",
    annotation: "01 / COLOR SEPARATION",
    detail: "Five colors. One exact impression.",
    layers: ["Finish", "Color", "Material"],
  },
  {
    id: "encode",
    number: "02",
    name: "Every tag, individual.",
    category: "Variable laser encoding",
    icon: ScanLine,
    title: "One production run.\nEndless identities.",
    description: "Give every label its own story. Variable data printing brings dynamic serialization to adhesive tickets and hangtags, with offset-quality results and the flexibility to handle every SKU.",
    metric: "Zero",
    unit: "minimum run per SKU",
    benchmark: "Sub-micron optical precision",
    annotation: "02 / VARIABLE DATA",
    detail: "A unique identity in every detail.",
    layers: ["Serial data", "Encoding", "Material"],
  },
  {
    id: "connect",
    number: "03",
    name: "Always connected.",
    category: "EDI & global network",
    icon: Globe2,
    title: "Your order.\nA connected journey.",
    description: "From online order entry straight to the production floor. Our EDI infrastructure connects orders, inventory, and production updates so your team can keep every moving part in view.",
    metric: "72",
    unit: "hour standard turnaround",
    benchmark: "Real-time order & inventory tracking",
    annotation: "03 / CONNECTED PRODUCTION",
    detail: "From your order to the world.",
    layers: ["Order", "Production", "Dispatch"],
  },
  {
    id: "finish",
    number: "04",
    name: "The perfect finish.",
    category: "Precision finishing",
    icon: Cpu,
    title: "The final cut.\nNo detail overlooked.",
    description: "High-speed trimming, folding, and sorting turn printed sheets into finished brand experiences. Computerized precision and multi-stage, in-house quality checks keep every batch beautifully uniform.",
    metric: "100%",
    unit: "in-house inspection",
    benchmark: "Micron-level dimensional precision",
    annotation: "04 / PRECISION FINISHING",
    detail: "Considered. Cut. Quality checked.",
    layers: ["Inspection", "Finishing", "Material"],
  },
]

// Animated study canvas with modern bento styling
function LabelStudy({ capability }) {
  return (
    <div className="tech-study" data-process={capability.id} aria-hidden="true">
      <div className="tech-studyGrid" />
      <div className="tech-orbit" />
      <div className="tech-orbitInner" />
      <span className="tech-crosshair tech-crosshairTop">+</span>
      <span className="tech-crosshair tech-crosshairBottom">+</span>

      <div className="tech-studyTopline">
        <span>3M / MATERIAL STUDY</span>
        <span className="tech-studyEdition">NO. {capability.number}</span>
      </div>

      <div className="tech-studyCanvas">
        <div className="tech-artboard">
          <div className="tech-labelAssembly">
            <div className="tech-labelLayer tech-baseLayer">
              <span className="tech-layerHole" />
              <span className="tech-baseLines" />
              <span className="tech-materialNote">THE FOUNDATION</span>
            </div>
            <div className="tech-labelLayer tech-colorLayer">
              <span className="tech-layerHole" />
              <div className="tech-colorBars"><span /><span /><span /><span /><span /></div>
              <span className="tech-colorNote">CRAFTED IN EVERY COLOR.</span>
            </div>
            <div className="tech-labelLayer tech-topLayer">
              <span className="tech-layerHole" />
              <div className="tech-tagBrand">3M<span>LABEL LIMITED</span></div>
              <div className="tech-tagTitle">Small label.<br />Big possibility<span>.</span></div>
              <div className="tech-tagBottom">
                <span className="tech-barcode" />
                <ArrowUpRight size={26} strokeWidth={1.2} />
              </div>
              <span className="tech-tagSerial">THE ART OF PRECISION / 001</span>
              <span className="tech-scanBeam" />
              <span className="tech-cutGuide" />
            </div>
          </div>
        </div>
        <div className="tech-layerNotes" key={capability.id}>
          {capability.layers.map((layer, index) => (
            <span key={layer}><i />{layer}<small>0{index + 1}</small></span>
          ))}
        </div>
      </div>
      <div className="tech-studyBottomline">
        <span>{capability.annotation}</span>
        <div className="tech-inkDots"><i /><i /><i /><i /></div>
      </div>
    </div>
  )
}

export default function TechnologySection() {
  const [activeStep, setActiveStep] = useState(0)
  const [motionPaused, setMotionPaused] = useState(false)
  const sectionRef = useRef(null)
  const tabRefs = useRef([])
  const instanceId = useId()
  const active = capabilities[activeStep]
  const ActiveIcon = active.icon
  const panelId = `${instanceId}-technology-panel`

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === "undefined") return

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      section.dataset.inView = String(entry.isIntersecting)
    })
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.revealed = "true"
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })

    visibilityObserver.observe(section)
    section.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element))
    return () => {
      visibilityObserver.disconnect()
      revealObserver.disconnect()
    }
  }, [])

  function handleTabKeyDown(event, index) {
    let nextIndex
    if (event.key === "ArrowRight") nextIndex = (index + 1) % capabilities.length
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + capabilities.length) % capabilities.length
    else if (event.key === "Home") nextIndex = 0
    else if (event.key === "End") nextIndex = capabilities.length - 1
    else return

    event.preventDefault()
    setActiveStep(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section
      ref={sectionRef}
      id="technology"
      aria-labelledby={`${instanceId}-technology-heading`}
      className="tech-section"
      data-motion={motionPaused ? "paused" : "running"}
    >
      <div className="tech-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="tech-eyebrow" data-reveal>
          <span><span className="tech-redDot" />THE TECHNOLOGY BEHIND THE DETAIL</span>
          <span className="tech-chapter">3M LABEL LIMITED / CAPABILITIES[cite: 1]</span>
        </div>

        <header className="tech-header" data-reveal>
          <h2 id={`${instanceId}-technology-heading`}>
            Precision.<br />In every <span className="tech-headingAccent">layer<svg viewBox="0 0 340 22" preserveAspectRatio="none" aria-hidden="true"><path d="M3 16C82 0 226 1 337 11M40 21C142 10 237 9 307 16" /></svg></span><span className="tech-headingPeriod">.</span>
          </h2>
          <div className="tech-headerAside">
            <div className="tech-registrationMark" aria-hidden="true"><span /><span /><span /><span /><i /></div>
            <p>Behind every extraordinary label is a little science. And a lot of obsession.</p>
            <span className="tech-exploreHint">EXPLORE OUR CAPABILITIES <ArrowDown size={14} aria-hidden="true" /></span>
          </div>
        </header>

        {/* Bento Control Console */}
        <div className="tech-bentoConsole" data-reveal>
          <div className="tech-consoleToolbar">
            <span className="tech-consoleLabel"><Layers3 size={15} aria-hidden="true" />PRODUCTION MATRIX // BENTO SYSTEM</span>
            <div className="tech-consoleControls">
              <span className="tech-interactiveLabel"><i />LIVE ANIMATION ENGINE</span>
              <button
                type="button"
                className="tech-motionButton"
                onClick={() => setMotionPaused((paused) => !paused)}
                aria-label="Pause decorative animations"
                aria-pressed={motionPaused}
                title={motionPaused ? "Resume animations" : "Pause animations"}
              >
                {motionPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Bento Grid Tabs */}
          <div className="tech-bentoGrid" role="tablist" aria-label="Technology capabilities">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              const isSelected = activeStep === index
              return (
                <button
                  key={capability.id}
                  ref={(element) => { tabRefs.current[index] = element }}
                  type="button"
                  role="tab"
                  id={`${instanceId}-technology-tab-${index}`}
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  className={`tech-bentoCard ${isSelected ? "is-active" : ""}`}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <div className="tech-bentoCardTop">
                    <span className="tech-bentoNumber">{capability.number}</span>
                    <div className="tech-bentoIconBox"><Icon size={18} strokeWidth={1.5} aria-hidden="true" /></div>
                  </div>
                  <div>
                    <span className="tech-bentoCategory">{capability.category}</span>
                    <h4 className="tech-bentoTitle">{capability.name}</h4>
                  </div>
                  <div className="tech-bentoFooterIndicator">
                    <span>{isSelected ? "ACTIVE FEED" : "VIEW STUDY"}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Feature Showcase Panel */}
          <div className="tech-showcasePanel" role="tabpanel" id={panelId} aria-labelledby={`${instanceId}-technology-tab-${activeStep}`} tabIndex={0}>
            <LabelStudy capability={active} />
            <div className="tech-details">
              <div className="tech-detailsContent" key={active.id}>
                <div className="tech-detailEyebrow"><ActiveIcon size={16} aria-hidden="true" /><span>{active.category}</span><span className="tech-detailCount">{active.number} / 04</span></div>
                <h3>{active.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <p className="tech-description">{active.description}</p>
                <div className="tech-metric"><strong>{active.metric}</strong><span>{active.unit}</span></div>
                <div className="tech-benchmark"><Check size={15} aria-hidden="true" />{active.benchmark}</div>
              </div>
              <div className="tech-detailFootnote"><span className="tech-footnoteLine" /><span>{active.detail}</span></div>
            </div>
          </div>
        </div>

        <div className="tech-footer" data-reveal>
          <div className="tech-turnaround">
            <div className="tech-timeMark"><span>72</span><small>HOURS</small><ArrowUpRight size={17} aria-hidden="true" /></div>
            <div>
              <span className="tech-footerEyebrow">MADE PRECISE. MOVED FAST.</span>
              <h3>Your next big idea.<br />Already in motion.</h3>
              <p>Standard 72-hour turnaround. Worldwide shipping[cite: 3, 11].<br />Rush production available when your timeline needs it[cite: 3].</p>
            </div>
          </div>
          <Link href="/contact" className="tech-contactLink">
            <span>Let’s make it happen<small>TELL US ABOUT YOUR PROJECT</small></span>
            <span className="tech-contactArrow"><ArrowUpRight size={26} strokeWidth={1.5} aria-hidden="true" /></span>
          </Link>
        </div>
        <div className="tech-colophon">
          <span>ENGINEERED WITH INTENTION.</span>
          <span>FROM FIRST IMPRESSION TO FINAL DETAIL <ArrowRight size={12} aria-hidden="true" /></span>
        </div>
      </div>

      <style>{`
        .tech-section {
          --ink: #111315;
          --paper: #f4f3ed;
          --paper-gradient: linear-gradient(135deg, #f8f7f2 0%, #edeae1 50%, #f4f3ed 100%);
          --red: #e62e35;
          --accent-card: #ffffff;
          --border-gray: #d4cfc2;
          padding: clamp(72px, 9vw, 144px) 0 32px;
          background: var(--paper-gradient);
          color: var(--ink);
          font-family: system-ui, -apple-system, sans-serif;
          isolation: isolate;
          scroll-margin-top: 80px;
          position: relative;
          overflow: hidden;
        }

        .tech-section::before {
          content: "";
          position: absolute;
          top: 10%;
          left: 5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(230, 46, 53, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          animation: tech-ambient-shift 8s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .tech-container { position: relative; z-index: 1; width: 100%; }
        .tech-eyebrow, .tech-chapter, .tech-exploreHint, .tech-consoleToolbar, .tech-detailEyebrow, .tech-benchmark, .tech-studyTopline, .tech-studyBottomline, .tech-colophon { display: flex; align-items: center; }
        .tech-eyebrow, .tech-exploreHint, .tech-consoleToolbar, .tech-detailEyebrow, .tech-studyTopline, .tech-studyBottomline, .tech-footerEyebrow, .tech-colophon { font-family: monospace; font-size: 10px; font-weight: 500; letter-spacing: .09em; }
        .tech-eyebrow { justify-content: space-between; gap: 24px; padding-bottom: 22px; border-bottom: 1px solid var(--border-gray); }
        .tech-eyebrow > span:first-child { display: flex; align-items: center; gap: 10px; }
        .tech-redDot { width: 8px; height: 8px; flex-shrink: 0; background: var(--red); border-radius: 50%; box-shadow: 0 0 10px var(--red); animation: tech-pulse 1.2s infinite; }
        .tech-chapter { color: #666; font-size: 9px; text-align: right; }

        .tech-header { display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, .36fr); align-items: end; gap: 48px; padding: 48px 0 64px; }
        .tech-header h2 { margin: 0; font-size: clamp(60px, 7.8vw, 112px); line-height: .99; font-weight: 500; letter-spacing: -.075em; color: var(--ink); min-width: 0; }
        .tech-headingAccent { position: relative; font-family: Georgia, "Times New Roman", serif; font-weight: 400; font-style: italic; letter-spacing: -.065em; color: var(--red); }
        .tech-headingAccent svg { position: absolute; width: 104%; height: 15px; bottom: -9px; left: 0; overflow: visible; fill: none; stroke: var(--red); stroke-width: 1.8; stroke-linecap: round; }
        .tech-headingPeriod { color: var(--red); }
        .tech-headerAside { max-width: 270px; justify-self: end; min-width: 0; }
        .tech-headerAside p { margin: 24px 0; color: #444; font-size: 15px; line-height: 1.7; }
        .tech-exploreHint { gap: 16px; font-size: 9px; letter-spacing: .07em; color: var(--red); animation: none; }
        .tech-registrationMark { position: relative; display: grid; grid-template-columns: repeat(2, 18px); gap: 3px; width: 39px; height: 39px; transform: rotate(-12deg); animation: tech-spin-slow 12s linear infinite; }
        .tech-registrationMark > span { border-radius: 50%; background: var(--red); box-shadow: 0 0 5px rgba(230,46,53,0.5); }
        .tech-registrationMark > span:nth-child(2) { background: #111; }
        .tech-registrationMark > span:nth-child(3) { background: #888; }
        .tech-registrationMark > span:nth-child(4) { background: #ccc; }
        .tech-registrationMark i { position: absolute; width: 11px; height: 11px; background: #f7f6f0; left: 14px; top: 14px; border-radius: 50%; }

        /* Bento Console Styling */
        .tech-bentoConsole { background: transparent; display: grid; gap: 16px; }
        .tech-consoleToolbar { justify-content: space-between; gap: 12px; padding: 12px 18px; background: rgba(255,255,255,0.6); border: 1px solid var(--border-gray); border-radius: 8px; color: #333; font-size: 9px; backdrop-filter: blur(8px); display: grid; grid-template-columns: minmax(0, 1fr) auto; }
        .tech-consoleLabel, .tech-consoleControls, .tech-interactiveLabel { display: inline-flex; align-items: center; gap: 10px; }
        .tech-consoleLabel > svg { color: var(--red); animation: tech-pulse 2s infinite; }
        .tech-consoleControls { gap: 18px; }
        .tech-interactiveLabel { color: #555; font-size: 8px; font-weight: bold; }
        .tech-interactiveLabel i { width: 6px; height: 6px; background: var(--red); border-radius: 50%; box-shadow: 0 0 8px var(--red); animation: tech-pulse 0.8s infinite; }
        .tech-motionButton { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid var(--border-gray); border-radius: 50%; color: var(--red); background: #fff; cursor: pointer; transition: all .3s; box-shadow: 0 2px 5px rgba(0,0,0,0.05); flex-shrink: 0; }
        .tech-motionButton:hover { background: var(--red); color: #fff; border-color: var(--red); transform: scale(1.15) rotate(90deg); }

        /* Bento Grid Selector Cards */
        .tech-bentoGrid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; grid-auto-rows: 1fr; }
        .tech-bentoCard { display: grid; grid-template-columns: minmax(0, 1fr); flex-direction: column; justify-content: normal; gap: 20px; padding: 24px; background: var(--accent-card); border: 1px solid var(--border-gray); border-radius: 12px; text-align: left; cursor: pointer; transition: all .4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 25px -10px rgba(0,0,0,0.04); position: relative; overflow: hidden; grid-template-rows: auto 1fr auto; min-width: 0; min-height: 190px; }
        .tech-bentoCard::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--red); transform: scaleX(0); transform-origin: left; transition: transform .4s cubic-bezier(0.16, 1, 0.3, 1); }
        .tech-bentoCard:hover { transform: translateY(-4px); border-color: #b5ad9e; box-shadow: 0 15px 30px -10px rgba(230,46,53,0.12); }
        .tech-bentoCard.is-active { background: #111315; color: #fff; border-color: #111315; transform: none; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.25); }
        .tech-bentoCard.is-active::before { transform: scaleX(1); }
        .tech-bentoCardTop { display: flex; align-items: center; justify-content: space-between; }
        .tech-bentoNumber { font-family: monospace; font-size: 12px; font-weight: bold; color: var(--red); }
        .tech-bentoCard.is-active .tech-bentoNumber { color: #ff6b72; }
        .tech-bentoIconBox { width: 36px; height: 36px; border-radius: 8px; background: #f4f3ed; display: grid; place-items: center; color: var(--ink); transition: background .3s; }
        .tech-bentoCard.is-active .tech-bentoIconBox { background: rgba(255,255,255,0.1); color: #fff; }
        .tech-bentoCategory { display: block; font-family: monospace; font-size: 9px; letter-spacing: 0.08em; color: #666; margin-bottom: 6px; }
        .tech-bentoCard.is-active .tech-bentoCategory { color: #aaa; }
        .tech-bentoTitle { margin: 0; font-size: 17px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.25; }
        .tech-bentoFooterIndicator { display: flex; align-items: center; justify-content: space-between; font-family: monospace; font-size: 8px; letter-spacing: 0.08em; color: #888; border-top: 1px solid rgba(128,128,128,0.15); padding-top: 12px; }
        .tech-bentoCard.is-active .tech-bentoFooterIndicator { color: var(--red); border-color: rgba(255,255,255,0.1); }

        /* Showcase Panel */
        .tech-showcasePanel { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); background: #ffffff; border: 1px solid var(--border-gray); border-radius: 14px; overflow: hidden; box-shadow: 0 25px 50px -20px rgba(0,0,0,0.08); margin-top: 0; }
        .tech-section button:focus-visible, .tech-contactLink:focus-visible, .tech-showcasePanel:focus-visible { outline: 2px solid var(--red); outline-offset: 5px; }

        .tech-study { position: relative; min-width: 0; min-height: 0; overflow: hidden; background: #f8f7f2; border-right: 1px solid var(--border-gray); perspective: 1000px; display: flex; flex-direction: column; }
        .tech-studyGrid { position: absolute; inset: 0; background-image: linear-gradient(rgba(230, 46, 53, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(230, 46, 53, 0.06) 1px, transparent 1px); background-size: 40px 40px; animation: tech-grid-move 15s linear infinite; }
        .tech-study::after { content: ""; position: absolute; width: 300px; height: 60px; bottom: 80px; left: 50%; transform: translateX(-50%) rotate(-15deg); border-radius: 50%; background: rgba(230, 46, 53, 0.12); filter: blur(30px); pointer-events: none; animation: tech-shadow-pulse 3s ease-in-out infinite; }

        .tech-orbit, .tech-orbitInner { position: absolute; top: 50%; left: 50%; width: 410px; height: 410px; border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 50%; transform: translate(-50%, -50%) rotate(-25deg) scaleY(.8); animation: tech-orbit-turn 25s linear infinite; }
        .tech-orbit::after { content: ""; position: absolute; inset: 18px; border: 1px dashed rgba(230, 46, 53, 0.25); border-radius: 50%; animation: tech-spin-slow 15s linear infinite reverse; }
        .tech-orbitInner { width: 310px; height: 310px; border-color: rgba(230, 46, 53, 0.12); animation-direction: reverse; animation-duration: 18s; }

        .tech-crosshair { position: absolute; color: rgba(230, 46, 53, 0.6); font-family: monospace; font-weight: bold; font-size: 24px; line-height: 1; }
        .tech-crosshairTop { top: 70px; left: 28px; animation: tech-pulse 1.5s infinite; }
        .tech-crosshairBottom { bottom: 70px; right: 28px; animation: tech-pulse 1.5s infinite 0.75s; }
        .tech-studyTopline, .tech-studyBottomline { position: relative; justify-content: space-between; gap: 12px; z-index: 2; color: #555; font-size: 8px; letter-spacing: .08em; font-weight: bold; padding: 20px 24px; min-height: 52px; flex-shrink: 0; bottom: auto; }
        .tech-studyTopline { top: auto; }
        .tech-studyEdition { color: #111; font-weight: bold; }
        .tech-studyBottomline { bottom: 28px; }
        .tech-inkDots { display: flex; gap: 5px; }
        .tech-inkDots i { width: 7px; height: 7px; border-radius: 50%; background: #111; animation: tech-glow 2s infinite alternate; }
        .tech-inkDots i:nth-child(2) { background: var(--red); animation-delay: 0.4s; }
        .tech-inkDots i:nth-child(3) { background: #888; animation-delay: 0.8s; }
        .tech-inkDots i:nth-child(4) { background: #ccc; animation-delay: 1.2s; }

        .tech-labelAssembly { position: absolute; z-index: 1; width: 220px; height: 290px; left: 50%; top: 45%; margin: -145px 0 0 -110px; transform: rotate(-17deg); animation: tech-levitate 5s ease-in-out infinite; scale: var(--tech-art-scale, .9); animation-play-state: paused; }
        .tech-labelLayer { position: absolute; inset: 0; border-radius: 4px 4px 16px 4px; box-shadow: 0 20px 40px rgba(0,0,0,0.12); transition: transform 0.8s cubic-bezier(.16,1,.3,1), background .5s; }
        .tech-baseLayer { background: #e5e3d8; transform: translate(-23px, 53px) rotate(-8deg); border: 1px solid #ccc; animation: none; }
        .tech-colorLayer { background: #cce7d4; transform: translate(0, 15px) rotate(1deg); overflow: hidden; border: 1px solid #a8d5b5; animation: none; }
        .tech-topLayer { padding: 26px 22px 17px; color: #111; background: #ffffff; transform: translate(22px, -34px) rotate(8deg); overflow: hidden; border: 1px solid var(--red); box-shadow: 0 0 25px rgba(230, 46, 53, 0.2); animation: none; }

        .tech-layerHole { position: absolute; width: 9px; height: 9px; left: calc(50% - 4.5px); top: 12px; border-radius: 50%; background: #f4f3ed; box-shadow: 0 1px 3px rgba(0,0,0,0.2) inset; }
        .tech-baseLines { position: absolute; inset: 36px 18px; background: repeating-linear-gradient(0deg, transparent 0 7px, rgba(0,0,0,0.06) 7px 8px); }
        .tech-materialNote { position: absolute; bottom: 13px; left: 18px; font-family: monospace; font-size: 7px; letter-spacing: .12em; color: #666; font-weight: bold; }
        .tech-colorBars { position: absolute; inset: 40px 18px 35px; display: flex; gap: 5px; transform: rotate(-20deg) scale(1.6); }
        .tech-colorBars span { flex: 1; background: var(--red); box-shadow: 0 0 6px var(--red); }
        .tech-colorBars span:nth-child(2) { background: #111111; }
        .tech-colorBars span:nth-child(3) { background: #888888; }
        .tech-colorBars span:nth-child(4) { background: #cccccc; }
        .tech-colorBars span:nth-child(5) { background: #ff7777; }
        .tech-colorNote { position: absolute; bottom: 12px; left: 17px; font-family: monospace; font-size: 7px; color: #333; letter-spacing: .06em; font-weight: bold; }

        .tech-tagBrand { display: flex; align-items: center; gap: 9px; padding-bottom: 17px; border-bottom: 1px solid var(--border-gray); color: var(--red); font-size: 28px; font-weight: 700; letter-spacing: -.08em; line-height: 1; text-shadow: 0 0 8px rgba(230,46,53,0.3); }
        .tech-tagBrand span { max-width: 50px; color: #444; font-size: 6px; font-weight: 600; line-height: 1.6; letter-spacing: .12em; }
        .tech-tagTitle { margin: 30px 0 26px; font-size: 25px; font-weight: 600; letter-spacing: -.065em; line-height: 1.1; color: #111; }
        .tech-tagTitle > span { color: var(--red); }
        .tech-tagBottom { display: flex; align-items: end; justify-content: space-between; gap: 15px; }
        .tech-barcode { width: 100px; height: 35px; background: repeating-linear-gradient(90deg, #111 0 2px, transparent 2px 4px, #111 4px 5px, transparent 5px 8px, #111 8px 12px, transparent 12px 14px, #111 14px 15px, transparent 15px 18px, #111 18px 21px, transparent 21px 23px); }
        .tech-tagSerial { display: block; margin-top: 12px; font-family: monospace; font-size: 6px; letter-spacing: .1em; color: #555; font-weight: bold; }

        .tech-scanBeam { position: absolute; top: 10%; left: 0; right: 0; height: 3px; background: var(--red); box-shadow: 0 0 20px 5px var(--red); opacity: 0; animation: tech-scan 2s ease-in-out infinite; animation-play-state: paused; }
        .tech-cutGuide { position: absolute; inset: 8px; border: 1px dashed rgba(230,46,53,0.8); opacity: 0; transition: opacity .4s; animation: none; }

        .tech-layerNotes { position: relative; z-index: 2; display: grid; gap: 30px; min-width: 0; animation: tech-detailEnter .5s both; }
        .tech-layerNotes > span { display: flex; align-items: center; gap: 6px; color: #333; font-family: monospace; font-size: 8px; font-weight: bold; animation: tech-slide-up 0.5s ease; white-space: nowrap; }
        .tech-layerNotes i { width: 17px; height: 1px; background: var(--red); box-shadow: 0 0 5px var(--red); flex-shrink: 0; }
        .tech-layerNotes small { margin-left: auto; color: var(--red); font-size: 7px; font-weight: bold; }

        .tech-study[data-process="encode"] .tech-topLayer { transform: translate(10px, -23px) rotate(3deg); }
        .tech-study[data-process="encode"] .tech-scanBeam { opacity: 1; }
        .tech-study[data-process="connect"] .tech-baseLayer { transform: translate(-32px, 65px) rotate(-16deg); }
        .tech-study[data-process="connect"] .tech-colorLayer { transform: translate(0, 15px) rotate(0); }
        .tech-study[data-process="connect"] .tech-topLayer { transform: translate(28px, -47px) rotate(16deg); background: #fff; }
        .tech-study[data-process="finish"] .tech-baseLayer { transform: translate(-5px, 9px) rotate(0); }
        .tech-study[data-process="finish"] .tech-colorLayer { transform: translate(0, 4px) rotate(0); }
        .tech-study[data-process="finish"] .tech-topLayer { transform: translate(5px, -2px) rotate(0); }
        .tech-study[data-process="finish"] .tech-cutGuide { opacity: 1; }

        .tech-details { min-width: 0; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; padding: clamp(24px, 3vw, 42px); background: #ffffff; }
        .tech-detailsContent { animation: tech-detailEnter .5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .tech-detailEyebrow { gap: 9px; color: var(--red); font-size: 9px; text-transform: uppercase; letter-spacing: .06em; font-weight: bold; }
        .tech-detailEyebrow svg { flex-shrink: 0; animation: tech-pulse 1.5s infinite; }
        .tech-detailCount { margin-left: auto; color: #666; font-size: 8px; white-space: nowrap; font-weight: bold; }
        .tech-details h3 { margin: 29px 0 18px; color: #111; font-size: clamp(25px, 2.8vw, 39px); font-weight: 500; line-height: 1.15; letter-spacing: -.05em; }
        .tech-details h3 > span { display: block; animation: tech-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .tech-description { margin: 0; color: #444; font-size: 13px; line-height: 1.85; max-width: 48ch; }
        .tech-metric { display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px 16px; margin: 29px 0 15px; }
        .tech-metric strong { color: #111; font-size: clamp(43px, 4vw, 58px); font-weight: 600; line-height: 1; letter-spacing: -.065em; animation: tech-glow 3s infinite alternate; }
        .tech-metric > span { max-width: 120px; color: #666; font-size: 11px; line-height: 1.5; font-weight: 500; }
        .tech-benchmark { align-items: flex-start; gap: 8px; color: #333; font-size: 10px; letter-spacing: -.01em; line-height: 1.6; font-weight: 500; }
        .tech-benchmark svg { margin-top: 1px; color: var(--red); flex-shrink: 0; animation: tech-bounce 1.5s infinite; }
        .tech-detailFootnote { display: flex; align-items: center; gap: 12px; padding-top: 22px; border-top: 1px solid var(--border-gray); color: #555; font-family: Georgia, serif; font-style: italic; font-size: 13px; }
        .tech-footnoteLine { width: 21px; height: 1px; flex-shrink: 0; background: var(--red); box-shadow: 0 0 8px var(--red); animation: tech-pulse 2s infinite; }

        .tech-footer { display: grid; align-items: center; justify-content: space-between; gap: 36px; padding: 44px 0; border-top: 1px solid var(--border-gray); margin-top: 40px; grid-template-columns: minmax(0, 1fr) minmax(240px, .55fr); }
        .tech-turnaround { display: grid; align-items: center; gap: 29px; grid-template-columns: 104px minmax(0, 1fr); min-width: 0; }
        .tech-timeMark { position: relative; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; width: 104px; height: 119px; padding: 15px; background: var(--red); color: #fff; clip-path: polygon(0 0, 100% 0, 100% 82%, 80% 100%, 0 100%); transform: rotate(-6deg); flex-shrink: 0; box-shadow: 0 5px 20px rgba(230,46,53,0.4); animation: tech-float-badge 3.5s ease-in-out infinite; }
        .tech-timeMark > span { font-size: 49px; font-weight: 700; letter-spacing: -.085em; line-height: 1; }
        .tech-timeMark small { margin-top: 7px; font-family: monospace; font-size: 8px; letter-spacing: .16em; font-weight: bold; }
        .tech-timeMark svg { position: absolute; top: 12px; right: 12px; animation: tech-spin-slow 8s linear infinite; }
        .tech-footerEyebrow { color: var(--red); font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; }
        .tech-turnaround h3 { margin: 9px 0; color: #111; font-size: clamp(22px, 2.4vw, 31px); font-weight: 600; letter-spacing: -.05em; line-height: 1.15; }
        .tech-turnaround p { margin: 0; color: #555; font-size: 11px; line-height: 1.8; }

        .tech-contactLink { display: flex; align-items: center; justify-content: space-between; gap: 24px; min-width: 0; padding: 20px 0; border-bottom: 1px solid var(--border-gray); color: #111; text-decoration: none; transition: all .3s; }
        .tech-contactLink > span:first-child { font-size: 20px; font-weight: 600; letter-spacing: -.04em; }
        .tech-contactLink small { display: block; margin-top: 8px; color: #666; font-family: monospace; font-size: 8px; font-weight: bold; letter-spacing: .04em; }
        .tech-contactArrow { display: grid; place-items: center; width: 50px; height: 50px; flex-shrink: 0; border-radius: 50%; background: var(--red); color: white; transition: transform .4s cubic-bezier(0.16, 1, 0.3, 1), background .3s, box-shadow .3s; box-shadow: 0 4px 15px rgba(230,46,53,0.4); animation: tech-pulse 2s infinite; }
        .tech-contactLink:hover .tech-contactArrow { transform: rotate(45deg) scale(1.15); background: #ff3b42; box-shadow: 0 6px 20px rgba(230,46,53,0.7); }
        .tech-colophon { flex-wrap: wrap; justify-content: space-between; gap: 24px; padding-top: 20px; border-top: 1px solid var(--border-gray); color: #666; font-size: 8px; letter-spacing: .06em; font-weight: bold; }
        .tech-colophon > span:last-child { display: flex; align-items: center; gap: 12px; color: var(--red); }

        /* Heavy Animation Keyframes & Dynamic Triggers */
        .tech-section [data-revealed="true"] { animation: tech-reveal .8s cubic-bezier(.16, 1, 0.3, 1) both; }
        .tech-section[data-in-view="true"] .tech-labelAssembly, .tech-section[data-in-view="true"] .tech-scanBeam { animation-play-state: running; }
        .tech-section[data-motion="paused"] .tech-labelAssembly,
        .tech-section[data-motion="paused"] .tech-scanBeam,
        .tech-section[data-motion="paused"] .tech-orbit,
        .tech-section[data-motion="paused"] .tech-orbitInner,
        .tech-section[data-motion="paused"] .tech-timeMark,
        .tech-section[data-motion="paused"] .tech-studyGrid,
        .tech-section[data-motion="paused"]::before { animation-play-state: paused !important; }

        @keyframes tech-reveal { from { opacity: 0; transform: translateY(35px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tech-detailEnter { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tech-levitate { 0%, 100% { transform: translateY(0) rotate(-17deg); } 50% { transform: translateY(-18px) rotate(-14deg); } }
        @keyframes tech-float-layer1 { 0%, 100% { transform: translate(-23px, 53px) rotate(-8deg); } 50% { transform: translate(-28px, 48px) rotate(-6deg); } }
        @keyframes tech-float-layer2 { 0%, 100% { transform: translate(0, 15px) rotate(1deg); } 50% { transform: translate(4px, 10px) rotate(3deg); } }
        @keyframes tech-float-layer3 { 0%, 100% { transform: translate(22px, -34px) rotate(8deg); } 50% { transform: translate(18px, -40px) rotate(10deg); } }
        @keyframes tech-scan { 0%, 100% { top: 15%; } 50% { top: 88%; } }
        @keyframes tech-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.92); } }
        @keyframes tech-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes tech-grid-move { from { background-position: 0 0; } to { background-position: 40px 40px; } }
        @keyframes tech-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        @keyframes tech-glow { from { opacity: 0.8; } to { opacity: 1; transform: scale(1.02); } }
        @keyframes tech-slide-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tech-float-badge { 0%, 100% { transform: rotate(-6deg) translateY(0); } 50% { transform: rotate(-6deg) translateY(-10px); } }
        @keyframes tech-ambient-shift { 0% { transform: scale(1) translate(0, 0); opacity: 0.4; } 50% { transform: scale(1.2) translate(30px, -20px); opacity: 0.8; } 100% { transform: scale(1) translate(0, 0); opacity: 0.4; } }


         .tech-detailEyebrow > span:not(.tech-detailCount) { min-width: 0; }
         /* The artwork and annotations have separate layout areas. */
         .tech-studyCanvas { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1fr) 95px; gap: 20px; align-items: center; flex: 1; padding: 0 24px; }
         .tech-artboard { position: relative; min-width: 0; height: 440px; container: tech-art / inline-size; }
         .tech-consoleLabel { min-width: 0; line-height: 1.6; }
         .tech-consoleLabel > svg, .tech-consoleControls { flex-shrink: 0; }
         .tech-exploreHint > svg { flex-shrink: 0; animation: tech-bounce 2s infinite; }
         .tech-headerAside p, .tech-description, .tech-turnaround p { overflow-wrap: break-word; }
         .tech-bentoCardTop, .tech-bentoFooterIndicator { gap: 12px; }
         .tech-bentoFooterIndicator { align-self: end; }
         .tech-metric strong { animation: tech-metric-glow 3s infinite alternate; }
         .tech-contactLink > span:first-child { min-width: 0; }
         .tech-colophon > span:last-child { flex-wrap: wrap; }
         @keyframes tech-orbit-turn { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
         @keyframes tech-shadow-pulse { 0%, 100% { opacity: .4; } 50% { opacity: .8; } }
         @keyframes tech-metric-glow { from { opacity: .8; } to { opacity: 1; } }

         @container tech-art (max-width: 380px) {
           .tech-labelAssembly { --tech-art-scale: .78; }
         }
         @container tech-art (max-width: 320px) {
           .tech-labelAssembly { --tech-art-scale: .68; }
         }
         @container tech-art (max-width: 260px) {
           .tech-labelAssembly { --tech-art-scale: .58; }
         }

         @media (max-width: 1100px) {
           .tech-bentoGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
         }

         @media (max-width: 1023px) {
           .tech-showcasePanel { grid-template-columns: minmax(0, 1fr); }
           .tech-study { border-right: 0; border-bottom: 1px solid var(--border-gray); }
           .tech-details { gap: 28px; padding: 32px; }
           .tech-description { max-width: 64ch; }
           .tech-details h3 { font-size: clamp(28px, 4.5vw, 36px); }
           .tech-metric strong { font-size: 52px; }
           .tech-detailFootnote { margin-top: 4px; }
         }

         @media (max-width: 960px) {
           .tech-header { grid-template-columns: minmax(0, 1fr); gap: 32px; padding: 36px 0 48px; }
           .tech-header h2 { font-size: clamp(48px, 9vw, 88px); }
           .tech-headerAside { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 12px 20px; align-items: center; justify-self: start; max-width: 460px; }
           .tech-registrationMark { grid-row: span 2; }
           .tech-headerAside p { margin: 0; font-size: 14px; }
           .tech-exploreHint { grid-column: 2; font-size: 8px; }
           .tech-footer { grid-template-columns: minmax(0, 1fr); gap: 24px; padding: 32px 0; margin-top: 32px; }
           .tech-contactLink { justify-self: end; width: min(100%, 320px); }
         }

         @media (max-width: 640px) {
           .tech-section { padding: 64px 0 24px; }
           .tech-eyebrow { flex-wrap: wrap; gap: 12px; padding-bottom: 18px; font-size: 9px; }
           .tech-chapter { font-size: 8px; text-align: left; }
           .tech-header { padding-bottom: 36px; gap: 28px; }
           .tech-consoleToolbar { padding: 10px 14px; }
           .tech-interactiveLabel { display: none; }
           .tech-bentoGrid { gap: 12px; }
           .tech-bentoCard { padding: 20px; gap: 16px; min-height: 180px; }
           .tech-bentoTitle { font-size: 16px; }
           .tech-bentoCategory { font-size: 8px; line-height: 1.5; }
           .tech-bentoConsole { gap: 12px; }
           .tech-studyCanvas { grid-template-columns: minmax(0, 1fr); gap: 0; padding: 0 20px; }
           .tech-artboard { height: 400px; }
          .tech-labelAssembly { scale: min(.82, var(--tech-art-scale, .9)); }
           .tech-layerNotes { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; padding: 0 0 8px; }
           .tech-layerNotes > span { gap: 5px; font-size: 8px; }
           .tech-layerNotes i { width: 12px; }
           .tech-layerNotes small { font-size: 7px; }
           .tech-studyTopline, .tech-studyBottomline { padding: 18px 20px; font-size: 7px; }
           .tech-crosshairTop { top: 60px; left: 18px; }
           .tech-crosshairBottom { bottom: 90px; right: 18px; }
           .tech-details { padding: 26px 24px; }
           .tech-detailEyebrow { font-size: 8px; }
           .tech-details h3 { margin-top: 24px; font-size: clamp(27px, 5.5vw, 34px); }
           .tech-description { font-size: 13px; }
           .tech-metric { gap: 8px 14px; margin-top: 24px; }
           .tech-metric strong { font-size: 48px; }
           .tech-turnaround { grid-template-columns: 84px minmax(0, 1fr); gap: 22px; }
           .tech-timeMark { width: 84px; height: 102px; padding: 12px; }
           .tech-timeMark > span { font-size: 41px; }
           .tech-timeMark svg { width: 14px; top: 10px; right: 9px; }
           .tech-turnaround h3 { font-size: 26px; }
           .tech-contactLink { justify-self: stretch; width: 100%; padding: 16px 0; }
           .tech-colophon { align-items: flex-start; gap: 10px; font-size: 7px; }
           .tech-colophon > span:last-child { gap: 8px; }
         }

         @media (max-width: 479px) {
           .tech-header h2 { font-size: clamp(40px, 11vw, 52px); line-height: 1.05; }
           .tech-headerAside { gap: 10px 16px; }
           .tech-headerAside p { font-size: 13px; }
           .tech-headingAccent svg { bottom: -8px; height: 12px; }
           .tech-bentoGrid { grid-template-columns: minmax(0, 1fr); }
           .tech-bentoCard { grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: auto auto; gap: 14px; min-height: 0; padding: 18px; }
           .tech-bentoCardTop { grid-column: 2; grid-row: 1; gap: 10px; }
           .tech-bentoCard > div:nth-child(2) { grid-column: 1; grid-row: 1; align-self: center; min-width: 0; }
           .tech-bentoFooterIndicator { grid-column: 1 / -1; padding-top: 10px; }
           .tech-bentoNumber { font-size: 10px; }
           .tech-bentoIconBox { width: 30px; height: 30px; }
           .tech-studyCanvas { padding: 0 16px; }
           .tech-artboard { height: 350px; }
          .tech-labelAssembly { scale: min(.68, var(--tech-art-scale, .9)); }
           .tech-layerNotes { gap: 8px; }
           .tech-layerNotes > span { font-size: 7px; gap: 4px; }
           .tech-layerNotes i { width: 8px; }
           .tech-layerNotes small { font-size: 6px; }
           .tech-studyTopline, .tech-studyBottomline { padding: 18px 16px; letter-spacing: .04em; }
           .tech-details { padding: 24px 20px; }
           .tech-detailEyebrow { gap: 7px; font-size: 7px; }
           .tech-detailCount { font-size: 7px; }
           .tech-metric > span { max-width: 115px; font-size: 10px; }
           .tech-benchmark { font-size: 9px; }
           .tech-turnaround { grid-template-columns: 72px minmax(0, 1fr); align-items: start; gap: 18px; }
           .tech-timeMark { width: 72px; height: 92px; padding: 10px; margin-top: 8px; }
           .tech-timeMark > span { font-size: 36px; }
           .tech-timeMark small { font-size: 7px; }
           .tech-footerEyebrow { font-size: 7px; }
           .tech-turnaround h3 { font-size: 23px; }
           .tech-turnaround p { font-size: 11px; }
           .tech-contactLink > span:first-child { font-size: 19px; }
           .tech-contactArrow { width: 46px; height: 46px; }
         }

         @media (hover: none) {
           .tech-bentoCard:hover { transform: none; }
         }

         @media (prefers-reduced-motion: reduce) {
           .tech-section, .tech-section *, .tech-section::before, .tech-section *::before, .tech-section *::after { animation: none !important; transition: none !important; }
           .tech-motionButton { display: none; }
         }
       `}</style>
    </section>
  )
}