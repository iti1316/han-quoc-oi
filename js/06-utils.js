/* ── 상수 ──────────────────────────────────────────────────── */
const BOARD_STORE = 'vb_posts_v2';
const FIREBASE_BASE = 'https://han-quoc-oi-default-rtdb.asia-southeast1.firebasedatabase.app';
const FIREBASE_POSTS_URL = `${FIREBASE_BASE}/posts.json`;
const FIREBASE_PROFILES_URL = `${FIREBASE_BASE}/userProfiles`;

/* ── 공지사항 ── */
const NOTICE_STORE = 'vb_notices';

const DEFAULT_NOTICES = [
  {
    id:1, urgent: true,
    date:'2025.05.20',
    ko:'📌 E-7-4 소득 기준: 반드시 세후(실수령액) 기준으로 임금대장을 작성하세요. 세전 기준 제출 시 탈락 사유가 됩니다.',
    vi:'📌 Tiêu chuẩn thu nhập E-7-4: Bảng lương PHẢI ghi theo thu nhập thực nhận (sau thuế). Nộp theo lương trước thuế sẽ bị từ chối.',
  },
  {
    id:2, urgent: false,
    date:'2025.05.18',
    ko:'📋 수원출입국 예약 현재 4주 대기 중. 만료 3개월 전부터 예약하는 것을 강력 권장합니다.',
    vi:'📋 Cục XNC Suwon hiện đang chờ 4 tuần. Khuyến nghị đặt lịch từ 3 tháng trước khi hết hạn.',
  },
];

/* 닉네임 저장소 (Firebase — 영구 보관) */
const NicknameDB = {
  save: async (deviceId, nickname) => {
    try {
      const response = await fetch(`${FIREBASE_PROFILES_URL}/${deviceId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nickname,
          updatedAt: new Date().toISOString()
        }),
        timeout: 10000
      });
      if (response.ok) {
        console.log('✅ Firebase 닉네임 저장 성공:', nickname);
        localStorage.setItem('vb_nickname', nickname);
        return true;
      } else {
        console.warn('⚠️ Firebase 닉네임 저장 실패:', response.statusText);
        return false;
      }
    } catch (e) {
      console.error('❌ Firebase 닉네임 저장 오류:', e.message);
      return false;
    }
  },

  load: async (deviceId) => {
    try {
      const response = await fetch(`${FIREBASE_PROFILES_URL}/${deviceId}.json`, {
        timeout: 10000
      });
      const data = await response.json();
      if (data && data.nickname) {
        console.log('✅ Firebase 닉네임 로드 성공:', data.nickname);
        return data.nickname;
      } else {
        console.log('💡 Firebase: 저장된 닉네임 없음');
        return null;
      }
    } catch (e) {
      console.error('❌ Firebase 닉네임 로드 오류:', e.message);
      return null;
    }
  }
};

function genAuthor() {
  const nickname = window.userNickname || localStorage.getItem('vb_nickname');
  if (nickname) {
    console.log('✅ genAuthor - 닉네임 사용:', nickname);
    return nickname;
  }
  const anonymous = `${ANONS[Math.floor(Math.random()*ANONS.length)]} #${Math.floor(Math.random()*900)+100}`;
  console.log('⚪ genAuthor - 익명 사용:', anonymous);
  return anonymous;
}

/* 닉네임 표시 함수: deviceId로 현재 닉네임 조회 (3번 방식) */
/* 기기별 고유 ID (회원가입 전 게시물/댓글 식별용) */
function getDeviceId() {
  let deviceId = localStorage.getItem('vb_device_id');
  if (!deviceId) {
    deviceId = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('vb_device_id', deviceId);
  }
  return deviceId;
}

/* ── 내 글 댓글 안 읽음 추적 (deviceId 기반) ── */
const MY_POST_SEEN_STORE = 'vb_my_post_seen';
function loadSeenCounts() {
  try { return JSON.parse(localStorage.getItem(MY_POST_SEEN_STORE)) || {}; }
  catch { return {}; }
}
function saveSeenCounts(obj) {
  try { localStorage.setItem(MY_POST_SEEN_STORE, JSON.stringify(obj)); } catch(e) {}
}
function markPostSeen(postId, commentCount) {
  const seen = loadSeenCounts();
  seen[postId] = commentCount;
  saveSeenCounts(seen);
}
function getUnreadCount(posts, deviceId) {
  const seen = loadSeenCounts();
  let total = 0;
  posts.forEach(p => {
    if (p.deviceId === deviceId) {
      const current = p.commentsData?.length || p.comments || 0;
      const lastSeen = seen[p.id] || 0;
      if (current > lastSeen) total += (current - lastSeen);
    }
  });
  return total;
}
function getMyUnreadPosts(posts, deviceId) {
  const seen = loadSeenCounts();
  return posts
    .filter(p => p.deviceId === deviceId)
    .map(p => {
      const current = p.commentsData?.length || p.comments || 0;
      const lastSeen = seen[p.id] || 0;
      return { post: p, unread: Math.max(0, current - lastSeen) };
    })
    .filter(x => x.unread > 0)
    .sort((a, b) => b.unread - a.unread);
}

/* ────────────────────────────────────────────────────────────
   🔒 렌더 레이어 익명화 — 2중 보안
   저장된 author 값이 허용 패턴과 다르면 (예: 실제 이름·ID가
   미래 백엔드에서 흘러들어올 경우) post.id 기반으로 덮어씁니다.
   화면에는 절대 실제 개인정보가 표시되지 않습니다.
──────────────────────────────────────────────────────────── */
const ANON_PATTERN = new RegExp(`^(${ANONS.join('|')}) #\\d{3}$`);

/** bamboo 게시판 댓글 익명 레이블 (익명1, 익명2, ...) */
function getBambooLabel(post, deviceIdOfWriter, lang) {
  if (!post || post.cat !== 'bamboo') return null;
  const authorDev = post.deviceId;
  if (deviceIdOfWriter && authorDev && deviceIdOfWriter === authorDev) {
    return lang === 'vi' ? 'Tác giả' : '글쓴이';
  }
  const list = post.commentsData || [];
  const order = [];
  for (const c of list) {
    const d = c.deviceId || c.author;
    if (d && d !== authorDev && !order.includes(d)) order.push(d);
  }
  const idx = order.indexOf(deviceIdOfWriter);
  if (idx === -1) return lang === 'vi' ? 'Ẩn danh' : '익명';
  return lang === 'vi' ? `Ẩn danh ${idx + 1}` : `익명 ${idx + 1}`;
}

/** author 필드를 안전한 익명 닉네임으로 보장 */
function safeAuthor(post) {
  if (post && post.cat === 'bamboo') {
    return (window.__lang === 'vi') ? 'Ẩn danh' : '익명';
  }
  if (post && post.isAdmin) return 'Hàn Quốc Ơi';
  // 커스텀 닉네임인 경우: ANON_PATTERN 패턴이 없으면 그대로 반환
  if (!ANON_PATTERN.test(post.author)) {
    // 숫자로만 이루어진 경우(post.id 기반) → 재생성
    if (/^\d{9,}$/.test(post.author)) {
      const seed = Math.abs(typeof post.id === 'number' ? post.id : parseInt(post.id, 10) || 1);
      return `${ANONS[seed % ANONS.length]} #${(seed % 900) + 100}`;
    }
    // 그 외: 커스텀 닉네임 → 그대로 반환
    return post.author;
  }
  // ANON_PATTERN 형식 → 그대로 반환
  return post.author;
}

/** 아바타 문자: author 첫 글자 대신 post.id 기반으로 고정 */
function safeAvatarChar(post) {
  if (post && post.cat === 'bamboo') return '🎋';
  const author = safeAuthor(post);
  const seed = Math.abs((author.charCodeAt(0) || 0) + (author.charCodeAt(1) || 0));
  return ['익','D','V','하','H','버','A','B'][seed % 8];
}

/** 아바타 색상: author(닉네임) 기반 결정론적 색상 (같은 닉네임은 항상 같은 색상) */
function safeAvatarColor(post) {
  const author = safeAuthor(post);
  const seed = Math.abs((author.charCodeAt(0) || 0) + (author.charCodeAt(1) || 0));
  return AVATAR_COLORS[seed % AVATAR_COLORS.length];
}

/* ── 기본 게시글 ─────────────────────────────────────────────
   isPublic: true 명시 필수 — 없으면 PostCard가 전부 비공개 처리함
────────────────────────────────────────────────────────────── */
function defaultPosts() {
  return [];
}
function loadNotices() {
  try {
    const raw = localStorage.getItem(NOTICE_STORE);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return DEFAULT_NOTICES;
}
function saveNotices(arr) {
  localStorage.setItem(NOTICE_STORE, JSON.stringify(arr));
}

const BOARD_NOTICE_STORE = 'vb_board_notices_by_cat';
function loadBoardNoticesByCat() {
  try {
    const raw = localStorage.getItem(BOARD_NOTICE_STORE);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return DEFAULT_BOARD_NOTICES_BY_CAT;
}
function saveBoardNoticesByCat(obj) {
  localStorage.setItem(BOARD_NOTICE_STORE, JSON.stringify(obj));
}
function loadBoardNotices(cat = 'market') {
  const allNotices = loadBoardNoticesByCat();
  return allNotices[cat] || [];
}

function loadDdayInfo() {
  try { return JSON.parse(localStorage.getItem(DDAY_STORE)) || null; }
  catch { return null; }
}
function saveDdayInfo(info) {
  try { localStorage.setItem(DDAY_STORE, JSON.stringify(info)); } catch(e) {}
}
function calcDday(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(dateStr); target.setHours(0,0,0,0);
  return Math.round((target - today) / 86400000);
}
function calcApplyDate(dateStr, type) {
  const months = DDAY_APPLY_MONTHS[type] || 2;
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() - months);
  return d;
}
function getTodoMessage(dday, lang) {
  const L = LANG[lang];
  if (dday < 0) return L.todoExpired;
  if (dday <= 30) return L.todoBooking;
  if (dday <= 180) return L.todoDocs;
  return L.todoTopik;
}

function fmtLocation(loc) {
  if (!loc?.sido) return '';
  return `${SIDO_SHORT[loc.sido] || loc.sido} ${loc.sigungu}`;
}

/* 페이지 로드 시 Firebase에서 닉네임 복원 */
(async function() {
  try {
    let deviceId = localStorage.getItem('vb_device_id');
    if (!deviceId) {
      deviceId = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('vb_device_id', deviceId);
    }
    // localStorage에서 먼저 동기적으로 읽기 (race condition 방지)
    const cached = localStorage.getItem('vb_nickname');
    if (cached) {
      window.userNickname = cached;
      console.log('🟢 페이지 로드: localStorage에서 닉네임 복원:', cached);
    }
    // Firebase에서 최신값 가져오기
    const saved = await NicknameDB.load(deviceId);
    if (saved) {
      window.userNickname = saved;
      console.log('🔄 페이지 로드: Firebase에서 닉네임 복원:', saved);
    }
  } catch (e) {
    console.warn('⚠️ Firebase 닉네임 로드 중 오류:', e.message);
  }
})();

/* ── 도배 방지: 마지막 작성 시각 기록 및 검사 ── */
const RATE_LIMIT_STORE = 'vb_last_write';
const RATE_LIMIT_POST = 30 * 1000;      // 글: 30초
const RATE_LIMIT_COMMENT = 10 * 1000;   // 댓글: 10초

function checkRateLimit(kind) {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORE);
    const data = raw ? JSON.parse(raw) : {};
    const last = data[kind] || 0;
    const gap = kind === 'post' ? RATE_LIMIT_POST : RATE_LIMIT_COMMENT;
    const remain = gap - (Date.now() - last);
    return remain > 0 ? Math.ceil(remain / 1000) : 0;
  } catch (e) { return 0; }
}

function markRateLimit(kind) {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORE);
    const data = raw ? JSON.parse(raw) : {};
    data[kind] = Date.now();
    localStorage.setItem(RATE_LIMIT_STORE, JSON.stringify(data));
  } catch (e) {}
}

/* ── 신고 기능 ── */
const REPORT_STORE = 'vb_my_reports';
const FIREBASE_REPORTS_URL = `${FIREBASE_BASE}/reports.json`;

function loadMyReports() {
  try { return JSON.parse(localStorage.getItem(REPORT_STORE) || '{}'); }
  catch (e) { return {}; }
}

function hasReported(targetId) {
  return !!loadMyReports()[targetId];
}

async function submitReport({ targetType, targetId, postId, reason, content, deviceId }) {
  const report = {
    id: Date.now(),
    targetType,
    targetId,
    postId: postId || null,
    reason,
    content: (content || '').slice(0, 200),
    reporterDeviceId: deviceId,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  const res = await fetch(FIREBASE_REPORTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report)
  });
  if (!res.ok) throw new Error('report failed');
  try {
    const mine = loadMyReports();
    mine[targetId] = true;
    localStorage.setItem(REPORT_STORE, JSON.stringify(mine));
  } catch (e) {}
  return true;
}

/* ── 신고 관리 (관리자용) ── */
async function fetchReports() {
  const res = await fetch(FIREBASE_REPORTS_URL);
  if (!res.ok) throw new Error('fetch reports failed');
  const data = await res.json();
  if (!data) return [];
  return Object.entries(data).map(([key, v]) => ({ ...v, _key: key }))
    .sort((a, b) => (b.id || 0) - (a.id || 0));
}

async function updateReportStatus(key, status) {
  const res = await fetch(`${FIREBASE_BASE}/reports/${key}.json`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return res.ok;
}
