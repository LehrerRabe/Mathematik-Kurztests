import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr} from './bank-core.js';

const EIN_L=[['km','m',1000],['m','cm',100],['cm','mm',10],['m','mm',1000],['km','cm',100000]];
const EIN_M=[['t','kg',1000],['kg','g',1000],['g','mg',1000],['t','g',1000000]];
const EIN_T=[['h','min',60],['min','s',60],['d','h',24],['h','s',3600]];

export default [
{key:'g5-zahlen', grade:5, name:'Zahlen und Größen', gens:[
 r=>{const v=R.int(r,10000,999999); const st=R.pick(r,[[100,'Hunderter'],[1000,'Tausender'],[10000,'Zehntausender']]);
     const a=Math.round(v/st[0])*st[0];
     return num('Runde '+v.toLocaleString('de-DE')+' auf '+st[1]+'.',a,'Die Ziffer rechts der Rundungsstelle entscheidet: 0–4 abrunden, 5–9 aufrunden. Ergebnis: '+a.toLocaleString('de-DE')+'.');},
 r=>{const e=R.pick(r,[...EIN_L,...EIN_M]); const n=R.int(r,2,95);
     return num(n+' '+e[0]+' = ____ '+e[1], n*e[2], '1 '+e[0]+' = '+e[2]+' '+e[1]+', also '+n+' · '+e[2]+' = '+(n*e[2])+' '+e[1]+'.',{unit:e[1]});},
 r=>{const e=R.pick(r,EIN_T); const n=R.int(r,2,12);
     return num(n+' '+e[0]+' = ____ '+e[1], n*e[2], '1 '+e[0]+' = '+e[2]+' '+e[1]+'. '+n+' · '+e[2]+' = '+(n*e[2])+'.',{unit:e[1]});},
 r=>{const a=R.sample(r,[R.int(r,1000,9999),R.int(r,10000,99999),R.int(r,100,999),R.int(r,100000,999999),R.int(r,10,99)],4);
     const so=a.slice().sort((x,y)=>x-y).map(x=>x.toLocaleString('de-DE'));
     return ord('Ordne die Zahlen der Größe nach – beginne mit der kleinsten.',so,'Zuerst die Stellenanzahl vergleichen, dann Ziffer für Ziffer von links.',r);},
 r=>{const p=R.int(r,2,9)*100+R.int(r,0,99); const n=R.int(r,3,12); const ges=p*n;
     return num('Ein Heft kostet '+fmt(p/100,2)+' €. Wie viel kosten '+n+' Hefte? (Antwort in €)', fmt(ges/100,2),
       n+' · '+fmt(p/100,2)+' € = '+fmt(ges/100,2)+' €.',{tol:0.005,unit:'€'});},
 r=>{const v=R.int(r,1000,99999); const dig=String(v).length;
     return tf('Die Zahl '+v.toLocaleString('de-DE')+' hat '+dig+' Stellen.', true, 'Stellen zählen: '+v+' hat '+dig+' Ziffern.');},
 r=>{const v=R.int(r,10,99)*1000+R.int(r,500,999); const ab=Math.round(v/1000)*1000;
     return tf('Auf Tausender gerundet ergibt '+v.toLocaleString('de-DE')+' den Wert '+(ab-1000).toLocaleString('de-DE')+'.', false,
       'Die Hunderterziffer ist ≥ 5, es wird aufgerundet: '+ab.toLocaleString('de-DE')+'.');},
 r=>{const n=R.int(r,120,980); const w=nearNums(r,n*1000,3,1000);
     return mc('Welche Zahl ist '+n+' Tausender?', n*1000, w, n+' · 1000 = '+(n*1000)+'.', r);}
]},

{key:'g5-symmetrie', grade:5, name:'Symmetrie', gens:[
 r=>{const F=[['Quadrat',4],['Rechteck',2],['gleichseitiges Dreieck',3],['Raute',2],['gleichschenkliges Dreieck',1],['regelmäßiges Sechseck',6],['regelmäßiges Fünfeck',5]];
     const f=R.pick(r,F); const w=nearNums(r,f[1],3,1);
     return mc('Wie viele Symmetrieachsen hat ein '+f[0]+'?', f[1], w, 'Ein '+f[0]+' hat '+f[1]+' Symmetrieachse(n).', r);},
 r=>{const S=[['Jedes Quadrat ist ein Rechteck.',true,'Ein Quadrat erfüllt alle Eigenschaften eines Rechtecks (vier rechte Winkel).'],
             ['Jedes Rechteck ist ein Quadrat.',false,'Ein Rechteck muss keine vier gleich langen Seiten haben.'],
             ['Ein Parallelogramm ist immer achsensymmetrisch.',false,'Ein allgemeines Parallelogramm ist nur punktsymmetrisch.'],
             ['Jedes Quadrat ist eine Raute.',true,'Eine Raute hat vier gleich lange Seiten – das Quadrat auch.'],
             ['Parallele Geraden schneiden sich.',false,'Parallele Geraden haben überall denselben Abstand und schneiden sich nie.'],
             ['Orthogonale Geraden schneiden sich im rechten Winkel.',true,'„Orthogonal“ bedeutet senkrecht, also 90°.']];
     const s=R.pick(r,S); return tf(s[0],s[1],s[2]);},
 r=>{const x=R.int(r,1,8), y=R.int(r,1,8); const ax=R.pick(r,['y-Achse','x-Achse']);
     const bx = ax==='y-Achse'? -x : x, by = ax==='y-Achse'? y : -y;
     return txt('Der Punkt P('+x+'|'+y+') wird an der '+ax+' gespiegelt. Gib den Bildpunkt an (Form: (x|y) ).','('+bx+'|'+by+')',
       'Spiegelung an der '+ax+': '+(ax==='y-Achse'?'x-Koordinate wechselt das Vorzeichen':'y-Koordinate wechselt das Vorzeichen')+' → ('+bx+'|'+by+').',
       [bx+'|'+by, bx+';'+by]);},
 r=>ord('Ordne die Vierecke nach der Anzahl ihrer Symmetrieachsen – beginne mit der kleinsten Anzahl.',
     ['Parallelogramm (0)','gleichschenkliges Trapez (1)','Rechteck (2)','Quadrat (4)'],
     'Parallelogramm 0, gleichschenkliges Trapez 1, Rechteck 2, Quadrat 4 Symmetrieachsen.',r),
 r=>{const x=R.int(r,-8,8), y=R.int(r,-8,8);
     return txt('Punkt P('+x+'|'+y+') wird am Ursprung punktgespiegelt. Gib den Bildpunkt an (Form: (x|y) ).','('+(-x)+'|'+(-y)+')',
       'Bei Punktspiegelung am Ursprung wechseln beide Koordinaten das Vorzeichen.',[(-x)+'|'+(-y)]);},
 r=>{const V=[['jedes Quadrat',['4 gleich lange Seiten','4 rechte Winkel']],['jedes Trapez',['mindestens ein Paar paralleler Seiten']],['jede Raute',['4 gleich lange Seiten']]];
     const v=R.pick(r,V);
     return mc('Welche Eigenschaft trifft auf '+v[0]+' zu?', v[1][0],
       ['alle Winkel sind 60°','alle Diagonalen sind gleich lang','es hat genau 3 Ecken'], 'Es gilt für '+v[0]+': '+v[1].join(', ')+'.', r);}
]},

{key:'g5-rechnen', grade:5, name:'Rechnen mit natürlichen Zahlen', gens:[
 r=>{const a=R.int(r,23,98), b=R.int(r,12,49);
     return num('Berechne schriftlich: '+a+' · '+b, a*b, a+' · '+b+' = '+(a*b)+'.');},
 r=>{const b=R.int(r,3,19), q=R.int(r,12,99); const a=b*q;
     return num('Berechne: '+a+' : '+b, q, a+' : '+b+' = '+q+' (Probe: '+q+' · '+b+' = '+a+').');},
 r=>{const a=R.int(r,2,9),b=R.int(r,2,9),c=R.int(r,2,9),d=R.int(r,2,9);
     const v=a+b*c-d;
     return num('Berechne: '+a+' + '+b+' · '+c+' − '+d, v, 'Punkt vor Strich: '+b+' · '+c+' = '+(b*c)+', dann '+a+' + '+(b*c)+' − '+d+' = '+v+'.');},
 r=>{const a=R.int(r,2,6),b=R.int(r,2,9),c=R.int(r,2,9); const v=a*(b+c);
     return num('Berechne geschickt mit dem Distributivgesetz: '+a+' · '+b+' + '+a+' · '+c, v,
       a+' · '+b+' + '+a+' · '+c+' = '+a+' · ('+b+' + '+c+') = '+a+' · '+(b+c)+' = '+v+'.');},
 r=>{const P=[[12,'2 · 2 · 3'],[18,'2 · 3 · 3'],[24,'2 · 2 · 2 · 3'],[36,'2 · 2 · 3 · 3'],[45,'3 · 3 · 5'],[60,'2 · 2 · 3 · 5'],[100,'2 · 2 · 5 · 5'],[84,'2 · 2 · 3 · 7']];
     const p=R.pick(r,P); const w=R.sample(r,P.filter(x=>x[0]!==p[0]),3).map(x=>x[1]);
     return mc('Wie lautet die Primfaktorzerlegung von '+p[0]+'?', p[1], w, p[0]+' = '+p[1]+'.', r);},
 r=>{const n=R.int(r,100,999)*3; const t=R.pick(r,[[2,'2'],[3,'3'],[5,'5'],[10,'10']]);
     const teilt = n%t[0]===0;
     const reg={2:'gerade Endziffer',3:'Quersumme durch 3 teilbar',5:'Endziffer 0 oder 5',10:'Endziffer 0'}[t[0]];
     return tf('Die Zahl '+n+' ist durch '+t[1]+' teilbar.', teilt, 'Regel: '+reg+'. '+n+' : '+t[0]+(teilt?' geht auf.':' geht nicht auf.'));},
 r=>ord('Bringe die Rechenregeln in die richtige Reihenfolge („Reihenfolge der Rechenoperationen“).',
     ['Klammern','Potenzen','Punktrechnung (· und :)','Strichrechnung (+ und −)'],'Klammern zuerst, dann Potenzen, dann Punkt-, zuletzt Strichrechnung.',r),
 r=>{const b=R.int(r,2,7), e=R.int(r,2,4); const v=Math.pow(b,e);
     return num('Berechne die Potenz: '+b+'^'+e, v, b+'^'+e+' = '+Array(e).fill(b).join(' · ')+' = '+v+'.');}
]},

{key:'g5-flaechen', grade:5, name:'Flächen', gens:[
 r=>{const a=R.int(r,4,25), b=R.int(r,3,18);
     return num('Ein Rechteck ist '+a+' cm lang und '+b+' cm breit. Berechne den Flächeninhalt in cm².', a*b, 'A = a · b = '+a+' cm · '+b+' cm = '+(a*b)+' cm².',{unit:'cm²'});},
 r=>{const a=R.int(r,4,25), b=R.int(r,3,18);
     return num('Ein Rechteck ist '+a+' cm lang und '+b+' cm breit. Berechne den Umfang in cm.', 2*(a+b), 'u = 2 · (a + b) = 2 · ('+a+' + '+b+') = '+(2*(a+b))+' cm.',{unit:'cm'});},
 r=>{const g=R.int(r,2,12)*2, h=R.int(r,3,15);
     return num('Ein rechtwinkliges Dreieck hat die Katheten '+g+' cm und '+h+' cm. Berechne den Flächeninhalt in cm².', g*h/2,
       'A = (g · h) : 2 = ('+g+' · '+h+') : 2 = '+(g*h/2)+' cm².',{unit:'cm²'});},
 r=>{const E=[['1 m²','100 dm²'],['1 dm²','100 cm²'],['1 cm²','100 mm²'],['1 ha','10 000 m²'],['1 km²','100 ha'],['1 a','100 m²']];
     const e=R.pick(r,E); const w=R.sample(r,['10 dm²','1 000 cm²','10 000 cm²','1 000 m²','10 ha'],3);
     return mc(e[0]+' = ?', e[1], w, e[0]+' = '+e[1]+'.', r);},
 r=>ord('Ordne die Flächeneinheiten von klein nach groß.',['mm²','cm²','dm²','m²','a','ha','km²'],'Jede Stufe ist das 100-fache der vorherigen (a = 100 m², ha = 100 a, km² = 100 ha).',r),
 r=>{const m=R.pick(r,[100,200,500,1000]); const s=R.int(r,2,9);
     return num('Maßstab 1 : '+m+'. Eine Strecke ist auf der Karte '+s+' cm lang. Wie lang ist sie in Wirklichkeit (in m)?', s*m/100,
       s+' cm · '+m+' = '+(s*m)+' cm = '+(s*m/100)+' m.',{unit:'m'});},
 r=>{const a=R.int(r,5,20); return tf('Ein Quadrat mit der Seitenlänge '+a+' cm hat den Umfang '+(4*a)+' cm.', true,'u = 4 · a = 4 · '+a+' cm = '+(4*a)+' cm.');}
]},

{key:'g5-koerper', grade:5, name:'Körper', gens:[
 r=>{const a=R.int(r,2,12),b=R.int(r,2,10),c=R.int(r,2,9);
     return num('Ein Quader hat die Kantenlängen '+a+' cm, '+b+' cm und '+c+' cm. Berechne das Volumen in cm³.', a*b*c,
       'V = a · b · c = '+a+' · '+b+' · '+c+' = '+(a*b*c)+' cm³.',{unit:'cm³'});},
 r=>{const a=R.int(r,2,10),b=R.int(r,2,9),c=R.int(r,2,8); const O=2*(a*b+a*c+b*c);
     return num('Berechne den Oberflächeninhalt eines Quaders mit '+a+' cm, '+b+' cm und '+c+' cm (in cm²).', O,
       'O = 2 · (a·b + a·c + b·c) = 2 · ('+(a*b)+' + '+(a*c)+' + '+(b*c)+') = '+O+' cm².',{unit:'cm²'});},
 r=>{const K=[['Würfel',['6 Flächen','12 Kanten','8 Ecken']],['Quader',['6 Flächen','12 Kanten','8 Ecken']]];
     const k=R.pick(r,K); const f=R.pick(r,[[ 'Flächen',6],['Kanten',12],['Ecken',8]]);
     return mc('Wie viele '+f[0]+' hat ein '+k[0]+'?', f[1], nearNums(r,f[1],3,2), 'Ein '+k[0]+' hat 6 Flächen, 12 Kanten und 8 Ecken.', r);},
 r=>ord('Ordne die Volumeneinheiten von klein nach groß.',['mm³','cm³','dm³','m³'],'Jede Stufe ist das 1000-fache der vorherigen.',r),
 r=>{const n=R.int(r,2,40); return num(n+' dm³ = ____ Liter', n, '1 dm³ = 1 Liter, also '+n+' dm³ = '+n+' l.',{unit:'l'});},
 r=>{const n=R.int(r,2,20); return num(n+' m³ = ____ dm³', n*1000, '1 m³ = 1000 dm³, also '+n+' · 1000 = '+(n*1000)+' dm³.',{unit:'dm³'});},
 r=>tf('Ein Würfelnetz besteht aus 6 Quadraten.', true, 'Der Würfel hat 6 quadratische Flächen, das Netz also 6 Quadrate.')
]},

{key:'g5-brueche', grade:5, name:'Brüche – das Ganze und seine Teile', gens:[
 r=>{const k=R.int(r,2,9), z=R.int(r,1,8), n=z+R.int(r,1,7);
     return txt('Kürze den Bruch '+(z*k)+'/'+(n*k)+' vollständig (Form: z/n).', fracStr(z,n),
       'Zähler und Nenner durch '+k+' teilen: '+(z*k)+'/'+(n*k)+' = '+fracStr(z,n)+'.',[fracStr(z,n).replace('/',':')]);},
 r=>{const P=[['1/2','50 %'],['1/4','25 %'],['3/4','75 %'],['1/5','20 %'],['1/10','10 %'],['2/5','40 %'],['3/5','60 %'],['1/20','5 %']];
     const p=R.pick(r,P); const w=R.sample(r,P.filter(x=>x[0]!==p[0]).map(x=>x[1]),3);
     return mc('Wie viel Prozent sind '+p[0]+'?', p[1], w, p[0]+' = '+p[1]+'.', r);},
 r=>{const n=R.pick(r,[4,5,8,10,20]); const z=R.int(r,1,n-1); const g=R.pick(r,[60,80,100,120,200,300]);
     return num('Berechne '+z+'/'+n+' von '+g+'.', g/n*z, g+' : '+n+' = '+(g/n)+', dann · '+z+' = '+(g/n*z)+'.');},
 r=>{const L=[['1/4',0.25],['1/3',1/3],['1/2',0.5],['2/3',2/3],['3/4',0.75],['5/6',5/6],['1/6',1/6],['3/8',0.375]];
     const s=R.sample(r,L,4).sort((a,b)=>a[1]-b[1]).map(x=>x[0]);
     return ord('Ordne die Brüche der Größe nach – beginne mit dem kleinsten.', s, 'Auf gemeinsamen Nenner bringen oder in Dezimalzahlen umwandeln und vergleichen.', r);},
 r=>{const a=R.int(r,1,5), b=a+R.int(r,1,4), c=R.int(r,2,6); const falsch=r()<0.4;
     const rz=falsch? a*c : a*c, rn=falsch? b*c+1 : b*c;
     return tf(a+'/'+b+' = '+rz+'/'+rn, !falsch,
       falsch? 'Beim Erweitern müssen Zähler UND Nenner mit derselben Zahl multipliziert werden: '+a+'/'+b+' = '+(a*c)+'/'+(b*c)+'.'
             : 'Zähler und Nenner wurden beide mit '+c+' multipliziert – der Wert bleibt gleich.');}
]}
];
