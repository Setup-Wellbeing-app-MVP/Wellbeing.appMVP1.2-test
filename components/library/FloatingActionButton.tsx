import { ReactNode } from 'react';

interface FloatingActionButtonProps {
  icon: ReactNode;
  onClick: () => void;
  label?: string;
  variant?: 'primary' | 'secondary' | 'success';
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  extended?: boolean;
}

export function FloatingActionButton({
  icon,
  onClick,
  label,
  variant = 'primary',
  position = 'bottom-right',
  extended = false,
}: FloatingActionButtonProps) {
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-success text-success-foreground',
  };

  const positionStyles = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-6 left-6',
  };

  return (
    <button
      onClick={onClick}
      className={`
        fixed
        ${positionStyles[position]}
        ${extended ? 'px-6 py-4 gap-3' : 'w-14 h-14'}
        flex items-center justify-center
        ${variantStyles[variant]}
        rounded-full
        ${extended ? '' : 'shadow-lg'}
      `}
      style={{ 
        zIndex: 'var(--z-index-fixed)',
        boxShadow: extended ? 'var(--elevation-md)' : 'var(--elevation-lg)',
        opacity: 1,
        transitionProperty: 'opacity, transform, box-shadow',
        transitionDuration: 'var(--transition-duration-fast)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = 'var(--opacity-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      onMouseDown={(e) => e.currentTarget.style.opacity = '0.8'}
      onMouseUp={(e) => e.currentTarget.style.opacity = 'var(--opacity-hover)'}
    >
      <span className={`${extended ? 'flex-shrink-0' : ''}`}>{icon}</span>
      {extended && label && (
        <span className="whitespace-nowrap">{label}</span>
      )}
    </button>
  );
}
