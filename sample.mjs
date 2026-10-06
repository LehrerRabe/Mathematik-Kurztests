import {makeRng} from './assets/js/util.js';
import {TOPICS} from './assets/js/bank.js';
for(const t of TOPICS){
  console.log('\n### '+t.key+' — '+t.name+' (Klasse '+t.grade+')');
  t.gens.forEach((g,gi)=>{
    for(let i=0;i<2;i++){
      const it=g(makeRng(t.key+'~'+gi+'~'+i+'~v2'));
      let a = it.type==='mc'? it.options[it.answer] : it.type==='tf'? (it.answer?'wahr':'falsch')
            : it.type==='order'? it.answer.join(' → ') : String(it.answer)+(it.unit?' '+it.unit:'');
      console.log(`[g${gi}|${it.type}] ${it.q}\n    LÖSUNG: ${a}\n    WEG: ${it.solution}`);
      if(it.type==='mc') console.log('    OPTIONEN: '+it.options.join(' | '));
    }
  });
}
