/* Erzeugt die Startbildschirm-Symbole der App.
   Aufruf:  node icons.mjs          -> schreibt den fertigen Satz
            node icons.mjs muster   -> schreibt muster.png mit allen Entwürfen
   Benötigt sharp (in der Sandbox verlinken wie playwright). */
import sharp from 'sharp';
import {writeFileSync} from 'fs';

const BLAU_HELL = '#2f6fe4';
const BLAU_DUNKEL = '#14399c';

/* --- Entwürfe: jeweils weiße Form auf blauem Verlauf --- */
const MOTIVE = {
  /* A: Klemmbrett mit Häkchen und Zeilen */
  klemmbrett: `
    <g fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round">
      <rect x="130" y="130" width="252" height="286" rx="30"/>
      <path d="M205 130v-26a16 16 0 0 1 16-16h70a16 16 0 0 1 16 16v26"/>
    </g>
    <g fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round">
      <path d="M178 232h74"/><path d="M178 300h74"/>
    </g>
    <path d="M286 226l30 30 58-62" fill="none" stroke="#fff" stroke-width="30"
          stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M286 294l30 30 58-62" fill="none" stroke="#fff" stroke-width="30"
          stroke-linecap="round" stroke-linejoin="round"/>`,

  /* B: Häkchen über der Note 1+ */
  note: `
    <path d="M150 214l60 62 124-146" fill="none" stroke="#fff" stroke-width="40"
          stroke-linecap="round" stroke-linejoin="round"/>
    <text x="256" y="412" font-family="Segoe UI, Helvetica, Arial, sans-serif"
          font-size="150" font-weight="700" fill="#fff" text-anchor="middle"
          letter-spacing="-4">1+</text>`,

  /* C: Stoppuhr mit Häkchen - der kurze Test */
  stoppuhr: `
    <g fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round">
      <circle cx="256" cy="292" r="134"/>
      <path d="M212 104h88"/><path d="M256 104v54"/>
      <path d="M352 170l34-34"/>
    </g>
    <path d="M198 292l44 46 94-110" fill="none" stroke="#fff" stroke-width="30"
          stroke-linecap="round" stroke-linejoin="round"/>`,

  /* D: Rechenzeichen und Häkchen */
  rechnen: `
    <g fill="none" stroke="#fff" stroke-width="28" stroke-linecap="round">
      <path d="M134 166h86"/><path d="M177 123v86"/>
      <path d="M292 166h86"/>
      <path d="M303 330h74"/>
    </g>
    <circle cx="340" cy="288" r="16" fill="#fff"/>
    <circle cx="340" cy="372" r="16" fill="#fff"/>
    <path d="M134 318l50 52 78-94" fill="none" stroke="#fff" stroke-width="30"
          stroke-linecap="round" stroke-linejoin="round"/>`
};

function svg(motiv, {rund=true, rand=true}={}){
  const form = rund
    ? `<rect width="512" height="512" rx="114" fill="url(#v)"/>`
    : `<rect width="512" height="512" fill="url(#v)"/>`;
  const inhalt = rand ? MOTIVE[motiv] : `<g transform="translate(256,256) scale(0.78) translate(-256,-256)">${MOTIVE[motiv]}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs><linearGradient id="v" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${BLAU_HELL}"/><stop offset="1" stop-color="${BLAU_DUNKEL}"/>
  </linearGradient></defs>
  ${form}
  ${inhalt}
</svg>`;
}

const png = (quelle, groesse, datei) =>
  sharp(Buffer.from(quelle)).resize(groesse, groesse).png().toFile(datei)
    .then(()=>console.log('  geschrieben:', datei, groesse+'px'));

if(process.argv[2]==='muster'){
  /* Übersichtsblatt mit allen Entwürfen */
  const namen=Object.keys(MOTIVE);
  const kacheln=await Promise.all(namen.map(n=>
    sharp(Buffer.from(svg(n))).resize(300,300).png().toBuffer()));
  const B=300, L=24, oben=54;
  const breite=namen.length*B+(namen.length+1)*L, hoehe=B+oben+L*2;
  const beschriftung=`<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${hoehe}">
    <rect width="${breite}" height="${hoehe}" fill="#ffffff"/>
    ${namen.map((n,i)=>`<text x="${L+i*(B+L)+B/2}" y="${hoehe-20}" text-anchor="middle"
      font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#15181d">${String.fromCharCode(65+i)} · ${n}</text>`).join('')}
    <text x="${breite/2}" y="34" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
      font-size="28" font-weight="700" fill="#15181d">Mathe-Kurztests – Entwürfe für das App-Symbol</text>
  </svg>`;
  await sharp(Buffer.from(beschriftung))
    .composite(kacheln.map((b,i)=>({input:b, left:L+i*(B+L), top:oben})))
    .png().toFile('muster.png');
  console.log('muster.png geschrieben:', namen.length, 'Entwürfe');
} else {
  const motiv = process.argv[2] || 'klemmbrett';
  console.log('Symbolsatz für Motiv:', motiv);
  const normal = svg(motiv);
  const randlos = svg(motiv, {rund:false, rand:false});   /* maskierbar: Android schneidet zu */
  writeFileSync('icon.svg', normal);
  console.log('  geschrieben: icon.svg');
  await png(normal, 192, 'icon-192.png');
  await png(normal, 512, 'icon-512.png');
  await png(randlos, 512, 'icon-maskable-512.png');
  /* Apple mag keine Transparenz und keine eigenen Ecken */
  await sharp(Buffer.from(svg(motiv,{rund:false}))).resize(180,180).flatten({background:BLAU_DUNKEL})
    .png().toFile('apple-touch-icon.png');
  console.log('  geschrieben: apple-touch-icon.png 180px');
}
