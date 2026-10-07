import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr, nz, klammer, term, plusZahl, plusTerm} from './bank-core.js';

export default [
{key:'g7-rational', grade:7, name:'Rechnen mit rationalen Zahlen', gens:[
 r=>{const a=R.int(r,-25,25), b=R.int(r,-25,25);
     return num('Berechne: '+klammer(a)+' + '+klammer(b), a+b, 'Vorzeichen beachten: '+klammer(a)+' + '+klammer(b)+' = '+nz(a+b)+'.');},
 r=>{const a=R.int(r,-25,25), b=R.int(r,-25,25);
     return num('Berechne: '+klammer(a)+' − '+klammer(b), a-b, 'Vorzeichen beachten: '+klammer(a)+' − '+klammer(b)+' = '+nz(a)+plusZahl(-b)+' = '+nz(a-b)+'.');},
 r=>{const a=R.int(r,-12,12)||3, b=R.int(r,-12,12)||4;
     return num('Berechne: '+klammer(a)+' · '+klammer(b), a*b, 'Gleiche Vorzeichen → positiv, verschiedene → negativ. Ergebnis: '+nz(a*b)+'.');},
 r=>{const b=R.int(r,2,12)*(r()<0.5?-1:1), q=R.int(r,2,12)*(r()<0.5?-1:1); const a=b*q;
     return num('Berechne: '+klammer(a)+' : '+klammer(b), q, klammer(a)+' : '+klammer(b)+' = '+nz(q)+'.');},
 r=>{const a=R.int(r,-9,9)||2,b=R.int(r,-9,9)||3,c=R.int(r,-9,9)||4;
     const v=a-b*c;
     return num('Berechne: '+nz(a)+' − '+klammer(b)+' · '+klammer(c), v,
       'Punkt vor Strich: '+klammer(b)+'·'+klammer(c)+' = '+nz(b*c)+', dann '+nz(a)+' − '+klammer(b*c)+' = '+nz(v)+'.');},
 r=>{const a=R.int(r,-15,-1);
     return tf('| '+nz(a)+' | = '+(-a), true, 'Der Betrag gibt den Abstand zur Null an und ist nie negativ.');},
 r=>{const L=R.sample(r,[-9.5,-7,-3.2,-1,0,0.5,2.75,6,11],4).sort((a,b)=>a-b).map(x=>nz(fmt(x)));
     return ord('Ordne die rationalen Zahlen vom kleinsten zum größten Wert.',L,'Auf der Zahlengeraden: je weiter links, desto kleiner.',r);},
 r=>{const a=R.int(r,2,9); return mc('Welches Ergebnis ist richtig: (−'+a+') · (−'+a+') = ?', a*a, [-(a*a), a*a+a, -(a*a)-a], 'Minus mal Minus ergibt Plus: (−'+a+')·(−'+a+') = '+(a*a)+'.', r);}
]},

{key:'g7-zuordnungen', grade:7, name:'Zuordnungen', gens:[
 r=>{const k=R.int(r,2,9), x=R.int(r,3,15);
     return num('Eine proportionale Zuordnung hat den Proportionalitätsfaktor '+k+'. Welcher Wert gehört zu x = '+x+'?', k*x,
       'y = '+k+' · x = '+k+' · '+x+' = '+(k*x)+'.');},
 r=>{const n=R.int(r,3,9), p=R.int(r,2,9)*10; const m=R.int(r,2,15);
     return num(n+' kg Äpfel kosten '+fmt(n*p/100,2)+' €. Was kosten '+m+' kg? (in €)', fmt(m*p/100,2),
       'Proportional: 1 kg kostet '+fmt(p/100,2)+' €, also '+m+' · '+fmt(p/100,2)+' € = '+fmt(m*p/100,2)+' €.',{tol:0.005,unit:'€'});},
 r=>{const a=R.int(r,3,12), t=R.int(r,4,24); const b=R.pick(r,[2,3,4,6].filter(x=>(a*t)%x===0))||2;
     const prod=a*t;
     return num(a+' Arbeiter brauchen '+t+' Stunden. Wie lange brauchen '+b+' Arbeiter? (antiproportional, in Stunden)',
       Math.round(prod/b*100)/100, 'Produktgleichheit: '+a+' · '+t+' = '+prod+'. '+prod+' : '+b+' = '+fmt(prod/b)+' h.',{tol:0.02,unit:'h'});},
 r=>{const S=[['Anzahl der Brötchen → Preis','proportional'],['Geschwindigkeit → Fahrzeit bei fester Strecke','antiproportional'],
             ['Anzahl der Arbeiter → Arbeitszeit','antiproportional'],['gefahrene Zeit → Weg bei konstantem Tempo','proportional'],
             ['Anzahl der Pakete → Gesamtgewicht','proportional']];
     const s=R.pick(r,S);
     return mc('Welche Art von Zuordnung liegt vor? „'+s[0]+'“', s[1], s[1]==='proportional'?['antiproportional','keine von beiden','linear mit y-Achsenabschnitt']:['proportional','keine von beiden','linear mit y-Achsenabschnitt'],
       s[0]+' ist '+s[1]+'.', r);},
 r=>{const k=R.int(r,2,9); const x=R.int(r,2,9); const y=k*x;
     return tf('Bei einer proportionalen Zuordnung ist der Quotient y : x immer gleich.', true, 'Quotientengleichheit: y : x = '+y+' : '+x+' = '+k+' für alle Wertepaare.');},
 r=>ord('Ordne die Schritte des Dreisatzes bei einer proportionalen Zuordnung.',
     ['Gegebene Größen notieren','Auf die Einheit zurückrechnen (Division)','Auf die gesuchte Anzahl hochrechnen (Multiplikation)','Ergebnis mit Einheit angeben'],
     'Dreisatz: erst auf 1 zurück, dann hoch.',r)
]},

{key:'g7-prozent', grade:7, name:'Prozent- und Zinsrechnung', gens:[
 r=>{const G=R.int(r,2,40)*25, p=R.pick(r,[5,10,12,15,20,25,30,40,60,75]);
     return num('Berechne '+p+' % von '+G+'.', G*p/100, 'W = G · p% = '+G+' · '+(p/100)+' = '+fmt(G*p/100)+'.');},
 r=>{const G=R.int(r,2,20)*50, p=R.pick(r,[10,20,25,40,50]); const W=G*p/100;
     return num('Wie viel Prozent sind '+fmt(W)+' von '+G+'?', p, 'p% = W : G = '+fmt(W)+' : '+G+' = '+fmt(p/100)+' = '+p+' %.',{unit:'%'});},
 r=>{const p=R.pick(r,[4,5,8,10,20,25]); const W=R.int(r,2,25)*p;
     const G=W*100/p;
     return num(fmt(W)+' entsprechen '+p+' %. Wie groß ist der Grundwert?', G, 'G = W : p% = '+fmt(W)+' : '+fmt(p/100)+' = '+fmt(G)+'.',{tol:0.01});},
 r=>{const K=R.int(r,4,40)*250, z=R.pick(r,[1,1.5,2,2.5,3,4]);
     return num('Kapital '+K+' € wird mit '+fmt(z)+' % pro Jahr verzinst. Wie hoch sind die Zinsen nach einem Jahr (in €)?',
       fmt(K*z/100,2), 'Z = K · p% = '+K+' · '+fmt(z/100)+' = '+fmt(K*z/100,2)+' €.',{tol:0.02,unit:'€'});},
 r=>{const K=R.int(r,4,20)*500, z=R.pick(r,[2,3,4,5]); const end=K*Math.pow(1+z/100,2);
     return num('Kapital '+K+' € wird 2 Jahre lang mit '+z+' % verzinst (Zinseszins). Endkapital in €?', Math.round(end*100)/100,
       'K₂ = '+K+' · '+fmt(1+z/100,2)+'² = '+fmt(end,2)+' €.',{tol:0.5,unit:'€'});},
 r=>{const p=R.pick(r,[10,20,25,50]); const alt=R.int(r,2,20)*10; const neu=alt*(1+p/100);
     return tf('Wird ein Preis von '+alt+' € um '+p+' % erhöht, beträgt der neue Preis '+fmt(neu,2)+' €.', true,
       'Wachstumsfaktor '+fmt(1+p/100,2)+': '+alt+' € · '+fmt(1+p/100,2)+' = '+fmt(neu,2)+' €.');},
 r=>{const p=R.pick(r,[10,20,25]); return mc('Ein Preis wird zuerst um '+p+' % erhöht und danach um '+p+' % gesenkt. Wie ist der Endpreis?',
     'niedriger als der Ausgangspreis', ['genau der Ausgangspreis','höher als der Ausgangspreis','doppelt so hoch'],
     'Faktor: '+fmt(1+p/100,2)+' · '+fmt(1-p/100,2)+' = '+fmt((1+p/100)*(1-p/100),4)+' < 1.', r);}
]},

{key:'g7-terme', grade:7, name:'Terme und Gleichungen', gens:[
 r=>{const a=R.int(r,2,9), b=R.int(r,1,15), x=R.int(r,2,15); const c=a*x+b;
     return num('Löse die Gleichung: '+term(a,'x')+plusZahl(b)+' = '+c, x, 'Beidseitig − '+b+': '+term(a,'x')+' = '+(c-b)+', dann : '+a+' → x = '+x+'.');},
 r=>{const a=R.int(r,2,9), b=R.int(r,1,12), c=R.int(r,1,9), x=R.int(r,2,12);
     const rhs=(a+c)*x+b; // ax + b + cx = rhs
     return num('Löse: '+term(a,'x')+plusZahl(b)+plusTerm(c,'x')+' = '+rhs, x,
       'Zusammenfassen: '+term(a+c,'x')+plusZahl(b)+' = '+rhs+' → '+term(a+c,'x')+' = '+(rhs-b)+' → x = '+x+'.');},
 r=>{const a=R.int(r,2,7), b=R.int(r,1,9), c=R.int(r,2,9);
     return txt('Multipliziere aus: '+a+'('+ 'x + '+b+') (Form: 3x+6)', (a)+'x+'+(a*b), 'Distributivgesetz: '+a+'·x + '+a+'·'+b+' = '+a+'x + '+(a*b)+'.',
       [a+'x + '+a*b]);},
 r=>{const a=R.int(r,2,9), b=a*R.int(r,2,9);
     return txt('Klammere aus: '+a+'x + '+b+' (Form: 3(x+2) )', a+'(x+'+(b/a)+')', 'Gemeinsamer Faktor '+a+': '+a+'x + '+b+' = '+a+'(x + '+(b/a)+').',
       [a+'*(x+'+(b/a)+')']);},
 r=>{const a=R.int(r,2,8), b=R.int(r,1,9), x=R.int(r,2,10); const v=a*x-b;
     return num('Berechne den Termwert von '+term(a,'x')+plusZahl(-b)+' für x = '+x+'.', v, a+' · '+x+' − '+b+' = '+nz(v)+'.');},
 r=>ord('Ordne die Schritte beim Lösen der Gleichung 3x + 5 = 20.',
     ['Beide Seiten − 5','3x = 15','Beide Seiten : 3','x = 5'],'Äquivalenzumformungen: erst die Addition, dann die Multiplikation rückgängig machen.',r),
 r=>tf('Beim Multiplizieren beider Seiten einer Gleichung mit 0 bleibt die Lösungsmenge gleich.', false,
     'Multiplikation mit 0 ist keine Äquivalenzumformung – es entsteht 0 = 0.')
]},

{key:'g7-winkel', grade:7, name:'Konstruieren und Argumentieren (Winkel, Kongruenz)', gens:[
 r=>{const a=R.int(r,15,165); return num('Wie groß ist der Scheitelwinkel zu einem Winkel von '+a+'°?', a, 'Scheitelwinkel sind gleich groß.',{unit:'°'});},
 r=>{const a=R.int(r,15,165); return num('Wie groß ist der Nebenwinkel zu einem Winkel von '+a+'°?', 180-a, 'Nebenwinkel ergänzen sich zu 180°.',{unit:'°'});},
 r=>{const a=R.int(r,20,80), b=R.int(r,20,80);
     return num('Ein Dreieck hat die Winkel '+a+'° und '+b+'°. Wie groß ist der dritte Winkel?', 180-a-b, 'Winkelsumme 180°.',{unit:'°'});},
 r=>{const a=R.int(r,20,80);
     return num('Ein gleichschenkliges Dreieck hat den Winkel '+a+'° an der Spitze. Wie groß ist ein Basiswinkel?', (180-a)/2,
       'Basiswinkel sind gleich: (180° − '+a+'°) : 2 = '+((180-a)/2)+'°.',{tol:0.01,unit:'°'});},
 r=>{const K=['SSS','SWS','WSW','SsW'];
     const k=R.pick(r,K);
     const T={'SSS':'drei Seiten','SWS':'zwei Seiten und der eingeschlossene Winkel','WSW':'eine Seite und die beiden anliegenden Winkel','SsW':'zwei Seiten und der Winkel gegenüber der längeren Seite'};
     return mc('Welche Angaben gehören zum Kongruenzsatz '+k+'?', T[k], R.sample(r,Object.values(T).filter(v=>v!==T[k]),3), k+': '+T[k]+'.', r);},
 r=>tf('Stufenwinkel an geschnittenen Parallelen sind gleich groß.', true, 'An parallelen Geraden sind Stufenwinkel gleich groß, Wechselwinkel ebenfalls.'),
 r=>tf('Die Winkelsumme im Viereck beträgt 180°.', false, 'Im Viereck beträgt die Winkelsumme 360°.')
]},

{key:'g7-wahrscheinlichkeit', grade:7, name:'Daten und Wahrscheinlichkeit', gens:[
 r=>{const n=R.pick(r,[6,8,10,12]); const k=R.int(r,1,n-1);
     return num('In einer Urne liegen '+n+' gleichartige Kugeln, davon '+k+' rote. Wie groß ist die Wahrscheinlichkeit für „rot“ in Prozent?',
       Math.round(k/n*10000)/100, 'P = '+k+'/'+n+' = '+fmt(k/n,4)+' = '+fmt(k/n*100)+' %.',{tol:0.05,unit:'%'});},
 r=>{const E=[['Augenzahl 6','1/6'],['eine gerade Augenzahl','1/2'],['eine Augenzahl größer als 4','1/3'],['eine Augenzahl kleiner als 3','1/3'],['eine Augenzahl kleiner als 7','1']];
     const e=R.pick(r,E);
     return mc('Ein normaler Spielwürfel wird einmal geworfen. Wie groß ist die Wahrscheinlichkeit für „'+e[0]+'“?', e[1], R.sample(r,['1/6','1/2','1/3','2/3','5/6','1/4','1'].filter(x=>x!==e[1]),3), 'P = '+e[1]+'.', r);},
 r=>{const p=R.pick(r,[10,20,25,40,60]);
     return num('Die Wahrscheinlichkeit für ein Ereignis beträgt '+p+' %. Wie groß ist die Wahrscheinlichkeit für das Gegenereignis (in %)?',
       100-p, 'P(Gegenereignis) = 100 % − '+p+' % = '+(100-p)+' %.',{unit:'%'});},
 r=>{const n=R.pick(r,[2,3,4]);
     return num('Eine Münze wird '+n+'-mal geworfen. Wie viele verschiedene Ergebnisse (Pfade im Baumdiagramm) gibt es?', Math.pow(2,n),
       '2^'+n+' = '+Math.pow(2,n)+' Pfade.');},
 r=>tf('Nach der Pfadregel multipliziert man die Wahrscheinlichkeiten entlang eines Pfades.', true,
     '1. Pfadregel: entlang eines Pfades multiplizieren; 2. Pfadregel: Pfadwahrscheinlichkeiten addieren.'),
 r=>ord('Ordne die Wahrscheinlichkeiten vom unwahrscheinlichsten zum wahrscheinlichsten Ereignis (Würfel).',
     ['Augenzahl 6 (1/6)','Augenzahl größer als 4 (2/6)','gerade Augenzahl (3/6)','Augenzahl kleiner als 6 (5/6)'],
     '1/6 < 2/6 < 3/6 < 5/6.',r)
]}
];
