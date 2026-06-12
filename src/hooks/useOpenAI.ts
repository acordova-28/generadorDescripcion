import { useState } from 'react';
import { generateDescription } from '../services/openai.service';
import type { Category, GeneratedDescription, Project } from '../types';

export function useOpenAI(apiKey: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedDescription | null>(null);

  const generate = async (
    project: Project,
    category: Category,
    activity: string
  ): Promise<GeneratedDescription | null> => {
    if (!apiKey) {
      setError('Configura tu API Key de Claude antes de continuar.');
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const description = await generateDescription(apiKey, project, category, activity);
      setResult(description);
      return description;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al generar la descripción';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error, result };
}
