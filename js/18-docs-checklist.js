
/* ================================================================
   페이지: 필수 서류 준비 (비자별 맞춤)
================================================================ */
function DocsChecklistPage({ visaStep, onBack, lang }) {
  // F-2-7 from D-8 docs page
  if (visaStep === 'f27_d8') {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title={lang==='vi' ? '📋 Danh sách hồ sơ cần thiết' : '📋 필수 서류 준비'} onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-4">
            <p className="text-xs text-gray-600 word-keep leading-relaxed">{lang==='vi' ? 'Vì gốc của bạn là visa đầu tư D-8, Cục Xuất nhập cảnh sẽ yêu cầu cả giấy tờ cá nhân chứng minh điểm số lẫn giấy tờ chứng minh doanh nghiệp của bạn đang hoạt động hợp pháp:' : 'D-8 기업투자 비자 소유자로서 개인 점수 및 기업 실태 증명 서류 필요'}</p>
          </div>
          {[
            { title: lang==='vi' ? '📂 Giấy tờ cá nhân (Chứng minh điểm số F-2-7)' : '📂 개인 신청 서류 (점수 증명용)', items: [
              { ko: '통합신청서 + 여권 + 외국인등록증(ARC) 원본', vi: 'Đơn xin chuyển đổi visa, Hộ chiếu, Thẻ đăng ký người nước ngoài (ARC) gốc.' },
              { ko: '점수표 (자신의 점수 정확히 계산)', vi: 'Bảng tính điểm F-2-7 tự khai (theo mẫu).' },
              { ko: '학위증명서 (해외 학위는 영사 인증 또는 아포스티유 필수)', vi: 'Bằng tốt nghiệp Đại học/Thạc sĩ/Tiến sĩ (nếu bằng nước ngoài phải hợp pháp hóa lãnh sự hoặc có chứng nhận Apostille).' },
              { ko: '한국어 능력 증명 (TOPIK 또는 KIIP 수료증)', vi: 'Chứng chỉ tiếng Hàn (TOPIK) hoặc Giấy chứng nhận hoàn thành chương trình Hội nhập xã hội (KIIP).' },
              { ko: '소득금액증명원 (국세청 발급 - 최근 연도)', vi: 'Giấy chứng nhận thu nhập (소득금액증명원) của bạn do Cục thuế cấp cho năm gần nhất.' },
              { ko: '범죄경력증명서 (베트남 발급, 영사 인증 완료)', vi: 'Lý lịch tư pháp số 2 từ Việt Nam (đã hợp pháp hóa lãnh sự).' },
            ] },
            { title: lang==='vi' ? '📂 Giấy tờ doanh nghiệp D-8 (Chứng minh tư cách gốc)' : '📂 기업 실태 증명 서류 (D-8 자격 유지 증명용)', items: [
              { ko: '사업자등록증 (사업자번호 및 등록 상태 확인)', vi: 'Giấy đăng ký kinh doanh của công ty (사업자등록증).' },
              { ko: '외국인투자기업등록증 (D-8 기업임을 증명)', vi: 'Giấy chứng nhận doanh nghiệp đầu tư nước ngoài (외국인투자기업등록증).' },
              { ko: '최근 회계감사보고서 또는 재무제표 (회사 실제 운영 증명)', vi: 'Báo cáo tài chính, chứng từ nộp thuế của công ty năm gần nhất (để chứng minh công ty hoạt động thật, không phải công ty "ma" thành lập để mua visa).' },
              { ko: '사무실 임차계약서 (영업 장소 확인)', vi: 'Hợp đồng thuê văn phòng công ty.' },
            ] }
          ].map((sec, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-sm overflow-hidden mb-3 fade-in`}>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-black text-gray-800">{sec.title}</p>
              </div>
              <div className="p-4 space-y-2">
                {sec.items.map((item, j) => (
                  <div key={j} className="flex gap-3">
                    <span className="text-lg flex-shrink-0">[ ]</span>
                    <p className="text-sm text-gray-700 word-keep leading-relaxed">{lang==='vi' ? item.vi : item.ko}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // D-9 docs page
  if (visaStep === 'd9') {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title={lang==='vi' ? '📋 Danh sách hồ sơ cần thiết' : '📋 필수 서류 준비'} onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          {[
            { title: lang==='vi' ? '📂 Giấy tờ cá nhân' : '📂 개인 서류', items: [
              { ko: '통합신청서 (비자 신청서 양식) + 여권 + 외국인등록증(ARC) 사본 (있는 경우)', vi: 'Đơn xin cấp visa (theo mẫu), Hộ chiếu, Thẻ đăng ký người nước ngoài (ARC) nếu có.' },
              { ko: '증명사진 1장 (3.5cm x 4.5cm 흰색 배경)', vi: '1 Ảnh thẻ nền trắng (3.5cm x 4.5cm).' },
              { ko: '학위증명서 + 자력경력서(CV) - 무역 경험 증명', vi: 'Giấy tờ chứng minh học vấn, lý lịch trích ngang (CV) chứng minh kinh nghiệm làm thương mại.' },
              { ko: '범죄경력증명서 (베트남 발급, 영사 인증 완료)', vi: 'Lý lịch tư pháp số 2 (Việt Nam) đã hợp pháp hóa lãnh sự.' },
            ] },
            { title: lang==='vi' ? '📂 Giấy tờ chứng minh nguồn vốn đầu tư (Cực kỳ quan trọng)' : '📂 투자 자금 증명 (매우 중요)', items: [
              { ko: '자금 출처 상세 설명 (100 triệu KRW가 청정 자금임을 입증)', vi: 'Báo cáo chi tiết về nguồn gốc dòng vốn (chứng minh số tiền 100 triệu KRW là tiền sạch, hợp pháp).' },
              { ko: '국제 송금 확인서 (베트남에서 한국으로 송금한 증명)', vi: 'Giấy chứng nhận chuyển tiền quốc tế từ Việt Nam sang Hàn Quốc (외화매입증명서).' },
              { ko: '외국인 투자 신고서', vi: 'Thông báo khai báo đầu tư nước ngoài.' },
            ] },
            { title: lang==='vi' ? '📂 Giấy tờ doanh nghiệp tại Hàn Quốc' : '📂 한국 내 사업 관련 서류', items: [
              { ko: '사업자등록증 + 법인등기부등본 (법인인 경우)', vi: 'Giấy đăng ký kinh doanh của công ty (사업자등록증).' },
              { ko: '외국인투자기업등록증', vi: 'Giấy chứng nhận doanh nghiệp đầu tư nước ngoài (외국인투자기업등록증).' },
              { ko: '최근 회계감사보고서 또는 재무제표 (회사 실제 운영 증명)', vi: 'Báo cáo tài chính, chứng từ nộp thuế của công ty năm gần nhất (để chứng minh công ty hoạt động thật, không phải công ty "ma" thành lập để mua visa).' },
              { ko: '사무실 임차계약서 (반드시 상업용 사무실, 주거용 불가)', vi: 'Hợp đồng thuê văn phòng công ty.' },
            ] }
          ].map((sec, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-sm overflow-hidden mb-3 fade-in`}>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-black text-gray-800">{sec.title}</p>
              </div>
              <div className="p-4 space-y-2">
                {sec.items.map((item, j) => (
                  <div key={j} className="flex gap-3">
                    <span className="text-lg flex-shrink-0">[ ]</span>
                    <p className="text-sm text-gray-700 word-keep leading-relaxed">{lang==='vi' ? item.vi : item.ko}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // D-8 docs page
  if (visaStep === 'd8') {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title="📋 Hồ sơ xin D-8" onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-4">
            <p className="text-xs text-gray-600 word-keep leading-relaxed">Hồ sơ xin visa D-8 được chia làm 3 nhóm chứng minh riêng biệt theo hạng mục:</p>
          </div>
          {[
            { title: '📂 1. Hồ sơ pháp nhân và cơ sở kinh doanh tại Hàn Quốc', items: ['Giấy đăng ký kinh doanh (사업자등록증): Do Cục Thuế Hàn Quốc cấp.', 'Giấy chứng nhận đăng ký pháp nhân (법인등기부등본): Nếu bạn thành lập công ty theo mô hình Tập đoàn/Công ty cổ phần/TNHH (법인).', 'Giấy chứng nhận doanh nghiệp đầu tư nước ngoài (외국인투자기업등록증): Đây là giấy tờ đặc chủng do ngân hàng hoặc cơ quan KOTRA cấp sau khi dòng tiền đầu tư của bạn được xác nhận hợp lệ.', 'Danh sách cổ đông (주주명부): Chứng minh bạn nắm giữ ≥10% cổ phần công ty.', 'Hợp đồng thuê văn phòng/mặt bằng kinh doanh: Phải đứng tên công ty/pháp nhân.', 'Hình ảnh thực tế: Ảnh chụp toàn cảnh mặt tiền (có biển hiệu công ty), không gian làm việc bên trong, máy móc thiết bị.'] },
            { title: '📂 2. Hồ sơ chứng minh dòng tiền "Sạch" (Trọng tâm xét duyệt)', items: ['Giấy báo có của ngân hàng tại Hàn Quốc: Xác nhận đã nhận tiền từ nước ngoài chuyển về dưới dạng "Vốn đầu tư trực tiếp nước ngoài" (FDI).', 'Giấy xác nhận hoán đổi ngoại tệ (외환매입증명서): Chứng từ ngân hàng chuyển đổi tiền USD hoặc ngoại tệ khác sang tiền Won (KRW).', 'Chứng từ từ phía Việt Nam: Sao kê tài khoản ngân hàng chuyển tiền đi, tờ khai hải quan (nếu mang tiền mặt qua sân bay hợp pháp).'] },
            { title: '📂 3. Hồ sơ cá nhân của nhà đầu tư', items: ['Đơn xin cấp visa tổng hợp (통합신청서) kèm ảnh thẻ nền trắng 3.5cm x 4.5cm.', 'Hộ chiếu gốc và Thẻ ARC hiện tại (nếu có).', 'Bản kế hoạch kinh doanh (사업계획서): Bản thuyết minh bằng tiếng Hàn chi tiết về lộ trình kinh doanh, dự toán thu chi, phương án marketing và kế hoạch nhân sự.', 'Phiếu lý lịch tư pháp số 2: Được dịch thuật công chứng tiếng Hàn và Hợp pháp hóa lãnh sự tại Đại sứ quán.'] }
          ].map((sec, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-sm overflow-hidden mb-3 fade-in`}>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-black text-gray-800">{sec.title}</p>
              </div>
              <div className="p-4 space-y-2">
                {sec.items.map((item, j) => (
                  <div key={j} className="flex gap-3">
                    <span className="text-lg flex-shrink-0">[ ]</span>
                    <p className="text-sm text-gray-700 word-keep leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // F-5-2 Naturalization docs page
  if (visaStep === 'f5_marriage_naturalization') {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title="📋 Hồ sơ nhập tịch từ F-5-2" onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-4">
            <p className="text-xs text-gray-600 word-keep leading-relaxed">F-5-2 từ nhập tịch kết hôn (혼인귀화) được chuẩn bị theo 3 nhóm tài liệu chính. Lưu ý: Bạn đã chứng minh tài chính khi xin F-5-2 nên diện này chỉ cần 30 triệu won tài sản đơn giản hơn:</p>
          </div>
          {[
            { title: '📂 A. Hồ sơ phía Bạn (Người nộp đơn)', items: ['Đơn xin nhập quốc tịch (귀화허가신청서): Điền theo mẫu của Bộ Tư pháp, dán kèm 1 ảnh thẻ nền trắng (3.5cm x 4.5cm).', 'Hộ chiếu Việt Nam (Bản gốc): Còn hạn.', 'Thẻ cư trú vĩnh viễn F-5-2 (Bản gốc).', 'Bằng chứng nhận đỗ kỳ thi tổng hợp KIIP Lớp 5 (귀화용/영주용): Lưu ý: Nếu đã thi Nhập tịch (귀화용) và đạt ≥60/100, chỉ cần nộp bằng cũ. Nếu chỉ thi Vĩnh trú (영주용), phải đăng ký thi bổ sung.', 'Phiếu Lý lịch tư pháp số 2 (Bản gốc từ Việt Nam): Cấp trong 3 tháng gần nhất, dịch thuật & hợp pháp hóa lãnh sự đầy đủ.'] },
            { title: '📂 B. Hồ sơ phía Chồng Hàn Quốc (Chi tiết - 상세)', items: ['Giấy chứng nhận quan hệ hôn nhân chi tiết (혼인관계증명서 - 상세).', 'Giấy chứng nhận quan hệ gia đình chi tiết (가족관계증명서 - 상세).', 'Bản sao Hộ khẩu gia đình (주민등록등본) chứng minh hai vợ chồng cùng chung hộ khẩu.', 'Bản sao Căn cước công dân của chồng.', 'Nếu có con chung: Nộp thêm Giấy chứng nhận quan hệ gia đình và căn cước/khai sinh của con để ưu tiên duyệt nhanh.'] },
            { title: '📂 C. Hồ sơ Năng lực Tài chính (Đơn giản hơn F-5)', items: ['Vì bạn đã chứng minh 100% GNI để đạt F-5-2, lúc này chỉ cần chứng minh ≥30 triệu won:', 'Hợp đồng thuê nhà (Jeonse/Wolse) hoặc Giấy chứng nhận sở hữu nhà đất đứng tên vợ/chồng.', 'Giấy xác nhận số dư tài khoản ngân hàng hoặc sổ tiết kiệm liên tục ≥30 triệu won.', 'Giấy chứng nhận việc làm (재직증명서) & Giấy chứng nhận thu nhập thuế (소득금액증명원).'] },
            { title: '⚠️ Lưu ý quan trọng', items: ['Lệ phí: 300.000 KRW/hồ sơ', 'Tuyệt đối không nợ thuế: Cục quét hệ thống thuế kỹ. Nợ dù 1 khoản nhỏ = bị trượt.', 'Giữ F-5-2: Trong quá trình chờ kết quả, vẫn là F-5-2 nên phải tuân thủ quy tắc 2 năm xuất nhập cảnh. Nếu ở nước ngoài quá 2 năm, F-5-2 và hồ sơ nhập tịch đều bị hủy.'], isDanger: true }
          ].map((sec, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-sm overflow-hidden mb-3 fade-in ${sec.isDanger ? 'border-l-4 border-red-600' : ''}`}>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-black text-gray-800">{sec.title}</p>
              </div>
              <div className="p-4 space-y-2">
                {sec.items.map((item, j) => (
                  <div key={j} className="flex gap-3">
                    <span className="text-lg flex-shrink-0">[ ]</span>
                    <p className="text-sm text-gray-700 word-keep leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Naturalization docs page
  if (visaStep === 'naturalization') {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title="📋 Hồ sơ nhập tịch Hàn Quốc" onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-4">
            <p className="text-xs text-gray-600 word-keep leading-relaxed">Để chuẩn bị hồ sơ nhập tịch Hàn Quốc, đối với diện Nhập tịch đơn giản (간이귀화) dành cho cô dâu cư trú theo diện Hôn nhân kết hôn (Visa F-6), bộ hồ sơ chuẩn chỉnh và đầy đủ nhất bao gồm các đầu mục giấy tờ được chia làm 3 nhóm chính dưới đây:</p>
          </div>
          {[
            { title: '📂 1. Hồ sơ phía Bạn (Người nước ngoài chuẩn bị)', items: ['Đơn xin nhập quốc tịch (귀화허가신청서): Điền đầy đủ thông tin theo mẫu, dán kèm 1 ảnh thẻ nền trắng (3.5cm x 4.5cm, chụp trong 6 tháng gần nhất)', 'Hộ chiếu Việt Nam (Bản gốc): Còn thời hạn lưu trú hợp pháp', 'Thẻ đăng ký người nước ngoài (ARC gốc): Diện visa F-6 còn hạn', 'Phiếu Lý lịch tư pháp số 2 (Bản gốc từ Việt Nam): Xác nhận không có tiền án, bắt buộc dịch thuật công chứng tiếng Hàn', 'Bằng chứng nhận đỗ kỳ thi tổng hợp KIIP Lớp 5 (귀화용 종합평가 합격증): Giấy chứng nhận ≥60/100 điểm để được miễn kỳ thi viết'] },
            { title: '📂 2. Hồ sơ phía Chồng Hàn Quốc (Người bảo lãnh chuẩn bị)', items: ['Giấy chứng nhận quan hệ hôn nhân chi tiết (혼인관계증명서 - 상세): Thể hiện rõ lịch sử kết hôn', 'Giấy chứng nhận quan hệ gia đình chi tiết (가족관계증명서 - 상세): Liệt kê các thành viên gia đình', 'Bản sao Hộ khẩu gia đình (주민등록등본): Chứng minh thực sự sống chung', 'Bản sao Căn cước công dân của chồng (주민등록증 사본)', 'Nếu có con chung: Giấy chứng nhận quan hệ gia đình của con và bản sao căn cước/khai sinh để hồ sơ được ưu tiên xét duyệt'] },
            { title: '📂 3. Hồ sơ Chứng minh năng lực Kinh tế (Tài chính)', items: ['Phương án bất động sản: Bản sao Hợp đồng thuê nhà (Jeonse/Wolse) ≥30 triệu won HOẶC Giấy chứng nhận quyền sở hữu bất động sản', 'Phương án tài chính: Giấy xác nhận số dư tài khoản ngân hàng (잔액증명서) liên tục ≥30 triệu won', 'Phương án công việc: Giấy chứng nhận việc làm (재직증명서) + Giấy chứng nhận thu nhập thuế (소득금액증명원) để chứng minh có nguồn thu nhập ổn định'] },
            { title: '⚠️ 3 Lưu ý quan trọng khi nộp hồ sơ', items: ['Lệ phí nộp hồ sơ: 300.000 KRW/hồ sơ (nộp bằng tem phiếu tại Cục)', 'Kiểm tra kỹ nợ thuế: Cục sẽ quét hệ thống thuế ngay khi tiếp nhận. Hai vợ chồng tuyệt đối không được nợ bất kỳ khoản thuế nào, nếu không hồ sơ sẽ bị từ chối ngay', 'Duy trì visa gốc: Thời gian chờ xét duyệt có thể kéo dài vài tháng đến >1 năm. Phải gia hạn Visa F-6 khi gần hết hạn để duy trì tư cách cư trú hợp pháp'], isDanger: true }
          ].map((sec, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-sm overflow-hidden mb-3 fade-in ${sec.isDanger ? 'border-l-4 border-red-600' : ''}`}>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-black text-gray-800">{sec.title}</p>
              </div>
              <div className="p-4 space-y-2">
                {sec.items.map((item, j) => (
                  <div key={j} className="flex gap-3">
                    <span className="text-lg flex-shrink-0">[ ]</span>
                    <p className="text-sm text-gray-700 word-keep leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const [checkedDocs, setCheckedDocs] = useState({});

  const requiredIds = REQUIRED_DOCS_BY_VISA[visaStep] || [];
  const additionalIds = ADDITIONAL_DOCS_BY_VISA[visaStep] || [];

  const requiredDocs = requiredIds.map(id => DOCS.find(d => d.id === id)).filter(Boolean);
  const additionalDocs = additionalIds.map(id => DOCS.find(d => d.id === id)).filter(Boolean);

  const handleToggle = (id) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const DocCard = ({ doc, idx, isAdditional }) => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden fade-in">
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-lg font-black text-gray-600 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">{idx + 1}</span>
          <p className="text-sm font-black text-gray-800">{lang==='vi' ? doc.vi_name : doc.name}</p>
          {isAdditional && <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">권장</span>}
        </div>
        {(doc.desc || doc.vi_desc) && (
          <p className="text-xs text-gray-500 word-keep pl-8">{lang==='vi' ? doc.vi_desc : doc.desc}</p>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ background:'#F0F2F5' }} className="min-h-screen">
      <BackHeader title={lang==='vi' ? '📋 Danh sách hồ sơ cần thiết' : '📋 필수 서류 준비'} onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-4 pb-12">

        {/* D-10, E-7-1, E-7-4, F-2-7, F-5, F-6 특별 처리: 변경/연장 섹션 */}
        {(visaStep === 'd10' || visaStep === 'e71' || visaStep === 'e74' || visaStep === 'f27' || visaStep === 'f27_e71' || visaStep === 'f5' || visaStep === 'f5_veteran' || visaStep === 'f5_marriage' || visaStep === 'f6' || visaStep === 'f299') && VISA_GUIDE_DATA[visaStep]?.docs && (
          <>
            {/* F-6, F-5-2: 섹션 기반 문서 */}
            {(visaStep === 'f6' || visaStep === 'f5_marriage') && VISA_GUIDE_DATA[visaStep].docs.change_sections && (
              <div className="space-y-4">
                {VISA_GUIDE_DATA[visaStep].docs.change_sections.map((section, idx) => (
                  <div key={idx} className="mb-5">
                    <div className="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 mb-3 rounded-sm">
                      <p className="text-sm font-black text-blue-700">{lang==='vi' ? section.title.vi : section.title.ko}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-4">
                      <p className="text-sm text-gray-700 word-keep leading-relaxed whitespace-pre-wrap">{lang==='vi' ? section.content.vi : section.content.ko}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 다른 비자: 기존 방식 */}
            {visaStep !== 'f6' && VISA_GUIDE_DATA[visaStep].docs.change && (
              <div className="mb-6">
                <div className="px-3 py-2 bg-green-50 border-l-4 border-green-600 mb-3 rounded-sm">
                  <p className="text-sm font-black text-green-700">🔄 {lang==='vi' ? (visaStep === 'd10' ? 'Đổi visa (D-2 → D-10)' : visaStep === 'e71' ? 'Đổi visa (D-10 → E-7-1)' : visaStep === 'e74' ? 'Đổi visa (E-9 → E-7-4)' : visaStep.startsWith('f5') ? 'Cấp thẻ vĩnh trú (F-5)' : 'Đổi visa sang F-2-7') : (visaStep === 'd10' ? '비자 변경 (D-2 → D-10)' : visaStep === 'e71' ? '비자 변경 (D-10 → E-7-1)' : visaStep === 'e74' ? 'E-7-4 비자 변경' : visaStep.startsWith('f5') ? 'F-5 영주권 신청' : 'F-2-7 비자 변경')} ({VISA_GUIDE_DATA[visaStep].docs.change.length})</p>
                </div>
                <div className="space-y-2">
                  {VISA_GUIDE_DATA[visaStep].docs.change.map((doc, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden fade-in">
                      <div className="px-4 py-3">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-lg font-black text-gray-600 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                          <p className="text-sm font-black text-gray-800">{lang==='vi' ? doc.vi : doc.ko}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 비자 연장 */}
            {VISA_GUIDE_DATA[visaStep].docs.extension && (
              <div className="mb-6">
                <div className="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 mb-3 rounded-sm">
                  <p className="text-sm font-black text-blue-700">🔁 {lang==='vi' ? (visaStep === 'd10' ? 'Gia hạn visa (D-10)' : visaStep === 'e71' ? 'Gia hạn visa (E-7-1)' : visaStep === 'e74' ? 'Gia hạn visa (E-7-4)' : visaStep.startsWith('f5') ? 'Gia hạn thẻ vĩnh trú (F-5)' : 'Gia hạn visa F-2-7') : (visaStep === 'd10' ? '비자 연장 (D-10)' : visaStep === 'e71' ? '비자 연장 (E-7-1)' : visaStep === 'e74' ? 'E-7-4 비자 연장' : visaStep.startsWith('f5') ? 'F-5 영주증 갱신' : 'F-2-7 비자 연장')} ({VISA_GUIDE_DATA[visaStep].docs.extension.length})</p>
                </div>
                <div className="space-y-2">
                  {VISA_GUIDE_DATA[visaStep].docs.extension.map((doc, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden fade-in">
                      <div className="px-4 py-3">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-lg font-black text-gray-600 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                          <p className="text-sm font-black text-gray-800">{lang==='vi' ? doc.vi : doc.ko}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* E-9 특별 설명 */}
        {visaStep === 'e9' && VISA_GUIDE_DATA['e9']?.docs?.description && (
          <div className="mb-6 px-6 py-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-lg">
            <p className="text-base text-gray-800 word-keep leading-relaxed font-medium">{lang==='vi' ? VISA_GUIDE_DATA['e9'].docs.description.vi : VISA_GUIDE_DATA['e9'].docs.description.ko}</p>
          </div>
        )}

        {/* 다른 비자: 기존 방식 */}
        {visaStep !== 'd10' && visaStep !== 'e71' && visaStep !== 'e74' && visaStep !== 'f27' && visaStep !== 'f27_e71' && visaStep !== 'f5' && visaStep !== 'f5_veteran' && visaStep !== 'f5_marriage' && visaStep !== 'e9' && visaStep !== 'f299' && (
          <>
            {/* ── 필수 서류 섹션 ── */}
            {requiredDocs.length > 0 && (
              <div className="mb-6">
                <div className="px-3 py-2 bg-red-50 border-l-4 border-red-600 mb-3 rounded-sm">
                  <p className="text-sm font-black text-red-700">🔴 {lang==='vi' ? 'Danh sách hồ sơ cần thiết' : '필수 서류 준비'} ({requiredDocs.length})</p>
                </div>
                <div className="space-y-2">
                  {requiredDocs.map((doc, idx) => <DocCard key={idx} doc={doc} idx={idx} isAdditional={false} />)}
                </div>
              </div>
            )}

            {/* ── 권장 서류 섹션 ── */}
            {additionalDocs.length > 0 && (
              <div className="mb-6">
                <div className="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 mb-3 rounded-sm">
                  <p className="text-sm font-black text-blue-700">🔵 {lang==='vi' ? 'Danh sách hồ sơ được khuyến cáo' : '권장 서류 준비'} ({additionalDocs.length})</p>
                </div>
                <div className="space-y-2">
                  {additionalDocs.map((doc, idx) => <DocCard key={idx} doc={doc} idx={idx} isAdditional={true} />)}
                </div>
              </div>
            )}

            {/* 비어있는 경우 */}
            {requiredDocs.length === 0 && additionalDocs.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400">
                {lang==='vi' ? 'Không cần hồ sơ' : '서류가 필요하지 않습니다'}
              </div>
            )}
          </>
        )}

        {/* 안내 메시지 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mt-6 fade-in">
          <p className="text-xs text-amber-700 word-keep">
            {lang==='vi'
              ? '⚠️ Mỗi Cục XNC có thể yêu cầu thêm hồ sơ. Hãy gọi điện xác nhận trước khi đến.'
              : '⚠️ 관할 출입국마다 추가 서류를 요구할 수 있습니다. 방문 전 반드시 전화로 확인하세요.'}
          </p>
        </div>

      </div>
    </div>
  );
}
