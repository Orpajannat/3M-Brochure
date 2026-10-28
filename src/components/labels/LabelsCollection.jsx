"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { useId, useRef, useState } from "react";

export default function LabelsCollection({ products }) {
  const [selected, setSelected] = useState(products[0]);
  const dialog = useRef(null);
  const titleId = useId();

  function openProduct(product) {
    setSelected(product);
    dialog.current.showModal();
  }

  return (
    <>
      <div className="lp-product-grid">
        {products.map((product, index) => (
          <article
            key={product.name}
            className="lp-card-wrap"
            data-lp-reveal="pop"
            style={{ "--lp-delay": `${(index % 2) * 140}ms` }}
          >
            <button
              type="button"
              className={`lp-product-visual lp-product-tone-${index}`}
              onClick={() => openProduct(product)}
              aria-label={`View ${product.name}`}
            >
              <span className="lp-product-index">
                0{index + 1} / THE LABEL EDIT
              </span>
              <div className="lp-product-image">
                <Image
                  src={`/image/products/${product.image}.webp`}
                  alt={product.alt}
                  fill
                  sizes="(min-width: 1200px) 460px, (min-width: 641px) 42vw, 85vw"
                />
              </div>
              <span className="lp-product-watermark" aria-hidden="true">
                {["WOVEN", "PRINTED", "CARE", "SIZE"][index]}
              </span>
              <span className="lp-product-expand">
                <Expand size={17} aria-hidden="true" />
                <span>TAKE A CLOSER LOOK</span>
              </span>
            </button>
            <div className="lp-product-copy">
              <div>
                <h3>{product.name}</h3>
                <div className="lp-product-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                aria-label={`Enquire about ${product.name}`}
                className="lp-round-link"
              >
                <ArrowUpRight size={24} aria-hidden="true" />
              </Link>
            </div>
            <p className="lp-product-description">{product.description}</p>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lp-product-dialog"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <div className="lp-dialog-body">
          <button
            type="button"
            className="lp-dialog-close"
            onClick={() => dialog.current.close()}
            aria-label="Close product details"
            autoFocus
          >
            <X size={22} aria-hidden="true" />
          </button>
          <div className="lp-dialog-image">
            <Image
              src={`/image/products/${selected.image}.webp`}
              alt={selected.alt}
              fill
              sizes="(min-width: 761px) 380px, 80vw"
            />
          </div>
          <div className="lp-dialog-copy">
            <span className="lp-eyebrow">THE LABEL EDIT / A CLOSER LOOK</span>
            <h2 id={titleId}>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="lp-product-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href="/contact" className="lp-button lp-button-dark">
              Discuss this label <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
