import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard  from './pages/dashboard/Dashboard';
import OfficeList from './pages/offices/OfficeList';
import OfficeDetail from './pages/offices/OfficeDetail';
import CircuitList from './pages/circuits/CircuitList';
import CircuitDetail from './pages/circuits/CircuitDetail';
import MaintenanceList from './pages/maintenance/MaintenanceList';
import MaintenanceDetail from './pages/maintenance/MaintenanceDetail';
import VendorList from './pages/vendors/VendorList';
import VendorDetail from './pages/vendors/VendorDetail';
import ApprovalList from './pages/approvals/ApprovalList';
import ApprovalDetail from './pages/approvals/ApprovalDetail';
import NotFound from './pages/errors/NotFound';
import UnAuthorized from './pages/errors/UnAuthorized';
import New from './pages/new/New';
import Docs from './pages/docs/Docs';

export function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Main routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Office routes */}
      <Route path="/offices" element={<OfficeList />} />
      <Route path="/offices/:id" element={<OfficeDetail />} />
      
      {/* Circuit routes */}
      <Route path="/circuits" element={<CircuitList />} />
      <Route path="/circuits/:id" element={<CircuitDetail />} />
      
      {/* Maintenance routes */}
      <Route path="/maintenance" element={<MaintenanceList />} />
      <Route path="/maintenances" element={<MaintenanceList />} />
      <Route path="/maintenance/:id" element={<MaintenanceDetail />} />
      <Route path="/maintenances/:id" element={<MaintenanceDetail />} />
      
      {/* Vendor routes */}
      <Route path="/vendors" element={<VendorList />} />
      <Route path="/vendors/:id" element={<VendorDetail />} />
      
      {/* Approval routes */}
      <Route path="/approvals" element={<ApprovalList />} />
      <Route path="/approvals/:id" element={<ApprovalDetail />} />
      
      {/* New Record routes */}
      <Route path="/new" element={<New />} />

      {/* Docs routes */}
      <Route path="/docs" element={<Docs />} />

      {/* Error routes */}
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}