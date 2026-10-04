import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const cards = [
  { id:'quran', title:'المصحف الشريف', sub:'114 سورة', count:'114', icon:'📖', color:'from-[#0f5a43] to-[#1e7a60]' },
  { id:'audio', title:'القرآن صوتاً', sub:'تلاوات خاشعة', count:'MP3', icon:'🎧', color:'from-[#1a6fb0] to-[#3aa0e0]' },
  { id:'azkar', title:'أذكار المسلم', sub:'حصن المسلم', count:'حصن', icon:'📿', color:'from-[#8c6a1a] to-[#c9a227]' },
  { id:'nawawi', title:'الأربعون النووية', sub:'42 حديثاً', count:'42', icon:'📚', color:'from-[#7a3b0e] to-[#c06a2a]' },
  { id:'salah', title:'دليل الصلاة', sub:'فقه الصلاة', count:'فقه', icon:'🕌', color:'from-[#2a5a8a] to-[#4a90c0]' },
  { id:'asma', title:'أسماء الله الحسنى', sub:'99 اسماً', count:'99', icon:'الله', color:'from-[#0f5a43] to-[#1a8a65]', iconStyle: 'quran-text text-[18px] font-black' },
  { id:'siyam', title:'أحكام الصيام', sub:'واجبات وسنن', count:'فقه', icon:'🌙', color:'from-[#5b4a1a] to-[#8c7a2b]' },
  { id:'hajj', title:'الحج والعمرة', sub:'مناسك وخطوات', count:'ركن', icon:'🕋', color:'from-[#111827] to-[#374151]' },
  { id:'maaloomat', title:'معلومات إسلامية', sub:'سيرة وغزوات', count:'موسوعة', icon:'📚', color:'from-[#064e3b] to-[#10b981]', big:true },
]

export default function Home({ setActive, onRate }){
  const { dark, toggleTheme } = useContext(ThemeContext)
  const [time, setTime] = useState(new Date())
  const [showProfile, setShowProfile] = useState(false)
  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return()=>clearInterval(t)},[])
  const dayName = time.toLocaleDateString('ar-SA', { weekday: 'long' })
  const clock = time.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true })

  return(
    <div className={`min-h-screen pb-6 ${dark? 'bg-[#0a0f1a]' : 'bg-[#f8f6f1]'}`}>
      <div className="px-5 pt-7 pb-2 flex justify-between items-start">
        <div className="text-right">
          <div className="flex items-center gap-2 justify-start" dir="ltr">
            {/* شعار فقط بدون ضغط */}
            <div className="w-8 h-8 rounded-full bg-[#0f5a43] flex items-center justify-center text-white text-[13px] font-bold">ن</div>
            <p className="text-[11px] tracking-[0.25em] text-[#8c7a4b]">NOUR • نُور</p>
          </div>
          <h1 className="font-black text-[22px] mt-3 text-right" dir="rtl">نور المسلم</h1>
          <p className="text-[11px] text-gray-400 mt-1 text-right">رفيقك اليومي للقرآن والأذكار</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <button onClick={onRate} className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-500/30 flex items-center justify-center text-[18px]">⭐</button>
            <button onClick={toggleTheme} className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2332] border flex items-center justify-center text-[16px]">{dark?'☀️':'🌙'}</button>
          </div>
          <div className="mt-2 text-center"><p className="text-[11px] font-bold text-[#0f5a43] dark:text-white">{clock}</p><p className="text-[10px] text-[#8c7a4b] mt-1">{dayName}</p></div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white dark:bg-[#1a2332] rounded-[16px] p-4 border flex justify-between items-center">
          <div className="text-right"><p className="text-[10px] text-[#8c7a4b]">آية اليوم</p><p className="quran-text text-[13px] mt-1">وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا</p></div>
          <div className="w-8 h-8 rounded-full bg-[#f6f1df] flex items-center justify-center">💡</div>
        </div>
      </div>

      <div className="px-3 mt-5 grid grid-cols-2 gap-3">
        {cards.map(card=>(
          <button key={card.id} onClick={()=>setActive(card.id)} className={`rounded-[18px] p-4 text-right bg-white dark:bg-[#1a2332] border flex flex-col justify-between ${card.big?'col-span-2 h-[110px] flex-row items-center':'h-[105px]'}`}>
            <div className={`flex justify-between items-start w-full ${card.big?'w-auto flex-1':''}`}>
              <div className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${card.color} flex items-center justify-center text-white ${card.iconStyle||'text-[18px]'}`}>{card.icon}</div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#f6f1df] text-[#8c7a4b]">{card.count}</span>
            </div>
            <div className={`${card.big?'flex-1 text-right mr-4':''}`}>
              <p className="font-bold text-[13px]">{card.title}</p><p className="text-[10px] text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          </button>
        ))}
      </div>

      {/* الفوتر الجديد - هو اللي يفتح تواصل معنا */}
      <div className="mt-8 px-5">
        <div onClick={()=>setShowProfile(true)} className={`text-center py-4 rounded-[14px] border border-dashed cursor-pointer transition active:scale-[0.98] ${dark?'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]':'bg-white border-black/5 hover:bg-[#f6f1df]'}`}>
          <p className="text-[11px] text-gray-400">المطور م. محسن © 2026</p>
          <p className="text-[11px] font-bold text-[#0f5a43] dark:text-[#d4af37] mt-1">تواصل معنا - اضغط هنا</p>
        </div>
      </div>

      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-5" onClick={()=>setShowProfile(false)}>
          <div className="bg-white dark:bg-[#1a2332] rounded-[20px] p-6 w-full max-w-[320px] shadow-2xl" onClick={e=>e.stopPropagation()} dir="rtl">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0f5a43] text-white flex items-center justify-center text-[22px] font-bold mx-auto shadow-lg">ن</div>
              <h3 className="font-black text-[16px] mt-3">تواصل معنا</h3>
              <p className="text-[11px] text-gray-400 mt-1">تطبيق نُور المسلم</p>
              <div className="mt-5 space-y-3 text-right bg-[#f8f6f1] dark:bg-black/20 rounded-xl p-4">
                <div className="flex justify-between"><span className="text-[11px] text-gray-400">الاسم</span><span className="text-[12px] font-bold">Mohsen Almashjari</span></div>
                <div className="flex justify-between"><span className="text-[11px] text-gray-400">الجوال</span><span className="text-[12px] font-bold" dir="ltr">+967 775443254</span></div>
                <div className="flex justify-between"><span className="text-[11px] text-gray-400">البريد</span><span className="text-[11px] font-bold">mohsen77544.a@gmail.com</span></div>
              </div>
              <button onClick={()=>setShowProfile(false)} className="mt-5 w-full h-11 rounded-xl bg-[#0f5a43] text-white text-[13px] font-bold">إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}