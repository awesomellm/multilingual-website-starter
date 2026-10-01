import { createServer } from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, join, sep, extname } from 'node:path';
const root=await realpath(resolve('dist')).catch(()=>{ throw new Error('Run node build.mjs first'); });
const port=Number(process.argv[2]||4178);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
createServer(async(req,res)=>{
  try {
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=resolve(root,'.'+path);
    if(file!==root&&!file.startsWith(root+sep)) throw new Error('Outside root');
    if((await stat(file)).isDirectory()) file=join(file,'index.html');
    file=await realpath(file);
    if(!file.startsWith(root+sep)) throw new Error('Outside root');
    const bytes=await readFile(file);
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});
    res.end(req.method==='HEAD'?undefined:bytes);
  } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('404');}
}).listen(port,'127.0.0.1',()=>console.log(`http://127.0.0.1:${port}`));
