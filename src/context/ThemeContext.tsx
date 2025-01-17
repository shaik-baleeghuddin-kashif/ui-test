import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme;
    return stored || defaultTheme;
  });

  // Create MUI theme based on current theme
  const muiTheme = createTheme({
    palette: {
      mode: theme === "system" 
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme,
      primary: {
        main: '#4eca89', // Green from logo
        light: '#6bd4a0',
        dark: '#3ba671',
      },
      secondary: {
        main: '#45a5d4', // Blue from logo
        light: '#68b8e0',
        dark: '#3589b2',
      },
      background: {
        default: theme === 'light' ? '#ffffff' : '#102030',
        paper: theme === 'light' ? '#f8fafc' : '#1a2c40',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
          },
        },
      },
    },
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    // Update scrollbar colors
    if (theme === 'dark') {
      root.style.setProperty('--scrollbar-track', 'hsl(var(--background))');
      root.style.setProperty('--scrollbar-thumb', 'hsl(var(--primary))');
      root.style.setProperty('--scrollbar-thumb-hover', 'hsl(var(--primary) / 0.8)');
    } else {
      root.style.setProperty('--scrollbar-track', 'hsl(var(--background))');
      root.style.setProperty('--scrollbar-thumb', 'hsl(var(--primary))');
      root.style.setProperty('--scrollbar-thumb-hover', 'hsl(var(--primary) / 0.8)');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};