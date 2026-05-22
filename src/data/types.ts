export interface Style {
  id: string;
  name: string;
  description: string;
  tags: string;
  use_cases: string;
  vibe: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  description: string;
  mood: string;
}

export interface Typography {
  id: string;
  heading_font: string;
  body_font: string;
  description: string;
  style_tags: string;
  google_fonts_url: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  recommended_styles: string;
  recommended_palettes: string;
}

export interface UXGuideline {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  tags: string;
}

export interface ChartType {
  id: string;
  name: string;
  description: string;
  use_case: string;
  libraries: string;
  complexity: string;
}
