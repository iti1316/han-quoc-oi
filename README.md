# Hàn Quốc Ơi

재한 베트남인을 위한 정보 공유 커뮤니티. 비자 가이드와 게시판을 제공한다.

- 서비스 주소: https://hanquocoivn.com
- 저장소: `iti1316/visa-buddy` (public)
- 배포: Vercel — `main` 브랜치에 push하면 자동 배포
- 문의: iti1316@gmail.com

---

## 절대 규칙

작업 전에 이것부터 읽는다. 과거에 실제로 사고가 났던 항목들이다.

1. **`index.html`의 script 태그 순서를 바꾸지 않는다.**
   번들러가 없다. 모든 `.js` 파일이 `<script type="text/babel">`로 순서대로 로드되며
   전역 스코프를 공유한다. 로드 순서가 곧 의존성 순서다.
   `js/00-react-init.js`가 반드시 첫 번째, `js/25-app.js`가 반드시 마지막이다.
   (파일명 번호와 로드 순서가 다르다. 26, 27번은 25번보다 **앞**에 온다.)

2. **`index.html`의 `apiKey`를 직접 타이핑하지 않는다.**
   과거 한 글자 오타(`N1` → `Ni`)로 Firebase Auth가 `api-key-not-valid` 에러를 냈다.
   RTDB와 Storage는 apiKey를 검증하지 않아 한동안 드러나지 않았다. 반드시 복사한다.

3. **`js/02-constants-visa.js`를 통째로 읽지 않는다.**
   211,233바이트(약 206KB), 1,209줄. AI 도구에 전체를 읽히면 컨텍스트가 넘친다.
   `grep -n`으로 위치를 찾고 `sed -n '시작,끝p'`로 필요한 범위만 본다. `cat` 금지.

4. **`content.json`은 사용되지 않는다.**
   코드 어디에서도 불러오지 않는 죽은 파일이다(`grep -rn "content.json" index.html js/` 결과 없음).
   내용도 현재 코드와 다르다. 여기를 고쳐도 사이트에 반영되지 않는다.
   비자 경로 데이터는 `js/02-constants-visa.js`의 `VISA_ROUTES`(667번 줄부터)에 있다.

5. **브라우저 테스트는 항상 `Ctrl + Shift + R`.**
   일반 새로고침으로는 수정이 반영되지 않는다. 시크릿 모드에서도 캐시가 남을 수 있다.

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| UI | React 18 (CDN) + Babel Standalone |
| 스타일 | Tailwind CSS (CDN) |
| 데이터베이스 | Firebase Realtime Database (asia-southeast1) |
| 이미지 | Firebase Storage |
| 인증 | Firebase Authentication (관리자 전용) |
| 배포 | Vercel |
| 도메인/DNS | Cloudflare Registrar (DNS-only, 회색 구름) |

빌드 과정이 없다. `package.json`도 없다. 브라우저가 Babel로 실시간 변환한다.
따라서 `import` / `export`를 쓸 수 없다.

---

## 로컬 실행

```powershell
npx.cmd serve -l 8080
```

PowerShell 실행 정책 때문에 `.cmd` 확장자가 필요하다.

접속: `http://localhost:8080`

- 포트가 이미 쓰이면 `This port was picked because 8000 is in use` 메시지가 뜬다. 유령 프로세스를 확인한다.
- 콘솔에 코드를 붙여넣을 수 없으면 `allow pasting`을 먼저 입력한다.
- Vercel Analytics는 localhost에서 집계되지 않는다. 실제 배포 주소에서만 확인된다.

---

## 파일 수정 후 문법 검사

브라우저를 열기 전에 실행한다. Babel Standalone은 문법 오류를 런타임에야 알려주므로
이 검사를 건너뛰면 빈 화면을 보게 된다.

```
node -e "const b=require('@babel/core'); const fs=require('fs'); try{ b.transformSync(fs.readFileSync('js/파일명.js','utf8'),{presets:[['@babel/preset-react']],filename:'x.jsx'}); console.log('OK'); }catch(e){ console.log('ERROR:', e.message); }"
```

---

## 무엇을 고칠 때 어느 파일인가

| 수정 대상 | 파일 |
|---|---|
| 홈 화면 배치 | `js/23-home.js` |
| 홈 그리드 버튼 | `js/20-master-grid.js` |
| 비자 가이드 내용·경로 | `js/02-constants-visa.js` (grep 필수) |
| 비자 페이지 화면 | `js/13-visa-hub.js` |
| 게시판 설정 | `js/04-constants-board.js` |
| 게시판 목록 화면 | `js/10-classic-board.js` |
| 글쓰기 화면 | `js/11-write.js` |
| 게시물 상세 | `js/09-post-detail.js` |
| 댓글 | `js/08-comment.js` |
| 관리자 페이지 | `js/24-admin.js` |
| 한국어/베트남어 문구 | `js/01-constants-lang.js` |
| 라우팅 | `js/25-app.js` |

게시판을 새로 추가하려면 `js/04`, `js/05`, `js/20`, `js/24`, `js/11` 다섯 파일을 함께 고쳐야 한다.

세부 데이터 구조와 동작 규격은 `SPEC.md`를 참조한다.

---

## 디렉터리 구조

```
.
├── index.html          HTML 껍데기 + script 태그 + ReactDOM 렌더링
├── content.json        ⚠️ 사용되지 않음 (규칙 4 참조)
├── images/
└── js/                 27개 모듈 (로드 순서 = 의존성 순서)
```

원래 `index.html` 단일 파일 6,500줄이었고 2026년 7월에 모듈로 분리했다.

---

## AI 코딩 도구를 쓸 때

이 저장소는 Claude Code 등으로 작업하는 경우가 많다. 반복된 실패에서 얻은 규칙이다.

- **"수정했다"는 보고를 믿지 않는다.** 실제로 파일에 쓰지 않고 완료했다고 답한 사례가 여러 번 있었다.
  변경 후 반드시 `grep` 출력으로 확인한다. 안 되면 VS Code `Ctrl+H`로 직접 치환한다.
- **요약 대신 원문을 요구한다.** 명령 출력을 자기 문장으로 정리해서 돌려주면 사실과 다른 내용이 섞인다.
- **코드 이동은 `sed`로 기계적으로 시킨다.** 직접 타이핑하게 두면 내용을 새로 써버린다.
  실제로 `VISA_ROUTES`가 통째로 재작성되어 되돌린 사고가 있었다.
- **주석 블록은 함수와 함께 옮긴다.** `/* === */`가 반쪽만 잘리면 문법 오류가 난다.
- **단계마다 git 커밋한다.** `js/` 폴더가 커밋되지 않은 상태에서 되돌리면
  `index.html`만 과거로 가고 script 태그가 사라진다.
- **작업 하나가 끝나면 새 세션을 연다.**
- **VS Code에서 `index.html` 탭을 닫아둔다.** 열려 있으면 자동 첨부되어 컨텍스트가 넘친다.

---

## 진행 상황

현재 상태, 남은 작업, 의사결정 경위는 `hanquocoi-project-guide.md`에 있다.
