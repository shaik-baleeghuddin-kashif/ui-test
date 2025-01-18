export interface CircuitData {
    status_code: number;
    success: boolean;
    message: string;
    data: Circuit[];
  }
  
  export interface Circuit {
    id: number;
    circuit_type: string;
    vendor: string;
    code: string;
    point_a: CircuitEndPoint;
    point_z: CircuitEndPoint;
    bandwidth: string;
    bandwidth_unit: string;
    latency?: string;
    is_macsec?: boolean;
    is_ipsec?: boolean;
    mtu_size?: string;
    redundancy?: string;
    is_upstack_support?: boolean;
    approved_by: string;
    last_approved_by: string;
    urid: number;
    image_type?: string;
    image?: string; // Changed from []byte to string (base64 encoded)
    image_url?: string;
    desflow?: string;
    description?: string;
    created_at: string; // ISO 8601 date string
    created_by: string;
    last_updated: string; // ISO 8601 date string
    updated_by: string;
  }
  
  export interface NewCircuit {
    circuit_type: string;
    vendor: string;
    code: string;
    point_a: CircuitEndPoint;
    point_z: CircuitEndPoint;
    bandwidth: string;
    bandwidth_unit: string;
    latency?: string;
    is_macsec?: boolean;
    is_ipsec?: boolean;
    mtu_size?: string;
    redundancy?: string;
    is_upstack_support?: boolean;
    image_type?: string;
    image?: string; // Changed from []byte to string (base64 encoded)
    image_url?: string;
    desflow?: string;
    description?: string;
  }
  
  export interface CircuitEndPoint {
    office: string;
    device?: string;
    interface?: string;
    description?: string;
  }
  