import { useLocation, Link } from 'react-router-dom';
import { 
  Dashboard, 
  Business,
  TaskAlt,
  People,
  Construction,
  Cable,
  ChevronLeft,
  Book
} from '@mui/icons-material';
import { ThemeToggle } from '../common/ThemeToggle';
import { Tooltip } from '@mui/material';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <Dashboard />, label: 'Dashboard'},
    { path: '/offices', icon: <Business />, label: 'Offices' },
    { path: '/vendors', icon: <People />, label: 'Vendors' },
    { path: '/circuits', icon: <Cable />, label: 'Circuits' },
    { path: '/maintenance', icon: <Construction />, label: 'Maintenance' },
    { path: '/approvals', icon: <TaskAlt />, label: 'Approvals' },
  ];

  const BottomSection = ({ isOpen }: { isOpen: boolean }) => (
    <div className={`border-t border-border mt-auto py-4 ${!isOpen && 'flex flex-col items-center'}`}>
      <div className={`${!isOpen ? 'flex flex-col items-center space-y-4' : ''}`}>
        <Tooltip title="API Documentation">
        <Link
          to="/docs"
          className={`flex items-center rounded-md transition-colors duration-200 text-foreground hover:bg-secondary
            ${isOpen ? 'mx-4 mb-2 px-3 py-2' : 'p-2'}
            `}
            >
          <Book className="h-5 w-5" />
          {isOpen && <span className="ml-5 text-sm font-medium">API Docs</span>}
        </Link>
        </Tooltip>
  
        <div 
          className={`flex items-center rounded-md transition-colors duration-200 text-foreground hover:bg-secondary
            ${isOpen ? 'mx-3 mb-2 px-2 py-0' : 'p-0'}
          `}
        >
          <div className="flex items-center">
            <ThemeToggle />
            {isOpen && <span className="ml-3 text-sm font-medium">Switch mode</span>}
          </div>
        </div>
  
        <div className={`flex items-center text-foreground
          ${isOpen ? 'mx-3 px-3 py-2' : 'p-2'}
        `}>
          <img 
            src="/stack/logo.svg" 
            alt="User"
            className="h-8 w-8 rounded-lg" 
          />
          {isOpen && <span className="ml-4 text-sm font-medium">John Doe</span>}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out lg:hidden flex flex-col h-full`}
      >
        <div className="flex flex-col min-h-0 h-full">
          <div className="p-4 flex justify-between items-center">
            {isOpen ? (
              <>
                <img src="/stack/logo.svg" alt="logo" className="h-8 w-8" />
                <h1 className="logo-gradient-text text-lg font-bold">VENDEX</h1>
              </>
            ) : (
              <img src="/stack/logo.svg" alt="logo" className="h-8 w-8" />
            )}
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-secondary text-foreground lg:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-6 flex-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                item={item}
                isActive={location.pathname.startsWith(item.path)}
                isOpen={isOpen}
              />
            ))}
          </nav>
          <BottomSection isOpen={isOpen} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`${
          isOpen ? 'w-56' : 'w-16'
        } hidden lg:block fixed inset-y-0 left-0 z-30 bg-background border-r border-border transition-all duration-300 ease-in-out flex-col h-full`}
      >
        <div className="flex flex-col min-h-0 h-full">
          <div className="p-4 flex items-center justify-between">
            {isOpen ? (
              <>
                <img src="/stack/logo.svg" alt="logo" className="h-8 w-8" />
                <h1 className="logo-gradient-text text-lg font-bold">VENDEX</h1>
              </>
            ) : (
              <img src="/stack/logo.svg" alt="logo" className="h-8 w-8" />
            )}
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-secondary text-foreground"
            >
              {isOpen ? <ChevronLeft className="h-5 w-5" /> : ""}
            </button>
          </div>
          <nav className={`mt-6 flex-1 ${!isOpen && 'flex flex-col items-center'}`}>
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                item={item}
                isActive={location.pathname.startsWith(item.path)}
                isOpen={isOpen}
              />
            ))}
          </nav>
          <BottomSection isOpen={isOpen} />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}

interface SidebarItemProps {
  item: { path: string; icon: React.ReactNode; label: string };
  isActive: boolean;
  isOpen?: boolean;
}

function SidebarItem({ item, isActive, isOpen = true }: SidebarItemProps) {
  return (
    <Tooltip title={item.label}>
    <Link
      to={item.path}
      className={`flex items-center rounded-md transition-colors duration-200
        ${
          isActive
          ? 'logo-gradient text-white shadow-md'
          : 'text-foreground hover:bg-secondary'
        }
        ${isOpen ? 'mx-4 my-2 px-3 py-2' : 'm-1 p-2 justify-center h-fit w-fit'}
        `}
        >
      <span className={`text-lg ${!isOpen && 'mx-auto'}`}>{item.icon}</span>
      {isOpen && <span className="ml-4 text-sm font-medium">{item.label}</span>}
    </Link>
    </Tooltip>
  );
}