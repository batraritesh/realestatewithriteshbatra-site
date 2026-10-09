(function(){
  const b=document.querySelector('[data-menu]'),n=document.querySelector('[data-nav]');
  if(b&&n){
    b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus();}});
  }

  window.dataLayer=window.dataLayer||[];
  const RB_ANALYTICS={
    gtmId:'GTM-REPLACE_ME',
    consentKey:'rb_analytics_consent_v1',
    productionHosts:['realestatewithriteshbatra.com','www.realestatewithriteshbatra.com']
  };

  function rbPush(event,params){
    window.dataLayer.push(Object.assign({event:event,page_path:location.pathname,page_title:document.title},params||{}));
  }

  function rbIsProduction(){
    return RB_ANALYTICS.productionHosts.indexOf(location.hostname.toLowerCase())!==-1;
  }

  function rbValidGtm(){
    return /^GTM-[A-Z0-9]+$/i.test(RB_ANALYTICS.gtmId)&&RB_ANALYTICS.gtmId!=='GTM-REPLACE_ME';
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

  function rbConsent(){
    try{return localStorage.getItem(RB_ANALYTICS.consentKey)||'';}catch(e){return '';}
  }

  function rbSetConsent(value){
    try{localStorage.setItem(RB_ANALYTICS.consentKey,value);}catch(e){}
    rbPush('rb_consent_update',{analytics_consent:value});
    if(value==='granted') rbLoadGtm();
  }

  function rbBanner(){
    if(!rbIsProduction()||!rbValidGtm()||rbConsent()) return;
    const wrap=document.createElement('div');
    wrap.setAttribute('role','dialog');
    wrap.setAttribute('aria-label','Analytics preferences');
    wrap.style.cssText='position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:auto;background:#fff;color:#111;border:1px solid #d8d8d8;border-radius:14px;padding:16px;box-shadow:0 8px 30px rgba(0,0,0,.14);font:15px/1.45 Arial,sans-serif';
    wrap.innerHTML='<strong style="display:block;margin-bottom:6px">Analytics preferences</strong><span>We use privacy-conscious analytics to understand which pages and contact options are useful. You can accept or decline analytics cookies. <a href="/privacy/" style="color:inherit;text-decoration:underline">Privacy policy</a>.</span><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px"><button type="button" data-rb-consent="granted" style="min-height:44px;padding:10px 16px;border:0;border-radius:8px;background:#111;color:#fff;font-weight:700;cursor:pointer">Accept analytics</button><button type="button" data-rb-consent="denied" style="min-height:44px;padding:10px 16px;border:1px solid #888;border-radius:8px;background:#fff;color:#111;font-weight:700;cursor:pointer">Decline</button></div>';
    document.body.appendChild(wrap);
    wrap.querySelectorAll('[data-rb-consent]').forEach(btn=>btn.addEventListener('click',()=>{rbSetConsent(btn.getAttribute('data-rb-consent'));wrap.remove();}));
  }

  function rbClassify(href){
    const u=href||'';
    if(/^tel:/i.test(u)) return 'phone_click';
    if(/^mailto:/i.test(u)) return 'email_click';
    if(/wa\.me\/14169392952/i.test(u)) return 'whatsapp_click';
    if(/calendly\.com\/realestatewithriteshbatra/i.test(u)) return 'book_consultation';
    if(/riteshbatra\.royallepage\.ca/i.test(u)) return 'search_homes_click';
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

  if(rbConsent()==='granted') rbLoadGtm();
  else rbBanner();

  window.RBAnalytics={push:rbPush,setConsent:rbSetConsent,config:RB_ANALYTICS};
})();