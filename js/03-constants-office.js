const OFFICES = [
  /* ── 서울 ── */
  { region:'seoul',       name:'서울출입국·외국인청',       addr:'서울 양천구 목동동로 151',            tel:'02-2650-6200', book:'https://www.hikorea.go.kr' },
  { region:'seoul',       name:'서울남부출입국·외국인사무소', addr:'서울 영등포구 버드나루로 16',          tel:'02-2650-6234', book:'https://www.hikorea.go.kr' },
  { region:'seoul',       name:'서울동부출입국·외국인사무소', addr:'서울 광진구 구천면로 345',            tel:'02-2204-4500', book:'https://www.hikorea.go.kr' },
  { region:'seoul',       name:'서울북부출입국·외국인사무소', addr:'서울 서대문구 통일로 97',             tel:'02-2088-5400', book:'https://www.hikorea.go.kr' },
  /* ── 경기·인천 ── */
  { region:'gyeonggi',    name:'인천출입국·외국인사무소',    addr:'인천 남동구 은봉로 82',               tel:'032-890-6300', book:'https://www.hikorea.go.kr' },
  { region:'gyeonggi',    name:'수원출입국·외국인사무소',    addr:'경기 수원시 영통구 도청로 30',         tel:'031-695-2000', book:'https://www.hikorea.go.kr' },
  { region:'gyeonggi',    name:'안산출입국·외국인사무소',    addr:'경기 안산시 단원구 적금로 113',        tel:'031-481-3400', book:'https://www.hikorea.go.kr' },
  { region:'gyeonggi',    name:'의정부출입국·외국인사무소',  addr:'경기 의정부시 청사로 1',               tel:'031-870-3015', book:'https://www.hikorea.go.kr' },
  { region:'gyeonggi',    name:'화성출입국·외국인사무소',    addr:'경기 화성시 병점중앙로 161',           tel:'031-8015-7800', book:'https://www.hikorea.go.kr' },
  { region:'gyeonggi',    name:'평택출입국·외국인사무소',    addr:'경기 평택시 평택로 222',               tel:'031-640-4400', book:'https://www.hikorea.go.kr' },
  { region:'gyeonggi',    name:'김포출입국·외국인사무소',    addr:'경기 김포시 김포한강8로 67',           tel:'031-980-5000', book:'https://www.hikorea.go.kr' },
  /* ── 충청 ── */
  { region:'chungcheong', name:'대전출입국·외국인사무소',    addr:'대전 서구 청사로 189',                tel:'042-480-2400', book:'https://www.hikorea.go.kr' },
  { region:'chungcheong', name:'청주출입국·외국인사무소',    addr:'충북 청주시 상당구 상당로 82',         tel:'043-240-4200', book:'https://www.hikorea.go.kr' },
  { region:'chungcheong', name:'천안출입국·외국인사무소',    addr:'충남 천안시 동남구 청수14로 58',       tel:'041-560-6400', book:'https://www.hikorea.go.kr' },
  /* ── 경상 ── */
  { region:'gyeongsang',  name:'부산출입국·외국인청',        addr:'부산 강서구 공항진입로 108',           tel:'051-620-7000', book:'https://www.hikorea.go.kr' },
  { region:'gyeongsang',  name:'대구출입국·외국인사무소',    addr:'대구 중구 태평로 161',                tel:'053-230-6700', book:'https://www.hikorea.go.kr' },
  { region:'gyeongsang',  name:'울산출입국·외국인사무소',    addr:'울산 중구 서원로 15',                 tel:'052-210-3100', book:'https://www.hikorea.go.kr' },
  { region:'gyeongsang',  name:'창원출입국·외국인사무소',    addr:'경남 창원시 성산구 중앙대로 88',       tel:'055-280-4200', book:'https://www.hikorea.go.kr' },
  { region:'gyeongsang',  name:'포항출입국·외국인사무소',    addr:'경북 포항시 남구 포항운하로 103',      tel:'054-291-3400', book:'https://www.hikorea.go.kr' },
  { region:'gyeongsang',  name:'구미출입국·외국인사무소',    addr:'경북 구미시 송정대로 67',              tel:'054-440-6500', book:'https://www.hikorea.go.kr' },
  /* ── 전라 ── */
  { region:'jeolla',      name:'광주출입국·외국인사무소',    addr:'광주 북구 첨단과기로 208',             tel:'062-608-3800', book:'https://www.hikorea.go.kr' },
  { region:'jeolla',      name:'전주출입국·외국인사무소',    addr:'전북 전주시 덕진구 팔달로 340',        tel:'063-270-3200', book:'https://www.hikorea.go.kr' },
  { region:'jeolla',      name:'여수출입국·외국인사무소',    addr:'전남 여수시 선소동길 19',              tel:'061-659-9000', book:'https://www.hikorea.go.kr' },
  /* ── 강원 ── */
  { region:'gangwon',     name:'춘천출입국·외국인사무소',    addr:'강원 춘천시 수변공원길 36',            tel:'033-248-4000', book:'https://www.hikorea.go.kr' },
  /* ── 제주 ── */
  { region:'jeju',        name:'제주출입국·외국인사무소',    addr:'제주 제주시 도령로 97',               tel:'064-720-4400', book:'https://www.hikorea.go.kr' },
];

const OFFICE_REGIONS = [
  { key:'all',          label:'전체',     vi:'Tất cả' },
  { key:'seoul',        label:'서울',     vi:'Seoul' },
  { key:'gyeonggi',     label:'경기·인천', vi:'Gyeonggi·Incheon' },
  { key:'chungcheong',  label:'충청',     vi:'Chungcheong' },
  { key:'gyeongsang',   label:'경상',     vi:'Gyeongsang' },
  { key:'jeolla',       label:'전라',     vi:'Jeolla' },
  { key:'gangwon',      label:'강원',     vi:'Gangwon' },
  { key:'jeju',         label:'제주',     vi:'Jeju' },
];

const EMBASSIES = [
  /* ── 한국 내 베트남 대사관·영사관 ── */
  { region:'seoul',       name:'주(駐)대한민국 베트남 대사관',      addr:'서울 강남구 테헤란로 330 (역삼동)',       tel:'02-3430-8400', book:'https://www.vietnamembassy.or.kr' },
  { region:'busan',       name:'주(駐)대한민국 베트남 총영사관',    addr:'부산 수영구 오륜로 57 (수영동)',          tel:'051-740-5280', book:'' },
];

const MOFA = [
  /* ── 한국 외교부 ── */
  { region:'seoul',       name:'대한민국 외교부',                addr:'서울 종로구 세종대로 110',               tel:'02-2100-8114', book:'https://www.mofa.go.kr' },
  { region:'seoul',       name:'외교부 영사민원실 (비자 문의)',    addr:'서울 종로구 세종대로 110',               tel:'02-2100-8900', book:'https://www.mofa.go.kr' },
];
