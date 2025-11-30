import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export function Badge({ children, variant = 'default', size = 'md', dot = false }: BadgeProps) {
  const variantStyles = {
    default: 'bg-muted text-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-destructive text-destructive-foreground',
    info: 'bg-info text-info-foreground',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'px-3 py-1',
  };

  if (dot) {
    return (
      <span className="relative flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${variantStyles[variant]}`}
        />
        {children && <span className="text-sm font-label">{children}</span>}
      </span>
    );
  }

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-label
        rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
    >
      {children}
    </span>
  );
}

interface NotificationBadgeProps {
  count: number;
  max?: number;
  variant?: 'primary' | 'error';
  showZero?: boolean;
}

export function NotificationBadge({
  count,
  max = 99,
  variant = 'error',
  showZero = false,
}: NotificationBadgeProps) {
  if (count === 0 && !showZero) return null;

  const displayCount = count > max ? `${max}+` : count;

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    error: 'bg-destructive text-destructive-foreground',
  };

  return (
    <span
      className={`
        absolute -top-1 -right-1
        min-w-[18px] h-[18px]
        flex items-center justify-center
        text-xs font-label
        rounded-full
        px-1
        ${variantStyles[variant]}
      `}
      style={{ boxShadow: 'var(--elevation-sm)' }}
    >
      {displayCount}
    </span>
  );
}
