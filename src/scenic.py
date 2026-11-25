"""Original scenic plates, source sheets and supporting site figures."""
def elevation():
    return '''<section class="drawing"><div class="wrap">
    <div class="platehead"><span>Stage elevation · Touring set (front)</span><span>Demo · Simulated data</span></div>
    <div class="drawinggrid"><figure><img src="assets/stage-elevation.webp" width="1400" height="650" alt="Front elevation of the touring set with masking legs, painted sky cloth and scalloped flats."><figcaption>Front elevation <i></i> Touring scenic model · Illustrative drawing</figcaption></figure>
    <aside class="stopplate"><span class="smallcap">Selected stop</span><h2>Meridian Hall</h2><span class="caseref">VF-032 · Stage spacing</span><dl><dt>Tour rider · NI-R04</dt><dd>8.0 m clear width requested</dd><dt>Venue plan · MH-P02</dt><dd>7.4 m between masking lines</dd></dl><a href="demo.html#VF-032"><span class="opendot"></span>Clear width unverified <b>Open ↗</b></a></aside></div></div></section>'''
def route():
    return '''<figure class="routeplate"><figcaption><span>Night Index</span><small>Five-show itinerary</small></figcaption><svg viewBox="0 0 470 115" role="img" aria-label="Five stops, with Meridian Hall selected at stop three"><path class="routeline" d="M16 77H83Q97 77 111 62L128 45Q138 35 152 35H214Q226 35 235 48L257 79Q264 89 279 89H334Q345 89 355 75L371 54Q379 43 397 43H454" fill="none" stroke="currentColor" stroke-width="1.6"/><g fill="#eee3c9" stroke="currentColor" stroke-width="2"><circle cx="16" cy="77" r="5"/><circle cx="128" cy="45" r="5"/><circle cx="235" cy="48" r="10" fill="#74332f"/><circle cx="334" cy="89" r="5"/><circle cx="454" cy="43" r="5"/></g></svg><ol><li>Beacon Room</li><li>Orison Theatre</li><li><b>Meridian Hall</b></li><li>West Loom</li><li>North Quay</li></ol><small>Touring route · Fictional record</small></figure>'''
def sheet(title, label, rows):
    return '<figure class="sourcesheet"><figcaption><span>'+title+'</span><small>'+label+'</small></figcaption><dl>'+''.join('<div><dt>'+term+'</dt><dd>'+value+'</dd></div>' for term,value in rows)+'</dl></figure>'
def scope():
    return sheet('Evaluation scope','Venue Fit', [('Buyer','Production manager'),('Source access','Owner permission required'),('Decision','Named technical lead'),('Commercial status','Quote pending')])
def metrics():
    return '''<div class="scoretable"><table><caption>Matched-season scorecard</caption><thead><tr><th>Measure</th><th>Unit</th><th>Comparison</th></tr></thead><tbody><tr><td>Review time</td><td>Minutes / case</td><td>Manual vs. Venue Fit</td></tr><tr><td>Valid substitutions</td><td>Count</td><td>Final technical decisions</td></tr><tr><td>Unsupported fits</td><td>Count</td><td>Reviewer findings</td></tr></tbody></table><small>Thresholds agreed with the buyer before evaluation.</small></div>'''
def inputplate():
    return sheet('Source register','Meridian Hall · Demo', [('Signed rider','NI-R04 · v4'),('Approved inventory','MH-I07 · v7'),('Venue plan','MH-P02 · v2'),('House call sheet','MH-C03 · v3')])
def inventory():
    return sheet('Profile fixture stock','MH-I07 · Demo',[('Astra 40','0 available'),('Luma P4','1 · Signed note C'),('Arc P3','1 · Note outstanding')])
def packet():
    return sheet('Meridian Hall','Advance packet · Demo',[('VF-031','Profile fixture substitution'),('VF-032','Stage spacing · Open'),('VF-033','House contact · Confirmed')])
def plate_image():
    return '<figure class="subdrawing"><img src="assets/stage-elevation.webp" alt="Front elevation of the fictional touring set"><figcaption>Meridian Hall · Scenic study</figcaption></figure>'
def supporting_visual(slug):
    if slug in ('touring-teams','solutions','404'): return route()
    if slug in ('results','validation'): return metrics()
    if slug in ('promoters','pricing'): return scope()
    if slug=='suppliers': return inventory()
    if slug in ('products','venue-groups'): return plate_image()
    if slug in ('sources','trust'): return inputplate()
    if slug=='terms': return packet()
    if slug=='privacy': return sheet('Preview data','Local browser',[('Reviewer decisions','Stored on this device'),('Pilot details','Local download'),('Interaction events','Name and timestamp')])
    return ''
def illustration(i):
    titles=['Signed rider, with the stage-width passage underlined','Scenic front elevation for Venue Fit','Proposed changeover sequence with a measurement hold','Packet index with an open spacing record']
    if i==1:
        return '<div class="moduleplate drawingart"><img src="assets/stage-elevation.webp" loading="lazy" alt="'+titles[i]+'"><span>MH-P02 / S-2</span></div>'
    if i==0:
        inner='<rect x="76" y="15" width="244" height="166" fill="#faf2dc"/><path d="M86 21v151h225"/><text x="101" y="45">Night Index</text><path d="M101 53h192"/><text class="tiny" x="101" y="71">SIGNED RIDER · REV 04</text><path d="M101 86h144m-144 9h170"/><rect x="97" y="108" width="189" height="23" fill="#e0cb9a" stroke="none"/><text class="code" x="102" y="123">ST-02   Clear width 8.0 m</text><path d="M101 143h158m-158 9h108"/>'
    elif i==2:
        inner='<text x="28" y="39">Changeover call</text><path d="M27 49h345"/><g class="ticks"><path d="M119 58v97m58-97v97m58-97v97m58-97v97m58-97v97"/></g><g class="code"><text x="29" y="79">Spacing</text><text x="29" y="114">LX check</text><text x="29" y="149">Crew call</text></g><g stroke-width="1"><rect x="120" y="63" width="78" height="20" fill="#c88e6d"/><rect x="200" y="98" width="63" height="20" fill="#8aab9d"/><rect x="267" y="133" width="84" height="20" fill="#e4d5b4" stroke-dasharray="4 3"/></g><text class="tiny" x="29" y="177">PROPOSED SEQUENCE · AWAITING CREW REVIEW</text>'
    else:
        inner='<rect x="77" y="27" width="244" height="151" fill="#b59d7c"/><rect x="71" y="21" width="244" height="151" fill="#ddd0ac"/><rect x="65" y="15" width="244" height="151" fill="#f8efdb"/><text x="85" y="47">Meridian Hall</text><text class="tiny" x="85" y="65">ADVANCE PACKET / STOP 03</text><path d="M85 76h202m-202 22h202m-202 23h202m-202 23h202"/><g class="code"><text x="88" y="91">VF-031   Lighting</text><text x="88" y="115">VF-032   Stage spacing</text><text x="88" y="138">VF-033   House contact</text></g><circle cx="278" cy="110" r="4" fill="#a25e41"/>'
    return f'<svg class="illustration" viewBox="0 0 400 196" role="img" aria-label="{titles[i]}"><g stroke="currentColor" stroke-width=".8" fill="none">{inner}</g></svg>'
def console():
    return '''<div class="console"><div class="conbar"><b>Venue Fit</b><span>Demo · Simulated data</span></div><div class="consolebody"><span class="smallcap">Night Index / Stop 03 of 05</span><h3>Meridian Hall</h3><div class="queuegraph" aria-label="Initial queue: one awaiting review, one open, one confirmed"><i></i><i></i><i></i></div><div class="graphkey">1 awaiting review · 1 open · 1 confirmed</div><div class="conrow"><span class="status pending">Needs review</span><strong>Profile fixture substitution</strong><small>VF-031 · Inez Park</small></div><div class="sourcesplit"><div><small>NI-R04 / v4</small><b>Astra 40 profile</b><span>Signed rider</span></div><div><small>MH-I07 / v7</small><b>Luma P4</b><span>House comparison note C</span></div></div><a class="conlink" href="demo.html#VF-031">Inspect the fixture evidence <b>↗</b></a></div></div>'''
