const MASTER_BTNS = [
  { e:'📘', ko:'비자 변경\n및 연장',       vi:'Đổi và gia hạn\nVisa',       sub_ko:'모든 비자 가이드',    sub_vi:'Hướng dẫn tất cả visa', bg:'bg-blue-600',   act:()=>({page:'visaHub'}) },
  { e:'📸', ko:'여행 및\n맛집 소개',      vi:'Du lịch và ẩm\nthực',  sub_ko:'주말 감성 핫플',       sub_vi:'Địa điểm hot, quán ăn ngon',     bg:'bg-pink-500',   act:()=>({page:'classicBoard', param:'travel'}) },
  { e:'🤫', ko:'대나무숲\n완전 익명',     vi:'Góc tám\nchuyện',           sub_ko:'대나무숲 익명',        sub_vi:'Nói bất cứ điều gì\nbạn muốn',      bg:'bg-orange-500', act:()=>({page:'classicBoard', param:'bamboo'}) },
  { e:'🥕', ko:'당근마켓\n꿀매물',        vi:'Góc mua\nbán',              sub_ko:'당근마켓 꿀매물',      sub_vi:'Mua bán sản phẩm mới cũ',           bg:'bg-orange-400', act:()=>({page:'classicBoard', param:'market'}) },
  { e:'🏠', ko:'집 구하기 및\n쉐어하우스',vi:'Thuê nhà và\nshare nhà ở', sub_ko:'집구하기',             sub_vi:'Thông tin bất động sản',       bg:'bg-teal-600',   act:()=>({page:'classicBoard', param:'house'}) },
  { e:'🏥', ko:'병원 찾기 및\n추천',      vi:'Tìm & giới thiệu\nbệnh viện', sub_ko:'병원찾기',              sub_vi:'Thông tin bệnh viện',          bg:'bg-rose-600',   act:()=>({page:'classicBoard', param:'hospital'}) },
  { e:'📚', ko:'한국생활\n정보',          vi:'Thông tin\nsống ở Hàn',   sub_ko:'생활정보 모음',         sub_vi:'Tips sống ở Hàn Quốc',         bg:'bg-purple-600', act:()=>({page:'classicBoard', param:'info'}) },
  { e:'💼', ko:'지역 일자리\n구인&구직',   vi:'Việc làm\nquanh đây',       sub_ko:'일자리 정보',           sub_vi:'Tìm việc làm',                 bg:'bg-indigo-600', act:()=>({page:'classicBoard', param:'jobs'}) },
  { e:'☰',  ko:'더보기',                 vi:'Xem thêm',                  sub_ko:'(전체 채널)',           sub_vi:'(Toàn bộ kênh)',          bg:'bg-gray-600',   more:true },
];

function MasterGrid({ nav, lang, toggleLang, onOpenMore }) {
  return (
    <section className="bg-white px-3 pt-3 pb-4 shadow-sm">
      <div className="grid grid-cols-3 gap-2">
        {MASTER_BTNS.map((b, i) => {
          const label = lang==='vi' ? b.vi : b.ko;
          const sub   = lang==='vi' ? b.sub_vi : b.sub_ko;
          const inner = (
            <>
              <span className="text-[26px] leading-none">{b.e}</span>
              <p className="text-[11px] font-black text-white text-center leading-tight whitespace-pre-line mt-1">{label}</p>
              <p className="text-[9px] text-white/70 text-center leading-tight mt-0.5">{sub}</p>
            </>
          );
          if (b.more) return (
            <button key={i} onClick={onOpenMore}
              className={`${b.bg} rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5 min-h-[92px] tap transition active:scale-95`}>
              {inner}
            </button>
          );
          if (b.soon) return (
            <div key={i}
              className={`${b.bg} opacity-60 rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5 min-h-[92px] relative`}>
              {inner}
              <span className="absolute top-1.5 right-1.5 text-[7px] bg-black/30 text-white font-bold px-1 py-0.5 rounded-full">
                {lang==='vi'?'Sắp có':'준비중'}
              </span>
            </div>
          );
          return (
            <button key={i} onClick={()=>nav(b.act())}
              className={`${b.bg} rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5 min-h-[92px] tap shadow-sm transition active:scale-95`}>
              {inner}
            </button>
          );
        })}
      </div>
    </section>
  );
}

