// Database types matching Supabase schema

export interface UserSettings {
  id: string;
  user_id: string;
  resend_api_key: string | null;
  sender_email: string | null;
  sender_name: string | null;
  created_at: string;
  updated_at: string;
}

export type EmailStatus = 'QUEUED' | 'SENT' | 'FAILED';

export interface EmailLog {
  id: string;
  user_id: string;
  recipient_email: string;
  subject: string;
  body_preview: string | null;
  status: EmailStatus;
  sent_at: string | null;
  queued_at: string;
  attachments: AttachmentMetadata[];
  error_message: string | null;
  resend_email_id: string | null;
  created_at: string;
}

export interface AttachmentMetadata {
  name: string;
  size: number;
  type: string;
}

export interface EmailTemplate {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface EmailStats {
  user_id: string;
  total_emails: number;
  sent_count: number;
  failed_count: number;
  queued_count: number;
  success_rate: number;
  last_sent_at: string | null;
}

// Insert types (without auto-generated fields)
export type UserSettingsInsert = Omit<UserSettings, 'id' | 'created_at' | 'updated_at'>;
export type EmailLogInsert = Omit<EmailLog, 'id' | 'created_at'>;
export type EmailTemplateInsert = Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>;

// Update types (all fields optional except id)
export type UserSettingsUpdate = Partial<Omit<UserSettings, 'id' | 'user_id' | 'created_at'>>;
export type EmailLogUpdate = Partial<Omit<EmailLog, 'id' | 'user_id' | 'created_at'>>;
export type EmailTemplateUpdate = Partial<Omit<EmailTemplate, 'id' | 'user_id' | 'created_at'>>;
