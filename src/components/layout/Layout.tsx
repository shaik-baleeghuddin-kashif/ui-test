import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { CircularProgress } from '@mui/material';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
          style={{marginLeft: isSidebarOpen ? '14rem' : '4rem'}}
      >
        <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <CircularProgress className="text-primary" size={40} />
            </div>
          ) : (
            <div className='h-full w-full p-3'>
              {children}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
