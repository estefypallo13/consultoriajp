/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import Header from "./components/Header";
import CaseEvaluator from "./components/CaseEvaluator";
import InsuranceChecker from "./components/InsuranceChecker";
import BenefitGrid from "./components/BenefitGrid";
import CostCalculator from "./components/CostCalculator";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Reference the generated premium photo asset as a static string path to bypass PNG type declarations
const heroOffice = "/src/assets/images/johanna_consulting_hero_1780104662227.png";

import { 
  Briefcase, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, 
  ChevronRight, ArrowRight, XCircle, Award, Compass, Heart, AlertCircle, Clock
} from "lucide-react";

export default function App() {
  // Navigation callback or anchor helper
  const handleScrollToEvaluator = () => {
    document.getElementById("evaluador")?.scrollIntoView({ behavior: "smooth" });
  };

  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Asesoría General",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Create draft mailto trigger
      const body = `Hola Tlga. Johanna Pallo, mi nombre es ${contactForm.name}.\n\nMe pongo en contacto para tratar el siguiente tema: ${contactForm.subject}.\nDetalles:\n${contactForm.notes}\n\nMóvil: ${contactForm.phone}\nCorreo: ${contactForm.email}`;
      window.location.href = `mailto:estefypallo13@gmail.com?subject=Solicitud de Consulta - ${encodeURIComponent(contactForm.name)}&body=${encodeURIComponent(body)}`;
    }, 400);
  };

  return (
    <div className="bg-brand-50 min-h-screen text-brand-950 antialiased selection:bg-brand-200 selection:text-brand-950">
      
      {/* Top Header Navigation Panel */}
      <Header />

      {/* 1. HERO SECTION (Headline & Subheadline) */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-brand-200 bg-gradient-to-b from-brand-50 via-brand-50 to-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Selling Copy Block (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-100 border border-brand-200 text-brand-800 rounded-full text-xs font-semibold font-mono uppercase tracking-wider">
              <span>Servicios Profesionales de Confianza</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-brand-950 tracking-tight leading-tight">
              ¿Cansado de buscar ayuda profesional y no encontrar a alguien que <span className="text-brand-700 italic">realmente resuelva</span> tu problema?
            </h1>
            
            <p className="text-sm uppercase tracking-widest font-mono text-brand-800 font-bold">
              Johanna Pallo lo hace. Con conocimiento, responsabilidad y resultados que puedes ver de inmediato.
            </p>

            <p className="text-base text-brand-800 leading-relaxed font-sans font-light">
              Olvídate de las promesas vacías, los trámites eternos y los profesionales que no te explican nada. Aquí encontrarás atención personalizada, orientación clara y el acompañamiento constante que mereces para resolver lo que necesitas — sea lo que sea.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleScrollToEvaluator}
                className="px-6 py-4 rounded-lg bg-brand-950 hover:bg-brand-900 text-white font-medium text-xs uppercase tracking-wider font-mono shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Pre-evaluar mi caso gratis</span>
                <ArrowRight className="w-4 h-4 text-brand-300" />
              </button>
              <a 
                href="#soluciones"
                className="px-6 py-4 rounded-lg border border-brand-300 hover:bg-white text-brand-800 font-medium text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Ver Áreas de Práctica</span>
              </a>
            </div>
          </div>

          {/* Graphical/Creative Presentation Panel (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-300/30 to-brand-100/10 rounded-2xl filter blur-xl -z-10 animate-subtle-glow"></div>
            
            {/* Visual card box */}
            <div className="bg-white border border-brand-200 rounded-2xl shadow-xl p-4 md:p-6 space-y-6 relative overflow-hidden">
              <img 
                src={heroOffice} 
                alt="Despacho Profesional de Johanna Pallo"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover rounded-xl border border-brand-100"
              />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] bg-brand-100 text-brand-800 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                    Sede Oficial
                  </span>
                  <span className="text-[10px] text-[#4d665a] font-mono">Quito, Pichincha</span>
                </div>
                
                <blockquote className="text-xs text-brand-800 italic leading-relaxed font-sans border-l-2 border-brand-400 pl-3">
                  "Entiendo que cuando alguien llega a pedir ayuda profesional, viene cargando algo que le pesa de verdad. Eso merece un trato digno y resultados reales."
                </blockquote>
                
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-brand-800 border-t border-brand-100">
                  <span>Tlga. Johanna Pallo</span>
                  <span className="font-sans font-semibold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-ping"></span>
                    Caso activo garantizado
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. AGITATION - THE PROBLEM */}
      <section className="py-20 bg-brand-100/50 border-b border-brand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-700 font-mono block mb-2">Análisis de la Realidad</span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-brand-950 tracking-tight leading-snug">
              Seamos honestos por un momento sobre los trámites e intermediarios...
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Red Card: The Agitating Questions */}
            <div className="p-6 sm:p-8 bg-rose-50/70 rounded-2xl border border-rose-150 space-y-4 shadow-sm">
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-rose-800 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>¿Le suenan familiares estas trabas?</span>
              </h3>
              
              <ul className="space-y-4 text-xs text-rose-950 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span><strong>¿Cuántas veces</strong> has necesitado asesoría profesional y has terminado saliendo más confundido de lo que empezaste en la ventanilla pública?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span><strong>¿Cuántas veces</strong> has pagado tarifas elevadas y al finalizar sentiste que gastaste tu dinero para conseguir respuestas nulas?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span><strong>¿Cuántas veces</strong> te prometieron "no te preocupes, yo me encargo" y tuviste que estar encima llamando constantemente de todos modos?</span>
                </li>
              </ul>
            </div>

            {/* Bronze Card: Consequences */}
            <div className="p-6 sm:p-8 bg-brand-100 rounded-2xl border border-brand-200 space-y-4 shadow-sm">
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-brand-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-brand-500" />
                <span>El costo real de una mala asesoría</span>
              </h3>
              
              <p className="text-xs text-brand-950 leading-relaxed">
                Conseguir un profesional serio en quien confiar, que te explique de forma humilde y transparente cada paso, es casi un verdadero milagro administrativo hoy en día. Eso se traduce en:
              </p>

              <div className="grid grid-cols-2 gap-3 text-[11px] text-brand-900 font-sans font-medium">
                <div className="p-2 bg-white/80 rounded border border-brand-200">⏳ Tiempo valioso perdido</div>
                <div className="p-2 bg-white/80 rounded border border-brand-200">💰 Dinero derrochado</div>
                <div className="p-2 bg-white/80 rounded border border-brand-200">🤯 Estrés y ansiedad coactiva</div>
                <div className="p-2 bg-white/80 rounded border border-brand-200">🙈 Decisiones a ciegas sin amparo</div>
              </div>

              <p className="text-[11px] text-brand-700 italic font-mono">
                No es tu culpa. El problema es que abundan asesores que priorizan el cobro. Pero existe una salida definitiva.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EMOTIONAL STORY - JOHANNA'S COMMITMENT */}
      <section className="py-20 bg-brand-50 border-b border-brand-200 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Timeline side profile info (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-brand-200 rounded-2xl p-6 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-brand-100 border-2 border-brand-300 mx-auto flex items-center justify-center">
              <span className="font-display font-bold text-brand-950 text-xl">JP</span>
            </div>
            <div>
              <h3 className="text-sm font-display font-medium text-brand-950">Tlga. Johanna Pallo</h3>
              <p className="text-[10px] text-brand-700 font-mono font-bold uppercase tracking-wider mt-0.5">Asesoría de Gestión & Trámites</p>
            </div>
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-100 text-[11px] text-brand-800 font-sans">
              "Mi reputación profesional se resume en un concepto simple: hacer el trabajo bien hecho de entrada."
            </div>
          </div>

          {/* Copy segment narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-700 font-mono block">Su Historia Detrás de la Marca</span>
            <h2 className="text-3xl font-display font-medium text-brand-950 leading-tight tracking-tight">
              Un enfoque profesional ético nacido de la empatía real
            </h2>
            
            <p className="text-xs text-brand-800 leading-relaxed font-sans font-light">
              Johanna Pallo sabe perfectamente cómo se siente eso. Antes de convertirse en la profesional independiente de renombre que es hoy, observó de cerca cómo personas queridas pasaban por tragos amargos debido a trámites públicos mal hechos, patentes vencidas y contratos mal supervisados, perdiendo tranquilidad y capital.
            </p>
            <p className="text-xs text-brand-800 leading-relaxed font-sans font-light">
              Esa profunda frustración la impulsó a formarse con rigurosidad técnica, a desarrollar un protocolo de consultoría que coloca al ser humano en el centro y a brindar un blindaje contra el desorden burocrático sobre una sola promesa inviolable: <strong>hacer el trabajo bien hecho.</strong>
            </p>
            <p className="text-xs text-brand-800 leading-relaxed font-sans font-light">
              No porque sea un eslogan publicitario, sino porque asume el compromiso de que cuando alguien acude pidiendo acompañamiento, carga con un asunto urgente que le roba el sueño. Un problema que no sabe cómo resolver, una decisión que no puede tomar a oscuras. Eso merece respeto reverencial y atención incansable.
            </p>

            <div className="flex items-center gap-6 pt-2 text-[11px] font-mono font-medium text-brand-800 border-t border-brand-200">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-500" /> Honradez Absoluta
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-brand-500" /> Soluciones Prácticas
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-brand-500" /> Trato Humano
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SOLUTION PRESENTATION & CORE AREAS */}
      <section id="soluciones" className="scroll-mt-24 py-20 bg-brand-50/60 border-b border-brand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-700 font-mono block mb-2">Presentación de la Solución</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-brand-950 leading-tight tracking-tight">
              Despacho de Servicios Profesionales de la Tlga. Johanna Pallo
            </h2>
            <p className="mt-3 text-sm text-brand-800 max-w-2xl mx-auto leading-relaxed">
              Una propuesta táctica diseñada formalmente para personas y empresas que exigen resultados expeditos, orientación técnica transparente y la invalorable certeza de tener de su lado a un profesional competente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Asesoría Legal / Contractual",
                desc: "Revisión técnica de contratos mercantiles, escrituraciones notariales ordinarias, minutas de compraventa de vehículos e inmuebles, actas de mediación formal o poderes especiales.",
                status: "Disponible"
              },
              {
                title: "Trámites Públicos / Municipales",
                desc: "Análisis y redacción de reclamos de multas coactivas, regularización de mora tributaria de Patente Pública, renovación de permisos del Cuerpo de Bomberos y trámites prediales de catastro.",
                status: "Disponible"
              },
              {
                title: "Gestión Comercial / Societaria",
                desc: "Inscripción inicial en el RUC, regularización corporativa de compañías SAS, procesos ante la Superintendencia de Compañías, tasas de patentes comerciales rústicas y registro de marca local.",
                status: "Módulos Activos"
              },
              {
                title: "Validación de Seguro / IESS",
                desc: "Asistencia para consulta oficial de derechos de salud, cálculo de aportes voluntarios, reclamos por mora o falta de afiliación patronal, deudas, glosas patronales y jubilaciones.",
                status: "¡Nuevo Servicio!"
              },
              {
                title: "Asesoría General / Administrative",
                desc: "Asistencia para comparecencias públicas, revisión de oficios y reclamos dirigidos a empresas de servicios básicos (CNEL, Agua, CNT), defensa al consumidor ordinaria y escritos varios.",
                status: "Asistencia Inmediata"
              }
            ].map((sol, idx) => (
              <div 
                key={idx}
                className="bg-white border border-brand-200 hover:border-brand-400 hover:bg-brand-50/70 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="space-y-4">
                  <span className="font-mono text-xs font-bold text-brand-650 block" id={`area_badge_${idx}`}>Área #0{idx+1}</span>
                  <h3 className="text-sm font-display font-bold text-brand-950 group-hover:text-brand-650 transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-[11px] text-brand-800 leading-relaxed pt-1 font-sans">
                    {sol.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-3 border-t border-brand-200 flex justify-between items-center">
                  <span className="text-[9px] font-mono tracking-wider font-semibold uppercase text-brand-800 bg-brand-100 px-2 py-0.5 rounded">
                    {sol.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-brand-400 group-hover:text-brand-700 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS GRID COMPONENT */}
      <BenefitGrid />

      {/* 6. CHARACTERISTICS & PILLARS OF OPERATION */}
      <section className="py-20 bg-white border-b border-[#e9e8db]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#858362] font-mono block">Rigurosidad Operativa</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-stone-900 tracking-tight leading-snug">
                ¿Qué incluye de base trabajar junto a Johanna?
              </h2>
            </div>
            <p className="text-xs text-[#54533e] max-w-sm">
              Cada gestión o expediente que se procesa en el despacho incorpora una serie de validaciones diseñadas para asegurar la viabilidad técnica antes del inicio de acciones públicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { id: "01", title: "Evaluación exhaustiva inicial", text: "Antes de emitir opiniones o presupuestos apresurados, Johanna analiza pormenorizadamente los antecedentes de su notificación, identificando el nudo administrativo real." },
              { id: "02", title: "Diagnóstico técnico honesto", text: "Sin rodeos molestos ni tecnicismos confusos. Se le notifica de forma cruda si su caso tiene viabilidad real o si existen riesgos, planteando siempre la alternativa de amparo más sensata." },
              { id: "03", title: "Diseño de un plan de acción concreto", text: "Establecemos un mapa de ruta transparente con entregas tangibles: qué recursos se interpondrán, en qué instituciones y en qué periodo exacto de tiempo." },
              { id: "04", title: "Ejecución profesional estricta", text: "Presentación presencial en notarías, ministerios, municipios o delegaciones bajo riguroso orden legal y documentando formalmente cada resolución." },
              { id: "05", title: "Permanente canal de comunicación", text: "No desaparecemos después de recibir el pago de honorarios primarios. Gozará de reportes constantes sobre la tramitología y respuestas rápidas." },
              { id: "06", title: "Resultados tangibles y auditables", text: "Toda comparecencia concluye de forma formal con un descargo sellado, una patente aprobada con su respectivo título físico, o un contrato notarizado." }
            ].map((char) => (
              <div 
                key={char.id}
                className="p-5 rounded-xl border border-[#e9e8db] hover:bg-[#fafaf6] transition-colors flex gap-4"
              >
                <span className="font-mono text-brand-600 font-bold text-sm tracking-wider">{char.id}.</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-display font-bold text-stone-950">{char.title}</h4>
                  <p className="text-[11px] text-[#54533e] leading-relaxed font-sans">{char.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS / METHODOLOGY TIMELINE */}
      <section id="como-funciona" className="scroll-mt-24 py-20 bg-[#fafaf6] border-b border-[#e9e8db]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-700 font-mono block">Paso a Paso Directo</span>
            <h2 className="text-3xl font-display font-medium text-[#29281d] leading-tight tracking-tight">
              Un proceso simple que entrega resultados sólidos
            </h2>
            <p className="mt-3 text-xs text-[#54533e]">
              Olvídate de la burocracia inaccesible. Sigue estos 5 sencillos pasos para formalizar e iniciar la resolución de tu trámite:
            </p>
          </div>

          <div className="relative border-l border-[#pd-[#bdbba5] border-[#pd border-brand-300 ml-4 md:ml-12 pl-6 md:pl-10 space-y-12">
            {[
              {
                step: "01",
                title: "Contáctame y describe tu situación general",
                desc: "Interpón un mensaje rápido mediante el pre-evaluador de IA, llámanos o envíanos un correo describiendo tu nudo administrativo o el contrato que necesitas bosquejar de urgencia."
              },
              {
                step: "02",
                title: "Evaluación y presupuesto cerrado personalizado",
                desc: "Johanna analiza tu caso a profundidad de forma rústica y te entrega una propuesta técnica final especificando el costo exacto acordado, los plazos involucrados y todo recaudo físico requerido."
              },
              {
                step: "03",
                title: "Formalización contractual del inicio del trabajo",
                desc: "Una vez que apruebes formalmente la estimación de honorarios, se suscribe el servicio y se inicia de inmediato la revisión de expedientes, solicitudes y cartas, sin retrasos artificiosos."
              },
              {
                step: "04",
                title: "Ejecución técnica con reportes permanentes de agenda",
                desc: "Delegas la carga total de las comparecencias y radicación de oficios. Johanna se sitúa al frente de la ventanilla, manteniéndote informado de forma constante de los avances."
              },
              {
                step: "05",
                title: "Entrega física de los resultados verificados",
                desc: "Se te hace entrega del documento final notarizado, la patente aprobada o el acuerdo con las debidas firmas públicas. Se repasan los alcances contigo para archivar exitosamente el expediente."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                {/* Number marker circle */}
                <span className="absolute -left-12 md:-left-16 top-0.5 w-10 h-10 rounded-full bg-brand-950 border-2 border-brand-50 flex items-center justify-center text-[11px] font-mono font-bold text-brand-50 shadow-sm">
                  {item.step}
                </span>
                
                <div className="bg-white border border-brand-200 p-5 md:p-6 rounded-2xl shadow-sm space-y-2 hover:shadow-md transition-shadow">
                  <h3 className="text-xs font-display font-bold text-brand-950">{item.title}</h3>
                  <p className="text-[11px] text-brand-800 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMPARISON BOX - BEFORE / AFTER TRANSFORM */}
      <section className="py-20 bg-brand-50 border-b border-brand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5d736c] font-mono block mb-2">La Gran Diferencia</span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-brand-950 tracking-tight">
              ¿Cómo cambia tu vida antes y después de trabajar con Johanna?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Column BEFORE */}
            <div className="border border-rose-200 bg-rose-50/50 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-mono font-bold text-[11px] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>Estado Inicial - Ansiedad Constante</span>
              </div>
              <ul className="space-y-3 text-[11px] text-rose-950 font-sans">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 shrink-0">❌</span>
                  <span>Te enfrentas a un trámite confuso recopilando información contradictoria de blogs de internet sin amparo.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 shrink-0">❌</span>
                  <span>Temes cometer un desliz costoso al firmar un contrato civil o presentar descargos fuera del plazo municipal.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 shrink-0">❌</span>
                  <span>Los canales municipales de atención son distantes, lentos o exigen requisitos que no comprendes cómo solventar.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 shrink-0">❌</span>
                  <span>Cargas el peso mental de una multa o proceso de coactiva abierto que drena tu tiempo laboral ordinario.</span>
                </li>
              </ul>
            </div>

            {/* Column AFTER */}
            <div className="border border-emerald-200 bg-emerald-50/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-mono font-bold text-[11px] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Estado Posterior - Tranquilidad Absoluta</span>
              </div>
              <ul className="space-y-3 text-[11px] text-brand-900 font-sans">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 shrink-0">✔</span>
                  <span><strong>Caso resuelto o encauzado bajo control estricto</strong> de una profesional competente.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 shrink-0">✔</span>
                  <span>Comprendes plenamente qué se hizo, por qué y bajo cuál normativa técnica se resolvió el expediente.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 shrink-0">✔</span>
                  <span>Tomaste las decisiones correctas fundamentándote en análisis prácticos, evitando pérdidas.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 shrink-0">✔</span>
                  <span>Recuperaste tu paz de espíritu y tienes un contacto permanente de amparo para cualquier inconveniente futuro.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 8.5 INSURANCE AND AFFILIATION CHECKER */}
      <InsuranceChecker />

      {/* 9. TESTS CAROUSEL COMPONENT */}
      <Testimonials />

      {/* 10. DIAGNOSTIC SPECIAL IA COMPONENT */}
      <CaseEvaluator />

      {/* 11. INCLUDED BONUSES & TRUTH VALUE */}
      <section className="py-20 bg-brand-50 border-b border-brand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5d736c] font-mono block mb-2">
              Valor Añadido Real
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-brand-950 tracking-tight leading-snug">
              Beneficios Reales Incluidos en tu Contratación
            </h2>
            <p className="mt-2 text-xs text-brand-800">
              Johanna Pallo no ofrece bonos ficticios ni de adorno para simular valor. El verdadero acompañamiento incorpora valores indiscutibles que otros asesores cobran por separado:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Atención post-consulta garantizada",
                desc: "Si después de finiquitado el trámite, o cerrado el contrato, le surge una consulta adicional breve relacionada con el mismo expediente, puede contactarnos sin costo adicional. El acompañamiento real prosigue."
              },
              {
                title: "Filtro honesto de viabilidad inicial",
                desc: "Si al pre-evaluar su situación Johanna descubre que usted puede resolver el trámite por sí mismo sin gastar un centavo, o que no amerita representación, se lo dirá francamente. Su confianza vale más."
              },
              {
                title: "Derivación con profesionales serios",
                desc: "Si su expediente requiere el patrocinio específico de un área penal, civil de litigio judicial de alta corte o aduanera compleja, le referiremos con los mejores expertos de su red de absoluta confianza."
              }
            ].map((bonus, idx) => (
              <div 
                key={idx}
                className="bg-white border border-brand-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-brand-850 bg-brand-100 rounded-full h-7 w-7 flex items-center justify-center">
                    {idx+1}
                  </span>
                  <h3 className="text-xs font-display font-bold text-brand-950 pt-1">
                    {bonus.title}
                  </h3>
                  <p className="text-[11px] text-brand-800 leading-relaxed font-sans font-light">
                    {bonus.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. PRICE ACCORDION ESTIMATOR AND TRANSPARENCY CARDS */}
      <CostCalculator />

      {/* 13. NO RISK GUARANTEE SPECIAL SECTION */}
      <section className="py-20 bg-gradient-to-b from-brand-50 to-brand-100/40 border-b border-brand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-950 text-brand-50 rounded-2xl p-6 sm:p-12 relative overflow-hidden shadow-xl border border-brand-900">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-300 font-bold block">
                Garantía de Compromiso Ético
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
                Compromiso de Trabajo Impecable. Sin Letra Pequeña.
              </h2>
              <p className="text-xs text-brand-200 leading-relaxed font-light">
                Johanna Pallo no ofrece vagas garantías comerciales de "devolución del 100%" como recurso artificial de marketing o ventas. Ofrece algo más valioso y ético para su tranquilidad: <strong>el firme compromiso personal de hacer el trabajo bien hecho de entrada.</strong>
              </p>
              <p className="text-xs text-brand-200 leading-relaxed font-light">
                Esto se traduce en que, si existe alguna omisión involuntaria de su parte, una corrección requerida por el notario o el oficial municipal del trámite, ella lo atiende, lo redacta y lo subsana de inmediato sin excusas, argumentos de dilatación ni recargos en su tarifa acordada originalmente.
              </p>
              <div className="pt-4 border-t border-brand-850 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-brand-300 font-mono gap-2">
                <span>Tu tranquilidad es parte fundamental de nuestra solución.</span>
                <span className="text-white font-bold tracking-tight">Tlga. Johanna Pallo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ ACCORDION COMPONENT */}
      <FAQ />

      {/* 15. DETAILED BIOGRAPHY & CORE OPERATION VALUES */}
      <section className="py-20 bg-brand-100/30 border-b border-brand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Picture frame mock vector (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-brand-200 p-8 rounded-2xl shadow-sm text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-brand-100 border border-brand-300 flex items-center justify-center mx-auto text-brand-850 font-display font-bold text-3xl">
              JP
            </div>
            
            <div className="space-y-1">
              <h3 className="text-base font-display font-medium text-brand-950">Tlga. Johanna Pallo</h3>
              <p className="text-xs text-brand-700 font-mono">Quito, Ecuador</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono uppercase text-[#4d5a57]">
              <div className="p-2 border rounded bg-brand-50 border-brand-200">
                <strong className="block text-xs font-bold text-brand-950">100%</strong>
                Honesta
              </div>
              <div className="p-2 border rounded bg-brand-50 border-brand-200">
                <strong className="block text-xs font-bold text-brand-950">Rigor</strong>
                Técnico
              </div>
              <div className="p-2 border rounded bg-brand-50 border-brand-200">
                <strong className="block text-xs font-bold text-brand-950">Firme</strong>
                Solución
              </div>
            </div>
          </div>

          {/* Core Values / Biography copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5d736c] font-mono block">
              Principios Operativos
            </span>
            <h2 className="text-3xl font-display font-medium text-brand-950 tracking-tight leading-tight">
              Tres pilares inquebrantables que definen nuestra relación profesional
            </h2>
            <p className="text-xs text-brand-800 leading-relaxed">
              Johanna Pallo cuenta con una sólida reputación en tramitología civil, predial y corporativa en Ecuador. No se cimenta sobre publicidad ostentosa de marquesina, sino en la sincera recomendación de boca en boca de clientes satisfechos. Su despacho no negocia tres valores elementales:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "1. Transparencia y Honestidad ante todo",
                  desc: "Si tu caso tiene amparo normativo, te lo diremos planteando los descargos necesarios. Si por el contrario no tiene viabilidad municipal o implica costos excesivos que no ameritan incurrir, te lo notificaremos en la primera consulta."
                },
                {
                  title: "2. Rigor técnico por encima de la prisa",
                  desc: "La celeridad es crucial para contestar plazos administrativos. Pero jamás aceleraremos un trámite cometiendo deslices en escrituras o documentos que den pie a futuras multas coactivas. Se trabaja bien de entrada."
                },
                {
                  title: "3. Los clientes son personas, jamás números de expediente",
                  desc: "Detrás de cada consulta existe una preocupación material, familiar o societaria real. Recibirás un servicio personalizado, sensible a tus tiempos, con reuniones directas de validación."
                }
              ].map((val, idx) => (
                <div key={idx} className="space-y-1 bg-white p-4 rounded-xl border border-brand-200 shadow-sm">
                  <h4 className="text-xs font-display font-bold text-brand-950">
                    {val.title}
                  </h4>
                  <p className="text-[11px] text-brand-800 leading-relaxed font-sans font-light">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 16. FINAL CTA & BOOKING FORM CONTAINER */}
      <section id="contacto" className="py-20 bg-brand-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-100/60 border border-brand-200 rounded-3xl p-6 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative overflow-hidden shadow-sm">
            
            {/* Action text & escacez markers (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-800 font-bold block mb-1">
                  Contacto Directo e Inmediato
                </span>
                <h3 className="text-2xl font-display font-medium text-brand-950 tracking-tight leading-tight">
                  El siguiente paso es simple. Solo tienes que darlo de una vez.
                </h3>
                <p className="text-xs text-brand-800 leading-relaxed mt-3 font-sans pb-4">
                  Tienes una situación que resolver, un contrato civil que revisar o una mora técnica municipal que subsanar. No necesitas comprender todos los tecnicismos para consultarnos. Johanna está disponible para escucharte.
                </p>
              </div>

              {/* Scarcity advisory */}
              <div className="p-4 bg-white/70 border border-brand-200 rounded-xl space-y-2">
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-ping"></span>
                  Disponibilidad de la Agenda
                </span>
                <p className="text-[10px] text-brand-800 font-sans leading-relaxed">
                  Para otorgar un trato meticuloso y con resultados reales, Johanna opera con un límite estricto de expedientes simultáneos en agenda de ventanilla. Reserva tu lugar hoy mismo completando la consulta.
                </p>
              </div>
            </div>

            {/* Practical contact form (7 cols) */}
            <div className="md:col-span-7 bg-white border border-brand-200 rounded-2xl p-6 shadow-sm">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto text-xl font-bold font-mono">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-display font-medium text-brand-950">Pre-consulta enviada</h4>
                    <p className="text-xs text-stone-500">
                      Hemos recibido tu información técnica. Abriendo tu cliente de correo para respaldar el envío directo.
                    </p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 text-[10px] font-mono tracking-tight font-semibold bg-brand-950 text-white rounded hover:bg-brand-900"
                  >
                    Volver a enviar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-800 mb-1">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full px-3 py-2 bg-brand-50/50 border border-brand-200 rounded text-xs text-brand-950 focus:ring-1 focus:ring-brand-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-800 mb-1">Celular de Contacto</label>
                      <input 
                        type="tel" 
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+593 98 000 0000"
                        className="w-full px-3 py-2 bg-brand-50/50 border border-brand-200 rounded text-xs text-brand-950 focus:ring-1 focus:ring-brand-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-800 mb-1">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="ejemplo@correo.com"
                        className="w-full px-3 py-2 bg-brand-50/50 border border-brand-200 rounded text-xs text-brand-950 focus:ring-1 focus:ring-brand-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-800 mb-1">Asunto de Requerimiento</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3 py-2 bg-brand-50/50 border border-brand-200 rounded text-xs text-brand-950 focus:ring-1 focus:ring-brand-500 outline-none"
                    >
                      <option value="Trámite Municipal / Patentes">Trámite Municipal / Patentes / Multas</option>
                      <option value="Asesoría Legal / Contratiempos">Asesoría Legal / Documentos o Contratos</option>
                      <option value="Gestión de Compañía / SAS">Habilitación Societaria / SAS / RUC</option>
                      <option value="Asesoría General Administrativa">Asesoría General / Oficios o Solicitudes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-800 mb-1">Breve Descripción de lo Ocurrido</label>
                    <textarea 
                      rows={3}
                      value={contactForm.notes}
                      onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                      placeholder="Describe qué necesitas resolver..."
                      className="w-full px-3 py-2 bg-brand-50/50 border border-brand-200 rounded text-xs text-brand-950 focus:ring-1 focus:ring-brand-500 outline-none resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full px-4 py-3 bg-brand-950 hover:bg-brand-900 text-brand-50 font-semibold text-xs uppercase tracking-widest font-mono rounded-lg shadow transition duration-300"
                  >
                    Enviar Solicitud Segura de Consulta
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer corporate block */}
      <Footer />

      {/* Floating active chat trigger button */}
      <FloatingWhatsApp />

    </div>
  );
}
