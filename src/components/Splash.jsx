export default function Splash(){
  return(
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{background: 'radial-gradient(circle at 50% 20%, #1e8a6a 0%, #0f5a43 45%, #082e26 100%)'}}>

      {/* نور خفيف متحرك */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4af37]/20 rounded-full blur-[80px] animate-pulse"></div>

      {/* زخرفة اسلامية خفيفة */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L32 28 L60 30 L32 32 L30 60 L28 32 L0 30 L28 28 Z' fill='%23d4af37' fill-opacity='0.4'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative flex flex-col items-center">
        {/* الشعار */}
        <div className="w-[160px] h-[160px] rounded-full bg-gradient-to-br from-[#0f5a43] to-[#083828] border-[3px] border-[#d4af37]/30 shadow-[0_0_60px_rgba(212,175,55,0.3),inset_0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center animate-[ping_3s_ease-in-out_infinite]">
          <span className="quran-text text-[65px] font-black text-[#f6e7a0] drop-shadow-[0_0_15px_rgba(246,231,160,0.8)]">نور</span>
        </div>

        {/* الدائرة الخارجية */}
        <div className="absolute top-0 w-[160px] h-[160px] rounded-full border border-[#d4af37]/20 animate-[spin_8s_linear_infinite]"></div>
        <div className="absolute top-[-10px] w-[180px] h-[180px] rounded-full border border-white/10"></div>

        <h1 className="mt-8 text-[26px] font-black text-white tracking-widest">نُورُ المُسْلِم</h1>
        <p className="mt-2 text-[11px] tracking-[0.4em] text-[#d4af37]/80">NOUR AL-MUSLIM</p>

        <div className="mt-10 flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce"></span>
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.4s]"></span>
        </div>
        <p className="mt-4 text-[10px] text-white/40">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
      </div>

      <div className="absolute bottom-10 text-[10px] text-white/30"> © 2026</div>
    </div>
  )
}