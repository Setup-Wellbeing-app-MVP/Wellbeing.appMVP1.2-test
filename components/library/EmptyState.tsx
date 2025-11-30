import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 min-h-[400px]">
      {/* Icon */}
      {icon && (
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground mb-4">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-foreground mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 min-w-[44px] min-h-[44px] bg-primary text-primary-foreground rounded-lg hover:opacity-90 active:opacity-80 transition-opacity"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
