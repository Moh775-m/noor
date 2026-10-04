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
  const [show, setShow] = useState(false)

  useEffect(()=>{
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return ()=> window.removeEventListener('beforeinstallprompt', handler)
  },[])

  const install = async () => {
    if(!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if(outcome === 'accepted') setShow(false)
    setDeferredPrompt(null)
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

function Splash(){
  return(
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{background: 'radial-gradient(circle at 50% 15%, #1e8a6a 0%, #0f5a43 45%, #062a22 100%)'}}>
      <div className="relative w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#0f5a43] to-[#082e26] border border-[#d4af37]/30 flex items-center justify-center">
        <span className="text-[56px] font-black text-[#fde68a]" style={{fontFamily: 'Amiri, serif'}}>نور</span>
      </div>
      <h1 className="mt-8 text-[26px] font-black text-white">نور المسلم</h1>
      <p className="mt-2 text-[11px] tracking-[0.3em] text-[#d4af37]/80">NOUR AL-MUSLIM</p>
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

      <InstallBanner />
    </div>
  )
}

export default function App(){ return(<ThemeProvider><AppContent /></ThemeProvider>) }