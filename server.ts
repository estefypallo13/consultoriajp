/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini AI with client tracking
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Case Pre-evaluation Endpoint
app.post("/api/pre-evaluate", async (req, res) => {
  const { fullName, email, phone, problemDescription, urgencyLevel } = req.body;

  if (!problemDescription || !fullName) {
    res.status(400).json({ error: "El nombre y la descripción del problema son obligatorios." });
    return;
  }

  // Fallback diagnostic if API Key is missing or invalid, so the app remains perfectly usable and high-quality!
  const hasApiKey = !!process.env.GEMINI_API_KEY;

  if (!hasApiKey) {
    // Generate an intelligent rule-based mock analysis so the page is fully functional without the key
    const lowDesc = problemDescription.toLowerCase();
    let classification = "Asesoría General / Administrativa";
    let suggestedDocs = [
      "Cédula de identidad / Pasaporte",
      "Documentos previos relacionados con el trámite",
      "Correos electrónicos o notificaciones recibidas"
    ];

    if (lowDesc.includes("contrat") || lowDesc.includes("legal") || lowDesc.includes("firm") || lowDesc.includes("juri")) {
      classification = "Asesoría Legal / Contractual";
      suggestedDocs.push("Borrador del contrato o documento a revisar", "Identificación de las partes involucradas");
    } else if (lowDesc.includes("empres") || lowDesc.includes("negoci") || lowDesc.includes("comerc") || lowDesc.includes("registr")) {
      classification = "Gestión Comercial y Societaria";
      suggestedDocs.push("RUC / RISE activo", "Constitución de la compañía (si aplica)", "Detalles de la marca o logo");
    } else if (lowDesc.includes("seguro") || lowDesc.includes("asegura") || lowDesc.includes("iess") || lowDesc.includes("afili")) {
      classification = "Validación de Seguro y Afiliación IESS";
      suggestedDocs.push("Cédula de Identidad de Ecuador", "Clave personal de afiliado del IESS", "Historial mecanizado de aportes");
    } else if (lowDesc.includes("mult") || lowDesc.includes("municip") || lowDesc.includes("tramit") || lowDesc.includes("gobiern")) {
      classification = "Trámites Públicos y Municipales";
      suggestedDocs.push("Notificación física o digital de la multa", "Captura de pantalla de la consulta en línea", "Historial de pagos de tasas");
    }

    const urgencyLabel = urgencyLevel === "high" ? "Alta (Urgente)" : urgencyLevel === "medium" ? "Media" : "Ordinaria (Baja)";

    const mockResponse = {
      classification,
      confidence: "Media (Modo Demo)",
      summary: `Pre-diagnóstico para ${fullName}: Se identifica una solicitud para abordar ${problemDescription.substring(0, 100)}... en categoría ${classification} con prioridad ${urgencyLabel}.`,
      suggestedDocs,
      initialGuidance: [
        "Conserve la calma y evite firmar o enviar documentos adicionales hasta que Johanna revise el caso.",
        "Reúna los documentos sugeridos en formato digital legible (PDF o imagen nítida).",
        `Espere el contacto de la Tlga. Johanna Pallo al teléfono suministrado (${phone}) o correo electrónico (${email}).`
      ],
      whatsappDraft: `Hola Tlga. Johanna Pallo, mi nombre es ${fullName}. Realicé el diagnóstico automático de mi caso sobre: "${problemDescription.substring(0, 60)}...". Clasificación sugerida: ${classification}. Me gustaría agendar una consulta formal para continuar.`,
      emailDraft: `Asunto: Solicitud de Asesoría Profesional - ${fullName}\n\nEstimada Tlga. Johanna Pallo,\n\nMi nombre es ${fullName} y me pongo en contacto con usted para consultar sobre mi caso en el área de: ${classification}.\n\nDescripción del asunto: ${problemDescription}\n\nNivel de urgencia: ${urgencyLabel}\nMóvil de contacto: ${phone}\n\nEspero su gentil respuesta para agendar la consulta inicial.`
    };

    res.json(mockResponse);
    return;
  }

  try {
    const ai = getGeminiClient();
    const systemInstruction = `Eres el Asistente Digital Inteligente de Recepción de la Tlga. Johanna Pallo (Servicios Profesionales de Asesoría y Consultoría en Ecuador). 
Tu tarea es analizar el problema inicial enviado por un posible cliente, clasificarlo con alta precisión, proveer un diagnóstico profesional, reconfortante y pragmático en idioma Español de Ecuador.
Debes devolver la respuesta estrictamente en formato JSON utilizando el esquema requerido. 
Sé muy profesional, evita tecnicismos confusos y transmite mucha tranquilidad y orden. 

Categorías de clasificación válidas:
- "Asesoría Legal / Contractual" (Contratos, escrituras, acuerdos, poderes)
- "Trámites Públicos y Municipales" (Multas, permisos, patentes, catastros)
- "Gestión Comercial y Societaria" (RUC, marcas, personerías jurídicas, RUP)
- "Validación de Seguro y Afiliación IESS" (Consulta de estado de asegurado, aportaciones, seguro de desempleo, jubilación, mora o glosas patronales)
- "Asesoría General / Administrativa" (Redacción de oficios, quejas, cartas, mediaciones)

El WhatsApp Draft debe ser un mensaje idóneo, listo para enviar por WhatsApp Web o móvil (sin URL encoding, el cliente lo formateará en la URL de enlace), presentándose educadamente e invitando a la consulta formal.`;

    const prompt = `Analiza la siguiente consulta para pre-diagnóstico:
Nombre del cliente: ${fullName}
Correo electrónico: ${email}
Teléfono de contacto: ${phone}
Nivel de urgencia reportado: ${urgencyLevel}
Descripción del problema o trámite que necesita:
"""
${problemDescription}
"""`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: {
              type: Type.STRING,
              description: "Una de las cuatro categorías de clasificación definidas en system instructions."
            },
            confidence: {
              type: Type.STRING,
              description: "Nivel de seguridad de la clasificación (Alta o Media)."
            },
            summary: {
              type: Type.STRING,
              description: "Un resumen analítico y tranquilizador en un tono profesional (máximo 3 oraciones)."
            },
            suggestedDocs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 3 a 5 documentos específicos que el cliente debería ir reuniendo para este tipo de trámite."
            },
            initialGuidance: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 2 a 3 recomendaciones o consejos prácticos para que actúe de inmediato mientras recibe atención."
            },
            whatsappDraft: {
              type: Type.STRING,
              description: "Un mensaje de WhatsApp redactado en primera persona para el cliente, educado, directo y profesional, que resuma lo que necesita resolver con Johanna."
            },
            emailDraft: {
              type: Type.STRING,
              description: "Asunto y cuerpo completo formateado para un correo electrónico dirigido a Johanna solicitando sus servicios."
            }
          },
          required: ["classification", "confidence", "summary", "suggestedDocs", "initialGuidance", "whatsappDraft", "emailDraft"]
        }
      }
    });

    const responseText = response.text || "";
    const parsedData = JSON.parse(responseText.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini pre-evaluate error:", error);
    res.status(500).json({
      error: "Ocurrió un error al procesar el pre-diagnóstico por IA. Inténtalo de nuevo o contáctate directamente por los canales oficiales.",
      details: error.message
    });
  }
});

// Configure Vite or Static Files Middleware based on environment
async function setupMiddlewares() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running and listening on http://0.0.0.0:${PORT}`);
  });
}

setupMiddlewares();
