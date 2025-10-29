/**
 * Performance configuration for build optimization
 */

export const performanceConfig = {
  // Bundle size budgets (in bytes)
  budgets: {
    css: 100 * 1024, // 100KB
    js: 200 * 1024,  // 200KB
    total: 300 * 1024, // 300KB
    images: 500 * 1024, // 500KB
  },

  // Performance thresholds
  thresholds: {
    fps: {
      good: 50,
      acceptable: 30,
      poor: 20,
    },
    loadTime: {
      good: 1500,      // 1.5s
      acceptable: 3000, // 3s
      poor: 5000,      // 5s
    },
    jankScore: {
      good: 5,         // 5%
      acceptable: 15,  // 15%
      poor: 30,        // 30%
    },
  },

  // Critical CSS selectors (above-the-fold)
  criticalCSS: [
    '.min-h-screen',
    '.bg-gradient-textured',
    '.card-splash',
    '.btn-cta',
    '.focus-ring',
    '.sr-only',
    '.mobile-padding',
    '.animate-scale-in',
    '.animate-fade-in',
    '.text-heading-1',
    '.text-heading-2',
    '.text-body',
    '.font-bold',
    '.font-semibold',
  ],

  // PurgeCSS safelist patterns
  purgeCSSPatterns: [
    /^animate-/,
    /^hover:/,
    /^focus:/,
    /^active:/,
    /^disabled:/,
    /^group-hover:/,
    /^sm:/,
    /^md:/,
    /^lg:/,
    /^xl:/,
    /^2xl:/,
    /^bg-morph-/,
    /^timer-progress-/,
    /^confetti-particle-/,
    /^parallax-/,
  ],

  // Animation optimization settings
  animations: {
    // Disable heavy animations on low-end devices
    disableOnLowEnd: [
      'parallax-slow',
      'parallax-medium',
      'parallax-fast',
      'animate-confetti',
      'animate-sparkle',
    ],
    
    // Reduce animation duration on low-end devices
    reduceDurationOnLowEnd: {
      'animate-fade-in': 150,
      'animate-slide-up': 200,
      'animate-scale-in': 150,
      'animate-bounce-in': 300,
    },
    
    // Force hardware acceleration for these animations
    forceGPUAcceleration: [
      'animate-float',
      'animate-wiggle',
      'btn-cta',
      'answer-button',
      'card-interactive',
    ],
  },

  // Accessibility settings
  accessibility: {
    // Minimum contrast ratios (WCAG 2.1 AA)
    contrastRatios: {
      normal: 4.5,
      large: 3.0,
      aaa: 7.0,
    },
    
    // Minimum touch target sizes
    touchTargets: {
      minimum: 44, // 44px minimum
      recommended: 48, // 48px recommended
    },
    
    // Focus ring settings
    focusRing: {
      width: 2,
      offset: 2,
      color: '#ff4500', // Primary color
    },
  },

  // Development settings
  development: {
    enablePerformanceMonitor: true,
    enableBundleAnalysis: true,
    enableAccessibilityChecks: true,
    logPerformanceMetrics: true,
  },

  // Production settings
  production: {
    enablePerformanceMonitor: false,
    enableBundleAnalysis: false,
    enableAccessibilityChecks: false,
    logPerformanceMetrics: false,
    
    // Optimization flags
    minifyCSS: true,
    minifyJS: true,
    treeshakeCSS: true,
    compressImages: true,
  },
};

// Environment-specific configuration
export const getPerformanceConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const baseConfig = performanceConfig;
  
  return {
    ...baseConfig,
    ...(isDevelopment ? baseConfig.development : baseConfig.production),
  };
};

// Performance budget validation
export const validatePerformanceBudget = (metrics: {
  bundleSize: number;
  loadTime: number;
  fps: number;
  jankScore: number;
}) => {
  const config = getPerformanceConfig();
  const violations: string[] = [];

  if (metrics.bundleSize > config.budgets.total) {
    violations.push(`Bundle size exceeds budget: ${(metrics.bundleSize / 1024).toFixed(2)}KB > ${(config.budgets.total / 1024).toFixed(2)}KB`);
  }

  if (metrics.loadTime > config.thresholds.loadTime.acceptable) {
    violations.push(`Load time exceeds threshold: ${metrics.loadTime}ms > ${config.thresholds.loadTime.acceptable}ms`);
  }

  if (metrics.fps < config.thresholds.fps.acceptable) {
    violations.push(`FPS below threshold: ${metrics.fps} < ${config.thresholds.fps.acceptable}`);
  }

  if (metrics.jankScore > config.thresholds.jankScore.acceptable) {
    violations.push(`Jank score exceeds threshold: ${metrics.jankScore}% > ${config.thresholds.jankScore.acceptable}%`);
  }

  return {
    passed: violations.length === 0,
    violations,
    score: calculatePerformanceScore(metrics, config),
  };
};

// Calculate overall performance score (0-100)
const calculatePerformanceScore = (metrics: any, config: any): number => {
  let score = 100;

  // Bundle size score (25% weight)
  const bundleRatio = metrics.bundleSize / config.budgets.total;
  score -= Math.max(0, (bundleRatio - 1) * 25);

  // Load time score (25% weight)
  const loadTimeRatio = metrics.loadTime / config.thresholds.loadTime.good;
  score -= Math.max(0, (loadTimeRatio - 1) * 25);

  // FPS score (25% weight)
  const fpsRatio = config.thresholds.fps.good / metrics.fps;
  score -= Math.max(0, (fpsRatio - 1) * 25);

  // Jank score (25% weight)
  const jankRatio = metrics.jankScore / config.thresholds.jankScore.good;
  score -= Math.max(0, (jankRatio - 1) * 25);

  return Math.max(0, Math.round(score));
};