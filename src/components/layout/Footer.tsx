// import { useTheme } from '../../context/ThemeContext';

// export function Footer() {
//   const { theme } = useTheme();

//   return (
//     <footer className={`border-t border-border py-4 px-4 sm:px-6 lg:px-8 bg-background transition-all duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
//       <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
//         <div className="flex gap-1 mb-2 sm:mb-0">
//           <p className='logo-gradient-text font-bold'>Made with </p><span className='text-rose-500'>♥</span> <p className='logo-gradient-text font-bold'>by{' NOC '}</p>
//         </div>
//         <nav className="flex flex-wrap justify-center sm:justify-end space-x-4">
//           <a href="#" className="hover:text-primary transition-colors mb-1 sm:mb-0">
//             Privacy Policy
//           </a>
//           <a href="#" className="hover:text-primary transition-colors mb-1 sm:mb-0">
//             Terms of Service
//           </a>
//           <a href="#" className="hover:text-primary transition-colors">
//             Contact
//           </a>
//         </nav>
//       </div>
//     </footer>
//   );
// }


import { useTheme } from '../../context/ThemeContext';
import SlackIcon from '@mui/icons-material/Tag';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EmailIcon from '@mui/icons-material/Email';

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`border-t border-border py-4 px-4 sm:px-6 lg:px-8 bg-background transition-all duration-300 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        <div className="flex gap-1 mb-2 sm:mb-0">
          <p className="logo-gradient-text font-bold">Made with </p>
          <span className="text-rose-500">♥</span>
          <p className="logo-gradient-text font-bold">{' by NOC '}</p>
        </div>
        <nav className="flex flex-wrap justify-center sm:justify-end space-x-12">
          {/* Proj Vendex with Slack link */}
          <a
            href="https://slack.com/channel-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors mb-1 sm:mb-0"
          >
            <SlackIcon fontSize="small" />
            Proj-Vendex
          </a>
          {/* Report Desflow with ticketing tool link */}
          <a
            href="https://ticketingtool.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors mb-1 sm:mb-0"
          >
            <LocalActivityIcon fontSize="small" />
            Report-Desflow
          </a>
          {/* Email link */}
          <a
            href="mailto:support@example.com"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <EmailIcon fontSize="small" />
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
