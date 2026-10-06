/* Gemeinsame Hilfsfunktionen */
export function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
export function makeRng(seed){let h=1779033703^String(seed).length;for(let i=0;i<String(seed).length;i++){h=Math.imul(h^String(seed).charCodeAt(i),3432918353);h=h<<13|h>>>19;}return mulberry32(h>>>0);}
export const R = {
  int(rng,a,b){return a+Math.floor(rng()*(b-a+1));},
  pick(rng,arr){return arr[Math.floor(rng()*arr.length)];},
  shuffle(rng,arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;},
  sample(rng,arr,n){return R.shuffle(rng,arr).slice(0,n);},
  sign(rng){return rng()<0.5?-1:1;}
};
export function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;}
export function lcm(a,b){return Math.abs(a*b)/gcd(a,b);}
/* Deutsche Zahlformatierung */
export function fmt(n,dec){
  if(typeof n!=='number')return String(n);
  let s = (dec===undefined)? String(Math.round(n*1e6)/1e6) : n.toFixed(dec);
  return s.replace('.',',');
}
export function fracStr(z,n){const g=gcd(z,n);z/=g;n/=g;if(n<0){z=-z;n=-n;}return n===1?String(z):z+'/'+n;}
/* Antwortvergleich fuer Eingabefelder */
export function normAnswer(s){
  return String(s).trim().toLowerCase()
    .replace(/\s+/g,'')
    .replace(/^\+/,'')
    .replace(/€|eur|euro/g,'')
    .replace(/,/g,'.');
}
export function numeric(s){
  const t=normAnswer(s).replace(/[^0-9.\-\/]/g,'');
  if(t.includes('/')){const p=t.split('/');if(p.length===2){const a=parseFloat(p[0]),b=parseFloat(p[1]);if(isFinite(a)&&isFinite(b)&&b!==0)return a/b;}return NaN;}
  const v=parseFloat(t);return isFinite(v)?v:NaN;
}
export function uid(p){return (p||'')+Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4);}
export function code(len){const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<(len||6);i++)s+=A[Math.floor(Math.random()*A.length)];return s;}
export function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function todayISO(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
export function deDate(iso){if(!iso)return '';const p=String(iso).slice(0,10).split('-');return p[2]+'.'+p[1]+'.'+p[0];}
/* Einfache Pruefsumme fuer das Lehrer-Passwort.
   Bewusst kein Krypto-Verfahren: die Pruefung laeuft im Browser und ist
   damit ohnehin kein echter Zugriffsschutz, sondern ein Sichtschutz. */
export function pinHash(s){
  s=String(s);
  let a=5381, b=2166136261;
  for(let i=0;i<s.length;i++){
    a=(((a<<5)+a)^s.charCodeAt(i))>>>0;
    b=Math.imul(b^s.charCodeAt(i),16777619)>>>0;
  }
  return a.toString(36)+'-'+b.toString(36);
}
