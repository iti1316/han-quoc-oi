/* ── 게시글 상세 페이지 ── */
function PostDetailPage({ boardKey, postId, nav, posts, lang, onAddComment, onDeleteComment, onUpdateComment, onDeletePost, onEditPost, deviceId }) {
  const post = posts.find(p => p.id === postId || p.id === Number(postId));
  const cfg  = CLASSIC_BOARD_CFG[boardKey];

  const [r,        setR]        = useState({ likes:post?.likes||0, hearts:post?.hearts||0, wows:post?.wows||0 });
  const [act,      setAct]      = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [shareMsg, setShareMsg] = useState('');
  const [reportModal, setReportModal] = useState(false);
  const lbTouchX = useRef(null);

  // post 변경 시 반응수 동기화
  useEffect(() => {
    if (post) {
      setR({ likes: post.likes||0, hearts: post.hearts||0, wows: post.wows||0 });
    }
  }, [post?.id, post?.likes, post?.hearts, post?.wows]);

  // Open Graph 메타 태그 설정
  useEffect(() => {
    if (post) {
      const title = post.title || '게시글';
      const description = (post.body || '').substring(0, 150).replace(/<[^>]*>/g, '') || cfg?.ko || '';
      const url = `${window.location.origin}${window.location.pathname}#/postDetail/${boardKey}/${postId}`;

      document.title = title;

      // og:title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);

      // og:description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);

      // og:url
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', url);
    }
  }, [post?.id, post?.title, post?.body, boardKey, postId]);
// 내 글이면 댓글 읽음 처리
useEffect(() => {
  if (post && post.deviceId === deviceId) {
    const current = post.commentsData?.length || post.comments || 0;
    markPostSeen(post.id, current);
  }
}, [post?.id, post?.commentsData?.length, post?.comments, deviceId]);
  if (!post) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center px-6">
        <p className="text-3xl mb-3">📭</p>
        <p className="text-gray-400 text-sm mb-4">{lang==='vi'?'Không tìm thấy bài viết.':'게시글을 찾을 수 없습니다.'}</p>
        <button onClick={()=>nav({page:'classicBoard', param:boardKey})}
          className="text-blue-600 font-bold text-sm">← {lang==='vi'?'Quay lại':'돌아가기'}</button>
      </div>
    </div>
  );

  function react(type) {
    const same = act === type;
    setR(p=>{ const n={...p}; if(same) n[type]=Math.max(0,n[type]-1); else{ if(act) n[act]=Math.max(0,n[act]-1); n[type]++; } return n; });
    setAct(same?null:type);
  }

  const BTNS = [
    { t:'likes',  i:'👍', ko:'좋아요',  vi:'Thích', on:'text-blue-600 bg-blue-50 border-blue-300' },
    { t:'hearts', i:'❤️', ko:'최고예요', vi:'Tuyệt', on:'text-red-500 bg-red-50 border-red-300' },
    { t:'wows',   i:'😮', ko:'놀라워요', vi:'Wow',   on:'text-amber-500 bg-amber-50 border-amber-300' },
  ];

  const boardTitle = cfg ? (lang==='vi'?cfg.vi:cfg.ko) : '';

  return (
    <div style={{background:'#F5F6F8', minHeight:'100vh'}}>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center gap-2">
          <button onClick={()=>nav({page:'classicBoard', param:boardKey})}
            className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xl leading-none tap">‹</button>
          <p className="text-sm font-black text-gray-600 truncate">{boardTitle}</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-3 pt-4 pb-24">
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          {/* 제목 + 작성자 */}
          <div className="px-5 pt-5 pb-4 border-b border-gray-100">
            {post.location?.sido && (
              <div className="mb-2">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                  📍 {fmtLocation(post.location)}
                </span>
              </div>
            )}
            <h1 className="text-[15px] font-black text-gray-900 word-keep leading-snug mb-4">{post.title}</h1>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${safeAvatarColor(post)} flex items-center justify-center text-white text-sm font-black flex-shrink-0`}>
                {safeAvatarChar(post)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-700">{safeAuthor(post)}</p>
                <p className="text-[10px] text-gray-400">{post.date}</p>
              </div>
              {post.deviceId === deviceId && (
                <div className="flex gap-1 ml-2 flex-shrink-0">
                  <button onClick={() => nav({ page:'write', param:post.cat, editPost:post })}
                    className="text-[10px] text-blue-400 hover:text-blue-600 border border-blue-100 hover:border-blue-300 px-2 py-0.5 rounded tap transition">
                    {lang==='vi'?'Sửa':'수정'}
                  </button>
                  <button onClick={() => {
                    if (confirm(lang==='vi'?'Xóa bài viết?':'글을 삭제하시겠어요?')) {
                      onDeletePost(post.id);
                      nav({page:'classicBoard', param:boardKey});
                    }
                  }}
                    className="text-[10px] text-red-400 hover:text-red-600 border border-red-100 hover:border-red-300 px-2 py-0.5 rounded tap transition">
                    {lang==='vi'?'Xóa':'삭제'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 본문 */}
          <div className="px-5 py-5 border-b border-gray-100">
            <p className="text-sm text-gray-700 leading-relaxed word-keep whitespace-pre-wrap">{post.body}</p>
          </div>

          {/* 첨부 이미지 */}
          {post.images && post.images.length > 0 && (
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-black text-gray-400 mb-2">📷 {lang==='vi'?`${post.images.length}장의 사진`:`첨부 사진 ${post.images.length}장`}</p>
              <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length <= 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {post.images.map((src, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={src}
                      alt={`사진 ${i+1}`}
                      className="w-full object-cover rounded-xl"
                      style={{cursor:'pointer', maxHeight: post.images.length===1?'360px':post.images.length<=4?'220px':'160px'}}
                      onClick={() => setLightbox(i)}
                    />
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-gray-300 mt-1.5">{lang==='vi'?'Nhấn vào ảnh để xem toàn màn hình':'이미지를 탭하면 전체화면으로 볼 수 있어요'}</p>
            </div>
          )}

          {/* 리액션 + 공유 */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 flex-wrap">
            {BTNS.map(b=>(
              <button key={b.t} onClick={()=>react(b.t)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold tap transition
                  ${act===b.t ? b.on : 'text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                <span>{b.i}</span>
                <span>{r[b.t]>0 ? r[b.t] : (lang==='vi'?b.vi:b.ko)}</span>
              </button>
            ))}
            {/* 공유 버튼 */}
            <button
              onClick={() => setShareModal(true)}
              className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold tap transition text-gray-500 border-gray-200 hover:bg-gray-50">
              <span>📤</span>
              <span>{lang==='vi'?'Chia sẻ':'공유'}</span>
            </button>
          </div>

          {/* 신고 버튼 */}
          {post.deviceId !== deviceId && (
            <div className="px-5 py-2 border-b border-gray-100">
              <button
                onClick={() => setReportModal(true)}
                disabled={hasReported(post.id)}
                className={`flex items-center gap-1 text-[10px] font-bold tap transition ${
                  hasReported(post.id)
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-400 hover:text-red-500'
                }`}>
                <span>🚩</span>
                <span>{hasReported(post.id) ? lang==='vi'?'Đã báo cáo':'신고함' : LANG[lang].reportBtn}</span>
              </button>
            </div>
          )}

          {/* 댓글 */}
          <CommentSection post={post} lang={lang}
            onAddComment={onAddComment} onDeleteComment={onDeleteComment} onUpdateComment={onUpdateComment} deviceId={deviceId} />
        </div>

        <button onClick={()=>nav({page:'classicBoard', param:boardKey})}
          className="mt-4 w-full bg-white border border-gray-300 text-gray-600 font-bold py-3 rounded text-sm tap hover:bg-gray-50 transition">
          ← {lang==='vi'?'Quay lại danh sách':'목록으로 돌아가기'}
        </button>
      </div>

      {/* 라이트박스 */}
      {lightbox !== null && post.images?.[lightbox] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center fade-in select-none"
          onTouchStart={e => {
            lbTouchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={e => {
            if (lbTouchX.current === null) return;
            const endX = e.changedTouches[0]?.clientX;
            if (endX == null) { lbTouchX.current = null; return; }
            const dx = endX - lbTouchX.current;
            lbTouchX.current = null;
            if      (dx >  50) setLightbox(p => Math.max(0, p - 1));
            else if (dx < -50) setLightbox(p => Math.min(post.images.length - 1, p + 1));
          }}>

          {/* 이미지 (pointer-events-none으로 터치 이벤트 투과) */}
          <img
            src={post.images[lightbox]}
            alt=""
            className="max-w-full object-contain pointer-events-none"
            style={{maxWidth:'100vw', maxHeight:'88vh'}}
          />

          {/* 카운터 */}
          <div className="absolute top-5 left-0 right-0 flex justify-center pointer-events-none">
            <span className="bg-black/60 text-white text-sm font-bold px-4 py-1.5 rounded-full">
              {lightbox + 1} / {post.images.length}
            </span>
          </div>

          {/* 닫기 */}
          <button
            onTouchEnd={e => { e.stopPropagation(); setLightbox(null); }}
            onClick={e => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-4 right-4 w-12 h-12 bg-white/25 rounded-full flex items-center justify-center text-white text-2xl font-black tap z-10">
            ✕
          </button>

          {/* 이전 버튼 */}
          {lightbox > 0 && (
            <button
              onTouchEnd={e => { e.stopPropagation(); setLightbox(p => Math.max(0, p - 1)); }}
              onClick={e => { e.stopPropagation(); setLightbox(p => Math.max(0, p - 1)); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white text-4xl font-black tap z-10">
              ‹
            </button>
          )}

          {/* 다음 버튼 */}
          {lightbox < post.images.length - 1 && (
            <button
              onTouchEnd={e => { e.stopPropagation(); setLightbox(p => Math.min(post.images.length - 1, p + 1)); }}
              onClick={e => { e.stopPropagation(); setLightbox(p => Math.min(post.images.length - 1, p + 1)); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white text-4xl font-black tap z-10">
              ›
            </button>
          )}

          {/* 하단 점 인디케이터 */}
          {post.images.length > 1 && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
              {post.images.map((_, i) => (
                <button key={i}
                  onTouchEnd={e => { e.stopPropagation(); setLightbox(i); }}
                  onClick={e => { e.stopPropagation(); setLightbox(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all tap ${i===lightbox?'bg-white scale-125':'bg-white/40'}`} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 공유하기 모달 */}
      {shareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="w-full bg-white rounded-t-2xl animate-slideUp">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-lg font-black text-gray-800">{lang==='vi'?'Chia sẻ':'공유하기'}</p>
                <button onClick={() => setShareModal(false)} className="text-2xl text-gray-400">✕</button>
              </div>
              <p className="text-xs text-gray-500 mt-1">{lang==='vi'?'Chia sẻ trang này':'이 페이지를 공유하세요'}</p>
            </div>

            <div className="p-4">
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-500 mb-2">{lang==='vi'?'URL':'주소'}</p>
                <p className="text-sm font-semibold text-gray-700 break-all">{window.location.href}</p>
              </div>

              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}${window.location.pathname}#/postDetail/${boardKey}/${postId}`;
                  navigator.clipboard.writeText(shareUrl);
                  setShareMsg(true);
                  setTimeout(() => setShareMsg(false), 2000);
                }}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg tap transition hover:bg-blue-700 mb-2">
                {lang==='vi'?'Sao chép URL':'URL 복사'}
              </button>

              {shareMsg && (
                <p className="text-center text-sm text-blue-600 font-semibold">{lang==='vi'?'URL đã sao chép!':'주소가 복사되었습니다!'}</p>
              )}

              <button
                onClick={() => setShareModal(false)}
                className="w-full text-gray-600 font-bold py-3 rounded-lg tap transition hover:bg-gray-100">
                {lang==='vi'?'Đóng':'닫기'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 신고 모달 */}
      {reportModal && (
        <ReportModal
          targetType="post"
          targetId={post.id}
          postId={post.id}
          deviceId={deviceId}
          lang={lang}
          onClose={() => setReportModal(false)}
        />
      )}
    </div>
  );
}
