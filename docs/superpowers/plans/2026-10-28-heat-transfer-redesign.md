# Heat-transfer studio redesign

Replace the shared /products/heat-transfer-labels presentation with a dedicated seven-section heat studio. Keep existing metadata, product data, contact/service links, related categories, and other pages intact.

Visual direction: warm paper, burgundy ink, brand red and hot coral. Oversized typographic hero; garment application photography with animated peel film, scan and orbit; moving ribbon; dark interactive four-product gallery with keyboard tabs and native image dialog; production/application details; large numbered brief rows; FAQ; related products; bold final invitation.

Files: HeatTransferPage.jsx (server sections), HeatMotion.jsx (scroll reveals, continuous motion controls, pointer movement, scroll progress), HeatShowcase.jsx (keyboard gallery and image dialog), HeatTransfer.css (namespaced styles and responsive motion). Route imports dedicated page. No new dependencies.

Implementation and verification:
1. Baseline browser check must fail for new gallery tabs.
2. Build all seven sections from existing content and photography; enhance motion only when JavaScript is available.
3. Add scanner, film peel, kinetic ribbon, orbit, pointer tilt, staggered spring entrances, dialog and gallery transitions. Pause and reduced-motion stop effects while retaining usable controls.
4. Validate keyboard gallery, all product content, image dialog Escape/focus restoration, paused interactions, FAQ, links, no-JavaScript content, reduced motion, and browser errors.
5. Check breakpoints from 320px to 2560px, image loading, unrelated page isolation, changed-file lint and production build. Independent code review before handover.

Validation completed:
- Changed-file ESLint and production build pass.
- Browser checks pass at 320, 375, 560, 561, 760, 761, 900, 901, 1000, 1001, 1024, 1440, 1920, and 2560px: seven sections, no horizontal overflow or clipped headings.
- Four gallery formats, arrow/Home/End navigation, mobile sample dialogs, Escape dismissal, focus restoration, FAQ keyboard controls, loaded images, scroll entrances, pause/resume, paused dialogs and dynamic reduced motion pass.
- Without JavaScript, all four product panels are visible and accessible; inert controls are hidden.
- Other labels and paper product page presentations remain isolated. No browser errors.
- Independent code review identified body text contrast and the static gallery fallback; both are corrected and verified.
