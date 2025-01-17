import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import {
  Business,
  ContactMail,
  SupervisorAccount,
  EscalatorWarning,
  CreditScore,
  Description,
  NavigateNext,
  NavigateBefore,
  Add,
  Delete,
} from '@mui/icons-material';

interface VendorFormProps {
  onSubmitSuccess: () => void;
}

interface VendorPortal {
  portalType: string;
  portalLink: string;
  loginEmail: string;
  description: string;
}

interface VendorContact {
  team: string;
  email: string;
  phone: string;
  description: string;
}

interface AccountManager {
  managerLevel: string;
  name: string;
  email: string;
  phone: string;
  availableFrom: Date;
  availableTill: Date;
  description: string;
}

interface EscalationMatrix {
  level: string;
  name: string;
  email: string;
  phone: string;
  team: string;
  availableFrom: Date;
  availableTill: Date;
  description: string;
}

interface ServiceCredit {
  outageUnit: string;
  fromRange: string;
  toRange: string;
  credit: string;
}

interface FormData {
  code: string;
  registeredName: string;
  address: string;
  onboardDate: Date | null;
  isUpstackSupport: boolean;
  accountNumber: string;
  vendorPortal: VendorPortal[];
  contactDetails: VendorContact[];
  accountManager: AccountManager[];
  escalationMatrix: EscalationMatrix[];
  serviceCredit: ServiceCredit[];
  imageType: string;
  imageUrl: string;
  desflow: string;
  description: string;
}

const initialFormData: FormData = {
  code: '',
  registeredName: '',
  address: '',
  onboardDate: null,
  isUpstackSupport: false,
  accountNumber: '',
  vendorPortal: [],
  contactDetails: [],
  accountManager: [],
  escalationMatrix: [],
  serviceCredit: [],
  imageType: '',
  imageUrl: '',
  desflow: '',
  description: '',
};

const VendorForm: React.FC<VendorFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  type ArrayField = Extract<keyof FormData, 'vendorPortal' | 'contactDetails' | 'accountManager' | 'escalationMatrix' | 'serviceCredit'>;

  const handleArrayInputChange = <T extends ArrayField>(
    field: T,
    index: number,
    subField: keyof FormData[T][number],
    value: FormData[T][number][keyof FormData[T][number]]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, [subField]: value } : item
      ) as FormData[T],
    }));
  };

  const addArrayItem = <T extends ArrayField>(field: T) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], {} as FormData[T][number]],
    }));
  };

  const removeArrayItem = <T extends ArrayField>(field: T, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const isTabValid = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: // Basic Info
        return (
          formData.code &&
          formData.registeredName &&
          formData.address &&
          formData.onboardDate &&
          formData.accountNumber
        );
      case 1: // Vendor Portal
        return formData.vendorPortal.every(
          (portal) =>
            portal.portalType && portal.portalLink && portal.loginEmail
        );
      case 2: // Contact Details
        return formData.contactDetails.every((contact) => contact.team && (contact.email || contact.phone));
      case 3: // Account Manager
        return formData.accountManager.every(
          (manager) =>
            manager.managerLevel &&
            manager.name &&
            manager.email &&
            manager.phone &&
            manager.availableFrom &&
            manager.availableTill
        );
      case 4: // Escalation Matrix
        return formData.escalationMatrix.every(
          (escalation) =>
            escalation.level &&
            escalation.name &&
            escalation.email &&
            escalation.phone &&
            escalation.team &&
            escalation.availableFrom &&
            escalation.availableTill
        );
      case 5: // Service Credit
        return formData.serviceCredit.every(
          (credit) => credit.outageUnit && credit.fromRange && credit.toRange && credit.credit
        );
      case 6: // Additional Info
        return !!formData.desflow;
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

  const isFormValid = () => areTabsValidUpTo(6);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Submitting vendor record:', formData);
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
    if (activeTab < 6 && isTabValid(activeTab)) {
      setActiveTab((prevTab) => prevTab + 1);
    }
  };

  const handleBack = (event: React.MouseEvent) => {
    event.preventDefault();
    if (activeTab > 0) {
      setActiveTab((prevTab) => prevTab - 1);
    }
  };

  const renderBasicInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Vendor Code"
          value={formData.code}
          onChange={(e) => handleInputChange('code', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Registered Name"
          value={formData.registeredName}
          onChange={(e) => handleInputChange('registeredName', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          label="Address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          size="small"
          multiline
          rows={3}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Onboard Date"
          type="date"
          value={formData.onboardDate}
          onChange={(e) => handleInputChange('onboardDate', e.target.value)}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Account Number"
          value={formData.accountNumber}
          onChange={(e) => handleInputChange('accountNumber', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.isUpstackSupport}
              onChange={(e) => handleInputChange('isUpstackSupport', e.target.checked)}
            />
          }
          label="Upstack Support"
        />
      </Grid>
    </Grid>
  );

  const renderVendorPortal = () => (
    <Box>
      {formData.vendorPortal.map((portal, index) => (
        <Grid container spacing={3} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Portal Type"
              value={portal.portalType}
              onChange={(e) =>
                handleArrayInputChange('vendorPortal', index, 'portalType', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Portal Link"
              value={portal.portalLink}
              onChange={(e) =>
                handleArrayInputChange('vendorPortal', index, 'portalLink', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Login Email"
              value={portal.loginEmail}
              onChange={(e) =>
                handleArrayInputChange('vendorPortal', index, 'loginEmail', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={portal.description}
              onChange={(e) =>
                handleArrayInputChange('vendorPortal', index, 'description', e.target.value)
              }
              size="small"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={() => removeArrayItem('vendorPortal', index)} color="error">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button startIcon={<Add />} onClick={() => addArrayItem('vendorPortal')}>
        Add Portal
      </Button>
    </Box>
  );

  const renderContactDetails = () => (
    <Box>
      {formData.contactDetails.map((contact, index) => (
        <Grid container spacing={3} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Team"
              value={contact.team}
              onChange={(e) =>
                handleArrayInputChange('contactDetails', index, 'team', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={contact.email}
              onChange={(e) =>
                handleArrayInputChange('contactDetails', index, 'email', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={contact.phone}
              onChange={(e) =>
                handleArrayInputChange('contactDetails', index, 'phone', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={contact.description}
              onChange={(e) =>
                handleArrayInputChange('contactDetails', index, 'description', e.target.value)
              }
              size="small"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={() => removeArrayItem('contactDetails', index)} color="error">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button startIcon={<Add />} onClick={() => addArrayItem('contactDetails')}>
        Add Contact
      </Button>
    </Box>
  );

  const renderAccountManager = () => (
    <Box>
      {formData.accountManager.map((manager, index) => (
        <Grid container spacing={3} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Manager Level"
              value={manager.managerLevel}
              onChange={(e) =>
                handleArrayInputChange('accountManager', index, 'managerLevel', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Name"
              value={manager.name}
              onChange={(e) =>
                handleArrayInputChange('accountManager', index, 'name', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Email"
              value={manager.email}
              onChange={(e) =>
                handleArrayInputChange('accountManager', index, 'email', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Phone"
              value={manager.phone}
              onChange={(e) =>
                handleArrayInputChange('accountManager', index, 'phone', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Available From"
              type="date"
              value={manager.availableFrom}
              onChange={(e) =>
                handleArrayInputChange('accountManager', index, 'availableFrom', e.target.value)
              }
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Available Till"
              type="date"
              value={manager.availableTill}
              onChange={(e) =>
                handleArrayInputChange('accountManager', index, 'availableTill', e.target.value)
              }
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={manager.description}
              onChange={(e) =>
                handleArrayInputChange('accountManager', index, 'description', e.target.value)
              }
              size="small"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={() => removeArrayItem('accountManager', index)} color="error">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button startIcon={<Add />} onClick={() => addArrayItem('accountManager')}>
        Add Account Manager
      </Button>
    </Box>
  );

  const renderEscalationMatrix = () => (
    <Box>
      {formData.escalationMatrix.map((escalation, index) => (
        <Grid container spacing={3} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Level"
              value={escalation.level}
              onChange={(e) =>
                handleArrayInputChange('escalationMatrix', index, 'level', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Name"
              value={escalation.name}
              onChange={(e) =>
                handleArrayInputChange('escalationMatrix', index, 'name', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Email"
              value={escalation.email}
              onChange={(e) =>
                handleArrayInputChange('escalationMatrix', index, 'email', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Phone"
              value={escalation.phone}
              onChange={(e) =>
                handleArrayInputChange('escalationMatrix', index, 'phone', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Team"
              value={escalation.team}
              onChange={(e) =>
                handleArrayInputChange('escalationMatrix', index, 'team', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Available From"
              type="date"
              value={escalation.availableFrom}
              onChange={(e) =>
                handleArrayInputChange('escalationMatrix', index, 'availableFrom', e.target.value)
              }
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Available Till"
              type="date"
              value={escalation.availableTill}
              onChange={(e) =>
                handleArrayInputChange('escalationMatrix', index, 'availableTill', e.target.value)
              }
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={escalation.description}
              onChange={(e) =>
                handleArrayInputChange('escalationMatrix', index, 'description', e.target.value)
              }
              size="small"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={() => removeArrayItem('escalationMatrix', index)} color="error">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button startIcon={<Add />} onClick={() => addArrayItem('escalationMatrix')}>
        Add Escalation Level
      </Button>
    </Box>
  );

  const renderServiceCredit = () => (
    <Box>
      {formData.serviceCredit.map((credit, index) => (
        <Grid container spacing={3} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Outage Unit"
              value={credit.outageUnit}
              onChange={(e) =>
                handleArrayInputChange('serviceCredit', index, 'outageUnit', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="From Range"
              value={credit.fromRange}
              onChange={(e) =>
                handleArrayInputChange('serviceCredit', index, 'fromRange', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="To Range"
              value={credit.toRange}
              onChange={(e) =>
                handleArrayInputChange('serviceCredit', index, 'toRange', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Credit Amount"
              value={credit.credit}
              onChange={(e) =>
                handleArrayInputChange('serviceCredit', index, 'credit', e.target.value)
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={() => removeArrayItem('serviceCredit', index)} color="error">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button startIcon={<Add />} onClick={() => addArrayItem('serviceCredit')}>
        Add Service Credit
      </Button>
    </Box>
  );

  const renderAdditionalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Image Type"
          value={formData.imageType}
          onChange={(e) => handleInputChange('imageType', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Image URL"
          value={formData.imageUrl}
          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
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
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          size="small"
          multiline
          rows={4}
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
              <Tab icon={<ContactMail />} label="Portal" disabled={!areTabsValidUpTo(0)} />
              <Tab icon={<ContactMail />} label="Contacts" disabled={!areTabsValidUpTo(1)} />
              <Tab icon={<SupervisorAccount />} label="Managers" disabled={!areTabsValidUpTo(2)} />
              <Tab icon={<EscalatorWarning />} label="Escalation" disabled={!areTabsValidUpTo(3)} />
              <Tab icon={<CreditScore />} label="Service Credit" disabled={!areTabsValidUpTo(4)} />
              <Tab icon={<Description />} label="Additional" disabled={!areTabsValidUpTo(5)} />
            </Tabs>
          </Box>
  
          <Box sx={{ flex: 1, py: 3 }}>
            {activeTab === 0 && renderBasicInfo()}
            {activeTab === 1 && renderVendorPortal()}
            {activeTab === 2 && renderContactDetails()}
            {activeTab === 3 && renderAccountManager()}
            {activeTab === 4 && renderEscalationMatrix()}
            {activeTab === 5 && renderServiceCredit()}
            {activeTab === 6 && renderAdditionalInfo()}
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
                {activeTab === 6 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isFormValid() || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Create Vendor'}
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
}

export default VendorForm;