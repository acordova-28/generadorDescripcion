import {
  AppBar,
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryIcon from '@mui/icons-material/History';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ConfigDialog } from './components/ConfigDialog/ConfigDialog';
import { GeneratorPage } from './pages/GeneratorPage';
import { HistoryPage } from './pages/HistoryPage';
import { STORAGE_KEYS } from './constants';
import { useHistory } from './hooks/useHistory';
import { storageGetString, storageSetString } from './services/storage.service';

export default function App() {
  const [tab, setTab] = useState(0);
  const [apiKey, setApiKey] = useState(() => storageGetString(STORAGE_KEYS.API_KEY));
  const [configOpen, setConfigOpen] = useState(() => !storageGetString(STORAGE_KEYS.API_KEY));

  const { history, addEntry, removeEntry } = useHistory();

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    storageSetString(STORAGE_KEYS.API_KEY, key);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <AutoStoriesIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Generador de Descripciones
          </Typography>
          {!apiKey && (
            <Tooltip title="API Key no configurada">
              <WarningAmberIcon sx={{ color: 'warning.light', mr: 1 }} />
            </Tooltip>
          )}
          <Tooltip title="Configurar API Key de Claude">
            <IconButton color="inherit" onClick={() => setConfigOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Tabs
          value={tab}
          onChange={(_, v: number) => setTab(v)}
          sx={{ px: 2, '& .MuiTab-root': { minHeight: 48 } }}
        >
          <Tab
            icon={<AutoStoriesIcon fontSize="small" />}
            iconPosition="start"
            label="Generador"
          />
          <Tab
            icon={<HistoryIcon fontSize="small" />}
            iconPosition="start"
            label={`Historial${history.length > 0 ? ` (${history.length})` : ''}`}
          />
        </Tabs>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {/* Both pages stay mounted to preserve state across tab switches */}
        <Box sx={{ display: tab === 0 ? 'block' : 'none' }}>
          <GeneratorPage
            apiKey={apiKey}
            onAddEntry={addEntry}
            onOpenConfig={() => setConfigOpen(true)}
          />
        </Box>
        <Box sx={{ display: tab === 1 ? 'block' : 'none' }}>
          <HistoryPage history={history} onDeleteEntry={removeEntry} />
        </Box>
      </Container>

      <ConfigDialog
        open={configOpen}
        currentKey={apiKey}
        onSave={handleSaveKey}
        onClose={() => setConfigOpen(false)}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { borderRadius: 8, fontFamily: 'inherit' },
        }}
      />
    </Box>
  );
}
