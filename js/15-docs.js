function DocsPage({ visaStep, onBack, lang }) {
  // Naturalization docs content
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

  return (
    <div style={{ background:'#F0F2F5' }} className="min-h-screen">
      <BackHeader title={lang==='vi' ? '📋 Tải hồ sơ cần thiết' : '📋 필수 서류 다운로드'} onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-4 pb-12">

        {/* 안내 배너 */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 mb-2 fade-in">
          <p className="text-xs font-black text-blue-800 mb-1">📌 {lang==='vi' ? 'Cách nhận hồ sơ' : '서류 받는 방법'}</p>
          <p className="text-xs text-blue-700 word-keep">
            {lang==='vi' ? <>
              ⬇️ Nút <strong>Tải xuống</strong>: Lưu file ngay từ Google Drive (biểu mẫu do quản trị viên chuẩn bị)<br/>
              🔗 Nút <strong>Trang chính thức</strong>: Chuyển đến trang Bộ Tư pháp / Hometax
            </> : <>
              ⬇️ <strong>다운로드</strong> 버튼: 구글 드라이브에서 파일 즉시 저장 (운영자가 준비한 양식)<br/>
              🔗 <strong>공식 사이트</strong> 버튼: 법무부·홈택스 공식 페이지로 이동
            </>}
          </p>
        </div>

        {/* 드라이브 ID 미설정 안내 (개발용) */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-4 fade-in">
          <p className="text-[10px] text-amber-700 word-keep">
            🛠 <strong>{lang==='vi' ? 'Hướng dẫn quản trị viên' : '운영자 안내'}:</strong> {lang==='vi'
              ? <>Sau khi tải file lên Google Drive, hãy thay giá trị <code className="bg-amber-100 px-1 rounded">driveId</code> bằng ID file thực tế.</>
              : <>구글 드라이브에 파일 업로드 후 <code className="bg-amber-100 px-1 rounded">driveId</code> 값을 실제 파일 ID로 교체하세요.</>}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {DOCS.map((doc, i) => {
            const driveUrl = doc.driveId && !doc.driveId.includes('PLACEHOLDER')
              ? `https://drive.google.com/uc?export=download&id=${doc.driveId}`
              : null;
            return (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden fade-in">
                {/* 서류 정보 */}
                <div className="px-4 pt-4 pb-3 flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{doc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="text-sm font-black text-gray-800 word-keep">{lang==='vi' && doc.vi_name ? doc.vi_name : doc.name}</p>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full flex-shrink-0">{doc.badge}</span>
                    </div>
                    <p className="text-xs text-gray-500 word-keep">{lang==='vi' && doc.vi_desc ? doc.vi_desc : doc.desc}</p>
                  </div>
                </div>

                {/* 버튼 영역 */}
                <div className="px-4 pb-3 flex gap-2 border-t border-gray-50 pt-3">
                  {doc.driveId ? (
                    driveUrl ? (
                      <a href={driveUrl} download={doc.fileName}
                        className="flex-1 bg-blue-700 text-white text-xs font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 tap transition active:bg-blue-800">
                        ⬇️ {lang==='vi' ? 'Tải xuống' : '다운로드'}
                      </a>
                    ) : (
                      <button disabled
                        className="flex-1 bg-gray-100 text-gray-400 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed">
                        ⬇️ {lang==='vi' ? 'Đang chuẩn bị...' : '준비 중'}
                      </button>
                    )
                  ) : null}
                  <a href={doc.official} target="_blank" rel="noopener noreferrer"
                    className={`text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 tap transition border ${doc.driveId ? 'flex-shrink-0 px-4 border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600' : 'flex-1 border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100'}`}>
                    🔗 {lang==='vi' ? 'Trang chính thức' : '공식 사이트'}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mt-4 fade-in">
          <p className="text-xs text-red-700 word-keep">
            {lang==='vi'
              ? '⚠️ Mỗi Cục XNC có thể yêu cầu thêm hồ sơ. Hãy gọi điện xác nhận trước khi đến.'
              : '⚠️ 관할 출입국마다 추가 서류를 요구할 수 있습니다. 방문 전 반드시 전화로 확인하세요.'}
          </p>
        </div>
      </div>
    </div>
  );
}
