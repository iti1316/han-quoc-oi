
/* ================================================================
   페이지: F-6 심사 기준 (소득 기준표 포함)
================================================================ */
function AssessmentCriteriaPage({ assessmentParam, onBack, lang }) {
  // F-5-2 Naturalization Assessment
  if (!assessmentParam || assessmentParam === null) {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title={lang==='vi' ? '📋 Điều kiện thẩm định' : '📋 심사 기준'} onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          <div className="space-y-3">
            {[
              { title: lang==='vi' ? 'Hồ sơ xét duyệt dựa trên các tiêu chí "cứng"' : '심사는 "체크리스트" 기준으로 진행됩니다', ko:'심사는 "체크리스트" 기준으로 진행됩니다', vi:'Hồ sơ xét duyệt dựa trên các tiêu chí "cứng"', items: [
                { ko:'시간 요건: 연속 5년 이상 합법 거주 (D-2, D-4 학기는 일반적으로 미포함)', vi:'Thời gian cư trú liên tục: Đã lưu trú hợp pháp tại Hàn Quốc liên tục từ 5 năm trở lên tính đến ngày nộp hồ sơ. (Thời gian du học D-2 hoặc học tiếng D-4 thường không được tính vào thời gian tích lũy này).' },
                { ko:'업무 & 나이: 19세 이상 성인, 안정적인 일자리 보유, 완전히 납세 중', vi:'Điều kiện công việc và tuổi tác: Phải là người thành niên (trên 19 tuổi) và đang có công việc ổn định, đóng thuế đầy đủ tại Hàn Quốc.' },
                { ko:'소득: 전년도 총 소득 ≥ GNI 수준 (국세청 소득금액증명원 기준)', vi:'Năng lực kinh tế - Thu nhập: Tổng thu nhập của năm gần nhất (thể hiện trên Giấy chứng nhận thu nhập của Cục Thuế) phải đạt bằng hoặc cao hơn mức GNI (Thu nhập quốc dân bình quân đầu người) của Hàn Quốc.' },
                { ko:'자산: 부양인/동반 가족은 은행 잔액 및 전세금 최소 3천만 KRW 이상', vi:'Năng lực kinh tế - Tài sản: Người phụ thuộc (vợ/chồng ăn theo) cần chứng minh gia đình có tài sản tích lũy (số dư tài khoản ngân hàng, hợp đồng nhà Jeonse/Wolse) tối thiểu theo quy định của Bộ Tư pháp (thường từ 30 triệu KRW trở lên).' },
                { ko:'언어: TOPIK 4급 이상 또는 KIIP 4단계 이상 수료', vi:'Năng lực ngôn ngữ và hòa nhập: Đạt chứng chỉ TOPIK cấp 4 trở lên hoặc hoàn thành Chương trình Hội nhập Xã hội (KIIP) từ Lớp 4 trở lên.' },
                { ko:'품행: 출입국법 중대 위반 없음, 전과 없음', vi:'Tư cách phẩm chất: Không vi phạm nghiêm trọng Luật quản lý xuất nhập cảnh và không có tiền án tiền sự nghiêm trọng.' }
              ]}
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                  <p className="text-sm font-black text-blue-700">{lang==='vi' ? section.title : section.ko}</p>
                </div>
                <div className="p-4 space-y-2">
                  {section.items.map((item, j) => (
                    <p key={j} className="text-sm text-gray-700 word-keep leading-relaxed">• {lang==='vi' ? item.vi : item.ko}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // F-2-7 Assessment (f27_e71)
  if (assessmentParam === 'f27_e71') {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title={lang==='vi' ? '📋 ĐIỀU KIỆN ĐỂ ĐỔI VISA F-2-7' : '📋 F-2-7 심사 기준'} onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          <div className="space-y-3">
            {[
              { title: lang==='vi' ? 'Thuộc đối tượng áp dụng:' : '대상 조건:', ko:'대상 조건:', vi:'Thuộc đối tượng áp dụng:', items: [
                { ko:'✅ 현재 E-1~E-7-1, D-5~D-9 비자로 한국에 합법 거주 중: 3년 이상 연속 거주', vi:'✅ Đang giữ visa chuyên gia (E-1 đến E-7-1, D-5 đến D-9) liên tục từ 3 năm trở lên tại Hàn Quốc.' },
                { ko:'✅ 또는 한국 대학원 석사/박사 졸업 후 5년 이내에 전문직(E-1~E-7-1) 취직', vi:'✅ HOẶC: Tốt nghiệp Thạc sĩ/Tiến sĩ tại Hàn Quốc và tìm được công việc chuyên môn (E-1 đến E-7-1) trong vòng 5 năm kể từ ngày tốt nghiệp.' },
                { ko:'⚠️ 예외: 전년도 소득 40,000,000 KRW 이상이면 3년 기다리지 않고 즉시 신청 가능', vi:'⚠️ Ngoại lệ: Nếu thu nhập năm gần nhất đạt từ 40.000.000 KRW trở lên, bạn được MIỄN thời gian chờ 3 năm này và có thể đổi ngay.' }
              ]},
              { title: lang==='vi' ? 'Đạt chuẩn hệ thống tính điểm:' : '점수 기준:', ko:'점수 기준:', vi:'Đạt chuẩn hệ thống tính điểm:', items: [
                { ko:'✅ 최소 170점 만점에 80점 이상 필수', vi:'✅ Đạt tối thiểu 80 điểm trên tổng số 170 điểm' },
                { ko:'포함 항목: 나이, 학력, 한국어(TOPIK/KIIP), 전년도 소득, 가산점/감점', vi:'📋 Gồm các mục: Tuổi tác, Học vị, Tiếng Hàn TOPIK/KIIP, Thu nhập năm gần nhất, và Điểm cộng/Điểm trừ' }
              ]},
              { title: lang==='vi' ? 'Quy trình nộp đơn:' : '신청 절차:', ko:'신청 절차:', vi:'Quy trình nộp đơn:', items: [
                { ko:'Bước 1: 점수표로 자신의 점수 계산 → 80점 이상 확인 + 소득금액증명원 준비', vi:'Bước 1: Tự tính điểm dựa trên bảng điểm chuẩn. Đảm bảo trên 80 điểm và có tờ 소득금액증명원 từ Cục thuế.' },
                { ko:'Bước 2: HiKorea 웹사이트에서 온라인 예약', vi:'Bước 2: Đặt lịch hẹn trên website HiKorea.' },
                { ko:'Bước 3: 자신의 거주지 관할 출입국청에 직접 방문 + 서류 제출', vi:'Bước 3: Nộp hồ sơ tại Cục Xuất nhập cảnh quản lý khu vực cư trú.' },
                { ko:'Bước 4: 심사 기간은 일반적으로 4~6주 소요', vi:'Bước 4: Chờ xét duyệt (thời gian quét hồ sơ F-2-7 khá lâu, thông thường mất từ 4 - 6 tuần).' }
              ]}
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                  <p className="text-sm font-black text-blue-700">{lang==='vi' ? section.title : section.ko}</p>
                </div>
                <div className="p-4 space-y-2">
                  {section.items.map((item, j) => (
                    <p key={j} className="text-sm text-gray-700 word-keep leading-relaxed">{lang==='vi' ? item.vi : item.ko}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // D-9 Assessment
  if (assessmentParam === 'd9') {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title={lang==='vi' ? '📋 Điều kiện thẩm định' : '📋 심사 기준'} onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          <div className="space-y-3">
            {[
              { title: lang==='vi' ? '🔄 Điều kiện chuyển đổi - Diện D-9-1 (Hệ thống tính điểm)' : '🔄 Điều kiện chuyển đổi - Diện D-9-1', ko:'🔄 Điều kiện chuyển đổi - Diện D-9-1', vi:'🔄 Điều kiện chuyển đổi - Diện D-9-1', items: [
                { ko:'D-10과 유사한 점수제 적용: 최소 60/100점 필수', vi:'Áp dụng thang điểm giống D-10, cần đạt tối thiểu 60/100 điểm' },
                { ko:'필수 항목: 최소 10점 이상 필수 (무역교육 이수 시 10점 가산)', vi:'Ở hạng mục bắt buộc phải đạt tối thiểu 10 điểm (hoàn thành lớp học mậu dịch được cộng 10 điểm)' },
                { ko:'사업등록 필수 (사업자등록증 확보)', vi:'Đã đăng ký hoạt động kinh doanh (사업자등록)' },
                { ko:'한국 대학 석사 이상 학위 소유 (또는 졸업 예정)는 가산점/필수 조건 중 하나', vi:'Có bằng Thạc sĩ trở lên tại trường đại học Hàn Quốc (hoặc đang chuẩn bị tốt nghiệp) là một trong các điều kiện cộng điểm/đủ điều kiện' },
                { ko:'D-8과 다른 점: 실제 수출입 실적(무역실적)이 필수 — 단순 세금신고 + 매출증명만으로는 불충분', vi:'Phải có hoạt động xuất khẩu thực tế (무역실적) để duy trì/gia hạn visa — khác với D-8 chỉ cần khai thuế + giấy chứng nhận doanh thu' }
              ]},
              { title: lang==='vi' ? '💰 Điều kiện tài chính' : '💰 Điều kiện tài chính', ko:'💰 Điều kiện tài chính', vi:'💰 Điều kiện tài chính', items: [
                { ko:'투자 자금: 최소 약 100 triệu won (최소 50 triệu won는 해외에서 송금 필수) — 단, D-9-1 점수제는 D-8처럼 100 triệu won 필수가 아님이 장점', vi:'Một số nguồn ghi nhận vốn đầu tư tối thiểu khoảng 100 triệu won, trong đó ít nhất 50 triệu won phải chuyển từ nước ngoài vào — tuy nhiên mức này áp dụng rõ hơn cho D-8/D-9-5; với D9-1 (điểm số) thì không cần vốn đầu tư 100 triệu won như D-8, đây chính là ưu điểm giúp hồ sơ đơn giản hơn.' },
                { ko:'최소 재정 증명: 일부 사례에서 5,000 USD 이상 (경우에 따라 다름) - 생활비 자력 해결 가능성 입증', vi:'Chứng minh tài chính tối thiểu (một số trường hợp ghi nhận từ 5.000 USD trở lên tùy diện) để đảm bảo khả năng tự chi trả sinh hoạt.' }
              ]}
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                  <p className="text-sm font-black text-blue-700">{lang==='vi' ? section.title : section.ko}</p>
                </div>
                <div className="p-4 space-y-2">
                  {section.items.map((item, j) => (
                    <p key={j} className="text-sm text-gray-700 word-keep leading-relaxed">• {lang==='vi' ? item.vi : item.ko}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // F-5-2 Assessment
  if (assessmentParam === 'f5_marriage') {
    return (
      <div style={{ background:'#F0F2F5' }} className="min-h-screen">
        <BackHeader title={lang==='vi' ? '📋 Điều kiện thẩm định' : '📋 심사 기준'} onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 py-4 pb-12">
          <div className="space-y-3">
            {[
              { title: lang==='vi' ? 'a) Thời gian' : 'a) 기간', ko:'a) 기간', vi:'a) Thời gian', items: [
                { ko:'법적 혼인 유지: 최소 2년', vi:'Duy trì hôn nhân hợp pháp với người Hàn tối thiểu 2 năm' },
                { ko:'한국 공동거주: 1년 이상', vi:'Đã sinh sống chung tại Hàn Quốc trên 1 năm' }
              ]},
              { title: lang==='vi' ? 'b) Thu nhập/tài sản' : 'b) 소득/자산', ko:'b) 소득/자산', vi:'b) Thu nhập/tài sản', items: [
                { ko:'생계유지 능력 증명 (근로소득, 사업소득, 임차료, 배당금 모두 인정)', vi:'Cần chứng minh khả năng duy trì kế sinh nhai (thu nhập lao động, kinh doanh, cho thuê bất động sản, cổ tức... đều được tính)' },
                { ko:'자산: 신청 전 6개월 이상 보유, 최소 약 30,000,000 KRW (예금, 적금, 부동산)', vi:'Tài sản (tiền gửi, tiết kiệm, bất động sản) cần sở hữu liên tục ≥6 tháng trước ngày nộp hồ sơ, tối thiểu khoảng 30 triệu won' },
                { ko:'소득 기준 50% 감면 가능: 미성년 자녀 양육 중, 중병/장애, 또는 한국 거주 5년 이상', vi:'Có thể giảm đến 50% tiêu chuẩn thu nhập nếu: đang nuôi con nhỏ, có bệnh nặng/khuyết tật, hoặc đã cư trú tại Hàn trên 5 năm' }
              ]},
              { title: lang==='vi' ? 'c) Tiếng Hàn / Hội nhập xã hội' : 'c) 한국어/사회통합', ko:'c) 한국어/사회통합', vi:'c) Tiếng Hàn / Hội nhập xã hội', items: [
                { ko:'KIIP 5단계 (70시간) 수료 또는 영주용 종합평가 합격', vi:'Hoàn thành lớp 5 (70 giờ) chương trình KIIP, hoặc thi đỗ kỳ thi tổng hợp 영주용종합평가' },
                { ko:'실질적으로 KIIP 완료가 거의 필수이며, 완료 시 소득 기준 완화 등 혜택 제공', vi:'Trên thực tế, việc hoàn thành KIIP gần như là bắt buộc, hoặc mang lại lợi ích lớn như nới lỏng điều kiện thu nhập' }
              ]},
              { title: lang==='vi' ? 'd) Lý lịch' : 'd) 품행', ko:'d) 품행', vi:'d) Lý lịch', items: [
                { ko:'범죄경력 문제 없음, 최근 3년 이내 출입국법 위반 없음', vi:'Không có vấn đề về lý lịch tư pháp, không vi phạm Luật Di trú trong vòng 3 năm gần đây' }
              ]}
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                  <p className="text-sm font-black text-blue-700">{lang==='vi' ? section.title : section.ko}</p>
                </div>
                <div className="p-4 space-y-2">
                  {section.items.map((item, j) => (
                    <p key={j} className="text-sm text-gray-700 word-keep leading-relaxed">• {lang==='vi' ? item.vi : item.ko}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const incomeStandards = [
    { family: 2, amount: '23,595,948' },
    { family: 3, amount: '30,152,118' },
    { family: 4, amount: '36,586,638' },
    { family: 5, amount: '42,649,152' },
    { family: 6, amount: '48,388,830' },
    { family: 7, amount: '53,930,568' },
  ];

  return (
    <div style={{ background:'#F0F2F5' }} className="min-h-screen">
      <BackHeader title={lang==='vi' ? '📋 Điều kiện thẩm định' : '📋 심사 기준'} onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-4 pb-12">

        {/* 주요 기준 */}
        <div className="space-y-3 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-sm font-black text-gray-800 mb-2">✅ {lang==='vi' ? 'Tính chân thực của hôn nhân' : '결혼의 진정성'}</p>
            <p className="text-xs text-gray-600 word-keep">{lang==='vi' ? 'Lịch sử quen biết, ảnh cưới, tin nhắn SNS minh chứng không phải kết hôn giả.' : '연애 기간, 결혼식 사진, SNS 메시지 등으로 가짜 결혼이 아님을 증명합니다.'}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-sm font-black text-gray-800 mb-2">⚖️ {lang==='vi' ? 'Hôn nhân hợp pháp' : '합법적 혼인'}</p>
            <p className="text-xs text-gray-600 word-keep">{lang==='vi' ? 'Đã hoàn thành đăng ký kết hôn theo đúng luật pháp của cả hai nước.' : '양국 법에 따라 정식으로 혼인신고를 완료해야 합니다.'}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-sm font-black text-gray-800 mb-2">🏠 {lang==='vi' ? 'Điều kiện nhà ở' : '주거 조건'}</p>
            <p className="text-xs text-gray-600 word-keep">{lang==='vi' ? 'Người bảo lãnh phải có không gian nhà ở ổn định, đủ cho hai vợ chồng sinh sống (thuộc sở hữu hoặc thuê).' : '보증인이 부부가 함께 생활할 수 있는 안정적인 주거공간을 보유해야 합니다 (소유 또는 임차).'}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-sm font-black text-gray-800 mb-2">🗣️ {lang==='vi' ? 'Khả năng giao tiếp' : '의사소통 능력'}</p>
            <p className="text-xs text-gray-600 word-keep">{lang==='vi' ? 'Người vợ/chồng nước ngoài phải có chứng chỉ TOPIK cấp 1 trở lên, hoàn thành lớp KIIP cấp 2 trở lên, hoặc chứng minh hai người có ngôn ngữ chung (tiếng Anh, tiếng bản địa của bên kia nếu người Hàn đã ở nước đó trên 1 năm).' : '외국인 배우자가 TOPIK 1급 이상, KIIP 2단계 이상 수료증, 또는 공통 언어 증명이 필요합니다 (영어 또는 한국인이 해당 국가에 1년 이상 거주한 경우 해당 언어).'}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-sm font-black text-gray-800 mb-2">🏥 {lang==='vi' ? 'Sức khỏe và Lý lịch tư pháp' : '건강진단 & 범죄경력'}</p>
            <p className="text-xs text-gray-600 word-keep">{lang==='vi' ? 'Cả hai phải cung cấp phiếu khám sức khỏe và lý lịch tư pháp (bắt buộc đối với tất cả quốc tịch từ ngày 13/4/2023).' : '부부 모두가 건강진단서와 범죄경력증명서를 제출해야 합니다 (모든 국적에 대해 2023년 4월 13일부터 의무화).'}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-sm font-black text-gray-800 mb-2">⏰ {lang==='vi' ? 'Hạn chế số lần mời' : '초청 제한'}</p>
            <p className="text-xs text-gray-600 word-keep">{lang==='vi' ? 'Người Hàn Quốc không được mời vợ/chồng khác diện F-6 trong vòng 5 năm gần nhất.' : '한국인이 지난 5년 이내에 다른 F-6 배우자를 초청할 수 없습니다.'}</p>
          </div>
        </div>

        {/* 소득 기준 */}
        <div className="mb-6">
          <div className="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 mb-3 rounded-sm">
            <p className="text-sm font-black text-blue-700">💰 {lang==='vi' ? 'Tiêu chuẩn thu nhập (Cập nhật 2025)' : '소득 기준 (2025년 기준)'}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left font-black text-gray-700">{lang==='vi' ? 'Quy mô gia đình' : '가족 규모'}</th>
                  <th className="px-4 py-2 text-right font-black text-gray-700">{lang==='vi' ? 'Mức thu nhập bắt buộc (KRW)' : '최저 소득 기준 (KRW)'}</th>
                </tr>
              </thead>
              <tbody>
                {incomeStandards.map((std, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {lang==='vi' ? `Gia đình ${std.family} người` : `${std.family}인 가족`}
                    </td>
                    <td className="px-4 py-3 text-right font-black text-blue-600">{std.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
            <p className="text-xs text-amber-700 word-keep">
              {lang==='vi'
                ? '(Nếu gia đình từ 8 người trở lên: Mỗi một thành viên cộng thêm sẽ tăng thêm 5,541,738 KRW)'
                : '(8인 가족 이상: 추가 1인당 5,541,738 KRW 추가)'}
            </p>
          </div>
        </div>

        {/* 예외 사항 */}
        <div className="bg-green-50 border-l-4 border-green-600 rounded-lg px-4 py-3">
          <p className="text-sm font-black text-green-700 mb-2">💡 {lang==='vi' ? 'Miễn trừ điều kiện' : '예외 조건'}</p>
          <p className="text-xs text-green-700 word-keep leading-relaxed">
            {lang==='vi'
              ? '💡 Miễn trừ điều kiện thu nhập và giao tiếp: Nếu hai vợ chồng đã có con chung (được khai sinh hợp pháp), các điều kiện về thu nhập, năng lực tiếng Hàn và chương trình hướng dẫn kết hôn quốc tế sẽ được miễn giảm hoàn toàn.'
              : '💡 소득·한국어 조건 면제: 부부가 혼생 미성년 자녀를 두고 있으면, 소득 기준, 한국어 능력, 국제결혼중매 프로그램 조건이 모두 면제됩니다.'}
          </p>
        </div>

      </div>
    </div>
  );
}
