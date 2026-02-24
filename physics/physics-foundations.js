function goBackGlobal() { window.history.back(); }

// Topics content map (six topics). Each topic has a title and an array of sections.
const TOPICS = {
    core: {
        label: 'Core Quantum Mechanics',
        sections: [
            {h:'What is a wave? — Forms (Basics → Advanced)', t:'Waves describe how physical quantities vary in space and time. In quantum mechanics the wave is represented by the wavefunction (ψ), which encodes probability amplitudes. Start with plane waves, move to wavepackets, and then to Schrödinger solutions.'},
            {h:'State Vector & Quantum States', t:'The state vector (ket |ψ⟩) is an abstract representation in Hilbert space. Pure states, basis expansions, and unitary transforms connect representations.'},
            {h:'Superposition', t:'Linear combination of states and interference; superposition enables phenomena like interference and quantum algorithms.'},
            {h:'Measurement & Collapse', t:'Measurement projects states onto eigenstates of observables; decoherence provides a practical view of apparent collapse.'},
            {h:'Expectation Values', t:'⟨A⟩ = ⟨ψ|A|ψ⟩ gives the mean outcome over many measurements; variance quantifies spread.'},
            {h:'Heisenberg Uncertainty', t:'Δx Δp ≥ ħ/2 arises from non-commuting operators; it limits simultaneous precision.'},
            {h:'Entanglement', t:'Quantum correlations between subsystems; resource for teleportation, superdense coding and more.'}
        ]
    },
    systems: { label:'Quantum Systems in Technology', sections:[ {h:'Overview', t:'Superconducting qubits, trapped ions, photonics and neutral atoms—design tradeoffs and use-cases.'}, {h:'Scalability & Noise', t:'Sources of decoherence, error mitigation, and engineering challenges.'} ] },
    info: { label:'Quantum Information Physics', sections:[ {h:'Qubits & Encoding', t:'How information is encoded in quantum systems, logical vs physical qubits.'}, {h:'Entanglement & Communication', t:'Entanglement-based protocols and error correction basics.'} ] },
    atomic: { label:'Atomic, Optical & Light-Matter Interaction', sections:[ {h:'Atom-Light Interaction', t:'Absorption, emission, stimulated emission, and cavity QED basics.'}, {h:'Photonics', t:'Single-photon sources, detectors, and applications.'} ] },
    solid: { label:'Solid State Quantum Physics', sections:[ {h:'Superconducting Circuits', t:'Josephson junctions, LC modes, and readout principles.'}, {h:'Condensed Matter Effects', t:'Band structure, excitations, and role in qubit implementations.'} ] },
    stats: { label:'Quantum Statistics', sections:[ {h:'Bose & Fermi', t:'Bose-Einstein and Fermi-Dirac statistics, and implications for many-body physics.'}, {h:'Thermal Effects', t:'Quantum statistical mechanics in realistic devices.'} ] }
};

let CURRENT_TOPIC = null;
let CURRENT_TAB = 'notes'; // 'notes' or 'ai'

function openTopic(id) {
    if (!TOPICS[id]) return;
    CURRENT_TOPIC = id;
    const el = document.getElementById('core-details');
    el.classList.add('active');
    el.setAttribute('aria-hidden','false');
    renderTopic(id);
    document.getElementById('currentTopicLabel').textContent = TOPICS[id].label;
    // reset to notes tab on open
    switchChatTab('notes');
    el.scrollIntoView({behavior:'smooth', block:'start'});
}

function closeCoreDetails() {
    const el = document.getElementById('core-details'); if (!el) return;
    el.classList.remove('active'); el.setAttribute('aria-hidden','true'); window.scrollTo({top:0,behavior:'smooth'});
}

function renderTopic(id) {
    const container = document.getElementById('detailContent');
    container.innerHTML = '';
    const topic = TOPICS[id];
    const title = document.createElement('h2'); title.textContent = topic.label; title.style.color='#003366'; title.style.marginBottom='10px'; container.appendChild(title);
    // Open full module screen button
    const openBtn = document.createElement('a');
    openBtn.className = 'study-button';
    openBtn.style.display = 'inline-block';
    openBtn.style.padding = '8px 14px';
    openBtn.style.marginBottom = '12px';
    openBtn.href = 'physics-module.html?topic=' + encodeURIComponent(id);
    openBtn.textContent = 'Open Full Module Screen →';
    container.appendChild(openBtn);
    topic.sections.forEach(s=>{
        const d = document.createElement('div'); d.className='detail-topic';
        const h = document.createElement('h3'); h.textContent = s.h; h.style.marginBottom='6px'; d.appendChild(h);
        const p = document.createElement('p'); p.textContent = s.t; d.appendChild(p);
        container.appendChild(d);
    });
}

// Chat system: store histories keyed by topic + tab
function storageKey(topic, tab){ return 'pf_chat_'+topic+'_'+tab; }

function loadHistory(topic, tab){
    try { return JSON.parse(localStorage.getItem(storageKey(topic,tab))||'[]'); } catch(e){ return []; }
}

function saveHistory(topic, tab, arr){ localStorage.setItem(storageKey(topic,tab), JSON.stringify(arr||[])); }

function switchChatTab(tab){
    CURRENT_TAB = tab;
    document.getElementById('tabNotes').style.background = tab==='notes'? '#f7fbff':'white';
    document.getElementById('tabAI').style.background = tab==='ai'? '#f7fbff':'white';
    renderChat();
}

function renderChat(){
    const container = document.getElementById('chatMessages'); container.innerHTML='';
    if (!CURRENT_TOPIC) { appendMessage('system','Open a topic to start a session.'); return; }
    const hist = loadHistory(CURRENT_TOPIC, CURRENT_TAB);
    hist.forEach(m=> appendMessage(m.role, m.text, false));
}

function appendMessage(who, text, persist=true){
    const container = document.getElementById('chatMessages'); if (!container) return;
    const b = document.createElement('div'); b.style.marginBottom='8px';
    if (who==='user') b.innerHTML = '<div style="text-align:right;color:#0b3b91;font-weight:600">You</div><div style="background:#e8f0ff;padding:8px;border-radius:6px;">'+escapeHtml(text)+'</div>';
    else if (who==='assistant') b.innerHTML = '<div style="color:#333;font-weight:600">Assistant</div><div style="background:#f5f7fb;padding:8px;border-radius:6px;">'+escapeHtml(text)+'</div>';
    else b.innerHTML = '<div style="font-size:12px;color:#666">'+escapeHtml(text)+'</div>';
    container.appendChild(b); container.scrollTop = container.scrollHeight;
    if (persist && CURRENT_TOPIC) {
        const hist = loadHistory(CURRENT_TOPIC, CURRENT_TAB);
        hist.push({role:who, text:text}); saveHistory(CURRENT_TOPIC, CURRENT_TAB, hist);
    }
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];}); }

// Simple local responder: for 'notes' tab try to find matching section text; for 'ai' tab give a short explanatory reply synthesized from topic.
function sendChat(){
    const input = document.getElementById('chatInput'); if (!input) return; const prompt = input.value.trim(); if (!prompt) return;
    appendMessage('user', prompt);
    input.value = '';
    if (!CURRENT_TOPIC) { appendMessage('system','Open a topic first.'); return; }

    const topic = TOPICS[CURRENT_TOPIC];
    const lower = prompt.toLowerCase();

    // NOTES tab: return best-matching section snippet
    if (CURRENT_TAB === 'notes'){
        let found = null;
        topic.sections.forEach(s=>{ if (!found && (s.h.toLowerCase().includes(lower) || s.t.toLowerCase().includes(lower) || lower.split(' ').some(w=> s.t.toLowerCase().includes(w)))) found = s; });
        if (found) appendMessage('assistant', found.h + '\n\n' + found.t);
        else appendMessage('assistant', 'No direct snippet found. Try shorter keywords (e.g. "superposition", "wavefunction", "entanglement").');
        return;
    }

    // AI tab: produce a short synthesized explanation using available section texts
    if (CURRENT_TAB === 'ai'){
        // try exact match first
        let found = null;
        topic.sections.forEach(s=>{ if (!found && (s.h.toLowerCase().includes(lower) || s.t.toLowerCase().includes(lower))) found = s; });
        if (found) {
            appendMessage('assistant', 'Explanation — ' + found.h + '\n\n' + found.t + '\n\nTip: ask for examples or simple analogies.');
            return;
        }
        // fallback: synthesize from all sections
        const synth = topic.sections.map(s=>'• '+s.h+': '+s.t).join('\n\n');
        appendMessage('assistant', 'Summary of '+topic.label+':\n\n'+ synth.split('\n\n').slice(0,6).join('\n\n') + '\n\nAsk a focused question to get a shorter answer.');
    }
}

// Initialize: show a small hint in chat
document.addEventListener('DOMContentLoaded', function(){ appendMessage('system','Open a topic to begin. Use the two chat tabs: Topic Notes and AI Assistant. Conversations are stored locally per topic.'); });
