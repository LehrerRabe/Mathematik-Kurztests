/* Erweiterung Jahrgang 5 - schliesst Luecken bei Aufgabenarten und erhoeht die Vielfalt.
   Wahr/Falsch- und Reihenfolge-Aufgaben arbeiten mit Pools, damit sie sich nicht wiederholen. */
import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr, nz, klammer, term, plusZahl, plusTerm} from './bank-core.js';

const poolTF = (r, L) => { const s=R.pick(r,L); return tf(s[0], s[1], s[2]); };
const poolMC = (r, L) => { const s=R.pick(r,L); return mc(s[0], s[1], s[2], s[3], r); };
const poolORD = (r, L) => { const s=R.pick(r,L); return ord(s[0], s[1], s[2], r); };

export default [
{key:'g5-zahlen', gens:[
 r=>poolMC(r,[
  ['Welche Zahl ist die größte?','9 087',['8 907','9 078','8 970'],'Stellenweise vergleichen: 9 087 hat die größte Tausenderziffer und dann die größte Zehnerziffer.'],
  ['Wie schreibt man „dreitausendzwanzig“ in Ziffern?','3 020',['3 200','30 020','3 002'],'Drei Tausender, null Hunderter, zwei Zehner, null Einer.'],
  ['Welche Einheit passt zur Masse eines Apfels?','150 g',['150 kg','150 mg','150 t'],'Ein Apfel wiegt etwa 150 Gramm.'],
  ['Welche Einheit passt zur Länge eines Schulhefts?','30 cm',['30 mm','30 m','30 km'],'Ein Heft ist etwa 30 Zentimeter lang.'],
  ['Wie viele Minuten hat eine Viertelstunde?','15 min',['20 min','25 min','30 min'],'60 min : 4 = 15 min.'],
  ['Welcher Betrag ist am größten?','9,05 €',['8,95 €','9,009 €','8,99 €'],'Erst die Euro vergleichen, dann die Cent: 9,05 € ist am größten.']
 ]),
 r=>poolTF(r,[
  ['Die Zahl 0 ist eine natürliche Zahl.',true,'In der Schule zählt die 0 zu den natürlichen Zahlen (ℕ₀).'],
  ['1 km sind 100 m.',false,'1 km sind 1000 m.'],
  ['500 g sind ein halbes Kilogramm.',true,'1 kg = 1000 g, also sind 500 g die Hälfte.'],
  ['Eine Stunde hat 100 Minuten.',false,'Eine Stunde hat 60 Minuten.'],
  ['Beim Runden auf Hunderter wird die Zehnerziffer betrachtet.',true,'Die Ziffer rechts der Rundungsstelle entscheidet.'],
  ['Zwischen 7 und 8 liegt keine natürliche Zahl.',true,'7 und 8 sind direkt aufeinanderfolgende natürliche Zahlen.'],
  ['2,5 t sind 250 kg.',false,'2,5 t sind 2500 kg.'],
  ['Ein Tag hat 1440 Minuten.',true,'24 · 60 = 1440.']
 ]),
 r=>{const h=R.int(r,1,5), m=R.int(r,5,55);
     return num('Eine Fahrt dauert '+h+' h '+m+' min. Wie viele Minuten sind das insgesamt?', h*60+m,
       h+' · 60 min = '+(h*60)+' min, dazu '+m+' min ergibt '+(h*60+m)+' min.',{unit:'min'});},
 r=>{const a=R.int(r,120,980), b=R.int(r,120,980);
     return num('Berechne im Kopf: '+(a*10)+' + '+(b*10), (a+b)*10, a+' + '+b+' = '+(a+b)+', also '+((a+b)*10)+'.');},
 r=>{const g=R.int(r,2,9)*1000+R.int(r,100,999), w=R.int(r,2,9)*100;
     return num('Ein Sparschwein enthält '+fmt(g/100,2)+' €. Es werden '+fmt(w/100,2)+' € entnommen. Wie viel bleibt (in €)?',
       fmt((g-w)/100,2), fmt(g/100,2)+' € − '+fmt(w/100,2)+' € = '+fmt((g-w)/100,2)+' €.',{tol:0.005,unit:'€'});},
 r=>{const t=R.int(r,2,9), kg=R.int(r,1,999);
     return num(t+' t '+kg+' kg = ____ kg', t*1000+kg, '1 t = 1000 kg, also '+t+' · 1000 + '+kg+' = '+(t*1000+kg)+' kg.',{unit:'kg'});},
 r=>poolORD(r,[
  ['Ordne die Längeneinheiten von klein nach groß.',['mm','cm','dm','m','km'],'mm < cm < dm < m < km.'],
  ['Ordne die Masseneinheiten von klein nach groß.',['mg','g','kg','t'],'Jede Stufe ist das 1000-fache der vorherigen.'],
  ['Ordne die Zeiteinheiten von kurz nach lang.',['Sekunde','Minute','Stunde','Tag','Woche'],'60 s = 1 min, 60 min = 1 h, 24 h = 1 d, 7 d = 1 Woche.'],
  ['Ordne die Schritte beim Runden auf Hunderter.',['Rundungsstelle (Hunderter) markieren','Ziffer rechts davon ansehen','Bei 0–4 abrunden, bei 5–9 aufrunden','Alle Stellen rechts auf 0 setzen'],'Die Ziffer rechts der Rundungsstelle entscheidet.'],
  ['Ordne die Geldbeträge vom kleinsten zum größten.',['0,95 €','1,09 €','1,90 €','9,10 €'],'Erst Euro, dann Cent vergleichen.']
 ])
]},

{key:'g5-symmetrie', gens:[
 r=>poolMC(r,[
  ['Wie nennt man zwei Geraden, die sich im rechten Winkel schneiden?','orthogonal (senkrecht)',['parallel','identisch','windschief'],'Orthogonal bedeutet: Die Geraden schneiden sich unter 90°.'],
  ['Welches Viereck hat vier rechte Winkel und vier gleich lange Seiten?','Quadrat',['Rechteck','Raute','Parallelogramm'],'Nur das Quadrat hat beides.'],
  ['Welches Dreieck hat drei gleich lange Seiten?','gleichseitiges Dreieck',['gleichschenkliges Dreieck','rechtwinkliges Dreieck','stumpfwinkliges Dreieck'],'Gleichseitig heißt: alle drei Seiten gleich lang.'],
  ['Wie viele Symmetrieachsen hat ein Kreis?','unendlich viele',['1','2','4'],'Jede Gerade durch den Mittelpunkt ist eine Symmetrieachse.'],
  ['Welche Figur ist punktsymmetrisch, aber nicht achsensymmetrisch?','allgemeines Parallelogramm',['Quadrat','Rechteck','gleichschenkliges Dreieck'],'Ein Parallelogramm ist punktsymmetrisch zum Diagonalenschnittpunkt.'],
  ['Wie heißt der Punkt (0|0) im Koordinatensystem?','Ursprung',['Scheitelpunkt','Mittelpunkt','Nullstelle'],'Dort schneiden sich x-Achse und y-Achse.']
 ]),
 r=>poolTF(r,[
  ['Ein Quadrat ist auch ein Parallelogramm.',true,'Gegenüberliegende Seiten sind parallel – das genügt für ein Parallelogramm.'],
  ['Jedes achsensymmetrische Viereck ist ein Quadrat.',false,'Auch Rechteck, Raute und gleichschenkliges Trapez sind achsensymmetrisch.'],
  ['Ein Trapez hat mindestens ein Paar paralleler Seiten.',true,'Das ist die Definition des Trapezes.'],
  ['Senkrechte Geraden haben überall denselben Abstand.',false,'Das gilt für parallele Geraden.'],
  ['Die x-Achse ist die waagerechte Achse im Koordinatensystem.',true,'Die y-Achse verläuft senkrecht dazu.'],
  ['Bei der Achsenspiegelung ändert sich die Größe der Figur.',false,'Spiegelbilder sind deckungsgleich zum Original.'],
  ['Ein Rechteck hat genau zwei Symmetrieachsen.',true,'Die beiden Mittelsenkrechten der Seiten.']
 ]),
 r=>{const x=R.int(r,-8,8)||3, y=R.int(r,-8,8)||4;
     return txt('Der Punkt P('+nz(x)+'|'+nz(y)+') wird an der y-Achse gespiegelt. Gib den Bildpunkt an (Form: (x|y) ).',
       '('+(-x)+'|'+y+')','Bei Spiegelung an der y-Achse wechselt nur die x-Koordinate das Vorzeichen.',[(-x)+'|'+y]);},
 r=>{const a=R.int(r,2,12), b=R.int(r,2,12);
     return num('Ein Rechteck hat die Eckpunkte A(0|0), B('+a+'|0), C('+a+'|'+b+') und D(0|'+b+'). Wie lang ist die Seite AB?', a,
       'Von (0|0) nach ('+a+'|0) sind es '+a+' Einheiten.');},
 r=>{const F=[['Quadrat',4],['Rechteck',4],['Raute',4],['Parallelogramm',4],['Trapez',4],['Dreieck',3],['Fünfeck',5],['Sechseck',6]];
     const f=R.pick(r,F);
     return num('Wie viele Ecken hat ein '+f[0]+'?', f[1], 'Ein '+f[0]+' hat '+f[1]+' Ecken.');},
 r=>poolORD(r,[
  ['Ordne die Schritte für eine Achsenspiegelung.',['Spiegelachse einzeichnen','Vom Punkt das Lot auf die Achse fällen','Abstand zur Achse auf der anderen Seite abtragen','Bildpunkt markieren und Figur verbinden'],'Der Bildpunkt liegt gleich weit von der Achse entfernt wie das Original.'],
  ['Ordne die Figuren nach der Anzahl ihrer Ecken – beginne mit der kleinsten.',['Dreieck (3)','Viereck (4)','Fünfeck (5)','Sechseck (6)'],'Die Vorsilbe nennt die Anzahl der Ecken.'],
  ['Ordne die Schritte beim Eintragen eines Punktes ins Koordinatensystem.',['x-Wert auf der x-Achse suchen','Von dort senkrecht nach oben gehen','y-Wert abzählen','Punkt markieren und beschriften'],'Erst x, dann y – „erst gehen, dann steigen“.']
 ])
]},

{key:'g5-rechnen', gens:[
 r=>poolMC(r,[
  ['Welche Zahl ist eine Primzahl?','23',['21','27','33'],'23 hat nur die Teiler 1 und 23. 21 = 3·7, 27 = 3·9, 33 = 3·11.'],
  ['Welche Zahl ist durch 9 teilbar?','342',['341','343','344'],'Quersumme von 342 ist 9 – also durch 9 teilbar.'],
  ['Wie heißt das Ergebnis einer Division?','Quotient',['Summe','Differenz','Produkt'],'Summe (+), Differenz (−), Produkt (·), Quotient (:).'],
  ['Wie heißt das Ergebnis einer Multiplikation?','Produkt',['Summe','Differenz','Quotient'],'Beim Multiplizieren entsteht das Produkt.'],
  ['Welches Gesetz beschreibt a + b = b + a?','Kommutativgesetz',['Assoziativgesetz','Distributivgesetz','Teilbarkeitsregel'],'Das Vertauschungsgesetz heißt Kommutativgesetz.'],
  ['Welches Gesetz beschreibt a · (b + c) = a·b + a·c?','Distributivgesetz',['Kommutativgesetz','Assoziativgesetz','Potenzgesetz'],'Das Verteilungsgesetz heißt Distributivgesetz.']
 ]),
 r=>poolTF(r,[
  ['Jede gerade Zahl ist durch 2 teilbar.',true,'Das ist die Definition einer geraden Zahl.'],
  ['Die Zahl 1 ist eine Primzahl.',false,'Primzahlen haben genau zwei Teiler; 1 hat nur einen.'],
  ['Die Zahl 2 ist die einzige gerade Primzahl.',true,'Jede andere gerade Zahl ist durch 2 teilbar und hat damit mehr als zwei Teiler.'],
  ['Punktrechnung geht vor Strichrechnung.',true,'Erst · und :, dann + und −.'],
  ['Klammern werden zuletzt berechnet.',false,'Klammern werden zuerst berechnet.'],
  ['Eine Zahl ist durch 6 teilbar, wenn sie durch 2 und durch 3 teilbar ist.',true,'6 = 2 · 3, und 2 und 3 sind teilerfremd.'],
  ['3⁴ bedeutet 3 · 4.',false,'3⁴ bedeutet 3 · 3 · 3 · 3 = 81.']
 ]),
 r=>{const a=R.int(r,11,39), b=R.int(r,11,39), c=R.int(r,2,9);
     return num('Berechne: ('+a+' + '+b+') · '+c, (a+b)*c, 'Klammer zuerst: '+a+' + '+b+' = '+(a+b)+', dann · '+c+' = '+((a+b)*c)+'.');},
 r=>{const n=R.pick(r,[24,36,48,60,72,90,120]);
     const teiler=[]; for(let i=1;i<=n;i++) if(n%i===0) teiler.push(i);
     return num('Wie viele Teiler hat die Zahl '+n+'?', teiler.length, 'Die Teiler sind: '+teiler.join(', ')+' – das sind '+teiler.length+'.');},
 r=>{const a=R.int(r,2,12), b=R.int(r,2,12);
     const g=(x,y)=>{while(y){[x,y]=[y,x%y];}return x;};
     return num('Bestimme das kleinste gemeinsame Vielfache (kgV) von '+a+' und '+b+'.', a*b/g(a,b),
       'kgV = (a · b) : ggT = ('+a+' · '+b+') : '+g(a,b)+' = '+(a*b/g(a,b))+'.');},
 r=>poolORD(r,[
  ['Ordne die Zahlen nach der Anzahl ihrer Teiler – beginne mit der kleinsten Anzahl.',['7 (2 Teiler)','9 (3 Teiler)','8 (4 Teiler)','12 (6 Teiler)'],'7 ist prim, 9 hat 1·3·9, 8 hat 1·2·4·8, 12 hat sechs Teiler.'],
  ['Ordne die Schritte der Primfaktorzerlegung von 60.',['Durch 2 teilen: 60 = 2 · 30','Weiter durch 2: 30 = 2 · 15','Durch 3 teilen: 15 = 3 · 5','Ergebnis: 60 = 2 · 2 · 3 · 5'],'Immer mit der kleinsten Primzahl beginnen.'],
  ['Ordne die Potenzen der Größe nach – beginne mit der kleinsten.',['2³ = 8','3² = 9','2⁴ = 16','5² = 25'],'Werte ausrechnen und vergleichen.']
 ])
]},

{key:'g5-flaechen', gens:[
 r=>poolMC(r,[
  ['Womit berechnet man den Flächeninhalt eines Rechtecks?','A = a · b',['A = 2 · (a + b)','A = a + b','A = a² '],'Länge mal Breite.'],
  ['Womit berechnet man den Umfang eines Rechtecks?','u = 2 · (a + b)',['u = a · b','u = a + b','u = 4 · a'],'Alle vier Seiten zusammen.'],
  ['1 ha entspricht …','10 000 m²',['1 000 m²','100 m²','100 000 m²'],'1 ha = 100 a = 10 000 m².'],
  ['Wie groß ist ein Fußballfeld ungefähr?','etwa 7 000 m²',['etwa 7 000 cm²','etwa 7 000 km²','etwa 7 000 mm²'],'Ein Fußballfeld ist rund 100 m × 70 m groß.'],
  ['Wie verändert sich der Flächeninhalt eines Quadrats, wenn man die Seitenlänge verdoppelt?','Er vervierfacht sich.',['Er verdoppelt sich.','Er verdreifacht sich.','Er bleibt gleich.'],'A = a², aus (2a)² wird 4a².']
 ]),
 r=>poolTF(r,[
  ['Zwei Figuren mit gleichem Umfang haben immer denselben Flächeninhalt.',false,'Ein 1×5-Rechteck und ein 2×4-Rechteck haben beide Umfang 12, aber Flächen 5 und 8.'],
  ['1 m² sind 10 000 cm².',true,'1 m = 100 cm, also 1 m² = 100 · 100 cm² = 10 000 cm².'],
  ['Der Flächeninhalt wird in Zentimetern gemessen.',false,'Flächen werden in Quadrateinheiten gemessen, z. B. cm².'],
  ['Beim Maßstab 1 : 1000 ist die Wirklichkeit 1000-mal so groß wie die Zeichnung.',true,'Die zweite Zahl gibt an, wie oft die Zeichnung in die Wirklichkeit passt.'],
  ['Ein rechtwinkliges Dreieck hat halb so viel Fläche wie das zugehörige Rechteck.',true,'A = (g · h) : 2.'],
  ['1 km² sind 1000 m².',false,'1 km² sind 1 000 000 m².']
 ]),
 r=>{const a=R.int(r,3,20), u=R.int(r,2,9)*2; const b=(u*2-2*a)/2;
     const aa=R.int(r,4,20), U=2*(aa+R.int(r,3,15));
     const bb=U/2-aa;
     return num('Ein Rechteck hat den Umfang '+U+' cm und die Länge '+aa+' cm. Wie breit ist es (in cm)?', bb,
       'b = u : 2 − a = '+(U/2)+' − '+aa+' = '+bb+' cm.',{tol:0.01,unit:'cm'});},
 r=>{const a=R.int(r,3,18); return num('Ein Quadrat hat die Seitenlänge '+a+' cm. Berechne den Flächeninhalt in cm².', a*a,
       'A = a · a = '+a+' · '+a+' = '+(a*a)+' cm².',{unit:'cm²'});},
 r=>{const A=R.int(r,2,15)*R.int(r,2,9); const a=R.pick(r,[2,3,4,5,6].filter(x=>A%x===0))||1;
     return num('Ein Rechteck hat den Flächeninhalt '+A+' cm² und die Länge '+a+' cm. Wie breit ist es (in cm)?', A/a,
       'b = A : a = '+A+' : '+a+' = '+(A/a)+' cm.',{tol:0.01,unit:'cm'});},
 r=>{const m=R.pick(r,[50,100,250,500]); const w=R.int(r,2,40);
     return num('Maßstab 1 : '+m+'. Eine Strecke ist in Wirklichkeit '+w+' m lang. Wie lang ist sie auf der Karte (in cm)?',
       w*100/m, w+' m = '+(w*100)+' cm, geteilt durch '+m+' ergibt '+fmt(w*100/m)+' cm.',{tol:0.01,unit:'cm'});},
 r=>poolORD(r,[
  ['Ordne die Schritte zur Berechnung des Flächeninhalts einer zusammengesetzten Figur.',['Figur in Rechtecke zerlegen','Fehlende Seitenlängen bestimmen','Teilflächen einzeln berechnen','Teilflächen addieren'],'Zerlegungsstrategie.'],
  ['Ordne die Flächen der Größe nach – beginne mit der kleinsten.',['1 cm²','1 dm²','1 m²','1 a'],'1 dm² = 100 cm², 1 m² = 100 dm², 1 a = 100 m².'],
  ['Ordne die Rechtecke nach ihrem Flächeninhalt – beginne mit dem kleinsten.',['2 cm × 6 cm (12 cm²)','4 cm × 5 cm (20 cm²)','3 cm × 8 cm (24 cm²)','5 cm × 6 cm (30 cm²)'],'Jeweils Länge mal Breite rechnen.']
 ])
]},

{key:'g5-koerper', gens:[
 r=>poolMC(r,[
  ['Welcher Körper hat genau eine gekrümmte Fläche und zwei Kreise als Grundflächen?','Zylinder',['Kegel','Kugel','Pyramide'],'Der Zylinder hat zwei kreisförmige Deckflächen.'],
  ['Welcher Körper hat genau eine Spitze und eine quadratische Grundfläche?','quadratische Pyramide',['Kegel','Zylinder','Würfel'],'Die Pyramide läuft in einer Spitze zusammen.'],
  ['Wie viele Flächen hat ein Würfel?','6',['4','8','12'],'Ein Würfel hat sechs quadratische Seitenflächen.'],
  ['Welcher Körper hat gar keine Ecken und keine Kanten?','Kugel',['Zylinder','Kegel','Quader'],'Die Kugel hat eine einzige gekrümmte Oberfläche.'],
  ['1 Liter entspricht …','1 dm³',['1 cm³','1 m³','1 mm³'],'1 l = 1 dm³ = 1000 cm³.'],
  ['Wie heißt die aufgeklappte Oberfläche eines Körpers?','Netz',['Schrägbild','Grundriss','Diagonale'],'Das Netz zeigt alle Flächen nebeneinander.']
 ]),
 r=>poolTF(r,[
  ['Ein Würfel ist ein besonderer Quader.',true,'Ein Quader mit lauter gleich langen Kanten ist ein Würfel.'],
  ['Das Volumen wird in Quadratzentimetern gemessen.',false,'Volumen misst man in Kubikeinheiten, z. B. cm³.'],
  ['1 m³ sind 1000 Liter.',true,'1 m³ = 1000 dm³ = 1000 l.'],
  ['Ein Schrägbild zeigt einen Körper räumlich.',true,'Beim Netz liegen dagegen alle Flächen in einer Ebene.'],
  ['Jedes Netz aus sechs Quadraten lässt sich zu einem Würfel falten.',false,'Es gibt genau elf gültige Würfelnetze; andere Anordnungen funktionieren nicht.'],
  ['Ein Quader hat immer 12 Kanten.',true,'Je vier Kanten in den drei Raumrichtungen.']
 ]),
 r=>{const a=R.int(r,2,12); return num('Berechne das Volumen eines Würfels mit der Kantenlänge '+a+' cm (in cm³).', a*a*a,
       'V = a³ = '+a+' · '+a+' · '+a+' = '+(a*a*a)+' cm³.',{unit:'cm³'});},
 r=>{const a=R.int(r,2,12); return num('Berechne den Oberflächeninhalt eines Würfels mit der Kantenlänge '+a+' cm (in cm²).', 6*a*a,
       'O = 6 · a² = 6 · '+(a*a)+' = '+(6*a*a)+' cm².',{unit:'cm²'});},
 r=>{const a=R.int(r,2,10); return num('Wie lang ist die gesamte Kantenlänge eines Würfels mit der Kantenlänge '+a+' cm (in cm)?', 12*a,
       'Ein Würfel hat 12 Kanten: 12 · '+a+' = '+(12*a)+' cm.',{unit:'cm'});},
 r=>{const n=R.int(r,2,50); return num(n+' Liter = ____ cm³', n*1000, '1 l = 1 dm³ = 1000 cm³, also '+n+' · 1000 = '+(n*1000)+' cm³.',{unit:'cm³'});},
 r=>poolORD(r,[
  ['Ordne die Körper nach der Anzahl ihrer Ecken – beginne mit der kleinsten Anzahl.',['Kugel (0)','Kegel (1)','quadratische Pyramide (5)','Würfel (8)'],'Die Kugel hat keine Ecke, der Kegel genau eine.'],
  ['Ordne die Volumeneinheiten von klein nach groß.',['mm³','cm³','dm³','m³'],'Jede Stufe ist das 1000-fache der vorherigen.'],
  ['Ordne die Schritte zur Berechnung des Quadervolumens.',['Kantenlängen in dieselbe Einheit bringen','Länge mal Breite rechnen','Ergebnis mal Höhe rechnen','Einheit in Kubikeinheiten angeben'],'V = a · b · c.']
 ])
]},

{key:'g5-brueche', gens:[
 r=>poolMC(r,[
  ['Wie nennt man die Zahl unter dem Bruchstrich?','Nenner',['Zähler','Bruchstrich','Rest'],'Der Nenner gibt an, in wie viele Teile das Ganze geteilt wird.'],
  ['Wie nennt man die Zahl über dem Bruchstrich?','Zähler',['Nenner','Divisor','Faktor'],'Der Zähler gibt an, wie viele Teile gemeint sind.'],
  ['Welcher Bruch ist größer als 1?','7/5',['4/5','5/5','3/7'],'Bei 7/5 ist der Zähler größer als der Nenner.'],
  ['Welcher Bruch lässt sich noch kürzen?','6/8',['5/8','7/9','3/7'],'6/8 lässt sich durch 2 kürzen zu 3/4.'],
  ['Welcher Bruch entspricht einem Ganzen?','9/9',['9/10','10/9','1/9'],'Zähler und Nenner sind gleich.'],
  ['Wie viel ist die Hälfte von einem Viertel?','1/8',['1/2','1/6','2/4'],'1/4 : 2 = 1/8.']
 ]),
 r=>poolTF(r,[
  ['Beim Kürzen wird der Wert eines Bruchs kleiner.',false,'Kürzen ändert nur die Darstellung, nicht den Wert.'],
  ['1/2 ist größer als 1/3.',true,'Je größer der Nenner, desto kleiner die Teile.'],
  ['Ein Bruch mit gleichem Zähler und Nenner hat den Wert 1.',true,'Zum Beispiel 5/5 = 1.'],
  ['3/4 sind mehr als 70 %.',true,'3/4 = 75 %.'],
  ['Brüche mit gleichem Nenner vergleicht man über die Zähler.',true,'Bei gleichem Nenner ist der Bruch mit dem größeren Zähler größer.'],
  ['2/3 und 4/6 sind verschieden große Brüche.',false,'4/6 lässt sich zu 2/3 kürzen – beide sind gleich groß.']
 ]),
 r=>{const n=R.pick(r,[4,5,8,10,20,25]); const z=R.int(r,1,n-1);
     return num('Wie viel Prozent sind '+z+'/'+n+'?', Math.round(z/n*10000)/100,
       z+' : '+n+' = '+fmt(z/n)+' = '+fmt(z/n*100)+' %.',{tol:0.02,unit:'%'});},
 r=>{const g=R.pick(r,[24,36,48,60,120]); const n=R.pick(r,[2,3,4,6]); const z=R.int(r,1,n-1);
     return num('Eine Klasse hat '+g+' Stifte. '+z+'/'+n+' davon sind blau. Wie viele sind blau?', g/n*z,
       g+' : '+n+' = '+(g/n)+', mal '+z+' ergibt '+(g/n*z)+'.');},
 r=>{const n=R.pick(r,[6,8,10,12]); const z=R.int(r,1,n-1);
     return txt('Welcher Bruch ergänzt '+z+'/'+n+' zu einem Ganzen? (Form: z/n)', fracStr(n-z,n),
       z+'/'+n+' + '+(n-z)+'/'+n+' = '+n+'/'+n+' = 1.');},
 r=>poolORD(r,[
  ['Ordne die Anteile der Größe nach – beginne mit dem kleinsten.',['ein Achtel','ein Viertel','ein Drittel','die Hälfte'],'1/8 < 1/4 < 1/3 < 1/2.'],
  ['Ordne die Schritte beim Kürzen eines Bruchs.',['Gemeinsamen Teiler von Zähler und Nenner suchen','Zähler durch den Teiler teilen','Nenner durch denselben Teiler teilen','Prüfen, ob weiter gekürzt werden kann'],'Vollständig gekürzt ist ein Bruch, wenn Zähler und Nenner teilerfremd sind.'],
  ['Ordne die Prozentangaben ihren Brüchen nach aufsteigend zu.',['1/10 = 10 %','1/4 = 25 %','1/2 = 50 %','3/4 = 75 %'],'Bruch in Dezimalzahl umwandeln und mal 100 rechnen.']
 ])
]}
];
