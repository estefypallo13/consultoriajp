/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MessageSquare, Quote, Star, User } from "lucide-react";

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const testimonials = [
    {
      id: "1",
      quote: "Tenía un problema administrativo que llevaba meses sin resolver porque no sabía ni por dónde empezar. Johanna lo escuchó, me explicó todo con paciencia y en menos de tres semanas el asunto estaba cerrado. Por primera vez sentí que alguien realmente trabajó para mí.",
      author: "Carlos M.",
      role: "Empresario Independiente",
      segment: "business",
      initials: "CM"
    },
    {
      id: "2",
      quote: "Necesitaba asesoría para revisar unos documentos importantes antes de firmar. Johanna no solo los revisó, sino que me explicó punto por punto qué implicaba cada cláusula. Me evitó problemas que yo ni imaginaba. La recomiendo sin dudarlo.",
      author: "Mariana T.",
      role: "Profesional Independiente",
      segment: "personal",
      initials: "MT"
    },
    {
      id: "3",
      quote: "Llegué a Johanna completamente perdida, con un trámite urgente y sin idea de qué hacer. En la primera consulta me dio más claridad de la que había conseguido en semanas buscando sola. Trabajó rápido, me mantuvo informada y el resultado fue exactamente lo que necesitaba.",
      author: "Fernanda R.",
      role: "Madre de Familia",
      segment: "personal",
      initials: "FR"
    },
    {
      id: "4",
      quote: "Lo que más me sorprendió fue la comunicación. Nunca me dejó sin respuesta. Siempre supe qué estaba pasando con mi caso. Eso, en sí el proceso de consultoría tradicional, ya vale por completo el costo de la consulta.",
      author: "Roberto A.",
      role: "Comerciante",
      segment: "business",
      initials: "RA"
    },
    {
      id: "5",
      quote: "Johanna tiene algo que escasea de verdad: hace exactamente lo que dice que va a hacer. Sin rodeos, sin excusas ni demoras injustificadas ni sorpresas. En mi caso resolvió algo que otro profesional había dejado incompleto por meses.",
      author: "Lucía P.",
      role: "Docente",
      segment: "personal",
      initials: "LP"
    }
  ];

  const filteredTestimonials = activeTab === "all" 
    ? testimonials 
    : testimonials.filter(t => t.segment === activeTab);

  return (
    <section id="testimonios" className="py-20 bg-brand-50 border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header block with statistics / badges */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-100 border border-brand-200 text-brand-800 rounded-full text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-brand-650" />
            <span>Casos de Éxito Reales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-brand-950 leading-tight tracking-tight">
            Nuestros clientes cosechan <br />
            <span className="text-brand-700 italic">Resultados Reales</span>
          </h2>
          <p className="mt-3 text-sm text-brand-800 font-sans">
            La reputación comercial y civil de Johanna se ha cimentado sobre la base de comprometerse con las soluciones. Esto es lo que expresan quienes ya confiaron en sus gestiones estratégicas:
          </p>

          {/* Filtration tabs list */}
          <div className="flex justify-center mt-8 space-x-2">
            {[
              { id: "all", label: "Todos los testimonios" },
              { id: "business", label: "Comerciantes y Negocios" },
              { id: "personal", label: "Casos Particulares y Familia" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-950 text-white border-brand-950 shadow-sm"
                    : "bg-white text-brand-800 border-brand-200 hover:bg-brand-50/50 hover:border-brand-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Masonry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
          {filteredTestimonials.map((t) => (
            <div 
              key={t.id}
              className="bg-white border border-brand-200 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:bg-brand-50/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* 5 Stars Rating Bar */}
                <div className="flex text-amber-500 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>
                
                {/* Double quotes decorations & Quotation block */}
                <div className="relative">
                  <Quote className="absolute -top-3 -left-3 w-8 h-8 text-brand-100 group-hover:text-brand-200 transition-colors shrink-0 pointer-events-none" />
                  <p className="text-xs text-brand-900 leading-relaxed relative z-10 font-sans italic pt-2 pl-2">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              {/* Author signature section */}
              <div className="flex items-center space-x-3.5 mt-6 pt-4 border-t border-brand-150">
                <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center font-mono text-xs font-bold text-brand-800">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs font-display font-bold text-brand-950">
                    {t.author}
                  </h4>
                  <p className="text-[10px] text-brand-600 font-mono">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
