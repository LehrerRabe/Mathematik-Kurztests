/* ===== EINSTELLUNGEN =============================================
   Trage hier die Daten deines (kostenlosen) Supabase-Projekts ein.
   Wo du sie findest: Supabase → Project Settings → Data API
     SUPABASE_URL      = "Project URL"
     SUPABASE_ANON_KEY = "anon public"-Schluessel
   Laesst du beides leer, laeuft die App im Einzelplatz-Modus:
   alle Daten bleiben nur im Browser dieses Geraets.
   ================================================================= */
export const SUPABASE_URL = "";
export const SUPABASE_ANON_KEY = "";

/* Passwort fuer den Lehrer-Bereich.
   Hinterlegt ist eine Pruefsumme, nicht das Passwort selbst.
   Voreingestellt ist das Passwort "1Stein".
   Leer lassen ("") = kein Passwortschutz.
   Ein anderes Passwort setzt du bequem in der App unter Einstellungen;
   dort wird dir auch die neue Pruefsumme angezeigt, die du hier eintragen
   kannst, damit sie auf allen Geraeten gilt. */
export const TEACHER_PIN_HASH = "1r8lvht-j5nr91";

/* Optionaler KI-Aufgabengenerator (Anthropic API).
   Der Schluessel wird NICHT hier eingetragen, sondern in der App unter
   "Einstellungen" - er bleibt dann nur im Browser der Lehrkraft. */
export const AI_MODEL = "claude-sonnet-4-5";
