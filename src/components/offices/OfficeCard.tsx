import React from 'react';
import { Card, CardContent, Chip, IconButton, Tooltip } from '@mui/material';
import { Edit, LocationOn, CalendarToday, Person } from '@mui/icons-material';
import { Office } from '../../types/Office';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface OfficeCardProps {
  office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
  const navigate = useNavigate();

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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 relative bg-white">
      <CardContent className="p-6">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip title="Edit Office">
            <IconButton
              size="small"
              onClick={() => navigate(`/offices/${office.id}/edit`)}
              className="text-primary bg-primary/10 hover:bg-primary/20"
            >
              <Edit className="text-sm" />
            </IconButton>
          </Tooltip>
        </div>

        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800">{office.registered_name}</h3>
            <Chip
              label={office.office_status}
              size="small"
              className={`${getStatusColor(office.office_status)} text-white ml-2`}
            />
          </div>
          <p className="text-sm text-gray-500">Code: {office.code}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <LocationOn className="text-primary" fontSize="small" />
            <span className="text-sm">
              {office.address.city}, {office.address.country}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <CalendarToday className="text-primary" fontSize="small" />
            <span className="text-sm">
              {format(new Date(office.established_date), 'MMM dd, yyyy')}
            </span>
          </div>

          {office.poc.sys && (
            <div className="flex items-center gap-3 text-gray-600">
              <Person className="text-primary" fontSize="small" />
              <span className="text-sm truncate">POC: {office.poc.sys}</span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <Chip
            label={office.office_type}
            size="small"
            className="bg-secondary/50 text-primary font-medium"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OfficeCard;