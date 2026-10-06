import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr} from './bank-core.js';
const PI=Math.PI;
export const G9=[
{key:'g9-reelle', grade:9, name:'Reelle Zahlen und Wurzeln', gens:[
 r=>{const n=R.int(r,2,25); return num('Berechne √'+(n*n)+'.', n, '√'+(n*n)+' = '+n+', denn '+n+'² = '+(n*n)+'.');},
 r=>{const a=R.int(r,2,12), b=R.int(r,2,12);
     return num('Berechne √'+(a*a)+' · √'+(b*b)+'.', a*b, '√'+(a*a)+' · √'+(b*b)+' = '+a+' · '+b+' = '+(a*b)+'.');},
 r=>{const a=R.int(r,2,9), b=R.pick(r,[2,3,5,6,7,10]);
     return txt('Vereinfache √'+(a*a*b)+' zu der Form z√n.', a+'√'+b, '√'+(a*a*b)+' = √'+(a*a)+' · √'+b+' = '+a+'√'+b+'.',[a+'*wurzel('+b+')', a+'wurzel'+b]);},
 r=>{const Z=[['√2','irrational'],['√9','rational'],['0,75','rational'],['π','irrational'],['√16','rational'],['√5','irrational'],['1/3','rational']];
     const z=R.pick(r,Z);
     return tf('Die Zahl '+z[0]+' ist eine irrationale Zahl.', z[1]==='irrational',
       z[0]+' ist '+z[1]+(z[1]==='rational'?' – sie lässt sich als Bruch schreiben.':' – sie hat keine periodische oder abbrechende Dezimaldarstellung.'));},
 r=>ord('Ordne die Zahlen vom kleinsten zum größten Wert.',['√2 ≈ 1,41','√5 ≈ 2,24','π ≈ 3,14','√16 = 4'],'Näherungswerte berechnen und vergleichen.',r)
]},
{key:'g9-quadfunk', grade:9, name:'Quadratische Funktionen', gens:[
 r=>{const a=R.pick(r,[1,2,-1,-2,0.5]), d=R.int(r,-5,5), e=R.int(r,-8,8);
     return txt('Gib den Scheitelpunkt von f(x) = '+(a===1?'':a===-1?'−':fmt(a))+'(x '+(d>=0?'− '+d:'+ '+(-d))+')² '+(e>=0?'+ '+e:'− '+(-e))+' an (Form: (x|y) ).',
       '('+d+'|'+e+')','Scheitelpunktform f(x)=a(x−d)²+e → S('+d+'|'+e+').',[d+'|'+e]);},
 r=>{const d=R.int(r,-6,6), e=R.int(r,-8,8), x=R.int(r,-4,4);
     const v=(x-d)*(x-d)+e;
     return num('Berechne f('+x+') für f(x) = (x − '+d+')² + '+e+'.', v, '('+x+' − '+d+')² + '+e+' = '+((x-d)*(x-d))+' + '+e+' = '+v+'.');},
 r=>{const p=R.int(r,-8,8), q=R.int(r,-8,8);
     const disc=p*p/4-q;
     return mc('Wie viele Nullstellen hat f(x) = x² + '+p+'x + '+q+'?', disc>0?'zwei':disc===0?'eine':'keine',
       disc>0?['eine','keine','drei']:disc===0?['zwei','keine','drei']:['zwei','eine','drei'],
       'Diskriminante (p/2)² − q = '+fmt(disc)+' → '+(disc>0?'zwei':disc===0?'eine':'keine')+' Nullstelle(n).', r);},
 r=>{const a=R.pick(r,[2,3,0.5,-2,-0.5]);
     return tf('Der Graph von f(x) = '+fmt(a)+'x² ist nach '+(a>0?'oben':'unten')+' geöffnet.', true,
       'a '+(a>0?'> 0 → nach oben':'< 0 → nach unten')+' geöffnet.');},
 r=>{const d=R.int(r,1,6);
     return mc('Wie entsteht der Graph von f(x) = (x − '+d+')² aus der Normalparabel?', 'Verschiebung um '+d+' nach rechts',
       ['Verschiebung um '+d+' nach links','Verschiebung um '+d+' nach oben','Streckung mit dem Faktor '+d],
       '(x − d)² verschiebt die Parabel um d nach rechts.', r);},
 r=>ord('Ordne die Schritte der quadratischen Ergänzung für x² + 6x + 5.',
     ['Hälfte von 6 bilden: 3','3² = 9 addieren und subtrahieren','(x + 3)² − 9 + 5 schreiben','Ergebnis: (x + 3)² − 4'],
     'Quadratische Ergänzung führt zur Scheitelpunktform.',r)
]},
{key:'g9-kreis-koerper', grade:9, name:'Kreis, Prisma und Zylinder', gens:[
 r=>{const rr=R.int(r,2,15); return num('Berechne den Umfang eines Kreises mit r = '+rr+' cm (auf 2 Nachkommastellen, in cm).',
     Math.round(2*PI*rr*100)/100, 'u = 2πr = 2 · π · '+rr+' ≈ '+fmt(2*PI*rr,2)+' cm.',{tol:0.06,unit:'cm'});},
 r=>{const rr=R.int(r,2,15); return num('Berechne den Flächeninhalt eines Kreises mit r = '+rr+' cm (auf 2 Nachkommastellen, in cm²).',
     Math.round(PI*rr*rr*100)/100, 'A = πr² = π · '+rr+'² ≈ '+fmt(PI*rr*rr,2)+' cm².',{tol:0.06,unit:'cm²'});},
 r=>{const rr=R.int(r,2,10), h=R.int(r,3,20);
     return num('Ein Zylinder hat r = '+rr+' cm und h = '+h+' cm. Berechne das Volumen (auf 2 Nachkommastellen, in cm³).',
       Math.round(PI*rr*rr*h*100)/100, 'V = πr²h = π · '+(rr*rr)+' · '+h+' ≈ '+fmt(PI*rr*rr*h,2)+' cm³.',{tol:0.5,unit:'cm³'});},
 r=>{const A=R.int(r,4,30), h=R.int(r,3,15);
     return num('Ein Prisma hat die Grundfläche '+A+' cm² und die Höhe '+h+' cm. Volumen in cm³?', A*h,
       'V = G · h = '+A+' · '+h+' = '+(A*h)+' cm³.',{unit:'cm³'});},
 r=>tf('Das Prinzip von Cavalieri besagt: Körper mit gleicher Höhe und in jeder Höhe flächengleichen Schnitten haben dasselbe Volumen.', true,
     'So lässt sich z. B. das Volumen schiefer Prismen bestimmen.'),
 r=>{const rr=R.int(r,2,12), w=R.pick(r,[60,90,120,180,270]);
     return num('Berechne die Länge eines Kreisbogens mit r = '+rr+' cm und Mittelpunktswinkel '+w+'° (auf 2 Nachkommastellen, in cm).',
       Math.round(2*PI*rr*w/360*100)/100, 'b = 2πr · '+w+'/360 ≈ '+fmt(2*PI*rr*w/360,2)+' cm.',{tol:0.06,unit:'cm'});}
]},
{key:'g9-potenzen', grade:9, name:'Potenzen und Potenzgesetze', gens:[
 r=>{const b=R.int(r,2,6), m=R.int(r,2,5), n=R.int(r,2,5);
     return num('Berechne den Exponenten: '+b+'^'+m+' · '+b+'^'+n+' = '+b+'^? ', m+n, 'Gleiche Basis → Exponenten addieren: '+m+' + '+n+' = '+(m+n)+'.');},
 r=>{const b=R.int(r,2,6), m=R.int(r,4,8), n=R.int(r,1,3);
     return num('Berechne den Exponenten: '+b+'^'+m+' : '+b+'^'+n+' = '+b+'^? ', m-n, 'Gleiche Basis → Exponenten subtrahieren: '+m+' − '+n+' = '+(m-n)+'.');},
 r=>{const b=R.int(r,2,5), m=R.int(r,2,4), n=R.int(r,2,4);
     return num('Berechne den Exponenten: ('+b+'^'+m+')^'+n+' = '+b+'^? ', m*n, 'Potenz einer Potenz → Exponenten multiplizieren: '+m+' · '+n+' = '+(m*n)+'.');},
 r=>{const b=R.int(r,2,6), n=R.int(r,1,3);
     return txt('Schreibe '+b+'^(−'+n+') als Bruch (Form: 1/8).', '1/'+Math.pow(b,n), 'a^(−n) = 1/aⁿ = 1/'+Math.pow(b,n)+'.');},
 r=>{const m=R.int(r,15,99)/10, e=R.int(r,3,9);
     return num('Schreibe '+fmt(m,1)+' · 10^'+e+' als gewöhnliche Zahl.', m*Math.pow(10,e),
       'Komma um '+e+' Stellen nach rechts: '+(m*Math.pow(10,e)).toLocaleString('de-DE')+'.',{tol:0.5});},
 r=>tf('a⁰ = 1 für jede Zahl a ≠ 0.', true, 'Folgt aus aⁿ : aⁿ = a⁰ = 1.')
]},
{key:'g9-pythagoras', grade:9, name:'Satz des Pythagoras und Körper', gens:[
 r=>{const T=[[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[7,24,25],[20,21,29]];
     const t=R.pick(r,T);
     return num('Ein rechtwinkliges Dreieck hat die Katheten '+t[0]+' cm und '+t[1]+' cm. Wie lang ist die Hypotenuse (in cm)?',
       t[2], 'c² = a² + b² = '+(t[0]*t[0])+' + '+(t[1]*t[1])+' = '+(t[2]*t[2])+' → c = '+t[2]+' cm.',{tol:0.01,unit:'cm'});},
 r=>{const T=[[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17]];
     const t=R.pick(r,T);
     return num('Hypotenuse '+t[2]+' cm, eine Kathete '+t[0]+' cm. Wie lang ist die andere Kathete (in cm)?', t[1],
       'b² = c² − a² = '+(t[2]*t[2])+' − '+(t[0]*t[0])+' = '+(t[1]*t[1])+' → b = '+t[1]+' cm.',{tol:0.01,unit:'cm'});},
 r=>{const a=R.int(r,2,12); const d=Math.round(a*Math.sqrt(2)*100)/100;
     return num('Berechne die Diagonale eines Quadrats mit der Seitenlänge '+a+' cm (auf 2 Nachkommastellen, in cm).', d,
       'd = a·√2 = '+a+' · 1,4142… ≈ '+fmt(d,2)+' cm.',{tol:0.06,unit:'cm'});},
 r=>{const rr=R.int(r,2,10); const V=Math.round(4/3*PI*rr*rr*rr*100)/100;
     return num('Berechne das Volumen einer Kugel mit r = '+rr+' cm (auf 2 Nachkommastellen, in cm³).', V,
       'V = (4/3)πr³ = (4/3)·π·'+(rr*rr*rr)+' ≈ '+fmt(V,2)+' cm³.',{tol:1,unit:'cm³'});},
 r=>{const G=R.int(r,9,60), h=R.int(r,3,15);
     return num('Eine Pyramide hat die Grundfläche '+G+' cm² und die Höhe '+h+' cm. Volumen in cm³?', Math.round(G*h/3*100)/100,
       'V = (1/3)·G·h = ('+G+' · '+h+')/3 = '+fmt(G*h/3,2)+' cm³.',{tol:0.05,unit:'cm³'});},
 r=>tf('Der Satz des Pythagoras gilt in jedem Dreieck.', false, 'Er gilt nur in rechtwinkligen Dreiecken.')
]},
{key:'g9-stochastik', grade:9, name:'Daten und Wahrscheinlichkeit', gens:[
 r=>{const n=R.int(r,3,6); let f=1; for(let i=2;i<=n;i++) f*=i;
     return num('Auf wie viele verschiedene Arten können '+n+' Personen in einer Reihe angeordnet werden?', f,
       n+'! = '+f+'.');},
 r=>{const a=R.int(r,2,6), b=R.int(r,2,6);
     return num('Ein Menü besteht aus '+a+' Vorspeisen und '+b+' Hauptgerichten. Wie viele Kombinationen gibt es?', a*b,
       'Zählprinzip: '+a+' · '+b+' = '+(a*b)+'.');},
 r=>{const tot=R.pick(r,[100,200,50]); const A=R.int(r,10,tot-20); const AB=R.int(r,1,A-1);
     return num('Von '+tot+' Personen tragen '+A+' eine Brille, davon '+AB+' auch eine Uhr. Wie groß ist P(Uhr | Brille) in Prozent?',
       Math.round(AB/A*10000)/100, 'Bedingte Wahrscheinlichkeit: '+AB+'/'+A+' = '+fmt(AB/A*100)+' %.',{tol:0.05,unit:'%'});},
 r=>tf('Zwei Ereignisse heißen stochastisch unabhängig, wenn P(A∩B) = P(A) · P(B) gilt.', true, 'Das ist die Definition der Unabhängigkeit.'),
 r=>mc('Wozu dient eine Vierfeldertafel?', 'zur übersichtlichen Darstellung zweier Merkmale und ihrer Häufigkeiten',
     ['zum Zeichnen von Funktionsgraphen','zur Berechnung von Flächeninhalten','zur Primfaktorzerlegung'],
     'Die Vierfeldertafel ordnet absolute oder relative Häufigkeiten zweier Merkmale.', r)
]}
];
export const G10=[
{key:'g10-quadgl', grade:10, name:'Quadratische Gleichungen', gens:[
 r=>{const x1=R.int(r,-8,8), x2=R.int(r,-8,8); const p=-(x1+x2), q=x1*x2;
     return num('Löse x² '+(p>=0?'+ '+p:'− '+(-p))+'x '+(q>=0?'+ '+q:'− '+(-q))+' = 0. Gib die größere Lösung an.',
       Math.max(x1,x2), 'p-q-Formel: x = −('+p+')/2 ± √((('+p+')/2)² − ('+q+')) → x₁ = '+x1+', x₂ = '+x2+'.',{tol:0.01});},
 r=>{const x1=R.int(r,-8,8), x2=R.int(r,-8,8); const p=-(x1+x2), q=x1*x2;
     return num('Löse x² '+(p>=0?'+ '+p:'− '+(-p))+'x '+(q>=0?'+ '+q:'− '+(-q))+' = 0. Gib die kleinere Lösung an.',
       Math.min(x1,x2), 'Lösungen: '+x1+' und '+x2+'.',{tol:0.01});},
 r=>{const a=R.int(r,2,12); return num('Löse x² = '+(a*a)+'. Gib die positive Lösung an.', a, 'x = ±√'+(a*a)+' = ±'+a+'.',{tol:0.01});},
 r=>{const x1=R.int(r,1,8), x2=R.int(r,1,8);
     return mc('Welche Linearfaktorzerlegung gehört zu x² − '+(x1+x2)+'x + '+(x1*x2)+'?','(x − '+x1+')(x − '+x2+')',
       ['(x + '+x1+')(x + '+x2+')','(x − '+x1+')(x + '+x2+')','(x + '+(x1+x2)+')(x − '+(x1*x2)+')'],
       'Satz von Vieta: Summe der Nullstellen = '+(x1+x2)+', Produkt = '+(x1*x2)+'.', r);},
 r=>{const p=R.int(r,-8,8), q=R.int(r,1,20); const D=p*p/4-q;
     return tf('Die Gleichung x² '+(p>=0?'+ '+p:'− '+(-p))+'x + '+q+' = 0 hat reelle Lösungen.', D>=0,
       'Diskriminante (p/2)² − q = '+fmt(D,2)+' '+(D>=0?'≥ 0 → Lösungen existieren.':'< 0 → keine reelle Lösung.'));},
 r=>ord('Ordne die Schritte zur Lösung von 2x² + 4x − 6 = 0 mit der p-q-Formel.',
     ['Durch 2 teilen: x² + 2x − 3 = 0','p = 2 und q = −3 ablesen','x = −1 ± √(1 + 3) berechnen','Lösungen x₁ = 1 und x₂ = −3 angeben'],
     'Die p-q-Formel setzt die Normalform mit Leitkoeffizient 1 voraus.',r)
]},
{key:'g10-aehnlichkeit', grade:10, name:'Ähnlichkeit und Strahlensätze', gens:[
 r=>{const k=R.int(r,2,5), a=R.int(r,2,15);
     return num('Eine Figur wird mit dem Streckfaktor '+k+' zentrisch gestreckt. Eine Strecke war '+a+' cm lang. Wie lang ist sie danach (in cm)?',
       k*a, 'Längen werden mit k multipliziert: '+a+' · '+k+' = '+(k*a)+' cm.',{unit:'cm'});},
 r=>{const k=R.int(r,2,4), A=R.int(r,3,20);
     return num('Eine Figur mit dem Flächeninhalt '+A+' cm² wird mit k = '+k+' gestreckt. Wie groß ist der neue Flächeninhalt (in cm²)?',
       A*k*k, 'Flächen wachsen mit k²: '+A+' · '+(k*k)+' = '+(A*k*k)+' cm².',{unit:'cm²'});},
 r=>{const a=R.int(r,2,9), b=R.int(r,2,9), c=a*R.int(r,2,5);
     const d=c*b/a;
     return num('Strahlensatz: a = '+a+' cm, b = '+b+' cm, a\' = '+c+' cm. Berechne b\' (in cm).', Math.round(d*100)/100,
       'a : b = a\' : b\' → b\' = '+c+' · '+b+' : '+a+' = '+fmt(d,2)+' cm.',{tol:0.02,unit:'cm'});},
 r=>tf('Ähnliche Figuren haben gleich große Winkel.', true, 'Bei Ähnlichkeit stimmen alle Winkel überein, die Längen sind proportional.'),
 r=>mc('Wie verändert sich das Volumen bei zentrischer Streckung mit dem Faktor k?', 'Es wird mit k³ multipliziert.',
     ['Es wird mit k multipliziert.','Es wird mit k² multipliziert.','Es bleibt gleich.'],
     'Längen · k, Flächen · k², Volumina · k³.', r)
]},
{key:'g10-exponential', grade:10, name:'Exponentialfunktionen', gens:[
 r=>{const a=R.int(r,2,20)*50, p=R.pick(r,[5,10,20,25]); const n=R.int(r,2,5);
     const v=a*Math.pow(1+p/100,n);
     return num('Ein Kapital von '+a+' € wächst jährlich um '+p+' %. Wert nach '+n+' Jahren (in €, 2 Nachkommastellen)?',
       Math.round(v*100)/100, 'f(x) = '+a+' · '+fmt(1+p/100,2)+'^x, f('+n+') ≈ '+fmt(v,2)+' €.',{tol:1,unit:'€'});},
 r=>{const p=R.pick(r,[5,10,20,25,50]);
     return num('Eine Größe wächst pro Schritt um '+p+' %. Wie groß ist der Wachstumsfaktor?', 1+p/100,
       'q = 1 + '+p+'/100 = '+fmt(1+p/100,2)+'.',{tol:0.005});},
 r=>{const p=R.pick(r,[10,20,25,50]);
     return num('Eine Größe nimmt pro Schritt um '+p+' % ab. Wie groß ist der Abnahmefaktor?', 1-p/100,
       'q = 1 − '+p+'/100 = '+fmt(1-p/100,2)+'.',{tol:0.005});},
 r=>{const t=R.pick(r,[5,8,10,20,30]); const n=R.int(r,2,4); const a=R.pick(r,[100,200,800,1600]);
     return num('Eine Substanz hat die Halbwertszeit '+t+' Tage. Von '+a+' g sind nach '+(n*t)+' Tagen noch wie viel g übrig?',
       a/Math.pow(2,n), 'Nach '+n+' Halbwertszeiten: '+a+' : 2^'+n+' = '+fmt(a/Math.pow(2,n))+' g.',{tol:0.01,unit:'g'});},
 r=>tf('Bei exponentiellem Wachstum ist die absolute Zunahme in jedem Schritt gleich groß.', false,
     'Gleich ist der Faktor, nicht die absolute Zunahme – die wird immer größer.'),
 r=>mc('Welche Funktion beschreibt exponentielles Wachstum?', 'f(x) = 3 · 1,5^x', ['f(x) = 3x + 1,5','f(x) = 1,5x²','f(x) = 3/x'],
     'Bei Exponentialfunktionen steht x im Exponenten.', r)
]},
{key:'g10-trigonometrie', grade:10, name:'Trigonometrie', gens:[
 r=>{const T=[[3,4,5],[6,8,10],[5,12,13],[8,15,17]];
     const t=R.pick(r,T);
     return num('Rechtwinkliges Dreieck mit Gegenkathete '+t[0]+' cm und Hypotenuse '+t[2]+' cm. Berechne sin(α) (3 Nachkommastellen).',
       Math.round(t[0]/t[2]*1000)/1000, 'sin(α) = Gegenkathete/Hypotenuse = '+t[0]+'/'+t[2]+' ≈ '+fmt(t[0]/t[2],3)+'.',{tol:0.003});},
 r=>{const T=[[3,4,5],[6,8,10],[5,12,13],[8,15,17]];
     const t=R.pick(r,T);
     return num('Rechtwinkliges Dreieck mit Ankathete '+t[1]+' cm und Hypotenuse '+t[2]+' cm. Berechne cos(α) (3 Nachkommastellen).',
       Math.round(t[1]/t[2]*1000)/1000, 'cos(α) = Ankathete/Hypotenuse = '+t[1]+'/'+t[2]+' ≈ '+fmt(t[1]/t[2],3)+'.',{tol:0.003});},
 r=>{const a=R.pick(r,[30,45,60]); const W={30:'0,5',45:'0,707',60:'0,866'};
     return mc('Wie groß ist sin('+a+'°) ungefähr?', W[a], Object.values(W).filter(v=>v!==W[a]).concat(['1,155']), 'sin('+a+'°) ≈ '+W[a]+'.', r);},
 r=>{const g=R.int(r,3,20), an=R.int(r,3,20); const t=Math.round(g/an*1000)/1000;
     return num('Berechne tan(α) bei Gegenkathete '+g+' cm und Ankathete '+an+' cm (3 Nachkommastellen).', t,
       'tan(α) = Gegenkathete/Ankathete = '+g+'/'+an+' ≈ '+fmt(t,3)+'.',{tol:0.003});},
 r=>tf('Im rechtwinkligen Dreieck gilt sin²(α) + cos²(α) = 1.', true, 'Trigonometrischer Pythagoras.'),
 r=>ord('Ordne die Sinuswerte der Größe nach – beginne mit dem kleinsten.',
     ['sin(0°) = 0','sin(30°) = 0,5','sin(45°) ≈ 0,71','sin(60°) ≈ 0,87'],
     'Im Bereich von 0° bis 90° wächst der Sinuswert mit dem Winkel.',r)
]},
{key:'g10-trigfunk', grade:10, name:'Trigonometrische Funktionen', gens:[
 r=>{const a=R.int(r,2,8); return num('Wie groß ist die Amplitude von f(x) = '+a+'·sin(x)?', a, 'Die Amplitude ist der Betrag des Vorfaktors: '+a+'.');},
 r=>{const b=R.pick(r,[1,2,3,4]); const p=360/b;
     return num('Welche Periode (in Grad) hat f(x) = sin('+b+'x)?', p, 'Periode = 360°/'+b+' = '+p+'°.',{unit:'°'});},
 r=>{const W=[[0,'0'],[90,'1'],[180,'0'],[270,'−1']]; const w=R.pick(r,W);
     const wrong=[...new Set(['0','1','−1','0,5'].filter(x=>x!==w[1]))];
     return mc('Wie groß ist sin('+w[0]+'°)?', w[1], wrong, 'Am Einheitskreis: sin('+w[0]+'°) = '+w[1]+'.', r);},
 r=>tf('Die Sinusfunktion nimmt nur Werte zwischen −1 und 1 an.', true, 'Der Wertebereich ist [−1; 1].'),
 r=>{const g=R.pick(r,[90,180,270,360]); const b=fmt(g/180,2).replace('0,5','0,5');
     return mc('Welchem Bogenmaß entspricht '+g+'°?', (g/180===1?'π':g/180===0.5?'π/2':g/180===1.5?'3π/2':'2π'),
       ['π/3','π/4','π/6'], g+'° = '+g+'/180 · π.', r);}
]},
{key:'g10-stochastik', grade:10, name:'Daten und Wahrscheinlichkeit', gens:[
 r=>{const n=R.int(r,4,7); let f=1; for(let i=2;i<=n;i++) f*=i;
     return num('Wie viele Möglichkeiten gibt es, '+n+' verschiedene Bücher in eine Reihe zu stellen?', f, n+'! = '+f+'.');},
 r=>{const n=R.pick(r,[5,6,8,10]); const k=2; const c=n*(n-1)/2;
     return num('Wie viele verschiedene Paare lassen sich aus '+n+' Personen bilden?', c, 'n·(n−1)/2 = '+n+'·'+(n-1)+'/2 = '+c+'.');},
 r=>{const tot=R.pick(r,[100,200,400]); const a=R.int(r,20,tot/2), b=R.int(r,20,tot/2);
     return num('Von '+tot+' Personen mögen '+a+' Tee. Wie groß ist P(Tee) in Prozent?', Math.round(a/tot*10000)/100,
       a+'/'+tot+' = '+fmt(a/tot*100)+' %.',{tol:0.05,unit:'%'});},
 r=>tf('Ein Säulendiagramm mit abgeschnittener y-Achse kann Unterschiede übertrieben darstellen.', true,
     'Das ist eine typische Manipulation statistischer Darstellungen.'),
 r=>mc('Was gibt die bedingte Wahrscheinlichkeit P(B|A) an?', 'Die Wahrscheinlichkeit für B unter der Bedingung, dass A eingetreten ist.',
     ['Die Wahrscheinlichkeit, dass A und B nie eintreten.','Die Summe von P(A) und P(B).','Die Wahrscheinlichkeit des Gegenereignisses von A.'],
     'P(B|A) = P(A∩B)/P(A).', r)
]}
];
