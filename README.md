# Automated Email Sender

A modern, full-stack automated email sender built with Next.js, Material UI, Supabase, and Resend API. Features a beautiful dark mode UI, mobile-responsive design, and secure multi-user authentication.

## Features

- **Free Email Sending**: Uses Resend API (3,000 emails/month free tier)
- **Dark Mode**: Beautiful light and dark themes with persistent preference
- **Mobile Responsive**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Secure Authentication**: Multi-user support with Supabase Auth
- **Email History**: Track all sent emails with status, timestamps, and error logs
- **Batch Sending**: Send to multiple recipients with customizable delays
- **Attachment Support**: Attach PDFs, documents, and images
- **Email Templates**: Save and reuse email templates (future feature)

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Material UI (MUI) v6** - Component library with theming
- **TypeScript** - Type-safe development
- **Emotion** - CSS-in-JS styling

### Backend
- **Next.js API Routes** - Serverless functions
- **Resend API** - Email sending service
- **Supabase** - PostgreSQL database and authentication

### Deployment
- **Vercel** - Frontend and API hosting
- **Supabase** - Database hosting

## Project Structure

```
automated-email/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   ├── page.tsx              # Landing page
│   │   ├── login/                # Authentication pages
│   │   ├── dashboard/            # Dashboard pages
│   │   │   ├── compose/          # Email composition
│   │   │   ├── history/          # Email history/logs
│   │   │   └── settings/         # User settings
│   │   └── api/                  # API routes
│   │       ├── email/            # Email endpoints
│   │       └── settings/         # Settings endpoints
│   │
│   ├── components/               # React components
│   │   ├── layout/               # Navigation components
│   │   ├── email/                # Email-related components
│   │   ├── history/              # History components
│   │   └── settings/             # Settings components
│   │
│   ├── lib/                      # Utilities and services
│   │   ├── supabase/             # Supabase clients
│   │   ├── resend/               # Resend API wrapper
│   │   └── utils/                # Helper functions
│   │
│   ├── theme/                    # MUI theme configuration
│   └── types/                    # TypeScript types
│
├── supabase/
│   └── migrations/               # Database migrations
├── public/                       # Static assets
├── .env.example                  # Environment variables template
└── IMPLEMENTATION_GUIDE.md       # Detailed implementation guide
```

## Quick Start

### 1. Prerequisites

- Node.js 18+
- Supabase account (free tier)
- Resend account (free tier)

### 2. Installation

```bash
# Clone or navigate to project directory
cd "f:/Work/Automated Email"

# Install dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy environment template
copy .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase (from supabase.com dashboard)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Encryption Secret (generate with: openssl rand -hex 32)
ENCRYPTION_SECRET=your_64_character_hex_string

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Copy and run the SQL from `supabase/migrations/001_initial_schema.sql`
4. Enable Email Auth in Authentication > Providers

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

**user_settings**
- Stores user-specific configuration
- Encrypted Resend API keys
- Sender email and name

**email_logs**
- Complete audit trail of all emails
- Status tracking (QUEUED, SENT, FAILED)
- Error messages for debugging
- Resend tracking IDs

**email_templates** (Future)
- Reusable email templates
- Subject and body storage

### Security

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- API keys encrypted with AES-256-GCM
- Session management handled by Supabase

## API Endpoints

### Email Endpoints

- `POST /api/email/send-batch` - Send emails to multiple recipients
- `GET /api/email/logs` - Fetch email history with filters

### Settings Endpoints

- `GET /api/settings` - Get user settings
- `POST /api/settings` - Update user settings
- `POST /api/settings/test` - Test Resend API connection

## Features in Detail

### Email Composition

- Rich text email body
- Multiple recipients (manual or CSV import)
- File attachments (PDF, DOCX, images)
- Customizable delay between emails (1-60 seconds)
- Email preview before sending

### Email History

- View all sent emails
- Filter by status, date range, recipient
- Detailed statistics (success rate, total sent, failed)
- Retry failed emails
- Export data (future feature)

### Settings

- Configure Resend API key
- Set sender email and name
- Test email connection
- Update account settings

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Structure

- **Client Components**: Use `'use client'` directive for browser-only code
- **Server Components**: Default for API routes and data fetching
- **TypeScript**: Strict mode enabled for type safety
- **Validation**: All inputs validated on client and server

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables (same as `.env.local`)
4. Deploy

### Environment Variables for Production

Set these in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ENCRYPTION_SECRET`
- `NEXT_PUBLIC_APP_URL` (your vercel domain)

## Free Tier Limits

- **Vercel**: Unlimited deployments, 100GB bandwidth/month
- **Supabase**: 500MB database, 2GB storage, 50K MAU
- **Resend**: 3,000 emails/month, 100 emails/day

**Total Cost**: $0/month for moderate usage

## Security Best Practices

1. **API Keys**: Encrypted before storing in database
2. **Authentication**: Supabase session-based auth
3. **Authorization**: RLS policies enforce user data access
4. **Input Validation**: Client and server-side validation
5. **HTTPS**: Enforced in production
6. **Rate Limiting**: Prevent abuse (optional implementation)

## Mobile Optimization

- Responsive breakpoints: Mobile (<600px), Tablet (600-960px), Desktop (>960px)
- Touch-friendly buttons (min 44px)
- Collapsible sidebar on mobile
- Card-based layouts for small screens
- Bottom navigation for primary actions

## Dark Mode

- System preference detection
- Manual toggle (sun/moon icon)
- Preference saved to localStorage
- All components theme-aware
- Smooth transitions

## Troubleshooting

### Common Issues

**"Supabase connection failed"**
- Check environment variables are set correctly
- Verify Supabase project is active
- Check database migrations ran successfully

**"Email sending failed"**
- Verify Resend API key is valid
- Check sender email is verified in Resend
- Review error message in email logs

**"Authentication not working"**
- Ensure Email Auth is enabled in Supabase
- Check NEXT_PUBLIC_APP_URL matches your domain
- Clear browser cookies and try again

## Future Enhancements

- [ ] Email templates system
- [ ] Scheduled sending (cron jobs)
- [ ] Email analytics (open rates via webhooks)
- [ ] Team collaboration
- [ ] Contact list management
- [ ] A/B testing for subject lines
- [ ] Email campaign tracking
- [ ] Rich text editor (WYSIWYG)
- [ ] Drag-and-drop email builder

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For detailed implementation instructions, see [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [Material UI](https://mui.com)
- [Supabase](https://supabase.com)
- [Resend](https://resend.com)

---

**Note**: This application is intended for professional communication (job applications, networking, etc.) - not for marketing spam or unsolicited bulk emailing. Please use responsibly and comply with anti-spam regulations.
