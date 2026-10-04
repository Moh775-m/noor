import { useState, useContext, useEffect } from 'react'
import { ThemeProvider, ThemeContext } from './context/ThemeContext'
import Quran from './pages/Quran'
import Audio from './pages/Audio'
import Home from './pages/Home'
import Azkar from './pages/Azkar'
import Nawawi from './pages/Nawawi'
import Salah from './pages/Salah'
import AsmaAllah from './pages/AsmaAllah'

function AppContent(){
  const [activePage, setActivePage] = useState('home')
  const [hideNav, setHideNav] = useState(false)
  const { dark } = useContext(ThemeContext)

  // --- كود زر التثبيت ---
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setShowInstall(false));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowInstall(false);
    setDeferredPrompt(null);
  };
  // --- نهاية كود التثبيت ---

  return(
    <div className={`min-h-screen max-w-[480px] mx-auto relative ${dark? 'bg-[#0a0f1a] text-white' : 'bg-[#f8f6f1] text-[#1e293b]'}`}>

      {/* زر التحميل - يظهر فقط للناس اللي ما ثبتوا التطبيق */}
      {showInstall &&!hideNav && (
        <div className={`sticky top-0 z-[100] flex justify-between items-center px-4 py-3 mx-2 mt-2 rounded-xl shadow-lg ${dark? 'bg-[#1e293b] border border-white/10' : 'bg-[#0f5a43] text-white'}`}>
          <span className="text-[14px] font-bold">📲 حمّل التطبيق على جوالك</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowInstall(false)} className="opacity-70 px-1">✕</button>
            <button
              onClick={handleInstall}
              className={`px-4 py-1.5 rounded-full font-bold text-sm ${dark? 'bg-white text-black' : 'bg-white text-[#0f5a43]'}`}
            >
              تثبيت
            </button>
          </div>
        </div>
      )}

      {activePage==='home' && <Home setActive={setActivePage} />}
      {activePage==='quran' && <Quran onReading={setHideNav} onHome={()=>{ setHideNav(false); setActivePage('home') }} />}
      {activePage==='audio' && <Audio onHome={()=>setActivePage('home')} />}
      {activePage==='azkar' && <Azkar onHome={()=>setActivePage('home')} />}
      {activePage==='nawawi' && <Nawawi onHome={()=>setActivePage('home')} />}
      {activePage==='salah' && <Salah onHome={()=>setActivePage('home')} />}
      {activePage==='asma' && <AsmaAllah onHome={()=>setActivePage('home')} />}
    </div>
  )
}

export default function App(){
  return(
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}