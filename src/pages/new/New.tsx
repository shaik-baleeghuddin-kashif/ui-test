import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Fade
} from '@mui/material';
import {
  ArrowBack,
  Business,
  LocalShipping,
  Router,
  Construction
} from '@mui/icons-material';

import OfficeForm from '../../components/offices/OfficeForm';
import VendorForm from '../../components/vendors/VendorForm';
import CircuitForm from '../../components/circuits/CircuitForm';
import MaintenanceForm from '../../components/maintenance/MaintenanceForm';

const formTypes = {
  office: {
    component: OfficeForm,
    icon: Business,
    title: 'Office',
    description: 'Register a new office location'
  },
  vendor: {
    component: VendorForm,
    icon: LocalShipping,
    title: 'Vendor',
    description: 'Add a new vendor or supplier'
  },
  circuit: {
    component: CircuitForm,
    icon: Router,
    title: 'Circuit',
    description: 'Configure a new network circuit'
  },
  maintenance: {
    component: MaintenanceForm,
    icon: Construction,
    title: 'Maintenance',
    description: 'Schedule maintenance work'
  }
} as const;

type FormType = keyof typeof formTypes;

const New = () => {
  const [selectedForm, setSelectedForm] = useState<FormType | ''>('');
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    navigate(`/${selectedForm}s`);
  };

  const SelectedForm = selectedForm ? formTypes[selectedForm].component : null;

  const getHeading = () => {
    if (!selectedForm) return 'Create New Record';
    return `Create New ${formTypes[selectedForm].title}`;
  };

  return (
    <Box>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => selectedForm ? setSelectedForm('') : navigate(-1)}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" component="h1">
            {getHeading()}
          </Typography>
        </Box>

        <Fade in={true} timeout={500}>
          <Box>
            {!selectedForm ? (
              <Grid container spacing={3}>
                {Object.entries(formTypes).map(([key, { icon: Icon, title, description }]) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <Card 
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        }
                      }}
                      onClick={() => setSelectedForm(key as FormType)}
                    >
                      <CardContent>
                        <Box sx={{ mb: 2 }}>
                          <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {description}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          fullWidth
                        >
                          Create {title}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ animation: 'fadeIn 0.5s ease-in', padding: 5 }}>
                {SelectedForm && <SelectedForm onSubmitSuccess={handleSubmitSuccess} />}
              </Box>
            )}
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default New;