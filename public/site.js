'use strict';
const page = document.body.dataset.page;
const prefersStill = matchMedia('(prefers-reduced-motion: reduce)');
const motionOK = () => !prefersStill.matches;
function track(event) {
  try {
    const existing = JSON.parse(localStorage.getItem('venuealign-events') || '[]');
    const next = Array.isArray(existing) ? existing.slice(-199) : [];
    next.push({event, at: new Date().toISOString()});
    localStorage.setItem('venuealign-events', JSON.stringify(next));
  } catch { /* All controls also work with browser storage disabled. */ }
}
if (['rider-intake','venue-fit','changeover-planner','advance-packet'].includes(page)) track('offer_view_' + page);
document.querySelectorAll('a[href="pilot.html"]').forEach(a => a.addEventListener('click', () => track('pilot_cta')));
const nav = document.querySelector('#mainnav');
nav.querySelectorAll('a').forEach(link => {
  if(link.getAttribute('href')===page+'.html') link.setAttribute('aria-current','page');
});
const hamburger = document.querySelector('.hamb');
const menus = [...nav.querySelectorAll('details')];
const masthead=document.querySelector('.top');
let anchorY=window.scrollY;
window.addEventListener('scroll', () => {
  const y=Math.max(0,window.scrollY);
  const delta=y-anchorY;
  if (y<80 || nav.classList.contains('open') || menus.some(menu=>menu.open)) {
    masthead.classList.remove('nav-away');
  } else if (Math.abs(delta)>=12) {
    masthead.classList.toggle('nav-away',delta>0);
  } else return;
  anchorY=y;
  masthead.classList.toggle('over-page',y>60);
},{passive:true});
masthead.addEventListener('focusin',()=>masthead.classList.remove('nav-away'));
function setNav(open) {
  hamburger.setAttribute('aria-expanded',String(open));
  hamburger.textContent = open ? 'Close' : 'Menu';
  nav.classList.toggle('open',open);
  if (!open) menus.forEach(menu => menu.open = false);
}
hamburger.addEventListener('click', () => setNav(!nav.classList.contains('open')));
menus.forEach(menu => menu.addEventListener('toggle', () => {
  if (menu.open) menus.filter(other => other !== menu).forEach(other => other.open = false);
}));
document.addEventListener('click', e => {
  if (!e.target.closest('.navinner')) setNav(false);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const active = menus.find(menu => menu.open);
  if (active) { active.open = false; active.querySelector('summary').focus(); }
  else if (nav.classList.contains('open')) { setNav(false); hamburger.focus(); }
});
document.querySelectorAll('.btn').forEach(button => {
  const middle = document.createElement('i');
  middle.className = 'slat';
  middle.setAttribute('aria-hidden','true');
  button.append(middle);
});
document.querySelectorAll('.railbox').forEach(box => {
  const rail = box.querySelector('.productrail');
  const buttons = [...box.querySelectorAll('[data-rail]')];
  function sync() {
    buttons[0].disabled = rail.scrollLeft < 2;
    buttons[1].disabled = rail.scrollWidth - rail.clientWidth - rail.scrollLeft < 3;
  }
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const stride = rail.children[1].offsetLeft - rail.children[0].offsetLeft;
    const target = Math.max(0, Math.min(rail.scrollLeft + Number(btn.dataset.rail) * stride, rail.scrollWidth - rail.clientWidth));
    const scene = window.ScrollTrigger?.getById('home-products');
    if (scene) {
      const y = scene.start + (scene.end - scene.start) * target / (rail.scrollWidth - rail.clientWidth);
      window.scrollTo({top:y,behavior:motionOK()?'smooth':'instant'});
    } else {
      rail.scrollTo({left:target,behavior:motionOK()?'smooth':'instant'});
    }
  }));
  rail.addEventListener('scroll', sync, {passive:true});
  new ResizeObserver(sync).observe(rail);
  sync();
});
document.querySelectorAll('.console').forEach(desk => {
  const choices = [...desk.querySelectorAll('[data-preview]')];
  const panels = [...desk.querySelectorAll('[data-panel]')];
  choices.forEach(choice => choice.addEventListener('click', () => {
    choices.forEach(button => button.setAttribute('aria-pressed',String(button === choice)));
    panels.forEach(panel => {panel.hidden = panel.dataset.panel !== choice.dataset.preview;});
  }));
});
document.querySelectorAll('.cue-layout').forEach(layout => {
  const steps=[...layout.querySelectorAll('.cue-step')];
  const figures=steps.map(step=>step.querySelector('figure'));
  const screen=layout.querySelector('.cue-screen');
  const wide=matchMedia('(min-width: 800px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)');
  function update() {
    const threshold=innerHeight*.53;
    let active=0;
    steps.forEach((step,i)=>{if(step.getBoundingClientRect().top<=threshold) active=i;});
    figures.forEach((figure,i)=>{figure.hidden=i!==active;});
    steps.forEach((step,i)=>step.classList.toggle('current',i===active));
  }
  function arrange() {
    layout.classList.toggle('staged',wide.matches);
    if(wide.matches) {
      screen.append(...figures);
      update();
      window.addEventListener('scroll',update,{passive:true});
      window.addEventListener('resize',update);
    } else {
      window.removeEventListener('scroll',update);
      window.removeEventListener('resize',update);
      figures.forEach((figure,i)=>{figure.hidden=false;steps[i].append(figure);});
    }
  }
  const entrance=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');entrance.unobserve(entry.target);}});
  },{threshold:.22});
  figures.forEach(figure=>entrance.observe(figure));
  wide.addEventListener('change',arrange);
  arrange();
});
const mix = document.querySelector('#drawing-mix');
const trace = document.querySelector('.traceframe');
let manualMix = false;
function drawAt(percent) {
  const value = Math.round(percent);
  mix.value = value;
  mix.setAttribute('aria-valuetext',value + '% technical drawing');
  trace.style.setProperty('--exposed',value + '%');
}
if (mix) {
  drawAt(Number(mix.value));
  mix.addEventListener('input', () => {manualMix=true;drawAt(Number(mix.value));});
}
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const hero = document.querySelector('.herohead');
    if (hero) {
      const replay=document.querySelector('.replay-scene');
      const opening=gsap.timeline({defaults:{ease:'power3.inOut'}});
      opening.fromTo('.stage-wings i:first-child',{xPercent:0,x:0},{xPercent:-104,duration:1.35},0)
        .fromTo('.stage-wings i:last-child',{xPercent:0,x:0},{xPercent:104,duration:1.5},.05)
        .fromTo('.heroimage',{scale:1.085},{scale:1,duration:2.1,ease:'power2.out'},0)
        .fromTo('.stage-light',{opacity:0},{opacity:.65,duration:.8},.25)
        .to('.stage-light',{opacity:0,duration:1.05},1)
        .fromTo('.herohead h1 i',{yPercent:115},{yPercent:0,stagger:.14,duration:.92,ease:'power3.out'},.43)
        .fromTo('.herohead p,.herohead .actions',{opacity:0,y:15},{opacity:1,y:0,duration:.6,stagger:.12},.97);
      replay.hidden=false;
      replay.onclick=()=>opening.restart();
    }
    if(trace) {
      ScrollTrigger.create({trigger:trace,start:'top 96%',end:'center 40%',onUpdate:trigger=>{
        if(!manualMix) drawAt(8+trigger.progress*90);
      }});
    }
    if(hero) {
      gsap.to(hero,{yPercent:-16,opacity:.22,ease:'none',scrollTrigger:{
        trigger:'.homehero',start:'22% top',end:'bottom top',scrub:.45}});
    }
    gsap.utils.toArray('.routeplate').forEach(plate=>{
      gsap.from(plate.querySelectorAll('circle'),{scale:.15,transformOrigin:'center',stagger:.18,
        scrollTrigger:{trigger:plate,start:'top 86%',end:'center 48%',scrub:.35}});
    });
    const reveal = (selector,props) => gsap.utils.toArray(selector).forEach(el => {
      gsap.from(el,{...props,duration:.77,ease:'power2.out',clearProps:'transform,opacity,clipPath',
        scrollTrigger:{trigger:el,start:'top 94%',once:true}});
    });
    reveal('.drawinggrid figure,.problemphoto,.subphoto',{clipPath:'inset(0 0 0 17%)',x:-16});
    reveal('.stopplate,.console,.reviewnote,.sourcesheet',{x:18,opacity:.6});
    reveal('.section .hgroup,.intake,.subhero h1,.closing h2,.twocards article',{y:19,opacity:.7});
    gsap.utils.toArray('.console').forEach(desk => {
      const chart=gsap.timeline({scrollTrigger:{trigger:desk,start:'top 84%',once:true},defaults:{ease:'power2.out'}});
      chart.fromTo(desk.querySelectorAll('.arc'),{attr:{'stroke-dasharray':'0 100'}},{attr:{'stroke-dasharray':'31 69'},duration:1,stagger:.17},0)
        .from(desk.querySelectorAll('.ringlegend div'),{x:9,opacity:0,duration:.35,stagger:.14},.12)
        .from(desk.querySelectorAll('.conpanel[data-panel="VF-031"] tbody tr'),{y:10,opacity:.05,stagger:.12,duration:.55,clearProps:'transform,opacity'},.25);
    });
    gsap.utils.toArray('.sourcesheet,.scoretable').forEach(sheet => {
      const rows=sheet.querySelectorAll('dl>div,tbody tr');
      gsap.from(rows,{y:10,opacity:.16,stagger:.08,duration:.45,clearProps:'transform,opacity',
        scrollTrigger:{trigger:sheet,start:'top 88%',once:true}});
    });
    gsap.utils.toArray('.problemphoto img').forEach(img=>{
      gsap.fromTo(img,{clipPath:'inset(9% 15% 9% 15%)'},{clipPath:'inset(0% 0% 0% 0%)',
        scrollTrigger:{trigger:img,start:'top 92%',end:'center 49%',scrub:true}});
    });
    gsap.utils.toArray('.routeline').forEach(line => {
      const length=line.getTotalLength();
      gsap.fromTo(line,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,ease:'none',
        scrollTrigger:{trigger:line.closest('figure'),start:'top 90%',end:'center 47%',scrub:true}});
    });
    return () => {const replay=document.querySelector('.replay-scene');if(replay){replay.hidden=true;replay.onclick=null;}};
  });
  media.add('(min-width: 1000px) and (hover: hover) and (prefers-reduced-motion: no-preference)', () => {
    let lenis;
    const tick = t => lenis.raf(t*1000);
    if (window.Lenis && !document.querySelector('.intake')) {
      lenis = new Lenis({autoRaf:false,anchors:true,duration:.86,smoothWheel:true,
        prevent:node => node instanceof Element && !!node.closest('.flyout,dialog,.productrail:focus-within')});
      lenis.on('scroll',ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    const rail=document.querySelector('[data-page=index] .productrail');
    if (rail && rail.scrollWidth>rail.clientWidth && innerHeight>610) {
      const range=()=>rail.scrollWidth-rail.clientWidth;
      ScrollTrigger.create({id:'home-products',trigger:rail.closest('.railbox'),start:'top 10%',end:()=>'+='+range(),
        pin:true,invalidateOnRefresh:true, onUpdate:self=>{rail.scrollLeft=self.progress*range();}});
      rail.classList.add('scroll-driven');
    }
    if(document.querySelector('.heroimage')) {
      gsap.to('.heroimage',{yPercent:6,ease:'none',scrollTrigger:{trigger:'.homehero',start:'top top',end:'bottom top',scrub:true}});
    }
    return () => {rail?.classList.remove('scroll-driven'); if(lenis){gsap.ticker.remove(tick);lenis.destroy();}};
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
function download(name, content) {
  const url=URL.createObjectURL(new Blob([JSON.stringify(content,null,2)],{type:'application/json'}));
  const link=document.createElement('a');
  link.href=url; link.download=name; link.click();
  setTimeout(() => URL.revokeObjectURL(url),1500);
}
const productParam = new URLSearchParams(location.search).get('product');
const productSelect = document.querySelector('select[name="product"]');
if (productSelect && productParam) {
  const option = [...productSelect.options].find(o=>o.value.toLowerCase().replaceAll(' ','-') === productParam);
  if (option) productSelect.value = option.value;
}
document.querySelectorAll('[data-form]').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  const values=Object.fromEntries(new FormData(form));
  const type=form.dataset.form;
  const brief={preview:'VenueAlign local draft',type,...values};
  if(type==='pilot'){
    brief.pilotModule='Venue Fit';
    brief.pilotQuote='Pending separate scope and signature';
    brief.annualPriceHypothesisUSD=18000;
  }
  download('VenueAlign-'+type+'-draft.json',brief);
  track(type+'_draft_created');
  if(type==='pilot' && values.authority==='I own the budget' && values.permission==='Data owner has authorized review' && values.lead==='Lead named for every participating stop' && values.follow_up.startsWith('Yes')) track('qualified_pilot_request');
  form.querySelector('.formresult').textContent='Your local draft is ready to download. Keep it for your evaluation discussion. No request has been sent.';
}));
document.querySelector('#wipe')?.addEventListener('click', () => {
  try {
    for(const key of ['venuealign-events','venuealign-meridian-v1']) localStorage.removeItem(key);
    document.querySelector('#wipeStatus').textContent='Local preview events and reviewer state cleared.';
  } catch { document.querySelector('#wipeStatus').textContent='Local storage is unavailable in this browser.'; }
});
