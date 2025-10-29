import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'neutral' | 'white';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    primary: 'text-primary-500',
    neutral: 'text-neutral-400',
    white: 'text-white',
  };

  return (
    <div
      className={`inline-block animate-spin ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'neutral' | 'white';
  className?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const variantClasses = {
    primary: 'bg-primary-500',
    neutral: 'bg-neutral-400',
    white: 'bg-white',
  };

  return (
    <div className={`flex items-center gap-1 ${className}`} role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full animate-pulse`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
};

interface LoadingPulseProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'neutral' | 'success' | 'warning';
  className?: string;
}

export const LoadingPulse: React.FC<LoadingPulseProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const variantClasses = {
    primary: 'bg-primary-500/20 border-primary-500/30',
    neutral: 'bg-neutral-400/20 border-neutral-400/30',
    success: 'bg-success-500/20 border-success-500/30',
    warning: 'bg-warning-500/20 border-warning-500/30',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`} role="status" aria-label="Loading">
      <div
        className={`absolute inset-0 rounded-full border-2 ${variantClasses[variant]} animate-ping`}
      />
      <div
        className={`absolute inset-2 rounded-full border-2 ${variantClasses[variant]} animate-ping`}
        style={{ animationDelay: '0.2s' }}
      />
      <div
        className={`absolute inset-4 rounded-full border-2 ${variantClasses[variant]} animate-ping`}
        style={{ animationDelay: '0.4s' }}
      />
    </div>
  );
};

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`bg-neutral-200 animate-pulse ${variantClasses[variant]} ${className}`}
      style={style}
      role="status"
      aria-label="Loading content"
    />
  );
};