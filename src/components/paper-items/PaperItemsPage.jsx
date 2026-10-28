import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  ChevronRight,
  Plus,
  ScanLine,
} from "lucide-react";
import {
  getProductCategory,
  productCategories,
} from "@/components/products/product-data";
import PaperMotion from "./PaperMotion";
import PaperCollection from "./PaperCollection";
import PaperPrintStudio from "./PaperPrintStudio";
import "./PaperItems.css";

const category = getProductCategory("paper-items");
const briefTitles = [
  "Set the direction.",
  "Shape the details.",
  "Plan the complete picture.",
];

function Marker({ number, children }) {
  return (
    <p className="pp-marker">
      <span>{number}</span>
      {children}
    </p>
  );
}
function InkDots() {
  return (
    <span className="pp-ink-dots" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function PaperItemsPage() {
  return (
    <main className="pp-page">
      <PaperMotion>
        <section className="pp-hero" aria-labelledby="pp-title">
          <div className="pp-hero-grid" aria-hidden="true" />
          <div className="pp-container">
            <div className="pp-topline">
              <nav aria-label="Breadcrumb">
                <ol className="pp-breadcrumb">
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
                  <li aria-current="page">Paper items</li>
                </ol>
              </nav>
              <span className="pp-edition">
                THE BRAND DETAILS SERIES <b>ISSUE 03 / 06</b>
              </span>
            </div>
            <div className="pp-hero-layout">
              <div className="pp-hero-copy">
                <p className="pp-kicker">
                  <span />
                  PAPER ITEMS & PACKAGING
                </p>
                <h1 id="pp-title" aria-label="Big ideas. On paper.">
                  <span className="pp-title-line">
                    <span>Big ideas.</span>
                  </span>
                  <span className="pp-title-line pp-title-serif">
                    <span>On paper.</span>
                  </span>
                </h1>
                <p className="pp-hero-description">{category.description}</p>
                <div className="pp-actions">
                  <a href="#pp-collection" className="pp-button pp-button-dark">
                    Unfold the collection{" "}
                    <ArrowDown size={17} aria-hidden="true" />
                  </a>
                  <Link href="/contact" className="pp-text-link">
                    Put your ideas on paper{" "}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
                <ul className="pp-hero-chips">
                  {category.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="pp-hero-note">
                  <ArrowDownRight
                    size={27}
                    strokeWidth={1.2}
                    aria-hidden="true"
                  />
                  <p>
                    Before the first wear.
                    <br />
                    <strong>Before the box is even opened.</strong>
                  </p>
                </div>
              </div>
              <div className="pp-hero-stage" data-pp-tilt>
                <span className="pp-stage-number" aria-hidden="true">
                  03
                </span>
                <div className="pp-stage-inner">
                  <div className="pp-hanging-string" aria-hidden="true" />
                  <figure className="pp-photo-card">
                    <div className="pp-photo-top">
                      <span>THE PAPER ATELIER</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </div>
                    <div className="pp-photo-image">
                      <Image
                        src="/image/products/hangtags.webp"
                        alt={category.optionsAlt}
                        fill
                        preload
                        sizes="(min-width: 1440px) 340px, (min-width: 901px) 28vw, 62vw"
                      />
                    </div>
                    <figcaption>SMALL PIECES. BIG PERSONALITY.</figcaption>
                  </figure>
                  <div className="pp-brand-tag" aria-hidden="true">
                    <span className="pp-tag-hole" />
                    <span className="pp-tag-top">
                      THE ART OF THE FIRST IMPRESSION
                    </span>
                    <strong>
                      3M<span>LABEL LIMITED</span>
                    </strong>
                    <span className="pp-tag-dash" />
                    <span className="pp-tag-quote">
                      Good things.
                      <br />
                      Great details.
                    </span>
                    <div className="pp-barcode" />
                    <span className="pp-tag-index">PAPER / 003</span>
                  </div>
                  <div className="pp-ticket" aria-hidden="true">
                    <span>03</span>
                    <div>
                      YOUR BRAND.
                      <br />
                      <strong>BEAUTIFULLY PRESENTED.</strong>
                    </div>
                    <ArrowUpRight size={25} />
                  </div>
                  <div className="pp-stage-stamp" aria-hidden="true">
                    <Asterisk size={42} strokeWidth={1.2} />
                    <span>
                      DETAILS
                      <br />
                      MAKE THE DIFFERENCE
                    </span>
                  </div>
                </div>
                <span className="pp-stage-coordinate" aria-hidden="true">
                  CUT / PRINT / PRESENT
                </span>
              </div>
            </div>
            <div className="pp-hero-bottom">
              <InkDots />
              <span>YOUR STORY. A TANGIBLE FIRST IMPRESSION.</span>
              <a href="#pp-collection">
                EXPLORE THE PAPER EDIT{" "}
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="pp-ribbon" aria-hidden="true">
            <div className="pp-ribbon-track">
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {[
                    "GOOD ON PAPER",
                    "GREAT IN YOUR HANDS",
                    "MADE TO STAND OUT",
                  ].map((text) => (
                    <span key={text}>
                      {text}
                      <Asterisk size={27} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="pp-category-nav" aria-label="Product categories">
          <div className="pp-container">
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
          id="pp-collection"
          className="pp-collection pp-section"
          aria-labelledby="pp-collection-title"
        >
          <div className="pp-container">
            <div className="pp-section-heading" data-pp-reveal="rise">
              <div>
                <Marker number="01">THE PAPER EDIT</Marker>
                <h2 id="pp-collection-title">
                  First impressions.
                  <br />
                  <em>Worth keeping.</em>
                </h2>
              </div>
              <p>
                {category.rangeDescription}
                <span>FOUR FAMILIES. ONE COORDINATED STORY.</span>
              </p>
            </div>
            <PaperCollection products={category.products} />
            <div className="pp-collection-footer" data-pp-reveal="rise">
              <ScanLine size={19} aria-hidden="true" />
              <p>
                From the tag on the garment to the box around it.
                <br />
                <strong>Bring every detail into the same story.</strong>
              </p>
              <Link href="/contact" className="pp-text-link">
                Build your paper program{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="pp-production pp-section"
          aria-labelledby="pp-production-title"
        >
          <div className="pp-container">
            <div className="pp-section-heading" data-pp-reveal="rise">
              <div>
                <Marker number="02">THE POSSIBILITIES IN PRINT</Marker>
                <h2 id="pp-production-title">
                  A little ink.
                  <br />
                  <em>A lot of possibility.</em>
                </h2>
              </div>
              <p>{category.optionsDescription}</p>
            </div>
            <PaperPrintStudio options={category.options} />
            <div className="pp-production-footer" data-pp-reveal="rise">
              <span>Good design is in the details. So is good production.</span>
              <Link href="/services" className="pp-text-link">
                Inside our production services{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="pp-brief pp-section"
          aria-labelledby="pp-brief-title"
        >
          <div className="pp-container">
            <div className="pp-section-heading" data-pp-reveal="rise">
              <div>
                <Marker number="03">LET’S MAKE SOMETHING TANGIBLE</Marker>
                <h2 id="pp-brief-title">
                  From your first idea
                  <br />
                  <em>to the finer details.</em>
                </h2>
              </div>
              <p>
                A clear brief is the beginning of a coordinated collection.
                Here’s what our team needs to get started.
              </p>
            </div>
            <ol className="pp-brief-grid">
              {category.brief.map((item, index) => (
                <li
                  key={item}
                  data-pp-reveal="pop"
                  style={{ "--pp-delay": `${index * 125}ms` }}
                >
                  <div className="pp-brief-top">
                    <span>0{index + 1}</span>
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </div>
                  <h3>{briefTitles[index]}</h3>
                  <p>{item}.</p>
                  <span className="pp-brief-label">
                    {["THE ARTWORK", "THE FORMAT", "THE PROGRAM"][index]}
                  </span>
                </li>
              ))}
            </ol>
            <div className="pp-brief-footer" data-pp-reveal="rise">
              <p>
                You bring the idea.
                <br />
                <strong>We’ll help you work through the details.</strong>
              </p>
              <Link href="/contact" className="pp-button pp-button-dark">
                Start with a conversation{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="pp-faq pp-section" aria-labelledby="pp-faq-title">
          <div className="pp-container pp-faq-layout">
            <div data-pp-reveal="rise">
              <Marker number="04">LET’S UNFOLD THE DETAILS</Marker>
              <h2 id="pp-faq-title">
                Good questions.
                <br />
                <em>Clear answers.</em>
              </h2>
              <p className="pp-body-copy">
                A little more about the paper, printing, and presentation behind
                your collection.
              </p>
              <Link href="/contact" className="pp-text-link">
                Keep the conversation going{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="pp-faq-list">
              {category.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  data-pp-reveal="rise"
                  style={{ "--pp-delay": `${index * 80}ms` }}
                >
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{faq.question}</strong>
                    <Plus size={20} aria-hidden="true" />
                  </summary>
                  <div className="pp-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="pp-related pp-section"
          aria-labelledby="pp-related-title"
        >
          <div className="pp-container">
            <div className="pp-section-heading" data-pp-reveal="rise">
              <div>
                <Marker number="05">COMPLETE THE PICTURE</Marker>
                <h2 id="pp-related-title">
                  Every piece.
                  <br />
                  <em>Part of your story.</em>
                </h2>
              </div>
              <Link href="/products" className="pp-text-link">
                The full product collection{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="pp-related-grid">
              {category.related.map((slug, index) => {
                const item = getProductCategory(slug);
                return (
                  <Link
                    key={slug}
                    href={`/products/${slug}`}
                    className="pp-related-card"
                    data-pp-reveal="pop"
                    style={{ "--pp-delay": `${index * 120}ms` }}
                  >
                    <div className="pp-related-image">
                      <Image
                        src={`/image/products/${item.heroImage}.webp`}
                        alt={item.heroAlt}
                        fill
                        sizes="(min-width: 1000px) 28vw, (min-width: 561px) 42vw, 85vw"
                      />
                      <span>0{index + 1} / EXPLORE</span>
                    </div>
                    <div className="pp-related-caption">
                      <h3>{item.name}</h3>
                      <ArrowUpRight size={24} aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pp-cta" aria-labelledby="pp-cta-title">
          <div className="pp-cta-lines" aria-hidden="true" />
          <div className="pp-container">
            <div className="pp-cta-top">
              <Marker number="06">A NEW CHAPTER FOR YOUR BRAND</Marker>
              <InkDots />
            </div>
            <div className="pp-cta-main" data-pp-reveal="pop">
              <h2 id="pp-cta-title">
                Good ideas
                <br />
                <em>deserve paper.</em>
              </h2>
              <Link href="/contact" className="pp-cta-link">
                <span>
                  LET’S MAKE
                  <br />
                  YOUR NEXT IMPRESSION
                </span>
                <ArrowUpRight size={61} strokeWidth={1.3} aria-hidden="true" />
                <span className="pp-cta-link-bottom">
                  START YOUR PROJECT <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            </div>
            <div className="pp-cta-bottom">
              <span>3M LABEL LIMITED / PAPER ITEMS</span>
              <p>
                Your story. <strong>Thoughtfully printed.</strong>
              </p>
              <span>THE PAPER ATELIER — ISSUE 03</span>
            </div>
          </div>
        </section>
      </PaperMotion>
    </main>
  );
}
