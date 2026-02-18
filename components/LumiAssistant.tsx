
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getLumiResponse } from '../geminiService';

export const LumiAssistant: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Salam! Ana Lumi, l'concierge dyalk. Sewwelni 3la ay haja: finahwa l'mous, kifash t'tayeb tajine, ou les meilleurs coins f Casa. Ashnehiya l'haja li n9der n3awnk biha?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getLumiResponse(userMsg, messages);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white w-full max-w-md h-[80vh] rounded-[40px] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#F0EDE8] flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F7F5F2] rounded-full flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
            <p className="text-[10px] tracking-widest uppercase text-[#B2A08E] font-bold">Lumi Chat</p>
          </div>
          <button onClick={onClose} className="text-[#B2A08E] hover:text-[#3C3633]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FBFBFB]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-[24px] text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-[#3C3633] text-white rounded-br-none' 
                : 'bg-white border border-[#F0EDE8] text-[#3C3633] rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#F0EDE8] px-5 py-3 rounded-[24px] rounded-bl-none shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#B2A08E] rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-[#B2A08E] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-[#B2A08E] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-[#F0EDE8]">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Sewwelni 3la ay haja..."
              className="w-full bg-[#F7F5F2] border-none rounded-[20px] px-6 py-4 text-sm focus:ring-1 focus:ring-[#B2A08E] outline-none"
            />
            <button 
              onClick={handleSend}
              className="absolute right-4 text-[#B2A08E] hover:text-[#3C3633]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
