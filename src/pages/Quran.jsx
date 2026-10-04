import { useState } from 'react'
const surahs = [{ id: 1, name: "الفاتحة", ayas: 7, type: "مكية" }, { id: 2, name: "البقرة", ayas: 286, type: "مدنية" }, { id: 3, name: "آل عمران", ayas: 200, type: "مدنية" }, { id: 4, name: "النساء", ayas: 176, type: "مدنية" }, { id: 5, name: "المائدة", ayas: 120, type: "مدنية" }, { id: 6, name: "الأنعام", ayas: 165, type: "مكية" }, { id: 7, name: "الأعراف", ayas: 206, type: "مكية" }, { id: 8, name: "الأنفال", ayas: 75, type: "مدنية" }, { id: 9, name: "التوبة", ayas: 129, type: "مدنية" }, { id: 10, name: "يونس", ayas: 109, type: "مكية" }, { id: 11, name: "هود", ayas: 123, type: "مكية" }, { id: 12, name: "يوسف", ayas: 111, type: "مكية" }, { id: 13, name: "الرعد", ayas: 43, type: "مدنية" }, { id: 14, name: "إبراهيم", ayas: 52, type: "مكية" }, { id: 15, name: "الحجر", ayas: 99, type: "مكية" }, { id: 16, name: "النحل", ayas: 128, type: "مكية" }, { id: 17, name: "الإسراء", ayas: 111, type: "مكية" }, { id: 18, name: "الكهف", ayas: 110, type: "مكية" }, { id: 19, name: "مريم", ayas: 98, type: "مكية" }, { id: 20, name: "طه", ayas: 135, type: "مكية" }, { id: 21, name: "الأنبياء", ayas: 112, type: "مكية" }, { id: 22, name: "الحج", ayas: 78, type: "مدنية" }, { id: 23, name: "المؤمنون", ayas: 118, type: "مكية" }, { id: 24, name: "النور", ayas: 64, type: "مدنية" }, { id: 25, name: "الفرقان", ayas: 77, type: "مكية" }, { id: 26, name: "الشعراء", ayas: 227, type: "مكية" }, { id: 27, name: "النمل", ayas: 93, type: "مكية" }, { id: 28, name: "القصص", ayas: 88, type: "مكية" }, { id: 29, name: "العنكبوت", ayas: 69, type: "مكية" }, { id: 30, name: "الروم", ayas: 60, type: "مكية" }, { id: 31, name: "لقمان", ayas: 34, type: "مكية" }, { id: 32, name: "السجدة", ayas: 30, type: "مكية" }, { id: 33, name: "الأحزاب", ayas: 73, type: "مدنية" }, { id: 34, name: "سبأ", ayas: 54, type: "مكية" }, { id: 35, name: "فاطر", ayas: 45, type: "مكية" }, { id: 36, name: "يس", ayas: 83, type: "مكية" }, { id: 37, name: "الصافات", ayas: 182, type: "مكية" }, { id: 38, name: "ص", ayas: 88, type: "مكية" }, { id: 39, name: "الزمر", ayas: 75, type: "مكية" }, { id: 40, name: "غافر", ayas: 85, type: "مكية" }, { id: 41, name: "فصلت", ayas: 54, type: "مكية" }, { id: 42, name: "الشورى", ayas: 53, type: "مكية" }, { id: 43, name: "الزخرف", ayas: 89, type: "مكية" }, { id: 44, name: "الدخان", ayas: 59, type: "مكية" }, { id: 45, name: "الجاثية", ayas: 37, type: "مكية" }, { id: 46, name: "الأحقاف", ayas: 35, type: "مكية" }, { id: 47, name: "محمد", ayas: 38, type: "مدنية" }, { id: 48, name: "الفتح", ayas: 29, type: "مدنية" }, { id: 49, name: "الحجرات", ayas: 18, type: "مدنية" }, { id: 50, name: "ق", ayas: 45, type: "مكية" }, { id: 51, name: "الذاريات", ayas: 60, type: "مكية" }, { id: 52, name: "الطور", ayas: 49, type: "مكية" }, { id: 53, name: "النجم", ayas: 62, type: "مكية" }, { id: 54, name: "القمر", ayas: 55, type: "مكية" }, { id: 55, name: "الرحمن", ayas: 78, type: "مدنية" }, { id: 56, name: "الواقعة", ayas: 96, type: "مكية" }, { id: 57, name: "الحديد", ayas: 29, type: "مدنية" }, { id: 58, name: "المجادلة", ayas: 22, type: "مدنية" }, { id: 59, name: "الحشر", ayas: 24, type: "مدنية" }, { id: 60, name: "الممتحنة", ayas: 13, type: "مدنية" }, { id: 61, name: "الصف", ayas: 14, type: "مدنية" }, { id: 62, name: "الجمعة", ayas: 11, type: "مدنية" }, { id: 63, name: "المنافقون", ayas: 11, type: "مدنية" }, { id: 64, name: "التغابن", ayas: 18, type: "مدنية" }, { id: 65, name: "الطلاق", ayas: 12, type: "مدنية" }, { id: 66, name: "التحريم", ayas: 12, type: "مدنية" }, { id: 67, name: "الملك", ayas: 30, type: "مكية" }, { id: 68, name: "القلم", ayas: 52, type: "مكية" }, { id: 69, name: "الحاقة", ayas: 52, type: "مكية" }, { id: 70, name: "المعارج", ayas: 44, type: "مكية" }, { id: 71, name: "نوح", ayas: 28, type: "مكية" }, { id: 72, name: "الجن", ayas: 28, type: "مكية" }, { id: 73, name: "المزمل", ayas: 20, type: "مكية" }, { id: 74, name: "المدثر", ayas: 56, type: "مكية" }, { id: 75, name: "القيامة", ayas: 40, type: "مكية" }, { id: 76, name: "الإنسان", ayas: 31, type: "مدنية" }, { id: 77, name: "المرسلات", ayas: 50, type: "مكية" }, { id: 78, name: "النبأ", ayas: 40, type: "مكية" }, { id: 79, name: "النازعات", ayas: 46, type: "مكية" }, { id: 80, name: "عبس", ayas: 42, type: "مكية" }, { id: 81, name: "التكوير", ayas: 29, type: "مكية" }, { id: 82, name: "الانفطار", ayas: 19, type: "مكية" }, { id: 83, name: "المطففين", ayas: 36, type: "مكية" }, { id: 84, name: "الانشقاق", ayas: 25, type: "مكية" }, { id: 85, name: "البروج", ayas: 22, type: "مكية" }, { id: 86, name: "الطارق", ayas: 17, type: "مكية" }, { id: 87, name: "الأعلى", ayas: 19, type: "مكية" }, { id: 88, name: "الغاشية", ayas: 26, type: "مكية" }, { id: 89, name: "الفجر", ayas: 30, type: "مكية" }, { id: 90, name: "البلد", ayas: 20, type: "مكية" }, { id: 91, name: "الشمس", ayas: 15, type: "مكية" }, { id: 92, name: "الليل", ayas: 21, type: "مكية" }, { id: 93, name: "الضحى", ayas: 11, type: "مكية" }, { id: 94, name: "الشرح", ayas: 8, type: "مكية" }, { id: 95, name: "التين", ayas: 8, type: "مكية" }, { id: 96, name: "العلق", ayas: 19, type: "مكية" }, { id: 97, name: "القدر", ayas: 5, type: "مكية" }, { id: 98, name: "البينة", ayas: 8, type: "مدنية" }, { id: 99, name: "الزلزلة", ayas: 8, type: "مدنية" }, { id: 100, name: "العاديات", ayas: 11, type: "مكية" }, { id: 101, name: "القارعة", ayas: 11, type: "مكية" }, { id: 102, name: "التكاثر", ayas: 8, type: "مكية" }, { id: 103, name: "العصر", ayas: 3, type: "مكية" }, { id: 104, name: "الهمزة", ayas: 9, type: "مكية" }, { id: 105, name: "الفيل", ayas: 5, type: "مكية" }, { id: 106, name: "قريش", ayas: 4, type: "مكية" }, { id: 107, name: "الماعون", ayas: 7, type: "مكية" }, { id: 108, name: "الكوثر", ayas: 3, type: "مكية" }, { id: 109, name: "الكافرون", ayas: 6, type: "مكية" }, { id: 110, name: "النصر", ayas: 3, type: "مدنية" }, { id: 111, name: "المسد", ayas: 5, type: "مكية" }, { id: 112, name: "الإخلاص", ayas: 4, type: "مكية" }, { id: 113, name: "الفلق", ayas: 5, type: "مكية" }, { id: 114, name: "الناس", ayas: 6, type: "مكية" }]

export default function Quran({ onReading, onHome }) {
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(null)
    const [ayahs, setAyahs] = useState([])
    const [loading, setLoading] = useState(false)
    const list = surahs.filter(s => s.name.includes(search))

    const open = async (id) => {
        onReading?.(true)
        setSelected(id)
        setLoading(true)
        try {
            const r = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`)
            const d = await r.json()
            const cleaned = d.data.ayahs.map((a, i) => {
                if (i === 0 && a.text.includes('بِسْمِ')) {
                    let t = a.text
                    const end = t.indexOf('الرَّحِيمِ') !== -1 ? t.indexOf('الرَّحِيمِ') + 9 : 38
                    t = t.slice(end).trim()
                    return { ...a, text: t }
                }
                return a
            })
            setAyahs(cleaned)
        } catch { setAyahs([]) }
        setLoading(false)
        window.scrollTo(0, 0)
    }
    const close = () => { setSelected(null); onReading?.(false); setAyahs([]) }

    if (selected) {
        const info = surahs.find(s => s.id === selected)
        return (
            <div className="min-h-screen">
                <div className="sticky top-0 z-40 h-[56px] bg-white/90 dark:bg-[#162032]/90 backdrop-blur-xl border-b border-[#f0e6c8] dark:border-white/10 px-3 flex items-center justify-between">
                    <div className="flex items-center gap-3"><button onClick={close} className="w-9 h-9 rounded-full bg-[#f8f6f1] dark:bg-white/10 border flex items-center justify-center font-bold">→</button><div><p className="font-bold text-[14px]">{info.name}</p><p className="text-[10px] text-gray-400">{info.type} • {info.ayas} آيات</p></div></div>
                    <button onClick={onHome} className="w-9 h-9 rounded-full bg-[#f6f1df] dark:bg-white/10 flex items-center justify-center">🏠</button>
                </div>
                <div className="p-3"><div className="mushaf-page p-6">
                    {selected !== 1 && selected !== 9 && <div className="text-center mb-6 pb-5 border-b border-[#f0e6c8]"><p className="quran-text text-[26px] text-[#0f5a43]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p></div>}
                    {loading ? <p className="text-center py-20 animate-pulse">جاري التحميل...</p> :
                        <div className="quran-text text-[24px] leading-[2.7] text-[#2b2b2b] dark:text-gray-100 text-justify">
                            {ayahs.map(a => <span key={a.number} className="inline">{a.text}<span className="inline-flex items-center justify-center w-7 h-7 mx-2 text-[12px] bg-[#f6f1df] text-[#8c7a4b] rounded-full border border-[#e9dfbd]">{a.numberInSurah}</span></span>)}
                        </div>}
                </div></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {/* هيدر صغير وثابت */}
            <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#101a2c]/90 backdrop-blur-xl border-b border-[#f0e6c8] dark:border-white/10">
                <div className="h-[56px] px-4 flex items-center justify-between">
                    <button onClick={onHome} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0f5a43] text-white text-[13px] font-bold shadow">
                        <span className="text-[14px]">→</span> رجوع للرئيسية
                    </button>
                    <p className="font-bold text-[14px]">القرآن الكريم • 114 سورة</p>
                </div>
                {/* شريط البحث ثابت تحت الهيدر */}
                <div className="px-3 pb-3">
                    <div className="relative">
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن سورة..." className="w-full h-[40px] rounded-xl bg-[#f8f6f1] dark:bg-white/10 text-gray-800 dark:text-white pr-10 pl-3 outline-none text-sm border border-[#f0e6c8] dark:border-white/10" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
                    </div>
                </div>
            </div>

            <div className="px-3 pt-3"><div className="grid gap-2.5">{list.map(s => <button key={s.id} onClick={() => open(s.id)} className="surah-card rounded-[16px] p-3.5 flex items-center justify-between text-right"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-[10px] bg-[#f6f1df] border border-[#e9dfbd] flex items-center justify-center text-[#8c7a4b] font-bold text-[13px]">{s.id}</div><div><p className="font-bold text-[15px]">{s.name}</p><p className="text-[10px] text-gray-400">{s.type} • {s.ayas} آية</p></div></div><span className="text-gray-300">›</span></button>)}</div></div>
        </div>
    )
}