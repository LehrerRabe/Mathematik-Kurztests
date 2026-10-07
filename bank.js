import {makeRng, uid, R} from './util.js';
import b5 from './bank5.js'; import b6 from './bank6.js'; import b7 from './bank7.js'; import b8 from './bank8.js';
import {G9,G10} from './bank910.js';

export const TOPICS = [...b5,...b6,...b7,...b8,...G9,...G10];
export const GRADES = [5,6,7,8,9,10];
export const TYPE_LABEL = {mc:'Multiple Choice', tf:'Wahr / Falsch', input:'Eingabe', order:'Reihenfolge'};

export function topicsForGrade(g){ return TOPICS.filter(t=>t.grade===Number(g)); }
export function topicByKey(k){ return TOPICS.find(t=>t.key===k); }

/* Generator-Warteschlange je Thema: erst jeden Generator einmal, dann erneut mischen.
   So wiederholen sich Aufgabentypen innerhalb eines Themas moeglichst spaet. */
function nextGen(topic, queues, rng){
  let q = queues.get(topic.key);
  if(!q || !q.length){ q = R.shuffle(rng, topic.gens.slice()); queues.set(topic.key, q); }
  return q.shift();
}
function tryGen(topic, types, rng, seen, tries, queues){
  queues = queues || new Map();
  for(let i=0;i<(tries||60);i++){
    const gen = nextGen(topic, queues, rng);
    const it = gen(rng);
    if(types && types.length && !types.includes(it.type)) continue;
    const key = it.q.replace(/\s+/g,' ').trim();
    if(seen.has(key)) continue;
    seen.add(key);
    it.id = uid('i_'); it.topic = topic.key; it.topicName = topic.name; it.grade = topic.grade;
    it.points = it.points || 1;
    return it;
  }
  return null;
}

/* Erzeugt count Aufgaben, gleichmaessig ueber die gewaehlten Themen verteilt. */
export function generate({grade, topicKeys, count, types, seed}){
  const rng = makeRng(seed || (Date.now()+''+Math.random()));
  let topics = topicKeys && topicKeys.length ? topicKeys.map(topicByKey).filter(Boolean) : topicsForGrade(grade);
  if(!topics.length) return [];
  const seen = new Set(); const out=[]; const queues = new Map();
  let idx=0, guard=0;
  while(out.length<count && guard++ < count*40){
    const t = topics[idx % topics.length]; idx++;
    const it = tryGen(t, types, rng, seen, 60, queues);
    if(it) out.push(it);
  }
  return out;
}

/* Ersatzaufgabe mit ANDEREM Aufgabentyp aus demselben Thema. */
export function replaceItemType(item, existingItems, types){
  const t = topicByKey(item.topic) || topicsForGrade(item.grade)[0];
  if(!t) return null;
  const erlaubt = (types && types.length ? types : Object.keys(TYPE_LABEL)).filter(x => x !== item.type);
  if(!erlaubt.length) return null;
  const seen = new Set(existingItems.filter(i=>i!==item).map(i=>i.q.replace(/\s+/g,' ').trim()));
  const rng = makeRng(Date.now()+''+Math.random());
  return tryGen(t, erlaubt, rng, seen, 300);
}

/* Ersatzaufgabe fuer eine bestehende Aufgabe (gleiches Thema, nicht identisch) */
export function replaceItem(item, existingItems, types){
  const rng = makeRng(Date.now()+''+Math.random());
  const t = topicByKey(item.topic) || topicsForGrade(item.grade)[0];
  if(!t) return null;
  const seen = new Set(existingItems.filter(i=>i!==item).map(i=>i.q.replace(/\s+/g,' ').trim()));
  /* Gleiche Aufgabenart beibehalten - es sollen sich nur die Zahlen aendern. */
  return tryGen(t, [item.type], rng, seen, 300);
}
