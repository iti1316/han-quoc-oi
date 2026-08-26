const CLASSIC_BOARD_CFG = {
  d9:     { ko:'📘 비자 정보공유',          vi:'Thông tin Visa',          desc_ko:'D-9 연장, F-2-7, F-5 변경 등 비자에 관한 정보공유, 질문&답변 게시판입니다.', desc_vi:'Chia sẻ thông tin visa D-9, F-2-7, F-5 và hỏi đáp.', cats:['hall','sos','talk'], writeParam:'hall' },
  travel: { ko:'📸 여행·맛집 소개',         vi:'Du lịch & Ẩm thực',       desc_ko:'여행 정보, 맛집 소개, 주말 감성 핫플 등을 자유롭게 공유하세요.',        desc_vi:'Chia sẻ trải nghiệm du lịch, ẩm thực, địa điểm cuối tuần.',    cats:['travel'], writeParam:'travel' },
  bamboo: { ko:'🤫 대나무숲 완전 익명',     vi:'Góc tám chuyện ẩn danh',        desc_ko:'익명으로 자유롭게 이야기할 수 있는 게시판입니다. 비자 외 모든 이야기 환영.', desc_vi:'Không gian nói chuyện ẩn danh. Tất cả chủ đề đều được chào đón.',cats:['bamboo'], writeParam:'bamboo' },
  market: { ko:'🥕 당근마켓 꿀매물',        vi:'Chợ Daangn',              desc_ko:'중고거래, 나눔, 꿀매물 정보를 공유하는 게시판입니다.',                  desc_vi:'Mua bán đồ cũ, đồ mới, chia sẻ hàng ngon giá tốt',                    cats:['market'], writeParam:'market' },
  house:  { ko:'🏠 집 구하기 & 쉐어하우스', vi:'Tìm nhà & Share house',   desc_ko:'부동산 정보공유, 질문&답변 등을 하실 수 있는 게시판입니다.',            desc_vi:'Chia sẻ thông tin bất động sản, hỏi đáp thuê phòng.',          cats:['house'],  writeParam:'house'  },
  hospital: { ko:'🏥 병원 찾기 · 추천', vi:'Tìm & Giới thiệu bệnh viện', desc_ko:'병원 정보와 후기 공유',  desc_vi:'Chia sẻ thông tin và review bệnh viện', cats:['hospital'], writeParam:'hospital' },
  horror: { ko:'👻 무서운 이야기 방',        vi:'Phòng Chuyện Ma',         desc_ko:'무서운 경험, 귀신 이야기, 소름돋는 사연을 익명으로 공유하는 공간입니다.',  desc_vi:'Chia sẻ chuyện ma, trải nghiệm đáng sợ một cách ẩn danh.',    cats:['horror'], writeParam:'horror' },
  info:   { ko:'📚 한국생활 정보',          vi:'Thông tin sống ở Hàn',    desc_ko:'한국 생활에 필요한 각종 정보를 공유하는 게시판입니다. 생활팁, 꿀정보 환영!',      desc_vi:'Chia sẻ thông tin sinh hoạt ở Hàn Quốc, các mẹo hữu ích.',                  cats:['info'],   writeParam:'info' },
  jobs:   { ko:'💼 지역 일자리 구인&구직',  vi:'Việc làm quanh đây',      desc_ko:'지역 일자리 정보를 공유하고 구직/구인을 하는 게시판입니다.',          desc_vi:'Chia sẻ thông tin việc làm, tuyển dụng địa phương.',                      cats:['jobs'],   writeParam:'jobs' },
};

const DEFAULT_BOARD_NOTICES_BY_CAT = {
  market: [
    { id:'n1', title:'[공지] 개인정보 절대 입력 금지 — 닉네임은 자동 익명 생성됩니다.', title_vi:'[Thông báo] Tuyệt đối không nhập thông tin cá nhân — Biệt danh ẩn danh tự động.', date:'25-01-10', views:8820, likes:45 },
  ],
  house: [],
  hospital: [],
  travel: [],
  hall: [],
  sos: [],
  bamboo: [],
  horror: [],
  talk: [],
  info: [],
  jobs: [],
};

const LOCKED_CATS = ['travel', 'market', 'house', 'hospital', 'horror', 'bamboo', 'talk', 'info', 'jobs'];
const LOCKED_CAT_INFO = {
  talk:   { e:'💬', ko:'출입국 참교육방',    vi:'Kinh nghiệm Thực tế',   desc_ko:'반려·실패담, 출입국 썰', desc_vi:'Trải nghiệm bị từ chối' },
  travel: { e:'📸', ko:'여행·맛집 소개',    vi:'Du lịch & Ẩm thực',     desc_ko:'여행 정보, 맛집 소개',   desc_vi:'Chia sẻ du lịch, ẩm thực' },
  market: { e:'🥕', ko:'당근마켓 꿀매물',   vi:'Chợ Daangn',            desc_ko:'중고거래, 나눔, 꿀매물', desc_vi:'Mua bán đồ cũ' },
  house:  { e:'🏠', ko:'집 구하기',         vi:'Tìm nhà & Share house', desc_ko:'부동산 정보, 쉐어하우스', desc_vi:'Tìm phòng, share house' },
  hospital: { e:'🏥', ko:'병원 찾기 · 추천', vi:'Tìm & Giới thiệu bệnh viện', desc_ko:'병원 정보와 후기', desc_vi:'Thông tin & review bệnh viện' },
  horror: { e:'👻', ko:'무서운 이야기 방',   vi:'Phòng Chuyện Ma',       desc_ko:'무서운 경험, 귀신 이야기', desc_vi:'Chuyện ma, trải nghiệm đáng sợ' },
  bamboo: { e:'🤫', ko:'대나무숲 완전 익명', vi:'Góc tám chuyện ẩn danh',     desc_ko:'익명으로 자유롭게 대화', desc_vi:'Nói bất cứ điều gì bạn muốn, ẩn danh hoàn toàn' },
  info:   { e:'📚', ko:'한국생활 정보',     vi:'Thông tin sống ở Hàn',  desc_ko:'생활정보 모음',          desc_vi:'Tips sống ở Hàn Quốc' },
  jobs:   { e:'💼', ko:'지역 일자리 구인&구직', vi:'Việc làm quanh đây', desc_ko:'일자리 정보',            desc_vi:'Tìm việc làm' },
};

const BOARD_HOT_CFG = [
  { key:'d9',     cats:['hall','sos','talk'], emoji:'📘', bg:'bg-blue-600',   ko:'비자 정보',     vi:'Visa' },
  { key:'travel', cats:['travel'],              emoji:'📸', bg:'bg-pink-500',   ko:'여행·맛집',    vi:'Du lịch' },
  { key:'bamboo', cats:['bamboo'],              emoji:'🤫', bg:'bg-orange-500', ko:'대나무숲',     vi:'Góc tám chuyện ẩn danh' },
  { key:'market', cats:['market'],              emoji:'🥕', bg:'bg-orange-400', ko:'당근마켓',     vi:'Chợ' },
  { key:'house',  cats:['house'],               emoji:'🏠', bg:'bg-teal-600',   ko:'집구하기',     vi:'Tìm nhà' },
  { key:'hospital', cats:['hospital'],          emoji:'🏥', bg:'bg-teal-600',   ko:'병원찾기',     vi:'Tìm bệnh viện' },
  { key:'horror', cats:['horror'],              emoji:'👻', bg:'bg-gray-800',   ko:'무서운이야기',  vi:'Chuyện Ma' },
  { key:'info',   cats:['info'],                emoji:'📚', bg:'bg-purple-600', ko:'한국생활정보',  vi:'Thông tin sinh hoạt' },
  { key:'jobs',   cats:['jobs'],                emoji:'💼', bg:'bg-indigo-600', ko:'지역일자리',    vi:'Việc làm' },
];

const CAT_BOARD_MAP = {
  hall:   { key:'d9',     emoji:'📘', bg:'bg-blue-600',   ko:'비자 정보',     vi:'Visa' },
  sos:    { key:'d9',     emoji:'📘', bg:'bg-blue-600',   ko:'비자 정보',     vi:'Visa' },
  talk:   { key:'d9',     emoji:'📘', bg:'bg-blue-600',   ko:'비자 정보',     vi:'Visa' },
  bamboo: { key:'bamboo', emoji:'🤫', bg:'bg-orange-500', ko:'대나무숲',      vi:'Góc tám chuyện ẩn danh' },
  travel: { key:'travel', emoji:'📸', bg:'bg-pink-500',   ko:'여행·맛집',     vi:'Du lịch' },
  market: { key:'market', emoji:'🥕', bg:'bg-orange-400', ko:'당근마켓',      vi:'Chợ' },
  house:  { key:'house',  emoji:'🏠', bg:'bg-teal-600',   ko:'집구하기',      vi:'Tìm nhà' },
  hospital: { key:'hospital', emoji:'🏥', bg:'bg-teal-600', ko:'병원찾기',    vi:'Tìm bệnh viện' },
  horror: { key:'horror', emoji:'👻', bg:'bg-gray-800',   ko:'무서운이야기',   vi:'Chuyện Ma' },
  info:   { key:'info',   emoji:'📚', bg:'bg-purple-600', ko:'한국생활정보',   vi:'Thông tin sinh hoạt' },
  jobs:   { key:'jobs',   emoji:'💼', bg:'bg-indigo-600', ko:'지역일자리',     vi:'Việc làm' },
};

const SEARCH_BOARD_INFO = {
  hall:   { key:'d9',     emoji:'📘', ko:'비자 정보',   vi:'Visa',        bg:'bg-blue-600' },
  sos:    { key:'d9',     emoji:'📘', ko:'비자 정보',   vi:'Visa',        bg:'bg-blue-600' },
  bamboo: { key:'bamboo', emoji:'🤫', ko:'대나무숲',    vi:'Góc tám chuyện ẩn danh',    bg:'bg-orange-500' },
  talk:   { key:'d9',     emoji:'📘', ko:'비자 정보',   vi:'Visa',        bg:'bg-blue-600' },
  travel: { key:'travel', emoji:'📸', ko:'여행·맛집',   vi:'Du lịch',     bg:'bg-pink-500' },
  market: { key:'market', emoji:'🥕', ko:'당근마켓',    vi:'Chợ',         bg:'bg-orange-400' },
  house:  { key:'house',  emoji:'🏠', ko:'집구하기',    vi:'Tìm nhà',     bg:'bg-teal-600' },
  hospital: { key:'hospital', emoji:'🏥', ko:'병원찾기',  vi:'Tìm bệnh viện', bg:'bg-teal-600' },
  horror: { key:'horror', emoji:'👻', ko:'무서운이야기', vi:'Chuyện Ma',   bg:'bg-gray-800' },
  info:   { key:'info', emoji:'📚', ko:'한국생활정보', vi:'Thông tin sinh hoạt', bg:'bg-purple-600' },
  jobs:   { key:'jobs', emoji:'💼', ko:'지역일자리',   vi:'Việc làm',           bg:'bg-indigo-600' },
};
