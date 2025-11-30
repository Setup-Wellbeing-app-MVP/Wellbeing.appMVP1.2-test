import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}: CardProps) {
  const variantStyles = {
    default: 'bg-card border border-border',
    elevated: 'bg-card',
    outlined: 'bg-transparent border-2 border-border',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        rounded-lg
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${onClick ? 'hover:bg-muted/30 active:bg-muted/50 transition-colors cursor-pointer w-full text-left' : ''}
        ${variant === 'elevated' ? '' : ''}
        ${className}
      `}
      style={variant === 'elevated' ? { boxShadow: 'var(--elevation-md)' } : undefined}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4 pb-4 border-b border-border">
      <div className="flex-1 min-w-0">
        <h3 className="truncate">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 truncate">{subtitle}</p>
        )}
      </div>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return <div>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
}

export function CardFooter({ children, align = 'right' }: CardFooterProps) {
  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={`flex items-center gap-3 mt-4 pt-4 border-t border-border ${alignStyles[align]}`}>
      {children}
    </div>
  );
}
