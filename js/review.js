// 11/24 영흥고 「나만의 앱서랍」 수업 복기 — 단계·프롬프트는 content.js(수업 사이트에서 자동으로 옮김), 결과는 data.js(익명 합계)
import { STEPS, PROMPTS, PARTS, PART_COLOR, MOODS, el, emojiSrc } from './content.js';
import { DATA } from './data.js';

const GAME = 'https://euphonious-cassata-31f309.netlify.app/';
const rel = (u) => (u && u.startsWith('/') ? u.slice(1) : u);
const $ = (id) => document.getElementById(id);

// ---------- 작은 도우미 ----------
let toastT = 0;
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.remove('hidden'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.add('hidden'), 2200); }
async function copyText(text) {
  try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch (e) { /* 아래로 */ }
  const ta = el('textarea', { readonly: true, style: 'position:fixed;top:-1000px;opacity:0' }); ta.value = text;
  document.body.append(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; } ta.remove(); return ok;
}
function openViewer(title, node) {
  $('viewer-title').textContent = title; const b = $('viewer-body'); b.innerHTML = ''; b.append(node);
  $('viewer').classList.remove('hidden'); document.body.style.overflow = 'hidden';
}
function closeViewer() { $('viewer').classList.add('hidden'); $('viewer-body').innerHTML = ''; document.body.style.overflow = ''; }
$('viewer-close').onclick = closeViewer;
$('viewer').addEventListener('click', (e) => { if (e.target.id === 'viewer') closeViewer(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeViewer(); });

// ---------- 프롬프트: 키 자리는 비워 둠 ----------
const KEY_HOLE = '여기에_내_Gemini_API_KEY_붙여넣기';
const NEIS_HOLE = '여기에_내_나이스_인증키_붙여넣기';
function promptText(key) {
  return (PROMPTS[key] || '').replace('{KEY}', KEY_HOLE).replace('{NEIS}', NEIS_HOLE);
}
function promptBlock(b) {
  const text = promptText(b.key);
  const title = (b.title || '').replace(/\s*\((나이스 키가 이미 들어가 있어요|내 키가 이미 들어가 있어요)\)/, '').replace(/ — 내 키가 이미 들어가 있어요/, '');
  const btn = el('button', { type: 'button', class: 'btn copy' }, '📋 복사');
  btn.onclick = async () => { const ok = await copyText(text); btn.textContent = ok ? '✓ 복사했어요' : '복사가 막혔어요 · 드래그해서 복사'; setTimeout(() => { btn.textContent = '📋 복사'; }, 2200); };
  return el('div', { class: 'prompt' + (b.small ? ' small' : '') },
    el('div', { class: 'prompt-head' }, el('b', {}, title), btn),
    b.fill ? el('div', { class: 'warn' }, b.fill === 'NEIS' ? `🔑 「${NEIS_HOLE}」 자리에 내 나이스 인증키를 넣어요.` : `🔑 「${KEY_HOLE}」 자리에 내 Gemini API 키를 넣어요.`) : null,
    el('pre', { class: 'prompt-text' }, text));
}

function moreBlock(b) {
  const row = el('div', { class: 'more-row' });
  b.items.forEach((it) => {
    const text = it.raw ? it.text : `방금 만든 앱에서 이것만 고쳐줘: ${it.text}\n나머지 기능과 저장 방식은 그대로 두고, 고친 코드를 처음부터 끝까지 다시 써줘.`;
    const chip = el('button', { type: 'button', class: 'chip', title: text }, it.label);
    chip.onclick = async () => { const ok = await copyText(text); toast(ok ? '복사했어요 → 같은 Gemini 대화에 붙여 넣기' : '복사가 막혔어요'); };
    row.append(chip);
  });
  return el('div', { class: 'more' }, el('div', { class: 'more-head' }, el('b', {}, b.title || '⚡ 다 했으면 도전!'), el('span', { class: 'muted small' }, '누르면 프롬프트가 복사돼요')), row);
}

function shots(list) {
  return el('div', { class: 'shots' }, list.map((o) => {
    const url = 'img/guide/' + o.src + '.jpg';
    const fig = el('button', { type: 'button', class: 'shot', title: '크게 보기' }, el('img', { src: url, alt: o.cap || '따라 하기 그림', loading: 'lazy' }), o.cap ? el('span', {}, o.cap) : null);
    fig.onclick = () => openViewer(o.cap || '따라 하기 그림', el('img', { class: 'big-img', src: url, alt: o.cap || '' }));
    return fig;
  }));
}
function tasksBlock(b) {
  return el('ol', { class: 'tasks' }, b.items.map((t) => el('li', { class: t.optional ? 'opt' : '' },
    el('div', { class: 't-text', html: t.text }),
    t.hint ? el('div', { class: 't-hint', html: '💡 ' + t.hint }) : null,
    t.img ? shots(t.img) : null)));
}
function linksBlock(b) {
  return el('div', { class: 'links' }, b.items.map((l) => el('a', { class: 'link-btn', href: rel(l.url), target: l.download ? null : '_blank', rel: 'noopener', download: l.download || null },
    el('img', { src: emojiSrc(l.emoji || '1f517'), alt: '' }), l.label, l.download ? ' ⬇' : ' ↗')));
}
function toolBlock(b) {
  const url = rel(b.url);
  const d = el('details', { class: 'fold' }, el('summary', {}, b.title || '도구 열기'));
  d.addEventListener('toggle', () => { if (d.open && !d.querySelector('iframe')) d.append(el('iframe', { class: 'tool-frame', src: url, style: `height:${b.height || 520}px`, title: b.title || '도구', loading: 'lazy' }), el('a', { class: 'small', href: url, target: '_blank', rel: 'noopener' }, '새 탭으로 크게 보기 ↗')); });
  return d;
}
function flowBlock() {
  const node = (e, b, s) => el('div', { class: 'f-node' }, el('img', { src: emojiSrc(e), alt: '' }), el('b', {}, b), el('span', {}, s));
  return el('div', { class: 'flow' }, node('1f4f1', '나만의 앱서랍', '앱 사용 기록 · 앱 데이터'), el('div', { class: 'f-arrow' }, '보내기 →', el('br'), '← 불러오기'),
    node('1f511', '내 앱스스크립트', '웹 앱 주소(/exec) + 열쇠'), el('div', { class: 'f-arrow' }, '쓰기 →', el('br'), '← 읽기'),
    node('1f4c4', '내 구글 시트', '[앱 데이터]·[사용 기록]·[앱별 요약]'));
}
// 수업 날에만 맞는 문장 → 복기판(집에서 다시 해 보기)에 맞게
const FIX = [
  ['이름은 선생님 화면에만 보여요.', '이 복기판에는 이름 없이 합계만 실었어요.'],
  ['아래 프롬프트에는 선생님 키가 미리 들어 있으니, 내 키를 받았다면 <b>KEY : </b> 뒤만 내 키로 바꿔 보내요.', '아래 프롬프트의 <b>KEY : </b> 뒤 자리에 내 키를 넣어 보내요.'],
  ['이 앱에는 선생님의 나이스 인증키가 들어 있어요. 3교시에', '이 앱에는 내 나이스 인증키가 들어 있어요. 3교시처럼'],
  ['오늘 수업이 끝나면 선생님이 키를 지워요.', '수업 날 나눠 준 키는 수업 뒤 모두 지웠어요.'],
  ['학생 계정은 키가 안 나오거나 바로 막힐 수 있어서, 아래 프롬프트에는 <b>선생님 키</b>가 번호 순서대로 미리 들어가 있어요. 내 키가 잘 되면 프롬프트의 <b>API KEY:</b> 뒤만 내 키로 바꿔요.', '받은 키를 프롬프트의 <b>API KEY:</b> 뒤 자리에 넣어요. 학교 계정은 키가 안 나올 수 있으니 개인 구글 계정으로 받아요.'],
  ['선생님께 다른 번호를 받아요.', '키를 다시 확인하거나 잠시 뒤 다시 해 봐요.'],
  ['내 키로 답이 안 오면 선생님 키(프롬프트에 들어 있던 것)로 되돌려요.', '답이 안 오면 키를 복사할 때 앞뒤 빈칸이 들어갔는지 확인해요.'],
];
const fix = (s) => FIX.reduce((t, [a, b]) => t.split(a).join(b), s || '');
STEPS.forEach((s) => { s.goal = fix(s.goal); (s.blocks || []).forEach((b) => { if (b.html) b.html = fix(b.html); if (b.items) b.items.forEach((it) => { if (it.text) it.text = fix(it.text); if (it.hint) it.hint = fix(it.hint); }); }); });
const note = (html) => el('div', { class: 'note', html });

// ---------- 결과(익명 합계) ----------
const READY = !!(DATA && DATA.ready);
function moodResult() {
  if (!READY || !DATA.mood || !DATA.mood.n) return note('📊 수업 날 기분 결과는 수업이 끝난 뒤 여기에 실려요.');
  const m = DATA.mood, max = Math.max(1, ...m.counts);
  const bars = el('div', { class: 'bars' }, MOODS.map((mo, i) => el('div', { class: 'bar-row' },
    el('img', { src: emojiSrc(mo.emoji), alt: '' }), el('span', { class: 'bar-lab' }, mo.label),
    el('span', { class: 'bar' }, el('i', { style: `width:${(m.counts[i] / max) * 100}%;background:${mo.color}` })), el('b', {}, m.counts[i] + '명'))));
  const words = Object.entries(m.emotions || {}).sort((a, b) => b[1] - a[1]);
  return el('div', { class: 'result' }, el('div', { class: 'r-head' }, `오늘 기분 · ${m.n}명 응답`), bars,
    words.length ? el('div', { class: 'words' }, words.map(([w, c]) => el('span', { class: 'word' }, w, el('small', {}, ' ' + c)))) : null);
}
function wallResult(kind, title) {
  if (kind === 'site') {
    const n = READY ? (DATA.sites || 0) : 0;
    return note(READY ? `🌐 ${n}명이 내 앱서랍을 Netlify에 올려 주소를 만들었어요. (친구들의 주소는 개인 기록이 담겨 있어 복기판에는 싣지 않았어요)` : '🌐 웹에 올린 앱서랍 수는 수업이 끝난 뒤 여기에 실려요.');
  }
  const list = READY ? (kind === 'idea' ? DATA.ideas : DATA.feels) || [] : [];
  if (!list.length) return note(READY ? `${title}: 올라온 글이 없어요.` : `💬 ${title}은 수업이 끝난 뒤 여기에 실려요(이름 없이).`);
  return el('div', { class: 'result' }, el('div', { class: 'r-head' }, `${title} · ${list.length}개 (이름 없이)`), el('div', { class: 'wall' }, list.map((t) => el('div', { class: 'post' }, t))));
}

function blockNode(step, b, seen) {
  switch (b.type) {
    case 'note': return note(b.html);
    case 'links': return linksBlock(b);
    case 'prompt': return promptBlock(b);
    case 'tasks': return tasksBlock(b);
    case 'more': return moreBlock(b);
    case 'tool': return toolBlock(b);
    case 'flow': return flowBlock();
    case 'acct': return b.mini ? null : note('🔐 수업 날에는 입장 순서대로 <b>실습 구글 계정(math○○)</b>을 받아 썼어요. 집에서는 <b>내 구글 계정</b>으로 로그인해서 똑같이 하면 돼요.');
    case 'game': return linksBlock({ items: [{ label: '앱 체험: 방탈출 게임 열기', url: GAME, emoji: '1f9e9' }] });
    case 'key': return note('🔑 수업 날에는 선생님이 입장 순서대로 Gemini 키를 하나씩 나눠 주었어요(수업 뒤 지움). 집에서는 아래 <b>Google AI Studio</b>에서 내 키를 받아 프롬프트의 키 자리에 넣어요.');
    case 'mood': return moodResult();
    case 'post': case 'wall': case 'siteqr': {
      const kind = b.type === 'siteqr' ? 'site' : b.kind;
      if (seen.has(kind)) return null; seen.add(kind);
      const title = { idea: '친구들의 앱 아이디어', feel: '모두의 소감', site: '친구들의 앱서랍' }[kind] || b.title;
      return wallResult(kind, title);
    }
    default: return null;   // survey 등 수업 날에만 쓰는 것
  }
}

// ---------- 그리기 ----------
function stepCard(s, i) {
  const color = PART_COLOR[s.part];
  const r = READY && DATA.steps && DATA.steps[s.id];
  const seen = new Set();
  return el('section', { class: 'card step', id: 's-' + s.id, style: `--c:${color}` },
    el('div', { class: 'step-head' },
      el('span', { class: 'no' }, String(i + 1)),
      el('div', {}, el('div', { class: 'part' }, PARTS[s.part]), el('h2', {}, s.title)),
      r && r.of ? el('span', { class: 'done-badge', title: '할 일(선택 제외)을 모두 끝낸 학생 수' }, `✓ ${r.done}/${r.of}명 완료`) : null),
    el('p', { class: 'goal' }, s.goal),
    (s.blocks || []).map((b) => blockNode(s, b, seen)));
}

function draw() {
  const stats = $('stats');
  const items = [['🧑‍🎓', READY ? `${DATA.people}명` : '—', '함께한 학생'], ['🧭', `${STEPS.length}단계`, '3교시 활동'],
    ['🧩', `${Object.keys(PROMPTS).length}개`, '프롬프트'], ['📱', '7+α', '앱서랍 기본 앱 + 내가 만든 앱']];
  stats.append(...items.map(([e, n, l]) => el('div', { class: 'stat' }, el('span', { class: 'e' }, e), el('b', {}, n), el('span', {}, l))));
  const toc = $('toc');
  [1, 2, 3].forEach((p) => {
    toc.append(el('div', { class: 'toc-part', style: `--c:${PART_COLOR[p]}` }, el('b', {}, PARTS[p]),
      el('div', { class: 'toc-row' }, STEPS.map((s, i) => (s.part === p ? el('a', { href: '#s-' + s.id }, `${i + 1}. ${s.short}`) : null)))));
  });
  const box = $('steps');
  let lastPart = 0;
  STEPS.forEach((s, i) => {
    if (s.part !== lastPart) { lastPart = s.part; box.append(el('h2', { class: 'part-title', style: `--c:${PART_COLOR[s.part]}` }, PARTS[s.part])); }
    box.append(stepCard(s, i));
  });
}
draw();
