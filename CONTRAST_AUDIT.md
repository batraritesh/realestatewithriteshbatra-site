# Contrast Audit
Date: 2026-10-05
Scope: all 19 HTML pages in the GitHub Pages staging site.

## Method
Code-level WCAG contrast audit of the shared stylesheet and all HTML pages. All 19 pages reference the same site.css and contain no inline style attributes. Text/background combinations used by the site were tested against the WCAG AA 4.5:1 threshold for normal text. Decorative borders are not treated as text contrast.

## Results
- Body text (#191817) on page background (#f7f3ee): 16.05:1 — PASS
- Muted text (#66615c) on page background (#f7f3ee): 5.54:1 — PASS
- Burgundy text (#68192f) on page background (#f7f3ee): 10.75:1 — PASS
- Card body text (#55514d) on white: 7.86:1 — PASS
- Footer text (#5b5652) on white: 7.25:1 — PASS
- Legal text (#706a64) on white: 5.34:1 — PASS
- White text on burgundy CTA (#68192f): 11.87:1 — PASS
- Light eyebrow (#f1c9d4) on dark proof background (#201f1e): 11.01:1 — PASS
- Proof body (#e8e3dc) on dark proof background: 12.89:1 — PASS
- Proof links (#f2cad4) on dark proof background: 11.11:1 — PASS
- Dark-section source text (#d9d3cd) on dark proof background: 11.09:1 — PASS
- Review stars (#8a5b00) on white: 5.87:1 — PASS

## Correction made
Fine-print text previously used #746e68, which measured only 4.56:1 on the page background. It was changed to the shared muted color #66615c, increasing contrast to 5.54:1.

## Page coverage
404, Home, About, Results, Reviews, Buyers, Sellers, Contact, Burlington, Oakville, Halton Region, Mississauga, Hamilton, Durham Region, Waterloo Region, Privacy, Terms, Disclaimer, Accessibility.

Note: this is a source/CSS contrast audit. A final production browser audit should still be run after the custom domain is live because third-party rendered content and browser/platform differences are outside the static source audit.
