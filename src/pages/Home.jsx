import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const cards = [
  { id:'quran', title:'المصحف الشريف', sub:'114 سورة', count:'114', icon:'📖', color:'from-[#0f5a43] to-[#1e7a60]' },
  { id:'audio', title:'القرآن صوتاً', sub:'تلاوات خاشعة', count:'MP3', icon:'🎧', color:'from-[#1a6fb0] to-[#3aa0e0]' },
  { id:'azkar', title:'أذكار المسلم', sub:'حصن المسلم', count:'حصن', icon:'📿', color:'from-[#8c6a1a] to-[#c9a227]' },
  { id:'nawawi', title:'الأربعون النووية', sub:'42 حديثاً', count:'42', icon:'📚', color:'from-[#7a3b0e] to-[#c06a2a]' },
  { id:'salah', title:'دليل الصلاة', sub:'فقه الصلاة', count:'فقه', icon:'🕌', color:'from-[#2a5a8a] to-[#4a90c0]' },
  { id:'asma', title:'أسماء الله الحسنى', sub:'99 اسماً', count:'99', icon:'الله', color:'from-[#0f5a43] to-[#1a8a65]', iconStyle: 'quran-text text-[18px] font-black' },
  { id:'siyam', title:' الصيام', sub:'واجبات وسنن', count:'فقه', icon:'🌙', color:'from-[#5b4a1a] to-[#8c7a2b]' },
  { id:'hajj', title:'الحج والعمرة', sub:'مناسك وخطوات', count:'ركن', icon:'🕋', color:'from-[#111827] to-[#374151]' },
  { id:'maaloomat', title:'معلومات إسلامية', sub:'سيرة وغزوات', count:'موسوعة', icon:'📚', color:'from-[#064e3b] to-[#10b981]', big:true },
]

const ayaat = [
  { text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", ref: "الرعد 28" },
  { text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", ref: "الطلاق 2" },
]

const adiyah = ["اللهم بلغنا رمضان لا فاقدين ولا مفقودين", "اللهم إني أسألك علماً نافعاً", "اللهم يا مقلب القلوب ثبت قلبي على دينك"]

export default function Home({ setActive, onRate }){
  const { dark, toggleTheme } = useContext(ThemeContext)
  const [time, setTime] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [ayahOfDay] = useState(() => ayaat[new Date().getDate() % ayaat.length])
  const [duaOfDay] = useState(() => adiyah[new Date().getDate() % adiyah.length])
  const [apiDates, setApiDates] = useState(null)
  const [loadingDate, setLoadingDate] = useState(true)
  const [ramadanCount, setRamadanCount] = useState({ days: 0, hours: 0, mins: 0 })

  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return()=>clearInterval(t)},[])
  useEffect(() => {
    async function fetchDate() {
      try {
        const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Mukalla&country=Yemen&method=4')
        const data = await res.json()
        if (data.code === 200) {
          setApiDates({
            miladiText: `${data.data.date.gregorian.day} ${data.data.date.gregorian.month.ar} ${data.data.date.gregorian.year} م`,
            hijriText: `${data.data.date.hijri.day} ${data.data.date.hijri.month.ar} ${data.data.date.hijri.year} هـ`,
            weekday: data.data.date.hijri.weekday.ar
          })
        }
      } catch {
        const now = new Date()
        setApiDates({
          miladiText: now.toLocaleDateString('ar-EG', { day:'numeric', month:'long', year:'numeric'}),
          hijriText: new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { day:'numeric', month:'long', year:'numeric'}).format(now),
          weekday: now.toLocaleDateString('ar-SA', {weekday:'long'})
        })
      } finally { setLoadingDate(false) }
    }
    fetchDate()
  }, [])
  useEffect(() => {
    function calcRamadan(){
      const now = new Date()
      const ramadans = [new Date('2027-02-07'), new Date('2028-01-28'), new Date('2029-01-16')]
      let next = ramadans.find(d => d > now) || ramadans[2]
      const diff = next - now
      if(diff <= 0){ setRamadanCount({ isRamadan:true }); return }
      setRamadanCount({
        days: Math.floor(diff/(1000*60*60*24)),
        hours: Math.floor((diff%(1000*60*60*24))/(1000*60*60)),
        mins: Math.floor((diff%(1000*60*60))/(1000*60)),
        isRamadan:false
      })
    }
    calcRamadan()
    const t=setInterval(calcRamadan,60000)
    return()=>clearInterval(t)
  }, [])

  const dayName = time.toLocaleDateString('ar-SA', { weekday: 'long' })
  const clock = time.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true })

  return(
    <div className={`min-h-screen pb-6 ${dark? 'bg-[#0a0f1a]' : 'bg-[#f8f6f1]'}`}>
      <div className="px-5 pt-7 pb-2 flex justify-between items-start">
        {/* اليمين: الشعار */}
        <div className="text-right">
          <div className="flex items-center gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-[#0f5a43] flex items-center justify-center text-white text-[13px] font-bold">ن</div>
            <p className="text-[11px] tracking-[0.25em] text-[#8c7a4b]"><span dir="ltr">NOOR</span><span> • نور</span></p>
          </div>
          <h1 className="font-black text-[22px] mt-3 text-right">نور المسلم</h1>
          <p className="text-[11px] text-gray-400 mt-1 text-right">رفيقك اليومي للقرآن والأذكار</p>
        </div>

        {/* اليسار: نفس ترتيبك - الوقت الآن تحت التقويم */}
        <div className="flex items-start gap-2" dir="ltr">
          {/* 1- أقصى اليسار: الوضع الليلي فقط */}
          <button onClick={toggleTheme} className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2332] border flex items-center justify-center text-[16px] shadow-sm">{dark?'☀️':'🌙'}</button>
          {/* 2- في الوسط: التقييم */}
          <button onClick={onRate} className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-500/30 flex items-center justify-center text-[18px] shadow-sm">⭐</button>
          {/* 3- الأقرب للوسط: التقويم + تحته الوقت واليوم */}
          <div className="flex flex-col items-center">
            <button onClick={()=>setShowCalendar(true)} className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2332] border flex items-center justify-center text-[16px] shadow-sm">📅</button>
            <div className="mt-1.5 text-center leading-none">
              <p className="text-[10px] font-bold text-[#0f5a43] dark:text-white">{clock}</p>
              <p className="text-[9px] text-[#8c7a4b] mt-1">{dayName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white dark:bg-[#1a2332] rounded-[16px] p-4 border flex justify-between items-center">
          <div className="text-right flex-1"><p className="text-[10px] text-[#8c7a4b]">آية اليوم • {ayahOfDay.ref}</p><p className="quran-text text-[14px] mt-1 leading-7 font-bold">{ayahOfDay.text}</p></div>
          <div className="w-8 h-8 rounded-full bg-[#f6f1df] flex items-center justify-center mr-3">💡</div>
        </div>
      </div>

      <div className="px-3 mt-5 grid grid-cols-2 gap-3">
        {cards.map(card=>(
          <button key={card.id} onClick={()=>setActive(card.id)} className={`rounded-[18px] p-4 text-right bg-white dark:bg-[#1a2332] border flex flex-col justify-between ${card.big?'col-span-2 h-[110px] flex-row items-center':'h-[105px]'}`}>
            <div className={`flex justify-between items-start w-full ${card.big?'w-auto flex-1':''}`}><div className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${card.color} flex items-center justify-center text-white ${card.iconStyle||'text-[18px]'}`}>{card.icon}</div><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#f6f1df] text-[#8c7a4b]">{card.count}</span></div>
            <div className={`${card.big?'flex-1 text-right mr-4':''}`}><p className="font-bold text-[13px]">{card.title}</p><p className="text-[10px] text-gray-400 mt-0.5">{card.sub}</p></div>
          </button>
        ))}
      </div>

      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-5" onClick={()=>setShowCalendar(false)}>
          <div className="bg-white dark:bg-[#1a2332] rounded-[24px] p-6 w-full max-w-[360px]" onClick={e=>e.stopPropagation()} dir="rtl">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#fef6e8] flex items-center justify-center text-[22px] mx-auto">📅</div>
              <h3 className="font-black text-[18px] mt-3">التقويم</h3>
              <p className="text-[11px] text-gray-400 mt-1">{apiDates?.weekday}</p>
              {loadingDate? <p className="text-[12px] py-10 opacity-50">جاري جلب التاريخ...</p> : (
                <div className="mt-5 space-y-3 text-right">
                  <div className="bg-[#f0faf5] dark:bg-[#0f5a43]/20 rounded-xl p-3 border border-[#0f5a43]/10">
                    <p className="text-[10px] text-[#0f5a43] font-bold">🌙 التاريخ الهجري</p>
                    <p className="text-[14px] font-black mt-1 text-[#0f5a43] dark:text-white">{apiDates?.hijriText}</p>
                  </div>
                  <div className="bg-[#f8f6f1] dark:bg-black/20 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400">📅 التاريخ الميلادي</p>
                    <p className="text-[13px] font-bold mt-1">{apiDates?.miladiText}</p>
                  </div>
                  <div className="bg-[#0a4d2e] rounded-xl p-4 text-center text-white">
                    <p className="text-[10px] opacity-70">⏳ باقي على رمضان</p>
                    {ramadanCount.isRamadan? <p className="text-[16px] font-black mt-1">رمضان مبارك عليكم</p> :
                    <>
                      <p className="text-[22px] font-black mt-1">{ramadanCount.days} يوم متبقي</p>
                      <p className="text-[11px] mt-1 opacity-80">{ramadanCount.hours} ساعة و {ramadanCount.mins} دقيقة</p>
                    </>}
                  </div>
                  <div className="bg-[#fef6e8] dark:bg-yellow-900/20 rounded-xl p-4 text-center border border-yellow-200 dark:border-yellow-800">
                    <p className="text-[10px] text-[#8c7a4b]">🤲 دعاء اليوم</p>
                    <p className="text-[13px] mt-2 leading-7 font-bold text-[#5a4a1a] dark:text-yellow-100">{duaOfDay}</p>
                  </div>
                </div>
              )}
              <button onClick={()=>setShowCalendar(false)} className="mt-5 w-full h-11 rounded-xl bg-[#0f5a43] text-white text-[13px] font-bold">إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}