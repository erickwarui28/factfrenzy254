import { useEffect, useState } from 'react';

export type TransitionDirection = 'left' | 'right' | 'up' | 'down' | 'fade' | 'scale';

interface UsePageTransitionProps {
  currentState: string;
  previousState?: string;
  duration?: number;
}

export const usePageTransition = ({
  currentState,
  previousState,
  duration = 400,
}: UsePageTransitionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');

  useEffect(() => {
    if (previousState && previousState !== currentState) {
      setIsTransitioning(true);
      
      // Determine transition direction based on state flow
      const transitionDirection = getTransitionDirection(previousState, currentState);
      setTransitionClass(getTransitionClass(transitionDirection, 'enter'));

      // Reset transition after duration
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setTransitionClass('');
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [currentState, previousState, duration]);

  return {
    isTransitioning,
    transitionClass,
  };
};

const getTransitionDirection = (from: string, to: string): TransitionDirection => {
  // Define the flow of states
  const stateFlow = ['welcome', 'question', 'reveal', 'results'];
  const fromIndex = stateFlow.indexOf(from);
  const toIndex = stateFlow.indexOf(to);

  if (fromIndex === -1 || toIndex === -1) {
    return 'fade';
  }

  if (toIndex > fromIndex) {
    return 'left'; // Moving forward
  } else if (toIndex < fromIndex) {
    return 'right'; // Moving backward
  }

  return 'fade';
};

const getTransitionClass = (direction: TransitionDirection, phase: 'enter' | 'exit'): string => {
  const classMap = {
    left: phase === 'enter' ? 'page-slide-left-enter' : 'page-slide-left-exit',
    right: phase === 'enter' ? 'page-slide-right-enter' : 'page-slide-right-exit',
    up: phase === 'enter' ? 'state-enter' : 'state-exit',
    down: phase === 'enter' ? 'state-enter-from-right' : 'state-exit-to-right',
    fade: phase === 'enter' ? 'page-fade-enter' : 'page-fade-exit',
    scale: phase === 'enter' ? 'animate-scale-in' : 'animate-scale-out',
  };

  return classMap[direction] || 'page-transition-enter';
};

// Hook for managing staggered animations
export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (visibleItems < itemCount) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [visibleItems, itemCount, delay]);

  const reset = () => setVisibleItems(0);

  return {
    visibleItems,
    reset,
    isItemVisible: (index: number) => index < visibleItems,
  };
};

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};