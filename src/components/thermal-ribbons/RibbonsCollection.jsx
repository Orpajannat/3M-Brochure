"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { useId, useRef, useState } from "react";

const filters = ["All products", "Ribbons", "Label stock"];

export default function RibbonsCollection({ products }) {
  const [filter, setFilter] = useState(0);
  const [selected, setSelected] = useState(products[0]);
  const dialog = useRef(null);
  const id = useId();
  const visibleCount = filter === 0 ? products.length : filter === 1 ? 3 : 1;
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
            ".tr-page .tr-filter,.tr-page .tr-motion-toggle{display:none}.tr-page *,.tr-page *::before,.tr-page *::after{animation:none!important;transition:none!important}"
          }
        </style>
      </noscript>
      <div className="tr-collection-tools">
        <div
          className="tr-filter"
          role="group"
          aria-label="Filter printing supplies"
        >
          {filters.map((name, index) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === index}
              onClick={() => setFilter(index)}
            >
              {name}
              <span aria-hidden="true">{["04", "03", "01"][index]}</span>
            </button>
          ))}
        </div>
        <p className="tr-result-count" aria-live="polite">
          {visibleCount} products in the collection
        </p>
      </div>
      <div className="tr-product-grid">
        {products.map((product, index) => (
          <article
            key={product.name}
            className={`tr-product-card tr-product-card-${index}`}
            data-filtered={
              filter !== 0 && (filter === 1 ? index === 3 : index !== 3)
            }
            data-tr-reveal="pop"
            style={{ "--tr-delay": `${(index % 2) * 120}ms` }}
          >
            <a
              href="/contact"
              className="tr-product-visual"
              aria-label={`View ${product.name}`}
              onClick={(event) => preview(event, product)}
            >
              <span className="tr-product-index">
                0{index + 1} / PRINTING SUPPLIES
              </span>
              <div className="tr-product-image">
                <Image
                  src={`/image/products/${product.image}.webp`}
                  alt={product.alt}
                  fill
                  sizes="(min-width: 1440px) 490px, (min-width: 641px) 42vw, 85vw"
                />
              </div>
              <span className="tr-product-watermark" aria-hidden="true">
                {["RESIN.", "WAX.", "EDGE.", "STOCK."][index]}
              </span>
              <span className="tr-product-zoom">
                <Expand size={17} aria-hidden="true" />
                <span>A CLOSER LOOK</span>
              </span>
            </a>
            <div className="tr-product-copy">
              <div>
                <h3>{product.name}</h3>
                <div className="tr-product-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                className="tr-round-link"
                aria-label={`Enquire about ${product.name}`}
              >
                <ArrowUpRight size={23} aria-hidden="true" />
              </Link>
            </div>
            <p className="tr-product-description">{product.description}</p>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="tr-product-dialog"
        aria-labelledby={`${id}-title`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <div className="tr-dialog-body">
          <button
            type="button"
            className="tr-dialog-close"
            aria-label="Close product details"
            autoFocus
            onClick={() => dialog.current.close()}
          >
            <X size={23} aria-hidden="true" />
          </button>
          <div className="tr-dialog-image">
            <Image
              src={`/image/products/${selected.image}.webp`}
              alt={selected.alt}
              fill
              sizes="(min-width: 761px) 380px, 80vw"
            />
          </div>
          <div className="tr-dialog-copy">
            <span className="tr-dialog-kicker">
              THE PRINT LAB / A CLOSER LOOK
            </span>
            <h2 id={`${id}-title`}>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="tr-product-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href="/contact" className="tr-button tr-button-dark">
              Discuss this item <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
