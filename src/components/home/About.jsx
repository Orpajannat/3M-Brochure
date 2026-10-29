"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Asterisk, Check, Pause, Play, Plus } from "lucide-react"

const details = [
  { name: "Labels", title: "Identity, woven in.", text: "Woven and printed labels that make every garment unmistakably yours. Precision in the details. Personality in every thread." },
  { name: "Hangtags", title: "A first impression that stays.", text: "Private label branding, high-speed offset printing, and source tagging. Considered from the first touch to the final finish." },
  { name: "Packaging", title: "The experience starts here.", text: "Specialty packaging that carries your brand further. Thoughtful materials, distinctive finishes, and a little anticipation." },
]

function Barcode({ className = "" }) {
  return <span className={`mark-barcode ${className}`} aria-hidden="true" />
}

function LabelArtwork() {
  return (
    <span className="mark-labelArt">
      <span className="mark-labelStitches" />
      <span className="mark-labelBrand">3M<span>LABEL LIMITED</span></span>
      <span className="mark-labelRule" />
      <span className="mark-labelSmall">THE FINISHING<br />TOUCH.</span>
      <span className="mark-labelEdge">EST. 1988</span>
    </span>
  )
}

function TagArtwork() {
  return (
    <span className="mark-tagArt">
      <span className="mark-tagHole" />
      <span className="mark-tagTop"><span>3M LABEL LIMITED</span><Plus size={12} /></span>
      <span className="mark-tagTitle">YOUR<br />BRAND<br /><em>HERE.</em></span>
      <span className="mark-tagBottom"><Barcode /><span>SMALL DETAIL.<br />LASTING IMPRESSION.</span></span>
      <span className="mark-tagSerial">001 / MADE TO BE REMEMBERED</span>
    </span>
  )
}

function PackArtwork() {
  return (
    <span className="mark-packArt">
      <span className="mark-packHandle" />
      <span className="mark-packSide" />
      <span className="mark-packFront"><span className="mark-packTop">3M / SPECIALTY PACKAGING</span><span className="mark-packTitle">BRAND<br />IN<br /><em>HAND.</em></span><Asterisk size={32} strokeWidth={1.4} /><span className="mark-packBottom">A LITTLE EXTRAORDINARY.</span></span>
    </span>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const [active, setActive] = useState(1)
  const [paused, setPaused] = useState(false)
  const uid = useId()

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let pointerFrame = 0
    let nextX = 0
    let nextY = 0

    function updatePointer() {
      pointerFrame = 0
      stage.style.setProperty("--mark-x", `${nextX.toFixed(2)}deg`)
      stage.style.setProperty("--mark-y", `${nextY.toFixed(2)}deg`)
    }
    function pointerMove(event) {
      if (event.pointerType !== "mouse" || media.matches || section.dataset.motion === "paused") return
      const rect = stage.getBoundingClientRect()
      nextX = ((event.clientX - rect.left) / rect.width - .5) * 8
      nextY = ((event.clientY - rect.top) / rect.height - .5) * -7
      if (!pointerFrame) pointerFrame = requestAnimationFrame(updatePointer)
    }
    function resetPointer() {
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
      pointerFrame = 0
      nextX = 0
      nextY = 0
      updatePointer()
    }
    function motionChange() {
      if (media.matches) resetPointer()
    }

    const revealObserver = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.dataset.revealed = "true"
        revealObserver.unobserve(entry.target)
      })
    }, { threshold: .12 }) : null
    const visibilityObserver = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([entry]) => {
      section.dataset.inView = String(entry.isIntersecting)
      if (!entry.isIntersecting) resetPointer()
    }) : null

    section.querySelectorAll("[data-mark-reveal]").forEach(element => {
      if (revealObserver) revealObserver.observe(element)
      else element.dataset.revealed = "true"
    })
    if (visibilityObserver) visibilityObserver.observe(section)
    else section.dataset.inView = "true"
    stage.addEventListener("pointermove", pointerMove)
    stage.addEventListener("pointerleave", resetPointer)
    media.addEventListener("change", motionChange)

    return () => {
      revealObserver?.disconnect()
      visibilityObserver?.disconnect()
      stage.removeEventListener("pointermove", pointerMove)
      stage.removeEventListener("pointerleave", resetPointer)
      media.removeEventListener("change", motionChange)
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
    }
  }, [])

  function toggleMotion() {
    setPaused(value => !value)
    stageRef.current?.style.setProperty("--mark-x", "0deg")
    stageRef.current?.style.setProperty("--mark-y", "0deg")
  }

  return (
    <section ref={sectionRef} id="about" className="mark-section" data-motion={paused ? "paused" : "running"} aria-labelledby={`${uid}-heading`}>
      <div className="mark-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mark-topline" data-mark-reveal>
          <span className="mark-eyebrow"><span className="mark-statusDot mark-loop" />ABOUT 3M LABEL LIMITED<span className="mark-topIndex">/ 01</span></span>
          <button type="button" className="mark-motion" onClick={toggleMotion} aria-label={paused ? "Resume About section animations" : "Pause About section animations"} aria-pressed={paused}>
            {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}<span>{paused ? "Resume motion" : "Pause motion"}</span>
          </button>
        </div>

        <div className="mark-hero">
          <div className="mark-heroCopy">
            <h2 id={`${uid}-heading`} className="mark-title">
              <span className="sr-only">We make your mark.</span>
              <span aria-hidden="true" className="mark-titleLine" data-mark-reveal><span>WE MAKE</span></span>
              <span aria-hidden="true" className="mark-titleLine mark-titleYour" data-mark-reveal><span>YOUR</span></span>{" "}
              <span aria-hidden="true" className="mark-titleLine mark-titleOutline" data-mark-reveal><span>MARK<span className="mark-fullStop">.</span></span></span>
            </h2>
            <div className="mark-heroIntro" data-mark-reveal>
              <span className="mark-tinyCross" aria-hidden="true"><Plus size={18} strokeWidth={1} /></span>
              <p>The signature of your brand,<br />down to the smallest detail.</p>
            </div>
            <a href="#products" className="mark-explore" data-mark-reveal><span>Discover what we make</span><span className="mark-arrowCircle"><ArrowUpRight size={22} aria-hidden="true" /></span></a>
          </div>

          <div className="mark-studio" data-mark-reveal>
            <div ref={stageRef} className="mark-stage" data-active={active}>
              <div className="mark-stageGrid" aria-hidden="true" />
              <span className="mark-stageCorner mark-stageCornerTL" aria-hidden="true" /><span className="mark-stageCorner mark-stageCornerBR" aria-hidden="true" />
              <span className="mark-stageNote">SMALL DETAILS. BIG POSSIBILITIES.</span>
              <span className="mark-stageNumber" aria-hidden="true">0{active + 1}</span>
              <div className="mark-orbit" aria-hidden="true"><span className="mark-orbitRing mark-loop" /><span className="mark-orbitLine" /><span className="mark-orbitPoint mark-loop" /></div>
              <div className="mark-assembly">
                <svg className="mark-thread" viewBox="0 0 540 510" fill="none" aria-hidden="true"><path d="M362 -20C465 19 486 49 443 89C407 123 325 51 308 88C284 138 378 118 337 164" stroke="currentColor" strokeWidth="1.6" /><path d="M363 -20C460 16 479 46 440 84C406 116 327 47 305 85C276 136 373 121 337 164" stroke="currentColor" strokeWidth=".5" opacity=".4" /></svg>
                <button type="button" className="mark-object mark-objectPack" aria-label="Explore specialty packaging" aria-pressed={active === 2} onClick={() => setActive(2)}><span className="mark-objectFloat mark-loop"><PackArtwork /></span></button>
                <button type="button" className="mark-object mark-objectTag" aria-label="Explore hangtags and printing" aria-pressed={active === 1} onClick={() => setActive(1)}><span className="mark-objectFloat mark-loop"><TagArtwork /></span></button>
                <button type="button" className="mark-object mark-objectLabel" aria-label="Explore woven and printed labels" aria-pressed={active === 0} onClick={() => setActive(0)}><span className="mark-objectFloat mark-loop"><LabelArtwork /></span></button>
              </div>
              <div className="mark-stageFooter" aria-hidden="true"><span>CRAFTED TO CARRY YOUR IDENTITY</span><ArrowDownRight size={18} /></div>
            </div>
            <div className="mark-selector" aria-label="Explore our craft">
              {details.map((detail, index) => <button type="button" className="mark-selectButton" key={detail.name} aria-pressed={active === index} aria-controls={`${uid}-detail`} onClick={() => setActive(index)}><span className="mark-selectIndex">0{index + 1}</span><span>{detail.name}</span><span className="mark-selectDot" /></button>)}
            </div>
            <div className="mark-detail" id={`${uid}-detail`} aria-live="polite" aria-atomic="true"><div className="mark-detailText" key={active}><h3>{details[active].title}</h3><p>{details[active].text}</p></div></div>
          </div>
        </div>

        <div className="mark-divider" aria-hidden="true"><span className="mark-dividerRail mark-loop" /><Plus size={15} strokeWidth={1} /></div>

        <div className="mark-origin">
          <div className="mark-yearBlock" data-mark-reveal>
            <span className="mark-eyebrow">OUR STORY STARTED IN CANADA</span>
            <div className="mark-year" aria-label="Established in 1988"><span aria-hidden="true">19<span>88</span></span><span className="mark-yearAsterisk mark-loop" aria-hidden="true"><Asterisk strokeWidth={.8} /></span></div>
            <div className="mark-yearCaption"><span>INDEPENDENT SPIRIT.<br />WORLDWIDE REACH.</span><span className="mark-coordinate" aria-hidden="true">EST.<br />/ 1988</span></div>
          </div>
          <div className="mark-story" data-mark-reveal>
            <span className="mark-eyebrow"><span className="mark-miniRule" />THE PEOPLE BEHIND THE DETAIL</span>
            <h3>Small beginnings.<br /><span>Lasting impressions.</span></h3>
            <p>Founded in Canada in 1988, 3M Label Limited is a sister concern of Label Bank Asia. We bring decades of manufacturing expertise to the labels, tags, and packaging that connect brands with people around the world.</p>
            <p>From the first conversation to the final finish, our dedicated team brings care to every order. Premium materials, cost-effective branding programs, and environmentally aware production come together to make your next idea possible.</p>
            <div className="mark-stats">
              <div><strong>35<span>+</span></strong><span>Years of industry <br />experience</span></div>
              <div><strong>72<span>hrs</span></strong><span>Standard production <br />turnaround</span></div>
            </div>
          </div>
        </div>

        <div className="mark-credentials" data-mark-reveal>
          <span className="mark-credentialIntro">OUR STANDARD.<br /><strong>EVERY SINGLE TIME.</strong></span>
          <span><Check size={15} aria-hidden="true" />ISO 9001:2015</span>
          <span><Check size={15} aria-hidden="true" />OEKO-TEX</span>
          <span><Check size={15} aria-hidden="true" />On-demand digital &amp; laser printing</span>
        </div>

        <div className="mark-manifesto" data-mark-reveal>
          <div><span className="mark-eyebrow">THE WAY WE SEE IT</span><p>Our mission is not to be the biggest<br className="mark-desktopBreak" /> in this business, <span className="mark-best">simply the best.<svg viewBox="0 0 360 22" preserveAspectRatio="none" aria-hidden="true"><path d="M3 13C95 0 225 1 356 8M28 20C144 9 249 9 330 15" fill="none" stroke="currentColor" strokeWidth="2" /></svg></span></p></div>
          <Link href="/contact" className="mark-contact"><span>LET&apos;S MAKE <br />YOUR MARK.</span><ArrowUpRight size={32} strokeWidth={1.3} aria-hidden="true" /></Link>
        </div>
        <div className="mark-bottomline"><span>3M LABEL LIMITED / LABEL BANK ASIA</span><span>CONSIDERED. CRAFTED. CONNECTED.</span></div>
      </div>

      <style>{`
        .mark-section {
          --mark-red: #d11c2a;
          --mark-ink: #191919;
          --mark-line: #19191926;
          position: relative;
          isolation: isolate;
          overflow: clip;
          padding: clamp(64px, 7vw, 104px) 0 clamp(52px, 6vw, 88px);
          background: #fff;
          color: var(--mark-ink);
          font-family: var(--font-geist-sans), Arial, sans-serif;
          scroll-margin-top: 80px;
        }
        .mark-section *, .mark-section *::before, .mark-section *::after { box-sizing: border-box; }
        .mark-section ::selection { background: var(--mark-red); color: white; }
        .mark-container { width: 100%; }
        .mark-section button { font: inherit; cursor: pointer; color: inherit; }
        .mark-section a { text-decoration: none; color: inherit; }
        .mark-section button:focus-visible, .mark-section a:focus-visible { outline: 2px solid var(--mark-red); outline-offset: 6px; }
        .mark-topline { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 22px; border-bottom: 1px solid var(--mark-line); }
        .mark-eyebrow { display: inline-flex; gap: 10px; align-items: center; font-family: var(--font-geist-mono), monospace; font-size: 10px; font-weight: 500; line-height: 1.6; letter-spacing: .08em; }
        .mark-statusDot { height: 7px; width: 7px; border-radius: 50%; background: var(--mark-red); animation: mark-pulse 3s ease-in-out infinite; }
        .mark-topIndex { margin-left: 18px; color: #797979; }
        .mark-motion { display: inline-flex; gap: 7px; align-items: center; flex-shrink: 0; background: transparent; border: 0; padding: 7px 0 7px 8px; font-size: 10px !important; color: #626262 !important; }
        .mark-motion:hover { color: var(--mark-red) !important; }
        .mark-hero { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding-top: 44px; }
        .mark-heroCopy { min-width: 0; position: relative; z-index: 2; padding-top: 7px; padding-bottom: 24px; pointer-events: none; }
        .mark-title { margin: 0; font-size: clamp(78px, 10.2vw, 136px); line-height: .88; font-weight: 850; letter-spacing: -.07em; word-spacing: .035em; }
        .mark-titleLine { display: block; position: relative; width: fit-content; white-space: nowrap; overflow: hidden; padding: .035em .07em .09em 0; margin-bottom: -.085em; }
        .mark-titleLine > span { display: block; }
        .mark-titleYour { padding-top: .045em; }
        .mark-titleOutline { color: transparent; -webkit-text-stroke: 1.5px var(--mark-red); padding-top: .045em; }
        .mark-fullStop { color: var(--mark-red); -webkit-text-stroke: 0; }
        .mark-heroIntro { display: flex; gap: 20px; align-items: flex-start; margin-top: 34px; }
        .mark-tinyCross { color: var(--mark-red); padding-top: 4px; }
        .mark-heroIntro p { font-size: clamp(15px, 1.35vw, 18px); line-height: 1.55; letter-spacing: -.025em; margin: 0; }
        .mark-explore { display: inline-flex; align-items: center; gap: 30px; margin-top: 26px; font-size: 12px; font-weight: 600; pointer-events: auto; }
        .mark-arrowCircle { display: grid; place-items: center; width: 46px; height: 46px; border: 1px solid var(--mark-red); color: var(--mark-red); border-radius: 50%; transition: background .3s, color .3s, transform .3s; }
        .mark-explore:hover .mark-arrowCircle { background: var(--mark-red); color: white; transform: rotate(45deg); }
        .mark-studio { position: relative; min-width: 0; margin-top: -8px; }
        .mark-stage { --mark-x: 0deg; --mark-y: 0deg; position: relative; aspect-ratio: 1.08; width: 100%; perspective: 1000px; }
        .mark-stageGrid { position: absolute; inset: 4% -2% 2% -4%; background-image: radial-gradient(#19191925 .7px, transparent .7px); background-size: 18px 18px; mask-image: radial-gradient(ellipse at 55% 50%, #000 15%, transparent 70%); }
        .mark-stageCorner { position: absolute; width: 18px; height: 18px; opacity: .45; }
        .mark-stageCornerTL { top: 0; left: 0; border-left: 1px solid var(--mark-ink); border-top: 1px solid var(--mark-ink); }
        .mark-stageCornerBR { right: 0; bottom: 0; border-right: 1px solid var(--mark-ink); border-bottom: 1px solid var(--mark-ink); }
        .mark-stageNote { position: absolute; top: 0; right: 0; writing-mode: vertical-rl; font: 8px var(--font-geist-mono), monospace; letter-spacing: .16em; color: #797979; }
        .mark-stageNumber { position: absolute; right: 5%; bottom: 9%; font-size: clamp(110px, 13vw, 180px); font-weight: 800; line-height: 1; letter-spacing: -.09em; color: transparent; -webkit-text-stroke: 1px #d11c2a24; transition: opacity .4s; }
        .mark-orbit { position: absolute; width: 75%; aspect-ratio: 1; top: 5%; left: 5%; transform: rotate(-25deg) scaleY(.83); pointer-events: none; }
        .mark-orbitRing { position: absolute; inset: 0; border: 1px dashed #d11c2a55; border-radius: 50%; animation: mark-rotate 65s linear infinite; }
        .mark-orbitLine { position: absolute; inset: -11%; border: 1px solid #1919190d; border-radius: 50%; }
        .mark-orbitPoint { position: absolute; inset: 0; animation: mark-rotate 18s linear infinite; }
        .mark-orbitPoint::after { position: absolute; content: ""; width: 7px; height: 7px; background: var(--mark-red); border-radius: 50%; left: calc(50% - 3.5px); top: -3px; box-shadow: 0 0 0 5px #d11c2a0a; }
        .mark-assembly { position: absolute; inset: 0; transform: rotateY(var(--mark-x)) rotateX(var(--mark-y)); transform-style: preserve-3d; transition: transform .3s ease-out; }
        .mark-thread { position: absolute; width: 100%; height: 100%; inset: 0; color: #a69686; pointer-events: none; overflow: visible; }
        .mark-object { position: absolute; display: block; border: 0; padding: 0; background: transparent; transform: translate(var(--obj-x), var(--obj-y)) rotate(var(--obj-r)) scale(var(--obj-s, 1)); transition: transform .8s cubic-bezier(.2,.8,.2,1), filter .5s; transform-origin: 50% 16%; -webkit-tap-highlight-color: transparent; }
        .mark-object:hover, .mark-object:focus-visible { z-index: 6; filter: drop-shadow(0 8px 10px #19191912); }
        .mark-object:focus-visible { outline-offset: 12px !important; border-radius: 3px; }
        .mark-objectFloat { display: block; width: 100%; height: 100%; animation: mark-float 7s ease-in-out infinite; }
        .mark-objectPack { left: 10%; top: 15%; width: 32%; height: 43%; --obj-x: 0px; --obj-y: 0px; --obj-r: -18deg; z-index: 1; }
        .mark-objectTag { left: 52%; top: 21%; width: 35%; height: 58%; --obj-x: 0px; --obj-y: 0px; --obj-r: 13deg; z-index: 3; }
        .mark-objectLabel { left: 9%; top: 64%; width: 47%; height: 22%; --obj-x: 0px; --obj-y: 0px; --obj-r: -12deg; z-index: 4; }
        .mark-objectTag .mark-objectFloat { animation-name: mark-swing; animation-duration: 8s; animation-delay: -2s; transform-origin: 50% 0; }
        .mark-objectLabel .mark-objectFloat { animation-delay: -4s; animation-duration: 6s; }
        .mark-stage[data-active="0"] .mark-objectLabel { --obj-x: 9%; --obj-y: -20%; --obj-r: -5deg; --obj-s: 1.08; z-index: 5; }
        .mark-stage[data-active="0"] .mark-objectTag { --obj-x: 5%; --obj-y: -6%; --obj-r: 19deg; --obj-s: .92; }
        .mark-stage[data-active="1"] .mark-objectTag { --obj-x: -5%; --obj-y: -4%; --obj-r: 8deg; --obj-s: 1.06; }
        .mark-stage[data-active="2"] .mark-objectPack { --obj-x: 20%; --obj-y: -3%; --obj-r: -8deg; --obj-s: 1.13; z-index: 5; }
        .mark-stage[data-active="2"] .mark-objectTag { --obj-x: 9%; --obj-y: 3%; --obj-r: 19deg; --obj-s: .94; }
        .mark-labelArt { display: flex; position: relative; align-items: center; gap: 7%; width: 100%; height: 100%; padding: 8% 10%; background: #fbfaf7; box-shadow: 1px 15px 20px #19191916, 0 2px 3px #19191918; color: var(--mark-ink); text-align: left; background-image: repeating-linear-gradient(90deg, transparent, transparent 1px, #19191905 1px, #19191905 2px); }
        .mark-labelArt::before, .mark-labelArt::after { content: ""; position: absolute; width: 6%; top: 0; bottom: 0; border: 1px solid #19191917; background: #eeede9; }
        .mark-labelArt::before { left: -4%; transform: skewY(-16deg); transform-origin: right; }
        .mark-labelArt::after { right: -4%; transform: skewY(16deg); transform-origin: left; }
        .mark-labelStitches { position: absolute; inset: 7%; border-top: 1px dashed #19191933; border-bottom: 1px dashed #19191933; }
        .mark-labelBrand { display: flex; flex-direction: column; flex-shrink: 0; gap: 1px; color: var(--mark-red); font-weight: 900; font-size: clamp(30px, 4vw, 52px); line-height: .9; letter-spacing: -.09em; }
        .mark-labelBrand > span { font-size: 5px; letter-spacing: .06em; color: var(--mark-ink); font-weight: 600; line-height: 1.5; }
        .mark-labelRule { height: 67%; border-left: 1px solid #19191950; }
        .mark-labelSmall { font-size: clamp(7px, .8vw, 11px); line-height: 1.3; letter-spacing: -.02em; font-weight: 700; }
        .mark-labelEdge { position: absolute; bottom: 10%; right: 10%; font: 5px var(--font-geist-mono), monospace; }
        .mark-tagArt { position: relative; display: flex; flex-direction: column; height: 100%; padding: 25% 12% 9%; background: #fff; text-align: left; color: var(--mark-ink); box-shadow: 3px 16px 30px #1919191a; border: 1px solid #e9e5e1; clip-path: polygon(12% 0, 88% 0, 100% 9%, 100% 100%, 0 100%, 0 9%); }
        .mark-tagArt::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, transparent 0 2px, #19191902 2px 3px); }
        .mark-tagHole { position: absolute; top: 7%; left: calc(50% - 4px); width: 8px; height: 8px; border: 2px solid #d8cec2; border-radius: 50%; background: #eee7df; box-shadow: 0 0 0 3px #faf7f2; }
        .mark-tagTop { display: flex; align-items: center; justify-content: space-between; gap: 3px; font: 5px var(--font-geist-mono), monospace; letter-spacing: .03em; padding-bottom: 10%; border-bottom: 1px solid var(--mark-red); }
        .mark-tagTitle { margin-top: 12%; font-size: clamp(26px, 3.45vw, 45px); letter-spacing: -.065em; line-height: .93; font-weight: 850; }
        .mark-tagTitle em { font-style: normal; color: var(--mark-red); }
        .mark-tagBottom { margin-top: auto; padding-top: 12%; display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
        .mark-tagBottom > span:last-child { font: 4px/1.5 var(--font-geist-mono), monospace; }
        .mark-barcode { display: block; width: 45%; height: 20px; background: repeating-linear-gradient(90deg, #191919 0 1px, transparent 1px 3px, #191919 3px 5px, transparent 5px 6px, #191919 6px 7px, transparent 7px 10px, #191919 10px 12px, transparent 12px 15px); }
        .mark-tagSerial { margin-top: 9%; font: 4px var(--font-geist-mono), monospace; letter-spacing: .06em; border-top: 1px solid #19191930; padding-top: 6%; }
        .mark-packArt { display: block; position: relative; width: 100%; height: 100%; padding-top: 14%; filter: drop-shadow(3px 16px 15px #19191913); text-align: left; }
        .mark-packHandle { position: absolute; left: 33%; top: -7%; width: 37%; height: 37%; border: 3px solid var(--mark-red); border-bottom: 0; border-radius: 45% 45% 0 0; }
        .mark-packSide { position: absolute; top: 14%; right: -10%; bottom: -3%; width: 20%; background: #eeeae5; transform: skewY(20deg); transform-origin: left top; border: 1px solid #d9d6d1; }
        .mark-packSide::after { position: absolute; inset: 0 50%; content: ""; border-left: 1px solid #d9d6d1; }
        .mark-packFront { position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; padding: 9% 12%; background: #f8f6f2; border: 1px solid #e6e1da; }
        .mark-packTop { font: 4px var(--font-geist-mono), monospace; letter-spacing: .04em; margin-bottom: 15%; }
        .mark-packTitle { font-size: clamp(23px, 2.9vw, 38px); line-height: .88; letter-spacing: -.07em; font-weight: 850; }
        .mark-packTitle em { font-style: normal; color: var(--mark-red); }
        .mark-packFront > svg { position: absolute; right: 10%; bottom: 17%; color: var(--mark-red); }
        .mark-packBottom { margin-top: auto; padding-top: 12%; font: 4px var(--font-geist-mono), monospace; letter-spacing: .06em; }
        .mark-stageFooter { position: absolute; bottom: 0; left: 0; right: 5%; display: flex; align-items: center; gap: 15px; justify-content: space-between; color: #727272; font: 7px var(--font-geist-mono), monospace; letter-spacing: .09em; }
        .mark-stageFooter svg { color: var(--mark-red); }
        .mark-selector { margin-top: 23px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--mark-line); border-bottom: 1px solid var(--mark-line); }
        .mark-selectButton { display: flex; align-items: center; position: relative; padding: 15px 10px; gap: 9px; border: 0; background: transparent; font-size: 11px !important; text-align: left; }
        .mark-selectButton::after { content: ""; position: absolute; height: 2px; bottom: -1px; left: 0; right: 0; background: var(--mark-red); transform: scaleX(0); transform-origin: left; transition: transform .4s cubic-bezier(.2,.8,.2,1); }
        .mark-selectButton[aria-pressed="true"]::after { transform: scaleX(1); }
        .mark-selectButton[aria-pressed="true"] { color: var(--mark-red); }
        .mark-selectButton:hover { background: #d11c2a05; }
        .mark-selectIndex { font: 8px var(--font-geist-mono), monospace; color: #818181; }
        .mark-selectDot { width: 4px; height: 4px; border-radius: 50%; margin-left: auto; background: currentColor; opacity: 0; transition: opacity .3s; }
        .mark-selectButton[aria-pressed="true"] .mark-selectDot { opacity: 1; }
        .mark-detail { min-height: 121px; padding: 17px 0 0; }
        .mark-detailText { animation: mark-detail-in .45s ease both; }
        .mark-detail h3 { font-size: 13px; font-weight: 650; letter-spacing: -.02em; margin: 0 0 6px; }
        .mark-detail p { font-size: 11px; line-height: 1.8; color: #666; margin: 0; max-width: 405px; }
        .mark-divider { position: relative; border-top: 1px solid var(--mark-line); margin: 42px 0 55px; height: 1px; }
        .mark-divider > svg { position: absolute; top: -8px; right: -1px; background: white; color: var(--mark-red); }
        .mark-dividerRail { position: absolute; top: -1px; width: 58px; height: 1px; background: var(--mark-red); animation: mark-scan 12s ease-in-out infinite alternate; }
        .mark-origin { display: grid; grid-template-columns: 1fr 1fr; gap: 8%; }
        .mark-yearBlock { min-width: 0; padding-top: 4px; }
        .mark-year { position: relative; width: 100%; display: flex; align-items: center; }
        .mark-year > span:first-child { font-size: clamp(100px, 14.5vw, 196px); line-height: 1.15; font-weight: 800; letter-spacing: -.075em; }
        .mark-year > span:first-child > span { color: transparent; -webkit-text-stroke: 1.4px var(--mark-red); }
        .mark-yearAsterisk { position: absolute; right: 2%; top: 15%; width: 40px; height: 40px; color: var(--mark-red); animation: mark-rotate 20s linear infinite; }
        .mark-yearAsterisk svg { width: 100%; height: 100%; }
        .mark-yearCaption { display: flex; align-items: flex-end; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--mark-line); }
        .mark-yearCaption > span:first-child { font-size: 11px; line-height: 1.6; font-weight: 650; letter-spacing: -.01em; }
        .mark-coordinate { color: #797979; font: 8px/1.6 var(--font-geist-mono), monospace; text-align: right; }
        .mark-miniRule { width: 24px; height: 1px; background: var(--mark-red); }
        .mark-story h3 { font-size: clamp(28px, 3.15vw, 42px); line-height: 1.13; letter-spacing: -.055em; font-weight: 650; margin: 18px 0 23px; }
        .mark-story h3 > span { color: var(--mark-red); }
        .mark-story > p { font-size: 12px; line-height: 1.9; color: #656565; margin: 0 0 13px; max-width: 480px; }
        .mark-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 26px; }
        .mark-stats > div { display: flex; align-items: center; gap: 14px; padding-top: 17px; border-top: 1px solid var(--mark-line); }
        .mark-stats strong { font-size: 46px; font-weight: 600; letter-spacing: -.075em; line-height: 1; white-space: nowrap; }
        .mark-stats strong > span { font-size: 19px; color: var(--mark-red); letter-spacing: -.04em; padding-left: 2px; }
        .mark-stats > div > span { font-size: 9px; color: #696969; line-height: 1.6; }
        .mark-credentials { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 23px 0; margin-top: 48px; border-top: 1px solid var(--mark-line); border-bottom: 1px solid var(--mark-line); }
        .mark-credentialIntro { font: 8px/1.7 var(--font-geist-mono), monospace; letter-spacing: .035em; color: #797979; }
        .mark-credentialIntro strong { font-weight: 500; color: var(--mark-ink); }
        .mark-credentials > span:not(:first-child) { display: inline-flex; align-items: center; gap: 9px; font-size: 10px; line-height: 1.7; }
        .mark-credentials svg { color: var(--mark-red); flex-shrink: 0; }
        .mark-manifesto { display: flex; align-items: center; justify-content: space-between; gap: 40px; margin-top: 46px; }
        .mark-manifesto > div { min-width: 0; }
        .mark-manifesto p { font-size: clamp(24px, 3.15vw, 42px); line-height: 1.27; letter-spacing: -.05em; font-weight: 500; margin: 17px 0 0; }
        .mark-best { color: var(--mark-red); position: relative; display: inline-block; white-space: nowrap; }
        .mark-best svg { position: absolute; width: 103%; height: 13px; bottom: -10px; left: -1%; }
        .mark-contact { display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 16px; width: 130px; height: 130px; flex-shrink: 0; border: 1px solid var(--mark-red); border-radius: 50%; color: var(--mark-red) !important; transition: background .3s, color .3s, transform .3s; }
        .mark-contact span { font-size: 9px; line-height: 1.6; letter-spacing: .08em; text-align: center; }
        .mark-contact:hover { background: var(--mark-red); color: white !important; transform: rotate(-7deg); }
        .mark-bottomline { display: flex; justify-content: space-between; gap: 16px; margin-top: 50px; font: 7px/1.7 var(--font-geist-mono), monospace; letter-spacing: .08em; color: #868686; }
        .mark-section [data-mark-reveal] { transition: opacity .8s ease, transform .9s cubic-bezier(.2,.8,.2,1); }
        @media (prefers-reduced-motion: no-preference) {
          .mark-section [data-mark-reveal]:not([data-revealed="true"]) { opacity: 0; transform: translateY(28px); }
          .mark-titleLine[data-mark-reveal] { opacity: 1 !important; transform: none !important; }
          .mark-titleLine[data-mark-reveal] > span { transition: transform 1.2s cubic-bezier(.16,1,.3,1); }
          .mark-titleLine[data-mark-reveal]:not([data-revealed="true"]) > span { transform: translateY(115%) rotate(5deg); }
          .mark-titleYour > span { transition-delay: .12s !important; }
          .mark-titleOutline > span { transition-delay: .24s !important; }
        }
        .mark-section .mark-loop { animation-play-state: paused; }
        .mark-section[data-in-view="true"] .mark-loop { animation-play-state: running; }
        .mark-section[data-motion="paused"] .mark-loop { animation-play-state: paused !important; }
        .mark-section[data-motion="paused"] .mark-detailText { animation: none; }
        @keyframes mark-pulse { 0%,100% { box-shadow: 0 0 0 0 #d11c2a20; } 50% { box-shadow: 0 0 0 5px #d11c2a00; } }
        @keyframes mark-rotate { to { transform: rotate(360deg); } }
        @keyframes mark-float { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-11px) rotate(1deg); } }
        @keyframes mark-swing { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(3deg) translateY(-7px); } }
        @keyframes mark-detail-in { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mark-scan { from { left: 0; } to { left: calc(100% - 75px); } }
        @media (min-width: 1280px) {
          .mark-studio { margin-left: -9px; }
          .mark-stage { aspect-ratio: 1.1; }
          .mark-heroCopy { padding-top: 17px; }
        }
        @media (max-width: 1100px) and (min-width: 768px) {
          .mark-title { font-size: clamp(74px, 10.7vw, 114px); }
          .mark-hero { padding-top: 35px; }
          .mark-stage { aspect-ratio: .98; }
          .mark-objectPack { left: 8%; top: 18%; }
          .mark-objectTag { left: 51%; top: 23%; }
          .mark-stageNote { font-size: 6px; }
          .mark-heroIntro { gap: 12px; margin-top: 25px; }
          .mark-heroIntro p { font-size: 15px; }
          .mark-heroCopy { padding-bottom: 0; }
          .mark-origin { gap: 6%; }
          .mark-year > span:first-child { font-size: 14.8vw; }
          .mark-yearAsterisk { width: 28px; height: 28px; right: 0; }
          .mark-stats > div { gap: 8px; flex-direction: column; align-items: flex-start; }
          .mark-stats strong { font-size: 40px; }
          .mark-detail { min-height: 135px; }
          .mark-selectButton { gap: 6px; padding: 14px 6px; font-size: 10px !important; }
          .mark-selectIndex { font-size: 7px; }
          .mark-labelBrand { font-size: 3.8vw; }
          .mark-labelSmall { font-size: .8vw; }
          .mark-tagTitle { font-size: 3.5vw; }
          .mark-packTitle { font-size: 3.1vw; }
          .mark-tagBottom { gap: 4px; }
          .mark-tagBottom > span:last-child { font-size: 3.5px; }
          .mark-tagSerial { font-size: 3.3px; }
          .mark-credentials { gap: 14px; }
          .mark-credentials > span:not(:first-child) { font-size: 9px; gap: 6px; }
        }
        @media (max-width: 767px) {
          .mark-topline { padding-bottom: 17px; gap: 10px; }
          .mark-topIndex { display: none; }
          .mark-eyebrow { font-size: 8px; gap: 8px; }
          .mark-motion { font-size: 9px !important; gap: 5px; }
          .mark-hero { display: flex; flex-direction: column; padding-top: 28px; gap: 28px; }
          .mark-heroCopy { padding: 0; }
          .mark-title { font-size: clamp(56px, 12.9vw, 96px); line-height: .93; letter-spacing: -.08em; }
          .mark-titleLine { padding-bottom: .12em; margin-bottom: -.12em; }
          .mark-titleYour, .mark-titleOutline { display: inline-block; vertical-align: top; padding-top: 0; }
          .mark-titleYour { margin-right: .08em; }
          .mark-titleYour > span { transition-delay: .08s !important; }
          .mark-titleOutline > span { transition-delay: .16s !important; }
          .mark-titleOutline { -webkit-text-stroke-width: 1px; }
          .mark-heroIntro { margin-top: 22px; gap: 12px; }
          .mark-heroIntro p { font-size: 14px; line-height: 1.55; }
          .mark-explore { margin-top: 15px; gap: 18px; font-size: 11px; }
          .mark-arrowCircle { width: 36px; height: 36px; }
          .mark-arrowCircle svg { width: 18px; height: 18px; }
          .mark-studio { width: 100%; max-width: 560px; align-self: center; margin-top: 0; }
          .mark-stage { aspect-ratio: 1.1; }
          .mark-stageGrid { inset: -3% -2% 0; }
          .mark-stageNote { font-size: 6px; }
          .mark-stageNumber { font-size: clamp(100px, 30vw, 155px); }
          .mark-stageFooter { font-size: 6px; }
          .mark-stageCorner { width: 13px; height: 13px; }
          .mark-objectTag { top: 20%; height: 60%; }
          .mark-objectPack { top: 17%; }
          .mark-objectLabel { top: 65%; }
          .mark-labelBrand { font-size: clamp(28px, 8vw, 48px); }
          .mark-labelBrand > span { font-size: clamp(3px, .9vw, 5px); }
          .mark-labelSmall { font-size: clamp(6px, 1.65vw, 10px); }
          .mark-labelEdge { font-size: 4px; }
          .mark-tagTitle { font-size: clamp(26px, 7.2vw, 43px); }
          .mark-tagTop { font-size: clamp(3px, .9vw, 5px); }
          .mark-tagTop svg { width: 8px; height: 8px; }
          .mark-tagBottom > span:last-child { font-size: clamp(2.5px, .7vw, 4px); }
          .mark-tagSerial { font-size: clamp(2.5px, .7vw, 4px); }
          .mark-barcode { height: 16px; }
          .mark-tagHole { width: 6px; height: 6px; left: calc(50% - 3px); }
          .mark-packTitle { font-size: clamp(23px, 6.4vw, 38px); }
          .mark-packTop, .mark-packBottom { font-size: clamp(2.5px, .7vw, 4px); }
          .mark-packFront > svg { width: 25px; height: 25px; }
          .mark-packHandle { border-width: 2px; }
          .mark-selector { margin-top: 23px; }
          .mark-selectButton { padding: 15px 8px; gap: 8px; }
          .mark-detail { min-height: 112px; padding-top: 15px; }
          .mark-detail h3 { font-size: 13px; }
          .mark-detail p { font-size: 11px; max-width: none; }
          .mark-divider { margin: 22px 0 35px; }
          .mark-origin { grid-template-columns: 1fr; gap: 34px; }
          .mark-yearBlock { max-width: 480px; width: 100%; }
          .mark-year > span:first-child { font-size: clamp(110px, 28vw, 180px); line-height: 1.2; }
          .mark-yearAsterisk { width: 36px; height: 36px; right: 7%; top: 20%; }
          .mark-yearCaption { padding-top: 11px; }
          .mark-yearCaption > span:first-child { font-size: 10px; }
          .mark-story h3 { font-size: clamp(30px, 6.5vw, 40px); margin: 15px 0 20px; }
          .mark-story > p { max-width: none; font-size: 12px; line-height: 1.85; }
          .mark-stats { margin-top: 22px; gap: 20px; }
          .mark-stats > div { gap: 12px; }
          .mark-stats strong { font-size: 43px; }
          .mark-stats > div > span { font-size: 8px; }
          .mark-credentials { margin-top: 33px; padding: 20px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 19px 16px; }
          .mark-credentials > span:not(:first-child) { font-size: 9px; gap: 7px; }
          .mark-credentials > span:last-child { align-items: flex-start; }
          .mark-credentials svg { width: 13px; height: 13px; }
          .mark-manifesto { margin-top: 30px; gap: 24px; align-items: flex-start; }
          .mark-manifesto p { font-size: clamp(23px, 4.5vw, 32px); margin-top: 14px; line-height: 1.35; }
          .mark-desktopBreak { display: none; }
          .mark-contact { width: 88px; height: 88px; gap: 7px; margin-top: 32px; }
          .mark-contact span { font-size: 6px; }
          .mark-contact svg { width: 24px; height: 24px; }
          .mark-best svg { height: 10px; bottom: -8px; }
          .mark-bottomline { margin-top: 37px; font-size: 6px; gap: 20px; }
          .mark-bottomline > span:last-child { text-align: right; }
        }
        @media (max-width: 379px) {
          .mark-title { font-size: 12.7vw; }
          .mark-titleYour { margin-right: .05em; }
          .mark-topline .mark-eyebrow { font-size: 7px; gap: 6px; }
          .mark-selectButton { font-size: 10px !important; padding: 14px 5px; gap: 5px; }
          .mark-selectIndex { font-size: 7px; }
          .mark-detail { min-height: 130px; }
          .mark-stats > div { align-items: flex-start; gap: 6px; flex-direction: column; }
          .mark-stats > div > span br { display: none; }
          .mark-credentials { column-gap: 12px; }
          .mark-credentials > span:not(:first-child) { font-size: 8px; }
          .mark-manifesto { display: block; }
          .mark-manifesto p { font-size: 27px; }
          .mark-contact { flex-direction: row; width: 100%; height: auto; border-radius: 0; border: 0; border-top: 1px solid var(--mark-line); justify-content: space-between; padding: 20px 0 0; margin-top: 30px; }
          .mark-contact span { font-size: 9px; text-align: left; }
          .mark-contact span br { display: none; }
          .mark-contact:hover { transform: none; background: transparent; color: var(--mark-red) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mark-section *, .mark-section *::before, .mark-section *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
          .mark-section [data-mark-reveal] { opacity: 1 !important; transform: none !important; }
          .mark-titleLine > span { transform: none !important; }
          .mark-motion { display: none; }
          .mark-assembly { transform: none !important; }
        }
      `}</style>
    </section>
  )
}
