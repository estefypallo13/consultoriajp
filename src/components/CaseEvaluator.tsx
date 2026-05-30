/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from "react";
import { CaseEvaluationRequest, CaseEvaluationResponse } from "../types";
import { 
  FileText, Sparkles, Send, CheckCircle2, ChevronRight, 
  RefreshCw, Phone, Mail, AlertTriangle, CheckSquare, Square
} from "lucide-react";

export default function CaseEvaluator() {
  const [formData, setFormData] = useState<CaseEvaluationRequest>({
    fullName: "",
    email: "",
    phone: "",
    problemDescription: "",
    urgencyLevel: "medium",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<number>(0);
  const [result, setResult] = useState<CaseEvaluationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({});

  const reassurancePhrases = [
    "Recibiendo datos de su consulta...",
    "Clasificando área de práctica profesional...",
    "Sintetizando antecedentes clave del caso...",
    "Generando listado personalizado de prerrequisitos...",
    "Preparando borrador de mensaje inmediato...",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const executeEvaluation = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.problemDescription) {
      setError("Por favor completa tu nombre y escribe tu caso detallado.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setProgressStep(0);

    // Simulate progress updates for a human-guided immersive feeling matching the backend execution
    const interval = setInterval(() => {
      setProgressStep((prev) => {
        if (prev < reassurancePhrases.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    try {
      const response = await fetch("/api/pre-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("No se pudo conectar con el motor de pre-evaluación.");
      }

      const data = await response.json();
      
      // Keep loading active slightly for transition consistency
      setTimeout(() => {
        clearInterval(interval);
        setResult(data);
        setLoading(false);
        // Reset checklist state
        const initialChecked: { [key: string]: boolean } = {};
        data.suggestedDocs.forEach((doc: string) => {
          initialChecked[doc] = false;
        });
        setCheckedDocs(initialChecked);
      }, 500);

    } catch (err: any) {
      clearInterval(interval);
      setLoading(false);
      setError(err.message || "Ocurrió un error inesperado al procesar la solicitud.");
    }
  };

  const handleToggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  const getBadgeStyle = (classification: string) => {
    switch (classification) {
      case "Asesoría Legal / Contractual":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Trámites Públicos y Municipales":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Gestión Comercial y Societaria":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      default:
        return "bg-stone-50 text-stone-800 border-stone-200";
    }
  };

  return (
    <section id="evaluador" className="scroll-mt-24 py-20 bg-gradient-to-b from-[#f5f5f0] to-[#fafaf6] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-200/20 blur-3xl animate-subtle-glow"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-200/50 border border-brand-300 text-brand-900 rounded-full text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" />
            <span>Sistema Exclusivo de Admisión</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#29281d] leading-tight tracking-tight">
            ¿No sabes por dónde empezar? <br />
            <span className="text-brand-700 italic">Pre-Evalúa tu Caso Aquí con IA</span>
          </h2>
          <p className="mt-4 text-[#54533e] text-base leading-relaxed">
            Describe brevemente lo que necesitas resolver (un contrato, una multa, un trámite corporativo, etc.). 
            Nuestro motor inteligente analizará tu situación al instante, estimará la clasificación técnica y te dirá exactamente qué documentos ir reuniendo para tu caso.
          </p>
        </div>

        {/* Outer Form and Results Container Card */}
        <div className="bg-[#fafaf6] rounded-2xl border border-[#e9e8db] shadow-xl overflow-hidden min-h-[420px] transition-all">
          
          {/* Active loading flow */}
          {loading && (
            <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center space-y-6 min-h-[420px]">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-brand-200 border-t-brand-700 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-brand-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-display font-medium text-brand-900">
                  Procesando Pre-Evaluación Inteligente
                </h3>
                <p className="text-sm font-mono text-brand-600 animate-pulse h-4">
                  {reassurancePhrases[progressStep]}
                </p>
              </div>
              <div className="w-full max-w-xs bg-brand-100 rounded-full h-1">
                <div 
                  className="bg-brand-700 h-1 rounded-full transition-all duration-1000" 
                  style={{ width: `${((progressStep + 1) / reassurancePhrases.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Prompt Entry screen (If no result loaded yet and not loading) */}
          {!loading && !result && (
            <form onSubmit={executeEvaluation} className="p-6 sm:p-10 space-y-6">
              
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-sm text-red-800 flex items-start gap-2 animate-fadeIn">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>{error}</div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-[#54533e] mb-1.5 font-mono">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ej. Roberto Andrade"
                    className="w-full px-4 py-3 bg-[#fafaf6] border border-[#e9e8db] rounded-lg text-sm text-[#1c1c1a] focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#54533e] mb-1.5 font-mono">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-4 py-3 bg-[#fafaf6] border border-[#e9e8db] rounded-lg text-sm text-[#1c1c1a] focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#54533e] mb-1.5 font-mono">
                    Teléfono Celular
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. +593 98 765 4321"
                    className="w-full px-4 py-3 bg-[#fafaf6] border border-[#e9e8db] rounded-lg text-sm text-[#1c1c1a] focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="problemDescription" className="block text-xs font-bold uppercase tracking-wider text-[#54533e] font-mono">
                    Describe tu Caso, Trámite o Inquietud
                  </label>
                  <span className="text-[10px] text-brand-600 font-mono">
                    {formData.problemDescription.length} caracteres
                  </span>
                </div>
                <textarea
                  id="problemDescription"
                  name="problemDescription"
                  required
                  rows={4}
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  placeholder="Por favor, describe detalladamente tu situación. Por ejemplo: 'Me notificaron una multa comercial del municipio por supuesto incumplimiento de patente laboral, el plazo vence el próximo viernes y necesito redactar un recurso de queja o saber cómo anularla...'"
                  className="w-full px-4 py-3 bg-[#fafaf6] border border-[#e9e8db] rounded-lg text-sm text-[#1c1c1a] focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none resize-none leading-relaxed"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-[#54533e]">Urgencia:</span>
                  <div className="flex space-x-1.5">
                    {["low", "medium", "high"].map((level) => (
                      <button
                        type="button"
                        key={level}
                        onClick={() => setFormData((prev) => ({ ...prev, urgencyLevel: level as any }))}
                        className={`px-3 py-1 rounded text-xs font-semibold capitalize border transition-all ${
                          formData.urgencyLevel === level
                            ? "bg-[#29281d] text-white border-[#29281d]"
                            : "bg-[#f5f5f0] text-stone-600 border-[#e9e8db] hover:bg-[#e9e8db]"
                        }`}
                      >
                        {level === "low" ? "Baja" : level === "medium" ? "Normal" : "Urgente 🔥"}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-900 hover:bg-brand-950 text-white font-medium rounded-lg text-sm flex items-center justify-center space-x-2 shadow-md transition-all hover:scale-[1.01] transform"
                >
                  <Sparkles className="w-4 h-4 text-brand-300" />
                  <span>Obtener Pre-Diagnóstico Gratuito</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Results screen (Once diagnostic is ready) */}
          {!loading && result && (
            <div className="divide-y divide-[#e9e8db] animate-fadeIn">
              
              {/* Heading section */}
              <div className="p-6 sm:p-8 bg-[#fafaf6]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-700 bg-brand-100 px-2 py-1 rounded">
                    Resultados de Análisis IA
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-stone-500">Confianza del motor:</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded">
                      {result.confidence}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold ${getBadgeStyle(result.classification)}`}>
                    Clasificación: {result.classification}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-brand-950 mt-1">
                    Su Pre-Diagnóstico Técnico Inicial
                  </h3>
                  <p className="text-sm text-[#54533e] italic leading-relaxed pt-1 bg-[#fafaf6] border-l-2 border-brand-500 pl-4">
                    "{result.summary}"
                  </p>
                </div>
              </div>

              {/* Dynamic checklist for suggested documentation */}
              <div className="p-6 sm:p-8 bg-[#fdfdfb]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 mb-4 font-mono flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>1. Reúna los Siguientes Documentos Requeridos</span>
                </h4>
                <p className="text-xs text-stone-500 mb-4 font-sans">
                  Su caso requiere que prepare la siguiente documentación base. Marque las casillas para llevar control de lo que ya tiene listo:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.suggestedDocs.map((doc, idx) => {
                    const isChecked = !!checkedDocs[doc];
                    return (
                      <div 
                        key={idx}
                        onClick={() => handleToggleDoc(doc)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center space-x-3 transition-colors ${
                          isChecked 
                            ? "bg-brand-50 border-brand-300 text-brand-900" 
                            : "bg-[#fafaf6] hover:bg-[#faf9f1] border-[#e9e8db] text-stone-700"
                        }`}
                      >
                        <button type="button" className="shrink-0 text-brand-700">
                          {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-stone-400" />}
                        </button>
                        <span className={isChecked ? "line-through text-stone-400 font-medium" : "font-sans font-medium"}>
                          {doc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guidance Recommendations */}
              <div className="p-6 sm:p-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 mb-3 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>2. Recomendaciones de Acción Inmediata</span>
                </h4>
                <ul className="space-y-2.5">
                  {result.initialGuidance.map((instruction, idx) => (
                    <li key={idx} className="text-xs text-[#54533e] flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-[10px] font-bold text-brand-800 shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-sans">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons with drafts ready to click */}
              <div className="p-6 sm:p-8 bg-[#f5f5f0] flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-sm font-display font-medium text-brand-950 mb-1">
                    ¿Deseas formalizar tu consulta con la Tlga. Johanna Pallo?
                  </h4>
                  <p className="text-xs text-[#6a694e]">
                    Aquí tienes dos vías directas listas. Elige tu canal preferido para enviarle tu diagnóstico de forma inmediata:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  {/* WhatsApp Contact Link */}
                  <a
                    href={`https://api.whatsapp.com/send?phone=593990221004&text=${encodeURIComponent(result.whatsappDraft)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all text-center uppercase tracking-wider font-mono hover:scale-[1.01]"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Enviar por WhatsApp</span>
                  </a>

                  {/* Mailto Contact Link */}
                  <a
                    href={`mailto:estefypallo13@gmail.com?subject=Pre-Evaluacion%20Caso%20-%20Johanna%20Pallo&body=${encodeURIComponent(result.emailDraft)}`}
                    className="px-5 py-3 rounded-lg text-xs font-semibold bg-[#29281d] hover:bg-[#424131] text-[#fafaf6] flex items-center justify-center gap-2 shadow-sm transition-all text-center uppercase tracking-wider font-mono hover:scale-[1.01]"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>Enviar por Correo</span>
                  </a>
                </div>
              </div>

              {/* Footnote trigger to redo */}
              <div className="p-4 bg-white text-center">
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="text-xs text-brand-700 font-semibold hover:text-brand-900 inline-flex items-center gap-1.5 transition-all outline-none font-mono tracking-tight"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Realizar otro pre-diagnóstico</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
