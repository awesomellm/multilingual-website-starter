import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, pageIds, pathFor, copy, models } from './site-data.mjs';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
export function normalizedOrigin(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('Use an HTTP(S) origin without a path, query or credentials');
  return url.origin;
}

function inquiry(c) {
  const inputs = [
    `<input name="name" autocomplete="name" required maxlength="100">`,
    `<input name="email" type="email" autocomplete="email" required maxlength="200">`,
    `<select name="model">${models.map(m=>`<option>${m.id}</option>`).join('')}</select>`,
    `<input name="quantity" type="number" min="1" max="1000000" step="1" required>`,
    `<input name="destination" required maxlength="100">`,
  ];
  return `<p>${escapeHtml(c.contactDescription)}</p><form id="inquiry">${inputs.map((input,i)=>`<label>${escapeHtml(c.formLabels[i])}${input}</label>`).join('')}<button type="submit">${escapeHtml(c.button)}</button></form><section id="result" hidden aria-live="polite"><h2>${escapeHtml(c.result)}</h2><textarea id="draft" readonly rows="8" aria-label="${escapeHtml(c.contactTitle)}"></textarea></section><script>
  const form=document.getElementById('inquiry');
  const wanted=new URLSearchParams(location.search).get('model');
  if(Array.from(form.elements.model.options).some(option=>option.value===wanted)) form.elements.model.value=wanted;
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const labels=${JSON.stringify(c.formLabels).replace(/</g,'\\u003c')};
    const values=['name','email','model','quantity','destination'].map(key=>form.elements[key].value);
    document.getElementById('draft').value=labels.map((label,index)=>label+': '+values[index]).join('\\n');
    document.getElementById('result').hidden=false;
  });
  </script>`;
}

export function renderPage(locale, page, origin) {
  const c=copy[locale.code];
  const title=c[`${page}Title`];
  const languages=locales.map(l=>`<a href="${pathFor(l,page)}" lang="${l.htmlLang}"${l.code===locale.code?' aria-current="page"':''}>${l.label}</a>`).join('');
  const alternates=locales.map(l=>`<link rel="alternate" hreflang="${l.code}" href="${origin}${pathFor(l,page)}">`).join('\n');
  let body='';
  if(page==='home') body=`<p class="lead">${escapeHtml(c.homeText)}</p>${c.homeSections.map((heading,i)=>`<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(c.homeDetails[i])}</p></section>`).join('')}<a class="button" href="${pathFor(locale,'products')}">${escapeHtml(c.nav[1])}</a>`;
  if(page==='products') body=`<div class="table-wrap"><table><thead><tr>${c.columns.map(v=>`<th scope="col">${escapeHtml(v)}</th>`).join('')}</tr></thead><tbody>${models.map((m,i)=>`<tr><th scope="row">${m.id}</th><td>${escapeHtml(c.material[i])}</td><td>${m.dimensions}</td><td>${m.moq}</td><td>${escapeHtml(c.leadTime[i])}</td></tr>`).join('')}</tbody></table></div><p>${escapeHtml(c.productNote)}</p>${models.map(m=>`<section><h2>${m.id}</h2><a href="${locale.prefix}downloads/${m.id}.txt" download>${escapeHtml(c.download)}</a> · <a href="${pathFor(locale,'contact')}?model=${m.id}">${escapeHtml(c.request)}</a></section>`).join('')}`;
  if(page==='contact') body=inquiry(c);
  const schema={'@context':'https://schema.org','@type':'WebPage',name:title,url:origin+pathFor(locale,page),inLanguage:locale.htmlLang};
  return `<!doctype html><html lang="${locale.htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)} | ${escapeHtml(c.brand)}</title><meta name="description" content="${escapeHtml(c[`${page}Description`])}"><link rel="canonical" href="${origin}${pathFor(locale,page)}">${alternates}<link rel="alternate" hreflang="x-default" href="${origin}${pathFor(locales[0],page)}"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script></head><body><header><a class="brand" href="${locale.prefix}">${escapeHtml(c.brand)}</a><nav>${pageIds.map((id,i)=>`<a href="${pathFor(locale,id)}"${id===page?' aria-current="page"':''}>${escapeHtml(c.nav[i])}</a>`).join('')}</nav><nav class="languages" aria-label="${escapeHtml(c.language)}">${languages}</nav></header><main><p class="notice">${escapeHtml(c.demo)}</p><h1>${escapeHtml(title)}</h1>${body}</main><footer><p>${escapeHtml(c.footer)} <a href="${c.siteUrl}">${escapeHtml(c.site)}</a></p></footer></body></html>`;
}

export async function buildSite({ origin='https://example.com', output='dist' }={}) {
  origin=normalizedOrigin(origin);
  const root=resolve(output);
  await mkdir(root,{recursive:true});
  const urls=[];
  for(const locale of locales) {
    const c=copy[locale.code];
    for(const page of pageIds) {
      const path=pathFor(locale,page);
      const dir=join(root,path.slice(1));
      await mkdir(dir,{recursive:true});
      await writeFile(join(dir,'index.html'),renderPage(locale,page,origin));
      urls.push(origin+path);
    }
    const downloads=join(root,locale.prefix.slice(1),'downloads');
    await mkdir(downloads,{recursive:true});
    for(const [index,model] of models.entries()) {
      const values=[model.id,c.material[index],`${model.dimensions} ${c.unit}`,c.leadTime[index],c.fictional];
      await writeFile(join(downloads,model.id+'.txt'),c.noteHeading+'\n\n'+c.noteLabels.map((label,i)=>`${label}: ${values[i]}`).join('\n')+'\n');
    }
  }
  await copyFile(new URL('./styles.css',import.meta.url),join(root,'styles.css'));
  await writeFile(join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${escapeHtml(url)}</loc></url>`).join('')}</urlset>\n`);
  await writeFile(join(root,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  return {origin,output:root,pages:urls.length,downloads:locales.length*models.length};
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const args=process.argv.slice(2);
    if(args.length%2 || args.some((arg,i)=>i%2===0&&!['--origin','--output'].includes(arg))) throw new Error('Usage: node build.mjs [--origin https://example.com] [--output dist]');
    const options=Object.fromEntries(Array.from({length:args.length/2},(_,i)=>[args[i*2].slice(2),args[i*2+1]]));
    console.log(JSON.stringify(await buildSite(options),null,2));
  } catch(error) { console.error(error.message); process.exitCode=2; }
}
