import { Card, CardContent, Typography } from '@mui/material';
import { HistoryTable } from '../components/HistoryTable/HistoryTable';
import type { HistoryEntry } from '../types';

interface HistoryPageProps {
  history: HistoryEntry[];
  onDeleteEntry: (id: string) => void;
}

export function HistoryPage({ history, onDeleteEntry }: HistoryPageProps) {
  const count = history.length;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Historial de descripciones
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          {count === 0
            ? 'Aún no has guardado ninguna descripción.'
            : `${count} ${count === 1 ? 'entrada guardada' : 'entradas guardadas'}`}
        </Typography>
        <HistoryTable history={history} onDelete={onDeleteEntry} />
      </CardContent>
    </Card>
  );
}
