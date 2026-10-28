# Thermal Ribbons Print Lab Implementation Plan

Goal: rebuild all seven sections of /products/thermal-transfer-ribbons with a distinctive graphite/lime print-lab design, rich motion and responsive layouts.
Architecture: dedicated server-rendered RibbonsPage, isolated tr-* global CSS, client motion controller, filterable collection/native dialogs and keyboard specification tabs. Existing Next.js/React/lucide stack, assets and product-data remain the source of truth. No dependencies.

- [x] Establish a failing browser baseline for Ribbons/Label stock filters and four specification tabs.
- [x] Create src/components/thermal-ribbons/{RibbonsPage.jsx,RibbonsMotion.jsx,RibbonsCollection.jsx,RibbonsDetails.jsx,Ribbons.css}; update src/app/products/thermal-transfer-ribbons/page.js, preserving metadata.
- [x] Build graphite hero with lime typography, rotating CSS reels and scanning specimen; four-card collection; printhead studio; numbered enquiry brief; FAQ; related families; lime closing invitation.
- [x] Verify widths 320-2560, product filters (all4/ribbons3/stock1), four mobile previews/Escape/focus, tab keyboard, FAQ, entrances, pause/resume, reduced motion, no-JS content and links, image decode and page isolation. Run scoped lint and production build; obtain independent final review.

Content constraints: preserve all four product families, four specification details, three brief items and FAQs from product-data. Never imply automatic printer compatibility, invented dimensions, print speeds or unsupported performance. Visual reel and scanning graphics are decorative. Keyboard focus, readable contrast, no motion dependencies for access to content, no horizontal overflow. Motion controller uses transform/opacity and IntersectionObserver; pause and reduced-motion stop loops/transitions. Existing workspace and server preserved, no commits or external publication requested.

Design decision: build directly within the established project and use the existing actual product images. The print-lab direction is the implementer's visual choice under the user's ongoing request to redesign each linked product page with unique modern motion.


Completed and verified: all seven sections rebuilt; canonical product content, metadata and links preserved. Scoped ESLint and production build passed. Browser suite passed at 16 widths from 320 to 2560px, with no overflow or clipped headings. All four previews, filters, keyboard tabs, FAQ, scroll entrances, pause/resume, paused interactions, dynamic reduced motion, image decoding, no-JS content, and other-page isolation passed without runtime errors. Fresh post-build hydration/typography/control smoke passed in both motion modes. Independent read-only review found no remaining material issues.

During validation, a stale development transform supplied unrelated component source to the CSS loader. Restarting the development server with a fresh generated cache restored correct output. The temporary old cache backup was removed by the subsequent production build. Corrected six text-encoding replacement characters and one decorative arrow; dedicated typography check failed before and passed after UTF-8 correction. The existing development URL is running on port 3000. No dependencies, commits or publication.
