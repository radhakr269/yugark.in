import { useState, useEffect, useMemo, useCallback } from 'react';
import SEO from '../components/SEO';
import { LeadStatus, LeadPriority, NotificationStatus } from '../types';
import {
  adminLogin,
  adminLogout,
  checkAdminSession,
  fetchAdminStats,
  fetchAdminLeads,
  updateAdminLead,
  deleteAdminLead,
  downloadLeadsCSV
} from '../lib/api';
import {
  Lock,
  Search,
  Mail,
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  Download,
  RefreshCw,
  LogOut,
  ArrowUpRight,
  Filter,
  Eye,
  X,
  Send,
  AlertTriangle,
  Flame,
  ChevronLeft,
  ChevronRight,
  Building,
  User,
  Layers,
  FileText
} from 'lucide-react';
import Logo from '../components/Logo';
import { WhatsAppIcon } from '../components/WhatsAppButton';

interface LeadItem {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  business_company_name: string;
  category: string;
  other_category?: string;
  selected_bundle: string;
  service?: string;
  project_requirement: string;
  remarks?: string;
  page_source: string;
  form_source: string;
  status: LeadStatus;
  priority: LeadPriority;
  admin_notes: string;
  notification_status: NotificationStatus;
  contacted_at?: string;
  converted_at?: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Login form state
  const [emailInput, setEmailInput] = useState<string>('business@yugark.in');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Leads and Dashboard data
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);

  // Filters, search & pagination
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalLeadsCount, setTotalLeadsCount] = useState<number>(0);

  // Verify session on mount
  useEffect(() => {
    async function verifyAuth() {
      setIsCheckingAuth(true);
      try {
        const session = await checkAdminSession();
        if (session.authenticated) {
          setIsAuthenticated(true);
          setAdminEmail(session.email || 'business@yugark.in');
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }
    verifyAuth();
  }, []);

  const loadData = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoadingLeads(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetchAdminLeads({
          search: searchQuery,
          status: statusFilter,
          priority: priorityFilter,
          category: categoryFilter,
          sortBy,
          sortOrder,
          page,
          limit
        }),
        fetchAdminStats()
      ]);

      if (leadsRes.success) {
        setLeads(leadsRes.data || []);
        setTotalPages(leadsRes.totalPages || 1);
        setTotalLeadsCount(leadsRes.total || 0);
      }

      if (statsRes.success) {
        setStats(statsRes.stats);
      }
    } catch (err) {
      console.error('[ADMIN LOAD DATA ERROR]', err);
    } finally {
      setIsLoadingLeads(false);
    }
  }, [isAuthenticated, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy, sortOrder, page, limit]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await adminLogin(emailInput, passwordInput);
      if (res.success) {
        setIsAuthenticated(true);
        setAdminEmail(emailInput);
        setPasswordInput('');
      } else {
        setAuthError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setAuthError('Unable to connect to login service.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
    setSelectedLead(null);
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await updateAdminLead(id, { status: newStatus });
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        fetchAdminStats().then((s) => s.success && setStats(s.stats));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handlePriorityChange = async (id: string, newPriority: LeadPriority) => {
    try {
      const res = await updateAdminLead(id, { priority: newPriority });
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, priority: newPriority } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, priority: newPriority });
        }
      }
    } catch (err) {
      console.error('Failed to update priority', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsSavingNote(true);
    try {
      const res = await updateAdminLead(selectedLead.id, { admin_notes: noteDraft });
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, admin_notes: noteDraft } : l))
        );
        setSelectedLead({ ...selectedLead, admin_notes: noteDraft });
      }
    } catch (err) {
      console.error('Failed to save notes', err);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete lead ${id}?`)) return;
    try {
      const res = await deleteAdminLead(id);
      if (res.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
        fetchAdminStats().then((s) => s.success && setStats(s.stats));
      }
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  };

  const openLeadModal = (lead: LeadItem) => {
    setSelectedLead(lead);
    setNoteDraft(lead.admin_notes || '');
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'NEW':
        return 'bg-[#D4B06A]/20 text-[#F0D28F] border-[#D4B06A]/40 font-bold animate-pulse';
      case 'CONTACTED':
        return 'bg-blue-950/40 text-blue-300 border-blue-800';
      case 'IN_PROGRESS':
        return 'bg-purple-950/40 text-purple-300 border-purple-800';
      case 'QUALIFIED':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-800';
      case 'CONVERTED':
        return 'bg-[#25D366]/20 text-[#25D366] border-[#25D366]/50 font-bold';
      case 'CLOSED':
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
      case 'SPAM':
        return 'bg-red-950/40 text-red-400 border-red-800 line-through';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  const getPriorityBadge = (priority: LeadPriority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-950/50 text-red-300 border-red-800 font-bold';
      case 'HIGH':
        return 'bg-amber-950/40 text-amber-300 border-amber-800';
      case 'MEDIUM':
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
      case 'LOW':
        return 'bg-neutral-900 text-neutral-500 border-neutral-800';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#D4B06A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#D4B06A]">Securing Studio Portal...</p>
        </div>
      </div>
    );
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <SEO title="Admin Executive Portal | YUGARK Digital Studio" />
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-[#D4B06A]/30 shadow-2xl space-y-6 gold-border-glow">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <Logo size="md" variant="default" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14120C] border border-[#D4B06A]/30 text-xs text-[#D4B06A] font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Studio Lead Management</span>
            </div>
            <h1 className="font-serif text-2xl text-white font-bold">Executive Access</h1>
            <p className="text-xs text-neutral-400">
              Sign in with your administrator credentials to manage incoming client project inquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                Admin Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="business@yugark.in"
                className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                Password / Security PIN
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password or PIN"
                className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-900 text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Admin Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 pb-20">
      <SEO title="Lead Management & Executive Dashboard | YUGARK Digital Studio" />

      {/* Admin Top Header */}
      <header className="bg-[#0A0A0A] border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Logo size="sm" variant="default" />
            <div className="hidden sm:block h-5 w-px bg-neutral-800" />
            <div className="hidden sm:block">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4B06A] block">
                Lead Management Portal
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {adminEmail}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={downloadLeadsCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] border border-neutral-800 hover:border-[#D4B06A]/40 text-xs font-medium text-white transition-colors"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#D4B06A]" />
              <span className="hidden md:inline">Export CSV</span>
            </button>

            <button
              onClick={loadData}
              disabled={isLoadingLeads}
              className="p-2 rounded-lg bg-[#141414] border border-neutral-800 hover:text-[#D4B06A] text-neutral-400 text-xs transition-colors"
              title="Refresh Pipeline"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin text-[#D4B06A]' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-900/50 hover:bg-red-900/50 text-red-300 text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">Total Leads</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white">{stats?.total ?? totalLeadsCount}</div>
            <div className="text-[10px] text-neutral-500 font-mono">Today: +{stats?.todayCount ?? 0}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#14120C] border border-[#D4B06A]/40 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-[#D4B06A] tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>New Leads</span>
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F0D28F]">{stats?.newLeads ?? 0}</div>
            <div className="text-[10px] text-[#D4B06A]/80 font-mono">Action Required</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider">Contacted</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-blue-300">{stats?.contacted ?? 0}</div>
            <div className="text-[10px] text-neutral-500 font-mono">In Touch</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-purple-400 tracking-wider">In Progress</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-purple-300">{stats?.inProgress ?? 0}</div>
            <div className="text-[10px] text-neutral-500 font-mono">Proposal Sent</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-[#25D366] tracking-wider">Converted</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#25D366]">{stats?.converted ?? 0}</div>
            <div className="text-[10px] text-emerald-400 font-mono">Active Clients</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">This Month</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white">{stats?.monthCount ?? 0}</div>
            <div className="text-[10px] text-neutral-500 font-mono">30-day velocity</div>
          </div>
        </div>

        {/* Filter, Search & Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search Lead ID, Name, Email, WhatsApp, Business..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 bg-[#121212] border border-neutral-800 text-xs text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="CONVERTED">CONVERTED</option>
                <option value="CLOSED">CLOSED</option>
                <option value="SPAM">SPAM</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 bg-[#121212] border border-neutral-800 text-xs text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none"
              >
                <option value="All">All Priorities</option>
                <option value="URGENT">URGENT</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 bg-[#121212] border border-neutral-800 text-xs text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Restaurant & Café">Restaurant & Café</option>
                <option value="Gym & Fitness">Gym & Fitness</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Healthcare & Clinic">Healthcare & Clinic</option>
                <option value="Coaching & Education">Coaching & Education</option>
                <option value="E-commerce & Retail">E-commerce & Retail</option>
                <option value="Salon & Beauty">Salon & Beauty</option>
                <option value="Hotel & Hospitality">Hotel & Hospitality</option>
                <option value="Corporate & B2B">Corporate & B2B</option>
                <option value="Local Business / Other">Local Business / Other</option>
              </select>

              <select
                value={`${sortBy}_${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('_');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="px-3 py-2 bg-[#121212] border border-neutral-800 text-xs text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none"
              >
                <option value="created_at_desc">Newest First</option>
                <option value="created_at_asc">Oldest First</option>
                <option value="priority_desc">Priority (High to Low)</option>
                <option value="full_name_asc">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table Container */}
        <div className="rounded-2xl bg-[#0A0A0A] border border-neutral-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0F0F0F] border-b border-neutral-800 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  <th className="py-3.5 px-4">Lead ID & Date</th>
                  <th className="py-3.5 px-4">Client & Company</th>
                  <th className="py-3.5 px-4">Direct Contact</th>
                  <th className="py-3.5 px-4">Bundle / Requirement</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-xs">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-neutral-500">
                      <FileText className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                      <p className="text-sm text-neutral-300 font-medium">No leads match the specified criteria</p>
                      <p className="text-xs text-neutral-500">Try clearing filters or search keywords.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#111111] transition-colors group cursor-pointer"
                      onClick={() => openLeadModal(lead)}
                    >
                      {/* ID & Date */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-mono font-bold text-[#F0D28F] group-hover:underline">
                          {lead.id}
                        </div>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-neutral-600" />
                          <span>
                            {new Date(lead.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 mt-1 inline-block">
                          {lead.page_source.split(' ')[0]}
                        </span>
                      </td>

                      {/* Client & Business */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white group-hover:text-[#F0D28F] transition-colors">
                          {lead.full_name}
                        </div>
                        <div className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-neutral-500" />
                          <span>{lead.business_company_name}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 block">
                          {lead.category} {lead.other_category ? `(${lead.other_category})` : ''}
                        </span>
                      </td>

                      {/* Contact Channels */}
                      <td className="py-4 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col gap-1">
                          <a
                            href={`https://wa.me/${lead.whatsapp_number.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.full_name)},%20Mr.%20Radha%20Krishna%20from%20YUGARK%20Digital%20Studio%20following%20up%20on%20your%20inquiry%20${lead.id}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#25D366] hover:underline font-medium"
                          >
                            <WhatsAppIcon className="w-3 h-3" />
                            <span>{lead.whatsapp_number}</span>
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white"
                          >
                            <Mail className="w-3 h-3 text-neutral-500" />
                            <span className="truncate max-w-[140px]">{lead.email}</span>
                          </a>
                        </div>
                      </td>

                      {/* Package & Scope */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="text-neutral-200 font-medium truncate">
                          {lead.selected_bundle}
                        </div>
                        <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                          {lead.project_requirement}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className={`text-[10px] px-2.5 py-1 rounded-full border focus:outline-none transition-colors ${getStatusBadge(lead.status)}`}
                        >
                          <option value="NEW" className="bg-black text-white">NEW</option>
                          <option value="CONTACTED" className="bg-black text-white">CONTACTED</option>
                          <option value="IN_PROGRESS" className="bg-black text-white">IN PROGRESS</option>
                          <option value="QUALIFIED" className="bg-black text-white">QUALIFIED</option>
                          <option value="CONVERTED" className="bg-black text-white">CONVERTED</option>
                          <option value="CLOSED" className="bg-black text-white">CLOSED</option>
                          <option value="SPAM" className="bg-black text-white">SPAM</option>
                        </select>
                      </td>

                      {/* Priority */}
                      <td className="py-4 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.priority}
                          onChange={(e) => handlePriorityChange(lead.id, e.target.value as LeadPriority)}
                          className={`text-[10px] px-2 py-1 rounded-md border focus:outline-none transition-colors ${getPriorityBadge(lead.priority)}`}
                        >
                          <option value="LOW" className="bg-black text-white">LOW</option>
                          <option value="MEDIUM" className="bg-black text-white">MEDIUM</option>
                          <option value="HIGH" className="bg-black text-white">HIGH</option>
                          <option value="URGENT" className="bg-black text-white">URGENT</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openLeadModal(lead)}
                            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800"
                            title="View Full Lead Details"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#D4B06A]" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 bg-[#0F0F0F] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <div>
                Showing page <span className="text-white font-medium">{page}</span> of{' '}
                <span className="text-white font-medium">{totalPages}</span> ({totalLeadsCount} total leads)
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#D4B06A] flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#D4B06A] flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* Detailed Lead Modal / Drawer */}
      {selectedLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedLead(null);
          }}
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0A0A0A] border border-[#D4B06A]/30 rounded-3xl shadow-2xl overflow-y-auto gold-border-glow p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-neutral-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-[#F0D28F]">{selectedLead.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadge(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md border ${getPriorityBadge(selectedLead.priority)}`}>
                    {selectedLead.priority} Priority
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  {selectedLead.full_name} — {selectedLead.business_company_name}
                </h3>
                <p className="text-xs text-neutral-400">
                  Received on {new Date(selectedLead.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} via {selectedLead.page_source}
                </p>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info & Direct Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121212] p-4 rounded-2xl border border-neutral-800">
              <div className="space-y-2">
                <div className="text-[11px] uppercase font-bold text-[#D4B06A] tracking-wider">Client Contact</div>
                <div className="text-sm font-semibold text-white">{selectedLead.full_name}</div>
                <div className="text-xs text-neutral-300">Brand: {selectedLead.business_company_name}</div>
                <div className="text-xs text-neutral-400">Industry: {selectedLead.category} {selectedLead.other_category ? `(${selectedLead.other_category})` : ''}</div>
              </div>

              <div className="space-y-3 flex flex-col justify-center">
                <a
                  href={`https://wa.me/${selectedLead.whatsapp_number.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedLead.full_name)},%20Mr.%20Radha%20Krishna%20here%20from%20YUGARK%20Digital%20Studio.%20Following%20up%20on%20your%20project%20inquiry%20${selectedLead.id}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Open WhatsApp Direct Chat</span>
                </a>

                <a
                  href={`mailto:${selectedLead.email}?subject=YUGARK%20Digital%20Studio%20—%20Inquiry%20${selectedLead.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-neutral-700 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#D4B06A]" />
                  <span>Send Direct Email ({selectedLead.email})</span>
                </a>
              </div>
            </div>

            {/* Scope Details */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider block mb-1">
                  Selected Service / Bundle
                </span>
                <div className="p-3 bg-[#121212] border border-neutral-800 rounded-xl text-sm font-medium text-[#F0D28F]">
                  {selectedLead.selected_bundle}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider block mb-1">
                  Project Requirement & Goals
                </span>
                <div className="p-4 bg-[#121212] border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.project_requirement}
                </div>
              </div>

              {selectedLead.remarks && (
                <div>
                  <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider block mb-1">
                    Client Remarks / Preferred Call Time
                  </span>
                  <div className="p-3 bg-[#121212] border border-neutral-800 rounded-xl text-xs text-neutral-300">
                    {selectedLead.remarks}
                  </div>
                </div>
              )}
            </div>

            {/* Pipeline Stage Updater */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#0F0F0F] rounded-2xl border border-neutral-800">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#D4B06A] tracking-wider mb-2">
                  Update Pipeline Status
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full p-2.5 bg-[#141414] border border-neutral-700 rounded-xl text-xs text-white focus:border-[#D4B06A] focus:outline-none font-semibold"
                >
                  <option value="NEW">NEW (Uncontacted)</option>
                  <option value="CONTACTED">CONTACTED (Follow-up done)</option>
                  <option value="IN_PROGRESS">IN PROGRESS (Proposal / Review)</option>
                  <option value="QUALIFIED">QUALIFIED (Budget & Timeline Fit)</option>
                  <option value="CONVERTED">CONVERTED (Deal Closed & Active)</option>
                  <option value="CLOSED">CLOSED (Completed / Not Interested)</option>
                  <option value="SPAM">SPAM (Bot / Invalid)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#D4B06A] tracking-wider mb-2">
                  Set Lead Priority
                </label>
                <select
                  value={selectedLead.priority}
                  onChange={(e) => handlePriorityChange(selectedLead.id, e.target.value as LeadPriority)}
                  className="w-full p-2.5 bg-[#141414] border border-neutral-700 rounded-xl text-xs text-white focus:border-[#D4B06A] focus:outline-none font-semibold"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT (Immediate Close)</option>
                </select>
              </div>
            </div>

            {/* Admin Notes Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#D4B06A] tracking-wider">
                  Internal Executive Notes (Private)
                </span>
                <span className="text-[10px] text-neutral-500">Only visible to Founder & Studio Admin</span>
              </div>
              <textarea
                rows={3}
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Add follow-up notes, call summary, agreed pricing, wireframe link, or client preferences..."
                className="w-full p-3 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNote}
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5"
                >
                  {isSavingNote ? (
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Save Notes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footer info & delete */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Email Notification: <strong className="text-neutral-300">{selectedLead.notification_status}</strong></span>
              <button
                onClick={() => handleDelete(selectedLead.id)}
                className="text-red-400 hover:text-red-300 font-semibold hover:underline"
              >
                Delete Lead Record
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
