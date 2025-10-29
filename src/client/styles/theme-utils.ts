/**
 * Theme utilities for dynamic theming support
 * Provides functions to manage theme switching and CSS custom property updates
 */

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor?: string;
  customColors?: Record<string, string>;
}

class ThemeManager {
  private currentTheme: ThemeMode = 'auto';
  private mediaQuery: MediaQueryList;
  private listeners: Set<(theme: ThemeMode) => void> = new Set();

  constructor() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      this.currentTheme = savedTheme;
    }
    
    this.applyTheme();
  }

  private handleSystemThemeChange = (): void => {
    if (this.currentTheme === 'auto') {
      this.applyTheme();
    }
  };

  private applyTheme(): void {
    const root = document.documentElement;
    const isDark = this.getEffectiveTheme() === 'dark';
    
    // Update data attribute for CSS targeting
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Update class for Tailwind dark mode
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(this.getEffectiveTheme()));
  }

  public setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  public getTheme(): ThemeMode {
    return this.currentTheme;
  }

  public getEffectiveTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'auto') {
      return this.mediaQuery.matches ? 'dark' : 'light';
    }
    return this.currentTheme as 'light' | 'dark';
  }

  public subscribe(listener: (theme: ThemeMode) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public updateCustomProperty(property: string, value: string): void {
    document.documentElement.style.setProperty(`--${property}`, value);
  }

  public updateColorScale(colorName: string, colorScale: Record<string, string>): void {
    Object.entries(colorScale).forEach(([shade, value]) => {
      this.updateCustomProperty(`color-${colorName}-${shade}`, value);
    });
  }

  public resetCustomProperties(): void {
    const root = document.documentElement;
    
    // Remove any custom properties that were set programmatically
    Array.from(root.style).forEach(property => {
      if (property.startsWith('--')) {
        root.style.removeProperty(property);
      }
    });
  }
}

// Singleton instance
export const themeManager = new ThemeManager();

// Utility functions for theme management
export const setTheme = (theme: ThemeMode): void => {
  themeManager.setTheme(theme);
};

export const getTheme = (): ThemeMode => {
  return themeManager.getTheme();
};

export const getEffectiveTheme = (): 'light' | 'dark' => {
  return themeManager.getEffectiveTheme();
};

export const subscribeToThemeChanges = (listener: (theme: ThemeMode) => void): (() => void) => {
  return themeManager.subscribe(listener);
};

// CSS custom property utilities
export const setCSSCustomProperty = (property: string, value: string): void => {
  themeManager.updateCustomProperty(property, value);
};

export const getCSSCustomProperty = (property: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${property}`).trim();
};

// Color manipulation utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1] || '0', 16),
    g: parseInt(result[2] || '0', 16),
    b: parseInt(result[3] || '0', 16)
  } : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const lighten = (color: string, amount: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const { r, g, b } = rgb;
  const newR = Math.min(255, Math.round(r + (255 - r) * amount));
  const newG = Math.min(255, Math.round(g + (255 - g) * amount));
  const newB = Math.min(255, Math.round(b + (255 - b) * amount));
  
  return rgbToHex(newR, newG, newB);
};

export const darken = (color: string, amount: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const { r, g, b } = rgb;
  const newR = Math.max(0, Math.round(r * (1 - amount)));
  const newG = Math.max(0, Math.round(g * (1 - amount)));
  const newB = Math.max(0, Math.round(b * (1 - amount)));
  
  return rgbToHex(newR, newG, newB);
};

// Generate color scale from a base color
export const generateColorScale = (baseColor: string): Record<string, string> => {
  const scale: Record<string, string> = {};
  
  // Generate lighter shades (50-400)
  scale['50'] = lighten(baseColor, 0.95);
  scale['100'] = lighten(baseColor, 0.9);
  scale['200'] = lighten(baseColor, 0.75);
  scale['300'] = lighten(baseColor, 0.6);
  scale['400'] = lighten(baseColor, 0.3);
  
  // Base color (500)
  scale['500'] = baseColor;
  
  // Generate darker shades (600-950)
  scale['600'] = darken(baseColor, 0.1);
  scale['700'] = darken(baseColor, 0.25);
  scale['800'] = darken(baseColor, 0.4);
  scale['900'] = darken(baseColor, 0.55);
  scale['950'] = darken(baseColor, 0.7);
  
  return scale;
};

// Update primary color and generate new scale
export const updatePrimaryColor = (newColor: string): void => {
  const colorScale = generateColorScale(newColor);
  themeManager.updateColorScale('primary', colorScale);
};

// Reduced motion utilities
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const subscribeToMotionPreference = (listener: (reducedMotion: boolean) => void): (() => void) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = () => listener(mediaQuery.matches);
  
  mediaQuery.addEventListener('change', handler);
  
  return () => mediaQuery.removeEventListener('change', handler);
};

// High contrast utilities
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

export const subscribeToContrastPreference = (listener: (highContrast: boolean) => void): (() => void) => {
  const mediaQuery = window.matchMedia('(prefers-contrast: high)');
  const handler = () => listener(mediaQuery.matches);
  
  mediaQuery.addEventListener('change', handler);
  
  return () => mediaQuery.removeEventListener('change', handler);
};