# Norton vs McAfee comparison site

Static HTML/CSS/JS. No build step. Deploy the folder as-is (Cloudflare Pages, Netlify, Vercel, any static host).

## Before launch

1. **Placeholders**: find and replace across all `.html` files:
   `MADDY`, `{{DOMAIN}}`, `{{COMPANY_LEGAL_NAME}}`, `{{STREET_ADDRESS}}`, `{{CITY}}`, `{{STATE}}`, `{{ZIP}}`,
   `{{EMAIL}}`, `{{EFFECTIVE_DATE}}`, `{{LAST_CHECKED_DATE}}`, `{{RETENTION_PERIOD}}`, `{{GOVERNING_STATE}}`
   ```sh
   grep -rho '{{[A-Z_]*}}' *.html | sort -u   # list what's left
   ```
2. **Affiliate links**: set `OFFERS` at the top of `assets/main.js`. Every `data-offer` button picks it up and gets `rel="sponsored nofollow"`.
3. **Prices and features** in `index.html` are SAMPLE data. Verify against norton.com and mcafee.com.
4. **Contact form**: set the `action` on `#contact-form` in `contact.html` (Formspree, Netlify Forms, etc.).
5. **Analytics and ads**: add the Google tag and a consent banner where the TODO is in `<head>`.
6. Have a lawyer review the legal pages. They're templates.

## Ads compliance notes

- Don't bid on "Norton" or "McAfee" keywords, or use them in ad text, unless the affiliate program allows it in writing.
- Don't add a phone number as a CTA, or words like "support", "install help" or "activation". Google restricts third-party tech support for consumers.
- Don't use vendor logos without permission. Don't add fake reviews, star ratings, countdown timers or "virus detected" claims.
