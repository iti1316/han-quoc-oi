/* ================================================================
   페이지: 이용약관 & 개인정보처리방침
================================================================ */
function LegalPage({ type, onBack, lang }) {
  return (
    <div style={{ background:'#F0F2F5' }} className="min-h-screen">
      <BackHeader
        title={type === 'terms'
          ? (lang === 'vi' ? 'Điều khoản sử dụng' : '이용약관')
          : (lang === 'vi' ? 'Chính sách bảo mật' : '개인정보처리방침')
        }
        onBack={onBack}
      />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4 text-gray-700 leading-relaxed text-sm word-keep">
          {/* 내용 삽입 위치 */}
          {type === 'terms' ? (
            <div className="space-y-4">
              {lang === 'vi' ? (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-black text-base mb-1">Điều khoản sử dụng</h2>
                    <p className="text-xs text-gray-500 mb-4">Ngày hiệu lực: 01/08/2026</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 1 (Mục đích)】</h3>
                    <p className="text-sm leading-relaxed">Điều khoản này quy định các điều kiện, thủ tục sử dụng dịch vụ cộng đồng do Hàn Quốc Ơi (sau đây gọi là "Dịch vụ") cung cấp, cùng với quyền, nghĩa vụ và trách nhiệm của người dùng và ban quản trị.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 2 (Tính chất của Dịch vụ)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>Dịch vụ là cộng đồng chia sẻ thông tin dành cho người Việt đang sinh sống tại Hàn Quốc.</li>
                      <li>Người dùng có thể sử dụng Dịch vụ mà không cần đăng ký thành viên. Người dùng được phân biệt bằng mã thiết bị và biệt danh (nickname).</li>
                      <li>Các thông tin về visa và hành chính trên Dịch vụ chỉ mang tính tham khảo chung, không phải tư vấn pháp lý hay hướng dẫn chính thức. Khi làm thủ tục thực tế, vui lòng xác nhận với Cục Xuất nhập cảnh hoặc cơ quan có liên quan.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 3 (Nghĩa vụ của người dùng)】</h3>
                    <p className="text-sm mb-2">Người dùng không được thực hiện các hành vi sau:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>Đăng nội dung xúc phạm hoặc làm tổn hại danh dự người khác</li>
                      <li>Sử dụng lời lẽ thô tục, phát ngôn thù địch, phân biệt đối xử, quấy rối tình dục</li>
                      <li>Đăng nội dung khiêu gợi, bạo lực, tàn nhẫn</li>
                      <li>Đăng thông tin cá nhân của người khác (tên thật, số điện thoại, địa chỉ, số hộ chiếu, số đăng ký người nước ngoài...) khi chưa được đồng ý</li>
                      <li>Quảng cáo thương mại, spam, đăng bài trùng lặp liên tục</li>
                      <li>Dụ dỗ các hành vi vi phạm pháp luật như giới thiệu việc làm bất hợp pháp, đổi tiền trái phép, lừa đảo, quảng cáo cho vay</li>
                      <li>Lan truyền thông tin sai sự thật</li>
                      <li>Xâm phạm quyền tác giả, quyền thương hiệu và các quyền sở hữu trí tuệ khác</li>
                      <li>Cản trở hoạt động bình thường của Dịch vụ</li>
                      <li>Các hành vi khác vi phạm pháp luật Hàn Quốc</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 4 (Quản lý bài viết)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>Quyền và trách nhiệm đối với bài viết thuộc về người viết.</li>
                      <li>Ban quản trị có thể xóa hoặc giới hạn hiển thị bài viết vi phạm Điều 3 mà không cần thông báo trước.</li>
                      <li>Ban quản trị sẽ xem xét các bài viết bị báo cáo và thực hiện biện pháp cần thiết.</li>
                      <li>Đối với người dùng vi phạm nhiều lần, ban quản trị có thể giới hạn quyền sử dụng Dịch vụ.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 5 (Miễn trừ trách nhiệm)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>Ban quản trị không chịu trách nhiệm về tính xác thực, chính xác và đáng tin cậy của nội dung do người dùng đăng.</li>
                      <li>Ban quản trị không có nghĩa vụ can thiệp vào tranh chấp giữa người dùng với nhau hoặc với bên thứ ba, và không chịu trách nhiệm về thiệt hại phát sinh.</li>
                      <li>Ban quản trị không chịu trách nhiệm về kết quả của quyết định và hành động mà người dùng thực hiện dựa trên thông tin trên Dịch vụ.</li>
                      <li>Ban quản trị không chịu trách nhiệm về việc gián đoạn Dịch vụ do các nguyên nhân ngoài tầm kiểm soát như thiên tai, sự cố mạng, sự cố của dịch vụ bên ngoài (Firebase, Vercel...).</li>
                      <li>Dịch vụ được cung cấp miễn phí và không bảo đảm việc cung cấp liên tục.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 6 (Lưu trữ bài viết)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>Ban quản trị không bảo đảm lưu trữ bài viết vĩnh viễn.</li>
                      <li>Ban quản trị không chịu trách nhiệm về việc mất bài viết do sự cố máy chủ hoặc mất dữ liệu.</li>
                      <li>Vui lòng tự lưu giữ những nội dung quan trọng.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 7 (Thay đổi và ngừng Dịch vụ)】</h3>
                    <p className="text-sm leading-relaxed">Ban quản trị có thể thay đổi nội dung hoặc ngừng cung cấp Dịch vụ. Trong trường hợp đó, ban quản trị sẽ nỗ lực thông báo trước. Tuy nhiên nếu có lý do bất khả kháng, việc thông báo có thể được thực hiện sau.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 8 (Thay đổi Điều khoản)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>Ban quản trị có thể thay đổi Điều khoản này khi cần thiết.</li>
                      <li>Điều khoản được thay đổi sẽ được thông báo trên Dịch vụ. Nếu người dùng tiếp tục sử dụng sau khi thông báo, coi như đã đồng ý với nội dung thay đổi.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【Điều 9 (Liên hệ)】</h3>
                    <p className="text-sm leading-relaxed">Mọi thắc mắc về Điều khoản này, vui lòng liên hệ:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm mt-2">
                      <li>Ban quản trị: Hàn Quốc Ơi</li>
                      <li>Email: iti1316@gmail.com</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-black text-base mb-1">이용약관</h2>
                    <p className="text-xs text-gray-500 mb-4">시행일: 2026년 8월 1일</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제1조 (목적)】</h3>
                    <p className="text-sm leading-relaxed">이 약관은 Hàn Quốc Ơi(이하 "본 서비스")가 제공하는 커뮤니티 서비스의 이용 조건과 절차, 이용자와 운영자의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제2조 (서비스의 성격)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>본 서비스는 재한 베트남인을 위한 정보 공유 커뮤니티입니다.</li>
                      <li>본 서비스는 회원가입 없이 이용할 수 있으며, 이용자는 기기 식별값과 닉네임으로 구분됩니다.</li>
                      <li>본 서비스가 제공하는 비자·행정 관련 정보는 일반적인 참고 자료이며, 법률 자문이나 공식 안내가 아닙니다. 실제 신청 및 절차는 반드시 출입국·외국인청 등 관계 기관에 확인하시기 바랍니다.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제3조 (이용자의 의무)】</h3>
                    <p className="text-sm mb-2">이용자는 다음 행위를 하여서는 안 됩니다.</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>타인의 명예를 훼손하거나 모욕하는 내용의 게시</li>
                      <li>욕설, 혐오 표현, 차별적 발언, 성적 괴롭힘</li>
                      <li>음란물, 폭력적·잔혹한 내용의 게시</li>
                      <li>타인의 개인정보(실명, 전화번호, 주소, 여권번호, 외국인등록번호 등)를 동의 없이 게시</li>
                      <li>상업적 광고, 스팸, 도배, 반복 게시</li>
                      <li>불법 취업 알선, 불법 환전, 사기, 대출 광고 등 위법 행위의 유도</li>
                      <li>허위 정보의 유포</li>
                      <li>타인의 저작권, 상표권 등 지적재산권 침해</li>
                      <li>서비스의 정상적 운영을 방해하는 행위</li>
                      <li>기타 대한민국 법령에 위반되는 행위</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제4조 (게시물의 관리)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>이용자가 작성한 게시물에 대한 권리와 책임은 작성자에게 있습니다.</li>
                      <li>운영자는 제3조를 위반한 게시물을 사전 통보 없이 삭제하거나 노출을 제한할 수 있습니다.</li>
                      <li>운영자는 신고된 게시물을 검토하여 필요한 조치를 취할 수 있습니다.</li>
                      <li>반복적으로 약관을 위반하는 이용자에 대하여 운영자는 서비스 이용을 제한할 수 있습니다.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제5조 (운영자의 면책)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>운영자는 이용자가 게시한 내용의 진실성, 정확성, 신뢰성에 대하여 책임지지 않습니다.</li>
                      <li>이용자 간 또는 이용자와 제3자 간에 발생한 분쟁에 대하여 운영자는 개입할 의무가 없으며, 이로 인한 손해에 대하여 책임지지 않습니다.</li>
                      <li>본 서비스에 게시된 정보를 근거로 한 이용자의 판단과 행위의 결과에 대하여 운영자는 책임지지 않습니다.</li>
                      <li>천재지변, 통신망 장애, 외부 서비스(Firebase, Vercel 등)의 장애 등 운영자의 통제를 벗어난 사유로 인한 서비스 중단에 대하여 운영자는 책임지지 않습니다.</li>
                      <li>본 서비스는 무료로 제공되며, 서비스의 지속적 제공을 보장하지 않습니다.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제6조 (게시물의 저장 및 보관)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>운영자는 게시물의 영구적 보관을 보장하지 않습니다.</li>
                      <li>서버 장애, 데이터 손실 등으로 인한 게시물 소실에 대하여 운영자는 책임지지 않습니다.</li>
                      <li>중요한 자료는 이용자가 별도로 보관하시기 바랍니다.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제7조 (서비스의 변경 및 중단)】</h3>
                    <p className="text-sm leading-relaxed">운영자는 서비스의 내용을 변경하거나 서비스 제공을 중단할 수 있으며, 이 경우 사전에 공지하도록 노력합니다. 단, 부득이한 사유가 있는 경우 사후에 공지할 수 있습니다.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제8조 (약관의 변경)】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>운영자는 필요한 경우 이 약관을 변경할 수 있습니다.</li>
                      <li>변경된 약관은 서비스 내 공지를 통해 알리며, 공지 후 이용자가 계속 서비스를 이용하는 경우 변경에 동의한 것으로 봅니다.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【제9조 (문의)】</h3>
                    <p className="text-sm leading-relaxed">본 약관에 관한 문의는 아래로 연락하시기 바랍니다.</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm mt-2">
                      <li>운영자: Hàn Quốc Ơi 운영팀</li>
                      <li>이메일: iti1316@gmail.com</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {lang === 'vi' ? (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-black text-base mb-1">Chính sách bảo mật thông tin cá nhân</h2>
                    <p className="text-xs text-gray-500 mb-4">Ngày hiệu lực: 01/08/2026</p>
                  </div>

                  <div>
                    <p className="text-sm leading-relaxed">Hàn Quốc Ơi (sau đây gọi là "Dịch vụ") coi trọng thông tin cá nhân của người dùng và tuân thủ các quy định pháp luật liên quan, bao gồm Luật Bảo vệ Thông tin Cá nhân của Hàn Quốc.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【1. Thông tin được thu thập】</h3>
                    <p className="text-sm mb-2">Dịch vụ không yêu cầu đăng ký thành viên và không thu thập tên thật, số đăng ký cư trú hay số điện thoại.</p>
                    <p className="text-sm font-semibold mb-2">Các thông tin được thu thập:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>Mã thiết bị: Chuỗi ký tự ngẫu nhiên do trình duyệt tự tạo — Tự động tạo khi truy cập lần đầu</li>
                      <li>Biệt danh: Tên hiển thị do người dùng tự nhập — Tùy chọn</li>
                      <li>Nội dung bài viết: Bài viết, bình luận, ảnh đính kèm — Người dùng nhập</li>
                      <li>Thông tin khu vực: Tỉnh/thành và quận/huyện do người dùng chọn — Tùy chọn</li>
                      <li>Thông tin visa: Loại visa và ngày hết hạn khi dùng chức năng D-day — Tùy chọn, chỉ lưu trên thiết bị</li>
                      <li>Nhật ký truy cập: Trang đã xem, thời gian truy cập, quốc gia, loại thiết bị — Tự động (Vercel Analytics)</li>
                    </ul>
                    <p className="text-sm leading-relaxed mt-3">Về mã thiết bị: Đây là chuỗi ký tự ngẫu nhiên được lưu trong trình duyệt của người dùng, không phải thông tin nhận dạng cá nhân. Mã này được dùng để người dùng có thể sửa/xóa bài viết của chính mình và nhận thông báo bình luận. Nếu xóa dữ liệu lưu trong trình duyệt, mã này cũng sẽ bị xóa.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【2. Mục đích thu thập】</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>Cung cấp dịch vụ diễn đàn (viết bài, bình luận, xem bài)</li>
                      <li>Cho phép sửa/xóa bài viết của chính mình</li>
                      <li>Thông báo bình luận</li>
                      <li>Cung cấp thông tin theo khu vực</li>
                      <li>Tính ngày hết hạn visa (chức năng D-day)</li>
                      <li>Phân tích thống kê để cải thiện Dịch vụ</li>
                      <li>Quản lý bài viết không phù hợp và giới hạn người dùng vi phạm</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【3. Thời gian lưu giữ】</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>Bài viết: Lưu đến khi người dùng xóa hoặc ban quản trị xóa do vi phạm Điều khoản.</li>
                      <li>Mã thiết bị và biệt danh: Lưu đến khi người dùng xóa dữ liệu trình duyệt.</li>
                      <li>Thống kê truy cập: Lưu tối đa 30 ngày, sau đó tự động xóa.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【4. Cung cấp cho bên thứ ba và ủy thác xử lý】</h3>
                    <p className="text-sm leading-relaxed mb-3">Dịch vụ không bán thông tin người dùng và không cung cấp cho bên thứ ba vì mục đích marketing.</p>
                    <p className="text-sm mb-2">Tuy nhiên, để vận hành Dịch vụ, chúng tôi sử dụng hệ thống của các nhà cung cấp sau:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>Google (Firebase): Lưu bài viết, ảnh, xác thực quản trị viên — Singapore, Hoa Kỳ</li>
                      <li>Vercel Inc.: Vận hành website, thống kê truy cập — Hoa Kỳ và các nơi khác</li>
                    </ul>
                    <p className="text-sm leading-relaxed mt-3">Các nhà cung cấp trên xử lý dữ liệu theo chính sách bảo mật của riêng họ.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【5. Quyền của người dùng】</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>Xem, sửa, xóa bài viết của mình: Thực hiện trực tiếp trên Dịch vụ.</li>
                      <li>Xóa mã thiết bị và biệt danh: Xóa dữ liệu lưu trong trình duyệt (localStorage) là xóa ngay lập tức.</li>
                      <li>Yêu cầu xóa thông tin khác: Liên hệ email bên dưới, chúng tôi sẽ kiểm tra và xử lý.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【6. Ảnh và tệp đính kèm】</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
                      <li>Ảnh do người dùng đính kèm được lưu trên Firebase Storage và bất kỳ ai truy cập được bài viết đều có thể xem.</li>
                      <li>Vui lòng không tải lên ảnh có chứa thông tin cá nhân (chứng minh thư, hộ chiếu, thẻ đăng ký người nước ngoài, hợp đồng...).</li>
                      <li>Ngay cả khi đã xóa bài viết, tệp ảnh đã lưu có thể còn tồn tại trên máy chủ trong một thời gian. Nếu muốn xóa hoàn toàn, vui lòng liên hệ email bên dưới.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【7. Thông tin cá nhân của trẻ em】</h3>
                    <p className="text-sm leading-relaxed">Dịch vụ không nhằm phục vụ trẻ em dưới 14 tuổi. Trẻ em dưới 14 tuổi cần có sự đồng ý của người đại diện pháp lý khi sử dụng.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【8. Bảo đảm an toàn thông tin】</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>Giới hạn quyền truy cập cơ sở dữ liệu (áp dụng quy tắc bảo mật)</li>
                      <li>Vận hành hệ thống xác thực quản trị viên (Firebase Authentication)</li>
                      <li>Mã hóa kết nối qua HTTPS</li>
                      <li>Giới hạn định dạng và kích thước tệp đính kèm</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【9. Thay đổi Chính sách】</h3>
                    <p className="text-sm leading-relaxed">Khi Chính sách này thay đổi, chúng tôi sẽ thông báo trên Dịch vụ.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【10. Liên hệ】</h3>
                    <p className="text-sm leading-relaxed mb-2">Mọi thắc mắc, yêu cầu xóa thông tin hoặc khiếu nại về thông tin cá nhân, vui lòng liên hệ:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                      <li>Phụ trách: Ban quản trị Hàn Quốc Ơi</li>
                      <li>Email: iti1316@gmail.com</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-black text-base mb-1">개인정보처리방침</h2>
                    <p className="text-xs text-gray-500 mb-4">시행일: 2026년 8월 1일</p>
                  </div>

                  <div>
                    <p className="text-sm leading-relaxed">Hàn Quốc Ơi(이하 "본 서비스")는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【1. 수집하는 정보】</h3>
                    <p className="text-sm mb-2">본 서비스는 회원가입을 요구하지 않으며, 이름·주민등록번호·전화번호 등을 수집하지 않습니다.</p>
                    <p className="text-sm font-semibold mb-2">수집하는 항목:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>기기 식별값: 브라우저에서 자동 생성되는 임의의 문자열 — 최초 접속 시 자동 생성</li>
                      <li>닉네임: 이용자가 직접 입력한 표시 이름 — 선택</li>
                      <li>게시물 내용: 이용자가 작성한 글, 댓글, 첨부 사진 — 이용자 입력</li>
                      <li>지역 정보: 이용자가 선택한 시·도 및 시·군·구 — 선택</li>
                      <li>비자 정보: D-day 기능 이용 시 입력한 비자 종류와 만료일 — 선택, 기기에만 저장</li>
                      <li>접속 기록: 방문 페이지, 접속 시각, 국가, 기기 종류 등 통계 정보 — 자동 수집 (Vercel Analytics)</li>
                    </ul>
                    <p className="text-sm leading-relaxed mt-3">기기 식별값에 관하여: 이 값은 이용자의 브라우저에 저장되는 임의의 문자열로, 이용자 개인을 식별하는 정보가 아닙니다. 본인이 작성한 글을 수정·삭제할 수 있도록 하고, 자신의 글에 달린 댓글 알림을 제공하기 위해 사용됩니다. 브라우저의 저장 데이터를 삭제하면 이 값도 삭제됩니다.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【2. 수집 목적】</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>게시판 서비스 제공 (글·댓글 작성, 조회)</li>
                      <li>본인이 작성한 게시물의 수정·삭제 기능 제공</li>
                      <li>댓글 알림 제공</li>
                      <li>지역별 정보 제공</li>
                      <li>비자 만료일 계산 기능 제공</li>
                      <li>서비스 이용 통계 분석 및 개선</li>
                      <li>부적절한 게시물 관리 및 이용 제한</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【3. 보유 및 이용 기간】</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>게시물: 이용자가 삭제하거나 운영자가 약관 위반으로 삭제할 때까지 보관합니다.</li>
                      <li>기기 식별값 및 닉네임: 이용자가 브라우저 저장 데이터를 삭제할 때까지 보관합니다.</li>
                      <li>접속 통계: 최대 30일간 보관 후 자동 삭제됩니다.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【4. 제3자 제공 및 처리 위탁】</h3>
                    <p className="text-sm leading-relaxed mb-3">본 서비스는 이용자의 정보를 판매하거나 마케팅 목적으로 제3자에게 제공하지 않습니다.</p>
                    <p className="text-sm mb-2">다만 서비스 운영을 위해 아래 사업자의 시스템을 이용하며, 이 과정에서 데이터가 해당 사업자의 서버에 저장됩니다.</p>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>Google (Firebase): 게시물·사진 저장, 관리자 인증 — 싱가포르, 미국</li>
                      <li>Vercel Inc.: 웹사이트 호스팅, 접속 통계 — 미국 등</li>
                    </ul>
                    <p className="text-sm leading-relaxed mt-3">위 사업자는 각사의 개인정보 보호 정책에 따라 데이터를 처리합니다.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【5. 이용자의 권리】</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>자신이 작성한 게시물의 열람·수정·삭제: 서비스 내에서 직접 가능합니다.</li>
                      <li>기기 식별값 및 닉네임 삭제: 브라우저의 저장 데이터(localStorage)를 삭제하면 즉시 삭제됩니다.</li>
                      <li>기타 정보의 삭제 요청: 아래 문의처로 연락하시면 확인 후 처리합니다.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【6. 사진 및 첨부 파일】</h3>
                    <div className="space-y-2 ml-2 text-sm">
                      <div>1. 이용자가 첨부한 사진은 Firebase Storage에 저장되며, 게시물에 접근할 수 있는 누구나 볼 수 있습니다.</div>
                      <div className="bg-red-50 border-l-4 border-red-200 p-2.5">
                        <span className="font-semibold">2. 개인정보가 포함된 사진(신분증, 여권, 외국인등록증, 계약서 등)은 업로드하지 마시기 바랍니다.</span>
                      </div>
                      <div>3. 게시물을 삭제하더라도 이미 저장된 사진 파일은 일정 기간 서버에 남아 있을 수 있습니다. 완전 삭제를 원하시면 문의처로 연락해 주십시오.</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【7. 아동의 개인정보】</h3>
                    <p className="text-sm leading-relaxed">본 서비스는 만 14세 미만 아동을 대상으로 하지 않습니다. 만 14세 미만 아동이 이용하는 경우 법정대리인의 동의가 필요합니다.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【8. 개인정보의 안전성 확보】</h3>
                    <p className="text-sm mb-2">운영자는 다음 조치를 취하고 있습니다.</p>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                      <li>데이터베이스 접근 권한 제한 (보안 규칙 적용)</li>
                      <li>관리자 인증 시스템 운영 (Firebase Authentication)</li>
                      <li>HTTPS를 통한 통신 암호화</li>
                      <li>첨부 파일의 형식 및 용량 제한</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【9. 방침의 변경】</h3>
                    <p className="text-sm leading-relaxed">이 방침이 변경되는 경우 서비스 내 공지를 통해 알립니다.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">【10. 문의처】</h3>
                    <p className="text-sm leading-relaxed mb-2">개인정보 관련 문의, 삭제 요청, 불만 사항은 아래로 연락하시기 바랍니다.</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                      <li>담당: Hàn Quốc Ơi 운영팀</li>
                      <li>이메일: iti1316@gmail.com</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   컴포넌트: 사이트 푸터
================================================================ */
function SiteFooter({ lang, nav }) {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 mt-12">
      <div className="max-w-lg mx-auto px-4 space-y-2">
        {/* 링크 행 (가로) */}
        <div className="flex items-center justify-center gap-3 text-[11px]">
          <button
            onClick={() => nav({ page: 'legal', param: 'terms' })}
            className="text-gray-400 hover:text-white tap transition font-semibold"
          >
            {lang === 'vi' ? 'Điều khoản sử dụng' : '이용약관'}
          </button>
          <span className="text-gray-500">·</span>
          <button
            onClick={() => nav({ page: 'legal', param: 'privacy' })}
            className="text-gray-400 hover:text-white tap transition font-semibold"
          >
            {lang === 'vi' ? 'Chính sách bảo mật' : '개인정보처리방침'}
          </button>
        </div>

        {/* 제휴·문의 행 */}
        <div className="text-center text-[11px] text-gray-400">
          {lang === 'vi' ? 'Hợp tác · Quảng cáo · Liên hệ' : '제휴 · 광고 · 문의'}{' '}
          <span className="text-gray-500">—</span>{' '}
          <a href="mailto:iti1316@gmail.com" className="text-gray-400 hover:text-white underline tap transition">
            iti1316@gmail.com
          </a>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-700 pt-2">
          <p className="text-gray-500 text-[10px] text-center">
            ⓒ 2026 Hàn Quốc Ơi
          </p>
        </div>
      </div>
    </footer>
  );
}
