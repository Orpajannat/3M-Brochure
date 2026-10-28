# Contact Correspondence Studio Tailwind Redesign Plan

Goal: redesign Contact Us with a distinctive modern correspondence-studio design, animation and responsive layouts. Continue the user's Tailwind-only preference: no separate CSS file, no style blocks or inline styles.

Design: soft violet paper, deep ink and orchid accents; oversized hello typography, a layered animated postcard/envelope and connecting route; clear enquiry workspace with two regional office cards; short helpful native FAQ disclosures; a compact closing invitation. Preserve all existing Bangladesh/Thailand contact names, roles, exact addresses, telephone/email/map links, service options, form fields, limits, autocomplete, metadata and direct contact actions. Do not invent opening hours, live availability, response deadlines or submission confirmations.

Architecture: existing ContactHero.jsx, OfficeDetails.jsx and ContactForm.jsx rebuilt in Tailwind; add ContactMotion.jsx (WAAPI progressive animation and pause/reduced-motion/no-JS handling), ContactUi.jsx (utility constants/label), ContactNotes.jsx (native FAQ/closing). Update src/app/contact/page.js and remove the Contact.css import; old unused stylesheet can remain preserved. No changes to shared components/global CSS or dependencies.

Form: preserve native validation, whitespace checks, input clearing and mailto fallback. Valid JS submission prepares an encoded draft in-page with an explicit Open email draft link instead of launching an application immediately. Clearly state recipient Bangladesh team and that visitor sends from their own email app. Edits clear stale drafts. Preserve action=mailto with method=post/enctype=text/plain for no-JS. Tests inspect mailto payload without opening an email application or sending anything.

- [x] Establish failing baseline for page motion control/new structure.
- [x] Build all Tailwind sections with original contact information and form fields.
- [x] Implement draft preview, validations, accessible status and motion with static readable fallbacks.
- [x] Verify at 16 widths from 320 to 2560px, including breakpoint boundaries; form invalid/email/whitespace/limits and encoded valid payload, edit invalidation, keyboard focus, office links/maps, FAQs/anchors, motion pause/resume/reduced updates, no-JS form/content, no runtime/hydration errors, clean typography, no CSS imports/style blocks. Run scoped lint/build and independent final review. Inspect mobile/desktop screenshots.

Execution: direct in the established user workspace so localhost shows the redesign; no commits, publishing or external messages requested. Requesting-code-review skill explicitly authorizes one fresh read-only reviewer. Preserve unrelated edits.


Completed: correspondence-studio hero with animated postcard, orbit and route; responsive enquiry workspace; both original office cards with exact contacts/directions; three helpful native FAQs; closing invitation. Tailwind utilities only, no CSS import/style blocks/inline style declarations added. Existing unused Contact.css preserved. Form prepares a reviewable encoded email draft, edits invalidate it, and all native fields/limits/autocomplete/mailto fallback remain. No backend submission or sent confirmation implied.

Verification: baseline motion-control check failed before and passed after implementation. Scoped ESLint and final production build passed. Browser suite passed at 16 widths from 320 to 2560px without horizontal overflow or clipped headings. Verified required/email/whitespace validation, custom validity recovery, Unicode and special-character draft encoding, optional company, retained inputs, draft invalidation, keyboard focus, native limits/autocomplete, exact office phones/emails/map queries, FAQ/anchor links, entrances, pause/resume, form while paused, dynamic reduced motion, no-JS form/content/disclosures, page isolation, clean typography, Tailwind-only source and no runtime errors. No email app opened or mail sent by validation. Inspected mobile/desktop screenshots of all sections.

Independent review found the shared fields used 14px at mobile widths. Reproduced via computed browser font size, changed to 16px below the sm breakpoint, and verified the fix plus the full suite. No remaining material review findings.

Next.js feedback reporting pass: no qualifying framework friction; the label-locator test adjustment and mobile font correction were routine validation. No feedback draft or transmission. No dependencies, commits or publishing.
