import { useState, useRef, useEffect } from 'react'

const AUDIO_CACHE = "noor-audio-v2";

const reciters = [
  { id: 'minshawi', name: 'المنشاوي', server: 'https://server10.mp3quran.net/minsh/' },
  { id: 'husary', name: 'محمود الحصري', server: 'https://server13.mp3quran.net/husr/' },
  { id: 'alafasy', name: 'مشاري العفاسي', server: 'https://server8.mp3quran.net/afs/' },
  { id: 'ajmy', name: 'أحمد العجمي', server: 'https://server10.mp3quran.net/ajm/' },
  { id: 'sudais', name: 'السديس', server: 'https://server8.mp3quran.net/sds/' },
]

const allSurahs = [
  { id: 1, name: "الفاتحة" }, { id: 2, name: "البقرة" }, { id: 3, name: "آل عمران" }, { id: 4, name: "النساء" }, { id: 5, name: "المائدة" }, { id: 6, name: "الأنعام" }, { id: 7, name: "الأعراف" }, { id: 8, name: "الأنفال" }, { id: 9, name: "التوبة" }, { id: 10, name: "يونس" }, { id: 11, name: "هود" }, { id: 12, name: "يوسف" }, { id: 13, name: "الرعد" }, { id: 14, name: "إبراهيم" }, { id: 15, name: "الحجر" }, { id: 16, name: "النحل" }, { id: 17, name: "الإسراء" }, { id: 18, name: "الكهف" }, { id: 19, name: "مريم" }, { id: 20, name: "طه" }, { id: 21, name: "الأنبياء" }, { id: 22, name: "الحج" }, { id: 23, name: "المؤمنون" }, { id: 24, name: "النور" }, { id: 25, name: "الفرقان" }, { id: 26, name: "الشعراء" }, { id: 27, name: "النمل" }, { id: 28, name: "القصص" }, { id: 29, name: "العنكبوت" }, { id: 30, name: "الروم" }, { id: 31, name: "لقمان" }, { id: 32, name: "السجدة" }, { id: 33, name: "الأحزاب" }, { id: 34, name: "سبأ" }, { id: 35, name: "فاطر" }, { id: 36, name: "يس" }, { id: 37, name: "الصافات" }, { id: 38, name: "ص" }, { id: 39, name: "الزمر" }, { id: 40, name: "غافر" }, { id: 41, name: "فصلت" }, { id: 42, name: "الشورى" }, { id: 43, name: "الزخرف" }, { id: 44, name: "الدخان" }, { id: 45, name: "الجاثية" }, { id: 46, name: "الأحقاف" }, { id: 47, name: "محمد" }, { id: 48, name: "الفتح" }, { id: 49, name: "الحجرات" }, { id: 50, name: "ق" }, { id: 51, name: "الذاريات" }, { id: 52, name: "الطور" }, { id: 53, name: "النجم" }, { id: 54, name: "القمر" }, { id: 55, name: "الرحمن" }, { id: 56, name: "الواقعة" }, { id: 57, name: "الحديد" }, { id: 58, name: "المجادلة" }, { id: 59, name: "الحشر" }, { id: 60, name: "الممتحنة" }, { id: 61, name: "الصف" }, { id: 62, name: "الجمعة" }, { id: 63, name: "المنافقون" }, { id: 64, name: "التغابن" }, { id: 65, name: "الطلاق" }, { id: 66, name: "التحريم" }, { id: 67, name: "الملك" }, { id: 68, name: "القلم" }, { id: 69, name: "الحاقة" }, { id: 70, name: "المعارج" }, { id: 71, name: "نوح" }, { id: 72, name: "الجن" }, { id: 73, name: "المزمل" }, { id: 74, name: "المدثر" }, { id: 75, name: "القيامة" }, { id: 76, name: "الإنسان" }, { id: 77, name: "المرسلات" }, { id: 78, name: "النبأ" }, { id: 79, name: "النازعات" }, { id: 80, name: "عبس" }, { id: 81, name: "التكوير" }, { id: 82, name: "الانفطار" }, { id: 83, name: "المطففين" }, { id: 84, name: "الانشقاق" }, { id: 85, name: "البروج" }, { id: 86, name: "الطارق" }, { id: 87, name: "الأعلى" }, { id: 88, name: "الغاشية" }, { id: 89, name: "الفجر" }, { id: 90, name: "البلد" }, { id: 91, name: "الشمس" }, { id: 92, name: "الليل" }, { id: 93, name: "الضحى" }, { id: 94, name: "الشرح" }, { id: 95, name: "التين" }, { id: 96, name: "العلق" }, { id: 97, name: "القدر" }, { id: 98, name: "البينة" }, { id: 99, name: "الزلزلة" }, { id: 100, name: "العاديات" }, { id: 101, name: "القارعة" }, { id: 102, name: "التكاثر" }, { id: 103, name: "العصر" }, { id: 104, name: "الهمزة" }, { id: 105, name: "الفيل" }, { id: 106, name: "قريش" }, { id: 107, name: "الماعون" }, { id: 108, name: "الكوثر" }, { id: 109, name: "الكافرون" }, { id: 110, name: "النصر" }, { id: 111, name: "المسد" }, { id: 112, name: "الإخلاص" }, { id: 113, name: "الفلق" }, { id: 114, name: "الناس" },
]

export default function Audio({ setActive }) {
  const [search, setSearch] = useState("")
  const [selectedReciter, setSelectedReciter] = useState(reciters[0])
  const [currentSurah, setCurrentSurah] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [saved, setSaved] = useState({})
  const [downloading, setDownloading] = useState(null)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => { checkSaved() }, [selectedReciter])

  useEffect(() => {
    const a = audioRef.current
    if(!a) return
    const onTime = () => { setCurrentTime(a.currentTime); setProgress((a.currentTime / a.duration) * 100 || 0) }
    const onMeta = () => setDuration(a.duration)
    const onEnd = () => setIsPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    return () => { a.removeEventListener('timeupdate', onTime); a.removeEventListener('loadedmetadata', onMeta); a.removeEventListener('ended', onEnd) }
  }, [])

  const getUrl = (id) => `${selectedReciter.server}${String(id).padStart(3, '0')}.mp3`

  const checkSaved = async () => {
    try { const c = await caches.open(AUDIO_CACHE); const keys = await c.keys(); const m={}; keys.forEach(k=>m[k.url]=true); setSaved(m) } catch {}
  }

  // تشغيل فوري بدون انتظار
  const handlePlay = async (id) => {
    const url = getUrl(id)
    const audio = audioRef.current

    if (currentSurah === id) {
      if (isPlaying) { audio.pause(); setIsPlaying(false) }
      else { audio.play().then(()=>setIsPlaying(true)) }
      return
    }

    setCurrentSurah(id)
    setIsPlaying(false)

    // 1. شغل مباشر من النت فوراً
    audio.src = url
    audio.load()
    audio.play().then(()=>setIsPlaying(true)).catch(()=>{})

    // 2. في الخلفية اذا كانت محفوظة بدّل المصدر للكاش بدون ما يقطع (للمستقبل)
    // واذا مش محفوظة احفظها تلقائيا
    try {
      const cache = await caches.open(AUDIO_CACHE)
      const match = await cache.match(url)
      if (match) {
        // هي محفوظة، المرة الجاية بتشغل من الكاش
        return
      } else {
        // مش محفوظة، احفظها تلقائيا بدون نت بعدين
        const res = await fetch(url, { mode: 'cors' })
        if(res.ok){
          await cache.put(url, res.clone())
          setSaved(s=>({...s, [url]:true}))
        }
      }
    } catch {}
  }

  // تحميل فعلي
  const handleDownload = async (id) => {
    const url = getUrl(id)
    if (saved[url]) return
    setDownloading(id)
    try {
      const res = await fetch(url, { mode: 'cors' })
      if (!res.ok) throw new Error()
      const cache = await caches.open(AUDIO_CACHE)
      await cache.put(url, res.clone())
      setSaved(s=>({...s, [url]:true}))
    } catch (e) {
      alert("فشل التحميل، جرب مرة ثانية")
    } finally {
      setDownloading(null)
    }
  }

  const filtered = allSurahs.filter(s => s.name.includes(search))
  const currentName = allSurahs.find(s=>s.id===currentSurah)?.name || ""

  return (
    <div className="min-h-screen bg-[#f8f6f1] pb-28" dir="rtl">
      <audio ref={audioRef} preload="auto" />

      <div className="bg-[#0f5a43] text-white p-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="font-black text-[18px]">القرآن صوتاً</h1>
        <button onClick={() => setActive('home')} className="bg-white/20 px-4 py-2 rounded-full text-sm">رجوع للرئيسية ←</button>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm">
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن سورة..." className="w-full outline-none bg-transparent" />
        </div>

        <div className="flex gap-2 overflow-x-auto mt-4 pb-1 no-scrollbar">
          {reciters.map(r => (
            <button key={r.id} onClick={() => setSelectedReciter(r)} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold ${selectedReciter.id === r.id? 'bg-[#0f5a43] text-white' : 'bg-white border'}`}>{r.name}</button>
          ))}
        </div>

        <p className="text-[12px] text-gray-400 text-center mt-3">💡 السورة التي تستمع لها تُحفظ تلقائياً</p>

        <div className="mt-4 space-y-3">
          {filtered.map(s => {
            const isSaved =!!saved[getUrl(s.id)]
            const playing = currentSurah === s.id && isPlaying
            const isDown = downloading === s.id
            return (
              <div key={s.id} className={`bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm border ${playing? 'border-[#0f5a43]' : 'border-transparent'}`}>
                <div className="flex items-center gap-2">
                  <button onClick={() => handlePlay(s.id)} className={`w-11 h-11 rounded-full flex items-center justify-center text-[16px] ${playing? 'bg-[#0f5a43] text-white' : 'bg-orange-50'}`}>{playing? '⏸️' : '▶️'}</button>
                  <button onClick={() => handleDownload(s.id)} disabled={isDown} className="w-11 h-11 rounded-full bg-[#f8f6f1] flex items-center justify-center text-[16px]">
                    {isDown? '⏳' : isSaved? '✅' : '⬇️'}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right"><p className="font-bold">{s.name}</p>{isSaved && <p className="text-[10px] text-green-600">محفوظة بدون نت</p>}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#f6f1df] text-[#8c7a4b] flex items-center justify-center font-bold">{s.id}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {currentSurah && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-5px_20px_rgba(0,0,0,0.15)] p-3 z-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button onClick={() => audioRef.current.currentTime -= 10} className="w-9 h-9 rounded-full bg-gray-100">⏪</button>
              <button onClick={() => handlePlay(currentSurah)} className="w-12 h-12 rounded-full bg-[#0f5a43] text-white text-xl">{isPlaying? '⏸️' : '▶️'}</button>
              <button onClick={() => audioRef.current.currentTime += 10} className="w-9 h-9 rounded-full bg-gray-100">⏩</button>
            </div>
            <div className="text-right flex-1 mr-4 overflow-hidden">
              <p className="font-bold text-[14px] truncate">{currentName}</p>
              <p className="text-[11px] text-gray-400">{Math.floor(currentTime/60)}:{String(Math.floor(currentTime%60)).padStart(2,'0')} / {Math.floor(duration/60)}:{String(Math.floor(duration%60)).padStart(2,'0')}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#f6f1df] flex items-center justify-center font-bold text-[#8c7a4b]">{currentSurah}</div>
          </div>
          <input type="range" value={progress} onChange={e => { const t = (e.target.value/100)*duration; audioRef.current.currentTime = t }} className="w-full accent-[#0f5a43] h-1" />
        </div>
      )}
    </div>
  )
}