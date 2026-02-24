// Simple module viewer script
function qs(param){ const u = new URL(location.href); return u.searchParams.get(param); }

const MODULES = {
  core: [
    {id:'waveform', title:'What is a wave (forms)', text:'Waves in QM: plane waves, wavepackets, Schrödinger solutions. Start with simple sinusoidal waves and progress to localized packets.' , video:'https://www.youtube.com/results?search_query=wave+function+animation', p0:0.5},
    {id:'state-vector', title:'State Vector & Quantum States', text:'State vectors (kets) and representations in position, momentum and spin bases.' , video:''},
    {id:'superposition', title:'Superposition', text:'Linear combination of states; interference and coherence.' , video:'https://www.youtube.com/results?search_query=quantum+superposition+animation', p0:0.5},
    {id:'waveparticle', title:'Wave–Particle Duality', text:'Historical experiments and modern interpretation of wave-particle duality: double-slit experiments, photons and electrons behaving as waves and particles.', video:'https://www.youtube.com/results?search_query=wave+particle+duality+animation', p0:0.5},
    {id:'measurement', title:'Measurement & Collapse', text:'Projective measurements, decoherence overview and measurement models.' , video:''}
  ],
  systems: [
    {id:'systems-overview', title:'Quantum Systems Overview', text:'Superconducting qubits, trapped ions, photonic systems and neutral atoms.' , video:''},
    {id:'noise', title:'Scalability & Noise', text:'Decoherence sources, error mitigation.' , video:''}
  ],
  info: [
    {id:'qubits-encoding', title:'Qubits & Encoding', text:'Logical vs physical qubits, encoding schemes.' , video:''},
    {id:'error-correction', title:'Error Correction Overview', text:'Basic ideas behind quantum error correction.' , video:''}
  ],
  atomic: [
    {id:'atom-light', title:'Atom-Light Interaction', text:'Absorption, emission and cavity QED basics.' , video:''},
    {id:'photonics', title:'Photonics & Detectors', text:'Single-photon sources and detectors.' , video:''}
  ],
  bloch: [
    {id:'bloch-intro', title:'Bloch Sphere Basics', text:'Representation of a qubit on the Bloch sphere; rotations and visualization.' , video:'https://www.youtube.com/results?search_query=bloch+sphere+animation'},
  ],
  solid: [
    {id:'superconduct', title:'Superconducting Circuits', text:'Josephson junctions and readout principles.' , video:''},
    {id:'condensed', title:'Condensed Matter Effects', text:'Band structure and excitations.' , video:''}
  ],
  stats: [
    {id:'bose-fermi', title:'Bose & Fermi Statistics', text:'Bose-Einstein and Fermi-Dirac statistics explained.' , video:''},
    {id:'thermal', title:'Thermal Effects', text:'Thermal noise and statistical mechanics in devices.' , video:''}
  ]
};

// Small indexed knowledge base for better offline AI replies
const KB = {
  'superposition': 'Superposition: a quantum system can exist in a linear combination of basis states. Measurement yields one outcome; amplitudes determine probabilities. Examples: qubit α|0>+β|1> with |α|^2+|β|^2=1.',
  'wavefunction': 'Wavefunction ψ(x,t): complex-valued amplitude whose squared magnitude gives probability density. Governed by the Schrödinger equation. Wavepackets localize particles.',
  'entanglement': 'Entanglement: non-classical correlations between parts of a composite system. Bell tests distinguish entangled from classically correlated states.',
  'heisenberg': 'Heisenberg uncertainty: for noncommuting operators A and B, ΔA ΔB ≥ |⟨[A,B]⟩|/2. Common example: Δx Δp ≥ ħ/2.'
};

let CURRENT_TOPIC = qs('topic') || 'core';
let CURRENT_MODULE = null;
let CURRENT_CHAT_TAB = 'notes';

function init(){
  document.getElementById('pmTopicLabel').textContent = CURRENT_TOPIC;
  document.getElementById('topicTitle').textContent = (CURRENT_TOPIC.charAt(0).toUpperCase()+CURRENT_TOPIC.slice(1));
  renderModuleList();
  // default select first module
  const list = MODULES[CURRENT_TOPIC] || [];
  if(list.length) selectModule(list[0].id);
  startCanvas();
}

function renderModuleList(){
  const nav = document.getElementById('moduleList'); nav.innerHTML = '';
  const arr = MODULES[CURRENT_TOPIC] || [];
  arr.forEach(m=>{
    const d = document.createElement('div'); d.className='module-item'; d.id='mod-'+m.id; d.innerHTML = '<strong>'+m.title+'</strong><div style="font-size:13px;color:#666;margin-top:6px">'+(m.text.slice(0,120))+'…</div>';
    d.onclick = ()=> selectModule(m.id);
    nav.appendChild(d);
  });
}

function selectModule(id){
  const arr = MODULES[CURRENT_TOPIC] || [];
  const mod = arr.find(x=>x.id===id); if(!mod) return;
  CURRENT_MODULE = mod.id;
  document.querySelectorAll('.module-item').forEach(el=>el.classList.remove('active'));
  const el = document.getElementById('mod-'+mod.id); if(el) el.classList.add('active');
  document.getElementById('moduleTitle').textContent = mod.title;
  document.getElementById('moduleBody').textContent = mod.text;
  // video embed
  const v = document.getElementById('videoEmbed'); v.innerHTML = '';
  if(mod.video){
    // Convert saved or default video to an embeddable URL
    const embedUrl = convertYoutubeToEmbed(mod.video);
    v.innerHTML = '';
    if(embedUrl){
      const wrap = document.createElement('div'); wrap.className = 'video-embed';
      const iframe = document.createElement('iframe'); iframe.src = embedUrl; iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; iframe.allowFullscreen = true; wrap.appendChild(iframe); v.appendChild(wrap);
    } else {
      const a = document.createElement('a'); a.href = mod.video; a.target = '_blank'; a.textContent = 'Open recommended videos (YouTube search)'; v.appendChild(a);
    }
  } else { v.textContent = 'No video for this module yet.' }
  
  // show/hide demos depending on module
  document.getElementById('waveDemo').style.display = 'none';
  document.getElementById('blochDemo').style.display = 'none';
  document.getElementById('measureDemo').style.display = 'none';
  if(mod.id.includes('wave') || mod.id.includes('waveparticle') || mod.id.includes('superposition')) document.getElementById('waveDemo').style.display='block';
  if(mod.id.includes('bloch') || mod.id.includes('state')) document.getElementById('blochDemo').style.display='block';
  if(mod.id.includes('measure') || mod.id.includes('probability')) document.getElementById('measureDemo').style.display='block';
  // reset chat view
  renderChat();
  // load saved video for this module (if any)
  const saved = localStorage.getItem('pm_video_'+CURRENT_TOPIC+'_'+CURRENT_MODULE);
  if(saved){
    document.getElementById('videoUrlInput').value = saved;
    const ev = convertYoutubeToEmbed(saved);
    if(ev){ v.innerHTML = ''; const wrap = document.createElement('div'); wrap.className='video-embed'; const iframe = document.createElement('iframe'); iframe.src = ev; iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; iframe.allowFullscreen=true; wrap.appendChild(iframe); v.appendChild(wrap); }
  } else { document.getElementById('videoUrlInput').value = ''; }
  // ensure canvases resize
  resizeCanvases();
}

// Convert various YouTube URL forms or search placeholders to an embeddable URL
function convertYoutubeToEmbed(url){
  if(!url) return null;
  try{
    const u = url.trim();
    // already an embed
    if(u.includes('youtube.com/embed/')) return u;
    // watch?v= -> embed/
    const watchIdx = u.indexOf('watch?v=');
    if(watchIdx !== -1){ const id = u.substring(watchIdx+8).split('&')[0]; return 'https://www.youtube.com/embed/'+id; }
    // youtu.be short link
    const byIdx = u.indexOf('youtu.be/'); if(byIdx!==-1){ const id = u.substring(byIdx+9).split('?')[0]; return 'https://www.youtube.com/embed/'+id; }
    // search placeholder like results?search_query=term -> embed search playlist
    const qIdx = u.indexOf('results?search_query='); if(qIdx!==-1){ const q = u.substring(qIdx + 'results?search_query='.length); return 'https://www.youtube.com/embed?listType=search&list='+encodeURIComponent(decodeURIComponent(q)); }
    // fallback: if it's a full youtube url, try to extract any v= or last path segment
    const m = u.match(/[?&]v=([^&]+)/); if(m && m[1]) return 'https://www.youtube.com/embed/'+m[1];
    const m2 = u.match(/youtu\.be\/(.+)/); if(m2 && m2[1]) return 'https://www.youtube.com/embed/'+m2[1].split('?')[0];
  }catch(e){}
  return null;
}

// CHAT: per-topic+module storage
function storageKey(topic,module,tab){ return 'pm_chat_'+topic+'_'+module+'_'+tab; }
function loadHistory(topic,module,tab){ try{ return JSON.parse(localStorage.getItem(storageKey(topic,module,tab))||'[]'); }catch(e){return [];} }
function saveHistory(topic,module,tab,arr){ localStorage.setItem(storageKey(topic,module,tab), JSON.stringify(arr||[])); }

function switchTab(tab){ CURRENT_CHAT_TAB = tab; document.getElementById('tabNotes').classList.toggle('active', tab==='notes'); document.getElementById('tabAI').classList.toggle('active', tab==='ai'); renderChat(); }

function renderChat(){ const c = document.getElementById('chatMessages'); c.innerHTML=''; if(!CURRENT_MODULE){ c.innerHTML='<div style="color:#666">Select a module to start a session.</div>'; return; } const hist = loadHistory(CURRENT_TOPIC,CURRENT_MODULE,CURRENT_CHAT_TAB); hist.forEach(m=> appendMsgToDOM(m.role,m.text,false)); }

function appendMsgToDOM(who,text,persist=true){ const c = document.getElementById('chatMessages'); const b=document.createElement('div'); b.style.marginBottom='8px'; if(who==='user') b.innerHTML = '<div style="text-align:right;color:#0b3b91;font-weight:600">You</div><div style="background:#e8f0ff;padding:8px;border-radius:6px">'+escapeHtml(text)+'</div>'; else if(who==='assistant') b.innerHTML = '<div style="color:#333;font-weight:600">Assistant</div><div style="background:#f5f7fb;padding:8px;border-radius:6px">'+escapeHtml(text)+'</div>'; else b.innerHTML = '<div style="font-size:12px;color:#666">'+escapeHtml(text)+'</div>'; c.appendChild(b); c.scrollTop = c.scrollHeight; if(persist){ const hist = loadHistory(CURRENT_TOPIC,CURRENT_MODULE,CURRENT_CHAT_TAB); hist.push({role:who,text:text}); saveHistory(CURRENT_TOPIC,CURRENT_MODULE,CURRENT_CHAT_TAB,hist); } }

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];}); }

async function sendMessage(){ const input = document.getElementById('chatInput'); const prompt = input.value.trim(); if(!prompt) return; appendMsgToDOM('user',prompt); input.value=''; if(!CURRENT_MODULE){ appendMsgToDOM('system','Select a module first.'); return; }
  // If AI tab, try wiki lookup when online
  if(CURRENT_CHAT_TAB === 'ai'){
    appendMsgToDOM('system','Searching web resources for a short summary...');
    // Check local KB first for a quick high-quality reply
    for(const k of Object.keys(KB)){
      if(prompt.toLowerCase().includes(k)) { appendMsgToDOM('assistant', KB[k]); return; }
    }
    try{
      const s = encodeURIComponent(prompt);
      const searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+s+'&limit=1&namespace=0&format=json&origin=*';
      const res = await fetch(searchUrl);
      if(res.ok){
        const j = await res.json();
        const title = (j && j[1] && j[1][0]) || null;
        if(title){
          const sumUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
          const r2 = await fetch(sumUrl);
          if(r2.ok){ const data = await r2.json(); const out = (data.extract && data.extract.length>0)? data.extract : ('Found: '+title); appendMsgToDOM('assistant', out); return; }
        }
      }
    }catch(e){ /* fall through to local responder */ }
    // fallback local responder
    localResponder(prompt);
    return;
  }
  // Notes tab: return module snippet matching
  if(CURRENT_CHAT_TAB === 'notes'){
    const mod = (MODULES[CURRENT_TOPIC]||[]).find(x=>x.id===CURRENT_MODULE);
    if(!mod) { appendMsgToDOM('assistant','No module info available'); return; }
    const lower = prompt.toLowerCase();
    if(mod.title.toLowerCase().includes(lower) || mod.text.toLowerCase().includes(lower)) appendMsgToDOM('assistant', mod.title+'\n\n'+mod.text);
    else appendMsgToDOM('assistant','No direct match. Try keywords from the module title.');
  }
}

// Export/import per-module data (pm_chat_*, pm_video_*)
function exportData(){
  const keys = Object.keys(localStorage).filter(k=>k.startsWith('pm_chat_')||k.startsWith('pm_video_'));
  const obj = {};
  keys.forEach(k=> obj[k]=localStorage.getItem(k));
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'physics_module_export.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function importData(file){
  const reader = new FileReader(); reader.onload = ()=>{
    try{ const obj = JSON.parse(reader.result); Object.keys(obj).forEach(k=> localStorage.setItem(k, obj[k])); alert('Imported '+Object.keys(obj).length+' items.'); location.reload(); }catch(e){ alert('Invalid file'); }
  };
  reader.readAsText(file);
}

function promptImport(){ const inp = document.createElement('input'); inp.type='file'; inp.accept='application/json'; inp.onchange = (e)=>{ if(e.target.files && e.target.files[0]) importData(e.target.files[0]); }; inp.click(); }

function saveModuleVideo(){ if(!CURRENT_MODULE) { alert('Open a module first.'); return; } const url = document.getElementById('videoUrlInput').value.trim(); if(!url) { localStorage.removeItem('pm_video_'+CURRENT_TOPIC+'_'+CURRENT_MODULE); alert('Cleared saved video for this module.'); selectModule(CURRENT_MODULE); return; } localStorage.setItem('pm_video_'+CURRENT_TOPIC+'_'+CURRENT_MODULE, url); alert('Saved video URL for this module (stored locally).'); selectModule(CURRENT_MODULE); }

// Make canvas sizes responsive to container width
function resizeCanvases(){
  // wave canvas: full width of its container
  const wave = document.getElementById('waveCanvas'); if(wave){ const parentW = Math.min(wave.parentElement.clientWidth, 900); wave.width = parentW; wave.height = Math.round(parentW*0.31); if(ctx) drawWave(tframe); }
  const bloch = document.getElementById('blochCanvas'); if(bloch){ const w = Math.min(bloch.parentElement.clientWidth, 360); bloch.width = w; bloch.height = w; renderBloch(); }
  const measure = document.getElementById('measureCanvas'); if(measure){ const w = Math.min(measure.parentElement.clientWidth, 480); measure.width = w; measure.height = Math.round(w*0.33); if(measureCtx) clearMeasurement(); }
}
window.addEventListener('resize', ()=>{ resizeCanvases(); });

function localResponder(prompt){ const lower = prompt.toLowerCase(); if(lower.includes('superposition')) appendMsgToDOM('assistant','Superposition: a system can be in multiple states simultaneously. For example a qubit can be α|0⟩+β|1⟩.'); else if(lower.includes('wave')||lower.includes('wavefunction')) appendMsgToDOM('assistant','Wavefunction ψ(x,t) gives probability amplitude; |ψ|^2 is probability density.'); else if(lower.includes('entangl')) appendMsgToDOM('assistant','Entanglement: correlated states between subsystems producing non-classical correlations.'); else appendMsgToDOM('assistant','I could not find web results — try shorter keywords or switch to Notes tab for module snippets.'); }

// Demos: wave, bloch and measurement
let canvas, ctx, animId;
let blochCtx = null, measureCtx = null;

function startCanvas(){
  // wave canvas
  canvas = document.getElementById('waveCanvas');
  if(canvas){
    ctx = canvas.getContext('2d');
    drawWave(0);
    document.getElementById('freq').addEventListener('input', ()=>drawWave());
    document.getElementById('width').addEventListener('input', ()=>drawWave());
    document.getElementById('animate').addEventListener('change', ()=>{ if(document.getElementById('animate').checked) animate(); else cancelAnimationFrame(animId); });
  }

  // bloch canvas
  const bcanvas = document.getElementById('blochCanvas');
  if(bcanvas){ blochCtx = bcanvas.getContext('2d'); document.getElementById('theta').addEventListener('input', renderBloch); document.getElementById('phi').addEventListener('input', renderBloch); renderBloch(); }

  // measurement canvas
  const mcanvas = document.getElementById('measureCanvas'); if(mcanvas){ measureCtx = mcanvas.getContext('2d'); }

  // hits toggle
  const hitsEl = document.getElementById('showHits'); if(hitsEl) hitsEl.addEventListener('change', ()=>drawWave());

  animate();
}

let tframe=0;
function animate(){ cancelAnimationFrame(animId); const doAnim = document.getElementById('animate') && document.getElementById('animate').checked; if(doAnim){ tframe+=0.02; drawWave(tframe); animId = requestAnimationFrame(animate);} }

function drawWave(offset=0){
  if(!ctx) return; const w = canvas.width, h = canvas.height; ctx.clearRect(0,0,w,h); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h);
  const freq = parseFloat(document.getElementById('freq').value||5);
  const width = parseFloat(document.getElementById('width').value||1.2);

  // wave
  ctx.beginPath();
  for(let x=0;x<w;x++){
    const xr = (x/w-0.5)*10;
    const envelope = Math.exp(-Math.pow(xr/width,2));
    const y = Math.sin(freq*(xr - offset))*envelope;
    const yy = h/2 - y*(h/3);
    if(x===0) ctx.moveTo(x,yy); else ctx.lineTo(x,yy);
  }
  ctx.strokeStyle='#1f75ff'; ctx.lineWidth=2; ctx.stroke();

  // interference intensity strip
  ctx.fillStyle = 'rgba(0,120,200,0.06)'; ctx.fillRect(0,h-36,w,36);
  const intensity = new Float32Array(w);
  for(let x=0;x<w;x++){
    const xr = (x/w-0.5)*10;
    const a1 = Math.sin(freq*(xr - offset));
    const a2 = Math.sin(freq*(xr - offset - 0.6));
    const I = (a1+a2)*(a1+a2);
    intensity[x]=I;
  }
  let maxI=0; for(let i=0;i<w;i++) if(intensity[i]>maxI) maxI=intensity[i]; if(maxI<=0) maxI=1;
  for(let x=0;x<w;x++){ const val = intensity[x]/maxI; ctx.fillStyle = 'rgba(30,100,200,'+ (0.08*val) +')'; ctx.fillRect(x,h-36,1,36); }

  // particle hits sampling when enabled
  const showHits = document.getElementById('showHits') && document.getElementById('showHits').checked;
  if(showHits){
    const hits = 220;
    // construct cumulative distribution
    const cum = new Float32Array(w);
    let s=0; for(let i=0;i<w;i++){ s+=intensity[i]; cum[i]=s; }
    for(let i=0;i<hits;i++){
      const r = Math.random()*s; let idx = 0; while(idx<w && cum[idx]<r) idx++; const px = Math.max(0,Math.min(w-1, idx)); const py = Math.floor(h-10 - Math.random()*28);
      ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(px,py,2,2);
    }
  }
}

// Bloch sphere rendering (2D projection)
function renderBloch(){ if(!blochCtx) return; const canvas = blochCtx.canvas; const w = canvas.width, h = canvas.height; blochCtx.clearRect(0,0,w,h); blochCtx.fillStyle='#fff'; blochCtx.fillRect(0,0,w,h);
  const cx = w/2, cy = h/2, r = Math.min(w,h)/2 - 16;
  // sphere circle
  blochCtx.strokeStyle='#cfe5ff'; blochCtx.lineWidth=2; blochCtx.beginPath(); blochCtx.arc(cx,cy,r,0,Math.PI*2); blochCtx.stroke();
  // axes
  blochCtx.strokeStyle='#e6eef8'; blochCtx.beginPath(); blochCtx.arc(cx,cy,r,0,Math.PI); blochCtx.stroke();
  // vector from theta, phi
  const theta = parseFloat(document.getElementById('theta').value||60) * Math.PI/180;
  const phi = parseFloat(document.getElementById('phi').value||30) * Math.PI/180;
  const x = r * Math.sin(theta) * Math.cos(phi);
  const y = -r * Math.cos(theta);
  const z = r * Math.sin(theta) * Math.sin(phi);
  // draw vector projection
  blochCtx.strokeStyle='#1f75ff'; blochCtx.lineWidth=3; blochCtx.beginPath(); blochCtx.moveTo(cx,cy); blochCtx.lineTo(cx + x, cy + y); blochCtx.stroke();
  // label
  blochCtx.fillStyle='#003366'; blochCtx.font='13px Arial'; blochCtx.fillText('θ='+Math.round(theta*180/Math.PI)+'°, φ='+Math.round(phi*180/Math.PI)+'°', 12, 18);
}

// Gate operations (X, Y, Z, H) apply rotations to theta/phi or delegate to 3D Bloch
function applyGate(gate){
  if(window.Bloch3D && typeof Bloch3D.applyGate === 'function'){
    Bloch3D.applyGate(gate);
    return;
  }
  // fallback: 2D behaviour
  let theta = parseFloat(document.getElementById('theta').value||60) * Math.PI/180;
  let phi = parseFloat(document.getElementById('phi').value||30) * Math.PI/180;
  let nx = Math.sin(theta)*Math.cos(phi);
  let ny = Math.sin(theta)*Math.sin(phi);
  let nz = Math.cos(theta);
  if(gate==='X'){ nx = nx; ny = -ny; nz = -nz; }
  if(gate==='Y'){ nx = -nx; ny = ny; nz = -nz; }
  if(gate==='Z'){ nx = -nx; ny = -ny; nz = nz; }
  if(gate==='H'){ const tx = nz; const tz = nx; nx = tx; nz = tz; ny = -ny; }
  const newTheta = Math.acos(nz);
  const newPhi = Math.atan2(ny, nx);
  animateBlochTransition(newTheta*180/Math.PI, (newPhi*180/Math.PI+360)%360);
}

function animateBlochTransition(targetTheta, targetPhi){
  if(window.Bloch3D && typeof Bloch3D.animateTo === 'function'){
    Bloch3D.animateTo(targetTheta, targetPhi);
    return;
  }
  const startTheta = parseFloat(document.getElementById('theta').value||60);
  const startPhi = parseFloat(document.getElementById('phi').value||30);
  const steps = 30; let i=0;
  const it = setInterval(()=>{
    i++; const t = i/steps;
    const th = startTheta + (targetTheta-startTheta)*t;
    let dphi = targetPhi - startPhi;
    if(dphi>180) dphi-=360; if(dphi<-180) dphi+=360;
    const ph = startPhi + dphi*t;
    document.getElementById('theta').value = th; document.getElementById('phi').value = (ph+360)%360; renderBloch();
    if(i>=steps) clearInterval(it);
  }, 12);
}

function resetBloch(){ if(window.Bloch3D && typeof Bloch3D.reset === 'function'){ Bloch3D.reset(); return; } document.getElementById('theta').value = 60; document.getElementById('phi').value = 30; renderBloch(); }

// Measurement simulation: simple two-outcome measurement histogram
function runMeasurement(){
  if(!measureCtx || !CURRENT_MODULE) return;
  const shots = parseInt(document.getElementById('shots').value||200,10);
  // determine p0: prefer explicit module p0, else heuristics
  const arr = MODULES[CURRENT_TOPIC] || [];
  const mod = arr.find(x=>x.id===CURRENT_MODULE);
  let p0 = 0.5;
  if(mod && typeof mod.p0 === 'number') p0 = mod.p0;
  else if(mod && /superposition|state|qubit|bloch/i.test(mod.title)) p0=0.5;
  else if(mod && /measurement|probability/i.test(mod.title)) p0=0.35;

  const counts = {0:0,1:0};
  for(let i=0;i<shots;i++){ counts[Math.random() < p0 ? 0:1]++; }

  // draw bar chart
  const c = measureCtx.canvas; const w=c.width, h=c.height;
  measureCtx.clearRect(0,0,w,h); measureCtx.fillStyle='#fff'; measureCtx.fillRect(0,0,w,h);
  const max = Math.max(counts[0],counts[1]) || 1; const bw = 120; const gap = 40; const x0 = 60;
  // bar 0
  measureCtx.fillStyle='#1f75ff'; measureCtx.fillRect(x0, h-20 - (counts[0]/max)*(h-60), bw, (counts[0]/max)*(h-60)); measureCtx.fillStyle='#003366'; measureCtx.fillText('0: '+counts[0], x0, h-6);
  // bar 1
  measureCtx.fillStyle='#ff6b6b'; measureCtx.fillRect(x0 + bw + gap, h-20 - (counts[1]/max)*(h-60), bw, (counts[1]/max)*(h-60)); measureCtx.fillStyle='#660000'; measureCtx.fillText('1: '+counts[1], x0 + bw + gap, h-6);

  // show percentages
  const pct0 = Math.round(100*counts[0]/shots); const pct1 = 100 - pct0;
  const resultEl = document.getElementById('measureResult'); if(resultEl) resultEl.textContent = `0: ${counts[0]} (${pct0}%), 1: ${counts[1]} (${pct1}%)`;
}

function clearMeasurement(){ if(!measureCtx) return; measureCtx.clearRect(0,0,measureCtx.canvas.width, measureCtx.canvas.height); const resultEl = document.getElementById('measureResult'); if(resultEl) resultEl.textContent='—'; }

function initOnLoad(){ init(); }
window.addEventListener('DOMContentLoaded', initOnLoad);
