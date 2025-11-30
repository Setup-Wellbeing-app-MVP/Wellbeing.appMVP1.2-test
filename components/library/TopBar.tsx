import { ReactNode } from 'react';

interface TopBarAction {
  id: string;
  element: ReactNode;
}

interface TopBarProps {
  title: string;
  leftAction?: ReactNode;
  rightActions?: TopBarAction[];
  subtitle?: string;
}

export function TopBar({ title, leftAction, rightActions, subtitle }: TopBarProps) {
  return (
    <header 
      className="sticky top-0 bg-card border-b border-border"
      style={{ zIndex: 'var(--z-index-sticky)' }}
    >
      <div className="flex items-center gap-4 px-4 py-3 min-h-[56px]">
        {/* Left Action (typically back button or menu) */}
        {leftAction && (
          <div className="flex-shrink-0">
            {leftAction}
          </div>
        )}

        {/* Title Section */}
        <div className="flex-1 min-w-0">
          <h1 className="truncate">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>

        {/* Right Actions */}
        {rightActions && rightActions.length > 0 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {rightActions.map((action) => (
              <div key={action.id}>{action.element}</div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

export function IconButton({ icon, onClick, ariaLabel }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-foreground hover:bg-muted active:bg-muted"
      style={{ 
        opacity: 1,
        transitionProperty: 'opacity, background-color',
        transitionDuration: 'var(--transition-duration-fast)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = 'var(--opacity-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >
      {icon}
    </button>
  );
}
