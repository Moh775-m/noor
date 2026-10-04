import { useState, useRef, useEffect } from 'react'

const AUDIO_CACHE = "noor-audio-v2";

const reciters = [
    { id: 'alafasy', name: 'مشاري العفاسي', server: 'https://server8.mp3quran.net/afs/' },
    { id: 'husary', name: 'محمود الحصري', server: 'https://server13.mp3quran.net/husr/' },
    { id: 'minshawi', name: 'المنشاوي', server: 'https://server10.mp3quran.net/minsh/' },
    { id: 'ajmy', name: 'أحمد العجمي', server: 'https://server10.mp3quran.net/ajm/' },
    { id: 'sudais', name: 'السديس', server: 'https://server8.mp3quran.net/sds/' },
]
const allSurahs = [{ id: 1, name: "الفاتحة" }, { id: 2, name: "البقرة" }, { id: 3, name: "آل عمران" }, { id: 4, name: "النساء" }, { id: 5, name: "المائدة" }, { id: 6, name: "الأنعام" }, { id: 7, name: "الأعراف" }, { id: 8, name: "الأنفال" }, { id: 9, name: "التوبة" }, { id: 10, name: "يونس" }, { id: 11, name: "هود" }, { id: 12, name: "يوسف" }, { id: 13, name: "الرعد" }, { id: 14, name: "إبراهيم" }, { id: 15, name: "الحجر" }, { id: 16, name: "النحل" }, { id: 17, name: "الإسراء" }, { id: 18, name: "الكهف" }, { id: 19, name: "مريم" }, { id: 20, name: "طه" }, { id: 21, name: "الأنبياء" }, { id: 22, name: "الحج" }, { id: 23, name: "المؤمنون" }, { id: 24, name: "النور" }, { id: 25, name: "الفرقان" }, { id: 26, name: "الشعراء" }, { id: 27, name: "النمل" }, { id: 28, name: "القصص" }, { id: 29, name: "العنكبوت" }, { id: 30, name: "الروم" }, { id: 31, name: "لقمان" }, { id: 32, name: "السجدة" }, { id: 33, name: "الأحزاب" }, { id: 34, name: "سبأ" }, { id: 35, name: "فاطر" }, { id: 36, name: "يس" }, { id: 37, name: "الصافات" }, { id: 38, name: "ص" }, { id: 39, name: "الزمر" }, { id: 40, name: "غافر" }, { id: 41, name: "فصلت" }, { id: 42, name: "الشورى" }, { id: 43, name: "الزخرف" }, { id: 44, name: "الدخان" }, { id: 45, name: "الجاثية" }, { id: 46, name: "الأحقاف" }, { id: 47, name: "محمد" }, { id: 48, name: "الفتح" }, { id: 49, name: "الحجرات" }, { id: 50, name: "ق" }, { id: 51, name: "الذاريات" }, { id: 52, name: "الطور" }, { id: 53, name: "النجم" }, { id: 54, name: "القمر" }, { id: 55, name: "الرحمن" }, { id: 56, name: "الواقعة" }, { id: 57, name: "الحديد" }, { id: 58, name: "المجادلة" }, { id: 59, name: "الحشر" }, { id: 60, name: "الممتحنة" }, { id: 61, name: "الصف" }, { id: 62, name: "الجمعة" }, { id: 63, name: "المنافقون" }, { id: 64, name: "التغابن" }, { id: 65, name: "الطلاق" }, { id: 66, name: "التحريم" }, { id: 67, name: "الملك" }, { id: 68, name: "القلم" }, { id: 69, name: "الحاقة" }, { id: 70, name: "المعارج" }, { id: 71, name: "نوح" }, { id: 72, name: "الجن" }, { id: 73, name: "المزمل" }, { id: 74, name: "المدثر" }, { id: 75, name: "القيامة" }, { id: 76, name: "الإنسان" }, { id: 77, name: "المرسلات" }, { id: 78, name: "النبأ" }, { id: 79, name: "النازعات" }, { id: 80, name: "عبس" }, { id: 81, name: "التكوير" }, { id: 82, name: "الانفطار" }, { id: 83, name: "المطففين" }, { id: 84, name: "الانشقاق" }, { id: 85, name: "البروج" }, { id: 86, name: "الطارق" }, { id: 87, name: "الأعلى" }, { id: 88, name: "الغاشية" }, { id: 89, name: "الفجر" }, { id: 90, name: "البلد" }, { id: 91, name: "الشمس" }, { id: 92, name: "الليل" }, { id: 93, name: "الضحى" }, { id: 94, name: "الشرح" }, { id: 95, name: "التين" }, { id: 96, name: "العلق" }, { id: 97, name: "القدر" }, { id: 98, name: "البينة" }, { id: 99, name: "الزلزلة" }, { id: 100, name: "العاديات" }, { id: 101, name: "القارعة" }, { id: 102, name: "التكاثر" }, { id: 103, name: "العصر" }, { id: 104, name: "الهمزة" }, { id: 105, name: "الفيل" }, { id: 106, name: "قريش" }, { id: 107, name: "الماعون" }, { id: 108, name: "الكوثر" }, { id: 109, name: "الكافرون" }, { id: 110, name: "النصر" }, { id: 111, name: "المسد" }, { id: 112, name: "الإخلاص" }, { id: 113, name: "الفلق" }, { id: 114, name: "الناس" },]

export default function Audio({ onHome }) {
    const [reciter, setReciter] = useState(reciters[0])
    const [currentId, setCurrentId] = useState(null)
    const [playing, setPlaying] = useState(false)
    const [search, setSearch] = useState('')
    const [downloaded, setDownloaded] = useState({})
    const [downloadingId, setDownloadingId] = useState(null)
    const audioRef = useRef(null)

    const list = allSurahs.filter(s => s.name.includes(search))
    const getUrl = (id) => `${reciter.server}${String(id).padStart(3, '0')}.mp3`

    // تحميل قائمة المحفوظات عند فتح الصفحة
    useEffect(() => {
        const loadCache = async () => {
            if (!('caches' in window)) return;
            const cache = await caches.open(AUDIO_CACHE);
            const keys = await cache.keys();
            const map = {};
            keys.forEach(req => map[req.url] = true);
            setDownloaded(map);
        };
        loadCache();
    }, []);

    // إعادة فحص الكاش عند تغيير القارئ
    useEffect(() => {
        const loadCache = async () => {
            if (!('caches' in window)) return;
            const cache = await caches.open(AUDIO_CACHE);
            const keys = await cache.keys();
            const map = {};
            keys.forEach(req => map[req.url] = true);
            setDownloaded(map);
        };
        loadCache();
    }, [reciter]);

    const handlePlay = (id) => {
        if (currentId === id) {
            if (playing) { audioRef.current.pause(); setPlaying(false) }
            else { audioRef.current.play(); setPlaying(true) }
        } else { setCurrentId(id) }
    }

    const handleDownload = async (e, id) => {
        e.stopPropagation(); // عشان ما يشغل السورة
        const url = getUrl(id);
        if (downloaded[url]) return;
        setDownloadingId(id);
        try {
            const cache = await caches.open(AUDIO_CACHE);
            // نستخدم fetch مع no-cors؟ لا، نحتاج cors
            const res = await fetch(url, { mode: 'cors' });
            if (!res.ok) throw new Error("fail");
            await cache.put(url, res);
            setDownloaded(prev => ({...prev, [url]: true }));
        } catch (err) {
            alert("فشل التحميل، تأكد من النت. بعض السيرفرات لا تسمح بالحفظ المباشر لكنها ستحفظ تلقائياً عند الاستماع.");
            // حتى لو فشل الـ put اليدوي، الـ sw.js بيحفظها عند التشغيل
        }
        setDownloadingId(null);
    }

    const isCached = (id) => {
        const url = getUrl(id);
        return!!downloaded[url];
    }

    useEffect(() => {
        if (currentId && audioRef.current) {
            audioRef.current.src = getUrl(currentId)
            audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
        }
    }, [currentId, reciter])

    return (
        <div className="min-h-screen pb-28">
            <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#101a2c]/90 backdrop-blur-xl border-b border-[#f0e6c8] dark:border-white/10">
                <div className="h-[56px] px-4 flex items-center justify-between">
                    <button onClick={onHome} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0f5a43] text-white text-[13px] font-bold shadow">
                        <span className="text-[14px]">→</span> رجوع للرئيسية
                    </button>
                    <p className="font-bold text-[14px]">القرآن صوتاً</p>
                </div>
                <div className="px-3 pb-3 space-y-2">
                    <div className="relative">
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن سورة..." className="w-full h-[40px] rounded-xl bg-[#f8f6f1] dark:bg-white/10 text-gray-800 dark:text-white pr-10 pl-3 outline-none text-sm border border-[#f0e6c8] dark:border-white/10" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {reciters.map(r => <button key={r.id} onClick={() => setReciter(r)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] font-bold border ${reciter.id === r.id? 'bg-[#0f5a43] text-white border-[#0f5a43]' : 'bg-[#f8f6f1] dark:bg-white/10 text-[#8c7a4b] border-[#e9dfbd]'}`}>{r.name}</button>)}
                    </div>
                    <p className="text-[11px] text-gray-500 px-1">💡 السورة التي تستمع لها تُحفظ تلقائياً للاستماع بدون نت</p>
                </div>
            </div>

            <div className="px-3 pt-3 grid gap-2.5">
                {list.map(s => {
                  const cached = isCached(s.id);
                  const isDownloading = downloadingId === s.id;
                  return (
                    <div key={s.id} className={`surah-card rounded-[16px] p-3.5 flex items-center justify-between text-right ${currentId === s.id? '!border-[#0f5a43]!bg-[#f0faf6]' : ''}`}>
                        <button onClick={() => handlePlay(s.id)} className="flex items-center gap-3 flex-1 text-right">
                            <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center font-bold text-[13px] border ${currentId === s.id? 'bg-[#0f5a43] text-white' : 'bg-[#f6f1df] text-[#8c7a4b] border-[#e9dfbd]'}`}>{s.id}</div>
                            <div>
                                <p className="font-bold text-[15px]">{s.name}</p>
                                {cached && <p className="text-[11px] text-green-600">✅ محفوظة بدون نت</p>}
                            </div>
                        </button>

                        <div className="flex items-center gap-2">
                            {/* زر التحميل */}
                            <button
                                onClick={(e) => handleDownload(e, s.id)}
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] border ${cached? 'bg-green-50 border-green-200 text-green-600' : 'bg-[#f8f6f1] border-[#e9dfbd] text-[#8c7a4b]'}`}
                                title={cached? "محفوظة" : "تحميل للاستماع بدون نت"}
                            >
                                {isDownloading? '⏳' : cached? '✓' : '⬇️'}
                            </button>

                            <button onClick={() => handlePlay(s.id)} className={`w-9 h-9 rounded-full flex items-center justify-center ${currentId === s.id && playing? 'bg-[#0f5a43] text-white' : 'bg-[#f8f6f1]'}`}>{currentId === s.id && playing? '❚❚' : '▶'}</button>
                        </div>
                    </div>
                  )
                })}
            </div>

            <audio ref={audioRef} onEnded={() => setPlaying(false)} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} preload="none" />
            {currentId && (
                <div className="fixed bottom-[70px] left-3 right-3 max-w-[480px] mx-auto bg-white dark:bg-[#162032] border border-[#e9dfbd] rounded-2xl p-3 shadow-2xl flex items-center gap-3 z-50">
                    <button onClick={() => handlePlay(currentId)} className="w-11 h-11 rounded-full bg-[#0f5a43] text-white flex items-center justify-center font-bold">{playing? '❚❚' : '▶'}</button>
                    <div className="flex-1"><p className="text-sm font-bold">سورة {allSurahs.find(x => x.id === currentId)?.name}</p><p className="text-[11px] text-gray-400">{reciter.name} • {playing? 'يعمل الآن' : 'متوقف'} {isCached(currentId)? '• ✅ بدون نت' : ''}</p></div>
                    <button onClick={() => { audioRef.current.pause(); setCurrentId(null); setPlaying(false) }} className="w-8 h-8 rounded-full bg-gray-100">✕</button>
                </div>
            )}
        </div>
    )
}