import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

interface ThemeToggleProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export default function ThemeToggle({ variant = 'compact', className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer border ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700'
            : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm'
        } ${className}`}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      >
        <span className="flex items-center gap-2">
          {isDark ? (
            <Moon className="w-4 h-4 text-blue-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          <span>Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded bg-blue-600/10 text-blue-500 font-semibold">
          {isDark ? '🌙 Dark' : '☀️ Light'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      id="theme-toggle-btn"
      className={`relative p-2 rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
        isDark
          ? 'bg-slate-900/80 border border-slate-800/90 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 focus:ring-offset-slate-950'
          : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 shadow-sm focus:ring-offset-white'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
    >
      <div className="relative w-4 h-4">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-blue-600 transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
