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

function InstallBanner(){
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(true)
  useEffect(()=>{
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)
    if (window.matchMedia('(display-mode: standalone)').matches) setShow(false)
    return ()=> window.removeEventListener('beforeinstallprompt', handler)
  },[])
  const install = async () => {
    if(deferredPrompt){
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if(outcome === 'accepted') setShow(false)
      setDeferredPrompt(null)
    } else {
      alert("لتثبيت التطبيق: اضغط الثلاث نقاط > تثبيت التطبيق")
    }
  }
  if(!show) return null
  return(
    <div className="fixed bottom-4 left-4 right-4 z-[999] bg-white dark:bg-[#1a2332] rounded-[16px] p-4 shadow-2xl border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#0f5a43] flex items-center justify-center text-white font-bold">ن</div>
        <div className="text-right">
          <p className="font-bold text-[13px]">حمل تطبيق نور المسلم</p>
          <p className="text-[10px] text-gray-400">يثبت كتطبيق على جهازك</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>setShow(false)} className="text-[11px] px-3">لاحقاً</button>
        <button onClick={install} className="bg-[#0f5a43] text-white px-4 py-2 rounded-xl text-[12px] font-bold">تثبيت</button>
      </div>
    </div>
  )
}

function RateModal({ onClose }){
  const [stars, setStars] = useState(5)
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendEmail = async () => {
    setLoading(true)
    try {
      const YOUR_EMAIL = "mohsen77544.a@gmail.com"
      await fetch(`https://formsubmit.co/ajax/${YOUR_EMAIL}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `⭐ تقييم  ${stars} نجوم - نور المسلم`,
          stars: `${stars} / 5`,
          message: comment || "بدون تعليق",
          app: "نور المسلم",
          date: new Date().toLocaleString('ar-EG')
        })
      })
      setSent(true)
      setTimeout(()=> onClose(), 2000)
    } catch(e){
      alert("فشل الإرسال، حاول مرة أخرى")
    }
    setLoading(false)
  }

  if(sent){
    return(
      <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#1a2332] rounded-[20px] p-8 w-full max-w-[340px] text-center">
          <div className="text-[50px] mb-2">✅</div>
          <h3 className="font-black text-[16px]">جزاك الله خيراً!</h3>
          <p className="text-[12px] text-gray-500 mt-1">تم إرسال تقييمك بنجاح</p>
        </div>
      </div>
    )
  }

  return(
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1a2332] rounded-[24px] p-6 w-full max-w-[360px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-[16px]">قيّم التطبيق</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10">✕</button>
        </div>
        <div className="flex justify-center gap-1 mb-4">
          {[1,2,3,4,5].map(n=>(
            <button key={n} onClick={()=>setStars(n)} className={`text-[32px] ${n<=stars? 'text-[#fbbf24]' : 'text-gray-300'}`}>★</button>
          ))}
        </div>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="اكتب ملاحظتك (اختياري)..." className="w-full h-[80px] p-3 rounded-xl bg-gray-50 dark:bg-black/30 border text-[13px] resize-none outline-none focus:border-[#0f5a43]" />
        <button onClick={sendEmail} disabled={loading} className="mt-4 w-full py-3 rounded-xl bg-[#0f5a43] text-white font-bold text-[14px] disabled:opacity-50">
          {loading? 'جاري الإرسال...' : `إرسال التقييم (${stars} نجوم)`}
        </button>
      </div>
    </div>
  )
}

function AppContent(){
  const [activePage, setActivePage] = useState('home')
  const [hideNav, setHideNav] = useState(false)
  const [showRate, setShowRate] = useState(false)
  const { dark } = useContext(ThemeContext)
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
      <InstallBanner />
      {showRate && <RateModal onClose={()=>setShowRate(false)} />}
    </div>
  )
}
export default function App(){ return(<ThemeProvider><AppContent /></ThemeProvider>) }