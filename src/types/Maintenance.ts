export interface MaintenanceData {
    status_code: number;
    success: boolean;
    message: string;
    data: Maintenance[];
  }
  
  export interface Maintenance {
    mid: number;
    vendor: string;
    circuit_id: string;
    desflow: string;
    vendor_ticket: string;
    start_time: string; // ISO 8601 date string
    end_time: string; // ISO 8601 date string
    description: string;
    status: string;
    created_at: string; // ISO 8601 date string
    created_by: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewMaintenance {
    vendor: string;
    circuit_id: string;
    desflow: string;
    vendor_ticket: string;
    start_time: string; // ISO 8601 date string
    end_time: string; // ISO 8601 date string
    description: string;
  }
  