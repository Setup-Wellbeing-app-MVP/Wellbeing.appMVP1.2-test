import { ReactNode } from 'react';

interface ChipProps {
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
  onRemove?: () => void;
  onClick?: () => void;
}

export function Chip({ label, variant = 'default', icon, onRemove, onClick }: ChipProps) {
  const variantStyles = {
    default: 'bg-muted text-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-destructive/10 text-destructive',
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full
        text-sm
        ${variantStyles[variant]}
        ${onClick ? 'hover:opacity-80 active:opacity-70 cursor-pointer transition-opacity' : ''}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="font-label">{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 active:bg-black/20 transition-colors"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </Component>
  );
}
