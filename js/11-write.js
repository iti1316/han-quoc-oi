/* ================================================================
   페이지: 글쓰기
================================================================ */

function WritePage({ initCat, editPost, nav, lang = 'vi', onAddPost, onUpdatePost, deviceId, route }) {
  // window.__currentRoute에서 최신 route 정보 가져오기
  const currentRoute = window.__currentRoute || route;
  const fromPage = currentRoute?.fromPage;

  console.log('🔍 WritePage Props:', { lang, route: route?.page, fromPage });
  console.log('🔍 WritePage window.__currentRoute:', window.__currentRoute);
  console.log('🔍 WritePage extracted fromPage:', fromPage);

  const isEdit   = !!editPost;
  const activeCat = editPost?.cat || initCat;
  const isTalk    = LOCKED_CATS.includes(activeCat);
  const lockedInfo = LOCKED_CAT_INFO[activeCat];
  const [cat, setCat] = useState(activeCat || 'hall');
  const [title, setTitle] = useState(editPost?.title || '');
  const [body, setBody]   = useState(editPost?.body  || '');
  // ❌ 비밀글 기능 삭제됨 - 모든 글은 공개글로만 저장됨
  const [toast, setToast] = useState(null);
  /* 지역 선택 (travel/market/house) */
  const [sido,    setSido]    = useState(editPost?.location?.sido    || '');
  const [sigungu, setSigungu] = useState(editPost?.location?.sigungu || '');
  const [dong,    setDong]    = useState(editPost?.location?.dong    || '');
  /* 사진 첨부 */
  const [images,  setImages]  = useState(editPost?.images || []);
  const [imgLoading, setImgLoading] = useState(false);
  const fileInputRef = useRef(null);
  const L = LANG[lang];
  const needLocation = LOCATION_CATS.includes(cat);

  async function handleImageAdd(e) {
    const files = Array.from(e.target.files).slice(0, 10 - images.length);
    if (!files.length) return;
    if (images.length >= 10) { setToast(lang==='vi'?'Tối đa 10 ảnh ⚠️':'사진은 최대 10장까지 첨부할 수 있어요 ⚠️'); return; }
    setImgLoading(true);
    try {
      const uploadedUrls = await Promise.all(files.map(f => uploadImageToStorage(f, deviceId)));
      setImages(prev => [...prev, ...uploadedUrls].slice(0, 10));
    } catch(err) {
      setToast(lang==='vi'?'이미지 처리 오류 ⚠️':'이미지 처리 중 오류가 발생했어요 ⚠️');
    }
    setImgLoading(false);
    e.target.value = '';
  }
  function removeImage(i) { setImages(prev => prev.filter((_,idx) => idx !== i)); }

  /* cat → classicBoard 키 매핑 */
  const CAT_BOARD = { hall:'d9', sos:'d9', bamboo:'bamboo', talk:'bamboo', travel:'travel', market:'market', house:'house', hospital:'hospital', horror:'horror', info:'info', jobs:'jobs' };

  function navToBoard(useCat) {
    console.log('🔴 [navToBoard] 호출됨');
    console.log('🔴 [navToBoard] fromPage (WritePage local):', fromPage);
    console.log('🔴 [navToBoard] useCat:', useCat);

    // 원래 페이지로 돌아가기
    if (fromPage === 'visaHub') {
      console.log('✅✅✅ visaHub으로 돌아감!');
      nav({ page:'visaHub' });
      // VisaHub으로 이동 후 맨 위로 스크롤
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      return;
    }

    console.log('⚠️ fromPage !== visaHub이므로 classicBoard로 이동');
    // 기본: classicBoard로 이동
    const bk = CAT_BOARD[useCat || cat];
    console.log('🔴 [navToBoard] CAT_BOARD[' + (useCat || cat) + '] = ' + bk);
    if (bk) nav({ page:'classicBoard', param:bk });
    else nav({ page:'home' });
  }

  function submit() {
    const wait = checkRateLimit('post');
    if (wait > 0) {
      setToast(L.rateLimitPost.replace('{n}', wait));
      return;
    }

    if (!title.trim() || !body.trim()) { setToast(L.emptyAlert); return; }
    if (body.trim().length > 3000) {
      setToast(lang==='vi' ? 'Nội dung quá dài (tối đa 3000 ký tự)' : '내용이 너무 깁니다 (최대 3000자)');
      return;
    }
    const loc = needLocation && sido ? { sido, sigungu, dong: dong.trim() } : null;
    const imgs = images.length > 0 ? images : undefined;
    if (isEdit) {
      onUpdatePost(editPost.id, {
        cat, title: title.trim(), body: body.trim(), isPublic: true,
        ...(loc  ? { location: loc } : {}),
        ...(imgs ? { images: imgs }  : {}),
      });
    } else {
      console.log('🟡 [WritePage Submit] window.userNickname 확인:', window.userNickname);
      const finalAuthor = genAuthor();
      console.log('🟡 [WritePage Submit] genAuthor() 결과:', finalAuthor);
      console.log('🟡 [WritePage Submit] onAddPost 타입:', typeof onAddPost);

      const postData = {
        id: Date.now(), cat, author: finalAuthor, deviceId,
        isAdmin: !!(window.auth && window.auth.currentUser),
        date: new Date().toLocaleDateString('ko-KR'),
        title: title.trim(), body: body.trim(),
        likes:0, hearts:0, wows:0, comments:0, isNew:true,
        isPublic: true,
        ...(loc  ? { location: loc } : {}),
        ...(imgs ? { images: imgs }  : {}),
      };
      console.log('🟡 [WritePage Submit] 전송할 post 데이터:', postData);
      console.log('📋 상세 필드 확인:', {
        isPublic: postData.isPublic,
        images: postData.images ? `${postData.images.length}개 사진` : '없음',
        location: postData.location ? `${postData.location.sido} ${postData.location.sigungu}` : '없음'
      });

      onAddPost(postData);
      console.log('🟡 [WritePage Submit] onAddPost 호출 완료');
      markRateLimit('post');

      // fromPage 체크하여 올바른 페이지로 이동
      if (fromPage === 'visaHub') {
        console.log('✅ fromPage가 visaHub이므로 VisaHub으로 이동');
        setTimeout(() => {
          nav({ page:'visaHub' });
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }, 0);
      } else {
        setTimeout(() => navToBoard(cat), 0);
      }
    }

    // 수정 완료 시
    if (isEdit) {
      if (fromPage === 'visaHub') {
        nav({ page:'visaHub' });
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        navToBoard(cat);
      }
    }
  }

  function goBack() {
    navToBoard(activeCat || cat);
  }

  return (
    <div style={{ background:'#F0F2F5' }} className="min-h-screen">
      <BackHeader title={isEdit ? (lang==='vi'?'✏️ Chỉnh sửa bài':'✍️ 글 수정') : L.writePageTitle}
        onBack={goBack} />
      <div className="max-w-lg mx-auto px-4 py-4 pb-12">

        {/* 카테고리 선택 — talk/travel/market/house/horror/bamboo/info/jobs 진입 시 고정 표시, 변경 불가 */}
        {isTalk ? (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mb-3 fade-in flex items-center gap-3">
            <span className="text-xl">{lockedInfo ? lockedInfo.e : '🟢'}</span>
            <div>
              <p className="text-xs font-black text-gray-700">
                {lockedInfo ? (lang==='vi' ? lockedInfo.vi : lockedInfo.ko) : (lang==='vi' ? 'Góc Tán Gẫu' : '자유 토크방')}
              </p>
              <p className="text-[10px] text-gray-500">
                {lockedInfo ? (lang==='vi' ? lockedInfo.desc_vi : lockedInfo.desc_ko) : (lang==='vi' ? 'Tán gẫu tự do' : '비자 외 일상·자유 수다')}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm px-4 py-4 mb-3 fade-in">
            <p className="text-xs font-black text-gray-500 mb-3">{L.selectBoard}</p>
            <div className="flex flex-col gap-2">
              {CAT_OPTS.filter(o => {
                // 비자 커뮤니티(hall/sos)에서는 bamboo 제외
                if (['hall', 'sos'].includes(activeCat) && o.v === 'bamboo') return false;
                // 대나무숲(bamboo)에서는 bamboo만 표시
                if (activeCat === 'bamboo') return o.v === 'bamboo';
                return true;
              }).map(o => {
                const cl = CAT_LABELS_VI[o.v];
                return (
                  <button key={o.v} onClick={() => setCat(o.v)}
                    className={`text-left px-4 py-3 rounded-xl border-2 transition tap ${cat===o.v ? o.sel : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{o.e}</span>
                      <div>
                        <p className={`text-xs font-black ${cat===o.v?o.t:'text-gray-400'}`}>
                          {lang==='vi' ? cl.vi : o.label}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${cat===o.v?o.d:'text-gray-300'}`}>
                          {lang==='vi' ? cl.desc_vi : o.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 지역 선택 — travel / market / house만 */}
        {needLocation && (
          <div className="bg-white rounded-2xl shadow-sm px-4 py-4 mb-3 fade-in">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-black text-gray-700">📍 {lang==='vi'?'Chọn khu vực':'지역 선택'}</p>
            </div>
            <p className="text-[10px] text-gray-400 mb-3">
              {lang==='vi'
                ? '시/도 → 구/군 → 읍/면/동 순서로 선택하세요'
                : '시/도 → 구/군 → 읍/면/동 순서로 선택하세요'}
            </p>

            {/* 시/도 */}
            <select
              value={sido}
              onChange={e=>{ setSido(e.target.value); setSigungu(''); setDong(''); }}
              className={`w-full border-2 rounded-xl px-3 py-2.5 text-sm mb-2 focus:outline-none transition
                ${sido ? 'border-blue-400 bg-blue-50 text-blue-800 font-bold' : 'border-gray-200 text-gray-500'}`}>
              <option value="">📍 시/도 선택</option>
              {Object.keys(KOREA_REGIONS).map(r=>(
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            {/* 구/군 */}
            <select
              value={sigungu}
              onChange={e=>{ setSigungu(e.target.value); setDong(''); }}
              disabled={!sido}
              className={`w-full border-2 rounded-xl px-3 py-2.5 text-sm mb-2 focus:outline-none transition
                ${!sido ? 'border-gray-100 bg-gray-50 text-gray-300' : sigungu ? 'border-blue-400 bg-blue-50 text-blue-800 font-bold' : 'border-gray-200 text-gray-500'}`}>
              <option value="">🏙️ 구/군 선택</option>
              {sido && KOREA_REGIONS[sido]?.map(g=>(
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            {/* 읍/면/동 (직접 입력) */}
            <input
              type="text"
              value={dong}
              onChange={e=>setDong(e.target.value)}
              disabled={!sigungu}
              placeholder={sigungu ? '읍/면/동 직접 입력 (선택사항, 예: 원천동)' : '구/군을 먼저 선택하세요'}
              className={`w-full border-2 rounded-xl px-3 py-2.5 text-sm focus:outline-none transition placeholder-gray-300
                ${!sigungu ? 'border-gray-100 bg-gray-50 text-gray-300' : 'border-gray-200 focus:border-blue-400'}`}
            />

            {/* 선택된 지역 미리보기 */}
            {sido && sigungu && (
              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="text-[10px] text-gray-400">선택된 지역:</span>
                <span className="text-[11px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  📍 {fmtLocation({sido, sigungu, dong})}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 제목 */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-3 fade-in">
          <input value={title} onChange={e=>setTitle(e.target.value)} maxLength={60}
            placeholder={L.titlePlaceholder}
            className="w-full text-sm font-bold text-gray-800 focus:outline-none placeholder-gray-300" />
          <div className="text-right text-[10px] text-gray-300 mt-1">{title.length}/60</div>
        </div>

        {/* 본문 */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-3 fade-in">
          <textarea value={body} onChange={e=>setBody(e.target.value)} maxLength={3000} rows={6}
            placeholder={L.bodyPlaceholder}
            className="w-full text-sm text-gray-700 focus:outline-none placeholder-gray-300 resize-none leading-relaxed" />
          <div className="text-right text-[10px] text-gray-300 mt-1">{body.length}/3000</div>
        </div>

        {/* 사진 첨부 */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-4 mb-3 fade-in">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-black text-gray-700">
              📷 {lang==='vi'?'Đính kèm ảnh':'사진 첨부'}
              <span className="text-[10px] text-gray-400 font-normal ml-1">({lang==='vi'?'Tùy chọn, tối đa 10 ảnh':'선택사항, 최대 10장'})</span>
            </p>
            <span className="text-[10px] text-gray-400">{images.length}/10</span>
          </div>

          <div className="flex gap-2 flex-wrap mt-2">
            {images.map((src, i) => (
              <div key={i} className="relative w-20 h-20 flex-shrink-0">
                <img src={src} alt="" className="w-20 h-20 object-cover rounded-xl border border-gray-200" />
                <button onClick={()=>removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow tap">
                  ✕
                </button>
              </div>
            ))}

            {images.length < 10 && (
              <button onClick={()=>fileInputRef.current?.click()} disabled={imgLoading}
                className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-1 tap hover:border-blue-400 hover:bg-blue-50 transition flex-shrink-0">
                {imgLoading
                  ? <span className="text-[10px] text-gray-400 font-bold">처리 중...</span>
                  : <>
                      <span className="text-2xl">📷</span>
                      <span className="text-[9px] text-gray-400 font-bold">{lang==='vi'?'Thêm ảnh':'사진 추가'}</span>
                    </>}
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageAdd}
          />
          <p className="text-[10px] text-gray-300 mt-2">
            {lang==='vi'?'JPG · PNG · HEIC 지원 · 자동 압축':'JPG · PNG · HEIC 지원 · 자동 압축 처리'}
          </p>
        </div>

        {/* ❌ 공개 설정 삭제됨 - 모든 글은 공개글로만 저장됨 */}

        {/* 🔒 개인정보 보호 경고 */}
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-3 fade-in">
          <p className="text-xs font-black text-red-700 mb-2">{L.privacyTitle}</p>
          <ul className="flex flex-col gap-1.5">
            {[L.privacy1, L.privacy2, L.privacy3, L.privacy4].map((t,i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-red-600">
                <span className="flex-shrink-0 mt-0.5">⚠️</span>{t}
              </li>
            ))}
          </ul>
        </div>

        {/* 익명 안내 */}
        <div className="bg-blue-50 rounded-2xl px-4 py-3 mb-5 flex items-center gap-2 fade-in">
          <span className="text-lg">🙈</span>
          <p className="text-xs text-blue-700 word-keep">{L.anonNote}</p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 fade-in">
          <button onClick={goBack}
            className="flex-1 py-4 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 bg-white tap transition">
            {L.cancelBtn}
          </button>
          <button onClick={submit}
            className="flex-[2] py-4 bg-blue-700 text-white rounded-2xl text-sm font-black tap transition">
            {L.submitBtn}
          </button>
        </div>
      </div>

      {toast && <Toast msg={toast} onClose={()=>setToast(null)} />}
    </div>
  );
}
