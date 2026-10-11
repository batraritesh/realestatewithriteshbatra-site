(function(){
  const b=document.querySelector('[data-menu]'),n=document.querySelector('[data-nav]');
  if(b&&n){
    b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus();}});
  }

  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};

  const RB_ANALYTICS={
    gtmId:'GTM-NNVWK5MD',
    consentKey:'rb_privacy_preferences_v2',
    legacyConsentKey:'rb_analytics_consent_v1',
    productionHosts:['realestatewithriteshbatra.com','www.realestatewithriteshbatra.com']
  };

  // Google Consent Mode v2: optional storage is denied until the visitor chooses.
  gtag('consent','default',{
    analytics_storage:'denied',
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    functionality_storage:'granted',
    security_storage:'granted',
    wait_for_update:500
  });

  function rbPush(event,params){
    window.dataLayer.push(Object.assign({event:event,page_path:location.pathname,page_title:document.title},params||{}));
  }

  function rbIsProduction(){
    return RB_ANALYTICS.productionHosts.indexOf(location.hostname.toLowerCase())!==-1;
  }

  function rbValidGtm(){
    return /^GTM-[A-Z0-9]+$/i.test(RB_ANALYTICS.gtmId)&&RB_ANALYTICS.gtmId!=='GTM-REPLACE_ME';
  }

  function rbReadPreferences(){
    try{
      const raw=localStorage.getItem(RB_ANALYTICS.consentKey);
      if(raw){
        const parsed=JSON.parse(raw);
        if(typeof parsed.analytics==='boolean'&&typeof parsed.external==='boolean') return parsed;
      }
    }catch(e){}
    return null;
  }

  function rbWritePreferences(prefs){
    try{localStorage.setItem(RB_ANALYTICS.consentKey,JSON.stringify(prefs));}catch(e){}
  }

  function rbLoadGtm(){
    if(window.__rbGtmLoaded||!rbIsProduction()||!rbValidGtm()) return;
    window.__rbGtmLoaded=true;
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    const s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(RB_ANALYTICS.gtmId);
    document.head.appendChild(s);
  }

  function rbApplyGoogleConsent(prefs){
    gtag('consent','update',{
      analytics_storage:prefs.analytics?'granted':'denied',
      ad_storage:'denied',
      ad_user_data:'denied',
      ad_personalization:'denied',
      functionality_storage:'granted',
      security_storage:'granted'
    });
    if(prefs.analytics) rbLoadGtm();
  }

  function rbLoadExternalContent(){
    if(window.__rbExternalContentLoaded) return;
    const elfsight=document.querySelector('[data-rb-external-widget="elfsight"]');
    if(!elfsight) return;
    window.__rbExternalContentLoaded=true;
    const s=document.createElement('script');
    s.src='https://elfsightcdn.com/platform.js';
    s.async=true;
    document.head.appendChild(s);
    const placeholder=document.querySelector('[data-rb-external-placeholder]');
    if(placeholder) placeholder.hidden=true;
  }

  function rbApplyPreferences(prefs,source){
    rbWritePreferences(prefs);
    rbApplyGoogleConsent(prefs);
    if(prefs.external) rbLoadExternalContent();
    rbPush('rb_consent_update',{
      analytics_consent:prefs.analytics?'granted':'denied',
      external_content_consent:prefs.external?'granted':'denied',
      consent_source:source||'preference'
    });
    document.querySelectorAll('[data-rb-consent-ui]').forEach(el=>el.remove());
  }

  function rbButton(label,className,handler){
    const button=document.createElement('button');
    button.type='button';
    button.className=className;
    button.textContent=label;
    button.addEventListener('click',handler);
    return button;
  }

  function rbPreferencesDialog(){
    document.querySelectorAll('[data-rb-consent-ui]').forEach(el=>el.remove());
    const current=rbReadPreferences()||{analytics:false,external:false};

    const overlay=document.createElement('div');
    overlay.className='rb-consent-overlay';
    overlay.setAttribute('data-rb-consent-ui','');
    overlay.setAttribute('role','presentation');

    const panel=document.createElement('div');
    panel.className='rb-consent-panel';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','true');
    panel.setAttribute('aria-labelledby','rb-consent-title');
    panel.innerHTML='<h2 id="rb-consent-title">Privacy choices</h2><p>Essential site functions stay on. Choose whether to allow analytics and third-party review content.</p>';

    const essential=document.createElement('div');
    essential.className='rb-consent-row';
    essential.innerHTML='<div><strong>Essential</strong><span>Required for basic site operation and security.</span></div><span class="rb-consent-required">Always on</span>';

    const analytics=document.createElement('label');
    analytics.className='rb-consent-row';
    analytics.innerHTML='<div><strong>Analytics</strong><span>Google Tag Manager / GA4 help us understand site usage and lead-intent actions.</span></div><input type="checkbox" data-rb-pref-analytics>';

    const external=document.createElement('label');
    external.className='rb-consent-row';
    external.innerHTML='<div><strong>External review content</strong><span>Loads the third-party Google Reviews widget on the Reviews page.</span></div><input type="checkbox" data-rb-pref-external>';

    panel.appendChild(essential);
    panel.appendChild(analytics);
    panel.appendChild(external);

    const actions=document.createElement('div');
    actions.className='rb-consent-actions';
    actions.appendChild(rbButton('Save choices','rb-consent-primary',()=>{
      rbApplyPreferences({
        analytics:analytics.querySelector('input').checked,
        external:external.querySelector('input').checked
      },'manage');
    }));
    actions.appendChild(rbButton('Accept all','rb-consent-secondary',()=>rbApplyPreferences({analytics:true,external:true},'accept_all')));
    actions.appendChild(rbButton('Reject optional','rb-consent-link',()=>rbApplyPreferences({analytics:false,external:false},'reject_optional')));
    panel.appendChild(actions);

    const privacy=document.createElement('p');
    privacy.className='rb-consent-privacy';
    privacy.innerHTML='<a href="/privacy/">Read the privacy policy</a>';
    panel.appendChild(privacy);

    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    analytics.querySelector('input').checked=current.analytics;
    external.querySelector('input').checked=current.external;
    panel.querySelector('button').focus();
  }

  function rbBanner(){
    if(!rbIsProduction()||rbReadPreferences()) return;
    const wrap=document.createElement('div');
    wrap.className='rb-consent-banner';
    wrap.setAttribute('data-rb-consent-ui','');
    wrap.setAttribute('role','dialog');
    wrap.setAttribute('aria-label','Privacy preferences');

    const copy=document.createElement('div');
    copy.innerHTML='<strong>Privacy preferences</strong><span>We use optional analytics and third-party review content only with your permission. Essential site functions remain on.</span>';

    const actions=document.createElement('div');
    actions.className='rb-consent-banner-actions';
    actions.appendChild(rbButton('Accept all','rb-consent-primary',()=>rbApplyPreferences({analytics:true,external:true},'accept_all')));
    actions.appendChild(rbButton('Reject optional','rb-consent-secondary',()=>rbApplyPreferences({analytics:false,external:false},'reject_optional')));
    actions.appendChild(rbButton('Manage','rb-consent-link',rbPreferencesDialog));

    wrap.appendChild(copy);
    wrap.appendChild(actions);
    document.body.appendChild(wrap);
  }

  function rbAddPrivacyChoices(){
    const legal=document.querySelector('.legal');
    if(!legal||legal.querySelector('[data-rb-open-privacy]')) return;
    const button=document.createElement('button');
    button.type='button';
    button.className='rb-privacy-choices';
    button.setAttribute('data-rb-open-privacy','');
    button.textContent='Privacy choices';
    button.addEventListener('click',rbPreferencesDialog);
    legal.appendChild(document.createTextNode(' · '));
    legal.appendChild(button);
  }

  function rbExternalPlaceholder(){
    const placeholder=document.querySelector('[data-rb-external-placeholder]');
    if(!placeholder) return;
    const prefs=rbReadPreferences();
    if(prefs&&prefs.external){
      rbLoadExternalContent();
      return;
    }
    placeholder.hidden=false;
    const button=placeholder.querySelector('[data-rb-enable-external]');
    if(button) button.addEventListener('click',()=>{
      const base=rbReadPreferences()||{analytics:false,external:false};
      rbApplyPreferences({analytics:base.analytics,external:true},'external_widget');
      rbLoadExternalContent();
    });
  }

  function rbClassify(href){
    const u=href||'';
    if(/^tel:/i.test(u)) return 'phone_click';
    if(/^mailto:/i.test(u)) return 'email_click';
    if(/wa\.me\/14169392952/i.test(u)) return 'whatsapp_click';
    if(/calendly\.com\/realestatewithriteshbatra/i.test(u)) return 'book_consultation';
    if(/riteshbatra\.royallepage\.ca/i.test(u)||/\/search-homes\/?(?:[?#].*)?$/i.test(u)) return 'search_homes_click';
    if(/rate-my-agent\.com|google\.com\/maps|reviews\.birdeye\.com/i.test(u)) return 'review_click';
    if(/instagram\.com|facebook\.com|linkedin\.com|tiktok\.com|youtube\.com/i.test(u)) return 'social_click';
    try{
      const abs=new URL(u,location.href);
      if(abs.origin===location.origin&&/-realtor\/?$/.test(abs.pathname)) return 'market_guide_click';
      if(abs.origin!==location.origin) return 'outbound_click';
    }catch(e){}
    return '';
  }

  document.addEventListener('click',function(e){
    const a=e.target.closest('a[href]');
    if(!a) return;
    const type=rbClassify(a.getAttribute('href'));
    if(!type) return;
    let destination='';
    try{destination=new URL(a.getAttribute('href'),location.href).href;}catch(err){destination=a.getAttribute('href');}
    rbPush('rb_'+type,{cta_text:(a.textContent||'').trim().replace(/\s+/g,' ').slice(0,120),destination:destination});
  },true);

  let scroll75=false;
  window.addEventListener('scroll',function(){
    if(scroll75) return;
    const h=Math.max(document.documentElement.scrollHeight-document.documentElement.clientHeight,1);
    if((window.scrollY/h)>=0.75){scroll75=true;rbPush('rb_scroll_75',{scroll_percent:75});}
  },{passive:true});

  setTimeout(()=>rbPush('rb_engaged_60s',{engagement_seconds:60}),60000);

  const saved=rbReadPreferences();
  if(saved) rbApplyGoogleConsent(saved);
  rbAddPrivacyChoices();
  rbExternalPlaceholder();
  rbBanner();

  window.RBPrivacy={
    open:rbPreferencesDialog,
    get:rbReadPreferences,
    set:rbApplyPreferences
  };
  window.RBAnalytics={push:rbPush,config:RB_ANALYTICS};
})();
