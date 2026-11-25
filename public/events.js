'use strict';
function track(event) {
  try {
    const existing = JSON.parse(localStorage.getItem('venuealign-events') || '[]');
    const next = Array.isArray(existing) ? existing.slice(-199) : [];
    next.push({event, at: new Date().toISOString()});
    localStorage.setItem('venuealign-events', JSON.stringify(next));
  } catch { /* All controls also work with browser storage disabled. */ }
}
document.querySelectorAll('a[href="pilot.html"]').forEach(a => a.addEventListener('click', () => track('pilot_cta')));
