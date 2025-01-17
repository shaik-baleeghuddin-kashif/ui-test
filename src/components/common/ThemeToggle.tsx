import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        color="inherit"
        className="rounded-lg hover:bg-secondary/80"
      >
        {theme === 'light' ? (
          <DarkMode className="h-5 w-5" />
        ) : (
          <LightMode className="h-5 w-5" />
        )}
      </IconButton>
    </Tooltip>
  );
}