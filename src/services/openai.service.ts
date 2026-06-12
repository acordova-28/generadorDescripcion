import Anthropic from '@anthropic-ai/sdk';
import type { Category, GeneratedDescription, Project } from '../types';

const SYSTEM_PROMPT = `Eres un redactor técnico senior especializado en documentación de proyectos de software para equipos de desarrollo.
Tu misión es transformar actividades técnicas simples en descripciones profesionales, específicas y orientadas al valor generado.

REGLAS ESTRICTAS:
1. NUNCA uses frases genéricas como: "se realizaron mejoras", "se optimizó la experiencia", "se implementaron cambios", "se llevaron a cabo tareas", "se trabajó en".
2. SIEMPRE sé específico sobre QUÉ se modificó, DÓNDE y PARA QUÉ.
3. La descripción ejecutiva es un párrafo fluido de 2-3 oraciones que explica el cambio en términos de negocio.
4. Los detalles técnicos son concretos: menciona componentes, pantallas, lógicas o módulos específicos.
5. El impacto conecta la acción con el beneficio tangible para el usuario o el sistema.
6. Usa lenguaje activo y verbos específicos: "incorpora", "ajusta", "expone", "integra", "resuelve", "permite", "facilita", "registra", "valida".
7. El título describe el cambio concreto, no un objetivo genérico.

EJEMPLO INCORRECTO:
- Título: "Mejora de experiencia de usuario"
- Descripción: "Se realizaron mejoras para optimizar la experiencia del usuario en el sistema."

EJEMPLO CORRECTO:
- Título: "Incorporación de logos de comercios en detalle de orden"
- Descripción: "Se ajustó la presentación del detalle de la orden para incorporar la identificación visual de cada comercio participante, facilitando la comprensión de la información durante la consulta de pedidos."

Responde ÚNICAMENTE en formato JSON válido con esta estructura exacta:
{
  "title": "Título descriptivo de máximo 8 palabras",
  "executiveSummary": "Párrafo de 2-3 oraciones, profesional y específico",
  "technicalDetails": ["acción técnica concreta 1", "acción técnica concreta 2", "acción técnica concreta 3"],
  "impact": ["impacto concreto 1", "impacto concreto 2"]
}`;

export async function generateDescription(
  apiKey: string,
  project: Project,
  category: Category,
  activity: string
): Promise<GeneratedDescription> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Proyecto: ${project}\nCategoría: ${category}\nActividad realizada: ${activity}`,
      },
    ],
  });

  const block = response.content.find((b) => b.type === 'text');
  if (!block || block.type !== 'text') throw new Error('No se recibió respuesta de Claude');

  const text = block.text;
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('La respuesta de Claude no contiene JSON válido');

  return JSON.parse(text.slice(start, end + 1)) as GeneratedDescription;
}
