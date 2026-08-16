# YUGARK Digital Studio — Production Backend & Lead Management Guide

This document provides step-by-step setup and deployment instructions for the **YUGARK Digital Studio** lead capture, database persistence, and executive administration backend.

---

## 1. System Architecture

```
[ Visitor / Client Form ] 
          │  (POST /api/leads with Honeypot & Deduplication)
          ▼
[ Express / Vercel API Gateway ]
   ├── 1. Rate Limiting & Validation
   ├── 2. Unique Lead Reference ID Generation (e.g. YG-2026-001001)
   ├── 3. Supabase PostgreSQL Storage (Row-Level-Security Protected)
   └── 4. Resend Transactional Email Notification -> business@yugark.in
          ▲
          │  (HMAC Session Auth)
[ Executive Admin Dashboard (/admin) ]
```

---

## 2. Supabase Database Setup

1. Sign in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create a new project named **`yugark-studio`**.
3. Navigate to **SQL Editor** from the left navigation sidebar.
4. Open or copy the contents of `supabase/migrations/001_create_leads.sql` from this repository.
5. Paste into the SQL Editor and click **Run**.
6. Navigate to **Project Settings -> API** to retrieve your credentials:
   - **Project URL** (`SUPABASE_URL`)
   - **anon / public key** (`SUPABASE_ANON_KEY`)
   - **service_role key** (`SUPABASE_SERVICE_ROLE_KEY`)

---

## 3. Resend Transactional Email Setup

1. Sign in to [Resend](https://resend.com).
2. Create an API Key in **API Keys** -> `Create API Key` with Full Access.
3. Save the key as `RESEND_API_KEY`.
4. The studio notification email will be dispatched to `business@yugark.in`.

---

## 4. Environment Variables Checklist

Configure these environment variables in your Vercel Project Settings (**Settings -> Environment Variables**) or local `.env`:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `SUPABASE_URL` | Your Supabase Project API URL | `https://xyzcompany.supabase.co` |
| `SUPABASE_ANON_KEY` | Public Anon Supabase Key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret Service Role Key (Keep private) | `eyJhbGciOi...` |
| `RESEND_API_KEY` | Resend API Key | `re_123456789...` |
| `EMAIL_FROM` | From Email Address | `YUGARK Studio <notifications@resend.dev>` |
| `ADMIN_EMAIL` | Studio Admin Email | `business@yugark.in` |
| `ADMIN_PASSWORD` | Executive Dashboard Password | `yugark2026` |
| `ADMIN_AUTH_SECRET` | 32+ character HMAC Signing Secret | `your-secure-crypto-secret-key` |
| `APP_URL` | Production Domain | `https://www.yugark.in` |

---

## 5. Security & Protection Layers

1. **Honeypot Bot Trap**: Automatic silent quarantine for automated bot submissions.
2. **Rate Limiting**: Limits duplicate requests per IP window to prevent spam bursts.
3. **Duplicate Submission Protection**: Deduplicates rapid double-clicks within a 60-second window while returning the existing Lead Reference ID.
4. **Resilient Offline / Fallback Mode**: If database credentials are being configured, the system automatically falls back to an in-memory session pipeline so zero form submissions are dropped.
5. **Session Security**: Admin access utilizes cryptographically signed HMAC tokens expiring after 7 days.

---

## 6. Accessing the Admin Dashboard

- **URL**: `https://www.yugark.in/admin`
- **Default Email**: `business@yugark.in`
- **Default PIN / Password**: `yugark2026` (or configured `ADMIN_PASSWORD`)
- **Features**:
  - Live lead metrics and pipeline status counts
  - Instant search across IDs, names, emails, and brands
  - Filter by Status (`NEW`, `CONTACTED`, `IN_PROGRESS`, `QUALIFIED`, `CONVERTED`, `CLOSED`, `SPAM`), Priority, and Industry Category
  - One-click direct WhatsApp chat launcher with pre-filled message
  - Direct email reply launcher
  - Internal executive private notes editor
  - Full CSV export capability
