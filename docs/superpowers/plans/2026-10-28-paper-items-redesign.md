# Paper atelier redesign

Scope: dedicated seven-section page for /products/paper-items; preserve metadata, existing product data, contact/service links and category navigation; isolate other category pages.

Design: lavender, warm paper, black ink, brand red; typographic hero with floating hangtags and print crop marks; kinetic paper ribbon; four-product editorial gallery with All/Tags/Packaging filters and native product dialogs; interactive print/variable data/paper/prepress studio; numbered brief, native FAQ disclosures, related cards, oversized closing invitation.

Files: PaperItemsPage.jsx, PaperMotion.jsx, PaperCollection.jsx, PaperPrintStudio.jsx, PaperItems.css; update the paper-items route. No dependencies or shared page changes.

Implementation: first check new filters are absent; create server sections; add keyboard-accessible filters/tabs, dialogs and enhanced scroll reveals; animate tag sway, layer movement, ink registration, scrolling type, pointer tilt and pop-ins; provide pause and reduced-motion support. Without JS, expose all product content and process panels and disable motion.

Validation: changed-file lint, production build, real-browser responsive checks 320?2560px, filters, all product pop-ups, Escape and focus restoration, process tab keys, FAQ, pause/resume, reduced motion, image loading, no-JS content and isolation of existing label/heat-transfer pages; independent code review.

Validation completed:
- Production build and ESLint for all changed components/route pass.
- Browser layout checks pass at 320, 375, 560, 561, 640, 641, 760, 761, 900, 901, 1000, 1001, 1024, 1440, 1920, and 2560px: seven sections, no horizontal overflow or clipped headings.
- All collection filters, four mobile product dialogs, Escape/focus restoration, print-studio tabs/Arrow/Home/End navigation, FAQ controls, entrance effects, pause/resume, paused dialogs/tabs, dynamic reduced motion and loaded images pass.
- No-JavaScript rendering exposes four product cards and four production panels with static content and working enquiry links.
- Labels and heat-transfer pages remain isolated. No browser errors.
- Independent review found no material issues.
