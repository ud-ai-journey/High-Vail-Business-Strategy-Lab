export interface Project {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  bgColor: string;
  accentColor: string;
  stats: string[];
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  category: string;
  imageSeed: string; // for high-end CSS/SVG generation or beautiful canvas layouts
  videoUrl?: string;
}

export interface Metric {
  label: string;
  value: string;
  targetValue: number;
  suffix: string;
}

export interface Service {
  name: string;
  description: string;
  category: 'strategy' | 'creative' | 'digital' | 'operations';
}

export interface ComparisonRow {
  aspect: string;
  traditional: string;
  highVail: string;
}
