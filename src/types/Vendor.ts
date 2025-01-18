export interface VendorData {
    status_code: number;
    success: boolean;
    message: string;
    data: Vendor[];
  }
  
  export interface Vendor {
    id: number;
    code: string;
    registered_name: string;
    address: string;
    onboard_date: string; // ISO 8601 date string
    is_upstack_support: boolean;
    account_number: string;
    vendor_portal: VendorPortal[];
    contact_details: VendorContact[];
    account_manager: AccountManager[];
    escalation_matrix: EscalationMatrix[];
    service_credit: ServiceCredit[];
    approved_by: string;
    last_approved_by: string;
    urid: number;
    desflow?: string;
    description?: string;
    created_at: string; // ISO 8601 date string
    created_by: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewVendor {
    code: string;
    registered_name: string;
    address: string;
    onboard_date: string; // ISO 8601 date string
    is_upstack_support?: boolean;
    account_number: string;
    vendor_portal: NewVendorPortal[];
    contact_details: NewVendorContact[];
    account_manager: NewAccountManager[];
    escalation_matrix: NewEscalationMatrix[];
    service_credit: NewServiceCredit[];
    desflow?: string;
    description?: string;
  }
  
  export interface VendorPortal {
    id: number;
    portal_type: string;
    portal_link: string;
    login_email: string;
    login_password: string;
    description?: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewVendorPortal {
    portal_type: string;
    portal_link: string;
    login_email: string;
    login_password: string;
    description?: string;
  }
  
  export interface VendorContact {
    id: number;
    team_name: string;
    email?: string;
    phone?: string;
    description?: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewVendorContact {
    team_name: string;
    email?: string;
    phone?: string;
    description?: string;
  }
  
  export interface AccountManager {
    id: number;
    manager_level: string;
    name: string;
    email: string;
    phone: string;
    available_from: string; // ISO 8601 date string
    available_till: string; // ISO 8601 date string
    description?: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewAccountManager {
    manager_level: string;
    name: string;
    email: string;
    phone: string;
    available_from: string; // ISO 8601 date string
    available_till: string; // ISO 8601 date string
    description?: string;
  }
  
  export interface EscalationMatrix {
    id: number;
    level: string;
    name: string;
    email: string;
    phone: string;
    team_name: string;
    available_from: string; // ISO 8601 date string
    available_till: string; // ISO 8601 date string
    description?: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewEscalationMatrix {
    level: string;
    name: string;
    email: string;
    phone: string;
    team_name: string;
    available_from: string; // ISO 8601 date string
    available_till: string; // ISO 8601 date string
    description?: string;
  }
  
  export interface ServiceCredit {
    id: number;
    outage_unit: string;
    from_range: string;
    to_range: string;
    credit_amount: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewServiceCredit {
    outage_unit: string;
    from_range: string;
    to_range: string;
    credit_amount: string;
  }
  