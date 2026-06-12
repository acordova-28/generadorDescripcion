import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react';

interface ConfigDialogProps {
  open: boolean;
  currentKey: string;
  onSave: (key: string) => void;
  onClose: () => void;
}

export function ConfigDialog({ open, currentKey, onSave, onClose }: ConfigDialogProps) {
  const [key, setKey] = useState(currentKey);

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Configuración de API Key</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Ingresa tu API Key de Claude (Anthropic). Se almacenará localmente en tu navegador.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label="Claude API Key"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-ant-..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={!key.trim()}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
