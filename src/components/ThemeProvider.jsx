import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeProviderContext = createContext(null);

export function ThemeProvider ({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}) {
    const [theme, setTheme] = useState(
        () => localStorage.getItem(storageKey) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
            document.body.classList.add(systemTheme);
            document.body.classList.remove(systemTheme == 'dark' ? 'light' : 'dark');
            return;
        }

        root.classList.add(theme);
        document.body.classList.add(theme);
        document.body.classList.remove(theme === 'dark' ? 'light' : 'dark');
    }, [theme]);

    const value = {
        theme, 
        setTheme: (theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
};

