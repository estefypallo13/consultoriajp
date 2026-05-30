/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, Mail, Phone, Calendar, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-50 py-16 border-t border-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Motto (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl bg-black border border-brand-800 overflow-hidden flex items-center justify-center shadow-lg transform hover:rotate-3 transition-transform duration-300 shrink-0">
                <img 
                  src="/src/assets/images/jp_logo_1780105629568.png" 
                  alt="Logo Tlga. Johanna Pallo" 
                  className="w-full h-full object-cover scale-115"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-widest font-display font-bold text-white">
                  Tlga. Johanna Pallo
                </h3>
                <p className="text-[9px] uppercase tracking-wider font-mono text-brand-300 font-semibold">
                  Despacho de Consultoría Especializada
                </p>
              </div>
            </div>
            <p className="text-xs text-[#d6d3c0] leading-relaxed max-w-sm pt-2 font-sans">
              Brindando soluciones estratégicas con total rigurosidad, honestidad y apego técnico. Especialistas en desatar nudos administrativos municipales y redactar instrumentos jurídicos de confianza en Ecuador.
            </p>
          </div>

          {/* Col 2: Services / Anchor targets (3 cols) */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#bcba9c]">
              Vías de Acceso
            </h4>
            <ul className="space-y-2 text-xs text-[#d6d3c0]">
              <li>
                <a href="#soluciones" className="hover:text-white transition-colors">
                  Áreas de Práctica
                </a>
              </li>
              <li>
                <a href="#evaluador" className="hover:text-white transition-colors text-brand-300 font-semibold">
                  Pre-Evaluación Diagnóstica IA
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">
                  Nuestros Beneficios
                </a>
              </li>
              <li>
                <a href="#precios" className="hover:text-white transition-colors">
                  Simulador de Tarifas
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-white transition-colors">
                  Casos de Éxito
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct contact specifications (4 cols) */}
          <div className="md:col-span-4 space-y-4 text-xs text-[#d6d3c0]">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#bcba9c]">
              Contacto y Canales Directos
            </h4>
            <ul className="space-y-3 font-sans">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Quito, Pichincha — Ecuador</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Atención: Lun a Vie de 08:30 a 18:30</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:estefypallo13@gmail.com" className="hover:underline hover:text-white">
                  estefypallo13@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+593 99 022 1004</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line & confidential notes */}
        <div className="mt-12 pt-8 border-t border-[#424131] flex flex-col sm:flex-row items-center justify-between text-[10px] text-brand-400 text-center sm:text-left gap-4 font-sans">
          <p>
            &copy; {currentYear} Tlga. Johanna Pallo. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <span>Privacidad de Datos Garantizada</span>
            <span>•</span>
            <span>Quito - Ecuador</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
