/* Erweiterung Jahrgang 6 */
import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr, nz, klammer, term, plusZahl, plusTerm} from './bank-core.js';
const poolTF = (r,L)=>{const s=R.pick(r,L); return tf(s[0],s[1],s[2]);};
const poolMC = (r,L)=>{const s=R.pick(r,L); return mc(s[0],s[1],s[2],s[3],r);};
const poolORD= (r,L)=>{const s=R.pick(r,L); return ord(s[0],s[1],s[2],r);};

export default [
{key:'g6-brueche', gens:[
 r=>poolMC(r,[
  ['Welcher Bruch ist am größten?','5/6',['2/3','3/4','4/5'],'Als Dezimalzahl: 0,833 gegenüber 0,667, 0,75 und 0,8.'],
  ['Welcher Bruch ist vollständig gekürzt?','7/12',['6/8','9/12','10/15'],'7 und 12 haben keinen gemeinsamen Teiler außer 1.'],
  ['Womit muss man 3/5 erweitern, um 12/20 zu erhalten?','mit 4',['mit 2','mit 3','mit 5'],'3 · 4 = 12 und 5 · 4 = 20.'],
  ['Welcher Anteil entspricht 40 %?','2/5',['1/4','3/8','4/5'],'2 : 5 = 0,4 = 40 %.'],
  ['Wie heißt ein Bruch, dessen Zähler größer ist als der Nenner?','unechter Bruch',['echter Bruch','Stammbruch','Kehrbruch'],'Unechte Brüche sind größer als 1.'],
  ['Was ist der Kehrbruch von 3/7?','7/3',['3/7','-3/7','1/21'],'Zähler und Nenner tauschen.']
 ]),
 r=>poolTF(r,[
  ['Jeder Stammbruch hat den Zähler 1.',true,'Stammbrüche sind 1/2, 1/3, 1/4 und so weiter.'],
  ['Erweitern und Kürzen ändern den Wert eines Bruchs.',false,'Beides ändert nur die Darstellung.'],
  ['5/4 ist kleiner als 1.',false,'Der Zähler ist größer als der Nenner, also ist der Bruch größer als 1.'],
  ['Zum Vergleichen ungleichnamiger Brüche bringt man sie auf einen gemeinsamen Nenner.',true,'Alternativ wandelt man sie in Dezimalzahlen um.'],
  ['1/3 lässt sich als endliche Dezimalzahl schreiben.',false,'1/3 = 0,333… ist periodisch.'],
  ['Der Hauptnenner ist immer das Produkt der beiden Nenner.',false,'Oft genügt das kleinste gemeinsame Vielfache, z. B. bei 1/4 und 1/6 ist es 12, nicht 24.']
 ]),
 r=>{const n=R.pick(r,[6,8,9,10,12,15,16,18,20,24]); const z=R.int(r,1,n-1); const g=gcd(z,n);
     return num('Durch welche größte Zahl lässt sich '+z+'/'+n+' kürzen? (1, falls gar nicht)', g,
       'Der größte gemeinsame Teiler von '+z+' und '+n+' ist '+g+'.');},
 r=>{const n1=R.pick(r,[2,3,4,5,6]), n2=R.pick(r,[2,3,4,5,6,8,9,10].filter(x=>x!==n1));
     return num('Wie lautet der Hauptnenner von 1/'+n1+' und 1/'+n2+'?', n1*n2/gcd(n1,n2),
       'Das kleinste gemeinsame Vielfache von '+n1+' und '+n2+' ist '+(n1*n2/gcd(n1,n2))+'.');},
 r=>{const g=R.pick(r,[60,90,120,180,240,360]); const n=R.pick(r,[3,4,5,6]); const z=R.int(r,1,n-1);
     return num(z+'/'+n+' einer Stunde sind wie viele Minuten?', 60/n*z,
       '60 min : '+n+' = '+(60/n)+' min, mal '+z+' ergibt '+(60/n*z)+' min.',{unit:'min'});},
 r=>poolORD(r,[
  ['Ordne die Brüche der Größe nach – beginne mit dem kleinsten.',['1/5','1/3','2/5','3/5'],'Gemeinsamer Nenner 15: 3/15, 5/15, 6/15, 9/15.'],
  ['Ordne die Anteile der Größe nach – beginne mit dem kleinsten.',['25 %','1/3','0,5','3/4'],'0,25 < 0,333 < 0,5 < 0,75.'],
  ['Ordne die Schritte beim Vergleichen ungleichnamiger Brüche.',['Hauptnenner bestimmen','Beide Brüche erweitern','Zähler vergleichen','Ergebnis mit < oder > aufschreiben'],'Gleichnamig machen, dann Zähler vergleichen.']
 ])
]},

{key:'g6-dezimal', gens:[
 r=>poolMC(r,[
  ['Welche Dezimalzahl ist am größten?','0,409',['0,0999','0,4','0,39'],'Stellenweise vergleichen: 0,409 > 0,4 > 0,39 > 0,0999.'],
  ['Wie schreibt man 3/100 als Dezimalzahl?','0,03',['0,3','3,0','0,003'],'Hundertstel stehen an der zweiten Stelle nach dem Komma.'],
  ['Welche Zahl ergibt gerundet auf Zehntel den Wert 2,4?','2,43',['2,45','2,36','2,5'],'2,43 rundet ab auf 2,4; 2,45 rundet auf 2,5 auf.'],
  ['Welcher Bruch ergibt eine periodische Dezimalzahl?','1/6',['1/8','3/4','7/10'],'1/6 = 0,1666…; die anderen brechen ab.'],
  ['Wie heißt die erste Stelle nach dem Komma?','Zehntel',['Hundertstel','Einer','Tausendstel'],'Danach folgen Hundertstel und Tausendstel.'],
  ['0,7 entspricht …','70 %',['7 %','0,7 %','700 %'],'0,7 = 70/100 = 70 %.']
 ]),
 r=>poolTF(r,[
  ['0,5 und 0,50 sind gleich groß.',true,'Angehängte Nullen ändern den Wert nicht.'],
  ['Je mehr Nachkommastellen, desto größer die Zahl.',false,'0,9 ist größer als 0,1234.'],
  ['Jede Dezimalzahl lässt sich als Bruch schreiben.',false,'Nur abbrechende und periodische Dezimalzahlen; π zum Beispiel nicht.'],
  ['Beim Runden auf Hundertstel schaut man auf die Tausendstelstelle.',true,'Die Ziffer rechts der Rundungsstelle entscheidet.'],
  ['1,20 € sind 120 Cent.',true,'1 € = 100 ct, dazu 20 ct.'],
  ['0,25 ist das Gleiche wie 1/4.',true,'1 : 4 = 0,25.']
 ]),
 r=>{const n=R.int(r,1,999); return num(n+' cm = ____ m (als Dezimalzahl)', fmt(n/100,2),
       '1 cm = 0,01 m, also '+n+' : 100 = '+fmt(n/100,2)+' m.',{tol:0.0005,unit:'m'});},
 r=>{const z=R.int(r,1,99); return txt('Schreibe '+z+'/100 als Dezimalzahl.', fmt(z/100,2),
       z+' : 100 = '+fmt(z/100,2)+'.',[String(z/100)]);},
 r=>{const v=R.int(r,1000,99999)/1000; return num('Runde '+fmt(v,3)+' auf eine Nachkommastelle.',
       Math.round(v*10)/10, 'Die Hundertstelstelle entscheidet: '+fmt(Math.round(v*10)/10,1)+'.',{tol:0.0005});},
 r=>poolORD(r,[
  ['Ordne die Zahlen der Größe nach – beginne mit der kleinsten.',['0,089','0,098','0,8','0,98'],'Stellenweise vergleichen.'],
  ['Ordne die Werte der Größe nach – beginne mit dem kleinsten.',['1/5 = 0,2','1/4 = 0,25','1/2 = 0,5','3/4 = 0,75'],'Brüche in Dezimalzahlen umwandeln und vergleichen.'],
  ['Ordne die Schritte beim Umwandeln eines Bruchs in eine Dezimalzahl.',['Zähler durch Nenner teilen','Schriftliche Division durchführen','Rest weiterrechnen oder Periode erkennen','Ergebnis mit Komma aufschreiben'],'Bruchstrich bedeutet Division.']
 ])
]},

{key:'g6-addsub', gens:[
 r=>poolMC(r,[
  ['Was muss man tun, bevor man 1/3 und 1/4 addiert?','gleichnamig machen',['die Zähler addieren','die Nenner addieren','kürzen'],'Erst auf den Hauptnenner 12 bringen.'],
  ['Wie viel ist 1/2 + 1/2?','1',['2/4','1/4','2/2 ist kein Ganzes'],'2/2 = 1.'],
  ['Welche Rechnung ergibt 3/4?','1/2 + 1/4',['1/2 + 1/2','1/4 + 1/4','1/3 + 1/4'],'1/2 = 2/4, plus 1/4 ergibt 3/4.'],
  ['Wie addiert man Dezimalzahlen schriftlich richtig?','Komma unter Komma schreiben',['rechtsbündig schreiben','linksbündig schreiben','ohne Komma rechnen'],'Gleiche Stellenwerte müssen untereinanderstehen.'],
  ['Wie viel ist 1 − 0,4?','0,6',['0,4','1,4','0,96'],'1,0 − 0,4 = 0,6.']
 ]),
 r=>poolTF(r,[
  ['Beim Addieren gleichnamiger Brüche addiert man auch die Nenner.',false,'Nur die Zähler werden addiert, der Nenner bleibt.'],
  ['2/5 + 1/5 = 3/5',true,'Gleicher Nenner, Zähler addieren.'],
  ['0,3 + 0,7 = 1',true,'Drei Zehntel plus sieben Zehntel ergeben zehn Zehntel.'],
  ['Beim schriftlichen Subtrahieren darf man Nullen anhängen.',true,'0,5 lässt sich als 0,50 schreiben, um die Stellen anzugleichen.'],
  ['1/2 + 1/3 = 2/5',false,'Richtig ist 3/6 + 2/6 = 5/6.'],
  ['Das Ergebnis einer Subtraktion heißt Differenz.',true,'Summe, Differenz, Produkt, Quotient.']
 ]),
 r=>{const n=R.pick(r,[6,8,10,12]); const a=R.int(r,2,n-1), b=R.int(r,1,a-1);
     return txt('Berechne: '+a+'/'+n+' − '+b+'/'+n+' (vollständig gekürzt, Form z/n)', fracStr(a-b,n),
       'Gleicher Nenner: Zähler subtrahieren → '+(a-b)+'/'+n+' = '+fracStr(a-b,n)+'.');},
 r=>{const a=R.int(r,100,999)/10, b=R.int(r,100,999)/10;
     return num('Berechne: '+fmt(a,1)+' + '+fmt(b,1), fmt(a+b,1), 'Komma unter Komma: '+fmt(a+b,1)+'.',{tol:0.005});},
 r=>{const ganz=R.int(r,2,9), n=R.pick(r,[2,4,5,10]), z=R.int(r,1,n-1);
     return num('Wie viel fehlt von '+ganz+' '+z+'/'+n+' bis '+(ganz+1)+'? (als Dezimalzahl)',
       fmt(1-z/n,2), '1 − '+z+'/'+n+' = '+fmt(1-z/n,2)+'.',{tol:0.005});},
 r=>poolORD(r,[
  ['Ordne die Schritte beim schriftlichen Addieren von Dezimalzahlen.',['Zahlen mit Komma unter Komma schreiben','Fehlende Stellen mit Nullen auffüllen','Von rechts nach links addieren','Komma ins Ergebnis übernehmen'],'Die Stellenwerte müssen übereinstimmen.'],
  ['Ordne die Ergebnisse der Größe nach – beginne mit dem kleinsten.',['1/4 + 1/4 = 1/2','1/2 + 1/4 = 3/4','1/2 + 1/2 = 1','3/4 + 1/2 = 5/4'],'Jeweils ausrechnen und vergleichen.'],
  ['Ordne die Schritte beim Addieren ungleichnamiger Brüche.',['Hauptnenner bestimmen','Beide Brüche erweitern','Zähler addieren','Ergebnis kürzen'],'Erst gleichnamig, dann addieren.']
 ])
]},

{key:'g6-muster', gens:[
 r=>poolMC(r,[
  ['Wie viel Grad hat ein Vollwinkel?','360°',['180°','90°','270°'],'Eine ganze Drehung sind 360°.'],
  ['Womit misst man Winkel?','Geodreieck',['Zirkel','Lineal','Maßband'],'Das Geodreieck hat eine Winkelskala.'],
  ['Welcher Punkt liegt im zweiten Quadranten?','(−3|4)',['(3|4)','(3|−4)','(−3|−4)'],'Im zweiten Quadranten ist x negativ und y positiv.'],
  ['Wie heißt eine Strecke vom Kreismittelpunkt zum Rand?','Radius',['Durchmesser','Sehne','Tangente'],'Der Durchmesser ist doppelt so lang wie der Radius.'],
  ['Welche Zahl ist am kleinsten?','−8',['−3','0','2'],'Je weiter links auf der Zahlengeraden, desto kleiner.'],
  ['Wie nennt man einen Winkel von genau 180°?','gestreckter Winkel',['rechter Winkel','stumpfer Winkel','Vollwinkel'],'Die Schenkel bilden eine Gerade.']
 ]),
 r=>poolTF(r,[
  ['Der Durchmesser eines Kreises ist doppelt so lang wie der Radius.',true,'d = 2 · r.'],
  ['−5 ist größer als −2.',false,'−5 liegt weiter links auf der Zahlengeraden.'],
  ['Ein stumpfer Winkel ist größer als 90°.',true,'Er liegt zwischen 90° und 180°.'],
  ['Bei einer Verschiebung ändert sich die Form der Figur.',false,'Verschiebungen sind deckungsgleiche Abbildungen.'],
  ['Alle Punkte eines Kreises haben denselben Abstand zum Mittelpunkt.',true,'Das ist die Definition des Kreises.'],
  ['Der Punkt (0|−4) liegt auf der y-Achse.',true,'Alle Punkte mit x = 0 liegen auf der y-Achse.']
 ]),
 r=>{const r1=R.int(r,2,25); return num('Ein Kreis hat den Radius '+r1+' cm. Wie lang ist der Durchmesser (in cm)?', 2*r1,
       'd = 2 · r = 2 · '+r1+' = '+(2*r1)+' cm.',{unit:'cm'});},
 r=>{const a=R.int(r,10,80); return num('Zwei Winkel ergänzen sich zu 90°. Einer misst '+a+'°. Wie groß ist der andere?', 90-a,
       '90° − '+a+'° = '+(90-a)+'°.',{unit:'°'});},
 r=>{const a=R.int(r,-15,-1), b=R.int(r,1,15);
     return num('Wie groß ist der Abstand von '+nz(a)+' und '+b+' auf der Zahlengeraden?', b-a,
       'Von '+nz(a)+' bis 0 sind es '+(-a)+' Schritte, von 0 bis '+b+' noch '+b+' – zusammen '+(b-a)+'.');},
 r=>poolORD(r,[
  ['Ordne die Winkelarten nach ihrer Größe – beginne mit der kleinsten.',['spitzer Winkel','rechter Winkel','stumpfer Winkel','gestreckter Winkel'],'< 90°, = 90°, 90°–180°, = 180°.'],
  ['Ordne die Temperaturen von kalt nach warm.',['−12 °C','−5 °C','0 °C','7 °C'],'Negative Zahlen liegen links der Null.'],
  ['Ordne die Schritte beim Zeichnen eines Winkels mit dem Geodreieck.',['Scheitelpunkt festlegen','Einen Schenkel zeichnen','Geodreieck am Scheitelpunkt anlegen','Gradzahl abtragen und zweiten Schenkel ziehen'],'Nullpunkt des Geodreiecks auf den Scheitelpunkt.']
 ])
]},

{key:'g6-multdiv', gens:[
 r=>poolMC(r,[
  ['Wie dividiert man durch einen Bruch?','Man multipliziert mit dem Kehrbruch.',['Man multipliziert mit dem Bruch.','Man addiert den Kehrbruch.','Man kürzt beide Brüche.'],'a : (b/c) = a · (c/b).'],
  ['Was passiert beim Multiplizieren mit 0,1?','Das Komma wandert eine Stelle nach links.',['Das Komma wandert eine Stelle nach rechts.','Die Zahl verdoppelt sich.','Die Zahl bleibt gleich.'],'Mal 0,1 ist dasselbe wie geteilt durch 10.'],
  ['Wie viel ist 1/2 · 1/2?','1/4',['1','2/4 ist mehr als 1/2','1/2'],'Die Hälfte der Hälfte ist ein Viertel.'],
  ['Welches Ergebnis ist größer als 5?','5 : 0,5',['5 · 0,5','5 : 2','5 · 0,1'],'Teilen durch eine Zahl kleiner als 1 vergrößert: 5 : 0,5 = 10.'],
  ['Wie heißt die Zahl, durch die geteilt wird?','Divisor',['Dividend','Quotient','Faktor'],'Dividend : Divisor = Quotient.']
 ]),
 r=>poolTF(r,[
  ['Multiplizieren macht eine Zahl immer größer.',false,'Mal 0,5 halbiert die Zahl.'],
  ['Dividieren durch 0,5 verdoppelt die Zahl.',true,'Geteilt durch die Hälfte ist mal 2.'],
  ['Beim Multiplizieren zweier Brüche multipliziert man Zähler mal Zähler und Nenner mal Nenner.',true,'So lautet die Regel.'],
  ['3/4 · 4/3 ergibt 1.',true,'Ein Bruch mal sein Kehrbruch ergibt immer 1.'],
  ['Man darf durch 0 teilen.',false,'Die Division durch 0 ist nicht definiert.'],
  ['0,2 · 0,3 = 0,6',false,'Richtig ist 0,06 – zwei Nachkommastellen plus eine ergeben drei.']
 ]),
 r=>{const a=R.int(r,2,9), b=R.int(r,2,9);
     return txt('Berechne: '+a+'/'+b+' · '+b+'/'+a+' (Form: z/n oder ganze Zahl)','1',
       'Ein Bruch mal sein Kehrbruch ergibt 1.',['1/1']);},
 r=>{const v=R.int(r,11,99)/10, f=R.pick(r,[0.1,0.01,10,100]);
     return num('Berechne: '+fmt(v,1)+' · '+fmt(f), fmt(Math.round(v*f*1000)/1000),
       'Das Komma verschiebt sich entsprechend: '+fmt(Math.round(v*f*1000)/1000)+'.',{tol:0.0005});},
 r=>{const n=R.pick(r,[2,4,5,8,10]), g=R.pick(r,[120,180,240,360,600]);
     return num(g+' g werden auf '+n+' gleich große Portionen verteilt. Wie viel wiegt eine Portion (in g)?', g/n,
       g+' : '+n+' = '+(g/n)+' g.',{unit:'g'});},
 r=>poolORD(r,[
  ['Ordne die Ergebnisse der Größe nach – beginne mit dem kleinsten.',['8 · 0,1 = 0,8','8 : 4 = 2','8 · 0,5 = 4','8 : 0,5 = 16'],'Mal einer Zahl unter 1 verkleinert, geteilt durch eine Zahl unter 1 vergrößert.'],
  ['Ordne die Schritte beim Dividieren durch einen Bruch.',['Kehrbruch des Divisors bilden','Aus der Division eine Multiplikation machen','Zähler mal Zähler, Nenner mal Nenner','Ergebnis kürzen'],'a : (b/c) = a · (c/b).'],
  ['Ordne die Schritte beim Multiplizieren von Dezimalzahlen.',['Kommas weglassen und wie natürliche Zahlen rechnen','Nachkommastellen beider Faktoren zählen','Genauso viele Stellen im Ergebnis abtrennen','Komma setzen'],'Die Anzahl der Nachkommastellen addiert sich.']
 ])
]},

{key:'g6-daten', gens:[
 r=>poolMC(r,[
  ['Was gibt das arithmetische Mittel an?','den Durchschnitt aller Werte',['den häufigsten Wert','den mittleren Wert der sortierten Liste','die Differenz von größtem und kleinstem Wert'],'Summe aller Werte geteilt durch ihre Anzahl.'],
  ['Was ist der Median?','der mittlere Wert der sortierten Liste',['der Durchschnitt','der häufigste Wert','der größte Wert'],'Bei gerader Anzahl das Mittel der beiden mittleren Werte.'],
  ['Welche Kenngröße reagiert am stärksten auf einen Ausreißer?','das arithmetische Mittel',['der Median','die Spannweite ist unabhängig','der häufigste Wert'],'Ein sehr großer Wert zieht den Durchschnitt nach oben.'],
  ['Wofür eignet sich ein Kreisdiagramm besonders?','für Anteile an einem Ganzen',['für zeitliche Verläufe','für sehr große Zahlen','für Messreihen'],'Der Vollkreis steht für 100 %.'],
  ['Was zeigt die Spannweite?','die Differenz zwischen größtem und kleinstem Wert',['den Durchschnitt','die Anzahl der Werte','den mittleren Wert'],'Spannweite = Maximum − Minimum.'],
  ['Wie heißt die ungeordnete Liste aller erhobenen Werte?','Urliste',['Strichliste','Häufigkeitstabelle','Rangliste'],'Aus der Urliste entsteht die Strichliste.']
 ]),
 r=>poolTF(r,[
  ['Die relative Häufigkeit liegt immer zwischen 0 und 1.',true,'Sie ist ein Anteil am Ganzen.'],
  ['Die Summe aller relativen Häufigkeiten ergibt 1.',true,'Das entspricht 100 %.'],
  ['Der Median muss einer der erhobenen Werte sein.',false,'Bei gerader Anzahl ist er das Mittel der beiden mittleren Werte.'],
  ['Ein Säulendiagramm eignet sich zum Vergleich von Häufigkeiten.',true,'Die Säulenhöhe zeigt die Häufigkeit.'],
  ['Die absolute Häufigkeit gibt an, wie oft ein Wert vorkommt.',true,'Die relative Häufigkeit setzt sie ins Verhältnis zur Gesamtzahl.'],
  ['Beim Kreisdiagramm entsprechen 25 % einem Winkel von 90°.',true,'360° · 0,25 = 90°.']
 ]),
 r=>{const p=R.pick(r,[10,20,25,40,50,75]); return num('Wie groß ist der Mittelpunktswinkel für '+p+' % im Kreisdiagramm?',
       360*p/100, '360° · '+p+'/100 = '+(360*p/100)+'°.',{unit:'°'});},
 r=>{const d=R.sample(r,[3,5,7,8,11,13,16,19],6); const s=d.reduce((a,b)=>a+b,0);
     return num('Berechne das arithmetische Mittel von '+d.join('; ')+'.', Math.round(s/d.length*100)/100,
       'Summe '+s+' : '+d.length+' = '+fmt(s/d.length)+'.',{tol:0.01});},
 r=>{const n=R.pick(r,[20,25,40,50]); const k=R.int(r,1,n-1);
     return num('Von '+n+' Befragten antworten '+k+' mit Ja. Wie groß ist die relative Häufigkeit in Prozent?',
       Math.round(k/n*10000)/100, k+' : '+n+' = '+fmt(k/n)+' = '+fmt(k/n*100)+' %.',{tol:0.02,unit:'%'});},
 r=>poolORD(r,[
  ['Ordne die Schritte einer Datenerhebung.',['Fragestellung festlegen','Daten erheben','Urliste in eine Strichliste übertragen','Diagramm zeichnen und auswerten'],'Planen, erheben, ordnen, darstellen.'],
  ['Ordne die Schritte zur Bestimmung des Medians.',['Werte der Größe nach sortieren','Anzahl der Werte bestimmen','Mittlere Position suchen','Wert dort ablesen'],'Bei gerader Anzahl das Mittel der beiden mittleren Werte bilden.'],
  ['Ordne die Kenngrößen der Werte 2; 4; 4; 10 – beginne mit der kleinsten.',['Minimum (2)','Median (4)','arithmetisches Mittel (5)','Spannweite (8)'],'Median 4, Mittel (2+4+4+10):4 = 5, Spannweite 10−2 = 8.']
 ])
]},

{key:'g6-beziehungen', gens:[
 r=>poolMC(r,[
  ['Was ist eine Variable?','ein Platzhalter für eine Zahl',['eine feste Zahl','ein Rechenzeichen','eine Einheit'],'Variablen stehen für veränderliche Werte.'],
  ['Welcher Term beschreibt „das Dreifache einer Zahl, vermindert um 5“?','3x − 5',['3 − 5x','x/3 − 5','3(x − 5)'],'Dreifach heißt mal 3, vermindert heißt minus.'],
  ['Welcher Term beschreibt „die Summe aus einer Zahl und ihrem Doppelten“?','x + 2x',['x · 2x','x + 2','2 + x'],'Das Doppelte von x ist 2x.'],
  ['Wie nennt man eine Zuordnung, bei der die doppelte Menge auch den doppelten Preis kostet?','proportional',['antiproportional','konstant','zufällig'],'Verdoppeln der einen Größe verdoppelt die andere.'],
  ['Welche Zahlenfolge ist richtig fortgesetzt: 1; 4; 9; 16; …?','25',['20','24','32'],'Das sind die Quadratzahlen: 5² = 25.'],
  ['Wie viele Streichhölzer braucht man für 5 Quadrate in einer Reihe (erstes 4, jedes weitere 3)?','16',['15','17','20'],'4 + 4 · 3 = 16.']
 ]),
 r=>poolTF(r,[
  ['In einem Term darf dieselbe Variable mehrfach vorkommen.',true,'Zum Beispiel in 2x + 3x.'],
  ['2x bedeutet 2 + x.',false,'2x bedeutet 2 · x.'],
  ['Beim Dreisatz rechnet man zuerst auf die Einheit zurück.',true,'Erst durch die gegebene Anzahl teilen, dann hochrechnen.'],
  ['Bei einer antiproportionalen Zuordnung ist das Produkt der zusammengehörigen Werte konstant.',true,'Produktgleichheit.'],
  ['Der Graph einer proportionalen Zuordnung ist eine Gerade durch den Ursprung.',true,'y = k · x geht durch (0|0).'],
  ['Zahlenfolgen müssen immer um denselben Wert wachsen.',false,'Es gibt auch Folgen mit konstantem Faktor oder anderen Mustern.']
 ]),
 r=>{const a=R.int(r,2,9), b=R.int(r,1,15), x=R.int(r,2,12);
     return num('Berechne den Wert des Terms '+a+'x − '+b+' für x = '+x+'.', a*x-b,
       a+' · '+x+' − '+b+' = '+(a*x)+' − '+b+' = '+(a*x-b)+'.');},
 r=>{const start=R.int(r,2,9), f=R.pick(r,[2,3]);
     const folge=[start,start*f,start*f*f,start*f*f*f];
     return num('Setze fort: '+folge.join('; ')+'; ___', folge[3]*f,
       'Jede Zahl wird mit '+f+' multipliziert: '+folge[3]+' · '+f+' = '+(folge[3]*f)+'.');},
 r=>{const arb=R.int(r,2,8), std=R.int(r,4,24); const prod=arb*std;
     const neu=R.pick(r,[2,3,4,6].filter(x=>prod%x===0 && x!==arb))||2;
     return num(arb+' Personen brauchen '+std+' Stunden. Wie lange brauchen '+neu+' Personen (antiproportional, in Stunden)?',
       prod/neu, 'Produktgleichheit: '+arb+' · '+std+' = '+prod+'; '+prod+' : '+neu+' = '+fmt(prod/neu)+' h.',{tol:0.02,unit:'h'});},
 r=>poolORD(r,[
  ['Ordne die Schritte des Dreisatzes bei einer proportionalen Zuordnung.',['Gegebene Werte aufschreiben','Durch die gegebene Anzahl teilen (auf 1 zurück)','Mit der gesuchten Anzahl multiplizieren','Antwortsatz mit Einheit schreiben'],'Erst auf eins, dann hoch.'],
  ['Ordne die Folgenglieder von 2; 4; 8; 16 nach ihrer Entstehung.',['2 (Startwert)','4 = 2 · 2','8 = 4 · 2','16 = 8 · 2'],'Jedes Glied ist das Doppelte des vorherigen.'],
  ['Ordne die Termwerte von 3x + 1 für aufsteigende x-Werte.',['x = 0 → 1','x = 1 → 4','x = 2 → 7','x = 3 → 10'],'Jeder Schritt erhöht den Wert um 3.']
 ])
]}
];
