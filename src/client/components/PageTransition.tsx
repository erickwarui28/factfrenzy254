import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
  className?: string;
  duration?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  transitionKey,
  className = '',
  duration = 400,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentKey, setCurrentKey] = useState(transitionKey);

  useEffect(() => {
    if (transitionKey !== currentKey) {
      // Start exit animation
      setIsVisible(false);
      
      // After exit animation, update content and start enter animation
      const timer = setTimeout(() => {
        setCurrentKey(transitionKey);
        setIsVisible(true);
      }, duration / 2);

      return () => clearTimeout(timer);
    }
  }, [transitionKey, currentKey, duration]);

  return (
    <div
      className={`transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 transform translate-y-0 scale-100' 
          : 'opacity-0 transform translate-y-4 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface SlideTransitionProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'up' | 'down';
  isVisible: boolean;
  className?: string;
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  direction,
  isVisible,
  className = '',
}) => {
  const getTransformClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0';
    
    switch (direction) {
      case 'left':
        return '-translate-x-full';
      case 'right':
        return 'translate-x-full';
      case 'up':
        return '-translate-y-full';
      case 'down':
        return 'translate-y-full';
      default:
        return 'translate-x-0';
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transform ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};

interface FadeTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  delay?: number;
  className?: string;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  isVisible,
  delay = 0,
  className = '',
}) => {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 transform translate-y-0 scale-100' 
          : 'opacity-0 transform translate-y-2 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface ScaleTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  scale?: number;
  className?: string;
}

export const ScaleTransition: React.FC<ScaleTransitionProps> = ({
  children,
  isVisible,
  scale = 0.8,
  className = '',
}) => {
  return (
    <div
      className={`transition-all duration-400 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transform ${
        isVisible ? 'scale-100' : `scale-${Math.round(scale * 100)}`
      } ${className}`}
    >
      {children}
    </div>
  );
};