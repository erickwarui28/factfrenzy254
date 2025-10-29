import { useEffect, useRef, useCallback, useState } from 'react';
import { 
  AnimationPerformanceMonitor, 
  optimizeForPerformance, 
  optimizeAnimationElement, 
  cleanupAnimationElement 
} from '../utils/performance';
import { prefersReducedMotion } from '../utils/accessibility';

interface UseAnimationPerformanceOptions {
  monitorFps?: boolean;
  optimizeElements?: boolean;
  respectMotionPreferences?: boolean;
}

export const useAnimationPerformance = (options: UseAnimationPerformanceOptions = {}) => {
  const {
    monitorFps = false,
    optimizeElements = true,
    respectMotionPreferences = true
  } = options;

  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  
  const monitorRef = useRef<AnimationPerformanceMonitor | null>(null);
  const optimizedElementsRef = useRef<Set<HTMLElement>>(new Set());

  // Initialize performance monitoring
  useEffect(() => {
    const performanceInfo = optimizeForPerformance();
    setShouldReduceAnimations(
      respectMotionPreferences && (performanceInfo.shouldReduceAnimations || prefersReducedMotion())
    );

    if (monitorFps) {
      monitorRef.current = new AnimationPerformanceMonitor();
      
      const unsubscribe = monitorRef.current.onFpsUpdate((currentFps) => {
        setFps(currentFps);
        setIsLowPerformance(currentFps < 30);
      });

      monitorRef.current.start();

      return () => {
        unsubscribe();
        monitorRef.current?.stop();
      };
    }
  }, [monitorFps, respectMotionPreferences]);

  // Optimize element for animations
  const optimizeElement = useCallback((element: HTMLElement | null) => {
    if (!element || !optimizeElements || shouldReduceAnimations) return;

    optimizeAnimationElement(element);
    optimizedElementsRef.current.add(element);
  }, [optimizeElements, shouldReduceAnimations]);

  // Cleanup element optimization
  const cleanupElement = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    cleanupAnimationElement(element);
    optimizedElementsRef.current.delete(element);
  }, []);

  // Cleanup all optimized elements on unmount
  useEffect(() => {
    return () => {
      optimizedElementsRef.current.forEach(cleanupElement);
      optimizedElementsRef.current.clear();
    };
  }, [cleanupElement]);

  // Get animation classes based on performance
  const getAnimationClasses = useCallback((baseClasses: string, fallbackClasses?: string) => {
    if (shouldReduceAnimations || isLowPerformance) {
      return fallbackClasses || '';
    }
    return baseClasses;
  }, [shouldReduceAnimations, isLowPerformance]);

  // Get transition duration based on performance
  const getTransitionDuration = useCallback((duration: number) => {
    if (shouldReduceAnimations) return 0;
    if (isLowPerformance) return Math.min(duration, 150); // Cap at 150ms for low performance
    return duration;
  }, [shouldReduceAnimations, isLowPerformance]);

  // Check if animations should be enabled
  const shouldAnimate = useCallback(() => {
    return !shouldReduceAnimations && !isLowPerformance;
  }, [shouldReduceAnimations, isLowPerformance]);

  return {
    // Performance state
    fps,
    isLowPerformance,
    shouldReduceAnimations,
    
    // Element optimization
    optimizeElement,
    cleanupElement,
    
    // Animation helpers
    getAnimationClasses,
    getTransitionDuration,
    shouldAnimate,
  };
};

// Hook for managing staggered animations with performance awareness
export const usePerformanceAwareStagger = (
  itemCount: number,
  baseDelay: number = 100,
  maxItems: number = 10
) => {
  const { shouldReduceAnimations, isLowPerformance } = useAnimationPerformance();
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (shouldReduceAnimations) {
      // Show all items immediately if animations are disabled
      setVisibleItems(itemCount);
      return;
    }

    // Limit stagger for performance on low-end devices
    const effectiveItemCount = isLowPerformance ? Math.min(itemCount, maxItems) : itemCount;
    const effectiveDelay = isLowPerformance ? Math.min(baseDelay, 50) : baseDelay;

    let currentItem = 0;
    const interval = setInterval(() => {
      currentItem++;
      setVisibleItems(currentItem);
      
      if (currentItem >= effectiveItemCount) {
        clearInterval(interval);
      }
    }, effectiveDelay);

    return () => clearInterval(interval);
  }, [itemCount, baseDelay, shouldReduceAnimations, isLowPerformance, maxItems]);

  const reset = useCallback(() => {
    setVisibleItems(0);
  }, []);

  return {
    visibleItems,
    reset,
    isComplete: visibleItems >= itemCount,
  };
};

// Hook for intersection-based animations with performance optimization
export const usePerformanceAwareIntersection = (
  callback: () => void,
  options?: IntersectionObserverInit
) => {
  const { shouldReduceAnimations } = useAnimationPerformance();
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    // If animations are disabled, trigger immediately
    if (shouldReduceAnimations) {
      callback();
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
            callback();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observerRef.current.observe(elementRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [callback, shouldReduceAnimations, options]);

  return elementRef;
};