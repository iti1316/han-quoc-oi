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
  return [
    { id:1, cat:'hall',   author:'하노이 출신 #129', date:'2025.05.08', isNew:true,  isPublic:true,
      title:'제조업 4년 2개월, 토픽 3급 → E-7-4 합격!! 🎉',
      body:'드디어 받았습니다!! 점수 214점 (고용주 추천서 30점 포함), 동일 사업장 4년 2개월, 어학 토픽 3급. 사회통합프로그램 5단계 꼭 이수하세요!',
      likes:31, hearts:12, wows:4, comments:8 },
    { id:2, cat:'hall',   author:'다낭 출신 #305',   date:'2025.05.03', isNew:false, isPublic:true,
      title:'소득 2.5배 넘기고 한방에 통과 💪 사회통합 5단계가 결정적',
      body:'3번 도전 끝에 성공! 세후 실수령액 기준이라는 걸 몰라서 두 번 탈락했습니다.',
      likes:24, hearts:9, wows:6, comments:15 },
    { id:3, cat:'sos',    author:'서류 준비 중 #847', date:'2025.05.07', isNew:true,  isPublic:true,
      title:'내일 출입국인데 고용사유서 양식 이게 맞나요? 🆘',
      body:'회사에서 받은 고용사유서에 업종 코드가 없는데 E-7-4 신청 시 문제없을까요?',
      likes:5, hearts:2, wows:0, comments:12 },
    { id:4, cat:'sos',    author:'비자 도전 중 #412', date:'2025.05.05', isNew:false, isPublic:true,
      title:'임금대장 세전 vs 세후 — 담당자마다 기준이 달라요',
      body:'출입국 담당자마다 말이 달라서 헷갈려요. 어느 쪽이 공식 기준인지 아시는 분?',
      likes:8, hearts:3, wows:1, comments:20 },
    { id:5, cat:'bamboo', author:'D-9 유저 #382',    date:'2025.05.10', isNew:true,  isPublic:true,
      title:'수원출입국 1점 차이 반려 😭 실수령액 함정 꼭 주의하세요!',
      body:'임금대장을 연봉 기준으로 계산했더니 담당자가 실수령액 기준이라 했어요. 12점 부족으로 불허...',
      likes:12, hearts:7, wows:15, comments:23 },
    { id:6, cat:'bamboo', author:'출입국 단골 #291',  date:'2025.05.04', isNew:false, isPublic:true,
      title:'인천 vs 수원 출입국 심사 난이도 솔직 비교 (2025 최신)',
      body:'두 곳 다 경험했어요. 담당자 성향도 다르고 요구 서류도 미묘하게 달랐습니다.',
      likes:19, hearts:8, wows:5, comments:31 },
    /* ── 자유 토크방 샘플 ── */
    { id:7, cat:'talk', author:'베트남 멤버 #551', date:'2025.05.11', isNew:true, isPublic:true,
      title:'한국어 공부하는데 좋은 앱 추천해줘요! 😊',
      body:'D-9 비자로 온지 8개월됐는데 한국어 실력 늘리고 싶어요. 좋은 방법 있으면 공유해주세요!',
      likes:7, hearts:3, wows:0, comments:5 },
    { id:8, cat:'talk', author:'하노이 출신 #234', date:'2025.05.09', isNew:false, isPublic:true,
      title:'주말에 경기도 근처 여행지 추천해주세요 🗺️',
      body:'주말에 쉬면서 구경할 수 있는 곳 추천해주세요. 대중교통으로 갈 수 있는 곳이면 더 좋아요.',
      likes:4, hearts:5, wows:1, comments:3 },
    { id:9, cat:'talk', author:'호치민 출신 #789', date:'2025.05.06', isNew:false, isPublic:true,
      title:'월급날 환전 꿀팁 공유! 수수료 아끼는 방법 💸',
      body:'카카오뱅크 앱에서 베트남 동으로 환전하면 일반 은행보다 수수료가 훨씬 저렴해요. 제가 직접 써본 방법입니다.',
      likes:15, hearts:8, wows:3, comments:11 },
    { id:10, cat:'talk', author:'D-9 유저 #103', date:'2025.05.03', isNew:false, isPublic:true,
      title:'퇴근 후 혼밥 맛집 어디에요? 혼자 가도 괜찮은 곳 🍜',
      body:'혼자 밥 먹기 편한 식당 추천해주세요. 국밥집이나 라멘집 같은 곳이면 좋겠어요.',
      likes:9, hearts:6, wows:2, comments:8 },
    /* ── 여행·맛집 게시판 샘플 ── */
    { id:11, cat:'travel', author:'다낭 출신 #507', date:'2026.05.25', isNew:true,  isPublic:true,
      title:'수원 팔달문 근처 베트남 쌀국수 찐맛집 발견! 🍜',
      body:'퇴근 후 우연히 발견한 쌀국수집인데 진짜 맛있어요. 주인아주머니가 베트남분이셔서 맛이 진짜임.',
      likes:18, hearts:11, wows:5, comments:7 },
    { id:12, cat:'travel', author:'호치민 출신 #342', date:'2026.05.22', isNew:false, isPublic:true,
      title:'경복궁 + 북촌 한옥마을 당일치기 추천 코스 🏯',
      body:'주말에 다녀왔는데 너무 좋았어요. 한복 대여해서 사진 찍으면 더 특별한 추억이 될 것 같아요.',
      likes:24, hearts:16, wows:9, comments:12 },
    { id:13, cat:'travel', author:'하노이 출신 #221', date:'2026.05.18', isNew:false, isPublic:true,
      title:'부산 해운대 주말여행 후기 (KTX 교통편 포함) 🌊',
      body:'KTX 타고 서울에서 부산 당일치기 다녀왔어요. 해운대 해물탕도 꼭 드세요!',
      likes:15, hearts:9, wows:6, comments:8 },
    { id:20, cat:'travel', author:'D-9 유저 #614', date:'2026.05.15', isNew:false, isPublic:true,
      title:'제주도 혼자 여행 3박 4일 후기 & 예산 공개 ✈️',
      body:'비행기 왕복 8만원, 숙박 3박 12만원으로 다녀왔어요. 렌트카 없이도 충분히 즐길 수 있었습니다.',
      likes:31, hearts:18, wows:11, comments:20 },
    /* ── 당근마켓 게시판 샘플 ── */
    { id:14, cat:'market', author:'D-9 유저 #614', date:'2026.05.28', isNew:true,  isPublic:true,
      title:'[나눔] 이불/베개 세트 — 안산시 단원구 직거래 가능',
      body:'이사 가면서 안 쓰는 이불 세트 나눔합니다. 깨끗하게 세탁했어요. 댓글 주세요.',
      likes:8, hearts:14, wows:1, comments:5 },
    { id:15, cat:'market', author:'베트남 멤버 #388', date:'2026.05.24', isNew:false, isPublic:true,
      title:'삼성 갤럭시 A54 팝니다 — 미개봉 새 제품 💸',
      body:'베트남에서 직구한 갤럭시 A54 미개봉 판매합니다. 가격 문의는 댓글로.',
      likes:5, hearts:3, wows:0, comments:9 },
    { id:16, cat:'market', author:'출입국 단골 #177', date:'2026.05.20', isNew:false, isPublic:true,
      title:'[구해요] 전기밥솥 6인용 — 수원/화성 지역',
      body:'쿠쿠나 쿠첸 전기밥솥 구합니다. 6인용 중고 구해요. 댓글로 연락주세요.',
      likes:2, hearts:1, wows:0, comments:3 },
    { id:21, cat:'market', author:'비자 도전 중 #412', date:'2026.05.17', isNew:false, isPublic:true,
      title:'[판매] 자전거 삼천리 26인치 — 수원 권선구 5만원',
      body:'1년 정도 사용한 자전거 팝니다. 타이어 새로 교체했어요. 직거래만 가능합니다.',
      likes:7, hearts:2, wows:0, comments:6 },
    /* ── 집구하기 게시판 샘플 ── */
    { id:17, cat:'house', author:'비자 준비 중 #493', date:'2026.05.29', isNew:true,  isPublic:true,
      title:'안산 원곡동 외국인 친화 고시원/원룸 추천 부탁드려요 🏠',
      body:'이번 달에 안산으로 이사 예정인데 외국인이 살기 좋은 고시원이나 원룸 추천해주세요.',
      likes:6, hearts:4, wows:0, comments:11 },
    { id:18, cat:'house', author:'하노이 출신 #563', date:'2026.05.26', isNew:false, isPublic:true,
      title:'수원 영통 쉐어하우스 2인실 룸메이트 구합니다 🤝',
      body:'보증금 100만원/월세 30만원입니다. 깨끗하고 조용한 분이면 좋겠어요. 댓글 주세요.',
      likes:9, hearts:5, wows:2, comments:7 },
    { id:19, cat:'house', author:'서류 준비 중 #829', date:'2026.05.21', isNew:false, isPublic:true,
      title:'외국인도 전세자금대출 받을 수 있나요? F-2 비자인데',
      body:'F-2-7 비자 소지자인데 전세자금 대출이 가능한지 아시는 분 계세요?',
      likes:11, hearts:7, wows:3, comments:15 },
    { id:22, cat:'house', author:'D-9 유저 #382', date:'2026.05.16', isNew:false, isPublic:true,
      title:'화성시 외국인 근로자 임대주택 신청 후기 — 합격했어요!',
      body:'화성시 외국인 근로자 임대주택 신청했는데 합격했습니다. 절차 궁금하신 분 댓글로.',
      likes:22, hearts:13, wows:8, comments:18 },
    /* ── 무서운 이야기 방 샘플 ── */
    { id:23, cat:'horror', author:'익명의 버디 #771', date:'2026.05.27', isNew:true,  isPublic:true,
      title:'공장 야간 근무 중에 본 것... 지금도 소름 😱',
      body:'야간 12시쯤이었어요. 혼자 기계 돌리다가 창문에 반사된 거 봤는데... 제 뒤에 아무도 없었거든요. 근데 거기 분명히 사람 형체가 있었어요. 아직도 그날 생각하면 잠이 안 옵니다.',
      likes:34, hearts:5, wows:41, comments:28 },
    { id:24, cat:'horror', author:'하노이 출신 #334', date:'2026.05.23', isNew:false, isPublic:true,
      title:'고시원 옆방에서 밤마다 들리는 소리의 정체 (결말 있음)',
      body:'이사 온 첫날부터 밤 3시면 꼭 벽 긁는 소리가 났어요. 한 달을 못 자다가 주인한테 물어봤더니... 전 세입자가 혼자 살다가 여기서 돌아가셨다고 하더라고요.',
      likes:52, hearts:3, wows:67, comments:45 },
    { id:25, cat:'horror', author:'출입국 단골 #219', date:'2026.05.19', isNew:false, isPublic:true,
      title:'새벽 버스 타다가 만난 이상한 할머니 이야기',
      body:'새벽 4시 첫차 탔는데 저 외에 할머니 한 분만 계셨어요. 종점까지 같이 타고 내렸는데, 나중에 기사한테 물어보니 그 시간대엔 저 혼자뿐이었다고...',
      likes:28, hearts:4, wows:55, comments:33 },
    { id:26, cat:'horror', author:'베트남 멤버 #628', date:'2026.05.14', isNew:false, isPublic:true,
      title:'한국에서 귀신 본 사람 저만이 아니죠? 공장 화장실에서...',
      body:'3교대 근무 중에 화장실 갔다가 거울에서 봤는데... 베트남에서도 이런 거 믿지 않았는데 한국 오고 나서 생각이 바뀌었어요.',
      likes:19, hearts:7, wows:38, comments:22 },
    { id:27, cat:'horror', author:'D-9 유저 #503', date:'2026.05.09', isNew:false, isPublic:true,
      title:'기숙사 빈방에서 혼자 들었던 목소리... 베트남어였어요',
      body:'입사하고 처음 배정받은 방이 오래 비어있던 방이었어요. 자려는데 분명히 베트남어로 누군가 말하는 소리가... 근처에 베트남 사람이 없었는데.',
      likes:41, hearts:6, wows:49, comments:37 },
    /* ── 한국생활정보 게시판 샘플 ── */
    { id:31, cat:'info', author:'다낭 출신 #507', date:'2026.05.25', isNew:true,  isPublic:true,
      title:'한국 은행 계좌 만드는 가장 쉬운 방법 (외국인용) 🏦',
      body:'D-9 비자로 한국은행 계좌 개설했어요. 필요한 서류와 절차를 정리해드립니다. 댓글로 궁금한 점 물어봐주세요.',
      location:{ sido:'경기도', sigungu:'수원시 팔달구', dong:'영동' },
      likes:18, hearts:11, wows:5, comments:7 },
    { id:32, cat:'info', author:'호치민 출신 #342', date:'2026.05.22', isNew:false, isPublic:true,
      title:'한국 건강보험 신청부터 사용까지 완벽 가이드 💊',
      body:'외국인도 건강보험 가입 가능합니다! 필요한 준비물과 신청 장소를 알려드립니다. 병원 갈 때 꼭 알아야 할 정보예요.',
      location:{ sido:'서울특별시', sigungu:'강남구', dong:'개포동' },
      likes:24, hearts:16, wows:9, comments:12 },
    { id:33, cat:'info', author:'하노이 출신 #221', date:'2026.05.18', isNew:false, isPublic:true,
      title:'한국 전세사기 당하지 않는 방법 — 외국인도 알아야 할 팁 🏚️',
      body:'한국의 전세 시스템은 베트남과 다릅니다. 사기를 당하지 않으려면 이 점들을 꼭 확인하세요.',
      location:{ sido:'인천광역시', sigungu:'남동구', dong:'논현동' },
      likes:15, hearts:9, wows:6, comments:8 },
    { id:34, cat:'info', author:'D-9 유저 #614', date:'2026.05.15', isNew:false, isPublic:true,
      title:'한국 세금(소득세, 주민세) 환급받는 방법 💰',
      body:'D-9 비자자도 연말정산으로 세금을 환급받을 수 있습니다. 절차와 필요한 서류 정보를 공유합니다.',
      location:{ sido:'경기도', sigungu:'안산시 단원구', dong:'원곡동' },
      likes:31, hearts:18, wows:11, comments:20 },
    /* ── 지역 일자리 구인&구직 게시판 샘플 ── */
    { id:41, cat:'jobs', author:'베트남 회사 #601', date:'2026.05.25', isNew:true,  isPublic:true,
      title:'[채용] 수원 반도체 공장 정규직 모집 — 초급 가능 🏭',
      body:'경험 무관, 초급자 환영합니다. 급여 월 270만원, 숙박 제공. 공정한 대우와 빠른 비자지원이 특징입니다.',
      location:{ sido:'경기도', sigungu:'수원시 영통구', dong:'매탄동' },
      likes:28, hearts:15, wows:8, comments:14 },
    { id:42, cat:'jobs', author:'인천 제조회사 #523', date:'2026.05.22', isNew:false, isPublic:true,
      title:'[공고] 인천 화학 공장 반입원 구인 (E-7-4 지원 가능)',
      body:'3년 이상 경험자 우대. 월급 300만원 이상, 기숙사 제공, 정기휴가 있습니다. 한국어 기본 가능한 분.',
      location:{ sido:'인천광역시', sigungu:'남동구', dong:'만수동' },
      likes:22, hearts:12, wows:6, comments:11 },
    { id:43, cat:'jobs', author:'안산 제조사 #445', date:'2026.05.18', isNew:false, isPublic:true,
      title:'[구인] 안산 전자부품 조립 - 여성 지원자 환영! 👩‍🏭',
      body:'시간당 9,860원(최저임금), 월 200만원 수준의 소득 가능. 기숙사 근처, 대중교통 접근성 좋습니다.',
      location:{ sido:'경기도', sigungu:'안산시 단원구', dong:'원곡동' },
      likes:19, hearts:10, wows:5, comments:9 },
    { id:44, cat:'jobs', author:'화성 공단 #382', date:'2026.05.15', isNew:false, isPublic:true,
      title:'[공고] 화성 자동차 부품 공장 - 숙련공 채용',
      body:'5년 이상 경험자 우대. 월급 330만원 이상, 보너스 있음. E-7-1 비자 변경 지원해드립니다.',
      location:{ sido:'경기도', sigungu:'화성시', dong:'병점동' },
      likes:35, hearts:20, wows:12, comments:25 },
  ];
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
