/* ================================================================
   비자별 필수·권장 서류 완벽 데이터셋
   E-9, D-2, D-10, E-7-1, D-8/D-9, E-7-4, F-2-7, F-5, F-6
================================================================ */

// DOCS 배열 (모든 가능한 서류 마스터 목록)
const VISA_DOCS_MASTER = [
  // ── 공통 서류 ──
  { id:'통합신청서', icon:'📄', ko:'통합신청서 (체류자격 변경·연장)', vi:'Đơn tổng hợp' },
  { id:'여권', icon:'📕', ko:'여권 사본', vi:'Bản sao hộ chiếu' },
  { id:'외국인등록증', icon:'🆔', ko:'외국인등록증 (원본/사본)', vi:'Giấy ngoại kiều' },

  // ── E-9 특화 ──
  { id:'고용허가서', icon:'📜', ko:'표준근로계약서 및 고용허가서', vi:'Hợp đồng lao động tiêu chuẩn' },
  { id:'고용주신분증', icon:'🪪', ko:'고용주 신분증 사본', vi:'Bản sao chứng minh chủ' },
  { id:'고용보험가입명부', icon:'📋', ko:'회사 고용보험 가입자 명부', vi:'Danh sách người tham gia bảo hiểm lao động' },
  { id:'기숙사확인서', icon:'🏨', ko:'기숙사 제공 확인서', vi:'Xác nhận cung cấp ký túc xá' },

  // ── D-2/D-10 특화 ──
  { id:'재학증명서', icon:'📚', ko:'재학증명서 및 성적증명서', vi:'Giấy xác nhận còn học & bảng điểm' },
  { id:'등록금납입증명', icon:'💳', ko:'등록금 납입증명서 또는 장학금 수혜증명서', vi:'Xác nhận nộp học phí hoặc hưởng học bổng' },
  { id:'재정능력증명', icon:'💰', ko:'재정능력 증명서 (은행 잔고증명)', vi:'Chứng minh khả năng tài chính' },
  { id:'구직계획서', icon:'📝', ko:'구직활동 계획서', vi:'Kế hoạch tìm việc làm' },
  { id:'구직점수표', icon:'📊', ko:'구직비자 점수표 및 증빙 서류', vi:'Bảng điểm D-10 và tài liệu chứng minh' },
  { id:'인턴십계약', icon:'🤝', ko:'국내 기업 인턴십 계약서 및 교수 추천서', vi:'Hợp đồng thực tập & thư từ giáo sư' },

  // ── 학위·경력 ──
  { id:'학위증명서', icon:'🎓', ko:'최종 학위증명서 (졸업증명서)', vi:'Bằng cấp và chứng minh tốt nghiệp' },
  { id:'경력증명서', icon:'📜', ko:'경력증명서 (아포스티유/영사확인)', vi:'Chứng minh kinh nghiệm làm việc' },

  // ── E-7-1 특화 ──
  { id:'고용사유서', icon:'📝', ko:'고용사유서 (외국인 전문 인력 채용 필요성)', vi:'Lý do tuyển dụng lao động nước ngoài' },
  { id:'법인등기부등본', icon:'🏢', ko:'법인등기부등본', vi:'Bản khai tờ khai pháp nhân' },
  { id:'회사인프라증빙', icon:'🏭', ko:'회사 인프라 증빙 (사업자등록증·부가가치세)', vi:'Chứng minh cơ sở hạ tầng công ty' },
  { id:'주무부처추천', icon:'🏛️', ko:'주무부처 고용추천서', vi:'Thư giới thiệu từ bộ chính phủ' },

  // ── E-7-4 특화 ──
  { id:'고용주추천서', icon:'✍️', ko:'고용주 추천서 양식', vi:'Thư giới thiệu của chủ' },
  { id:'재직확인서', icon:'💼', ko:'재직확인서 (표준양식)', vi:'Xác nhận làm việc' },
  { id:'임금대장', icon:'💰', ko:'임금대장 양식 (세후 기준)', vi:'Bảng lương (theo lương sau thuế)' },
  { id:'부가가치세', icon:'📊', ko:'부가가치세 과세표준증명원', vi:'Chứng minh tiêu chuẩn thuế VAT' },
  { id:'소득세', icon:'📋', ko:'소득세 납부확인서', vi:'Xác nhận nộp thuế thu nhập' },
  { id:'소득금액증명원', icon:'📊', ko:'소득금액증명원 (최근 2년 연평균)', vi:'Chứng minh thu nhập bình quân' },
  { id:'원천징수신고', icon:'📑', ko:'원천징수이행상황신고서', vi:'Biểu kê nộp thuế' },

  // ── 언어·자격 ──
  { id:'TOPIK', icon:'🇰🇷', ko:'TOPIK 성적표 (2급 이상)', vi:'Chứng chỉ TOPIK' },
  { id:'KIIP', icon:'🎓', ko:'KIIP 이수증 (2단계 이상)', vi:'Chứng chỉ KIIP' },

  // ── 신원·보증 ──
  { id:'신원보증서', icon:'✍️', ko:'신원보증서 (법정 양식)', vi:'Giấy bảo lãnh nhân thân' },
  { id:'신용정보조회', icon:'📊', ko:'신용정보조회서 (전국은행연합회)', vi:'Báo cáo thông tin tín dụng' },

  // ── 세금·보험 ──
  { id:'세금완납증명', icon:'✅', ko:'세금·보험료 완납증명', vi:'Chứng minh nộp đủ thuế & bảo hiểm' },

  // ── D-8/D-9 특화 ──
  { id:'투자기업등록증', icon:'📜', ko:'투자기업등록증 (D-8)', vi:'Giấy đăng ký doanh nghiệp đầu tư' },
  { id:'무역업고유번호증', icon:'📜', ko:'무역업고유번호증 (D-9)', vi:'Số hiệu kinh doanh xuất nhập khẩu' },
  { id:'외화매입증명', icon:'💵', ko:'외화매입증명서 및 환전증명서', vi:'Chứng minh mua ngoại tệ' },
  { id:'기업매출증빙', icon:'📈', ko:'기업 매출 증빙 (수출입 실적)', vi:'Chứng minh doanh thu xuất nhập khẩu' },

  // ── F-2-7/F-5/F-6 특화 ──
  { id:'혼인증명서', icon:'💒', ko:'혼인증명서 (공증)', vi:'Giấy chứng thực hôn nhân' },
  { id:'혼인관계증명서', icon:'💒', ko:'혼인관계증명서 (상세)', vi:'Chứng thực hôn nhân chi tiết' },
  { id:'가족관계증명서', icon:'👨‍👩‍👧‍👦', ko:'가족관계증명서 (상세)', vi:'Chứng minh quan hệ gia đình' },
  { id:'기본증명서', icon:'📋', ko:'기본증명서 (상세)', vi:'Chứng minh cơ bản' },
  { id:'주민등록등본', icon:'📄', ko:'주민등록등본', vi:'Sổ hộ khẩu' },
  { id:'범죄경력증명', icon:'✅', ko:'해외 범죄경력증명서 (아포스티유)', vi:'Chứng minh không có hình sự' },
];

// ── 비자별 필수 서류 ──
const REQUIRED_DOCS_BY_VISA_FINAL = {
  e9: ['통합신청서', '여권', '외국인등록증', '고용허가서', '사업자등록증', '고용주신분증', '고용보험가입명부', '기숙사확인서'],
  d2: ['통합신청서', '여권', '외국인등록증', '재학증명서', '등록금납입증명', '재정능력증명', '기숙사확인서'],
  d10: ['통합신청서', '여권', '외국인등록증', '학위증명서', '구직계획서', '구직점수표', '재정능력증명'],
  e71: ['통합신청서', '여권', '외국인등록증', '고용사유서', '취업계약서', '학위증명서', '회사인프라증빙', '고용보험가입명부', '신원보증서'],
  d8: ['통합신청서', '여권', '외국인등록증', '투자기업등록증', '외화매입증명', '법인등기부등본', '회사인프라증빙'],
  d9: ['통합신청서', '여권', '외국인등록증', '무역업고유번호증', '외화매입증명', '법인등기부등본', '회사인프라증빙', '기업매출증빙'],

  e74: ['통합신청서', '여권', '외국인등록증', '고용사유서', '고용주추천서', '재직확인서', '임금대장', '부가가치세', '소득세', '소득금액증명원', '원천징수신고', 'TOPIK', 'KIIP', '신원보증서', '세금완납증명'],

  f27: ['여권', '외국인등록증', '재정능력증명', '학위증명서', '구직점수표'],
  f27_e71: ['여권', '외국인등록증', '재정능력증명', '학위증명서', '구직점수표'],

  f5: ['여권', '외국인등록증'],
  f5_veteran: ['여권', '외국인등록증'],
  f5_marriage: ['여권', '외국인등록증', '혼인관계증명서', '가족관계증명서', '기본증명서', '주민등록등본', '범죄경력증명'],

  f6: ['혼인증명서', '여권', '외국인등록증', '신원보증서'],
};

// ── 비자별 권장·가산점 서류 ──
const ADDITIONAL_DOCS_BY_VISA_FINAL = {
  e9: ['TOPIK', 'KIIP'],
  d2: ['TOPIK'],
  d10: ['인턴십계약'],
  e71: ['주무부처추천'],
  d8: ['세금완납증명'],
  d9: ['세금완납증명'],

  e74: [],

  f27: [],
  f27_e71: [],

  f5: [],
  f5_veteran: [],
  f5_marriage: [],

  f6: [],
};

console.log('✅ 비자 서류 데이터셋 로드 완료!');
