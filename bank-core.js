/* Bausteine fuer Aufgaben-Generatoren */
import {R, fmt, gcd, fracStr} from './util.js';

export function mc(q, correct, wrongs, solution, rng){
  const seen=new Set([String(correct)]); const clean=[];
  for(const w of wrongs){ const s=String(w); if(!seen.has(s)){ seen.add(s); clean.push(s); } }
  const opts = R.shuffle(rng, [String(correct), ...clean]);
  return {type:'mc', q, options:opts, answer:opts.indexOf(String(correct)), solution};
}
export function tf(q, answer, solution){ return {type:'tf', q, answer:!!answer, solution}; }
export function num(q, answer, solution, o){
  o=o||{};
  return {type:'input', mode:'num', q, answer:String(answer), tol:o.tol||0, unit:o.unit||'', solution, alt:o.alt||[]};
}
export function txt(q, answer, solution, alt){
  return {type:'input', mode:'txt', q, answer:String(answer), solution, alt:alt||[]};
}
export function ord(q, correctOrder, solution, rng){
  let shown = R.shuffle(rng, correctOrder);
  let guard=0;
  while(shown.join('|')===correctOrder.join('|') && guard++<20) shown = R.shuffle(rng, correctOrder);
  return {type:'order', q, items:shown, answer:correctOrder.slice(), solution};
}
/* haeufig gebrauchte Distraktoren-Helfer */
export function nearNums(rng, v, n, step){
  const out=new Set(); step=step||1; let guard=0;
  while(out.size<n && guard++<200){
    const d = R.int(rng,1,4)*step*(rng()<0.5?-1:1);
    const c = Math.round((v+d)*1e6)/1e6;
    if(c!==v && c>=0) out.add(c);
  }
  while(out.size<n) out.add(v + out.size + 1);
  return [...out];
}
export {R, fmt, gcd, fracStr};
