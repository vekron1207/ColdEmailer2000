// Supabase Database types
// This is a placeholder - in a real app, you would generate this from Supabase CLI

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          resend_api_key: string | null;
          sender_email: string | null;
          sender_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resend_api_key?: string | null;
          sender_email?: string | null;
          sender_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resend_api_key?: string | null;
          sender_email?: string | null;
          sender_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      email_logs: {
        Row: {
          id: string;
          user_id: string;
          recipient_email: string;
          subject: string;
          body_preview: string | null;
          status: 'QUEUED' | 'SENT' | 'FAILED';
          sent_at: string | null;
          queued_at: string;
          attachments: Json;
          error_message: string | null;
          resend_email_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          recipient_email: string;
          subject: string;
          body_preview?: string | null;
          status: 'QUEUED' | 'SENT' | 'FAILED';
          sent_at?: string | null;
          queued_at?: string;
          attachments?: Json;
          error_message?: string | null;
          resend_email_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          recipient_email?: string;
          subject?: string;
          body_preview?: string | null;
          status?: 'QUEUED' | 'SENT' | 'FAILED';
          sent_at?: string | null;
          queued_at?: string;
          attachments?: Json;
          error_message?: string | null;
          resend_email_id?: string | null;
          created_at?: string;
        };
      };
      email_templates: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          subject: string;
          body: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          subject: string;
          body: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          subject?: string;
          body?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      email_stats: {
        Row: {
          user_id: string;
          total_emails: number;
          sent_count: number;
          failed_count: number;
          queued_count: number;
          success_rate: number;
          last_sent_at: string | null;
        };
      };
    };
    Functions: {};
    Enums: {};
  };
}
