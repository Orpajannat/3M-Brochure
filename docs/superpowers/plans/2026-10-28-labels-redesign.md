# Labels page redesign

Goal: Replace every section of the shared labels category presentation with a dedicated, responsive, animated labels studio.

Design: Ink, warm paper, brand red, and mint accents drawn from the existing label photography. Oversized typography, a floating sample composition, moving ribbon, editorial product gallery, interactive weave selector, staggered brief cards, animated native FAQ disclosures, related product cards, and a large closing invitation.

Files:
- LabelsPage.jsx: server-rendered sections and existing product data, breadcrumbs, category navigation, related products, contact links.
- LabelsMotion.jsx: enhanced scroll reveals, pointer tilt, scroll progress, pause control, reduced-motion handling and cleanup.
- LabelsCollection.jsx: product gallery and accessible native product detail dialog.
- LabelsWeaves.jsx: keyboard-accessible weave tabs using the existing four weave choices.
- Labels.css: namespaced responsive layouts and animations; no dependencies or shared style changes.

Steps:
1. Verify new motion and product dialog interactions are absent in the existing page using a temporary browser check.
2. Implement all sections using existing product copy and images. Keep other product categories unchanged.
3. Add live float, ribbon, orbit, scanning, hover and staggered pop effects, with an obvious motion pause button and reduced-motion support. Keep content visible without JavaScript.
4. Verify product dialogs (including Escape/focus return), weave tabs, FAQ, pause/resume, links, loaded images and reduced motion in a real browser.
5. Check 320, 375, 560, 768, 900, 1024, 1440, 1920 and 2560px layouts for overflow and clipping. Check production build and lint for changed files; report existing repository lint failures separately.

Validation completed:
- Production build passes for all routes.
- ESLint passes for all four labels JSX components.
- Browser layout checks pass at 320, 375, 560, 561, 640, 760, 761, 768, 900, 901, 1024, 1440, 1920 and 2560px: seven sections, no page overflow or clipped headings.
- All four product dialogs pass on mobile, including correct content, viewport fit, paused visibility, Escape dismissal and focus restoration.
- Weave tabs pass arrow keys, Home and End; FAQ disclosures pass keyboard activation.
- Scroll reveals, live animation pause/resume, dynamic reduced-motion handling, loaded images and content without JavaScript pass browser checks.
- Other product categories retain their shared presentation. Independent code review found no material issues.
