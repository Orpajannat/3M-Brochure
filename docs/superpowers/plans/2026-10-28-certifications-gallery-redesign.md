# Home Certifications Gallery Redesign Plan

Goal: fully redesign src/components/home/Certifications.jsx as a unique animated standards gallery, responsive at every breakpoint. Continue Tailwind-only styling in the component; remove the old style block and inline style declarations. Keep changes isolated to this component and this plan.

Direction: charcoal, warm paper, vermilion and sage; editorial heading and five-mark index; keyboard-selectable list; large luminous logo stage with rotating orbital rings, sweeping light, pointer tilt, animated panel entrances and scroll pop-ins; kinetic quality/safety/sustainability ribbon; contact action. Stable manual selection rather than auto-changing readable content. Preserve the five supplied names/logo files exactly. Label the broader collection as standards and initiatives; add no certificate numbers, validity dates, downloads, membership/certification equivalence or unsupported assurances.

Architecture: one client component, static data, useState selection and pause, useSyncExternalStore for progressive enhancement, native tab keyboard pattern, local refs/WAAPI animation with cleaned-up observers/listeners/frames. Separate decorative-motion and selection-transition effects. Pause and live reduced-motion changes stop animations and pointer tilt. Content remains readable without JavaScript; all five marks display in a static grid. No extra CSS files, dependencies or edits to other home sections.

- [x] Establish failing baseline for new gallery and motion control.
- [x] Implement responsive Tailwind gallery, preserved logo assets, accessible keyboard selection and progressive static content.
- [x] Add rich animation, pointer tilt, explicit pause/resume, reduced motion and viewport-aware loops with full cleanup.
- [x] Verify all five selections and keyboard/Home/End, logos/image decode, motion/tilt/pause/reduced updates, no-JS full collection, contact link, clean typography, focus/contrast, no styling escape hatch and home-page isolation. Check 16 widths 320-2560px and mobile/desktop screenshots. Scoped lint, build, independent final review.

Execution directly in the established workspace; preserve unrelated dirty files. Fresh read-only reviewer explicitly required by requesting-code-review skill. No commits or publication.


Completed: isolated Tailwind-only gallery in Certifications.jsx, with all original five names/logo assets, dark editorial layout, warm-paper logo stage, responsive selector grid/list, accurate responsive tab orientation, documentation contact link, orbiting rings, sweep, glow, marquee, scroll entrances and pointer tilt. Selection is stable/manual. Explicit pause/resume, live reduced-motion updates, viewport-paused loops and cleaned-up observers/listeners/frames included. No-JS displays all five marks in a readable static grid. Old style block and inline style declarations removed.

Verification: baseline failed before implementation and passed after. Scoped component ESLint and final production build passed. Full browser suite passed at 16 widths from 320 to 2560px, without horizontal overflow or clipped headings/control text. Tested each mark at four widths, logo image decoding, keyboard up/down/left/right wrapping/Home/End, correct tab orientation across the lg breakpoint, contact link, pointer tilt/reset, pause with selection still working, live reduced-motion updates, offscreen loop suspension/resumption, no-JS full collection, clean typography, Tailwind-only source and no runtime errors. Mobile/desktop screenshots inspected.

Independent review identified a possible wide-screen marquee gap. Reproduced one copy measuring 1411.17px against a 2560px viewport. Repeated the ribbon content and ensured minimum viewport width per copy; final measured copy is 4233.52px and coverage assertions pass at every tested width. Mobile selectors were compacted to keep the stage closer to its controls; selected-tab focus ring inherits the high-contrast light ring against the dark surrounding surface. No remaining material findings.

Next.js feedback reporting pass: no qualifying framework friction in this request. No feedback draft/submission, dependencies, commits or publication. No other source files edited.
