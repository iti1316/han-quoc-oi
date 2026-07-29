
/* ================================================================
   페이지: F-6 대상 적용 (적격 기준)
================================================================ */
function EligibilityPage({ visaStep, onBack, lang }) {
  if (visaStep !== 'f6' && visaStep !== 'f5_marriage' && visaStep !== 'naturalization' && visaStep !== 'f5_marriage_naturalization' && visaStep !== 'd8' && visaStep !== 'f27_e71') return null;

  // Naturalization eligibility content
  const naturalizationContent = lang === 'vi' ? {
    title: '👥 Đối tượng áp dụng',
    subtitle: 'Điều kiện nhập tịch Hàn Quốc (Nhập tịch đơn giản - 간이귀화)',
    sections: [
      {
        icon: '📋',
        title: 'Giới thiệu',
        items: ['Hàn Quốc chia quy định nhập tịch làm nhiều diện (nhập tịch thông thường, nhập tịch diện nhân tài chuyên gia...). Tuy nhiên, đối với người nước ngoài đang cư trú theo diện Hôn nhân kết hôn (Visa F-6), luật áp dụng diện 간이귀화 (Nhập tịch đơn giản/Giản dị).', 'Để làm hồ sơ nhập tịch theo diện này, bạn cần thỏa mãn đầy đủ các điều kiện "cứng" cốt lõi sau đây của Bộ Tư pháp Hàn Quốc:']
      },
      {
        icon: '⏰',
        title: '1. Điều kiện về Thời gian cư trú hợp pháp',
        items: ['Trường hợp 1: Duy trì hôn nhân và cư trú liên tục tại Hàn Quốc từ 2 năm trở lên kể từ ngày làm thẻ đăng ký người nước ngoài (ARC).', 'Trường hợp 2: Hai vợ chồng kết hôn được 3 năm trở lên, và bạn có thời gian cư trú liên tục tại Hàn Quốc từ 1 năm trở lên.', '💡 Ngoại lệ (Hôn nhân đứt gãy): Nếu chưa đủ thời gian trên nhưng người chồng Hàn Quốc bị tử vong, mất tích, hoặc hai người ly hôn nhưng lỗi hoàn toàn thuộc về phía người chồng (bạo hành, cờ bạc...) và bạn được tòa phán quyết quyền nuôi con hoặc không có lỗi, bạn vẫn được phép nộp đơn.']
      },
      {
        icon: '💰',
        title: '2. Điều kiện Năng lực Kinh tế (Chứng minh tài chính)',
        items: ['Khác với diện nhập tịch thông thường yêu cầu tài sản rất cao, diện kết hôn F-6 chỉ cần chứng minh năng lực tài chính ở mức tối thiểu để đảm bảo cuộc sống chung. Bạn hoặc chồng (người cùng chung hộ khẩu) phải cung cấp được một trong các giấy tờ sau:', 'Sở hữu tài sản tài chính (tiền gửi tiết kiệm, số dư ngân hàng, chứng khoán...) trị giá từ 30.000.000 KRW trở lên.', 'Sở hữu bất động sản (nhà đất tính theo giá công thị trường) hoặc Hợp đồng thuê nhà có giá trị tiền cọc (Jeonse/Wolse) từ 30.000.000 KRW trở lên.', 'Có Giấy chứng nhận việc làm (재직증명서) hoặc Giấy xác nhận dự kiến tiếp nhận lao động để chứng minh thu nhập ổn định.']
      },
      {
        icon: '🗣️',
        title: '3. Điều kiện Năng lực tiếng Hàn & Hội nhập xã hội',
        items: ['Bạn bắt buộc phải nắm vững các kiến thức cơ bản về ngôn ngữ, lịch sử, văn hóa và phong tục của Hàn Quốc.', 'Yêu cầu thực tế: Hoàn thành chương trình Hội nhập xã hội KIIP Lớp 5 và thi đỗ kỳ thi tổng hợp dành cho diện nhập tịch (귀화용 종합평가) đạt từ 60/100 điểm trở lên.', 'Khi có chứng nhận này, bạn sẽ được miễn kỳ thi viết quốc tịch.']
      },
      {
        icon: '⚖️',
        title: '4. Điều kiện Nhân thân và Phẩm hạnh (품행단정)',
        items: ['Đây là rào cản hành chính rất gắt gao của Bộ Tư pháp:', 'Bạn phải có lý lịch trong sạch, phẩm hạnh đoan chính.', 'Không có tiền án tiền sự nghiêm trọng ở cả Việt Nam (chứng minh qua Lý lịch tư pháp số 2) và Hàn Quốc.', 'Lưu ý đặc biệt: Nếu bạn từng có lịch sử vi phạm giao thông bị phạt tiền nặng, trốn thuế, nợ thuế hoặc từng cư trú bất hợp pháp trước đây rồi quay lại chính ngạch, bạn thường sẽ bị hạn chế quyền nộp đơn nhập tịch trong vòng 5 năm kể từ ngày nộp phạt.', 'Hồ sơ sẽ bị đánh trượt ngay nếu chưa đủ thời gian thử thách xóa án tích.'],
        isDanger: true
      },
      {
        icon: '⭐',
        title: '(*) Điều kiện duy trì sau khi nhập tịch (Giữ song tịch)',
        items: [
          '🔹 Hàn Quốc cho phép người nhập tịch theo diện kết hôn (F-6) được giữ cả quốc tịch gốc (Việt Nam) và quốc tịch mới (Hàn Quốc), nhưng bạn phải thỏa mãn điều kiện cứng sau:',
          '',
          '📌 Cam kết không sử dụng quốc tịch nước ngoài:',
          'Trong vòng 1 năm kể từ ngày nhận quyết định nhập tịch, bạn bắt buộc phải nộp Đơn cam kết không sử dụng quyền công dân nước ngoài (Việt Nam) khi đang lưu trú trên lãnh thổ Hàn Quốc.',
          '',
          '⚠️ Hệ quả nếu vi phạm:',
          'Nếu quá thời hạn 1 năm mà bạn không nộp đơn cam kết này, bạn sẽ bị tước quốc tịch Hàn Quốc tự động theo luật định.'
        ],
        isSpecial: true
      }
    ]
  } : {
    title: '👥 대상 적용',
    subtitle: '귀화 적격 기준 (간이귀화)',
    sections: [
      { icon: '⏰', title: '1. 거주 기간', items: ['경우 1: 2년 연속 거주', '경우 2: 3년 혼인 + 1년 거주'] },
      { icon: '💰', title: '2. 경제 능력', items: ['금융 자산 ≥3천만원 또는', '부동산 ≥3천만원 또는', '재직증명서 (안정적 소득)'] },
      { icon: '🗣️', title: '3. 한국어·사회통합', items: ['KIIP 5단계 수료', '귀화용 종합평가 ≥60점'] },
      { icon: '⚖️', title: '4. 품행단정', items: ['베트남·한국 모두 범죄 전과 없음', '신원이 명확하고 깨끗함'], isDanger: true }
    ]
  };

  // F-5-2 eligibility content
  const f5MarriageContent = lang === 'vi' ? {
    title: '👥 Đối tượng áp dụng',
    subtitle: 'Điều kiện nâng cấp lên F-5-2',
    sections: [
      {
        icon: '✅',
        title: 'Đối tượng chính',
        items: [
          'Đang giữ visa F-6 (diện kết hôn với người Hàn hoặc mang quốc tịch Hàn), muốn nâng cấp lên F-5-2',
          'Vợ/chồng của công dân Hàn Quốc: người đã kết hôn với người Hàn Quốc và cư trú trên 2 năm'
        ],
        highlight: true
      },
      {
        icon: '⚖️',
        title: 'Trường hợp đặc biệt (Ly hôn)',
        items: [
          'Ly hôn do lỗi của người chồng/vợ Hàn (có giấy tòa chứng nhận): CÓ ĐỦ ĐIỀU KIỆN',
          'Vẫn có quyền/trách nhiệm nuôi con chung sau ly hôn: CÓ ĐỦ ĐIỀU KIỆN',
          '⛔ Ly hôn thuận tình (thỏa thuận): KHÔNG ĐỦ ĐIỀU KIỆN'
        ],
        isDanger: true
      }
    ]
  } : {
    title: '👥 대상 적용',
    subtitle: 'F-5-2 적격 기준',
    sections: [
      {
        icon: '✅',
        title: '주요 대상',
        items: [
          'F-6 비자 소유자로서 F-5-2로 업그레이드하고자 하는 자',
          '한국인 배우자와 결혼하여 2년 이상 거주한 자'
        ],
        highlight: true
      },
      {
        icon: '⚖️',
        title: '특수 경우 (이혼)',
        items: [
          '한국인 배우자의 귀책사유로 인한 이혼 (법원 판결서 있음): 조건 충족',
          '공동 자녀 양육권/책임 있음: 조건 충족',
          '⛔ 합의이혼: 조건 미충족'
        ],
        isDanger: true
      }
    ]
  };

  // Select content based on visaStep
  let content;
  if (visaStep === 'f5_marriage') {
    content = f5MarriageContent;
  } else if (visaStep === 'f27_e71') {
    // F-2-7 eligibility
    content = lang === 'vi' ? {
      title: "📊 Hệ thống tính điểm F-2-7",
      subtitle: "Tổng 170 điểm, cần 80 điểm để được cấp visa",
      sections: [
        { icon: "👤", title: "1. Tuổi tác – Tối đa 25 điểm", items: ["25-29: 25 điểm | 18-24, 30-34: 23 điểm | 35-39: 20 điểm | 40-44: 12 điểm..."] },
        { icon: "🎓", title: "2. Học vị – Tối đa 25 điểm", items: ["Tiến sĩ (이공계): 25 | Tiến sĩ (khác): 20 | Thạc sĩ (이공계): 20 | Thạc sĩ (khác): 17 | Cử nhân (이공계): 17 | Cử nhân (khác): 15 | Cao đẳng (이공계): 15 | Cao đẳng (khác): 10"] },
        { icon: "🗣️", title: "3. Tiếng Hàn – Tối đa 20 điểm", items: ["TOPIK 5-6 / KIIP 5: 20 | TOPIK 4 / KIIP 4: 15 | TOPIK 3 / KIIP 3: 10 | TOPIK 2: 5 | TOPIK 1: 3"] },
        { icon: "💰", title: "4. Thu nhập hàng năm – Tối đa 60 điểm", items: ["100+: 60 | 90-100: 58 | 80-90: 56 | 70-80: 53 | 60-70: 50 | 50-60: 45 | 40-50: 40 | 30-40: 30 | Tối thiểu-30: 10"] },
        { icon: "⭐", title: "5. Điểm cộng – Tối đa 40 điểm", items: ["Chuyên gia xuất sắc: +20 | Tiến cử hành chính: +20 | KIIP 5+: +10 | Tốt nghiệp thế giới: +30/20/15 | Tốt nghiệp Hàn: +10/7/5 | Tình nguyện: +7/5/1"] },
        { icon: "📋", title: "Bảng điểm chi tiết", items: ["Xem ảnh K-point E74 dưới đây"] }
      ],
      hasImage: true
    } : {
      title: '👥 대상 적용',
      subtitle: 'F-2-99로 변경 가능 대상',
      sections: [
        {
          icon: '📌',
          title: '다음 중 하나의 비자로 합법 거주 중이어야 함:',
          items: [
            '✅ 전문인력/기술자 비자: E-1, E-2, E-3, E-4, E-5, E-6 (E-6-2 제외), E-7',
            '✅ 투자/무역 비자: D-1, D-5, D-6, D-7, D-8, D-9',
            '✅ 부양/가족 비자: F-1, F-3 (위 비자 소유자의 부양가족)'
          ]
        },
        {
          icon: '⚠️',
          title: 'E-9, E-10, H-2 주의:',
          items: [
            '일반 저숙련 노동자 비자는 F-2-99로 직접 변경 불가능. 먼저 E-7-4 (숙련기술자)로 변경 후 시간을 쌓아야 F-2-99 신청 가능.'
          ],
          isDanger: true
        }
      ]
    };
  } else if (visaStep === 'f5_marriage_naturalization') {
    // F-5-2 Naturalization eligibility (simplified)
    content = lang === 'vi' ? {
      title: '👥 Đối tượng áp dụng',
      subtitle: 'Điều kiện nhập tịch từ F-5-2',
      sections: [
        {
          icon: '✅',
          title: 'Đối tượng chính',
          items: [
            'Người kết hôn với người Hàn Quốc và cùng chung sống liên tục ≥2 năm, hoặc kết hôn ≥3 năm và duy trì trạng thái chung sống ≥1 năm.'
          ],
          highlight: true
        },
        {
          icon: '⚖️',
          title: 'Bao gồm cả trường hợp:',
          items: [
            'Chồng/vợ mất',
            'Ly hôn nhưng lỗi thuộc về người chồng/vợ Hàn (có giấy tòa xác nhận)',
            'Ly hôn nhưng có quyền/trách nhiệm nuôi con chung'
          ]
        }
      ]
    } : {
      title: '👥 대상 적용',
      subtitle: 'F-5-2 귀화 적격 기준',
      sections: [
        {
          icon: '✅',
          title: '주요 대상',
          items: [
            '한국인과 결혼하여 연속 2년 이상 함께 거주, 또는 결혼 3년 이상이고 한국 거주 1년 이상'
          ],
          highlight: true
        },
        {
          icon: '⚖️',
          title: '특수 경우 포함:',
          items: [
            '배우자 사망',
            '배우자의 귀책사유로 인한 이혼 (법원 판결서 있음)',
            '이혼 후에도 자녀 양육권/책임 있음'
          ]
        }
      ]
    };
  } else if (visaStep === 'naturalization') {
    content = naturalizationContent;
  } else {
    content = lang === 'vi' ? {
      title: '👥 Đối tượng áp dụng',
      subtitle: 'Điều kiện hợp lệ chuyển đổi visa F-6',
    sections: [
      {
        icon: '✅',
        title: 'Đối tượng được phép chuyển đổi F-6 trong nước',
        items: [
          'Người nước ngoài đang lưu trú hợp pháp tại Hàn Quốc và là vợ/chồng của công dân Hàn Quốc.'
        ],
        highlight: true
      },
      {
        icon: '⭐',
        title: 'Ngoại lệ đặc biệt',
        items: [
          'Người Đức nhập cảnh theo diện miễn thị thực (B-1) được phép chuyển đổi sang F-6 trong nước.'
        ],
        isSpecial: true
      },
      {
        icon: '❌',
        title: 'Đối tượng KHÔNG ĐƯỢC chuyển đổi trong nước (Phải về nước xin visa)',
        items: [
          'Người đang giữ visa du lịch/ngắn hạn (B-1, B-2, C-1 đến C-4)',
          'Người giữ visa Du lịch làm việc (H-1)',
          'Người cư trú bất hợp pháp (bao gồm nhập cảnh lậu, dùng hộ chiếu giả)',
          'Người được gia hạn thời gian lưu trú để xuất cảnh (hoặc hoãn thời hạn xuất cảnh)',
          'Tội phạm hình sự thông thường (trừ trường hợp chỉ bị phạt tiền đơn thuần)',
          'Người đang giữ visa G-1 (được cấp trong thời gian lưu trú với tư cách thuộc 4 nhóm trên)'
        ],
        isDanger: true
      },
      {
        icon: '🆘',
        title: '⚠️ Trường hợp nhân đạo (Ngoại lệ)',
        items: [
          'Nếu thuộc nhóm bị cấm ở trên nhưng có lý do bất khả kháng như mang thai, sinh con, hoặc đang nuôi con vị thành niên sinh ra trong mối quan hệ của hai vợ chồng, Cục Quản lý Xuất nhập cảnh sẽ xem xét và quyết định có cho phép đổi visa hay không.'
        ],
        isWarning: true
      }
    ]
  } : {
    title: '👥 대상 적용',
    subtitle: 'F-6 비자 변경 적격 기준',
    sections: [
      {
        icon: '✅',
        title: '국내 변경 가능한 대상',
        items: [
          '한국에서 합법 체류 중인 외국인 + 한국 국민 배우자'
        ],
        highlight: true
      },
      {
        icon: '⭐',
        title: '특별 예외',
        items: [
          '독일 국민이 무비자 (B-1) 입국한 경우 국내 변경 가능'
        ],
        isSpecial: true
      },
      {
        icon: '❌',
        title: '국내 변경 불가능한 대상 (귀국 후 신청 필수)',
        items: [
          '관광·단기비자 소유자 (B-1, B-2, C-1~C-4)',
          '워킹홀리데이 (H-1) 소유자',
          '불법 체류자 (밀입국, 위조 여권 포함)',
          '출국 기한 연장 또는 유예 중인 자',
          '형사 범죄 전과자 (벌금형만 제외)',
          'G-1 비자 (위의 4개 그룹에 해당하는 자에게 발급된 경우)'
        ],
        isDanger: true
      },
      {
        icon: '🆘',
        title: '⚠️ 인도적 특수 사유 (예외 인정)',
        items: [
          '상기 금지 대상이더라도 임신·출산·미성년 자녀 양육 등 불가피한 인도적 사유가 있으면 출입국청이 심사 후 인정 여부 결정'
        ],
        isWarning: true
      }
    ]
  };
  }

  return (
    <div style={{ background:'#F0F2F5' }} className="min-h-screen">
      <BackHeader title={content.title} onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-4 pb-12">

        {/* 부제목 */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-4">
          <p className="text-xs text-gray-600">{content.subtitle}</p>
        </div>

        {/* 섹션 */}
        {content.sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            <div className={`px-3 py-2 rounded-lg mb-3 border-l-4 ${
              section.highlight ? 'bg-green-50 border-green-600' :
              section.isSpecial ? 'bg-blue-50 border-blue-600' :
              section.isDanger ? 'bg-red-50 border-red-600' :
              section.isWarning ? 'bg-yellow-50 border-yellow-600' :
              'bg-gray-50 border-gray-300'
            }`}>
              <p className={`text-sm font-black ${
                section.highlight ? 'text-green-700' :
                section.isSpecial ? 'text-blue-700' :
                section.isDanger ? 'text-red-700' :
                section.isWarning ? 'text-yellow-700' :
                'text-gray-700'
              }`}>
                {section.icon} {section.title}
              </p>
            </div>
            <div className="space-y-2">
              {section.items.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm px-4 py-3 border-l-2 border-gray-300">
                  <p className="text-sm text-gray-700 word-keep leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 이미지 표시 */}
        {content.hasImage && (
          <div className="mt-8 mb-6">
            <img src="/images/f27_scoring_table.jpg.jpg" alt="F-2-7 Scoring Table" className="w-full rounded-xl shadow-lg" />
          </div>
        )}

      </div>
    </div>
  );
}
