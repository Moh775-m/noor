import { useState } from 'react'

const data = {
  "فضل الصلاة": [
    { title:"عمود الدين", text:"قال ﷺ: رأس الأمر الإسلام وعموده الصلاة. الصلاة أول ما يحاسب عليه العبد يوم القيامة، فإن صلحت صلح سائر عمله.", icon:"🕌" },
    { title:"صلة بين العبد وربه", text:"الصلاة هي المناجاة، تقف بين يدي الله 5 مرات يومياً، تغسل ذنوبك كما يغسل الماء الوسخ.", icon:"🤲" },
    { title:"نور وحياة", text:"قال ﷺ: الصلاة نور. تنهى عن الفحشاء والمنكر، تريح القلب {أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ القُلُوبُ}، وتأثيرها: سكينة، انضباط وقت، قوة إرادة.", icon:"💡" },
  ],
  "شروط الصلاة - 9": [
    { title:"1- الإسلام", text:"فلا تصح من كافر" },
    { title:"2- العقل", text:"فلا تصح من مجنون" },
    { title:"3- التمييز", text:"7 سنوات فأمره بها" },
    { title:"4- رفع الحدث", text:"الوضوء والغسل" },
    { title:"5- إزالة النجاسة", text:"من البدن والثوب والمكان" },
    { title:"6- ستر العورة", text:"للرجل من السرة للركبة، وللمرأة جميع بدنها إلا الوجه والكفين" },
    { title:"7- دخول الوقت", text:"فلا تصح قبله" },
    { title:"8- استقبال القبلة", text:"الكعبة المشرفة بمكة" },
    { title:"9- النية", text:"ومحلها القلب ولا يتلفظ بها" },
  ],
  "أركان الصلاة - 14": [
    { title:"1- القيام", text:"مع القدرة في الفرض" },
    { title:"2- تكبيرة الإحرام", text:"الله أكبر" },
    { title:"3- قراءة الفاتحة", text:"في كل ركعة" },
    { title:"4- الركوع", text:"أن ينحني حتى تمس ركبتاه" },
    { title:"5- الرفع من الركوع", text:"" },
    { title:"6- السجود على 7 أعضاء", text:"الجبهة والأنف واليدين والركبتين وأطراف القدمين" },
    { title:"7- الرفع من السجود", text:"" },
    { title:"8- الجلسة بين السجدتين", text:"" },
    { title:"9- الطمأنينة", text:"في جميع الأركان" },
    { title:"10- الترتيب", text:"" },
    { title:"11- التشهد الأخير", text:"" },
    { title:"12- الجلوس للتشهد الأخير", text:"" },
    { title:"13- الصلاة على النبي", text:"في التشهد الأخير" },
    { title:"14- التسليم", text:"السلام عليكم ورحمة الله" },
  ],
  "واجبات الصلاة - 8": [
    { title:"1- جميع التكبيرات غير تكبيرة الإحرام", text:"" },
    { title:"2- قول سمع الله لمن حمده", text:"للإمام والمنفرد" },
    { title:"3- ربنا ولك الحمد", text:"للجميع" },
    { title:"4- سبحان ربي العظيم في الركوع", text:"" },
    { title:"5- سبحان ربي الأعلى في السجود", text:"" },
    { title:"6- ربي اغفر لي بين السجدتين", text:"" },
    { title:"7- التشهد الأول", text:"" },
    { title:"8- الجلوس للتشهد الأول", text:"" },
  ],
  "سنن الصلاة": [
    { title:"سنن قولية", text:"دعاء الاستفتاح، التعوذ، البسملة، التأمين، قراءة سورة بعد الفاتحة، الزيادة عن تسبيحة واحدة في الركوع والسجود" },
    { title:"سنن فعلية", text:"رفع اليدين عند التكبير، وضع اليد اليمنى على اليسرى، النظر لموضع السجود، الافتراش والتورك" },
  ],
  "مبطلات الصلاة - 8": [
    { title:"1- الكلام عمدا", text:"" },
    { title:"2- الضحك", text:"" },
    { title:"3- الأكل والشرب", text:"" },
    { title:"4- انكشاف العورة", text:"" },
    { title:"5- الانحراف عن القبلة كثيرا", text:"" },
    { title:"6- العبث الكثير", text:"" },
    { title:"7- انتقاض الطهارة", text:"" },
    { title:"8- ترك ركن عمدا", text:"" },
  ],
  "الصلوات المفروضة": [
    { title:"الفجر - ركعتان", time:"من طلوع الفجر الصادق إلى طلوع الشمس", fadl:"من صلى البردين دخل الجنة، سنة الفجر خير من الدنيا وما فيها", icon:"🌅" },
    { title:"الظهر - 4 ركعات", time:"من زوال الشمس إلى أن يصير ظل كل شيء مثله", fadl:"أول صلاة صلاها النبي، تفتح لها أبواب السماء", icon:"☀️" },
    { title:"العصر - 4 ركعات", time:"من بعد الظهر إلى اصفرار الشمس، وهي الصلاة الوسطى", fadl:"من ترك العصر حبط عمله، من صلاها في جماعة فكأنما قام نصف الليل", icon:"🌤️" },
    { title:"المغرب - 3 ركعات", time:"من غروب الشمس إلى غياب الشفق الأحمر", fadl:"لا يزال الناس بخير ما عجلوا الفطر وأخروا السحور وصلوا المغرب", icon:"🌇" },
    { title:"العشاء - 4 ركعات", time:"من غياب الشفق إلى نصف الليل", fadl:"من صلى العشاء في جماعة فكأنما قام نصف الليل", icon:"🌙" },
  ],
  "الصلوات غير المفروضة - النوافل": [
    { title:"السنن الرواتب - 12 ركعة", time:"2 قبل الفجر، 4 قبل الظهر و2 بعده، 2 بعد المغرب، 2 بعد العشاء", fadl:"من حافظ عليها بنى الله له بيتا في الجنة. تأثيرها: تجبر نقص الفرض وتحببك إلى الله.", icon:"🏠" },
    { title:"صلاة الوتر", time:"من بعد العشاء إلى الفجر، وأفضلها آخر الليل ركعة واحدة أو 3 أو 5 أو 7", fadl:"إن الله وتر يحب الوتر. قال ﷺ: اجعلوا آخر صلاتكم بالليل وترا. تأثيرها: خاتمة يومك، راحة وطمأنينة ونور في القبر.", icon:"⭐" },
    { title:"صلاة الضحى", time:"من ارتفاع الشمس قيد رمح (بعد الشروق 15 دقيقة) إلى قبل الظهر، أقلها ركعتان وأكثرها 8", fadl:"صلاة الأوابين، تعدل 360 صدقة عن مفاصل جسدك. تأثيرها: بركة في الرزق، نشاط، صحة، غنى عن الناس.", icon:"🌞" },
    { title:"قيام الليل - التهجد", time:"من بعد العشاء إلى الفجر، وأفضله الثلث الأخير", fadl:"شرف المؤمن قيام الليل، ينزل الله في الثلث الأخير يقول هل من سائل فأعطيه. تأثيرها: نور الوجه، قوة إيمان، استجابة دعاء، ثبات.", icon:"🌌" },
    { title:"تحية المسجد", time:"عند دخول المسجد قبل الجلوس ركعتان", fadl:"إذا دخل أحدكم المسجد فلا يجلس حتى يصلي ركعتين", icon:"🕌" },
    { title:"صلاة الاستخارة", time:"في أي وقت غير أوقات النهي ركعتان ثم دعاء الاستخارة", fadl:"كان النبي يعلمنا الاستخارة كما يعلمنا السورة من القرآن. تأثيرها: توفيق في القرار وزوال الحيرة.", icon:"🧭" },
    { title:"صلاة الحاجة", time:"ركعتان ثم يدعو حاجته", fadl:"من كانت له حاجة إلى الله فليتوضأ وليصل ركعتين ثم ليدعو", icon:"🤲" },
    { title:"صلاة الكسوف والخسوف", time:"عند كسوف الشمس أو خسوف القمر", fadl:"آيتان من آيات الله يخوف بهما عباده", icon:"🌘" },
  ]
}

export default function Salah({ onHome }){
  const [active, setActive] = useState("فضل الصلاة")
  const [open, setOpen] = useState(0)

  return(
    <div className="min-h-screen bg-[#fdf8ef] dark:bg-[#0a0f1a] pb-20">
      <div className="sticky top-0 z-40 bg-[#fdf8ef]/95 dark:bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-[#f0e6c8] dark:border-white/10">
        <div className="h-[56px] px-4 flex items-center justify-between">
          <button onClick={onHome} className="px-3.5 py-1.5 rounded-full bg-[#0f5a43] text-white text-[13px] font-bold shadow">→ رجوع للرئيسية</button>
          <p className="font-bold text-[15px]">الصلاة 🕌</p>
        </div>
        <div className="px-3 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {Object.keys(data).map(cat=>(
            <button key={cat} onClick={()=>{setActive(cat); setOpen(0)}} className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold border transition-all ${active===cat?'bg-[#0f5a43] text-white border-[#0f5a43]':'bg-white dark:bg-white/10 text-[#8c7a4b] border-[#e9dfbd]'}`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="p-3">
        {/* بطاقة تعريفية */}
        {active==="فضل الصلاة" && (
          <div className="bg-gradient-to-br from-[#0f5a43] to-[#1a7a5f] rounded-[18px] p-5 text-white mb-4">
            <p className="text-[11px] opacity-70">قال تعالى</p>
            <p className="quran-text text-[18px] leading-8 mt-1">إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا</p>
            <p className="text-[11px] mt-3 opacity-80">النساء 103 • الصلاة نور في الدنيا ونجاة في الآخرة</p>
          </div>
        )}

        <div className="grid gap-2.5">
          {data[active].map((item,i)=>(
            <div key={i} className="bg-white dark:bg-[#1a2332] rounded-[16px] border border-[#f0e6c8] dark:border-white/10 overflow-hidden">
              <button onClick={()=>setOpen(open===i? -1 : i)} className="w-full p-4 flex justify-between items-center text-right">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f6f1df] dark:bg-white/10 flex items-center justify-center text-[14px]">{item.icon || (i+1)}</div>
                  <div><p className="font-bold text-[13px]">{item.title}</p>{item.time && <p className="text-[10px] text-[#0f5a43] mt-0.5">⏰ {item.time}</p>}</div>
                </div>
                <span className={`transition-transform ${open===i?'rotate-180':''}`}>⌄</span>
              </button>
              {open===i && (
                <div className="px-4 pb-4">
                  <div className="h-[1px] bg-[#f0e6c8] dark:bg-white/10 mb-3"></div>
                  <p className="text-[13px] leading-7 text-[#444] dark:text-gray-300">{item.text}</p>
                  {item.fadl && <div className="mt-3 p-3 rounded-xl bg-[#f0faf6] dark:bg-white/5 border border-[#d6f0e3]"><p className="text-[11px] font-bold text-[#0f5a43]">💡 الفضل والتأثير:</p><p className="text-[12px] mt-1 leading-6">{item.fadl}</p></div>}
                </div>
              )}
            </div>
          ))}
        </div>

        {active.includes("غير المفروضة") && (
          <div className="mt-6 p-4 rounded-[16px] bg-[#fff8e6] border border-[#ffe9a8] text-center">
            <p className="font-bold text-[13px]">📌 خلاصة النوافل</p>
            <p className="text-[12px] leading-6 mt-2 text-[#6b5a3e]">النوافل تجبر نقص الفرائض، وتقربك من الله حتى يحبك، فإذا أحبك كنت سمعه وبصره ويده. ابدأ بالرواتب ثم الوتر والضحى، ثم قيام الليل.</p>
          </div>
        )}
      </div>
    </div>
  )
}