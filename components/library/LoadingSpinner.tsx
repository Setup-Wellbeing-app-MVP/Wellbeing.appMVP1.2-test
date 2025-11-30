interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'muted';
}

export function LoadingSpinner({ size = 'md', variant = 'primary' }: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  const variantStyles = {
    primary: 'border-primary border-t-transparent',
    secondary: 'border-secondary border-t-transparent',
    muted: 'border-muted-foreground border-t-transparent',
  };

  return (
    <div
      className={`
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        rounded-full
        animate-spin
      `}
    />
  );
}

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg p-6 flex flex-col items-center gap-4" style={{ boxShadow: 'var(--elevation-lg)' }}>
        <LoadingSpinner size="lg" />
        {message && <p className="text-center">{message}</p>}
      </div>
    </div>
  );
}
