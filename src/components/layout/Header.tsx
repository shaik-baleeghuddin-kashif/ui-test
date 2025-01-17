// src/components/layout/Header.tsx

import { ThemeToggle } from '../common/ThemeToggle';
import { Menu, Notifications, AccountCircle } from '@mui/icons-material';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="sticky top-0 z-20 bg-background border-b border-border">
      <div className="px-4 sm:px-6 lg:px-2 lg:ml-2 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isSidebarOpen ? "" : 
            <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-foreground hover:bg-secondary"
            >
              <Menu className="h-6 w-6" />
            </button>
            }
            <h1 className={`ml-9 text-xl font-semibold text-foreground transition-all duration-300 ${isSidebarOpen ? 'md:ml-2' : 'md:ml-6'}`}>
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            <Tooltip title="Notifications">
              <IconButton className="text-foreground">
                <Badge badgeContent={3} color="primary">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton className="text-foreground">
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
