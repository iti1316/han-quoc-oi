/* ── 게시판별 인기글 피드 ── */
const BOARD_HOT_CFG = [
  { key:'d9',     cats:['hall','sos','talk'], emoji:'📘', bg:'bg-blue-600',   ko:'비자 정보',     vi:'Visa' },
  { key:'travel', cats:['travel'],              emoji:'📸', bg:'bg-pink-500',   ko:'여행·맛집',    vi:'Du lịch' },
  { key:'bamboo', cats:['bamboo'],              emoji:'🤫', bg:'bg-orange-500', ko:'대나무숲',     vi:'Rừng Tre' },
  { key:'market', cats:['market'],              emoji:'🥕', bg:'bg-orange-400', ko:'당근마켓',     vi:'Chợ' },
  { key:'house',  cats:['house'],               emoji:'🏠', bg:'bg-teal-600',   ko:'집구하기',     vi:'Tìm nhà' },
  { key:'horror', cats:['horror'],              emoji:'👻', bg:'bg-gray-800',   ko:'무서운이야기',  vi:'Chuyện Ma' },
  { key:'info',   cats:['info'],                emoji:'📚', bg:'bg-purple-600', ko:'한국생활정보',  vi:'Thông tin sinh hoạt' },
  { key:'jobs',   cats:['jobs'],                emoji:'💼', bg:'bg-indigo-600', ko:'지역일자리',    vi:'Việc làm' },
];

function HotFeed({ posts, nav, lang }) {
  const BOARD_LOOKUP = {};
  BOARD_HOT_CFG.forEach(b => b.cats.forEach(c => { BOARD_LOOKUP[c] = b; }));

  function ageDays(p) {
    try { return Math.max(0, (Date.now() - new Date((p.date||'').replace(/\./g,'-')).getTime()) / 86400000); }
    catch { return 999; }
  }

  /* 실시간 랭킹: 참여도 × 시간 가중치 */
  const hotItems = [...posts]
    .filter(p => p.isPublic !== false && p.title && p.id && p.cat)
    .map(p => {
      const d   = ageDays(p);
      const eng = (p.likes||0)+(p.hearts||0)+(p.wows||0) + (p.commentsData?.length||p.comments||0)*2;
      const mult = d <= 1 ? 3.0 : d <= 7 ? 1.8 : d <= 30 ? 1.2 : 1.0;
      return { ...p, _sc: eng * mult, _age: d };
    })
    .sort((a,b) => b._sc - a._sc)
    .slice(0, 10)
    .map(p => {
      const boardInfo = BOARD_LOOKUP[p.cat] || BOARD_HOT_CFG[2];
      return { post: p, ...boardInfo };
    });

  return (
    <section className="mt-3 px-3">
      <div className="bg-white rounded-t-2xl px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-black text-gray-800">
          🔥 {lang==='vi' ? 'Bài viết hot' : '실시간 인기글'}
        </p>
      </div>

      <div className="bg-white rounded-b-2xl overflow-hidden shadow-sm">
        {hotItems.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            {lang==='vi' ? 'Chưa có bài viết nào.' : '아직 게시글이 없어요.'}
          </div>
        ) : hotItems.map((item, i) => {
          const p     = item.post;
          const total = (p.likes||0)+(p.hearts||0)+(p.wows||0);
          const cmts  = p.commentsData?.length || p.comments || 0;
          const isNew24 = p._age <= 1;
          return (
            <div key={p.id}
              onClick={() => nav({ page:'postDetail', boardKey:item.key, postId:p.id })}
              className="flex items-start gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 tap">
              {/* 썸네일 */}
              <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
                {p.images?.length > 0
                  ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  : <div className={`w-full h-full ${item.bg} flex items-center justify-center text-2xl`}>{item.emoji}</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className={`text-[9px] font-black text-white ${item.bg} px-2 py-0.5 rounded-full`}>
                    {lang==='vi' ? item.vi : item.ko}
                  </span>
                  {isNew24 && <span className="text-[8px] font-black text-orange-500 bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded-full">🔥24h</span>}
                </div>
                <p className="text-[12px] font-black text-gray-800 word-keep leading-snug line-clamp-2">{p.title}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-gray-400 truncate max-w-[80px]">{safeAuthor(p).replace(/ #\d+$/,'')}</span>
                  <span className="text-[10px] text-red-400 font-bold">❤️ {total}</span>
                  <span className="text-[10px] text-blue-400 font-bold">💬 {cmts}</span>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black text-white
                ${i===0?'bg-amber-400':i===1?'bg-gray-400':i===2?'bg-orange-400':'bg-gray-300'}`}>
                {i+1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── 최신글 피드 ── */
function LatestFeed({ posts, nav, lang }) {
  const latestPosts = [...posts]
    .filter(p => p.isPublic !== false && p.title && p.id)
    .sort((a, b) => {
      const aDate = (a.date||'').replace(/\./g, '-');
      const bDate = (b.date||'').replace(/\./g, '-');
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    })
    .slice(0, 5);

  return (
    <section className="mt-3 px-3 pb-4">
      <div className="bg-white rounded-t-2xl px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-black text-gray-800">
          🆕 {lang==='vi' ? 'Bài viết mới nhất' : '최신글'}
        </p>
      </div>
      <div className="bg-white rounded-b-2xl overflow-hidden shadow-sm">
        {latestPosts.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm">
            {lang==='vi' ? 'Chưa có bài viết nào.' : '아직 게시글이 없어요.'}
          </div>
        ) : latestPosts.map(p => {
          const brd   = CAT_BOARD_MAP[p.cat] || CAT_BOARD_MAP.bamboo;
          const total = (p.likes||0)+(p.hearts||0)+(p.wows||0);
          const cmts  = p.commentsData?.length || p.comments || 0;
          return (
            <div key={p.id}
              onClick={() => nav({ page:'postDetail', boardKey:brd.key, postId:p.id })}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 tap">
              {/* 썸네일: 이미지 있으면 사진, 없으면 게시판 배지 */}
              <div className="w-11 h-11 rounded-lg flex-shrink-0 overflow-hidden shadow-sm">
                {p.images?.length > 0
                  ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  : <div className={`w-full h-full ${brd.bg} flex items-center justify-center text-lg`}>{brd.emoji}</div>
                }
              </div>
              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[8px] font-black text-white ${brd.bg} px-1.5 py-0.5 rounded-full`}>
                    {lang==='vi' ? brd.vi : brd.ko}
                  </span>
                  {p.isNew && <span className="text-[7px] font-black text-white bg-red-500 px-1 py-0.5 rounded-full">N</span>}
                </div>
                <p className="text-[11px] font-bold text-gray-800 word-keep truncate">{p.title}</p>
              </div>
              {/* 날짜 + 반응수 */}
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0 ml-2">
                <span className="text-[9px] text-gray-400">{(p.date||'').slice(5)}</span>
                <div className="flex items-center gap-1.5">
                  {total > 0 && <span className="text-[9px] text-red-400 font-bold">❤️{total}</span>}
                  {cmts  > 0 && <span className="text-[9px] text-blue-400 font-bold">💬{cmts}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── 전체 검색 결과 ── */
const SEARCH_BOARD_INFO = {
  hall:   { key:'d9',     emoji:'📘', ko:'비자 정보',   vi:'Visa',        bg:'bg-blue-600' },
  sos:    { key:'d9',     emoji:'📘', ko:'비자 정보',   vi:'Visa',        bg:'bg-blue-600' },
  bamboo: { key:'bamboo', emoji:'🤫', ko:'대나무숲',    vi:'Rừng Tre',    bg:'bg-orange-500' },
  talk:   { key:'bamboo', emoji:'🤫', ko:'대나무숲',    vi:'Rừng Tre',    bg:'bg-orange-500' },
  travel: { key:'travel', emoji:'📸', ko:'여행·맛집',   vi:'Du lịch',     bg:'bg-pink-500' },
  market: { key:'market', emoji:'🥕', ko:'당근마켓',    vi:'Chợ',         bg:'bg-orange-400' },
  house:  { key:'house',  emoji:'🏠', ko:'집구하기',    vi:'Tìm nhà',     bg:'bg-teal-600' },
  horror: { key:'horror', emoji:'👻', ko:'무서운이야기', vi:'Chuyện Ma',   bg:'bg-gray-800' },
  info:   { key:'info', emoji:'📚', ko:'한국생활정보', vi:'Thông tin sinh hoạt', bg:'bg-purple-600' },
  jobs:   { key:'jobs', emoji:'💼', ko:'지역일자리',   vi:'Việc làm',           bg:'bg-indigo-600' },
};

function SearchResults({ posts, query, nav, lang }) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  const results = posts
    .filter(p => p.isPublic !== false)
    .map(p => {
      const inTitle = p.title.toLowerCase().includes(q);
      const inBody  = p.body.toLowerCase().includes(q);
      if (!inTitle && !inBody) return null;
      return { ...p, _sc: inTitle ? 2 : 1 };
    })
    .filter(Boolean)
    .sort((a,b) => b._sc - a._sc);

  return (
    <div className="px-3 pt-3 pb-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* 결과 헤더 */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-black text-gray-800">
            🔍 {lang==='vi' ? `${results.length} kết quả` : `검색결과 ${results.length}개`}
          </p>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">"{query}"</span>
        </div>

        {results.length === 0 ? (
          <div className="py-14 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm text-gray-400 word-keep">
              {lang==='vi' ? `"${query}"에 대한 결과가 없어요.` : `"${query}"에 대한 결과가 없어요.`}
            </p>
            <p className="text-xs text-gray-300 mt-1">다른 키워드로 검색해보세요</p>
          </div>
        ) : results.map(p => {
          const b     = SEARCH_BOARD_INFO[p.cat] || SEARCH_BOARD_INFO.bamboo;
          const total = (p.likes||0)+(p.hearts||0)+(p.wows||0);
          const cmts  = p.commentsData?.length || p.comments || 0;
          return (
            <div key={p.id}
              onClick={() => nav({ page:'postDetail', boardKey:b.key, postId:p.id })}
              className="flex items-start gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 tap">
              {/* 썸네일 or 게시판 배지 */}
              <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
                {p.images?.length > 0
                  ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  : <div className={`w-full h-full ${b.bg} flex items-center justify-center text-xl`}>{b.emoji}</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                {/* 게시판 + 지역 */}
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className={`text-[9px] font-black text-white ${b.bg} px-2 py-0.5 rounded-full`}>
                    {lang==='vi' ? b.vi : b.ko}
                  </span>
                  {p.location?.sido && (
                    <span className="text-[9px] text-blue-500 font-bold">📍{fmtLocation(p.location)}</span>
                  )}
                </div>
                {/* 제목 */}
                <p className="text-[12px] font-black text-gray-800 word-keep leading-snug line-clamp-2">{p.title}</p>
                {/* 본문 미리보기 */}
                <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1 word-keep">{p.body}</p>
                {/* 메타 */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] text-gray-400">{safeAuthor(p).replace(/ #\d+$/,'')}</span>
                  <span className="text-[10px] text-gray-300">{p.date}</span>
                  {total > 0 && <span className="text-[10px] text-red-400 font-bold">❤️{total}</span>}
                  {cmts  > 0 && <span className="text-[10px] text-blue-400 font-bold">💬{cmts}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
