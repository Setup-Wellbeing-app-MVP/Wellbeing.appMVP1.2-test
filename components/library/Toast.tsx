import { ReactNode, useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  variant = 'default',
  icon,
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-success/10 border-success/20 text-success',
    warning: 'bg-warning/10 border-warning/30 text-warning',
    error: 'bg-destructive/10 border-destructive/20 text-destructive',
  };

  const defaultIcons = {
    success: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  return (
    <div
      className={`
        fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:w-96
        flex items-center gap-3 px-4 py-3 rounded-lg
        border
        ${variantStyles[variant]}
        animate-slide-up
      `}
      style={{ 
        boxShadow: 'var(--elevation-md)',
        zIndex: 'var(--z-index-toast)'
      }}
    >
      {icon || (variant !== 'default' && defaultIcons[variant as keyof typeof defaultIcons])}
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        className="flex items-center justify-center min-w-[24px] min-h-[24px] rounded hover:bg-muted active:bg-muted"
        style={{ 
          opacity: 1,
          transitionProperty: 'opacity, background-color',
          transitionDuration: 'var(--transition-duration-fast)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 'var(--opacity-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
