function MoreDrawer({ nav, lang, onClose }) {
  const ALL_CHANNELS = [
    { e:'👻', ko:'무서운 이야기 방',       vi:'Phòng Chuyện Ma',        act:()=>({page:'classicBoard', param:'horror'}) },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl pb-8 fade-in" onClick={e=>e.stopPropagation()}>
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-3" />
        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-100">
          <p className="text-sm font-black text-gray-800">☰ {lang==='vi'?'Toàn bộ kênh':'전체 채널'}</p>
          <button onClick={onClose} className="text-gray-400 text-xl font-bold tap">✕</button>
        </div>
        <div className="px-3 pt-3 grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
          {ALL_CHANNELS.map((c, i) => (
            <button key={i} onClick={()=>{nav(c.act()); onClose();}}
              className="bg-gray-50 rounded-xl px-3 py-3 text-left flex items-center gap-2.5 tap hover:bg-gray-100 transition">
              <span className="text-xl flex-shrink-0">{c.e}</span>
              <p className="text-[11px] font-black text-gray-800 word-keep leading-tight">{lang==='vi'?c.vi:c.ko}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

