
import React, { useState, useEffect, useRef } from 'react';
import { HomeView } from './components/HomeView';
import { CheckoutView } from './components/CheckoutView';
import { LumiAssistant } from './components/LumiAssistant';

export type Language = 'fr' | 'en' | 'es';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'checkout'>('home');
  const [isLumiOpen, setIsLumiOpen] = useState(false);
  const [lang, setLang] = useState<Language>('fr');
  const [showAiHint, setShowAiHint] = useState(false);

  // Monitor scroll to trigger a one-time "pop-up" hint for the AI
  useEffect(() => {
    let hasTriggered = false;
    const handleScroll = () => {
      if (hasTriggered || isLumiOpen) return;
      
      const scrollY = window.scrollY;
      if (scrollY > 200) {
        setShowAiHint(true);
        hasTriggered = true;
        // Hide hint after 6 seconds
        setTimeout(() => setShowAiHint(false), 6000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLumiOpen]);

  const aiHintText = {
    fr: "Besoin d'aide ? Lumi est là.",
    en: "Need help? Lumi is here.",
    es: "¿Necesitas ayuda? Lumi está aquí."
  }[lang];

  return (
    <div className="w-full min-h-screen bg-[#F7F5F2] relative flex flex-col">
      {/* Centered container for content to maintain readability */}
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">
        {/* Navigation Header */}
        <header className="px-6 pt-8 pb-4 flex justify-between items-center w-full">
          {currentView !== 'home' ? (
            <button 
              onClick={() => setCurrentView('home')}
              className="text-[10px] tracking-widest uppercase text-[#B2A08E] font-semibold flex items-center gap-2"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              {lang === 'fr' ? 'Retour' : lang === 'es' ? 'Volver' : 'Back'}
            </button>
          ) : (
            <div className="text-[10px] tracking-widest uppercase text-[#B2A08E] font-semibold">
              Residence 280
            </div>
          )}

          {/* Language Switcher */}
          <div className="flex gap-2 bg-white/50 p-1 rounded-full border border-[#E8E4DE] shadow-sm">
            {(['fr', 'en', 'es'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold rounded-full transition-all ${
                  lang === l ? 'bg-[#3C3633] text-white shadow-md' : 'text-[#B2A08E] hover:text-[#3C3633]'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-6 pb-24 w-full">
          {currentView === 'home' && (
            <HomeView 
              lang={lang} 
              onCheckout={() => setCurrentView('checkout')} 
            />
          )}
          {currentView === 'checkout' && <CheckoutView lang={lang} />}
        </main>
      </div>

      {/* Floating Action Button for AI - Responsive Position */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3 origin-bottom-right">
        {showAiHint && (
          <div className="bg-[#3C3633] text-white text-[10px] tracking-widest uppercase font-bold py-3 px-6 rounded-2xl rounded-br-none shadow-2xl animate-pop-up whitespace-nowrap mb-1 relative">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#B2A08E] rounded-full animate-pulse"></span>
              {aiHintText}
            </span>
            <div className="absolute -bottom-1.5 right-0 w-3 h-3 bg-[#3C3633] transform rotate-45"></div>
          </div>
        )}
        <button 
          onClick={() => {
            setIsLumiOpen(true);
            setShowAiHint(false);
          }}
          className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border border-[#E8E4DE] hover:scale-110 active:scale-95 transition-all group relative ${showAiHint ? 'animate-pulse-glow' : ''}`}
        >
          {showAiHint && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B2A08E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#B2A08E]"></span>
            </span>
          )}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B2A08E" strokeWidth="1.5" className="group-hover:rotate-12 transition-transform">
            <path d="M12 3L14.5 9L21 11.5L14.5 14L12 21L9.5 14L3 11.5L9.5 9L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Lumi Assistant Modal */}
      {isLumiOpen && <LumiAssistant onClose={() => setIsLumiOpen(false)} />}
      
      {/* Permanent Checkout CTA if on Home */}
      {currentView === 'home' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
          <button 
            onClick={() => setCurrentView('checkout')}
            className="bg-white px-10 py-4 rounded-full shadow-2xl border border-[#E8E4DE] flex items-center gap-3 text-[12px] tracking-widest uppercase font-bold text-[#3C3633] hover:bg-[#3C3633] hover:text-white transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            {lang === 'fr' ? 'Départ' : lang === 'es' ? 'Salida' : 'Checkout'}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
