"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { useId, useRef, useState } from "react";

const filters = ["All paper items", "Tags & tickets", "Boxes & packaging"];

export default function PaperCollection({ products }) {
  const [filter, setFilter] = useState(0);
  const [selected, setSelected] = useState(products[0]);
  const dialog = useRef(null);
  const id = useId();
  const visibleCount = filter === 0 ? products.length : 2;
  function preview(event, product) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    setSelected(product);
    dialog.current.showModal();
  }
  return (
    <>
      <noscript>
        <style>
          {
            ".pp-page .pp-filter,.pp-page .pp-motion-toggle{display:none}.pp-page *,.pp-page *::before,.pp-page *::after{animation:none!important;transition:none!important}"
          }
        </style>
      </noscript>
      <div className="pp-collection-tools">
        <div
          className="pp-filter"
          role="group"
          aria-label="Filter paper collection"
        >
          {filters.map((name, index) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === index}
              onClick={() => setFilter(index)}
            >
              {name}
              <span aria-hidden="true">{index === 0 ? "04" : "02"}</span>
            </button>
          ))}
        </div>
        <p className="pp-result-count" aria-live="polite">
          {visibleCount} pieces in the edit
        </p>
      </div>
      <div className="pp-product-grid">
        {products.map((product, index) => (
          <article
            key={product.name}
            className={`pp-product-card pp-product-card-${index}`}
            data-filtered={
              filter !== 0 && (filter === 1 ? index > 1 : index < 2)
            }
            data-pp-reveal="pop"
            style={{ "--pp-delay": `${(index % 2) * 120}ms` }}
          >
            <a
              href="/contact"
              className="pp-product-visual"
              aria-label={`View ${product.name}`}
              onClick={(event) => preview(event, product)}
            >
              <span className="pp-product-index">
                0{index + 1} / PAPER OBJECTS
              </span>
              <div className="pp-product-image">
                <Image
                  src={`/image/products/${product.image}.webp`}
                  alt={product.alt}
                  fill
                  sizes="(min-width: 1440px) 490px, (min-width: 641px) 42vw, 85vw"
                />
              </div>
              <span className="pp-product-watermark" aria-hidden="true">
                {["TAG IT.", "SAY IT.", "BOX IT.", "GIFT IT."][index]}
              </span>
              <span className="pp-product-zoom">
                <Expand size={17} aria-hidden="true" />
                <span>A CLOSER LOOK</span>
              </span>
            </a>
            <div className="pp-product-copy">
              <div>
                <h3>{product.name}</h3>
                <div className="pp-product-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                className="pp-round-link"
                aria-label={`Enquire about ${product.name}`}
              >
                <ArrowUpRight size={23} aria-hidden="true" />
              </Link>
            </div>
            <p className="pp-product-description">{product.description}</p>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="pp-product-dialog"
        aria-labelledby={`${id}-title`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <div className="pp-dialog-body">
          <button
            type="button"
            className="pp-dialog-close"
            aria-label="Close paper item details"
            autoFocus
            onClick={() => dialog.current.close()}
          >
            <X size={23} aria-hidden="true" />
          </button>
          <div className="pp-dialog-image">
            <Image
              src={`/image/products/${selected.image}.webp`}
              alt={selected.alt}
              fill
              sizes="(min-width: 761px) 380px, 80vw"
            />
          </div>
          <div className="pp-dialog-copy">
            <span className="pp-dialog-kicker">
              THE PAPER EDIT / A CLOSER LOOK
            </span>
            <h2 id={`${id}-title`}>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="pp-product-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href="/contact" className="pp-button pp-button-dark">
              Discuss this paper item{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
