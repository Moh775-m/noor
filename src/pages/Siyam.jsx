import { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Siyam({ onHome }){
  const { dark } = useContext(ThemeContext)

  const tabsData = {
    "فضل الصيام": [
      { t:"حكم الصيام وأنواعه", c:"فرض عين على كل مسلم بالغ عاقل. أنواعه: فرض (رمضان، قضاء، نذر، كفارة)، وسنة (الاثنين والخميس، عرفة، عاشوراء، 3 أيام من كل شهر، شوال)، ومكروه ومحرم (العيدين، أيام التشريق، صوم الحائض).", icon:"📖" },
      { t:"صيام التطوع وفضائله", c:"صوم يوم وإفطار يوم (صوم داوود أفضل الصيام)، صوم الاثنين والخميس ترفع فيهما الأعمال، صوم عرفة يكفر سنتين، عاشوراء يكفر سنة، 6 من شوال كصيام الدهر.", icon:"🌙" },
    ],
    "شروط الصيام - 3": [
      { t:"شروط وجوب الصيام", c:"الإسلام، البلوغ، العقل، القدرة، الإقامة، الطهارة من الحيض والنفاس. وشرط صحته: النية من الليل لصوم الفرض.", icon:"📋" },
      { t:"أركان الصيام", c:"1- النية: محلها القلب ويجب تبييتها قبل الفجر في الفرض. 2- الإمساك: عن جميع المفطرات من طلوع الفجر إلى غروب الشمس.", icon:"🕌" },
    ],
    "أحكام الصيام": [
      { t:"واجبات الصيام وسننه", c:"الواجبات: النية، الإمساك، السنن: تعجيل الفطر، تأخير السحور، الإكثار من قراءة القرآن، قيام الليل، الدعاء عند الفطر، الاعتكاف في العشر الأواخر، تفطير الصائمين، حفظ اللسان.", icon:"✨" },
      { t:"مبطلات الصيام (المفطرات)", c:"1- الأكل والشرب عمداً 2- الجماع 3- خروج المني بشهوة 4- القيء عمداً 5- الحيض والنفاس 6- الردة 7- الحجامة على قول 8- ما في معنى الأكل كالإبر المغذية. ومن أكل ناسياً فصومه صحيح.", icon:"🚫" },
      { t:"الأعذار المبيحة للفطر", c:"المرض، السفر (83 كم فأكثر)، الحيض، الحمل والرضاع إذا خافت على نفسها أو ولدها، الكبر والعجز، الإكراه. ويجب القضاء إلا للكبير والمريض الذي لا يرجى برؤه فيطعم عن كل يوم مسكيناً.", icon:"🩺" },
      { t:"قضاء رمضان والكفارات", c:"يجب قضاء ما أفطر بعذر قبل رمضان القادم. من أخر بغير عذر فعليه القضاء مع الإطعام. كفارة الجماع في نهار رمضان: عتق رقبة فإن لم يجد فصيام شهرين متتابعين فإن لم يستطع فإطعام 60 مسكيناً.", icon:"⚖️" },
    ]
  }

  const tabs = Object.keys(tabsData)
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [open, setOpen] = useState(0)

  return(
    <div className={`min-h-screen ${dark?'bg-[#0a0f1a] text-white':'bg-[#f8f6f1] text-[#1e2a23]'}`} dir="rtl">
      {/* Header مثل الصلاة */}
      <div className={`p-4 flex justify-between items-center sticky top-0 z-10 ${dark?'bg-[#0a0f1a]':'bg-[#f8f6f1]'}`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌙</span>
          <h1 className="font-black text-[17px]">أحكام الصيام</h1>
        </div>
        <button onClick={onHome} className={`px-4 py-2 rounded-full text-sm font-bold ${dark?'bg-white/10':'bg-[#0a4d2e] text-white'}`}> رجوع للرئيسية</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 no-scrollbar">
        {tabs.map(tab=>(
          <button
            key={tab}
            onClick={()=>{setActiveTab(tab); setOpen(0)}}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold border transition-all ${
              activeTab===tab
             ? 'bg-[#0a4d2e] text-white border-[#0a4d2e]'
              : dark? 'bg-[#1e293b] text-white/70 border-white/10' : 'bg-white text-[#8b7355] border-[#e8e0d0]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* كارد الآية */}
      <div className="mx-4 mt-3 bg-[#0a4d2e] rounded-[24px] p-6 text-center text-white shadow">
        <p className="text-xs opacity-60 mb-1">قال تعالى</p>
        <p className="text-[21px] leading-relaxed font-[Amiri]">يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ</p>
        <p className="text-[11px] mt-3 opacity-60">البقرة 183 • الصيام نور وطهارة ونجاة</p>
      </div>

      {/* الأكورديون */}
      <div className="max-w-[480px] mx-auto p-4 space-y-3 pb-20">
        {tabsData[activeTab].map((s,i)=>(
          <div key={i} className={`rounded-[18px] overflow-hidden border ${dark?'bg-[#1e293b] border-white/10':'bg-white border-[#f0eada] shadow-sm'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between items-center p-4 text-right">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${dark?'bg-white/10':'bg-[#fef6e8]'}`}>{s.icon}</div>
                <span className="font-bold text-[14px]">{s.t}</span>
              </div>
              <span className={`text-lg transition-transform ${open===i?'rotate-180':''}`}>˅</span>
            </button>
            {open===i && (
              <div className="px-4 pb-4">
                <div className={`h-[1px] mb-3 ${dark?'bg-white/10':'bg-[#f0eada]'}`}></div>
                <div className="text-[14px] leading-8 opacity-80 text-right">{s.c}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}