// 자동 생성(tools/build_review.mjs) — 수업 사이트 common.js 의 「오늘 수업 단계」부분. 직접 고치지 말고 다시 만들기.
// ---------- 오늘 수업 단계 ----------
// 블록 종류: note(짧은 글) · prompt(복사할 프롬프트) · tasks(할 일 체크 — 다 했어요/막혔어요) · links · tool(화면 안에 띄우기)
//           check(한 가지 고르기 — 강사 화면에 집계) · post(벽에 올리기: idea·site·feel) · key(내 Gemini 키) · siteqr(내 웹 주소 QR)
// task id 는 단계 안에서 겹치지 않게, 저장은 prog.s['단계.할일'] = 1 다 함 / 2 막힘 / 3 선생님 확인
const RULES10 = `[꼭 지켜줘]
1. 파일은 하나만. HTML, CSS, 자바스크립트를 모두 넣은 단일 html 파일로 만들어줘.
2. 서버, 로그인, API KEY, Firebase, 외부 라이브러리는 쓰지 마. 인터넷이 없어도 열리게 해줘.
3. 내가 적은 기록은 브라우저의 localStorage에 저장해서, 껐다 켜도 그대로 남게 해줘.
   저장은 내용이 바뀔 때마다 저절로 되게 하고, 저장 버튼은 따로 만들지 마.
4. localStorage의 저장 이름(key)은 이 앱 이름을 영어로 넣어서 다른 앱과 겹치지 않게 해줘.
   기록 전체를 그 이름 하나에 JSON으로 담아줘.
5. 화면 왼쪽 위에 "← 앱서랍" 이라고 쓴 단추를 만들고, 누르면 같은 폴더의 index.html 로 이동하게 해줘.
6. 화면의 글자는 모두 한국어로 쓰고, 휴대폰으로 봐도 잘 보이게 만들어줘.
7. 처음 열었을 때 기록이 하나도 없어도 오류 없이 빈 화면이 잘 보이게 해줘.
8. alert, confirm 같은 알림창은 쓰지 말고, 알려 줄 말은 화면 안에 글자로 보여줘.
9. 코드는 중간에 끊지 말고 처음부터 끝까지 한 번에 다 써줘.
10. 코드 다음에, 이 파일을 저장할 때 쓸 파일 이름을 영어 소문자와 숫자로 하나 추천해줘. (예: reading.html)`;

const appPrompt = (name, what, must, look) => `너는 최고의 앱 개발 전문가야. 아래 앱을 만들어줘.

[내가 만들고 싶은 앱]
- 앱 이름: ${name}
- 무엇을 하는 앱: ${what}
- 꼭 있어야 할 기능: ${must}
- 꾸미고 싶은 점: ${look}

${RULES10}`;

export const PROMPTS = {
  // 11/21 사용자 요청: 짧은 프롬프트로도 앱이 만들어지는 걸 경험하게 — 규칙 10개 없이 두 줄만
  timer: `뽀모도로 공부 타이머 앱을 html 파일 하나로 만들어줘.
25분 공부·5분 쉬기를 번갈아 재고, 과목을 고르면 오늘 과목별 공부 시간과 뽀모도로 횟수를 보여줘. 기록은 껐다 켜도 남게 해줘.`,
  // 2교시: 1교시 타이머를 앱서랍(→ 내 앱스스크립트 서버)에 붙이는 연결 프롬프트. 앱서랍은 앱들의 localStorage 를 모아 시트로 보낸다.
  connect: `방금 만든 뽀모도로 타이머를 나만의 앱서랍에 넣으려고 해. 아래만 고쳐줘.
1. 기록 전체를 localStorage 의 "pomodoro" 이름 하나에 JSON으로 저장하고, 기록이 바뀔 때마다 바로 저장해줘.
2. 25분을 다 채우지 않고 멈춰도, 그때까지 잰 시간은 그 과목 기록에 더해줘.
3. 화면 왼쪽 위에 "← 앱서랍" 단추를 만들고, 누르면 같은 폴더의 index.html 로 이동하게 해줘.
4. alert 같은 알림창은 쓰지 마. 나머지 기능은 그대로 두고, 코드를 처음부터 끝까지 다시 써줘.`,
  myapp: appPrompt('(내 앱 이름)', '(이 앱으로 무엇을 하나요?)', '(꼭 있어야 할 기능 2~3가지)', '(색·분위기, 모르면 알아서 예쁘게)'),
  link1: `index.html 파일을 만들어줘.
- 화면 정중앙에 "START" 버튼 하나만 배치한다.
- START 버튼을 누르면 같은 폴더의 A01.html 페이지로 이동한다.
- 버튼은 크고 보기 좋게, 배경과 색을 깔끔하게 스타일링한다.
- 전체를 하나의 완성된 HTML 파일로 작성한다.`,
  link2: `A01.html 파일을 만들어줘.
- 화면에 "이전" 버튼과 "다음" 버튼 두 개를 나란히 배치한다.
- "이전" 버튼을 누르면 같은 폴더의 index.html 페이지로 이동한다.
- "다음" 버튼을 누르면 같은 폴더의 A02.html 페이지로 이동한다.
- 현재 페이지가 A01임을 알 수 있는 제목을 화면 가운데 표시한다.
- 전체를 하나의 완성된 HTML 파일로 작성한다.`,
  link3: `A02.html 파일을 만들어줘.
- 화면에 "이전" 버튼과 "다음" 버튼 두 개를 나란히 배치한다.
- "이전" 버튼을 누르면 같은 폴더의 A01.html 페이지로 이동한다.
- "다음" 버튼을 누르면 같은 폴더의 index.html 페이지로 이동한다(처음으로 돌아감).
- 현재 페이지가 A02임을 알 수 있는 제목을 화면 가운데 표시한다.
- 전체를 하나의 완성된 HTML 파일로 작성한다.`,
  fix: `방금 만든 앱에서 이것만 고쳐줘: (고치고 싶은 점)
나머지 기능과 localStorage 저장 이름은 그대로 두고, 고친 코드를 처음부터 끝까지 다시 써줘.`,
  chat: `너는 최고의 앱 개발 전문가야. Gemini API로 고등학생 공부 상담 채팅앱을 만들어줘.

[앱 내용]
- 학생이 공부 고민을 말하면 AI 상담 선생님이 답해 주는 채팅앱
- 말풍선 대화 화면, 고민 예시 버튼 3개, 대화 다시 시작 버튼
- 상담 선생님: 다정한 고등학교 선생님. 먼저 공감하고, 오늘 해 볼 방법을 3~5문장으로 짧게 알려 줘. 숙제 답은 그대로 알려 주지 마.

[Gemini API]
- API KEY: {KEY}
- 모델: gemini-3.1-flash-lite

[꼭 지켜줘]
1. 단일 html 파일로 만들어줘.
2. 앞에서 나눈 대화를 기억하게 해줘.
3. 왼쪽 위에 작은 "← 앱서랍" 단추를 만들고, 누르면 index.html 로 이동하게 해줘.
4. 한국어로, 휴대폰에서도 잘 보이게 만들어줘.
5. 코드는 끊지 말고 한 번에 다 써줘.`,
  coach: `방금 만든 채팅앱에서 AI가 아래 역할로 대답하게 바꿔줘. API KEY와 모델명, 저장 방식은 그대로 두고 고친 코드를 처음부터 끝까지 다시 써줘.

[역할 — 하나를 골라 남기세요]
- 실험 설계 코치: 너는 과학 탐구 지도 교사야. 내가 실험 계획을 말하면 변인 통제와 측정 방법을 질문으로 하나씩 점검해줘. 답을 대신 써 주지 마.
- 증명 코치: 너는 수학 증명 코치야. 답 대신 다음 단계의 힌트를 질문으로 하나만 줘.
- 개념 퀴즈 출제자: 너는 고등학교 과학 퀴즈 출제자야. 한 문제씩 내고 내 답을 채점한 뒤 왜 그런지 설명해줘.

[보고서 피드백을 받고 싶을 때 덧붙이기]
탐구 보고서 초안을 붙여넣으면 가설·변인·결론이 맞게 이어지는지 짚어줘. 고칠 점은 세 가지만, 고친 문장 대신 질문으로 알려줘.`,
  neis: `인천영흥고등학교 우리 반 시간표를 관리하는 앱을 HTML 파일 하나로 만들어줘.
아래 내용은 이미 실제로 확인한 사실이니, 네 생각으로 바꾸거나 빼지 말고 그대로 따라줘.

[바꾸면 안 되는 값]
- KEY : {NEIS}
- 지역 코드(ATPT_OFCDC_SC_CODE) : E10
- 학교 코드(SD_SCHUL_CODE) : 7310383
- 이 학교는 1·2·3학년 모두 1반, 2반 두 반만 있어. 반 고르기에는 1반·2반만 넣어. 처음 열면 1학년 1반.

[시간표 가져오기 — 나이스 API]
주소: https://open.neis.go.kr/hub/hisTimetable?KEY=위의KEY&Type=json&pSize=100&ATPT_OFCDC_SC_CODE=E10&SD_SCHUL_CODE=7310383&TI_FROM_YMD=월요일&TI_TO_YMD=금요일&GRADE=학년&CLASS_NM=반
- 날짜는 20261123 처럼 숫자 8자리.
- fetch(주소) 로 바로 부르고 .json() 으로 읽어. 나이스는 다른 사이트에서 불러도 되게 열려 있어서 바로 돼. allorigins 같은 프록시(중계) 주소는 절대 쓰지 마(인증키가 남의 서버로 새어 나가).
- 받은 값의 모양은 세 가지야. 셋 다 처리해줘.
  ① 시간표가 있을 때: { "hisTimetable": [ { "head": [...] }, { "row": [ {...}, {...} ] } ] } → hisTimetable[1].row 가 목록이야.
     목록 한 칸 예: { "ALL_TI_YMD": "20261123", "PERIO": "1", "ITRT_CNTNT": "물질과 에너지" } (교시 PERIO 는 글자라서 숫자로 바꿔 써)
  ② 그 주에 시간표가 없을 때: { "RESULT": { "CODE": "INFO-200", "MESSAGE": "해당하는 데이터가 없습니다." } } → 표 자리에 "이 주에는 시간표 정보가 없어요"
  ③ 인증키가 틀렸을 때: { "RESULT": { "CODE": "ERROR-290", ... } } → "인증키를 확인해 주세요"
  인터넷이 끊겨 fetch 가 실패하면 → "인터넷 연결을 확인해 주세요". try...catch 로 감싸서 어떤 경우에도 화면이 멈추지 않게 해.
- 과목 이름은 "영어Ⅱ", "사회·문화" 처럼 특수 글자가 들어 있어. 받은 글자를 그대로 보여줘.

[화면]
- 맨 위 왼쪽에 "← 앱서랍" 단추: 같은 폴더의 index.html 로 가는 <a href="index.html"> 링크.
- 학년(1~3)·반(1~2) 고르기. 바꾸면 바로 다시 불러와.
- ◀ 지난주 · 이번 주 · 다음 주 ▶ 단추와 "11/23(월) ~ 11/27(금)" 같은 날짜 범위.
- 시간표 표: 가로는 월~금(요일 밑에 날짜), 세로는 1~7교시. 받은 값에 8교시 이상이 있으면 그 줄까지 늘려. 수업이 없는 칸은 "-".
- 오늘 요일 줄은 연한 색으로 표시.
- 수업 칸을 누르면 화면 안에 메모 창(겹쳐 뜨는 상자)이 열려: 과목·날짜·교시, 글 상자, [저장] [삭제] [닫기]. 메모가 있는 칸에는 📝 표시.
- 불러오는 동안에는 "불러오는 중..." 이라고 써.

[이번 주 정하기]
- 오늘이 월~금이면 이번 주 월요일부터 금요일까지. 오늘이 토·일요일이면 다음 주 월~금을 보여줘.
- 날짜는 new Date(년, 월, 일) 과 getFullYear(), getMonth(), getDate() 로만 만들어. toISOString() 은 쓰지 마(한국 시간 아침에 어제 날짜가 나와).

[저장]
- localStorage 의 "timetable" 이름 하나에 JSON 으로 저장해. 모양은 꼭 이것:
  { "grade": "1", "classNm": "1", "memos": { "20261123_1": "수학 익힘책 30쪽" } }
  메모 이름은 "날짜8자리_교시". 학년·반을 바꾸거나 메모를 저장·삭제할 때마다 바로 저장하고, 저장 단추는 메모 창 안에만 둬.
- 처음 열어서 저장된 게 없거나 망가져 있어도 오류 없이 기본값으로 시작해.

[코드를 쓸 때 꼭 지켜줘 — 앞에서 실제로 틀렸던 것들]
1. 파일 하나(html 안에 style, script 다 넣기). 외부 라이브러리·글꼴·CDN·프록시는 쓰지 마.
2. 과목 이름이나 메모를 화면에 넣을 때는 textContent 와 document.createElement 로 넣어. innerHTML 에 글자를 이어 붙이지 말고, 특수문자 바꾸는 함수(escapeHtml)도 만들지 마. (예전에 이 함수의 "&quot;" 가 따옴표로 바뀌어 저장돼서 코드 전체가 멈춘 적이 있어)
3. alert, confirm, prompt 는 쓰지 마. 알려 줄 말은 화면 안에 글자로.
4. script 는 body 맨 끝에 하나, type="module" 없이. 처음 열 때 저장값 읽기 → 학년·반 칸에 넣기 → 시간표 불러오기 순서로.
5. 한국어로, 휴대폰 폭에서도 표가 넘치지 않게(넘치면 표만 옆으로 밀어 보기).
6. 코드는 중간에 끊거나 "...생략" 하지 말고 처음부터 끝까지 한 번에. 코드 상자 하나에 html 전체를 넣어.

[다 쓴 뒤 스스로 점검하고, 맞으면 코드 아래에 "점검 완료" 라고 써줘]
□ 반 고르기에 1반·2반만 있다 □ 주소에 프록시가 없다 □ INFO-200·ERROR-290 을 따로 처리했다
□ toISOString 이 없다 □ 저장 이름이 "timetable" 이다 □ alert·confirm 이 없다
□ 따옴표·괄호가 모두 짝이 맞아서 문법 오류가 없다`,
};

const SAVE_TIPS = '메모장 저장: [파일 → 다른 이름으로 저장] → 파일 형식 <b>모든 파일</b> → 이름 끝에 <b>.html</b> → 인코딩 <b>UTF-8</b> → 저장. 아이콘이 크롬 모양이면 성공!';

export const STEPS = [
  // ───── 1교시 · 바이브코딩으로 첫 앱 만들기 ─────  (11/21 사용자 재설계: 출석·기분 → 앱 체험 → 뽀모도로 → html 연결)
  { id: 'mood', tab: '출석·기분', part: 1, short: '출석·기분 체크', title: '출석 체크 & 오늘 기분', goal: '이름을 넣고 들어오면 출석이에요. 오늘 기분을 골라 주세요. 이름은 선생님 화면에만 보여요.', blocks: [{ type: 'mood' }] },
  // 11/21 저녁 사용자 요청: 출석·기분 다음에 새 탭에서 구글 계정 로그인 단계
  { id: 'glogin', tab: '구글 로그인', part: 1, short: '구글 로그인', title: '새 탭에서 구글 계정으로 로그인하기', goal: '오늘 쓰는 Gemini·구글 시트·Netlify는 모두 구글 계정으로 들어가요. 새 탭을 열어 내 실습 계정으로 한 번 로그인해 두면, 다음 활동부터는 바로 쓸 수 있어요.',
    blocks: [
      { type: 'acct' },
      { type: 'links', items: [{ label: '새 탭에서 구글 로그인 열기', url: 'https://accounts.google.com/', emoji: '1f511' }] },
      { type: 'tasks', items: [
        { id: 'tab', text: '위 <b>새 탭에서 구글 로그인 열기</b> 단추를 눌러 새 탭을 열었어요', hint: '이 실습 사이트 탭은 닫지 말고 그대로 두어요. 탭 사이를 오갈 때는 <kbd>Ctrl</kbd>+<kbd>Tab</kbd>.' },
        { id: 'id', text: '<b>📋 아이디 복사</b> → 「이메일 또는 휴대전화」 칸에 <kbd>Ctrl</kbd>+<kbd>V</kbd> → <b>다음</b>', hint: '이미 다른 계정으로 로그인된 화면이 나오면 <b>다른 계정 사용</b>(또는 오른쪽 위 프로필 → 다른 계정 추가)을 눌러요.' },
        { id: 'pw', text: '<b>📋 비밀번호 복사</b> → 비밀번호 칸에 <kbd>Ctrl</kbd>+<kbd>V</kbd> → <b>다음</b>', hint: '처음 로그인하면 환영·약관 화면이 나올 수 있어요 → <b>동의</b>·<b>확인</b>을 눌러 넘어가요. 비밀번호를 바꾸라고 하면 🙋 막혔어요를 눌러요.' },
        { id: 'done', text: '오른쪽 위 동그란 프로필을 눌러 <b>내 실습 계정(math○○)</b>이 보이는 걸 확인했어요', hint: '실습 계정이 다 찼거나 로그인이 안 되면 <b>개인 구글 계정</b>으로 로그인해도 돼요.' }] },
      { type: 'note', html: '🔐 실습 계정은 오늘 수업용이에요. 다른 사람에게 알려 주지 않고, 수업이 끝나면 로그아웃해요.' }] },
  { id: 'play', tab: '앱 체험', part: 1, short: '앱 체험: 방탈출', title: '앱 체험하기: 방탈출 게임', goal: '오늘 만들 "웹앱"이 어떤 건지 먼저 놀면서 느껴 봐요. 이 게임도 html 파일로 만들어졌어요.',
    blocks: [
      { type: 'game', label: '방탈출 게임 열기' },
      { type: 'tasks', items: [
        { id: 'play', text: '방탈출 게임을 열어 문제를 풀며 끝까지 가 봤어요', hint: '막히면 짝과 같이 풀어도 돼요. 시간이 다 되면 거기까지만!' },
        { id: 'think', text: '"다음 방으로 넘어가는 건 어떻게 만들었을까?" 생각해 봤어요 — 이 교시 마지막 <b>html 연결</b>에서 직접 만들어 봐요' }] }] },
  { id: 'timer', tab: '뽀모도로', part: 1, short: '뽀모도로 타이머', title: '첫 번째 앱: 뽀모도로 타이머 만들기', goal: '짧은 프롬프트로도 앱이 만들어져요. Gemini를 준비하고, 프롬프트를 붙여 넣어 나온 코드를 html 파일로 저장해 열어 봐요.',
    blocks: [
      { type: 'links', items: [{ label: 'Gemini 열기', url: 'https://gemini.google.com', emoji: '1f4bb' }] },
      { type: 'note', html: '🧰 <b>먼저 준비</b> — Gemini 열기(이미 로그인됨), 메모장' },
      { type: 'tasks', items: [
        { id: 'login', text: '위 <b>Gemini 열기</b>로 gemini.google.com 을 열고, 오른쪽 위 프로필이 <b>내 실습 계정</b>인지 확인했어요', hint: '로그인 화면이 나오면 2단계처럼 실습 계정으로 로그인해요. 다른 계정이 보이면 프로필을 눌러 실습 계정으로 바꿔요.' },
        { id: 'model', text: '입력 칸 오른쪽 모델 단추를 눌러 <b>4 Hydrogen</b>(일상생활 지원)으로 바꿨어요', hint: '가벼운 모델이라 코드가 빨리 나와요. 새 채팅을 열 때마다 한 번 확인해요.', img: [{ src: 's18_gemini_model', cap: '모델 단추 → 4 Hydrogen' }] },
        { id: 'pad', text: '<b>메모장</b>을 열었어요 (시작 단추 → "메모장" 검색)' },
        ] },
      { type: 'prompt', title: '1. 이 프롬프트를 복사해 Gemini에 붙여 넣기', key: 'timer' },
      { type: 'tasks', items: [
        { id: 'code', text: 'Gemini가 만든 코드 상자 오른쪽 위 <b>복사</b> 단추로 코드를 복사했어요', hint: '코드 대신 앱 화면(미리 보기)이 바로 나오면 오른쪽 위 <b>코드</b> 보기로 바꾸거나 <b>⬇ 다운로드</b>로 받아요. 받은 파일은 이름을 timer.html 로 바꾸면 돼요.' },
        { id: 'save', text: '메모장에 붙여 넣고 <b>timer.html</b> 로 저장했어요', hint: SAVE_TIPS },
        { id: 'open', text: '저장한 파일을 더블클릭해 크롬에서 열고 타이머를 눌러 봤어요' },
        { id: 'fix', text: '"이것만 고쳐줘" 로 한 번 고쳐 달라고 해 봤어요 — 아래 2번 프롬프트에 내 생각을 쓰거나, 맨 아래 <b>⚡ 도전</b> 단추 하나 고르기', hint: '고친 코드를 다시 복사해 timer.html 에 덮어쓰고, 크롬에서 <kbd>F5</kbd>(새로 고침) 하면 바뀐 앱이 보여요.' }] },
      { type: 'prompt', title: '2. 고쳐 달라고 할 때', key: 'fix', small: true },
      { type: 'more', items: [
        { label: '⏱ 시간 바꾸기', text: '공부·쉬는 시간을 내가 바꿀 수 있게 해줘(예: 50분 공부·10분 쉬기)' },
        { label: '🔔 끝나면 소리', text: '공부·쉬는 시간이 끝나면 짧은 소리와 함께 화면에 크게 알려줘. 알림창(alert)은 쓰지 마' },
        { label: '📊 과목별 막대그래프', text: '오늘 과목별 공부 시간을 막대그래프로 보여줘' },
        { label: '🌙 다크 모드', text: '밤에 보기 편한 다크 모드 단추를 넣어줘' },
        { label: '🍅 토마토 모으기', text: '뽀모도로 한 번을 끝낼 때마다 🍅 하나씩 쌓이게 보여줘' }] }] },
  { id: 'link', tab: '파일 연결', part: 1, short: 'html 연결', title: 'html 파일끼리 연결하기', goal: '앱서랍의 비밀: 한 파일에서 다른 파일로 넘어가는 "연결"을 프롬프트 세 개로 만들어 봐요.',
    blocks: [
      { type: 'note', html: '🔗 <b>index.html</b> ─START→ <b>A01.html</b> ─다음→ <b>A02.html</b> ─다음→ <b>index.html</b> (처음으로) · 「이전」은 거꾸로 한 칸' },
      { type: 'tool', url: '/tools/link-practice.html', height: 560, title: '연결 구조 그림 크게 보기', collapsed: true },
      { type: 'prompt', title: '① index.html — 복사해 Gemini에 보내고 index.html 로 저장', key: 'link1', small: true },
      { type: 'prompt', title: '② A01.html — 같은 대화에 보내고 A01.html 로 저장', key: 'link2', small: true },
      { type: 'prompt', title: '③ A02.html — 같은 대화에 보내고 A02.html 로 저장', key: 'link3', small: true },
      { type: 'tasks', items: [
        { id: 'folder', text: '바탕화면에 <b>연결연습</b> 폴더를 만들었어요' },
        { id: 'files', text: '①②③ 프롬프트로 <b>index.html · A01.html · A02.html</b> 세 파일을 만들어 같은 폴더에 저장했어요', hint: '세 프롬프트를 같은 Gemini 대화에서 차례로 보내도 돼요. 파일 이름의 대문자·소문자까지 똑같아야 연결돼요(A01 은 대문자 A + 숫자 영·일).' },
        { id: 'go', text: 'index.html 을 열어 <b>START → 다음 → 다음</b> 으로 한 바퀴 돌아 처음 화면으로 왔어요' }] },
      { type: 'more', title: '⚡ 다 했으면 도전! — 나만의 3쪽 웹사이트', items: [
        { label: '🙋 나를 소개하는 3쪽', raw: true, text: '방금 만든 index.html, A01.html, A02.html 세 파일을 "나 소개 → 내 취미 → 내 꿈" 내용으로 바꾸고 디자인을 통일해줘. 단추와 연결(파일 이름)은 그대로 두고, 세 파일 코드를 모두 처음부터 끝까지 다시 써줘.' },
        { label: '❓ 퀴즈 3쪽', raw: true, text: '방금 만든 index.html, A01.html, A02.html 세 파일을 퀴즈로 바꿔줘. index는 퀴즈 시작 화면, A01·A02는 문제 1·2번이고 정답을 누르면 다음 페이지로, 틀리면 화면에 "다시!"가 나오게. 파일 이름과 연결은 그대로 두고, 세 파일 코드를 모두 다시 써줘.' }] }] },

  // ───── 2교시 · 나만의 앱서랍과 나만의 서버 ─────  (앱서랍 → 서버 → 타이머 연결·서랍 → 나이스 시간표)
  { id: 'drawer', tab: '앱서랍', part: 2, short: '앱서랍 열기', title: '나만의 앱서랍 내려받아 열기', goal: '기본 앱 7가지가 들어 있는 앱서랍 폴더를 내려받아 내 컴퓨터에서 열어요. 나머지는 내가 직접 만들어 채워요.',
    blocks: [
      { type: 'links', items: [{ label: '나만의 앱서랍 폴더 내려받기 (zip)', url: '/files/appdrawer.zip', emoji: '1f4c4', download: 'appdrawer.zip' }] },
      { type: 'tasks', items: [
        { id: 'down', text: 'appdrawer.zip 을 내려받았어요' },
        { id: 'unzip', text: 'zip 파일을 오른쪽 클릭 → <b>압축 풀기(모두 압축 풀기)</b> 했어요', hint: '압축을 풀지 않고 안에서 바로 열면 배경과 앱 연결이 안 돼요. 풀린 폴더를 바탕화면에 두면 찾기 쉬워요.' },
        { id: 'open', text: '풀린 폴더의 <b>index.html</b> 을 열어 앱서랍이 보였어요', img: [{ src: 's11_drawer', cap: '기본 앱 7개 + 앱 추가' }] },
        { id: 'try', text: '앱 하나를 열어 써 보고 <b>← 앱서랍</b> 으로 돌아왔어요', img: [{ src: 's12_todo', cap: '예: 오늘의 할일에 한 줄 적기' }] }] }] },
  { id: 'server', tab: '나만의 서버', part: 2, short: '나만의 서버', title: '나만의 서버 만들기 (구글 시트 + 앱스스크립트)', goal: '내 구글 시트를 "서버"로 만들어 앱 사용 기록과 앱 데이터를 저장하고 불러와요. 앱서랍 맨 아래 「내 서버 연결하기」 상자를 따라 해요. (약 20분 · 그림을 눌러 크게 보며 한 칸씩! 막히면 🙋 — 다음 활동은 서버 없이도 할 수 있어요)',
    blocks: [
      { type: 'flow' },
      { type: 'acct', mini: true },
      { type: 'links', items: [{ label: '서버 시트 사본 만들기 (구글 시트)', url: 'https://docs.google.com/spreadsheets/d/1da7gQET1imqP6D5BeSQ5mEghuORwqPwz1ZAWmvhWtQk/copy', emoji: '1f4c4' }] },
      { type: 'tasks', items: [
        { id: 'copy', text: '위 단추(또는 앱서랍 맨 아래 <b>📗 서버 시트 사본 만들기</b>) → <b>[사본 만들기]</b>', hint: '내 구글 계정으로 로그인한 상태여야 해요. 사본에는 서버 코드가 이미 들어 있어요.', img: [{ src: 's01_copy', cap: '[사본 만들기] 누르기' }] },
        { id: 'sheet', text: '사본 시트에서 <b>확장 프로그램 → Apps Script</b> 를 열었어요', hint: '「현재 파일을 열 수 없습니다」가 나오면 크롬에 구글 계정이 여러 개 로그인된 경우예요. <b>script.google.com</b> 을 열고 오른쪽 위에서 내 계정으로 바꾼 뒤 「나만의 앱서랍 서버」 프로젝트를 누르세요.', img: [{ src: 's02_sheet_copy', cap: '사본 시트가 열려요' }, { src: 's03_ext_menu', cap: '확장 프로그램 → Apps Script' }] },
        { id: 'run', text: '함수 칸이 <b>setup</b> 인 채로 <b>▶ 실행</b> → <b>권한 검토</b> → 내 계정 → <b>고급</b> → <b>(안전하지 않음)으로 이동</b> → <b>허용</b>', hint: '권한 창은 새 창으로 떠요. 안 보이면 주소창 오른쪽의 팝업 차단 아이콘을 눌러 허용하세요. 내가 만든 앱이라 「확인되지 않은 앱」이 정상이에요.', img: [{ src: 's04_editor', cap: '함수 칸 setup → ▶ 실행' }, { src: 's05_auth_needed', cap: '권한 검토 누르기' }, { src: 's06_setup_log', cap: '✅ 준비 끝! 이 나오면 성공' }] },
        { id: 'deploy', text: '<b>배포 → 새 배포</b> → 웹 앱 · 실행: <b>나</b> · 액세스: <b>모든 사용자</b> → <b>배포</b> → (액세스 승인이 또 나오면 눌러서 다시 허용)', hint: '액세스를 "모든 사용자"로 해야 앱서랍이 내 시트에 닿아요. 「액세스 승인」은 setup 때 허용했어도 한 번 더 나올 수 있어요.', img: [{ src: 's07_deploy_menu', cap: '배포 → 새 배포' }, { src: 's08_deploy_dialog', cap: '웹 앱 · 나 · 모든 사용자 → 배포' }, { src: 's09_access_approve', cap: '액세스 승인 → 다시 허용' }, { src: 's10_deploy_done', cap: '웹 앱 URL 옆 [복사]' }] },
        { id: 'connect', text: '<b>웹 앱 URL</b>(끝이 /exec)을 앱서랍 맨 아래 칸에 붙여 넣고 <b>연결</b> → 🎉 연결했어요!', hint: '/dev 로 끝나는 주소, 편집 화면 주소는 안 돼요. 「배포」를 마치면 나오는 웹 앱 URL 이에요.', img: [{ src: 's13_paste_url', cap: '붙여 넣고 [연결]' }, { src: 's14_connected', cap: '내 서버: 연결됨' }] },
        { id: 'see', text: '<b>📗 내 시트 열기</b> → [앱 데이터]·[사용 기록] 탭에 내 기록이 보여요', img: [{ src: 's15_sheet_data', cap: '[앱 데이터] 앱에 적은 내용' }, { src: 's16_sheet_log', cap: '[사용 기록] 어떤 앱을 몇 초 썼는지' }, { src: 's35_summary', cap: '[앱별 요약] 앱마다 모아 보기' }] }] },
      { type: 'note', html: '🔒 내 시트는 다른 사람과 <b>공유하지 않아요</b>. 서버는 <b>처음 연결한 앱서랍의 열쇠</b>만 받아서, 주소를 알아도 그 앱서랍이 아니면 시트를 못 읽어요. 연결한 뒤 <b>💾 서랍 저장하기</b>를 하면 연결이 index.html 에 담겨서, 웹에 올린 앱서랍도 <b>저절로 연결</b>돼요(대신 웹 주소를 아는 사람은 내 시트를 읽고 쓸 수 있으니 주소는 친한 사람에게만).' }] },
  { id: 'decorate', tab: '타이머 연결', part: 2, short: '타이머 서버 연결', title: '1교시 타이머를 서버에 연결하고 앱서랍에 넣기', goal: '타이머를 앱서랍에 넣으면, 타이머 기록이 앱서랍을 거쳐 내 서버(앱스스크립트) → 내 구글 시트에 저장돼요. 먼저 Gemini에게 저장 방식을 맞춰 달라고 해요.',
    blocks: [
      { type: 'note', html: '🔗 ⏱ timer.html ─기록→ localStorage <b>"pomodoro"</b> ─← 앱서랍으로 돌아오면→ 📱 앱서랍 ─보내기→ 🔑 내 앱스스크립트 ─쓰기→ 📗 내 시트 [앱 데이터]' },
      { type: 'prompt', title: '1. 연결 프롬프트 — 1교시 타이머를 만든 Gemini 대화에 붙여 넣기', key: 'connect' },
      { type: 'tasks', items: [
        { id: 'fixcode', text: '고친 코드를 <b>timer.html</b> 에 덮어쓰고, 왼쪽 위에 <b>← 앱서랍</b> 단추가 생긴 걸 봤어요', hint: '1교시 대화를 닫았으면 새 대화에 timer.html 코드를 먼저 붙여 넣고, 그 아래에 연결 프롬프트를 이어 붙여 보내요. ' + SAVE_TIPS },
        { id: 'name', text: '앱서랍에서 <b>✏️ 편집</b>을 누르고 "OOO" 을 내 이름으로 바꿨어요' },
        { id: 'move', text: 'timer.html 을 앱서랍 폴더 안으로 옮겼어요', hint: '앱 파일은 index.html 과 같은 폴더에 있어야 열려요.' },
        { id: 'add', text: '<b>＋ 앱 추가</b>로 <b>timer.html</b> 을 서랍에 넣었어요 (앱 이름 · 파일 이름 timer.html · 아이콘 · 색)', img: [{ src: 's22_add_app', cap: '앱 이름·연결할 파일 이름·아이콘·색' }] },
        { id: 'save', text: '<b>💾 서랍 저장하기</b> → 앱서랍 폴더의 <b>index.html</b> 에 덮어썼어요', hint: '주황색 테두리와 빨간 안내가 사라지면 저장된 거예요. 다른 폴더나 index (1).html 로 저장하면 안 돼요.', img: [{ src: 's23_added', cap: '이 안내가 보이면 아직 저장 전' }] },
        { id: 'use', text: '서랍에서 타이머를 열어 잠깐 재고 <b>멈춤</b> → <b>← 앱서랍</b> 으로 돌아오니 「시트에 저장했어요」가 떴어요', hint: '서버를 아직 연결하지 못했다면 이 글은 안 떠요. 앞 단계 「나만의 서버」의 마지막 칸(연결)부터 확인해요.', img: [{ src: 's25_synced', cap: '돌아오면 시트에 저장' }] },
        { id: 'sheet', text: '<b>📗 내 시트 열기</b> → [앱 데이터]에 <b>pomodoro</b> 줄이, [사용 기록]에 타이머를 쓴 시간이 보여요', img: [{ src: 's15_sheet_data', cap: '[앱 데이터] 앱에 적은 내용' }, { src: 's16_sheet_log', cap: '[사용 기록] 어떤 앱을 몇 초 썼는지' }] },
        { id: 'bg', text: '(하고 싶은 사람만) 배경화면을 바꿨어요 — 그림을 <b>배경화면.png</b> 로 덮어쓰기', optional: true }] },
      { type: 'tool', url: '/tools/bg-prompt.html', height: 520, title: '(선택) 배경화면 그림 만들기 프롬프트', collapsed: true }] },
  { id: 'neis', tab: '시간표 앱', part: 2, short: '나이스 시간표 앱', title: '나이스 API로 시간표 관리앱 만들기', goal: '나이스(NEIS) 공공데이터 API로 우리 반 이번 주 시간표를 불러오고, 수업마다 숙제·준비물 메모를 남겨요. 메모도 앱서랍을 거쳐 내 시트에 저장돼요.',
    blocks: [
      { type: 'note', html: '🌐 <b>API</b> = 다른 서버에 "이 정보 주세요" 하고 주소로 부탁하는 방법. 나이스 서버에 학교 코드·날짜·학년·반을 넣어 부탁하면 시간표를 보내 줘요.' },
      { type: 'links', items: [{ label: '나이스 교육정보 개방 포털 — Open API 인증키 발급', url: 'https://open.neis.go.kr/portal/guide/apiIntroPage.do', emoji: '1f511' }] },
      { type: 'note', html: '🔑 <b>내 인증키를 직접 받을 수 있어요</b>: 위 단추 → 회원가입·로그인 → <b>인증키 신청</b>(활용 용도 적기) → <b>마이페이지 → 인증키 발급 내역</b>에서 복사. 아래 프롬프트에는 선생님 키가 미리 들어 있으니, 내 키를 받았다면 <b>KEY : </b> 뒤만 내 키로 바꿔 보내요.' },
      { type: 'note', html: '📝 <b>인증키 신청서는 이렇게 채워요</b> (회색 ●●● 칸은 각자 자기 것으로)<table class="formref"><tr><th>소속</th><td><b>인천영흥고</b></td></tr><tr><th>성명</th><td><span class="mask">●●● (내 이름)</span></td></tr><tr><th>사용자구분</th><td><b>중고등학생</b></td></tr><tr><th>이메일</th><td><span class="mask">●●●@●●● (내 이메일)</span> · E-mail수신여부 ✓</td></tr><tr><th>연락처</th><td><span class="mask">010-●●●●-●●●● (내 번호)</span></td></tr><tr><th>기관여부</th><td><b>N</b></td></tr><tr><th>기관명</th><td>(비워 둠)</td></tr><tr><th>활용용도</th><td><b>프로그램 개발(앱, 웹 등)</b> ← 꼭 이것</td></tr><tr><th>신청유형</th><td><b>개발계정</b> ← 꼭 이것</td></tr><tr><th>서비스명</th><td><b>없음</b></td></tr><tr><th>서비스URL</th><td>(비워 둠)</td></tr><tr><th>서비스 설명 또는 활용내용</th><td>(비워 둠)</td></tr></table>' },
      { type: 'prompt', title: '프롬프트를 통째로 복사 → Gemini에 붙여 넣기 (나이스 키가 이미 들어가 있어요)', key: 'neis', fill: 'NEIS' },
      { type: 'tasks', items: [
        { id: 'save', text: '<b>timetable.html</b> 로 저장해 <b>앱서랍 폴더</b>에 넣고 열었어요', hint: SAVE_TIPS },
        { id: 'week', text: '내 학년·반을 고르니 <b>이번 주(11/23~27)</b> 시간표가 표로 나왔어요', hint: '"정보가 없어요"가 나오면 학년·반을 다시 고르거나 ◀ 지난주로 가 봐요.' },
        { id: 'memo', text: '수업 칸을 눌러 <b>숙제·준비물 메모</b>를 하나 적었어요' },
        { id: 'mykey', optional: true, text: '(하고 싶은 사람만) 나이스 포털에서 <b>내 인증키</b>를 발급받아 KEY 를 내 것으로 바꿨어요', hint: '내 키로 만든 앱은 수업이 끝나도 계속 쓸 수 있어요. 키는 비밀번호처럼 나만 알고, 웹에 올리지 않아요.' },
        { id: 'add', text: '<b>＋ 앱 추가</b> → 💾 <b>서랍 저장하기</b> → 서랍에서 열고 돌아오니 「시트에 저장했어요」가 떴어요', hint: '서버를 연결하지 못했다면 서랍에서 열리고 메모가 남으면 ✓ 눌러도 돼요.' }] },
      { type: 'note', html: '⚠️ 이 앱에는 선생님의 나이스 인증키가 들어 있어요. 3교시에 <b>웹에 올릴 때는 이 파일을 폴더에서 빼요</b>.' },
      { type: 'more', title: '⚡ 시간표 앱 도전', items: [
        { label: '🍱 오늘 급식도', text: '시간표 아래에 고른 날의 급식도 보여줘. 급식 주소: https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=같은KEY&Type=json&ATPT_OFCDC_SC_CODE=E10&SD_SCHUL_CODE=7310383&MLSV_YMD=날짜8자리 · 프록시 없이 fetch 로 바로 불러. 메뉴는 mealServiceDietInfo[1].row 에서 MMEAL_SC_NM 이 "중식"인 칸의 DDISH_NM 이고, "클로렐라쌀밥 <br/>고)부대찌개*라면사리 (1.2.5.6.9)" 처럼 <br/> 로 나뉘어 있어. <br/> 로 쪼개고 끝의 (1.2.5) 같은 알레르기 번호는 지워서 한 줄씩 textContent 로 보여줘. 급식이 없으면 { "RESULT": { "CODE": "INFO-200" } } 이 오니 "급식 정보가 없어요". 급식이 실패해도 시간표는 그대로 보여야 해. KEY와 학교 코드, 저장 이름 "timetable" 은 그대로 둬' },
        { label: '⭐ 오늘 강조', text: '오늘 요일 줄과 지금 교시 칸을 색으로 강조해줘. KEY와 학교 코드는 그대로 둬' },
        { label: '✅ 숙제 체크', text: '메모마다 체크 칸을 넣어서 다 한 숙제는 줄이 그어지게 하고, 이번 주 남은 숙제 수를 위에 보여줘. KEY와 학교 코드, 저장 이름은 그대로 둬' }] }] },

  // ───── 3교시 · AI 앱 만들고 웹에 올리기 ─────  (공부 상담앱 → 나만의 앱 → Netlify 배포 → 마무리)
  { id: 'api', tab: '공부 상담', part: 3, short: '공부 상담앱', title: 'Gemini API로 공부 상담앱 만들기', goal: '내 앱 안에서 AI가 대답하게 하려면 API KEY가 필요해요. 오늘 쓸 키를 하나씩 나눠 줄게요.',
    blocks: [
      { type: 'key' },
      { type: 'note', html: '🔑 API KEY는 <b>비밀번호와 같아요</b>. 친구에게 보내거나 웹에 올리지 않기로 약속해요. 오늘 수업이 끝나면 선생님이 키를 지워요.' },
      { type: 'links', items: [{ label: 'Google AI Studio — 내 Gemini API 키 발급', url: 'https://aistudio.google.com/api-keys', emoji: '1f511' }] },
      { type: 'note', html: '🙋 <b>내 키를 직접 받아 봐도 돼요</b>(Create API key). 학생 계정은 키가 안 나오거나 바로 막힐 수 있어서, 아래 프롬프트에는 <b>선생님 키</b>가 번호 순서대로 미리 들어가 있어요. 내 키가 잘 되면 프롬프트의 <b>API KEY:</b> 뒤만 내 키로 바꿔요.' },
      { type: 'prompt', title: '1. 공부 상담 채팅앱 — 내 키가 이미 들어가 있어요', key: 'chat', fill: 'KEY' },
      { type: 'tasks', items: [
        { id: 'save', text: '<b>chat.html</b> 로 저장하고 열어 대화해 봤어요', hint: '답이 안 오면 키·모델명 오타, 또는 사용량 한도예요. 선생님께 다른 번호를 받아요.' },
        { id: 'coach', text: '2번 프롬프트로 AI에게 역할(탐구 도우미)을 입혔어요' },
        { id: 'mykey', optional: true, text: '(하고 싶은 사람만) AI Studio에서 <b>내 Gemini 키</b>를 받아 바꿔 봤어요', hint: '내 키로 답이 안 오면 선생님 키(프롬프트에 들어 있던 것)로 되돌려요.' }] },
      { type: 'prompt', title: '2. 탐구 도우미 챗봇으로 바꾸기 (같은 대화에서)', key: 'coach' },
      { type: 'more', title: '⚡ 챗봇 꾸미기 도전', items: [
        { label: '🧑‍🔬 과학자 캐릭터', text: 'AI가 유명한 과학자 캐릭터 말투로 대답하게 하고, 첫 화면에 캐릭터 소개를 넣어줘. API KEY와 모델명은 그대로 둬' },
        { label: '📝 대화 내려받기', text: '대화 내용을 txt 파일로 내려받는 단추를 넣어줘. API KEY와 모델명은 그대로 둬' },
        { label: '💭 생각 중… 표시', text: 'AI가 답을 쓰는 동안 "생각 중…" 점 세 개가 움직이게 해줘. API KEY와 모델명은 그대로 둬' }] }] },
  { id: 'idea', tab: '나만의 앱', part: 3, short: '나만의 앱', title: '나만의 앱 만들기', goal: '동아리·공부·생활에서 "이런 앱 있으면 좋겠다"를 한 줄로 올리고, 프롬프트 틀로 직접 만들어 내 앱서랍에 넣어요.',
    blocks: [
      { type: 'post', kind: 'idea', label: '내 앱 아이디어 한 줄', placeholder: '예: 화학 실험 준비물을 체크하고 안전 수칙을 알려 주는 앱', max: 120 },
      { type: 'prompt', title: '내 앱 프롬프트 틀 — 괄호 안만 바꿔서 Gemini에 붙여 넣기', key: 'myapp' },
      { type: 'tasks', items: [
        { id: 'make', text: '프롬프트 틀의 괄호를 내 아이디어로 채워 Gemini(<b>4 Hydrogen</b>)에 보냈어요', img: [{ src: 's19_gemini_prompt', cap: '괄호만 바꿔서 보내기' }] },
        { id: 'down', text: '코드 상자 오른쪽 위 <b>⬇ 코드 다운로드</b>를 눌렀어요', hint: '내려받기가 안 되면 옆의 복사 단추 → 메모장에 붙여 넣고 저장해도 돼요. ' + SAVE_TIPS, img: [{ src: 's20_gemini_code', cap: '코드 상자 오른쪽 위 ⬇' }, { src: 's21_gemini_download', cap: '코드 다운로드' }] },
        { id: 'rename', text: '받은 <b>gemini-code-….html</b> 을 Gemini가 추천한 이름(예: <b>experiment.html</b>)으로 바꿔 <b>앱서랍 폴더</b>에 넣었어요', hint: '다운로드 폴더에서 파일을 누르고 <kbd>F2</kbd> → 이름 바꾸기. 영어 소문자로, 끝은 .html 그대로!' },
        { id: 'add', text: '<b>＋ 앱 추가</b>로 서랍에 넣고 💾 <b>서랍 저장하기</b>까지 했어요' },
        { id: 'use', text: '내 앱에 기록을 적고 <b>← 앱서랍</b> 으로 돌아오니 「시트에 저장했어요」가 떴어요', hint: '아직 서버를 연결하지 못했다면 이 글은 안 떠요. 내 앱이 서랍에서 열리고 기록이 남으면 ✓ 눌러도 돼요.', img: [{ src: 's24_experiment', cap: '예: 실험 기록장에 한 건 적기' }, { src: 's25_synced', cap: '돌아오면 시트에 저장' }, { src: 's34_sheet_data2', cap: '[앱 데이터]에 내 앱 기록이 추가됨' }] }] },
      { type: 'more', title: '⚡ 내 앱 한 단계 키우기', items: [
        { label: '🔍 검색 칸', text: '기록을 검색하는 칸을 넣어줘' },
        { label: '📅 날짜별 모아 보기', text: '기록을 날짜별로 묶어서 보여줘' },
        { label: '📈 통계 카드', text: '기록을 세어 위쪽에 통계(개수·합계·평균)를 카드로 보여줘' },
        { label: '🎉 완료 축하 효과', text: '무언가를 끝내거나 기록하면 화면에 색종이 축하 효과가 터지게 해줘. 외부 라이브러리 없이' }] },
      { type: 'wall', kind: 'idea', title: '친구들의 아이디어' }] },
  { id: 'netlify', tab: '웹에 올리기', part: 3, short: '웹에 올리기', title: '내 앱서랍을 웹에 올려 주소 만들기 (Netlify)', goal: '앱서랍 폴더를 통째로 Netlify에 올리면 휴대폰에서도 열리는 나만의 주소가 생겨요.',
    blocks: [
      { type: 'links', items: [{ label: 'Netlify 열기 (app.netlify.com)', url: 'https://app.netlify.com', emoji: '1f4bb' }] },
      { type: 'acct', mini: true },
      { type: 'tasks', items: [
        { id: 'nokey', text: '올리기 전에 <b>키가 든 파일</b>(<b>chat.html</b> · <b>timetable.html</b>)을 앱서랍 폴더 <b>밖으로</b> 옮겼어요', hint: '웹에 올린 파일은 누구나 열어 코드(키)를 볼 수 있어요. 서랍에 카드가 남아 있어도 괜찮아요 — 웹에서는 그 카드만 안 열려요.' },
        { id: 'signup', text: '<b>Sign up → Google</b> 로 내 구글 계정 가입·로그인했어요' },
        { id: 'drop', text: 'Projects 화면 아래 <b>Drag and drop your folder here</b> 칸에 앱서랍 <b>폴더를 통째로</b> 끌어다 놓았어요', hint: '폴더 안의 파일 몇 개가 아니라 폴더 자체를 끌어다 놓아요(zip 파일도 돼요). 올리기 전에 💾 서랍 저장하기를 눌렀는지 확인!', img: [{ src: 's27_netlify_drop', cap: '아래 칸에 폴더 끌어다 놓기' }] },
        { id: 'public', text: '<b>Who can access</b> 아래 <b>🚀 Make public</b> 을 눌렀어요', hint: '처음에는 「내 팀에만 보임」이라 친구가 열면 Netlify 로그인 화면이 나와요. 꼭 Make public!', img: [{ src: 's28_netlify_public', cap: 'Public 확인 → Make public' }] },
        { id: 'open', text: 'Netlify가 만든 주소(…netlify.app)를 열어 내 앱서랍이 보였어요', img: [{ src: 's29_netlify_ready', cap: 'Your project is ready! 주소 누르기' }] },
        { id: 'phone', text: '아래 QR로 휴대폰에서도 내 앱서랍을 열었어요' },
        { id: 'server', text: '웹 주소의 앱서랍 맨 아래가 <b>「앱서랍에 담긴 서버 주소로 연결했어요」</b>(내 서버: 연결됨)로 보여요', hint: '7단계에서 서버를 연결한 뒤 <b>💾 서랍 저장하기</b>를 하면 연결이 index.html 에 담겨 올라가요. 연결이 안 보이면 내 컴퓨터 앱서랍에서 서랍 저장하기 → Netlify <b>Deploys</b> 맨 아래에 폴더를 다시 올려요. 그래도 안 되면 내 컴퓨터 앱서랍의 <b>🔗 다른 기기용 연결 주소</b>(끝에 #k=)를 웹 앱서랍에 붙여 넣어요.', img: [{ src: 's32_web_connected', cap: '시트에서 가져왔어요!' }, { src: 's33_web_experiment', cap: '컴퓨터에서 적은 기록이 웹에서도 보여요' }] }] },
      { type: 'post', kind: 'site', label: '내 앱서랍 주소', placeholder: 'https://○○○.netlify.app', max: 200, url: true },
      { type: 'siteqr' },
      { type: 'note', html: '⚠️ <b>키가 든 앱</b>(공부 상담앱 chat.html · 시간표 앱 timetable.html)은 웹에 올리지 않아요. 내 컴퓨터 앱서랍에서만 써요.' },
      { type: 'wall', kind: 'site', title: '친구들의 앱서랍' }] },

  { id: 'wrap', tab: '마무리', part: 3, short: '마무리', title: '오늘 수업 마무리', goal: '오늘 만든 것을 담아 가고, 한 줄 소감을 남겨 주세요.',
    blocks: [
      { type: 'post', kind: 'feel', label: '오늘 수업 한 줄 소감', placeholder: '예: 말로 앱을 만들 수 있다는 게 신기했고, 내 타이머 기록이 시트에 쌓이는 게 재밌었다', max: 150 },
      { type: 'survey' },
      { type: 'tasks', items: [
        { id: 'keep', text: '앱서랍 폴더를 USB·구글 드라이브에 담았어요 (학교 컴퓨터는 꺼지면 지워질 수 있어요)' },
        { id: 'url', text: '내 앱서랍 주소(netlify.app)를 휴대폰 홈 화면에 추가했어요' },
        { id: 'tour', text: '아래 「친구들의 앱서랍」에서 <b>두 곳</b>을 열어 친구가 만든 앱을 하나씩 써 봤어요', hint: '마음에 든 앱은 소감에 "○○의 △△ 앱 최고!"처럼 적어 줘도 좋아요.' }] },
      { type: 'wall', kind: 'site', title: '친구들의 앱서랍 — 구경 가기' },
      { type: 'note', html: '🌱 동아리로 이어 가기: 뽀모도로 타이머·시간표 앱·공부 상담앱을 매일 써 보고, 고치고 싶은 점은 Gemini에게 "이것만 고쳐줘"로 계속 키워 가요.' },
      { type: 'wall', kind: 'feel', title: '모두의 소감' }] },
];
export const PARTS = { 1: '1교시 · 바이브코딩으로 첫 앱 만들기', 2: '2교시 · 나만의 앱서랍과 나만의 서버', 3: '3교시 · AI 앱 만들고 웹에 올리기' };
export const stepOf = (id) => STEPS.find((s) => s.id === id);
export const stepNo = (id) => STEPS.findIndex((s) => s.id === id) + 1;
// 단계의 할 일 목록: [{ key: '단계.할일', text, optional }]
export function tasksOf(step) {
  const out = [];
  (step.blocks || []).forEach((b) => { if (b.type === 'tasks') b.items.forEach((t) => out.push({ key: `${step.id}.${t.id}`, ...t })); });
  return out;
}
export const checksOf = (step) => (step.blocks || []).filter((b) => b.type === 'check');

// ---------- 오늘 기분 ----------
export const MOODS = [
  { label: '아주 좋아요!', emoji: '1f604', color: '#3db271', emotions: ['신남', '기대됨', '행복함', '자신감', '호기심', '뿌듯함', '편안함', '감사함'] },
  { label: '좋아요!', emoji: '1f642', color: '#84cc16', emotions: ['기대됨', '편안함', '호기심', '즐거움', '차분함', '설렘', '만족함', '집중됨'] },
  { label: '괜찮아요!', emoji: '1f610', color: '#eab308', emotions: ['그냥 그럼', '피곤함', '졸림', '차분함', '궁금함', '살짝 긴장', '배고픔', '멍함'] },
  { label: '조금 힘들어요', emoji: '1f61f', color: '#f97316', emotions: ['피곤함', '걱정됨', '스트레스', '긴장됨', '지루함', '답답함', '졸림', '바쁨'] },
  { label: '기분이 안 좋아요', emoji: '1f622', color: '#e7464c', emotions: ['속상함', '지침', '화남', '불안함', '외로움', '아픔', '우울함', '짜증남'] },
];
export const emojiSrc = (code) => `emoji/${code}.svg`;

export function el(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === 'class') e.className = v;
    else if (k === 'style') e.style.cssText = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (v === true) e.setAttribute(k, '');
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) e.append(c);
  return e;
}

export const PART_COLOR = { 1: '#f4731c', 2: '#00a363', 3: '#1a64b7' }; // 11/21 읽걷쓰: 1교시 주황(읽음)·2교시 초록(걷구)·3교시 파랑(쓰득)
