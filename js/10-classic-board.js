/* ── 클래식 테이블 게시판 ── */
function ClassicBoardPage({ boardKey, nav, posts, lang, onAddComment, onDeleteComment, onUpdateComment, onDeletePost, deviceId }) {
  const cfg = CLASSIC_BOARD_CFG[boardKey];
  if (!cfg) { nav({page:'home'}); return null; }

  // 해당 게시판의 공지사항 로드
  const boardNotices = loadBoardNotices(boardKey);

  const [search,       setSearch]       = useState('');
  const [page,         setPage]         = useState(1);
  const [filterSido,   setFilterSido]   = useState('');
  const [filterSigungu,setFilterSigungu]= useState('');
  const PER_PAGE = 10;
  const hasLocFilter = ['market','house','travel','info','jobs'].includes(boardKey);

  const boardPosts = posts.filter(p => {
    if (!cfg.cats.includes(p.cat) || p.isPublic === false) return false;
    if (hasLocFilter && filterSido    && p.location?.sido    !== filterSido)    return false;
    if (hasLocFilter && filterSigungu && p.location?.sigungu !== filterSigungu) return false;
    return true;
  });
  const filtered = search.trim()
    ? boardPosts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.body.toLowerCase().includes(search.toLowerCase()))
    : boardPosts;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pagePosts  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  function fakeViews(p) {
    const s = typeof p.id === 'number' ? p.id : parseInt(p.id)||1;
    return ((s * 23 + 7) % 180) + 15;
  }
  function fmtDate(d) {
    return (d||'').replace(/^20(\d\d)\.(\d\d)\.(\d\d)$/, '$1-$2-$3');
  }

  const title = lang==='vi' ? cfg.vi  : cfg.ko;
  const desc  = lang==='vi' ? cfg.desc_vi : cfg.desc_ko;

  /* 페이지 번호 배열 계산 */
  const pageNums = (() => {
    const start = Math.max(1, Math.min(page-2, totalPages-4));
    return Array.from({length: Math.min(5, totalPages)}, (_, i) => start + i).filter(p => p <= totalPages);
  })();

  return (
    <div style={{background:'#F5F6F8', minHeight:'100vh'}}>
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={()=>nav({page:'home'})}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xl leading-none tap">‹</button>
            <p className="text-sm font-black text-gray-800">{title}</p>
          </div>
          {/* ❌ 주소 복사 버튼 제거됨 (게시글에서만 사용) */}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-3 pt-3 pb-24">
        {/* 설명 */}
        <div className="bg-white border border-gray-200 px-4 py-2.5 mb-2 rounded">
          <p className="text-xs text-blue-600 word-keep">{desc}</p>
        </div>

        {/* ── 지역 필터 (market·house·travel만) ── */}
        {hasLocFilter && (
          <div className="bg-white border border-gray-200 rounded mb-2 px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">📍</span>
              <p className="text-[11px] font-black text-gray-700">
                {lang==='vi' ? 'Lọc theo khu vực' : '지역 필터'}
              </p>
              {(filterSido || filterSigungu) && (
                <button
                  onClick={()=>{ setFilterSido(''); setFilterSigungu(''); setPage(1); }}
                  className="ml-auto text-[10px] font-black text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full tap">
                  ✕ {lang==='vi'?'Xóa bộ lọc':'필터 초기화'}
                </button>
              )}
            </div>
            <div className="flex gap-2">
              {/* 시/도 */}
              <select
                value={filterSido}
                onChange={e=>{ setFilterSido(e.target.value); setFilterSigungu(''); setPage(1); }}
                className={`flex-1 border-2 rounded-xl px-2.5 py-2 text-xs focus:outline-none transition
                  ${filterSido ? 'border-blue-400 bg-blue-50 text-blue-800 font-bold' : 'border-gray-200 text-gray-500'}`}>
                <option value="">{lang==='vi'?'전체 시/도':'전체 시/도'}</option>
                {Object.keys(KOREA_REGIONS).map(r=>(
                  <option key={r} value={r}>{SIDO_SHORT[r]||r}</option>
                ))}
              </select>
              {/* 구/군 */}
              <select
                value={filterSigungu}
                onChange={e=>{ setFilterSigungu(e.target.value); setPage(1); }}
                disabled={!filterSido}
                className={`flex-1 border-2 rounded-xl px-2.5 py-2 text-xs focus:outline-none transition
                  ${!filterSido ? 'border-gray-100 bg-gray-50 text-gray-300' : filterSigungu ? 'border-blue-400 bg-blue-50 text-blue-800 font-bold' : 'border-gray-200 text-gray-500'}`}>
                <option value="">{lang==='vi'?'전체 구/군':'전체 구/군'}</option>
                {filterSido && KOREA_REGIONS[filterSido]?.map(g=>(
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            {/* 현재 필터 표시 */}
            {(filterSido || filterSigungu) && (
              <p className="text-[11px] font-black text-blue-600 mt-2">
                📍 {SIDO_SHORT[filterSido]||filterSido}{filterSigungu ? ` ${filterSigungu}` : ''} 글만 보는 중
                <span className="text-gray-400 font-normal ml-1">({filtered.length}개)</span>
              </p>
            )}
          </div>
        )}

        {/* 테이블 */}
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          {/* 헤더 행 */}
          <div className="hidden sm:grid bg-gray-50 border-b-2 border-gray-300 text-[11px] font-black text-gray-500 px-3 py-2.5"
            style={{gridTemplateColumns:'3.5rem 1fr 5rem 4.5rem 3.5rem 3rem'}}>
            <span className="text-center">{lang==='vi'?'STT':'번호'}</span>
            <span className="pl-2">{lang==='vi'?'Tiêu đề':'제목'}</span>
            <span className="text-center">{lang==='vi'?'Tác giả':'작성자'}</span>
            <span className="text-center">{lang==='vi'?'Ngày':'날짜'}</span>
            <span className="text-center">{lang==='vi'?'Xem':'조회'}</span>
            <span className="text-center">{lang==='vi'?'Thích':'추천'}</span>
          </div>
          {/* 모바일 헤더 */}
          <div className="sm:hidden grid bg-gray-50 border-b-2 border-gray-300 text-[11px] font-black text-gray-500 px-3 py-2"
            style={{gridTemplateColumns:'3rem 1fr 4rem 3.5rem'}}>
            <span className="text-center">{lang==='vi'?'STT':'번호'}</span>
            <span className="pl-1">{lang==='vi'?'Tiêu đề':'제목'}</span>
            <span className="text-center">{lang==='vi'?'Tác giả':'작성자'}</span>
            <span className="text-center">{lang==='vi'?'Xem':'조회'}</span>
          </div>

          {/* 공지 */}
          {boardNotices.map(n => (
            <React.Fragment key={n.id}>
              {/* 데스크탑 공지 */}
              <div className="hidden sm:grid border-b border-gray-100 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition"
                style={{gridTemplateColumns:'3.5rem 1fr 5rem 4.5rem 3.5rem 3rem'}}>
                <span className="text-[10px] font-black text-gray-500 text-center self-center">공지</span>
                <p className="text-[12px] font-black text-gray-800 self-center pl-2 word-keep truncate">
                  {lang==='vi' ? n.title_vi : n.title}
                </p>
                <span className="text-[10px] font-bold text-gray-600 text-center self-center">관리자</span>
                <span className="text-[10px] text-gray-400 text-center self-center">{n.date}</span>
                <span className="text-[10px] text-gray-500 text-center self-center">{n.views.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-gray-500 text-center self-center">{n.likes}</span>
              </div>
              {/* 모바일 공지 */}
              <div className="sm:hidden grid border-b border-gray-100 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition"
                style={{gridTemplateColumns:'3rem 1fr 4rem 3.5rem'}}>
                <span className="text-[9px] font-black text-gray-500 text-center self-center">공지</span>
                <p className="text-[11px] font-black text-gray-800 self-center pl-1 word-keep truncate">
                  {lang==='vi' ? n.title_vi : n.title}
                </p>
                <span className="text-[10px] text-gray-500 text-center self-center">관리자</span>
                <span className="text-[10px] text-gray-500 text-center self-center">{n.views.toLocaleString()}</span>
              </div>
            </React.Fragment>
          ))}

          {/* 일반 게시글 */}
          {pagePosts.length === 0 ? (
            <div className="py-14 text-center text-sm text-gray-400">
              {lang==='vi' ? 'Chưa có bài viết.' : '게시글이 없습니다.'}
            </div>
          ) : pagePosts.map((p, i) => {
            const num   = filtered.length - ((page-1)*PER_PAGE) - i;
            const cmts  = p.commentsData?.length || p.comments || 0;
            const views = fakeViews(p);
            const total = (p.likes||0)+(p.hearts||0)+(p.wows||0);
            const isHot = total >= 10 || cmts >= 10;
            return (
              <React.Fragment key={p.id}>
                {/* 데스크탑 행 */}
                <div
                  onClick={()=>nav({page:'postDetail', boardKey, postId:p.id})}
                  className={`hidden sm:grid border-b border-gray-100 last:border-0 px-3 py-2.5 cursor-pointer transition
                    ${isHot ? 'hover:bg-blue-50 bg-blue-50/20' : 'hover:bg-gray-50 bg-white'}`}
                  style={{gridTemplateColumns:'3.5rem 1fr 5rem 4.5rem 3.5rem 3rem'}}>
                  <span className="text-[11px] text-gray-400 text-center self-center">{num}</span>
                  <div className="pl-2 min-w-0 self-center">
                    <div className="flex items-center gap-1.5">
                      {p.location?.sido && (
                        <span className="text-[8px] font-black text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap">
                          📍{fmtLocation(p.location)}
                        </span>
                      )}
                      <p className={`text-[12px] truncate word-keep flex-1 ${isHot?'font-bold text-blue-700':'text-gray-700'}`}>{p.title}</p>
                      {p.images?.length > 0 && <span className="text-[10px] flex-shrink-0" title="사진 있음">📷</span>}
                      {cmts > 0 && <span className="text-[10px] text-blue-400 font-bold flex-shrink-0">💬 {cmts}</span>}
                      {p.isNew && <span className="text-[8px] font-black text-white bg-red-500 px-1.5 py-0.5 rounded-full flex-shrink-0">N</span>}
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 text-center self-center truncate px-1">{safeAuthor(p).replace(/ #\d+$/,'')}<AdminBadge post={p} /></span>
                  <span className="text-[10px] text-gray-400 text-center self-center">{fmtDate(p.date)}</span>
                  <span className="text-[10px] text-gray-500 text-center self-center">{views}</span>
                  <span className={`text-[10px] text-center self-center font-bold ${total>0?'text-blue-600':'text-gray-300'}`}>{total||0}</span>
                </div>
                {/* 모바일 행 */}
                <div
                  onClick={()=>nav({page:'postDetail', boardKey, postId:p.id})}
                  className={`sm:hidden grid border-b border-gray-100 last:border-0 px-3 py-2.5 cursor-pointer transition
                    ${isHot ? 'hover:bg-blue-50 bg-blue-50/20' : 'hover:bg-gray-50 bg-white'}`}
                  style={{gridTemplateColumns:'3rem 1fr 4rem 3.5rem'}}>
                  <span className="text-[10px] text-gray-400 text-center self-center">{num}</span>
                  <div className="pl-1 min-w-0 self-center">
                    <div className="flex items-center gap-1">
                      <p className={`text-[11px] truncate word-keep flex-1 ${isHot?'font-bold text-blue-700':'text-gray-700'}`}>{p.title}</p>
                      {cmts > 0 && <span className="text-[9px] text-blue-400 font-bold flex-shrink-0">💬{cmts}</span>}
                      {p.isNew && <span className="text-[7px] font-black text-white bg-red-500 px-1 py-0.5 rounded-full flex-shrink-0">N</span>}
                    </div>
                    <span className="text-[9px] text-gray-400">{fmtDate(p.date)}</span>
                  </div>
                  <span className="text-[9px] text-gray-500 text-center self-center truncate px-0.5">{safeAuthor(p).replace(/ #\d+$/,'')}<AdminBadge post={p} /></span>
                  <span className="text-[9px] text-gray-500 text-center self-center">{views}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* 하단: 검색 + 페이지네이션 + 글쓰기 */}
        <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
          {/* 검색 */}
          <div className="flex items-center border border-gray-300 rounded bg-white px-2.5 py-2 gap-1.5">
            <input
              type="search"
              value={search}
              onChange={e=>{ setSearch(e.target.value); setPage(1); }}
              placeholder={lang==='vi'?'Tìm kiếm':'검색'}
              className="text-xs outline-none w-24 text-gray-700 placeholder-gray-300 bg-transparent"
            />
            <span className="text-gray-400 text-sm">🔍</span>
          </div>

          {/* 페이지네이션 */}
          <div className="flex items-center gap-1">
            {page > 1 && (
              <button onClick={()=>setPage(p=>p-1)}
                className="text-[11px] text-gray-600 bg-white border border-gray-300 px-2.5 h-7 rounded tap hover:bg-gray-50">
                {lang==='vi'?'Trước':'이전'}
              </button>
            )}
            {pageNums.map(p=>(
              <button key={p} onClick={()=>setPage(p)}
                className={`w-7 h-7 rounded text-[11px] font-bold tap transition
                  ${page===p ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button onClick={()=>setPage(p=>Math.min(p+1,totalPages))}
                className="text-[11px] text-gray-600 bg-white border border-gray-300 px-2.5 h-7 rounded tap hover:bg-gray-50">
                {lang==='vi'?'Sau':'다음'}
              </button>
            )}
          </div>

          {/* 글쓰기 */}
          <button onClick={()=>nav({page:'write', param:cfg.writeParam})}
            className="bg-blue-600 text-white text-xs font-black px-4 py-2 rounded tap hover:bg-blue-700 transition shadow-sm">
            {lang==='vi'?'Viết bài':'글쓰기'}
          </button>
        </div>
      </div>
    </div>
  );
}
