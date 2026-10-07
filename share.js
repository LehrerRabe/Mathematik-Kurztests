/* Test-Links ohne Server.
   Mode S: nur die "Bauanleitung" (Startwert + Auswahl) – sehr kurz, QR-tauglich.
   Mode F: der vollstaendige Test – noetig, sobald Aufgaben bearbeitet, geloescht
           oder selbst angelegt wurden. Dann laenger, aber immer noch nur ein Link. */
import {generate} from './bank.js';

/* --- kleine LZW-Kompression, damit Mode F kuerzer wird --- */
function lzwEncode(s){
  const dict=new Map(); let out=[], phrase=s[0]||'', code=256, c;
  for(let i=0;i<256;i++) dict.set(String.fromCharCode(i), i);
  for(let i=1;i<s.length;i++){
    c=s[i];
    if(dict.has(phrase+c)) phrase+=c;
    else { out.push(dict.get(phrase)); dict.set(phrase+c, code++); phrase=c; }
  }
  if(phrase!=='') out.push(dict.get(phrase));
  return out;
}
function lzwDecode(arr){
  const dict=[]; for(let i=0;i<256;i++) dict[i]=String.fromCharCode(i);
  let code=256, phrase=dict[arr[0]], out=phrase, entry;
  for(let i=1;i<arr.length;i++){
    const k=arr[i];
    entry = dict[k]!==undefined ? dict[k] : phrase+phrase[0];
    out+=entry; dict[code++]=phrase+entry[0]; phrase=entry;
  }
  return out;
}
/* Codes (0..65535) -> URL-sicherer Text */
const A='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
/* Bitbreite richtet sich nach dem groessten Code - spart bei kurzen Tests viel Platz. */
function packCodes(codes){
  const max=codes.reduce((a,b)=>b>a?b:a,0);
  let w=9; while((1<<w)<=max) w++;
  let bits='', out=A[w-9];
  for(const c of codes) bits += c.toString(2).padStart(w,'0');
  while(bits.length%6) bits+='0';
  for(let i=0;i<bits.length;i+=6) out += A[parseInt(bits.slice(i,i+6),2)];
  return out;
}
function unpackCodes(str){
  const w=A.indexOf(str[0])+9;
  let bits='';
  for(const ch of str.slice(1)){ const v=A.indexOf(ch); if(v<0) continue; bits += v.toString(2).padStart(6,'0'); }
  const codes=[];
  for(let i=0;i+w<=bits.length;i+=w) codes.push(parseInt(bits.slice(i,i+w),2));
  return codes;
}
function toText(obj){ return packCodes(lzwEncode(unescape(encodeURIComponent(JSON.stringify(obj))))); }
function fromText(txt){ return JSON.parse(decodeURIComponent(escape(lzwDecode(unpackCodes(txt))))); }

/* --- Oeffentliche API --- */
export function canUseSeed(test){
  return test.pure === true && !!test.seed && Array.isArray(test.items)
      && !test.items.some(i => i.manual || i.edited || i.ai);
}
export function encodeTest(test){
  if(canUseSeed(test)){
    return 'S'+toText({v:1, n:test.name, g:test.grade, t:test.topics||[], c:test.items.length,
                        y:test.types||[], s:test.seed, p:test.items.map(i=>i.points||1), sc:test.scale,
                        sh:test.shuffle?1:0});
  }
  return 'F'+toText({v:1, n:test.name, g:test.grade, sc:test.scale, sh:test.shuffle?1:0,
    i:test.items.map(i=>({t:i.type,q:i.q,o:i.options,a:i.answer,s:i.solution,u:i.unit,
                          m:i.mode,l:i.tol,x:i.alt,it:i.items,p:i.points||1,tn:i.topicName}))});
}
export function decodeTest(code){
  const mode=code[0], body=code.slice(1);
  const d=fromText(body);
  if(mode==='S'){
    const items=generate({grade:d.g, topicKeys:d.t, count:d.c, types:d.y, seed:d.s});
    (d.p||[]).forEach((pt,i)=>{ if(items[i]) items[i].points=pt; });
    return {name:d.n, grade:d.g, items, scale:d.sc, shuffle:!!d.sh};
  }
  const items=(d.i||[]).map((x,n)=>({id:'q'+n, type:x.t, q:x.q, options:x.o, answer:x.a, solution:x.s,
    unit:x.u, mode:x.m, tol:x.l, alt:x.x, items:x.it, points:x.p||1, topicName:x.tn}));
  return {name:d.n, grade:d.g, items, scale:d.sc, shuffle:!!d.sh};
}
