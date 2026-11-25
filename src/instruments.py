"""Production symbols and diagrams used in VenueAlign's evidence views."""
SYMBOLS = {
    'rider-intake': '<path d="M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 17h5"/>',
    'venue-fit': '<path d="M3 9V4h5m8 0h5v5m0 6v5h-5M8 20H3v-5M5 13h14m-3-3 3 3-3 3m-8-6-3 3 3 3"/>',
    'changeover-planner': '<path d="M3 4v16h18M7 7h6m-3 4h7m-2 4h5"/><circle cx="7" cy="7" r="1"/><circle cx="10" cy="11" r="1"/>',
    'advance-packet': '<path d="M4 7h6l2 2h8v11H4zM6 4h12v5M8 14h8m-8 3h5"/>',
    'fixture': '<path d="M4 8h12v8H4zM16 10l4-2v8l-4-2M6 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2M10 20v2M7 5h6"/>',
    'crew': '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5"/>',
    'route': '<circle cx="5" cy="6" r="2"/><circle cx="18" cy="17" r="2"/><path d="M7 6h7a3 3 0 1 1 0 6H8a3 3 0 0 0 0 6h8"/>',
    'replay': '<path d="M4 11a8 8 0 1 1 2 7M4 5v6h6"/>',
    'desk': '<rect x="3" y="4" width="18" height="15" rx="1"/><path d="M3 8h18M9 8v11m3-7h6m-6 3h4"/>',
    'review': '<path d="m5 12 4 4 10-10M4 20h16"/>',
    'budget': '<rect x="3" y="5" width="18" height="15" rx="1"/><path d="M3 10h18m-6 5h3"/>',
    'source': '<path d="M4 3h11v14H4zM8 7h4M8 11h4m6-3h2v13H9v-1"/>',
    'play': '<path d="m8 4 11 8-11 8z"/>',
}
def icon(key):
    return f'<svg class="symbol" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">{SYMBOLS[key]}</svg>'

def width_chart():
    return '''<div class="widthchart" aria-label="Two different width references"><div><span>Rider · clear width</span><strong>8.0 m</strong></div><i><b style="--extent:100%"></b></i><div><span>Plan · masking lines</span><strong>7.4 m</strong></div><i><b style="--extent:92.5%"></b></i><small>Different reference points. Field measurement due.</small></div>'''

def stock_table():
    rows=[('Astra 40','0','Requested model'),('Luma P4','1','Note C signed'),('Arc P3','1','Note outstanding')]
    body=''.join(f'<tr><th scope="row">{name}</th><td><b class="unitmeter unit{units}" aria-hidden="true"></b>{units}</td><td>{note}</td></tr>' for name,units,note in rows)
    return '<table class="stocktable"><caption>House inventory · MH-I07</caption><thead><tr><th>Profile</th><th>On hand</th><th>Evidence</th></tr></thead><tbody>'+body+'</tbody></table>'
def contact_chain():
    return '<div class="contactchain">'+icon('source')+'<span>House call sheet<small>MH-C03 · v3</small></span><i></i>'+icon('crew')+'<span>Inez Park<small>Technical lead</small></span></div>'
def queue_chart():
    return '''<div class="queue-summary"><div class="queue-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-90 50 50)" fill="none" stroke-width="7"><circle cx="50" cy="50" r="40" stroke="#293a3e"/><circle class="arc" cx="50" cy="50" r="40" pathLength="100" stroke="#ffc488" stroke-dasharray="31 69"/><circle class="arc" cx="50" cy="50" r="40" pathLength="100" stroke="#ffa69b" stroke-dasharray="31 69" transform="rotate(120 50 50)"/><circle class="arc" cx="50" cy="50" r="40" pathLength="100" stroke="#8adfd2" stroke-dasharray="31 69" transform="rotate(240 50 50)"/></g></svg><b>03</b></div><div class="ringlegend"><strong>Opening queue</strong><div><i></i>Awaiting review <b>1</b></div><div><i></i>Open <b>1</b></div><div><i></i>Confirmed <b>1</b></div></div></div>'''
