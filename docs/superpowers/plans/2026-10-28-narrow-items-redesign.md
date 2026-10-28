# Narrow items textile-workbench redesign

Build a dedicated seven-section /products/narrow-items page. Preserve existing category metadata, four accessory families, content, enquiry/service links and related products. Do not change other pages.

Direction: forest green, warm ivory and lime; bold typography; floating elastic/drawstring specimens with animated SVG thread paths and textile strips; moving ribbon; native product accordion with accessible sample dialogs; keyboard specification tabs and animated drawstring study; brief steps; native FAQ; related products; large closing invitation.

Files: NarrowItemsPage.jsx (server sections), NarrowMotion.jsx (enhanced scroll/pointer motion and pause), NarrowCollection.jsx (native product accordion and dialog), NarrowDetails.jsx (specification tabs), NarrowItems.css (namespaced responsive motion), narrow-items route. No new dependencies.

Steps: baseline browser check for new product accordion; implement all sections; add motion and interaction with pause/reduced-motion handling; retain static content and native accordion/enquiry behavior without JS. Validate 320?2560px layouts, accordion keyboard, dialogs/Escape/focus return, tab keyboard, FAQ, scroll entrances, pause/resume, reduced motion, images and no-JS content; run changed-file lint, production build and independent code review.

Validation completed:
- Changed-file ESLint passes for all four components and the route.
- Production build passes.
- Browser layouts pass at 320, 375, 560, 561, 640, 641, 760, 761, 900, 901, 1000, 1001, 1024, 1440, 1920 and 2560px: seven sections, no horizontal overflow or clipped headings.
- All native accessory disclosures, four mobile product dialogs, Escape/focus return, specification tabs/Arrow/Home/End, FAQ keyboard controls, scroll entrances, pause/resume, paused controls, dynamic reduced motion and loaded images pass.
- Without JavaScript, native grouped disclosures and enquiry links work; all four specification panels are accessible and motion is disabled.
- Paper and heat-transfer pages remain isolated. No browser errors.
- Independent review findings on hover and keyboard-focus contrast are corrected. Browser checks confirm final focus colors/specificity and disclosure icon spacing at 320px.
