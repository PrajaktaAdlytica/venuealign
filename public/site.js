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
const hamburger = document.querySelector('.hamb');
const menus = [...nav.querySelectorAll('details')];
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
document.querySelectorAll('.reviewchapter').forEach(chapter => {
  const rows = [...chapter.querySelectorAll('.steps article')];
  const states = ['Source comparison','Suggested local match','Reviewer disposition'];
  const observer = new IntersectionObserver(entries => {
    const entry = entries.find(item => item.isIntersecting);
    if (!entry) return;
    const pos = rows.indexOf(entry.target);
    chapter.querySelector('.reviewstate').textContent = states[pos];
    chapter.querySelector('.tracepassage').textContent = [
      'NI-R04 · “Astra 40 profile at LX-04.”',
      'MH-I07 · Luma P4 is listed with signed comparison note C.',
      'Inez Park inspects both sources before recording a decision.'
    ][pos];
    chapter.querySelector('.reviewmeter i').style.width = ((pos+1)*100/3)+'%';
    rows.forEach((row,i) => row.classList.toggle('active',i===pos));
  }, {rootMargin:'-24% 0px -38% 0px'});
  rows.forEach(row => observer.observe(row));
});
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const hero = document.querySelector('.herohead');
    if (hero) {
      gsap.timeline({defaults:{ease:'power3.out'}})
        .from('.herohead h1 i',{yPercent:104,stagger:.1,duration:.85})
        .from('.herohead p,.herohead .actions',{opacity:0,y:10,duration:.48,stagger:.09},.35);
    }
    const reveal = (selector,props) => gsap.utils.toArray(selector).forEach(el => {
      gsap.from(el,{...props,duration:.77,ease:'power2.out',clearProps:'transform,opacity,clipPath',
        scrollTrigger:{trigger:el,start:'top 94%',once:true}});
    });
    reveal('.drawinggrid figure,.problemphoto,.subphoto',{clipPath:'inset(0 0 0 17%)',x:-16});
    reveal('.stopplate,.console,.reviewnote,.sourcesheet',{x:18,opacity:.6});
    reveal('.section .hgroup,.intake,.subhero h1,.closing h2,.twocards article',{y:19,opacity:.7});
    reveal('.queuegraph i',{scaleX:.1,transformOrigin:'left'});
    gsap.utils.toArray('.routeline').forEach(line => {
      const length=line.getTotalLength();
      gsap.fromTo(line,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,ease:'none',
        scrollTrigger:{trigger:line.closest('figure'),start:'top 90%',end:'center 47%',scrub:true}});
    });
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
