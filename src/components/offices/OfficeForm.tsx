import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Business,
  People,
  LocationOn,
  Description,
  NavigateNext,
  NavigateBefore
} from '@mui/icons-material';

interface OfficeFormProps {
  onSubmitSuccess: () => void;
}

interface FormData {
  basicInfo: {
    code: string;
    registered_name: string;
    established_date: string;
    office_type: string;
    office_status: string;
  };
  contact: {
    sys: string;
    net: string;
    dc: string;
  };
  address: {
    landmark: string;
    door: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  additional: {
    description: string;
    desflow: string;
  };
}

const initialFormData: FormData = {
  basicInfo: {
    code: '',
    registered_name: '',
    established_date: '',
    office_type: '',
    office_status: ''
  },
  contact: {
    sys: '',
    net: '',
    dc: ''
  },
  address: {
    landmark: '',
    door: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  },
  additional: {
    description: '',
    desflow: ''
  }
};

const OfficeForm = ({ onSubmitSuccess }: OfficeFormProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isTabValid = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: // Basic Info
        return Object.values(formData.basicInfo).every(value => value.trim() !== '');
      case 1: // Contact
        return Object.values(formData.contact).every(value => value.trim() !== '');
      case 2: // Address
        return Object.values(formData.address).every(value => value.trim() !== '');
      case 3: // Additional
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  const areTabsValidUpTo = (tabIndex: number) => {
    for (let i = 0; i <= tabIndex; i++) {
      if (!isTabValid(i)) return false;
    }
    return true;
  };

  const isFormValid = () => areTabsValidUpTo(3);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    if (areTabsValidUpTo(newValue)) {
      setActiveTab(newValue);
    }
  };

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (activeTab < 3 && isTabValid(activeTab)) {
      setActiveTab(prevTab => prevTab + 1);
    }
  };

  const handleBack = (event: React.MouseEvent) => {
    event.preventDefault();
    if (activeTab > 0) {
      setActiveTab(prevTab => prevTab - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmitSuccess();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderBasicInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Office Code"
          value={formData.basicInfo.code}
          onChange={e => handleInputChange('basicInfo', 'code', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Registered Name"
          value={formData.basicInfo.registered_name}
          onChange={e => handleInputChange('basicInfo', 'registered_name', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          type="date"
          label="Established Date"
          value={formData.basicInfo.established_date}
          onChange={e => handleInputChange('basicInfo', 'established_date', e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth required size="small">
          <InputLabel>Office Type</InputLabel>
          <Select
            value={formData.basicInfo.office_type}
            label="Office Type"
            onChange={e => handleInputChange('basicInfo', 'office_type', e.target.value)}
          >
            <MenuItem value="Head Quarters">Head Quarters</MenuItem>
            <MenuItem value="Physical Office">Physical Office</MenuItem>
            <MenuItem value="Remote Office">Remote Office</MenuItem>
            <MenuItem value="Data Center">Data Center</MenuItem>
            <MenuItem value="Colo DC">Colo DC</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth required size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.basicInfo.office_status}
            label="Status"
            onChange={e => handleInputChange('basicInfo', 'office_status', e.target.value)}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Closed</MenuItem>
            <MenuItem value="coming_soon">Coming Soon</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  const renderContact = () => (
    <Grid container spacing={3}>
      {['sys', 'net', 'dc'].map((field) => (
        <Grid item xs={12} sm={4} key={field}>
          <TextField
            fullWidth
            required
            label={`${field.toUpperCase()} POC`}
            value={formData.contact[field as keyof typeof formData.contact]}
            onChange={e => handleInputChange('contact', field, e.target.value)}
            size="small"
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderAddress = () => (
    <Grid container spacing={3}>
      {Object.keys(formData.address).map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            required
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData.address[field as keyof typeof formData.address]}
            onChange={e => handleInputChange('address', field, e.target.value)}
            size="small"
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderAdditional = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={formData.additional.description}
          onChange={e => handleInputChange('additional', 'description', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="DESflow"
          value={formData.additional.desflow}
          onChange={e => handleInputChange('additional', 'desflow', e.target.value)}
          size="small"
          required
        />
      </Grid>
    </Grid>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Card elevation={3}>
        <CardContent sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab icon={<Business />} label="Basic Info" />
              <Tab icon={<People />} label="Contact" disabled={!areTabsValidUpTo(0)} />
              <Tab icon={<LocationOn />} label="Address" disabled={!areTabsValidUpTo(1)} />
              <Tab icon={<Description />} label="Additional" disabled={!areTabsValidUpTo(2)} />
            </Tabs>
          </Box>

          <Box sx={{ flex: 1, py: 3 }}>
            {activeTab === 0 && renderBasicInfo()}
            {activeTab === 1 && renderContact()}
            {activeTab === 2 && renderAddress()}
            {activeTab === 3 && renderAdditional()}
          </Box>

          <Box sx={{ mt: 'auto', pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                {activeTab > 0 && (
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={<NavigateBefore />}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
              </Grid>
              <Grid item>
                {activeTab === 3 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isFormValid() || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting Approval...' : 'Create Office'}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    endIcon={<NavigateNext />}
                    onClick={handleNext}
                    disabled={!isTabValid(activeTab)}
                  >
                    Next
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default OfficeForm;
