
/* ── 이미지 압축 유틸 (Canvas, max 800px, quality 0.72) ── */
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const MAX = 800;
        let w = img.width, h = img.height;
        if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
        if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ── Firebase Storage 업로드 (압축 후 업로드, URL 반환) ── */
async function uploadImageToStorage(file, deviceId) {
  const dataUrl = await compressImage(file);
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const name = `posts/${deviceId || 'anon'}_${Date.now()}_${Math.random().toString(36).slice(2,8)}.jpg`;
  const ref = window.storage.ref(name);
  await ref.put(blob, { contentType: 'image/jpeg' });
  return await ref.getDownloadURL();
}
