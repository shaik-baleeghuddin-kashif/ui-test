import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Autocomplete,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab
} from '@mui/material';
import {
  Business,
  Router,
  Speed,
  Description,
  NavigateNext,
  NavigateBefore
} from '@mui/icons-material';

interface CircuitFormProps {
  onSubmitSuccess: () => void;
}

interface PointData {
  office: string;
  device: string;
  interface: string;
  description: string;
}

interface FormData {
  circuit_type: string;
  vendor: string;
  code: string;
  point_a: PointData;
  point_z: PointData;
  bandwidth: string;
  bandwidth_unit: string;
  latency: string;
  is_macsec: boolean;
  is_ipsec: boolean;
  mtu_size: string;
  redundancy: string;
  is_upstack_support: boolean;
  desflow: string;
  description: string;
}

const initialFormData: FormData = {
  circuit_type: '',
  vendor: '',
  code: '',
  point_a: { office: '', device: '', interface: '', description: '' },
  point_z: { office: '', device: '', interface: '', description: '' },
  bandwidth: '',
  bandwidth_unit: '',
  latency: '',
  is_macsec: false,
  is_ipsec: false,
  mtu_size: '',
  redundancy: '',
  is_upstack_support: false,
  desflow: '',
  description: ''
};

// Mock data (replace with actual data from API or props)
const circuitTypes = ["Enterprise", "Market"];
const bandwidthUnits = ["MBPS", "GBPS", "TBPS"];
const vendors = ["Cisco", "Juniper", "Huawei", "Nokia", "Arista"];
const offices = ["New York Office", "London Office", "Tokyo Office", "Sydney Office"];

const CircuitForm = ({ onSubmitSuccess }: CircuitFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePointChange = (point: 'point_a' | 'point_z', field: keyof PointData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [point]: {
        ...prev[point],
        [field]: value
      }
    }));
  };

  const isTabValid = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: // Basic Info
        return formData.circuit_type && formData.vendor && formData.code;
      case 1: // Point A
        return Object.values(formData.point_a).every(value => value !== '');
      case 2: // Point Z
        return Object.values(formData.point_z).every(value => value !== '');
      case 3: // Technical Details
        return formData.bandwidth && formData.bandwidth_unit && formData.latency && formData.mtu_size;
      case 4: // Additional Info
        return formData.redundancy && formData.desflow;
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

  const isFormValid = () => areTabsValidUpTo(4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitting circuit record:', formData);
      onSubmitSuccess();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    if (areTabsValidUpTo(newValue)) {
      setActiveTab(newValue);
    }
  };

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (activeTab < 4 && isTabValid(activeTab)) {
      setActiveTab(prevTab => prevTab + 1);
    }
  };

  const handleBack = (event: React.MouseEvent) => {
    event.preventDefault();
    if (activeTab > 0) {
      setActiveTab(prevTab => prevTab - 1);
    }
  };

  const renderBasicInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth size="small">
          <InputLabel>Circuit Type</InputLabel>
          <Select
            value={formData.circuit_type}
            label="Circuit Type"
            onChange={(e) => handleInputChange('circuit_type', e.target.value)}
          >
            {circuitTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Autocomplete
          options={vendors}
          renderInput={(params) => <TextField {...params} label="Vendor" required size="small" />}
          value={formData.vendor}
          onChange={(_, newValue) => handleInputChange('vendor', newValue || '')}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          label="Code"
          value={formData.code}
          onChange={(e) => handleInputChange('code', e.target.value)}
          size="small"
        />
      </Grid>
    </Grid>
  );

  const renderPointDetails = (point: 'point_a' | 'point_z') => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={offices}
          renderInput={(params) => <TextField {...params} label="Office" required size="small" />}
          value={formData[point].office}
          onChange={(_, newValue) => handlePointChange(point, 'office', newValue || '')}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Device"
          value={formData[point].device}
          onChange={(e) => handlePointChange(point, 'device', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Interface"
          value={formData[point].interface}
          onChange={(e) => handlePointChange(point, 'interface', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Description"
          value={formData[point].description}
          onChange={(e) => handlePointChange(point, 'description', e.target.value)}
          size="small"
        />
      </Grid>
    </Grid>
  );

  const renderTechnicalDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Bandwidth"
          value={formData.bandwidth}
          onChange={(e) => handleInputChange('bandwidth', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Bandwidth Unit</InputLabel>
          <Select
            value={formData.bandwidth_unit}
            label="Bandwidth Unit"
            onChange={(e) => handleInputChange('bandwidth_unit', e.target.value)}
          >
            {bandwidthUnits.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Latency"
          value={formData.latency}
          onChange={(e) => handleInputChange('latency', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="MTU Size"
          value={formData.mtu_size}
          onChange={(e) => handleInputChange('mtu_size', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.is_macsec}
              onChange={(e) => handleInputChange('is_macsec', e.target.checked)}
            />
          }
          label="MACSEC"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.is_ipsec}
              onChange={(e) => handleInputChange('is_ipsec', e.target.checked)}
            />
          }
          label="IPSEC"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.is_upstack_support}
              onChange={(e) => handleInputChange('is_upstack_support', e.target.checked)}
            />
          }
          label="Upstack Support"
        />
      </Grid>
    </Grid>
  );

  const renderAdditionalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Redundancy"
          value={formData.redundancy}
          onChange={(e) => handleInputChange('redundancy', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="DESflow"
          value={formData.desflow}
          onChange={(e) => handleInputChange('desflow', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          size="small"
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
              <Tab icon={<Router />} label="Point A" disabled={!areTabsValidUpTo(0)} />
              <Tab icon={<Router />} label="Point Z" disabled={!areTabsValidUpTo(1)} />
              <Tab icon={<Speed />} label="Technical" disabled={!areTabsValidUpTo(2)} />
              <Tab icon={<Description />} label="Additional" disabled={!areTabsValidUpTo(3)} />
            </Tabs>
          </Box>

          <Box sx={{ flex: 1, py: 3 }}>
            {activeTab === 0 && renderBasicInfo()}
            {activeTab === 1 && renderPointDetails('point_a')}
            {activeTab === 2 && renderPointDetails('point_z')}
            {activeTab === 3 && renderTechnicalDetails()}
            {activeTab === 4 && renderAdditionalInfo()}
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
                {activeTab === 4 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isFormValid() || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Create Circuit'}
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

export default CircuitForm;
