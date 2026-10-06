import {normAnswer, numeric} from './util.js';
import {gradeFor, DEFAULT_SCALE} from './grading.js';

/* Bewertet eine einzelne Aufgabe. Rueckgabe: {score 0..1, correct bool, given} */
export function scoreItem(item, given){
  if(given===undefined || given===null || given==='') return {score:0, correct:false, given};
  switch(item.type){
    case 'mc':
      return {score: Number(given)===Number(item.answer)?1:0, correct:Number(given)===Number(item.answer), given};
    case 'tf':
      return {score: (given===true||given==='true')===(item.answer===true)?1:0,
              correct:(given===true||given==='true')===(item.answer===true), given};
    case 'input':{
      const alts = [item.answer, ...(item.alt||[])].map(String);
      const gs = normAnswer(given);
      if(alts.some(a=>normAnswer(a)===gs)) return {score:1, correct:true, given};
      if(item.mode!=='txt'){
        const gv = numeric(given), av = numeric(item.answer);
        if(isFinite(gv)&&isFinite(av)){
          const tol = Math.max(Number(item.tol)||0, 1e-9);
          if(Math.abs(gv-av)<=tol) return {score:1, correct:true, given};
        }
      }else{
        const gv = numeric(given), av = numeric(item.answer);
        if(isFinite(gv)&&isFinite(av)&&Math.abs(gv-av)<1e-9) return {score:1, correct:true, given};
      }
      return {score:0, correct:false, given};
    }
    case 'order':{
      const arr = Array.isArray(given)? given : [];
      const sol = item.answer||[];
      if(!arr.length) return {score:0, correct:false, given};
      let hit=0; for(let i=0;i<sol.length;i++) if(arr[i]===sol[i]) hit++;
      const full = hit===sol.length;
      return {score: full?1: Math.round(hit/sol.length*100)/100, correct:full, given};
    }
  }
  return {score:0, correct:false, given};
}

/* Bewertet einen ganzen Test. */
export function scoreTest(items, answers, scale){
  const detail = items.map(it=>{
    const s = scoreItem(it, answers[it.id]);
    return {id:it.id, type:it.type, q:it.q, points:(it.points||1), earned: Math.round(s.score*(it.points||1)*100)/100,
            correct:s.correct, given:s.given, solution:it.solution, answer:it.answer};
  });
  const max = items.reduce((a,it)=>a+(it.points||1),0);
  const pts = Math.round(detail.reduce((a,d)=>a+d.earned,0)*100)/100;
  const percent = max? Math.round(pts/max*10000)/100 : 0;
  const g = gradeFor(percent, scale||DEFAULT_SCALE);
  return {detail, points:pts, max, percent, grade:g.note, grade_nk:g.nk};
}
