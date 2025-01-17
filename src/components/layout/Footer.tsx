import { useTheme } from '../../context/ThemeContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className={`border-t border-border py-4 px-4 sm:px-6 lg:px-8 bg-background transition-all duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        <div className="flex gap-1 mb-2 sm:mb-0">
          <p className='logo-gradient-text font-bold'>Made with </p><span className='text-rose-500'>♥</span> <p className='logo-gradient-text font-bold'>by{' NOC '}</p>
        </div>
        <nav className="flex flex-wrap justify-center sm:justify-end space-x-4">
          <a href="#" className="hover:text-primary transition-colors mb-1 sm:mb-0">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors mb-1 sm:mb-0">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
