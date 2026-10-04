import { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Siyam({ onHome }){
  const { dark } = useContext(ThemeContext)
  const [open, setOpen] = useState(null)
  const sections = [
    { t:"حكم الصيام وأنواعه", c:"فرض عين على كل مسلم بالغ عاقل. أنواعه: فرض (رمضان، قضاء، نذر، كفارة)، وسنة (الاثنين والخميس، عرفة، عاشوراء، 3 أيام من كل شهر، شوال)، ومكروه ومحرم (العيدين، أيام التشريق، صوم الحائض)." },
    { t:"شروط وجوب الصيام", c:"الإسلام، البلوغ، العقل، القدرة، الإقامة، الطهارة من الحيض والنفاس. وشرط صحته: النية من الليل لصوم الفرض." },
    { t:"أركان الصيام", c:"1- النية: محلها القلب ويجب تبييتها قبل الفجر في الفرض. 2- الإمساك: عن جميع المفطرات من طلوع الفجر إلى غروب الشمس." },
    { t:"واجبات الصيام وسننه", c:"الواجبات: النية، الإمساك، السنن: تعجيل الفطر، تأخير السحور، الإكثار من قراءة القرآن، قيام الليل، الدعاء عند الفطر، الاعتكاف في العشر الأواخر، تفطير الصائمين، حفظ اللسان." },
    { t:"مبطلات الصيام (المفطرات)", c:"1- الأكل والشرب عمداً 2- الجماع 3- خروج المني بشهوة 4- القيء عمداً 5- الحيض والنفاس 6- الردة 7- الحجامة على قول 8- ما في معنى الأكل كالإبر المغذية. ومن أكل ناسياً فصومه صحيح." },
    { t:"الأعذار المبيحة للفطر", c:"المرض، السفر (83 كم فأكثر)، الحيض، الحمل والرضاع إذا خافت على نفسها أو ولدها، الكبر والعجز، الإكراه. ويجب القضاء إلا للكبير والمريض الذي لا يرجى برؤه فيطعم عن كل يوم مسكيناً." },
    { t:"قضاء رمضان والكفارات", c:"يجب قضاء ما أفطر بعذر قبل رمضان القادم. من أخر بغير عذر فعليه القضاء مع الإطعام. كفارة الجماع في نهار رمضان: عتق رقبة فإن لم يجد فصيام شهرين متتابعين فإن لم يستطع فإطعام 60 مسكيناً." },
    { t:"صيام التطوع وفضائله", c:"صوم يوم وإفطار يوم (صوم داوود أفضل الصيام)، صوم الاثنين والخميس ترفع فيهما الأعمال، صوم عرفة يكفر سنتين، عاشوراء يكفر سنة، 6 من شوال كصيام الدهر." },
  ]
  return(
    <div className={`min-h-screen p-4 ${dark?'bg-[#0a0f1a] text-white':'bg-[#f8f6f1]'}`}>
      <div className="flex items-center gap-3 mb-6 max-w-[480px] mx-auto">
        <button onClick={onHome} className={`w-10 h-10 rounded-full flex items-center justify-center ${dark?'bg-white/10':'bg-white shadow'}`}>←</button>
        <h1 className="text-xl font-black">📖 أحكام الصيام</h1>
      </div>
      <div className="max-w-[480px] mx-auto space-y-3">
        {sections.map((s,i)=>(
          <div key={i} className={`rounded-2xl overflow-hidden ${dark?'bg-[#1e293b] border border-white/5':'bg-white shadow-sm'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between items-center p-4 font-bold text-right">
              <span>{s.t}</span><span>{open===i?'−':'+'}</span>
            </button>
            {open===i && <div className="p-4 pt-0 text-[14px] leading-7 opacity-80 text-right">{s.c}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}