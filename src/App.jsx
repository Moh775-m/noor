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

  // --- كود زر التثبيت الذكي والدائم ---
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // هل التطبيق مثبت أصلاً؟ لا تظهر الزر
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsStandalone(true);
      setShowInstall(false);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setShowInstall(false);
      setIsStandalone(true);
    });
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstall(false);
      }
      setDeferredPrompt(null);
    } else {
      // شرح يدوي إذا كروم منع الزر التلقائي (حالتك الآن)
      alert("لتثبيت تطبيق نور المسلم على جوالك:\n\n1. اضغط ⋮ فوق في المتصفح\n2. اختر 'تثبيت التطبيق' أو 'Add to Home screen'\n3. اضغط تثبيت\n\nسيظهر عندك مثل أي تطبيق من المتجر!");
    }
  };
  // --- نهاية كود التثبيت ---

  return(
    <div className={`min-h-screen max-w-[480px] mx-auto relative ${dark? 'bg-[#0a0f1a] text-white' : 'bg-[#f8f6f1] text-[#1e293b]'}`}>

      {/* زر التحميل - يظهر دائماً إلا إذا كان مثبت أو داخل قراءة القرآن */}
      {showInstall &&!hideNav &&!isStandalone && (
        <div className={`sticky top-0 z-[100] flex justify-between items-center px-4 py-3 mx-2 mt-2 rounded-xl shadow-lg animate-pulse ${dark? 'bg-[#1e293b] border border-white/10' : 'bg-[#0f5a43] text-white'}`}>
          <span className="text-[13px] font-bold">📲 حمّل تطبيق نور المسلم</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowInstall(false)} className="opacity-70 px-2 text-[16px]">✕</button>
            <button
              onClick={handleInstall}
              className={`px-4 py-1.5 rounded-full font-bold text-sm ${dark? 'bg-white text-black' : 'bg-white text-[#0f5a43]'}`}
            >
              {deferredPrompt? "تثبيت" : "تثبيت"}
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