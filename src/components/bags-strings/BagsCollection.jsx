"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { useId, useRef, useState } from "react";

const filters = ["All pieces", "Bags", "Lock strings"];

export default function BagsCollection({ products }) {
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
            ".bs-page .bs-filter,.bs-page .bs-motion-toggle{display:none}.bs-page *,.bs-page *::before,.bs-page *::after{animation:none!important;transition:none!important}"
          }
        </style>
      </noscript>
      <div className="bs-collection-tools">
        <div
          className="bs-filter"
          role="group"
          aria-label="Filter packaging collection"
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
        <p className="bs-result-count" aria-live="polite">
          {visibleCount} pieces in the edit
        </p>
      </div>
      <div className="bs-product-grid">
        {products.map((product, index) => (
          <article
            key={product.name}
            className={`bs-product-card bs-product-card-${index}`}
            data-filtered={
              filter !== 0 && (filter === 1 ? index > 1 : index < 2)
            }
            data-bs-reveal="pop"
            style={{ "--bs-delay": `${(index % 2) * 120}ms` }}
          >
            <a
              href="/contact"
              className="bs-product-visual"
              aria-label={`View ${product.name}`}
              onClick={(event) => preview(event, product)}
            >
              <span className="bs-product-index">
                0{index + 1} / PACKING ELEMENTS
              </span>
              <div className="bs-product-image">
                <Image
                  src={`/image/products/${product.image}.webp`}
                  alt={product.alt}
                  fill
                  sizes="(min-width: 1440px) 490px, (min-width: 641px) 42vw, 85vw"
                />
              </div>
              <span className="bs-product-watermark" aria-hidden="true">
                {["CLEAR.", "BRAND.", "CONNECT.", "SIGN."][index]}
              </span>
              <span className="bs-product-zoom">
                <Expand size={17} aria-hidden="true" />
                <span>A CLOSER LOOK</span>
              </span>
            </a>
            <div className="bs-product-copy">
              <div>
                <h3>{product.name}</h3>
                <div className="bs-product-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                className="bs-round-link"
                aria-label={`Enquire about ${product.name}`}
              >
                <ArrowUpRight size={23} aria-hidden="true" />
              </Link>
            </div>
            <p className="bs-product-description">{product.description}</p>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="bs-product-dialog"
        aria-labelledby={`${id}-title`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <div className="bs-dialog-body">
          <button
            type="button"
            className="bs-dialog-close"
            aria-label="Close packaging details"
            autoFocus
            onClick={() => dialog.current.close()}
          >
            <X size={23} aria-hidden="true" />
          </button>
          <div className="bs-dialog-image">
            <Image
              src={`/image/products/${selected.image}.webp`}
              alt={selected.alt}
              fill
              sizes="(min-width: 761px) 380px, 80vw"
            />
          </div>
          <div className="bs-dialog-copy">
            <span className="bs-dialog-kicker">
              THE PACKAGING EDIT / A CLOSER LOOK
            </span>
            <h2 id={`${id}-title`}>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="bs-product-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href="/contact" className="bs-button bs-button-dark">
              Discuss this item <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
