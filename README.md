# 바이브코딩으로 나만의 앱서랍 만들기 · 복기 사이트 (2026.11.24 인천영흥고)

- 주소: https://j333333766-hub.github.io/yeongheung-1124-review/ (수업 뒤 han.gl/yh1124 를 이 주소로 바꿈)
- 저장소: j333333766-hub/yeongheung-1124-review (GitHub Pages, main 브랜치 루트)
- 수업 사이트(yeongheung-1124.web.app)의 13단계·프롬프트·따라 하기 그림을 정적으로 옮긴 복기판. 실시간 기능, API 키, 실습 계정은 뺌. 프롬프트의 키 자리는 「여기에_내_…_붙여넣기」.

## 파일
| 파일 | 내용 |
|---|---|
| `index.html` · `css/review.css` · `js/review.js` | 화면(읽걷쓰 세 색). 수업 날에만 맞는 문장은 review.js `FIX` 에서 바꿔 보여 줌 |
| `js/content.js` | **자동 생성** — 수업 사이트 `public/js/common.js` 의 「오늘 수업 단계」부분. 직접 고치지 말 것 |
| `js/data.js` | 수업 결과 익명 합계(`ready:false` 면 「수업 뒤 실려요」) |
| `img/` `emoji/` `tools/` `files/appdrawer.zip` | 수업 사이트에서 복사 |

## 다시 만들기 (연수앱(Firebase) 폴더에서)
1. 내용 갱신: `node tools/build_review.mjs` (키·비밀번호·Firebase 설정이 들어가면 멈춤)
2. **수업 뒤 결과 채우기**: `node tools/dump_review_yh.cjs --dry` 로 인원 확인 → `node tools/dump_review_yh.cjs` (지금 회차, 강사 「조창현」「강사」 제외. 시험 입장이 더 있으면 `--exclude=조창현,강사,홍길동`). 이름 포함 원자료는 `tools/out/review-1124/raw.json` 에만(공개 안 함). 아이디어·소감 글은 이름·전화·메일·주소를 가리고 싣고, 친구들 앱서랍 주소는 개수만.
3. 이 폴더에서 `git add -A && git commit -m "..." && git push` → 1~2분 뒤 반영.
4. han.gl/yh1124 를 이 주소로 바꾸기(han.gl 스킬).

이모지 그림: Twemoji (CC-BY 4.0)
