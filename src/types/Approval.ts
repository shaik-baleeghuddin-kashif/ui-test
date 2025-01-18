export interface ApprovalResponse {
    status_code: number;
    success: boolean;
    message: string;
    data: Approval[];
  }
  
  export interface Approval {
    urid: number;
    entity: string;
    item_id?: number;
    action: string;
    status: string;
    previous_data?: any;
    updated_data?: any;
    message?: string;
    updater: string;
    approver?: string;
    desflow?: string;
    transactions: ApprovalTransaction[];
    reviewers: ApprovalReviewer[];
    created_at: string; // ISO 8601 date string
    last_updated: string; // ISO 8601 date string
  }
  
  export interface NewApproval {
    status: string;
    updated_data: any;
    message?: string;
    desflow?: string;
  }
  
  export interface ApprovalTransaction {
    id: number;
    approval_urid: number;
    transaction_id: number;
    current_data?: any;
    updated_data?: any;
    transaction_type: string;
    old_status?: string;
    new_status?: string;
    message?: string;
    user: string;
    created_at: string; // ISO 8601 date string
  }
  
  export interface ApprovalReviewer {
    id: number;
    approval_urid: number;
    reviewer: string;
    requested_by: string;
    requested_at: string; // ISO 8601 date string
  }
  