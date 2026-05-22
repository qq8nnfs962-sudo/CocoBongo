import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

export function getContrastColor(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export function generateDesignSystemMd(design: any, pages: string[]) {
  return `# ${design.name} Design System

## Style
${design.style}

## Color Palette
- Primary: ${design.primaryColor}
- Secondary: ${design.secondaryColor}
- Accent: ${design.accentColor}
- Background: ${design.backgroundColor}
- Surface: ${design.surfaceColor}
- Text: ${design.textColor}

## Typography
- Heading: ${design.headingFont}
- Body: ${design.bodyFont}

## Pages
${pages.map((p: string) => `- ${p}`).join('\n')}
`;
}
