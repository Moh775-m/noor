import { useState, useContext, useEffect } from 'react'
import { ThemeProvider, ThemeContext } from './context/ThemeContext'
import Quran from './pages/Quran'
import Audio from './pages/Audio'
import Home from './pages/Home'
import Azkar from './pages/Azkar'
import Nawawi from './pages/Nawawi'
import Salah from './pages/Salah'
import AsmaAllah from './pages/AsmaAllah'
import Siyam from './pages/Siyam'
import Hajj from './pages/Hajj'
import Maaloomat from './pages/Maaloomat'


function Splash(){
  return(
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{background: 'radial-gradient(circle at 50% 15%, #1e8a6a 0%, #0f5a43 45%, #062a22 100%)'}}>

      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#d4af37]/20 rounded-full blur-[90px] animate-pulse"></div>
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#0f5a43]/40 rounded-full blur-[60px]"></div>

      <div className="relative flex flex-col items-center">
        {/* الشعار */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#d4af37]/30 rounded-full blur-[25px] animate-pulse"></div>
          <div className="relative w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#0f5a43] to-[#082e26] border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)]">
            <div className="absolute inset-[8px] rounded-full border border-[#d4af37]/20"></div>
            <div className="absolute inset-[14px] rounded-full border border-[#d4af37]/10"></div>
            <span className="text-[56px] font-black text-[#fde68a] drop-shadow-[0_0_15px_rgba(253,230,138,0.8)]" style={{fontFamily: 'Amiri, serif'}}>نور</span>
          </div>
        </div>

        <h1 className="mt-8 text-[26px] font-black text-white tracking-wide">نور المسلم</h1>
        <p className="mt-2 text-[11px] tracking-[0.3em] text-[#d4af37]/80">NOUR AL-MUSLIM</p>
        <p className="mt-6 text-[12px] text-white/60 quran-text">﴿ اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ ﴾</p>

        <div className="mt-10 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-[#d4af37]/70 animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 rounded-full bg-[#d4af37]/40 animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>

      <div className="absolute bottom-8 text-[10px] text-white/30">المطور م. محسن © 2026</div>
    </div>
  )
}

function RatingModal({ dark, onClose }){
  const [stars, setStars] = useState(5)
  const [text, setText] = useState("")
  const [sending, setSending] = useState(false)

  const send = async () => {
    setSending(true)
    try {
      const res = await fetch("https://formsubmit.co/ajax/c52d05d5280889a1b3c7e732f9b2f8a9", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `تقييم جديد ${stars}/5 - نور المسلم`,
          التقييم: `${stars} من 5`,
          الملاحظة: text || "بدون ملاحظة",
          التاريخ: new Date().toLocaleString('ar-YE')
        })
      })
      if(res.ok){
        alert("تم إرسال تقييمك بنجاح ❤️ شكراً لك")
        onClose()
      } else {
        alert("فشل الإرسال، حاول مرة أخرى")
      }
    } catch(e){
      alert("حدث خطأ في الاتصال")
    }
    setSending(false)
  }

  return(
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className={`w-full max-w-[360px] rounded-[20px] p-5 ${dark?'bg-[#1a2332]':'bg-white'} shadow-2xl`}>
        <h3 className="font-black text-center text-[16px]">قيّم تطبيق نور المسلم</h3>
        <div className="flex justify-center gap-2 my-4 text-[34px]">
          {[1,2,3,4,5].map(s=><button key={s} onClick={()=>setStars(s)}>{s<=stars?"⭐":"☆"}</button>)}
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="ملاحظتك (اختياري)" className={`w-full rounded-xl p-3 text-[13px] h-20 outline-none ${dark?'bg-black/30 border border-white/10':'bg-[#f8f6f1] border border-black/5'}`} />
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className={`flex-1 h-11 rounded-xl text-[13px] ${dark?'bg-white/10':'bg-gray-100'}`}>إلغاء</button>
          <button onClick={send} disabled={sending} className="flex-1 h-11 rounded-xl bg-[#0f5a43] text-white text-[13px] font-bold">{sending?"جاري الإرسال...":"إرسال"}</button>
        </div>
      </div>
    </div>
  )
}

function AppContent(){
  const [activePage, setActivePage] = useState('home')
  const [hideNav, setHideNav] = useState(false)
  const [showRate, setShowRate] = useState(false)
  const [loading, setLoading] = useState(true)
  const { dark } = useContext(ThemeContext)

  useEffect(()=>{
    const t = setTimeout(()=> setLoading(false), 2500)
    return ()=> clearTimeout(t)
  },[])

  if(loading) return <Splash />

  return(
    <div className={`min-h-screen max-w-[480px] mx-auto ${dark?'bg-[#0a0f1a] text-white':'bg-[#f8f6f1]'}`}>
      {activePage==='home' && <Home setActive={setActivePage} onRate={()=>setShowRate(true)} />}
      {activePage==='quran' && <Quran onReading={setHideNav} onHome={()=>{setHideNav(false); setActivePage('home')}} />}
      {activePage==='audio' && <Audio onHome={()=>setActivePage('home')} />}
      {activePage==='azkar' && <Azkar onHome={()=>setActivePage('home')} />}
      {activePage==='nawawi' && <Nawawi onHome={()=>setActivePage('home')} />}
      {activePage==='salah' && <Salah onHome={()=>setActivePage('home')} />}
      {activePage==='asma' && <AsmaAllah onHome={()=>setActivePage('home')} />}
      {activePage==='siyam' && <Siyam onHome={()=>setActivePage('home')} />}
      {activePage==='hajj' && <Hajj onHome={()=>setActivePage('home')} />}
      {activePage==='maaloomat' && <Maaloomat onHome={()=>setActivePage('home')} />}
      {showRate && <RatingModal dark={dark} onClose={()=>setShowRate(false)} />}
    </div>
  )
}

export default function App(){ return(<ThemeProvider><AppContent /></ThemeProvider>) }