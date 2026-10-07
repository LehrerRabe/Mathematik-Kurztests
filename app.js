import {TOPICS, GRADES, TYPE_LABEL, topicsForGrade, topicByKey, generate, replaceItem} from './bank.js';
import {Store, ONLINE} from './store.js';
import {DEFAULT_SCALE, gradeFor, avgGrade, scaleToText} from './grading.js';
import {scoreTest} from './evaluate.js';
import {esc, todayISO, deDate, fmt, uid, pinHash, code} from './util.js';
import {aiItems, aiConfigured} from './ai.js';
import {TEACHER_PIN_HASH} from './config.js';
import {encodeTest, decodeTest, canUseSeed} from './share.js';
import qrcode from './qrcode-lib.mjs';

const app = document.getElementById('app');
const head = document.getElementById('head');
const S = {}; // Sitzungszustand

/* ---------- Helfer ---------- */
function h(html){ const d=document.createElement('div'); d.innerHTML=html.trim();
  if(d.children.length===1) return d.firstElementChild;
  const f=document.createDocumentFragment(); while(d.firstElementChild) f.appendChild(d.firstElementChild); return f; }
function toast(msg){ const t=h('<div class="toast">'+esc(msg)+'</div>'); document.body.appendChild(t); setTimeout(()=>t.remove(),2600); }
function go(hash){ location.hash = hash; }
function qs(sel,root){ return (root||document).querySelector(sel); }
function qsa(sel,root){ return [...(root||document).querySelectorAll(sel)]; }
function ls(k,d){ try{ const v=localStorage.getItem('mt_'+k); return v===null?d:JSON.parse(v);}catch(e){return d;} }
function lset(k,v){ localStorage.setItem('mt_'+k, JSON.stringify(v)); }
function scale(){ return ls('scale', DEFAULT_SCALE); }
async function busy(fn){ try{ return await fn(); }catch(e){ console.error(e); toast('Fehler: '+e.message); } }
function baseUrl(){ return location.origin + location.pathname; }

/* ---------- Kopfzeile ---------- */
const MENU = [
  ['#/',                'Startseite'],
  ['sep',''],
  ['#/lehrer/neu',           'Test erstellen'],
  ['#/lehrer/bibliothek',    'Bibliothek'],
  ['#/lehrer/klassen',       'Klassen'],
  ['#/lehrer/auswertung',    'Auswertung'],
  ['#/lehrer/einstellungen', 'Einstellungen']
];
function renderHead(){
  head.innerHTML = '<h1>Mathe-Kurztests</h1><span class="sp"></span>'
    + '<span class="badge '+(ONLINE?'on':'')+'">'+(ONLINE?'Cloud verbunden':'Einzelplatz-Modus')+'</span>'
    + '<div class="menu"><button class="sm" id="menuBtn" aria-expanded="false">\u2630 Men\u00fc</button>'
    + '<div class="menupanel hide" id="menuPanel">'
    + MENU.map(([t,l])=> t==='sep' ? '<hr class="sep">' : '<button data-go="'+t+'">'+esc(l)+'</button>').join('')
    + '</div></div>';
  if(pinRequired() && isUnlocked()){
    qs('#menuPanel').insertAdjacentHTML('beforeend','<hr class="sep"><button data-lock="1">Lehrer-Bereich sperren</button>');
  }
  const btn=qs('#menuBtn'), panel=qs('#menuPanel');
  const close=()=>{ panel.classList.add('hide'); btn.setAttribute('aria-expanded','false'); };
  btn.onclick=e=>{ e.stopPropagation();
    const willOpen=panel.classList.contains('hide');
    panel.classList.toggle('hide',!willOpen); btn.setAttribute('aria-expanded', willOpen?'true':'false');
    if(willOpen) setTimeout(()=>document.addEventListener('click', close, {once:true}), 0); };
  const lb=qs('button[data-lock]',panel);
  if(lb) lb.onclick=()=>{ close(); relock(); toast('Lehrer-Bereich gesperrt.'); go('#/'); };
  qsa('button[data-go]',panel).forEach(b=>b.onclick=()=>{
    close();
    if(S.running && !confirm('Der laufende Test wird dabei abgebrochen und nicht gespeichert. Trotzdem zum Men\u00fc?')) return;
    if(S.draft && S.draft.items && S.draft.items.length && !b.dataset.go.endsWith('/neu')
       && !confirm('Der noch nicht gespeicherte Test geht dabei verloren. Trotzdem wechseln?')) return;
    S.running=false;
    if(location.hash===b.dataset.go) route(); else go(b.dataset.go);
  });
}

/* ---------- Router ---------- */
async function route(){
  const p0=(location.hash||'#/').slice(2).split('/')[0];
  if(p0!=='t'&&p0!=='k') S.running=false;
  renderHead();
  const p = (location.hash||'#/').slice(2).split('/');
  if(p[0]==='lehrer') return teacher(p[1]||'neu');
  if(p[0]==='k')      return classEntry(p[1]);
  if(p[0]==='t')      return codeEntry(p[1]);
  if(p[0]==='s')      return selfTest((location.hash||'').split('#/s/')[1]||'');
  return home();
}
window.addEventListener('hashchange', route);

/* ================= START ================= */
function home(){
  app.innerHTML = '';
  app.appendChild(h(`<div class="card">
    <h2>Willkommen</h2>
    <p class="sub">Kurztests für den Mathematikunterricht am Gymnasium in NRW – Jahrgang 5 bis 10.</p>
    <div class="row">
      <button class="primary" id="tBtn">Ich bin die Lehrkraft</button>
      <button id="sBtn">Ich bin Schüler:in</button>
    </div>
  </div>
  <div class="card hide" id="codeCard">
    <h2>Test-Code eingeben</h2>
    <p class="sub">Den sechsstelligen Code bekommst du von deiner Lehrkraft.</p>
    <input id="codeIn" placeholder="z. B. K7P2QM" autocapitalize="characters" style="text-transform:uppercase;letter-spacing:.2em;font-weight:700">
    <div class="row end" style="margin-top:12px"><button class="primary" id="codeGo">Weiter</button></div>
  </div>`));
  qs('#tBtn').onclick = ()=>go('#/lehrer/neu');
  qs('#sBtn').onclick = ()=>qs('#codeCard').classList.remove('hide');
  qs('#codeGo').onclick = ()=>{ const c=qs('#codeIn').value.trim().toUpperCase(); if(c) go('#/t/'+c); };
  qs('#codeIn').addEventListener('keydown',e=>{ if(e.key==='Enter') qs('#codeGo').click(); });
}

/* ================= LEHRKRAFT ================= */
function pinRequired(){ return (ls('pin_hash', null) ?? TEACHER_PIN_HASH) || ''; }
function isUnlocked(){
  if(!pinRequired()) return true;
  if(S.unlocked) return true;
  try{ if(sessionStorage.getItem('mt_unlocked')===pinRequired()){ S.unlocked=true; return true; } }catch(e){}
  return false;
}
function unlock(){ S.unlocked=true; try{ sessionStorage.setItem('mt_unlocked', pinRequired()); }catch(e){} }
function relock(){ S.unlocked=false; try{ sessionStorage.removeItem('mt_unlocked'); }catch(e){} }

async function teacher(tab){
  if(!isUnlocked()){ return lock(); }
  app.innerHTML='';
  const nav = h(`<div class="tabs">
    <button data-t="neu">Test erstellen</button>
    <button data-t="bibliothek">Bibliothek</button>
    <button data-t="klassen">Klassen</button>
    <button data-t="auswertung">Auswertung</button>
    <button data-t="einstellungen">Einstellungen</button></div>`);
  qsa('button',nav).forEach(b=>{ if(b.dataset.t===tab) b.setAttribute('aria-current','true');
    b.onclick=()=>{
      const ziel='#/lehrer/'+b.dataset.t;
      if(S.draft && S.draft.items && S.draft.items.length
         && !confirm('Der noch nicht gespeicherte Test geht dabei verloren. Trotzdem wechseln?')) return;
      S.draft=null; S.editing=null;
      if(location.hash===ziel) route(); else go(ziel);
    }; });
  app.appendChild(nav);
  const body = h('<div id="tbody"></div>'); app.appendChild(body);
  if(tab==='neu') return viewNew(body);
  if(tab==='bibliothek') return viewLibrary(body);
  if(tab==='klassen') return viewClasses(body);
  if(tab==='auswertung') return viewResults(body);
  return viewSettings(body);
}
function lock(){
  app.innerHTML='';
  app.appendChild(h(`<div class="card"><h2>Lehrer-Bereich</h2>
    <p class="sub">Dieser Bereich ist mit einem Passwort geschützt.</p>
    <label for="pin">Passwort</label><input type="password" id="pin" autocomplete="current-password">
    <div class="row end" style="margin-top:12px"><button class="primary" id="ok">Öffnen</button></div>
    <div class="note" style="margin-top:14px">Du bist Schüler:in? Dann geht es über den Klassenlink oder den Test-Code deiner Lehrkraft weiter – nicht hier entlang.</div></div>`));
  const tryIt=()=>{ if(pinHash(qs('#pin').value)===pinRequired()){ unlock(); route(); }
                    else { toast('Das Passwort stimmt nicht.'); qs('#pin').select(); } };
  qs('#ok').onclick=tryIt;
  qs('#pin').addEventListener('keydown',e=>{if(e.key==='Enter')tryIt();});
  qs('#pin').focus();
}

/* ---------- Test erstellen ---------- */
function viewNew(root){
  const g = S.grade || 5;
  root.innerHTML='';
  root.appendChild(h(`<div class="card">
    <h2>Neuen Test erzeugen</h2>
    <p class="sub">Aufgaben orientieren sich am Kernlehrplan Mathematik NRW (G9) und der Kapitelfolge des Lambacher Schweizer.</p>
    <label for="gsel">Jahrgangsstufe</label>
    <select id="gsel">${GRADES.map(x=>`<option value="${x}" ${x===g?'selected':''}>Klasse ${x}</option>`).join('')}</select>
    <label>Thema (Mehrfachauswahl möglich – ohne Auswahl werden alle Themen des Jahrgangs gemischt)</label>
    <div class="chips" id="topics"></div>
    <label>Aufgabentypen</label>
    <div class="chips" id="types">${Object.entries(TYPE_LABEL).map(([k,v])=>
      `<label class="chip sel"><input type="checkbox" value="${k}" checked> ${v}</label>`).join('')}</div>
    <div class="grid2">
      <div><label for="cnt">Anzahl der Testfragen insgesamt</label><input id="cnt" type="number" min="1" max="40" value="${S.count||8}"></div>
      <div><label for="auto">Davon automatisch aus der Aufgabenbank</label><input id="auto" type="number" min="0" max="40" value="${S.count||8}"></div>
      <div><label for="ai">Davon von der KI erzeugt</label>
        <select id="ai"><option value="0">keine</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></div>
      <div><label>Rest: selbst eingeben</label>
        <div class="note" id="restInfo" style="margin-top:0">0 Aufgaben legst du in der Vorschau selbst an.</div></div>
    </div>
    <div class="row end" style="margin-top:18px"><button class="primary" id="gen">Test erzeugen</button></div>
  </div>`));
  const drawTopics=()=>{
    const gg=Number(qs('#gsel').value);
    qs('#topics').innerHTML = topicsForGrade(gg).map(t=>
      `<label class="chip"><input type="checkbox" value="${t.key}"> ${esc(t.name)}</label>`).join('');
    qsa('#topics .chip').forEach(c=>c.querySelector('input').onchange=e=>c.classList.toggle('sel',e.target.checked));
  };
  qs('#gsel').onchange=drawTopics; drawTopics();
  const syncRest=()=>{
    const tot=Math.max(1,Math.min(40,Number(qs('#cnt').value)||1));
    let auto=Math.max(0,Number(qs('#auto').value)||0);
    const nai=Number(qs('#ai').value)||0;
    if(auto+nai>tot){ auto=Math.max(0,tot-nai); qs('#auto').value=auto; }
    const rest=tot-auto-nai;
    qs('#restInfo').textContent = rest===0
      ? 'Alle Aufgaben werden erzeugt \u2013 du pr\u00fcfst sie nur noch.'
      : rest+' Aufgabe'+(rest===1?'':'n')+' legst du in der Vorschau selbst an.';
    return {tot, auto, nai, rest};
  };
  ['#cnt','#auto','#ai'].forEach(sel=>qs(sel).addEventListener('input',syncRest));
  qs('#ai').addEventListener('change',syncRest);
  syncRest();
  qsa('#types .chip').forEach(c=>c.querySelector('input').onchange=e=>c.classList.toggle('sel',e.target.checked));
  if(!aiConfigured()) qs('#ai').disabled=true;
  qs('#gen').onclick=async ()=>{
    const grade=Number(qs('#gsel').value);
    const topicKeys=qsa('#topics input:checked').map(i=>i.value);
    const types=qsa('#types input:checked').map(i=>i.value);
    const {tot, auto, nai, rest}=syncRest();
    if(!types.length) return toast('Bitte mindestens einen Aufgabentyp wählen.');
    S.grade=grade; S.count=tot; S.types=types;
    const seed = code(8);
    let items = auto>0 ? generate({grade, topicKeys, count:auto, types, seed}) : [];
    if(nai>0){
      qs('#gen').disabled=true; qs('#gen').textContent='KI-Aufgaben werden erzeugt …';
      const extra = await aiItems({grade, topics:(topicKeys.length?topicKeys:topicsForGrade(grade).map(t=>t.key)).map(k=>topicByKey(k).name), count:nai, types});
      items = items.concat(extra);
      qs('#gen').disabled=false; qs('#gen').textContent='Test erzeugen';
      if(extra.length<nai) toast('Die KI hat nur '+extra.length+' von '+nai+' Aufgaben geliefert.');
    }
    for(let i=0;i<rest;i++) items.push(blankItem(types[0]||'mc', grade));
    if(!items.length) return toast('Für diese Auswahl konnten keine Aufgaben erzeugt werden.');
    S.draft={name:'', grade, topics:topicKeys, types, seed, items, scale:scale(),
             pure:(auto===tot && nai===0 && rest===0)};
    preview(root);
  };
}

/* ---------- Leere Aufgabe und manueller Editor ---------- */
function blankItem(type, grade){
  const base={id:uid('m_'), points:1, draft:true, manual:true, topic:'manuell', topicName:'selbst angelegt', grade, q:'', solution:''};
  if(type==='tf')    return Object.assign(base,{type:'tf', answer:true});
  if(type==='input') return Object.assign(base,{type:'input', mode:'num', answer:'', unit:'', tol:0, alt:[]});
  if(type==='order') return Object.assign(base,{type:'order', answer:['','',''], items:['','','']});
  return Object.assign(base,{type:'mc', options:['','','',''], answer:0});
}
function itemComplete(it){
  if(!it.q || !String(it.q).trim()) return false;
  if(it.type==='mc')    return it.options.filter(o=>String(o).trim()).length>=2 && !!String(it.options[it.answer]||'').trim();
  if(it.type==='input') return String(it.answer).trim()!=='';
  if(it.type==='order') return it.answer.filter(x=>String(x).trim()).length>=2;
  return true;
}
/* Formular zum Anlegen oder Aendern einer Aufgabe. done() wird nach Speichern/Abbruch gerufen. */
function itemEditor(it, done, cancel){
  const box=h('<div class="ed"></div>');
  const draw=()=>{
    box.innerHTML=`
      <label for="eType">Aufgabentyp</label>
      <select id="eType">${Object.entries(TYPE_LABEL).map(([k,v])=>`<option value="${k}" ${k===it.type?'selected':''}>${esc(v)}</option>`).join('')}</select>
      <label for="eQ">Aufgabenstellung</label>
      <textarea id="eQ" placeholder="Was sollen die Schüler:innen tun?">${esc(it.q||'')}</textarea>
      <div id="eSpec"></div>
      <label for="eSol">Lösungsweg (wird den Schüler:innen nach der Abgabe angezeigt)</label>
      <textarea id="eSol" placeholder="Kurze Begründung oder Rechenweg">${esc(it.solution||'')}</textarea>
      <label for="ePts">Punkte</label><input id="ePts" type="number" min="1" max="5" value="${it.points||1}">
      <div class="row end" style="margin-top:14px">
        <button class="sm" id="eCancel">Abbrechen</button>
        <button class="sm primary" id="eOk">Übernehmen</button>
      </div>`;
    const spec=qs('#eSpec',box);
    if(it.type==='mc'){
      const o=(it.options&&it.options.length?it.options:['','','','']).concat(['','','','']).slice(0,4);
      spec.innerHTML='<label>Antwortmöglichkeiten – die richtige markieren (mindestens zwei ausfüllen)</label>'
        + o.map((v,i)=>`<div class="optrow"><input type="radio" name="eCorrect" value="${i}" ${Number(it.answer)===i?'checked':''}>
             <input type="text" data-o="${i}" value="${esc(v)}" placeholder="Antwort ${i+1}"><span>${Number(it.answer)===i?'richtig':''}</span></div>`).join('');
      qsa('input[name="eCorrect"]',spec).forEach(r=>r.onchange=()=>{
        qsa('.optrow span',spec).forEach((sp,i)=>sp.textContent = Number(r.value)===i?'richtig':''); });
    } else if(it.type==='tf'){
      spec.innerHTML=`<label for="eTF">Ist die Aussage wahr oder falsch?</label>
        <select id="eTF"><option value="true" ${it.answer?'selected':''}>wahr</option><option value="false" ${!it.answer?'selected':''}>falsch</option></select>`;
    } else if(it.type==='input'){
      spec.innerHTML=`<div class="grid2">
          <div><label for="eMode">Art der Eingabe</label><select id="eMode">
            <option value="num" ${it.mode!=='txt'?'selected':''}>Zahl (Komma und Punkt erlaubt)</option>
            <option value="txt" ${it.mode==='txt'?'selected':''}>Text, Bruch oder Koordinate</option></select></div>
          <div><label for="eAns">Richtige Antwort</label><input id="eAns" value="${esc(it.answer||'')}" placeholder="z. B. 12,5 oder 3/4"></div>
          <div><label for="eUnit">Einheit (optional)</label><input id="eUnit" value="${esc(it.unit||'')}" placeholder="cm, €, °"></div>
          <div><label for="eTol">Zulässige Abweichung</label><input id="eTol" type="number" step="0.01" min="0" value="${Number(it.tol)||0}"></div>
        </div>
        <label for="eAlt">Weitere akzeptierte Schreibweisen (mit Semikolon trennen)</label>
        <input id="eAlt" value="${esc((it.alt||[]).join('; '))}" placeholder="0,75; 3/4">`;
    } else {
      spec.innerHTML=`<label for="eOrd">Elemente in der <strong>richtigen</strong> Reihenfolge – eine Zeile pro Element</label>
        <textarea id="eOrd" placeholder="Klammern
Potenzen
Punktrechnung
Strichrechnung">${esc((it.answer||[]).filter(x=>String(x).trim()).join('\n'))}</textarea>
        <div style="font-size:13px;color:var(--muted);margin-top:6px">Den Schüler:innen werden die Zeilen gemischt angezeigt.</div>`;
    }
    qs('#eType',box).onchange=e=>{ it.type=e.target.value;
      if(it.type==='mc'&&!it.options) it.options=['','','',''];
      if(it.type==='order'&&!Array.isArray(it.answer)) it.answer=['','',''];
      if(it.type==='input'&&Array.isArray(it.answer)) it.answer='';
      if(it.type==='tf') it.answer=(it.answer===true);
      draw(); };
    qs('#eCancel',box).onclick=()=>cancel();
    qs('#eOk',box).onclick=()=>{
      it.q=qs('#eQ',box).value.trim();
      it.solution=qs('#eSol',box).value.trim();
      it.points=Math.max(1,Math.min(5,Number(qs('#ePts',box).value)||1));
      if(it.type==='mc'){
        const opts=qsa('input[data-o]',box).map(i=>i.value.trim());
        const sel=Number((qsa('input[name="eCorrect"]',box).find(r=>r.checked)||{value:0}).value);
        const correct=opts[sel]||'';
        const keep=opts.filter(o=>o);
        if(keep.length<2) return toast('Bitte mindestens zwei Antwortmöglichkeiten ausfüllen.');
        if(!correct) return toast('Die als richtig markierte Antwort ist noch leer.');
        if(new Set(keep).size!==keep.length) return toast('Zwei Antwortmöglichkeiten sind gleich.');
        it.options=keep; it.answer=keep.indexOf(correct);
      } else if(it.type==='tf'){
        it.answer = qs('#eTF',box).value==='true';
      } else if(it.type==='input'){
        it.mode=qs('#eMode',box).value;
        it.answer=qs('#eAns',box).value.trim();
        it.unit=qs('#eUnit',box).value.trim();
        it.tol=Number(qs('#eTol',box).value)||0;
        it.alt=qs('#eAlt',box).value.split(';').map(x=>x.trim()).filter(Boolean);
        if(!it.answer) return toast('Bitte die richtige Antwort eintragen.');
      } else {
        const lines=qs('#eOrd',box).value.split('\n').map(x=>x.trim()).filter(Boolean);
        if(lines.length<2) return toast('Bitte mindestens zwei Zeilen eintragen.');
        if(new Set(lines).size!==lines.length) return toast('Zwei Zeilen sind gleich – die Reihenfolge wäre nicht eindeutig.');
        it.answer=lines;
        let sh=lines.slice(), guard=0;
        do { sh=sh.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); } while(sh.join('|')===lines.join('|') && guard++<20);
        it.items=sh;
      }
      if(!it.q) return toast('Bitte eine Aufgabenstellung eintragen.');
      if(it.draft){ it.manual=true; it.topicName='selbst angelegt'; }
      else { it.edited=true; }
      it.draft=false;
      done();
    };
  };
  draw();
  return box;
}

/* ---------- Vorschau / Bearbeiten ---------- */
function preview(root){
  const d=S.draft;
  root.innerHTML='';
  const card=h(`<div class="card">
    <h2>Vorschau – bitte prüfen</h2>
    <p class="sub">Jede Aufgabe lässt sich bearbeiten, durch eine neue desselben Themas ersetzen oder löschen. Eigene Aufgaben kannst du jederzeit ergänzen.</p>
    <div id="list"></div>
    <div class="row" style="margin-top:8px">
      <button class="sm" id="add">+ Aufgabe aus der Bank</button>
      <button class="sm" id="addOwn">+ Eigene Aufgabe</button>
      <span class="sp" style="flex:1"></span>
      <span class="badge" id="cnt2"></span>
    </div>
    <label for="tname" style="margin-top:22px">Name des Tests (zum Wiederfinden in der Bibliothek)</label>
    <input id="tname" placeholder="z. B. 7a – Prozentrechnung – Kurztest 1" value="${esc(d.name||'')}">
    <div class="note" style="margin-top:14px">Notenschlüssel: ${esc(scaleToText(d.scale))}</div>
    <div class="row end" style="margin-top:18px">
      <button id="back">Zurück zur Auswahl</button>
      <button id="again">Neu würfeln</button>
      <button id="link">Link für die Klasse</button>
      <button class="primary" id="save">Test speichern</button>
    </div>
    <div id="linkbox" style="margin-top:16px"></div>
  </div>`);
  root.appendChild(card);
  const draw=()=>{
    const L=qs('#list',card); L.innerHTML='';
    d.items.forEach((it,i)=>{
      if(S.editing===it.id){
        const wrap=h('<div class="q"><div class="meta"><strong>Aufgabe '+(i+1)+'</strong> · wird bearbeitet</div></div>');
        wrap.appendChild(itemEditor(it, ()=>{ S.editing=null; draw(); },
          ()=>{ S.editing=null; if(it.draft && !itemComplete(it)) { /* leere Aufgabe bleibt bestehen */ } draw(); }));
        L.appendChild(wrap); return;
      }
      const offen = it.draft || !itemComplete(it);
      const el=h(`<div class="q${offen?' draft':''}">
        <div class="meta"><strong>Aufgabe ${i+1}</strong> · ${esc(TYPE_LABEL[it.type])} · ${esc(it.topicName||'')}
          ${it.ai?'· <span class="badge">KI</span>':''}${it.manual&&!offen?'· <span class="badge">selbst</span>':''}${it.edited?'· <span class="badge">bearbeitet</span>':''}</div>
        <div class="qt">${offen? 'Noch auszufüllen – bitte auf „Bearbeiten“ tippen.' : esc(it.q)}</div>
        ${offen?'':`<div style="font-size:14px;color:var(--muted)"><strong>Lösung:</strong> ${esc(solText(it))}</div>`}
        <div class="row" style="margin-top:10px">
          <button class="sm" data-a="edit">Bearbeiten</button>
          <button class="sm" data-a="rep" ${it.manual?'disabled title="Nur für Aufgaben aus der Bank"':''}>Ersetzen</button>
          <button class="sm danger" data-a="del">Löschen</button>
          <span style="flex:1"></span>
          <span style="font-size:13px;color:var(--muted)">Punkte</span>
          <input type="number" min="1" max="5" value="${it.points||1}" data-a="pts" style="width:74px">
        </div></div>`);
      qs('[data-a="edit"]',el).onclick=()=>{ S.editing=it.id; draw(); };
      qs('[data-a="del"]',el).onclick=()=>{ d.pure=false; d.items.splice(i,1); draw(); };
      qs('[data-a="rep"]',el).onclick=()=>{ if(it.manual) return; d.pure=false;
        const n=replaceItem(it,d.items,S.types); if(n){n.points=it.points||1; d.items[i]=n; draw();} else toast('Keine andere Aufgabe verfügbar.'); };
      qs('[data-a="pts"]',el).onchange=e=>{ it.points=Math.max(1,Math.min(5,Number(e.target.value)||1)); };
      L.appendChild(el);
    });
    const offenN = d.items.filter(x=>x.draft||!itemComplete(x)).length;
    qs('#cnt2',card).textContent = d.items.length+' Aufgaben · '+d.items.reduce((a,x)=>a+(x.points||1),0)+' Punkte'
      + (offenN? ' · '+offenN+' noch auszufüllen' : '');
  };
  draw();
  const impure=()=>{ d.pure=false; };
  qs('#add',card).onclick=()=>{ impure(); const n=generate({grade:d.grade, topicKeys:d.topics, count:1, types:S.types});
    if(n.length && !d.items.some(x=>x.q===n[0].q)){ d.items.push(n[0]); draw(); } else toast('Keine neue Aufgabe gefunden.'); };
  qs('#addOwn',card).onclick=()=>{ const it=blankItem((S.types&&S.types[0])||'mc', d.grade); d.items.push(it); S.editing=it.id; draw(); };
  qs('#again',card).onclick=()=>{
    const manuell=d.items.filter(x=>x.manual||x.edited);
    d.pure=false;
    const n=d.items.length-manuell.length;
    if(n<=0) return toast('Es gibt keine unveränderten Aufgaben zum Neuwürfeln.');
    d.items=generate({grade:d.grade, topicKeys:d.topics, count:n, types:S.types}).concat(manuell);
    toast(manuell.length? 'Neu gewürfelt – deine eigenen und bearbeiteten Aufgaben bleiben erhalten.':'Neu gewürfelt.');
    draw(); };
  qs('#back',card).onclick=()=>{
    if(d.items.length && !confirm('Dieser Entwurf geht dabei verloren. Zurück zur Auswahl?')) return;
    S.draft=null; S.editing=null; viewNew(root);
  };
  qs('#link',card).onclick=()=>{
    const lb=qs('#linkbox',card);
    if(lb.innerHTML){ lb.innerHTML=''; return; }
    const offen=d.items.filter(x=>x.draft||!itemComplete(x));
    if(offen.length) return toast(offen.length+' Aufgabe(n) sind noch nicht ausgefüllt.');
    if(!d.items.length) return toast('Der Test enthält keine Aufgaben.');
    lb.innerHTML=''; lb.appendChild(selfLinkBox(Object.assign({}, d, {name:qs('#tname',card).value.trim()||'Kurztest'})));
  };
  qs('#save',card).onclick=async ()=>{
    const name=qs('#tname',card).value.trim();
    if(!name) return toast('Bitte einen Namen für den Test eingeben.');
    if(!d.items.length) return toast('Der Test enthält keine Aufgaben.');
    const offen=d.items.filter(x=>x.draft||!itemComplete(x));
    if(offen.length) return toast(offen.length+' Aufgabe(n) sind noch nicht ausgefüllt.');
    await busy(async()=>{
      await Store.saveTest({name, grade:d.grade, topics:d.topics, types:d.types, seed:d.seed,
        pure:d.pure && !d.items.some(i=>i.manual||i.edited||i.ai), items:d.items, scale:d.scale});
      S.draft=null; toast('Test gespeichert.'); go('#/lehrer/bibliothek');
    });
  };
}
function de(v){ const s=String(v); return /^-?\d+\.\d+$/.test(s)? s.replace('.',','): s; }
function solText(it){
  if(it.type==='mc') return it.options[it.answer];
  if(it.type==='tf') return it.answer?'wahr':'falsch';
  if(it.type==='order') return it.answer.join(' → ');
  return de(it.answer)+(it.unit?' '+it.unit:'');
}

/* ---------- Bibliothek ---------- */
async function viewLibrary(root){
  root.innerHTML='<div class="card"><p class="empty">wird geladen …</p></div>';
  const [tests, classes, assigns] = await Promise.all([Store.listTests(), Store.listClasses(), Store.listAssignments()]);
  root.innerHTML='';
  const card=h('<div class="card"><h2>Gespeicherte Tests</h2><p class="sub">Tests lassen sich beliebig oft erneut freigeben.</p><div id="tl"></div></div>');
  root.appendChild(card);
  const L=qs('#tl',card);
  if(!tests.length){ L.innerHTML='<p class="empty">Noch keine Tests gespeichert.</p>'; }
  tests.forEach(t=>{
    const el=h(`<div class="q"><div class="meta"><strong>${esc(t.name)}</strong></div>
      <div style="font-size:14px;color:var(--muted)">Klasse ${t.grade} · ${t.items.length} Aufgaben · ${t.items.reduce((a,x)=>a+(x.points||1),0)} Punkte · angelegt ${deDate(t.created_at)}</div>
      <div class="row" style="margin-top:10px">
        <button class="sm" data-a="show">Aufgaben ansehen</button>
        <button class="sm primary" data-a="self">Link für die Klasse</button>
        <button class="sm" data-a="share">Mit Ergebnis-Sammlung freigeben</button>
        <button class="sm danger" data-a="del">Löschen</button></div>
      <div data-a="box" class="hide" style="margin-top:12px"></div></div>`);
    const box=qs('[data-a="box"]',el);
    qs('[data-a="show"]',el).onclick=()=>{
      box.classList.toggle('hide');
      box.innerHTML = t.items.map((it,i)=>`<div style="padding:8px 0;border-top:1px solid var(--line)">
        <div style="font-weight:600">${i+1}. ${esc(it.q)}</div>
        <div style="font-size:13px;color:var(--muted)">${esc(TYPE_LABEL[it.type])} · Lösung: ${esc(solText(it))}</div></div>`).join('');
    };
    qs('[data-a="self"]',el).onclick=()=>{
      if(box.innerHTML && box.dataset.kind==='self'){ box.innerHTML=''; box.classList.add('hide'); return; }
      box.classList.remove('hide'); box.dataset.kind='self'; box.innerHTML=''; box.appendChild(selfLinkBox(t));
    };
    qs('[data-a="del"]',el).onclick=async()=>{ if(!confirm('Test „'+t.name+'“ endgültig löschen? Zugehörige Ergebnisse werden mitgelöscht.'))return;
      await busy(async()=>{ await Store.deleteTest(t.id); toast('Test gelöscht.'); viewLibrary(root); }); };
    qs('[data-a="share"]',el).onclick=()=>{
      box.classList.remove('hide');
      if(!classes.length){ box.innerHTML='<div class="note">Lege zuerst unter „Klassen“ eine Klasse an.</div>'; return; }
      box.innerHTML=`<label>Klasse</label><select data-a="cl">${classes.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select>
        <label>Datum</label><input type="date" data-a="dt" value="${todayISO()}">
        <div class="row end" style="margin-top:12px"><button class="sm primary" data-a="ok">Freigeben</button></div>`;
      qs('[data-a="ok"]',box).onclick=async()=>{
        await busy(async()=>{
          const a=await Store.createAssignment(t.id, qs('[data-a="cl"]',box).value, qs('[data-a="dt"]',box).value);
          const cls=classes.find(c=>c.id===a.class_id);
          box.innerHTML=''; box.appendChild(shareBox(a, cls, t));
        });
      };
    };
    L.appendChild(el);
  });

  /* aktive Freigaben */
  const ac=h('<div class="card"><h2>Freigaben</h2><div id="al"></div></div>');
  root.appendChild(ac);
  const AL=qs('#al',ac);
  if(!assigns.length) AL.innerHTML='<p class="empty">Noch keine Freigaben.</p>';
  assigns.forEach(a=>{
    const t=tests.find(x=>x.id===a.test_id), c=classes.find(x=>x.id===a.class_id);
    const el=h(`<div class="q"><div class="meta"><span class="mono">${esc(a.code)}</span>
      <span class="badge ${a.active?'on':''}">${a.active?'offen':'geschlossen'}</span></div>
      <div style="font-size:14px">${esc(t?t.name:'(Test gelöscht)')} · ${esc(c?c.name:'(Klasse gelöscht)')} · ${deDate(a.date)}</div>
      <div class="row" style="margin-top:10px">
        <button class="sm" data-a="link">Link & QR-Code</button>
        <button class="sm" data-a="tog">${a.active?'Schließen':'Wieder öffnen'}</button>
        <button class="sm danger" data-a="del">Löschen</button></div>
      <div data-a="box" class="hide" style="margin-top:12px"></div></div>`);
    qs('[data-a="link"]',el).onclick=()=>{ const b=qs('[data-a="box"]',el); b.classList.toggle('hide');
      if(!b.innerHTML) b.appendChild(shareBox(a,c,t)); };
    qs('[data-a="tog"]',el).onclick=async()=>{ await busy(async()=>{ await Store.setAssignmentActive(a.id,!a.active); viewLibrary(root); }); };
    qs('[data-a="del"]',el).onclick=async()=>{ if(!confirm('Freigabe löschen? Ergebnisse dieser Freigabe werden mitgelöscht.'))return;
      await busy(async()=>{ await Store.deleteAssignment(a.id); viewLibrary(root); }); };
    AL.appendChild(el);
  });
}

function shareBox(a, cls, test){
  const url = baseUrl()+'#/t/'+a.code;
  const clsUrl = cls? baseUrl()+'#/k/'+cls.id : '';
  const box=h(`<div>
    ${ONLINE?'':'<div class="note" style="margin-bottom:12px"><strong>Einzelplatz-Modus:</strong> Dieser Link funktioniert nur in diesem Browser auf diesem Gerät. Für den Einsatz in der Klasse muss zuerst der Cloud-Speicher eingerichtet werden (Einstellungen → Cloud-Speicher).</div>'}
    <div style="font-size:13px;color:var(--muted)">Test-Code für die Klasse</div>
    <div class="mono">${esc(a.code)}</div>
    <div style="font-size:13px;color:var(--muted);margin-top:12px">Direktlink zum Test</div>
    <div class="linkbox">${esc(url)}</div>
    ${clsUrl?`<div style="font-size:13px;color:var(--muted);margin-top:12px">Dauerhafter Klassenlink (zeigt alle offenen Tests dieser Klasse)</div>
    <div class="linkbox">${esc(clsUrl)}</div>`:''}
    <div class="row" style="margin-top:12px">
      <button class="sm" data-a="copy">Link kopieren</button>
      <button class="sm" data-a="qr">QR-Code zum Beamen</button>
      <button class="sm" data-a="print">Drucken</button>
    </div>
    <div data-a="qrbox" style="margin-top:14px"></div></div>`);
  qs('[data-a="copy"]',box).onclick=()=>{ navigator.clipboard.writeText(url).then(()=>toast('Link kopiert.'),()=>toast('Kopieren nicht möglich.')); };
  qs('[data-a="print"]',box).onclick=()=>window.print();
  qs('[data-a="qr"]',box).onclick=()=>{
    const t=qs('[data-a="qrbox"]',box);
    if(t.innerHTML){ t.innerHTML=''; return; }
    t.innerHTML='<div class="qr" id="qrt"></div><div style="font-size:13px;color:var(--muted);margin-top:8px">Code: <strong>'+esc(a.code)+'</strong></div>';
    makeQR(qs('#qrt',t), url);
  };
  return box;
}
/* Link fuer die Klasse - ohne Server, ohne Speichern. */
function selfLinkBox(test){
  let code;
  try{ code = encodeTest(test); }
  catch(e){ return h('<div class="note">Der Link konnte nicht erzeugt werden: '+esc(e.message)+'</div>'); }
  const url = baseUrl()+'#/s/'+code;
  const kurz = canUseSeed(test);
  const mods = qrModules(url);
  /* Gemessen: unter etwa 6 Bildpunkten je Modul lesen Kameras den Code nicht mehr
     zuverlässig. Bei 560 px Anzeigegröße sind das rund 93 Module. */
  const qrOk  = mods > 0 && mods <= 93;
  const qrEng = mods > 93 && mods <= 121;
  const box=h(`<div>
    <div class="note" style="margin-bottom:12px">
      Dieser Link enthält den gesamten Test. Die Schüler:innen brauchen kein Konto und keinen Code –
      sie öffnen ihn, bearbeiten den Test und sehen sofort ihre Note und die Lösungswege.
      <strong>Es wird nichts gespeichert und nichts an dich zurückgemeldet.</strong>
    </div>
    <div style="font-size:13px;color:var(--muted)">Link für die Klasse (${url.length} Zeichen${kurz?', Kurzfassung':''})</div>
    <div class="linkbox">${esc(url)}</div>
    <div class="row" style="margin-top:12px">
      <button class="sm" data-a="copy">Link kopieren</button>
      ${(qrOk||qrEng)?'<button class="sm" data-a="qr">QR-Code zum Beamen</button>':''}
      <button class="sm" data-a="open">Selbst ausprobieren</button>
    </div>
    ${qrOk?'':qrEng
      ? '<div class="note" style="margin-top:12px">Der QR-Code ist für diesen Link recht fein (' + mods + ' × ' + mods + ' Module). Auf einem großen Bildschirm oder über den Beamer („Groß anzeigen“) klappt das Scannen; auf einem kleinen Display eher nicht. Im Zweifel den Link verteilen.</div>'
      : '<div class="note" style="margin-top:12px">Für einen QR-Code ist dieser Test zu umfangreich – bitte den Link verteilen. Deutlich kürzer wird er, wenn du die Aufgaben unverändert aus der Aufgabenbank übernimmst; dann steht im Link nur die Bauanleitung statt des ganzen Tests.</div>'}
    <div data-a="qrbox" style="margin-top:14px"></div></div>`);
  qs('[data-a="copy"]',box).onclick=()=>navigator.clipboard.writeText(url)
    .then(()=>toast('Link kopiert.'),()=>toast('Kopieren hat nicht geklappt – Link bitte markieren.'));
  qs('[data-a="open"]',box).onclick=()=>window.open(url,'_blank');
  const qb=qs('[data-a="qr"]',box);
  if(qb) qb.onclick=()=>{ const t=qs('[data-a="qrbox"]',box);
    if(t.innerHTML){ t.innerHTML=''; return; }
    t.innerHTML='<div class="qr" id="qrs"></div>'; makeQR(qs('#qrs',t), url); };
  return box;
}

function qrModules(text){
  try{ const q=qrcode(0,'M'); q.addData(text); q.make(); return q.getModuleCount(); }
  catch(e){ return 0; }
}
function makeQR(el, text){
  /* QR-Erzeugung läuft vollständig in der App - kein Internet, kein externer Dienst.
     Die Darstellungsgröße richtet sich nach der Anzahl der Module: unter etwa
     6 Pixeln pro Modul bekommen Kameras den Code nicht mehr zuverlässig gelesen. */
  try{
    const q = qrcode(0, 'M');
    q.addData(text);
    q.make();
    const mods = q.getModuleCount();
    const px = Math.min(560, Math.max(260, mods * 7));
    el.innerHTML = q.createSvgTag({cellSize:6, margin:4, scalable:true});
    const svg = el.querySelector('svg');
    if(svg){
      svg.setAttribute('width', px); svg.setAttribute('height', px);
      svg.style.display='block'; svg.style.maxWidth='100%';
      svg.setAttribute('role','img'); svg.setAttribute('aria-label','QR-Code zum Test');
    }
    const bar = h('<div class="row" style="margin-top:10px">'
      + '<button class="sm" data-a="full">Groß anzeigen (zum Beamen)</button>'
      + '<span style="font-size:13px;color:var(--muted);align-self:center">'+mods+' × '+mods+' Module</span></div>');
    qs('[data-a="full"]',bar).onclick=()=>showQrFull(svg.outerHTML);
    el.appendChild(bar);
  }catch(e){
    el.innerHTML = '<div class="note">Für diesen Link ist ein QR-Code zu umfangreich – bitte den Link weitergeben.</div>';
  }
}
/* Bildschirmfüllende Darstellung für den Beamer */
function showQrFull(svgHtml){
  const ov=h('<div style="position:fixed;inset:0;background:#fff;z-index:200;display:flex;flex-direction:column;'
    + 'align-items:center;justify-content:center;gap:18px;padding:24px">'
    + '<div id="qrFullBox" style="width:min(80vh,80vw)"></div>'
    + '<button class="sm" id="qrFullClose">Schließen</button></div>');
  document.body.appendChild(ov);
  const box=qs('#qrFullBox',ov); box.innerHTML=svgHtml;
  const svg=box.querySelector('svg');
  if(svg){ svg.removeAttribute('width'); svg.removeAttribute('height'); svg.style.width='100%'; svg.style.height='auto'; }
  const close=()=>{ ov.remove(); document.removeEventListener('keydown', onKey); };
  const onKey=e=>{ if(e.key==='Escape') close(); };
  qs('#qrFullClose',ov).onclick=close;
  document.addEventListener('keydown', onKey);
}

/* ---------- Klassen ---------- */
async function viewClasses(root){
  root.innerHTML='<div class="card"><p class="empty">wird geladen …</p></div>';
  const classes = await Store.listClasses();
  root.innerHTML='';
  root.appendChild(h(`<div class="card"><h2>Neue Klasse anlegen</h2>
    <label for="cn">Bezeichnung</label><input id="cn" placeholder="z. B. 7a">
    <label for="cs">Namen der Schülerinnen und Schüler (eine Zeile pro Person)</label>
    <textarea id="cs" placeholder="Anna B.&#10;Ben C.&#10;Clara D."></textarea>
    <div class="row end" style="margin-top:12px"><button class="primary" id="cadd">Klasse anlegen</button></div></div>`));
  qs('#cadd').onclick=async()=>{
    const n=qs('#cn').value.trim(); if(!n) return toast('Bitte eine Bezeichnung eingeben.');
    const st=qs('#cs').value.split('\n').map(s=>s.trim()).filter(Boolean);
    await busy(async()=>{ await Store.createClass(n,st); toast('Klasse angelegt.'); viewClasses(root); });
  };
  const card=h('<div class="card"><h2>Klassen</h2><div id="cl"></div></div>'); root.appendChild(card);
  const L=qs('#cl',card);
  if(!classes.length) L.innerHTML='<p class="empty">Noch keine Klasse angelegt.</p>';
  classes.forEach(c=>{
    const el=h(`<div class="q"><div class="meta"><strong>${esc(c.name)}</strong> · ${c.students.length} Schüler:innen</div>
      <div class="row">
        <button class="sm" data-a="edit">Namen bearbeiten</button>
        <button class="sm" data-a="link">Klassenlink & QR</button>
        <button class="sm danger" data-a="del">Klasse löschen</button></div>
      <div data-a="box" class="hide" style="margin-top:12px"></div></div>`);
    const box=qs('[data-a="box"]',el);
    qs('[data-a="edit"]',el).onclick=()=>{
      box.classList.remove('hide');
      box.innerHTML=`<textarea data-a="ta">${esc(c.students.join('\n'))}</textarea>
        <div class="row end" style="margin-top:10px"><button class="sm primary" data-a="ok">Speichern</button></div>`;
      qs('[data-a="ok"]',box).onclick=async()=>{
        const st=qs('[data-a="ta"]',box).value.split('\n').map(s=>s.trim()).filter(Boolean);
        await busy(async()=>{ await Store.updateClass(c.id,{students:st}); toast('Gespeichert.'); viewClasses(root); });
      };
    };
    qs('[data-a="link"]',el).onclick=()=>{
      box.classList.toggle('hide');
      const url=baseUrl()+'#/k/'+c.id;
      box.innerHTML=`<div style="font-size:13px;color:var(--muted)">Dauerhafter Link für ${esc(c.name)} – hier sehen die Schüler:innen alle offenen Tests dieser Klasse.</div>
        <div class="linkbox">${esc(url)}</div><div class="row" style="margin-top:10px">
        <button class="sm" data-a="cp">Kopieren</button><button class="sm" data-a="q">QR-Code</button></div><div data-a="qb" style="margin-top:12px"></div>`;
      qs('[data-a="cp"]',box).onclick=()=>navigator.clipboard.writeText(url).then(()=>toast('Link kopiert.'));
      qs('[data-a="q"]',box).onclick=()=>{ const t=qs('[data-a="qb"]',box); if(t.innerHTML){t.innerHTML='';return;}
        t.innerHTML='<div class="qr" id="qc"></div>'; makeQR(qs('#qc',t),url); };
    };
    qs('[data-a="del"]',el).onclick=async()=>{
      if(!confirm('Klasse „'+c.name+'“ mit allen Ergebnissen und Freigaben endgültig löschen?'))return;
      if(!confirm('Wirklich löschen? Das lässt sich nicht rückgängig machen.'))return;
      await busy(async()=>{ await Store.deleteClass(c.id); toast('Klasse gelöscht.'); viewClasses(root); });
    };
    L.appendChild(el);
  });
}

/* ---------- Auswertung ---------- */
async function viewResults(root){
  root.innerHTML='<div class="card"><p class="empty">wird geladen …</p></div>';
  const classes=await Store.listClasses();
  root.innerHTML='';
  if(!classes.length){ root.appendChild(h('<div class="card"><p class="empty">Lege zuerst eine Klasse an.</p></div>')); return; }
  const sel=S.resClass||classes[0].id;
  const card=h(`<div class="card"><h2>Ergebnisse</h2>
    <label for="rc">Klasse</label>
    <select id="rc">${classes.map(c=>`<option value="${c.id}" ${c.id===sel?'selected':''}>${esc(c.name)}</option>`).join('')}</select>
    <div id="rb" style="margin-top:18px"></div></div>`);
  root.appendChild(card);
  qs('#rc',card).onchange=e=>{ S.resClass=e.target.value; viewResults(root); };
  const box=qs('#rb',card);
  box.innerHTML='<p class="empty">wird geladen …</p>';
  const res=await Store.listResults({class_id:sel});
  if(!res.length){ box.innerHTML='<p class="empty">Für diese Klasse liegen noch keine Ergebnisse vor.</p>'; return; }

  const all=avgGrade(res.map(r=>Number(r.grade_nk)), scale());
  const byDate={};
  res.forEach(r=>{ const k=(r.date||r.created_at||'').slice(0,10)+'|'+(r.test_name||''); (byDate[k]=byDate[k]||[]).push(r); });
  const keys=Object.keys(byDate).sort().reverse();
  box.innerHTML=`<div class="card" style="box-shadow:none;background:var(--bg)">
      <div style="font-size:13px;color:var(--muted)">Gesamtdurchschnitt der Klasse (alle Tests)</div>
      <div class="big">${all.note} <span style="font-size:18px;color:var(--muted);font-weight:500">(${fmt(all.avg)})</span></div>
      <div style="font-size:13px;color:var(--muted)">${res.length} Ergebnisse aus ${keys.length} Testdurchgängen</div>
    </div><div id="dl"></div>
    <div class="row" style="margin-top:14px"><button class="sm" id="csv">Als CSV exportieren</button></div>`;
  const DL=qs('#dl',box);
  keys.forEach(k=>{
    const [d,tn]=k.split('|'); const rows=byDate[k].slice().sort((a,b)=>String(a.student).localeCompare(String(b.student),'de'));
    const ag=avgGrade(rows.map(r=>Number(r.grade_nk)), scale());
    const el=h(`<div class="q"><div class="meta"><strong>${deDate(d)}</strong> · ${esc(tn||'Test')}</div>
      <div style="font-size:14px;margin-bottom:8px">Durchschnitt: <strong>${ag.note}</strong> (${fmt(ag.avg)}) · ${rows.length} Ergebnisse</div>
      <table><thead><tr><th>Name</th><th>Punkte</th><th>Prozent</th><th>Note</th><th></th></tr></thead><tbody></tbody></table></div>`);
    const tb=qs('tbody',el);
    rows.forEach(r=>{
      tb.insertAdjacentHTML('beforeend', `<tr><td>${esc(r.student)}</td><td>${fmt(Number(r.points))} / ${fmt(Number(r.max_points))}</td>`
        + `<td>${fmt(Number(r.percent))} %</td><td><strong>${esc(r.grade_text)}</strong></td>`
        + `<td style="text-align:right"><button class="sm ghost" title="Ergebnis löschen">&times;</button></td></tr>`);
      const tr=tb.lastElementChild;
      qs('button',tr).onclick=async()=>{ if(!confirm('Ergebnis von '+r.student+' löschen?'))return;
        await busy(async()=>{ await Store.deleteResult(r.id); viewResults(root); }); };
    });
    DL.appendChild(el);
  });
  qs('#csv',box).onclick=()=>{
    const cls=classes.find(c=>c.id===sel);
    const head=['Datum','Test','Name','Punkte','Maximalpunkte','Prozent','Note'];
    const lines=[head.join(';')].concat(res.map(r=>[deDate(r.date||r.created_at), r.test_name||'', r.student,
      fmt(Number(r.points)), fmt(Number(r.max_points)), fmt(Number(r.percent)), r.grade_text].join(';')));
    const blob=new Blob(['﻿'+lines.join('\n')],{type:'text/csv;charset=utf-8'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
    a.download='Ergebnisse_'+(cls?cls.name:'Klasse')+'.csv'; a.click();
  };
}

/* ---------- Einstellungen ---------- */
function viewSettings(root){
  const sc=scale();
  root.innerHTML='';
  root.appendChild(h(`<div class="card"><h2>Notenschlüssel</h2>
    <p class="sub">Prozentgrenzen (untere Grenze je Note). Gilt für alle neuen Tests.</p>
    <div class="grid2" id="sc">${sc.map((r,i)=>`<div><label>${r.note} ab</label><input type="number" min="0" max="100" value="${r.min}" data-i="${i}"></div>`).join('')}</div>
    <div class="row end" style="margin-top:14px"><button id="scr">Standard wiederherstellen</button><button class="primary" id="scs">Speichern</button></div></div>
  <div class="card"><h2>Cloud-Speicher</h2>
    <p class="sub">${ONLINE?'Die App ist mit Supabase verbunden. Ergebnisse werden zentral gespeichert.':'Ohne Supabase bleiben alle Daten nur auf diesem Gerät. Trage hier die Zugangsdaten ein (Supabase → Project Settings → Data API).'}</p>
    <label>Project URL</label><input id="su" placeholder="https://xxxx.supabase.co" value="${esc(localStorage.getItem('mt_sb_url')||'')}">
    <label>anon public key</label><input id="sk" placeholder="eyJhbGciOi…" value="${esc(localStorage.getItem('mt_sb_key')||'')}">
    <div class="row end" style="margin-top:12px"><button class="primary" id="sbs">Speichern und neu laden</button></div></div>
  <div class="card"><h2>KI-Aufgaben (optional)</h2>
    <p class="sub">Mit einem Anthropic-API-Schlüssel kann die App zusätzliche Aufgaben erzeugen. Der Schlüssel bleibt nur in diesem Browser. Prüfe KI-Aufgaben immer in der Vorschau.</p>
    <label>API-Schlüssel</label><input id="ak" type="password" placeholder="sk-ant-…" value="${esc(localStorage.getItem('mt_ai_key')||'')}">
    <div class="row end" style="margin-top:12px"><button class="primary" id="aks">Speichern</button></div></div>
  <div class="card"><h2>Passwort für den Lehrer-Bereich</h2>
    <p class="sub">Hält Schüler:innen aus der Lehreransicht heraus. <strong>Kein echter Zugriffsschutz:</strong> die Prüfung läuft im Browser, wer den Quelltext liest, kommt daran vorbei. Für die Ergebnisdaten gilt der Hinweis beim Cloud-Speicher.</p>
    <label for="pn">Neues Passwort (leer = kein Schutz)</label><input id="pn" type="password" autocomplete="new-password" placeholder="unverändert lassen = aktuelles Passwort behalten">
    <div class="row end" style="margin-top:12px">
      <button id="pnr">Auf Standard zurücksetzen</button>
      <button class="primary" id="pns">Speichern</button></div>
    <div id="pnInfo" style="margin-top:14px"></div></div>`));
  qs('#scs').onclick=()=>{
    const n=sc.map((r,i)=>Object.assign({},r,{min:Number(qs('[data-i="'+i+'"]').value)||0}));
    for(let i=1;i<n.length;i++) if(n[i].min>n[i-1].min) return toast('Die Grenzen müssen von oben nach unten kleiner werden.');
    lset('scale',n); toast('Notenschlüssel gespeichert.');
  };
  qs('#scr').onclick=()=>{ lset('scale',DEFAULT_SCALE); toast('Standard wiederhergestellt.'); viewSettings(root); };
  qs('#sbs').onclick=()=>{ localStorage.setItem('mt_sb_url',qs('#su').value.trim()); localStorage.setItem('mt_sb_key',qs('#sk').value.trim()); location.reload(); };
  qs('#aks').onclick=()=>{ localStorage.setItem('mt_ai_key',qs('#ak').value.trim()); toast('Gespeichert.'); };
  qs('#pns').onclick=()=>{
    const v=qs('#pn').value;
    const hash = v? pinHash(v) : '';
    lset('pin_hash', hash); unlock(); qs('#pn').value='';
    qs('#pnInfo').innerHTML = hash
      ? '<div class="note">Gespeichert – gilt zunächst nur in diesem Browser.<br>Damit das Passwort auf <strong>allen</strong> Geräten gilt, trage diese Prüfsumme in <code>assets/js/config.js</code> bei <code>TEACHER_PIN_HASH</code> ein:<div class="linkbox" style="margin-top:8px">'+esc(hash)+'</div></div>'
      : '<div class="note">Der Passwortschutz ist in diesem Browser jetzt aus.</div>';
    toast('Gespeichert.');
  };
  qs('#pnr').onclick=()=>{ localStorage.removeItem('mt_pin_hash'); localStorage.removeItem('mt_pin'); unlock();
    qs('#pnInfo').innerHTML='<div class="note">Zurückgesetzt – es gilt wieder das Passwort aus <code>config.js</code>.</div>'; };
}

/* ================= SCHÜLER:INNEN ================= */
async function classEntry(classId){
  app.innerHTML='<div class="card"><p class="empty">wird geladen …</p></div>';
  const cls=await Store.getClass(classId);
  if(!cls){ app.innerHTML='<div class="card"><h2>Klasse nicht gefunden</h2><p class="sub">Bitte den Link bei deiner Lehrkraft prüfen.</p>'
      + (ONLINE?'':'<div class="note">Hinweis für die Lehrkraft: Im <strong>Einzelplatz-Modus</strong> liegen Klassen nur in dem Browser, in dem sie angelegt wurden. '
        + 'Für den Klasseneinsatz muss der Cloud-Speicher eingerichtet sein (siehe ANLEITUNG, Abschnitt 2).</div>')
      + '</div>'; return; }
  const [assigns, tests]=await Promise.all([Store.listAssignments(), Store.listTests()]);
  const open=assigns.filter(a=>a.class_id===classId && a.active);
  app.innerHTML='';
  const card=h(`<div class="card"><h2>${esc(cls.name)}</h2>
    <p class="sub">Wähle zuerst deinen Namen und dann den Test.</p>
    <label for="nm">Mein Name</label>
    <select id="nm"><option value="">– bitte auswählen –</option>${cls.students.map(s=>`<option>${esc(s)}</option>`).join('')}</select>
    <div id="tl" style="margin-top:18px"></div></div>`);
  app.appendChild(card);
  const L=qs('#tl',card);
  if(!open.length){ L.innerHTML='<p class="empty">Im Moment ist kein Test freigegeben.</p>'; return; }
  open.forEach(a=>{
    const t=tests.find(x=>x.id===a.test_id); if(!t)return;
    const el=h(`<div class="q"><div class="meta"><strong>${esc(t.name)}</strong> · ${deDate(a.date)}</div>
      <div style="font-size:14px;color:var(--muted)">${t.items.length} Aufgaben</div>
      <div class="row" style="margin-top:10px"><button class="sm primary">Test starten</button></div></div>`);
    qs('button',el).onclick=()=>{
      const n=qs('#nm',card).value; if(!n) return toast('Bitte wähle zuerst deinen Namen.');
      runTest(a,t,cls,n);
    };
    L.appendChild(el);
  });
}

async function codeEntry(code){
  app.innerHTML='<div class="card"><p class="empty">wird geladen …</p></div>';
  const a=await Store.getAssignmentByCode(code);
  if(!a){ app.innerHTML='<div class="card"><h2>Code nicht gefunden</h2><p class="sub">Bitte prüfe den Code oder frage deine Lehrkraft.</p>'
      + (ONLINE?'':'<div class="note">Hinweis für die Lehrkraft: Die App läuft im <strong>Einzelplatz-Modus</strong>. '
        + 'Tests und Klassen liegen nur in dem Browser, in dem sie angelegt wurden – auf einem anderen Gerät oder in einem privaten Fenster ist der Code deshalb unbekannt. '
        + 'Damit Schüler:innen teilnehmen können, muss der Cloud-Speicher eingerichtet sein (siehe ANLEITUNG, Abschnitt 2).</div>')
      + '</div>'; return; }
  if(!a.active){ app.innerHTML='<div class="card"><h2>Dieser Test ist geschlossen</h2><p class="sub">Die Lehrkraft hat den Test beendet.</p></div>'; return; }
  const [t,cls]=await Promise.all([Store.getTest(a.test_id), Store.getClass(a.class_id)]);
  if(!t||!cls){ app.innerHTML='<div class="card"><h2>Test nicht verfügbar</h2></div>'; return; }
  app.innerHTML='';
  const card=h(`<div class="card"><h2>${esc(t.name)}</h2>
    <p class="sub">Klasse ${esc(cls.name)} · ${t.items.length} Aufgaben</p>
    <label for="nm">Mein Name</label>
    <select id="nm"><option value="">– bitte auswählen –</option>${cls.students.map(s=>`<option>${esc(s)}</option>`).join('')}</select>
    <div class="row end" style="margin-top:16px"><button class="primary" id="st">Test starten</button></div></div>`);
  app.appendChild(card);
  qs('#st',card).onclick=()=>{ const n=qs('#nm',card).value; if(!n) return toast('Bitte wähle zuerst deinen Namen.'); runTest(a,t,cls,n); };
}

/* ---------- Selbstkontrolle: Test steckt komplett im Link ---------- */
function selfTest(codeStr){
  let test;
  try{ test = decodeTest(decodeURIComponent(codeStr)); }
  catch(e){ test=null; }
  if(!test || !test.items || !test.items.length){
    app.innerHTML='<div class="card"><h2>Dieser Link funktioniert nicht</h2>'
      + '<p class="sub">Vermutlich ist er beim Kopieren abgeschnitten worden. Bitte bei deiner Lehrkraft den vollständigen Link erfragen.</p></div>';
    return;
  }
  test.items.forEach((it,i)=>{ if(!it.id) it.id='q'+i; });
  app.innerHTML='';
  app.appendChild(h(`<div class="card">
    <h2>${esc(test.name||'Kurztest')}</h2>
    <p class="sub">${test.items.length} Aufgaben · ${test.items.reduce((a,x)=>a+(x.points||1),0)} Punkte${test.grade?' · Klasse '+test.grade:''}</p>
    <div class="note">Am Ende siehst du deine Punkte, deine Note und zu jeder Aufgabe den Lösungsweg.
      Dein Ergebnis wird nirgends gespeichert und nicht weitergeschickt – es ist nur für dich.</div>
    <div class="row end" style="margin-top:18px"><button class="primary" id="go">Test starten</button></div></div>`));
  qs('#go').onclick=()=>runTest(null, test, null, null);
}

/* ---------- Testdurchführung ---------- */
function runTest(assign, test, cls, student){
  const answers={}; let idx=0;
  const items=test.items;
  S.running=true;
  const draw=()=>{
    const it=items[idx];
    app.innerHTML='';
    const card=h(`<div class="card">
      <div class="meta" style="display:flex;justify-content:space-between;font-size:13px;color:var(--muted)">
        <span>${student? esc(student)+' · '+esc(cls.name) : esc(test.name||'Kurztest')}</span><span>Aufgabe ${idx+1} von ${items.length}</span></div>
      <div class="bar"><span style="width:${Math.round((idx)/items.length*100)}%"></span></div>
      <div class="qt" style="font-size:18px;margin:16px 0 14px;white-space:pre-wrap">${esc(it.q)}</div>
      <div id="ans"></div>
      <div class="row" style="margin-top:20px">
        <button id="prev" ${idx===0?'disabled':''}>Zurück</button>
        <span style="flex:1"></span>
        <button class="primary" id="next">${idx===items.length-1?'Test abgeben':'Weiter'}</button>
      </div></div>`);
    app.appendChild(card);
    renderInput(qs('#ans',card), it, answers);
    qs('#prev',card).onclick=()=>{ idx--; draw(); };
    qs('#next',card).onclick=()=>{
      if(idx===items.length-1){
        if(!confirm('Test jetzt abgeben? Danach ist keine Änderung mehr möglich.'))return;
        finish();
      } else { idx++; draw(); }
    };
  };
  const finish=async()=>{
    S.running=false;
    const r=scoreTest(items, answers, test.scale||scale());
    if(assign && cls && student){
      app.innerHTML='<div class="card"><p class="empty">Test wird ausgewertet …</p></div>';
      await busy(async()=>{
        await Store.saveResult({assignment_id:assign.id, class_id:cls.id, test_id:test.id, test_name:test.name,
          student, date:assign.date||todayISO(), points:r.points, max_points:r.max, percent:r.percent,
          grade_text:r.grade, grade_nk:r.grade_nk, answers:r.detail.map(d=>({id:d.id, given:d.given, earned:d.earned}))});
      });
    }
    showResult(r, test, student);
  };
  draw();
}

function renderInput(root, it, answers){
  root.innerHTML='';
  if(it.type==='mc'){
    it.options.forEach((o,i)=>{
      const el=h(`<label class="opt${answers[it.id]===i?' sel':''}"><input type="radio" name="o" value="${i}" ${answers[it.id]===i?'checked':''}><span>${esc(o)}</span></label>`);
      qs('input',el).onchange=()=>{ answers[it.id]=i; qsa('.opt',root).forEach((x,j)=>x.classList.toggle('sel',j===i)); };
      root.appendChild(el);
    });
  } else if(it.type==='tf'){
    [['wahr',true],['falsch',false]].forEach(([lab,val],i)=>{
      const el=h(`<label class="opt${answers[it.id]===val?' sel':''}"><input type="radio" name="o" ${answers[it.id]===val?'checked':''}><span>${lab}</span></label>`);
      qs('input',el).onchange=()=>{ answers[it.id]=val; qsa('.opt',root).forEach((x,j)=>x.classList.toggle('sel',j===i)); };
      root.appendChild(el);
    });
  } else if(it.type==='input'){
    const el=h(`<div><input id="fi" inputmode="${it.mode==='txt'?'text':'decimal'}" placeholder="Antwort eingeben" value="${esc(answers[it.id]||'')}">
      ${it.unit?`<div style="font-size:13px;color:var(--muted);margin-top:6px">Einheit: ${esc(it.unit)} (nur die Zahl eingeben)</div>`:''}
      <div style="font-size:13px;color:var(--muted);margin-top:6px">Kommazahlen mit Komma oder Punkt, Brüche als z/n (z. B. 3/4).</div></div>`);
    root.appendChild(el);
    qs('#fi',el).oninput=e=>{ answers[it.id]=e.target.value; };
  } else if(it.type==='order'){
    const cur = answers[it.id] && answers[it.id].length ? answers[it.id].slice() : it.items.slice();
    answers[it.id]=cur;
    const ul=h('<ul class="ord"></ul>');
    const paint=()=>{
      ul.innerHTML='';
      cur.forEach((txt,i)=>{
        const li=h(`<li data-i="${i}"><span class="handle">⠿</span><span class="txt">${esc(txt)}</span>
          <span class="nudge"><button type="button" data-d="-1" ${i===0?'disabled':''}>↑</button>
          <button type="button" data-d="1" ${i===cur.length-1?'disabled':''}>↓</button></span></li>`);
        qsa('button',li).forEach(b=>b.onclick=()=>{ const d=Number(b.dataset.d); const j=i+d;
          if(j<0||j>=cur.length)return; [cur[i],cur[j]]=[cur[j],cur[i]]; paint(); });
        ul.appendChild(li);
      });
      enableDrag(ul, cur, paint);
    };
    root.appendChild(h('<div style="font-size:13px;color:var(--muted);margin-bottom:8px">Ziehe die Zeilen in die richtige Reihenfolge – oder nutze die Pfeile.</div>'));
    root.appendChild(ul); paint();
  }
}

/* Zeiger-basiertes Ziehen (funktioniert auch auf dem iPad) */
function enableDrag(ul, arr, repaint){
  let from=-1, ghost=null;
  qsa('li',ul).forEach(li=>{
    const handle=qs('.handle',li);
    const start=e=>{
      from=Number(li.dataset.i); li.classList.add('drag');
      handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    };
    const move=e=>{
      if(from<0)return;
      const el=document.elementFromPoint(e.clientX,e.clientY);
      const target=el&&el.closest&&el.closest('li');
      if(target&&target.parentElement===ul){
        const to=Number(target.dataset.i);
        if(to!==from){ const x=arr.splice(from,1)[0]; arr.splice(to,0,x); from=to; repaint(); }
      }
    };
    const end=()=>{ if(from>=0){ from=-1; repaint(); } };
    handle.addEventListener('pointerdown',start);
    handle.addEventListener('pointermove',move);
    handle.addEventListener('pointerup',end);
    handle.addEventListener('pointercancel',end);
  });
}

/* ---------- Ergebnis für Schüler:innen ---------- */
function showResult(r, test, student){
  app.innerHTML='';
  const good=r.percent>=50;
  app.appendChild(h(`<div class="card">
    <h2>Dein Ergebnis</h2>
    <p class="sub">${student? esc(student)+' · ':''}${esc(test.name||'Kurztest')}</p>
    <div class="big">Note ${esc(r.grade)}</div>
    <div class="bar"><span style="width:${Math.round(r.percent)}%"></span></div>
    <div style="font-size:15px">${fmt(r.points)} von ${fmt(r.max)} Punkten · ${fmt(r.percent)} %</div>
    <div class="note" style="margin-top:14px">${student
        ? (good?'Dein Ergebnis wurde gespeichert. Unten siehst du die Lösungen.':'Dein Ergebnis wurde gespeichert. Schau dir unten in Ruhe die Lösungswege an.')
        : 'Dein Ergebnis wird nicht gespeichert und nicht weitergeschickt. Schau dir unten in Ruhe die Lösungswege an – du kannst den Test jederzeit neu starten.'}</div>
  </div>
  <div class="card"><h2>Lösungen</h2><div id="sl"></div>
  <div class="row end" style="margin-top:16px"><button id="done">Noch einmal versuchen</button></div></div>`));
  const L=qs('#sl');
  r.detail.forEach((d,i)=>{
    const given = Array.isArray(d.given)? d.given.join(' → ') : (d.type==='tf'? (d.given===true?'wahr':d.given===false?'falsch':'–') :
      (d.type==='mc'? (test.items[i].options?test.items[i].options[d.given]:'–') : (d.given===undefined||d.given===''?'–':d.given)));
    const sol = Array.isArray(d.answer)? d.answer.join(' → ') : (d.type==='tf'? (d.answer?'wahr':'falsch') :
      (d.type==='mc'? test.items[i].options[d.answer] : de(d.answer)+(test.items[i].unit?' '+test.items[i].unit:'')));
    L.appendChild(h(`<div class="q"><div class="meta">Aufgabe ${i+1} · ${fmt(d.earned)} von ${fmt(d.points)} P.</div>
      <div class="qt">${esc(d.q)}</div>
      <div class="res ${d.correct?'ok':'bad'}">Deine Antwort: ${esc(given)}${d.correct?' – richtig':' – richtig wäre: '+esc(sol)}</div>
      ${d.solution?`<div style="font-size:14px;color:var(--muted)">${esc(d.solution)}</div>`:''}</div>`));
  });
  qs('#done').onclick=()=>{ if(!student){ location.reload(); } else go('#/'); };
}

route();
