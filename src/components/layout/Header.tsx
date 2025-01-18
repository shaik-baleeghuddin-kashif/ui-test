import { Menu, Add } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';

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
      <div className="px-4 sm:px-6 lg:px-2 lg:ml-2 lg:mr-10 py-2">
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

          <div className="flex items-center">
            <Tooltip title="Create New Record">
            <Link
              to="/new"
              className="flex items-center px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Add className="h-2 w-2 mr-2" />
              <span className='text-sm'>Create</span>
            </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}