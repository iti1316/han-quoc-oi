/* ================================================================
   댓글 섹션 — PostCard / TalkListView 공용
================================================================ */
function CommentSection({ post, lang, onAddComment, onDeleteComment, onUpdateComment, deviceId }) {
  const L = LANG[lang];
  const SHOW_INITIAL = 10;

  const [comments, setComments] = useState(post.commentsData || []);
  const [body, setBody]       = useState('');
  const [delModal, setDelModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [editBody, setEditBody] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [reportModal, setReportModal] = useState(null);

  // post.commentsData 변경 시 동기화
  useEffect(() => {
    setComments(post.commentsData || []);
  }, [post.id, post.commentsData?.length]);

  function submit() {
    const wait = checkRateLimit('comment');
    if (wait > 0) {
      alert(L.rateLimitComment.replace('{n}', wait));
      return;
    }

    if (!body.trim()) return;
    const newComment = {
      id:     Date.now(),
      author: genAuthor(),
      date:   new Date().toLocaleDateString('ko-KR'),
      body:   body.trim(),
      deviceId: deviceId,
      isAdmin: !!(window.auth && window.auth.currentUser),
    };
    setComments([...comments, newComment]);
    setBody('');
    onAddComment(post.id, newComment);
    markRateLimit('comment');
  }

  function handleDelete(c) {
    if (c.deviceId !== deviceId) { alert(lang==='vi'?'Chỉ có thể xóa bình luận của chính bạn':'자신의 댓글만 삭제할 수 있습니다'); return; }
    const newComments = comments.filter(cmt => cmt.id !== c.id);
    setComments(newComments);
    onDeleteComment(post.id, c.id);
  }

  function handleEditStart(c) {
    if (c.deviceId !== deviceId) { alert(lang==='vi'?'Chỉ có thể sửa bình luận của chính bạn':'자신의 댓글만 수정할 수 있습니다'); return; }
    setEditModal(c);
    setEditBody(c.body);
  }

  function handleEditSave() {
    if (!editModal || !editBody.trim()) return;
    const newComments = comments.map(c =>
      c.id === editModal.id ? { ...c, body: editBody.trim() } : c
    );
    setComments(newComments);
    onUpdateComment(post.id, editModal.id, { body: editBody.trim() });
    setEditModal(null);
    setEditBody('');
  }

  const displayComments = showAllComments ? comments : comments.slice(0, SHOW_INITIAL);
  const hiddenCount = Math.max(0, comments.length - SHOW_INITIAL);

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      {/* 댓글 목록 */}
      {comments.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-4">{L.cmtEmpty}</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-100">
            {displayComments.map(c => (
              <li key={c.id} className="flex items-start gap-2.5 px-4 py-3">
                <div className={`w-7 h-7 rounded-full ${post.cat === 'bamboo' ? 'bg-green-600' : safeAvatarColor(c)} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                  {post.cat === 'bamboo' ? '🎋' : safeAvatarChar(c)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[11px] font-bold text-gray-700">{post.cat === 'bamboo' ? getBambooLabel(post, c.deviceId || c.author, lang) : (c.isAdmin ? 'Hàn Quốc Ơi' : c.author)}{post.cat !== 'bamboo' && c.isAdmin && <AdminBadge post={{isAdmin:true, cat:post.cat}} />}</p>
                    <p className="text-[10px] text-gray-400">{c.date}</p>
                    <div className="ml-auto flex gap-1 items-center">
                      {c.deviceId !== deviceId && (
                        <button
                          onClick={() => setReportModal(c.id)}
                          disabled={hasReported(c.id)}
                          className={`text-[9px] font-bold tap transition ${
                            hasReported(c.id)
                              ? 'text-gray-200 cursor-not-allowed'
                              : 'text-gray-300 hover:text-red-400'
                          }`}>
                          🚩
                        </button>
                      )}
                      {c.deviceId === deviceId && (
                        <>
                          <button onClick={() => handleEditStart(c)}
                            className="text-[10px] text-blue-400 hover:text-blue-600 border border-blue-100 hover:border-blue-300 px-1.5 py-0.5 rounded tap transition">
                            {lang==='vi'?'Sửa':'수정'}
                          </button>
                          <button onClick={() => handleDelete(c)}
                            className="text-[10px] text-red-400 hover:text-red-600 border border-red-100 hover:border-red-300 px-1.5 py-0.5 rounded tap transition">
                            {L.cmtDelete}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 word-keep leading-relaxed">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* 더보기 버튼 */}
          {hiddenCount > 0 && !showAllComments && (
            <button onClick={() => setShowAllComments(true)}
              className="w-full py-2.5 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 border-t border-gray-100 tap transition">
              💬 {lang==='vi'?`Xem thêm ${hiddenCount} bình luận`:`댓글 ${hiddenCount}개 더보기`}
            </button>
          )}
        </>
      )}

      {/* 댓글 작성 폼 */}
      <div className="px-4 pb-4 pt-2">
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder={L.cmtPlaceholder}
          rows={2}
          className="w-full text-xs text-gray-700 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 placeholder-gray-300 resize-none leading-relaxed"
        />
        <button
          onClick={submit}
          disabled={!body.trim()}
          className="w-full mt-2 px-4 py-2.5 bg-blue-700 text-white text-xs font-black rounded-xl disabled:opacity-40 tap transition">
          {L.cmtSubmit}
        </button>
        <p className="text-[10px] text-gray-300 mt-1.5">{lang==='vi'?'💡 Bình luận của bạn sẽ được xác định bằng thiết bị này':'💡 댓글은 이 기기에서만 수정/삭제 가능합니다'}</p>
      </div>

      {/* 댓글 수정 텍스트 모달 */}
      {editModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center fade-in" onClick={() => setEditModal(null)}>
          <div className="bg-white rounded-t-3xl w-full max-w-lg px-6 pt-6 pb-10 shadow-2xl" onClick={e=>e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>
            <p className="text-sm font-black text-gray-800 mb-3">{lang==='vi'?'Sửa bình luận':'댓글 수정'}</p>
            <textarea
              value={editBody}
              onChange={e => setEditBody(e.target.value)}
              placeholder={L.cmtPlaceholder}
              rows={3}
              className="w-full text-xs text-gray-700 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 placeholder-gray-300 resize-none leading-relaxed mb-3"
            />
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setEditModal(null)}
                className="py-3.5 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 bg-white tap transition">
                {lang==='vi'?'Hủy':'취소'}
              </button>
              <button onClick={handleEditSave}
                disabled={!editBody.trim()}
                className="py-3.5 bg-blue-700 text-white rounded-2xl text-sm font-black tap transition disabled:opacity-40">
                {lang==='vi'?'Lưu':'저장'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 댓글 신고 모달 */}
      {reportModal && (
        <ReportModal
          targetType="comment"
          targetId={reportModal}
          postId={post.id}
          deviceId={deviceId}
          lang={lang}
          onClose={() => setReportModal(null)}
        />
      )}

    </div>
  );
}
