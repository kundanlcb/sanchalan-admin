/**
 * Theme Toggle Component
 * Switches between light, dark, and system theme modes
 * Uses icons: Sun (light), Moon (dark), Monitor (system)
 */

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, type Theme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const themeOptions: { value: Theme; icon: React.ElementType; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {themeOptions.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={cn(
                        'p-1.5 rounded-md transition-all duration-200',
                        'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400',
                        theme === value && 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-gray-200 dark:ring-gray-500'
                    )}
                    aria-label={`Switch to ${label} theme`}
                    title={`${label} theme`}
                >
                    <Icon className="w-4 h-4" />
                </button>
            ))}
        </div>
    );
};

export { ThemeToggle };
