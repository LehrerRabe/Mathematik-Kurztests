import {makeRng} from './assets/js/util.js';
import {TOPICS} from './assets/js/bank.js';
import {scoreItem} from './assets/js/evaluate.js';
let n=0, bad=[];
for(const t of TOPICS){
  t.gens.forEach((g,gi)=>{
    for(let i=0;i<120;i++){
      const it=g(makeRng(t.key+'#'+gi+'#'+i)); n++;
      const tag=t.key+' gen'+gi;
      if(!it.q||!it.type) bad.push(tag+': leere Aufgabe');
      if(it.type==='mc'){
        if(!(it.answer>=0&&it.answer<it.options.length)) bad.push(tag+': ungültiger Antwortindex');
        if(new Set(it.options).size!==it.options.length) bad.push(tag+': doppelte Antwortoptionen | '+it.q+' | '+it.options.join(' / '));
        if(it.options.length<3) bad.push(tag+': zu wenige Optionen');
      }
      if(it.type==='order'){
        if(it.answer.length<3) bad.push(tag+': zu wenige Elemente');
        if(new Set(it.answer).size!==it.answer.length) bad.push(tag+': doppelte Elemente');
        if(it.items.join('|')===it.answer.join('|')) bad.push(tag+': bereits richtig sortiert vorgegeben');
      }
      // richtige Antwort muss volle Punktzahl ergeben
      let given = it.type==='mc'?it.answer : it.type==='tf'?it.answer : it.type==='order'?it.answer.slice() : it.answer;
      const s=scoreItem(it,given);
      if(s.score!==1) bad.push(tag+': Musterlösung wird nicht als richtig gewertet | '+it.q+' | '+JSON.stringify(it.answer));
      if(!it.solution) bad.push(tag+': kein Lösungsweg hinterlegt');
    }
  });
}
const uniq=[...new Set(bad)];
console.log('Geprüfte Aufgaben:',n);
console.log('Beanstandungen:',uniq.length);
uniq.slice(0,40).forEach(x=>console.log(' -',x));
