import fs from 'fs';
import vm from 'vm';
const file = process.argv[2] || 'index.html';
const html = fs.readFileSync(file, 'utf8');
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, idx = 0;
while((m = re.exec(html))){
  idx++;
  const before = html.slice(0, m.index).split('\n').length;
  try{ new vm.Script(m[1], { filename: `${file}#inline${idx}` }); }
  catch(e){ console.log(`Inline script #${idx} near line ${before}: ${e.message}`); }
}
console.log('checked', idx, 'inline scripts in', file);
