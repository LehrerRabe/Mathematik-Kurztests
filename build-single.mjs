/* Baut eine gebuendelte Einzeldatei (zum Doppelklick-Oeffnen / AirDrop). */
import {readFileSync, writeFileSync} from 'fs';
import {execSync} from 'child_process';
execSync('npx esbuild assets/js/app.js --bundle --format=iife --minify --charset=utf8 --outfile=/tmp/_bundle.js',{stdio:'inherit'});
const js = readFileSync('/tmp/_bundle.js','utf8');
const css = readFileSync('assets/css/app.css','utf8');
const shim = `
(function(){ // Notfall-Speicher, falls der Browser localStorage bei file:// sperrt
  try{ localStorage.setItem('__t','1'); localStorage.removeItem('__t'); }
  catch(e){ var m={}; var s={getItem:function(k){return k in m?m[k]:null;},setItem:function(k,v){m[k]=String(v);},
    removeItem:function(k){delete m[k];},clear:function(){m={};},key:function(i){return Object.keys(m)[i]||null;}};
    Object.defineProperty(s,'length',{get:function(){return Object.keys(m).length;}});
    try{ Object.defineProperty(window,'localStorage',{value:s,configurable:true}); }catch(e2){}
    window.__mtNoStorage = true; }
})();`;
const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Mathe-Kurztests</title>
<meta name="theme-color" content="#1f5fd8">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>&#10135;</text></svg>">
<style>${css}</style>
</head>
<body>
<header class="top" id="head"></header>
<main class="wrap" id="app"></main>
<noscript><div class="wrap"><div class="card">Diese Anwendung ben&ouml;tigt JavaScript.</div></div></noscript>
<script>${shim}</script>
<script>${js}</script>
</body>
</html>`;
writeFileSync('mathe-kurztests-einzeldatei.html', html);
console.log('Einzeldatei geschrieben:', (html.length/1024).toFixed(0)+' KB');
