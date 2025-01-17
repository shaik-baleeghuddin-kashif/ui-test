import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Typography,
  Autocomplete
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface MaintenanceFormProps {
  onSubmitSuccess: () => void;
}

interface FormData {
  vendor: string;
  circuit_id: string;
  desflow: string;
  vendor_ticket: string;
  start_time: Date | null;
  end_time: Date | null;
  description: string;
}

const initialFormData: FormData = {
  vendor: '',
  circuit_id: '',
  desflow: '',
  vendor_ticket: '',
  start_time: null,
  end_time: null,
  description: ''
};

// Mock data for vendors and circuits
const vendors = [
  'Verizon', 'AT&T', 'Comcast', 'CenturyLink', 'Sprint', 'T-Mobile',
  'Cox Communications', 'Charter Spectrum', 'Frontier Communications',
  'Windstream', 'Mediacom', 'Cable ONE'
];

const circuits = [
  'CKT-001', 'CKT-002', 'CKT-003', 'CKT-004', 'CKT-005',
  'CKT-006', 'CKT-007', 'CKT-008', 'CKT-009', 'CKT-010',
  'CKT-011', 'CKT-012', 'CKT-013', 'CKT-014', 'CKT-015'
];

const MaintenanceForm = ({ onSubmitSuccess }: MaintenanceFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return (
      formData.vendor !== '' &&
      formData.circuit_id !== '' &&
      formData.desflow !== '' &&
      formData.vendor_ticket !== '' &&
      formData.start_time !== null &&
      formData.end_time !== null &&
      formData.description !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitting maintenance record:', formData);
      onSubmitSuccess();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit} noValidate>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Maintenance Details</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={vendors}
                  renderInput={(params) => <TextField {...params} label="Vendor" required />}
                  value={formData.vendor}
                  onChange={(_, newValue) => handleInputChange('vendor', newValue || '')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={circuits}
                  renderInput={(params) => <TextField {...params} label="Circuit ID" required />}
                  value={formData.circuit_id}
                  onChange={(_, newValue) => handleInputChange('circuit_id', newValue || '')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="DESflow"
                  value={formData.desflow}
                  onChange={(e) => handleInputChange('desflow', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Vendor Ticket"
                  value={formData.vendor_ticket}
                  onChange={(e) => handleInputChange('vendor_ticket', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="Start Time"
                  value={formData.start_time}
                  onChange={(newValue) => handleInputChange('start_time', newValue)}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="End Time"
                  value={formData.end_time}
                  onChange={(newValue) => handleInputChange('end_time', newValue)}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Create Maintenance Record'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </LocalizationProvider>
  );
};

export default MaintenanceForm;
