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
document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => {
  document.querySelector('.homehero').classList.toggle('plan', btn.dataset.view === 'plan');
  document.querySelectorAll('[data-view]').forEach(other => other.setAttribute('aria-pressed', String(other===btn)));
}));
document.querySelectorAll('.railbox').forEach(box => {
  const rail = box.querySelector('.productrail');
  const buttons = [...box.querySelectorAll('[data-rail]')];
  function sync() {
    buttons[0].disabled = rail.scrollLeft < 2;
    buttons[1].disabled = rail.scrollWidth - rail.clientWidth - rail.scrollLeft < 3;
  }
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const stride = rail.children[1].offsetLeft - rail.children[0].offsetLeft;
    rail.scrollBy({left:Number(btn.dataset.rail) * stride,behavior:motionOK()?'smooth':'instant'});
  }));
  rail.addEventListener('scroll', sync, {passive:true});
  new ResizeObserver(sync).observe(rail);
  sync();
});
document.querySelectorAll('.reviewchapter').forEach(chapter => {
  const rows = [...chapter.querySelectorAll('.steps article')];
  const states = ['Source comparison','Suggested local match','Reviewer disposition'];
  const observer = new IntersectionObserver(entries => {
    const entry = entries.find(item => item.isIntersecting);
    if (!entry) return;
    const pos = rows.indexOf(entry.target);
    chapter.querySelector('.reviewstate').textContent = states[pos];
    chapter.querySelector('.reviewmeter i').style.width = ((pos+1)*100/3)+'%';
    rows.forEach((row,i) => row.classList.toggle('active',i===pos));
  }, {rootMargin:'-24% 0px -38% 0px'});
  rows.forEach(row => observer.observe(row));
});
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.herohead > *', {y:14,opacity:.4,duration:.65,stagger:.055,clearProps:'all'});
    gsap.utils.toArray('.hgroup,.problemphoto,.productcard,.console,.twocards article,.reviewnote,.bigart').forEach(el => {
      gsap.from(el,{y:20,duration:.7,ease:'power2.out',clearProps:'transform',scrollTrigger:{trigger:el,start:'top 93%',once:true}});
    });
    if (document.querySelector('.heroimage')) {
      gsap.to('.heroimage',{yPercent:7,ease:'none',scrollTrigger:{trigger:'.homehero',start:'top top',end:'bottom top',scrub:true}});
    }
  });
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
