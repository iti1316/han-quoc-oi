
/* ================================================================
   페이지: 비자 점수 계산기 (E-7-4 / F-2-7 / F-5)
================================================================ */
function ScorePage({ type='e74', onBack, lang }) {
  const [age,setAge]     = useState('0');
  const [kor,setKor]     = useState('0');
  const [edu,setEdu]     = useState('0');
  const [inc,setInc]     = useState('0');
  const [cert,setCert]   = useState(false);
  const [rec,setRec]     = useState(false);
  const [long6,setLong6] = useState(false);

  // 비자별 배점 설정 및 옵션
  const VISA_OPTIONS = {
    e74: {
      maxScore:300, passScore:200, title:lang==='vi'?'📊 Kiểm tra điểm E-7-4':'📊 E-7-4 점수 체크', BASE:20,
      age:   [['0','선택하세요'],['25','18~24세 (25점)'],['30','25~29세 (30점)'],['28','30~34세 (28점)'],['20','35~39세 (20점)'],['15','40~44세 (15점)'],['8','45~49세 (8점)'],['3','50세 이상 (3점)']],
      ageVi: [['0','Chọn'],['25','18~24 tuổi (25đ)'],['30','25~29 tuổi (30đ)'],['28','30~34 tuổi (28đ)'],['20','35~39 tuổi (20đ)'],['15','40~44 tuổi (15đ)'],['8','45~49 tuổi (8đ)'],['3','Từ 50 tuổi (3đ)']],
      kor:   [['0','선택하세요'],['0','토픽 1급 (0점)'],['20','토픽 2급 (20점)'],['35','토픽 3급 (35점)'],['45','토픽 4급 (45점)'],['50','토픽 5~6급 (50점)'],['50','사회통합프로그램 5단계 (50점)']],
      korVi: [['0','Chọn'],['0','TOPIK cấp 1 (0đ)'],['20','TOPIK cấp 2 (20đ)'],['35','TOPIK cấp 3 (35đ)'],['45','TOPIK cấp 4 (45đ)'],['50','TOPIK cấp 5~6 (50đ)'],['50','KIP giai đoạn 5 (50đ)']],
      edu:   [['0','선택하세요 / 해당없음 (0점)'],['15','국내 전문학사 (15점)'],['30','국내 학사 (30점)'],['40','국내 석사 이상 (40점)'],['15','해외 학사 (15점)'],['25','해외 석사 이상 (25점)']],
      eduVi: [['0','Chọn / Không có (0đ)'],['15','Cao đẳng trong nước (15đ)'],['30','Đại học trong nước (30đ)'],['40','Thạc sĩ+ trong nước (40đ)'],['15','Đại học nước ngoài (15đ)'],['25','Thạc sĩ+ nước ngoài (25đ)']],
      inc:   [['0','선택하세요'],['0','최저임금 1배 미만 (0점)'],['20','1배 이상 1.5배 미만 (20점)'],['35','1.5배 이상 2배 미만 (35점)'],['50','2배 이상 2.5배 미만 (50점)'],['60','2.5배 이상 (60점)']],
      incVi: [['0','Chọn'],['0','Dưới 1x lương tối thiểu (0đ)'],['20','1x~1.5x (20đ)'],['35','1.5x~2x (35đ)'],['50','2x~2.5x (50đ)'],['60','Từ 2.5x trở lên (60đ)']]
    },
    f27: {
      maxScore:170, passScore:80, title:lang==='vi'?'📊 Kiểm tra điểm F-2-7':'📊 F-2-7 점수 체크', BASE:0,
      age:   [['0','선택하세요'],['23','18~24세 (23점)'],['25','25~29세 (25점)'],['23','30~34세 (23점)'],['20','35~39세 (20점)'],['12','40~44세 (12점)'],['8','45~50세 (8점)'],['3','51세 이상 (3점)']],
      ageVi: [['0','Chọn'],['23','18~24 tuổi (23đ)'],['25','25~29 tuổi (25đ)'],['23','30~34 tuổi (23đ)'],['20','35~39 tuổi (20đ)'],['12','40~44 tuổi (12đ)'],['8','45~50 tuổi (8đ)'],['3','51 tuổi trở lên (3đ)']],
      kor:   [['0','선택하세요'],['3','토픽 1급 / KIIP 1단계 (3점)'],['5','토픽 2급 / KIIP 2단계 (5점)'],['10','토픽 3급 / KIIP 3단계 (10점)'],['15','토픽 4급 / KIIP 4단계 (15점)'],['20','토픽 5~6급 / KIIP 5단계 (20점)']],
      korVi: [['0','Chọn'],['3','TOPIK cấp 1 / KIIP lớp 1 (3đ)'],['5','TOPIK cấp 2 / KIIP lớp 2 (5đ)'],['10','TOPIK cấp 3 / KIIP lớp 3 (10đ)'],['15','TOPIK cấp 4 / KIIP lớp 4 (15đ)'],['20','TOPIK cấp 5~6 / KIIP lớp 5 (20đ)']],
      edu:   [['0','선택하세요 / 해당없음 (0점)'],['10','전문학사 - 다른분야 (10점)'],['15','전문학사 - 이공계 (15점)'],['15','학사 - 다른분야 (15점)'],['17','학사 - 이공계 (17점)'],['17','학사 - 2개 이상 (17점)'],['17','석사 - 다른분야 (17점)'],['20','석사 - 이공계 (20점)'],['20','석사 - 2개 이상 (20점)'],['20','박사 - 다른분야 (20점)'],['25','박사 - 이공계/2개이상 (25점)']],
      eduVi: [['0','Chọn / Không có (0đ)'],['10','Cao đẳng - Khác (10đ)'],['15','Cao đẳng - STEM (15đ)'],['15','Đại học - Khác (15đ)'],['17','Đại học - STEM (17đ)'],['17','Đại học - 2+ bằng (17đ)'],['17','Thạc sĩ - Khác (17đ)'],['20','Thạc sĩ - STEM (20đ)'],['20','Thạc sĩ - 2+ bằng (20đ)'],['20','Tiến sĩ - Khác (20đ)'],['25','Tiến sĩ - STEM/2+ (25đ)']],
      inc:   [['0','선택하세요'],['10','최저임금~3천만원 (10점)'],['30','3천만~4천만원 (30점)'],['40','4천만~5천만원 (40점)'],['45','5천만~6천만원 (45점)'],['50','6천만~7천만원 (50점)'],['53','7천만~8천만원 (53점)'],['56','8천만~9천만원 (56점)'],['58','9천만~1억원 (58점)'],['60','1억원 이상 (60점)']],
      incVi: [['0','Chọn'],['10','Tối thiểu ~ 30tr (10đ)'],['30','30tr ~ 40tr (30đ)'],['40','40tr ~ 50tr (40đ)'],['45','50tr ~ 60tr (45đ)'],['50','60tr ~ 70tr (50đ)'],['53','70tr ~ 80tr (53đ)'],['56','80tr ~ 90tr (56đ)'],['58','90tr ~ 100tr (58đ)'],['60','100tr trở lên (60đ)']],
      bonus: [
        { ko:'참전국 우수 인재', vi:'Chuyên gia xuất sắc', pts:20 },
        { ko:'중앙행정기관 추천', vi:'Cơ quan hành chính tiến cử', pts:20 },
        { ko:'해외 명문대 박사', vi:'Tiến sĩ từ đại học danh tiếng', pts:30 },
        { ko:'한국 대학 박사', vi:'Tiến sĩ từ ĐH Hàn Quốc', pts:10 },
        { ko:'해외 명문대 석사', vi:'Thạc sĩ từ đại học danh tiếng', pts:20 },
        { ko:'한국 대학 석사', vi:'Thạc sĩ từ ĐH Hàn Quốc', pts:7 },
        { ko:'해외 명문대 학사', vi:'Đại học từ đại học danh tiếng', pts:15 },
        { ko:'한국 대학 학사', vi:'Đại học từ ĐH Hàn Quốc', pts:5 },
        { ko:'국내 봉사활동 3년 이상', vi:'Tình nguyện trong nước 3+ năm', pts:7 },
        { ko:'국내 봉사활동 2~3년', vi:'Tình nguyện trong nước 2~3 năm', pts:5 },
        { ko:'국내 봉사활동 1~2년', vi:'Tình nguyện trong nước 1~2 năm', pts:1 }
      ]
    },
    f5: {
      maxScore:100, passScore:60, title:lang==='vi'?'📊 Kiểm tra điểm F-5':'📊 F-5 점수 체크', BASE:0,
      age:   [['0','선택하세요'],['20','25~34세 (20점)'],['15','35~44세 (15점)'],['10','45~59세 (10점)'],['5','60세 이상 (5점)']],
      ageVi: [['0','Chọn'],['20','25~34 tuổi (20đ)'],['15','35~44 tuổi (15đ)'],['10','45~59 tuổi (10đ)'],['5','Từ 60 tuổi (5đ)']],
      kor:   [['0','선택하세요'],['0','기초 (0점)'],['10','중급 (10점)'],['20','상급 (20점)']],
      korVi: [['0','Chọn'],['0','Cơ bản (0đ)'],['10','Trung cấp (10đ)'],['20','Cao cấp (20đ)']],
      edu:   [['0','선택하세요 / 해당없음 (0점)'],['5','전문학사 (5점)'],['10','학사 (10점)'],['15','석사 이상 (15점)']],
      eduVi: [['0','Chọn / Không có (0đ)'],['5','Cao đẳng (5đ)'],['10','Đại học (10đ)'],['15','Thạc sĩ+ (15đ)']],
      inc:   [['0','선택하세요'],['0','저소득 (0점)'],['10','평균 (10점)'],['20','중상 (20점)'],['30','고소득 (30점)']],
      incVi: [['0','Chọn'],['0','Thu nhập thấp (0đ)'],['10','Trung bình (10đ)'],['20','Khá (20đ)'],['30','Cao (30đ)']]
    }
  };

  const SETTING = VISA_OPTIONS[type] || VISA_OPTIONS.e74;

  const total = +age + +kor + +edu + +inc + (cert?10:0) + (rec?30:0) + (long6?10:0) + SETTING.BASE;
  const pct   = Math.min((total/SETTING.passScore)*100, 100);
  const pass  = total >= SETTING.passScore;

  const SEL = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-700 bg-white';

  return (
    <div style={{ background:'#F0F2F5' }} className="min-h-screen">
      <BackHeader title={SETTING.title} onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-4 pb-12">

        {type==='f27' && (
        <div className="mb-6 fade-in">
          {/* 공식 점수표 - 사용자가 제공한 이미지 + 텍스트 카드 함께 표시 */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            <h3 className="font-black text-sm text-gray-800 mb-3 text-center">
              {lang==='vi' ? '📋 Bảng điểm chính thức (민원인 제증용)' : '📋 공식 점수표 (민원인 제증용)'}
            </h3>

            {/* 이미지 */}
            <img src="/score-table.jpg" alt="F-2-7 Score Table" className="w-full rounded-lg border border-gray-200" style={{maxHeight: '600px', objectFit: 'contain'}} />

            {/* 또는 텍스트 카드들 (이미지 아래 함께 표시) */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              {/* 5. Bonus */}
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="font-bold text-sm text-orange-700 mb-1">⑤ {lang==='vi'?'가점 (Tối đa 40 điểm)':'가점 (최대 40점)'}</p>
                <p className="text-xs text-gray-700">{lang==='vi'?'한국어 능력: +10 | 국내 근무 6M: +10 | 한국 유학 이력: +30':'한국어 자격증: 10점 | 국내 근무 6개월+: 10점 | 한국 유학 이력: 30점'}</p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* F-2-7 점수 기준 상세 설명 */}
        {type==='f27' && (
        <div className="bg-white rounded-2xl border border-gray-200 px-4 py-4 fade-in">
          <div className="text-sm text-gray-800 space-y-4 leading-relaxed word-keep" style={{whiteSpace:'pre-wrap'}}>
            <div>
              <p className="font-black text-base mb-2">1. Tuổi tác (Độ tuổi) – Tối đa 25 điểm</p>
              <p className="text-xs mb-2">Phần này tính theo độ tuổi sinh học chính xác của bạn tại thời điểm nộp hồ sơ:</p>
              <p className="text-xs">• 25 – 29 tuổi: Đạt điểm tuyệt đối 25 điểm.
• 18 – 24 tuổi và 30 – 34 tuổi: Đạt 23 điểm.
• Từ 35 tuổi trở lên điểm giảm mạnh (35-39 tuổi được 20 điểm, 40-44 tuổi chỉ còn 12 điểm...).</p>
            </div>

            <div>
              <p className="font-black text-base mb-2">2. Học vị / Bằng cấp – Tối đa 25 điểm</p>
              <p className="text-xs mb-2">Đây là phần có sự phân hóa rất rõ rệt giữa khối ngành Kỹ thuật/Tự nhiên và Kinh tế/Xã hội:</p>
              <p className="text-xs">• Tiến sĩ (박사):
  - Ngành Khoa học kỹ thuật (이공계) hoặc sở hữu từ 2 bằng Tiến sĩ trở lên: 25 điểm (Trần tối đa).
  - Các ngành khác (이공계 외): 20 điểm.

• Thạc sĩ (석사):
  - Ngành Khoa học kỹ thuật (이공계) hoặc sở hữu từ 2 bằng Thạc sĩ trở lên: 20 điểm.
  - Các ngành khác (이공계 외): 17 điểm.

• Cử nhân - Đại học 4 năm (학사):
  - Ngành Khoa học kỹ thuật (이공계) hoặc sở hữu từ 2 bằng Cử nhân trở lên: 17 điểm.
  - Các ngành khác (이공계 외): 15 điểm.

• Cao đẳng 2-3 năm (전문학사): Ngành kỹ thuật được 15 điểm, các ngành khác được 10 điểm.</p>
            </div>

            <div>
              <p className="font-black text-base mb-2">3. Năng lực tiếng Hàn (기본소양) – Tối đa 20 điểm</p>
              <p className="text-xs mb-2">Phần này đánh giá đồng đều giữa chứng chỉ TOPIK và chương trình Hội nhập xã hội (KIIP):</p>
              <p className="text-xs">• Cao cấp (고급): TOPIK cấp 5, cấp 6 trở lên HOẶC hoàn thành KIIP Lớp 5 ➔ Nhận trọn vẹn 20 điểm.

• Trung cấp (중급):
  - TOPIK 4 / KIIP Lớp 4 ➔ 15 điểm.
  - TOPIK 3 / KIIP Lớp 3 ➔ 10 điểm.

• Sơ cấp (초급): Cấp 2 được 5 điểm, Cấp 1 được 3 điểm.</p>
            </div>

            <div>
              <p className="font-black text-base mb-2">4. Thu nhập hàng năm (연간 소득) – Tối đa 60 điểm</p>
              <p className="text-xs mb-2">Điểm số lũy tiến rất cao dựa trên tờ khai thuế (소득금액증명원):</p>
              <p className="text-xs">• Từ 100 triệu KRW trở lên: 60 điểm (Mức trần).
• 90 triệu ~ dưới 100 triệu KRW: 58 điểm.
• 80 triệu ~ dưới 90 triệu KRW: 56 điểm.
• 70 triệu ~ dưới 80 triệu KRW: 53 điểm.
• 60 triệu ~ dưới 70 triệu KRW: 50 điểm.
• 50 triệu ~ dưới 60 triệu KRW: 45 điểm.
• 40 triệu ~ dưới 50 triệu KRW: 40 điểm.
• 30 triệu ~ dưới 40 triệu KRW: 30 điểm.
• Từ mức Lương tối thiểu ~ dưới 30 triệu KRW: 10 điểm.</p>
            </div>

            <div>
              <p className="font-black text-base mb-2">5. Hạng mục điểm cộng (가점항목) – Tối đa 40 điểm</p>
              <p className="text-xs mb-2">Dù bạn có nhiều giấy tờ đến mấy thì tổng điểm cộng ở phần này cũng chỉ được chốt tối đa 40 điểm. Các mốc cộng cụ thể trong ảnh gồm:</p>
              <p className="text-xs">• Chuyên gia xuất sắc/Nhân tài ưu tú (참전국 우수 인재): +20 điểm.

• Được cơ quan hành chính trung ương tiến cử (중앙행정기관 추천): +20 điểm.

• Hội nhập xã hội (사회통합프로그램 5단계 이상): Đã hoàn thành xong lớp 5 được cộng thêm +10 điểm (Lưu ý: Mục này ăn điểm song song với mục Tiếng Hàn ở trên, tức là học xong KIIP 5 bạn vừa có 20 điểm gốc vừa có 10 điểm cộng).

• Tốt nghiệp trường danh tiếng thế giới (우수) hoặc trường nội địa Hàn Quốc (국내):
  - Hệ Tiến sĩ: Trường thế giới +30 điểm | Trường Hàn Quốc +10 điểm.
  - Hệ Thạc sĩ: Trường thế giới +20 điểm | Trường Hàn Quốc +7 điểm.
  - Hệ Cử nhân: Trường thế giới +15 điểm | Trường Hàn Quốc +5 điểm.

• Hoạt động tình nguyện trong nước (국내 사회봉사 활동):
  - Trên 3 năm: +7 điểm.
  - Từ 2 ~ 3 năm: +5 điểm.
  - Từ 1 ~ 2 năm: +1 điểm.</p>
            </div>
          </div>
        </div>
        )}

        {/* 입력 항목 (E-7-4, F-2-7 제외) */}
        {type !== 'e74' && type !== 'f27' && (
        <div className="flex flex-col gap-3">
          {(lang==='vi' ? [
            ['① Độ tuổi', age, setAge, SETTING.ageVi],
            ['② Tiếng Hàn', kor, setKor, SETTING.korVi],
            ['③ Học vấn', edu, setEdu, SETTING.eduVi],
            ['④ Thu nhập (lương thực nhận/tháng)', inc, setInc, SETTING.incVi],
          ] : [
            ['① 연령', age, setAge, SETTING.age],
            ['② 한국어 능력', kor, setKor, SETTING.kor],
            ['③ 학력', edu, setEdu, SETTING.edu],
            ['④ 소득 (월 실수령액 기준)', inc, setInc, SETTING.inc],
          ]).map(([label, val, setter, opts]) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm px-4 py-3 fade-in">
              <label className="block text-xs font-black text-gray-600 mb-2">{label}</label>
              <select value={val} onChange={e=>setter(e.target.value)} className={SEL}>
                {opts.map(([v,l],idx)=><option key={idx} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
        </div>
        )}

          {/* 가산점 체크박스 (E-7-4 전용) */}

          {/* E-7-4 K-Point 정보 */}
          {type==='e74' && (
          <div className="bg-white rounded-2xl shadow-sm px-3 py-3 fade-in space-y-3 text-[8.5px] leading-relaxed">
            <img src="./images/KakaoTalk_20260616_003510714.jpg" alt="K-POINT E74 정수표" className="w-full rounded-lg border border-gray-200" style={{maxHeight:'800px', objectFit:'contain'}} />

            <div className="bg-blue-50 rounded p-2 text-[8.5px] text-blue-900 space-y-1">
              <p><strong>8. Hệ thống tính điểm áp dụng mức trần tối đa là 300 điểm.</strong> Bạn bắt buộc phải đạt từ 200 điểm trở lên (tính cả điểm cộng) để vượt qua vòng xét duyệt. Đặc biệt, ở hai mục cơ bản là Thu nhập và Tiếng Hàn, bạn phải đạt điểm số tối thiểu của mỗi mục là từ 50 điểm trở lên.</p>

              <p><strong>A. Các hạng mục điểm cơ bản</strong></p>
              <p><strong>Thu nhập trung bình (2 năm gần nhất):</strong> Tối đa 120 điểm.
              Từ 25 ~ dưới 30 triệu won: 50 điểm (Mức sàn bắt buộc để không bị liệt).
              Từ 30 ~ dưới 35 triệu won: 65 điểm.
              Từ 35 ~ dưới 40 triệu won: 80 điểm.
              Từ 40 ~ dưới 45 triệu won: 95 điểm.
              Từ 45 ~ dưới 50 triệu won: 110 điểm.
              Trên 50 triệu won: 120 điểm.
              (Lao động ngành nông - lâm - thủy sản, vận tải biển tính từ mốc 24 triệu won trở lên).</p>

              <p><strong>Năng lực tiếng Hàn:</strong> Tối đa 120 điểm (Tính theo TOPIK, KIIP hoặc điểm thi đầu vào 사전평가).
              Cấp 2 / Lớp 2 / Điểm số 41–60: 50 điểm (Mức sàn bắt buộc).
              Cấp 3 / Lớp 3 / Điểm số 61–80: 80 điểm.
              Cấp 4 / Lớp 4 trở lên / Điểm số trên 81: 120 điểm.</p>

              <p><strong>Tuổi tác:</strong> Tối đa 60 điểm.
              19 – 26 tuổi: 40 điểm | 27 – 33 tuổi: 60 điểm | 34 – 40 tuổi: 30 điểm | Trên 41 tuổi: 10 điểm.</p>

              <p><strong>B. Hạng mục điểm cộng (Tối đa công nhận 40 điểm cho nhóm này)</strong></p>
              <p>Được Bộ ngành Trung ương tiến cử: +30 điểm.
              Được chính quyền tỉnh/thành phố tiến cử: +30 điểm.
              Được doanh nghiệp hiện tại tiến cử: +50 điểm.
              Làm việc liên tục tại xưởng hiện tại trên 3 năm: +20 điểm.
              Làm việc tại khu vực sụt giảm dân số/vùng sâu vùng xa trên 3 năm: +20 điểm.
              Có bằng cấp học vị tại Hàn Quốc hoặc chứng chỉ nghề quốc gia: +20 điểm.
              Có bằng lái xe tại Hàn Quốc: +10 điểm.</p>

              <p><strong>C. Hạng mục điểm trừ (Bị trừ nặng nếu phạm lỗi hành chính)</strong></p>
              <p>Phạm lỗi bị phạt tiền dưới 1.000.000 KRW: Bị trừ từ 5 đến 20 điểm tùy số lần vi phạm.
              Có lịch sử chậm nộp thuế dẫn đến bị treo tư cách: Bị trừ từ 5 đến 15 điểm.
              Vi phạm Luật Xuất nhập cảnh dưới 3 lần (bao gồm cả phạt hành chính hình thức 과태료): Bị trừ từ 5 đến 15 điểm.</p>
            </div>
          </div>
          )}

          {/* F-2-7 가산점 설명 (정보용) */}
          {type==='f27' && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-sm px-4 py-3 fade-in">
            <p className="text-xs font-black text-blue-800 mb-2">🎯 {lang==='vi' ? 'Hạng mục điểm cộng (tối đa 40 điểm)' : '🎯 가점항목 (최대 40점)'}</p>
            <p className="text-[10px] text-blue-700 mb-2 word-keep">{lang==='vi' ? '※ Các điểm cộng dưới đây có tối đa 40 điểm. Bạn có thể đạt nhiều điều kiện nhưng tổng không vượt quá 40 điểm.' : '※ 여러 조건을 충족해도 가점은 최대 40점까지만 인정됩니다.'}</p>
            <div className="space-y-1 text-[9px] text-blue-700 leading-relaxed">
              {(SETTING.bonus || []).map((item,idx)=>(
                <p key={idx}>• {lang==='vi'?item.vi:item.ko}: <span className="font-black">+{item.pts}{lang==='vi'?'đ':'점'}</span></p>
              ))}
            </div>
          </div>
          )}

        <p className="text-[10px] text-center text-gray-400 mt-5 word-keep">
          {lang==='vi' ? '⚠️ Chỉ để tham khảo. Kết quả thực tế có thể khác.' : '⚠️ 참고용 계산기입니다. 실제 심사 결과와 다를 수 있습니다.'}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   페이지: 필수 서류 다운로드
   driveId: 구글 드라이브 파일 ID (실제 파일 업로드 후 교체 필요)
   다운로드 URL 형식: https://drive.google.com/uc?export=download&id={driveId}
================================================================ */
