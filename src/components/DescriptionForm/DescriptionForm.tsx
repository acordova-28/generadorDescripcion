import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useEffect, useState } from 'react';
import { CATEGORIES, CATEGORY_KEYWORDS, PROJECTS } from '../../constants';
import type { Category, Project } from '../../types';

interface DescriptionFormProps {
  loading: boolean;
  onSubmit: (project: Project, category: Category, activity: string) => void;
}

function detectCategory(text: string): Category | null {
  const lower = text.toLowerCase();
  const scores: Record<Category, number> = {
    Frontend: 0,
    Backend: 0,
    'Base de Datos': 0,
    'Integración': 0,
    QA: 0,
    'Análisis': 0,
    General: 0,
    'Reunión': 0,
  };

  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS) as [Category, string[]][]) {
    for (const kw of keywords) {
      if (lower.includes(kw)) scores[cat]++;
    }
  }

  const [best, bestScore] = Object.entries(scores).sort(([, a], [, b]) => b - a)[0] as [
    Category,
    number,
  ];
  return bestScore > 0 ? best : null;
}

export function DescriptionForm({ loading, onSubmit }: DescriptionFormProps) {
  const [project, setProject] = useState<Project>('Wuolla');
  const [category, setCategory] = useState<Category>('Frontend');
  const [activity, setActivity] = useState('');
  const [autoDetected, setAutoDetected] = useState(false);

  useEffect(() => {
    if (activity.length > 10) {
      const detected = detectCategory(activity);
      if (detected) {
        setCategory(detected);
        setAutoDetected(true);
      }
    } else {
      setAutoDetected(false);
    }
  }, [activity]);

  const handleSubmit = () => {
    if (activity.trim()) onSubmit(project, category, activity.trim());
  };

  return (
    <Stack spacing={3}>
      <FormControl fullWidth>
        <InputLabel>Proyecto</InputLabel>
        <Select
          value={project}
          label="Proyecto"
          onChange={(e) => setProject(e.target.value as Project)}
        >
          {PROJECTS.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={category}
            label="Categoría"
            onChange={(e) => {
              setCategory(e.target.value as Category);
              setAutoDetected(false);
            }}
          >
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {autoDetected && (
          <Typography
            variant="caption"
            sx={{
              color: 'primary.main',
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <SmartToyIcon sx={{ fontSize: 14 }} />
            Categoría detectada automáticamente
          </Typography>
        )}
      </Box>

      <TextField
        fullWidth
        multiline
        rows={5}
        label="Actividad realizada"
        placeholder="Ej: Se agregó el logo de Cruz Azul y La Ganga en el detalle de la orden."
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey) handleSubmit();
        }}
        helperText="Ctrl+Enter para generar"
      />

      <Tooltip title={!activity.trim() ? 'Escribe la actividad primero' : ''}>
        <span>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading || !activity.trim()}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <AutoAwesomeIcon />
              )
            }
          >
            {loading ? 'Generando descripción...' : 'Generar descripción'}
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
}
