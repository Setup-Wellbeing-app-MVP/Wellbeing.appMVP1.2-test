interface SwitchProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function Switch({ 
  id,
  checked, 
  defaultChecked,
  onChange, 
  onCheckedChange,
  disabled = false, 
  label,
  className = ''
}: SwitchProps) {
  const handleChange = (newChecked: boolean) => {
    if (disabled) return;
    // Support both onChange and onCheckedChange for compatibility
    onChange?.(newChecked);
    onCheckedChange?.(newChecked);
  };

  const isChecked = checked ?? defaultChecked ?? false;

  return (
    <label className={`flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={() => handleChange(!isChecked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          ${isChecked ? 'bg-primary' : 'bg-muted'}
          ${disabled ? '' : 'hover:opacity-90 active:opacity-80'}
        `}
        style={{
          transitionProperty: 'background-color, opacity',
          transitionDuration: 'var(--transition-duration-fast)'
        }}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            ${isChecked ? 'translate-x-6' : 'translate-x-1'}
          `}
          style={{ 
            boxShadow: 'var(--elevation-sm)',
            transitionProperty: 'transform',
            transitionDuration: 'var(--transition-duration-base)'
          }}
        />
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
