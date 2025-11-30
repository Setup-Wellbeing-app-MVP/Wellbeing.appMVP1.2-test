interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  label,
  showValue = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantStyles = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-destructive',
  };

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-label text-muted-foreground">{label}</span>}
          {showValue && <span className="text-sm font-label text-muted-foreground">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`${sizeStyles[size]} ${variantStyles[variant]} transition-all duration-300 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showValue?: boolean;
}

export function CircularProgress({
  value,
  max = 100,
  size = 64,
  strokeWidth = 4,
  variant = 'primary',
  showValue = true,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    primary: 'var(--primary)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--destructive)',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={variantColors[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      {showValue && (
        <span className="absolute text-sm font-label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
