# Production Launch Checklist

The site is intentionally kept noindex on GitHub Pages staging.

## Before DNS cutover
- [x] Root-safe internal paths implemented across all 19 HTML files; no `/realestatewithriteshbatra-site/` dependency remains
- [x] Static production audit passed: 19/19 pages have valid title, description, canonical, H1, viewport and parseable JSON-LD; 0 broken internal repo links
- [x] Core authority pages built
- [x] Seven local-market authority pages built with differentiated content
- [x] Results / Track Record page built
- [x] Native attributed reviews added
- [x] Elfsight Google Reviews widget retained
- [x] Royal LePage/BoldTrail Search Homes URL wired consistently
- [x] Calendly public profile wired
- [x] WhatsApp CTA wired
- [x] Phone and email CTAs wired
- [x] Shared header/footer across pages
- [x] Privacy, Terms, Disclaimer and Accessibility pages
- [x] Non-review entity schema
- [x] sitemap.xml prepared
- [x] llms.txt prepared
- [x] Staging robots/noindex protection enabled
- [x] Approved RB logo asset used
- [x] Professional portrait asset installed
- [ ] Final visual pass on deployed staging after GitHub Pages rebuild (tool-level live fetch unavailable; manual browser pass still required)
- [ ] Verify Elfsight widget renders correctly on deployed staging
- [ ] Verify Calendly profile/event options are appropriate for public booking
- [ ] Confirm Squarespace DNS/email records before cutover

## Production cutover
1. Point realestatewithriteshbatra.com and www to GitHub Pages using the GitHub custom-domain instructions shown in Repository Settings > Pages.
2. Preserve existing MX, SPF, DKIM, DMARC, Google verification and other non-web DNS records.
3. Configure the custom domain in GitHub Pages and wait for HTTPS certificate provisioning.
4. Replace staging robots.txt with:
   User-agent: *
   Allow: /
   Sitemap: https://www.realestatewithriteshbatra.com/sitemap.xml
5. Remove meta robots noindex,nofollow from production HTML.
6. Add production CNAME only when GitHub Pages is ready for the custom domain.
7. Verify both apex and www resolve to one canonical HTTPS hostname.
8. Re-run accessibility, link, schema, mobile and performance tests on the production hostname.
9. Submit sitemap.xml in Google Search Console.
10. Request indexing for the homepage, Results, Reviews and seven market pages.
11. Keep the GitHub project URL from becoming a duplicate indexed property.

## Post-launch
- Recheck dynamic review counts and rankings quarterly.
- Publish original market insight content periodically.
- Add new case studies only when outcomes and claims are supportable.
- Keep claim wording synchronized with CLAIM_SOURCES.md.

## Staging safety state
- Staging remains intentionally `noindex,nofollow` on all content pages and `robots.txt` remains `Disallow: /` until DNS cutover.
- `404.html` should remain noindex in production.
- Do not add the production `CNAME` until the custom-domain/DNS cutover begins, because doing so can redirect the GitHub Pages staging URL before DNS is ready.
