function VisaHubPage({ nav, lang, posts = [] }) {
  const savedState = window.__visaState;
  const [selectedRoute,    setSelectedRoute]    = useState(savedState?.visaRoute || null);
  const [selectedSubRoute, setSelectedSubRoute] = useState(savedState?.visaSubRoute || null);
  const [selectedStep,     setSelectedStep]     = useState(savedState?.visaStep || null);
  const [boardPage,        setBoardPage]        = useState(1);
  const BOARD_PER = 10;
  const route = VISA_ROUTES.find(r => r.key === selectedRoute);
  const subRoute = route?.subRoutes?.find(sr => sr.key === selectedSubRoute);
  const steps = subRoute?.steps || route?.steps || [];

  /* 비자 게시판 글 (hall · sos · talk · bamboo) */
  const boardPosts = posts.filter(p => ['hall','sos','talk'].includes(p.cat) && p.isPublic !== false);
  const totalBoardPages = Math.max(1, Math.ceil(boardPosts.length / BOARD_PER));
  const pageBoardPosts  = boardPosts.slice((boardPage-1)*BOARD_PER, boardPage*BOARD_PER);

  const CAT_BADGE = {
    hall:   { emoji:'🏆', ko:'합격',  vi:'Đậu',  bg:'bg-amber-100',  text:'text-amber-700' },
    sos:    { emoji:'🚨', ko:'SOS',   vi:'SOS',  bg:'bg-red-100',    text:'text-red-600' },
    talk:   { emoji:'💬', ko:'참교육', vi:'KN',   bg:'bg-orange-100', text:'text-orange-600' },
  };

  function fmtDate(d) { return (d||'').replace(/^20(\d\d)\.(\d\d)\.(\d\d)$/, '$1-$2-$3'); }

  function T(obj) { return obj ? (obj[lang==='vi'?'vi':'ko'] || obj.ko) : ''; }

  return (
    <div style={{background:'#F0F2F5', minHeight:'100vh'}}>
      {/* 헤더 */}
      <header className="bg-blue-700 sticky top-0 z-40 shadow-md">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={()=>nav({page:'home'})} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xl tap">‹</button>
          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-sm leading-tight">📘 {lang==='vi'?'Hướng dẫn đổi và gia hạn visa':'비자 변경 및 연장 방법'}</p>
            <p className="text-blue-200 text-[10px] leading-none mt-0.5">
              {lang==='vi'?'Tất cả visa người Việt cần biết tại Hàn Quốc':'재한 베트남인이 알아야 할 모든 비자'}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-3 pt-3 pb-24" data-section="visaChangeMethod">

        {/* ── Section A: 상황 선택 카드 ── */}
        {!selectedRoute && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-3" data-section="visaChangeMethod">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-4">
              <p className="text-white font-black text-base">🗺️ {lang==='vi'?'Tìm lộ trình visa của bạn':'당신의 K-비자 여정을 찾아보세요'}</p>
              <p className="text-blue-200 text-[10px] mt-1">{lang==='vi'?'Chọn tình trạng để xem từng bước':'당신의 상황에 맞는 경로를 선택하세요'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              {VISA_ROUTES.map(r => (
                <button key={r.key} onClick={()=>{
                  setSelectedRoute(r.key);
                  if(r.subRoutes) {
                    setSelectedSubRoute(r.subRoutes[0].key);
                    setSelectedStep(r.subRoutes[0].steps[0].key);
                  } else {
                    setSelectedStep(r.steps[0].key);
                  }
                }}
                  className="bg-white border-2 border-gray-200 rounded-xl px-3 py-3 tap transition hover:border-blue-400 hover:bg-blue-50 text-left">
                  <div className={`w-8 h-8 ${r.color} rounded-lg flex items-center justify-center text-lg mb-2`}>{r.emoji}</div>
                  <p className="text-[11px] font-black text-gray-800 word-keep leading-tight mb-1">{lang==='vi'?r.vi:r.ko}</p>
                  <p className="text-[9px] text-gray-500 word-keep leading-tight">{T(r.desc)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Section B: 나의 비자 여정 ── */}
        {selectedRoute && route && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-3">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-white font-black text-sm">📍 {lang==='vi'?'Lộ trình của bạn':'나의 비자 여정'}</p>
                  <p className="text-blue-200 text-[10px] mt-0.5">{T(subRoute?.desc || route.desc)}</p>
                </div>
                <button onClick={()=>{ setSelectedRoute(null); setSelectedSubRoute(null); setSelectedStep(null); }}
                  className="text-white text-2xl font-black tap">×</button>
              </div>
            </div>

            {/* 서브경로 선택 (유학생인 경우만) */}
            {route.subRoutes && (
              <>
                <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex gap-2">
                  {route.subRoutes.map(sr => (
                    <button key={sr.key} onClick={()=>{ setSelectedSubRoute(sr.key); setSelectedStep(sr.steps[0].key); }}
                      className={`flex-1 px-3 py-2 rounded-lg font-black text-[10px] tap transition border-2 text-center
                        ${selectedSubRoute===sr.key ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-blue-400 text-blue-900'}`}>
                      {sr.emoji} {lang==='vi'?sr.vi:sr.ko}
                    </button>
                  ))}
                </div>
                {subRoute && (
                  <div className="px-4 py-2 bg-blue-100 border-b border-blue-200">
                    <p className="text-[10px] text-blue-700 font-semibold word-keep">{T(subRoute.desc)}</p>
                  </div>
                )}
              </>
            )}

            <div className="px-4 py-3 overflow-x-auto flex items-center gap-2">
              {steps.map((step, i) => (
                <React.Fragment key={i}>
                  <button onClick={()=>setSelectedStep(step.key)}
                    className={`flex-shrink-0 px-3 py-2 rounded-lg font-black text-[11px] tap transition whitespace-nowrap
                      ${selectedStep===step.key ? `${route.color} text-white` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {step.code} {selectedStep===step.key && '▼'}
                  </button>
                  {i < steps.length-1 && <span className="text-gray-300 font-black flex-shrink-0">→</span>}
                </React.Fragment>
              ))}
              <span className="text-xl flex-shrink-0 ml-2">{selectedStep===steps[steps.length-1]?.key?'👑':'🏁'}</span>
            </div>
          </div>
        )}

        {/* ── Section C: 선택된 비자 상세 ── */}
        {selectedRoute && selectedStep && VISA_GUIDE_DATA[selectedStep] && (() => {
          const guide = VISA_GUIDE_DATA[selectedStep];
          const stepIndex = steps.findIndex(s => s.key === selectedStep);
          const currentStep = steps[stepIndex];
          return (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-3 fade-in">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <p className="text-[10px] text-gray-600 font-bold">{T(subRoute?.desc || route.desc)} • {stepIndex+1}/{steps.length}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-lg`}>{guide.icon}</span>
                  <p className="text-sm font-black text-gray-800">{T(guide.name)}</p>
                </div>
                {guide.summary && (
                  <p className="text-sm font-semibold text-gray-700 mt-2.5 word-keep leading-relaxed">{T(guide.summary)}</p>
                )}
              </div>

              <div className="px-4 py-4">
                {/* 체류기간 + 다음목표 */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-blue-50 rounded-xl px-3 py-2.5">
                    <p className="text-[9px] font-black text-blue-400 mb-0.5">⏰ {lang==='vi'?'Thời hạn':'체류기간'}</p>
                    <p className="text-[11px] font-bold text-blue-700 word-keep leading-tight whitespace-pre-wrap">{T(guide.maxStay)}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl px-3 py-2.5">
                    <p className="text-[9px] font-black text-green-500 mb-0.5">🎯 {lang==='vi'?'Tiếp theo':'다음 목표'}</p>
                    <p className="text-[11px] font-bold text-green-700 word-keep leading-tight">{T(guide.target)}</p>
                  </div>
                </div>

                {/* 신청 절차 */}
                <p className="text-[10px] font-black text-gray-500 mb-2.5">📌 {lang==='vi'?'Quy trình:':'절차:'}</p>
                <ol className="flex flex-col gap-2 mb-3">
                  {guide.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className={`w-5 h-5 ${guide.color} rounded-full text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5`}>{i+1}</span>
                      <p className="text-[11px] text-gray-700 word-keep leading-relaxed">{T(step)}</p>
                    </li>
                  ))}
                </ol>

                {/* 핵심 팁 */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                  <p className="text-[9px] font-black text-amber-600 mb-1">💡 {lang==='vi'?'Mẹo quan trọng':'핵심 팁'}</p>
                  <p className="text-[11px] text-amber-700 word-keep leading-relaxed whitespace-pre-wrap">{T(guide.tip)}</p>
                </div>

                {/* E-7-4 점수 계산기 버튼 */}
                {/* 다른 경로로 이동 (nextPaths) */}
                {guide.nextPaths && guide.nextPaths.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-[9px] font-black text-gray-500 mb-2">🔀 {lang==='vi'?'Chuyển sang đường khác':'다른 경로로 이동'}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {guide.nextPaths.map((np, i) => (
                        <button key={i}
                          onClick={() => {
                            if (np.code === 'D-8') {
                              setSelectedRoute('d8route');
                              setSelectedSubRoute(null);
                              setSelectedStep('d8');
                            } else if (np.code === 'D-9') {
                              setSelectedRoute('d9route');
                              setSelectedSubRoute(null);
                              setSelectedStep('d9');
                            }
                          }}
                          className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg px-3 py-2.5 tap transition hover:border-purple-400 text-left">
                          <div className="flex items-start gap-2">
                            <span className="text-lg flex-shrink-0">🌉</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-black text-gray-800">{np.code} • {lang==='vi'?np.vi:np.ko}</p>
                              <p className="text-[9px] text-gray-600 mt-0.5 word-keep">{lang==='vi'?np.desc_vi:np.desc_ko}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          );
        })()}

        {/* ── Section D: 유용한 도구 (경로 선택 후 표시) ── */}
        {selectedRoute && selectedStep && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-3">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-black text-gray-800">🔧 {lang==='vi'?'Công cụ hữu ích':'유용한 도구'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3">
            {[
              ...(selectedStep === 'e74' ? [{ e:'📊', ko:'E-7-4 점수 계산기',   vi:'Tính điểm E-7-4',      bg:'bg-amber-500',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'checklist', param:'score_e74', prevPage:'visaHub'}) } }] : []),
              ...(selectedStep === 'f27' ? [{ e:'📊', ko:'F-2-7 점수 계산기',   vi:'Tính điểm F-2-7',      bg:'bg-purple-500',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'checklist', param:'score_f27', prevPage:'visaHub'}) } }] : []),
              ...(selectedStep === 'f27_e71' ? [{ e:'👥', ko:'점수 방법',   vi:'Bảng tính điểm',      bg:'bg-blue-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'eligibility', param:'f27_e71', prevPage:'visaHub'}) } }, { e:'📋', ko:'심사 기준',   vi:'Điều kiện thẩm định',      bg:'bg-sky-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'assessment', param:'f27_e71', prevPage:'visaHub'}) } }] : []),
              ...(selectedStep === 'f6' ? [{ e:'👥', ko:'대상 적용',   vi:'Đối tượng áp dụng',      bg:'bg-blue-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'eligibility', param:'f6', prevPage:'visaHub'}) } }, { e:'📋', ko:'심사 기준',   vi:'Điều kiện thẩm định',      bg:'bg-sky-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'assessment', param:null, prevPage:'visaHub'}) } }] : []),
              ...(selectedStep === 'f5_marriage_naturalization' ? [{ e:'📋', ko:'심사 기준',   vi:'Điều kiện thẩm định',      bg:'bg-sky-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'assessment', param:null, prevPage:'visaHub'}) } }, { e:'👥', ko:'대상 적용',   vi:'Đối tượng áp dụng',      bg:'bg-blue-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'eligibility', param:'f5_marriage_naturalization', prevPage:'visaHub'}) } }] : []),
              ...(selectedStep === 'd8' ? [{ e:'👥', ko:'대상 적용',   vi:'Đối tượng áp dụng',      bg:'bg-blue-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'eligibility', param:'d8', prevPage:'visaHub'}) } }] : []),
              ...(selectedStep === 'd9' ? [{ e:'📋', ko:'심사 기준',   vi:'Điều kiện thẩm định',      bg:'bg-sky-600',   act:()=>{ nav({page:'assessment', param:'d9', prevPage:'visaHub'}) } }] : []),
              ...(selectedStep === 'f5_marriage' ? [{ e:'👥', ko:'대상 적용',   vi:'Đối tượng áp dụng',      bg:'bg-blue-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'eligibility', param:'f5_marriage', prevPage:'visaHub'}) } }, { e:'📋', ko:'심사 기준',   vi:'Điều kiện thẩm định',      bg:'bg-sky-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'assessment', param:'f5_marriage', prevPage:'visaHub'}) } }] : []),
              { e:'📋', ko:'필수 서류 준비',   vi:'Danh sách hồ sơ',       bg:'bg-green-600',   act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'docsChecklist', param:selectedStep, prevPage:'visaHub'}) } },
              { e:'🗂️', ko:'출입국·대사관·외교부 연락처',  vi:'Thông tin liên hệ XNC, Đại sứ quán, Bộ Ngoại giao',      bg:'bg-violet-600',  act:()=>{ window.__visaState = {visaRoute:selectedRoute, visaSubRoute:selectedSubRoute, visaStep:selectedStep}; nav({page:'office',    param:null, prevPage:'visaHub'}) } },
            ].map((t,i)=>(
              <button key={i} onClick={t.act}
                className={`${t.bg} rounded-xl px-3 py-3.5 flex items-center gap-2 tap transition`}>
                <span className="text-2xl">{t.e}</span>
                <p className="text-[11px] font-black text-white word-keep leading-tight text-left">{lang==='vi'?t.vi:t.ko}</p>
              </button>
            ))}
          </div>
        </div>
        )}

        {/* ── Section E: 비자 커뮤니티 게시판 ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" data-section="visaBoardSection">
          {/* 헤더 */}
          <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white text-xl">💬</div>
              <div className="text-left">
                <p className="text-sm font-black text-gray-800">{lang==='vi'?'Cộng đồng visa':'비자 커뮤니티 게시판'}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {lang==='vi'?'Hỏi đáp, chia sẻ kinh nghiệm':'합격 후기·SOS·참교육 — 실제 경험 공유'}
                  {boardPosts.length > 0 && <span className="ml-1 text-blue-500 font-bold">{boardPosts.length}개</span>}
                </p>
              </div>
            </div>
          </div>

          {/* 게시판 본문 */}
          <div>
              {/* 공지 + 게시글 테이블 */}
              <div>
                {/* 테이블 헤더 */}
                <div className="grid bg-gray-50 border-b border-gray-200 text-[10px] font-black text-gray-500 px-3 py-2"
                  style={{gridTemplateColumns:'2.5rem 1.2rem 1fr 4rem 3.5rem'}}>
                  <span className="text-center">{lang==='vi'?'STT':'번호'}</span>
                  <span></span>
                  <span className="pl-1">{lang==='vi'?'Tiêu đề':'제목'}</span>
                  <span className="text-center">{lang==='vi'?'Tác giả':'작성자'}</span>
                  <span className="text-center">{lang==='vi'?'Ngày':'날짜'}</span>
                </div>

                {/* 공지 2개 */}
                {loadBoardNotices('hall').map(n => (
                  <div key={n.id} className="grid border-b border-gray-50 px-3 py-2.5 bg-gray-50/60"
                    style={{gridTemplateColumns:'2.5rem 1.2rem 1fr 4rem 3.5rem'}}>
                    <span className="text-[9px] font-black text-gray-400 text-center self-center">공지</span>
                    <span></span>
                    <p className="text-[11px] font-black text-gray-700 self-center pl-1 truncate">{lang==='vi'?n.title_vi:n.title}</p>
                    <span className="text-[9px] text-gray-400 text-center self-center">관리자</span>
                    <span className="text-[9px] text-gray-400 text-center self-center">{n.date}</span>
                  </div>
                ))}

                {/* 게시글 목록 */}
                {pageBoardPosts.length === 0 ? (
                  <div className="py-10 text-center text-sm text-gray-400">
                    {lang==='vi'?'Chưa có bài viết.':'게시글이 없습니다.'}
                  </div>
                ) : pageBoardPosts.map((p, i) => {
                  const num  = boardPosts.length - ((boardPage-1)*BOARD_PER) - i;
                  const badge = CAT_BADGE[p.cat] || CAT_BADGE.bamboo;
                  const cmts  = p.commentsData?.length || p.comments || 0;
                  return (
                    <div key={p.id}
                      onClick={()=>nav({page:'postDetail', boardKey:'d9', postId:p.id})}
                      className="grid border-b border-gray-50 last:border-0 px-3 py-2.5 cursor-pointer hover:bg-blue-50/40 transition tap"
                      style={{gridTemplateColumns:'2.5rem 1.2rem 1fr 4rem 3.5rem'}}>
                      <span className="text-[10px] text-gray-400 text-center self-center">{num}</span>
                      <span className={`text-[9px] font-black ${badge.text} self-center`}>{badge.emoji}</span>
                      <div className="pl-1 min-w-0 self-center flex items-center gap-1">
                        <p className="text-[11px] text-gray-800 truncate flex-1">{p.title}</p>
                        {cmts > 0 && <span className="text-[9px] text-blue-400 font-bold flex-shrink-0">💬{cmts}</span>}
                        {p.isNew  && <span className="text-[7px] font-black text-white bg-red-500 px-1 rounded-full flex-shrink-0">N</span>}
                      </div>
                      <span className="text-[9px] text-gray-500 text-center self-center truncate">{safeAuthor(p).replace(/ #\d+$/,'')}</span>
                      <span className="text-[9px] text-gray-400 text-center self-center">{fmtDate(p.date)}</span>
                    </div>
                  );
                })}
              </div>

              {/* 페이지네이션 + 글쓰기 */}
              <div className="flex items-center justify-between px-3 py-3 border-t border-gray-100 bg-gray-50/50">
                {/* 페이지 버튼 */}
                <div className="flex items-center gap-1">
                  {boardPage > 1 && (
                    <button onClick={()=>setBoardPage(p=>p-1)}
                      className="text-[10px] bg-white border border-gray-300 text-gray-600 px-2 h-6 rounded tap">
                      {lang==='vi'?'Trước':'이전'}
                    </button>
                  )}
                  {Array.from({length: Math.min(totalBoardPages,5)}, (_,i)=> Math.max(1,Math.min(boardPage-2,totalBoardPages-4))+i)
                    .filter(p=>p<=totalBoardPages)
                    .map(p=>(
                    <button key={p} onClick={()=>setBoardPage(p)}
                      className={`w-6 h-6 rounded text-[10px] font-bold tap transition
                        ${boardPage===p?'bg-blue-700 text-white':'bg-white border border-gray-300 text-gray-600'}`}>
                      {p}
                    </button>
                  ))}
                  {boardPage < totalBoardPages && (
                    <button onClick={()=>setBoardPage(p=>Math.min(p+1,totalBoardPages))}
                      className="text-[10px] bg-white border border-gray-300 text-gray-600 px-2 h-6 rounded tap">
                      {lang==='vi'?'Sau':'다음'}
                    </button>
                  )}
                </div>
                {/* 글쓰기 */}
                <button onClick={()=>nav({page:'write', param:'hall', fromPage:'visaHub'})}
                  className="bg-blue-700 text-white text-[11px] font-black px-3 py-1.5 rounded-lg tap">
                  {lang==='vi'?'✏️ Viết bài':'✏️ 글쓰기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
