import { useNavigate } from 'react-router-dom';
import { Error as ErrorIcon, Home } from '@mui/icons-material';
import { Button } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="logo-gradient p-6 rounded-full inline-block mb-6">
          <ErrorIcon className="text-white w-16 h-16" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 logo-gradient-text">404 - Page Not Found</h1>
        
        <p className="text-foreground/80 text-lg mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            className="logo-gradient w-full py-3 text-base [&.MuiButton-root]:text-background"
          >
            Return to Dashboard
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(-1)}
            className="w-full py-3 normal-case text-base border-primary text-primary hover:bg-primary/5"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound