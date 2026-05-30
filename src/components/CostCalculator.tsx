/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BudgetDetails } from "../types";
import { Calculator, DollarSign, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";

export default function CostCalculator() {
  const [service, setService] = useState<string>("general");
  const [complexity, setComplexity] = useState<"simple" | "medium" | "high">("simple");
  const [timeframe, setTimeframe] = useState<"standard" | "urgent">("standard");
  const [estimate, setEstimate] = useState<BudgetDetails>({
    serviceType: "general",
    complexity: "simple",
    timeframe: "standard",
    estimatedRange: "",
    whyThisRange: "",
  });

  useEffect(() => {
    // Pricing brackets based on the service category, complexity, and timeframe (USD)
    let minPrice = 0;
    let maxPrice = 0;
    let justification = "";

    switch (service) {
      case "legal": // Asesoría Legal / Documentos
        if (complexity === "simple") {
          minPrice = 60; maxPrice = 120;
          justification = "Revisión simple de contratos existentes, actas de acuerdos privados o redacción de convenios ordinarios.";
        } else if (complexity === "medium") {
          minPrice = 120; maxPrice = 250;
          justification = "Estructura intermedia que incluye minutas de transferencia, levantamientos notariales o convenios laborales personalizados.";
        } else {
          minPrice = 250; maxPrice = 500;
          justification = "Desarrollo complejo de contratos multi-parte, fideicomisos mercantiles o escrituración compleja.";
        }
        break;

      case "municipal": // Trámites Públicos / Patentes / Multas
        if (complexity === "simple") {
          minPrice = 80; maxPrice = 150;
          justification = "Descargos iniciales de multas leves de tránsito o de patentes de años ordinarios sin acumulación de deudas.";
        } else if (complexity === "medium") {
          minPrice = 150; maxPrice = 300;
          justification = "Solución de patentes acumuladas de hasta 3 años, recursos administrativos con impugnación en ventanilla municipal o catastros de predios.";
        } else {
          minPrice = 300; maxPrice = 600;
          justification = "Casos de acumulación de multas graves con riesgo coactivo, defensas municipales completas o regularización total de edificaciones.";
        }
        break;

      case "commercial": // Gestión Comercial / Constitución de Empresa
        if (complexity === "simple") {
          minPrice = 100; maxPrice = 220;
          justification = "Asesoría para obtención de RUC/RISE, patentes iniciales, permisos de funcionamiento para locales pequeños o registro de marcas.";
        } else if (complexity === "medium") {
          minPrice = 220; maxPrice = 450;
          justification = "Constitución ordinaria de Compañías Limitadas o S.A.S., registros sanitarios, marcas comerciales con oposición inicial de terceros.";
        } else {
          minPrice = 450; maxPrice = 900;
          justification = "Acompañamiento societario integral, fusiones, marcas internacionales o registro bajo normativas de control nacional.";
        }
        break;

      case "general": // Asesoría General / Oficios / Escritos
      default:
        if (complexity === "simple") {
          minPrice = 35; maxPrice = 75;
          justification = "Redacción técnica de solicitudes ordinarias, descargos generales de servicios públicos, cartas persuasivas o quejas.";
        } else if (complexity === "medium") {
          minPrice = 75; maxPrice = 150;
          justification = "Mediación directa e informes técnicos para justificar solicitudes administrativas críticas.";
        } else {
          minPrice = 150; maxPrice = 280;
          justification = "Expedientes completos para comparecencias públicas, quejas institucionales complejas de alto nivel o arbitraje.";
        }
        break;
    }

    // Urgent multiplier adds urgency cost offset due to focus reallocation and direct priority acceleration
    if (timeframe === "urgent") {
      const multiplier = complexity === "simple" ? 25 : complexity === "medium" ? 60 : 120;
      minPrice += multiplier;
      maxPrice += multiplier;
      justification += " Incluye tarifa premium de aceleración para atención prioritaria inmediata y entrega garantizada en plazos breves.";
    }

    setEstimate({
      serviceType: service,
      complexity,
      timeframe,
      estimatedRange: `$${minPrice} - $${maxPrice} USD`,
      whyThisRange: justification,
    });
  }, [service, complexity, timeframe]);

  return (
    <section id="precios" className="scroll-mt-24 py-20 bg-brand-50 border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Slogan headers */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-100 border border-brand-200 text-brand-800 rounded-full text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-brand-650" />
            <span>Simulador de Precios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-brand-950 leading-tight tracking-tight">
            Tarifas Claras y Transparentes, <br />
            <span className="text-brand-700 italic">Precalculadas Antes de Empezar</span>
          </h2>
          <p className="mt-4 text-brand-800 text-base">
            Pagas únicamente por lo que se requiere resolver. Sin sorpresas, cobros imprevistos ni tarifas de proceso infladas. Prueba nuestro simulador y obtén un estimado inmediato de tu inversión.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Parameters Block (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-brand-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              
              {/* Parameter 1: Service Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-800 mb-3 font-mono">
                  1. Seleccione la Categoría de Servicio
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "general", label: "Apoyo General / Oficios", desc: "Oficios, quejas, redacción administrativa básica" },
                    { id: "legal", label: "Asesoría Legal", desc: "Convenios, contratos, escrituración legal o civil" },
                    { id: "municipal", label: "Trámites Públicos / Patentes", desc: "Apelaciones municipales, multas de tránsito" },
                    { id: "commercial", label: "Constitución o Marcas", desc: "Creación de SAS, habilitación mercantil, RUC" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setService(item.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        service === item.id
                          ? "bg-brand-50/50 border-brand-500 ring-1 ring-brand-500 shadow-sm"
                          : "bg-white border-brand-100 hover:bg-brand-50/30 hover:border-brand-300"
                      }`}
                    >
                      <span className="text-xs font-bold text-brand-950 font-sans">{item.label}</span>
                      <span className="text-[11px] text-brand-700 mt-1 line-clamp-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 2: Complexity selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-800 mb-3 font-mono">
                  2. Estime el Grado de Complejidad de su Asunto
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "simple", label: "Simple", desc: "Unilateral, directo" },
                    { id: "medium", label: "Medio", desc: "Municipal / Entidades" },
                    { id: "high", label: "Complejo", desc: "Conflictos ordinarios" },
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setComplexity(level.id as any)}
                      className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center ${
                        complexity === level.id
                          ? "bg-brand-950 border-brand-950 text-brand-50 shadow-sm"
                          : "bg-white border-brand-200 text-brand-800 hover:border-brand-400"
                      }`}
                    >
                      <span className="text-xs font-bold uppercase font-mono">{level.label}</span>
                      <span className={`text-[9px] mt-0.5 ${complexity === level.id ? 'text-brand-200' : 'text-brand-650'}`}>
                        {level.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 3: Urgency / timeframe selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-800 mb-3 font-mono">
                  3. Plazo de Entrega e Intervención
                </label>
                <div className="flex space-x-3">
                  {[
                    { id: "standard", label: "Plazo Estándar (3 a 5 días laborables)", info: "Precio base ordinario óptimo" },
                    { id: "urgent", label: "¡Urgente! (Atención Inmediata / Fines de Semana)", info: "Prioridad número uno en agenda" },
                  ].map((time) => (
                    <button
                      key={time.id}
                      type="button"
                      onClick={() => setTimeframe(time.id as any)}
                      className={`flex-1 text-left p-3 rounded-lg border transition-all ${
                        timeframe === time.id
                          ? "bg-brand-50/50 border-brand-700 ring-1 ring-brand-700 shadow-sm"
                          : "bg-white border-brand-200 text-brand-800 hover:bg-brand-50/30 hover:border-brand-400"
                      }`}
                    >
                      <span className="text-xs font-bold text-brand-950 block">{time.label}</span>
                      <span className="text-[10px] text-brand-700 block mt-0.5">{time.info}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Note about terms */}
            <div className="mt-8 p-3 bg-brand-50/40 border border-brand-200 rounded-lg flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-brand-800 leading-relaxed">
                *Los costos presentados son estimados informativos referenciales para el mercado en Ecuador y no constituyen un contrato final. Se validarán en la consulta inicial de acuerdo al expediente físico de su caso.
              </p>
            </div>
          </div>

          {/* Results Display Panel (5 columns) */}
          <div className="lg:col-span-5 bg-brand-950 text-brand-50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Calculator className="w-48 h-48 text-white" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping"></span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-200 font-semibold">
                  Presupuesto Inmediato Estimado
                </span>
              </div>

              {/* Price Bracket */}
              <div className="space-y-1">
                <div className="text-[10px] text-brand-300 uppercase tracking-wider font-mono">Inversión Aproximada:</div>
                <div className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white flex items-center gap-1">
                  {estimate.estimatedRange}
                </div>
              </div>

              <hr className="border-brand-900" />

              {/* Justification Text */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-brand-300 font-semibold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 inline text-brand-300" />
                  ¿Qué incluye y justifica esta tarifa?
                </h4>
                <p className="text-xs text-brand-200 leading-relaxed font-sans">
                  {estimate.whyThisRange}
                </p>
              </div>

              {/* Commitment Guarantee box */}
              <div className="bg-brand-900/40 border border-brand-800 rounded-xl p-4 space-y-2">
                <h5 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-300" />
                  Compromiso de Trabajo Completo
                </h5>
                <ul className="space-y-1.5 text-[10px] text-brand-200 font-sans">
                  <li className="flex items-start gap-1">
                    <span className="text-brand-300 shrink-0">•</span>
                    <span>Análisis técnico y diagnóstico legal honesto de entrada</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-brand-300 shrink-0">•</span>
                    <span>Comunicación transparente paso a paso del estado de su trámite</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-brand-300 shrink-0">•</span>
                    <span>Modificaciones, reclamos y correcciones sin costo extra</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct consultation CTA */}
            <div className="mt-8 pt-4 border-t border-brand-900 relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="text-[11px] text-brand-300 font-mono">¿Listo para agendar?</span>
              <a
                href="#evaluador"
                className="px-5 py-3 rounded-lg text-xs font-semibold bg-brand-50 text-brand-950 hover:bg-white shadow-md transition-all text-center uppercase tracking-wider font-mono"
              >
                Agendar Consulta de Validación
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
