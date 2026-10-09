# Analytics Setup — Google Tag Manager + GA4

The website is already instrumented for analytics. No page-by-page code changes are required.

## What is already implemented

- Central dataLayer on every page through assets/js/site.js
- GTM loader that only runs on the production domains:
  - realestatewithriteshbatra.com
  - www.realestatewithriteshbatra.com
- Analytics stays completely off on the GitHub Pages staging hostname
- Consent banner appears only when a valid GTM container ID is configured
- GTM loads only after the visitor selects **Accept analytics**
- Decline is respected and stored in the browser
- No names, emails, phone numbers, form values or property addresses are intentionally sent to the dataLayer

### Custom events already emitted

- rb_phone_click
- rb_email_click
- rb_whatsapp_click
- rb_book_consultation
- rb_search_homes_click
- rb_review_click
- rb_social_click
- rb_market_guide_click
- rb_outbound_click
- rb_scroll_75
- rb_engaged_60s
- rb_consent_update

Common event parameters:
- page_path
- page_title
- cta_text
- destination

Additional parameters:
- scroll_percent on rb_scroll_75
- engagement_seconds on rb_engaged_60s
- analytics_consent on rb_consent_update

## One website code step after you create GTM

Open assets/js/site.js and replace:

```
gtmId:'GTM-REPLACE_ME'
```

with your actual Google Tag Manager container ID, for example:

```
gtmId:'GTM-ABC1234'
```

Do not add a separate GTM snippet to each HTML page. The central loader already handles the container.

## Google Analytics 4 setup

1. Go to analytics.google.com.
2. Create or select the correct Analytics account.
3. Create a GA4 property:
   - Property name: Real Estate With Ritesh Batra
   - Reporting time zone: Canada / Toronto
   - Currency: CAD
   - Business objective: Leads / Generate leads
4. Create a Web data stream:
   - Website URL: https://www.realestatewithriteshbatra.com
   - Stream name: realestatewithriteshbatra.com
   - Keep Enhanced Measurement enabled.
5. Copy the Measurement ID beginning with G-.

## Google Tag Manager setup

1. Go to tagmanager.google.com.
2. Create an account/container if one does not already exist:
   - Account: Real Estate With Ritesh Batra
   - Container: realestatewithriteshbatra.com
   - Target platform: Web
3. Copy the container ID beginning with GTM- and place it in assets/js/site.js as described above.
4. In GTM create a new **Google tag**:
   - Tag ID: your GA4 G- measurement ID
   - Trigger: Initialization - All Pages
5. Save.

Because the website does not load GTM until analytics consent is granted, the Google tag cannot fire before consent.

## GTM variables

Create these Data Layer Variables:

| Variable name | Data Layer Variable Name |
|---|---|
| DLV - page_path | page_path |
| DLV - page_title | page_title |
| DLV - cta_text | cta_text |
| DLV - destination | destination |
| DLV - scroll_percent | scroll_percent |
| DLV - engagement_seconds | engagement_seconds |

## GTM event tags

For each event below, create a Google Analytics event tag using the GA4 Google tag and a Custom Event trigger whose event name exactly matches the website event.

### Lead-intent events

1. rb_book_consultation
2. rb_phone_click
3. rb_whatsapp_click
4. rb_email_click
5. rb_search_homes_click

Recommended parameters:
- page_path = {{DLV - page_path}}
- page_title = {{DLV - page_title}}
- cta_text = {{DLV - cta_text}}
- destination = {{DLV - destination}}

### Supporting engagement events

- rb_review_click
- rb_social_click
- rb_market_guide_click
- rb_outbound_click
- rb_scroll_75
- rb_engaged_60s

For rb_scroll_75 add:
- scroll_percent = {{DLV - scroll_percent}}

For rb_engaged_60s add:
- engagement_seconds = {{DLV - engagement_seconds}}

## GA4 key events

After the events begin appearing in GA4, mark these as Key Events:

- rb_book_consultation
- rb_phone_click
- rb_whatsapp_click
- rb_email_click
- rb_search_homes_click

Do not mark generic scroll, social, review or outbound clicks as key events.

## Recommended reports

Create/report on:
- Leads by source / medium
- Landing page by lead-intent event
- Market guide page engagement
- Search Homes clicks by landing page
- Calendly clicks by landing page
- WhatsApp and phone clicks by device category
- Organic Search traffic by local-market page

## Testing before publish

Use GTM Preview / Tag Assistant.

Verify:
1. No GTM request occurs on the GitHub Pages staging hostname.
2. On production, before consent, GTM is not loaded.
3. Click Decline: GTM remains unloaded.
4. Clear site data, reload, click Accept analytics: GTM loads.
5. Verify a page view reaches GA4.
6. Test Call, WhatsApp, Book Consultation, Search Homes and Email.
7. Confirm the correct rb_* custom event appears in Preview and GA4 DebugView/Realtime.
8. Confirm no PII appears in event parameters.
9. Publish the GTM container only after all tests pass.

## Production status

Until the placeholder GTM ID is replaced with a real GTM- ID, analytics remains disabled.
