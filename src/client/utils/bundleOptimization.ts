/**
 * Bundle size optimization and performance testing utilities
 */

// CSS optimization utilities
export const optimizeCSSBundle = () => {
  // Remove unused CSS classes (development helper)
  if (process.env.NODE_ENV === 'development') {
    const usedClasses = new Set<string>();
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      element.classList.forEach(className => {
        usedClasses.add(className);
      });
    });

    console.log(`Used CSS classes: ${usedClasses.size}`);
    console.log('Used classes:', Array.from(usedClasses).sort());
  }
};

// Critical CSS extraction
export const extractCriticalCSS = (): string[] => {
  const criticalSelectors = [
    // Above-the-fold elements
    '.btn-cta',
    '.card-splash',
    '.mobile-padding',
    '.focus-ring',
    '.sr-only',
    
    // Essential animations
    '.animate-fade-in',
    '.animate-scale-in',
    '.animate-slide-up',
    
    // Core layout
    '.min-h-screen',
    '.flex',
    '.grid',
    '.relative',
    '.absolute',
    
    // Typography
    '.text-heading-1',
    '.text-heading-2',
    '.text-body',
    '.font-bold',
    '.font-semibold',
    
    // Colors
    '.bg-primary-500',
    '.text-white',
    '.text-neutral-900',
    '.text-neutral-600',
  ];

  return criticalSelectors;
};

// Performance testing suite
export interface PerformanceTestResults {
  bundleSize: {
    css: number;
    js: number;
    total: number;
  };
  loadTime: {
    domContentLoaded: number;
    fullyLoaded: number;
  };
  animation: {
    averageFps: number;
    frameDrops: number;
    jankScore: number;
  };
  accessibility: {
    contrastIssues: number;
    focusableElements: number;
    ariaLabels: number;
  };
}

export class PerformanceTester {
  private results: Partial<PerformanceTestResults> = {};

  async runFullTest(): Promise<PerformanceTestResults> {
    console.log('🚀 Starting performance test suite...');
    
    await this.testBundleSize();
    await this.testLoadTime();
    await this.testAnimationPerformance();
    await this.testAccessibility();
    
    console.log('✅ Performance test completed');
    return this.results as PerformanceTestResults;
  }

  private async testBundleSize(): Promise<void> {
    console.log('📦 Testing bundle size...');
    
    const stylesheets = Array.from(document.styleSheets);
    let totalCSSSize = 0;
    
    for (const sheet of stylesheets) {
      if (sheet.href && sheet.href.includes(window.location.origin)) {
        try {
          const response = await fetch(sheet.href);
          const css = await response.text();
          const size = new Blob([css]).size;
          totalCSSSize += size;
        } catch (e) {
          console.warn('Could not fetch stylesheet:', sheet.href);
        }
      }
    }

    // Estimate JS bundle size from script tags
    const scripts = Array.from(document.scripts);
    let totalJSSize = 0;
    
    for (const script of scripts) {
      if (script.src && script.src.includes(window.location.origin)) {
        try {
          const response = await fetch(script.src);
          const js = await response.text();
          const size = new Blob([js]).size;
          totalJSSize += size;
        } catch (e) {
          console.warn('Could not fetch script:', script.src);
        }
      }
    }

    this.results.bundleSize = {
      css: totalCSSSize,
      js: totalJSSize,
      total: totalCSSSize + totalJSSize,
    };

    console.log(`CSS Bundle: ${(totalCSSSize / 1024).toFixed(2)}KB`);
    console.log(`JS Bundle: ${(totalJSSize / 1024).toFixed(2)}KB`);
    console.log(`Total Bundle: ${((totalCSSSize + totalJSSize) / 1024).toFixed(2)}KB`);
  }

  private async testLoadTime(): Promise<void> {
    console.log('⏱️ Testing load time...');
    
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    this.results.loadTime = {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      fullyLoaded: navigation.loadEventEnd - navigation.fetchStart,
    };

    console.log(`DOM Content Loaded: ${this.results.loadTime.domContentLoaded}ms`);
    console.log(`Fully Loaded: ${this.results.loadTime.fullyLoaded}ms`);
  }

  private async testAnimationPerformance(): Promise<void> {
    console.log('🎬 Testing animation performance...');
    
    return new Promise((resolve) => {
      let frameCount = 0;
      let totalFrameTime = 0;
      let frameDrops = 0;
      let lastFrameTime = performance.now();
      const testDuration = 3000; // 3 seconds
      const startTime = performance.now();

      const measureFrame = () => {
        const currentTime = performance.now();
        const frameTime = currentTime - lastFrameTime;
        
        frameCount++;
        totalFrameTime += frameTime;
        
        // Count frame drops (frames taking longer than 16.67ms for 60fps)
        if (frameTime > 16.67) {
          frameDrops++;
        }
        
        lastFrameTime = currentTime;
        
        if (currentTime - startTime < testDuration) {
          requestAnimationFrame(measureFrame);
        } else {
          const averageFps = 1000 / (totalFrameTime / frameCount);
          const jankScore = (frameDrops / frameCount) * 100;
          
          this.results.animation = {
            averageFps: Math.round(averageFps),
            frameDrops,
            jankScore: Math.round(jankScore),
          };

          console.log(`Average FPS: ${this.results.animation.averageFps}`);
          console.log(`Frame Drops: ${frameDrops}`);
          console.log(`Jank Score: ${jankScore.toFixed(2)}%`);
          
          resolve();
        }
      };

      requestAnimationFrame(measureFrame);
    });
  }

  private async testAccessibility(): Promise<void> {
    console.log('♿ Testing accessibility...');
    
    // Test color contrast issues
    const contrastIssues = this.checkColorContrast();
    
    // Count focusable elements
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).length;
    
    // Count ARIA labels
    const ariaLabels = document.querySelectorAll('[aria-label], [aria-labelledby]').length;
    
    this.results.accessibility = {
      contrastIssues,
      focusableElements,
      ariaLabels,
    };

    console.log(`Contrast Issues: ${contrastIssues}`);
    console.log(`Focusable Elements: ${focusableElements}`);
    console.log(`ARIA Labels: ${ariaLabels}`);
  }

  private checkColorContrast(): number {
    // Simplified contrast checking - in a real implementation,
    // you'd use a more comprehensive tool like axe-core
    const elementsToCheck = document.querySelectorAll('button, a, .text-neutral-600, .text-neutral-500');
    let issues = 0;
    
    elementsToCheck.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Simple heuristic - check if colors are too similar
      if (color === backgroundColor) {
        issues++;
      }
    });
    
    return issues;
  }
}

// Bundle size monitoring
export const monitorBundleSize = () => {
  if (process.env.NODE_ENV !== 'production') {
    const tester = new PerformanceTester();
    tester.runFullTest().then(results => {
      console.table(results);
      
      // Warn about large bundles
      if (results.bundleSize.total > 500 * 1024) { // 500KB
        console.warn('⚠️ Bundle size is large (>500KB). Consider code splitting or optimization.');
      }
      
      // Warn about poor performance
      if (results.animation.averageFps < 30) {
        console.warn('⚠️ Low FPS detected. Consider reducing animations or optimizing performance.');
      }
      
      // Warn about accessibility issues
      if (results.accessibility.contrastIssues > 0) {
        console.warn('⚠️ Color contrast issues detected. Check WCAG compliance.');
      }
    });
  }
};

// CSS purging utility (for build process)
export const generatePurgeCSSSafelist = (): (string | RegExp)[] => {
  return [
    // Dynamic classes that might not be detected
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
    
    // State classes
    'sr-only',
    'focus-ring',
    'focus-ring-inset',
    'skip-link',
    
    // Animation states
    'animate-fade-in',
    'animate-slide-up',
    'animate-scale-in',
    'animate-bounce-in',
    'animate-celebration',
    'animate-confetti',
    'animate-sparkle',
    'animate-float',
    'animate-wiggle',
    
    // Performance classes
    'parallax-bg',
    'parallax-slow',
    'parallax-medium',
    'parallax-fast',
    'animate-optimized',
    
    // Accessibility classes
    'btn-touch',
    'touch-zone',
    'mobile-padding',
    'mobile-margin',
    'mobile-text-scale',
    'mobile-heading-scale',
  ];
};

// Performance budget checker
export const checkPerformanceBudget = (results: PerformanceTestResults) => {
  const budgets = {
    bundleSize: 300 * 1024, // 300KB
    loadTime: 3000, // 3 seconds
    fps: 30, // minimum FPS
    jankScore: 10, // maximum jank percentage
  };

  const violations: string[] = [];

  if (results.bundleSize.total > budgets.bundleSize) {
    violations.push(`Bundle size exceeds budget: ${(results.bundleSize.total / 1024).toFixed(2)}KB > ${(budgets.bundleSize / 1024).toFixed(2)}KB`);
  }

  if (results.loadTime.fullyLoaded > budgets.loadTime) {
    violations.push(`Load time exceeds budget: ${results.loadTime.fullyLoaded}ms > ${budgets.loadTime}ms`);
  }

  if (results.animation.averageFps < budgets.fps) {
    violations.push(`FPS below budget: ${results.animation.averageFps} < ${budgets.fps}`);
  }

  if (results.animation.jankScore > budgets.jankScore) {
    violations.push(`Jank score exceeds budget: ${results.animation.jankScore}% > ${budgets.jankScore}%`);
  }

  return {
    passed: violations.length === 0,
    violations,
  };
};