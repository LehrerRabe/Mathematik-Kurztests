import {AI_MODEL} from './config.js';
import {uid} from './util.js';

export function aiConfigured(){ return !!(localStorage.getItem('mt_ai_key')||'').trim(); }

const SCHEMA = `Antworte AUSSCHLIESSLICH mit einem JSON-Array. Jedes Element ist eine Aufgabe:
{"type":"mc","q":"Frage","options":["A","B","C","D"],"answer":0,"solution":"kurzer Lösungsweg"}
{"type":"tf","q":"Aussage","answer":true,"solution":"Begründung"}
{"type":"input","mode":"num","q":"Frage","answer":"12.5","unit":"cm","tol":0.01,"solution":"Rechenweg"}
{"type":"order","q":"Arbeitsauftrag","answer":["Schritt 1","Schritt 2","Schritt 3"],"solution":"Begründung"}
Regeln: Dezimaltrennzeichen im Feld "answer" ist der Punkt. Bei "mc" ist "answer" der Index der richtigen Option (0-basiert) und genau eine Option ist richtig. Deutsch, Schulsprache, keine Bilder, keine Formelsätze die eine Zeichnung brauchen. Rechne jede Aufgabe selbst nach.`;

export async function aiItems({grade, topics, count, types}){
  const key=(localStorage.getItem('mt_ai_key')||'').trim();
  if(!key) return [];
  const prompt = `Erstelle ${count} Kurztest-Aufgaben für Mathematik, Klasse ${grade}, Gymnasium Nordrhein-Westfalen (Kernlehrplan G9, Lehrwerk Lambacher Schweizer).
Themen: ${topics.join(', ')}.
Erlaubte Aufgabentypen: ${types.join(', ')}.
Schwierigkeitsgrad: kurze Überprüfung von Grundwissen, in 2–3 Minuten lösbar.
${SCHEMA}`;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({model:AI_MODEL, max_tokens:2000, messages:[{role:'user',content:prompt}]})
    });
    if(!res.ok) throw new Error(await res.text());
    const data=await res.json();
    const text=(data.content||[]).map(c=>c.text||'').join('');
    const m=text.match(/\[[\s\S]*\]/);
    if(!m) return [];
    const arr=JSON.parse(m[0]);
    return arr.filter(x=>x&&x.q&&x.type).map(x=>Object.assign({},x,{
      id:uid('ai_'), ai:true, points:1, topic:'ki', topicName:'KI-Aufgabe', grade,
      alt:x.alt||[], tol:Number(x.tol)||0
    }));
  }catch(e){ console.warn('KI-Generator:',e.message); return []; }
}
