import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { Office } from '../../types/Office';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface OfficeTableProps {
  offices: Office[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const OfficeTable: React.FC<OfficeTableProps> = ({
  offices,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
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
    <Paper className="overflow-hidden shadow-md bg-white">
      <TableContainer className="max-h-[calc(100vh-300px)]">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold bg-gray-50">Office Name</TableCell>
              <TableCell className="font-semibold bg-gray-50">Code</TableCell>
              <TableCell className="font-semibold bg-gray-50">Type</TableCell>
              <TableCell className="font-semibold bg-gray-50">Location</TableCell>
              <TableCell className="font-semibold bg-gray-50">Status</TableCell>
              <TableCell className="font-semibold bg-gray-50">Established Date</TableCell>
              <TableCell className="font-semibold bg-gray-50">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offices.map((office) => (
              <TableRow
                key={office.id}
                hover
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={() => navigate(`/offices/${office.id}`)}
              >
                <TableCell className="font-medium">{office.registered_name}</TableCell>
                <TableCell className="text-gray-600">{office.code}</TableCell>
                <TableCell>
                  <Chip
                    label={office.office_type}
                    size="small"
                    className="bg-secondary/50 text-primary font-medium"
                  />
                </TableCell>
                <TableCell className="text-gray-600">
                  {office.address.city}, {office.address.country}
                </TableCell>
                <TableCell>
                  <Chip
                    label={office.office_status}
                    size="small"
                    className={`${getStatusColor(office.office_status)} text-white`}
                  />
                </TableCell>
                <TableCell className="text-gray-600">
                  {format(new Date(office.established_date), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 opacity-70 hover:opacity-100 transition-opacity">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/offices/${office.id}`);
                        }}
                        className="text-primary bg-primary/10 hover:bg-primary/20"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Office">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/offices/${office.id}/edit`);
                        }}
                        className="text-primary bg-primary/10 hover:bg-primary/20"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50]}
        className="border-t border-gray-100"
      />
    </Paper>
  );
};

export default OfficeTable;