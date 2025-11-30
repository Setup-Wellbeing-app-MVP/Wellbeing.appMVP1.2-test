import { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  badge?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills';
}

export function Tabs({ tabs, activeTab, onChange, variant = 'default' }: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className="overflow-x-auto">
        <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                px-4 py-2 min-h-[44px] rounded-lg flex-shrink-0
                transition-all whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-label bg-primary/10 text-primary rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border overflow-x-auto">
      <div className="flex items-center gap-1 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-6 py-3 min-w-[44px] min-h-[44px] whitespace-nowrap flex-shrink-0
              transition-colors
              ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary -mb-px'
                  : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs font-label bg-primary/10 text-primary rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

interface TabPanelProps {
  children: ReactNode;
  isActive: boolean;
}

export function TabPanel({ children, isActive }: TabPanelProps) {
  if (!isActive) return null;
  return <div className="py-4">{children}</div>;
}
