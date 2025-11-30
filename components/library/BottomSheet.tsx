import { ReactNode, useEffect } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  height?: 'auto' | 'half' | 'full';
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  height = 'auto',
}: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const heightStyles = {
    auto: 'max-h-[80vh]',
    half: 'h-[50vh]',
    full: 'h-[90vh]',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black"
        style={{ 
          zIndex: 'var(--z-index-modal-backdrop)',
          opacity: 'var(--opacity-overlay)',
          transitionProperty: 'opacity',
          transitionDuration: 'var(--transition-duration-base)'
        }}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`
          fixed bottom-0 left-0 right-0
          bg-card rounded-t-2xl
          ${heightStyles[height]}
          flex flex-col
          animate-slide-up
        `}
        style={{ 
          boxShadow: 'var(--elevation-xl)',
          zIndex: 'var(--z-index-modal)'
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="px-6 py-3 border-b border-border">
            <h3>{title}</h3>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </>
  );
}

interface BottomSheetAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
}

interface BottomSheetActionsProps {
  actions: BottomSheetAction[];
}

export function BottomSheetActions({ actions }: BottomSheetActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`
            flex items-center gap-4 px-4 py-4 min-h-[56px]
            rounded-lg
            ${
              action.variant === 'destructive'
                ? 'text-destructive hover:bg-destructive/10 active:bg-destructive/20'
                : 'text-foreground hover:bg-muted active:bg-muted'
            }
          `}
          style={{ 
            opacity: 1,
            transitionProperty: 'opacity, background-color',
            transitionDuration: 'var(--transition-duration-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 'var(--opacity-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          {action.icon && <span className="flex-shrink-0">{action.icon}</span>}
          <span className="flex-1 text-left">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
