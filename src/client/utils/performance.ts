/**
 * Performance monitoring and optimization utilities
 */

// Animation performance monitoring
export class AnimationPerformanceMonitor {
  private frameCount = 0;
  private lastTime = 0;
  private fps = 0;
  private isMonitoring = false;
  private animationId: number | null = null;
  private callbacks: ((fps: number) => void)[] = [];

  start(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.tick();
  }

  stop(): void {
    this.isMonitoring = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  onFpsUpdate(callback: (fps: number) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  getCurrentFps(): number {
    return this.fps;
  }

  private tick = (): void => {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frameCount++;

    // Calculate FPS every second
    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      // Notify callbacks
      this.callbacks.forEach(callback => callback(this.fps));
    }

    this.animationId = requestAnimationFrame(this.tick);
  };
}

// Performance optimization utilities
export const optimizeForPerformance = () => {
  // Check if device supports hardware acceleration
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const hasHardwareAcceleration = !!gl;

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory || 4; // Default to 4GB
  const isLowEndDevice = deviceMemory < 4;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    hasHardwareAcceleration,
    isLowEndDevice,
    prefersReducedMotion,
    shouldReduceAnimations: isLowEndDevice || prefersReducedMotion,
    shouldUseGPUAcceleration: hasHardwareAcceleration && !isLowEndDevice,
  };
};

// CSS animation optimization
export const optimizeAnimationElement = (element: HTMLElement): void => {
  if (!element) return;

  const { shouldUseGPUAcceleration } = optimizeForPerformance();

  if (shouldUseGPUAcceleration) {
    // Force hardware acceleration
    element.style.transform = element.style.transform || 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
  }

  // Set will-change for animating elements
  element.style.willChange = 'transform, opacity';
};

// Remove optimization when animation completes
export const cleanupAnimationElement = (element: HTMLElement): void => {
  if (!element) return;

  element.style.willChange = 'auto';
};

// Debounced resize handler for performance
export const createOptimizedResizeHandler = (
  callback: () => void,
  delay = 100
): (() => void) => {
  let timeoutId: number;
  let rafId: number;

  const handler = () => {
    clearTimeout(timeoutId);
    cancelAnimationFrame(rafId);

    timeoutId = window.setTimeout(() => {
      rafId = requestAnimationFrame(callback);
    }, delay);
  };

  return handler;
};

// Intersection Observer for performance-aware animations
export const createPerformanceAwareIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const { shouldReduceAnimations } = optimizeForPerformance();

  // If animations should be reduced, use a simpler callback
  const optimizedCallback = shouldReduceAnimations
    ? (entries: IntersectionObserverEntry[]) => {
        // Only trigger for elements entering viewport
        const enteringEntries = entries.filter(entry => entry.isIntersecting);
        if (enteringEntries.length > 0) {
          callback(enteringEntries);
        }
      }
    : callback;

  return new IntersectionObserver(optimizedCallback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Bundle size monitoring (development only)
export const logBundleSize = (): void => {
  if (process.env.NODE_ENV !== 'development') return;

  // Monitor CSS bundle size
  const stylesheets = Array.from(document.styleSheets);
  let totalCSSSize = 0;

  stylesheets.forEach(sheet => {
    try {
      if (sheet.href) {
        fetch(sheet.href)
          .then(response => response.text())
          .then(css => {
            const size = new Blob([css]).size;
            totalCSSSize += size;
            console.log(`CSS Bundle: ${sheet.href} - ${(size / 1024).toFixed(2)}KB`);
          });
      }
    } catch (e) {
      // Ignore CORS errors for external stylesheets
    }
  });

  // Log total after a delay to allow all fetches to complete
  setTimeout(() => {
    console.log(`Total CSS Bundle Size: ${(totalCSSSize / 1024).toFixed(2)}KB`);
  }, 1000);
};

// Performance metrics collection
export interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  animationCount: number;
  bundleSize?: number;
}

export const collectPerformanceMetrics = (): PerformanceMetrics => {
  const monitor = new AnimationPerformanceMonitor();
  monitor.start();

  // Get memory usage if available
  const memoryInfo = (performance as any).memory;
  const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : undefined;

  // Count active animations
  const animatedElements = document.querySelectorAll('[style*="animation"], [class*="animate-"]');
  const animationCount = animatedElements.length;

  setTimeout(() => monitor.stop(), 1000);

  return {
    fps: monitor.getCurrentFps(),
    memoryUsage: memoryUsage || 0,
    animationCount,
  };
};

// Throttled scroll handler for performance
export const createThrottledScrollHandler = (
  callback: () => void,
  limit = 16 // ~60fps
): (() => void) => {
  let inThrottle = false;

  return () => {
    if (!inThrottle) {
      requestAnimationFrame(() => {
        callback();
        inThrottle = false;
      });
      inThrottle = true;
    }
  };
};