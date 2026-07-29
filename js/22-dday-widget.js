function DdayWidget({ lang, nav, onNicknameSave }) {
  const L = LANG[lang];
  const [info, setInfo] = useState(() => loadDdayInfo());
  const [mode, setMode] = useState(info ? 'display' : 'empty');
  const [currentType, setCurrentType] = useState(info?.type || 'd9');
  const [date, setDate] = useState(info?.date || '');
  const [target, setTarget] = useState(info?.target || 'e74');
  const [nicknameInput, setNicknameInput] = useState('');
  const needsNickname = !window.userNickname;

  function startEdit() {
    setCurrentType(info?.type || 'd9');
    setDate(info?.date || '');
    setTarget(info?.target || 'e74');
    setMode('editing');
  }
  function handleTypeChange(t) {
    setCurrentType(t);
    const list = VISA_NEXT_MAP[t] || [];
    if (list.length > 0) setTarget(list[0]);
  }
  async function handleSave() {
    if (!date) return;
    if (needsNickname && nicknameInput.trim() && onNicknameSave) {
      await onNicknameSave(nicknameInput.trim());
    }
    const next = { type: currentType, date, target };
    saveDdayInfo(next);
    setInfo(next);
    setMode('display');
  }
  function goToTarget() {
    const o = TARGET_VISA_OPTIONS.find(x => x.key === info.target);
    if (!o) return;
    window.__visaState = { visaRoute: o.route, visaSubRoute: o.subRoute, visaStep: o.key };
    nav({ page:'visaHub' });
  }

  if (mode === 'empty') {
    return (
      <section className="px-3 pt-3">
        <button onClick={startEdit}
          className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl px-4 py-4 flex items-center gap-3 tap shadow-sm">
          <span className="text-3xl flex-shrink-0">📅</span>
          <div className="flex-1 text-left">
            <p className="text-white font-black text-sm">{L.ddayTitle}</p>
            <p className="text-blue-200 text-[10px] mt-0.5">{L.ddaySub}</p>
          </div>
          <span className="text-white/70 text-xl">›</span>
        </button>
      </section>
    );
  }

  if (mode === 'editing') {
    return (
      <section className="px-3 pt-3">
        <div className="bg-white rounded-2xl shadow-sm px-4 py-4 fade-in">
          <p className="text-sm font-black text-gray-800 mb-3">📅 {L.ddayTitle}</p>

          {needsNickname && (
            <div className="mb-3">
              <label className="text-xs font-black text-gray-600 mb-1.5 block">{lang==='vi'?'Tên của bạn':'닉네임'}</label>
              <input type="text" value={nicknameInput} onChange={e=>setNicknameInput(e.target.value)}
                maxLength={20}
                placeholder={lang==='vi'?'Nhập tên...':'닉네임을 입력하세요'}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
            </div>
          )}

          <label className="text-xs font-black text-gray-600 mb-1.5 block">{L.ddayType}</label>
          <select value={currentType} onChange={e=>handleTypeChange(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-blue-400 bg-white">
            {CURRENT_VISA_OPTIONS.map(o => (
              <option key={o.key} value={o.key}>{o.code} — {lang==='vi'?o.vi:o.ko}</option>
            ))}
          </select>

          <label className="text-xs font-black text-gray-600 mb-1.5 block">{L.ddayLabel}</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-blue-400" />

          <label className="text-xs font-black text-gray-600 mb-1.5 block">{lang==='vi'?'Visa mục tiêu':'목표 비자'}</label>
          <select value={target} onChange={e=>setTarget(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-4 focus:outline-none focus:border-blue-400 bg-white">
            {TARGET_VISA_OPTIONS.filter(o => (VISA_NEXT_MAP[currentType] || []).includes(o.key)).map(o => (
              <option key={o.key} value={o.key}>{o.code} — {lang==='vi'?o.vi:o.ko}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            {info && (
              <button onClick={()=>setMode('display')}
                className="py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 bg-white tap">
                {lang==='vi'?'Hủy':'취소'}
              </button>
            )}
            <button onClick={handleSave} disabled={!date}
              className={`py-3 bg-blue-700 text-white rounded-xl text-sm font-black tap disabled:opacity-40 ${!info ? 'col-span-2' : ''}`}>
              {lang==='vi'?'Lưu':'저장'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const dday = calcDday(info.date);
  const targetOpt = TARGET_VISA_OPTIONS.find(o => o.key === info.target);
  const ddayLabel = dday < 0 ? L.ddayExpired : dday === 0 ? L.ddayToday : `D-${dday}`;
  const applyDate = calcApplyDate(info.date, info.type);
  const applyAvailable = new Date() >= applyDate;
  const urgent = dday <= 30;

  return (
    <section className="px-3 pt-3">
      <div className={`rounded-2xl shadow-sm overflow-hidden ${urgent ? 'bg-gradient-to-r from-red-600 to-orange-600' : 'bg-gradient-to-r from-blue-700 to-indigo-700'}`}>
        <div className="px-4 py-4 flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white/70 text-[10px] font-bold">{(() => { const c = CURRENT_VISA_OPTIONS.find(o => o.key === info.type); return c ? (lang==='vi'?c.vi:c.ko) : info.type; })()}</span>
              <button onClick={startEdit} className="text-white/50 text-[10px] underline">{L.ddayEditBtn}</button>
            </div>
            <p className="text-white font-black text-2xl leading-none">{ddayLabel}</p>
            <p className="text-white/80 text-[11px] mt-1.5 word-keep">{getTodoMessage(dday, lang)}</p>
            <p className="text-white/60 text-[10px] mt-1">
              {L.ddayApply}: {applyAvailable ? L.ddayApplyAvail : applyDate.toLocaleDateString(lang==='vi'?'vi-VN':'ko-KR')}
            </p>
          </div>
          {targetOpt && (
            <button onClick={goToTarget}
              className="bg-white/20 hover:bg-white/30 rounded-xl px-3 py-2.5 flex flex-col items-center gap-0.5 tap transition flex-shrink-0">
              <span className="text-white text-[9px] font-bold">{L.ddayTargetLabel}</span>
              <span className="text-white font-black text-xs">{targetOpt.code}</span>
              <span className="text-white text-base">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
