-- ==============================================================================
-- YUGARK DIGITAL STUDIO — PRODUCTION DATABASE MIGRATION
-- Migration: 001_create_leads.sql
-- Description: Creates the leads / enquiries table, indexes, triggers, and RLS policies
-- ==============================================================================

-- 1. Create Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id VARCHAR(32) PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    
    -- Client Contact Information
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    whatsapp_number VARCHAR(30) NOT NULL,
    business_company_name VARCHAR(150) NOT NULL,
    
    -- Business Classification & Package Scope
    category VARCHAR(100) DEFAULT 'Other',
    other_category VARCHAR(100),
    selected_bundle VARCHAR(150) DEFAULT 'Package 1 — Website Development',
    service VARCHAR(150),
    other_service VARCHAR(150),
    
    -- Project Requirements
    project_requirement TEXT NOT NULL,
    remarks TEXT,
    
    -- Attribution & Provenance
    page_source VARCHAR(150) DEFAULT 'Contact Form',
    form_source VARCHAR(150) DEFAULT 'Website Contact Form',
    
    -- Lead Pipeline State
    status VARCHAR(30) NOT NULL DEFAULT 'NEW' 
        CHECK (status IN ('NEW', 'CONTACTED', 'IN_PROGRESS', 'QUALIFIED', 'CONVERTED', 'CLOSED', 'SPAM')),
    priority VARCHAR(30) NOT NULL DEFAULT 'MEDIUM' 
        CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
    
    -- Internal Admin Workflows
    admin_notes TEXT DEFAULT '',
    notification_status VARCHAR(30) NOT NULL DEFAULT 'PENDING'
        CHECK (notification_status IN ('PENDING', 'EMAIL_SENT', 'EMAIL_FAILED', 'SKIPPED')),
    
    -- Activity Timestamps
    contacted_at TIMESTAMPTZ,
    converted_at TIMESTAMPTZ,
    
    -- Safe Request Tracking
    ip_hash_or_safe_request_identifier VARCHAR(64),
    user_agent_if_appropriate TEXT
);

-- 2. Create Performance Indexes for Fast Filtering & Search
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON public.leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_category ON public.leads(category);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads(whatsapp_number);

-- 3. Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION public.handle_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trigger_leads_updated_at ON public.leads;
CREATE TRIGGER trigger_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_leads_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Service Role has full administrative read/write access
CREATE POLICY "Service role full access on leads" 
    ON public.leads 
    FOR ALL 
    USING (auth.jwt()->>'role' = 'service_role' OR auth.role() = 'service_role')
    WITH CHECK (auth.jwt()->>'role' = 'service_role' OR auth.role() = 'service_role');

-- Public Anon insert policy (allows website visitors to submit project enquiries via secure server endpoint)
CREATE POLICY "Public anon insert leads" 
    ON public.leads 
    FOR INSERT 
    WITH CHECK (true);

-- Authenticated Admin read/write policy (matched against authenticated admin email or admin role)
CREATE POLICY "Admin full access on leads" 
    ON public.leads 
    FOR ALL 
    TO authenticated 
    USING (auth.jwt()->>'email' IN ('business@yugark.in', 'business@ugar.in', 'radhakr269@gmail.com') OR auth.jwt()->>'role' = 'admin')
    WITH CHECK (auth.jwt()->>'email' IN ('business@yugark.in', 'business@ugar.in', 'radhakr269@gmail.com') OR auth.jwt()->>'role' = 'admin');
