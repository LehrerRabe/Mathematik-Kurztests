/* Erweiterung Jahrgang 9 und 10 */
import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr, nz, klammer, term, plusZahl, plusTerm} from './bank-core.js';
const poolTF = (r,L)=>{const s=R.pick(r,L); return tf(s[0],s[1],s[2]);};
const poolMC = (r,L)=>{const s=R.pick(r,L); return mc(s[0],s[1],s[2],s[3],r);};
const poolORD= (r,L)=>{const s=R.pick(r,L); return ord(s[0],s[1],s[2],r);};
const PI=Math.PI;

export default [
{key:'g9-reelle', gens:[
 r=>poolMC(r,[
  ['Welche Zahl ist irrational?','√7',['√9','0,25','7/3'],'√7 lässt sich nicht als Bruch schreiben.'],
  ['Wie nennt man die Zahl unter dem Wurzelzeichen?','Radikand',['Exponent','Basis','Index'],'√Radikand.'],
  ['Was ergibt √a · √b?','√(a · b)',['√(a + b)','a · b','√a + √b'],'Produktregel für Wurzeln.'],
  ['Welche Zahl liegt zwischen √4 und √9?','√6',['√2','√10','√16'],'√4 = 2 und √9 = 3; √6 ≈ 2,45 liegt dazwischen.'],
  ['Wie lautet √50 vereinfacht?','5√2',['25√2','2√5','10√5'],'√50 = √25 · √2 = 5√2.'],
  ['Welche Menge enthält alle rationalen und irrationalen Zahlen?','die reellen Zahlen ℝ',['die natürlichen Zahlen ℕ','die ganzen Zahlen ℤ','die rationalen Zahlen ℚ'],'ℝ umfasst ℚ und die irrationalen Zahlen.']
 ]),
 r=>poolTF(r,[
  ['Jede rationale Zahl lässt sich als Bruch schreiben.',true,'Das ist die Definition von ℚ.'],
  ['√16 ist irrational.',false,'√16 = 4 ist eine natürliche Zahl.'],
  ['Die Wurzel aus einer negativen Zahl ist in ℝ nicht definiert.',true,'Kein reelles Quadrat ist negativ.'],
  ['√(a + b) = √a + √b',false,'Die Wurzel ist nicht additiv; probiere a = b = 4.'],
  ['π ist eine irrationale Zahl.',true,'Die Dezimaldarstellung bricht nicht ab und ist nicht periodisch.'],
  ['Radizieren ist die Umkehrung des Potenzierens.',true,'√(a²) = |a|.']
 ]),
 r=>{const a=R.int(r,2,15); return num('Berechne √'+(a*a)+' + √'+((a+1)*(a+1)), 2*a+1,
       '√'+(a*a)+' = '+a+' und √'+((a+1)*(a+1))+' = '+(a+1)+', zusammen '+(2*a+1)+'.');},
 r=>{const a=R.int(r,2,20); return num('Für welche positive Zahl x gilt x² = '+(a*a)+'?', a,
       'x = √'+(a*a)+' = '+a+'.',{tol:0.01});},
 r=>{const a=R.int(r,2,9), b=R.int(r,2,9); return num('Berechne √'+(a*a)+' · √'+(b*b), a*b,
       '√'+(a*a)+' · √'+(b*b)+' = '+a+' · '+b+' = '+(a*b)+'.');},
 r=>poolORD(r,[
  ['Ordne die Zahlen der Größe nach – beginne mit der kleinsten.',['√2 ≈ 1,41','√3 ≈ 1,73','√7 ≈ 2,65','√11 ≈ 3,32'],'Je größer der Radikand, desto größer die Wurzel.'],
  ['Ordne die Zahlenmengen von klein nach groß (Teilmengen zuerst).',['ℕ (natürliche Zahlen)','ℤ (ganze Zahlen)','ℚ (rationale Zahlen)','ℝ (reelle Zahlen)'],'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.'],
  ['Ordne die Schritte beim Vereinfachen von √72.',['Größte Quadratzahl als Faktor suchen (36)','√72 = √36 · √2 schreiben','√36 = 6 berechnen','Ergebnis 6√2 angeben'],'Quadratzahl abspalten.']
 ])
]},

{key:'g9-quadfunk', gens:[
 r=>poolMC(r,[
  ['Wie heißt der Graph einer quadratischen Funktion?','Parabel',['Gerade','Hyperbel','Kreis'],'f(x) = ax² + bx + c ergibt stets eine Parabel.'],
  ['Was bewirkt a > 1 in f(x) = ax²?','Die Parabel wird enger.',['Die Parabel wird weiter.','Sie wird nach unten geöffnet.','Sie verschiebt sich nach oben.'],'Streckung in y-Richtung.'],
  ['Was bewirkt 0 < a < 1 in f(x) = ax²?','Die Parabel wird weiter.',['Sie wird enger.','Sie wird gespiegelt.','Sie verschiebt sich.'],'Stauchung in y-Richtung.'],
  ['Wo liegt der Scheitelpunkt von f(x) = x² + 3?','(0|3)',['(3|0)','(0|−3)','(−3|0)'],'Verschiebung um 3 nach oben.'],
  ['Wie viele Nullstellen kann eine Parabel höchstens haben?','2',['1','3','unendlich viele'],'Eine quadratische Gleichung hat höchstens zwei Lösungen.'],
  ['Was ist die Symmetrieachse einer Parabel?','eine senkrechte Gerade durch den Scheitelpunkt',['die x-Achse','die y-Achse immer','eine waagerechte Gerade'],'x = d bei Scheitelpunkt (d|e).']
 ]),
 r=>poolTF(r,[
  ['Jede Parabel ist achsensymmetrisch.',true,'Zur Senkrechten durch den Scheitelpunkt.'],
  ['Der Scheitelpunkt ist immer der tiefste Punkt der Parabel.',false,'Bei nach unten geöffneten Parabeln ist er der höchste Punkt.'],
  ['f(x) = (x − 3)² hat die Nullstelle x = 3.',true,'Dort wird der Klammerausdruck null.'],
  ['Eine nach oben geöffnete Parabel mit Scheitel über der x-Achse hat keine Nullstelle.',true,'Sie schneidet die x-Achse nie.'],
  ['Die Normalparabel ist der Graph von f(x) = x².',true,'a = 1, keine Verschiebung.'],
  ['Mit quadratischer Ergänzung kommt man von der Normalform zur Scheitelpunktform.',true,'Sie macht das vollständige Quadrat sichtbar.']
 ]),
 r=>{const d=R.int(r,-6,6), e=R.int(r,-8,8);
     return num('Die Parabel f(x) = (x'+plusZahl(-d)+')²'+plusZahl(e)+' hat den Scheitelpunkt S(d|e). Gib die x-Koordinate d an.',
       d, 'In der Scheitelpunktform steht (x − d)², hier also d = '+nz(d)+'.',{tol:0.01});},
 r=>{const a=R.pick(r,[1,2,3,0.5]), x=R.int(r,-4,4);
     return num('Berechne f('+nz(x)+') für f(x) = '+(a===1?'':fmt(a))+'x².', a*x*x,
       (a===1?'':fmt(a)+' · ')+'('+nz(x)+')² = '+(a===1?'':fmt(a)+' · ')+(x*x)+' = '+fmt(a*x*x)+'.',{tol:0.01});},
 r=>{const n=R.int(r,2,9); return num('Die Parabel f(x) = x² − '+(n*n)+' hat zwei Nullstellen. Gib die positive an.', n,
       'x² = '+(n*n)+' → x = ±'+n+'.',{tol:0.01});},
 r=>poolORD(r,[
  ['Ordne die Schritte zur quadratischen Ergänzung von x² + 8x.',['Hälfte von 8 bilden: 4','4² = 16 addieren und subtrahieren','(x + 4)² − 16 schreiben','Scheitelpunkt (−4|−16) ablesen'],'Vollständiges Quadrat herstellen.'],
  ['Ordne die Parabeln nach ihrer Breite – beginne mit der engsten.',['y = 4x²','y = 2x²','y = x²','y = 0,5x²'],'Je größer |a|, desto enger.'],
  ['Ordne die Schritte beim Zeichnen einer Parabel aus der Scheitelpunktform.',['Scheitelpunkt einzeichnen','Öffnungsrichtung aus dem Vorzeichen von a bestimmen','Wertetabelle für einige x-Werte anlegen','Punkte eintragen und verbinden'],'Scheitel zuerst.']
 ])
]},

{key:'g9-kreis-koerper', gens:[
 r=>poolMC(r,[
  ['Wie lautet die Formel für den Kreisumfang?','u = 2πr',['u = πr²','u = πd²','u = 2πr²'],'Umfang ist eine Länge, Fläche eine Quadrateinheit.'],
  ['Wie lautet die Formel für den Kreisflächeninhalt?','A = πr²',['A = 2πr','A = πd','A = π²r'],'Fläche wächst mit dem Quadrat des Radius.'],
  ['Wie berechnet man das Volumen eines Zylinders?','V = πr²h',['V = 2πrh','V = πr²','V = (1/3)πr²h'],'Grundfläche mal Höhe.'],
  ['Wie verändert sich die Kreisfläche, wenn der Radius verdoppelt wird?','Sie vervierfacht sich.',['Sie verdoppelt sich.','Sie verdreifacht sich.','Sie bleibt gleich.'],'A = πr², aus (2r)² wird 4r².'],
  ['Was besagt das Prinzip von Cavalieri?','Körper mit gleicher Höhe und flächengleichen Schnitten haben dasselbe Volumen.',['Alle Prismen sind gleich groß.','Der Umfang bestimmt die Fläche.','Jeder Körper lässt sich in Würfel zerlegen.'],'So lässt sich das Volumen schiefer Prismen bestimmen.'],
  ['Wie berechnet man die Mantelfläche eines Zylinders?','M = 2πr · h',['M = πr²','M = πr² · h','M = 2πr²'],'Der Mantel ist abgewickelt ein Rechteck.']
 ]),
 r=>poolTF(r,[
  ['Der Umfang eines Kreises wächst proportional zum Radius.',true,'u = 2πr ist eine lineare Funktion von r.'],
  ['Die Kreisfläche wächst proportional zum Radius.',false,'Sie wächst mit dem Quadrat des Radius.'],
  ['π ist ungefähr 3,14.',true,'Genauer 3,14159…'],
  ['Ein Prisma hat zwei zueinander kongruente Grundflächen.',true,'Sie liegen parallel zueinander.'],
  ['Die Oberfläche eines Zylinders besteht aus zwei Kreisen und einem Rechteck.',true,'Der abgewickelte Mantel ist ein Rechteck.'],
  ['Ein Zylinder mit doppeltem Radius hat doppeltes Volumen.',false,'Das Volumen vervierfacht sich, weil r quadratisch eingeht.']
 ]),
 r=>{const d=R.int(r,4,40); return num('Ein Kreis hat den Durchmesser '+d+' cm. Berechne den Umfang (auf 2 Nachkommastellen, in cm).',
       Math.round(PI*d*100)/100, 'u = π · d = π · '+d+' ≈ '+fmt(PI*d,2)+' cm.',{tol:0.06,unit:'cm'});},
 r=>{const rr=R.int(r,2,12), h=R.int(r,3,20);
     return num('Berechne die Mantelfläche eines Zylinders mit r = '+rr+' cm und h = '+h+' cm (2 Nachkommastellen, in cm²).',
       Math.round(2*PI*rr*h*100)/100, 'M = 2πr · h = 2 · π · '+rr+' · '+h+' ≈ '+fmt(2*PI*rr*h,2)+' cm².',{tol:0.4,unit:'cm²'});},
 r=>{const G=R.int(r,5,40), h=R.int(r,3,20);
     return num('Ein Prisma hat die Grundfläche '+G+' cm² und die Höhe '+h+' cm. Wie groß ist das Volumen (in cm³)?', G*h,
       'V = G · h = '+G+' · '+h+' = '+(G*h)+' cm³.',{unit:'cm³'});},
 r=>poolORD(r,[
  ['Ordne die Schritte zur Volumenberechnung eines Zylinders.',['Radius bestimmen (ggf. aus dem Durchmesser)','Grundfläche A = πr² berechnen','Mit der Höhe multiplizieren','Ergebnis in Kubikeinheiten angeben'],'V = πr²h.'],
  ['Ordne die Kreise nach ihrem Flächeninhalt – beginne mit dem kleinsten.',['r = 1 cm (≈ 3,14 cm²)','r = 2 cm (≈ 12,57 cm²)','r = 3 cm (≈ 28,27 cm²)','r = 4 cm (≈ 50,27 cm²)'],'A = πr².'],
  ['Ordne die Bestandteile der Zylinderoberfläche.',['Grundkreis berechnen','Deckkreis berechnen (gleich groß)','Mantelrechteck 2πr · h berechnen','Alles addieren'],'O = 2πr² + 2πrh.']
 ])
]},

{key:'g9-potenzen', gens:[
 r=>poolMC(r,[
  ['Was ergibt a⁰ für a ≠ 0?','1',['0','a','nicht definiert'],'Folgt aus aⁿ : aⁿ = 1.'],
  ['Wie schreibt man 1/a³ als Potenz?','a^(−3)',['a³','(−a)³','3^(−a)'],'Negative Exponenten bedeuten Kehrwerte.'],
  ['Was ergibt (a³)⁴?','a¹²',['a⁷','a^(3/4)','a⁶⁴'],'Potenz einer Potenz: Exponenten multiplizieren.'],
  ['Wie schreibt man 45 000 in wissenschaftlicher Notation?','4,5 · 10⁴',['45 · 10³','0,45 · 10⁵','4,5 · 10³'],'Die Mantisse liegt zwischen 1 und 10.'],
  ['Was ergibt a⁵ : a²?','a³',['a⁷','a^2,5','a¹⁰'],'Gleiche Basis: Exponenten subtrahieren.'],
  ['Was bedeutet a^(1/2)?','√a',['a : 2','2a','a²'],'Rationale Exponenten entsprechen Wurzeln.']
 ]),
 r=>poolTF(r,[
  ['a² · a³ = a⁵',true,'Bei gleicher Basis werden die Exponenten addiert.'],
  ['a² · a³ = a⁶',false,'Multipliziert werden die Exponenten nur beim Potenzieren einer Potenz.'],
  ['(ab)² = a²b²',true,'Der Exponent verteilt sich auf beide Faktoren.'],
  ['(a + b)² = a² + b²',false,'Hier gilt die erste binomische Formel.'],
  ['10⁻³ = 0,001',true,'Drei Stellen nach dem Komma.'],
  ['2⁻¹ ist negativ.',false,'2⁻¹ = 1/2 = 0,5 und damit positiv.']
 ]),
 r=>{const b=R.int(r,2,5), e=R.int(r,2,5); return num('Berechne '+b+'^'+e+'.', Math.pow(b,e),
       Array(e).fill(b).join(' · ')+' = '+Math.pow(b,e)+'.');},
 r=>{const e=R.int(r,2,6); return txt('Schreibe 10^(−'+e+') als Dezimalzahl.', fmt(Math.pow(10,-e),e),
       'Das Komma wandert '+e+' Stellen nach links.',[String(Math.pow(10,-e))]);},
 r=>{const m=R.int(r,10,99)/10, e=R.int(r,2,6);
     return num('Schreibe '+fmt(m,1)+' · 10^'+e+' als gewöhnliche Zahl.', m*Math.pow(10,e),
       'Komma um '+e+' Stellen nach rechts: '+(m*Math.pow(10,e))+'.',{tol:0.5});},
 r=>poolORD(r,[
  ['Ordne die Potenzen der Größe nach – beginne mit der kleinsten.',['2⁻² = 0,25','2⁰ = 1','2² = 4','2⁴ = 16'],'Negative Exponenten ergeben Werte unter 1.'],
  ['Ordne die Potenzgesetze ihrer Anwendung zu – beginne mit der Multiplikation.',['aᵐ · aⁿ = aᵐ⁺ⁿ','aᵐ : aⁿ = aᵐ⁻ⁿ','(aᵐ)ⁿ = aᵐ·ⁿ','a⁻ⁿ = 1/aⁿ'],'Addieren, subtrahieren, multiplizieren, Kehrwert.'],
  ['Ordne die Schritte beim Umwandeln in wissenschaftliche Notation.',['Komma hinter die erste Ziffer setzen','Verschobene Stellen zählen','Zehnerpotenz mit dieser Anzahl bilden','Als Produkt aufschreiben'],'Mantisse zwischen 1 und 10.']
 ])
]},

{key:'g9-pythagoras', gens:[
 r=>poolMC(r,[
  ['Wie lautet der Satz des Pythagoras?','a² + b² = c²',['a + b = c','a² − b² = c²','a · b = c²'],'c ist dabei die Hypotenuse.'],
  ['Welche Seite ist die Hypotenuse?','die Seite gegenüber dem rechten Winkel',['die kürzeste Seite','die Grundseite','jede der beiden Katheten'],'Sie ist stets die längste Seite.'],
  ['Welches Tripel ist pythagoreisch?','(5; 12; 13)',['(4; 5; 6)','(2; 3; 4)','(6; 7; 8)'],'25 + 144 = 169 = 13².'],
  ['Wie lang ist die Diagonale eines Quadrats mit a?','a·√2',['2a','a²','a·√3'],'Pythagoras im halben Quadrat.'],
  ['Wie lautet das Volumen einer Pyramide?','V = (1/3)·G·h',['V = G·h','V = (1/2)·G·h','V = 3·G·h'],'Ein Drittel des Prismas mit gleicher Grundfläche.'],
  ['Wie lautet das Kugelvolumen?','V = (4/3)πr³',['V = 4πr²','V = πr³','V = (1/3)πr³'],'Die Oberfläche ist 4πr².']
 ]),
 r=>poolTF(r,[
  ['Der Satz des Pythagoras gilt in jedem rechtwinkligen Dreieck.',true,'Nur dort.'],
  ['Die Hypotenuse ist immer die längste Seite.',true,'Sie liegt dem größten Winkel gegenüber.'],
  ['Aus a² + b² = c² folgt a + b = c.',false,'Wurzeln lassen sich nicht summandenweise ziehen.'],
  ['Mit dem Satz des Pythagoras lässt sich auch prüfen, ob ein Dreieck rechtwinklig ist.',true,'Das ist die Umkehrung des Satzes.'],
  ['Die Raumdiagonale eines Würfels mit der Kante a ist a·√3.',true,'Zweimal Pythagoras hintereinander.'],
  ['Die Oberfläche einer Kugel beträgt (4/3)πr³.',false,'Das ist das Volumen; die Oberfläche ist 4πr².']
 ]),
 r=>{const a=R.int(r,2,15); const d=Math.round(a*Math.sqrt(3)*100)/100;
     return num('Berechne die Raumdiagonale eines Würfels mit der Kante '+a+' cm (2 Nachkommastellen, in cm).', d,
       'd = a·√3 = '+a+' · 1,732… ≈ '+fmt(d,2)+' cm.',{tol:0.06,unit:'cm'});},
 r=>{const rr=R.int(r,2,12); const O=Math.round(4*PI*rr*rr*100)/100;
     return num('Berechne die Oberfläche einer Kugel mit r = '+rr+' cm (2 Nachkommastellen, in cm²).', O,
       'O = 4πr² = 4 · π · '+(rr*rr)+' ≈ '+fmt(O,2)+' cm².',{tol:0.5,unit:'cm²'});},
 r=>{const T=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25]]; const t=R.pick(r,T);
     return tf('Ein Dreieck mit den Seiten '+t[0]+' cm, '+t[1]+' cm und '+t[2]+' cm ist rechtwinklig.', true,
       t[0]+'² + '+t[1]+'² = '+(t[0]*t[0]+t[1]*t[1])+' = '+t[2]+'² – die Umkehrung des Satzes von Pythagoras gilt.');},
 r=>poolORD(r,[
  ['Ordne die Schritte zur Berechnung der Hypotenuse.',['Katheten a und b bestimmen','a² und b² berechnen','Beide Quadrate addieren','Wurzel ziehen und c angeben'],'c = √(a² + b²).'],
  ['Ordne die Schritte zur Berechnung einer Kathete.',['Hypotenuse c und bekannte Kathete a notieren','c² und a² berechnen','a² von c² subtrahieren','Wurzel ziehen und b angeben'],'b = √(c² − a²).'],
  ['Ordne die Körper nach ihrem Volumen bei gleicher Grundfläche und Höhe – beginne mit dem kleinsten.',['Pyramide (1/3 G·h)','Kegel (1/3 G·h, runde Grundfläche)','Prisma (G·h)','Zylinder (G·h, runde Grundfläche)'],'Spitze Körper haben ein Drittel des Volumens.']
 ])
]},

{key:'g9-stochastik', gens:[
 r=>poolMC(r,[
  ['Wofür steht n! (n Fakultät)?','das Produkt aller Zahlen von 1 bis n',['die Summe aller Zahlen von 1 bis n','n mal n','die Anzahl der Teiler von n'],'5! = 1·2·3·4·5 = 120.'],
  ['Was zeigt eine Vierfeldertafel?','die Häufigkeiten zweier Merkmale',['den Verlauf über die Zeit','die Verteilung einer Größe','die Wahrscheinlichkeit eines Pfades'],'Zwei Merkmale mit je zwei Ausprägungen.'],
  ['Was bedeutet P(B|A)?','die Wahrscheinlichkeit für B, wenn A eingetreten ist',['die Wahrscheinlichkeit für A und B','die Summe von A und B','die Wahrscheinlichkeit, dass weder A noch B eintritt'],'Bedingte Wahrscheinlichkeit.'],
  ['Wann sind zwei Ereignisse stochastisch unabhängig?','wenn P(A∩B) = P(A)·P(B)',['wenn sie sich ausschließen','wenn P(A) = P(B)','wenn beide sicher sind'],'Das Eintreten des einen beeinflusst das andere nicht.'],
  ['Wie viele Möglichkeiten gibt es, aus 5 Personen 2 auszuwählen (ohne Reihenfolge)?','10',['20','25','7'],'5·4 : 2 = 10.'],
  ['Wie erkennt man eine manipulierte Grafik häufig?','an einer abgeschnittenen Achse',['an zu vielen Farben','an fehlenden Zahlen','an einer Legende'],'Dadurch wirken Unterschiede größer.']
 ]),
 r=>poolTF(r,[
  ['0! ist definiert als 1.',true,'Das ist eine Festlegung, die viele Formeln einfacher macht.'],
  ['Bei einer Vierfeldertafel ergeben die Randsummen zusammen die Gesamtzahl.',true,'Die Tafel ist vollständig.'],
  ['Sich ausschließende Ereignisse sind immer unabhängig.',false,'Im Gegenteil: Wenn A eintritt, kann B nicht eintreten.'],
  ['Die Reihenfolge spielt bei Kombinationen keine Rolle.',true,'Bei Permutationen dagegen schon.'],
  ['Eine Umfrage unter Freunden liefert ein repräsentatives Bild der Bevölkerung.',false,'Die Stichprobe ist verzerrt.'],
  ['Bedingte Wahrscheinlichkeiten können größer sein als die unbedingten.',true,'Zusätzliche Information kann die Wahrscheinlichkeit erhöhen.']
 ]),
 r=>{const n=R.pick(r,[4,5,6,7,8,10]); return num('Wie viele Möglichkeiten gibt es, aus '+n+' Personen 2 auszuwählen (ohne Reihenfolge)?',
       n*(n-1)/2, 'n·(n−1) : 2 = '+n+'·'+(n-1)+' : 2 = '+(n*(n-1)/2)+'.');},
 r=>{const tot=R.pick(r,[100,200,400,500]); const a=R.int(r,20,tot/2), b=R.int(r,20,tot/2);
     return num('Von '+tot+' Personen treiben '+a+' Sport und '+b+' spielen ein Instrument. Wie viele Prozent treiben Sport?',
       Math.round(a/tot*10000)/100, a+' : '+tot+' = '+fmt(a/tot*100)+' %.',{tol:0.05,unit:'%'});},
 r=>{const n=R.pick(r,[3,4,5,6]); let f=1; for(let i=2;i<=n;i++) f*=i;
     return num('Berechne '+n+'!', f, '1 · 2 · … · '+n+' = '+f+'.');},
 r=>poolORD(r,[
  ['Ordne die Schritte beim Auswerten einer Vierfeldertafel.',['Gesamtzahl bestimmen','Randsummen ergänzen','Fehlende Felder berechnen','Gesuchte Wahrscheinlichkeit als Anteil ablesen'],'Erst die Tafel vollständig ausfüllen.'],
  ['Ordne die Fakultäten der Größe nach – beginne mit der kleinsten.',['3! = 6','4! = 24','5! = 120','6! = 720'],'Jede Stufe multipliziert mit der nächsten Zahl.'],
  ['Ordne die Schritte einer sauberen Datenerhebung.',['Fragestellung präzisieren','Repräsentative Stichprobe planen','Daten erheben','Ergebnisse darstellen und kritisch prüfen'],'Die Stichprobe entscheidet über die Aussagekraft.']
 ])
]},

{key:'g10-quadgl', gens:[
 r=>poolMC(r,[
  ['Wie lautet die p-q-Formel?','x = −p/2 ± √((p/2)² − q)',['x = p/2 ± √((p/2)² + q)','x = −p ± √(p² − 4q)','x = −q/2 ± √(p)'],'Sie setzt die Normalform x² + px + q = 0 voraus.'],
  ['Was besagt der Satz von Vieta?','x₁ + x₂ = −p und x₁ · x₂ = q',['x₁ + x₂ = p','x₁ · x₂ = −q','x₁ − x₂ = p'],'Summe und Produkt der Lösungen.'],
  ['Wie viele Lösungen hat x² = −4?','keine reelle Lösung',['eine','zwei','unendlich viele'],'Kein reelles Quadrat ist negativ.'],
  ['Was muss vor der p-q-Formel geschehen, wenn vor x² ein Faktor steht?','durch diesen Faktor teilen',['den Faktor addieren','den Faktor quadrieren','nichts'],'Die Normalform braucht den Leitkoeffizienten 1.'],
  ['Welche Gleichung lässt sich ohne Formel lösen?','x² − 49 = 0',['x² + 3x − 5 = 0','x² − 7x + 2 = 0','2x² + x − 1 = 0'],'Einfaches Wurzelziehen genügt.'],
  ['Was ist die Diskriminante?','(p/2)² − q',['p² − q','p/2 + q','√q'],'Ihr Vorzeichen entscheidet über die Anzahl der Lösungen.']
 ]),
 r=>poolTF(r,[
  ['Eine quadratische Gleichung hat immer zwei verschiedene Lösungen.',false,'Sie kann auch eine doppelte oder keine reelle Lösung haben.'],
  ['Ist die Diskriminante 0, gibt es genau eine Lösung.',true,'Die beiden Lösungen fallen zusammen.'],
  ['x² + 5x = 0 lässt sich durch Ausklammern lösen.',true,'x(x + 5) = 0 ergibt x = 0 oder x = −5.'],
  ['Die p-q-Formel funktioniert auch bei 3x² + 6x − 9 = 0 direkt.',false,'Erst durch 3 teilen, um die Normalform zu erhalten.'],
  ['Wenn x₁ und x₂ Lösungen sind, gilt x² + px + q = (x − x₁)(x − x₂).',true,'Das ist die Linearfaktorzerlegung.'],
  ['Eine Parabel kann die x-Achse berühren, ohne sie zu schneiden.',true,'Dann liegt der Scheitel auf der x-Achse – eine doppelte Nullstelle.']
 ]),
 r=>{const n=R.int(r,2,12); return num('Löse x² − '+(n*n)+' = 0. Gib die positive Lösung an.', n,
       'x² = '+(n*n)+' → x = ±'+n+'.',{tol:0.01});},
 r=>{const a=R.int(r,2,9); return num('Löse x² + '+a+'x = 0. Gib die von 0 verschiedene Lösung an.', -a,
       'Ausklammern: x(x + '+a+') = 0 → x = 0 oder x = '+nz(-a)+'.',{tol:0.01});},
 r=>{const x1=R.int(r,1,9), x2=R.int(r,1,9);
     return num('Die Lösungen einer Gleichung x² + px + q = 0 sind '+x1+' und '+x2+'. Wie groß ist q?', x1*x2,
       'Satz von Vieta: q = x₁ · x₂ = '+x1+' · '+x2+' = '+(x1*x2)+'.',{tol:0.01});},
 r=>poolORD(r,[
  ['Ordne die Schritte beim Lösen mit der p-q-Formel.',['Gleichung auf Normalform bringen','p und q ablesen','Diskriminante (p/2)² − q berechnen','Lösungen mit der Formel bestimmen'],'Normalform zuerst.'],
  ['Ordne die Lösungsverfahren nach dem Aufwand – beginne mit dem einfachsten.',['reines Wurzelziehen (x² = a)','Ausklammern (x² + px = 0)','Linearfaktorzerlegung','p-q-Formel'],'Erst prüfen, ob ein einfacheres Verfahren greift.'],
  ['Ordne die Schritte der Linearfaktorzerlegung.',['Nullstellen x₁ und x₂ bestimmen','Faktoren (x − x₁) und (x − x₂) bilden','Beide Faktoren multiplizieren','Durch Ausmultiplizieren prüfen'],'x² + px + q = (x − x₁)(x − x₂).']
 ])
]},

{key:'g10-aehnlichkeit', gens:[
 r=>poolMC(r,[
  ['Wann sind zwei Figuren ähnlich?','wenn alle Winkel gleich und alle Längen proportional sind',['wenn sie denselben Flächeninhalt haben','wenn sie deckungsgleich sind','wenn sie denselben Umfang haben'],'Ähnlich heißt formgleich, nicht größengleich.'],
  ['Was ist der Streckfaktor k?','das Verhältnis entsprechender Längen',['das Verhältnis der Flächen','der Abstand zum Streckzentrum','die Summe der Seiten'],'Längen werden mit k multipliziert.'],
  ['Wie verändert sich die Fläche bei Streckung mit k?','mit k²',['mit k','mit k³','gar nicht'],'Zwei Längenrichtungen werden gestreckt.'],
  ['Wie verändert sich das Volumen bei Streckung mit k?','mit k³',['mit k','mit k²','mit 3k'],'Drei Längenrichtungen.'],
  ['Was beschreibt der erste Strahlensatz?','das Verhältnis der Abschnitte auf den Strahlen',['die Winkelsumme','den Flächeninhalt','die Höhe im Dreieck'],'Parallelen schneiden Strahlen in proportionalen Abschnitten.'],
  ['Zwei Dreiecke mit zwei übereinstimmenden Winkeln sind …','ähnlich',['kongruent','gleichschenklig','rechtwinklig'],'Der dritte Winkel stimmt dann automatisch überein.']
 ]),
 r=>poolTF(r,[
  ['Kongruente Figuren sind immer auch ähnlich.',true,'Mit dem Streckfaktor k = 1.'],
  ['Ähnliche Figuren sind immer kongruent.',false,'Nur bei k = 1.'],
  ['Bei zentrischer Streckung bleiben die Winkel gleich.',true,'Nur die Längen ändern sich.'],
  ['Ein Streckfaktor k < 1 verkleinert die Figur.',true,'Zum Beispiel k = 0,5 halbiert alle Längen.'],
  ['Alle Quadrate sind zueinander ähnlich.',true,'Alle Winkel 90°, alle Seitenverhältnisse gleich.'],
  ['Alle Rechtecke sind zueinander ähnlich.',false,'Die Seitenverhältnisse können verschieden sein.']
 ]),
 r=>{const k=R.int(r,2,5), V=R.int(r,2,20);
     return num('Ein Körper mit dem Volumen '+V+' cm³ wird mit k = '+k+' gestreckt. Wie groß ist das neue Volumen (in cm³)?',
       V*k*k*k, 'Volumen wächst mit k³: '+V+' · '+(k*k*k)+' = '+(V*k*k*k)+' cm³.',{unit:'cm³'});},
 r=>{const a=R.int(r,2,9), b=R.int(r,2,9), c=a*R.int(r,2,6);
     return num('Strahlensatz: a = '+a+' cm, b = '+b+' cm, a\' = '+c+' cm. Berechne b\' (2 Nachkommastellen, in cm).',
       Math.round(c*b/a*100)/100, 'b\' = a\' · b : a = '+c+' · '+b+' : '+a+' = '+fmt(c*b/a,2)+' cm.',{tol:0.02,unit:'cm'});},
 r=>{const k=R.pick(r,[2,3,4,5]), u=R.int(r,6,40);
     return num('Ein Dreieck hat den Umfang '+u+' cm und wird mit k = '+k+' gestreckt. Wie groß ist der neue Umfang (in cm)?',
       u*k, 'Längen – also auch der Umfang – wachsen mit k: '+u+' · '+k+' = '+(u*k)+' cm.',{unit:'cm'});},
 r=>poolORD(r,[
  ['Ordne die Vergrößerungsfaktoren der Größe nach – beginne mit dem kleinsten.',['Länge bei k = 2 (· 2)','Fläche bei k = 2 (· 4)','Volumen bei k = 2 (· 8)','Volumen bei k = 3 (· 27)'],'Längen wachsen mit k, Flächen mit k², Volumina mit k³.'],
  ['Ordne die Schritte beim Anwenden des Strahlensatzes.',['Streckzentrum und parallele Linien erkennen','Entsprechende Strecken einander zuordnen','Verhältnisgleichung aufstellen','Nach der gesuchten Länge auflösen'],'Gleiche Verhältnisse auf beiden Strahlen.'],
  ['Ordne die Schritte einer zentrischen Streckung.',['Streckzentrum Z festlegen','Strahlen von Z durch alle Eckpunkte zeichnen','Abstände mit k multiplizieren','Neue Punkte verbinden'],'Jeder Punkt wird vom Zentrum aus gestreckt.']
 ])
]},

{key:'g10-exponential', gens:[
 r=>poolMC(r,[
  ['Woran erkennt man exponentielles Wachstum in einer Wertetabelle?','Der Quotient aufeinanderfolgender Werte ist konstant.',['Die Differenz ist konstant.','Die Summe ist konstant.','Die Werte wachsen linear.'],'Konstanter Faktor pro Schritt.'],
  ['Woran erkennt man lineares Wachstum?','Die Differenz aufeinanderfolgender Werte ist konstant.',['Der Quotient ist konstant.','Das Produkt ist konstant.','Die Werte verdoppeln sich.'],'Konstante Zunahme pro Schritt.'],
  ['Was ist der Wachstumsfaktor bei 100 % Zunahme?','2',['1','1,1','100'],'Verdopplung.'],
  ['Was bedeutet Halbwertszeit?','die Zeit, in der sich der Bestand halbiert',['die halbe Gesamtzeit','die Zeit bis zum Verschwinden','die Zeit bis zur Verdopplung'],'Typisch für exponentielle Abnahme.'],
  ['Welche Funktion wächst auf lange Sicht am schnellsten?','f(x) = 2^x',['f(x) = x²','f(x) = 100x','f(x) = x³'],'Exponentielles Wachstum überholt jedes Polynom.'],
  ['Welcher Startwert gehört zu f(x) = 5 · 1,2^x?','5',['1,2','6','0'],'f(0) = 5 · 1 = 5.']
 ]),
 r=>poolTF(r,[
  ['Bei exponentiellem Wachstum ist der Faktor pro Schritt konstant.',true,'Die absolute Zunahme wächst dagegen.'],
  ['Ein Abnahmefaktor liegt zwischen 0 und 1.',true,'Zum Beispiel 0,8 bei 20 % Abnahme.'],
  ['Bei f(x) = a·qˣ mit a > 0 und q > 0 sind alle Funktionswerte positiv.',true,'Eine positive Zahl hoch irgendetwas bleibt positiv, mal a > 0 ebenfalls.'],
  ['Nach zwei Halbwertszeiten ist nichts mehr übrig.',false,'Es ist noch ein Viertel vorhanden.'],
  ['Der Graph von f(x) = 2^x schneidet die x-Achse.',false,'Er nähert sich ihr nur an.'],
  ['Zinseszins ist ein Beispiel für exponentielles Wachstum.',true,'Das Kapital wächst mit einem konstanten Faktor pro Jahr.']
 ]),
 r=>{const a=R.pick(r,[100,200,400,800,1600]), n=R.int(r,1,4);
     return num('Ein Bestand von '+a+' halbiert sich in jedem Schritt. Wie groß ist er nach '+n+' Schritten?',
       a/Math.pow(2,n), a+' : 2^'+n+' = '+fmt(a/Math.pow(2,n))+'.',{tol:0.01});},
 r=>{const a=R.int(r,2,10), q=R.pick(r,[2,3]), n=R.int(r,2,5);
     return num('Ein Bestand startet bei '+a+' und wird in jedem Schritt mit '+q+' multipliziert. Wie groß ist er nach '+n+' Schritten?',
       a*Math.pow(q,n), a+' · '+q+'^'+n+' = '+(a*Math.pow(q,n))+'.',{tol:0.01});},
 r=>{const p=R.pick(r,[5,10,15,20,25]); return num('Welcher Wachstumsfaktor gehört zu einer Zunahme von '+p+' %?',
       1+p/100, 'q = 1 + '+p+'/100 = '+fmt(1+p/100,2)+'.',{tol:0.005});},
 r=>poolORD(r,[
  ['Ordne die Wachstumsarten nach ihrer Geschwindigkeit auf lange Sicht – beginne mit der langsamsten.',['f(x) = 10x (linear)','f(x) = x² (quadratisch)','f(x) = x³ (kubisch)','f(x) = 2^x (exponentiell)'],'Exponentielles Wachstum überholt alle Polynome.'],
  ['Ordne die Bestände bei Halbierung – Startwert 800.',['nach 3 Schritten (100)','nach 2 Schritten (200)','nach 1 Schritt (400)','Startwert (800)'],'Jeder Schritt halbiert.'],
  ['Ordne die Schritte beim Aufstellen einer Exponentialfunktion.',['Startwert a aus der Tabelle ablesen','Quotient zweier aufeinanderfolgender Werte bilden','Diesen Quotienten als q eintragen','f(x) = a · qˣ aufschreiben'],'Startwert und Faktor genügen.']
 ])
]},

{key:'g10-trigonometrie', gens:[
 r=>poolMC(r,[
  ['Wie ist der Sinus im rechtwinkligen Dreieck definiert?','Gegenkathete : Hypotenuse',['Ankathete : Hypotenuse','Gegenkathete : Ankathete','Hypotenuse : Gegenkathete'],'GAGA – HühnerHof – AGAH.'],
  ['Wie ist der Kosinus definiert?','Ankathete : Hypotenuse',['Gegenkathete : Hypotenuse','Ankathete : Gegenkathete','Hypotenuse : Ankathete'],'Ankathete zur Hypotenuse.'],
  ['Wie ist der Tangens definiert?','Gegenkathete : Ankathete',['Gegenkathete : Hypotenuse','Ankathete : Hypotenuse','Hypotenuse : Ankathete'],'Auch sin(α) : cos(α).'],
  ['Welchen Wert hat sin(30°)?','0,5',['0,707','0,866','1'],'Bekannter Winkelwert.'],
  ['Welchen Wert hat cos(60°)?','0,5',['0,866','0,707','1'],'cos(60°) = sin(30°) = 0,5.'],
  ['Welche Funktion nimmt man bei gegebener Ankathete und Hypotenuse?','Kosinus',['Sinus','Tangens','Pythagoras'],'cos(α) = Ankathete : Hypotenuse.']
 ]),
 r=>poolTF(r,[
  ['Der Sinus eines Winkels kann größer als 1 werden.',false,'Die Gegenkathete ist nie länger als die Hypotenuse.'],
  ['Es gilt tan(α) = sin(α) : cos(α).',true,'Folgt direkt aus den Definitionen.'],
  ['sin(90°) = 1',true,'Gegenkathete und Hypotenuse fallen zusammen.'],
  ['Für wachsende Winkel von 0° bis 90° nimmt der Kosinus zu.',false,'Er nimmt von 1 auf 0 ab.'],
  ['Trigonometrie lässt sich nur in rechtwinkligen Dreiecken anwenden.',false,'Mit Sinus- und Kosinussatz auch in beliebigen Dreiecken.'],
  ['sin²(α) + cos²(α) = 1',true,'Trigonometrischer Pythagoras.']
 ]),
 r=>{const T=[[3,4,5],[6,8,10],[5,12,13],[8,15,17]]; const t=R.pick(r,T);
     return num('Rechtwinkliges Dreieck mit Gegenkathete '+t[0]+' cm und Ankathete '+t[1]+' cm. Berechne tan(α) (3 Nachkommastellen).',
       Math.round(t[0]/t[1]*1000)/1000, 'tan(α) = '+t[0]+' : '+t[1]+' ≈ '+fmt(t[0]/t[1],3)+'.',{tol:0.003});},
 r=>{const w=R.pick(r,[30,45,60]); const W={30:0.5,45:0.707,60:0.866};
     return num('Berechne sin('+w+'°) (3 Nachkommastellen).', W[w], 'Bekannter Wert: sin('+w+'°) ≈ '+fmt(W[w],3)+'.',{tol:0.004});},
 r=>{const h=R.int(r,5,40), w=R.pick(r,[30,45,60]);
     const tanv={30:0.5774,45:1,60:1.7321}[w];
     return num('Ein Turm wirft unter dem Höhenwinkel '+w+'° einen Schatten. Die Entfernung zum Fußpunkt beträgt '+h+' m. Wie hoch ist der Turm (2 Nachkommastellen, in m)?',
       Math.round(h*tanv*100)/100, 'Höhe = Entfernung · tan('+w+'°) = '+h+' · '+fmt(tanv,4)+' ≈ '+fmt(h*tanv,2)+' m.',{tol:0.1,unit:'m'});},
 r=>poolORD(r,[
  ['Ordne die Sinuswerte der Größe nach – beginne mit dem kleinsten.',['sin(0°) = 0','sin(30°) = 0,5','sin(60°) ≈ 0,87','sin(90°) = 1'],'Von 0° bis 90° wächst der Sinus.'],
  ['Ordne die Kosinuswerte der Größe nach – beginne mit dem kleinsten.',['cos(90°) = 0','cos(60°) = 0,5','cos(30°) ≈ 0,87','cos(0°) = 1'],'Von 0° bis 90° fällt der Kosinus.'],
  ['Ordne die Schritte beim Berechnen einer Seite mit dem Sinus.',['Rechten Winkel und Winkel α markieren','Gegenkathete und Hypotenuse identifizieren','sin(α) = Gegenkathete : Hypotenuse aufstellen','Nach der gesuchten Seite auflösen'],'Erst die Seiten benennen.']
 ])
]},

{key:'g10-trigfunk', gens:[
 r=>poolMC(r,[
  ['Welche Periode hat die Sinusfunktion?','360°',['180°','90°','720°'],'Nach 360° wiederholt sich der Verlauf.'],
  ['Welchen Wertebereich hat die Sinusfunktion?','von −1 bis 1',['von 0 bis 1','von −∞ bis ∞','von 0 bis 360'],'Der Einheitskreis hat den Radius 1.'],
  ['Was gibt a in f(x) = a·sin(x) an?','die Amplitude',['die Periode','die Verschiebung','die Nullstelle'],'a streckt oder staucht in y-Richtung.'],
  ['Was gibt b in f(x) = sin(b·x) an?','wie oft die Schwingung in 360° passt',['die Amplitude','die Verschiebung nach oben','den Startwert'],'Die Periode ist 360°/b.'],
  ['Welchem Bogenmaß entspricht 180°?','π',['π/2','2π','π/4'],'Der halbe Vollkreis.'],
  ['Wo hat die Sinusfunktion ihre erste Nullstelle nach 0°?','bei 180°',['bei 90°','bei 270°','bei 360°'],'sin(180°) = 0.']
 ]),
 r=>poolTF(r,[
  ['Die Kosinusfunktion beginnt bei x = 0 mit dem Wert 1.',true,'cos(0°) = 1.'],
  ['Die Sinusfunktion ist periodisch.',true,'Sie wiederholt sich alle 360°.'],
  ['Eine größere Amplitude verändert die Periode.',false,'Amplitude und Periode sind unabhängig voneinander.'],
  ['f(x) = 3·sin(x) hat Werte zwischen −3 und 3.',true,'Die Amplitude beträgt 3.'],
  ['Der Graph von sin(2x) ist doppelt so breit wie der von sin(x).',false,'Er ist halb so breit – die Periode halbiert sich.'],
  ['Periodische Vorgänge wie Gezeiten lassen sich mit Sinusfunktionen modellieren.',true,'Deshalb sind sie in den Naturwissenschaften so wichtig.']
 ]),
 r=>{const a=R.int(r,2,9); return num('Welchen größten Wert nimmt f(x) = '+a+'·sin(x) an?', a,
       'Der Sinus wird höchstens 1, also ist der Höchstwert '+a+'.');},
 r=>{const a=R.int(r,2,9); return num('Welchen kleinsten Wert nimmt f(x) = '+a+'·sin(x) an?', -a,
       'Der Sinus wird mindestens −1, also ist der kleinste Wert '+nz(-a)+'.');},
 r=>{const b=R.pick(r,[1,2,3,4,6]); return num('Wie viele vollständige Schwingungen macht f(x) = sin('+term(b,'x')+') zwischen 0° und 360°?',
       b, 'Die Periode ist 360°/'+b+', also passen '+b+' Schwingungen hinein.');},
 r=>{const g=R.pick(r,[90,180,270,360]); const bog={90:'π/2',180:'π',270:'3π/2',360:'2π'};
     return txt('Welchem Bogenmaß entspricht '+g+'°? (Schreibe z. B. pi/2, pi, 3pi/2 oder 2pi)',
       bog[g].replace('π','pi'), g+'° = '+g+'/180 · π = '+bog[g]+'.',[bog[g]]);},
 r=>poolORD(r,[
  ['Ordne die Winkel nach ihrem Sinuswert – beginne mit dem kleinsten.',['270° (−1)','180° (0)','30° (0,5)','90° (1)'],'Werte am Einheitskreis ablesen.'],
  ['Ordne die Perioden – beginne mit der kürzesten.',['sin(4x): 90°','sin(3x): 120°','sin(2x): 180°','sin(x): 360°'],'Periode = 360°/b.'],
  ['Ordne die Schritte beim Zeichnen von f(x) = 2·sin(x).',['Periode 360° festlegen','Amplitude 2 auf der y-Achse markieren','Nullstellen bei 0°, 180° und 360° eintragen','Hoch- und Tiefpunkte verbinden'],'Erst das Gerüst, dann die Kurve.']
 ])
]},

{key:'g10-stochastik', gens:[
 r=>poolMC(r,[
  ['Wie viele Möglichkeiten gibt es, 4 Personen auf 4 Stühle zu setzen?','24',['16','12','8'],'4! = 24.'],
  ['Was zeigt ein Boxplot?','Median, Quartile und Spannweite',['nur den Mittelwert','die Anzahl der Werte','die Wahrscheinlichkeit'],'Die Box umfasst die mittleren 50 %.'],
  ['Was ist das untere Quartil?','der Wert, unter dem 25 % der Daten liegen',['der kleinste Wert','der Median','der Durchschnitt'],'Q1 trennt das erste Viertel ab.'],
  ['Wann sind zwei Ereignisse unvereinbar?','wenn sie nicht gleichzeitig eintreten können',['wenn sie unabhängig sind','wenn sie gleich wahrscheinlich sind','wenn beide sicher sind'],'Der Schnitt ist leer.'],
  ['Wie berechnet man P(A oder B) bei unvereinbaren Ereignissen?','P(A) + P(B)',['P(A) · P(B)','P(A) − P(B)','P(A) : P(B)'],'Die Wahrscheinlichkeiten addieren sich.'],
  ['Was beschreibt der Erwartungswert?','den langfristigen Durchschnitt vieler Versuche',['den häufigsten Wert','den größten möglichen Gewinn','die Wahrscheinlichkeit'],'Gewichteter Mittelwert der Ergebnisse.']
 ]),
 r=>poolTF(r,[
  ['Der Median teilt die geordneten Daten in zwei gleich große Hälften.',true,'Je 50 % darunter und darüber.'],
  ['Die Box im Boxplot enthält 50 % der Daten.',true,'Vom unteren bis zum oberen Quartil.'],
  ['Unvereinbare Ereignisse sind unabhängig.',false,'Tritt das eine ein, ist das andere ausgeschlossen – das ist maximale Abhängigkeit.'],
  ['Bei einem fairen Spiel ist der Erwartungswert des Gewinns 0.',true,'Einsatz und Auszahlung gleichen sich langfristig aus.'],
  ['Eine größere Stichprobe liefert in der Regel verlässlichere Ergebnisse.',true,'Zufällige Schwankungen mitteln sich stärker heraus.'],
  ['Zwei Merkmale, die zusammen auftreten, stehen immer in einem Ursache-Wirkungs-Verhältnis.',false,'Korrelation ist nicht Kausalität.']
 ]),
 r=>{const n=R.pick(r,[4,5,6]); let f=1; for(let i=2;i<=n;i++) f*=i;
     return num('Auf wie viele Arten lassen sich '+n+' verschiedene Bücher anordnen?', f, n+'! = '+f+'.');},
 r=>{const d=[R.int(r,1,5),R.int(r,6,10),R.int(r,11,15),R.int(r,16,20),R.int(r,21,25)].sort((a,b)=>a-b);
     return num('Bestimme den Median von '+d.join('; ')+'.', d[2], 'Sortiert ist der mittlere der fünf Werte '+d[2]+'.');},
 r=>{const a=R.pick(r,[2,3,4,5,6]), b=R.pick(r,[2,3,4,5,6]);
     return num('Zwei unabhängige Ereignisse haben P(A) = 1/'+a+' und P(B) = 1/'+b+'. Wie groß ist P(A und B) in Prozent (2 Nachkommastellen)?',
       Math.round(1/(a*b)*10000)/100, '1/'+a+' · 1/'+b+' = 1/'+(a*b)+' ≈ '+fmt(100/(a*b),2)+' %.',{tol:0.05,unit:'%'});},
 r=>poolORD(r,[
  ['Ordne die Kenngrößen eines Boxplots von links nach rechts.',['Minimum','unteres Quartil','Median','oberes Quartil'],'Danach folgt noch das Maximum.'],
  ['Ordne die Schritte beim Erstellen eines Boxplots.',['Daten der Größe nach sortieren','Median bestimmen','Quartile bestimmen','Box und Antennen zeichnen'],'Sortieren ist immer der erste Schritt.'],
  ['Ordne die Anzahl der Anordnungen – beginne mit der kleinsten.',['2 Personen (2)','3 Personen (6)','4 Personen (24)','5 Personen (120)'],'n! wächst sehr schnell.']
 ])
]}
];
