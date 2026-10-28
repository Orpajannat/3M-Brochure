import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  ChevronRight,
  Link2,
  Plus,
  ScanLine,
} from "lucide-react";
import {
  getProductCategory,
  productCategories,
} from "@/components/products/product-data";
import BagsMotion from "./BagsMotion";
import BagsCollection from "./BagsCollection";
import BagsDetails from "./BagsDetails";
import "./BagsStrings.css";

const category = getProductCategory("poly-bags-lock-strings");
const briefTitles = [
  "Find the right format.",
  "Make it your brand.",
  "Bring it all together.",
];
function Marker({ number, children }) {
  return (
    <p className="bs-marker">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function BagsStringsPage() {
  return (
    <main className="bs-page">
      <BagsMotion>
        <section className="bs-hero" aria-labelledby="bs-title">
          <div className="bs-hero-grid" aria-hidden="true" />
          <div className="bs-container">
            <div className="bs-topline">
              <nav aria-label="Breadcrumb">
                <ol className="bs-breadcrumb">
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
                  <li aria-current="page">Bags & strings</li>
                </ol>
              </nav>
              <span className="bs-edition">
                THE BRAND DETAILS SERIES <b>05 / 06</b>
              </span>
            </div>
            <div className="bs-hero-layout">
              <div className="bs-hero-copy">
                <p className="bs-kicker">
                  <span />
                  POLY BAGS & LOCK STRINGS
                </p>
                <h1 id="bs-title" aria-label="Packed. Branded. Connected.">
                  <span className="bs-title-line">
                    <span>Packed.</span>
                  </span>
                  <span className="bs-title-line">
                    <span>Branded.</span>
                  </span>
                  <span className="bs-title-line bs-title-serif">
                    <span>Connected.</span>
                  </span>
                </h1>
                <p className="bs-hero-description">{category.description}</p>
                <div className="bs-actions">
                  <a href="#bs-collection" className="bs-button bs-button-blue">
                    Explore the collection{" "}
                    <ArrowDown size={17} aria-hidden="true" />
                  </a>
                  <Link href="/contact" className="bs-text-link">
                    Let’s connect the details{" "}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
                <ul className="bs-hero-chips">
                  {category.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bs-hero-stage" data-bs-tilt>
                <span className="bs-stage-outline" aria-hidden="true">
                  05
                </span>
                <svg
                  className="bs-string-path"
                  viewBox="0 0 600 600"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M30 500C-80 320 500 40 540 160S160 530 120 330 470 250 590 480"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="5 8"
                  />
                </svg>
                <div className="bs-stage-inner">
                  <figure className="bs-bag-specimen">
                    <div className="bs-bag-zip" aria-hidden="true" />
                    <div className="bs-specimen-top">
                      <span>PACKAGING STUDY / PRINTED BAG</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </div>
                    <div className="bs-specimen-image">
                      <Image
                        src="/image/products/printed-polybags.webp"
                        alt={category.heroAlt}
                        fill
                        preload
                        sizes="(min-width: 1440px) 390px, (min-width: 901px) 33vw, 69vw"
                      />
                    </div>
                    <div className="bs-film-sheen" aria-hidden="true" />
                    <figcaption>
                      AROUND YOUR PRODUCT. PART OF YOUR BRAND.
                    </figcaption>
                  </figure>
                  <figure className="bs-string-specimen">
                    <div className="bs-string-image">
                      <Image
                        src="/image/products/branded-lock-strings.webp"
                        alt={category.optionsAlt}
                        fill
                        sizes="(min-width: 901px) 190px, 35vw"
                      />
                    </div>
                    <figcaption>THE FINISHING CONNECTION.</figcaption>
                  </figure>
                  <div className="bs-seal" aria-hidden="true">
                    <Link2 size={28} strokeWidth={1.3} />
                    <span>PACK + CONNECT</span>
                  </div>
                  <div className="bs-specimen-label" aria-hidden="true">
                    <span>05</span>
                    <div>
                      THE WHOLE PACKAGE.
                      <br />
                      <strong>THE FINISHING DETAIL.</strong>
                    </div>
                    <ArrowUpRight size={22} />
                  </div>
                </div>
                <span className="bs-stage-coordinate" aria-hidden="true">
                  THE BAG / THE TAG / THE CONNECTION
                </span>
              </div>
            </div>
            <div className="bs-hero-bottom">
              <span>YOUR BRAND. CONSIDERED FROM EVERY SIDE.</span>
              <a href="#bs-collection">
                MEET THE PACKAGING EDIT{" "}
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="bs-ribbon" aria-hidden="true">
            <div className="bs-ribbon-track">
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {[
                    "PACK WITH PURPOSE",
                    "CONNECT WITH CHARACTER",
                    "FINISH WITH YOUR BRAND",
                  ].map((text) => (
                    <span key={text}>
                      {text}
                      <Asterisk size={28} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="bs-category-nav" aria-label="Product categories">
          <div className="bs-container">
            {productCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                aria-current={item.slug === category.slug ? "page" : undefined}
              >
                <span>{item.number}</span>
                {item.shortName}
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>

        <section
          id="bs-collection"
          className="bs-collection bs-section"
          aria-labelledby="bs-collection-title"
        >
          <div className="bs-container">
            <div className="bs-section-heading" data-bs-reveal="rise">
              <div>
                <Marker number="01">THE PACKAGING EDIT</Marker>
                <h2 id="bs-collection-title">
                  The bag. The string.
                  <br />
                  <em>The whole story.</em>
                </h2>
              </div>
              <p>
                {category.rangeDescription}
                <span>FOUR PIECES. ONE COORDINATED PROGRAM.</span>
              </p>
            </div>
            <BagsCollection products={category.products} />
            <div className="bs-collection-footer" data-bs-reveal="rise">
              <ScanLine size={19} aria-hidden="true" />
              <p>
                From the packing bag to the tag attachment.
                <br />
                <strong>
                  Make every finishing detail part of the same identity.
                </strong>
              </p>
              <Link href="/contact" className="bs-text-link">
                Build your packaging program{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="bs-details bs-section"
          aria-labelledby="bs-details-title"
        >
          <div className="bs-container">
            <div className="bs-section-heading" data-bs-reveal="rise">
              <div>
                <Marker number="02">LOOK AT THE WHOLE PACKAGE</Marker>
                <h2 id="bs-details-title">
                  Your requirements.
                  <br />
                  <em>Connected by design.</em>
                </h2>
              </div>
              <p>{category.optionsDescription}</p>
            </div>
            <BagsDetails options={category.options} />
            <div className="bs-details-footer" data-bs-reveal="rise">
              <span>
                Start with the garment, the artwork, and the way it needs to be
                packed.
              </span>
              <Link href="/services" className="bs-text-link">
                Explore our production services{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="bs-brief bs-section"
          aria-labelledby="bs-brief-title"
        >
          <div className="bs-container">
            <div className="bs-section-heading" data-bs-reveal="rise">
              <div>
                <Marker number="03">A CLEAR STARTING POINT</Marker>
                <h2 id="bs-brief-title">
                  A better brief.
                  <br />
                  <em>A complete picture.</em>
                </h2>
              </div>
              <p>
                Share your packing and attachment needs together. These details
                help our team review the right combination.
              </p>
            </div>
            <ol className="bs-brief-grid">
              {category.brief.map((item, index) => (
                <li
                  key={item}
                  data-bs-reveal="pop"
                  style={{ "--bs-delay": `${index * 125}ms` }}
                >
                  <div className="bs-brief-top">
                    <span>0{index + 1}</span>
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </div>
                  <h3>{briefTitles[index]}</h3>
                  <p>{item}.</p>
                  <span className="bs-brief-label">
                    {["THE PACKING", "THE IDENTITY", "THE PROGRAM"][index]}
                  </span>
                </li>
              ))}
            </ol>
            <div className="bs-brief-footer" data-bs-reveal="rise">
              <p>
                Share the pieces.
                <br />
                <strong>Let’s put them together.</strong>
              </p>
              <Link href="/contact" className="bs-button bs-button-dark">
                Discuss your project{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bs-faq bs-section" aria-labelledby="bs-faq-title">
          <div className="bs-container bs-faq-layout">
            <div data-bs-reveal="rise">
              <Marker number="04">A FEW THINGS TO UNPACK</Marker>
              <h2 id="bs-faq-title">
                The details.
                <br />
                <em>Made clearer.</em>
              </h2>
              <p className="bs-body-copy">
                Common questions about bags, strings, and bringing your
                packaging program together.
              </p>
              <Link href="/contact" className="bs-text-link">
                Have something else in mind?{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="bs-faq-list">
              {category.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  data-bs-reveal="rise"
                  style={{ "--bs-delay": `${index * 80}ms` }}
                >
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{faq.question}</strong>
                    <Plus size={20} aria-hidden="true" />
                  </summary>
                  <div className="bs-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="bs-related bs-section"
          aria-labelledby="bs-related-title"
        >
          <div className="bs-container">
            <div className="bs-section-heading" data-bs-reveal="rise">
              <div>
                <Marker number="05">MORE OF YOUR BRAND STORY</Marker>
                <h2 id="bs-related-title">
                  Better together.
                  <br />
                  <em>Down to the detail.</em>
                </h2>
              </div>
              <Link href="/products" className="bs-text-link">
                Explore every product family{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="bs-related-grid">
              {category.related.map((slug, index) => {
                const item = getProductCategory(slug);
                return (
                  <Link
                    key={slug}
                    href={`/products/${slug}`}
                    className="bs-related-card"
                    data-bs-reveal="pop"
                    style={{ "--bs-delay": `${index * 120}ms` }}
                  >
                    <div className="bs-related-image">
                      <Image
                        src={`/image/products/${item.heroImage}.webp`}
                        alt={item.heroAlt}
                        fill
                        sizes="(min-width: 1000px) 28vw, (min-width: 561px) 42vw, 85vw"
                      />
                      <span>0{index + 1} / EXPLORE</span>
                    </div>
                    <div className="bs-related-caption">
                      <h3>{item.name}</h3>
                      <ArrowUpRight size={24} aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bs-cta" aria-labelledby="bs-cta-title">
          <div className="bs-cta-grid" aria-hidden="true" />
          <div className="bs-container">
            <div className="bs-cta-top">
              <Marker number="06">LET’S CONNECT THE FINAL DETAILS</Marker>
              <span>YOUR NEXT PACKAGING PROGRAM STARTS HERE.</span>
            </div>
            <div className="bs-cta-main" data-bs-reveal="pop">
              <h2 id="bs-cta-title">
                The whole package.
                <br />
                <em>Entirely yours.</em>
              </h2>
              <Link href="/contact" className="bs-cta-link">
                <span>
                  LET’S TALK
                  <br />
                  BAGS & STRINGS
                </span>
                <ArrowUpRight size={59} strokeWidth={1.3} aria-hidden="true" />
                <span className="bs-cta-link-bottom">
                  START YOUR PROJECT <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            </div>
            <div className="bs-cta-bottom">
              <span>3M LABEL LIMITED / BAGS & STRINGS</span>
              <p>
                Packing. Branding. <strong>Connection.</strong>
              </p>
              <span>THE PACKAGING EDIT — 05</span>
            </div>
          </div>
        </section>
      </BagsMotion>
    </main>
  );
}
