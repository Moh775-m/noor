import { useState, useRef, useEffect } from 'react'

const reciters = [
  { id: 'minshawi', name: 'المنشاوي', server: 'https://server10.mp3quran.net/minsh/' },
  { id: 'husary', name: 'محمود الحصري', server: 'https://server13.mp3quran.net/husr/' },
  { id: 'alafasy', name: 'مشاري العفاسي', server: 'https://server8.mp3quran.net/afs/' },
]

const allSurahs = [ { id: 1, name: "الفاتحة" }, { id: 2, name: "البقرة" }, { id: 3, name: "آل عمران" }, { id: 4, name: "النساء" }, { id: 5, name: "المائدة" }, { id: 6, name: "الأنعام" }, { id: 7, name: "الأعراف" }, { id: 8, name: "الأنفال" }, { id: 9, name: "التوبة" }, { id: 10, name: "يونس" }, { id: 11, name: "هود" }, { id: 12, name: "يوسف" }, { id: 13, name: "الرعد" }, { id: 14, name: "إبراهيم" }, { id: 15, name: "الحجر" }, { id: 16, name: "النحل" }, { id: 17, name: "الإسراء" }, { id: 18, name: "الكهف" }, { id: 19, name: "مريم" }, { id: 20, name: "طه" }, { id: 21, name: "الأنبياء" }, { id: 22, name: "الحج" }, { id: 23, name: "المؤمنون" }, { id: 24, name: "النور" }, { id: 25, name: "الفرقان" }, { id: 26, name: "الشعراء" }, { id: 27, name: "النمل" }, { id: 28, name: "القصص" }, { id: 29, name: "العنكبوت" }, { id: 30, name: "الروم" }, { id: 31, name: "لقمان" }, { id: 32, name: "السجدة" }, { id: 33, name: "الأحزاب" }, { id: 34, name: "سبأ" }, { id: 35, name: "فاطر" }, { id: 36, name: "يس" }, { id: 37, name: "الصافات" }, { id: 38, name: "ص" }, { id: 39, name: "الزمر" }, { id: 40, name: "غافر" }, { id: 41, name: "فصلت" }, { id: 42, name: "الشورى" }, { id: 43, name: "الزخرف" }, { id: 44, name: "الدخان" }, { id: 45, name: "الجاثية" }, { id: 46, name: "الأحقاف" }, { id: 47, name: "محمد" }, { id: 48, name: "الفتح" }, { id: 49, name: "الحجرات" }, { id: 50, name: "ق" }, { id: 51, name: "الذاريات" }, { id: 52, name: "الطور" }, { id: 53, name: "النجم" }, { id: 54, name: "القمر" }, { id: 55, name: "الرحمن" }, { id: 56, name: "الواقعة" }, { id: 57, name: "الحديد" }, { id: 58, name: "المجادلة" }, { id: 59, name: "الحشر" }, { id: 60, name: "الممتحنة" }, { id: 61, name: "الصف" }, { id: 62, name: "الجمعة" }, { id: 63, name: "المنافقون" }, { id: 64, name: "التغابن" }, { id: 65, name: "الطلاق" }, { id: 66, name: "التحريم" }, { id: 67, name: "الملك" }, { id: 68, name: "القلم" }, { id: 69, name: "الحاقة" }, { id: 70, name: "المعارج" }, { id: 71, name: "نوح" }, { id: 72, name: "الجن" }, { id: 73, name: "المزمل" }, { id: 74, name: "المدثر" }, { id: 75, name: "القيامة" }, { id: 76, name: "الإنسان" }, { id: 77, name: "المرسلات" }, { id: 78, name: "النبأ" }, { id: 79, name: "النازعات" }, { id: 80, name: "عبس" }, { id: 81, name: "التكوير" }, { id: 82, name: "الانفطار" }, { id: 83, name: "المطففين" }, { id: 84, name: "الانشقاق" }, { id: 85, name: "البروج" }, { id: 86, name: "الطارق" }, { id: 87, name: "الأعلى" }, { id: 88, name: "الغاشية" }, { id: 89, name: "الفجر" }, { id: 90, name: "البلد" }, { id: 91, name: "الشمس" }, { id: 92, name: "الليل" }, { id: 93, name: "الضحى" }, { id: 94, name: "الشرح" }, { id: 95, name: "التين" }, { id: 96, name: "العلق" }, { id: 97, name: "القدر" }, { id: 98, name: "البينة" }, { id: 99, name: "الزلزلة" }, { id: 100, name: "العاديات" }, { id: 101, name: "القارعة" }, { id: 102, name: "التكاثر" }, { id: 103, name: "العصر" }, { id: 104, name: "الهمزة" }, { id: 105, name: "الفيل" }, { id: 106, name: "قريش" }, { id: 107, name: "الماعون" }, { id: 108, name: "الكوثر" }, { id: 109, name: "الكافرون" }, { id: 110, name: "النصر" }, { id: 111, name: "المسد" }, { id: 112, name: "الإخلاص" }, { id: 113, name: "الفلق" }, { id: 114, name: "الناس" },
]

export default function Audio({ setActive }) {
  const [search, setSearch] = useState("")
  const [reciter, setReciter] = useState(reciters[0])
  const [current, setCurrent] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.addEventListener('timeupdate', () => setTime(a.currentTime))
    a.addEventListener('loadedmetadata', () => setDur(a.duration))
    a.addEventListener('ended', () => setIsPlaying(false))
  }, [])

  const getUrl = (id) => `${reciter.server}${String(id).padStart(3, '0')}.mp3`

  const play = (id) => {
    const audio = audioRef.current
    if (current === id) {
      isPlaying? audio.pause() : audio.play()
      setIsPlaying(!isPlaying)
      return
    }
    setCurrent(id)
    audio.src = getUrl(id) // مباشر من النت بدون كاش
    audio.play().then(() => setIsPlaying(true))
  }

  const goHome = () => {
    if (setActive) setActive('home')
    else window.history.back()
  }

  const filtered = allSurahs.filter(s => s.name.includes(search))

  return (
    <div className="min-h-screen bg-[#f8f6f1] pb-28" dir="rtl">
      <audio ref={audioRef} playsInline preload="none" />

      <div className="bg-[#0f5a43] text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-black">القرآن صوتاً</h1>
        <button onClick={goHome} className="bg-white/20 px-4 py-2 rounded-full text-sm">رجوع للرئيسية ←</button>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl px-4 py-3 flex gap-2"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث عن سورة..." className="w-full outline-none" /></div>
        <div className="flex gap-2 overflow-x-auto mt-4">
          {reciters.map(r=><button key={r.id} onClick={()=>setReciter(r)} className={`px-5 py-2 rounded-full text-sm font-bold ${reciter.id===r.id?'bg-[#0f5a43] text-white':'bg-white border'}`}>{r.name}</button>)}
        </div>
        <div className="mt-4 space-y-3">
          {filtered.map(s=>{
            const playing = current===s.id && isPlaying
            return (
              <div key={s.id} className="bg-white rounded-2xl p-3 flex justify-between items-center">
                <button onClick={()=>play(s.id)} className={`w-11 h-11 rounded-full ${playing?'bg-[#0f5a43] text-white':'bg-orange-100'}`}>{playing?'⏸️':'▶️'}</button>
                <div className="flex items-center gap-3"><p className="font-bold">{s.name}</p><div className="w-12 h-12 rounded-xl bg-[#f6f1df] flex items-center justify-center font-bold">{s.id}</div></div>
              </div>
            )
          })}
        </div>
      </div>

      {current && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button onClick={()=>audioRef.current.currentTime-=10} className="w-9 h-9 bg-gray-100 rounded-full">⏪</button>
              <button onClick={()=>play(current)} className="w-12 h-12 bg-[#0f5a43] text-white rounded-full text-xl">{isPlaying?'⏸️':'▶️'}</button>
              <button onClick={()=>audioRef.current.currentTime+=10} className="w-9 h-9 bg-gray-100 rounded-full">⏩</button>
            </div>
            <p className="font-bold text-sm">{allSurahs.find(s=>s.id===current)?.name}</p>
          </div>
          <div className="flex gap-2 items-center mt-2 text-xs text-gray-500">
            <span>{Math.floor(time/60)}:{String(Math.floor(time%60)).padStart(2,'0')}</span>
            <input type="range" className="flex-1 accent-[#0f5a43]" min="0" max={dur||100} value={time} onChange={e=>audioRef.current.currentTime=e.target.value} />
            <span>{Math.floor(dur/60)}:{String(Math.floor(dur%60)).padStart(2,'0')}</span>
          </div>
        </div>
      )}
    </div>
  )
}