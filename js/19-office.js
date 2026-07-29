
/* ================================================================
   🏛️ 출입국 사무소 페이지 (전국 + 지역 필터 + 검색)
================================================================ */
function OfficePage({ onBack, lang }) {
  const [tab, setTab]       = useState('immigration'); // 'immigration', 'embassy', 'mofa'
  const [region, setRegion] = useState('all');
  const [query, setQuery]   = useState('');

  const dataSource = tab === 'immigration' ? OFFICES : tab === 'embassy' ? EMBASSIES : MOFA;

  const regionOptions =
    tab === 'immigration' ? OFFICE_REGIONS :
    tab === 'embassy' ? [
      { key:'all',    label:'전체',  vi:'Tất cả' },
      { key:'seoul',  label:'서울',  vi:'Seoul' },
      { key:'busan',  label:'부산',  vi:'Busan' }
    ] :
    [{ key:'all', label:'전체', vi:'Tất cả' }];

  const filtered = dataSource.filter(o => {
    const matchRegion = region === 'all' || o.region === region;
    const q = query.trim().toLowerCase();
    const matchQuery = !q || o.name.toLowerCase().includes(q) || o.addr.toLowerCase().includes(q);
    return matchRegion && matchQuery;
  });

  return (
    <div style={{ background:'#F0F2F5', minHeight:'100vh' }}>
      {/* 헤더 */}
      <header className="bg-blue-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={onBack} className="text-white text-xl tap">←</button>
          <div className="flex-1">
            <p className="text-white font-black text-sm leading-none">🗂️ {lang==='ko' ? '출입국·대사관·외교부 연락처' : 'Thông tin liên hệ XNC, Đại sứ quán, Bộ Ngoại giao'}</p>
            <p className="text-blue-200 text-[10px] mt-0.5">{lang==='ko' ? '한국 입국을 위한 기관 정보' : 'Thông tin cơ quan cần thiết cho nhập cảnh Hàn Quốc'}</p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-3 pt-3 pb-24">

        {/* 탭 */}
        <div className="flex gap-2 mb-3 border-b border-gray-200">
          <button onClick={() => { setTab('immigration'); setRegion('all'); setQuery(''); }}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition ${tab === 'immigration' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500'}`}>
            {lang==='ko' ? '출입국청' : 'Cục XNC'}
          </button>
          <button onClick={() => { setTab('embassy'); setRegion('all'); setQuery(''); }}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition ${tab === 'embassy' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500'}`}>
            {lang==='ko' ? '대사관' : 'Đại sứ quán'}
          </button>
          <button onClick={() => { setTab('mofa'); setRegion('all'); setQuery(''); }}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition ${tab === 'mofa' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500'}`}>
            {lang==='ko' ? '외교부' : 'Bộ Ngoại giao'}
          </button>
        </div>

        {/* 통합 콜센터 배너 */}
        <a href="tel:1345" className="block mb-3">
          <div className="bg-blue-700 rounded-2xl px-4 py-3.5 flex items-center gap-3 tap shadow">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📞</div>
            <div className="flex-1">
              <p className="text-white font-black text-sm">{lang==='ko' ? '출입국 통합 안내 콜센터' : 'Tổng đài tư vấn xuất nhập cảnh'}</p>
              <p className="text-blue-200 text-[11px]">{lang==='ko' ? '24시간 연결 가능 · 한국어/외국어' : 'Hoạt động 24h · Tiếng Hàn/Ngoại ngữ'}</p>
            </div>
            <span className="text-white font-black text-xl">1345</span>
          </div>
        </a>

        {/* 검색창 */}
        <div className="bg-white rounded-2xl shadow-sm px-3 py-2.5 mb-3 flex items-center gap-2">
          <span className="text-gray-400 text-base">🔍</span>
          <input
            type="search"
            placeholder={lang==='ko' ? '사무소 이름·지역으로 검색' : 'Tìm theo tên hoặc khu vực'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm text-gray-800 outline-none placeholder-gray-300"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-300 font-bold text-sm tap">✕</button>
          )}
        </div>

        {/* 지역 필터 탭 (가로 스크롤) */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-3 scrollbar-hide" style={{ scrollbarWidth:'none' }}>
          {regionOptions.map(r => (
            <button
              key={r.key}
              onClick={() => setRegion(r.key)}
              className={`flex-shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full transition tap ${
                region === r.key
                  ? 'bg-blue-700 text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {lang==='ko' ? r.label : r.vi}
            </button>
          ))}
        </div>

        {/* 결과 수 */}
        <p className="text-[11px] text-gray-400 mb-2 px-1">
          {lang==='ko' ? `${filtered.length}개 사무소` : `${filtered.length} văn phòng`}
        </p>

        {/* 사무소 목록 */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-sm">
            {lang==='ko' ? '검색 결과가 없습니다' : 'Không tìm thấy kết quả'}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filtered.map((o, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 pt-3.5 pb-1">
                  <div className="flex items-start gap-2.5">
                    <span className="text-lg mt-0.5 flex-shrink-0">🏛️</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-gray-800 word-keep leading-snug">{o.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 word-keep leading-relaxed">📍 {o.addr}</p>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3 flex gap-2 mt-2">
                  <a
                    href={`tel:${o.tel}`}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-700 text-white text-xs font-black py-2.5 rounded-xl tap shadow-sm"
                  >
                    📞 {o.tel}
                  </a>
                  <a
                    href={o.book}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 bg-white border-2 border-blue-200 text-blue-700 text-xs font-black py-2.5 rounded-xl tap"
                  >
                    🗓️ {lang==='ko' ? 'Hi-Korea 예약' : 'Đặt lịch'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hi-Korea 안내 */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <p className="text-[11px] text-amber-800 font-bold mb-1">💡 {lang==='ko' ? '예약 안내' : 'Hướng dẫn đặt lịch'}</p>
          <p className="text-[11px] text-amber-700 leading-relaxed word-keep">
            {lang==='ko'
              ? '온라인 예약은 Hi-Korea(www.hikorea.go.kr) 로그인 후 민원예약에서 가능합니다. 만료 3개월 전 예약을 권장합니다.'
              : 'Đặt lịch online tại Hi-Korea (www.hikorea.go.kr) sau khi đăng nhập → Đặt lịch dịch vụ. Nên đặt trước 3 tháng khi hết hạn.'}
          </p>
        </div>

      </div>
    </div>
  );
}
