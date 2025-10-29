/**
 * Design System Exports
 * Central export point for all design system utilities and tokens
 */

// Design tokens and utilities
export * from './design-system';
export * from './theme-utils';

// Re-export commonly used utilities with shorter names
export {
  designTokens as tokens,
  getColor,
  getFontSize,
  getSpacing,
  getShadow,
  colorVar,
  spacingVar,
  shadowVar,
} from './design-system';

export {
  themeManager,
  setTheme,
  getTheme,
  getEffectiveTheme,
  subscribeToThemeChanges,
  setCSSCustomProperty,
  getCSSCustomProperty,
  updatePrimaryColor,
  prefersReducedMotion,
  prefersHighContrast,
} from './theme-utils';