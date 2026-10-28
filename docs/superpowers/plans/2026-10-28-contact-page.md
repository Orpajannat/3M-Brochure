# Contact Page Implementation Plan

Goal: Build a compact Contact Us page with two main sections, brochure office details, tasteful animation, and responsive layouts.

- [x] Add a short hero and Bangladesh/Thailand office cards in src/components/Contact.
- [x] Add an accessible enquiry form that validates required name/email/message and prepares an email draft. Explain email-app behavior and never claim delivery.
- [x] Add namespaced CSS compatible with the existing Tailwind Turbopack loader. Support mobile stacking, keyboard focus, and reduced motion.
- [x] Verify form validation/draft contents, phone/email/maps links, no-JavaScript fallback, and layouts at 320/375/768/1024/1440 pixels; run scoped ESLint and build.

Use brochure page 11 for office details. Existing Footer.jsx prerender date issue is outside this change. Do not edit unrelated user work.

Validation: Scoped ESLint passed. Headless browser checks passed at 320, 375, 640, 768, 900, 1024, 1440, and 1920 pixels with no horizontal overflow. Required-field, whitespace, malformed email, actual mailto recipient/subject/body, CRLF formatting, special characters, status reset, office links, reduced-motion, and no-JavaScript fallback checks passed. Reviewed desktop and mobile screenshots. Code review found one email formatting issue; reproduced and fixed it. Existing Footer.jsx date prerender issue remains outside scope.
