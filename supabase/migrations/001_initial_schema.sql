-- Automated Email Sender - Initial Database Schema
-- This migration creates the database structure for the automated email sender

-- ============================================================================
-- USER SETTINGS TABLE
-- Stores user-specific configurations including encrypted API keys
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resend_api_key TEXT, -- Encrypted Resend API key
  sender_email TEXT,   -- Verified sender email address
  sender_name TEXT,    -- Display name for sender
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================================================
-- EMAIL LOGS TABLE
-- Tracks all email sending activities with status and metadata
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_preview TEXT, -- First 200 characters of email body
  status TEXT NOT NULL CHECK (status IN ('QUEUED', 'SENT', 'FAILED')),
  sent_at TIMESTAMP WITH TIME ZONE,
  queued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attachments JSONB DEFAULT '[]'::jsonb, -- Array of attachment metadata
  error_message TEXT, -- Error details if sending failed
  resend_email_id TEXT, -- Resend's tracking ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- EMAIL TEMPLATES TABLE (Future Feature)
-- Allows users to save and reuse email templates
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- Optimize common query patterns
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_templates_user_id ON email_templates(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensure users can only access their own data
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- User Settings Policies
CREATE POLICY "Users can view their own settings"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings"
  ON user_settings FOR DELETE
  USING (auth.uid() = user_id);

-- Email Logs Policies
CREATE POLICY "Users can view their own email logs"
  ON email_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own email logs"
  ON email_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own email logs"
  ON email_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own email logs"
  ON email_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Email Templates Policies
CREATE POLICY "Users can manage their own templates"
  ON email_templates FOR ALL
  USING (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS
-- Utility functions for common operations
-- ============================================================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for user_settings
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for email_templates
CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS
-- Useful aggregated views for analytics
-- ============================================================================

-- View for email statistics by user
CREATE OR REPLACE VIEW email_stats AS
SELECT
  user_id,
  COUNT(*) as total_emails,
  COUNT(*) FILTER (WHERE status = 'SENT') as sent_count,
  COUNT(*) FILTER (WHERE status = 'FAILED') as failed_count,
  COUNT(*) FILTER (WHERE status = 'QUEUED') as queued_count,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'SENT')::numeric / NULLIF(COUNT(*), 0)) * 100,
    2
  ) as success_rate,
  MAX(sent_at) as last_sent_at
FROM email_logs
GROUP BY user_id;

-- Grant access to the view
GRANT SELECT ON email_stats TO authenticated;

-- ============================================================================
-- COMMENTS
-- Documentation for tables and columns
-- ============================================================================

COMMENT ON TABLE user_settings IS 'Stores user-specific configuration including encrypted API keys';
COMMENT ON TABLE email_logs IS 'Comprehensive log of all email sending activities';
COMMENT ON TABLE email_templates IS 'Reusable email templates for quick composition';

COMMENT ON COLUMN user_settings.resend_api_key IS 'AES-256 encrypted Resend API key';
COMMENT ON COLUMN email_logs.body_preview IS 'First 200 characters for quick preview';
COMMENT ON COLUMN email_logs.attachments IS 'JSON array of attachment metadata: [{name, size, type}]';
COMMENT ON COLUMN email_logs.resend_email_id IS 'Resend service tracking ID for webhook integration';

-- ============================================================================
-- INITIAL DATA
-- Seed data for development/testing (optional)
-- ============================================================================

-- You can add default templates or test data here if needed
-- Example:
-- INSERT INTO email_templates (user_id, name, subject, body)
-- VALUES (
--   'your-test-user-id',
--   'Job Application Template',
--   'Application for {Position} at {Company}',
--   'Dear Hiring Manager,\n\nI am writing to express my interest...'
-- );
