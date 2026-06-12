import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { PROJECTS } from '../../constants';
import type { HistoryEntry, Project } from '../../types';

interface HistoryTableProps {
  history: HistoryEntry[];
  onDelete: (id: string) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function HistoryTable({ history, onDelete }: HistoryTableProps) {
  const [search, setSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<Project | ''>('');
  const [viewEntry, setViewEntry] = useState<HistoryEntry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = history.filter((e) => {
    const matchesProject = !projectFilter || e.project === projectFilter;
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      e.title.toLowerCase().includes(term) ||
      e.activity.toLowerCase().includes(term) ||
      e.project.toLowerCase().includes(term) ||
      e.category.toLowerCase().includes(term);
    return matchesProject && matchesSearch;
  });

  const handleExport = () => {
    const rows = filtered.map((e) => ({
      Fecha: formatDate(e.date),
      Proyecto: e.project,
      Categoría: e.category,
      Título: e.title,
      'Descripción ejecutiva': e.executiveSummary,
      'Detalle técnico': e.technicalDetails.join(' | '),
      Impacto: e.impact.join(' | '),
      'Actividad original': e.activity,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Historial');
    XLSX.writeFile(wb, `historial_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Buscar por título, actividad, proyecto o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Proyecto</InputLabel>
          <Select
            value={projectFilter}
            label="Proyecto"
            onChange={(e) => setProjectFilter(e.target.value as Project | '')}
          >
            <MenuItem value="">Todos</MenuItem>
            {PROJECTS.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
          disabled={filtered.length === 0}
        >
          Exportar Excel
        </Button>
      </Stack>

      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ color: 'text.secondary' }}>
            {history.length === 0
              ? 'Aún no hay entradas en el historial.'
              : 'No se encontraron resultados para la búsqueda.'}
          </Typography>
        </Box>
      ) : (
        <Paper variant="outlined">
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 600, bgcolor: 'action.hover' } }}>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Proyecto</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((entry) => (
                  <TableRow key={entry.id} hover>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 12, color: 'text.secondary' }}>
                      {formatDate(entry.date)}
                    </TableCell>
                    <TableCell>
                      <Chip label={entry.project} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip label={entry.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 280 }}>
                      <Typography variant="body2" noWrap title={entry.title}>
                        {entry.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                      <Tooltip title="Ver detalle">
                        <IconButton size="small" onClick={() => setViewEntry(entry)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteId(entry.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* View Detail Dialog */}
      <Dialog open={!!viewEntry} onClose={() => setViewEntry(null)} maxWidth="sm" fullWidth>
        {viewEntry && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {viewEntry.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Chip label={viewEntry.project} size="small" color="primary" variant="outlined" />
                <Chip label={viewEntry.category} size="small" variant="outlined" />
              </Stack>
            </DialogTitle>
            <DialogContent dividers>
              <Typography
                variant="subtitle2"
                sx={{ color: 'primary.main', fontWeight: 600 }}
                gutterBottom
              >
                Descripción ejecutiva
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {viewEntry.executiveSummary}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ color: 'primary.main', fontWeight: 600 }}
                gutterBottom
              >
                Detalle técnico
              </Typography>
              <List dense disablePadding sx={{ mb: 1 }}>
                {viewEntry.technicalDetails.map((detail, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <FiberManualRecordIcon sx={{ fontSize: 8 }} color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={detail}
                      slotProps={{ primary: { variant: 'body2' } }}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="subtitle2"
                sx={{ color: 'primary.main', fontWeight: 600 }}
                gutterBottom
              >
                Impacto generado
              </Typography>
              <List dense disablePadding sx={{ mb: 1 }}>
                {viewEntry.impact.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <FiberManualRecordIcon sx={{ fontSize: 8 }} color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      slotProps={{ primary: { variant: 'body2' } }}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="subtitle2"
                sx={{ color: 'text.secondary', fontWeight: 600 }}
                gutterBottom
              >
                Actividad original
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                {viewEntry.activity}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewEntry(null)}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta entrada? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
