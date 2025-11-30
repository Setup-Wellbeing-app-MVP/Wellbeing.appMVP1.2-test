import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: ModalProps) {
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black flex items-center justify-center p-4"
        style={{ 
          zIndex: 'var(--z-index-modal-backdrop)',
          opacity: 'var(--opacity-overlay)'
        }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className={`
            bg-card rounded-xl w-full ${sizeStyles[size]}
            max-h-[90vh] flex flex-col
            animate-scale-in
          `}
          style={{ 
            boxShadow: 'var(--elevation-xl)',
            zIndex: 'var(--z-index-modal)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3>{title}</h3>
              <button
                onClick={onClose}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] -mr-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted transition-colors"
                style={{ 
                  opacity: 1,
                  transitionProperty: 'opacity, background-color, color',
                  transitionDuration: 'var(--transition-duration-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 'var(--opacity-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-border">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
