import { Resend } from 'resend';

export interface SendEmailParams {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: string; // Base64
  }>;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Sends an email using Resend API
 * @param apiKey - Resend API key
 * @param params - Email parameters
 * @returns Send result
 */
export async function sendEmail(
  apiKey: string,
  params: SendEmailParams
): Promise<SendEmailResult> {
  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: params.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      attachments: params.attachments?.map(att => ({
        filename: att.filename,
        content: Buffer.from(att.content, 'base64'),
      })),
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Tests Resend API connection
 * @param apiKey - Resend API key to test
 * @returns Test result
 */
export async function testConnection(apiKey: string): Promise<SendEmailResult> {
  try {
    const resend = new Resend(apiKey);

    // Simple API call to verify the key works
    // Note: In production, you might want to send a test email to yourself
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['delivered@resend.dev'], // Resend's test email
      subject: 'API Key Test',
      html: '<p>Testing API key connection</p>',
    });

    if (error) {
      return {
        success: false,
        error: error.message || 'Invalid API key',
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}

/**
 * Converts plain text email body to HTML
 * @param text - Plain text content
 * @returns HTML formatted content
 */
export function textToHTML(text: string): string {
  return text
    .split('\n')
    .map(line => `<p>${line || '<br>'}</p>`)
    .join('');
}
