import type { Category, Project } from '../types';

export const PROJECTS: Project[] = [
  'Wuolla',
  'SystemBIO',
  'Admin Portal',
  'Ecommerce',
  'Liquidaciones ATS',
  'Control Gavetas',
  'Odoo',
  'Otro',
];

export const CATEGORIES: Category[] = [
  'Frontend',
  'Backend',
  'Base de Datos',
  'Integración',
  'QA',
  'Análisis',
  'General',
  'Reunión',
];

export const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  Frontend: [
    'pantalla', 'interfaz', 'ui', 'componente', 'vista', 'modal', 'botón',
    'formulario', 'diseño', 'layout', 'css', 'html', 'react', 'logo', 'imagen',
    'color', 'estilo', 'menú', 'página', 'banner', 'card', 'header', 'footer',
    'sidebar', 'icono', 'tooltip', 'detalle', 'orden', 'listado', 'tabla visual',
  ],
  Backend: [
    'endpoint', 'api', 'servicio', 'controller', 'service', 'middleware',
    'ruta', 'función', 'lógica', 'request', 'response', 'autenticación',
    'token', 'jwt', 'servidor', 'node', 'express', 'nestjs', 'método',
  ],
  'Base de Datos': [
    'query', 'tabla', 'campo', 'migración', 'índice', 'consulta',
    'base de datos', 'sql', 'db', 'registro', 'columna', 'relación',
    'stored', 'procedure', 'trigger', 'schema', 'foreign key',
  ],
  'Integración': [
    'integración', 'webhook', 'tercero', 'externo', 'conector', 'sync',
    'sincronización', 'conexión', 'proveedor', 'servicio externo', 'api externa',
  ],
  QA: [
    'prueba', 'test', 'bug', 'error', 'validación', 'qa', 'testing',
    'caso de prueba', 'regresión', 'defecto', 'fix', 'corrección', 'incidencia',
  ],
  'Análisis': [
    'análisis', 'reporte', 'informe', 'revisión', 'investigación',
    'documentación', 'levantamiento', 'mapeo', 'diagrama', 'requerimiento',
  ],
  General: [
    'general', 'tarea', 'actividad', 'soporte', 'configuración', 'despliegue',
    'deploy', 'entrega', 'seguimiento', 'monitoreo',
  ],
  Reunión: [
    'reunión', 'reunion', 'meeting', 'llamada', 'call', 'demo', 'presentación',
    'capacitación', 'taller', 'workshop', 'daily', 'standup', 'retrospectiva',
    'planning', 'sprint', 'revisión de sprint',
  ],
};

export const STORAGE_KEYS = {
  API_KEY: 'ANTHROPIC_API_KEY',
  HISTORY: 'description_history',
} as const;
