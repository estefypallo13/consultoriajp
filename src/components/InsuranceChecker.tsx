/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, ChangeEvent } from "react";
import { 
  ShieldCheck, ArrowRight, UserCheck, Smartphone, CheckCircle, 
  AlertCircle, HelpCircle, FileSpreadsheet, Calculator 
} from "lucide-react";

/**
 * Validates an Ecuadorian 10-digit Cédula
 */
function validateEcuadorianCedula(cedula: string): boolean {
  if (cedula.length !== 10) return false;
  if (!/^\d+$/.test(cedula)) return false;
  
  const province = parseInt(cedula.substring(0, 2), 10);
  if (province < 1 || (province > 24 && province !== 30)) return false;
  
  const thirdDigit = parseInt(cedula.charAt(2), 10);
  if (thirdDigit > 5) return false;
  
  // Coefficients
  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    let val = parseInt(cedula.charAt(i), 10) * coefficients[i];
    if (val >= 10) val -= 9;
    sum += val;
  }
  
  const checkDigit = parseInt(cedula.charAt(9), 10);
  const remainder = sum % 10;
  const computed = remainder === 0 ? 0 : 10 - remainder;
  
  return computed === checkDigit;
}

export default function InsuranceChecker() {
  const [activeTab, setActiveTab] = useState<"check" | "calculator">("check");
  
  // Form State
  const [fullName, setFullName] = useState("");
  const [cedula, setCedula] = useState("");
  const [phone, setPhone] = useState("");
  const [queryType, setQueryType] = useState("active_rights");
  const [cedulaError, setCedulaError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);

  // Voluntary Affiliation Calculator State
  const [declaredIncome, setDeclaredIncome] = useState(460); // Ecuadorian Basic Salary 2025/2026 is $460
  
  const handleCedulaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    if (rawVal.length <= 10) {
      setCedula(rawVal);
      if (rawVal.length === 10) {
        if (!validateEcuadorianCedula(rawVal)) {
          setCedulaError("La cédula ingresada parece inválida (revisa el número).");
        } else {
          setCedulaError("");
        }
      } else {
        setCedulaError("");
      }
    }
  };

  const executeDiagnostic = (e: FormEvent) => {
    e.preventDefault();
    if (cedula.length !== 10) {
      setCedulaError("Por favor ingresa una cédula completa de 10 dígitos.");
      return;
    }
    if (!fullName || !phone) {
      alert("Por favor completa tu nombre y celular.");
      return;
    }

    const isCedValid = validateEcuadorianCedula(cedula);
    
    // Create intelligent customized diagnosis according to query category
    let title = "";
    let alertMessage = "";
    let recommendations: string[] = [];
    let requirements: string[] = [];
    
    switch (queryType) {
      case "active_rights":
        title = "Verificación de Derechos Activos del Seguro de Salud";
        alertMessage = "El IESS requiere tener al menos 6 aportaciones mensuales consecutivas declaradas para acceder a cobertura general de salud, excepto en emergencias.";
        recommendations = [
          "Verificar si el empleador ha pagado a tiempo el último mes, ya que los retrasos suspenden citas u operaciones médicas.",
          "Si estás bajo el periodo de cesantía (desempleado), tu cobertura de salud se extiende por un máximo de 60 días tras la desafiliación."
        ];
        requirements = [
          "Cédula de Identidad vigente",
          "Clave patronal/personal de afiliado (para consulta en el portal oficial del IESS)",
          "Historial mecanizado de aportes anuales"
        ];
        break;
      case "voluntary":
        title = "Asesoría para Trámite de Afiliación Voluntaria";
        alertMessage = "Toda persona sin relación de dependencia laboral, residente en el país o en el exterior, puede afiliarse voluntariamente. La tasa de aporte es del 17.6% sobre tu ingreso declarado (mínimo un salario básico).";
        recommendations = [
          "Ideal para profesionales independientes, emprendedores y migrantes ecuatorianos que desean asegurar su salud y jubilación estable.",
          "Permite realizar aportaciones seguras y acceder a préstamos quirografarios tras acumular el mínimo de periodos exigidos."
        ];
        requirements = [
          "Cédula de identidad o pasaporte registrado",
          "No registrar mora patronal activa ni glosas pendientes en el IESS",
          "Cuenta bancaria nacional registrada y autorizada para el débito automático mensual"
        ];
        break;
      case "employer_failure":
        title = "Reclamación por Falta de Afiliación Patronal";
        alertMessage = "La afiliación al Seguro Social es obligatoria desde el PRIMER día de trabajo. La evasión constituye una infracción legal grave sancionada formalmente por el Ministerio del Trabajo y el IESS.";
        recommendations = [
          "Antes de interponer una denuncia formal presencial, es recomendable que Johanna evalúe tu contrato y mecanizado de aportes para plantear un reclamo administrativo persuasivo.",
          "Esto evita rupturas drásticas inmediatas y garantiza que reúnas las pruebas fehacientes de tu relación laboral."
        ];
        requirements = [
          "Contrato de trabajo escrito o pruebas de pago (transferencias, recibos, roles)",
          "Testimonios o correos institucionales de asignación de tareas",
          "Historial completo de aportes descargado de tu cuenta de asegurado"
        ];
        break;
      default:
        title = "Auditoría de Aportes, Glosas o Mora Patronal";
        alertMessage = "La mora patronal genera intereses diarios y bloquea de inmediato la atención de salud de tus colaboradores, exponiéndote a coactivas estatales.";
        recommendations = [
          "Johanna revisa tu estatus de deudas consolidadas y te asiste con convenios de purga de mora debidamente autorizados.",
          "Te asesora sobre la impugnación o apelación técnica de glosas emitidas erróneamente por fiscalizadores."
        ];
        requirements = [
          "RUC de la empresa o Cédula Patronal",
          "Clave de acceso al portal del empleador IESS",
          "Notificación de la glosa o resolución de coactiva"
        ];
        break;
    }

    setDiagnosticResult({
      title,
      alertMessage,
      recommendations,
      requirements,
      cedulaState: isCedValid ? "Válida estructuralmente" : "Por confirmar individualmente",
      isCedValid
    });
    setFormSubmitted(true);
  };

  const handleContactDirectly = () => {
    if (!diagnosticResult) return;
    
    const queryLabels: { [key: string]: string } = {
      active_rights: "Saber si estoy Asegurado / Activo en salud",
      voluntary: "Afiliación Voluntaria del IESS",
      employer_failure: "Falta de Afiliación Patronal",
      employer_debt: "Resolver Mora Patronal o Glosas"
    };

    const label = queryLabels[queryType] || "Consulta de Seguro IESS";
    const body = `Hola Tlga. Johanna Pallo,\n\nMi nombre es ${fullName}. He usado su herramienta de diagnóstico para verificar mi estatus de seguro.\n\nDatos ingresados:\n- Cédula de Identidad: ${cedula}\n- Tipo de Asesoría Requerida: ${label}\n- Celular: ${phone}\n\nPor favor, Johanna, ayúdeme a verificar mi estatus oficial del IESS y solventar mi situación. Estoy atento.`;
    
    const url = `https://wa.me/593990221004?text=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
  };

  // Calculations for voluntary affiliation
  let calculatedAporte = declaredIncome * 0.176;

  return (
    <section id="seguro-iess" className="scroll-mt-24 py-20 bg-gradient-to-b from-[#fafaf6] to-[#f5f5f0] border-b border-[#e9e8db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header segment of the Insurance area */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-100 border border-brand-200 text-brand-850 rounded-full text-xs font-semibold mb-4 font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
            <span>Asistencia de Seguro Social Ecuatoriano</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 tracking-tight leading-tight">
            ¿Necesitas saber si <span className="text-brand-700 italic">Estás Asegurado</span> o tienes deudas con el IESS?
          </h2>
          <p className="mt-3 text-sm text-[#54533e] max-w-2xl mx-auto leading-relaxed">
            Estar afiliado correctamente otorga tranquilidad médica y futuro pensional. Johanna te asiste personalmente a consultar tu mecanizado, regularizar deudas voluntarias o reclamar la falta de afiliación patronal de forma seria.
          </p>

          {/* Tab Selector buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => { setActiveTab("check"); setFormSubmitted(false); }}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all ${
                activeTab === "check"
                  ? "bg-[#29281d] text-white border-[#29281d] shadow-md"
                  : "bg-white text-stone-600 border-[#e9e8db] hover:bg-[#f5f5f0]"
              }`}
            >
              Consulta de Seguro y Estado IESS
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all ${
                activeTab === "calculator"
                  ? "bg-[#29281d] text-white border-[#29281d] shadow-md"
                  : "bg-white text-stone-600 border-[#e9e8db] hover:bg-[#f5f5f0]"
              }`}
            >
              Simulador de Aportes Voluntarios
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto bg-white border border-[#e9e8db] rounded-3xl p-6 sm:p-10 shadow-lg min-h-[440px] transition-all">
          
          {activeTab === "check" ? (
            <div>
              {!formSubmitted ? (
                <form onSubmit={executeDiagnostic} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left block - Info explanation (5 cols) */}
                  <div className="md:col-span-5 space-y-4">
                    <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-brand-800">
                      Evaluación Directa y Confidencial
                    </h3>
                    <p className="text-xs text-[#54533e] leading-relaxed">
                      Escribe tu Cédula de Identidad de Ecuador y Johanna te apoyará paso a paso. Para proteger tu absoluta privacidad, Johanna revisará personalmente tu historial de forma externa en el sistema gubernamental y te dará una respuesta fidedigna, sin exponer tus datos a terceros.
                    </p>
                    
                    <div className="p-4 bg-brand-50 border border-brand-250 rounded-xl space-y-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-brand-700 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 inline text-brand-600" />
                        Acompañamiento Técnico:
                      </span>
                      <ul className="text-[10px] text-[#29281d] space-y-1.5 list-disc pl-3">
                        <li>Control de cesantía o seguro de desempleo</li>
                        <li>Corrección de aportes traspasados</li>
                        <li>Gestión de afiliación voluntaria</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right block - Input areas (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-850 mb-1">
                        Tu Nombre Completo *
                      </label>
                      <input 
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. María Augusta Pérez"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#e9e8db] rounded-lg text-xs leading-none text-[#1c1c1a] focus:ring-1 focus:ring-brand-500 outline-none"
                      />
                    </div>

                    {/* Cecula and Celular row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-850 mb-1">
                          Cédula de Identidad (10 dígitos) *
                        </label>
                        <input 
                          type="text"
                          required
                          value={cedula}
                          onChange={handleCedulaChange}
                          placeholder="Ej. 1712345678"
                          className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-xs leading-none text-[#1c1c1a] focus:ring-1 focus:ring-brand-500 outline-none ${
                            cedulaError ? "border-rose-300 ring-1 ring-rose-300" : "border-[#e9e8db]"
                          }`}
                        />
                        {cedulaError && (
                          <span className="text-[10px] text-rose-600 mt-1 block leading-tight">
                            {cedulaError}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-850 mb-1">
                          Celular de Contacto *
                        </label>
                        <input 
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+593 9..."
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#e9e8db] rounded-lg text-xs leading-none text-[#1c1c1a] focus:ring-1 focus:ring-brand-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Query Type Dropdown */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-850 mb-1">
                        ¿Cuál es tu consulta o situación particular?
                      </label>
                      <select
                        value={queryType}
                        onChange={(e) => setQueryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#e9e8db] rounded-lg text-xs text-[#1c1c1a] focus:ring-1 focus:ring-brand-500 outline-none"
                      >
                        <option value="active_rights">¿Quiero saber si mi seguro de salud IESS está activo?</option>
                        <option value="voluntary">Quiero afiliarme de forma voluntaria y conocer las ventajas</option>
                        <option value="employer_failure">Mi empleador no me ha afiliado y quiero arreglarlo</option>
                        <option value="employer_debt">Tengo glosas patronales / mora que quiero regularizar</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 px-4 py-3 bg-[#29281d] hover:bg-[#424131] text-[#fafaf6] font-bold text-xs uppercase tracking-wider font-mono rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <span>Pre-Evaluar Estado del Seguro</span>
                      <ArrowRight className="w-4 h-4 text-[#bcba9c]" />
                    </button>

                  </div>
                </form>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Diagnosis Report Title */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e9e8db] pb-4">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#bcba9c] bg-[#29281d] px-2 py-0.5 rounded-md inline-block mb-1">
                        Pre-Análisis Generado de Afiliación
                      </span>
                      <h3 className="text-lg font-display font-bold text-stone-900 leading-snug">
                        {diagnosticResult?.title}
                      </h3>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#54533e]">
                        Cédula: <strong>{cedula}</strong>
                      </span>
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        diagnosticResult?.isCedValid ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-amber-50 text-amber-800 border border-amber-100"
                      }`}>
                        {diagnosticResult?.cedulaState}
                      </span>
                    </div>
                  </div>

                  {/* Warning Info Box */}
                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-amber-900 uppercase">Consideración Normativa Clave</h4>
                      <p className="text-[11px] text-[#54533e] leading-relaxed mt-0.5 font-light">
                        {diagnosticResult?.alertMessage}
                      </p>
                    </div>
                  </div>

                  {/* Detailed columns: Guide & requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Recommendations column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold text-brand-800 uppercase flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-brand-600 shrink-0" />
                        Orientación Inicial Recomendada
                      </h4>
                      <ul className="space-y-2 text-[11px] text-[#54533e] font-sans font-light">
                        {diagnosticResult?.recommendations.map((rec: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-brand-600 font-bold shrink-0">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold text-stone-900 uppercase flex items-center gap-1.5">
                        <FileSpreadsheet className="w-4 h-4 text-stone-600 shrink-0" />
                        Requisitos para la Consulta Oficial
                      </h4>
                      <ul className="space-y-2 text-[11px] text-[#54533e] font-sans font-light">
                        {diagnosticResult?.requirements.map((req: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-stone-500 font-mono shrink-0">✔</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Clear CTA to write to Johanna */}
                  <div className="mt-8 pt-5 border-t border-[#e9e8db] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[#6a694e] font-sans text-center sm:text-left">
                      ¿Deseas que Johanna verifique tus aportaciones de forma oficial en el sistema IESS y resuelva el problema administrativo?
                    </p>
                    <div className="flex gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 font-mono text-[11px] text-center uppercase tracking-wider hover:bg-stone-50"
                      >
                        Atrás
                      </button>
                      <button
                        onClick={handleContactDirectly}
                        className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-[11px] font-bold text-center uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Smartphone className="w-4 h-4 shrink-0" />
                        <span>Consultar con Johanna</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Header inside voluntary calculator */}
              <div className="flex items-center gap-3 border-b border-[#e9e8db] pb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-700">
                  <Calculator className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-stone-900">
                    Simulador Mensual de Aporte Voluntario - IESS Ecuador
                  </h3>
                  <p className="text-[11px] text-stone-500 font-mono">
                    Tasa aplicable estándar: <strong>17.6%</strong> sobre el salario declarado
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Inputs for wage declared (7 cols) */}
                <div className="md:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono font-bold text-brand-850">
                      <span>Ingreso Mensual Declarado (USD)</span>
                      <span className="text-brand-700 font-bold">${declaredIncome} USD</span>
                    </div>
                    
                    <input 
                      type="range"
                      min="460" // Unified basic wage in Ecuador 2025/2026 is $460
                      max="3000"
                      step="10"
                      value={declaredIncome}
                      onChange={(e) => setDeclaredIncome(parseInt(e.target.value, 10))}
                      className="w-full accent-brand-700 bg-stone-100 rounded-lg h-2 cursor-pointer"
                    />
                    
                    <div className="flex justify-between text-[10px] font-mono text-stone-500">
                      <span>Min: Salario Básico ($460)</span>
                      <span>Max: $3,000 USD</span>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 bg-brand-50 border border-[#e9e8db] rounded-2xl">
                    <h4 className="text-xs font-mono font-bold text-brand-850 uppercase">Ventajas de la Afiliación Voluntaria:</h4>
                    <ul className="text-[11px] text-[#54533e] space-y-1.5 list-disc pl-4 font-sans font-light leading-relaxed">
                      <li><strong>Cobertura Médica Total</strong> para ti, sin copagos ni exclusiones por pre-existencias.</li>
                      <li><strong>Derecho a Pensiones de Vejez</strong>, invalidez, incapacidad, montepío y auxilio de funerales.</li>
                      <li>Acceso inmediato a <strong>Préstamos Hipotecarios (BIESS)</strong> y Quirografarios con tasas preferenciales.</li>
                    </ul>
                  </div>
                </div>

                {/* Simulated quote output card (5 cols) */}
                <div className="md:col-span-5 bg-stone-900 text-[#fafaf6] rounded-2xl p-6 text-center space-y-5 shadow-inner">
                  <div className="space-y-1">
                    <span className="text-[10px] text-brand-300 font-mono uppercase tracking-wider block">Tu Aporte Mensual Estimado:</span>
                    <h3 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
                      ${calculatedAporte.toFixed(2)} <span className="text-sm font-sans">/ mes</span>
                    </h3>
                  </div>

                  <hr className="border-stone-800" />

                  <p className="text-[10px] text-stone-400 font-sans leading-relaxed">
                    *Tasa exacta estipulada por la ley del IESS (17.6%) calculada sobre un ingreso de ${declaredIncome} USD. Sanciones moratorias aplican después del día 15 de cada mes laborable.
                  </p>

                  <a
                    href="https://wa.me/593990221004?text=Hola%20Johanna,%20estoy%20interesado%20en%20realizar%20mi%20Afiliaci%C3%B3n%20Voluntaria%20IESS%20mensual%20declarando%20$${declaredIncome}%20USD.%20%C2%BFAy%C3%BAdeme%20con%20los%20requisitos%20formales?"
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-2.5 rounded-lg bg-white hover:bg-[#fafaf6] text-stone-900 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm transition"
                  >
                    Iniciar Trámite Voluntario
                  </a>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Informative footer statement */}
        <div className="mt-8 text-center max-w-xl mx-auto">
          <p className="text-[11px] text-[#6a694e] font-sans">
            "Saber si estás asegurado no tiene por qué ser un laberinto. Contáctame directamente y yo te asisto pormenorizadamente a validar tu estatus ante de que enfrentes una urgencia médica."
            <span className="block mt-1.5 font-mono text-brand-800 font-bold uppercase text-[10px]">- Tlga. Johanna Pallo</span>
          </p>
        </div>

      </div>
    </section>
  );
}
