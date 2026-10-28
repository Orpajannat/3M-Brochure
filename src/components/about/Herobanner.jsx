import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronRight, Globe2 } from 'lucide-react'
import './Herobanner.css'

const facts = [
  { value: '1988', label: 'Our story began in Canada' },
  { value: '72 hours', label: 'Standard turnaround' },
  { value: 'Two hubs. One standard.', label: 'Bangladesh & Thailand' },
]

export default function Herobanner() {
  return (
    <section aria-labelledby='about-hero-title' className='abh-hero'>
      <div className='abh-inner'>
        <div className='abh-topline'>
          <nav aria-label='Breadcrumb'>
            <ol className='abh-breadcrumb'>
              <li><Link href='/'>Home</Link></li>
              <li aria-hidden='true'><ChevronRight size={12} /></li>
              <li aria-current='page'>About us</li>
            </ol>
          </nav>
          <span className='abh-edition'>THE PEOPLE BEHIND THE LABEL <span>01 / ABOUT</span></span>
        </div>

        <div className='abh-content'>
          <div className='abh-copy'>
            <p className='abh-eyebrow abh-reveal'>
              <span aria-hidden='true' /> 3M LABEL LIMITED · SINCE 1988
            </p>
            <h1 id='about-hero-title' aria-label='Small details. Lasting impressions.' className='abh-title'>
              <span className='abh-line'><span>Small details.</span></span>
              <span className='abh-line'><span>Lasting</span></span>
              <span className='abh-line abh-accent'><span>impressions<span className='abh-period'>.</span></span></span>
            </h1>
            <div className='abh-intro abh-reveal'>
              <span className='abh-introLine' aria-hidden='true' />
              <p>
                Every great brand has a story. We help you put yours on the label —
                with private labeling and garment accessories, crafted with care
                from concept to collection.
              </p>
            </div>
            <div className='abh-actions abh-reveal'>
              <Link href='/products' className='abh-primaryLink'>
                Explore our craft <ArrowUpRight size={19} aria-hidden='true' />
              </Link>
              <Link href='/contact' className='abh-secondaryLink'>
                Let’s create together <ArrowRight size={17} aria-hidden='true' />
              </Link>
            </div>
          </div>

          <div className='abh-visual'>
            <div className='abh-orbit' aria-hidden='true' />
            <span className='abh-verticalNote' aria-hidden='true'>PRECISION IN EVERY DETAIL</span>
            <figure className='abh-photo'>
              <Image
                src='/image/abouthero.jfif'
                alt='Our reception area overlooking the label manufacturing floor'
                fill
                preload
                sizes='(min-width: 1400px) 560px, (min-width: 901px) 44vw, (min-width: 561px) 75vw, 88vw'
                className='abh-photoImage'
              />
              <div className='abh-photoShade' aria-hidden='true' />
              <figcaption className='abh-photoCaption'>
                <span>Where ideas<br /><strong>become identities.</strong></span>
                <ArrowDownRight size={28} strokeWidth={1.3} aria-hidden='true' />
              </figcaption>
              <span className='abh-photoIndex' aria-hidden='true'>THE 3M LABEL STORY</span>
            </figure>
            <div className='abh-tagPosition' aria-hidden='true'>
              <div className='abh-tag'>
                <span className='abh-tagHole' />
                <span className='abh-tagTop'>IT’S ALL IN THE DETAILS</span>
                <span className='abh-tagBrand'>3M<span>LABEL LIMITED</span></span>
                <span className='abh-tagRule' />
                <span className='abh-tagBottom'>CRAFTING IDENTITY<br />SINCE 1988 <ArrowUpRight size={23} /></span>
              </div>
            </div>
            <div className='abh-origin'>
              <Globe2 size={24} strokeWidth={1.4} aria-hidden='true' />
              <span>Canadian roots.<br /><strong>Global perspective.</strong></span>
            </div>
            <span className='abh-registration' aria-hidden='true'>+</span>
          </div>
        </div>

        <div className='abh-bottomline'>
          <p className='abh-signature'>Built on trust.<br /><span>Made for what’s next.</span></p>
          <dl className='abh-facts'>
            {facts.map((fact) => (
              <div key={fact.label} className='abh-fact'>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
