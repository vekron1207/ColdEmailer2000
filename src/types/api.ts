// API request and response types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserSettingsRequest {
  resend_api_key?: string;
  sender_email?: string;
  sender_name?: string;
}

export interface UserSettingsResponse {
  id: string;
  sender_email: string | null;
  sender_name: string | null;
  has_api_key: boolean; // Don't return actual key
}

export interface EmailLogsRequest {
  page?: number;
  pageSize?: number;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface SendEmailBatchRequest {
  subject: string;
  body: string;
  recipients: string[];
  attachments?: Array<{
    filename: string;
    content: string; // Base64
    type: string;
  }>;
  delaySeconds: number;
}

export interface SendEmailBatchResponse {
  success: boolean;
  sent: number;
  failed: number;
  total: number;
  errors: Array<{
    recipient: string;
    error: string;
  }>;
}

export interface TestConnectionRequest {
  api_key: string;
}

export interface TestConnectionResponse {
  success: boolean;
  message: string;
}
