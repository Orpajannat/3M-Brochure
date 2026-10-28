import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  ChevronRight,
  Layers3,
  Plus,
  ScanLine,
} from "lucide-react";
import {
  getProductCategory,
  productCategories,
} from "@/components/products/product-data";
import HeatMotion from "./HeatMotion";
import HeatShowcase from "./HeatShowcase";
import "./HeatTransfer.css";

const category = getProductCategory("heat-transfer-labels");
const steps = [
  { title: "Start with the artwork.", caption: "THE IDEA" },
  { title: "Give it a place.", caption: "THE GARMENT" },
  { title: "Bring it all together.", caption: "THE PROGRAM" },
];

function Marker({ number, children }) {
  return (
    <p className="ht-marker">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function HeatTransferPage() {
  return (
    <main className="ht-page">
      <HeatMotion>
        <section className="ht-hero" aria-labelledby="ht-title">
          <div className="ht-hero-lines" aria-hidden="true" />
          <div className="ht-container">
            <div className="ht-topline">
              <nav aria-label="Breadcrumb">
                <ol className="ht-breadcrumb">
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
                  <li aria-current="page">Heat transfers</li>
                </ol>
              </nav>
              <span className="ht-edition">
                THE BRAND DETAILS SERIES <b>02 / 06</b>
              </span>
            </div>
            <div className="ht-hero-layout">
              <div className="ht-hero-copy">
                <p className="ht-kicker">
                  <span /> HEAT TRANSFER LABELS
                </p>
                <h1 id="ht-title" aria-label="Your identity. In its element.">
                  <span className="ht-title-line">
                    <span>Your identity.</span>
                  </span>
                  <span className="ht-title-line ht-title-accent">
                    <span>In its element.</span>
                  </span>
                </h1>
                <p className="ht-hero-description">{category.description}</p>
                <div className="ht-actions">
                  <a href="#ht-collection" className="ht-button ht-button-red">
                    Explore the transfers{" "}
                    <ArrowDown size={17} aria-hidden="true" />
                  </a>
                  <Link href="/contact" className="ht-text-link">
                    Let’s make an impression{" "}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
                <ul className="ht-hero-chips">
                  {category.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="ht-hero-annotation">
                  <span aria-hidden="true">↳</span>
                  <p>
                    From the artwork to the garment.
                    <br />
                    <strong>A different kind of brand connection.</strong>
                  </p>
                </div>
              </div>
              <div className="ht-hero-stage" data-ht-tilt>
                <span className="ht-stage-outline" aria-hidden="true">
                  02
                </span>
                <div className="ht-stage-inner">
                  <figure className="ht-application-photo">
                    <Image
                      src="/image/products/heat-application.webp"
                      alt={category.optionsAlt}
                      fill
                      preload
                      sizes="(min-width: 1440px) 500px, (min-width: 901px) 44vw, 85vw"
                    />
                    <div className="ht-heat-scan" aria-hidden="true" />
                    <div className="ht-film-layer" aria-hidden="true" />
                    <figcaption>
                      <span>THE ART OF APPLICATION</span>
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </figcaption>
                  </figure>
                  <div className="ht-press-card" aria-hidden="true">
                    <Layers3 size={24} strokeWidth={1.3} />
                    <span>
                      ARTWORK.
                      <br />
                      APPLICATION.
                      <br />
                      <strong>IDENTITY.</strong>
                    </span>
                    <div className="ht-press-bars">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                  <span className="ht-peel-note" aria-hidden="true">
                    A LITTLE HEAT.
                    <br />A LASTING IMPRESSION.
                    <ArrowDownRight size={26} />
                  </span>
                </div>
                <div className="ht-star-badge" aria-hidden="true">
                  <Asterisk size={78} strokeWidth={1.2} />
                  <span>
                    MADE TO
                    <br />
                    MAKE A MARK
                  </span>
                </div>
                <span className="ht-stage-label" aria-hidden="true">
                  CONCEPT → TRANSFER → GARMENT
                </span>
              </div>
            </div>
            <div className="ht-hero-bottom">
              <span>YOUR MARK. A NEW MEDIUM.</span>
              <a href="#ht-collection">
                DISCOVER WHAT TRANSFERS{" "}
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="ht-ribbon" aria-hidden="true">
            <div className="ht-ribbon-track">
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {[
                    "TURN UP THE DETAIL",
                    "TRANSFER YOUR IDENTITY",
                    "MAKE AN IMPRESSION",
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

        <nav className="ht-category-nav" aria-label="Product categories">
          <div className="ht-container">
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
          id="ht-collection"
          className="ht-collection ht-section"
          aria-labelledby="ht-collection-title"
        >
          <div className="ht-container">
            <div className="ht-section-heading" data-ht-reveal="rise">
              <div>
                <Marker number="01">THE TRANSFER COLLECTION</Marker>
                <h2 id="ht-collection-title">
                  One medium.
                  <br />
                  <em>So many expressions.</em>
                </h2>
              </div>
              <p>
                {category.rangeDescription}
                <span>SELECT A FORMAT TO EXPLORE ↘</span>
              </p>
            </div>
            <HeatShowcase products={category.products} />
            <div className="ht-collection-footer" data-ht-reveal="rise">
              <ScanLine size={19} aria-hidden="true" />
              <p>
                Brand graphics. Care wording. Size information.
                <br />
                <strong>Thoughtfully brought onto the garment.</strong>
              </p>
              <Link href="/contact" className="ht-text-link">
                Discuss your collection{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="ht-details ht-section"
          aria-labelledby="ht-details-title"
        >
          <div className="ht-container">
            <div className="ht-section-heading" data-ht-reveal="rise">
              <div>
                <Marker number="02">DESIGNED AROUND YOUR GARMENT</Marker>
                <h2 id="ht-details-title">
                  The right details.
                  <br />
                  <em>The right impression.</em>
                </h2>
              </div>
              <p>{category.optionsDescription}</p>
            </div>
            <div className="ht-details-layout">
              <div className="ht-detail-visual" data-ht-reveal="pop">
                <div className="ht-detail-visual-top">
                  <span>APPLICATION / CLOSE-UP</span>
                  <span>02—DETAIL</span>
                </div>
                <div className="ht-detail-photo">
                  <Image
                    src="/image/products/heat-branding.webp"
                    alt="Single-color heat transfer brand marks on a carrier sheet"
                    fill
                    sizes="(min-width: 1000px) 42vw, 85vw"
                  />
                  <div className="ht-detail-sweep" aria-hidden="true" />
                </div>
                <div className="ht-detail-caption">
                  <Asterisk size={32} aria-hidden="true" />
                  <span>
                    START WITH THE GARMENT.
                    <br />
                    <strong>MAKE THE DETAILS YOURS.</strong>
                  </span>
                </div>
              </div>
              <div className="ht-spec-grid">
                {category.options.map((option, index) => (
                  <div
                    key={option.label}
                    className="ht-spec-card"
                    data-ht-reveal="pop"
                    style={{ "--ht-delay": `${index * 90}ms` }}
                  >
                    <span className="ht-spec-index">0{index + 1}</span>
                    <h3>{option.label}</h3>
                    <p>{option.value}</p>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
            <div className="ht-details-footer" data-ht-reveal="rise">
              <p>
                Your artwork, fabric, and label position shape the conversation.
              </p>
              <Link href="/services" className="ht-text-link">
                Explore our production services{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="ht-brief ht-section"
          aria-labelledby="ht-brief-title"
        >
          <div className="ht-container ht-brief-layout">
            <div className="ht-brief-copy" data-ht-reveal="rise">
              <Marker number="03">THE STARTING POINT</Marker>
              <h2 id="ht-brief-title">
                A good brief.
                <br />
                <em>A great beginning.</em>
              </h2>
              <p>
                Share your ideas and requirements. We’ll get into the details
                together.
              </p>
              <Link href="/contact" className="ht-button ht-button-dark">
                Talk about your project{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Asterisk
                size={94}
                strokeWidth={1}
                className="ht-brief-star"
                aria-hidden="true"
              />
            </div>
            <ol className="ht-brief-steps">
              {category.brief.map((item, index) => (
                <li
                  key={item}
                  data-ht-reveal="slide"
                  style={{ "--ht-delay": `${index * 110}ms` }}
                >
                  <span className="ht-brief-number">0{index + 1}</span>
                  <div>
                    <span>{steps[index].caption}</span>
                    <h3>{steps[index].title}</h3>
                    <p>{item}.</p>
                  </div>
                  <ArrowDownRight size={22} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ht-faq ht-section" aria-labelledby="ht-faq-title">
          <div className="ht-container ht-faq-layout">
            <div data-ht-reveal="rise">
              <Marker number="04">GOOD TO KNOW</Marker>
              <h2 id="ht-faq-title">
                Before the
                <br />
                <em>first impression.</em>
              </h2>
              <p className="ht-body-copy">
                A few things you might be wondering about heat transfer labels.
              </p>
              <Link href="/contact" className="ht-text-link">
                Keep the questions coming{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="ht-faq-list">
              {category.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  data-ht-reveal="rise"
                  style={{ "--ht-delay": `${index * 85}ms` }}
                >
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{faq.question}</strong>
                    <Plus size={20} aria-hidden="true" />
                  </summary>
                  <div className="ht-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="ht-related ht-section"
          aria-labelledby="ht-related-title"
        >
          <div className="ht-container">
            <div className="ht-section-heading" data-ht-reveal="rise">
              <div>
                <Marker number="05">BUILD THE BIGGER PICTURE</Marker>
                <h2 id="ht-related-title">
                  Great details.
                  <br />
                  <em>Better together.</em>
                </h2>
              </div>
              <Link href="/products" className="ht-text-link">
                Meet the full collection{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="ht-related-grid">
              {category.related.map((slug, index) => {
                const item = getProductCategory(slug);
                return (
                  <Link
                    key={slug}
                    href={`/products/${slug}`}
                    className="ht-related-card"
                    data-ht-reveal="pop"
                    style={{ "--ht-delay": `${index * 120}ms` }}
                  >
                    <div className="ht-related-image">
                      <Image
                        src={`/image/products/${item.heroImage}.webp`}
                        alt={item.heroAlt}
                        fill
                        sizes="(min-width: 1000px) 28vw, (min-width: 561px) 42vw, 85vw"
                      />
                      <span>0{index + 1} / EXPLORE</span>
                    </div>
                    <div className="ht-related-caption">
                      <h3>{item.name}</h3>
                      <ArrowUpRight size={24} aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="ht-cta" aria-labelledby="ht-cta-title">
          <div className="ht-cta-orbit" aria-hidden="true" />
          <div className="ht-container">
            <div className="ht-cta-top">
              <Marker number="06">LET’S PUT YOUR IDEAS INTO MOTION</Marker>
              <span>YOUR NEXT BRAND DETAIL STARTS HERE.</span>
            </div>
            <div className="ht-cta-main" data-ht-reveal="pop">
              <h2 id="ht-cta-title">
                MAKE IT
                <br />
                <em>YOURS.</em>
              </h2>
              <div>
                <p>
                  Good ideas deserve
                  <br />a great impression.
                </p>
                <Link href="/contact" className="ht-cta-link">
                  <span>
                    LET’S TALK
                    <br />
                    HEAT TRANSFERS
                  </span>
                  <ArrowUpRight
                    size={57}
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
            <div className="ht-cta-bottom">
              <span>3M LABEL LIMITED</span>
              <p>
                From your identity <ArrowRight size={14} aria-hidden="true" />{" "}
                to your next collection.
              </p>
              <span>HEAT TRANSFER LABELS / 02</span>
            </div>
          </div>
        </section>
      </HeatMotion>
    </main>
  );
}
