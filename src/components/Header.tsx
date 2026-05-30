/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Briefcase, Clock, Calendar, CheckCircle } from "lucide-react";

export default function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isOfficeOpen, setIsOfficeOpen] = useState<boolean>(true);

  useEffect(() => {
    // Current Local time is passed from environment metadata: 2026-05-30T01:29:37Z
    // We'll update it based on standard ticker
    const updateTime = () => {
      const now = new Date();
      // Format to Spanish time representation
      const timeString = now.toLocaleTimeString("es-EC", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const dateString = now.toLocaleDateString("es-EC", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      setCurrentTime(`${dateString}, ${timeString}`);

      // Office hours: 08:30 to 18:30, Mon-Fri
      const hours = now.getHours();
      const mins = now.getMinutes();
      const day = now.getDay(); // 0 is Sunday, 6 is Saturday
      const currentHourDecimal = hours + mins / 60;
      
      if (day >= 1 && day <= 5 && currentHourDecimal >= 8.5 && currentHourDecimal <= 18.5) {
        setIsOfficeOpen(true);
      } else {
        setIsOfficeOpen(false);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-50/95 border-b border-brand-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand ID */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl bg-black border border-brand-300 overflow-hidden flex items-center justify-center shadow-md hover:scale-[1.03] transition-transform duration-300 shrink-0">
              <img 
                src="/src/assets/images/jp_logo_1780105629568.png" 
                alt="Logo Tlga. Johanna Pallo" 
                className="w-full h-full object-cover scale-115"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-base font-display font-bold tracking-tight text-brand-950 uppercase">
                Tlga. Johanna Pallo
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-mono text-brand-700 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-brand-800 inline" />
                Servicios Profesionales
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#soluciones" className="text-brand-800 hover:text-brand-950 hover:underline underline-offset-8 transition-colors">
              Servicios
            </a>
            <a href="#seguro-iess" className="text-brand-950 hover:text-brand-800 font-bold hover:underline underline-offset-8 transition-colors">
              Consulta Seguro
            </a>
            <a href="#evaluador" className="text-brand-800 font-semibold hover:text-brand-950 underline underline-offset-8 decoration-brand-400 transition-colors border-b border-transparent">
              Pre-Evaluación IA
            </a>
            <a href="#beneficios" className="text-brand-850 hover:text-brand-950 hover:underline underline-offset-8 transition-colors">
              Beneficios
            </a>
            <a href="#precios" className="text-brand-850 hover:text-brand-950 hover:underline underline-offset-8 transition-colors">
              Precios
            </a>
            <a href="#faqs" className="text-brand-850 hover:text-brand-950 hover:underline underline-offset-8 transition-colors">
              Preguntas
            </a>
          </nav>

          {/* Realtime Office Hours Widget */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex flex-col items-end text-right font-mono text-[11px] text-brand-700">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                <span>{currentTime || "Cargando hora local..."}</span>
              </span>
              <span className="flex items-center space-x-1 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${isOfficeOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                <span className="font-sans font-medium text-[10px]">
                  {isOfficeOpen ? 'Despacho Abierto' : 'Fuera de Horario'}
                </span>
              </span>
            </div>
            
            <a 
              href="#evaluador" 
              className="px-4 py-2.5 rounded-md text-xs font-semibold bg-brand-950 text-brand-50 hover:bg-brand-900 transition-all shadow-sm hover:scale-[1.02] transform"
              id="cta_nav_diagnóstico"
            >
              Evaluación Especializada
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
