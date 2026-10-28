# Product Category Pages Implementation Plan

Goal: Build Labels and all six product submenu category pages with several responsive, animated sections and brochure-grounded product content.

Routes: /products, /products/labels, /products/heat-transfer-labels, /products/paper-items, /products/narrow-items, /products/poly-bags-lock-strings, /products/thermal-transfer-ribbons. Preserve the existing /labels route and src/components/labels folder.

Architecture: One shared server-rendered category layout with distinct category data and photographs. Focused components own the hero/navigation, product range, options, enquiry preparation, FAQ, related products, and CTA. Namespaced CSS works with the existing Tailwind loader; no runtime dependencies added. Use semantic links/details, CSS entry/hover effects, and reduced-motion support.

- [x] Extract optimized product photographs from brochure pages 4–9.
- [x] Add category-specific data from brochure pages 2–9, without invented performance claims or unsupported technical specifications.
- [x] Build shared product sections plus Labels component in the existing folder; create explicit routes and Products overview.
- [x] Link existing homepage product cards to the relevant new routes and replace their broken contact anchor.
- [x] Verify all categories, navigation, images, FAQ behavior, contact links, alias, reduced motion, no-JS, and 320–1920px layouts; run lint, compilation, and code review.

Keep unrelated user edits intact. Full production prerender currently fails at the existing Footer.jsx new Date call; report separately if unchanged.

## Validation
- Scoped ESLint passed for product components, all routes, Labels alias, and homepage product links.
- All six categories: HTTP 200, distinct metadata, seven sections, four gallery items, three related categories, loaded images, FAQ pointer/keyboard, encoded product enquiry links, and valid anchors passed.
- All six layouts passed at 320, 375, 640, 768, 900, 1024, 1440, and 1920 pixels without horizontal overflow.
- Products overview, existing /labels route, desktop hover dropdown, mobile submenu, category navigation, related links, homepage links, reduced motion, and JavaScript-disabled content/FAQ passed.
- Inspected desktop/mobile screenshots and refined paper collection crop. 26 optimized brochure assets total approximately 710 KiB.
- Read-only code review found no actionable defects. Production compilation succeeded; prerender remains blocked by the existing Footer.jsx:91 new Date() call.
