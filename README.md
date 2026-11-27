# PrepKit

PrepKit is a static-friendly Next.js site with browser-based image and PDF utilities. Image processing and PDF operations run on the visitor's device; selected files are not uploaded to the app.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Included tools

- Compress an image to a chosen KB limit
- Create an A4 passport / ID photo sheet (35 × 45 mm or 2 × 2 in)
- Convert JPG, PNG, and WebP images in batches
- Turn multiple images into an A4 PDF
- Merge PDFs or extract selected page numbers / ranges
- Resize images for common social media formats

The site also includes tool-specific guides and FAQs, three target-size landing pages, four editorial articles, policy pages, a sitemap, and a robots file.

The Google AdSense loader is included site-wide using publisher ID `ca-pub-8046244432202885`. This loader alone does not create ad placements. AdSense account/site approval, ad units or Auto ads settings, consent configuration where required, and any `ads.txt` instructions from AdSense must be completed in the Google account.

The publisher authorization record is published at `/ads.txt` using the seller details supplied for this site.

## Before deployment

1. Copy `.env.example` to `.env.local` if you need to override the canonical origin. The production domain defaults to `https://www.extractkb.me`, so canonical links, social sharing URLs, structured data, `robots.txt`, and `sitemap.xml` still work if the host environment variable is unset. Set `NEXT_PUBLIC_SITE_URL` in the hosting dashboard when changing domains.
2. Set `NEXT_PUBLIC_CONTACT_EMAIL` to an email address that you monitor.
3. Review the privacy policy, terms, photo instructions, and all content for your intended audience and jurisdiction.
4. Verify every tool against your target browsers and real sample files.
5. After deployment, verify the site in Google Search Console, submit `/sitemap.xml`, and inspect key URLs. Correct technical SEO helps discovery but cannot guarantee a particular search position.

Check and build:

```bash
npm run lint
npm test
npm run build
```

The production build is exported to `out/` as static files. Deploy that folder to Cloudflare Pages (build command `npm run build`, output directory `out`) or another static host. The `public/_headers` file configures security headers, including HSTS, on Cloudflare Pages; configure equivalent headers in your host if deploying elsewhere. HSTS assumes the site is served over HTTPS. Set the environment values in the hosting dashboard before building. The app does not use a file-processing backend or database. Domain registration, analytics, and any advertising setup are separate deployment decisions.

## Important limitations

- Compressed file size is a best-effort maximum. Some images cannot meet a very small target without significant quality or dimension loss; the tool reports when this happens.
- Passport and ID photo requirements vary. The print-sheet feature sets dimensions only and does not guarantee acceptance.
- PDF support depends on browser memory and the PDF format. Password-protected or damaged PDFs may not open.
- Input files are capped at 25 MB each, 100 MB total, and 20 files per operation to reduce accidental browser memory exhaustion.
- The contact page shows `venomtracker000@gmail.com` unless `NEXT_PUBLIC_CONTACT_EMAIL` overrides it.
- The site footer credits Pahan Tharaka and links to [github.com/TharakaB4M](https://github.com/TharakaB4M).
