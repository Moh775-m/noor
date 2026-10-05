import { useState, useRef, useEffect } from 'react'

const AUDIO_CACHE = "noor-audio-v2";

const reciters = [
  { id: 'alafasy', name: 'مشاري العفاسي', server: 'https://server8.mp3quran.net/afs/' },
  { id: 'husary', name: 'محمود الحصري', server: 'https://server13.mp3quran.net/husr/' },
  { id: 'minshawi', name: 'المنشاوي', server: 'https://server10.mp3quran.net/minsh/' },
  { id: 'ajmy', name: 'أحمد العجمي', server: 'https://server10.mp3quran.net/ajm/' },
  { id: 'sudais', name: 'السديس', server: 'https://server8.mp3quran.net/sds/' },
  { id: 'ahmad', name: 'أحمد الحذيفي', server: 'https://server8.mp3quran.net/ahmad_huth/' },
]

const allSurahs = [
  { id: 1, name: "الفاتحة" }, { id: 2, name: "البقرة" }, { id: 3, name: "آل عمران" },
  { id: 4, name: "النساء" }, { id: 5, name: "المائدة" }, { id: 6, name: "الأنعام" },
  { id: 7, name: "الأعراف" }, { id: 8, name: "الأنفال" }, { id: 9, name: "التوبة" },
  { id: 10, name: "يونس" }, { id: 11, name: "هود" }, { id: 12, name: "يوسف" },
  { id: 13, name: "الرعد" }, { id: 14, name: "إبراهيم" }, { id: 15, name: "الحجر" },
  { id: 16, name: "النحل" }, { id: 17, name: "الإسراء" }, { id: 18, name: "الكهف" },
  { id: 19, name: "مريم" }, { id: 20, name: "طه" }, { id: 21, name: "الأنبياء" },
  { id: 22, name: "الحج" }, { id: 23, name: "المؤمنون" }, { id: 24, name: "النور" },
  { id: 25, name: "الفرقان" }, { id: 26, name: "الشعراء" }, { id: 27, name: "النمل" },
  { id: 28, name: "القصص" }, { id: 29, name: "العنكبوت" }, { id: 30, name: "الروم" },
  { id: 31, name: "لقمان" }, { id: 32, name: "السجدة" }, { id: 33, name: "الأحزاب" },
  { id: 34, name: "سبأ" }, { id: 35, name: "فاطر" }, { id: 36, name: "يس" },
  { id: 37, name: "الصافات" }, { id: 38, name: "ص" }, { id: 39, name: "الزمر" },
  { id: 40, name: "غافر" }, { id: 41, name: "فصلت" }, { id: 42, name: "الشورى" },
  { id: 43, name: "الزخرف" }, { id: 44, name: "الدخان" }, { id: 45, name: "الجاثية" },
  { id: 46, name: "الأحقاف" }, { id: 47, name: "محمد" }, { id: 48, name: "الفتح" },
  { id: 49, name: "الحجرات" }, { id: 50, name: "ق" }, { id: 51, name: "الذاريات" },
  { id: 52, name: "الطور" }, { id: 53, name: "النجم" }, { id: 54, name: "القمر" },
  { id: 55, name: "الرحمن" }, { id: 56, name: "الواقعة" }, { id: 57, name: "الحديد" },
  { id: 58, name: "المجادلة" }, { id: 59, name: "الحشر" }, { id: 60, name: "الممتحنة" },
  { id: 61, name: "الصف" }, { id: 62, name: "الجمعة" }, { id: 63, name: "المنافقون" },
  { id: 64, name: "التغابن" }, { id: 65, name: "الطلاق" }, { id: 66, name: "التحريم" },
  { id: 67, name: "الملك" }, { id: 68, name: "القلم" }, { id: 69, name: "الحاقة" },
  { id: 70, name: "المعارج" }, { id: 71, name: "نوح" }, { id: 72, name: "الجن" },
  { id: 73, name: "المزمل" }, { id: 74, name: "المدثر" }, { id: 75, name: "القيامة" },
  { id: 76, name: "الإنسان" }, { id: 77, name: "المرسلات" }, { id: 78, name: "النبأ" },
  { id: 79, name: "النازعات" }, { id: 80, name: "عبس" }, { id: 81, name: "التكوير" },
  { id: 82, name: "الانفطار" }, { id: 83, name: "المطففين" }, { id: 84, name: "الانشقاق" },
  { id: 85, name: "البروج" }, { id: 86, name: "الطارق" }, { id: 87, name: "الأعلى" },
  { id: 88, name: "الغاشية" }, { id: 89, name: "الفجر" }, { id: 90, name: "البلد" },
  { id: 91, name: "الشمس" }, { id: 92, name: "الليل" }, { id: 93, name: "الضحى" },
  { id: 94, name: "الشرح" }, { id: 95, name: "التين" }, { id: 96, name: "العلق" },
  { id: 97, name: "القدر" }, { id: 98, name: "البينة" }, { id: 99, name: "الزلزلة" },
  { id: 100, name: "العاديات" }, { id: 101, name: "القارعة" }, { id: 102, name: "التكاثر" },
  { id: 103, name: "العصر" }, { id: 104, name: "الهمزة" }, { id: 105, name: "الفيل" },
  { id: 106, name: "قريش" }, { id: 107, name: "الماعون" }, { id: 108, name: "الكوثر" },
  { id: 109, name: "الكافرون" }, { id: 110, name: "النصر" }, { id: 111, name: "المسد" },
  { id: 112, name: "الإخلاص" }, { id: 113, name: "الفلق" }, { id: 114, name: "الناس" },
]

export default function Audio() {
  const [search, setSearch] = useState("")
  const [selectedReciter, setSelectedReciter] = useState(reciters[0])
  const [currentSurah, setCurrentSurah] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [saved, setSaved] = useState({})
  const audioRef = useRef(null)

  useEffect(() => { checkSaved() }, [selectedReciter])

  const checkSaved = async () => {
    try {
      const cache = await caches.open(AUDIO_CACHE)
      const keys = await cache.keys()
      const map = {}
      keys.forEach(r => map[r.url] = true)
      setSaved(map)
    } catch {}
  }

  const getSurahUrl = (id) => `${selectedReciter.server}${String(id).padStart(3, '0')}.mp3`

  const getPlayableUrl = async (url) => {
    try {
      const cache = await caches.open(AUDIO_CACHE)
      const m = await cache.match(url)
      if (m) return URL.createObjectURL(await m.blob())
    } catch {}
    return url
  }

  const handleDownload = async (id) => {
    const url = getSurahUrl(id)
    try {
      const res = await fetch(url)
      const cache = await caches.open(AUDIO_CACHE)
      await cache.put(url, res.clone())
      setSaved(p => ({...p, [url]: true}))
    } catch { alert("تأكد من النت") }
  }

  const handlePlay = async (id) => {
    const url = getSurahUrl(id)
    const final = await getPlayableUrl(url)
    if (currentSurah === id && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }
    setCurrentSurah(id)
    audioRef.current.src = final
    audioRef.current.play()
    setIsPlaying(true)
  }

  const filtered = allSurahs.filter(s => s.name.includes(search))

  return (
    <div className="min-h-screen bg-[#f8f7f3]" dir="rtl">
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} hidden />

      {/* الهيدر */}
      <div className="bg-[#0f5a43] text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold text-lg">القرآن صوتاً</h1>
        <button onClick={() => window.history.back()} className="bg-white/20 px-4 py-1.5 rounded-full text-sm">
          رجوع للرئيسية ←
        </button>
      </div>

      <div className="p-3">
        {/* بحث */}
        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-2 shadow-sm mb-3">
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن سورة..." className="w-full outline-none bg-transparent text-right" />
        </div>

        {/* القراء */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {reciters.map(r => (
            <button key={r.id} onClick={() => setSelectedReciter(r)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm border transition
              ${selectedReciter.id === r.id? 'bg-[#0f5a43] text-white border-[#0f5a43]' : 'bg-white text-gray-600'}`}>
              {r.name}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-2 mb-3 text-center">💡 السورة التي تستمع لها تُحفظ تلقائياً للاستماع بدون نت</p>

        {/* القائمة */}
        <div className="space-y-3">
          {filtered.map(s => {
            const url = getSurahUrl(s.id)
            const isSaved =!!saved[url]
            const playing = currentSurah === s.id && isPlaying
            return (
              <div key={s.id} className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <button onClick={() => handlePlay(s.id)}
                    className="w-10 h-10 rounded-full bg-[#f8f6ef] flex items-center justify-center">
                    {playing? '⏸️' : '▶️'}
                  </button>
                  <button onClick={() => handleDownload(s.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${isSaved? 'bg-green-50' : 'bg-[#f8f6ef]'}`}>
                    {isSaved? '✅' : '⬇️'}
                  </button>
                </div>

                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{s.name}</div>
                    {isSaved && <div className="text-[11px] text-green-700">✅ محفوظة بدون نت</div>}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#f5efe0] text-[#8a7a56] flex items-center justify-center font-bold text-sm">
                    {s.id}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}