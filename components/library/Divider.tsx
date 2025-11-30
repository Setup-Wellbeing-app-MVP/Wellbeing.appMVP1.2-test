interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  label?: string;
}

export function Divider({ orientation = 'horizontal', spacing = 'md', label }: DividerProps) {
  const spacingStyles = {
    horizontal: {
      none: 'my-0',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
    },
    vertical: {
      none: 'mx-0',
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
    },
  };

  if (orientation === 'vertical') {
    return (
      <div className={`h-full w-px bg-border ${spacingStyles.vertical[spacing]}`} />
    );
  }

  if (label) {
    return (
      <div className={`flex items-center gap-4 ${spacingStyles.horizontal[spacing]}`}>
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm font-label text-muted-foreground">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
    );
  }

  return (
    <div className={`h-px bg-border ${spacingStyles.horizontal[spacing]}`} />
  );
}
