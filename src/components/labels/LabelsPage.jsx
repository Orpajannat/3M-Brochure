import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  getProductCategory,
  productCategories,
} from "@/components/products/product-data";
import LabelsMotion from "./LabelsMotion";
import LabelsCollection from "./LabelsCollection";
import LabelsWeaves from "./LabelsWeaves";
import "./Labels.css";

const category = getProductCategory("labels");
const briefTitles = [
  "Show us your vision.",
  "Define the details.",
  "Plan the collection.",
];

function Eyebrow({ number, children }) {
  return (
    <p className="lp-eyebrow">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function LabelsPage() {
  return (
    <main className="lp-page">
      <LabelsMotion>
        <section className="lp-hero" aria-labelledby="lp-title">
          <div className="lp-grid-bg" aria-hidden="true" />
          <div className="lp-container">
            <div className="lp-hero-top">
              <nav aria-label="Breadcrumb">
                <ol className="lp-breadcrumb">
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
                  <li aria-current="page">Labels</li>
                </ol>
              </nav>
              <span className="lp-edition">
                THE BRAND DETAILS SERIES <span>VOL. 01</span>
              </span>
            </div>
            <div className="lp-hero-layout">
              <div className="lp-hero-copy">
                <p className="lp-hero-kicker">
                  <span className="lp-live-dot" /> SMALL FORMAT. BIG
                  PERSONALITY.
                </p>
                <h1
                  id="lp-title"
                  aria-label="Labels. Small details. Big presence."
                >
                  <span className="lp-title-line">
                    <span>Small details.</span>
                  </span>
                  <span className="lp-title-line">
                    <span>
                      Big <em>presence.</em>
                    </span>
                  </span>
                </h1>
                <p className="lp-hero-description">{category.description}</p>
                <div className="lp-actions">
                  <a href="#lp-collection" className="lp-button lp-button-mint">
                    Find your label <ArrowDown size={18} aria-hidden="true" />
                  </a>
                  <Link href="/contact" className="lp-link">
                    Let’s talk labels{" "}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>
                <div className="lp-hero-footnote">
                  <span>01—04</span>
                  <p>
                    Four label families.
                    <br />
                    <strong>One unmistakable identity.</strong>
                  </p>
                </div>
              </div>
              <div className="lp-hero-stage" data-lp-tilt>
                <div className="lp-stage-orbit" aria-hidden="true" />
                <span className="lp-stage-cross" aria-hidden="true">
                  +
                </span>
                <div className="lp-stage-inner">
                  <div className="lp-sample lp-sample-main">
                    <div className="lp-sample-bar">
                      <span>WOVEN / BRAND SIGNATURES</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </div>
                    <div className="lp-sample-image">
                      <Image
                        src="/image/products/woven-labels.webp"
                        alt="A collection of detailed woven brand labels"
                        fill
                        preload
                        sizes="(min-width: 1100px) 330px, (min-width: 761px) 30vw, 60vw"
                      />
                    </div>
                    <span className="lp-sample-caption">
                      YOUR IDENTITY. DOWN TO THE THREAD.
                    </span>
                  </div>
                  <div className="lp-sample lp-sample-small">
                    <div className="lp-sample-image">
                      <Image
                        src="/image/products/printed-labels.webp"
                        alt="Printed garment label rolls"
                        fill
                        sizes="(min-width: 761px) 175px, 30vw"
                      />
                    </div>
                    <span>
                      PRINTED WITH PURPOSE{" "}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="lp-identity-tag" aria-hidden="true">
                    <span className="lp-tag-hole" />
                    <span>MADE TO BE</span>
                    <strong>yours.</strong>
                    <span>3M LABEL LIMITED</span>
                    <div className="lp-barcode" />
                  </div>
                  <div className="lp-floating-note">
                    <Sparkles size={16} aria-hidden="true" />
                    <span>
                      Not just a label.
                      <br />
                      <strong>Your signature.</strong>
                    </span>
                  </div>
                </div>
                <span className="lp-stage-coordinate" aria-hidden="true">
                  CRAFT / IDENTITY / DETAIL
                </span>
              </div>
            </div>
            <div className="lp-hero-bottom">
              <span>LABELS THAT BELONG TO YOUR BRAND.</span>
              <a href="#lp-collection">
                SCROLL TO DISCOVER{" "}
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="lp-marquee" aria-hidden="true">
            <div className="lp-marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {[
                    "WOVEN TOGETHER",
                    "PRINTED WITH PURPOSE",
                    "MADE TO BE YOURS",
                  ].map((text) => (
                    <span key={text}>
                      {text}
                      <Sparkles size={29} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="lp-category-nav" aria-label="Product categories">
          <div className="lp-container">
            {productCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                aria-current={item.slug === "labels" ? "page" : undefined}
              >
                <span>{item.number}</span>
                {item.shortName}
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>

        <section
          id="lp-collection"
          className="lp-collection lp-section"
          aria-labelledby="lp-collection-title"
        >
          <div className="lp-container">
            <div className="lp-section-head" data-lp-reveal="rise">
              <div>
                <Eyebrow number="01">THE LABEL EDIT</Eyebrow>
                <h2 id="lp-collection-title">
                  Different details.
                  <br />
                  <em>Same obsession.</em>
                </h2>
              </div>
              <div className="lp-head-aside">
                <span className="lp-outline-number" aria-hidden="true">
                  04
                </span>
                <p>{category.rangeDescription}</p>
              </div>
            </div>
            <LabelsCollection products={category.products} />
            <div className="lp-collection-footer" data-lp-reveal="rise">
              <span>
                <Check size={15} aria-hidden="true" /> Brand, care, and size.
                Designed to work together.
              </span>
              <Link href="/contact" className="lp-link">
                Build your label program{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="lp-weave lp-section"
          aria-labelledby="lp-weave-title"
        >
          <div className="lp-container lp-weave-layout">
            <div className="lp-thread-visual" data-lp-reveal="pop">
              <div className="lp-thread-orbit" aria-hidden="true" />
              <span className="lp-thread-word" aria-hidden="true">
                THREAD
                <br />
                BY THREAD.
              </span>
              <div className="lp-thread-photo">
                <Image
                  src="/image/products/woven-labels.webp"
                  alt={category.optionsAlt}
                  fill
                  sizes="(min-width: 1000px) 380px, (min-width: 761px) 38vw, 75vw"
                />
              </div>
              <span className="lp-thread-sticker" aria-hidden="true">
                THE DETAIL
                <br />
                <strong>IS THE DIFFERENCE.</strong>
                <Sparkles size={24} />
              </span>
            </div>
            <div className="lp-weave-copy" data-lp-reveal="rise">
              <Eyebrow number="02">THE ART OF THE WEAVE</Eyebrow>
              <h2 id="lp-weave-title">
                Your identity.
                <br />
                <em>In every thread.</em>
              </h2>
              <p className="lp-body-copy">{category.optionsDescription}</p>
              <LabelsWeaves />
              <dl className="lp-specs">
                {category.options
                  .filter((option) => option.label !== "Weave choices")
                  .map((option) => (
                    <div key={option.label}>
                      <dt>{option.label}</dt>
                      <dd>{option.value}</dd>
                    </div>
                  ))}
              </dl>
              <Link href="/services" className="lp-link">
                Behind the production{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="lp-brief lp-section"
          aria-labelledby="lp-brief-title"
        >
          <div className="lp-brief-orbit" aria-hidden="true" />
          <div className="lp-container">
            <div className="lp-section-head" data-lp-reveal="rise">
              <div>
                <Eyebrow number="03">FROM IDEA TO IDENTITY</Eyebrow>
                <h2 id="lp-brief-title">
                  You bring the vision.
                  <br />
                  <em>We get into the details.</em>
                </h2>
              </div>
              <p className="lp-head-copy">
                A great label starts with a clear brief. Here’s what to share
                with our team to get your program moving.
              </p>
            </div>
            <ol className="lp-steps">
              {category.brief.map((item, index) => (
                <li
                  key={item}
                  data-lp-reveal="pop"
                  style={{ "--lp-delay": `${index * 130}ms` }}
                >
                  <div className="lp-step-top">
                    <span>0{index + 1}</span>
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </div>
                  <h3>{briefTitles[index]}</h3>
                  <p>{item}.</p>
                  <span className="lp-step-label">
                    STEP 0{index + 1} / THE CREATIVE BRIEF
                  </span>
                </li>
              ))}
            </ol>
            <div className="lp-brief-footer" data-lp-reveal="rise">
              <p>
                Start with an idea. <strong>Let’s make it tangible.</strong>
              </p>
              <Link href="/contact" className="lp-button lp-button-light">
                Start the conversation{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="lp-faq lp-section" aria-labelledby="lp-faq-title">
          <div className="lp-container lp-faq-layout">
            <div data-lp-reveal="rise">
              <Eyebrow number="04">A FEW GOOD QUESTIONS</Eyebrow>
              <h2 id="lp-faq-title">
                Curious?
                <br />
                <em>Good.</em>
              </h2>
              <p className="lp-body-copy">
                A little clarity before we create something together.
              </p>
              <Link href="/contact" className="lp-link">
                Ask us anything <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="lp-faq-list">
              {category.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  data-lp-reveal="rise"
                  style={{ "--lp-delay": `${index * 90}ms` }}
                >
                  <summary>
                    <span className="lp-faq-number">0{index + 1}</span>
                    <span>{faq.question}</span>
                    <span className="lp-faq-plus">
                      <Plus size={19} aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="lp-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="lp-related lp-section"
          aria-labelledby="lp-related-title"
        >
          <div className="lp-container">
            <div className="lp-section-head" data-lp-reveal="rise">
              <div>
                <Eyebrow number="05">THINK BEYOND THE LABEL</Eyebrow>
                <h2 id="lp-related-title">
                  The rest of
                  <br />
                  <em>your brand story.</em>
                </h2>
              </div>
              <Link href="/products" className="lp-link">
                The full collection{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="lp-related-grid">
              {category.related.map((slug, index) => {
                const item = getProductCategory(slug);
                return (
                  <Link
                    key={slug}
                    href={`/products/${slug}`}
                    className="lp-related-card"
                    data-lp-reveal="pop"
                    style={{ "--lp-delay": `${index * 120}ms` }}
                  >
                    <div className="lp-related-image">
                      <Image
                        src={`/image/products/${item.heroImage}.webp`}
                        alt={item.heroAlt}
                        fill
                        sizes="(min-width: 1000px) 28vw, (min-width: 641px) 42vw, 85vw"
                      />
                      <span>EXPLORE 0{index + 1}</span>
                    </div>
                    <div className="lp-related-caption">
                      <h3>{item.name}</h3>
                      <span>
                        <ArrowUpRight size={23} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lp-cta" aria-labelledby="lp-cta-title">
          <div className="lp-cta-grid" aria-hidden="true" />
          <div className="lp-container">
            <div className="lp-cta-top" data-lp-reveal="rise">
              <Eyebrow number="06">YOUR NEXT CHAPTER STARTS HERE</Eyebrow>
              <span>LET’S MAKE SOMETHING THAT STAYS.</span>
            </div>
            <div className="lp-cta-main" data-lp-reveal="pop">
              <h2 id="lp-cta-title">
                Let’s make
                <br />
                <em>your mark.</em>
              </h2>
              <Link
                href="/contact"
                className="lp-cta-link"
                aria-label="Start your label project"
              >
                <ArrowUpRight size={58} strokeWidth={1.2} aria-hidden="true" />
                <span>
                  START YOUR
                  <br />
                  LABEL PROJECT
                </span>
              </Link>
            </div>
            <div className="lp-cta-bottom">
              <p>
                Your brand. Your details. <strong>Our craft.</strong>
              </p>
              <span>3M LABEL LIMITED / THE LABEL COLLECTION</span>
            </div>
          </div>
        </section>
      </LabelsMotion>
    </main>
  );
}
