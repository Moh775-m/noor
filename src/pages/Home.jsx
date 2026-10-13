import { useContext, useState, useEffect, useRef } from 'react'
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
  // ✅ تم التعديل هنا فقط: كرت القبلة بجانب المعلومات
  { id:'qibla', title:'اتجاه القبلة', sub:'بوصلة دقيقة', count:'قبلة', icon:'🧭', color:'from-[#064e3b] to-[#059669]' },
  { id:'maaloomat', title:'معلومات إسلامية', sub:'سيرة وغزوات', count:'موسوعة', icon:'📚', color:'from-[#064e3b] to-[#10b981]' },
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

  const [showQibla, setShowQibla] = useState(false)
  const [qiblaAngle, setQiblaAngle] = useState(0)
  const [compassHeading, setCompassHeading] = useState(0)
  const [location, setLocation] = useState(null)
  const [qiblaError, setQiblaError] = useState(null)
  const [distanceToKaaba, setDistanceToKaaba] = useState(null)
  const [needPermission, setNeedPermission] = useState(false)

  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return()=>clearInterval(t)},[])

  useEffect(() => {
    async function fetchDate() {
      const monthsAr = {
        January: 'يناير', February: 'فبراير', March: 'مارس', April: 'أبريل',
        May: 'مايو', June: 'يونيو', July: 'يوليو', August: 'أغسطس',
        September: 'سبتمبر', October: 'أكتوبر', November: 'نوفمبر', December: 'ديسمبر'
      }
      try {
        const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Mukalla&country=Yemen&method=4')
        const data = await res.json()
        if (data.code === 200) {
          const g = data.data.date.gregorian
          const h = data.data.date.hijri
          const miladiMonth = monthsAr[g.month.en] || g.month.en
          setApiDates({
            miladiText: `${g.day} ${miladiMonth} ${g.year} م`,
            hijriText: `${h.day} ${h.month.ar} ${h.year} هـ`,
            weekday: h.weekday.ar
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

  useEffect(()=>{
    if(!showQibla) return
    const KAABA_LAT = 21.3891
    const KAABA_LON = 39.8579
    function toRad(d){ return d * Math.PI / 180 }
    function toDeg(r){ return r * 180 / Math.PI }
    function calcQibla(lat, lon){
      const phiK = toRad(KAABA_LAT)
      const lambdaK = toRad(KAABA_LON)
      const phi = toRad(lat)
      const lambda = toRad(lon)
      const delta = lambdaK - lambda
      const y = Math.sin(delta)
      const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(delta)
      let q = toDeg(Math.atan2(y, x))
      q = (q + 360) % 360
      setQiblaAngle(q)
      const R = 6371
      const dLat = phiK - phi
      const dLon = delta
      const a = Math.sin(dLat/2)**2 + Math.cos(phi)*Math.cos(phiK)*Math.sin(dLon/2)**2
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      setDistanceToKaaba(Math.round(R * c))
    }
    if(!navigator.geolocation){
      setQiblaError('المتصفح لا يدعم تحديد الموقع')
      return
    }
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude, longitude} = pos.coords
      setLocation({lat: latitude, lon: longitude})
      calcQibla(latitude, longitude)
    }, err=>{
      setQiblaError('فعل GPS لتحديد القبلة بدقة')
    })
    const handleOrientation = (e) => {
      let heading = 0
      if(e.webkitCompassHeading!== undefined){
        heading = e.webkitCompassHeading
      } else if(e.alpha!== null){
        heading = 360 - e.alpha
      }
      setCompassHeading(heading)
    }
    if(window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function'){
      setNeedPermission(true)
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true)
    }
    return ()=> window.removeEventListener('deviceorientation', handleOrientation)
  },[showQibla])

  const requestCompassPermission = async () => {
    try{
      const perm = await DeviceOrientationEvent.requestPermission()
      if(perm === 'granted'){
        setNeedPermission(false)
        window.addEventListener('deviceorientation', (e)=>{
          let h = e.webkitCompassHeading || (360 - e.alpha)
          setCompassHeading(h)
        }, true)
      }
    }catch{}
  }

  const qiblaDirection = (qiblaAngle - compassHeading + 360) % 360
  const isFacingQibla = qiblaDirection < 10 || qiblaDirection > 350
  const dayName = time.toLocaleDateString('ar-SA', { weekday: 'long' })
  const clock = time.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true })

  const handleCardClick = (id) => {
    if(id === 'qibla'){
      setShowQibla(true)
    } else {
      setActive(id)
    }
  }

  return(
    <div className={`min-h-screen pb-6 ${dark? 'bg-[#0a0f1a]' : 'bg-[#f8f6f1]'}`}>
      <div className="px-5 pt-7 pb-2 flex justify-between items-start">
        <div className="text-right">
          <div className="flex items-center gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-[#0f5a43] flex items-center justify-center text-white text-[13px] font-bold">ن</div>
            <p className="text-[11px] tracking-[0.25em] text-[#8c7a4b]"><span dir="ltr">NOOR</span><span> • نور</span></p>
          </div>
          <h1 className="font-black text-[22px] mt-3 text-right">نور المسلم</h1>
          <p className="text-[11px] text-gray-400 mt-1 text-right">رفيقك اليومي للقرآن والأذكار</p>
        </div>
        <div className="flex items-start gap-2" dir="ltr">
          <button onClick={toggleTheme} className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2332] border flex items-center justify-center text-[16px] shadow-sm">{dark?'☀️':'🌙'}</button>
          <button onClick={onRate} className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-500/30 flex items-center justify-center text-[18px] shadow-sm">⭐</button>
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
          <button key={card.id} onClick={()=>handleCardClick(card.id)} className={`rounded-[18px] p-4 text-right bg-white dark:bg-[#1a2332] border flex flex-col justify-between h-[105px]`}>
            <div className="flex justify-between items-start w-full"><div className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${card.color} flex items-center justify-center text-white ${card.iconStyle||'text-[18px]'}`}>{card.icon}</div><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#f6f1df] text-[#8c7a4b]">{card.count}</span></div>
            <div><p className="font-bold text-[13px]">{card.title}</p><p className="text-[10px] text-gray-400 mt-0.5">{card.sub}</p></div>
          </button>
        ))}
      </div>

      {showQibla && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-end md:items-center justify-center p-0 md:p-6" onClick={()=>setShowQibla(false)}>
          <div className="bg-[#fcfbf7] dark:bg-[#111827] rounded-t-[32px] md:rounded-[32px] w-full max-w-[420px] overflow-hidden shadow-2xl border-t md:border" onClick={e=>e.stopPropagation()} dir="rtl">
            <div className="bg-gradient-to-br from-[#0f5a43] to-[#134e4a] p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="flex justify-between items-start relative">
                <div>
                  <h3 className="font-black text-[18px] flex items-center gap-2">🧭 اتجاه القبلة</h3>
                  <p className="text-[11px] opacity-70 mt-1">ضع الجوال على سطح مستوٍ وحركه ببطء</p>
                  {location && <p className="text-[10px] opacity-50 mt-2">📍 {location.lat.toFixed(4)}, {location.lon.toFixed(4)} • {distanceToKaaba} كم للكعبة</p>}
                </div>
                <button onClick={()=>setShowQibla(false)} className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">✕</button>
              </div>
            </div>
            <div className="p-6 text-center">
              {qiblaError? (
                <div className="py-10">
                  <div className="text-4xl">📡</div>
                  <p className="text-sm font-bold mt-3">{qiblaError}</p>
                  <p className="text-[11px] text-gray-500 mt-2">يرجى تفعيل الموقع GPS والمستشعرات</p>
                </div>
              ) : (
                <>
                  <div className="relative w-[260px] h-[260px] mx-auto">
                    <div className={`absolute inset-0 rounded-full border-[8px] ${isFacingQibla? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'border-gray-100 dark:border-gray-800'} transition-all duration-500`}></div>
                    <div className="absolute inset-3 rounded-full border border-dashed border-gray-200 dark:border-gray-700"></div>
                    <div className="absolute inset-0">
                      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] font-black">ش</span>
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-gray-400">ج</span>
                      <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[11px] font-bold text-gray-400">ق</span>
                      <span className="absolute top-1/2 left-2 -translate-y-1/2 text-[11px] font-bold text-gray-400">غ</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center" style={{transform: `rotate(${qiblaDirection}deg)`}}>
                      <div className="relative">
                        <div className="w-1 h-[110px] bg-gradient-to-t from-[#0f5a43] to-[#10b981] rounded-full -mt-[55px] shadow-lg"></div>
                        <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#0f5a43] rounded-full flex items-center justify-center text-white text-[18px] shadow-xl border-2 border-white">🕋</div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white dark:bg-[#1a2332] border-4 border-[#0f5a43] shadow-xl flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full ${isFacingQibla? 'bg-green-500 animate-ping' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                  <div className="mt-6">
                    {needPermission? (
                      <button onClick={requestCompassPermission} className="w-full bg-[#0f5a43] text-white py-3.5 rounded-full font-black text-sm shadow-lg">تفعيل البوصلة 🧭</button>
                    ) : (
                      <>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-black ${isFacingQibla? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600'}`}>
                          <span className={`w-2 h-2 rounded-full ${isFacingQibla? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                          {isFacingQibla? 'أنت الآن باتجاه القبلة تماماً ✅' : `زاوية القبلة: ${Math.round(qiblaAngle)}° • انحراف ${Math.round(qiblaDirection)}°`}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="bg-white dark:bg-[#1a2332] border rounded-2xl p-3">
                            <p className="text-[10px] text-gray-400">القبلة</p>
                            <p className="font-black text-[16px] mt-1">{Math.round(qiblaAngle)}°</p>
                            <p className="text-[10px] text-[#0f5a43] mt-1">من الشمال</p>
                          </div>
                          <div className="bg-white dark:bg-[#1a2332] border rounded-2xl p-3">
                            <p className="text-[10px] text-gray-400">المسافة للكعبة</p>
                            <p className="font-black text-[16px] mt-1">{distanceToKaaba? `${distanceToKaaba} كم` : '--'}</p>
                            <p className="text-[10px] text-gray-400 mt-1">تقريباً</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-4 leading-6">💡 ضع الهاتف على سطح مستوٍ بعيداً عن المعادن والمغناطيس، وتأكد من تفعيل الـ GPS لدقة أعلى.</p>
                      </>
                    )}
                  </div>
                </>
              )}
              <button onClick={()=>setShowQibla(false)} className="mt-6 w-full h-12 rounded-full bg-[#111827] dark:bg-white dark:text-black text-white font-bold text-sm">إغلاق</button>
            </div>
          </div>
        </div>
      )}

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