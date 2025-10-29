import { useEffect, useRef, useCallback, useState } from 'react';
import { 
  announceToScreenReader, 
  prefersReducedMotion, 
  prefersHighContrast,
  subscribeToMotionPreference,
  subscribeToContrastPreference,
  generateId
} from '../utils/accessibility';

interface UseAccessibilityOptions {
  announceStateChanges?: boolean;
  manageFocus?: boolean;
  respectMotionPreferences?: boolean;
}

export const useAccessibility = (options: UseAccessibilityOptions = {}) => {
  const {
    announceStateChanges = true,
    manageFocus = true,
    respectMotionPreferences = true
  } = options;

  const focusRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Motion and contrast preferences
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [highContrast, setHighContrast] = useState(prefersHighContrast);

  // Subscribe to user preferences
  useEffect(() => {
    if (!respectMotionPreferences) return;

    const unsubscribeMotion = subscribeToMotionPreference(setReducedMotion);
    const unsubscribeContrast = subscribeToContrastPreference(setHighContrast);

    return () => {
      unsubscribeMotion();
      unsubscribeContrast();
    };
  }, [respectMotionPreferences]);

  // Focus management
  const setFocus = useCallback((element?: HTMLElement | null) => {
    if (!manageFocus) return;
    
    if (element) {
      // Store previous focus for restoration
      previousFocusRef.current = document.activeElement as HTMLElement;
      element.focus();
    } else if (focusRef.current) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      focusRef.current.focus();
    }
  }, [manageFocus]);

  const restoreFocus = useCallback(() => {
    if (!manageFocus || !previousFocusRef.current) return;
    
    previousFocusRef.current.focus();
    previousFocusRef.current = null;
  }, [manageFocus]);

  // Screen reader announcements
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!announceStateChanges) return;
    
    announceToScreenReader(message, priority);
  }, [announceStateChanges]);

  // Generate unique IDs for ARIA relationships
  const generateUniqueId = useCallback((prefix?: string) => {
    return generateId(prefix);
  }, []);

  // Keyboard event handlers
  const handleEscapeKey = useCallback((callback: () => void) => {
    return (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        callback();
      }
    };
  }, []);

  const handleEnterOrSpace = useCallback((callback: () => void) => {
    return (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callback();
      }
    };
  }, []);

  // ARIA state management
  const createAriaProps = useCallback((config: {
    role?: string;
    label?: string;
    labelledBy?: string;
    describedBy?: string;
    expanded?: boolean;
    selected?: boolean;
    pressed?: boolean;
    disabled?: boolean;
    live?: 'polite' | 'assertive' | 'off';
    atomic?: boolean;
  }) => {
    const props: Record<string, any> = {};
    
    if (config.role) props.role = config.role;
    if (config.label) props['aria-label'] = config.label;
    if (config.labelledBy) props['aria-labelledby'] = config.labelledBy;
    if (config.describedBy) props['aria-describedby'] = config.describedBy;
    if (config.expanded !== undefined) props['aria-expanded'] = config.expanded;
    if (config.selected !== undefined) props['aria-selected'] = config.selected;
    if (config.pressed !== undefined) props['aria-pressed'] = config.pressed;
    if (config.disabled !== undefined) props['aria-disabled'] = config.disabled;
    if (config.live) props['aria-live'] = config.live;
    if (config.atomic !== undefined) props['aria-atomic'] = config.atomic;
    
    return props;
  }, []);

  return {
    // Refs
    focusRef,
    
    // State
    reducedMotion,
    highContrast,
    
    // Focus management
    setFocus,
    restoreFocus,
    
    // Announcements
    announce,
    
    // Utilities
    generateUniqueId,
    createAriaProps,
    
    // Event handlers
    handleEscapeKey,
    handleEnterOrSpace,
  };
};

// Hook for managing answer button accessibility
export const useAnswerButtonAccessibility = (
  options: number[],
  selectedAnswer: number | null,
  onSelect: (index: number) => void,
  disabled: boolean = false
) => {
  const { announce, createAriaProps, handleEnterOrSpace } = useAccessibility();
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Announce selection changes
  useEffect(() => {
    if (selectedAnswer !== null) {
      const optionLetter = String.fromCharCode(65 + selectedAnswer);
      announce(`Selected answer ${optionLetter}`, 'assertive');
    }
  }, [selectedAnswer, announce]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : options.length - 1;
        setFocusedIndex(prevIndex);
        break;
        
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = index < options.length - 1 ? index + 1 : 0;
        setFocusedIndex(nextIndex);
        break;
        
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
        
      case 'End':
        event.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!disabled) {
          onSelect(index);
        }
        break;
    }
  }, [options.length, disabled, onSelect]);

  // Generate ARIA props for answer buttons
  const getAnswerButtonProps = useCallback((index: number, option: string) => {
    const optionLetter = String.fromCharCode(65 + index);
    
    return {
      ...createAriaProps({
        role: 'button',
        label: `Answer ${optionLetter}: ${option}`,
        pressed: selectedAnswer === index,
        disabled: disabled,
      }),
      tabIndex: focusedIndex === index ? 0 : -1,
      onKeyDown: (e: KeyboardEvent) => handleKeyDown(e, index),
      onClick: () => !disabled && onSelect(index),
    };
  }, [selectedAnswer, disabled, focusedIndex, createAriaProps, handleKeyDown, onSelect]);

  return {
    focusedIndex,
    setFocusedIndex,
    getAnswerButtonProps,
  };
};