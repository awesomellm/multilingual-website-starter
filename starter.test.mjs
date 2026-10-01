import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildSite, renderPage, normalizedOrigin } from './build.mjs';
import { locales, pageIds, pathFor, copy } from './site-data.mjs';

test('all 12 pages use matching self canonicals and reciprocal language identities', async()=>{
  const dir=await mkdtemp(join(tmpdir(),'zq-starter-'));
  try{
    const result=await buildSite({origin:'https://example.com',output:dir});
    assert.equal(result.pages,12);assert.equal(result.downloads,8);
    const sitemap=await readFile(join(dir,'sitemap.xml'),'utf8');
    assert.equal([...sitemap.matchAll(/<loc>/g)].length,12);
    for(const locale of locales) for(const page of pageIds){
      const path=pathFor(locale,page);
      const html=await readFile(join(dir,path.slice(1),'index.html'),'utf8');
      assert.ok(html.includes(`<html lang="${locale.htmlLang}">`));
      assert.ok(html.includes(`<link rel="canonical" href="https://example.com${path}">`));
      assert.equal([...html.matchAll(/<h1>/g)].length,1);
      for(const alternate of locales){
        assert.ok(html.includes(`hreflang="${alternate.code}" href="https://example.com${pathFor(alternate,page)}"`));
        assert.ok(html.includes(`href="${pathFor(alternate,page)}" lang="${alternate.htmlLang}"`));
      }
      assert.ok(sitemap.includes(`<loc>https://example.com${path}</loc>`));
    }
  }finally{await rm(dir,{recursive:true,force:true});}
});
test('product downloads and inquiry model links stay in the same language',()=>{
  for(const locale of locales){
    const html=renderPage(locale,'products','https://example.com');
    for(const model of ['DEMO-01','DEMO-02']){
      assert.ok(html.includes(`href="${locale.prefix}downloads/${model}.txt"`));
      assert.ok(html.includes(`href="${locale.prefix}contact/?model=${model}"`));
    }
  }
});
test('all form labels and result messages are localized, with no transmission endpoint',()=>{
  for(const locale of locales){
    const html=renderPage(locale,'contact','https://example.com');
    const c=copy[locale.code];
    for(const label of c.formLabels)assert.ok(html.includes(label));
    assert.ok(html.includes(c.result));
    assert.ok(html.includes('event.preventDefault()'));
    assert.ok(!html.includes('fetch('));assert.ok(!html.includes('action='));
  }
});
test('downloaded specifications contain the matching language labels',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'zq-download-'));
  try{
    await buildSite({output:dir});
    for(const locale of locales){
      const text=await readFile(join(dir,locale.prefix.slice(1),'downloads/DEMO-01.txt'),'utf8');
      assert.ok(text.includes(copy[locale.code].noteHeading));
      assert.ok(text.includes(copy[locale.code].fictional));
    }
  }finally{await rm(dir,{recursive:true,force:true});}
});
test('origin rejects paths, credentials and non-HTTP schemes',()=>{
  for(const value of ['https://example.com/sub/','https://user:password@example.com','file:///tmp/','https://example.com/?q=1'])assert.throws(()=>normalizedOrigin(value));
  assert.equal(normalizedOrigin('https://example.com/'),'https://example.com');
});
