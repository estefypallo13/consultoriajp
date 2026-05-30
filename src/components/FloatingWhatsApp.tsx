/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds of load
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const phoneNumber = "593990221004";
  const defaultText = "Hola Johanna, estuve visitando su sitio web y me gustaría realizar una consulta profesional sobre sus servicios de asesorías y trámites.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mb-3 mr-1 bg-white border border-[#e9e8db] text-[#29281d] px-4 py-3 rounded-2xl shadow-xl max-w-xs animate-fadeIn relative pointer-events-auto flex items-start gap-2.5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                Línea Directa Activa
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#54533e] font-sans">
              Hola, soy la **Tlga. Johanna Pallo**. Escríbeme y resolveré tu consulta directamente.
            </p>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); setShowTooltip(false); }}
            className="text-stone-400 hover:text-stone-600 transition-colors shrink-0 p-0.5"
            aria-label="Cerrar saludo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          {/* Small Arrow at the bottom */}
          <div className="absolute right-5 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-[#e9e8db] transform rotate-45"></div>
        </div>
      )}

      {/* Floating button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-2xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        aria-label="Chatear por WhatsApp"
      >
        {/* Pulsing halo effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping -z-10 group-hover:animate-none"></span>
        
        {/* Chat badge */}
        {!showTooltip && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          </span>
        )}

        <MessageCircle className="w-7 h-7 fill-white/10" />
      </a>
    </div>
  );
}
