/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Clock, CheckSquare, AlertTriangle, ShieldCheck, Smile, 
  UserCheck, Award, Lock, Heart 
} from "lucide-react";

export default function BenefitGrid() {
  const benefits = [
    {
      id: "1",
      title: "1. Ahorras tiempo valioso que no puedes recuperar",
      description: "En lugar de pasar horas investigando, haciendo filas eternas o lidiando con procesos oscuros que no dominas, delegas esa carga en alguien que ya sabe exactamente cómo hacerlo.",
      icon: Clock,
      color: "text-amber-700 bg-amber-50 border-amber-200"
    },
    {
      id: "2",
      title: "2. Tomas decisiones con información real",
      description: "Johanna te explica tu situación en lenguaje claro, te presenta tus opciones reales y te ayuda a elegir el camino que mejor se adapta a ti — sin presionarte, sin confundirte.",
      icon: CheckSquare,
      color: "text-blue-700 bg-blue-50 border-blue-200"
    },
    {
      id: "3",
      title: "3. Evitas errores costosos de ir por cuenta propia",
      description: "Un trámite municipal mal planteado, un documento incorrecto o una decisión apresurada sin asesoría puede costarte mucho más de lo que crees. Aquí mitigamos todo riesgo.",
      icon: AlertTriangle,
      color: "text-rose-700 bg-rose-50 border-rose-200"
    },
    {
      id: "4",
      title: "4. Tienes a una profesional de tu lado constantemente",
      description: "No recibes un listado vago de instrucciones y te quedas solo. Johanna acompaña en ventanillas, responde tus dudas y te actualiza mientras tu trámite permanezca activo.",
      icon: ShieldCheck,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
      id: "5",
      title: "5. Reduces drásticamente el estrés acumulado",
      description: "Saber que hay una profesional comprometida y sumamente competente ocupándose de tus problemas y patentes cambia por completo cómo experimentas todo el trámite.",
      icon: Smile,
      color: "text-purple-700 bg-purple-50 border-purple-200"
    },
    {
      id: "6",
      title: "6. Recibes atención dedicada y 100% personalizada",
      description: "Tu situación es única y amerita un análisis a medida. Nada de copia y pega perezosos. Tu caso recibe el tiempo, el respeto y el análisis pormenorizado que se merece.",
      icon: UserCheck,
      color: "text-teal-700 bg-teal-50 border-teal-200"
    },
    {
      id: "7",
      title: "7. Pagas por resultados tangibles, no por procesos vacíos",
      description: "El compromiso de Johanna es exclusivamente con el resultado final. Si existe un nudo administrativo que desatar o una objeción que rebatir, se enfrenta con seriedad jurídica.",
      icon: Award,
      color: "text-indigo-700 bg-indigo-50 border-indigo-200"
    },
    {
      id: "8",
      title: "8. Ganas absoluta seguridad jurídica y de procesos",
      description: "Saldrás de la consulta inicial comprendiendo con precisión meridiana en qué posición legal, societaria o tributaria estás, protegiendo tus bienes y tu reputación profesional.",
      icon: Lock,
      color: "text-stone-700 bg-stone-50 border-stone-200"
    },
    {
      id: "9",
      title: "9. Construyes una relación de total confianza",
      description: "Esto no es una fría transacción única de ventanilla. Cuando necesites asistencia profesional en el futuro para otro trámite o negocio, tendrás a un contacto de confianza listo para responder.",
      icon: Heart,
      color: "text-pink-700 bg-pink-50 border-pink-200"
    }
  ];

  return (
    <section id="beneficios" className="scroll-mt-24 py-20 bg-brand-50 border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left-aligned title + paragraph */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5d736c] font-mono block mb-2">
              Transformación Garantizada
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-brand-950 tracking-tight leading-tight">
              Lo que realmente cambia cuando delegas en profesionales
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-brand-800 leading-relaxed">
              Trabajar con alguien comprometido con el resultado te devuelve la calma. Descubre los pilares fundamentales que caracterizan cada una de nuestras intervenciones estratégicas.
            </p>
          </div>
        </div>

        {/* Dynamic Bento Box / Matrix Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={benefit.id}
                className="bg-white border border-brand-200 hover:border-brand-400 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:bg-brand-50/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border mb-6 transition-transform group-hover:scale-105 ${benefit.color}`}>
                    <IconComponent className="w-5 h-5 shrink-0" />
                  </div>
                  <h3 className="text-base font-display font-medium text-brand-950 group-hover:text-brand-700 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-xs text-brand-800 leading-relaxed font-sans font-light">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
