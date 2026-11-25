"""A four-cue, fictional lighting advance at Meridian Hall."""
from instruments import icon, stock_table

def review_story():
    lamp = '''<svg class="profile-study" viewBox="0 0 320 112" role="img" aria-label="Side elevation of a theatrical profile fixture">
    <g fill="none" stroke="#98b9b3"><path stroke-dasharray="3 4" d="M16 60h284M62 14v82m135-82v82"/><path d="M60 93h141m-141-4v8m141-8v8"/></g>
    <g stroke="#c1eee0" fill="#284b50" stroke-width="2"><path d="M65 39h76l16 9v24l-16 8H65l-9-8V47z"/><path d="M157 48h33l12-7v37l-12-7h-33z"/><path d="M77 75v11h58V74M105 85v12h21" fill="none" stroke-width="4"/><circle cx="78" cy="70" r="4"/><path d="M73 48h43m-43 7h48m-48 7h40"/></g><path d="m205 47 67-19v62l-67-20z" fill="#e9c282" opacity=".19"/></svg>'''
    visuals=[
        '<div class="cue-doc"><small>NI-R04 · v4 · 02 Oct 2026</small><strong>Signed tour rider</strong><div class="page-lines"></div><blockquote>“<mark>Astra 40 profile at LX-04.</mark> An alternate requires the venue technical lead’s recorded approval.”</blockquote><small>Page 12 / Lighting schedule</small></div>',
        '<div class="cue-doc"><small>MH-I07 · v7 · 09 Oct 2026</small>'+stock_table()+'<small>Page 4 / Profiles · Note C</small></div>',
        '<div class="cue-match"><small>AI-supported suggestion · VF-031</small>'+lamp+'<div><strong>Luma P4</strong><span>1 in house</span></div><p>Signed comparison note C supports review for LX-04.</p><small>Arc P3 · Supporting note missing</small></div>',
        '<div class="cue-doc cue-signoff"><small>Venue Fit · VF-031</small><div class="approval-mark">'+icon('review')+' Approved</div><strong>Luma P4 for LX-04</strong><div class="signed"><b>IP</b><span>Inez Park<small>Venue technical lead</small></span></div><p>VF-032 · Stage width remains open.</p></div>'
    ]
    captions=[
        ('Rider line','Read the exact request.','The proposed AI extracts the fixture and position from the signed rider. The passage stays attached so the crew can check the wording.'),
        ('Venue inventory','Check what is in the room.','The house lists no Astra 40. Two local profiles are available, but only Luma P4 has a signed comparison note.'),
        ('Suggested fixture','Put Luma P4 forward.','Venue Fit links the rider line to note C and proposes the fixture for review. Arc P3 stays open for missing evidence.'),
        ('Reviewer approval','Record the lead’s decision.','In this reviewed example, Inez Park inspects both documents and accepts Luma P4 for this stop. The separate stage-width question still needs a field measurement.')
    ]
    cues=[]
    for i,((label,title,body),visual) in enumerate(zip(captions,visuals),1):
        action='<a class="textlink" href="demo.html#VF-031">Review the case yourself ↗</a>' if i==4 else ''
        cues.append(f'<article class="cue-step"><div class="cue-copy"><small>Cue 0{i} / {label}</small><h3>{title}</h3><p>{body}</p>{action}</div><figure class="cue-visual"><figcaption><span>Meridian Hall · LX-04</span><span>Demo · Simulated data</span></figcaption>{visual}</figure></article>')
    return '<section id="solution" class="cue-story"><div class="wrap"><header class="cue-heading"><p class="eyeline">How AI helps</p><h2>From rider line to reviewed fixture.</h2><p>Follow one lighting request through the Night Index tour advance.</p></header><div class="cue-layout"><div class="cue-steps">'+''.join(cues)+'</div><div class="cue-screen"></div></div></div></section>'
