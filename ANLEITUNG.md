# Mathe-Kurztests – Einrichtung und Bedienung

Eine kleine Web-App für kurze Mathematik-Tests am Gymnasium in NRW (Klasse 5–10).
Sie besteht nur aus statischen Dateien (HTML/CSS/JavaScript) und braucht keinen eigenen Server.

---

## 0. Sofort ausprobieren (ohne Installation)

Die Datei **`mathe-kurztests-einzeldatei.html`** enthält die komplette App in einer einzigen Datei.
Doppelklick genügt – sie öffnet sich im Browser und funktioniert vollständig: Klassen anlegen,
Tests erzeugen, Vorschau prüfen, Test durchspielen, Auswertung ansehen.

Zwei Einschränkungen dieser Fassung:

* Alle Daten bleiben **nur in diesem einen Browser auf diesem einen Gerät** (Einzelplatz-Modus).
  Schülerergebnisse von anderen Geräten kommen nicht an.
* Links und QR-Codes funktionieren nur auf demselben Gerät, weil sie auf einen `file://`-Pfad zeigen.

Für den echten Klasseneinsatz sind daher die Schritte 1 und 2 nötig. Die Einzeldatei ist zum
Kennenlernen, zum Prüfen der Aufgabenqualität – und als Notlösung, wenn das Schul-WLAN streikt.

> Die normale Fassung (`index.html` mit dem `assets`-Ordner) lässt sich **nicht** per Doppelklick
> öffnen: Browser blockieren bei `file://` das Laden von JavaScript-Modulen. Dafür braucht es einen
> Webserver – also GitHub Pages. Die Einzeldatei erzeugst du nach Änderungen neu mit
> `node build-single.mjs`.

---

## 1. In fünf Minuten online stellen (GitHub Pages)

1. Auf github.com ein neues, **öffentliches** Repository anlegen, z. B. `mathe-kurztests`.
2. Den gesamten Inhalt dieses Ordners hochladen (Button *Add file → Upload files*, Ordnerstruktur beibehalten).
3. Im Repository auf **Settings → Pages** gehen.
4. Bei *Source* **Deploy from a branch** wählen, Branch `main`, Ordner `/ (root)`, dann **Save**.
5. Nach ein bis zwei Minuten ist die App erreichbar unter
   `https://<dein-github-name>.github.io/mathe-kurztests/`

Alternativ per Kommandozeile:

```
git init
git add .
git commit -m "Mathe-Kurztests"
git branch -M main
git remote add origin https://github.com/<dein-name>/mathe-kurztests.git
git push -u origin main
```

> Hinweis: Das Repository ist öffentlich – die **Aufgaben und Lösungen** liegen damit im Quelltext
> offen. Für Kurztests im Unterricht ist das in der Regel unkritisch, weil die Aufgaben bei jedem
> Test neu gewürfelt werden. Wer das nicht möchte, nimmt ein privates Repo mit GitHub Pages
> (erfordert GitHub Pro) oder einen anderen Hoster (Netlify, Vercel – beide mit Gratis-Tarif).

---

## 2. Ergebnisspeicher einrichten (Supabase, kostenlos)

Ohne diesen Schritt läuft die App im **Einzelplatz-Modus**: alles bleibt im Browser des jeweiligen
Geräts, Schülerergebnisse kommen nicht bei dir an. Für den Klasseneinsatz daher:

1. Auf [supabase.com](https://supabase.com) kostenlos registrieren und ein neues Projekt anlegen.
   Bei *Region* **Frankfurt (eu-central-1)** wählen, dann liegen die Daten in der EU.
2. Im Projekt links **SQL Editor** öffnen, den Inhalt von `supabase/schema.sql` einfügen und **Run** drücken.
3. Unter **Project Settings → Data API** findest du
   * *Project URL* (z. B. `https://abcdefg.supabase.co`)
   * *anon public* (ein langer Schlüssel)
4. Beide Werte in `assets/js/config.js` eintragen und die Datei neu hochladen –
   **oder** bequemer: in der App unter *Einstellungen → Cloud-Speicher* eintragen.
   (Die Variante über `config.js` gilt für alle Geräte, die Variante über *Einstellungen* nur für
   den Browser, in dem du sie eingibst. Für den Klasseneinsatz gehört sie in `config.js`.)

**Datenschutz, ehrlich gesagt:** Die App arbeitet ohne Login. Wer die Adresse und den öffentlichen
Schlüssel kennt, kann die gespeicherten Daten lesen und schreiben. Speichere deshalb keine
vollständigen Klarnamen, sondern Vornamen mit Anfangsbuchstaben („Anna B.") oder Kürzel. Kläre die
Nutzung vorher mit der Schulleitung bzw. dem Datenschutzbeauftragten der Schule ab – das ist bei
jedem cloudbasierten Werkzeug nötig, unabhängig von dieser App.

---

## 3. So gibst du deinen Schüler:innen den Test

Die Schüler:innen brauchen **nichts** außer einem Browser – keine Installation, kein Konto.

| Weg | Wie es geht | Wann sinnvoll |
|---|---|---|
| **Klassenlink** | *Klassen → Klassenlink & QR*. Ein dauerhafter Link pro Klasse. Dort stehen nur die Namen dieser Klasse und alle gerade offenen Tests. | Der Standardweg. Einmal im Klassenbuch/Padlet/Teams hinterlegen, danach nie wieder verteilen. |
| **QR-Code** | Derselbe Dialog, Button *QR-Code*. An die Tafel beamen, iPad-Kamera drauf halten. | Spontan in der Stunde, besonders in Klasse 5/6. |
| **Test-Code** | Jede Freigabe bekommt einen sechsstelligen Code (z. B. `K7P2QM`). Schüler:innen gehen auf die Startseite → *Ich bin Schüler:in* → Code eingeben. | Wenn du nur die Basis-Adresse an die Tafel schreibst. |
| **Direktlink** | *Bibliothek → Freigaben → Link & QR* liefert einen Link, der direkt in den Test springt. | Zum Verschicken über Teams, Moodle, itslearning, Logineo. |
| **Drucken** | Der Button *Drucken* im selben Dialog erzeugt ein Blatt mit Link, Code und QR-Code. | Zum Aushängen oder Einkleben. |

Ein Test lässt sich jederzeit **schließen** (Bibliothek → Freigaben) – danach kommt niemand mehr hinein.
Für eine Wiederholung gibst du denselben Test einfach erneut frei; er bekommt dann einen neuen Code.

---

## 4. Ablauf im Unterricht

1. **Klasse anlegen** – Bezeichnung und die Namen, eine Zeile pro Person.
2. **Test erstellen** – Jahrgangsstufe, Thema (oder mehrere), Aufgabentypen und die Aufteilung:
   wie viele Fragen der Test insgesamt hat, wie viele davon aus der Aufgabenbank kommen und wie
   viele von der KI. Der Rest wird als leere Aufgabe angelegt, die du in der Vorschau selbst
   ausfüllst – gespeichert werden kann der Test erst, wenn keine Aufgabe mehr offen ist.
3. **Vorschau prüfen** – jede Aufgabe lässt sich *bearbeiten* (Fragetext, Antworten, Lösungsweg,
   sogar der Aufgabentyp), *ersetzen* (neue Aufgabe desselben Themas), *löschen* oder mit mehr
   Punkten gewichten. *Neu würfeln* erzeugt die unveränderten Aufgaben neu – selbst angelegte und
   bearbeitete Aufgaben bleiben dabei erhalten.
4. **Speichern** – der Test liegt danach in der Bibliothek und ist beliebig oft wiederverwendbar.
5. **Freigeben** – Klasse und Datum wählen, Link/QR/Code an die Klasse geben.
6. **Schüler:innen** wählen ihren Namen, bearbeiten den Test, geben ab und sehen sofort
   Punkte, Prozent, **ihre Note** und zu jeder Aufgabe den Lösungsweg.
7. **Auswertung** – pro Klasse, gruppiert nach Datum und Test, mit Durchschnittsnote je Durchgang
   und Gesamtdurchschnitt der Klasse. Export als CSV für die Notenliste.

---

Über den Button **☰ Menü** oben rechts kommst du aus jeder Ansicht heraus zurück – zur Startseite
oder direkt in einen der Lehrer-Bereiche. Läuft gerade ein Test oder ist ein Test noch ungespeichert,
fragt die App vorher nach.

## 5. Aufgabentypen

* **Multiple Choice** – eine richtige von vier Antworten.
* **Wahr / Falsch** – Aussagen beurteilen.
* **Eingabe** – Zahl, Bruch (`3/4`) oder Koordinate (`(3|-4)`). Komma und Punkt werden beide
  akzeptiert, bei gerundeten Ergebnissen gilt eine kleine Toleranz.
* **Reihenfolge** – Elemente per Fingerzug (oder mit den Pfeiltasten) sortieren.
  Teilweise richtige Reihenfolgen geben anteilige Punkte.

---

## 6. Woher die Aufgaben kommen

* **Geprüfte Aufgabenbank** (Standard): 37 Themen entlang des Kernlehrplans Mathematik NRW (G9,
  Fassung 23.06.2019) und der Kapitelfolge des *Lambacher Schweizer*. Die Aufgaben sind
  parametrisiert – Zahlen, Figuren und Distraktoren werden bei jedem Test neu gezogen, die Lösung
  wird mitgerechnet. Ein automatischer Prüflauf über 26 880 erzeugte Aufgaben stellt sicher, dass
  jede Musterlösung als richtig gewertet wird und keine Antwortoption doppelt vorkommt.
* **KI-Aufgaben** (optional): Unter *Einstellungen* kannst du einen Anthropic-API-Schlüssel
  hinterlegen; beim Erstellen lassen sich dann zwei bis drei zusätzliche Aufgaben erzeugen.
  Diese sind in der Vorschau als **KI** gekennzeichnet. **Bitte immer nachrechnen** – ein
  Sprachmodell kann sich verrechnen, die Aufgabenbank nicht.

## 6a. Passwort für den Lehrer-Bereich

Voreingestellt ist das Passwort **1Stein**. Es wird beim ersten Öffnen der Lehreransicht abgefragt
und gilt, bis du über *☰ Menü → Lehrer-Bereich sperren* wieder abschließt oder den Tab schließt.
Der Schüler-Weg (Klassenlink, Test-Code) bleibt davon unberührt.

Ein anderes Passwort setzt du in der App unter *Einstellungen*. Dort wird dir anschließend eine
Prüfsumme angezeigt – trägst du die in `assets/js/config.js` bei `TEACHER_PIN_HASH` ein und lädst
die Datei neu hoch, gilt das neue Passwort auf allen Geräten. Mit einem leeren Wert schaltest du
den Schutz ganz ab.

> **Ehrlich gesagt:** Das ist ein Sichtschutz, kein Zugriffsschutz. Die Prüfung läuft im Browser der
> Schüler:innen; wer den Quelltext liest, kommt daran vorbei. Hinterlegt ist deshalb nur eine
> Prüfsumme statt des Klartextes – das verhindert neugieriges Mitlesen, aber keinen gezielten
> Versuch. Verlass dich darauf nicht beim Schutz von Noten; dafür zählt der Hinweis in Abschnitt 2.

## 7. Notenschlüssel

Voreingestellt ist der übliche Schlüssel der Sekundarstufe I mit Tendenzen:

| Note | ab | Note | ab | Note | ab | Note | ab |
|---|---|---|---|---|---|---|---|
| 1+ | 95 % | 2+ | 81 % | 3+ | 69 % | 4+ | 57 % |
| 1  | 90 % | 2  | 77 % | 3  | 65 % | 4  | 53 % |
| 1− | 85 % | 2− | 73 % | 3− | 61 % | 4− | 50 % |
| 5+ | 42 % | 5 | 34 % | 5− | 27 % | 6 | unter 27 % |

Alle Prozentgrenzen sind unter *Einstellungen → Notenschlüssel* frei änderbar.
Die Kernlehrpläne NRW geben keinen verbindlichen Prozentschlüssel für Mathematik vor – maßgeblich
ist die Absprache in deiner Fachkonferenz. Passe die Werte also an das an, was bei euch gilt.

---

## 8. Dateien

```
index.html                 Einstiegsseite
assets/css/app.css         Gestaltung (hell und dunkel)
assets/js/config.js        Supabase-Zugangsdaten  ← hier eintragen
assets/js/app.js           Oberfläche und Abläufe
assets/js/bank*.js         Aufgabenbank nach Jahrgangsstufen
assets/js/grading.js       Notenschlüssel
assets/js/evaluate.js      Auswertung der Antworten
assets/js/store.js         Datenspeicher (Supabase oder lokal)
assets/js/ai.js            optionaler KI-Generator
supabase/schema.sql        Datenbank-Tabellen
check.mjs                  Prüfskript für die Aufgabenbank (node check.mjs)
```

## 9. Eigene Aufgaben ergänzen

In `assets/js/bank7.js` (usw.) ist jedes Thema ein Objekt mit einer Liste von Generatorfunktionen.
Eine Funktion bekommt einen Zufallsgenerator `r` und gibt eine Aufgabe zurück:

```js
r => {
  const a = R.int(r, 2, 9), b = R.int(r, 2, 9);
  return num('Berechne ' + a + ' · ' + b, a * b, a + ' · ' + b + ' = ' + (a * b) + '.');
}
```

Verfügbare Bausteine: `mc(frage, richtig, [falsch…], weg, r)`, `tf(aussage, wahr?, weg)`,
`num(frage, zahl, weg, {tol, unit})`, `txt(frage, text, weg, [alternativen])`,
`ord(frage, [richtigeReihenfolge], weg, r)`.
Nach Änderungen `node check.mjs` laufen lassen – das prüft alle Generatoren automatisch.
