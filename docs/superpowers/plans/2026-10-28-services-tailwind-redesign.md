# Services Studio Tailwind Redesign Plan

Goal: redesign all eight /services sections with a unique modern editorial studio direction and responsive layouts, using Tailwind utilities in components and no separate stylesheet.

Design: warm ivory, charcoal, muted sage, red accents; oversized typography; layered production photography and floating service tickets; six-service asymmetric overview; production tabs; five-step EDI workflow; quality feature; delivery-route disclosures/diagram; FAQ; bold contact invitation. Existing service content, metadata, anchor targets and contact actions remain useful. Preserve the brochure's qualified turnaround wording, laser SKU minimum scope, printing capabilities and distribution options; do not add performance promises or simulated tracking statuses.

Files: rewrite existing services components (ServicesHero, ServicesOverview, ProductionCapabilities, ServiceProcess, QualityControl, Distribution, ServicesFaq, ServicesCta, ServicesMotion, SectionHeading) and remove Services.css import in src/app/services/page.js. No global stylesheet changes, dependencies, new font downloads, commits or publication. The obsolete Services.css may remain unused to preserve the prior styles; the redesigned route must not load it. All styling uses Tailwind. Web Animations API supplies custom loop and entrance motion without CSS keyframes/style blocks; Tailwind supplies responsive/focus/hover/reduced-motion states.

- [x] Establish a failing baseline for the new motion control and redesign structure.
- [x] Implement all eight Tailwind sections with preserved content, accessible keyboard production tabs, native delivery/FAQ disclosures and contact links.
- [x] Add progressive entrance/live motion with pause, reduced-motion updates, cleanup, and static readable no-JS content.
- [x] Verify eight sections and six overview services, three production panels/keyboard, delivery disclosures, FAQs, links and images; responsiveness at 16 widths from 320 to 2560px; no overflow, clipping, runtime/hydration errors or broken typography; no CSS import/style block added; pause/reduced motion/no-JS behavior. Run scoped lint and production build. Obtain independent final review.

Execution: perform implementation directly in the existing user-requested workspace so localhost shows the result. Use a fresh final reviewer as explicitly required by the requesting-code-review skill. Keep unrelated workspace edits intact.


Completed: eight sections rebuilt in Tailwind utilities, no separate stylesheet added/imported and no component style blocks or inline style declarations. The old Services.css remains unused; global styles and other pages were preserved. WAAPI provides floating tickets, rotating motifs, marquee, animated delivery paths and scroll entrances. Three production tabs support arrows/Home/End and show all content without JavaScript. Native delivery and FAQ disclosures work without JavaScript. Contact, anchor targets, metadata and existing service descriptions remain.

Validation: baseline motion-control check failed before implementation and passed after. Scoped ESLint and final production build passed. Complete browser suite passed eight sections/six services, 16 widths from 320 to 2560px without overflow/clipped headings, production keyboard interactions, delivery and five FAQ disclosures, contact/anchor links, entrances, pause/resume, paused controls, dynamic reduced motion, image decoding, no-JS content, other-page isolation, UTF-8 text, Tailwind-only source, and no browser runtime errors. Final source responsive/hydration/typography check passed after visual adjustments.

Independent review identified primary CTA contrast and dark-card focus contrast. Both were reproduced in the browser, corrected, and verified at 5.18:1 and 8.64:1 respectively. Also increased contrast on small service indices. Hero caption/ticket overlap was reproduced and corrected; no overlaps at 320, 375, 768, 1024 or 1440px. Final screenshots inspected at 320/375/1440px. No material review findings remain.

Next.js feedback reporting pass: no qualifying framework friction in this request; routine JSX lint and layout corrections only. No report drafted or submitted. No dependencies, commits or publishing.
