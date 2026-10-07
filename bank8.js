import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr, nz, klammer, term, plusZahl, plusTerm} from './bank-core.js';
export default [
{key:'g8-linfunk', grade:8, name:'Lineare Funktionen', gens:[
 r=>{const m=R.int(r,-6,6)||2, b=R.int(r,-9,9), x=R.int(r,-6,6);
     return num('Gegeben ist f(x) = '+term(m,'x')+plusZahl(b)+'. Berechne f('+nz(x)+').', m*x+b,
       'f('+nz(x)+') = '+nz(m)+' · '+klammer(x)+plusZahl(b)+' = '+nz(m*x+b)+'.');},
 r=>{const m=R.int(r,1,8), b=R.int(r,-9,9);
     return num('Wie lautet die Steigung von f(x) = '+term(m,'x')+plusZahl(b)+'?', m, 'Die Steigung ist der Faktor vor x: m = '+m+'.');},
 r=>{const m=R.int(r,1,6), b=m*R.int(r,1,6)*(r()<0.5?-1:1); const x0=-b/m;
     return num('Berechne die Nullstelle von f(x) = '+term(m,'x')+plusZahl(b)+'.', x0,
       term(m,'x')+plusZahl(b)+' = 0 → x = '+nz(fmt(x0))+'.',{tol:0.01});},
 r=>{const x1=R.int(r,-5,2), y1=R.int(r,-8,8), dx=R.int(r,1,5), m=R.int(r,-5,5)||2;
     const x2=x1+dx, y2=y1+m*dx;
     return num('Eine Gerade geht durch P('+nz(x1)+'|'+nz(y1)+') und Q('+nz(x2)+'|'+nz(y2)+'). Berechne die Steigung m.', m,
       'm = (y₂ − y₁)/(x₂ − x₁) = ('+klammer(y2)+' − '+klammer(y1)+')/('+klammer(x2)+' − '+klammer(x1)+') = '+nz(m)+'.',{tol:0.01});},
 r=>tf('Der Graph einer linearen Funktion ist immer eine Gerade.', true, 'f(x) = mx + b hat stets einen geradlinigen Graphen.'),
 r=>{const m=R.int(r,2,9); let b=R.int(r,-9,9); if(b===0||b===m) b=m+2;
     return mc('Wo schneidet der Graph von f(x) = '+term(m,'x')+plusZahl(b)+' die y-Achse?',
     '(0|'+nz(b)+')', ['('+nz(b)+'|0)','(0|'+m+')','('+m+'|'+nz(b)+')'], 'Für x = 0 ist f(0) = '+nz(b)+', also S(0|'+nz(b)+').', r);},
 r=>ord('Ordne die Geraden nach ihrer Steigung – beginne mit der kleinsten.',
     ['y = −3x + 1','y = −0,5x','y = 0,5x + 4','y = 2x − 7'],'Vergleiche nur den Faktor vor x: −3 < −0,5 < 0,5 < 2.',r)
]},
{key:'g8-terme', grade:8, name:'Terme mit mehreren Variablen / binomische Formeln', gens:[
 r=>{const a=R.int(r,1,9), b=R.int(r,1,9);
     return txt('Multipliziere aus: ('+(a===1?'':a)+'x + '+b+')² (Form: 4x^2+12x+9)',
       (a*a)+'x^2+'+(2*a*b)+'x+'+(b*b), '1. binomische Formel: ('+term(a,'x')+')² + 2·'+term(a,'x')+'·'+b+' + '+b+'² = '+term(a*a,'x²')+' + '+(2*a*b)+'x + '+(b*b)+'.',
       [(a*a)+'x²+'+(2*a*b)+'x+'+(b*b)]);},
 r=>{const a=R.int(r,1,9), b=R.int(r,1,9);
     return txt('Multipliziere aus: ('+(a===1?'':a)+'x − '+b+')² (Form: 4x^2-12x+9)',
       (a*a)+'x^2-'+(2*a*b)+'x+'+(b*b), '2. binomische Formel: '+term(a*a,'x²')+' − '+(2*a*b)+'x + '+(b*b)+'.',
       [(a*a)+'x²-'+(2*a*b)+'x+'+(b*b)]);},
 r=>{const a=R.int(r,1,9), b=R.int(r,1,9);
     return txt('Multipliziere aus: ('+(a===1?'':a)+'x + '+b+')('+(a===1?'':a)+'x − '+b+') (Form: 4x^2-9)',
       (a*a)+'x^2-'+(b*b), '3. binomische Formel: ('+term(a,'x')+')² − '+b+'² = '+term(a*a,'x²')+' − '+(b*b)+'.', [(a*a)+'x²-'+(b*b)]);},
 r=>{const b=R.int(r,2,12);
     return mc('Welche Formel passt zu x² − '+(b*b)+'?', '(x + '+b+')(x − '+b+')',
       ['(x − '+b+')²','(x + '+b+')²','x(x − '+(b*b)+')'], '3. binomische Formel.', r);},
 r=>{const a=R.int(r,2,9),b=R.int(r,2,9),x=R.int(r,1,5),y=R.int(r,1,5);
     return num('Berechne den Wert von '+a+'x + '+b+'y für x = '+x+' und y = '+y+'.', a*x+b*y, a+'·'+x+' + '+b+'·'+y+' = '+(a*x+b*y)+'.');},
 r=>tf('(a + b)² = a² + b²', false, 'Richtig ist (a + b)² = a² + 2ab + b² – der gemischte Term fehlt.')
]},
{key:'g8-flaechen', grade:8, name:'Flächen (Dreieck, Parallelogramm, Trapez)', gens:[
 r=>{const g=R.int(r,4,25), h=R.int(r,3,18);
     return num('Berechne den Flächeninhalt eines Dreiecks mit g = '+g+' cm und h = '+h+' cm (in cm²).', g*h/2,
       'A = (g · h)/2 = ('+g+' · '+h+')/2 = '+fmt(g*h/2)+' cm².',{tol:0.01,unit:'cm²'});},
 r=>{const a=R.int(r,4,25), h=R.int(r,3,18);
     return num('Ein Parallelogramm hat die Grundseite '+a+' cm und die Höhe '+h+' cm. Flächeninhalt in cm²?', a*h,
       'A = a · h = '+a+' · '+h+' = '+(a*h)+' cm².',{unit:'cm²'});},
 r=>{const a=R.int(r,5,20), c=R.int(r,2,a-1), h=R.int(r,3,14);
     return num('Ein Trapez hat die parallelen Seiten a = '+a+' cm und c = '+c+' cm sowie die Höhe h = '+h+' cm. Flächeninhalt in cm²?',
       (a+c)/2*h, 'A = ((a + c)/2) · h = (('+a+' + '+c+')/2) · '+h+' = '+fmt((a+c)/2*h)+' cm².',{tol:0.01,unit:'cm²'});},
 r=>{const A=R.int(r,2,20)*6, h=R.pick(r,[2,3,4,6]); const g=2*A/h;
     return num('Ein Dreieck hat den Flächeninhalt '+A+' cm² und die Höhe '+h+' cm. Wie lang ist die Grundseite (in cm)?', g,
       'g = 2A : h = '+(2*A)+' : '+h+' = '+fmt(g)+' cm.',{tol:0.01,unit:'cm'});},
 r=>tf('Ein Parallelogramm mit derselben Grundseite und Höhe wie ein Dreieck hat den doppelten Flächeninhalt.', true,
     'A_Dreieck = (g·h)/2, A_Parallelogramm = g·h.'),
 r=>ord('Alle Figuren haben die Grundseite a = 10 cm und die Höhe h = 6 cm. Ordne nach Flächeninhalt – beginne mit dem kleinsten.',
     ['Dreieck (30 cm²)','Trapez mit c = 4 cm (42 cm²)','Trapez mit c = 14 cm (72 cm²)','Parallelogramm (60 cm²)'].sort((x,y)=>parseInt(x.match(/\((\d+)/)[1])-parseInt(y.match(/\((\d+)/)[1])),
     'A_Dreieck = (a·h)/2 = 30 cm², A_Trapez = ((a+c)/2)·h, A_Parallelogramm = a·h = 60 cm².',r)
]},
{key:'g8-lgs', grade:8, name:'Lineare Gleichungssysteme', gens:[
 r=>{const x=R.int(r,-6,8), y=R.int(r,-6,8);
     const a=R.int(r,1,5),b=R.int(r,1,5),c=R.int(r,1,5),d=R.int(r,1,5);
     if(a*d-b*c===0) return num('Löse: x + y = '+nz(x+y)+' und x − y = '+nz(x-y)+'. Gib x an.', x, 'Addition: 2x = '+nz(2*x)+' → x = '+nz(x)+'.');
     return num('Löse das Gleichungssystem: '+term(a,'x')+plusTerm(b,'y')+' = '+nz(a*x+b*y)+' und '+term(c,'x')+plusTerm(d,'y')+' = '+nz(c*x+d*y)+'. Gib den Wert von x an.',
       x, 'Additions- oder Einsetzungsverfahren führt auf x = '+nz(x)+' und y = '+nz(y)+'.',{tol:0.01});},
 r=>{const x=R.int(r,-6,8), y=R.int(r,-6,8);
     return num('Löse: x + y = '+nz(x+y)+' und x − y = '+nz(x-y)+'. Gib den Wert von y an.', y,
       'Subtraktion der Gleichungen: 2y = '+nz(2*y)+' → y = '+nz(y)+'.');},
 r=>{const V=['Gleichsetzungsverfahren','Einsetzungsverfahren','Additionsverfahren'];
     const v=R.pick(r,V);
     const T={'Gleichsetzungsverfahren':'Beide Gleichungen werden nach derselben Variablen aufgelöst und gleichgesetzt.',
              'Einsetzungsverfahren':'Eine Gleichung wird nach einer Variablen aufgelöst und in die andere eingesetzt.',
              'Additionsverfahren':'Die Gleichungen werden so addiert, dass eine Variable wegfällt.'};
     return mc('Was beschreibt das '+v+'?', T[v], R.sample(r,Object.values(T).filter(t=>t!==T[v]),2).concat(['Beide Gleichungen werden multipliziert.']), v+': '+T[v], r);},
 r=>tf('Ein lineares Gleichungssystem kann unendlich viele Lösungen haben.', true,
     'Sind die Geraden identisch, gibt es unendlich viele Lösungen; sind sie parallel, keine.'),
 r=>{const a=R.int(r,2,9), b=R.int(r,2,9); const s=R.int(r,10,30), k=a*R.int(r,1,5)+b*R.int(r,1,5);
     return mc('Zwei Geraden eines LGS sind parallel und nicht identisch. Wie viele Lösungen hat das System?', 'keine Lösung',
       ['genau eine Lösung','unendlich viele Lösungen','zwei Lösungen'], 'Parallele, verschiedene Geraden schneiden sich nicht.', r);},
 r=>ord('Ordne die Schritte des Additionsverfahrens.',
     ['Gleichungen so umformen, dass die Koeffizienten einer Variablen entgegengesetzt sind','Gleichungen addieren','Entstandene Gleichung nach einer Variablen lösen','Wert in eine Ausgangsgleichung einsetzen'],
     'Ziel: eine Variable eliminieren.',r)
]},
{key:'g8-kreise', grade:8, name:'Kreise und Dreiecke (Thales, besondere Linien)', gens:[
 r=>tf('Liegt der Punkt C auf dem Thaleskreis über der Strecke AB, dann ist der Winkel bei C ein rechter Winkel.', true,
     'Satz des Thales.'),
 r=>{const a=R.int(r,20,70); return num('Im Dreieck ABC liegt C auf dem Thaleskreis über AB. Der Winkel bei A beträgt '+a+'°. Wie groß ist der Winkel bei B?',
     90-a, 'Bei C liegen 90°, also 180° − 90° − '+a+'° = '+(90-a)+'°.',{unit:'°'});},
 r=>{const L=[['Mittelsenkrechte','Umkreismittelpunkt'],['Winkelhalbierende','Inkreismittelpunkt'],['Seitenhalbierende','Schwerpunkt']];
     const l=R.pick(r,L);
     return mc('Welchen Punkt erhält man als Schnittpunkt der drei '+l[0]+'n eines Dreiecks?', l[1],
       R.sample(r,L.filter(x=>x[1]!==l[1]).map(x=>x[1]).concat(['Höhenfußpunkt']),3), 'Die '+l[0]+'n schneiden sich im '+l[1]+'.', r);},
 r=>{const d=R.int(r,4,30); return num('Ein Thaleskreis hat den Durchmesser '+d+' cm. Wie groß ist der Radius (in cm)?', d/2,
     'r = d : 2 = '+fmt(d/2)+' cm.',{tol:0.01,unit:'cm'});},
 r=>tf('Der Schwerpunkt teilt jede Seitenhalbierende im Verhältnis 2 : 1.', true, 'Vom Eckpunkt aus gemessen liegt der Schwerpunkt bei 2/3 der Länge.'),
 r=>ord('Ordne die Konstruktionsschritte für den Umkreis eines Dreiecks.',
     ['Mittelsenkrechte der Seite AB konstruieren','Mittelsenkrechte der Seite BC konstruieren','Schnittpunkt M markieren','Kreis um M durch A zeichnen'],
     'Zwei Mittelsenkrechte genügen, der Schnittpunkt ist der Umkreismittelpunkt.',r)
]},
{key:'g8-wahrscheinlichkeit', grade:8, name:'Daten und Wahrscheinlichkeit (zweistufig)', gens:[
 r=>{const p=R.pick(r,[0.2,0.25,0.4,0.5,0.6]); const v=p*p;
     return num('Ein Zufallsversuch mit P = '+fmt(p)+' wird zweimal unabhängig durchgeführt. Wie groß ist die Wahrscheinlichkeit, dass das Ereignis zweimal eintritt (in %)?',
       Math.round(v*10000)/100, '1. Pfadregel: '+fmt(p)+' · '+fmt(p)+' = '+fmt(v)+' = '+fmt(v*100)+' %.',{tol:0.05,unit:'%'});},
 r=>{const n=R.pick(r,[4,5,6]); const k=R.int(r,1,n-1);
     return num('Aus einer Urne mit '+n+' Kugeln ('+k+' rot) wird zweimal MIT Zurücklegen gezogen. Wahrscheinlichkeit für zweimal rot (in %)?',
       Math.round((k/n)*(k/n)*10000)/100, '('+k+'/'+n+')² = '+fmt((k/n)*(k/n),4)+' = '+fmt((k/n)*(k/n)*100)+' %.',{tol:0.05,unit:'%'});},
 r=>{const n=R.pick(r,[5,6,8]); const k=R.int(r,2,n-1);
     const p=(k/n)*((k-1)/(n-1));
     return num('Aus einer Urne mit '+n+' Kugeln ('+k+' rot) wird zweimal OHNE Zurücklegen gezogen. Wahrscheinlichkeit für zweimal rot (in %)?',
       Math.round(p*10000)/100, k+'/'+n+' · '+(k-1)+'/'+(n-1)+' = '+fmt(p,4)+' = '+fmt(p*100)+' %.',{tol:0.05,unit:'%'});},
 r=>tf('Beim Ziehen ohne Zurücklegen ändern sich die Wahrscheinlichkeiten auf der zweiten Stufe.', true,
     'Die Gesamtzahl der Kugeln nimmt ab, daher ändern sich die Pfadwahrscheinlichkeiten.'),
 r=>mc('Was besagt die 2. Pfadregel?', 'Die Wahrscheinlichkeiten günstiger Pfade werden addiert.',
     ['Die Wahrscheinlichkeiten entlang eines Pfades werden addiert.','Alle Pfadwahrscheinlichkeiten werden multipliziert.','Man zieht die Gegenwahrscheinlichkeit ab.'],
     '2. Pfadregel: Summe der Pfadwahrscheinlichkeiten aller günstigen Pfade.', r)
]}
];
