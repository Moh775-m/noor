import { useState, useContext } from 'react'
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

  return(
    <div className={`min-h-screen max-w-[480px] mx-auto relative ${dark? 'bg-[#0a0f1a] text-white' : 'bg-[#f8f6f1] text-[#1e293b]'}`}>
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