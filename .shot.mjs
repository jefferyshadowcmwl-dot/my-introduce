// 临时验证脚本：用系统 Chrome + CDP 截图（零依赖，Node 24 内置 WebSocket/fetch）
// 用法: node .shot.mjs <selector> <outfile> [width]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SEL = process.argv[2] || null;
const OUT = process.argv[3] || 'shot.png';
const W   = parseInt(process.argv[4] || '1440', 10);
const PORT = 9333;
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:8000/';

const profile = mkdtempSync(join(tmpdir(), 'cdp-'));
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu',
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
  `--user-data-dir=${profile}`, '--window-size=' + W + ',900', 'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));

// 等 CDP 端口就绪
let target = null;
for (let i = 0; i < 60; i++) {
  await sleep(300);
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const list = await r.json();
    target = list.find(t => t.type === 'page');
    if (target?.webSocketDebuggerUrl) break;
  } catch {}
}
if (!target) { console.error('CHROME_START_FAILED'); chrome.kill(); process.exit(1); }

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
const logs = [];
ws.onmessage = ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.consoleAPICalled') {
    const txt = (m.params.args || []).map(a => a.value ?? a.description ?? '').join(' ');
    logs.push(`[${m.params.type}] ${txt}`);
  }
  if (m.method === 'Runtime.exceptionThrown') {
    logs.push(`[EXCEPTION] ${m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text}`);
  }
};
const send = (method, params = {}) => new Promise(res => {
  const myId = ++id;
  pending.set(myId, res);
  ws.send(JSON.stringify({ id: myId, method, params }));
});
const evaluate = async expr => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: W, height: 900, deviceScaleFactor: 1, mobile: false,
});

await send('Page.navigate', { url: URL });
await sleep(2800);

// 跳过启动页
await evaluate(`(()=>{const b=document.querySelector('.character-button')||document.querySelector('.intro-skip');if(b){b.click();return 'clicked';}return 'no-button';})()`);
await sleep(2200);

// 触发一次滚动，唤醒所有 reveal
await evaluate(`window.scrollTo(0, document.body.scrollHeight); 'ok'`);
await sleep(1400);
await evaluate(`window.scrollTo(0, 0); 'ok'`);
await sleep(600);

const counters = await evaluate(`JSON.stringify({
  total:  document.querySelector('[data-count-total]')?.textContent,
  gallery:document.querySelector('[data-count-gallery]')?.textContent,
  archive:document.querySelector('[data-count-archive]')?.textContent
})`);
console.log('COUNTERS ' + counters);

const info = await evaluate(`JSON.stringify({
  coverage: (document.querySelectorAll('.photo-card').length)+'/'+(document.querySelectorAll('.archive-item').length)+'/'+(document.querySelectorAll('.award-star').length),
  aboutImg: !!document.querySelector('.vitrine-portrait img'),
  frames: document.querySelectorAll('.photo-frame').length,
  plates: document.querySelectorAll('.photo-plate').length,
  drawers: document.querySelectorAll('.drawer-no').length,
  scrollW: document.body.scrollWidth, innerW: window.innerWidth
})`);

let clip = null;
if (SEL) {
  await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(SEL)}); if(el) el.scrollIntoView({block:'center'}); return 'ok';})()`);
  await sleep(900);
  const rectJson = await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(SEL)});if(!el)return null;const r=el.getBoundingClientRect();return JSON.stringify({x:r.left+scrollX,y:r.top+scrollY,w:r.width,h:r.height});})()`);
  if (rectJson) {
    const r = JSON.parse(rectJson);
    clip = { x: Math.max(0, r.x), y: Math.max(0, r.y), width: Math.min(r.w, W), height: r.h, scale: 1 };
  }
}

const shot = await send('Page.captureScreenshot', clip
  ? { format: 'png', captureBeyondViewport: true, clip }
  : { format: 'png' });
if (shot.result?.data) writeFileSync(OUT, Buffer.from(shot.result.data, 'base64'));

console.log('INFO ' + info);
console.log('CONSOLE_ERRORS:');
const errs = logs.filter(l => /error|EXCEPTION|warn/i.test(l));
console.log(errs.length ? errs.join('\n') : '  (none)');
console.log('ALL_LOGS: ' + logs.length);
console.log(logs.join('\n') || '  (empty)');

ws.close();
chrome.kill();
process.exit(0);
