/* Kopfrechnen - Einmaleins. Eigener Bereich fuer Jahrgang 5 bis 7.
   Die Generatoren bekommen als zweites Argument die Einstellungen:
   p.rows  = gewaehlte Reihen (Zahlen von 1 bis 20)
   p.bis20 = true, wenn auch der zweite Faktor bis 20 gehen darf */
import {mc,tf,num,txt,ord,nearNums,R,fmt, nz} from './bank-core.js';

const ROWS = p => (p && p.rows && p.rows.length) ? p.rows : [2,3,4,5,6,7,8,9,10];
const MAX2 = p => (p && p.bis20) ? 20 : 10;
const reihe = (r,p) => R.pick(r, ROWS(p));
/* Faktor 1 waere zu trivial - deshalb ab 2 */
const faktor = (r,p) => R.int(r, 2, MAX2(p));

/* plausible, aber falsche Ergebnisse - nah am richtigen Wert */
function distraktoren(r, a, b, n){
  const richtig = a*b;
  const kandidaten = [a*(b+1), a*(b-1), (a+1)*b, (a-1)*b, richtig+10, richtig-10, richtig+a, richtig-b];
  const out=[];
  for(const k of R.shuffle(r, kandidaten)){
    if(k>0 && k!==richtig && !out.includes(k)) out.push(k);
    if(out.length>=n) break;
  }
  let z=1;
  while(out.length<n){ if(richtig+z>0 && !out.includes(richtig+z) && richtig+z!==richtig) out.push(richtig+z); z++; }
  return out;
}

const GENS = [
 /* 1. Produkt berechnen */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p);
   return num('Rechne im Kopf: '+a+' · '+b, a*b, a+' · '+b+' = '+(a*b)+'.');},
 /* 2. Umkehraufgabe: Division */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p);
   return num('Rechne im Kopf: '+(a*b)+' : '+a, b, a+' · '+b+' = '+(a*b)+', also '+(a*b)+' : '+a+' = '+b+'.');},
 /* 3. Fehlender Faktor */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p);
   return num('Welche Zahl fehlt? '+a+' · ___ = '+(a*b), b, (a*b)+' : '+a+' = '+b+'.');},
 /* 4. Multiple Choice */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p);
   return mc('Wie viel ist '+a+' · '+b+'?', a*b, distraktoren(r,a,b,3), a+' · '+b+' = '+(a*b)+'.', r);},
 /* 5. Wahr / Falsch */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p);
   const falsch = r()<0.5;
   const abw = R.pick(r,[a,b,10,-a,-b]) || a;
   const gezeigt = falsch ? a*b+abw : a*b;
   if(gezeigt===a*b) return tf(a+' · '+b+' = '+(a*b), true, 'Das Ergebnis stimmt.');
   return tf(a+' · '+b+' = '+gezeigt, false, 'Richtig wäre '+a+' · '+b+' = '+(a*b)+'.');},
 /* 6. Reihenfolge: Produkte sortieren */
 (r,p)=>{const a=reihe(r,p);
   const bs=R.sample(r,[2,3,4,5,6,7,8,9,10].filter(x=>x<=MAX2(p)),4).sort((x,y)=>x-y);
   const L=bs.map(b=>a+' · '+b);
   return ord('Ordne die Aufgaben der '+a+'er-Reihe nach ihrem Ergebnis – beginne mit dem kleinsten.', L,
     'Die Ergebnisse sind '+bs.map(b=>a*b).join(', ')+'. In der '+a+'er-Reihe wächst das Ergebnis mit jedem Schritt um '+a+'.', r);},
 /* 7. Verdoppeln / Halbieren innerhalb der Reihe */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p);
   return num('Wie viel ist das Doppelte von '+a+' · '+b+'?', 2*a*b,
     a+' · '+b+' = '+(a*b)+', verdoppelt '+(2*a*b)+'.');},
 /* 8. Quadratzahl der Reihe */
 (r,p)=>{const a=reihe(r,p);
   return num('Rechne im Kopf: '+a+' · '+a, a*a, a+' · '+a+' = '+(a*a)+' (Quadratzahl).');},
 /* 9. Sachaufgabe */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p);
   const S=[['Packungen','Stifte'],['Kisten','Äpfel'],['Reihen','Stühle'],['Tüten','Murmeln'],['Regale','Bücher']];
   const s=R.pick(r,S);
   return num('In '+b+' '+s[0]+' liegen je '+a+' '+s[1]+'. Wie viele '+s[1]+' sind das insgesamt?', a*b,
     b+' · '+a+' = '+(a*b)+'.');},
 /* 10. Nachbaraufgabe */
 (r,p)=>{const a=reihe(r,p), b=R.int(r,3,MAX2(p));
   return num('Du weißt: '+a+' · '+b+' = '+(a*b)+'. Wie viel ist dann '+a+' · '+(b-1)+'?', a*(b-1),
     'Ein '+a+'er weniger: '+(a*b)+' − '+a+' = '+(a*(b-1))+'.');},
 /* 11. Multiple Choice: welche Aufgabe passt zum Ergebnis */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p); const erg=a*b;
   const falsche=[]; let guard=0;
   while(falsche.length<3 && guard++<60){
     const x=R.pick(r,ROWS(p)), y=R.int(r,1,MAX2(p));
     const s=x+' · '+y;
     if(x*y!==erg && !falsche.includes(s)) falsche.push(s);
   }
   while(falsche.length<3) falsche.push((erg+falsche.length+1)+' · 1');
   return mc('Welche Aufgabe ergibt '+erg+'?', a+' · '+b, falsche, a+' · '+b+' = '+erg+'.', r);},
 /* 12. Zwei Schritte */
 (r,p)=>{const a=reihe(r,p), b=faktor(r,p), c=R.int(r,1,9);
   return num('Rechne im Kopf: '+a+' · '+b+' + '+c, a*b+c, 'Punkt vor Strich: '+a+' · '+b+' = '+(a*b)+', plus '+c+' ergibt '+(a*b+c)+'.');}
];

const THEMA = (grade, name, rows) => ({
  key:'g'+grade+'-kopfrechnen', grade, name, kind:'kopfrechnen',
  defaultRows: rows, gens: GENS
});

export default [
  THEMA(5, 'Kopfrechnen – Einmaleins', [2,3,4,5,6,7,8,9,10]),
  THEMA(6, 'Kopfrechnen – Einmaleins', [2,3,4,5,6,7,8,9,10]),
  THEMA(7, 'Kopfrechnen – Einmaleins', [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
];
