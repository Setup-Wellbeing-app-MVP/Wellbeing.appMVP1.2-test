import { ReactNode } from 'react';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  onClick?: () => void;
  divider?: boolean;
}

export function ListItem({
  title,
  subtitle,
  leftContent,
  rightContent,
  onClick,
  divider = true,
}: ListItemProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 px-4 py-3 min-h-[56px]
        ${divider ? 'border-b border-border' : ''}
        ${onClick ? 'hover:bg-muted/30 active:bg-muted/50 transition-colors cursor-pointer' : ''}
      `}
    >
      {/* Left Content (Icon, Avatar, Checkbox, etc.) */}
      {leftContent && (
        <div className="flex-shrink-0">
          {leftContent}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 text-left">
        <div className="truncate">{title}</div>
        {subtitle && (
          <div className="text-sm text-muted-foreground truncate">{subtitle}</div>
        )}
      </div>

      {/* Right Content (Icon, Badge, Switch, etc.) */}
      {rightContent && (
        <div className="flex-shrink-0">
          {rightContent}
        </div>
      )}
    </Component>
  );
}

interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt, fallback, size = 'md' }: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`
        ${sizeStyles[size]}
        rounded-full
        flex items-center justify-center
        bg-primary/10 text-primary
        overflow-hidden
        flex-shrink-0
      `}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-label">{fallback}</span>
      )}
    </div>
  );
}

interface ListSectionProps {
  title?: string;
  children: ReactNode;
}

export function ListSection({ title, children }: ListSectionProps) {
  return (
    <div className="py-2">
      {title && (
        <div className="px-4 py-2">
          <span className="text-xs font-label text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}
