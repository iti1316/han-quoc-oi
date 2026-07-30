
/* ── 커스텀 훅: 게시글 (LocalStorage) ──────────────────────── */
function usePosts() {
  const deviceId = getDeviceId();
  const [posts, setPosts] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(BOARD_STORE));
      if (!stored) return defaultPosts().map(p => ({ ...p, deviceId: 'system_default' }));
      return stored.map(p => ({
        ...p,
        isPublic: p.isPublic !== undefined ? p.isPublic : true,
        deviceId: p.deviceId || 'system_default'  // 기존 데이터에 deviceId 없으면 추가
      }));
    }
    catch { return defaultPosts().map(p => ({ ...p, deviceId: 'system_default' })); }
  });
  const save = (next) => {

    setPosts(next);

    // localStorage 사용 (fallback용, file:// 프로토콜에서는 제한될 수 있음)
    try {
      localStorage.setItem(BOARD_STORE, JSON.stringify(next));
      console.log('💾 LocalStorage saved - 첫 글 author:', next[0]?.author);
    } catch (e) {
      console.warn('⚠️ LocalStorage 사용 불가:', e.message);
    }

    // Firebase REST API로 저장 (메인 저장소)
    console.log('🌐 Sending to Firebase...');
    fetch(FIREBASE_POSTS_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
      timeout: 10000
    })
      .then(res => {
        console.log('📡 Firebase response:', res.status);
        if (res.ok) {
          console.log('✅ Firebase save success');
          return res.json();
        } else {
          throw new Error(`Firebase error: ${res.statusText}`);
        }
      })
      .catch(e => {
        console.error('❌ Firebase save failed:', e.message);
        console.warn('⚠️ 로컬 데이터는 저장됨. 다음 새로고침 시 firebase와 동기화됨.');
      });
  };
  const addPost    = (p)         => {
    console.log('🟢 [addPost] 받은 post:', p);
    console.log('🟢 [addPost] post.author:', p.author);
    console.log('🟢 [addPost] 현재 posts 배열 길이:', posts.length);
    const newPostsArray = [p, ...posts];
    console.log('🟢 [addPost] 새 배열의 첫 번째 글:', newPostsArray[0]);
    save(newPostsArray);
  };
  const deletePost = (id)        => save(posts.filter(p => p.id !== id));
  const updatePost = (id, edits) => save(posts.map(p => p.id === id ? { ...p, ...edits } : p));

  // Firebase 실시간 리스너 — 누구든 글/댓글/반응을 바꾸는 즉시 모든 사용자 화면에 자동 반영
  useEffect(() => {
    const postsRef = window.database.ref('posts');

    const handleValue = (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        console.log('✅ Firebase: 데이터 없음 (초기 상태)');
        return;
      }

      // Firebase가 배열을 객체 형태로 줄 수도 있어서 방어적으로 처리
      const dataArray = Array.isArray(data) ? data : Object.values(data);

      if (!Array.isArray(dataArray)) {
        console.warn('⚠️ Firebase 데이터가 배열이 아님:', typeof data);
        return;
      }

      // 각 항목 검증 (id와 author 필수)
      const validData = dataArray.filter(p => p && p.id != null && p.author);
      console.log(`✅ [실시간] Firebase 업데이트: ${dataArray.length}개 중 ${validData.length}개 유효`);

      setPosts(prev => {
        // id를 string으로 정규화해서 비교 (안전성 향상)
        const localOnly = prev.filter(p =>
          !validData.some(fb => String(fb.id) === String(p.id))
        );

        const merged = [...localOnly, ...validData];

        // localStorage 업데이트 시도 (실패해도 괜찮음)
        try {
          localStorage.setItem(BOARD_STORE, JSON.stringify(merged));
        } catch (e) {
          console.warn('⚠️ 실시간 업데이트 후 localStorage 업데이트 실패');
        }

        return merged;
      });
    };

    postsRef.on('value', handleValue, (error) => {
      console.error('❌ Firebase 실시간 리스너 오류:', error.message);
    });

    // 컴포넌트 정리 시 리스너 해제
    return () => {
      postsRef.off('value', handleValue);
    };
  }, []);

  function addComment(postId, comment) {
    save(posts.map(p => {
      if (p.id !== postId) return p;
      const list = [...(p.commentsData || []), { ...comment, deviceId }];
      return { ...p, commentsData: list, comments: list.length };
    }));
  }
  function deleteComment(postId, commentId) {
    save(posts.map(p => {
      if (p.id !== postId) return p;
      const list = (p.commentsData || []).filter(c => c.id !== commentId);
      return { ...p, commentsData: list, comments: list.length };
    }));
  }
  function updateComment(postId, commentId, edits) {
    save(posts.map(p => {
      if (p.id !== postId) return p;
      const list = (p.commentsData || []).map(c => c.id === commentId ? { ...c, ...edits } : c);
      return { ...p, commentsData: list, comments: list.length };
    }));
  }

  // Firebase에서 최신 데이터 다시 불러오기 (다른 기기의 변경사항 반영용)
  const refreshPosts = async () => {
    console.log('🔄 [refreshPosts] Firebase에서 최신 데이터 불러오는 중...');
    try {
      const res = await fetch(FIREBASE_POSTS_URL, { timeout: 10000 });
      const data = await res.json();

      if (!data) {
        console.log('✅ Firebase: 데이터 없음 (초기 상태)');
        return;
      }

      if (!Array.isArray(data)) {
        console.warn('⚠️ Firebase 데이터가 배열이 아님:', typeof data);
        return;
      }

      const validData = data.filter(p => p && p.id != null && p.author);
      console.log(`✅ [refreshPosts] Firebase load: ${data.length}개 중 ${validData.length}개 유효`);

      setPosts(prev => {
        const localOnly = prev.filter(p =>
          !validData.some(fb => String(fb.id) === String(p.id))
        );

        const merged = [...localOnly, ...validData];
        console.log('✅ [refreshPosts] 최신 데이터 병합 완료 - 지역 글:', localOnly.length, '개');

        try {
          localStorage.setItem(BOARD_STORE, JSON.stringify(merged));
        } catch (e) {
          console.warn('⚠️ 새로고침 후 localStorage 업데이트 실패');
        }

        return merged;
      });
    } catch (e) {
      console.error('❌ [refreshPosts] Firebase load error:', e.message);
    }
  };

  return { posts, setPosts, addPost, deletePost, updatePost, addComment, deleteComment, updateComment, deviceId, refreshPosts };
}

/* ================================================================
   공용 UI 컴포넌트
================================================================ */

/* 뒤로가기 헤더 */
function BackHeader({ title, onBack, rightSlot }) {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
        <button onClick={onBack}
          className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 text-2xl leading-none transition tap">
          ‹
        </button>
        <h1 className="text-sm font-black text-gray-800 flex-1 word-keep">{title}</h1>
        {rightSlot}
      </div>
    </header>
  );
}

/* 토스트 알림 */
function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2400); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl z-50 whitespace-nowrap fade-in">
      {msg}
    </div>
  );
}

/* 비밀번호 확인 모달 */
function PwModal({ lang, onConfirm, onCancel }) {
  const [pw, setPw]   = useState('');
  const [err, setErr] = useState(false);
  const L = LANG[lang];
  function confirm() {
    onConfirm(pw, () => setErr(true));
  }
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center fade-in" onClick={onCancel}>
      <div className="bg-white rounded-t-3xl w-full max-w-lg px-6 pt-6 pb-10 shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>
        <p className="text-sm font-black text-gray-800 mb-1 text-center">{L.pwModalTitle}</p>
        <p className="text-xs text-gray-400 mb-4 text-center">{L.pwModalSub}</p>
        <input
          type="password" inputMode="numeric" maxLength={4}
          value={pw}
          onChange={e => { setPw(e.target.value.replace(/\D/g,'')); setErr(false); }}
          placeholder={L.pwPlaceholder}
          className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-blue-700 mb-2 transition"
          autoFocus
        />
        {err && <p className="text-xs text-red-500 text-center mb-2 fade-in">{L.pwWrong}</p>}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button onClick={onCancel}
            className="py-3.5 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 bg-white tap transition">
            {L.pwCancel}
          </button>
          <button onClick={confirm}
            className="py-3.5 bg-blue-700 text-white rounded-2xl text-sm font-black tap transition">
            {L.pwConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 공지 상세 모달 ── */
/* ── 관리자 공지 편집 모달 ── */
function NoticeAdminModal({ notices, lang, onSave, onClose }) {
  const [list, setList] = useState(notices.map(n => ({ ...n })));

  function update(idx, field, val) {
    setList(prev => prev.map((n, i) => i === idx ? { ...n, [field]: val } : n));
  }
  function addNotice() {
    const newId = Math.max(...list.map(n => n.id), 0) + 1;
    setList(prev => [...prev, { id: newId, urgent: false, date: new Date().toLocaleDateString('ko-KR').replace(/\. /g,'.').replace('.',''), ko: '', vi: '' }]);
  }
  function removeNotice(idx) {
    if (list.length <= 1) return alert('공지는 최소 1개 이상 있어야 합니다.');
    setList(prev => prev.filter((_,i) => i !== idx));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-lg bg-white rounded-t-2xl px-4 pt-5 pb-8 fade-in overflow-y-auto max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-black text-gray-800">🔧 공지 관리</h2>
          <button onClick={onClose} className="text-gray-400 text-xl font-bold">✕</button>
        </div>

        {list.map((n, i) => (
          <div key={n.id} className="mb-4 bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500">공지 {i+1}</span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-xs text-red-500 font-bold cursor-pointer">
                  <input type="checkbox" checked={n.urgent} onChange={e => update(i,'urgent',e.target.checked)} className="w-3 h-3" />
                  중요
                </label>
                <button onClick={() => removeNotice(i)} className="text-red-400 text-xs font-bold tap">삭제</button>
              </div>
            </div>
            <input
              type="date"
              value={n.date.replace(/\./g,'-')}
              onChange={e => update(i,'date', e.target.value.replace(/-/g,'.'))}
              className="w-full text-xs border border-gray-300 rounded-lg px-2 py-1.5 mb-2"
            />
            <textarea
              rows={3}
              placeholder="한국어 공지 내용"
              value={n.ko}
              onChange={e => update(i,'ko',e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-lg px-2 py-1.5 mb-2 resize-none"
            />
            <textarea
              rows={3}
              placeholder="베트남어 공지 내용 (Nội dung thông báo tiếng Việt)"
              value={n.vi}
              onChange={e => update(i,'vi',e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-lg px-2 py-1.5 resize-none"
            />
          </div>
        ))}

        <button onClick={addNotice} className="w-full border-2 border-dashed border-blue-300 text-blue-500 font-bold text-sm py-2.5 rounded-xl mb-3 tap">
          + 공지 추가
        </button>
        <button
          onClick={() => { onSave(list); onClose(); }}
          className="w-full bg-blue-700 text-white font-black py-3 rounded-xl tap"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

/* ── 관리자 Firebase Auth 로그인 모달 ── */
function AdminPwModal({ onSuccess, onClose, lang = 'ko' }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!email || !pw) {
      setErr(true);
      return;
    }
    setLoading(true);
    try {
      await window.auth.signInWithEmailAndPassword(email, pw);
      onSuccess();
    } catch (e) {
      setErr(true);
      setEmail('');
      setPw('');
    } finally {
      setLoading(false);
    }
  }

  const errMsg = lang === 'vi' ? 'Email hoặc mật khẩu không đúng' : '이메일 또는 비밀번호가 올바르지 않습니다';
  const loadingMsg = lang === 'vi' ? 'Đang đăng nhập...' : '로그인 중...';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-xs fade-in" onClick={e => e.stopPropagation()}>
        <h3 className="text-base font-black text-gray-800 mb-1 text-center">관리자 확인</h3>
        <p className="text-xs text-gray-400 text-center mb-4">{lang === 'vi' ? 'Nhập email và mật khẩu' : '이메일과 비밀번호를 입력하세요'}</p>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErr(false); }}
          placeholder={lang === 'vi' ? 'Email' : '이메일'}
          className={`w-full border-2 rounded-xl px-3 py-2.5 text-sm text-center mb-2 outline-none ${err ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'}`}
          autoFocus
          disabled={loading}
        />
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === 'Enter' && !loading && check()}
          placeholder={lang === 'vi' ? 'Mật khẩu' : '비밀번호'}
          className={`w-full border-2 rounded-xl px-3 py-2.5 text-sm text-center mb-1 outline-none ${err ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'}`}
          disabled={loading}
        />
        {err && <p className="text-xs text-red-500 text-center mb-2">{errMsg}</p>}
        {loading && <p className="text-xs text-blue-500 text-center mb-2">{loadingMsg}</p>}
        <div className="flex gap-2 mt-3">
          <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-600 font-bold py-2.5 rounded-xl text-sm tap" disabled={loading}>{lang === 'vi' ? 'Hủy' : '취소'}</button>
          <button onClick={check} className="flex-1 bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm tap" disabled={loading}>{lang === 'vi' ? 'Xác nhận' : '확인'}</button>
        </div>
      </div>
    </div>
  );
}

/* ── 실시간 핫 전광판 (관리자 편집 포함) ── */
function TickingAnnouncementBar({ lang }) {
  const [notices,   setNotices]   = useState(() => loadNotices());
  const [idx,       setIdx]       = useState(0);
  const [showPw,    setShowPw]    = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [tapCount,  setTapCount]  = useState(0);
  const tapTimer = useRef(null);

  useEffect(() => {
    if (notices.length === 0) return;
    const t = setInterval(() => setIdx(i => (i+1) % notices.length), 3500);
    return () => clearInterval(t);
  }, [notices.length]);

  function handleSave(updated) {
    const cleaned = updated.filter(n => n.ko?.trim() || n.vi?.trim());
    saveNotices(cleaned);
    setNotices(cleaned);
    setIdx(0);
  }

  if (notices.length === 0) return null;
  const n = notices[idx];

  return (
    <>
      <div
        className="bg-yellow-400 px-4 py-2 cursor-pointer"
        onClick={() => {
          setTapCount(c => {
            const next = c + 1;
            clearTimeout(tapTimer.current);
            if (next >= 5) { setShowPw(true); return 0; }
            tapTimer.current = setTimeout(() => setTapCount(0), 2000);
            return next;
          });
        }}>
        <p className="text-[9px] font-black text-yellow-900/60 leading-none mb-0.5">
          ⚡ {lang==='vi' ? 'Bảng thông báo thời gian thực' : '실시간 핫 한 줄 전광판'}
        </p>
        <p className="text-[11px] font-bold text-yellow-900 word-keep leading-relaxed overflow-hidden"
          style={{height:'3.4em', maxHeight:'3.4em', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical'}}>
          🔥 {n[lang]}
        </p>
      </div>

      {/* Firebase Auth 로그인 모달 */}
      {showPw && (
        <AdminPwModal
          lang={lang}
          onSuccess={() => { setShowPw(false); setShowAdmin(true); }}
          onClose={() => setShowPw(false)}
        />
      )}
      {/* 편집 모달 */}
      {showAdmin && (
        <NoticeAdminModal
          notices={notices}
          lang={lang}
          onSave={handleSave}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </>
  );
}
