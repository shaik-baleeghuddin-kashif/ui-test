export interface Response {
    status_code: number;
    success: boolean;
    message: string;
    urid: number;
  }
  
  export interface ErrorResponse {
    status_code: number;
    success: boolean;
    message: string;
  }
  
  export interface MResponse {
    status_code: number;
    success: boolean;
    message: string;
    mid: number;
  }
  
  export interface RResponse {
    status_code: number;
    success: boolean;
    message: string;
    id: number;
  }
  
  export interface FetchOptions {
    filter?: Record<string, string | number | boolean>;
    orderBy?: string[];
    pageSize?: number;
    offset?: number;
}