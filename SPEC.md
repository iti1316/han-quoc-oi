# SPEC — Hàn Quốc Ơi 동작 규격

이 문서는 **현재 코드에서 확인한 사실만** 담는다. 계획이나 희망사항은 적지 않는다.
코드와 이 문서가 다르면 **코드가 맞다.** 발견 즉시 이 문서를 고친다.

검증 기준: `js/04`, `js/06`, `js/06b`, `js/07`, `js/11`, `js/25` 원본 확인 (2026-08-26)
미검증 항목은 "⚠️ 미확인"으로 표시했다.

---

## 1. 실행 구조

번들러가 없다. `index.html`이 모든 `.js`를 `<script type="text/babel">`로 순서대로 불러오고,
브라우저의 Babel Standalone이 실시간 변환한다.

결과적으로:

- `import` / `export`를 쓸 수 없다.
- 모든 최상위 `const`와 `function`이 **전역 스코프를 공유**한다.
- 아래에서 정의한 것을 위에서 쓸 수 없다. **로드 순서 = 의존성 순서.**
- `js/00-react-init.js`가 첫 번째, `js/25-app.js`가 마지막이다.
  (`js/26`, `js/27`은 파일명 번호와 달리 `js/25`보다 **앞**에 로드된다.)

`content.json`은 어디서도 참조되지 않는 죽은 파일이다. 여기를 고쳐도 반영되지 않는다.

---

## 2. 게시판과 카테고리

**게시판(board)과 카테고리(cat)는 다른 층위다.** 이 구분이 데이터 모델의 핵심이다.

- 글에는 `cat` 하나만 저장된다. `boardKey`는 **저장되지 않는다.**
- 게시판 화면은 `CLASSIC_BOARD_CFG[boardKey].cats` 배열로 글을 걸러낸다.

### 게시판 (`CLASSIC_BOARD_CFG`, js/04)

| boardKey | 이름 | 포함 cats | writeParam |
|---|---|---|---|
| `d9` | 📘 비자 정보공유 | `hall`, `sos`, `talk` | `hall` |
| `travel` | 📸 여행·맛집 소개 | `travel` | `travel` |
| `bamboo` | 🤫 대나무숲 완전 익명 | `bamboo` | `bamboo` |
| `market` | 🥕 당근마켓 꿀매물 | `market` | `market` |
| `house` | 🏠 집 구하기 & 쉐어하우스 | `house` | `house` |
| `hospital` | 🏥 병원 찾기 · 추천 | `hospital` | `hospital` |
| `horror` | 👻 무서운 이야기 방 | `horror` | `horror` |
| `info` | 📚 한국생활 정보 | `info` | `info` |
| `jobs` | 💼 지역 일자리 구인&구직 | `jobs` | `jobs` |

`d9`만 카테고리 3개를 묶는다. 나머지는 1:1이다.

### 카테고리 → 게시판 역매핑 (js/04)

같은 역할의 표가 세 개 있고 서로 다르다. 용도별로 나뉘어 있으나 일부가 어긋난다.

| 상수 | 용도 |
|---|---|
| `CAT_BOARD_MAP` | 카테고리 11개 → 게시판 |
| `SEARCH_BOARD_INFO` | 검색 결과 표시용 |
| `BOARD_HOT_CFG` | 인기글 피드 구성 |
| `LOCKED_CAT_INFO` | 잠금 카테고리 표시 정보 |

**🐛 알려진 불일치** — `talk` 카테고리
- `CAT_BOARD_MAP.talk` → `key:'d9'` (비자 정보)
- `SEARCH_BOARD_INFO.talk` → `key:'bamboo'` (대나무숲)

검색 결과에서 참교육방 글을 누르면 대나무숲으로 이동한다. 수정 필요.

`LOCKED_CATS`에는 `hall`과 `sos`가 없다. 나머지 9개 카테고리가 잠금 상태다.

---

## 3. 게시물 데이터

### 저장 위치

- 주 저장소: Firebase RTDB `posts` (배열 전체를 PUT)
- 보조: `localStorage['vb_posts_v2']` (상수명 `BOARD_STORE`)

### 게시물 객체 (js/11-write.js 작성 시점 기준)

```javascript
{
  id: Date.now(),          // 숫자 타임스탬프
  cat: String,             // 카테고리 (게시판 아님)
  author: String,          // 표시 닉네임
  deviceId: String,        // 기기 식별자
  isAdmin: Boolean,        // 작성 시점에 Firebase Auth 로그인 상태였는가
  date: String,            // toLocaleDateString('ko-KR') — 문자열이지 숫자가 아니다
  title: String,
  body: String,            // 본문. content 아님
  likes: 0, hearts: 0, wows: 0,
  comments: Number,        // commentsData.length와 동기화
  isNew: true,
  isPublic: true,          // 없으면 PostCard가 비공개로 처리한다
  location?: { sido, sigungu, dong },
  images?: [String],       // Storage 다운로드 URL 배열, 최대 10장
  commentsData?: [Comment]
}
```

본문 길이 제한 3,000자. 이미지 최대 10장.

### 댓글

별도 컬렉션이 아니다. 게시물 객체 안의 `commentsData` 배열에 중첩된다.
댓글을 하나 달아도 **posts 배열 전체가 다시 PUT된다.**

댓글에는 `deviceId`가 자동으로 붙는다(`addComment`).

⚠️ 미확인 — 댓글 객체의 나머지 필드는 `js/08-comment.js`를 확인해야 한다.

### 동기화

- `window.database.ref('posts').on('value', ...)` 실시간 리스너 (js/07)
- 수신 시 `p.id != null && p.author` 조건으로 걸러낸다. 이 둘이 없는 항목은 화면에서 사라진다.
- Firebase가 배열을 객체로 반환할 수 있어 `Object.values()`로 방어 처리한다.

### 🐛 구조적 위험

`save()`가 posts 배열 전체를 PUT한다. 두 사람이 거의 동시에 쓰면 나중 요청이 앞 요청을 덮어쓴다.
사용자가 늘면 "댓글이 사라졌다"가 발생한다. Firestore 마이그레이션이 근본 해결이다.

---

## 4. 신원과 익명 처리

회원가입이 없다. 모든 사용자는 `deviceId`로 식별된다.

### deviceId (js/06)

```
localStorage['vb_device_id']
형식: dev_{timestamp}_{random9}
```

없으면 생성한다. 브라우저 데이터를 지우면 새 사람이 된다. 본인 글 삭제 권한도 이것에 묶여 있다.

### 닉네임

- `NicknameDB.save/load` → `{FIREBASE_BASE}/userProfiles/{deviceId}.json`
- 저장 형태: `{ nickname, updatedAt }`
- 병행 저장: `localStorage['vb_nickname']`, `window.userNickname`
- 닉네임이 없으면 `genAuthor()`가 `{ANONS 무작위} #{100~999}` 형식으로 생성한다.

닉네임을 바꾸면 `js/25-app.js`가 해당 `deviceId`의 과거 글·댓글 `author`를 전부 갱신하고
posts 배열 전체를 PUT한다.

### 표시 이름 결정 (`safeAuthor`, js/06)

우선순위대로 판정한다.

1. `cat === 'bamboo'` → `익명` / `Ẩn danh`
2. `isAdmin === true` → `Hàn Quốc Ơi`
3. `author`가 9자리 이상 숫자 → `post.id`를 시드로 익명 닉네임 재생성
4. 그 외 → `author` 그대로

### 아바타

- `safeAvatarChar` — bamboo는 `🎋`, 그 외는 닉네임 시드로 `['익','D','V','하','H','버','A','B']` 중 하나
- `safeAvatarColor` — 닉네임 시드로 `AVATAR_COLORS`에서 결정론적 선택 (같은 닉네임 = 항상 같은 색)

### 대나무숲 댓글 라벨 (`getBambooLabel`, js/06)

- 글쓴이 본인 → `글쓴이` / `Tác giả`
- 나머지 → 댓글 등장 순서대로 `익명 1`, `익명 2` / `Ẩn danh 1`, ...
- 언어는 `window.__lang`으로 판단한다 (js/25가 동기화)

deviceId는 데이터에 그대로 저장된다. 화면에서만 가린다.

---

## 5. 관리자

### 로그인

- Firebase Authentication 이메일/비밀번호
- 진입: 홈 상단 공지 바(`TickingAnnouncementBar`)를 5번 연속 탭
- `AdminPwModal`이 `window.auth.signInWithEmailAndPassword()`를 호출한다

**🐛 권한 검사가 없다.** 로그인 성공 여부만 본다. Authentication에 등록된 모든 계정이 관리자가 된다.
현재는 회원가입 기능이 없고 계정이 2개뿐이라 무해하다.

**🐛 로그인이 유지되지 않는다.** `onAuthStateChanged`가 없어 새로고침하면 풀린다.

### 관리자 배지

- 작성 시점에 `isAdmin: !!(window.auth && window.auth.currentUser)`를 저장한다 (js/11)
- `AdminBadge` 컴포넌트가 파란 원에 `✓`를 그린다 (js/07)
- `cat === 'bamboo'`면 배지를 숨긴다

**로그인 유지가 없으므로 반쪽이다.** 새로고침 후 쓴 글은 관리자여도 `isAdmin: false`로 저장된다.

---

## 6. 라우팅

해시 기반이다. `js/25-app.js`가 전부 처리한다.

```
#/postDetail/{boardKey}/{postId}
#/{page}/{param}
```

`nav(routeObject)`로 이동하고, `useEffect`가 `history.pushState`로 URL을 동기화한다.
`popstate`를 듣고 있어 모바일 뒤로가기가 동작한다.

### 페이지 목록 (`switch (route.page)`)

| page | 컴포넌트 | param |
|---|---|---|
| `checklist` | ScorePage / F27CriteriaPage | `score_e74`, `score_f27`, `score_f5`, `score`, `f27_criteria` |
| `docs` | DocsPage | — |
| `docsChecklist` | DocsChecklistPage | visaStep |
| `office` | OfficePage | — |
| `eligibility` | EligibilityPage | visaStep |
| `assessment` | AssessmentCriteriaPage | assessmentParam |
| `legal` | LegalPage | type |
| `classicBoard` | ClassicBoardPage | boardKey |
| `postDetail` | PostDetailPage | boardKey + postId (param 아님) |
| `visaHub` | VisaHubPage | — |
| `write` | WritePage | initCat |
| `admin` | AdminPage | — |
| (default) | HomePage | — |

`postDetail`만 `boardKey`/`postId`를 쓰고, 나머지는 `param` 하나를 쓴다.

`nav({ scrollTarget: '...' })`을 주면 200ms 후 `[data-section="..."]`으로 스크롤한다.
그 외에는 맨 위로 이동한다.

---

## 7. 이미지

`js/06b-image.js`

1. `compressImage` — Canvas로 최대 800px 축소, JPEG 품질 0.72, dataURL 반환
2. `uploadImageToStorage` — dataURL을 Blob으로 바꿔 Firebase Storage에 업로드

```
경로: posts/{deviceId}_{timestamp}_{random6}.jpg
반환: getDownloadURL() 결과
```

게시물에는 **URL만** 저장된다. Base64를 DB에 넣지 않는다.
배열 전체 PUT 구조라 Base64가 쌓이면 전송량이 폭증하기 때문이다.

---

## 8. 도배 방지

`js/06-utils.js`

```javascript
RATE_LIMIT_STORE   = 'vb_last_write'
RATE_LIMIT_POST    = 30 * 1000   // 글 30초
RATE_LIMIT_COMMENT = 10 * 1000   // 댓글 10초
```

`checkRateLimit(kind)`가 남은 초를 반환하고(0이면 통과), 작성 후 `markRateLimit(kind)`를 호출한다.
`kind`는 `'post'` 또는 그 외(댓글).

**localStorage 기반이라 우회가 쉽다.** 브라우저 데이터를 지우거나 시크릿 모드면 초기화된다.

---

## 9. 신고

`submitReport()` → `{FIREBASE_BASE}/reports.json`에 POST (게시물과 달리 개별 append)

```javascript
{
  id, targetType, targetId,
  postId,                    // 댓글 신고면 상위 글 id, 아니면 null
  reason,
  content,                   // 200자로 잘림
  reporterDeviceId,
  createdAt,                 // ISO 문자열
  status: 'pending'
}
```

- 중복 신고 차단: `localStorage['vb_my_reports']`에 targetId 기록
- 관리자 조회: `fetchReports()` — id 내림차순 정렬
- 상태 변경: `updateReportStatus(key, status)` — PATCH

---

## 10. localStorage 키 전체

| 키 | 상수명 | 내용 |
|---|---|---|
| `vb_posts_v2` | `BOARD_STORE` | 게시물 배열 캐시 |
| `vb_device_id` | — | 기기 식별자 |
| `vb_nickname` | — | 닉네임 |
| `vb_my_post_seen` | `MY_POST_SEEN_STORE` | 내 글 댓글 읽음 카운트 |
| `vb_notices` | `NOTICE_STORE` | 상단 전광판 공지 |
| `vb_board_notices_by_cat` | `BOARD_NOTICE_STORE` | 게시판별 공지 |
| `vb_last_write` | `RATE_LIMIT_STORE` | 마지막 작성 시각 |
| `vb_my_reports` | `REPORT_STORE` | 내가 신고한 대상 |
| (DDAY_STORE 값) | `DDAY_STORE` | D-day 설정 ⚠️ 정의 위치 미확인 |

공지는 **localStorage에만** 저장된다. 관리자가 공지를 고쳐도 그 기기에서만 보인다.

---

## 11. Firebase

```
RTDB: https://han-quoc-oi-default-rtdb.asia-southeast1.firebasedatabase.app
Storage 위치: US-EAST1
플랜: Blaze (종량제)
```

| 경로 | 접근 방식 |
|---|---|
| `/posts.json` | REST PUT (전체 배열) + SDK 실시간 리스너 |
| `/userProfiles/{deviceId}.json` | REST PUT / GET |
| `/reports.json` | REST POST |
| `/reports/{key}.json` | REST PATCH |

**REST `fetch`는 인증 토큰을 보내지 않는다.**
따라서 보안 규칙에 `auth != null`을 걸면 글쓰기·댓글·닉네임이 전부 죽는다.
현재 적용된 규칙은 `hanquocoi-project-guide.md` 4장을 참조한다.

Storage 규칙은 3MB 미만 + `image/*` 타입만 허용한다. 인증 조건은 없다.

---

## 12. 확인이 필요한 항목

- 댓글 객체 필드 (`js/08-comment.js`)
- `DDAY_STORE` 정의 위치
- `ANONS`, `AVATAR_COLORS` 실제 값 (`js/01-constants-lang.js`)
- `VISA_ROUTES` 구조 (`js/02-constants-visa.js` 667번 줄부터, grep으로만)
- `defaultPosts()` — 첫 실행 시 들어가는 예시 글. 실서비스에서 제거 여부 결정 필요
