export interface OfficeData {
    status_code: number;
    success: boolean;
    message: string;
    data: Office[];
  }
  
  export interface Office {
    id: string;
    code: string;
    registered_name: string;
    established_date: string; // ISO 8601 date string
    office_type: string;
    office_status: string;
    poc: POC;
    address: Address;
    approved_by?: string;
    last_approved_by?: string;
    urid?: number;
    desflow?: string;
    description?: string;
    created_at: string; // ISO 8601 date string
    created_by: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewOffice {
    code: string;
    registered_name: string;
    established_date: string; // ISO 8601 date string
    office_type: string;
    office_status: string;
    poc: POC;
    address: Address;
    desflow?: string;
    description?: string;
  }
  
  export interface POC {
    sys?: string;
    net?: string;
    dc?: string;
  }
  
  export interface Address {
    landmark?: string;
    door?: string;
    building?: string;
    street?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  }
  