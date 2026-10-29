"use client"

import { useEffect, useId, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Building2, Globe2, Minus, Pause, Play, Plus } from "lucide-react"

const brands = [
  { name: "Okaidi-Obaibi", src: "/image/customers/cus1.png" },
  { name: "Arrow", src: "/image/customers/cus2.png" },
  { name: "Chipie", src: "/image/customers/cus3.png" },
  { name: "Jacadi", src: "/image/customers/cus4.png" },
  { name: "Mufti", src: "/image/customers/cus5.JPG" },
  { name: "Indian Terrain", src: "/image/customers/cus7.png" },
  { name: "Calvin Klein", src: "/image/customers/cus8.png" },
  { name: "Flying Machine", src: "/image/customers/cus9.JPG" },
  { name: "Cleo", src: "/image/customers/cus10.JPG" },
  { name: "Tommy Hilfiger", src: "/image/customers/cus11.JPG" },
  { name: "Friedrich", src: "/image/customers/cus12.png" },
]

// Client names from the brochure customer list
const clientsRow1 = [
  "ABA Fashion Ltd",
  "ABA Garments Ltd",
  "AKH Eco Apparels Ltd",
  "Alema Textile Ltd",
  "Anika Apparels Ltd",
  "APS Apparels Ltd",
  "Asrotex Ltd",
  "Astex Garments Ltd",
  "Bhis Apparels Ltd",
  "BMT International Ltd",
  "Bose Export",
  "Centex",
  "Chapter One",
  "Clamoon",
  "Comfort Apparels Ltd",
  "Consumer Knitex Ltd",
  "Cotton Club Ltd",
  "Crony Apparels Ltd",
]

const clientsRow2 = [
  "Crossline Knit Fabrics Ltd",
  "Dhaka Garments & Washing Ltd",
  "Dird Garments Ltd",
  "Divine Fabrics Ltd",
  "Fashion Island Ltd",
  "Fin Bangla Apparels Ltd",
  "Green Life Knitted Ltd",
  "Islam Knit Designs Ltd",
  "Jeans Plus Ltd",
  "JL Fashion Ltd",
  "Knit Asia Ltd",
  "Libas Textiles Ltd",
  "Mega Fashion Ltd",
  "Misami Garments Ltd",
  "Natural Denim",
  "Ocean Sweater",
  "Pioneer Knitwears",
  "Premier Knits",
]
const networkStats = [
  { value: 1988, suffix: "", label: "Our story began", detail: "Decades of shared ambition" },
  { value: 72, suffix: "h", label: "Standard turnaround", detail: "Keeping your business moving" },
  { value: 2, suffix: "", label: "Regional offices", detail: "Bangladesh & Thailand" },
]

function CustomerCount({ value, suffix = "" }) {
  return (
    <span className="partner-counter">
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true"><span data-count={value}>{value}</span>{suffix}</span>
    </span>
  )
}

function NetworkGlobe() {
  return (
    <svg viewBox="0 0 420 420" fill="none" className="partner-globeArt" aria-hidden="true">
      <circle cx="210" cy="210" r="168" stroke="currentColor" strokeOpacity=".09" />
      <circle cx="210" cy="210" r="144" stroke="currentColor" strokeOpacity=".2" />
      <ellipse cx="210" cy="210" rx="144" ry="58" stroke="currentColor" strokeOpacity=".16" />
      <ellipse cx="210" cy="210" rx="144" ry="108" stroke="currentColor" strokeOpacity=".12" />
      <ellipse cx="210" cy="210" rx="58" ry="144" stroke="currentColor" strokeOpacity=".16" />
      <ellipse cx="210" cy="210" rx="108" ry="144" stroke="currentColor" strokeOpacity=".12" />
      <path d="M66 210H354M210 66V354" stroke="currentColor" strokeOpacity=".13" />
      <g className="partner-globeOrbit partner-loop">
        <ellipse cx="210" cy="210" rx="190" ry="74" stroke="currentColor" strokeOpacity=".5" strokeDasharray="3 8" />
        <circle cx="400" cy="210" r="5" fill="currentColor" />
        <circle cx="20" cy="210" r="3" fill="currentColor" />
      </g>
      <g className="partner-globeOrbit partner-globeOrbitReverse partner-loop">
        <ellipse cx="210" cy="210" rx="178" ry="92" stroke="currentColor" strokeOpacity=".25" />
        <circle cx="388" cy="210" r="4" fill="#171717" />
      </g>
      <g className="partner-globeNodes partner-loop">
        <circle cx="112" cy="112" r="4" fill="currentColor" />
        <circle cx="309" cy="112" r="3" fill="currentColor" />
        <circle cx="309" cy="309" r="4" fill="currentColor" />
        <circle cx="112" cy="309" r="3" fill="currentColor" />
      </g>
    </svg>
  )
}

function ClientTicker({ names, reverse = false }) {
  return (
    <div className="partner-ticker" aria-hidden="true">
      <div className={`partner-tickerTrack partner-loop ${reverse ? "partner-tickerReverse" : ""}`}>
        {[0, 1].map((copy) => (
          <div className="partner-tickerGroup" key={copy}>
            {names.map((name) => <span className="partner-nameChip" key={name}><span />{name}</span>)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Customers() {
  const sectionRef = useRef(null)
  const [motionPaused, setMotionPaused] = useState(false)
  const [directoryOpen, setDirectoryOpen] = useState(false)
  const directoryId = useId()
  const headingId = useId()
  const clients = [...clientsRow1, ...clientsRow2]

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === "undefined") return
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const frames = new Set()

    function animateCount(element) {
      if (reducedMotion.matches) return
      const target = Number(element.dataset.count)
      let start
      let frame
      const tick = (time) => {
        frames.delete(frame)
        if (start === undefined) start = time
        const progress = Math.min((time - start) / 1600, 1)
        element.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 4))))
        if (progress < 1) {
          frame = requestAnimationFrame(tick)
          frames.add(frame)
        }
      }
      frame = requestAnimationFrame(tick)
      frames.add(frame)
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        if (entry.target.hasAttribute("data-count")) animateCount(entry.target)
        else entry.target.dataset.revealed = "true"
        revealObserver.unobserve(entry.target)
      })
    }, { threshold: 0.12 })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      section.dataset.inView = String(entry.isIntersecting)
    })

    const stopCounts = () => {
      if (!reducedMotion.matches) return
      frames.forEach(cancelAnimationFrame)
      frames.clear()
      section.querySelectorAll("[data-count]").forEach((element) => {
        element.textContent = element.dataset.count
      })
    }
    reducedMotion.addEventListener("change", stopCounts)
    section.querySelectorAll("[data-reveal], [data-count]").forEach((element) => revealObserver.observe(element))
    visibilityObserver.observe(section)

    return () => {
      revealObserver.disconnect()
      visibilityObserver.disconnect()
      reducedMotion.removeEventListener("change", stopCounts)
      frames.forEach(cancelAnimationFrame)
    }
  }, [])

  return (
    <section ref={sectionRef} id="customers" className="partner-section" aria-labelledby={headingId} data-motion={motionPaused ? "paused" : "running"}>
      <div className="partner-ambient partner-loop" aria-hidden="true" />
      <div className="partner-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="partner-topline" data-reveal>
          <span className="partner-eyebrow"><span className="partner-statusDot partner-loop" />OUR CUSTOMERS. OUR COMMUNITY.</span>
          <button className="partner-motionButton" type="button" aria-label="Pause customer section animations" aria-pressed={motionPaused} onClick={() => setMotionPaused((paused) => !paused)}>
            {motionPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            <span>{motionPaused ? "Resume motion" : "Pause motion"}</span>
          </button>
        </div>

        <header className="partner-header" data-reveal>
          <h2 id={headingId}>Good company.<br /><span>Great connections.</span></h2>
          <div className="partner-intro">
            <span className="partner-introMark" aria-hidden="true"><Plus size={24} strokeWidth={1} /></span>
            <p>From the labels you love to the people who make them. We bring brands and manufacturers together, one detail at a time.</p>
            <span className="partner-introCaption">TRUST IS OUR COMMON THREAD <ArrowDown size={12} aria-hidden="true" /></span>
          </div>
        </header>

        <div className="partner-showcase">
          <div className="partner-networkStudy" data-reveal>
            <div className="partner-studyHeading"><Globe2 size={16} aria-hidden="true" /><span>A SHARED WORLD OF POSSIBILITY</span></div>
            <h3>Big ideas travel<br />in good company.</h3>
            <div className="partner-globe">
              <NetworkGlobe />
              <div className="partner-centralMetric"><strong><CustomerCount value={90} suffix="+" /></strong><span>VALUED CUSTOMERS</span></div>
              <span className="partner-globeLabel partner-globeLabelOne">BRANDS</span>
              <span className="partner-globeLabel partner-globeLabelTwo">MAKERS</span>
            </div>
            <div className="partner-studyFooter"><span className="partner-studyLine" /><p>Different names.<br />One commitment to detail.</p><ArrowUpRight size={24} strokeWidth={1} aria-hidden="true" /></div>
          </div>

          <div className="partner-gallery" data-reveal aria-label="Some of the brands we work with">
            {brands.map((brand, index) => (
              <figure className="partner-logoTile" key={brand.name} style={{ "--tile-delay": `${index * 55}ms`, "--shine-delay": `${index * 0.65}s` }}>
                <span className="partner-tileIndex" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className="partner-logoImage"><Image src={brand.src} alt={brand.name} fill sizes="(max-width: 639px) 42vw, (max-width: 1023px) 20vw, 17vw" className="partner-logo" /></div>
                <figcaption>{brand.name}</figcaption>
                <span className="partner-logoShine partner-loop" aria-hidden="true" />
              </figure>
            ))}
            <Link href="/contact" className="partner-invitation">
              <span className="partner-invitationLabel">THE NEXT CONNECTION</span>
              <span className="partner-invitationTitle">Your brand.<br />Our next chapter.</span>
              <span className="partner-invitationBottom">Let&apos;s connect <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></span>
            </Link>
          </div>
        </div>

        <div className="partner-stats" data-reveal>
          {networkStats.map((stat, index) => (
            <div className="partner-stat" key={stat.label}>
              <span className="partner-statIndex">0{index + 1} /</span>
              <div><strong><CustomerCount value={stat.value} suffix={stat.suffix} /></strong><span className="partner-statLabel">{stat.label}</span><p>{stat.detail}</p></div>
              <ArrowUpRight className="partner-statArrow" size={20} strokeWidth={1} aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="partner-community" data-reveal>
          <div className="partner-communityHeading"><span className="partner-eyebrow"><Building2 size={14} aria-hidden="true" />THE MAKER COMMUNITY</span><span>THE PEOPLE BEHIND THE PRODUCT</span></div>
          <div className="partner-tickers"><ClientTicker names={clientsRow1} /><ClientTicker names={clientsRow2} reverse /></div>
          <div className="partner-directoryToolbar">
            <p>Great partnerships make great things possible.</p>
            <button type="button" className="partner-directoryButton" aria-expanded={directoryOpen} aria-controls={directoryId} onClick={() => setDirectoryOpen((open) => !open)}>
              <span>{directoryOpen ? "Close the directory" : "Explore the maker network"}</span>
              <span className="partner-directoryIcon">{directoryOpen ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}</span>
            </button>
          </div>
          <ul className="partner-directory" id={directoryId} hidden={!directoryOpen} aria-label="Manufacturing partner directory">
            {clients.map((client, index) => <li key={client}><span>{String(index + 1).padStart(2, "0")}</span>{client}</li>)}
          </ul>
        </div>

        <div className="partner-colophon"><span>RELATIONSHIPS, WOVEN TO LAST.</span><span>3M LABEL LIMITED <span aria-hidden="true">&#8599;</span></span></div>
      </div>

      <style>{`
        .partner-section {
          --partner-ink: #171717;
          --partner-red: #b92220;
          --partner-white: #ffffff;
          position: relative;
          isolation: isolate;
          overflow: clip;
          padding: clamp(72px, 8vw, 128px) 0 28px;
          background: var(--partner-white);
          color: var(--partner-ink);
          font-family: var(--font-geist-sans), sans-serif;
          scroll-margin-top: 80px;
        }
        .partner-section ::selection { background: var(--partner-red); color: var(--partner-white); }
        .partner-container { position: relative; z-index: 1; width: 100%; }
        .partner-ambient { position: absolute; width: min(900px, 100%); height: 700px; top: 80px; left: 0; pointer-events: none; background: radial-gradient(ellipse, #b9222008, transparent 65%); animation: partner-breathe 10s ease-in-out infinite; }
        .partner-topline, .partner-eyebrow, .partner-motionButton, .partner-introCaption, .partner-studyHeading, .partner-studyFooter, .partner-communityHeading, .partner-directoryToolbar, .partner-directoryButton, .partner-colophon { display: flex; align-items: center; }
        .partner-topline { justify-content: space-between; gap: 20px; padding-bottom: 20px; border-bottom: 1px solid #17171720; }
        .partner-eyebrow, .partner-motionButton, .partner-introCaption, .partner-studyHeading, .partner-globeLabel, .partner-centralMetric > span, .partner-tileIndex, .partner-invitationLabel, .partner-statIndex, .partner-communityHeading > span:last-child, .partner-colophon { font-family: var(--font-geist-mono), monospace; font-size: 9px; font-weight: 400; letter-spacing: .08em; }
        .partner-eyebrow { gap: 10px; color: var(--partner-red); line-height: 1.7; }
        .partner-statusDot { width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: var(--partner-red); box-shadow: 0 0 0 5px #b9222010; animation: partner-signal 3s ease-in-out infinite; }
        .partner-motionButton { min-height: 44px; justify-content: center; gap: 8px; padding: 0 12px; color: #404040; background: transparent; border: 1px solid #17171726; border-radius: 24px; cursor: pointer; font-size: 8px; white-space: nowrap; transition: background .25s, border-color .25s; }
        .partner-motionButton:hover { border-color: var(--partner-red); background: #b9222008; }
        .partner-section button:focus-visible, .partner-section a:focus-visible { outline: 2px solid var(--partner-red); outline-offset: 4px; }
        .partner-header { display: grid; grid-template-columns: minmax(0, 1fr) 260px; align-items: end; gap: 48px; padding: 48px 0 52px; }
        .partner-header h2 { margin: 0; font-size: clamp(44px, 6.2vw, 86px); line-height: 1.02; font-weight: 450; letter-spacing: -.065em; }
        .partner-header h2 > span { font-family: Georgia, "Times New Roman", serif; font-style: italic; font-weight: 400; color: var(--partner-red); letter-spacing: -.055em; }
        .partner-intro { min-width: 0; }
        .partner-introMark { display: grid; place-items: center; width: 30px; height: 30px; margin-bottom: 17px; color: var(--partner-red); }
        .partner-intro p { margin: 0 0 22px; color: #525252; font-size: 13px; line-height: 1.8; }
        .partner-introCaption { justify-content: space-between; gap: 10px; color: #737373; font-size: 8px; }
        .partner-showcase { display: grid; grid-template-columns: minmax(0, .46fr) minmax(0, 1fr); gap: 18px; }
        .partner-networkStudy { position: relative; min-width: 0; display: flex; flex-direction: column; overflow: hidden; padding: 26px; background: #fafafa; border: 1px solid #b9222026; border-radius: 4px; }
        .partner-studyHeading { gap: 8px; color: #b92220; font-size: 7px; letter-spacing: .06em; line-height: 1.5; }
        .partner-studyHeading > svg { flex-shrink: 0; }
        .partner-networkStudy h3 { position: relative; z-index: 1; margin: 24px 0 0; font-size: clamp(25px, 2.6vw, 35px); font-weight: 400; letter-spacing: -.045em; line-height: 1.12; }
        .partner-globe { position: relative; flex: 1; min-height: 290px; color: var(--partner-red); }
        .partner-globeArt { position: absolute; width: 135%; max-width: none; height: auto; aspect-ratio: 1; left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: .72; }
        .partner-globeOrbit { transform-origin: 210px 210px; animation: partner-orbit 24s linear infinite; }
        .partner-globeOrbitReverse { animation-duration: 32s; animation-direction: reverse; }
        .partner-globeNodes { transform-origin: 210px 210px; animation: partner-orbit 42s linear infinite reverse; }
        .partner-centralMetric { position: absolute; z-index: 1; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }
        .partner-centralMetric strong { font-size: clamp(74px, 7.5vw, 108px); line-height: .9; font-weight: 400; letter-spacing: -.08em; text-shadow: 0 4px 32px #fafafa; }
        .partner-centralMetric > span { color: #525252; font-size: 8px; }
        .partner-counter { font-variant-numeric: tabular-nums; }
        .partner-globeLabel { position: absolute; padding: 5px 7px; background: #ffffffef; border: 1px solid #b9222022; font-size: 6px; color: #525252; }
        .partner-globeLabelOne { top: 16%; right: -5px; }
        .partner-globeLabelTwo { bottom: 12%; left: -4px; }
        .partner-studyFooter { position: relative; z-index: 1; gap: 12px; padding-top: 25px; border-top: 1px solid #b9222022; }
        .partner-studyLine { width: 16px; height: 1px; flex-shrink: 0; background: var(--partner-red); }
        .partner-studyFooter p { flex: 1; margin: 0; font-family: Georgia, serif; font-style: italic; color: #525252; font-size: 13px; line-height: 1.5; }
        .partner-studyFooter > svg { flex-shrink: 0; color: var(--partner-red); }
        .partner-gallery { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: 1fr; gap: 9px; min-width: 0; }
        .partner-logoTile { position: relative; display: flex; flex-direction: column; min-width: 0; min-height: 130px; margin: 0; padding: 20px 20px 14px; background: var(--partner-white); border: 1px solid #17171718; border-radius: 3px; overflow: hidden; transition: transform .35s, background .35s, box-shadow .35s; }
        .partner-tileIndex { position: absolute; top: 10px; left: 12px; color: #737373; font-size: 7px; letter-spacing: .04em; }
        .partner-logoImage { position: relative; width: 100%; min-height: 60px; flex: 1; margin: 5px 0 8px; }
        .partner-logo { object-fit: contain; mix-blend-mode: multiply; filter: grayscale(1); transition: filter .35s, transform .5s; }
        .partner-logoTile figcaption { color: #525252; font-size: 8px; font-weight: 450; text-align: center; line-height: 1.5; }
        .partner-logoShine { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(110deg, transparent 30%, #b9222008 47%, transparent 64%); transform: translateX(-150%); animation: partner-sheen 11s ease-in-out infinite; animation-delay: var(--shine-delay); }
        .partner-invitation { display: flex; flex-direction: column; justify-content: space-between; gap: 14px; padding: 17px 20px; border: 1px solid #b9222033; border-radius: 3px; background: #fff5f5; color: var(--partner-ink); text-decoration: none; transition: background .3s; }
        .partner-invitation:hover { background: #ffe9e9; }
        .partner-invitationLabel { color: #b92220; font-size: 6px; line-height: 1.5; }
        .partner-invitationTitle { font-size: clamp(17px, 1.7vw, 23px); line-height: 1.08; font-weight: 450; letter-spacing: -.04em; }
        .partner-invitationBottom { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 9px; color: var(--partner-red); }
        .partner-invitationBottom > svg { flex-shrink: 0; transition: transform .3s; }
        .partner-invitation:hover .partner-invitationBottom > svg { transform: translate(2px, -2px); }
        .partner-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 34px 0 52px; border-top: 1px solid #17171720; border-bottom: 1px solid #17171720; }
        .partner-stat { display: flex; align-items: flex-start; gap: 18px; min-width: 0; padding: 28px 24px; border-right: 1px solid #17171720; }
        .partner-stat:first-child { padding-left: 0; }
        .partner-stat:last-child { border-right: 0; padding-right: 0; }
        .partner-statIndex { padding-top: 7px; color: #737373; font-size: 7px; white-space: nowrap; }
        .partner-stat > div { flex: 1; min-width: 0; }
        .partner-stat strong { display: block; font-size: clamp(33px, 3.9vw, 50px); line-height: 1; font-weight: 400; letter-spacing: -.055em; color: var(--partner-red); }
        .partner-statLabel { display: block; margin-top: 10px; color: var(--partner-ink); font-size: 12px; }
        .partner-stat p { margin: 6px 0 0; color: #666666; font-size: 10px; line-height: 1.6; }
        .partner-statArrow { flex-shrink: 0; margin-top: 3px; color: #b92220; }
        .partner-community { padding: 28px 0 0; border-top: 1px solid #17171720; }
        .partner-communityHeading { justify-content: space-between; gap: 20px; margin-bottom: 24px; }
        .partner-communityHeading > span:last-child { color: #737373; font-size: 7px; }
        .partner-tickers { display: grid; gap: 10px; overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent); }
        .partner-ticker { overflow: hidden; }
        .partner-tickerTrack { display: flex; width: max-content; animation: partner-travel 75s linear infinite; will-change: transform; }
        .partner-tickerReverse { animation-direction: reverse; animation-duration: 85s; }
        .partner-tickerGroup { display: flex; gap: 12px; padding-right: 12px; }
        .partner-nameChip { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border: 1px solid #b9222022; background: #b9222005; color: #404040; font-size: 11px; white-space: nowrap; }
        .partner-nameChip > span { width: 4px; height: 4px; background: #b92220; border-radius: 50%; }
        .partner-directoryToolbar { justify-content: space-between; gap: 24px; margin-top: 23px; padding: 0 0 25px; border-bottom: 1px solid #17171720; }
        .partner-directoryToolbar > p { margin: 0; font-family: Georgia, serif; font-style: italic; color: #525252; font-size: 15px; line-height: 1.5; }
        .partner-directoryButton { gap: 18px; min-height: 44px; color: var(--partner-red); font-size: 11px; background: transparent; border: 0; cursor: pointer; text-align: left; }
        .partner-directoryIcon { display: grid; place-items: center; width: 36px; height: 36px; flex-shrink: 0; border: 1px solid #b9222044; border-radius: 50%; transition: background .3s, transform .3s; }
        .partner-directoryButton:hover .partner-directoryIcon { background: #b9222010; transform: rotate(90deg); }
        .partner-directory { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 24px; margin: 0; padding: 18px 0 0; list-style: none; animation: partner-rise .45s ease both; }
        .partner-directory[hidden] { display: none; }
        .partner-directory li { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid #17171718; color: #404040; font-size: 11px; line-height: 1.6; overflow-wrap: anywhere; }
        .partner-directory li > span { padding-top: 2px; flex-shrink: 0; color: #b92220; font-family: var(--font-geist-mono), monospace; font-size: 8px; }
        .partner-colophon { justify-content: space-between; gap: 20px; margin-top: 35px; color: #737373; font-size: 7px; line-height: 1.6; }
        .partner-colophon > span:last-child { display: flex; gap: 16px; align-items: center; }
        .partner-section [data-revealed="true"] { animation: partner-rise .85s cubic-bezier(.16, 1, .3, 1) both; }
        .partner-gallery[data-revealed="true"] .partner-logoTile { animation: partner-tile-in .8s cubic-bezier(.16, 1, .3, 1) backwards; animation-delay: var(--tile-delay); }
        .partner-section .partner-loop { animation-play-state: paused; }
        .partner-section[data-in-view="true"] .partner-loop { animation-play-state: running; }
        .partner-section[data-motion="paused"] .partner-loop, .partner-ticker:hover .partner-tickerTrack { animation-play-state: paused; }
        @keyframes partner-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes partner-tile-in { from { opacity: 0; transform: translateY(28px) rotateX(16deg); } to { opacity: 1; transform: translateY(0) rotateX(0); } }
        @keyframes partner-orbit { from { transform: rotate(-25deg); } to { transform: rotate(335deg); } }
        @keyframes partner-sheen { 0%, 12% { transform: translateX(-150%); } 35%, 100% { transform: translateX(150%); } }
        @keyframes partner-travel { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes partner-signal { 0%, 100% { box-shadow: 0 0 0 3px #b9222012; } 50% { box-shadow: 0 0 0 7px #b9222000; } }
        @keyframes partner-breathe { 0%, 100% { opacity: .4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
        @media (hover: hover) and (pointer: fine) {
          .partner-logoTile:hover { transform: translateY(-3px); background: white; box-shadow: 0 12px 28px #00000026; z-index: 2; }
          .partner-logoTile:hover .partner-logo { filter: grayscale(0); transform: scale(1.06); }
        }
        @media (max-width: 1100px) {
          .partner-header { gap: 32px; grid-template-columns: minmax(0, 1fr) 230px; }
          .partner-showcase { gap: 12px; grid-template-columns: minmax(0, .5fr) minmax(0, 1fr); }
          .partner-networkStudy { padding: 22px; }
          .partner-logoTile { padding: 20px 16px 12px; min-height: 125px; }
          .partner-invitation { padding: 16px; }
          .partner-stat { gap: 12px; padding: 26px 20px; }
        }
        @media (max-width: 1023px) {
          .partner-showcase { grid-template-columns: minmax(0, 1fr); gap: 18px; }
          .partner-networkStudy { min-height: 310px; padding: 28px; }
          .partner-networkStudy h3 { max-width: 230px; font-size: 32px; }
          .partner-globe { position: absolute; inset: 0 0 0 38%; min-height: 0; }
          .partner-globeArt { width: 90%; max-height: 400px; }
          .partner-centralMetric strong { font-size: 98px; }
          .partner-globeLabelOne { top: 17%; right: 14%; }
          .partner-globeLabelTwo { bottom: 14%; left: 4%; }
          .partner-studyFooter { max-width: 230px; margin-top: auto; padding-top: 20px; }
          .partner-gallery { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .partner-logoTile { min-height: 135px; padding: 24px 14px 12px; }
          .partner-invitationTitle { font-size: 20px; }
          .partner-invitationLabel { font-size: 5px; }
          .partner-directory { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .partner-statArrow { display: none; }
        }
        @media (max-width: 760px) {
          .partner-header { grid-template-columns: minmax(0, 1fr); gap: 26px; padding: 34px 0 38px; }
          .partner-header h2 { font-size: clamp(44px, 7.8vw, 60px); }
          .partner-intro { max-width: 440px; display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 0 16px; align-items: start; }
          .partner-introMark { grid-row: span 2; margin: 1px 0 0; }
          .partner-intro p { font-size: 13px; margin-bottom: 16px; }
          .partner-introCaption { grid-column: 2; font-size: 7px; }
          .partner-stat { gap: 10px; padding: 24px 16px; }
          .partner-statIndex { display: none; }
          .partner-stat strong { font-size: 38px; }
          .partner-statLabel { font-size: 11px; line-height: 1.5; }
          .partner-stat p { font-size: 9px; }
          .partner-communityHeading > span:last-child { display: none; }
          .partner-directoryToolbar > p { font-size: 13px; max-width: 200px; }
        }
        @media (max-width: 639px) {
          .partner-section { padding: 64px 0 24px; }
          .partner-topline { gap: 12px; padding-bottom: 16px; }
          .partner-eyebrow { font-size: 8px; letter-spacing: .035em; gap: 9px; }
          .partner-motionButton { width: 44px; padding: 0; flex-shrink: 0; }
          .partner-motionButton > span { display: none; }
          .partner-header h2 { font-size: clamp(38px, 9.3vw, 56px); }
          .partner-networkStudy { min-height: 410px; padding: 24px; }
          .partner-networkStudy h3 { margin-top: 18px; font-size: 29px; max-width: none; }
          .partner-globe { inset: 95px 0 50px; }
          .partner-globeArt { width: 90%; max-width: 350px; max-height: none; }
          .partner-centralMetric strong { font-size: 94px; }
          .partner-globeLabelOne { top: 12%; right: 12%; }
          .partner-globeLabelTwo { bottom: 8%; left: 10%; }
          .partner-studyFooter { max-width: none; padding-top: 18px; }
          .partner-studyFooter p { font-size: 12px; }
          .partner-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
          .partner-logoTile { min-height: 128px; padding: 24px 18px 12px; }
          .partner-invitationLabel { font-size: 6px; }
          .partner-invitationTitle { font-size: 23px; }
          .partner-invitation { padding: 18px; }
          .partner-stats { grid-template-columns: minmax(0, 1fr); margin: 30px 0 36px; }
          .partner-stat { align-items: center; gap: 18px; padding: 20px 0; border-right: 0; border-bottom: 1px solid #1717171c; }
          .partner-stat:last-child { border-bottom: 0; }
          .partner-stat > div { display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 4px 16px; align-items: center; }
          .partner-stat strong { grid-row: span 2; font-size: 41px; }
          .partner-statLabel { margin: 0; font-size: 12px; }
          .partner-stat p { margin: 0; font-size: 10px; }
          .partner-statArrow { display: block; }
          .partner-community { padding-top: 22px; }
          .partner-communityHeading { margin-bottom: 20px; }
          .partner-nameChip { padding: 12px 15px; font-size: 10px; }
          .partner-directoryToolbar { flex-direction: column; align-items: stretch; gap: 16px; padding-bottom: 20px; }
          .partner-directoryToolbar > p { max-width: none; }
          .partner-directoryButton { justify-content: space-between; }
          .partner-colophon { gap: 14px; font-size: 6px; }
          .partner-colophon > span:last-child { gap: 7px; }
        }
        @media (max-width: 379px) {
          .partner-header h2 { font-size: 37px; }
          .partner-intro { gap: 0 12px; }
          .partner-introCaption { font-size: 6px; }
          .partner-logoTile { min-height: 120px; padding: 22px 12px 10px; }
          .partner-invitation { padding: 14px; }
          .partner-invitationTitle { font-size: 20px; }
          .partner-invitationLabel { font-size: 5px; }
          .partner-stat > div { grid-template-columns: 90px minmax(0, 1fr); gap: 4px 12px; }
          .partner-stat strong { font-size: 37px; }
          .partner-statArrow { width: 16px; }
          .partner-directory { grid-template-columns: minmax(0, 1fr); }
          .partner-colophon { flex-wrap: wrap; }
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-section *, .partner-section *::before, .partner-section *::after { animation: none !important; transition: none !important; }
          .partner-motionButton { display: none; }
          .partner-tickerTrack { will-change: auto; }
        }
      `}</style>
    </section>
  )
}
