/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo sé si Johanna puede ayudarme con mi caso específico?",
      answer: "La mejor forma de saberlo es contactarla directamente o utilizar nuestro pre-evaluador de IA disponible arriba. Johanna evalúa cada problema con absoluta honestidad. Si puede ayudarte, te presentará planes de acción claros de inmediato; si tu caso excede sus áreas, te lo dirá con la misma franqueza para proteger tu tiempo."
    },
    {
      question: "¿Puedo agendar una consulta sin compromiso de contratar el servicio completo?",
      answer: "Sí, por supuesto. La consulta inicial existe precisamente para que puedas plantear tu caso, conocer tu verdadera situación técnica y comprender cuáles opciones tienes a tu disposición. No hay ningún tipo de presión comercial ni compromiso implícito para transacciones futuras."
    },
    {
      question: "¿Los precios se acuerdan antes de comenzar?",
      answer: "Siempre. Trabajamos de forma estrictamente seria. No iniciamos ninguna gestión, trámite o redacción hasta que el alcance del servicio, los plazos correspondientes y el valor de la inversión final estén por escrito y acordados de forma bilateral."
    },
    {
      question: "¿Puedo contactarla durante el proceso si tengo preguntas?",
      answer: "Sí. La comunicación fluida representa gran parte del valor del servicio. No trabajamos en la sombra esperando a que el cliente se desespere. Johanna te mantendrá actualizado de las diligencias importantes y permanece al alcance de su teléfono para resolver tus inquietudes."
    },
    {
      question: "¿Cómo funciona el servicio de comprobación de seguro IESS y regularización?",
      answer: "Por la reserva e intimidad de los datos personales de afiliación (cédula y claves), Johanna realiza la consulta de manera totalmente controlada y confidencial. Si detectamos anomalías (como falta de aportes patronales, mora que suspenda la atención de salud o glosas erróneas), Johanna redacta y tramita las impugnaciones, solicitudes de convenios de purga de mora, o gestiona tu afiliación voluntaria correctamente."
    },
    {
      question: "¿Qué pasa si mi caso resulta más complejo de lo previsto originalmente?",
      answer: "Se sienta a conversar con absoluta transparencia. Si durante la ejecución surgen imprevistos o requerimientos de institutos públicos que modifican el alcance original, Johanna te presentará la situación honestamente y se buscará una alternativa justa. Sin sorpresas unilaterales."
    },
    {
      question: "¿Trabaja de forma presencial o también remota?",
      answer: "Según la naturaleza del trámite y tu ubicación geográfica en Ecuador, los servicios pueden brindarse de forma 100% presencial, remota por videoconferencias, o mediante un modelo híbrido. Nos adaptamos por completo para facilitarte la entrega y revisión de documentos."
    },
    {
      question: "¿Qué tipo de servicios profesionales ofrece exactamente?",
      answer: "Los servicios son polifacéticos y altamente adaptativos, cubriendo asesorías de patentes y marcas, regularización de multas administrativas y de tránsito, redacción técnica de oficios, minutas de compraventa de bienes, contratos comerciales de trabajo, y tramitología municipal. Consúltanos para validar tu caso."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faqs" className="scroll-mt-24 py-20 bg-brand-50 border-b border-brand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title container */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-100 border border-brand-200 text-brand-800 rounded-full text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-brand-650" />
            <span>Resolviendo Dudas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-brand-950 leading-tight tracking-tight">
            Consultas Frecuentes <br />
            <span className="text-brand-700 italic">Respuestas Claras</span>
          </h2>
          <p className="mt-3 text-sm text-brand-800 font-sans">
            Comprender el modelo de trabajo disminuye la incertidumbre de contratar. Repasa las inquietudes habituales de quienes nos eligen:
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-xl transition-all ${
                  isOpen 
                    ? "bg-white border-brand-300 shadow-sm" 
                    : "bg-white/50 border-brand-200 hover:border-brand-350"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 outline-none select-none shrink-0"
                >
                  <h3 className="text-xs sm:text-sm font-display font-semibold text-brand-950">
                    {faq.question}
                  </h3>
                  <span className="text-brand-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                
                {/* Collapsible pane */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-brand-800 leading-relaxed border-t border-brand-100 font-sans animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Slogan footnote */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-brand-200 shadow-sm">
          <p className="text-xs text-brand-850 font-sans">
            ¿Tienes otra inquietud que no figura en este listado? No te preocupes. Escríbela al contactarnos; responderla es parte de la consulta gratuita.
          </p>
        </div>

      </div>
    </section>
  );
}
