import { useState, useRef, useEffect } from 'react'

const AUDIO_CACHE = "noor-audio-v2";

const reciters = [
    { id: 'alafasy', name: 'مشاري العفاسي', server: 'https://server8.mp3quran.net/afs/' },
    { id: 'husary', name: 'محمود الحصري', server: 'https://server13.mp3quran.net/husr/' },
    { id: 'minshawi', name: 'المنشاوي', server: 'https://server10.mp3quran.net/minsh/' },
    { id: 'ajmy', name: 'أحمد العجمي', server: 'https://server10.mp3quran.net/ajm/' },
    { id: 'sudais', name: 'السديس', server: 'https://server8.mp3quran.net/sds/' },
]

const allSurahs = [
  { id: 1, name: "الفاتحة" }, { id: 2, name: "البقرة" }, { id: 3, name: "آل عمران" },
  { id: 4, name: "النساء" }, { id: 5, name: "المائدة" }, { id: 6, name: "الأنعام" },
  { id: 7, name: "الأعراف" }, { id: 8, name: "الأنفال" }, { id: 9, name: "التوبة" },
  { id: 10, name: "يونس" }, // كمل باقي السور عندك
]

// دالة تجيب رابط الصوت - لو محفوظ تجيبه من الكاش كـ blob
async function getAudioUrl(originalUrl) {
  try {
    const cache = await caches.open(AUDIO_CACHE);
    const cached = await cache.match(originalUrl);
    if (cached) {
      const blob = await cached.blob();
      return URL.createObjectURL(blob);
    }
  } catch (e) { console.log(e) }
  return originalUrl; // لو مش محفوظ يرجع الرابط الأصلي
}

export default function Audio() {
  const [selectedReciter, setSelectedReciter] = useState(reciters[0]);
  const [currentSurah, setCurrentSurah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState({});
  const [audioSrc, setAudioSrc] = useState("");
  const audioRef = useRef(null);

  // تحميل حالة المحفوظات عند البداية
  useEffect(() => {
    checkAllSaved();
  }, [selectedReciter]);

  const checkAllSaved = async () => {
    const cache = await caches.open(AUDIO_CACHE);
    const keys = await cache.keys();
    const map = {};
    keys.forEach(req => {
      map[req.url] = true;
    });
    setSaved(map);
  };

  const getSurahUrl = (surahId) => {
    const num = String(surahId).padStart(3, '0');
    return `${selectedReciter.server}${num}.mp3`;
  };

  const handleDownload = async (surahId) => {
    const url = getSurahUrl(surahId);
    try {
      const cache = await caches.open(AUDIO_CACHE);
      const res = await fetch(url);
      if (!res.ok) throw new Error("fetch failed");
      await cache.put(url, res.clone());
      setSaved(prev => ({...prev, [url]: true }));
      alert("تم الحفظ للاستماع بدون نت ✅");
    } catch (e) {
      alert("فشل التحميل، تأكد من النت");
    }
  };

  const handlePlay = async (surahId) => {
    const originalUrl = getSurahUrl(surahId);
    const finalUrl = await getAudioUrl(originalUrl);

    // لو نفس السورة اضغط توقيف
    if (currentSurah === surahId && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setCurrentSurah(surahId);
    setAudioSrc(finalUrl);
    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  
  return (
    <div>
      {/*... البحث والقراء... */}
      {allSurahs.map(s => {
        const url = getSurahUrl(s.id);
        const isSaved =!!saved[url];
        return (
          <div key={s.id} className="surah-row">
            <span>{s.name}</span>
            <button onClick={() => handlePlay(s.id)}>▶️</button>
            <button onClick={() => handleDownload(s.id)}>
              {isSaved? "✅" : "⬇️"}
            </button>
            {isSaved && <small>محفوظة بدون نت ✅</small>}
          </div>
        )
      })}
      <audio ref={audioRef} src={audioSrc} onEnded={() => setIsPlaying(false)} controls hidden />
    </div>
  )
}