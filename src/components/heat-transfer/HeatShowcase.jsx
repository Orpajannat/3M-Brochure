"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Expand, X } from "lucide-react";
import { useId, useRef, useState } from "react";

export default function HeatShowcase({ products }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef(null);
  const dialog = useRef(null);
  const current = products[active];

  function handleKey(event, index) {
    let next;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % products.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + products.length - 1) % products.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = products.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current.children[next].focus();
  }

  return (
    <div className="ht-showcase" data-ht-reveal="pop">
      <noscript>
        <style>
          {
            ".ht-page .ht-showcase{display:block}.ht-page .ht-gallery-sidebar,.ht-page .ht-gallery-expand,.ht-page .ht-motion-toggle{display:none}.ht-page .ht-gallery-panel[data-active=false]{display:block!important}.ht-page .ht-gallery-panel{margin-bottom:35px}.ht-page *,.ht-page *::before,.ht-page *::after{animation:none!important;transition:none!important}"
          }
        </style>
      </noscript>
      <div className="ht-gallery-sidebar">
        <div className="ht-gallery-label">
          <span>CHOOSE YOUR EXPRESSION</span>
          <span>0{active + 1} / 04</span>
        </div>
        <div
          ref={tabs}
          className="ht-gallery-tabs"
          role="tablist"
          aria-label="Heat transfer formats"
          aria-orientation="vertical"
        >
          {products.map((product, index) => (
            <button
              key={product.name}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-label={product.name}
              aria-selected={active === index}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKey(event, index)}
            >
              <span aria-hidden="true">0{index + 1}</span>
              <strong>{product.name}</strong>
              <ArrowDownRight size={19} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="ht-gallery-note">
          <span aria-hidden="true">↳</span>
          <p>
            Different formats.
            <br />
            <strong>All part of your identity.</strong>
          </p>
        </div>
      </div>
      <div className="ht-gallery-panels">
        {products.map((product, index) => (
          <div
            key={product.name}
            className="ht-gallery-panel"
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            data-active={active === index}
            tabIndex={0}
            data-ht-tilt
          >
            <div className="ht-gallery-frame">
              <div className="ht-gallery-frame-top">
                <span>TRANSFER STUDY / 0{index + 1}</span>
                <span>3M LABEL LIMITED</span>
              </div>
              <div className="ht-gallery-art">
                <div className="ht-gallery-image">
                  <Image
                    src={`/image/products/${product.image}.webp`}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1440px) 650px, (min-width: 901px) 54vw, 85vw"
                  />
                </div>
              </div>
              <span className="ht-gallery-cross" aria-hidden="true">
                +
              </span>
              <button
                type="button"
                className="ht-gallery-expand"
                onClick={() => dialog.current.showModal()}
                aria-label="Expand transfer sample"
              >
                <Expand size={17} aria-hidden="true" />
              </button>
              <span className="ht-gallery-frame-bottom" aria-hidden="true">
                ARTWORK → APPLICATION → IDENTITY
              </span>
            </div>
            <div className="ht-gallery-info">
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="ht-gallery-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                aria-label={`Enquire about ${product.name}`}
              >
                <ArrowUpRight size={26} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="ht-sample-dialog"
        aria-labelledby={`${id}-dialog-title`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <div className="ht-dialog-inner">
          <button
            type="button"
            onClick={() => dialog.current.close()}
            aria-label="Close transfer sample"
            className="ht-dialog-close"
            autoFocus
          >
            <X size={23} aria-hidden="true" />
          </button>
          <div className="ht-dialog-image">
            <Image
              src={`/image/products/${current.image}.webp`}
              alt={current.alt}
              fill
              sizes="(min-width: 761px) 650px, 85vw"
            />
          </div>
          <div className="ht-dialog-caption">
            <h2 id={`${id}-dialog-title`}>{current.name}</h2>
            <Link href="/contact" className="ht-text-link">
              Discuss this transfer{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  );
}
