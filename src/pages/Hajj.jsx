import { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Hajj({ onHome }){
  const { dark } = useContext(ThemeContext)

  // تقسيم بياناتك على Tabs مثل صفحة الصلاة
  const tabsData = {
    "فضل الحج": [
      { t:"تعريف الحج وحكمه", c:"الحج لغة: القصد. شرعاً: قصد مكة لأداء عبادة مخصوصة. حكمه: ركن من أركان الإسلام فرض مرة في العمر على المستطيع، قال تعالى (ولله على الناس حج البيت من استطاع إليه سبيلاً).", icon:"🕋" },
    ],
    "شروط الحج - 5": [
      { t:"شروط وجوب الحج", c:"الإسلام، العقل، البلوغ، الحرية، الاستطاعة (مالية وبدنية وأمن الطريق)، وجود المحرم للمرأة. من مات ولم يحج مع القدرة حج عنه وليه.", icon:"📋" },
    ],
    "أركان الحج - 4": [
      { t:"أركان الحج الأربعة", c:"1- الإحرام 2- الوقوف بعرفة (الحج عرفة) 3- طواف الإفاضة 4- السعي بين الصفا والمروة. من ترك ركناً لم يصح حجه.", icon:"🕋" },
      { t:"واجبات الحج", c:"1- الإحرام من الميقات 2- الوقوف بعرفة إلى الغروب 3- المبيت بمزدلفة 4- المبيت بمنى ليالي التشريق 5- رمي الجمرات 6- الحلق أو التقصير 7- طواف الوداع. من ترك واجباً جبره بدم.", icon:"✅" },
    ],
    "صفة النسك": [
      { t:"أنواع النسك", c:"1- تمتع: عمرة ثم حج وعليه هدي (أفضل) 2- قران: عمرة وحج معاً وعليه هدي 3- إفراد: حج فقط ولا هدي عليه.", icon:"🔀" },
      { t:"صفة العمرة كاملة", c:"1- الاغتسال والتطيب والإحرام من الميقات والتلبية 2- دخول مكة والطواف 7 أشواط 3- السعي 7 أشواط بين الصفا والمروة 4- الحلق أو التقصير. العمرة إلى العمرة كفارة لما بينهما.", icon:"🕋" },
      { t:"يوم عرفة ومزدلفة ومنى", c:"في عرفة من الظهر للمغرب دعاء وذكر. بعد الغروب الذهاب لمزدلفة وصلاة المغرب والعشاء جمعاً وجمع حصى الجمرات والمبيت. يوم العيد: رمي جمرة العقبة، الذبح، الحلق، طواف الإفاضة، ثم المبيت بمنى ورمي الجمرات الثلاث أيام التشريق.", icon:"⛰️" },
      { t:"محظورات الإحرام", c:"للبس المخيط للرجل، تغطية الرأس، حلق الشعر، تقليم الأظافر، الطيب، الصيد، عقد النكاح، الجماع ومقدماته. ومن فعل شيئاً ناسياً فلا شيء عليه، ومتعمداً فعليه فدية.", icon:"🚫" },
      { t:"أخطاء يقع فيها الحجاج", c:"الاعتقاد أن زيارة قبر النبي من أركان الحج (ليست منه)، التمسح بالكعبة، المزاحمة المؤذية عند الحجر، ترك المبيت بمنى بدون عذر، عدم الترتيب في رمي الجمرات.", icon:"⚠️" },
    ]
  }

  const tabs = Object.keys(tabsData)
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [open, setOpen] = useState(0)

  return(
    <div className={`min-h-screen ${dark?'bg-[#0a0f1a] text-white':'bg-[#f8f6f1] text-[#1e2a23]'}`} dir="rtl">
      {/* Header مثل صفحة الصلاة */}
      <div className={`p-4 flex justify-between items-center sticky top-0 z-10 ${dark?'bg-[#0a0f1a]':'bg-[#f8f6f1]'}`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🕋</span>
          <h1 className="font-black text-[17px]">الحج والعمرة</h1>
        </div>
        <button onClick={onHome} className={`px-4 py-2 rounded-full text-sm font-bold ${dark?'bg-white/10':'bg-[#0a4d2e] text-white'}`}> رجوع للرئيسية</button>
      </div>

      {/* Tabs مثل صفحة الصلاة */}
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

      {/* كارد الآية الكبير مثل الصلاة */}
      <div className="mx-4 mt-3 bg-[#0a4d2e] rounded-[24px] p-6 text-center text-white shadow">
        <p className="text-xs opacity-60 mb-1">قال تعالى</p>
        <p className="text-[21px] leading-relaxed font-[Amiri]">وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا</p>
        <p className="text-[11px] mt-3 opacity-60">آل عمران 97 • الحج نور في الدنيا ونجاة في الآخرة</p>
      </div>

      {/* الأكورديون بأيقونة دائرية مثل الصورة */}
      <div className="max-w-[480px] mx-auto p-4 space-y-3">
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