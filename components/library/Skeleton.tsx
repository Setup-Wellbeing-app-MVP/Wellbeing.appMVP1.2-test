interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  className?: string;
}

export function Skeleton({ width, height, circle = false, className = '' }: SkeletonProps) {
  return (
    <div
      className={`
        bg-muted animate-pulse
        ${circle ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
}

export function SkeletonListItem() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 min-h-[56px] border-b border-border">
      <Skeleton width="40px" height="40px" circle />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height="16px" />
        <Skeleton width="40%" height="12px" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <Skeleton width="40%" height="20px" />
      <Skeleton width="100%" height="14px" />
      <Skeleton width="80%" height="14px" />
      <div className="flex gap-2 pt-2">
        <Skeleton width="80px" height="32px" />
        <Skeleton width="80px" height="32px" />
      </div>
    </div>
  );
}
