import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  ChevronRight,
  Crosshair,
  Plus,
  ScanLine,
} from "lucide-react";
import {
  getProductCategory,
  productCategories,
} from "@/components/products/product-data";
import RibbonsMotion from "./RibbonsMotion";
import RibbonsCollection from "./RibbonsCollection";
import RibbonsDetails from "./RibbonsDetails";
import "./Ribbons.css";

const category = getProductCategory("thermal-transfer-ribbons");
const briefTitles = [
  "Know your printer.",
  "Define the format.",
  "Share the application.",
];
function Marker({ number, children }) {
  return (
    <p className="tr-marker">
      <span>{number}</span>
      {children}
    </p>
  );
}
function Reel({ className = "" }) {
  return (
    <div className={`tr-reel ${className}`} aria-hidden="true">
      <div className="tr-reel-core">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function RibbonsPage() {
  return (
    <main className="tr-page">
      <RibbonsMotion>
        <section className="tr-hero" aria-labelledby="tr-title">
          <div className="tr-hero-grid" aria-hidden="true" />
          <div className="tr-container">
            <div className="tr-topline">
              <nav aria-label="Breadcrumb">
                <ol className="tr-breadcrumb">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight size={11} />
                  </li>
                  <li>
                    <Link href="/products">Products</Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight size={11} />
                  </li>
                  <li aria-current="page">Thermal ribbons</li>
                </ol>
              </nav>
              <span className="tr-edition">
                THE PRINT LAB <b>06 / 06</b>
              </span>
            </div>
            <div className="tr-hero-layout">
              <div className="tr-hero-copy">
                <p className="tr-kicker">
                  <span />
                  THERMAL TRANSFER RIBBONS
                </p>
                <h1 id="tr-title" aria-label="Make every impression count.">
                  <span className="tr-title-line">
                    <span>Make every</span>
                  </span>
                  <span className="tr-title-line tr-title-accent">
                    <span>impression</span>
                  </span>
                  <span className="tr-title-line">
                    <span>
                      count<span className="tr-title-dot">.</span>
                    </span>
                  </span>
                </h1>
                <p className="tr-hero-description">{category.description}</p>
                <div className="tr-actions">
                  <a href="#tr-collection" className="tr-button tr-button-lime">
                    <span>Explore the collection</span>
                    <ArrowDown size={18} aria-hidden="true" />
                  </a>
                  <Link href="/contact" className="tr-text-link">
                    <span>Let’s talk print</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>
                <ul className="tr-hero-chips">
                  {category.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="tr-hero-stage" data-tr-tilt>
                <div className="tr-stage-inner">
                  <div className="tr-stage-axis" aria-hidden="true">
                    <span>INPUT</span>
                    <ArrowDown size={18} />
                    <span>OUTPUT</span>
                  </div>
                  <div className="tr-reel-assembly" aria-hidden="true">
                    <div className="tr-ribbon-film" />
                    <Reel className="tr-reel-primary" />
                    <Reel className="tr-reel-secondary" />
                  </div>
                  <figure className="tr-ribbon-specimen">
                    <div className="tr-specimen-top">
                      <span>RIBBON STUDY / FLAT HEAD</span>
                      <Crosshair size={18} aria-hidden="true" />
                    </div>
                    <div className="tr-specimen-image">
                      <Image
                        src="/image/products/resin-ribbons.webp"
                        alt={category.heroAlt}
                        fill
                        preload
                        sizes="(min-width:1440px) 360px,(min-width:901px) 31vw,76vw"
                      />
                    </div>
                    <div className="tr-specimen-scan" aria-hidden="true" />
                    <figcaption>
                      <span>RESIN / WAX-RESIN / GENERAL WAX</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </figcaption>
                  </figure>
                  <div className="tr-output-ticket" aria-hidden="true">
                    <span>THE PRINTING SUPPLIES COLLECTION</span>
                    <div className="tr-barcode" />
                    <div>
                      <strong>06—PRINT</strong>
                      <span>RIBBONS + LABEL STOCK</span>
                    </div>
                  </div>
                  <span className="tr-stage-coordinate" aria-hidden="true">
                    FEED. TRANSFER. IMPRESSION.
                  </span>
                </div>
              </div>
            </div>
            <div className="tr-hero-bottom">
              <span>
                <Crosshair size={15} aria-hidden="true" />
                THE DETAILS BEHIND THE PRINT.
              </span>
              <a href="#tr-collection">
                <span>SCROLL TO THE SUPPLIES</span>
                <ArrowDownRight size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="tr-ribbon" aria-hidden="true">
            <div className="tr-ribbon-track">
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {[
                    "FEED THE POSSIBILITY",
                    "MAKE YOUR IMPRESSION",
                    "KEEP THE DETAILS CLEAR",
                  ].map((text) => (
                    <span key={text}>
                      {text}
                      <Asterisk size={29} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        <nav className="tr-category-nav" aria-label="Product categories">
          <div className="tr-container">
            {productCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                aria-current={item.slug === category.slug ? "page" : undefined}
              >
                <span>{item.number}</span>
                {item.shortName}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>

        <section
          id="tr-collection"
          className="tr-collection tr-section"
          aria-labelledby="tr-collection-title"
        >
          <div className="tr-container">
            <div className="tr-section-heading" data-tr-reveal="rise">
              <div>
                <Marker number="01">THE SUPPLIES INDEX</Marker>
                <h2 id="tr-collection-title">
                  Find your format.
                  <br />
                  <em>Follow the print.</em>
                </h2>
              </div>
              <p>
                {category.rangeDescription}
                <span>FOUR PRODUCTS. A CLEAR STARTING POINT.</span>
              </p>
            </div>
            <RibbonsCollection products={category.products} />
            <div className="tr-collection-footer" data-tr-reveal="rise">
              <ScanLine size={25} aria-hidden="true" />
              <p>
                Flat-head. Near / corner-edge. Adhesive stock.
                <br />
                <strong>Bring your printing requirements into focus.</strong>
              </p>
              <Link href="/contact" className="tr-text-link">
                <span>Discuss your requirements</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="tr-details tr-section"
          aria-labelledby="tr-details-title"
        >
          <div className="tr-container">
            <div className="tr-section-heading" data-tr-reveal="rise">
              <div>
                <Marker number="02">THE PRINTHEAD STUDIO</Marker>
                <h2 id="tr-details-title">
                  Your printer.
                  <br />
                  <em>Your starting point.</em>
                </h2>
              </div>
              <p>{category.optionsDescription}</p>
            </div>
            <RibbonsDetails options={category.options} />
            <div className="tr-details-footer" data-tr-reveal="rise">
              <span>
                Printhead type, ribbon format, and label stock. Considered
                together.
              </span>
              <Link href="/services" className="tr-text-link">
                <span>Explore our services</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="tr-brief tr-section"
          aria-labelledby="tr-brief-title"
        >
          <div className="tr-container">
            <div className="tr-section-heading" data-tr-reveal="rise">
              <div>
                <Marker number="03">BUILD THE PRINT BRIEF</Marker>
                <h2 id="tr-brief-title">
                  Three details.
                  <br />
                  <em>One better brief.</em>
                </h2>
              </div>
              <p>
                A few specifics help our team understand your printing setup and
                review the relevant product family with you.
              </p>
            </div>
            <ol className="tr-brief-grid">
              {category.brief.map((item, index) => (
                <li
                  key={item}
                  data-tr-reveal="pop"
                  style={{ "--tr-delay": `${index * 125}ms` }}
                >
                  <div className="tr-brief-top">
                    <span>0{index + 1}</span>
                    <ArrowUpRight size={25} aria-hidden="true" />
                  </div>
                  <h3>{briefTitles[index]}</h3>
                  <p>{item}.</p>
                  <div className="tr-brief-label">
                    <span>
                      {["THE SETUP", "THE FORMAT", "THE PROGRAM"][index]}
                    </span>
                    <div className="tr-mini-barcode" aria-hidden="true" />
                  </div>
                </li>
              ))}
            </ol>
            <div className="tr-brief-footer" data-tr-reveal="rise">
              <p>
                Your setup. Your specifications.
                <br />
                <strong>Let’s work through the details.</strong>
              </p>
              <Link href="/contact" className="tr-button tr-button-dark">
                <span>Discuss your project</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="tr-faq tr-section" aria-labelledby="tr-faq-title">
          <div className="tr-container tr-faq-layout">
            <div data-tr-reveal="rise">
              <Marker number="04">CLEAR UP THE DETAILS</Marker>
              <h2 id="tr-faq-title">
                A clearer picture.
                <br />
                <em>Before you print.</em>
              </h2>
              <p className="tr-body-copy">
                A few common questions about ribbon families, printhead types,
                and companion label stock.
              </p>
              <Link href="/contact" className="tr-text-link">
                <span>Ask our team</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="tr-faq-list">
              {category.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  data-tr-reveal="rise"
                  style={{ "--tr-delay": `${index * 80}ms` }}
                >
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{faq.question}</strong>
                    <Plus size={20} aria-hidden="true" />
                  </summary>
                  <div className="tr-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="tr-related tr-section"
          aria-labelledby="tr-related-title"
        >
          <div className="tr-container">
            <div className="tr-section-heading" data-tr-reveal="rise">
              <div>
                <Marker number="05">BEYOND THE PRINT</Marker>
                <h2 id="tr-related-title">
                  Keep the program
                  <br />
                  <em>connected.</em>
                </h2>
              </div>
              <Link href="/products" className="tr-text-link">
                <span>Explore every product family</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="tr-related-grid">
              {category.related.map((slug, index) => {
                const item = getProductCategory(slug);
                return (
                  <Link
                    key={slug}
                    href={`/products/${slug}`}
                    className="tr-related-card"
                    data-tr-reveal="pop"
                    style={{ "--tr-delay": `${index * 120}ms` }}
                  >
                    <div className="tr-related-image">
                      <Image
                        src={`/image/products/${item.heroImage}.webp`}
                        alt={item.heroAlt}
                        fill
                        sizes="(min-width:1000px) 28vw,(min-width:561px) 42vw,85vw"
                      />
                      <span>0{index + 1} / EXPLORE</span>
                    </div>
                    <div className="tr-related-caption">
                      <h3>{item.name}</h3>
                      <ArrowUpRight size={25} aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="tr-cta" aria-labelledby="tr-cta-title">
          <div className="tr-container">
            <div className="tr-cta-top">
              <Marker number="06">LET’S MAKE YOUR NEXT IMPRESSION</Marker>
              <span>THE RIGHT CONVERSATION STARTS HERE.</span>
            </div>
            <div className="tr-cta-main" data-tr-reveal="pop">
              <h2 id="tr-cta-title">
                Ready.
                <br />
                <em>Set. Print.</em>
              </h2>
              <Link href="/contact" className="tr-cta-link">
                <span>
                  LET’S TALK
                  <br />
                  PRINTING SUPPLIES
                </span>
                <ArrowUpRight size={72} strokeWidth={1.2} aria-hidden="true" />
                <span className="tr-cta-link-bottom">
                  START THE CONVERSATION
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </Link>
            </div>
            <div className="tr-cta-bottom">
              <span>3M LABEL LIMITED / THE PRINT LAB</span>
              <p>
                Your details.<strong> Our starting point.</strong>
              </p>
              <span>RIBBONS + LABEL STOCK — 06</span>
            </div>
          </div>
        </section>
      </RibbonsMotion>
    </main>
  );
}
