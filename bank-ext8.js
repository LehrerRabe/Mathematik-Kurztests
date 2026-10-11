/* Erweiterung Jahrgang 8 */
import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr, nz, klammer, term, plusZahl, plusTerm} from './bank-core.js';
const poolTF = (r,L)=>{const s=R.pick(r,L); return tf(s[0],s[1],s[2]);};
const poolMC = (r,L)=>{const s=R.pick(r,L); return mc(s[0],s[1],s[2],s[3],r);};
const poolORD= (r,L)=>{const s=R.pick(r,L); return ord(s[0],s[1],s[2],r);};

export default [
{key:'g8-linfunk', gens:[
 r=>poolMC(r,[
  ['Was gibt b in f(x) = mx + b an?','den y-Achsenabschnitt',['die Steigung','die Nullstelle','den Scheitelpunkt'],'Für x = 0 ist f(0) = b.'],
  ['Welche Gerade verläuft am steilsten?','y = 4x − 1',['y = 2x + 7','y = 0,5x','y = −3x + 2'],'Der Betrag der Steigung entscheidet: |4| ist am größten.'],
  ['Welche Gerade ist parallel zu y = 3x + 2?','y = 3x − 5',['y = −3x + 2','y = 2x + 3','y = x/3 + 2'],'Parallele Geraden haben dieselbe Steigung.'],
  ['Was beschreibt eine waagerechte Gerade?','m = 0',['m = 1','b = 0','m ist nicht definiert'],'Ohne Steigung bleibt der Wert konstant.'],
  ['Wo schneidet y = −2x + 6 die x-Achse?','bei x = 3',['bei x = 6','bei x = −3','bei x = 2'],'0 = −2x + 6 → x = 3.'],
  ['Was bedeutet eine negative Steigung?','Der Graph fällt von links nach rechts.',['Der Graph steigt.','Der Graph ist waagerecht.','Der Graph geht durch den Ursprung.'],'Bei m < 0 nimmt y mit wachsendem x ab.']
 ]),
 r=>poolTF(r,[
  ['Zwei Geraden mit gleicher Steigung schneiden sich nie.',false,'Sind sie identisch, haben sie unendlich viele gemeinsame Punkte.'],
  ['Der Graph von y = 5 ist eine waagerechte Gerade.',true,'Die Steigung ist 0.'],
  ['Jede Gerade durch den Ursprung beschreibt eine proportionale Zuordnung.',true,'y = m · x ohne Absolutglied.'],
  ['Die Nullstelle ist der Schnittpunkt mit der y-Achse.',false,'Die Nullstelle ist der Schnittpunkt mit der x-Achse.'],
  ['Mit dem Steigungsdreieck liest man m als Höhenunterschied geteilt durch Horizontalabstand ab.',true,'m = Δy/Δx.'],
  ['Eine Gerade kann höchstens eine Nullstelle haben.',false,'Die Gerade y = 0 hat unendlich viele.']
 ]),
 r=>{const m=R.int(r,1,6), b=R.int(r,-9,9), y=R.int(r,-20,20);
     return num('Für welches x gilt f(x) = '+nz(y)+' bei f(x) = '+term(m,'x')+plusZahl(b)+'?', (y-b)/m,
       nz(y)+plusZahl(-b)+' = '+(y-b)+', geteilt durch '+m+' ergibt x = '+nz(fmt((y-b)/m))+'.',{tol:0.01});},
 r=>{const m1=R.int(r,1,5), b1=R.int(r,-8,8), m2=R.int(r,-5,-1), b2=R.int(r,-8,8);
     const xs=(b2-b1)/(m1-m2);
     return num('Wo schneiden sich '+term(m1,'x')+plusZahl(b1)+' und '+term(m2,'x')+plusZahl(b2)+'? Gib die x-Koordinate an.',
       Math.round(xs*1000)/1000, 'Gleichsetzen und nach x auflösen: x = '+nz(fmt(xs))+'.',{tol:0.02});},
 r=>{const grund=R.int(r,2,9), pro=R.int(r,2,9), n=R.int(r,3,15);
     return num('Eine Grundgebühr von '+grund+' € plus '+pro+' € je Stunde. Was kosten '+n+' Stunden (in €)?',
       grund+pro*n, 'f(x) = '+pro+'x + '+grund+', f('+n+') = '+(pro*n)+' + '+grund+' = '+(grund+pro*n)+' €.',{unit:'€'});},
 r=>poolORD(r,[
  ['Ordne die Schritte zum Zeichnen von y = 2x + 1.',['y-Achsenabschnitt 1 einzeichnen','Vom Punkt 1 nach rechts gehen','2 nach oben gehen','Beide Punkte zu einer Geraden verbinden'],'Steigungsdreieck nutzen.'],
  ['Ordne die Geraden nach ihrem y-Achsenabschnitt – beginne mit dem kleinsten.',['y = x − 4','y = 2x − 1','y = 3x + 2','y = x + 5'],'Das Absolutglied vergleichen.'],
  ['Ordne die Schritte zur Bestimmung der Nullstelle.',['Funktionsterm gleich 0 setzen','Absolutglied auf die andere Seite bringen','Durch die Steigung teilen','x-Wert angeben'],'mx + b = 0 nach x auflösen.']
 ])
]},

{key:'g8-terme', gens:[
 r=>poolMC(r,[
  ['Welche Formel ist die erste binomische Formel?','(a + b)² = a² + 2ab + b²',['(a − b)² = a² − 2ab + b²','(a + b)(a − b) = a² − b²','(a + b)² = a² + b²'],'Plus-Variante mit gemischtem Glied.'],
  ['Welche Formel ist die dritte binomische Formel?','(a + b)(a − b) = a² − b²',['(a + b)² = a² + 2ab + b²','(a − b)² = a² − 2ab + b²','a² + b² = (a + b)²'],'Plus mal Minus ergibt die Differenz der Quadrate.'],
  ['Wie lautet x² − 25 faktorisiert?','(x + 5)(x − 5)',['(x − 5)²','(x + 5)²','x(x − 25)'],'Dritte binomische Formel mit b = 5.'],
  ['Was ergibt (2a + 3b)²?','4a² + 12ab + 9b²',['4a² + 9b²','2a² + 6ab + 3b²','4a² + 6ab + 9b²'],'Erste binomische Formel mit 2a und 3b.'],
  ['Welcher Term lässt sich ausklammern: 6x + 9?','3(2x + 3)',['2(3x + 9)','6(x + 9)','9(x + 1)'],'Größter gemeinsamer Faktor ist 3.']
 ]),
 r=>poolTF(r,[
  ['(a + b)² = a² + b²',false,'Der gemischte Term 2ab fehlt.'],
  ['(a − b)² und (b − a)² sind gleich.',true,'Das Quadrat beseitigt das Vorzeichen.'],
  ['x² + 16 lässt sich mit der dritten binomischen Formel faktorisieren.',false,'Dafür bräuchte man eine Differenz, also x² − 16.'],
  ['Ausklammern ist die Umkehrung des Ausmultiplizierens.',true,'Beide Richtungen lassen sich ineinander überführen.'],
  ['3ab und 3ba sind gleichartige Glieder.',true,'Die Reihenfolge der Faktoren spielt keine Rolle.'],
  ['2x² und 2x sind gleichartige Glieder.',false,'Unterschiedliche Potenzen lassen sich nicht zusammenfassen.']
 ]),
 r=>{const a=R.int(r,2,9); return num('Berechne mit der dritten binomischen Formel: '+(a+1)+' · '+(a-1), a*a-1,
       '('+a+' + 1)('+a+' − 1) = '+a+'² − 1 = '+(a*a)+' − 1 = '+(a*a-1)+'.');},
 r=>{const a=R.int(r,2,9), b=R.int(r,2,9), x=R.int(r,1,5), y=R.int(r,1,5);
     return num('Berechne '+a+'xy für x = '+x+' und y = '+y+'.', a*x*y, a+' · '+x+' · '+y+' = '+(a*x*y)+'.');},
 r=>{const b=R.int(r,2,12); return txt('Faktorisiere x² − '+(b*b)+' (Form: (x+5)(x-5) )',
       '(x+'+b+')(x-'+b+')', 'Dritte binomische Formel mit b = '+b+'.',['(x-'+b+')(x+'+b+')']);},
 r=>poolORD(r,[
  ['Ordne die Schritte beim Anwenden der ersten binomischen Formel auf (3x + 4)².',['a = 3x und b = 4 bestimmen','a² = 9x² berechnen','2ab = 24x berechnen','b² = 16 ergänzen'],'a² + 2ab + b².'],
  ['Ordne die Schritte beim Ausklammern von 12x + 18.',['Größten gemeinsamen Teiler von 12 und 18 suchen','ggT = 6 erkennen','Beide Summanden durch 6 teilen','6(2x + 3) aufschreiben'],'Der ggT kommt vor die Klammer.'],
  ['Ordne die Terme nach ihrem Wert für x = 2 – beginne mit dem kleinsten.',['x + 1 (3)','2x (4)','x² + 1 (5)','3x (6)'],'Jeweils x = 2 einsetzen.']
 ])
]},

{key:'g8-flaechen', gens:[
 r=>poolMC(r,[
  ['Wie berechnet man den Flächeninhalt eines Dreiecks?','A = (g · h) : 2',['A = g · h','A = 2 · (g + h)','A = g + h'],'Halbe Grundseite mal Höhe.'],
  ['Wie berechnet man den Flächeninhalt eines Trapezes?','A = ((a + c) : 2) · h',['A = a · c · h','A = (a + c) · h','A = (a · h) : 2'],'Mittlere Länge der parallelen Seiten mal Höhe.'],
  ['Was ist die Höhe eines Dreiecks?','der senkrechte Abstand von der Grundseite zur gegenüberliegenden Ecke',['die längste Seite','die kürzeste Seite','der Umfang geteilt durch 3'],'Die Höhe steht senkrecht auf der Grundseite.'],
  ['Zwei Dreiecke mit gleicher Grundseite und gleicher Höhe …','haben denselben Flächeninhalt.',['sind kongruent.','haben denselben Umfang.','sind gleichschenklig.'],'A hängt nur von g und h ab.'],
  ['Wie berechnet man den Flächeninhalt eines Parallelogramms?','A = a · h',['A = a · b','A = (a · h) : 2','A = 2 · (a + h)'],'Grundseite mal zugehörige Höhe.']
 ]),
 r=>poolTF(r,[
  ['Jedes Rechteck ist ein Parallelogramm.',true,'Gegenüberliegende Seiten sind parallel.'],
  ['Die Höhe eines Dreiecks liegt immer innerhalb des Dreiecks.',false,'Bei stumpfwinkligen Dreiecken liegt sie außerhalb.'],
  ['Ein Trapez mit a = c ist ein Parallelogramm.',true,'Dann sind beide Paare gegenüberliegender Seiten parallel und gleich lang.'],
  ['Der Flächeninhalt eines Dreiecks ist halb so groß wie der eines Parallelogramms mit gleicher Grundseite und Höhe.',true,'A = (g·h)/2 gegenüber g·h.'],
  ['Jedes Parallelogramm hat vier gleich lange Seiten.',false,'Das gilt nur für Raute und Quadrat.'],
  ['Zum Berechnen der Dreiecksfläche braucht man immer alle drei Seiten.',false,'Grundseite und zugehörige Höhe genügen.']
 ]),
 r=>{const a=R.int(r,4,20), h=R.int(r,3,15);
     return num('Ein Parallelogramm hat a = '+a+' cm und h = '+h+' cm. Wie groß ist der Flächeninhalt eines Dreiecks mit denselben Maßen (in cm²)?',
       a*h/2, 'A = (a · h) : 2 = '+(a*h)+' : 2 = '+fmt(a*h/2)+' cm².',{tol:0.01,unit:'cm²'});},
 r=>{const A=R.int(r,3,25)*2, g=R.pick(r,[2,4,5,8,10].filter(x=>(2*A)%x===0))||2;
     return num('Ein Dreieck hat A = '+A+' cm² und die Grundseite '+g+' cm. Wie hoch ist es (in cm)?', 2*A/g,
       'h = 2A : g = '+(2*A)+' : '+g+' = '+fmt(2*A/g)+' cm.',{tol:0.01,unit:'cm'});},
 r=>{const a=R.int(r,6,20), c=R.int(r,2,a-1), h=R.int(r,3,12);
     return num('Ein Trapez hat die parallelen Seiten a = '+a+' cm und c = '+c+' cm sowie die Höhe h = '+h+' cm. Berechne den Flächeninhalt in cm².',
       (a+c)/2*h, 'A = ((a + c) : 2) · h = '+fmt((a+c)/2)+' · '+h+' = '+fmt((a+c)/2*h)+' cm².',{tol:0.01,unit:'cm²'});},
 r=>poolORD(r,[
  ['Ordne die Schritte zur Flächenberechnung eines Trapezes.',['Parallele Seiten a und c bestimmen','Mittelwert (a + c) : 2 berechnen','Mit der Höhe h multiplizieren','Ergebnis in Quadrateinheiten angeben'],'A = ((a+c)/2)·h.'],
  ['Ordne die Figuren nach ihrem Flächeninhalt bei g = 8 cm und h = 5 cm – beginne mit dem kleinsten.',['Dreieck (20 cm²)','Trapez mit c = 2 cm (25 cm²)','Parallelogramm (40 cm²)','Rechteck 8 cm × 7 cm (56 cm²)'],'Jeweils die passende Formel anwenden.'],
  ['Ordne die Schritte beim Zerlegen einer zusammengesetzten Fläche.',['Figur in bekannte Teilflächen zerlegen','Fehlende Maße ergänzen','Teilflächen einzeln berechnen','Teilflächen addieren oder subtrahieren'],'Zerlegungs- und Ergänzungsstrategie.']
 ])
]},

{key:'g8-lgs', gens:[
 r=>poolMC(r,[
  ['Wie viele Lösungen hat ein LGS mit zwei sich schneidenden Geraden?','genau eine',['keine','unendlich viele','zwei'],'Der Schnittpunkt ist die einzige Lösung.'],
  ['Welches Verfahren eignet sich, wenn beide Gleichungen nach y aufgelöst sind?','Gleichsetzungsverfahren',['Additionsverfahren','Einsetzungsverfahren','Grafisches Verfahren'],'Beide rechten Seiten gleichsetzen.'],
  ['Was ist die Lösung eines LGS mit zwei Variablen?','ein Zahlenpaar (x|y)',['eine einzelne Zahl','eine Gerade','eine Funktion'],'Beide Gleichungen müssen gleichzeitig erfüllt sein.'],
  ['Wann hat ein LGS keine Lösung?','wenn die Geraden parallel und verschieden sind',['wenn die Geraden identisch sind','wenn sie sich schneiden','wenn beide durch den Ursprung gehen'],'Parallele Geraden haben keinen gemeinsamen Punkt.'],
  ['Welches Verfahren eliminiert eine Variable durch Addition der Gleichungen?','Additionsverfahren',['Gleichsetzungsverfahren','Einsetzungsverfahren','Probierverfahren'],'Die Koeffizienten müssen entgegengesetzt sein.']
 ]),
 r=>poolTF(r,[
  ['Ein LGS mit zwei Gleichungen und zwei Variablen hat immer genau eine Lösung.',false,'Es kann auch keine oder unendlich viele geben.'],
  ['Beim Einsetzungsverfahren löst man eine Gleichung nach einer Variablen auf.',true,'Dieser Ausdruck wird in die andere Gleichung eingesetzt.'],
  ['Die Probe ist überflüssig, wenn man sorgfältig rechnet.',false,'Die Probe deckt Rechenfehler auf und gehört dazu.'],
  ['Grafisches Lösen liefert immer exakte Werte.',false,'Aus einer Zeichnung lassen sich nur Näherungswerte ablesen.'],
  ['Identische Geraden bedeuten unendlich viele Lösungen.',true,'Jeder Punkt der Geraden erfüllt beide Gleichungen.'],
  ['Man darf eine Gleichung mit einer Zahl multiplizieren, um Koeffizienten anzugleichen.',true,'Das ist eine Äquivalenzumformung.']
 ]),
 r=>{const x=R.int(r,2,9); let y=R.int(r,1,x-1);
     return num('Die Summe zweier Zahlen ist '+(x+y)+', ihre Differenz ist '+(x-y)+'. Wie lautet die größere Zahl?',
       x, 'Addition der Gleichungen: 2x = '+(2*x)+' → x = '+x+', also y = '+y+'.',{tol:0.01});},
 r=>{const e=R.int(r,2,6), k=R.int(r,2,6), pe=R.int(r,2,5), pk=R.int(r,3,8);
     return num(e+' Erwachsene und '+k+' Kinder zahlen zusammen '+(e*pk+k*pe)+' €. Ein Kind zahlt '+pe+' €. Was zahlt ein Erwachsener (in €)?',
       pk, 'Kinder: '+k+' · '+pe+' = '+(k*pe)+' €. Rest '+(e*pk)+' € für '+e+' Erwachsene → '+pk+' €.',{tol:0.01,unit:'€'});},
 r=>{const x=R.int(r,1,8), y=R.int(r,1,8); const a=R.int(r,2,5), b=R.int(r,2,5);
     return num('Löse: '+term(a,'x')+' + y = '+(a*x+y)+' und x + '+term(b,'y')+' = '+(x+b*y)+'. Gib y an.', y,
       'Einsetzungsverfahren führt auf x = '+x+' und y = '+y+'.',{tol:0.01});},
 r=>poolORD(r,[
  ['Ordne die Schritte des Gleichsetzungsverfahrens.',['Beide Gleichungen nach y auflösen','Die rechten Seiten gleichsetzen','Nach x auflösen','x in eine Gleichung einsetzen und y bestimmen'],'Gleichsetzen und einsetzen.'],
  ['Ordne die Schritte des Einsetzungsverfahrens.',['Eine Gleichung nach einer Variablen auflösen','Den Ausdruck in die andere Gleichung einsetzen','Die entstandene Gleichung lösen','Wert zurück einsetzen und Probe machen'],'Auflösen, einsetzen, lösen, prüfen.'],
  ['Ordne die Schritte beim grafischen Lösen eines LGS.',['Beide Gleichungen nach y auflösen','Beide Geraden in ein Koordinatensystem zeichnen','Schnittpunkt ablesen','Lösung durch Einsetzen prüfen'],'Der Schnittpunkt ist die Lösung des Systems.']
 ])
]},

{key:'g8-kreise', gens:[
 r=>poolMC(r,[
  ['Was besagt der Satz des Thales?','Jeder Punkt auf dem Halbkreis über einer Strecke sieht diese unter 90°.',['Alle Winkel im Kreis sind gleich.','Der Umfang ist 2πr.','Die Diagonalen halbieren sich.'],'Der Winkel im Halbkreis ist ein rechter Winkel.'],
  ['Wo liegt der Mittelpunkt des Thaleskreises?','in der Mitte der Strecke AB',['im Punkt C','außerhalb der Strecke','im Schwerpunkt'],'Die Strecke AB ist der Durchmesser.'],
  ['Welche Linien schneiden sich im Umkreismittelpunkt?','die Mittelsenkrechten',['die Winkelhalbierenden','die Seitenhalbierenden','die Höhen'],'Der Umkreismittelpunkt ist von allen Ecken gleich weit entfernt.'],
  ['Welche Linien schneiden sich im Inkreismittelpunkt?','die Winkelhalbierenden',['die Mittelsenkrechten','die Seitenhalbierenden','die Höhen'],'Der Inkreismittelpunkt ist von allen Seiten gleich weit entfernt.'],
  ['Wie heißt der Schnittpunkt der Seitenhalbierenden?','Schwerpunkt',['Umkreismittelpunkt','Inkreismittelpunkt','Höhenschnittpunkt'],'Er teilt jede Seitenhalbierende im Verhältnis 2 : 1.'],
  ['Wo liegt der Umkreismittelpunkt eines rechtwinkligen Dreiecks?','auf der Mitte der Hypotenuse',['im Inneren','außerhalb','auf einer Kathete'],'Folgt direkt aus dem Satz des Thales.']
 ]),
 r=>poolTF(r,[
  ['Der Satz des Thales gilt nur für rechtwinklige Dreiecke.',false,'Er erzeugt sie gerade: Jeder Punkt des Halbkreises liefert einen rechten Winkel.'],
  ['Der Inkreis berührt alle drei Seiten des Dreiecks.',true,'Deshalb ist sein Mittelpunkt von allen Seiten gleich weit entfernt.'],
  ['Der Umkreis geht durch alle drei Ecken.',true,'Sein Mittelpunkt ist von allen Ecken gleich weit entfernt.'],
  ['Bei einem stumpfwinkligen Dreieck liegt der Umkreismittelpunkt außerhalb.',true,'Nur bei spitzwinkligen Dreiecken liegt er innen.'],
  ['Die Mittelsenkrechte einer Strecke steht senkrecht auf ihr und halbiert sie.',true,'Das ist ihre Definition.'],
  ['Im gleichseitigen Dreieck fallen Umkreis- und Inkreismittelpunkt zusammen.',true,'Dort fallen alle vier besonderen Punkte zusammen.']
 ]),
 r=>{const a=R.int(r,20,70); return num('Im Dreieck ABC liegt C auf dem Thaleskreis über AB. Der Winkel bei B beträgt '+a+'°. Wie groß ist der Winkel bei A?',
       90-a, 'Bei C liegen 90°, also 180° − 90° − '+a+'° = '+(90-a)+'°.',{unit:'°'});},
 r=>{const r1=R.int(r,3,20); return num('Ein Umkreis hat den Radius '+r1+' cm. Wie lang ist der Durchmesser (in cm)?', 2*r1,
       'd = 2 · r = '+(2*r1)+' cm.',{unit:'cm'});},
 r=>{const s=R.int(r,3,15)*3; return num('Eine Seitenhalbierende ist '+s+' cm lang. Wie weit ist der Schwerpunkt von der Ecke entfernt (in cm)?',
       s*2/3, 'Der Schwerpunkt teilt im Verhältnis 2 : 1, also 2/3 von '+s+' cm = '+fmt(s*2/3)+' cm.',{tol:0.02,unit:'cm'});},
 r=>poolORD(r,[
  ['Ordne die Schritte zur Konstruktion des Inkreises.',['Zwei Winkelhalbierende konstruieren','Schnittpunkt M markieren','Lot von M auf eine Seite fällen','Kreis um M mit diesem Abstand zeichnen'],'Der Abstand zu den Seiten ist der Inkreisradius.'],
  ['Ordne die Schritte zur Konstruktion eines rechtwinkligen Dreiecks mit dem Thaleskreis.',['Strecke AB zeichnen','Mittelpunkt M von AB bestimmen','Halbkreis um M durch A und B zeichnen','Punkt C auf dem Halbkreis wählen'],'Bei C entsteht automatisch ein rechter Winkel.'],
  ['Ordne die Schritte zur Konstruktion des Umkreises.',['Mittelsenkrechte der Seite AB konstruieren','Mittelsenkrechte der Seite BC konstruieren','Schnittpunkt M als Mittelpunkt markieren','Kreis um M durch A, B und C zeichnen'],'Zwei Mittelsenkrechte genügen.']
 ])
]},

{key:'g8-wahrscheinlichkeit', gens:[
 r=>poolMC(r,[
  ['Was besagt die erste Pfadregel?','Entlang eines Pfades werden die Wahrscheinlichkeiten multipliziert.',['Pfadwahrscheinlichkeiten werden addiert.','Alle Pfade sind gleich wahrscheinlich.','Man zieht die Gegenwahrscheinlichkeit ab.'],'Produktregel entlang des Pfades.'],
  ['Was ändert sich beim Ziehen ohne Zurücklegen?','Die Wahrscheinlichkeiten der zweiten Stufe.',['Nichts.','Nur die Anzahl der Pfade.','Die Reihenfolge der Äste.'],'Die Gesamtzahl der Kugeln nimmt ab.'],
  ['Wie viele Pfade hat ein zweistufiger Versuch mit je zwei Ausgängen?','4',['2','3','8'],'2 · 2 = 4.'],
  ['Wie berechnet man die Gegenwahrscheinlichkeit?','1 − P(A)',['P(A) − 1','1 : P(A)','P(A)²'],'Alle Wahrscheinlichkeiten ergeben zusammen 1.'],
  ['Was bedeutet „mindestens einmal“ am einfachsten?','1 minus die Wahrscheinlichkeit für „keinmal“',['die Summe aller Pfade','das Produkt aller Pfade','die halbe Wahrscheinlichkeit'],'Über das Gegenereignis rechnen.']
 ]),
 r=>poolTF(r,[
  ['Beim Ziehen mit Zurücklegen bleiben die Wahrscheinlichkeiten auf jeder Stufe gleich.',true,'Der Ausgangszustand wird wiederhergestellt.'],
  ['Die Summe aller Pfadwahrscheinlichkeiten eines Baumdiagramms ergibt 1.',true,'Irgendein Pfad wird durchlaufen.'],
  ['Bei zwei Münzwürfen ist „zweimal Kopf“ genauso wahrscheinlich wie „einmal Kopf, einmal Zahl“.',false,'Für genau einmal Kopf gibt es zwei Pfade, also 1/2 gegenüber 1/4.'],
  ['Ziehen ohne Zurücklegen hat mehr Pfade als Ziehen mit Zurücklegen.',false,'Es hat eher weniger, weil manche Kombinationen wegfallen.'],
  ['Zwei Ereignisse sind unabhängig, wenn das eine das andere nicht beeinflusst.',true,'Dann gilt P(A∩B) = P(A) · P(B).'],
  ['Eine Wahrscheinlichkeit von 0,5 bedeutet, dass das Ereignis bei zwei Versuchen genau einmal eintritt.',false,'Das ist nur der Erwartungswert, keine Garantie.']
 ]),
 r=>{const n=R.pick(r,[5,6,8,10]); const k=R.int(r,2,n-1);
     const p=1-((n-k)/n)*((n-k-1)/(n-1));
     return num('Aus '+n+' Kugeln ('+k+' rot) wird zweimal ohne Zurücklegen gezogen. Wahrscheinlichkeit für mindestens eine rote (in %)?',
       Math.round(p*10000)/100, 'Gegenereignis „keine rote“: '+(n-k)+'/'+n+' · '+(n-k-1)+'/'+(n-1)+'. 1 minus dieser Wert ergibt '+fmt(p*100,2)+' %.',{tol:0.1,unit:'%'});},
 r=>{const p=R.pick(r,[0.1,0.2,0.25,0.5]); const n=R.pick(r,[2,3]);
     return num('Ein Versuch mit P = '+fmt(p)+' wird '+n+'-mal unabhängig wiederholt. Wahrscheinlichkeit, dass er nie eintritt (in %)?',
       Math.round(Math.pow(1-p,n)*10000)/100, '('+fmt(1-p)+')^'+n+' = '+fmt(Math.pow(1-p,n),4)+' = '+fmt(Math.pow(1-p,n)*100,2)+' %.',{tol:0.1,unit:'%'});},
 r=>{const a=R.int(r,2,5), b=R.int(r,2,5), c=R.int(r,2,5);
     return num('Ein Menü besteht aus '+a+' Vorspeisen, '+b+' Hauptgerichten und '+c+' Nachspeisen. Wie viele Menüs sind möglich?',
       a*b*c, 'Zählprinzip: '+a+' · '+b+' · '+c+' = '+(a*b*c)+'.');},
 r=>poolORD(r,[
  ['Ordne die Schritte beim zweistufigen Zufallsversuch.',['Baumdiagramm mit beiden Stufen zeichnen','Wahrscheinlichkeiten an alle Äste schreiben','Pfadwahrscheinlichkeiten durch Multiplizieren bestimmen','Günstige Pfade addieren'],'Erste und zweite Pfadregel nacheinander.'],
  ['Ordne die Wahrscheinlichkeiten der Größe nach – beginne mit der kleinsten.',['zweimal Kopf bei 2 Würfen (1/4)','genau einmal Kopf bei 2 Würfen (1/2)','mindestens einmal Kopf bei 2 Würfen (3/4)','irgendein Ergebnis (1)'],'Pfade zählen und vergleichen.'],
  ['Ordne das Vorgehen bei „mindestens einmal“.',['Gegenereignis „keinmal“ formulieren','Wahrscheinlichkeit des Gegenereignisses berechnen','Von 1 abziehen','Ergebnis in Prozent angeben'],'Über das Gegenereignis ist es deutlich kürzer.']
 ])
]}
];
