import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './Routes';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Layout>
            <AppRoutes />
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;