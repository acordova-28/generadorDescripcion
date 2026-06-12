import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import type { Category, GeneratedDescription, Project } from '../../types';

interface DescriptionCardProps {
  project: Project;
  category: Category;
  description: GeneratedDescription;
  onSave: () => void;
}

export function DescriptionCard({ project, category, description, onSave }: DescriptionCardProps) {
  const [copied, setCopied] = useState(false);

  const fullText = [
    description.title,
    '',
    description.executiveSummary,
    '',
    'Detalles técnicos:',
    ...description.technicalDetails.map((d) => `• ${d}`),
    '',
    'Impacto:',
    ...description.impact.map((i) => `• ${i}`),
  ].join('\n');

  const handleCopy = () => {
    void navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}
        >
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Chip label={project} size="small" color="primary" variant="outlined" />
            <Chip label={category} size="small" variant="outlined" />
          </Stack>
          <Tooltip title={copied ? '¡Copiado!' : 'Copiar al portapapeles'}>
            <IconButton size="small" onClick={handleCopy}>
              {copied ? (
                <CheckIcon fontSize="small" color="success" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          {description.title}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: 'primary.main', fontWeight: 600 }}
            gutterBottom
          >
            Descripción ejecutiva
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {description.executiveSummary}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: 'primary.main', fontWeight: 600 }}
            gutterBottom
          >
            Detalle técnico
          </Typography>
          <List dense disablePadding>
            {description.technicalDetails.map((detail, idx) => (
              <ListItem key={idx} disablePadding sx={{ alignItems: 'flex-start', mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 20, mt: 0.6 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8 }} color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={detail}
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: 'primary.main', fontWeight: 600 }}
            gutterBottom
          >
            Impacto generado
          </Typography>
          <List dense disablePadding>
            {description.impact.map((item, idx) => (
              <ListItem key={idx} disablePadding sx={{ alignItems: 'flex-start', mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 20, mt: 0.6 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8 }} color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Button
          fullWidth
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={onSave}
        >
          Guardar en historial
        </Button>
      </CardContent>
    </Card>
  );
}
