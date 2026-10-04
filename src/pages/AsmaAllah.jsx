import { useState } from 'react'

const asma = [
{ id:1, name:"الرَّحْمَنُ", meaning:"الذي وسعت رحمته كل شيء", dalil:"{الرَّحْمَنُ عَلَى الْعَرْشِ اسْتَوَى}", dua:"يا رحمن الدنيا والآخرة ارحمني" },
{ id:2, name:"الرَّحِيمُ", meaning:"الذي يرحم المؤمنين رحمة خاصة", dalil:"{وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا}", dua:"اللهم برحمتك اغفر لي" },
{ id:3, name:"المَلِكُ", meaning:"المالك لكل شيء", dalil:"{المَلِكُ القُدُّوسُ}", dua:"يا مالك الملك" },
{ id:4, name:"القُدُّوسُ", meaning:"المنزه عن كل نقص", dalil:"{المَلِكُ القُدُّوسُ}", dua:"سبوح قدوس" },
{ id:5, name:"السَّلَامُ", meaning:"السالم من كل عيب", dalil:"{السَّلَامُ المُؤْمِنُ}", dua:"اللهم أنت السلام" },
{ id:6, name:"المُؤْمِنُ", meaning:"الذي آمن خلقه من ظلمه", dalil:"{السَّلَامُ المُؤْمِنُ}", dua:"يا مؤمن آمني" },
{ id:7, name:"المُهَيْمِنُ", meaning:"الرقيب على كل شيء", dalil:"{المُهَيْمِنُ العَزِيزُ}", dua:"يا مهيمن احفظني" },
{ id:8, name:"العَزِيزُ", meaning:"الغالب الذي لا يغلب", dalil:"{وَهُوَ العَزِيزُ الحَكِيمُ}", dua:"يا عزيز أعزني" },
{ id:9, name:"الجَبَّارُ", meaning:"يجبر الكسير ويقهر الجبابرة", dalil:"{الجَبَّارُ المُتَكَبِّرُ}", dua:"يا جبار اجبر كسري" },
{ id:10, name:"المُتَكَبِّرُ", meaning:"المتعالي عن صفات الخلق", dalil:"{المُتَكَبِّرُ}", dua:"" },
{ id:11, name:"الخَالِقُ", meaning:"خلق كل شيء من عدم", dalil:"{هُوَ اللَّهُ الخَالِقُ}", dua:"" },
{ id:12, name:"البَارِئُ", meaning:"برأ الخلق وأوجدهم", dalil:"{الخَالِقُ البَارِئُ}", dua:"" },
{ id:13, name:"المُصَوِّرُ", meaning:"صور الموجودات", dalil:"{المُصَوِّرُ}", dua:"" },
{ id:14, name:"الغَفَّارُ", meaning:"كثير المغفرة", dalil:"{إِنِّي أَنَا الغَفَّارُ}", dua:"يا غفار اغفر لي" },
{ id:15, name:"القَهَّارُ", meaning:"قهر كل شيء", dalil:"{الوَاحِدُ القَهَّارُ}", dua:"" },
{ id:16, name:"الوَهَّابُ", meaning:"كثير العطاء", dalil:"{إِنَّكَ أَنْتَ الوَهَّابُ}", dua:"يا وهاب هب لي" },
{ id:17, name:"الرَّزَّاقُ", meaning:"يرزق جميع الخلائق", dalil:"{إِنَّ اللَّهَ هُوَ الرَّزَّاقُ}", dua:"يا رزاق ارزقني" },
{ id:18, name:"الفَتَّاحُ", meaning:"يفتح أبواب الرحمة", dalil:"{وَهُوَ الفَتَّاحُ}", dua:"يا فتاح افتح لي" },
{ id:19, name:"العَلِيمُ", meaning:"عالم بكل شيء", dalil:"{وَهُوَ العَلِيمُ}", dua:"يا عليم علمني" },
{ id:20, name:"القَابِضُ", meaning:"يقبض الأرزاق", dalil:"", dua:"" },
{ id:21, name:"البَاسِطُ", meaning:"يبسط الرزق", dalil:"", dua:"" },
{ id:22, name:"الخَافِضُ", meaning:"يخفض الجبارين", dalil:"", dua:"" },
{ id:23, name:"الرَّافِعُ", meaning:"يرفع المؤمنين", dalil:"", dua:"يا رافع ارفع قدري" },
{ id:24, name:"المُعِزُّ", meaning:"يعز من يشاء", dalil:"", dua:"" },
{ id:25, name:"المُذِلُّ", meaning:"يذل من يشاء", dalil:"", dua:"" },
{ id:26, name:"السَّمِيعُ", meaning:"يسمع كل شيء", dalil:"{وَهُوَ السَّمِيعُ}", dua:"يا سميع استجب" },
{ id:27, name:"البَصِيرُ", meaning:"يبصر كل شيء", dalil:"{السَّمِيعُ البَصِيرُ}", dua:"" },
{ id:28, name:"الحَكَمُ", meaning:"الحاكم", dalil:"", dua:"" },
{ id:29, name:"العَدْلُ", meaning:"العادل", dalil:"", dua:"" },
{ id:30, name:"اللَّطِيفُ", meaning:"الرفيق بعباده", dalil:"{اللَّطِيفُ الخَبِيرُ}", dua:"يا لطيف الطف بي" },
{ id:31, name:"الخَبِيرُ", meaning:"عالم بالبواطن", dalil:"{اللَّطِيفُ الخَبِيرُ}", dua:"" },
{ id:32, name:"الحَلِيمُ", meaning:"لا يعجل بالعقوبة", dalil:"{عَلِيمٌ حَلِيمٌ}", dua:"" },
{ id:33, name:"العَظِيمُ", meaning:"له العظمة", dalil:"{العَلِيُّ العَظِيمُ}", dua:"" },
{ id:34, name:"الغَفُورُ", meaning:"كثير المغفرة", dalil:"{الغَفُورُ الوَدُودُ}", dua:"يا غفور اغفر لي" },
{ id:35, name:"الشَّكُورُ", meaning:"يجازي بالقليل كثيرا", dalil:"{غَفُورٌ شَكُورٌ}", dua:"" },
{ id:36, name:"العَلِيُّ", meaning:"العالي فوق كل شيء", dalil:"{العَلِيُّ العَظِيمُ}", dua:"" },
{ id:37, name:"الكَبِيرُ", meaning:"الكبير في ذاته", dalil:"{العَلِيُّ الكَبِيرُ}", dua:"" },
{ id:38, name:"الحَفِيظُ", meaning:"الحافظ لكل شيء", dalil:"{حَفِيظٌ}", dua:"يا حفيظ احفظني" },
{ id:39, name:"المُقِيتُ", meaning:"يعطي كل مخلوق قوته", dalil:"{مُقِيتًا}", dua:"" },
{ id:40, name:"الحَسِيبُ", meaning:"الكافي المحاسب", dalil:"{حَسِيبًا}", dua:"حسبي الله" },
{ id:41, name:"الجَلِيلُ", meaning:"ذو الجلال", dalil:"", dua:"" },
{ id:42, name:"الكَرِيمُ", meaning:"كثير الخير", dalil:"{غَنِيٌّ كَرِيمٌ}", dua:"يا كريم أكرمني" },
{ id:43, name:"الرَّقِيبُ", meaning:"المراقب", dalil:"{رَقِيبًا}", dua:"" },
{ id:44, name:"المُجِيبُ", meaning:"يجيب الدعاء", dalil:"{قَرِيبٌ مُجِيبٌ}", dua:"يا مجيب أجب" },
{ id:45, name:"الوَاسِعُ", meaning:"واسع الرحمة", dalil:"{وَاسِعٌ عَلِيمٌ}", dua:"" },
{ id:46, name:"الحَكِيمُ", meaning:"يضع الشيء في موضعه", dalil:"{العَزِيزُ الحَكِيمُ}", dua:"" },
{ id:47, name:"الوَدُودُ", meaning:"يحب أولياءه", dalil:"{الغَفُورُ الوَدُودُ}", dua:"يا ودود" },
{ id:48, name:"المَجِيدُ", meaning:"العظيم الكريم", dalil:"{مَجِيدٌ}", dua:"" },
{ id:49, name:"البَاعِثُ", meaning:"يبعث الخلق", dalil:"", dua:"" },
{ id:50, name:"الشَّهِيدُ", meaning:"الشاهد", dalil:"{شَهِيدٌ}", dua:"" },
{ id:51, name:"الحَقُّ", meaning:"الحق", dalil:"{الحَقُّ المُبِينُ}", dua:"" },
{ id:52, name:"الوَكِيلُ", meaning:"الكفيل", dalil:"{وَكِيلًا}", dua:"توكلت على الله" },
{ id:53, name:"القَوِيُّ", meaning:"القوي", dalil:"{القَوِيُّ العَزِيزُ}", dua:"" },
{ id:54, name:"المَتِينُ", meaning:"الشديد", dalil:"{المَتِينُ}", dua:"" },
{ id:55, name:"الوَلِيُّ", meaning:"الناصر", dalil:"{الوَلِيُّ الحَمِيدُ}", dua:"" },
{ id:56, name:"الحَمِيدُ", meaning:"المحمود", dalil:"{الوَلِيُّ الحَمِيدُ}", dua:"" },
{ id:57, name:"المُحْصِي", meaning:"أحصى كل شيء", dalil:"", dua:"" },
{ id:58, name:"المُبْدِئُ", meaning:"بدأ الخلق", dalil:"", dua:"" },
{ id:59, name:"المُعِيدُ", meaning:"يعيد الخلق", dalil:"", dua:"" },
{ id:60, name:"المُحْيِي", meaning:"يحيي", dalil:"", dua:"يا محيي أحي قلبي" },
{ id:61, name:"المُمِيتُ", meaning:"يميت", dalil:"", dua:"" },
{ id:62, name:"الحَيُّ", meaning:"الحي الذي لا يموت", dalil:"{الحَيُّ القَيُّومُ}", dua:"يا حي يا قيوم" },
{ id:63, name:"القَيُّومُ", meaning:"القائم بنفسه", dalil:"{الحَيُّ القَيُّومُ}", dua:"" },
{ id:64, name:"الوَاجِدُ", meaning:"الغني", dalil:"", dua:"" },
{ id:65, name:"المَاجِدُ", meaning:"العظيم", dalil:"", dua:"" },
{ id:66, name:"الوَاحِدُ", meaning:"الواحد", dalil:"", dua:"" },
{ id:67, name:"الصَّمَدُ", meaning:"تقصده الخلائق", dalil:"{الصَّمَدُ}", dua:"" },
{ id:68, name:"القَادِرُ", meaning:"القادر", dalil:"", dua:"" },
{ id:69, name:"المُقْتَدِرُ", meaning:"التام القدرة", dalil:"{مُقْتَدِرٍ}", dua:"" },
{ id:70, name:"المُقَدِّمُ", meaning:"يقدم", dalil:"", dua:"" },
{ id:71, name:"المُؤَخِّرُ", meaning:"يؤخر", dalil:"", dua:"" },
{ id:72, name:"الأَوَّلُ", meaning:"ليس قبله شيء", dalil:"{الأَوَّلُ}", dua:"" },
{ id:73, name:"الآخِرُ", meaning:"ليس بعده شيء", dalil:"{الآخِرُ}", dua:"" },
{ id:74, name:"الظَّاهِرُ", meaning:"الظاهر فوق كل شيء", dalil:"", dua:"" },
{ id:75, name:"البَاطِنُ", meaning:"العالم بالبواطن", dalil:"", dua:"" },
{ id:76, name:"الوَالِي", meaning:"المالك", dalil:"", dua:"" },
{ id:77, name:"المُتَعَالِ", meaning:"المتعالي", dalil:"{المُتَعَالِ}", dua:"" },
{ id:78, name:"البَرُّ", meaning:"البار", dalil:"{البَرُّ الرَّحِيمُ}", dua:"" },
{ id:79, name:"التَّوَّابُ", meaning:"كثير التوبة", dalil:"{التَّوَّابُ}", dua:"يا تواب تب علي" },
{ id:80, name:"المُنْتَقِمُ", meaning:"ينتقم من الظالمين", dalil:"", dua:"" },
{ id:81, name:"العَفُوُّ", meaning:"كثير العفو", dalil:"{عَفُوًّا غَفُورًا}", dua:"اللهم إنك عفو تحب العفو فاعف عني" },
{ id:82, name:"الرَّؤُوفُ", meaning:"شديد الرأفة", dalil:"{رَؤُوفٌ رَحِيمٌ}", dua:"" },
{ id:83, name:"مَالِكُ المُلْكِ", meaning:"مالك الملك", dalil:"{مَالِكَ المُلْكِ}", dua:"" },
{ id:84, name:"ذُو الجَلَالِ", meaning:"صاحب الجلال", dalil:"{ذُو الجَلَالِ وَالإِكْرَامِ}", dua:"يا ذا الجلال والإكرام" },
{ id:85, name:"المُقْسِطُ", meaning:"العادل", dalil:"", dua:"" },
{ id:86, name:"الجَامِعُ", meaning:"يجمع الخلائق", dalil:"", dua:"" },
{ id:87, name:"الغَنِيُّ", meaning:"الغني عن كل أحد", dalil:"{الغَنِيُّ}", dua:"" },
{ id:88, name:"المُغْنِي", meaning:"يغني من يشاء", dalil:"", dua:"يا مغني أغنني" },
{ id:89, name:"المَانِعُ", meaning:"يمنع ما يشاء", dalil:"", dua:"" },
{ id:90, name:"الضَّارُّ", meaning:"يضر من يشاء", dalil:"", dua:"" },
{ id:91, name:"النَّافِعُ", meaning:"ينفع من يشاء", dalil:"", dua:"" },
{ id:92, name:"النُّورُ", meaning:"نور السماوات", dalil:"{اللَّهُ نُورُ}", dua:"يا نور نور قلبي" },
{ id:93, name:"الهَادِي", meaning:"يهدي من يشاء", dalil:"", dua:"يا هادي اهدني" },
{ id:94, name:"البَدِيعُ", meaning:"المبدع", dalil:"{بَدِيعُ}", dua:"" },
{ id:95, name:"البَاقِي", meaning:"الدائم", dalil:"", dua:"" },
{ id:96, name:"الوَارِثُ", meaning:"يرث الأرض", dalil:"{الوَارِثُونَ}", dua:"" },
{ id:97, name:"الرَّشِيدُ", meaning:"أرشد الخلق", dalil:"", dua:"" },
{ id:98, name:"الصَّبُورُ", meaning:"لا يعجل", dalil:"", dua:"" },
{ id:99, name:"اللَّهُ", meaning:"الاسم الأعظم الجامع", dalil:"{اللَّهُ لَا إِلَهَ إِلَّا هُوَ}", dua:"يا الله" },
]

export default function AsmaAllah({ onHome }){
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = asma.filter(a=> a.name.includes(search))

  if(selected){
    const a = asma.find(x=>x.id===selected)
    const next = asma.find(x=>x.id===selected+1)
    return(
      <div className="min-h-screen bg-[#fdf8ef] dark:bg-[#0a0f1a]">
        {/* ✅ هيدر مصغر 48px */}
        <div className="sticky top-0 z-40 h-[48px] bg-[#fdf8ef]/95 dark:bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-[#f0e6c8] px-3 flex items-center justify-between">
          <button onClick={()=>setSelected(null)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-[12px]">→</button>
          <p className="font-bold text-[13px]">الأسماء الحسنى</p>
          <button onClick={onHome} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-[12px]">⌂</button>
        </div>
        <div className="p-3">
          <div className="bg-gradient-to-br from-[#0f5a43] to-[#1a8a65] rounded-[20px] p-6 text-center text-white">
            <p className="text-[10px] opacity-60">الاسم {a.id} من 99</p>
            <h1 className="quran-text text-[36px] mt-2 font-black">{a.name}</h1>
            <p className="text-[11px] mt-2 opacity-80">{a.dalil}</p>
          </div>
          <div className="mt-3 bg-white dark:bg-[#1a2332] rounded-[16px] border border-[#f0e6c8] p-4">
            <p className="font-bold text-[12px] text-[#0f5a43] mb-1">المعنى:</p>
            <p className="text-[13px] leading-7">{a.meaning}</p>
            {a.dua && <><p className="font-bold text-[12px] text-[#0f5a43] mt-4 mb-1">ادع به:</p><p className="text-[12px] bg-[#f0faf6] p-2.5 rounded-xl">{a.dua}</p></>}
          </div>
          <div className="mt-3 bg-white rounded-[12px] border p-3 flex justify-between items-center">
            <p className="font-bold text-[12px]">{next? `${next.id} - ${next.name}` : 'انتهت ✅'}</p>
            {next && <button onClick={()=>setSelected(next.id)} className="w-9 h-9 rounded-full bg-[#f6f1df] flex items-center justify-center">‹</button>}
          </div>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-[#fdf8ef] dark:bg-[#0a0f1a]">
      {/* ✅ هيدر مصغر 48px */}
      <div className="sticky top-0 z-40 bg-[#fdf8ef]/95 dark:bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-[#f0e6c8]">
        <div className="h-[48px] px-3 flex items-center justify-between">
          <button onClick={onHome} className="px-3 py-1 rounded-full bg-[#0f5a43] text-white text-[11px] font-bold">→ رجوع</button>
          <p className="font-bold text-[13px]">أسماء الله الحسنى • 99</p>
          <div className="w-6"></div>
        </div>
        <div className="px-3 pb-2">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث..." className="w-full h-[36px] rounded-xl bg-white border pr-3 text-[12px] outline-none" />
        </div>
      </div>
      <div className="p-2.5 grid grid-cols-2 gap-2">
        {filtered.map(a=>(
          <button key={a.id} onClick={()=>setSelected(a.id)} className="rounded-[14px] p-3 text-center bg-white dark:bg-[#1a2332] border border-[#f0e6c8]">
            <p className="text-[10px] text-gray-400">{a.id}</p>
            <p className="quran-text text-[18px] font-bold text-[#0f5a43] mt-1">{a.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}