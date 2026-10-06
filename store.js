import {SUPABASE_URL, SUPABASE_ANON_KEY} from './config.js';
import {uid, code, todayISO} from './util.js';

const LS_URL = localStorage.getItem('mt_sb_url')||'';
const LS_KEY = localStorage.getItem('mt_sb_key')||'';
export const SB_URL = (SUPABASE_URL||LS_URL||'').replace(/\/+$/,'');
export const SB_KEY = SUPABASE_ANON_KEY||LS_KEY||'';
export const ONLINE = !!(SB_URL && SB_KEY);

async function sb(path, opts){
  opts = opts||{};
  const res = await fetch(SB_URL+'/rest/v1/'+path, {
    method: opts.method||'GET',
    headers: Object.assign({
      'apikey': SB_KEY, 'Authorization':'Bearer '+SB_KEY,
      'Content-Type':'application/json',
      'Prefer': opts.prefer || 'return=representation'
    }, opts.headers||{}),
    body: opts.body? JSON.stringify(opts.body): undefined
  });
  if(!res.ok){ const t = await res.text(); throw new Error('Supabase '+res.status+': '+t); }
  if(res.status===204) return null;
  const txt = await res.text();
  return txt? JSON.parse(txt): null;
}

/* ---- lokaler Speicher als Fallback ---- */
const L = {
  get(k){ try{return JSON.parse(localStorage.getItem('mt_'+k)||'[]');}catch(e){return [];} },
  set(k,v){ localStorage.setItem('mt_'+k, JSON.stringify(v)); return v; }
};

export const Store = {
  online: ONLINE,

  /* ---------- Klassen ---------- */
  async listClasses(){
    if(ONLINE) return await sb('classes?select=*&order=name');
    return L.get('classes');
  },
  async getClass(id){
    if(ONLINE){ const a = await sb('classes?select=*&id=eq.'+encodeURIComponent(id)); return a&&a[0]; }
    return L.get('classes').find(c=>c.id===id);
  },
  async createClass(name, students){
    const row = {id: uid('c_'), name, students: students||[], created_at: new Date().toISOString()};
    if(ONLINE){ const a = await sb('classes', {method:'POST', body:row}); return a[0]; }
    const all = L.get('classes'); all.push(row); L.set('classes', all); return row;
  },
  async updateClass(id, patch){
    if(ONLINE){ const a = await sb('classes?id=eq.'+encodeURIComponent(id), {method:'PATCH', body:patch}); return a[0]; }
    const all=L.get('classes'); const i=all.findIndex(c=>c.id===id); if(i<0) return null;
    all[i]=Object.assign(all[i],patch); L.set('classes',all); return all[i];
  },
  async deleteClass(id){
    if(ONLINE){
      await sb('results?class_id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'});
      await sb('assignments?class_id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'});
      await sb('classes?id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'});
      return true;
    }
    L.set('results', L.get('results').filter(r=>r.class_id!==id));
    L.set('assignments', L.get('assignments').filter(a=>a.class_id!==id));
    L.set('classes', L.get('classes').filter(c=>c.id!==id));
    return true;
  },

  /* ---------- Tests (Bibliothek) ---------- */
  async listTests(){
    if(ONLINE) return await sb('tests?select=*&order=created_at.desc');
    return L.get('tests').slice().sort((a,b)=>(b.created_at||'').localeCompare(a.created_at||''));
  },
  async getTest(id){
    if(ONLINE){ const a = await sb('tests?select=*&id=eq.'+encodeURIComponent(id)); return a&&a[0]; }
    return L.get('tests').find(t=>t.id===id);
  },
  async saveTest(t){
    const row = Object.assign({id: uid('t_'), created_at: new Date().toISOString()}, t);
    if(ONLINE){ const a = await sb('tests', {method:'POST', body:row}); return a[0]; }
    const all=L.get('tests'); all.push(row); L.set('tests',all); return row;
  },
  async updateTest(id, patch){
    if(ONLINE){ const a = await sb('tests?id=eq.'+encodeURIComponent(id), {method:'PATCH', body:patch}); return a[0]; }
    const all=L.get('tests'); const i=all.findIndex(t=>t.id===id); if(i<0)return null;
    all[i]=Object.assign(all[i],patch); L.set('tests',all); return all[i];
  },
  async deleteTest(id){
    if(ONLINE){
      await sb('results?test_id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'});
      await sb('assignments?test_id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'});
      await sb('tests?id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'});
      return true;
    }
    L.set('results', L.get('results').filter(r=>r.test_id!==id));
    L.set('assignments', L.get('assignments').filter(a=>a.test_id!==id));
    L.set('tests', L.get('tests').filter(t=>t.id!==id));
    return true;
  },

  /* ---------- Freigaben (Test fuer eine Klasse) ---------- */
  async listAssignments(){
    if(ONLINE) return await sb('assignments?select=*&order=created_at.desc');
    return L.get('assignments').slice().sort((a,b)=>(b.created_at||'').localeCompare(a.created_at||''));
  },
  async getAssignmentByCode(c){
    const cc = String(c||'').toUpperCase().trim();
    if(ONLINE){ const a = await sb('assignments?select=*&code=eq.'+encodeURIComponent(cc)); return a&&a[0]; }
    return L.get('assignments').find(a=>a.code===cc);
  },
  async createAssignment(test_id, class_id, date){
    const row = {id: uid('a_'), test_id, class_id, code: code(6), date: date||todayISO(), active:true, created_at:new Date().toISOString()};
    if(ONLINE){ const a = await sb('assignments', {method:'POST', body:row}); return a[0]; }
    const all=L.get('assignments'); all.push(row); L.set('assignments',all); return row;
  },
  async setAssignmentActive(id, active){
    if(ONLINE){ const a = await sb('assignments?id=eq.'+encodeURIComponent(id), {method:'PATCH', body:{active}}); return a[0]; }
    const all=L.get('assignments'); const i=all.findIndex(a=>a.id===id); if(i<0)return null;
    all[i].active=active; L.set('assignments',all); return all[i];
  },
  async deleteAssignment(id){
    if(ONLINE){
      await sb('results?assignment_id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'});
      await sb('assignments?id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'});
      return true;
    }
    L.set('results', L.get('results').filter(r=>r.assignment_id!==id));
    L.set('assignments', L.get('assignments').filter(a=>a.id!==id));
    return true;
  },

  /* ---------- Ergebnisse ---------- */
  async listResults(filter){
    if(ONLINE){
      let q='results?select=*&order=created_at.desc';
      if(filter&&filter.class_id) q+='&class_id=eq.'+encodeURIComponent(filter.class_id);
      return await sb(q);
    }
    let all=L.get('results');
    if(filter&&filter.class_id) all=all.filter(r=>r.class_id===filter.class_id);
    return all.slice().sort((a,b)=>(b.created_at||'').localeCompare(a.created_at||''));
  },
  async saveResult(res){
    const row = Object.assign({id: uid('r_'), created_at:new Date().toISOString()}, res);
    if(ONLINE){ const a = await sb('results', {method:'POST', body:row}); return a[0]; }
    const all=L.get('results'); all.push(row); L.set('results',all); return row;
  },
  async deleteResult(id){
    if(ONLINE){ await sb('results?id=eq.'+encodeURIComponent(id), {method:'DELETE', prefer:'return=minimal'}); return true; }
    L.set('results', L.get('results').filter(r=>r.id!==id)); return true;
  }
};
