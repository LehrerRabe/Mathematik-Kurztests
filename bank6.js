import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr} from './bank-core.js';
const dec=(x,d)=>fmt(Math.round(x*Math.pow(10,d))/Math.pow(10,d),d);

export default [
{key:'g6-brueche', grade:6, name:'Brüche – Anteile, Kürzen, Erweitern', gens:[
 r=>{const k=R.int(r,2,12), z=R.int(r,1,9), n=z+R.int(r,1,9);
     return txt('Kürze vollständig: '+(z*k)+'/'+(n*k)+' (Form: z/n)', fracStr(z,n), 'Größter gemeinsamer Teiler ist '+k+'.', []);},
 r=>{const n=R.pick(r,[3,4,5,6,8,10,12]); const z=R.int(r,1,n-1); const c=R.int(r,2,6);
     return num('Erweitere '+z+'/'+n+' mit '+c+'. Wie lautet der neue Zähler?', z*c,
       'Zähler und Nenner mit '+c+' multiplizieren: '+z+'/'+n+' = '+(z*c)+'/'+(n*c)+'.');},
 r=>{const a=[R.int(r,1,5),R.int(r,6,9)], b=[R.int(r,1,4),R.int(r,5,8)];
     const va=a[0]/a[1], vb=b[0]/b[1];
     if(Math.abs(va-vb)<1e-9) return tf(fracStr(a[0],a[1])+' > '+fracStr(b[0],b[1]), false,'Beide Brüche sind gleich groß.');
     const g=va>vb;
     return tf(fracStr(a[0],a[1])+' > '+fracStr(b[0],b[1]), g, 'Als Dezimalzahl: '+dec(va,3)+' und '+dec(vb,3)+'.');},
 r=>{const L=[['1/8',0.125],['1/5',0.2],['1/4',0.25],['1/3',1/3],['2/5',0.4],['1/2',0.5],['3/5',0.6],['2/3',2/3],['3/4',0.75],['7/8',0.875]];
     const s=R.sample(r,L,4).sort((a,b)=>a[1]-b[1]).map(x=>x[0]);
     return ord('Ordne die Brüche vom kleinsten zum größten.',s,'Gemeinsamer Nenner oder Umwandlung in Dezimalzahlen.',r);},
 r=>{const P=[['1/2','50 %'],['1/4','25 %'],['3/4','75 %'],['1/5','20 %'],['3/10','30 %'],['7/10','70 %'],['1/25','4 %'],['9/20','45 %']];
     const p=R.pick(r,P);
     return mc(p[0]+' entspricht wie viel Prozent?', p[1], R.sample(r,P.filter(x=>x[1]!==p[1]).map(x=>x[1]),3), p[0]+' = '+p[1]+'.', r);}
]},

{key:'g6-dezimal', grade:6, name:'Brüche in Dezimalschreibweise', gens:[
 r=>{const F=[[1,2,'0,5'],[1,4,'0,25'],[3,4,'0,75'],[1,5,'0,2'],[3,5,'0,6'],[1,8,'0,125'],[5,8,'0,625'],[7,10,'0,7'],[1,20,'0,05']];
     const f=R.pick(r,F);
     return txt('Schreibe '+f[0]+'/'+f[1]+' als Dezimalzahl.', f[2], f[0]+' : '+f[1]+' = '+f[2]+'.', [f[2].replace(',','.')]);},
 r=>{const v=R.int(r,1000,99999)/1000; const st=R.pick(r,[[1,'Zehntel'],[2,'Hundertstel']]);
     const a=Math.round(v*Math.pow(10,st[0]))/Math.pow(10,st[0]);
     return num('Runde '+fmt(v,3)+' auf '+st[1]+'.', a, 'Die nächste Ziffer entscheidet: '+fmt(a,st[0])+'.',{tol:0.0001});},
 r=>{const a=R.int(r,100,999)/100, b=R.int(r,100,999)/100;
     return tf(fmt(a,2)+' < '+fmt(b,2), a<b, 'Dezimalzahlen stellenweise vergleichen: '+fmt(a,2)+(a<b?' < ':' ≥ ')+fmt(b,2)+'.');},
 r=>{const L=R.sample(r,[0.3,0.25,0.303,0.33,0.4,0.045,0.5,0.125],4).sort((a,b)=>a-b).map(x=>fmt(x));
     return ord('Ordne die Dezimalzahlen vom kleinsten zum größten Wert.', L, 'Stellenweise vergleichen – fehlende Stellen als Null denken.', r);},
 r=>{const F=[['1/3','0,333… (periodisch)'],['1/4','0,25 (abbrechend)'],['2/3','0,666… (periodisch)'],['1/8','0,125 (abbrechend)'],['1/6','0,1666… (periodisch)'],['3/5','0,6 (abbrechend)']];
     const f=R.pick(r,F); const per=f[1].includes('periodisch');
     return tf('Der Bruch '+f[0]+' ergibt eine periodische Dezimalzahl.', per, f[0]+' = '+f[1]+'.');},
 r=>{const n=R.int(r,105,999); return num(fmt(n/100,2)+' m = ____ cm', n, '1 m = 100 cm, also '+fmt(n/100,2)+' · 100 = '+n+' cm.',{unit:'cm'});}
]},

{key:'g6-addsub', grade:6, name:'Zahlen addieren und subtrahieren', gens:[
 r=>{const n=R.pick(r,[4,6,8,10,12]); const a=R.int(r,1,n-2), b=R.int(r,1,n-a-1);
     return txt('Berechne: '+a+'/'+n+' + '+b+'/'+n+' (vollständig gekürzt, Form z/n)', fracStr(a+b,n),
       'Gleicher Nenner: Zähler addieren → '+(a+b)+'/'+n+' = '+fracStr(a+b,n)+'.');},
 r=>{const n1=R.pick(r,[2,3,4]), n2=R.pick(r,[6,8,12].filter(x=>x%n1===0&&x!==n1));
     const a=R.int(r,1,n1-1), b=R.int(r,1,n2-1);
     const z=a*(n2/n1)+b;
     return txt('Berechne: '+a+'/'+n1+' + '+b+'/'+n2+' (vollständig gekürzt, Form z/n)', fracStr(z,n2),
       'Hauptnenner '+n2+': '+a+'/'+n1+' = '+(a*(n2/n1))+'/'+n2+'. Summe: '+z+'/'+n2+' = '+fracStr(z,n2)+'.');},
 r=>{const a=R.int(r,100,9999)/100, b=R.int(r,100,9999)/100;
     return num('Berechne: '+fmt(a,2)+' + '+fmt(b,2), fmt(a+b,2), 'Kommastellen untereinander schreiben. Ergebnis: '+fmt(a+b,2)+'.',{tol:0.005});},
 r=>{const a=R.int(r,500,9999)/100, b=R.int(r,100,a*100-1)/100;
     return num('Berechne: '+fmt(a,2)+' − '+fmt(b,2), fmt(a-b,2), 'Stellengerecht subtrahieren: '+fmt(a-b,2)+'.',{tol:0.005});},
 r=>ord('Ordne die Rechenschritte beim Addieren ungleichnamiger Brüche.',
     ['Hauptnenner bestimmen','Brüche erweitern','Zähler addieren','Ergebnis kürzen'],'Erst gleichnamig machen, dann Zähler addieren, zum Schluss kürzen.',r)
]},

{key:'g6-muster', grade:6, name:'Muster und Figuren (Winkel, Kreis, negative Zahlen)', gens:[
 r=>{const W=[['spitzer Winkel','kleiner als 90°'],['rechter Winkel','genau 90°'],['stumpfer Winkel','zwischen 90° und 180°'],['gestreckter Winkel','genau 180°'],['überstumpfer Winkel','zwischen 180° und 360°']];
     const w=R.pick(r,W);
     return mc('Wie groß ist ein '+w[0]+'?', w[1], R.sample(r,W.filter(x=>x[1]!==w[1]).map(x=>x[1]),3), w[0]+': '+w[1]+'.', r);},
 r=>{const a=R.int(r,10,170); return num('Wie groß ist der Nebenwinkel eines Winkels von '+a+'°?', 180-a, 'Nebenwinkel ergänzen sich zu 180°: 180° − '+a+'° = '+(180-a)+'°.',{unit:'°'});},
 r=>{const a=R.int(r,-20,-1), b=R.int(r,1,20);
     return tf(a+' < '+b, true, 'Negative Zahlen sind immer kleiner als positive Zahlen.');},
 r=>{const L=R.sample(r,[-12,-7,-3,-1,0,2,5,9,14],4).sort((a,b)=>a-b).map(String);
     return ord('Ordne die Zahlen vom kleinsten zum größten Wert.', L, 'Auf der Zahlengeraden liegt die kleinere Zahl weiter links.', r);},
 r=>{const x=R.int(r,-6,6), y=R.int(r,-6,6); const dx=R.int(r,-5,5), dy=R.int(r,-5,5);
     return txt('Der Punkt P('+x+'|'+y+') wird um '+dx+' in x-Richtung und '+dy+' in y-Richtung verschoben. Gib den Bildpunkt an (Form: (x|y) ).',
       '('+(x+dx)+'|'+(y+dy)+')','Koordinaten addieren: ('+x+'+'+dx+' | '+y+'+'+dy+') = ('+(x+dx)+'|'+(y+dy)+').',[(x+dx)+'|'+(y+dy)]);},
 r=>{const a=R.int(r,20,80), b=R.int(r,20,80); const c=180-a-b;
     return num('In einem Dreieck sind zwei Winkel '+a+'° und '+b+'° groß. Wie groß ist der dritte Winkel?', c,
       'Winkelsumme im Dreieck = 180°: 180° − '+a+'° − '+b+'° = '+c+'°.',{unit:'°'});}
]},

{key:'g6-multdiv', grade:6, name:'Zahlen multiplizieren und dividieren', gens:[
 r=>{const a=R.int(r,1,7),b=R.int(r,2,9),c=R.int(r,1,7),d=R.int(r,2,9);
     return txt('Berechne: '+fracStr(a,b)+' · '+fracStr(c,d)+' (vollständig gekürzt, Form z/n)', fracStr(a*c,b*d),
       'Zähler mal Zähler, Nenner mal Nenner: '+(a*c)+'/'+(b*d)+' = '+fracStr(a*c,b*d)+'.');},
 r=>{const a=R.int(r,1,7),b=R.int(r,2,9),c=R.int(r,1,7),d=R.int(r,2,9);
     return txt('Berechne: '+fracStr(a,b)+' : '+fracStr(c,d)+' (vollständig gekürzt, Form z/n)', fracStr(a*d,b*c),
       'Mit dem Kehrbruch multiplizieren: '+fracStr(a,b)+' · '+fracStr(d,c)+' = '+fracStr(a*d,b*c)+'.');},
 r=>{const a=R.int(r,11,99)/10, b=R.int(r,11,99)/10;
     return num('Berechne: '+fmt(a,1)+' · '+fmt(b,1), fmt(a*b,2), 'Ohne Komma rechnen, dann 2 Nachkommastellen setzen: '+fmt(a*b,2)+'.',{tol:0.005});},
 r=>{const b=R.int(r,2,9), q=R.int(r,11,99)/10; const a=Math.round(b*q*10)/10;
     return num('Berechne: '+fmt(a,1)+' : '+b, fmt(q,1), fmt(a,1)+' : '+b+' = '+fmt(q,1)+'.',{tol:0.005});},
 r=>{const f=R.int(r,2,9), z=R.pick(r,[10,100,1000]); const n=f*z; const v=R.int(r,15,995)/10;
     return num('Berechne: '+fmt(v,1)+' · '+n, fmt(v*n,1),
       'Zerlegen: '+n+' = '+f+' · '+z+'. Erst '+fmt(v,1)+' · '+f+' = '+fmt(v*f,1)+', dann das Komma um '+(String(z).length-1)+' Stellen nach rechts: '+fmt(v*n,1)+'.',{tol:0.05});},
 r=>tf('Beim Dividieren durch einen Bruch multipliziert man mit dem Kehrbruch.', true, 'a : (b/c) = a · (c/b).')
]},

{key:'g6-daten', grade:6, name:'Daten', gens:[
 r=>{const d=R.sample(r,[2,3,4,5,6,7,8,9,10,12,14],5); const s=d.reduce((a,b)=>a+b,0);
     return num('Berechne das arithmetische Mittel von '+d.join('; ')+'.', Math.round(s/d.length*100)/100,
       'Summe '+s+' : Anzahl '+d.length+' = '+fmt(s/d.length)+'.',{tol:0.01});},
 r=>{const d=R.sample(r,[1,3,4,6,7,9,11,12,15],5); const so=d.slice().sort((a,b)=>a-b);
     return num('Bestimme den Median von '+d.join('; ')+'.', so[2], 'Sortiert: '+so.join('; ')+'. Der mittlere Wert ist '+so[2]+'.');},
 r=>{const d=R.sample(r,[2,5,8,11,14,17,20],4); const so=d.slice().sort((a,b)=>a-b);
     return num('Bestimme die Spannweite von '+d.join('; ')+'.', so[so.length-1]-so[0], 'Spannweite = größter − kleinster Wert = '+so[so.length-1]+' − '+so[0]+'.');},
 r=>{const n=R.pick(r,[20,25,50,200]); const k=R.int(r,1,n-1);
     return num('Von '+n+' Schülerinnen und Schülern kommen '+k+' mit dem Rad. Wie groß ist die relative Häufigkeit in Prozent?',
       Math.round(k/n*10000)/100, k+' : '+n+' = '+fmt(k/n)+' = '+fmt(k/n*100)+' %.',{tol:0.02,unit:'%'});},
 r=>ord('Ordne die Schritte einer statistischen Untersuchung.',
     ['Fragestellung festlegen','Daten erheben','Daten in einer Strichliste ordnen','Diagramm zeichnen und auswerten'],'Planen, erheben, ordnen, darstellen und auswerten.',r),
 r=>tf('Der Median ist immer gleich dem arithmetischen Mittel.', false, 'Beide Kenngrößen können deutlich voneinander abweichen, z. B. bei Ausreißern.')
]},

{key:'g6-beziehungen', grade:6, name:'Beziehungen zwischen Zahlen (Terme, Dreisatz)', gens:[
 r=>{const n=R.int(r,3,8), p=R.int(r,2,9)*R.pick(r,[10,25,50]); const m=R.int(r,2,9);
     return num(n+' gleiche Hefte kosten '+fmt(n*p/100,2)+' €. Was kosten '+m+' Hefte? (in €)', fmt(m*p/100,2),
       'Dreisatz: 1 Heft kostet '+fmt(p/100,2)+' €, also '+m+' Hefte '+fmt(m*p/100,2)+' €.',{tol:0.005,unit:'€'});},
 r=>{const a=R.int(r,2,9), b=R.int(r,1,12), x=R.int(r,2,12);
     return num('Berechne den Wert des Terms '+a+' · x + '+b+' für x = '+x+'.', a*x+b, a+' · '+x+' + '+b+' = '+(a*x)+' + '+b+' = '+(a*x+b)+'.');},
 r=>{const st=R.int(r,2,7), a0=R.int(r,1,9); const f=[a0,a0+st,a0+2*st,a0+3*st];
     return num('Setze die Zahlenfolge fort: '+f.join('; ')+'; ___', a0+4*st, 'Es wird jeweils '+st+' addiert. Nächstes Glied: '+(a0+4*st)+'.');},
 r=>{const b=R.pick(r,[2,3]); const f=[1,b,b*b,b*b*b];
     return num('Setze fort: '+f.join('; ')+'; ___', b*b*b*b, 'Jede Zahl wird mit '+b+' multipliziert.');},
 r=>tf('Je mehr Arbeiter, desto kürzer die Arbeitszeit – das ist eine proportionale Zuordnung.', false,
     'Das ist eine antiproportionale Zuordnung: doppelt so viele Arbeiter → halbe Zeit.')
]}
];
