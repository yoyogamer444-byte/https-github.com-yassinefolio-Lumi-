
import React, { useState } from 'react';
import { Language } from '../App';

interface HomeViewProps {
  lang: Language;
  onCheckout: () => void;
}

const translations = {
  fr: {
    welcome: "Bienvenue dans votre refuge.",
    network: "Réseau",
    password: "Mot de passe",
    copy: "Copier",
    copied: "Copié !",
    qr: "Code QR",
    messageHost: "Écrire au Host sur WhatsApp",
    hospitality: "Services d'hospitalité",
    cleaning: "Réserver Nettoyage",
    crib: "Demander Lit Bébé",
    complimentary: "Offert",
    confirm: "Confirmer",
    manuals: "Guides Pratiques",
    essentials: "Essentiels de vie",
    coffee: "Espace Café",
    stove: "Cuisine de Chef",
    coffeeDesc: "Manuel Nespresso et sélection.",
    stoveDesc: "Allumage gaz et sécurité four.",
    time: "Choisir un créneau",
    watchVideo: "Voir la vidéo",
    recommendations: "Recommandations locales",
    viewMap: "Voir sur Maps",
    places: [
      { name: "Little Mamma", type: "Restaurant", location: "Gauthier", map: "https://maps.app.goo.gl/3XWqLw7C8Y6v6T8U7" },
      { name: "Starbucks Villa", type: "Café", location: "Boul. Roosevelt", map: "https://maps.app.goo.gl/N5r5P7m6T6Z1w2Q5A" },
      { name: "Morocco Mall", type: "Shopping", location: "Ain Diab", map: "https://maps.app.goo.gl/U4zW2t9G9y5z5A9A9" },
      { name: "Marjane", type: "Supermarché", location: "Californie", map: "https://maps.app.goo.gl/p7y5D7u4F7S7E8A1A" },
      { name: "Sindibad", type: "Parc d'attractions", location: "Ain Diab", map: "https://maps.app.goo.gl/r5E5K5L5M5N5O5P5Q" }
    ]
  },
  en: {
    welcome: "Welcome to your sanctuary.",
    network: "Network",
    password: "Password",
    copy: "Copy",
    copied: "Copied!",
    qr: "QR Code",
    messageHost: "Message Host on WhatsApp",
    hospitality: "Hospitality Services",
    cleaning: "Book Cleaning",
    crib: "Request Crib",
    complimentary: "Complimentary",
    confirm: "Confirm",
    manuals: "Instructional Manuals",
    essentials: "Living essentials.",
    coffee: "Coffee Station",
    stove: "Chef's Kitchen",
    coffeeDesc: "Nespresso manual and selection.",
    stoveDesc: "Gas stove and oven safety.",
    time: "Select a time slot",
    watchVideo: "Watch Video",
    recommendations: "Local Recommendations",
    viewMap: "View on Maps",
    places: [
      { name: "Little Mamma", type: "Restaurant", location: "Gauthier", map: "https://maps.app.goo.gl/3XWqLw7C8Y6v6T8U7" },
      { name: "Starbucks Villa", type: "Café", location: "Boul. Roosevelt", map: "https://maps.app.goo.gl/N5r5P7m6T6Z1w2Q5A" },
      { name: "Morocco Mall", type: "Shopping", location: "Ain Diab", map: "https://maps.app.goo.gl/U4zW2t9G9y5z5A9A9" },
      { name: "Marjane", type: "Supermarket", location: "Californie", map: "https://maps.app.goo.gl/p7y5D7u4F7S7E8A1A" },
      { name: "Sindibad", type: "Amusement Park", location: "Ain Diab", map: "https://maps.app.goo.gl/r5E5K5L5M5N5O5P5Q" }
    ]
  },
  es: {
    welcome: "Bienvenido a su santuario.",
    network: "Red",
    password: "Contraseña",
    copy: "Copiar",
    copied: "¡Copiado!",
    qr: "Código QR",
    messageHost: "Mensaje al Host por WhatsApp",
    hospitality: "Servicios de Hospitalidad",
    cleaning: "Reservar Limpieza",
    crib: "Solicitar Cuna",
    complimentary: "Gratis",
    confirm: "Confirmar",
    manuals: "Manuales de Instrucción",
    essentials: "Esenciales del hogar.",
    coffee: "Estación de Café",
    stove: "Cocina de Chef",
    coffeeDesc: "Manual Nespresso y selección.",
    stoveDesc: "Encendido de gas y seguridad.",
    time: "Elegir horario",
    watchVideo: "Ver video",
    recommendations: "Recomendaciones locales",
    viewMap: "Ver en Maps",
    places: [
      { name: "Little Mamma", type: "Restaurante", location: "Gauthier", map: "https://maps.app.goo.gl/3XWqLw7C8Y6v6T8U7" },
      { name: "Starbucks Villa", type: "Café", location: "Boul. Roosevelt", map: "https://maps.app.goo.gl/N5r5P7m6T6Z1w2Q5A" },
      { name: "Morocco Mall", type: "Compras", location: "Ain Diab", map: "https://maps.app.goo.gl/U4zW2t9G9y5z5A9A9" },
      { name: "Marjane", type: "Supermercado", location: "Californie", map: "https://maps.app.goo.gl/p7y5D7u4F7S7E8A1A" },
      { name: "Sindibad", type: "Parque de Atracciones", location: "Ain Diab", map: "https://maps.app.goo.gl/r5E5K5L5M5N5O5P5Q" }
    ]
  }
};

const HOST_PHONE = "212600000000"; // Placeholder

export const HomeView: React.FC<HomeViewProps> = ({ lang }) => {
  const [selectedCleaningTime, setSelectedCleaningTime] = useState("");
  const [selectedCribTime, setSelectedCribTime] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const t = translations[lang];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleWhatsApp = (service: string, time: string) => {
    const text = encodeURIComponent(`Bonjour, je souhaite réserver le service "${service}" pour le créneau : ${time}. (Appartement 280)`);
    window.open(`https://wa.me/${HOST_PHONE}?text=${text}`, '_blank');
  };

  const messageHost = () => {
    const text = encodeURIComponent(`Bonjour, je suis actuellement à la Résidence 280 et j'ai une question.`);
    window.open(`https://wa.me/${HOST_PHONE}?text=${text}`, '_blank');
  };

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  return (
    <div className="space-y-10 animate-fade-in pb-12 w-full">
      <section className="text-center space-y-2 mt-4">
        <h1 className="text-4xl px-4">{t.welcome}</h1>
      </section>

      {/* Grid Layout for Larger Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* WiFi Card */}
        <div className="bg-white rounded-[40px] p-8 text-center space-y-6 custom-shadow relative overflow-hidden flex flex-col justify-between h-full">
          <div className="mx-auto w-12 h-12 bg-[#F7F5F2] rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B2A08E" strokeWidth="1.5">
              <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.59 16.11a6 6 0 0 1 6.82 0M12 20h.01" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#B2A08E] font-bold">{t.network}</p>
              <p className="text-xl serif tracking-wider mt-1">LUXURY_GUEST_280</p>
            </div>
            <div className="border-t border-[#F0EDE8] pt-4">
              <p className="text-[10px] tracking-widest uppercase text-[#B2A08E] font-bold">{t.password}</p>
              <p className="text-lg tracking-[0.2em] mt-1 font-light">STAY_IN_STYLE_2025</p>
            </div>
          </div>

          <div className="flex gap-2 relative">
            <button 
              onClick={() => copyToClipboard('STAY_IN_STYLE_2025')}
              className={`flex-1 py-4 rounded-xl text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${isCopied ? 'bg-green-600 text-white' : 'bg-[#3C3633] text-white'}`}
            >
              {isCopied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {t.copied}
                </>
              ) : t.copy}
            </button>
            <button 
              onClick={() => setShowQR(!showQR)}
              className="flex-1 border border-[#3C3633] text-[#3C3633] py-4 rounded-xl text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              {t.qr}
            </button>
          </div>

          {showQR && (
            <div className="pt-4 flex flex-col items-center animate-fade-in bg-white absolute inset-0 z-10 justify-center">
              <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-[#B2A08E]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WIFI:S:LUXURY_GUEST_280;T:WPA;P:STAY_IN_STYLE_2025;;" 
                alt="WiFi QR Code"
                className="w-32 h-32"
              />
              <p className="text-[8px] text-[#B2A08E] mt-2 tracking-widest uppercase">Scan to connect</p>
            </div>
          )}

          <button 
            onClick={messageHost}
            className="w-full flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase text-[#B2A08E] font-bold py-2 hover:text-[#3C3633] transition-colors border-t border-[#F0EDE8] mt-2 pt-4"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.874-2.512-2.96-2.626-.087-.115-.708-.941-.708-1.797 0-.855.448-1.274.607-1.446.159-.172.346-.215.46-.215.115 0 .23 0 .331.005.106.005.247-.04.386.299.144.351.49.1.1.1.1.1 0 0 0 0 0 0 0 .548 1.332 1.34 1.34 1.34z" />
            </svg>
            {t.messageHost}
          </button>
        </div>

        {/* Cleaning Service */}
        <div className="bg-white rounded-[30px] p-6 space-y-4 custom-shadow flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#F7F5F2] rounded-xl flex items-center justify-center shrink-0 text-xl">✨</div>
              <div>
                <p className="font-semibold text-sm">{t.cleaning}</p>
                <p className="text-[10px] tracking-widest text-[#B2A08E] mt-1 uppercase font-bold">50 DH</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(time => (
              <button 
                key={time}
                onClick={() => setSelectedCleaningTime(time)}
                className={`text-[10px] py-2 rounded-lg border transition-all ${selectedCleaningTime === time ? 'bg-[#3C3633] text-white border-[#3C3633]' : 'bg-transparent text-[#B2A08E] border-[#E8E4DE]'}`}
              >
                {time}
              </button>
            ))}
          </div>
          <button 
            disabled={!selectedCleaningTime}
            onClick={() => handleWhatsApp(t.cleaning, selectedCleaningTime)}
            className="w-full bg-[#3C3633] text-white py-3 rounded-xl text-[10px] tracking-widest uppercase font-bold disabled:opacity-30 transition-all active:scale-[0.98]"
          >
            {t.confirm}
          </button>
        </div>

        {/* Crib Service */}
        <div className="bg-white rounded-[30px] p-6 space-y-4 custom-shadow flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#F7F5F2] rounded-xl flex items-center justify-center shrink-0 text-xl">👶</div>
              <div>
                <p className="font-semibold text-sm">{t.crib}</p>
                <p className="text-[10px] tracking-widest text-[#B2A08E] mt-1 uppercase font-bold">{t.complimentary}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(time => (
              <button 
                key={time}
                onClick={() => setSelectedCribTime(time)}
                className={`text-[10px] py-2 rounded-lg border transition-all ${selectedCribTime === time ? 'bg-[#3C3633] text-white border-[#3C3633]' : 'bg-transparent text-[#B2A08E] border-[#E8E4DE]'}`}
              >
                {time}
              </button>
            ))}
          </div>
          <button 
            disabled={!selectedCribTime}
            onClick={() => handleWhatsApp(t.crib, selectedCribTime)}
            className="w-full bg-[#3C3633] text-white py-3 rounded-xl text-[10px] tracking-widest uppercase font-bold disabled:opacity-30 transition-all active:scale-[0.98]"
          >
            {t.confirm}
          </button>
        </div>
      </div>

      {/* Recommended Places - Horizontal Slider */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-2">
          <div className="space-y-1">
            <p className="text-[10px] tracking-widest uppercase text-[#B2A08E] font-bold">{t.recommendations}</p>
            <h2 className="text-xl serif">Casablanca gems.</h2>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 px-2 no-scrollbar snap-x">
          {t.places.map((place, idx) => (
            <div key={idx} className="min-w-[240px] bg-white rounded-[24px] p-5 custom-shadow snap-start flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="w-8 h-8 bg-[#F7F5F2] rounded-lg flex items-center justify-center text-sm">📍</div>
                <div>
                  <p className="font-bold text-sm text-[#3C3633]">{place.name}</p>
                  <p className="text-[10px] text-[#B2A08E] tracking-widest uppercase font-semibold">{place.type}</p>
                  <p className="text-[10px] text-[#7C746E] italic mt-1">{place.location}</p>
                </div>
              </div>
              <a 
                href={place.map}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#F7F5F2] text-[#3C3633] rounded-xl text-[9px] tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#E8E4DE] transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                {t.viewMap}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Instructional Manuals */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-[10px] tracking-widest uppercase text-[#B2A08E] font-bold">{t.manuals}</p>
          <h2 className="text-2xl serif">{t.essentials}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-[30px] p-6 flex gap-4 items-center custom-shadow">
            <span className="text-3xl shrink-0">☕</span>
            <div className="flex-1 space-y-1">
              <p className="text-[9px] tracking-widest uppercase text-[#B2A08E] font-bold">{t.coffee}</p>
              <p className="text-xs text-[#7C746E]">{t.coffeeDesc}</p>
              <a 
                href="https://youtu.be/uVwM8obVT-s" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-[9px] text-[#B2A08E] underline font-bold uppercase tracking-tighter mt-2 hover:text-[#3C3633]"
              >
                {t.watchVideo}
              </a>
            </div>
          </div>
          <div className="bg-white rounded-[30px] p-6 flex gap-4 items-center custom-shadow">
            <span className="text-3xl shrink-0">🍳</span>
            <div className="flex-1 space-y-1">
              <p className="text-[9px] tracking-widest uppercase text-[#B2A08E] font-bold">{t.stove}</p>
              <p className="text-xs text-[#7C746E]">{t.stoveDesc}</p>
              <a 
                href="https://youtu.be/plcbES-L8t8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-[9px] text-[#B2A08E] underline font-bold uppercase tracking-tighter mt-2 hover:text-[#3C3633]"
              >
                {t.watchVideo}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
};
