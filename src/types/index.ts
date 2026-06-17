export type Project =
  | 'Wuolla'
  | 'SystemBIO'
  | 'Admin Portal'
  | 'Ecommerce'
  | 'Liquidaciones ATS'
  | 'Control Gavetas'
  | 'Odoo'
  | 'Otro';

export type Category =
  | 'Frontend'
  | 'Backend'
  | 'Base de Datos'
  | 'Integración'
  | 'QA'
  | 'Análisis'
  | 'General'
  | 'Reunión';

export interface GeneratedDescription {
  title: string;
  executiveSummary: string;
  technicalDetails: string[];
  impact: string[];
}

export interface HistoryEntry {
  id: string;
  date: string;
  project: Project;
  category: Category;
  activity: string;
  title: string;
  executiveSummary: string;
  technicalDetails: string[];
  impact: string[];
}
