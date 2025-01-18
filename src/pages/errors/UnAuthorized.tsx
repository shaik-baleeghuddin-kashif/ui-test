import { useNavigate } from 'react-router-dom';
import { LockPerson, Home, ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

const UnAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="logo-gradient p-6 rounded-full inline-block mb-6">
          <LockPerson className="text-white w-16 h-16" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 logo-gradient-text">401 - Unauthorized</h1>
        
        <p className="text-foreground/80 text-lg mb-4">
          Sorry, you don't have permission to access this page.
        </p>
        
        <p className="text-foreground/60 mb-8">
          Please contact your administrator if you believe this is a mistake.
        </p>
        
        <div className="space-y-16">
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
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            className="w-full py-3 normal-case text-base [&.MuiButton-root]:border-primary [&.MuiButton-root]:text-primary hover:bg-primary/5"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorized;