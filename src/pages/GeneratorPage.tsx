import { Alert, Box, Button, Card, CardContent, Typography } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { DescriptionCard } from '../components/DescriptionCard/DescriptionCard';
import { DescriptionForm } from '../components/DescriptionForm/DescriptionForm';
import { useOpenAI } from '../hooks/useOpenAI';
import type { Category, GeneratedDescription, HistoryEntry, Project } from '../types';

interface GeneratorPageProps {
  apiKey: string;
  onAddEntry: (
    project: Project,
    category: Category,
    activity: string,
    description: GeneratedDescription
  ) => HistoryEntry;
  onOpenConfig: () => void;
}

interface LastInput {
  project: Project;
  category: Category;
  activity: string;
}

export function GeneratorPage({ apiKey, onAddEntry, onOpenConfig }: GeneratorPageProps) {
  const { generate, loading, error, result } = useOpenAI(apiKey);
  const [lastInput, setLastInput] = useState<LastInput | null>(null);

  const handleSubmit = async (project: Project, category: Category, activity: string) => {
    setLastInput({ project, category, activity });
    await generate(project, category, activity);
  };

  const handleSave = () => {
    if (result && lastInput) {
      onAddEntry(lastInput.project, lastInput.category, lastInput.activity, result);
      toast.success('Guardado en el historial');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        alignItems: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box sx={{ width: { xs: '100%', md: '420px' }, flexShrink: 0 }}>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
              Nueva descripción
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Describe la actividad realizada y generaremos una descripción profesional lista para
              Planner, Jira o Azure DevOps.
            </Typography>

            {!apiKey && (
              <Alert
                severity="warning"
                sx={{ mb: 3, borderRadius: 1.5 }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={<KeyIcon />}
                    onClick={onOpenConfig}
                    sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
                  >
                    Configurar
                  </Button>
                }
              >
                Configura tu API Key de Claude para empezar.
              </Alert>
            )}

            <DescriptionForm loading={loading} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ flex: 1, width: '100%' }}>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: 2 }}
            action={
              !apiKey ? (
                <Button
                  color="inherit"
                  size="small"
                  startIcon={<KeyIcon />}
                  onClick={onOpenConfig}
                  sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                  Configurar
                </Button>
              ) : undefined
            }
          >
            {error}
          </Alert>
        )}
        {result && lastInput ? (
          <DescriptionCard
            project={lastInput.project}
            category={lastInput.category}
            description={result}
            onSave={handleSave}
          />
        ) : (
          !error && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 320,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 4,
                bgcolor: 'action.hover',
              }}
            >
              <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
                La descripción generada aparecerá aquí
              </Typography>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
