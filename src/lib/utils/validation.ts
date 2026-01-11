import { EmailValidationResult, CSVUploadResult } from '@/types/email';

/**
 * Validates an email address using RFC 5322 standard
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex (simplified but robust)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || typeof email !== 'string') {
    return false;
  }

  // Trim whitespace
  email = email.trim();

  // Basic format check
  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional checks
  const [localPart, domain] = email.split('@');

  // Local part should not exceed 64 characters
  if (localPart.length > 64) {
    return false;
  }

  // Domain should not exceed 255 characters
  if (domain.length > 255) {
    return false;
  }

  // Domain should have at least one dot
  if (!domain.includes('.')) {
    return false;
  }

  return true;
}

/**
 * Validates multiple email addresses
 * @param emails - Array of email addresses
 * @returns Validation result with valid and invalid emails
 */
export function validateEmails(emails: string[]): EmailValidationResult {
  const errors: string[] = [];

  if (!emails || emails.length === 0) {
    errors.push('No recipients provided');
    return { valid: false, errors };
  }

  const invalidEmails = emails.filter(email => !isValidEmail(email));

  if (invalidEmails.length > 0) {
    errors.push(`Invalid email addresses: ${invalidEmails.join(', ')}`);
  }

  return {
    valid: invalidEmails.length === 0,
    errors,
  };
}

/**
 * Removes duplicate emails from a list
 * @param emails - Array of email addresses
 * @returns Array of unique emails (case-insensitive)
 */
export function deduplicateEmails(emails: string[]): string[] {
  const seen = new Set<string>();
  return emails.filter(email => {
    const normalized = email.trim().toLowerCase();
    if (seen.has(normalized)) {
      return false;
    }
    seen.add(normalized);
    return true;
  });
}

/**
 * Parses CSV content and extracts email addresses
 * @param csvContent - Raw CSV content
 * @returns Upload result with valid, invalid, and duplicate emails
 */
export function parseCSVEmails(csvContent: string): CSVUploadResult {
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim());
  const allEmails: string[] = [];

  lines.forEach(line => {
    // Split by comma, semicolon, or tab
    const parts = line.split(/[,;\t]/).map(part => part.trim());
    allEmails.push(...parts);
  });

  // Remove empty strings
  const nonEmpty = allEmails.filter(email => email.length > 0);

  // Separate valid and invalid
  const valid: string[] = [];
  const invalid: string[] = [];

  nonEmpty.forEach(email => {
    if (isValidEmail(email)) {
      valid.push(email);
    } else {
      invalid.push(email);
    }
  });

  // Find duplicates
  const uniqueValid = deduplicateEmails(valid);
  const duplicates = valid.filter(email =>
    uniqueValid.indexOf(email.toLowerCase()) === -1
  );

  return {
    valid: uniqueValid,
    invalid,
    duplicates: Array.from(new Set(duplicates)),
  };
}

/**
 * Validates email composition data
 * @param subject - Email subject
 * @param body - Email body
 * @param recipients - Array of recipient emails
 * @returns Validation result
 */
export function validateEmailComposition(
  subject: string,
  body: string,
  recipients: string[]
): EmailValidationResult {
  const errors: string[] = [];

  if (!subject || subject.trim().length === 0) {
    errors.push('Subject is required');
  }

  if (subject && subject.length > 500) {
    errors.push('Subject must be less than 500 characters');
  }

  if (!body || body.trim().length === 0) {
    errors.push('Email body is required');
  }

  if (body && body.length > 100000) {
    errors.push('Email body must be less than 100,000 characters');
  }

  if (!recipients || recipients.length === 0) {
    errors.push('At least one recipient is required');
  }

  if (recipients && recipients.length > 100) {
    errors.push('Maximum 100 recipients per batch');
  }

  // Validate all recipient emails
  const emailValidation = validateEmails(recipients);
  if (!emailValidation.valid) {
    errors.push(...emailValidation.errors);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates file upload for attachments
 * @param file - File to validate
 * @param maxSizeBytes - Maximum file size in bytes (default 10MB)
 * @returns true if valid, error message otherwise
 */
export function validateAttachment(
  file: File,
  maxSizeBytes: number = 10 * 1024 * 1024
): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File "${file.name}" exceeds maximum size of ${maxSizeBytes / 1024 / 1024}MB`,
    };
  }

  // Check file type (allow common document and image types)
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif',
    'text/plain',
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type}" is not allowed for "${file.name}"`,
    };
  }

  return { valid: true };
}

/**
 * Validates total attachment size
 * @param files - Array of files
 * @param maxTotalSizeBytes - Maximum total size in bytes (default 10MB)
 * @returns Validation result
 */
export function validateAttachments(
  files: File[],
  maxTotalSizeBytes: number = 10 * 1024 * 1024
): { valid: boolean; error?: string } {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > maxTotalSizeBytes) {
    return {
      valid: false,
      error: `Total attachment size (${(totalSize / 1024 / 1024).toFixed(2)}MB) exceeds maximum of ${maxTotalSizeBytes / 1024 / 1024}MB`,
    };
  }

  // Validate each file individually
  for (const file of files) {
    const validation = validateAttachment(file);
    if (!validation.valid) {
      return validation;
    }
  }

  return { valid: true };
}
