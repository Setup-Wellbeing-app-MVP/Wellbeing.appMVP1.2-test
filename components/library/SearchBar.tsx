import { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  onClear,
  autoFocus = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg
        bg-input-background border
        ${isFocused ? 'border-ring ring-2 ring-ring' : 'border-border'}
        transition-all
      `}
    >
      {/* Search Icon */}
      <svg
        className="w-5 h-5 text-muted-foreground flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          className="flex items-center justify-center min-w-[24px] min-h-[24px] rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 active:bg-muted transition-colors flex-shrink-0"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
