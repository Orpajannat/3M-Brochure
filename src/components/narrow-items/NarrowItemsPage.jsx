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
  Ruler,
} from "lucide-react";
import {
  getProductCategory,
  productCategories,
} from "@/components/products/product-data";
import NarrowMotion from "./NarrowMotion";
import NarrowCollection from "./NarrowCollection";
import NarrowDetails from "./NarrowDetails";
import "./NarrowItems.css";

const category = getProductCategory("narrow-items");
const briefTitles = [
  "Choose the component.",
  "Define the detail.",
  "Connect the collection.",
];
function Marker({ number, children }) {
  return (
    <p className="ni-marker">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function NarrowItemsPage() {
  return (
    <main className="ni-page">
      <NarrowMotion>
        <section className="ni-hero" aria-labelledby="ni-title">
          <div className="ni-hero-grid" aria-hidden="true" />
          <div className="ni-container">
            <div className="ni-topline">
              <nav aria-label="Breadcrumb">
                <ol className="ni-breadcrumb">
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
                  <li aria-current="page">Narrow items</li>
                </ol>
              </nav>
              <span className="ni-edition">
                THE BRAND DETAILS SERIES <b>04 / 06</b>
              </span>
            </div>
            <div className="ni-hero-layout">
              <div className="ni-hero-copy">
                <p className="ni-kicker">
                  <span />
                  NARROW ITEMS / THE FINISHING EDIT
                </p>
                <h1 id="ni-title" aria-label="Small parts. Full character.">
                  <span className="ni-title-line">
                    <span>Small parts.</span>
                  </span>
                  <span className="ni-title-line ni-title-serif">
                    <span>Full character.</span>
                  </span>
                </h1>
                <p className="ni-hero-description">{category.description}</p>
                <div className="ni-actions">
                  <a href="#ni-collection" className="ni-button ni-button-lime">
                    Meet the finishing touches{" "}
                    <ArrowDown size={17} aria-hidden="true" />
                  </a>
                  <Link href="/contact" className="ni-text-link">
                    Let’s get into the details{" "}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
                <ul className="ni-hero-chips">
                  {category.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="ni-hero-note">
                  <span>04</span>
                  <p>
                    Accessory families.
                    <br />
                    <strong>One complete point of view.</strong>
                  </p>
                </div>
              </div>
              <div className="ni-hero-stage" data-ni-tilt>
                <svg
                  className="ni-thread-path"
                  viewBox="0 0 600 600"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M-20 140C160 20 500 0 540 140S210 460 120 350 290 90 440 250 380 590 70 560"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="5 8"
                  />
                  <path
                    d="M20 110C180 -10 540 50 560 190S240 480 100 380 270 110 430 290 360 600 40 530"
                    stroke="currentColor"
                    strokeWidth=".5"
                  />
                </svg>
                <div className="ni-stage-inner">
                  <div className="ni-fabric-strip" aria-hidden="true">
                    <span>IT’S ALL IN THE DETAILS</span>
                    <span>3M LABEL LIMITED</span>
                  </div>
                  <figure className="ni-elastic-card">
                    <div className="ni-card-top">
                      <span>TRIM STUDY / ELASTIC</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </div>
                    <div className="ni-card-image">
                      <Image
                        src="/image/products/elastics.webp"
                        alt={category.heroAlt}
                        fill
                        preload
                        sizes="(min-width: 1440px) 420px, (min-width: 901px) 36vw, 72vw"
                      />
                    </div>
                    <figcaption>
                      THE FINISHING TOUCH IS THE SIGNATURE.
                    </figcaption>
                  </figure>
                  <figure className="ni-cord-card">
                    <div className="ni-cord-image">
                      <Image
                        src="/image/products/drawstrings.webp"
                        alt={category.optionsAlt}
                        fill
                        sizes="(min-width: 901px) 190px, 34vw"
                      />
                    </div>
                    <figcaption>COLOR. CORD. CHARACTER.</figcaption>
                  </figure>
                  <div className="ni-study-sticker" aria-hidden="true">
                    <Asterisk size={29} strokeWidth={1.2} />
                    <span>
                      SMALL COMPONENTS.
                      <br />
                      <strong>COMPLETE COLLECTIONS.</strong>
                    </span>
                  </div>
                </div>
                <span className="ni-stage-coordinate" aria-hidden="true">
                  BAND / CORD / WRAP / ELASTIC
                </span>
              </div>
            </div>
            <div className="ni-hero-bottom">
              <span>THOUGHTFULLY FINISHED. DISTINCTLY YOURS.</span>
              <a href="#ni-collection">
                FOLLOW THE FINER DETAILS{" "}
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="ni-ribbon" aria-hidden="true">
            <div className="ni-ribbon-track">
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {[
                    "DETAILS MAKE THE DIFFERENCE",
                    "PULL IT ALL TOGETHER",
                    "FINISH WITH CHARACTER",
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

        <nav className="ni-category-nav" aria-label="Product categories">
          <div className="ni-container">
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
          id="ni-collection"
          className="ni-collection ni-section"
          aria-labelledby="ni-collection-title"
        >
          <div className="ni-container">
            <div className="ni-section-heading" data-ni-reveal="rise">
              <div>
                <Marker number="01">THE FINISHING COLLECTION</Marker>
                <h2 id="ni-collection-title">
                  Four little things.
                  <br />
                  <em>A whole lot of detail.</em>
                </h2>
              </div>
              <p>
                {category.rangeDescription}
                <span>OPEN A FAMILY. GET INTO THE DETAILS. ↘</span>
              </p>
            </div>
            <NarrowCollection products={category.products} />
            <div className="ni-collection-footer" data-ni-reveal="rise">
              <Ruler size={19} aria-hidden="true" />
              <p>
                Supporting accessories. Considered together.
                <br />
                <strong>For the garment and the way you present it.</strong>
              </p>
              <Link href="/contact" className="ni-text-link">
                Create a coordinated program{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="ni-details ni-section"
          aria-labelledby="ni-details-title"
        >
          <div className="ni-container">
            <div className="ni-section-heading" data-ni-reveal="rise">
              <div>
                <Marker number="02">THE SPECIFICATION STUDIO</Marker>
                <h2 id="ni-details-title">
                  Your garment.
                  <br />
                  <em>Your finishing details.</em>
                </h2>
              </div>
              <p>{category.optionsDescription}</p>
            </div>
            <NarrowDetails options={category.options} />
            <div className="ni-details-footer" data-ni-reveal="rise">
              <span>
                Think of every accessory as part of the same collection.
              </span>
              <Link href="/services" className="ni-text-link">
                Explore our production services{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="ni-brief ni-section"
          aria-labelledby="ni-brief-title"
        >
          <div className="ni-container">
            <div className="ni-section-heading" data-ni-reveal="rise">
              <div>
                <Marker number="03">FROM YOUR GARMENT TO OUR BRIEF</Marker>
                <h2 id="ni-brief-title">
                  The right start.
                  <br />
                  <em>A considered finish.</em>
                </h2>
              </div>
              <p>
                Share the details that shape your accessory program. We’ll
                review the pieces together.
              </p>
            </div>
            <ol className="ni-brief-grid">
              {category.brief.map((item, index) => (
                <li
                  key={item}
                  data-ni-reveal="pop"
                  style={{ "--ni-delay": `${index * 125}ms` }}
                >
                  <div className="ni-brief-top">
                    <span>0{index + 1}</span>
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </div>
                  <h3>{briefTitles[index]}</h3>
                  <p>{item}.</p>
                  <span className="ni-brief-label">
                    {
                      ["THE ACCESSORY", "THE SPECIFICATION", "THE PROGRAM"][
                        index
                      ]
                    }
                  </span>
                </li>
              ))}
            </ol>
            <div className="ni-brief-footer" data-ni-reveal="rise">
              <p>
                From a single finishing touch
                <br />
                <strong>to a coordinated collection.</strong>
              </p>
              <Link href="/contact" className="ni-button ni-button-dark">
                Let’s talk about your details{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="ni-faq ni-section" aria-labelledby="ni-faq-title">
          <div className="ni-container ni-faq-layout">
            <div data-ni-reveal="rise">
              <Marker number="04">A FEW FINER POINTS</Marker>
              <h2 id="ni-faq-title">
                Small questions.
                <br />
                <em>Useful answers.</em>
              </h2>
              <p className="ni-body-copy">
                A little more about the accessories that help bring everything
                together.
              </p>
              <Link href="/contact" className="ni-text-link">
                Ask about your program{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="ni-faq-list">
              {category.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  data-ni-reveal="rise"
                  style={{ "--ni-delay": `${index * 80}ms` }}
                >
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{faq.question}</strong>
                    <Plus size={20} aria-hidden="true" />
                  </summary>
                  <div className="ni-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="ni-related ni-section"
          aria-labelledby="ni-related-title"
        >
          <div className="ni-container">
            <div className="ni-section-heading" data-ni-reveal="rise">
              <div>
                <Marker number="05">THE REST OF YOUR BRAND STORY</Marker>
                <h2 id="ni-related-title">
                  One collection.
                  <br />
                  <em>Every connection.</em>
                </h2>
              </div>
              <Link href="/products" className="ni-text-link">
                Explore every product family{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="ni-related-grid">
              {category.related.map((slug, index) => {
                const item = getProductCategory(slug);
                return (
                  <Link
                    key={slug}
                    href={`/products/${slug}`}
                    className="ni-related-card"
                    data-ni-reveal="pop"
                    style={{ "--ni-delay": `${index * 120}ms` }}
                  >
                    <div className="ni-related-image">
                      <Image
                        src={`/image/products/${item.heroImage}.webp`}
                        alt={item.heroAlt}
                        fill
                        sizes="(min-width: 1000px) 28vw, (min-width: 561px) 42vw, 85vw"
                      />
                      <span>0{index + 1} / EXPLORE</span>
                    </div>
                    <div className="ni-related-caption">
                      <h3>{item.name}</h3>
                      <ArrowUpRight size={24} aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="ni-cta" aria-labelledby="ni-cta-title">
          <svg
            className="ni-cta-thread"
            viewBox="0 0 1200 500"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M-50 320C160 80 370 50 550 230S1030 530 1270 60"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6 9"
            />
            <path
              d="M-50 340C180 100 390 70 570 250S1050 550 1270 80"
              stroke="currentColor"
              strokeWidth=".5"
            />
          </svg>
          <div className="ni-container">
            <div className="ni-cta-top">
              <Marker number="06">LET’S BRING THE DETAILS TOGETHER</Marker>
              <span>YOUR NEXT COLLECTION STARTS HERE.</span>
            </div>
            <div className="ni-cta-main" data-ni-reveal="pop">
              <h2 id="ni-cta-title">
                The small things.
                <br />
                <em>The big picture.</em>
              </h2>
              <Link href="/contact" className="ni-cta-link">
                <ArrowUpRight size={58} strokeWidth={1.2} aria-hidden="true" />
                <span>
                  START WITH
                  <br />
                  THE FINISHING TOUCHES
                </span>
              </Link>
            </div>
            <div className="ni-cta-bottom">
              <span>3M LABEL LIMITED / NARROW ITEMS</span>
              <p>
                Small components. <ArrowRight size={14} aria-hidden="true" />{" "}
                Complete character.
              </p>
              <span>THE FINISHING EDIT — 04</span>
            </div>
          </div>
        </section>
      </NarrowMotion>
    </main>
  );
}
