'use strict';

const DEMO = 'DEMO · SIMULATED DATA';
const STORE = 'venuealign-meridian-v1';
const reviewer = 'Inez Park · venue technical lead';
const tour = {name: 'Night Index', showCount: 5, stop: 3, venue: 'Meridian Hall', showDate: '2026-10-18'};
const cases = [
  {
    id: 'VF-031', name: 'Lighting substitution', area: 'LIGHTING', status: 'Awaiting review',
    finding: 'The signed rider requests an Astra 40 profile. Meridian Hall lists none. Two local fixtures appear in the inventory.',
    gap: 'Arc P3 has no signed comparison note. Its suitability remains open.',
    action: 'Inspect the rider and inventory extracts. A technical lead can record a decision on Luma P4.',
    sources: [
      {id:'NI-R04', title:'Signed tour rider', version:'v4', date:'2026-10-02', location:'p. 12 · LX-04', quote:'“Astra 40 profile at LX-04. An alternate requires the venue technical lead’s recorded approval.”', context:'Lighting schedule, Night Index production office. The requested model and review owner are explicit. Inventory availability is recorded separately.'},
      {id:'MH-I07', title:'Approved house inventory', version:'v7', date:'2026-10-09', location:'p. 4 · profiles / note C', quote:'“Astra 40: 0. Luma P4: 1, comparison note C signed. Arc P3: 1, comparison note outstanding.”', context:'House lighting inventory, Meridian Hall. Note C records the fictional department’s review of Luma P4 for this fixture request. The final stop-specific decision belongs to Inez Park.'}
    ],
    alternatives:[{name:'Luma P4', evidence:'Signed comparison note C in MH-I07.', disposition:'Awaiting reviewer'},{name:'Arc P3', evidence:'No comparison note supplied.', disposition:'Open · evidence incomplete'}],
    baselineHistory:[{at:'2026-10-10T09:10:00Z',who:'Advance coordinator',action:'Linked rider v4 and house inventory v7.'},{at:'2026-10-10T09:14:00Z',who:'Venue Fit · simulated suggestion',action:'Flagged the missing fixture and two local alternatives for Inez Park.'}]
  },
  {
    id:'VF-032',name:'Stage spacing',area:'STAGE PLAN',status:'Open · evidence incomplete',
    finding:'The rider requests 8.0 m of clear stage width. The venue plan shows 7.4 m between masking lines. The two labels describe different measurements.',
    gap:'A verified clear-width measurement for this stop is missing. Fit remains unresolved.',
    action:'Inez Park must obtain a current measurement from venue staff before recording a fit decision.',
    sources:[
      {id:'NI-R04',title:'Signed tour rider',version:'v4',date:'2026-10-02',location:'p. 9 · ST-02',quote:'“Keep 8.0 m of clear stage width available for the touring layout.”',context:'Stage layout, Night Index production office. The requirement refers to usable clear width for this show.'},
      {id:'MH-P02',title:'Venue plan',version:'v2',date:'2026-09-28',location:'sheet S-2 · masking',quote:'“7.4 m between masking lines. Clear stage width pending venue measurement.”',context:'Meridian Hall drawing register. The dimension spans the masking lines. There is no signed field measurement of usable clearance in the supplied packet.'}
    ],alternatives:[],baselineHistory:[{at:'2026-10-10T09:17:00Z',who:'Venue Fit · simulated suggestion',action:'Marked dimension labels for review.'},{at:'2026-10-10T09:22:00Z',who:'Inez Park',action:'Requested a verified clear-width measurement. Case stays open.'}]
  },
  {
    id:'VF-033',name:'House stage contact',area:'ADVANCE CONTACT',status:'Confirmed',
    finding:'The house call sheet names the contact requested by the tour rider. The advance coordinator has recorded the handoff.',
    gap:'No outstanding contact detail for this sample item.', action:'Carry the confirmed contact role into the venue advance packet.',
    sources:[
      {id:'NI-R04',title:'Signed tour rider',version:'v4',date:'2026-10-02',location:'p. 2 · contacts',quote:'“List the house stage contact in the final venue advance.”',context:'Arrival notes for the five-show tour.'},
      {id:'MH-C03',title:'House call sheet',version:'v3',date:'2026-10-08',location:'p. 1 · stage contact',quote:'“Meridian Hall house stage contact: Inez Park, venue technical lead.”',context:'Fictional call sheet distributed for stop 03.'}
    ],alternatives:[],baselineHistory:[{at:'2026-10-10T09:06:00Z',who:'Inez Park',action:'Confirmed house stage contact for stop 03.'}]
  }
];

function initialState() { return {decisions:{}, seen:{}, history:{}, lastExport:null}; }
let state = initialState();
try {
  const saved = JSON.parse(localStorage.getItem(STORE));
  if (saved && typeof saved.decisions==='object' && typeof saved.seen==='object' && typeof saved.history==='object') state = saved;
} catch (_) {}
let selected = cases[0];
let readFocus = null;
const $ = (selector) => document.querySelector(selector);
const escapeText = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){try {localStorage.setItem(STORE,JSON.stringify(state));} catch(_) {}}
function track(event){
  try {const stored=JSON.parse(localStorage.getItem('venuealign-events')||'[]');
    const events=Array.isArray(stored)?stored:[]; events.push({event,at:new Date().toISOString()});localStorage.setItem('venuealign-events',JSON.stringify(events.slice(-200)));
  } catch(_) {}
}
function announce(message){$('#announcement').textContent=message;}
function statusOf(item){
  if(item.id==='VF-031'){
    if(state.decisions[item.id]==='approved') return 'Luma P4 approved';
    if(state.decisions[item.id]==='open') return 'Open · reviewer follow-up';
  }
  return item.status;
}
function recordOf(item){
  const decision=state.decisions[item.id] || (item.id==='VF-033'?'confirmed':item.id==='VF-032'?'open':'pending');
  return {
    recordId:item.id,category:item.name,sourceReferences:item.sources.map(s=>({...s})),
    proposedFinding:item.finding,unresolvedGap:item.gap,assignedReviewer:reviewer,reviewedDecision:decision,status:statusOf(item),
    alternatives:item.alternatives.map(a=>({...a,disposition:a.name==='Luma P4'&&decision==='approved'?'Approved by Inez Park':a.disposition})),
    nextAction:item.id==='VF-031'&&decision==='approved'?'Carry the reviewed Luma P4 into the example packet. Log the missing Arc P3 note as open.':item.action,
    decisionHistory:[...item.baselineHistory,...(state.history[item.id]||[])], exportStatus:state.lastExport?'Exported locally':'Ready for local export'
  };
}
function packet(){return {label:DEMO,account:'Lattice North Productions',tour,exportedAt:state.lastExport,records:cases.map(recordOf)};}
function chip(status){
  const approved=/approved|Confirmed/.test(status), pending=/Awaiting/.test(status);
  return '<span class="chip '+(approved?'good':pending?'mute':'warning')+'">'+escapeText(status)+'</span>';
}
function docDate(iso){return new Date(iso+'T12:00:00Z').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'});}
function logDate(iso){return new Date(iso).toLocaleString('en-GB',{year:'numeric',month:'short',day:'2-digit',hour:'2-digit',minute:'2-digit',timeZone:'UTC'})+' UTC';}
function sourceBlock(source,i){
  const seen=(state.seen[selected.id]||[]).includes(i);
  return '<div class="source"><h3>'+source.title+'</h3><p class="docmeta">'+source.id+' · '+source.version+' · '+docDate(source.date)+'</p><blockquote>'+source.quote+'</blockquote><button type="button" class="textbtn source-btn" data-source="'+i+'">'+(seen?'Reopen':'Inspect')+' '+(i?'venue':'rider')+' extract</button></div>';
}
function decisionBlock(item){
  if(item.id==='VF-031'){
    const approved=state.decisions[item.id]==='approved';
    return '<p class="piece-label">REVIEWER ACTION</p><div class="alt"><h3>Luma P4</h3><p>House comparison note C is signed. Inez Park can accept this alternate for LX-04.</p></div><div class="alt"><h3>Arc P3</h3><p>Comparison note missing. This alternative stays open.</p></div>'+
      (approved?'<div class="approved-state">'+chip('Luma P4 approved')+'<p class="hint">Recorded locally by Inez Park. The stage-spacing case remains open.</p></div>':'<button type="button" data-action="approve" class="primary">Approve Luma P4</button><p class="hint">Review both source extracts before approval.</p>')+
      (state.decisions[item.id]==='open'?'<p class="hint">Inez Park left the substitution open.</p>':'<button type="button" class="secondary" data-action="open">'+(approved?'Reopen substitution':'Leave substitution open')+'</button>');
  }
  if(item.id==='VF-032')return '<p class="piece-label">REVIEWER ACTION</p><figure class="casefigure"><img src="assets/stage-elevation.webp" alt="Illustrative front elevation of the stage masking"><figcaption>Touring set · Front elevation</figcaption></figure><h3>Request the field measurement</h3><p>The two dimensions cannot establish fit. The technical lead keeps this case on the advance list until the venue confirms usable width.</p>'+chip('Open · evidence incomplete')+(state.decisions[item.id]==='open'?'<p class="hint">Follow-up recorded in this session.</p>':'<button type="button" class="secondary" data-action="open">Record open follow-up</button>');
  return '<p class="piece-label">REVIEWED DECISION</p><h3>Contact confirmed</h3><p>Inez Park confirmed the named house stage contact on 10 Oct 2026. Include this entry in the handoff.</p>'+chip('Confirmed');
}
function render(){
  $('#queue').innerHTML=cases.map(c=>'<button type="button" class="case" data-id="'+c.id+'" aria-current="'+(c.id===selected.id)+'"><span class="caseid">'+c.id+'</span><b>'+c.name+'</b><small>'+statusOf(c)+'</small></button>').join('');
  const record=recordOf(selected);
  $('#record').innerHTML='<div class="record-head"><div class="row"><p class="kicker">'+selected.id+' &nbsp;/&nbsp; '+selected.area+'</p>'+chip(record.status)+'</div><h2>'+selected.name+'</h2><p class="piece-label finding-label">'+(selected.id==='VF-033'?'COORDINATOR RECORD':'AI-SUPPORTED FINDING')+'</p><p class="lede">'+record.proposedFinding+'</p></div>'+
    '<div class="record-body"><div><p class="piece-label">SOURCE EVIDENCE</p><div class="sources">'+selected.sources.map(sourceBlock).join('')+'</div><div class="case-instrument">'+caseFigures[selected.id]+'</div></div><div><p class="piece-label">ASSIGNED TO INEZ PARK</p><div class="decision">'+decisionBlock(selected)+'</div></div></div>'+
    '<div class="line"></div><div class="history"><details><summary>Decision history ('+record.decisionHistory.length+')</summary><ul>'+record.decisionHistory.map(h=>'<li><b>'+escapeText(logDate(h.at))+'</b> · '+escapeText(h.who)+'<br>'+escapeText(h.action)+'</li>').join('')+'</ul></details></div>'+
    '<div class="line"></div><div class="bottomline"><div><p class="piece-label">STOP 03 · ADVANCE PACKET</p><p>Three case records, including unresolved items.</p><p class="footmeta">'+(state.lastExport?'Last local export '+escapeText(logDate(state.lastExport)):'Ready for local export')+' · '+DEMO+'</p></div><button type="button" class="secondary" data-action="export">Export stop record</button></div>';
}
function selectCase(id){
  const chosen=cases.find(c=>c.id===id);if(!chosen)return;
  selected=chosen;$('#aside').classList.remove('open');$('.queue-toggle').setAttribute('aria-expanded','false');render();$('#record').focus({preventScroll:true});announce('Opened '+selected.id+' '+selected.name);
}
function inspect(i){
  const source=selected.sources[i]; if(!source)return;
  if(!state.seen[selected.id])state.seen[selected.id]=[];
  if(!state.seen[selected.id].includes(i))state.seen[selected.id].push(i);save();
  readFocus=i;$('#dialogBody').innerHTML='<span class="demo-tag">'+DEMO+'</span><p class="kicker" style="margin-top:22px">SOURCE DOCUMENT EXTRACT</p><h2 id="dialogTitle">'+source.title+'</h2><p class="docmeta">'+source.id+' · '+source.version+' · '+docDate(source.date)+'<br>'+source.location+'</p><blockquote>'+source.quote+'</blockquote><p>'+source.context+'</p>';$('#sourceDialog').showModal();
}
function applyDecision(action){
  if(action==='approve' && (state.seen[selected.id]||[]).length<2){
    const missing=[0,1].find(i=>!(state.seen[selected.id]||[]).includes(i));inspect(missing);return;
  }
  const value=action==='approve'?'approved':'open';state.decisions[selected.id]=value;state.lastExport=null;
  if(!state.history[selected.id])state.history[selected.id]=[];
  state.history[selected.id].push({at:new Date().toISOString(),who:'Inez Park · local simulated action',action:value==='approved'?'Approved Luma P4 for LX-04 after examining the two linked extracts. Arc P3 stays open.':'Left the case open for technical follow-up.'});
  track('reviewer_interaction');save();render();$('#record').focus({preventScroll:true});announce(statusOf(selected)+' recorded locally.');
}
function download(){
  state.lastExport=new Date().toISOString();save();const blob=new Blob([JSON.stringify(packet(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='VenueAlign-DEMO-Meridian-Hall.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);render();$('#record').querySelector('[data-action="export"]').focus({preventScroll:true});announce('Downloaded the simulated stop record.');track('demo_export');
}
function startWorkbench(){
  const linkedCase=cases.find(item=>item.id===location.hash.slice(1).toUpperCase());
  if(linkedCase)selected=linkedCase;
  render();track('demo_start');
  $('.queue-toggle').addEventListener('click',e=>e.currentTarget.setAttribute('aria-expanded',String($('#aside').classList.toggle('open'))));
  $('#queue').addEventListener('click',e=>{const btn=e.target.closest('[data-id]');if(btn)selectCase(btn.dataset.id);});
  $('#record').addEventListener('click',e=>{const source=e.target.closest('[data-source]');if(source){inspect(Number(source.dataset.source));return;}const btn=e.target.closest('[data-action]');if(!btn)return;if(btn.dataset.action==='export')download();else applyDecision(btn.dataset.action);});
  $('#closeDialog').addEventListener('click',()=>$('#sourceDialog').close());
  $('#sourceDialog').addEventListener('close',()=>{render();if(readFocus!==null)$('#record').querySelector('[data-source="'+readFocus+'"]').focus({preventScroll:true});readFocus=null;});
  $('#reset').addEventListener('click',()=>{state=initialState();selected=cases[0];save();render();announce('Restarted the fictional walkthrough.');});
}
if(typeof document!=='undefined' && document.querySelector('#record'))startWorkbench();
