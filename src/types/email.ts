// Email-related types for the application

export interface EmailComposition {
  subject: string;
  body: string;
  recipients: string[];
  attachments: File[];
  delaySeconds: number;
}

export interface EmailRecipient {
  email: string;
  id: string; // For UI purposes (chip removal)
}

export interface EmailSendRequest {
  subject: string;
  body: string;
  recipients: string[];
  attachments?: AttachmentData[];
  delaySeconds: number;
}

export interface AttachmentData {
  filename: string;
  content: string; // Base64 encoded
  type: string;
}

export interface EmailSendResponse {
  success: boolean;
  sent: number;
  failed: number;
  errors: EmailSendError[];
}

export interface EmailSendError {
  recipient: string;
  error: string;
}

export interface EmailPreviewData {
  subject: string;
  body: string;
  recipients: string[];
  attachments: File[];
}

export interface EmailValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CSVUploadResult {
  valid: string[];
  invalid: string[];
  duplicates: string[];
}

export interface EmailFilters {
  status?: 'ALL' | 'SENT' | 'FAILED' | 'QUEUED';
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export interface EmailLogWithActions {
  id: string;
  recipient_email: string;
  subject: string;
  status: string;
  sent_at: string | null;
  error_message: string | null;
  attachments: Array<{ name: string; size: number; type: string }>;
}
