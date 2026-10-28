# ShieldPick: Norton vs McAfee comparison site

"ShieldPick" is a sample brand name. Replace it across all `.html` files (`grep -rl ShieldPick *.html`) with the client's brand.

Static HTML/CSS/JS. No build step. Deploy the folder as-is (Cloudflare Pages, Netlify, Vercel, any static host).

## Before launch

1. **Placeholders**: find and replace across all `.html` files:
   `Norton 360`, `{{DOMAIN}}`, `{{COMPANY_LEGAL_NAME}}`, `{{STREET_ADDRESS}}`, `{{CITY}}`, `{{STATE}}`, `{{ZIP}}`,
   `{{EMAIL}}`, `{{EFFECTIVE_DATE}}`, `{{LAST_CHECKED_DATE}}`, `{{RETENTION_PERIOD}}`, `{{GOVERNING_STATE}}`
   ```sh
   grep -rho '{{[A-Z_]*}}' *.html | sort -u   # list what's left
   ```
2. **Affiliate links**: set `OFFERS` at the top of `assets/main.js`. Every `data-offer` button picks it up and gets `rel="sponsored nofollow"`.
3. **Prices and features** in `index.html` (deal cards, comparison table, feature rows) are SAMPLE data. Verify against norton.com and mcafee.com before going live.
   The guide cards link to `#`; point them at real guide pages.
4. **Contact form**: set the `action` on `#contact-form` in `contact.html` (Formspree, Netlify Forms, etc.).
5. **Analytics and ads**: add the Google tag and a consent banner where the TODO is in `<head>`.
6. Have a lawyer review the legal pages. They're templates.

## Ads compliance notes

- Don't bid on "Norton" or "McAfee" keywords, or use them in ad text, unless the affiliate program allows it in writing.
- Don't add a phone number as a CTA, or words like "support", "install help" or "activation". Google restricts third-party tech support for consumers.
- Don't use vendor logos without permission. Don't add fake reviews, star ratings, countdown timers or "virus detected" claims.

## Photo credits

All photos are from [Pexels](https://www.pexels.com/license/) (free for commercial use, attribution not required), resized and converted to WebP in `assets/img/`.

| File | Source |
|---|---|
| hero-family.webp | https://www.pexels.com/photo/mother-and-daughter-using-a-laptop-6249927/ |
| sofa-laptop.webp | https://www.pexels.com/photo/cheerful-mother-working-on-laptop-near-daughter-on-couch-4473899/ |
| kids-tablets.webp | https://www.pexels.com/photo/little-black-kids-using-tablets-on-couch-at-home-4545970/ |
| cafe-phone.webp | https://www.pexels.com/photo/smiling-young-asian-woman-with-smartphone-having-coffee-break-in-street-cafe-4350178/ |
| card-laptop.webp | https://www.pexels.com/photo/person-holding-credit-card-doing-online-shopping-6995252/ |
| guide-seniors.webp | https://www.pexels.com/photo/senior-couple-smiling-and-using-a-laptop-6975184/ |
| guide-living-room.webp | https://www.pexels.com/photo/mother-and-son-sitting-in-the-living-room-4624878/ |
| guide-home-office.webp | https://www.pexels.com/photo/man-working-on-laptop-at-home-office-16323455/ |
