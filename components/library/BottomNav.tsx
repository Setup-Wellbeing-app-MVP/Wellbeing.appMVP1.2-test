import { ReactNode } from 'react';

interface BottomNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}

export function BottomNav({ items, activeId, onItemClick }: BottomNavProps) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border"
      style={{ zIndex: 'var(--z-index-fixed)' }}
    >
      <div className="flex items-center justify-around max-w-screen-xl mx-auto">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[64px] min-h-[56px] ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground active:text-foreground'
              }`}
              style={{
                transitionProperty: 'color',
                transitionDuration: 'var(--transition-duration-fast)'
              }}
            >
              <div className="relative">
                <div 
                  className={`${isActive ? 'scale-110' : ''}`}
                  style={{
                    transitionProperty: 'transform',
                    transitionDuration: 'var(--transition-duration-fast)'
                  }}
                >
                  {item.icon}
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-destructive text-destructive-foreground text-xs font-label rounded-full px-1">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-label ${isActive ? '' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
