import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit,
  ArrowBack,
  LocationOn,
  CalendarToday,
  Person,
  Business,
  Description,
  Badge,
  Update,
  Email,
  Phone,
  Language,
  Delete,
} from '@mui/icons-material';
import { Office } from '../../types/Office';
import { getOffices } from '../../services/officeService';
import { format } from 'date-fns';

const OfficeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOfficeDetail();
  }, [id]);

  const fetchOfficeDetail = async () => {
    try {
      setLoading(true);
      const options = {
        filter: { id: Number(id) },
      };
      const data = await getOffices(options);
      if (data && data.length > 0) {
        setOffice(data[0]);
      } else {
        setError('Office not found');
      }
    } catch (err) {
      setError('Failed to fetch office details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500';
      case 'inactive':
        return 'bg-rose-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <CircularProgress className="text-primary" />
      </div>
    );
  }

  if (error || !office) {
    return (
      <div className="p-8">
        <Alert
          severity="error"
          className="mb-4 shadow-sm"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={fetchOfficeDetail}
              className="normal-case"
            >
              Retry
            </Button>
          }
        >
          {error || 'Office not found'}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/offices')}
          variant="outlined"
          className="normal-case [&.MuiButton-root]:border-primary [&.MuiButton-root]:text-primary hover:bg-primary/5"
        >
          Back to Offices
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/offices')}
              className="normal-case [&.MuiButton-root]:text-gray-600 hover:bg-gray-50"
            >
              Back to Offices
            </Button>
            <div className="flex gap-3">
              <Button
                startIcon={<Edit />}
                onClick={() => navigate(`/offices/${id}/edit`)}
                variant="contained"
                className="bg-primary hover:bg-primary/90 shadow-sm normal-case"
              >
                Edit Office
              </Button>
              <Button
                startIcon={<Delete />}
                variant="outlined"
                className="normal-case [&.MuiButton-root]:border-rose-500 [&.MuiButton-root]:text-rose-500 hover:bg-rose-50"
              >
                Delete Office
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Grid container spacing={4}>
          {/* Left Column - Basic Info */}
          <Grid item xs={12} lg={8}>
            <Paper className="p-6 shadow-sm bg-white rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                    {office.registered_name}
                  </Typography>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Badge className="text-primary" />
                    <Typography>Code: {office.code}</Typography>
                  </div>
                </div>
                <Chip
                  label={office.office_status}
                  className={`${getStatusColor(office.office_status)} text-white px-3`}
                />
              </div>

              <Divider className="my-6" />

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <div className="flex items-start gap-3">
                    <Business className="text-primary mt-1" />
                    <div>
                      <Typography variant="subtitle2" className="font-semibold text-gray-900">
                        Office Type
                      </Typography>
                      <Typography className="text-gray-600">{office.office_type}</Typography>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className="flex items-start gap-3">
                    <CalendarToday className="text-primary mt-1" />
                    <div>
                      <Typography variant="subtitle2" className="font-semibold text-gray-900">
                        Established Date
                      </Typography>
                      <Typography className="text-gray-600">
                        {format(new Date(office.established_date), 'MMMM dd, yyyy')}
                      </Typography>
                    </div>
                  </div>
                </Grid>

                {office.description && (
                  <Grid item xs={12}>
                    <div className="flex items-start gap-3">
                      <Description className="text-primary mt-1" />
                      <div>
                        <Typography variant="subtitle2" className="font-semibold text-gray-900">
                          Description
                        </Typography>
                        <Typography className="text-gray-600">{office.description}</Typography>
                      </div>
                    </div>
                  </Grid>
                )}
              </Grid>
            </Paper>

            {/* Address Section */}
            <Paper className="p-6 mt-4 shadow-sm bg-white rounded-xl">
              <Typography variant="h6" className="font-semibold text-gray-900 mb-6">
                Location Details
              </Typography>
              <div className="flex items-start gap-3">
                <LocationOn className="text-primary mt-1" />
                <div className="space-y-2 text-gray-600">
                  {office.address.building && (
                    <Typography>{office.address.building}</Typography>
                  )}
                  <Typography>
                    {[office.address.door, office.address.street, office.address.landmark]
                      .filter(Boolean)
                      .join(', ')}
                  </Typography>
                  <Typography>
                    {office.address.city}, {office.address.state} {office.address.zip}
                  </Typography>
                  <Typography className="font-medium">{office.address.country}</Typography>
                </div>
              </div>
            </Paper>
          </Grid>

          {/* Right Column - Additional Info */}
          <Grid item xs={12} lg={4}>
            {/* Contact Information */}
            {/* <Paper className="p-6 mb-4 shadow-sm bg-white rounded-xl">
              <Typography variant="h6" className="font-semibold text-gray-900 mb-6">
                Contact Information
              </Typography>
              <div className="space-y-4">
                {office.contact?.email && (
                  <div className="flex items-center gap-3">
                    <Email className="text-primary" />
                    <Typography className="text-gray-600">{office.contact.email}</Typography>
                  </div>
                )}
                {office.contact?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary" />
                    <Typography className="text-gray-600">{office.contact.phone}</Typography>
                  </div>
                )}
                {office.contact?.website && (
                  <div className="flex items-center gap-3">
                    <Language className="text-primary" />
                    <Typography className="text-gray-600">{office.contact.website}</Typography>
                  </div>
                )}
              </div>
            </Paper> */}

            {/* POC Information */}
            <Paper className="p-6 mb-4 shadow-sm bg-white rounded-xl">
              <Typography variant="h6" className="font-semibold text-gray-900 mb-6">
                Points of Contact
              </Typography>
              <div className="space-y-4">
                {office.poc.sys && (
                  <div className="flex items-start gap-3">
                    <Person className="text-primary mt-1" />
                    <div>
                      <Typography variant="subtitle2" className="font-semibold text-gray-900">
                        System POC
                      </Typography>
                      <Typography className="text-gray-600">{office.poc.sys}</Typography>
                    </div>
                  </div>
                )}
                {office.poc.net && (
                  <div className="flex items-start gap-3">
                    <Person className="text-primary mt-1" />
                    <div>
                      <Typography variant="subtitle2" className="font-semibold text-gray-900">
                        Network POC
                      </Typography>
                      <Typography className="text-gray-600">{office.poc.net}</Typography>
                    </div>
                  </div>
                )}
                {office.poc.dc && (
                  <div className="flex items-start gap-3">
                    <Person className="text-primary mt-1" />
                    <div>
                      <Typography variant="subtitle2" className="font-semibold text-gray-900">
                        DC POC
                      </Typography>
                      <Typography className="text-gray-600">{office.poc.dc}</Typography>
                    </div>
                  </div>
                )}
              </div>
            </Paper>

            {/* Audit Information */}
            <Paper className="p-6 shadow-sm bg-white rounded-xl">
              <Typography variant="h6" className="font-semibold text-gray-900 mb-6">
                Audit Information
              </Typography>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Update className="text-primary mt-1" />
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-900">
                      Created By
                    </Typography>
                    <Typography className="text-gray-600">{office.created_by}</Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {format(new Date(office.created_at), 'MMM dd, yyyy HH:mm')}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Update className="text-primary mt-1" />
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-900">
                      Last Updated By
                    </Typography>
                    <Typography className="text-gray-600">{office.updated_by}</Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {format(new Date(office.last_updated), 'MMM dd, yyyy HH:mm')}
                    </Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OfficeDetail;