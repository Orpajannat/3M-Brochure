"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Expand, Plus, X } from "lucide-react";
import { useId, useRef, useState } from "react";

const notes = [
  "SUPPORT & PRESENTATION",
  "CORDS & COLOR",
  "PACKING & PRESENTATION",
  "TRIMS & IDENTITY",
];

export default function NarrowCollection({ products }) {
  const [selected, setSelected] = useState(products[0]);
  const dialog = useRef(null);
  const id = useId();
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
            ".ni-page .ni-motion-toggle{display:none}.ni-page *,.ni-page *::before,.ni-page *::after{animation:none!important;transition:none!important}"
          }
        </style>
      </noscript>
      <div className="ni-product-list">
        {products.map((product, index) => (
          <details
            key={product.name}
            name="ni-accessory-families"
            open={index === 0}
            data-ni-reveal="rise"
            style={{ "--ni-delay": `${index * 75}ms` }}
          >
            <summary>
              <span className="ni-product-number" aria-hidden="true">
                0{index + 1}
              </span>
              <strong>{product.name}</strong>
              <span className="ni-product-purpose" aria-hidden="true">
                {notes[index]}
              </span>
              <Plus size={23} aria-hidden="true" />
            </summary>
            <div className="ni-product-body">
              <a
                href="/contact"
                className="ni-product-visual"
                aria-label={`View ${product.name}`}
                onClick={(event) => preview(event, product)}
              >
                <div className="ni-product-image">
                  <Image
                    src={`/image/products/${product.image}.webp`}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1440px) 470px, (min-width: 901px) 40vw, 85vw"
                  />
                </div>
                <span className="ni-product-image-label">
                  THE FINISHING EDIT / 0{index + 1}
                </span>
                <span className="ni-product-zoom">
                  <Expand size={17} aria-hidden="true" />
                  <span>A CLOSER LOOK</span>
                </span>
              </a>
              <div className="ni-product-copy">
                <span className="ni-product-kicker">
                  A SMALL COMPONENT. PART OF THE WHOLE.
                </span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="ni-product-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="ni-product-copy-rule" aria-hidden="true" />
                <p className="ni-product-enquiry-note">
                  Share your garment reference and specifications so our team
                  can review the details with you.
                </p>
                <Link href="/contact" className="ni-button ni-button-dark">
                  Enquire about {product.name.toLowerCase()}{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </details>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="ni-product-dialog"
        aria-labelledby={`${id}-title`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <div className="ni-dialog-body">
          <button
            type="button"
            className="ni-dialog-close"
            aria-label="Close accessory preview"
            autoFocus
            onClick={() => dialog.current.close()}
          >
            <X size={23} aria-hidden="true" />
          </button>
          <div className="ni-dialog-image">
            <Image
              src={`/image/products/${selected.image}.webp`}
              alt={selected.alt}
              fill
              sizes="(min-width: 761px) 380px, 80vw"
            />
          </div>
          <div className="ni-dialog-copy">
            <span className="ni-dialog-kicker">
              THE FINISHING EDIT / A CLOSER LOOK
            </span>
            <h2 id={`${id}-title`}>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="ni-product-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href="/contact" className="ni-button ni-button-dark">
              Discuss this accessory{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
