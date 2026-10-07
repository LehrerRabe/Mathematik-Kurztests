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

/* ---- Vorzeichen- und Termdarstellung ----
   Sorgt dafuer, dass nie "+ -9", "1x" oder "x − -3" im Aufgabentext steht. */
const MIN = '−';                       // typografisches Minus
export function nz(n){                      // Zahl anzeigen
  return String(n).replace(/^-/, MIN);
}
export function klammer(n){                 // Zahl, bei negativem Wert in Klammern
  return n<0 ? '('+MIN+Math.abs(n)+')' : String(n);
}
export function term(c, v){                 // Koeffizient vor Variable: x, −x, 3x, −3x
  if(c===1) return v;
  if(c===-1) return MIN+v;
  return nz(c)+v;
}
export function plusZahl(n){                // " + 3" / " − 3"; 0 ergibt ""
  if(n===0) return '';
  return (n<0 ? ' '+MIN+' ' : ' + ') + Math.abs(n);
}
export function plusTerm(c, v){             // " + 3x" / " − x"; 0 ergibt ""
  if(c===0) return '';
  const a=Math.abs(c);
  return (c<0 ? ' '+MIN+' ' : ' + ') + (a===1 ? v : a+v);
}
