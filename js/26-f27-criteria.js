
/* ================================================================
   페이지: F-2-7 심사 조건 (D-9에서 F-2-7로의 전환 기준)
================================================================ */
function F27CriteriaPage({ onBack, lang }) {
  return (
    <div style={{ background:'#F0F2F5' }} className="min-h-screen">
      <BackHeader title={lang==='vi' ? '📋 Điều kiện thẩm định F-2-7' : '📋 F-2-7 심사 조건'} onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-4 pb-12">
        <div className="space-y-3">
          {[
            {
              ko:'① 합법 거주 조건',
              vi:'① Điều kiện cư trú hợp pháp',
              items: [
                { ko:'D-9 비자로 한국에 3년 이상 연속 합법 거주', vi:'Cư trú hợp pháp liên tục tại Hàn Quốc từ 3 năm trở lên với visa D-9.' },
                { ko:'📌 예외: 전년도 소득이 40,000,000 KRW 이상이면 3년 면제 가능', vi:'Miễn điều kiện 3 năm nếu thu nhập năm gần nhất ghi nhận trên chứng nhận thuế đạt từ 40 triệu won trở lên.' }
              ]
            },
            {
              ko:'② 점수 기준',
              vi:'② Điều kiện tính điểm',
              items: [
                { ko:'최소 170점 만점 중 80점 이상 필수', vi:'Đạt tối thiểu 80 / 170 điểm theo Bảng điểm nhân tài ưu tú F-2-7.' },
                { ko:'포함 항목: 나이, 학력, 한국어(TOPIK/KIIP), 전년도 소득, 가산점/감점', vi:'Gồm các mục: Tuổi tác, Học vị, Tiếng Hàn TOPIK/KIIP, Thu nhập năm gần nhất, và Điểm cộng/Điểm trừ' }
              ]
            },
            {
              ko:'③ 품행 조건',
              vi:'③ Điều kiện tư cách phẩm chất',
              items: [
                { ko:'전과 없음 (범죄경력 미보유)', vi:'Không có tiền án, tiền sự, không vi phạm luật xuất nhập cảnh (không bị phạt tiền quá mức quy định trong vòng vài năm gần nhất).' }
              ]
            }
          ].map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                <p className="text-sm font-black text-blue-700">{lang==='vi' ? section.vi : section.ko}</p>
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
