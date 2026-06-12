import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { STORAGE_KEYS } from '../constants';
import type { Category, GeneratedDescription, HistoryEntry, Project } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>(STORAGE_KEYS.HISTORY, []);

  const addEntry = useCallback(
    (
      project: Project,
      category: Category,
      activity: string,
      description: GeneratedDescription
    ): HistoryEntry => {
      const entry: HistoryEntry = {
        id: uuidv4(),
        date: new Date().toISOString(),
        project,
        category,
        activity,
        title: description.title,
        executiveSummary: description.executiveSummary,
        technicalDetails: description.technicalDetails,
        impact: description.impact,
      };
      setHistory([entry, ...history]);
      return entry;
    },
    [history, setHistory]
  );

  const removeEntry = useCallback(
    (id: string) => {
      setHistory(history.filter((e) => e.id !== id));
    },
    [history, setHistory]
  );

  return { history, addEntry, removeEntry };
}
