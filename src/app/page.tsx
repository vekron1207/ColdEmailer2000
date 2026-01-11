'use client';

import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h6" component="h1" fontWeight={600}>
              Automated Email Sender
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 8 }}>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            fontWeight={700}
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 3,
            }}
          >
            Send Emails at Scale
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            A modern, free email automation tool with dark mode, mobile support, and secure
            multi-user authentication.
          </Typography>

          {/* Features */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Stack spacing={2} alignItems="flex-start">
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleIcon color="success" />
                <Typography variant="body1" textAlign="left">
                  3,000 free emails per month with Resend API
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleIcon color="success" />
                <Typography variant="body1" textAlign="left">
                  Beautiful dark mode with persistent preferences
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleIcon color="success" />
                <Typography variant="body1" textAlign="left">
                  Mobile-responsive design for all devices
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleIcon color="success" />
                <Typography variant="body1" textAlign="left">
                  Track email history with detailed logs
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleIcon color="success" />
                <Typography variant="body1" textAlign="left">
                  Secure authentication with Supabase
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              href="/login"
              sx={{ minWidth: 200 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="/dashboard"
              sx={{ minWidth: 200 }}
            >
              Go to Dashboard
            </Button>
          </Stack>

          {/* Status */}
          <Typography variant="body2" color="text.secondary">
            Status: <strong style={{ color: '#2e7d32' }}>Foundation Complete</strong> • UI
            Components In Progress
          </Typography>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 3,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Built with Next.js, Material UI, Supabase, and Resend API
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
