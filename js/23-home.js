

/* ================================================================
   페이지: 메인(Home) — 새 디자인
================================================================ */
function HomePage({ nav, posts, lang, onAddPost, onDeletePost, onUpdatePost, onAddComment, onDeleteComment, toggleLang, onNicknameSave, deviceId, refreshPosts }) {
  const [showMore,    setShowMore]    = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  const [nicknameLoading, setNicknameLoading] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [hotline, setHotline] = useState('');
  const [hotlineLoading, setHotlineLoading] = useState(true);
  const unreadCount   = getUnreadCount(posts, deviceId);
  const myUnreadPosts = getMyUnreadPosts(posts, deviceId);
  const adminClickTimer = useRef(null);

  const handleNicknameSave = async () => {
    const L = LANG[lang];
    const trimmed = nicknameInput.trim();

    if (!trimmed) {
      console.log('⚠️ 닉네임 입력 필요');
      return;
    }

    if (trimmed.length < 2) {
      alert(L.nickErrShort);
      return;
    }

    if (/^\d{9,}$/.test(trimmed)) {
      alert(L.nickErrPhone);
      return;
    }

    setNicknameLoading(true);

    try {
      const nickname = trimmed;
      console.log('📝 [HomePage] 닉네임 저장 요청:', nickname);

      // App 레벨의 함수 호출
      const success = await onNicknameSave(nickname);

      if (success) {
        console.log('✅ [HomePage] 저장 성공!');
        setShowNicknameModal(false);
        setNicknameInput('');
      } else {
        console.log('⚠️ [HomePage] 저장 실패');
      }
    } catch (err) {
      console.error('❌ [HomePage] 오류:', err);
    } finally {
      setNicknameLoading(false);
    }
  };

  const handleAdminClick = () => {
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);

    clearTimeout(adminClickTimer.current);

    if (newCount >= 5) {
      nav({page:'admin'});
      setAdminClickCount(0);
    } else {
      adminClickTimer.current = setTimeout(() => setAdminClickCount(0), 3000);
    }
  };

  useEffect(() => {
    const hotlineRef = window.database.ref('notices/hotline');

    const handleValue = (snapshot) => {
      const data = snapshot.val();
      if (data !== null && data !== undefined && data !== '') {
        setHotline(data);
      } else {
        setHotline('');
      }
      setHotlineLoading(false);
    };

    const handleError = (error) => {
      console.warn('❌ Firebase 핫라인 리스너 오류:', error.message);
      setHotlineLoading(false);
    };

    hotlineRef.on('value', handleValue, handleError);

    return () => {
      hotlineRef.off('value', handleValue);
    };
  }, []);

  return (
    <div style={{ background:'#F0F2F5', minHeight:'100vh' }}>
      {/* ── 헤더 ── */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div onClick={()=>{ nav({page:'home'}); setSearchQuery(''); }} className="cursor-pointer tap">
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] font-black text-blue-800">Hàn Quốc Ơi</span>
              <span className="text-gray-300 font-light text-sm ml-0.5">——</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-none mt-0.5">
              {lang==='vi' ? 'Cộng đồng người Việt tại HQ' : '재한 베트남인 커뮤니티'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleAdminClick} className="text-lg tap transition opacity-0 w-6 h-6" title="관리자">⚙️</button>
            <button onClick={toggleLang} className="text-lg tap transition" title="언어">{lang==='vi'?'🇻🇳':'🇰🇷'}</button>
<div className="flex items-center gap-1.5 tap cursor-pointer" onClick={() => { refreshPosts(); setShowNicknameModal(true); }}>
  <div className="relative w-6 h-6 flex-shrink-0">
    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[12px]">👤</div>
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 bg-red-500 rounded-full text-white text-[8px] font-black flex items-center justify-center">
        {unreadCount > 9 ? '9+' : unreadCount}
      </span>
    )}
  </div>
  <span className="text-[11px] font-bold text-gray-600">
    {window.userNickname || '익명'}
  </span>
</div>
          </div>
        </div>
      </header>

      {/* 🔥 실시간 핫라인 */}
      {hotline && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-center text-sm font-bold overflow-hidden">
          <div className="animate-pulse">{hotline}</div>
        </div>
      )}

      <main className="max-w-lg mx-auto pb-nav">

        {/* ── 검색바 (항상 표시) ── */}
        <div className="bg-white px-3 pt-3 pb-2 sticky top-14 z-40 shadow-sm">
          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
            <span className="text-gray-400 text-xl flex-shrink-0">🔍</span>
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={lang==='vi'
                ? 'Tìm kiếm tất cả bảng tin...'
                : '모든 게시판 통합 검색...'}
              className="flex-1 bg-transparent text-[15px] text-gray-800 outline-none placeholder-gray-400"
            />
            {searchQuery && (
              <button onClick={()=>setSearchQuery('')}
                className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-black tap flex-shrink-0">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 검색 결과 or 기본 피드 */}
        {searchQuery.trim() ? (
          <SearchResults posts={posts} query={searchQuery} nav={nav} lang={lang} />
        ) : (
          <>
            {/* ── D-day 위젯 ── */}
            <DdayWidget lang={lang} nav={nav} onNicknameSave={onNicknameSave} />

            {/* ── 마스터 그리드 ── */}
            <MasterGrid nav={nav} lang={lang} toggleLang={toggleLang} onOpenMore={()=>setShowMore(true)} />

            {/* ── 실시간 전광판 ── */}
            <TickingAnnouncementBar lang={lang} />

            {/* ── 게시판별 인기글 ── */}
            <div id="hot-feed"><HotFeed posts={posts} nav={nav} lang={lang} /></div>

            {/* ── 최신글 ── */}
            <LatestFeed posts={posts} nav={nav} lang={lang} />
          </>
        )}
      </main>


      {/* 닉네임 설정 모달 */}
      {showNicknameModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center fade-in" onClick={() => setShowNicknameModal(false)}>
          <div className="bg-white rounded-t-3xl w-full max-w-lg px-6 pt-6 pb-10 shadow-2xl" onClick={e=>e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>
            <p className="text-sm font-black text-gray-800 mb-1">{lang==='vi'?'Đặt tên của bạn':'닉네임 설정'}</p>
            <p className="text-xs text-gray-400 mb-4">{lang==='vi'?'Bạn có thể thay đổi bất cứ lúc nào':'언제든지 변경할 수 있어요'}</p>
            {myUnreadPosts.length > 0 && (
  <div className="bg-red-50 border border-red-200 rounded-2xl px-3 py-3 mb-4">
    <p className="text-xs font-black text-red-600 mb-2">
      🔔 {lang==='vi' ? `${myUnreadPosts.length} bài có bình luận mới` : `새 댓글 달린 글 ${myUnreadPosts.length}개`}
    </p>
    <div className="flex flex-col gap-1.5">
      {myUnreadPosts.slice(0, 5).map(({ post, unread }) => {
        const boardKey = (CAT_BOARD_MAP[post.cat] || CAT_BOARD_MAP.bamboo).key;
        return (
          <button key={post.id}
            onClick={() => { setShowNicknameModal(false); nav({ page:'postDetail', boardKey, postId: post.id }); }}
            className="flex items-center justify-between bg-white rounded-xl px-3 py-2 text-left tap">
            <span className="text-[11px] text-gray-700 truncate flex-1">{post.title}</span>
            <span className="text-[10px] font-black text-red-500 bg-red-100 px-1.5 py-0.5 rounded-full ml-2 flex-shrink-0">+{unread}</span>
          </button>
        );
      })}
    </div>
  </div>
)}
            <input
              type="text"
              value={nicknameInput}
              onChange={e => setNicknameInput(e.target.value)}
              placeholder={lang==='vi'?'Nhập tên của bạn...':'닉네임을 입력하세요...'}
              maxLength={20}
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 mb-3"
              autoFocus
              onKeyPress={e => e.key === 'Enter' && handleNicknameSave()}
            />
            <p className="text-[10px] text-gray-400 mt-1 mb-3">{LANG[lang].nickWarn}</p>
            <div className="text-right text-xs text-gray-400 mb-4">{nicknameInput.length}/20</div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => {setShowNicknameModal(false); setNicknameInput('');}}
                className="py-3 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 bg-white tap transition">
                {lang==='vi'?'Hủy':'취소'}
              </button>
              <button
                onClick={handleNicknameSave}
                disabled={!nicknameInput.trim() || nicknameLoading}
                className="py-3 bg-blue-700 text-white rounded-2xl text-sm font-black tap transition disabled:opacity-40">
                {nicknameLoading ? (lang==='vi'?'Đang lưu...':'저장 중...') : (lang==='vi'?'Lưu':'저장')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 전체 채널 서랍 */}
      {showMore && <MoreDrawer nav={nav} lang={lang} onClose={()=>setShowMore(false)} />}

      {/* 푸터 */}
      <SiteFooter lang={lang} nav={nav} />
    </div>
  );
}
