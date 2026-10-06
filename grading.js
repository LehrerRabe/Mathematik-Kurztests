/* Notenschluessel Mathematik Sek I Gymnasium NRW (mit Tendenzen).
   Prozentgrenzen sind in der App aenderbar (Einstellungen / pro Test). */
export const DEFAULT_SCALE = [
  {min:95, note:'1+', nk:0.7},
  {min:90, note:'1',  nk:1.0},
  {min:85, note:'1-', nk:1.3},
  {min:81, note:'2+', nk:1.7},
  {min:77, note:'2',  nk:2.0},
  {min:73, note:'2-', nk:2.3},
  {min:69, note:'3+', nk:2.7},
  {min:65, note:'3',  nk:3.0},
  {min:61, note:'3-', nk:3.3},
  {min:57, note:'4+', nk:3.7},
  {min:53, note:'4',  nk:4.0},
  {min:50, note:'4-', nk:4.3},
  {min:42, note:'5+', nk:4.7},
  {min:34, note:'5',  nk:5.0},
  {min:27, note:'5-', nk:5.3},
  {min:0,  note:'6',  nk:6.0}
];
export function gradeFor(percent, scale){
  const sc = (scale && scale.length) ? scale : DEFAULT_SCALE;
  const p = Math.max(0, Math.min(100, percent));
  for(const row of sc){ if(p >= row.min) return row; }
  return sc[sc.length-1];
}
/* Durchschnitt ueber Notenwerte (nk), Rueckgabe: Zahl + naechstliegende Tendenznote */
export function avgGrade(nkList, scale){
  if(!nkList.length) return null;
  const avg = nkList.reduce((a,b)=>a+b,0)/nkList.length;
  const sc = (scale && scale.length) ? scale : DEFAULT_SCALE;
  let best = sc[0];
  for(const row of sc){ if(Math.abs(row.nk-avg) < Math.abs(best.nk-avg)) best = row; }
  return {avg: Math.round(avg*100)/100, note: best.note};
}
export function scaleToText(scale){
  return (scale||DEFAULT_SCALE).map(r=>r.note+' ab '+r.min+'%').join(' · ');
}
