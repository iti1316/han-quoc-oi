/* ── 관리자 페이지 ── */
function AdminPage({ nav, posts, lang = 'vi', onDeletePost }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginErr, setLoginErr] = useState('');
  const [notices, setNotices] = useState(() => loadNotices());
  const [hotline, setHotline] = useState('🔥 최신 공지를 확인하세요!');
  const [hotlineLoading, setHotlineLoading] = useState(true);
  const [boardNoticesByCategory, setBoardNoticesByCategory] = useState(() => loadBoardNoticesByCat());
  const [selectedBoardForNotices, setSelectedBoardForNotices] = useState('market');
  const [selectedBoardForPosts, setSelectedBoardForPosts] = useState('market');
  const [noticeForm, setNoticeForm] = useState({ ko:'', vi:'', date:'' });
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [boardNoticeForm, setBoardNoticeForm] = useState({ title:'', title_vi:'' });
  const [isAddingBoardNotice, setIsAddingBoardNotice] = useState(false);
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginErr(lang === 'vi' ? 'Vui lòng nhập email và mật khẩu' : '이메일과 비밀번호를 입력하세요');
      return;
    }
    setLoginLoading(true);
    setLoginErr('');
    try {
      await window.auth.signInWithEmailAndPassword(email, password);
      setIsAuthenticated(true);
      setEmail('');
      setPassword('');
    } catch (e) {
      setLoginErr(lang === 'vi' ? 'Email hoặc mật khẩu không đúng' : '이메일 또는 비밀번호가 올바르지 않습니다');
      setPassword('');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await window.auth.signOut();
    setIsAuthenticated(false);
    nav('home', lang);
  };

  const handleHotlineUpdate = async () => {
    try {
      const res = await fetch(`${FIREBASE_BASE}/notices/hotline.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotline)
      });
      if (!res.ok) throw new Error('Failed to update hotline');
      localStorage.setItem('hotline', hotline);
      alert('✅ 실시간 핫라인이 업데이트되었습니다!');
    } catch (e) {
      console.error('❌ 핫라인 업데이트 실패:', e.message);
      alert('❌ 핫라인 업데이트 실패했습니다.');
    }
  };

  const loadReports = async () => {
    setReportsLoading(true);
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (e) {
      console.error('신고 목록 로드 실패:', e);
    } finally {
      setReportsLoading(false);
    }
  };

  useEffect(() => {
    const loadHotlineFromFirebase = async () => {
      try {
        const res = await fetch(`${FIREBASE_BASE}/notices/hotline.json`);
        if (res.ok) {
          const data = await res.json();
          if (data !== null && data !== undefined) {
            setHotline(data);
          } else {
            setHotline(localStorage.getItem('hotline') || '🔥 최신 공지를 확인하세요!');
          }
        } else {
          setHotline(localStorage.getItem('hotline') || '🔥 최신 공지를 확인하세요!');
        }
      } catch (e) {
        console.warn('Firebase 핫라인 로드 실패:', e.message);
        setHotline(localStorage.getItem('hotline') || '🔥 최신 공지를 확인하세요!');
      } finally {
        setHotlineLoading(false);
      }
    };
    loadHotlineFromFirebase();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadReports();
    }
  }, [isAuthenticated]);

  const handleResolveReport = async (key) => {
    if (!confirm('이 신고를 처리완료 상태로 변경하시겠어요?')) return;
    try {
      const success = await updateReportStatus(key, 'resolved');
      if (success) {
        setReports(prev => prev.map(r => r._key === key ? { ...r, status: 'resolved' } : r));
        alert('✅ 처리되었습니다!');
      }
    } catch (e) {
      alert('❌ 처리 실패');
      console.error(e);
    }
  };

  const reasonMap = {
    spam: '광고 · 도배',
    abuse: '욕설 · 혐오 표현',
    privacy: '개인정보 노출',
    sexual: '음란물 · 선정성',
    fraud: '사기 · 불법 알선',
    other: '기타'
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;

  if (!isAuthenticated) {
    return (
      <div style={{background:'#F5F6F8', minHeight:'100vh'}} className="flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 w-full max-w-sm mx-4 text-center">
          <p className="text-2xl mb-4">🔐</p>
          <p className="font-black text-gray-800 mb-6">{lang === 'vi' ? 'Xác thực quản trị viên' : '관리자 인증'}</p>
          <input
            type="email"
            placeholder={lang === 'vi' ? 'Email' : '이메일'}
            value={email}
            onChange={(e)=>{ setEmail(e.target.value); setLoginErr(''); }}
            onKeyPress={(e)=>e.key==='Enter' && !loginLoading && handleLogin()}
            className="w-full border-2 border-gray-300 rounded p-3 mb-3 text-center font-bold"
            autoFocus
            disabled={loginLoading}
          />
          <input
            type="password"
            placeholder={lang === 'vi' ? 'Mật khẩu' : '비밀번호'}
            value={password}
            onChange={(e)=>{ setPassword(e.target.value); setLoginErr(''); }}
            onKeyPress={(e)=>e.key==='Enter' && !loginLoading && handleLogin()}
            className="w-full border-2 border-gray-300 rounded p-3 mb-4 text-center font-bold"
            disabled={loginLoading}
          />
          {loginErr && <p className="text-red-500 text-sm mb-4 font-bold">{loginErr}</p>}
          {loginLoading && <p className="text-blue-500 text-sm mb-4 font-bold">{lang === 'vi' ? 'Đang đăng nhập...' : '로그인 중...'}</p>}
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-3 rounded font-bold" disabled={loginLoading}>
            {lang === 'vi' ? 'Đăng nhập' : '입장'}
          </button>
        </div>
      </div>
    );
  }

  const handleAddNotice = () => {
    if (!noticeForm.ko.trim() && !noticeForm.vi.trim()) return;
    const newNotice = {
      id: Math.max(...notices.map(n => n.id), 0) + 1,
      ko: noticeForm.ko,
      vi: noticeForm.vi,
    };
    const updated = [...notices, newNotice];
    setNotices(updated);
    saveNotices(updated);
    setNoticeForm({ ko:'', vi:'', date:'' });
    setIsAddingNotice(false);
    alert('✅ 공지가 추가되었습니다!');
  };

  const handleDeleteNotice = (id) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    saveNotices(updated);
  };

  const handleAddBoardNotice = () => {
    if (!boardNoticeForm.title.trim() && !boardNoticeForm.title_vi.trim()) return;
    const catNotices = boardNoticesByCategory[selectedBoardForNotices] || [];
    const newNotice = {
      id: 'b' + (Math.max(...catNotices.map(n => parseInt(n.id.substring(1))||0), 0) + 1),
      title: boardNoticeForm.title,
      title_vi: boardNoticeForm.title_vi,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0
    };
    const updated = { ...boardNoticesByCategory, [selectedBoardForNotices]: [...catNotices, newNotice] };
    setBoardNoticesByCategory(updated);
    saveBoardNoticesByCat(updated);
    setBoardNoticeForm({ title:'', title_vi:'' });
    setIsAddingBoardNotice(false);
    alert('✅ 공지가 추가되었습니다!');
  };

  const handleDeleteBoardNotice = (id) => {
    const catNotices = boardNoticesByCategory[selectedBoardForNotices] || [];
    const updated = { ...boardNoticesByCategory, [selectedBoardForNotices]: catNotices.filter(n => n.id !== id) };
    setBoardNoticesByCategory(updated);
    saveBoardNoticesByCat(updated);
  };

  return (
    <div style={{background:'#F5F6F8', minHeight:'100vh'}}>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={()=>nav({page:'home'})} className="text-gray-500 mr-4">‹</button>
            <p className="text-sm font-black text-gray-800">📋 관리자</p>
          </div>
          <button onClick={handleLogout} className="text-sm font-bold text-red-600 hover:bg-red-50 px-3 py-1 rounded">
            {lang === 'vi' ? 'Đăng xuất' : '로그아웃'}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-3 pt-4 pb-6">
        {/* 통계 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-blue-500 text-white p-3 rounded-lg text-center">
            <p className="text-2xl font-black">{posts.length}</p>
            <p className="text-xs">전체 글</p>
          </div>
          <div className="bg-green-500 text-white p-3 rounded-lg text-center">
            <p className="text-2xl font-black">{notices.length}</p>
            <p className="text-xs">공지</p>
          </div>
          <div className="bg-purple-500 text-white p-3 rounded-lg text-center">
            <p className="text-2xl font-black">{new Set(posts.map(p=>p.deviceId)).size}</p>
            <p className="text-xs">활동 사용자</p>
          </div>
        </div>

        {/* 🔥 실시간 핫라인 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="font-black text-gray-800 mb-3">🔥 실시간 핫라인</p>
          <textarea
            value={hotline}
            onChange={(e)=>setHotline(e.target.value)}
            className="w-full border-2 border-gray-300 rounded p-2 text-sm mb-2"
            rows="2"
            placeholder="실시간 공지 내용"
          />
          <button onClick={handleHotlineUpdate} className="w-full bg-red-600 text-white py-2 rounded font-bold text-sm">📢 업데이트</button>
        </div>

        {/* ⚡ 실시간 핫 한 줄 전광판 관리 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="font-black text-gray-800 mb-3">⚡ 실시간 핫 한 줄 전광판</p>
          <p className="text-xs text-gray-500 mb-3">메인화면 노란색 전광판에 즉시 반영됩니다</p>

          <div className="space-y-2 max-h-64 overflow-y-auto mb-3">
            {notices.map(notice => (
              <div key={notice.id} className="flex justify-between items-start gap-2 bg-yellow-50 border border-yellow-200 p-2 rounded text-sm">
                <div className="flex-1">
                  <p className="font-bold text-gray-800">🔥 {notice.ko}</p>
                  <p className="text-xs text-gray-600">{notice.vi}</p>
                </div>
                <button onClick={()=>handleDeleteNotice(notice.id)} className="text-red-500 font-bold text-xs flex-shrink-0 mt-0.5">삭제</button>
              </div>
            ))}
          </div>

          {!isAddingNotice ? (
            <button onClick={()=>setIsAddingNotice(true)} className="w-full bg-blue-600 text-white py-2 rounded font-bold text-sm">+ 공지 추가</button>
          ) : (
            <div className="space-y-2">
              <textarea
                placeholder="한국어 공지"
                value={noticeForm.ko}
                onChange={(e)=>setNoticeForm({...noticeForm, ko:e.target.value})}
                className="w-full border-2 border-gray-300 rounded p-2 text-sm"
                rows="2"
              />
              <textarea
                placeholder="베트남어 공지"
                value={noticeForm.vi}
                onChange={(e)=>setNoticeForm({...noticeForm, vi:e.target.value})}
                className="w-full border-2 border-gray-300 rounded p-2 text-sm"
                rows="2"
              />
              <div className="flex gap-2">
                <button onClick={handleAddNotice} className="flex-1 bg-green-600 text-white py-2 rounded font-bold text-sm">저장</button>
                <button onClick={()=>setIsAddingNotice(false)} className="flex-1 bg-gray-400 text-white py-2 rounded font-bold text-sm">취소</button>
              </div>
            </div>
          )}
        </div>

        {/* 📌 게시판 공지사항 관리 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="font-black text-gray-800 mb-3">📌 게시판 공지사항 관리</p>

          <div className="mb-3">
            <select value={selectedBoardForNotices} onChange={(e)=>setSelectedBoardForNotices(e.target.value)} className="w-full border-2 border-gray-300 rounded p-2 text-sm">
              <option value="market">🥕 당근마켓 꿀매물</option>
              <option value="house">🏠 집 구하기 & 쉐어하우스</option>
              <option value="hospital">🏥 병원 찾기 · 추천</option>
              <option value="travel">📸 여행·맛집 소개</option>
              <option value="hall">🏆 합격 명예의 전당</option>
              <option value="sos">🚨 비자 119 SOS</option>
              <option value="bamboo">🤫 대나무숲 완전 익명</option>
              <option value="horror">👻 무서운 이야기 방</option>
              <option value="talk">💬 출입국 참교육방</option>
              <option value="info">📚 한국생활 정보</option>
              <option value="jobs">💼 지역 일자리 구인&구직</option>
            </select>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto mb-3">
            {(boardNoticesByCategory[selectedBoardForNotices] || []).map(notice => (
              <div key={notice.id} className="flex justify-between items-start gap-2 bg-blue-50 border border-blue-200 p-2 rounded text-sm">
                <div className="flex-1">
                  <p className="font-bold text-gray-800">🔔 {notice.title}</p>
                  <p className="text-xs text-gray-600">{notice.title_vi}</p>
                </div>
                <button onClick={()=>handleDeleteBoardNotice(notice.id)} className="text-red-500 font-bold text-xs flex-shrink-0 mt-0.5">삭제</button>
              </div>
            ))}
          </div>

          {!isAddingBoardNotice ? (
            <button onClick={()=>setIsAddingBoardNotice(true)} className="w-full bg-blue-600 text-white py-2 rounded font-bold text-sm">+ 공지 추가</button>
          ) : (
            <div className="space-y-2">
              <textarea
                placeholder="한국어 공지"
                value={boardNoticeForm.title}
                onChange={(e)=>setBoardNoticeForm({...boardNoticeForm, title:e.target.value})}
                className="w-full border-2 border-gray-300 rounded p-2 text-sm"
                rows="2"
              />
              <textarea
                placeholder="베트남어 공지"
                value={boardNoticeForm.title_vi}
                onChange={(e)=>setBoardNoticeForm({...boardNoticeForm, title_vi:e.target.value})}
                className="w-full border-2 border-gray-300 rounded p-2 text-sm"
                rows="2"
              />
              <div className="flex gap-2">
                <button onClick={handleAddBoardNotice} className="flex-1 bg-green-600 text-white py-2 rounded font-bold text-sm">저장</button>
                <button onClick={()=>setIsAddingBoardNotice(false)} className="flex-1 bg-gray-400 text-white py-2 rounded font-bold text-sm">취소</button>
              </div>
            </div>
          )}
        </div>

        {/* 🚩 신고 관리 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <p className="font-black text-gray-800">🚩 신고 관리</p>
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{pendingCount}건</span>
            )}
          </div>

          {reportsLoading ? (
            <p className="text-center text-gray-500 text-sm py-4">로딩 중...</p>
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-4">신고 내역이 없습니다</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {reports.map(report => (
                <div key={report._key} className={`border-l-4 p-3 rounded text-sm ${
                  report.status === 'pending' ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                }`}>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">
                        {reasonMap[report.reason] || report.reason}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {report.targetType === 'post' ? '게시글' : '댓글'}
                        {report.createdAt && ` · ${new Date(report.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                      report.status === 'pending' ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {report.status === 'pending' ? '미처리' : '처리완료'}
                    </span>
                  </div>

                  {report.content && (
                    <p className="text-xs text-gray-600 bg-white p-2 rounded mb-2 italic">"{report.content}"</p>
                  )}

                  <div className="flex gap-1">
                    {report.postId && (
                      <button
                        onClick={() => {
                          const target = posts.find(p => String(p.id) === String(report.postId));
                          if (!target) { alert('해당 글을 찾을 수 없습니다. 삭제된 글일 수 있습니다.'); return; }
                          const bk = CAT_BOARD_MAP[target.cat] || target.cat;
                          nav({ page:'postDetail', boardKey: bk, postId: target.id });
                        }}
                        className="flex-1 text-blue-600 font-bold text-xs border border-blue-300 rounded py-1.5 hover:bg-blue-50">
                        해당 글 보기
                      </button>
                    )}
                    {report.status === 'pending' && (
                      <button
                        onClick={() => handleResolveReport(report._key)}
                        className="flex-1 text-green-600 font-bold text-xs border border-green-300 rounded py-1.5 hover:bg-green-50">
                        처리완료
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 게시글 관리 */}
        <div className="bg-white rounded-lg p-4">
          <p className="font-black text-gray-800 mb-3">📝 최근 글</p>

          <div className="mb-3">
            <select value={selectedBoardForPosts} onChange={(e)=>setSelectedBoardForPosts(e.target.value)} className="w-full border-2 border-gray-300 rounded p-2 text-sm">
              <option value="market">🥕 당근마켓 꿀매물</option>
              <option value="house">🏠 집 구하기 & 쉐어하우스</option>
              <option value="hospital">🏥 병원 찾기 · 추천</option>
              <option value="travel">📸 여행·맛집 소개</option>
              <option value="hall">🏆 합격 명예의 전당</option>
              <option value="sos">🚨 비자 119 SOS</option>
              <option value="bamboo">🤫 대나무숲 완전 익명</option>
              <option value="horror">👻 무서운 이야기 방</option>
              <option value="talk">💬 출입국 참교육방</option>
              <option value="info">📚 한국생활 정보</option>
              <option value="jobs">💼 지역 일자리 구인&구직</option>
            </select>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {posts.filter(p => p.cat === selectedBoardForPosts && p.isPublic !== false).slice(0, 10).map(post => (
              <div key={post.id} className="flex justify-between items-start bg-gray-50 border border-gray-200 p-2 rounded text-sm">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.author || '익명'}</p>
                </div>
                <button onClick={()=>onDeletePost && onDeletePost(post.id)} className="text-red-500 font-bold text-xs ml-2 flex-shrink-0">삭제</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
