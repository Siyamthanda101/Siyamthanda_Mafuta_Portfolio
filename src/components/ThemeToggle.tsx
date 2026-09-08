import React, { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

interface ThemeToggleProps {
  variant?: 'compact' | 'full';
  className?: string;
  id?: string;
}

export default function ThemeToggle({
  variant = 'compact',
  className = '',
  id,
}: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Explicit accessible states and labels matching WCAG and user specifications:
  // When Light mode active: communicates "Theme: Light mode", indicates activating switches to "Dark mode", aria-pressed="false"
  // When Dark mode active: communicates "Theme: Dark mode", indicates activating switches to "Light mode", aria-pressed="true"
  const currentThemeText = isDark ? 'Dark mode' : 'Light mode';
  const nextThemeActionText = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const tooltipText = `Theme: ${currentThemeText}. ${nextThemeActionText}.`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Native button automatically responds to Enter/Space, but prevent default scroll on Space
    if (e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  if (variant === 'full') {
    return (
      <button
        ref={buttonRef}
        type="button"
        id={id || 'theme-toggle-full-btn'}
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        aria-label={nextThemeActionText}
        aria-pressed={isDark}
        title={tooltipText}
        className={`w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-colors duration-200 cursor-pointer border ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:border-slate-600 hover:bg-slate-800'
            : 'bg-white border-slate-300 text-slate-800 hover:text-slate-950 hover:border-slate-400 hover:bg-slate-50 shadow-sm'
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-950 focus-visible:ring-offset-white ${className}`}
      >
        <span className="flex items-center gap-2.5">
          {isDark ? (
            <Moon className="w-4 h-4 text-blue-300 shrink-0" aria-hidden="true" />
          ) : (
            <Sun className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
          )}
          <span className="font-sans font-medium text-slate-800 dark:text-slate-200">
            Theme: <span className="font-semibold">{currentThemeText}</span>
          </span>
        </span>
        <span className="text-[11px] px-2.5 py-1 rounded bg-blue-600/10 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-1.5 border border-blue-200 dark:border-blue-800/60">
          <span>{nextThemeActionText}</span>
        </span>
        <span className="sr-only">
          Theme: {currentThemeText}. {nextThemeActionText}.
        </span>
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      id={id || 'theme-toggle-btn'}
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      aria-label={nextThemeActionText}
      aria-pressed={isDark}
      title={tooltipText}
      className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 rounded-lg border transition-colors duration-200 cursor-pointer ${
        isDark
          ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-800'
          : 'bg-white border-slate-300 text-slate-800 hover:text-slate-950 hover:border-slate-400 hover:bg-slate-100 shadow-sm'
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-950 focus-visible:ring-offset-white ${className}`}
    >
      <span className="relative w-5 h-5 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {isDark ? (
          <Moon className="w-4 h-4 text-blue-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-600" />
        )}
      </span>
      <span className="sr-only">
        Theme: {currentThemeText}. {nextThemeActionText}.
      </span>
    </button>
  );
}
