/* Erweiterung Jahrgang 7 */
import {mc,tf,num,txt,ord,nearNums,R,fmt,gcd,fracStr, nz, klammer, term, plusZahl, plusTerm} from './bank-core.js';
const poolTF = (r,L)=>{const s=R.pick(r,L); return tf(s[0],s[1],s[2]);};
const poolMC = (r,L)=>{const s=R.pick(r,L); return mc(s[0],s[1],s[2],s[3],r);};
const poolORD= (r,L)=>{const s=R.pick(r,L); return ord(s[0],s[1],s[2],r);};

export default [
{key:'g7-rational', gens:[
 r=>poolMC(r,[
  ['Welches Ergebnis ist negativ?','(−3) · 4',['(−3) · (−4)','3 · 4','(−12) : (−3)'],'Verschiedene Vorzeichen ergeben ein negatives Produkt.'],
  ['Wie heißt die Gegenzahl von −7?','7',['−7','1/7','0'],'Gegenzahlen ergänzen sich zu 0.'],
  ['Welche Zahl liegt zwischen −3 und −2?','−2,5',['−3,5','−1,5','2,5'],'−2,5 liegt auf der Zahlengeraden dazwischen.'],
  ['Was ergibt (−1) · (−1) · (−1)?','−1',['1','3','−3'],'Drei negative Faktoren ergeben ein negatives Produkt.'],
  ['Welcher Betrag ist am größten?','|−9|',['|7|','|−5|','|0|'],'|−9| = 9 ist der größte Wert.'],
  ['Wie rechnet man a − (−b)?','a + b',['a − b','−a − b','−a + b'],'Minus und Minus ergeben Plus.']
 ]),
 r=>poolTF(r,[
  ['Das Produkt zweier negativer Zahlen ist positiv.',true,'Minus mal Minus ergibt Plus.'],
  ['Die Summe zweier negativer Zahlen ist immer negativ.',true,'Beide Summanden liegen links der Null.'],
  ['Jede negative Zahl ist kleiner als jede positive Zahl.',true,'Auf der Zahlengeraden liegen negative Zahlen immer links.'],
  ['Der Betrag einer Zahl kann negativ sein.',false,'Der Betrag ist ein Abstand und damit nie negativ.'],
  ['0 ist weder positiv noch negativ.',true,'Die Null ist der Nullpunkt der Zahlengeraden.'],
  ['(−8) : (−2) = −4',false,'Gleiche Vorzeichen ergeben ein positives Ergebnis: 4.'],
  ['Die Gegenzahl von 0 ist 0.',true,'0 + 0 = 0.']
 ]),
 r=>{const a=R.int(r,-20,20)||5, b=R.int(r,-20,20)||3, c=R.int(r,-9,9)||2;
     return num('Berechne: '+klammer(a)+' + '+klammer(b)+' − '+klammer(c), a+b-c,
       'Schrittweise: '+klammer(a)+' + '+klammer(b)+' = '+nz(a+b)+', dann − '+klammer(c)+' = '+nz(a+b-c)+'.');},
 r=>{const a=R.int(r,2,12)*(r()<0.5?-1:1); return num('Wie lautet die Gegenzahl von '+nz(a)+'?', -a,
       'Gegenzahlen ergänzen sich zu 0: '+nz(a)+plusZahl(-a)+' = 0.');},
 r=>{const start=R.int(r,-15,-3), schritt=R.int(r,2,6);
     return num('Setze fort: '+nz(start)+'; '+nz(start+schritt)+'; '+nz(start+2*schritt)+'; ___', start+3*schritt,
       'Es wird jeweils '+schritt+' addiert.');},
 r=>poolORD(r,[
  ['Ordne die Rechenschritte für (−3) + 5 · (−2).',['Punkt vor Strich beachten','5 · (−2) = −10 berechnen','(−3) + (−10) rechnen','Ergebnis −13 angeben'],'Erst multiplizieren, dann addieren.'],
  ['Ordne die Beträge der Größe nach – beginne mit dem kleinsten.',['|−2|','|3|','|−7|','|11|'],'Beträge sind 2, 3, 7 und 11.'],
  ['Ordne die Temperaturen vom kältesten zum wärmsten Wert.',['−18 °C','−4 °C','0 °C','12 °C'],'Je weiter links auf der Zahlengeraden, desto kälter.']
 ])
]},

{key:'g7-zuordnungen', gens:[
 r=>poolMC(r,[
  ['Woran erkennt man eine proportionale Zuordnung in der Wertetabelle?','Der Quotient y : x ist immer gleich.',['Das Produkt x · y ist immer gleich.','Die Differenz y − x ist immer gleich.','Die Werte wachsen in Zweierschritten.'],'Quotientengleichheit.'],
  ['Woran erkennt man eine antiproportionale Zuordnung?','Das Produkt x · y ist immer gleich.',['Der Quotient y : x ist immer gleich.','Der Graph ist eine Gerade.','Die Summe x + y ist gleich.'],'Produktgleichheit.'],
  ['Wie sieht der Graph einer proportionalen Zuordnung aus?','Gerade durch den Ursprung',['Gerade mit y-Achsenabschnitt','Hyperbel','Parabel'],'y = k · x geht durch (0|0).'],
  ['Wie sieht der Graph einer antiproportionalen Zuordnung aus?','Hyperbel',['Gerade durch den Ursprung','Parabel','waagerechte Gerade'],'Die Kurve nähert sich beiden Achsen an.'],
  ['Was bedeutet der Proportionalitätsfaktor k in y = k · x?','Er gibt an, um wie viel y wächst, wenn x um 1 wächst.',['Er gibt den Startwert an.','Er ist immer 1.','Er gibt die Anzahl der Wertepaare an.'],'k ist die Steigung.']
 ]),
 r=>poolTF(r,[
  ['Bei proportionalen Zuordnungen gilt: doppelte Menge, doppelter Preis.',true,'Das ist die Grundeigenschaft.'],
  ['Der Graph einer proportionalen Zuordnung geht durch den Punkt (0|0).',true,'Null Stück kosten null Euro.'],
  ['Bei antiproportionalen Zuordnungen gilt: doppelte Anzahl, doppelte Zeit.',false,'Bei doppelter Anzahl halbiert sich die Zeit.'],
  ['Die Zuordnung „Alter → Körpergröße“ ist proportional.',false,'Sie folgt keiner festen Regel.'],
  ['Der Dreisatz funktioniert nur bei proportionalen Zuordnungen.',false,'Er lässt sich auch antiproportional anwenden, nur mit umgekehrtem letzten Schritt.'],
  ['Bei einer proportionalen Zuordnung mit k = 2,5 gehört zu x = 4 der Wert y = 10.',true,'2,5 · 4 = 10.']
 ]),
 r=>{const k=R.int(r,2,12), y=k*R.int(r,2,12);
     return num('Bei einer proportionalen Zuordnung gilt y = '+k+' · x. Zu welchem x gehört y = '+y+'?', y/k,
       'x = y : k = '+y+' : '+k+' = '+(y/k)+'.',{tol:0.01});},
 r=>{const l=R.int(r,3,9), km=R.int(r,4,12)*10; const neu=R.int(r,2,9)*10;
     return num(l+' Liter Benzin reichen für '+km+' km. Wie weit kommt man mit '+(l*2)+' Litern (in km)?', km*2,
       'Doppelte Menge, doppelte Strecke: '+(km*2)+' km.',{unit:'km'});},
 r=>{const p=R.int(r,2,9)*25, n=R.int(r,3,12);
     return num(n+' Hefte kosten '+fmt(n*p/100,2)+' €. Was kostet ein Heft (in €)?', fmt(p/100,2),
       fmt(n*p/100,2)+' € : '+n+' = '+fmt(p/100,2)+' €.',{tol:0.005,unit:'€'});},
 r=>poolORD(r,[
  ['Ordne die Schritte beim Prüfen auf Proportionalität.',['Wertepaare aus der Tabelle ablesen','Für jedes Paar y : x berechnen','Quotienten vergleichen','Bei gleichen Quotienten: proportional'],'Quotientengleichheit prüfen.'],
  ['Ordne die Schritte des umgekehrten Dreisatzes (antiproportional).',['Gegebene Werte notieren','Produkt x · y berechnen','Produkt durch die neue Anzahl teilen','Ergebnis mit Einheit angeben'],'Produktgleichheit nutzen.'],
  ['Ordne die Wertepaare einer proportionalen Zuordnung mit k = 3 aufsteigend.',['x = 1 → y = 3','x = 2 → y = 6','x = 4 → y = 12','x = 5 → y = 15'],'Jeweils y = 3 · x.']
 ])
]},

{key:'g7-prozent', gens:[
 r=>poolMC(r,[
  ['Was ist der Grundwert?','die Zahl, die 100 % entspricht',['der berechnete Anteil','die Prozentzahl','der Zinssatz'],'G ist das Ganze.'],
  ['Was ist der Prozentwert?','der Anteil in derselben Einheit wie der Grundwert',['die Prozentzahl','das Ganze','der Zinssatz'],'W = G · p%.'],
  ['Wie lautet der Wachstumsfaktor bei +20 %?','1,2',['0,2','0,8','20'],'1 + 20/100 = 1,2.'],
  ['Wie lautet der Faktor bei einem Rabatt von 30 %?','0,7',['1,3','0,3','3'],'1 − 30/100 = 0,7.'],
  ['Ein Preis steigt von 50 € auf 60 €. Um wie viel Prozent?','20 %',['10 %','16,7 %','120 %'],'10 € von 50 € sind 20 %.'],
  ['Was bedeutet „p. a.“ bei Zinsen?','pro Jahr',['pro Monat','pro Anlage','prozentual anteilig'],'per annum = jährlich.']
 ]),
 r=>poolTF(r,[
  ['Eine Erhöhung um 50 % und danach eine Senkung um 50 % ergibt wieder den Ausgangswert.',false,'Faktor 1,5 · 0,5 = 0,75 – es bleiben 75 %.'],
  ['20 % von 80 ist dasselbe wie 80 % von 20.',true,'Beides ergibt 16, weil die Multiplikation vertauschbar ist.'],
  ['Der Prozentsatz kann größer als 100 % sein.',true,'Zum Beispiel bei einer Verdopplung: 200 %.'],
  ['Zinseszins bedeutet, dass auch die Zinsen wieder verzinst werden.',true,'Deshalb wächst das Kapital schneller als linear.'],
  ['Bei 3 % Zinsen auf 200 € erhält man nach einem Jahr 6 € Zinsen.',true,'200 · 0,03 = 6.'],
  ['Der Grundwert ist immer größer als der Prozentwert.',false,'Bei mehr als 100 % ist der Prozentwert größer.']
 ]),
 r=>{const G=R.int(r,4,40)*25, p=R.pick(r,[5,10,20,25]);
     return num('Ein Artikel kostet '+G+' € und wird um '+p+' % reduziert. Was kostet er jetzt (in €)?',
       fmt(G*(1-p/100),2), 'Faktor '+fmt(1-p/100,2)+': '+G+' € · '+fmt(1-p/100,2)+' = '+fmt(G*(1-p/100),2)+' €.',{tol:0.02,unit:'€'});},
 r=>{const alt=R.int(r,4,30)*10, neu=alt+R.pick(r,[1,2,3,4,5])*alt/10;
     return num('Ein Preis steigt von '+alt+' € auf '+neu+' €. Um wie viel Prozent ist er gestiegen?',
       Math.round((neu-alt)/alt*10000)/100, 'Zunahme '+(neu-alt)+' € von '+alt+' € = '+fmt((neu-alt)/alt*100)+' %.',{tol:0.05,unit:'%'});},
 r=>{const K=R.int(r,4,40)*100, z=R.pick(r,[2,3,4,5]), m=R.pick(r,[3,6,9]);
     return num('Kapital '+K+' € zu '+z+' % pro Jahr. Wie hoch sind die Zinsen nach '+m+' Monaten (in €)?',
       fmt(K*z/100*m/12,2), 'Jahreszinsen '+fmt(K*z/100,2)+' €, davon '+m+'/12 = '+fmt(K*z/100*m/12,2)+' €.',{tol:0.05,unit:'€'});},
 r=>poolORD(r,[
  ['Ordne die Schritte der Prozentrechnung mit dem Dreisatz.',['Grundwert als 100 % notieren','Auf 1 % herunterrechnen','Auf den gesuchten Prozentsatz hochrechnen','Ergebnis mit Einheit angeben'],'Über 1 % rechnen.'],
  ['Ordne die Preise nach der Höhe – Ausgangspreis 100 €.',['nach 30 % Rabatt (70 €)','nach 10 % Rabatt (90 €)','Ausgangspreis (100 €)','nach 15 % Aufschlag (115 €)'],'Jeweils mit dem passenden Faktor multiplizieren.'],
  ['Ordne die Schritte beim Zinseszins über zwei Jahre.',['Zinsfaktor q = 1 + p/100 bestimmen','Kapital mit q multiplizieren (1. Jahr)','Ergebnis erneut mit q multiplizieren (2. Jahr)','Endkapital angeben'],'K₂ = K · q².']
 ])
]},

{key:'g7-terme', gens:[
 r=>poolMC(r,[
  ['Welcher Term ist zu 3(x + 4) äquivalent?','3x + 12',['3x + 4','x + 12','3x · 12'],'Distributivgesetz: 3·x + 3·4.'],
  ['Welche Umformung ist eine Äquivalenzumformung?','auf beiden Seiten 5 addieren',['nur links 5 addieren','beide Seiten mit 0 multiplizieren','eine Seite quadrieren'],'Was man links tut, muss man auch rechts tun.'],
  ['Was ergibt 5a + 3a?','8a',['15a','8a²','53a'],'Gleichartige Glieder werden zusammengefasst.'],
  ['Was ergibt 4x · 3x?','12x²',['12x','7x','7x²'],'Zahlen multiplizieren, Variablen potenzieren.'],
  ['Welche Zahl löst 2x + 6 = 14?','4',['3','5','10'],'2x = 8, also x = 4.'],
  ['Wie nennt man Terme, die für jede Einsetzung denselben Wert liefern?','äquivalent',['gleichwertig im Vorzeichen','proportional','linear'],'Äquivalente Terme lassen sich ineinander umformen.']
 ]),
 r=>poolTF(r,[
  ['2x + 3x = 5x',true,'Gleichartige Glieder addieren.'],
  ['2x + 3y = 5xy',false,'x und y sind verschiedene Variablen und lassen sich nicht zusammenfassen.'],
  ['Eine Gleichung kann mehr als eine Lösung haben.',true,'Zum Beispiel x² = 9 mit x = 3 und x = −3.'],
  ['Beim Lösen einer Gleichung darf man beide Seiten durch dieselbe Zahl außer 0 teilen.',true,'Das ist eine Äquivalenzumformung.'],
  ['3(x − 2) = 3x − 2',false,'Richtig ist 3x − 6; die Klammer wird vollständig ausmultipliziert.'],
  ['Der Term x + x + x ist gleichwertig zu 3x.',true,'Dreimal dieselbe Variable.']
 ]),
 r=>{const a=R.int(r,2,9), b=R.int(r,2,9), x=R.int(r,2,12);
     return num('Berechne den Wert von '+a+'x · '+b+' für x = '+x+'.', a*b*x,
       a+' · '+b+' = '+(a*b)+', mal '+x+' ergibt '+(a*b*x)+'.');},
 r=>{const a=R.int(r,2,8), b=R.int(r,2,9), x=R.int(r,2,10); const rhs=a*(x+b);
     return num('Löse: '+a+'(x + '+b+') = '+rhs, x,
       'Durch '+a+' teilen: x + '+b+' = '+(rhs/a)+', dann − '+b+' → x = '+x+'.',{tol:0.01});},
 r=>{const a=R.int(r,2,7), b=R.int(r,2,9), c=R.int(r,2,7);
     return txt('Fasse zusammen: '+a+'a + '+b+'b + '+c+'a (Form: 5a+3b)', (a+c)+'a+'+b+'b',
       'Gleichartige Glieder: '+a+'a + '+c+'a = '+(a+c)+'a, dazu '+b+'b.',[(a+c)+'a + '+b+'b']);},
 r=>poolORD(r,[
  ['Ordne die Schritte beim Lösen von 4x − 7 = 13.',['Beide Seiten + 7','4x = 20','Beide Seiten : 4','x = 5'],'Erst die Addition, dann die Multiplikation rückgängig machen.'],
  ['Ordne die Schritte beim Ausmultiplizieren von 2(3x + 5).',['Faktor 2 vor die Klammer erkennen','2 · 3x = 6x rechnen','2 · 5 = 10 rechnen','Ergebnis 6x + 10 aufschreiben'],'Jeder Summand wird mit dem Faktor multipliziert.'],
  ['Ordne die Termwerte von 2x + 1 für aufsteigende x.',['x = 0 → 1','x = 2 → 5','x = 4 → 9','x = 6 → 13'],'Jeder Schritt um 2 erhöht den Wert um 4.']
 ])
]},

{key:'g7-winkel', gens:[
 r=>poolMC(r,[
  ['Wie groß ist die Winkelsumme im Dreieck?','180°',['90°','270°','360°'],'In jedem Dreieck ergänzen sich die Innenwinkel zu 180°.'],
  ['Wie groß ist die Winkelsumme im Viereck?','360°',['180°','270°','540°'],'Ein Viereck lässt sich in zwei Dreiecke zerlegen.'],
  ['Wie heißen gleich große Winkel an geschnittenen Parallelen auf derselben Seite?','Stufenwinkel',['Nebenwinkel','Wechselwinkel','Scheitelwinkel'],'Stufenwinkel liegen gleichsinnig und sind gleich groß.'],
  ['Wie groß ist jeder Winkel im gleichseitigen Dreieck?','60°',['45°','90°','30°'],'180° : 3 = 60°.'],
  ['Welcher Kongruenzsatz nutzt zwei Winkel und die dazwischenliegende Seite?','WSW',['SSS','SWS','SsW'],'Winkel – Seite – Winkel.'],
  ['Wie viele Bestimmungsstücke braucht man für ein eindeutiges Dreieck?','3',['2','4','5'],'Drei passende Angaben legen das Dreieck fest.']
 ]),
 r=>poolTF(r,[
  ['Scheitelwinkel sind gleich groß.',true,'Sie liegen sich am Schnittpunkt gegenüber.'],
  ['Nebenwinkel ergänzen sich zu 90°.',false,'Nebenwinkel ergänzen sich zu 180°.'],
  ['Ein Dreieck kann zwei rechte Winkel haben.',false,'Dann wären schon 180° verbraucht, der dritte Winkel wäre 0°.'],
  ['Im gleichschenkligen Dreieck sind die Basiswinkel gleich groß.',true,'Sie liegen den gleich langen Schenkeln gegenüber.'],
  ['Wechselwinkel an geschnittenen Parallelen sind gleich groß.',true,'Sie liegen über Kreuz zwischen den Parallelen.'],
  ['Zwei kongruente Dreiecke sind deckungsgleich.',true,'Sie stimmen in allen Seiten und Winkeln überein.']
 ]),
 r=>{const a=R.int(r,30,120); return num('Zwei Winkel sind Nebenwinkel. Einer misst '+a+'°. Wie groß ist der andere?', 180-a,
       'Nebenwinkel ergänzen sich zu 180°.',{unit:'°'});},
 r=>{const a=R.int(r,20,70), b=R.int(r,20,70), c=360-a-b-R.int(r,20,70);
     const w1=R.int(r,60,110), w2=R.int(r,60,110), w3=R.int(r,60,110);
     return num('In einem Viereck sind drei Winkel '+w1+'°, '+w2+'° und '+w3+'° groß. Wie groß ist der vierte?',
       360-w1-w2-w3, 'Winkelsumme im Viereck = 360°: 360° − '+w1+'° − '+w2+'° − '+w3+'° = '+(360-w1-w2-w3)+'°.',{unit:'°'});},
 r=>{const b=R.int(r,30,80); return num('In einem gleichschenkligen Dreieck misst ein Basiswinkel '+b+'°. Wie groß ist der Winkel an der Spitze?',
       180-2*b, 'Beide Basiswinkel sind gleich: 180° − 2 · '+b+'° = '+(180-2*b)+'°.',{unit:'°'});},
 r=>poolORD(r,[
  ['Ordne die Schritte einer Dreieckskonstruktion nach SSS.',['Längste Seite als Grundlinie zeichnen','Kreisbogen mit der zweiten Seitenlänge um A schlagen','Kreisbogen mit der dritten Seitenlänge um B schlagen','Schnittpunkt C markieren und verbinden'],'Zwei Kreisbögen legen den dritten Punkt fest.'],
  ['Ordne die Winkel der Größe nach – beginne mit dem kleinsten.',['Winkel im gleichseitigen Dreieck (60°)','rechter Winkel (90°)','Innenwinkelsumme Dreieck (180°)','Innenwinkelsumme Viereck (360°)'],'60° < 90° < 180° < 360°.'],
  ['Ordne die Schritte zur Bestimmung eines fehlenden Dreieckswinkels.',['Bekannte Winkel notieren','Beide addieren','Summe von 180° abziehen','Ergebnis als dritten Winkel angeben'],'Winkelsumme 180°.']
 ])
]},

{key:'g7-wahrscheinlichkeit', gens:[
 r=>poolMC(r,[
  ['Wie groß ist die Wahrscheinlichkeit eines sicheren Ereignisses?','1',['0','0,5','100'],'Ein sicheres Ereignis tritt immer ein: P = 1 = 100 %.'],
  ['Wie groß ist die Wahrscheinlichkeit eines unmöglichen Ereignisses?','0',['1','0,5','−1'],'Es kann nicht eintreten.'],
  ['Was ist ein Laplace-Versuch?','ein Versuch, bei dem alle Ergebnisse gleich wahrscheinlich sind',['ein Versuch mit genau zwei Ergebnissen','ein Versuch ohne Zufall','ein mehrstufiger Versuch'],'Zum Beispiel der Wurf eines fairen Würfels.'],
  ['Wie viele Ergebnisse hat der Wurf zweier Münzen?','4',['2','3','8'],'KK, KZ, ZK, ZZ.'],
  ['Was besagt das empirische Gesetz der großen Zahlen?','Bei vielen Versuchen nähert sich die relative Häufigkeit der Wahrscheinlichkeit an.',['Jedes Ergebnis tritt gleich oft ein.','Die Wahrscheinlichkeit ändert sich mit der Zeit.','Nach 100 Versuchen stimmt alles genau.'],'Je mehr Versuche, desto stabiler die relative Häufigkeit.'],
  ['Wie nennt man die Menge aller möglichen Ergebnisse?','Ergebnismenge',['Ereignis','Pfad','Stichprobe'],'Oft mit Ω bezeichnet.']
 ]),
 r=>poolTF(r,[
  ['Wahrscheinlichkeiten liegen immer zwischen 0 und 1.',true,'0 bedeutet unmöglich, 1 bedeutet sicher.'],
  ['Beim Würfeln ist die 6 schwerer zu würfeln als die 1.',false,'Bei einem fairen Würfel sind alle Augenzahlen gleich wahrscheinlich.'],
  ['Wenn fünfmal Kopf fiel, ist beim sechsten Wurf Zahl wahrscheinlicher.',false,'Die Münze hat kein Gedächtnis; die Wahrscheinlichkeit bleibt 1/2.'],
  ['Die Wahrscheinlichkeiten aller Ergebnisse eines Versuchs ergeben zusammen 1.',true,'Irgendein Ergebnis tritt immer ein.'],
  ['Ein Ereignis kann mehrere Ergebnisse umfassen.',true,'„Gerade Augenzahl“ umfasst 2, 4 und 6.'],
  ['Beim Baumdiagramm multipliziert man entlang eines Pfades.',true,'Das ist die erste Pfadregel.']
 ]),
 r=>{const n=R.pick(r,[8,10,12,16,20,25]); const a=R.int(r,1,n-2), b=R.int(r,1,n-a-1);
     return num('In einer Urne liegen '+n+' Kugeln: '+a+' rote, '+b+' blaue, der Rest grün. Wie groß ist die Wahrscheinlichkeit für grün in Prozent?',
       Math.round((n-a-b)/n*10000)/100, (n-a-b)+' grüne von '+n+' Kugeln = '+fmt((n-a-b)/n*100)+' %.',{tol:0.05,unit:'%'});},
 r=>{const E=[['eine Primzahl zu würfeln','2, 3 und 5',3],['eine Augenzahl über 3','4, 5 und 6',3],['eine ungerade Augenzahl','1, 3 und 5',3],['eine Augenzahl unter 3','1 und 2',2],['die 6','nur die 6',1]];
     const e=R.pick(r,E);
     return num('Ein Würfel wird einmal geworfen. Wie groß ist die Wahrscheinlichkeit für „'+e[0]+'“ in Prozent (auf 2 Nachkommastellen)?',
       Math.round(e[2]/6*10000)/100, 'Günstig sind '+e[1]+', also '+e[2]+' von 6 Ergebnissen = '+fmt(e[2]/6*100,2)+' %.',{tol:0.05,unit:'%'});},
 r=>{const n=R.pick(r,[2,3,4,5]); return num('Ein Glücksrad hat '+n+' gleich große Felder. Wie groß ist die Wahrscheinlichkeit für ein bestimmtes Feld in Prozent?',
       Math.round(100/n*100)/100, '1 von '+n+' Feldern = '+fmt(100/n,2)+' %.',{tol:0.05,unit:'%'});},
 r=>{const p=R.pick(r,[10,20,25,30,40,60,75,80]);
     return num('Ein Ereignis hat die Wahrscheinlichkeit '+p+' %. Wie oft tritt es bei 200 Versuchen ungefähr ein?',
       200*p/100, '200 · '+fmt(p/100,2)+' = '+(200*p/100)+' Mal.');},
 r=>poolORD(r,[
  ['Ordne die Ereignisse nach ihrer Wahrscheinlichkeit beim Würfeln – beginne mit dem unwahrscheinlichsten.',['die 6 (1/6)','eine Augenzahl über 4 (2/6)','eine gerade Augenzahl (3/6)','eine Augenzahl unter 6 (5/6)'],'Günstige Ergebnisse zählen und vergleichen.'],
  ['Ordne die Begriffe von unmöglich bis sicher.',['unmöglich (P = 0)','unwahrscheinlich (P = 0,2)','wahrscheinlich (P = 0,8)','sicher (P = 1)'],'Die Wahrscheinlichkeitsskala reicht von 0 bis 1.'],
  ['Ordne die Schritte bei einem zweistufigen Zufallsversuch.',['Baumdiagramm zeichnen','Wahrscheinlichkeiten an die Äste schreiben','Entlang der Pfade multiplizieren','Günstige Pfade addieren'],'Erste und zweite Pfadregel.']
 ])
]}
];
