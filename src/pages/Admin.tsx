import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { LeadStatus, LeadPriority, NotificationStatus } from '../types';
import {
  adminLogin,
  adminLogout,
  checkAdminSession,
  fetchAdminStats,
  fetchAdminLeads,
  fetchAdminFilterOptions,
  updateAdminLead,
  deleteAdminLead,
  downloadLeadsExcel,
  retryCommunicationChannel
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
  ArrowLeft,
  Filter,
  Eye,
  X,
  Send,
  AlertTriangle,
  AlertCircle,
  Flame,
  ChevronLeft,
  ChevronRight,
  Building,
  User,
  Layers,
  FileText,
  FileSpreadsheet,
  Phone,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Check
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
  email_status?: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED';
  email_sent_at?: string | null;
  email_error?: string | null;
  whatsapp_status?: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED' | 'OPTED_OUT';
  whatsapp_sent_at?: string | null;
  whatsapp_message_id?: string | null;
  whatsapp_error?: string | null;
  internal_notification_status?: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED';
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
  const [loadError, setLoadError] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);
  const [retryingChannel, setRetryingChannel] = useState<string | null>(null);

  // Filters, search & pagination
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clientFilter, setClientFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [datePreset, setDatePreset] = useState<string>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [dynamicOptions, setDynamicOptions] = useState<{
    categories: string[];
    sources: string[];
    services: string[];
  }>({
    categories: [],
    sources: [],
    services: []
  });

  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalLeadsCount, setTotalLeadsCount] = useState<number>(0);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (clientFilter.trim()) count++;
    if (statusFilter !== 'All') count++;
    if (priorityFilter !== 'All') count++;
    if (categoryFilter !== 'All') count++;
    if (sourceFilter !== 'All') count++;
    if (serviceFilter !== 'All') count++;
    if (fromDate) count++;
    if (toDate) count++;
    return count;
  }, [searchQuery, clientFilter, statusFilter, priorityFilter, categoryFilter, sourceFilter, serviceFilter, fromDate, toDate]);

  // Load distinct filter options on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminFilterOptions().then((opts) => {
        if (opts && (opts.categories?.length || opts.sources?.length || opts.services?.length)) {
          setDynamicOptions(opts);
        }
      });
    }
  }, [isAuthenticated]);

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
    setLoadError('');
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetchAdminLeads({
          search: searchQuery,
          client: clientFilter,
          status: statusFilter,
          priority: priorityFilter,
          category: categoryFilter,
          source: sourceFilter,
          service: serviceFilter,
          fromDate,
          toDate,
          sortBy,
          sortOrder,
          page,
          limit
        }),
        fetchAdminStats().catch(() => ({ success: false, stats: null }))
      ]);

      if (leadsRes && leadsRes.success) {
        setLeads(leadsRes.data || []);
        setTotalPages(leadsRes.totalPages || 1);
        setTotalLeadsCount(leadsRes.total ?? 0);
      } else if (leadsRes && leadsRes.error) {
        setLoadError(leadsRes.error);
      }

      if (statsRes && statsRes.success) {
        setStats(statsRes.stats);
      }
    } catch (err: any) {
      console.error('[ADMIN LOAD DATA ERROR]', err);
      setLoadError(err?.message || 'Failed to load leads from database.');
    } finally {
      setIsLoadingLeads(false);
    }
  }, [
    isAuthenticated,
    searchQuery,
    clientFilter,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sourceFilter,
    serviceFilter,
    fromDate,
    toDate,
    sortBy,
    sortOrder,
    page,
    limit
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  const handleDatePreset = (preset: string) => {
    setDatePreset(preset);
    setPage(1);
    const now = new Date();
    const formatYMD = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    if (preset === 'all') {
      setFromDate('');
      setToDate('');
    } else if (preset === 'today') {
      const todayStr = formatYMD(now);
      setFromDate(todayStr);
      setToDate(todayStr);
    } else if (preset === 'yesterday') {
      const yest = new Date(now);
      yest.setDate(yest.getDate() - 1);
      const yestStr = formatYMD(yest);
      setFromDate(yestStr);
      setToDate(yestStr);
    } else if (preset === 'last7') {
      const d7 = new Date(now);
      d7.setDate(d7.getDate() - 6);
      setFromDate(formatYMD(d7));
      setToDate(formatYMD(now));
    } else if (preset === 'thisMonth') {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      setFromDate(formatYMD(firstDay));
      setToDate(formatYMD(now));
    } else if (preset === 'lastMonth') {
      const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      setFromDate(formatYMD(firstDayLastMonth));
      setToDate(formatYMD(lastDayLastMonth));
    }
  };

  const handleResetAllFilters = () => {
    setSearchQuery('');
    setClientFilter('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
    setSourceFilter('All');
    setServiceFilter('All');
    setFromDate('');
    setToDate('');
    setDatePreset('all');
    setPage(1);
  };

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

  const handleRetryCommunication = async (channel: 'email' | 'whatsapp' | 'internal_notification' | 'all') => {
    if (!selectedLead) return;
    setRetryingChannel(channel);
    try {
      const res = await retryCommunicationChannel(selectedLead.id, channel);
      if (res.success) {
        if (res.results?.lead) {
          const updatedLead = res.results.lead;
          setSelectedLead(updatedLead);
          setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? { ...l, ...updatedLead } : l)));
        }
      }
    } catch (err: any) {
      console.error(`Failed to retry ${channel}`, err);
      alert(err.message || `Failed to re-dispatch ${channel}`);
    } finally {
      setRetryingChannel(null);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      await downloadLeadsExcel({
        search: searchQuery,
        client: clientFilter,
        status: statusFilter,
        priority: priorityFilter,
        category: categoryFilter,
        source: sourceFilter,
        service: serviceFilter,
        fromDate,
        toDate,
        sortBy,
        sortOrder
      });
    } catch (err: any) {
      console.error('Failed to export Excel file', err);
      alert(err?.message || 'Could not download Excel file. Please verify network connection and try again.');
    } finally {
      setIsExporting(false);
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
      <header className="bg-[#0A0A0A] border-b border-neutral-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Branding & Back to site */}
            <div className="flex items-center justify-between sm:justify-start space-x-3 sm:space-x-4">
              <Link to="/" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
                <Logo size="sm" variant="default" />
              </Link>
              <div className="hidden sm:block h-5 w-px bg-neutral-800" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4B06A]">
                    Lead Portal
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-mono">
                    Live
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono block truncate max-w-[160px] sm:max-w-xs">
                  {adminEmail}
                </span>
              </div>

              <Link
                to="/"
                className="sm:hidden flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 hover:text-white"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Site</span>
              </Link>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
              <Link
                to="/"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                title="Return to Public Website"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Site</span>
              </Link>

              {/* Download Leads Excel Button */}
              <button
                onClick={handleExportExcel}
                disabled={isExporting}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-md min-h-[40px] cursor-pointer disabled:opacity-60"
                title={activeFilterCount > 0 ? `Download ${totalLeadsCount} filtered live leads in Excel (.xlsx) format` : "Download all leads in Microsoft Excel (.xlsx) format"}
              >
                {isExporting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>{activeFilterCount > 0 ? `Export Filtered (${totalLeadsCount})` : 'Download Excel'}</span>
                  </>
                )}
              </button>

              <button
                onClick={loadData}
                disabled={isLoadingLeads}
                className="p-2.5 rounded-xl bg-[#141414] border border-neutral-800 hover:text-[#D4B06A] text-neutral-400 text-xs transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                title="Refresh Pipeline"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin text-[#D4B06A]' : ''}`} />
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/30 border border-red-900/50 hover:bg-red-900/50 text-red-300 text-xs transition-colors min-h-[40px] cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        
        {/* Live Database Error Banner if any */}
        {loadError && (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-red-300 flex items-start gap-3 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="font-semibold text-red-200">Database Connection Notice</div>
              <p className="text-red-300/90">{loadError}</p>
            </div>
            <button
              onClick={loadData}
              className="px-2.5 py-1 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-[11px] font-medium transition-colors shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">Total Leads</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white">{stats?.total ?? totalLeadsCount}</div>
            <div className="text-[10px] text-neutral-500 font-mono">Today: +{stats?.todayCount ?? 0}</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#14120C] border border-[#D4B06A]/40 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-[#D4B06A] tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>New Leads</span>
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F0D28F]">{stats?.newLeads ?? 0}</div>
            <div className="text-[10px] text-[#D4B06A]/80 font-mono">Action Required</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider">Contacted</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-blue-300">{stats?.contacted ?? 0}</div>
            <div className="text-[10px] text-neutral-500 font-mono">In Touch</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-purple-400 tracking-wider">In Progress</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-purple-300">{stats?.inProgress ?? 0}</div>
            <div className="text-[10px] text-neutral-500 font-mono">Proposal Sent</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-[#25D366] tracking-wider">Converted</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#25D366]">{stats?.converted ?? 0}</div>
            <div className="text-[10px] text-emerald-400 font-mono">Active Clients</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">This Month</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white">{stats?.monthCount ?? 0}</div>
            <div className="text-[10px] text-neutral-500 font-mono">30-day velocity</div>
          </div>
        </div>

        {/* Filter, Search & Advanced Controls Hub */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
          
          {/* Header Row: Search Input & Action Buttons */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Universal Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by Lead ID, Client Name, Email, Phone, Company, Requirements..."
                className="w-full pl-9 pr-8 py-2.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none min-h-[42px]"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white p-1"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Controls & Filter Toggles */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* Advanced Filters Toggle Button */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer min-h-[42px] ${
                  showAdvancedFilters || activeFilterCount > 0
                    ? 'bg-[#18150e] border-[#D4B06A]/60 text-[#F0D28F]'
                    : 'bg-[#121212] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
                title="Toggle advanced filter controls"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4B06A]" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full gold-gradient-bg text-black font-bold text-[10px] flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Reset All Filters Button (Visible when filters are active) */}
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetAllFilters}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-400 hover:text-white transition-all cursor-pointer min-h-[42px]"
                  title="Reset all search queries and active filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}

              {/* Quick Filtered Export Button */}
              <button
                onClick={handleExportExcel}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#161616] border border-neutral-700 hover:border-[#D4B06A] text-[#F0D28F] text-xs font-semibold hover:bg-neutral-900 transition-all cursor-pointer min-h-[42px] disabled:opacity-60"
                title="Download filtered leads spreadsheet"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4B06A]" />
                <span className="hidden xs:inline">Export XLSX</span>
                <span className="text-[11px] font-mono text-neutral-400">({totalLeadsCount})</span>
              </button>
            </div>
          </div>

          {/* Primary Quick Filters Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-[#121212] border border-neutral-800 text-xs text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none min-h-[38px]"
              >
                <option value="All">All Statuses ({stats?.total ?? totalLeadsCount})</option>
                <option value="NEW">NEW ({stats?.newLeads ?? 0})</option>
                <option value="CONTACTED">CONTACTED ({stats?.contacted ?? 0})</option>
                <option value="IN_PROGRESS">IN PROGRESS ({stats?.inProgress ?? 0})</option>
                <option value="QUALIFIED">QUALIFIED ({stats?.qualified ?? 0})</option>
                <option value="CONVERTED">CONVERTED ({stats?.converted ?? 0})</option>
                <option value="CLOSED">CLOSED ({stats?.closed ?? 0})</option>
                <option value="SPAM">SPAM ({stats?.spam ?? 0})</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
                Priority
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-[#121212] border border-neutral-800 text-xs text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none min-h-[38px]"
              >
                <option value="All">All Priorities</option>
                <option value="URGENT">URGENT</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
                Business Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-[#121212] border border-neutral-800 text-xs text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none min-h-[38px]"
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
                {dynamicOptions.categories
                  .filter((cat) => ![
                    'Restaurant & Café',
                    'Gym & Fitness',
                    'Real Estate',
                    'Healthcare & Clinic',
                    'Coaching & Education',
                    'E-commerce & Retail',
                    'Salon & Beauty',
                    'Hotel & Hospitality',
                    'Corporate & B2B',
                    'Local Business / Other'
                  ].includes(cat))
                  .map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
              </select>
            </div>

            {/* Sort Field & Order */}
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
                Sort Ordering
              </label>
              <select
                value={`${sortBy}_${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('_');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-[#121212] border border-neutral-800 text-xs text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none min-h-[38px]"
              >
                <option value="created_at_desc">Newest First</option>
                <option value="created_at_asc">Oldest First</option>
                <option value="priority_desc">Priority (High to Low)</option>
                <option value="full_name_asc">Client Name (A-Z)</option>
                <option value="business_company_name_asc">Company (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Expandable Advanced Filters Drawer */}
          {showAdvancedFilters && (
            <div className="p-4 rounded-xl bg-[#0F0F0F] border border-neutral-800/80 space-y-4 pt-3 transition-all animate-fadeIn">
              
              {/* Date Presets Row */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4B06A]" />
                    <span>Submission Date Presets</span>
                  </span>
                  {(fromDate || toDate) && (
                    <span className="text-[10px] text-[#D4B06A] font-mono">
                      {fromDate || 'Start'} → {toDate || 'Present'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'All Time' },
                    { id: 'today', label: 'Today' },
                    { id: 'yesterday', label: 'Yesterday' },
                    { id: 'last7', label: 'Last 7 Days' },
                    { id: 'thisMonth', label: 'This Month' },
                    { id: 'lastMonth', label: 'Last Month' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleDatePreset(preset.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        datePreset === preset.id
                          ? 'bg-[#D4B06A] text-black font-semibold'
                          : 'bg-[#181818] border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Date Range & Specific Field Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-neutral-800/60">
                {/* From Date */}
                <div className="space-y-1">
                  <label className="text-[10px] font-medium text-neutral-400 block">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                      setDatePreset('custom');
                      setPage(1);
                    }}
                    className="w-full px-2.5 py-1.5 bg-[#141414] border border-neutral-800 rounded-lg text-xs text-neutral-200 focus:border-[#D4B06A] focus:outline-none min-h-[36px]"
                  />
                </div>

                {/* To Date */}
                <div className="space-y-1">
                  <label className="text-[10px] font-medium text-neutral-400 block">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => {
                      setToDate(e.target.value);
                      setDatePreset('custom');
                      setPage(1);
                    }}
                    className="w-full px-2.5 py-1.5 bg-[#141414] border border-neutral-800 rounded-lg text-xs text-neutral-200 focus:border-[#D4B06A] focus:outline-none min-h-[36px]"
                  />
                </div>

                {/* Client / Business Filter */}
                <div className="space-y-1">
                  <label className="text-[10px] font-medium text-neutral-400 block">
                    Client / Company Filter
                  </label>
                  <input
                    type="text"
                    value={clientFilter}
                    onChange={(e) => {
                      setClientFilter(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Specific name or business..."
                    className="w-full px-2.5 py-1.5 bg-[#141414] border border-neutral-800 rounded-lg text-xs text-neutral-200 placeholder-neutral-600 focus:border-[#D4B06A] focus:outline-none min-h-[36px]"
                  />
                </div>

                {/* Source Filter */}
                <div className="space-y-1">
                  <label className="text-[10px] font-medium text-neutral-400 block">
                    Lead Acquisition Source
                  </label>
                  <select
                    value={sourceFilter}
                    onChange={(e) => {
                      setSourceFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-2.5 py-1.5 bg-[#141414] border border-neutral-800 rounded-lg text-xs text-neutral-200 focus:border-[#D4B06A] focus:outline-none min-h-[36px]"
                  >
                    <option value="All">All Lead Sources</option>
                    <option value="Hero">Hero CTA</option>
                    <option value="Calculator">Pricing Calculator</option>
                    <option value="Contact">Contact Page</option>
                    <option value="Footer">Footer Form</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Studio">Studio Consultation</option>
                    {dynamicOptions.sources
                      .filter((s) => !['Hero', 'Calculator', 'Contact', 'Footer', 'WhatsApp', 'Studio'].includes(s))
                      .map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Service Filter */}
              <div className="pt-2 border-t border-neutral-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1 w-full sm:w-auto space-y-1">
                  <label className="text-[10px] font-medium text-neutral-400 block">
                    Selected Service or Package
                  </label>
                  <select
                    value={serviceFilter}
                    onChange={(e) => {
                      setServiceFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full sm:max-w-md px-2.5 py-1.5 bg-[#141414] border border-neutral-800 rounded-lg text-xs text-neutral-200 focus:border-[#D4B06A] focus:outline-none min-h-[36px]"
                  >
                    <option value="All">All Services & Packages</option>
                    <option value="Website">Website Development</option>
                    <option value="SEO">Local SEO & Google Maps</option>
                    <option value="Marketing">Performance Marketing</option>
                    <option value="Studio">Complete Digital Studio</option>
                    {dynamicOptions.services
                      .filter((srv) => !['Website', 'SEO', 'Marketing', 'Studio'].includes(srv))
                      .map((srv) => (
                        <option key={srv} value={srv}>{srv}</option>
                      ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={handleResetAllFilters}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition-colors cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setShowAdvancedFilters(false)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-400 transition-colors cursor-pointer"
                  >
                    Collapse
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filter Chips & Live Lead Count Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-neutral-900">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-neutral-400">
                Showing <strong className="text-white">{totalLeadsCount}</strong> matching record{totalLeadsCount === 1 ? '' : 's'}
                {stats?.total !== undefined && stats.total !== totalLeadsCount && (
                  <span className="text-neutral-500 text-[11px]"> (of {stats.total} total in database)</span>
                )}
              </span>

              {/* Active Chips */}
              {statusFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                  Status: {statusFilter}
                  <button onClick={() => setStatusFilter('All')} className="hover:text-red-400 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {priorityFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                  Priority: {priorityFilter}
                  <button onClick={() => setPriorityFilter('All')} className="hover:text-red-400 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {categoryFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                  Category: {categoryFilter}
                  <button onClick={() => setCategoryFilter('All')} className="hover:text-red-400 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {sourceFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                  Source: {sourceFilter}
                  <button onClick={() => setSourceFilter('All')} className="hover:text-red-400 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {serviceFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                  Service: {serviceFilter}
                  <button onClick={() => setServiceFilter('All')} className="hover:text-red-400 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {clientFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                  Client: "{clientFilter}"
                  <button onClick={() => setClientFilter('')} className="hover:text-red-400 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {(fromDate || toDate) && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-[#F0D28F]">
                  Date: {fromDate || 'Any'} to {toDate || 'Today'}
                  <button onClick={() => handleDatePreset('all')} className="hover:text-red-400 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            {/* Results pagination info */}
            <div className="text-[11px] text-neutral-500 font-mono self-end sm:self-auto">
              Page {page} of {totalPages}
            </div>
          </div>
        </div>

        {/* Mobile View: Dedicated Responsive Lead Cards (visible on mobile only) */}
        <div className="block md:hidden space-y-3">
          {leads.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-neutral-800 text-center space-y-2">
              <FileText className="w-8 h-8 text-neutral-600 mx-auto" />
              <p className="text-sm text-neutral-300 font-medium">No leads match the specified criteria</p>
              <p className="text-xs text-neutral-500">Try clearing filters or search keywords.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-3 shadow-lg"
              >
                {/* Header: ID, Date & Badges */}
                <div className="flex items-start justify-between gap-2 border-b border-neutral-900 pb-2.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-[#F0D28F]">{lead.id}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                        {lead.page_source.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-neutral-600" />
                      <span>
                        {new Date(lead.created_at).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getPriorityBadge(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </div>
                </div>

                {/* Client & Business */}
                <div>
                  <div className="text-sm font-bold text-white">
                    {lead.full_name}
                  </div>
                  <div className="text-xs text-neutral-300 flex items-center gap-1.5 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-[#D4B06A]" />
                    <span>{lead.business_company_name}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    {lead.category} {lead.other_category ? `(${lead.other_category})` : ''}
                  </div>
                </div>

                {/* Selected Package & Requirement */}
                <div className="p-2.5 rounded-xl bg-[#121212] border border-neutral-800/80 space-y-1 text-xs">
                  <div className="font-medium text-[#F0D28F] flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#D4B06A]" />
                    <span>{lead.selected_bundle || lead.service}</span>
                  </div>
                  {lead.project_requirement && (
                    <div className="text-neutral-400 line-clamp-2 text-[11px] leading-relaxed">
                      {lead.project_requirement}
                    </div>
                  )}
                </div>

                {/* Direct Action Buttons: WhatsApp & Email */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`https://wa.me/${lead.whatsapp_number.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.full_name)},%20Mr.%20Radha%20Krishna%20from%20YUGARK%20Digital%20Studio%20following%20up%20on%20your%20inquiry%20${lead.id}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 min-h-[42px]"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${lead.email}?subject=YUGARK%20Digital%20Studio%20—%20Inquiry%20${lead.id}`}
                    className="py-2.5 px-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-xs font-medium flex items-center justify-center gap-1.5 min-h-[42px]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#D4B06A]" />
                    <span>Email</span>
                  </a>
                </div>

                {/* Quick Status and Full Details */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-900">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                    className="p-2 bg-[#121212] border border-neutral-800 text-[11px] text-neutral-200 rounded-xl focus:border-[#D4B06A] focus:outline-none min-h-[40px]"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="QUALIFIED">QUALIFIED</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="SPAM">SPAM</option>
                  </select>

                  <button
                    onClick={() => openLeadModal(lead)}
                    className="py-2 px-3 rounded-xl bg-[#14120C] border border-[#D4B06A]/40 text-[#D4B06A] text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[40px] hover:bg-[#1f1a10] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Full Details</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Full Leads Table (hidden on mobile) */}
        <div className="hidden md:block rounded-2xl bg-[#0A0A0A] border border-neutral-800 overflow-hidden shadow-xl">
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

          {/* Desktop Pagination Controls */}
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

        {/* Mobile Pagination Controls */}
        {totalPages > 1 && (
          <div className="block md:hidden p-3.5 bg-[#0A0A0A] border border-neutral-800 rounded-2xl space-y-2 text-xs text-neutral-400">
            <div className="text-center">
              Page <span className="text-white font-medium">{page}</span> of{' '}
              <span className="text-white font-medium">{totalPages}</span> ({totalLeadsCount} total leads)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 min-h-[42px]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 min-h-[42px]"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Detailed Lead Modal / Drawer */}
      {selectedLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedLead(null);
          }}
        >
          <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0A0A0A] border border-[#D4B06A]/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto gold-border-glow p-4 sm:p-6 sm:p-8 space-y-4 sm:space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#F0D28F]">{selectedLead.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadge(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md border ${getPriorityBadge(selectedLead.priority)}`}>
                    {selectedLead.priority} Priority
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-2xl text-white font-medium">
                  {selectedLead.full_name} — {selectedLead.business_company_name}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400">
                  Received on {new Date(selectedLead.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} via {selectedLead.page_source}
                </p>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info & Direct Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-[#121212] p-3.5 sm:p-4 rounded-2xl border border-neutral-800">
              <div className="space-y-1.5">
                <div className="text-[11px] uppercase font-bold text-[#D4B06A] tracking-wider">Client Contact</div>
                <div className="text-sm font-semibold text-white">{selectedLead.full_name}</div>
                <div className="text-xs text-neutral-300">Brand: {selectedLead.business_company_name}</div>
                <div className="text-xs text-neutral-400">Industry: {selectedLead.category} {selectedLead.other_category ? `(${selectedLead.other_category})` : ''}</div>
              </div>

              <div className="space-y-2.5 flex flex-col justify-center">
                <a
                  href={`https://wa.me/${selectedLead.whatsapp_number.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedLead.full_name)},%20Mr.%20Radha%20Krishna%20here%20from%20YUGARK%20Digital%20Studio.%20Following%20up%20on%20your%20project%20inquiry%20${selectedLead.id}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all min-h-[42px]"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Open WhatsApp Direct Chat</span>
                </a>

                <a
                  href={`mailto:${selectedLead.email}?subject=YUGARK%20Digital%20Studio%20—%20Inquiry%20${selectedLead.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-neutral-700 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all min-h-[42px]"
                >
                  <Mail className="w-4 h-4 text-[#D4B06A]" />
                  <span>Send Direct Email</span>
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

            {/* Automated Communication Delivery (Resend & Interakt) */}
            <div className="p-4 bg-[#0E0E0E] rounded-2xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#D4B06A] tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4B06A]" />
                  <span>Lead Communication Automations</span>
                </span>
                <button
                  onClick={() => handleRetryCommunication('all')}
                  disabled={retryingChannel === 'all'}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[10px] text-neutral-300 hover:text-white flex items-center gap-1 transition-colors disabled:opacity-50"
                  title="Re-dispatch all channels"
                >
                  <RefreshCw className={`w-3 h-3 ${retryingChannel === 'all' ? 'animate-spin' : ''}`} />
                  <span>Re-dispatch All</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Resend Email Status */}
                <div className="p-3 rounded-xl bg-[#141414] border border-neutral-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-semibold text-neutral-200 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#D4B06A]" />
                      <span>Email (Resend)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span
                        className={`font-medium px-1.5 py-0.5 rounded ${
                          selectedLead.email_status === 'SENT'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                            : selectedLead.email_status === 'FAILED'
                            ? 'bg-red-950/60 text-red-400 border border-red-800/50'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {selectedLead.email_status || 'PENDING'}
                      </span>
                      {selectedLead.email_sent_at && (
                        <span className="text-neutral-500">
                          {new Date(selectedLead.email_sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    {selectedLead.email_error && (
                      <p className="text-[10px] text-red-400 line-clamp-1 max-w-[200px]" title={selectedLead.email_error}>
                        {selectedLead.email_error}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleRetryCommunication('email')}
                    disabled={retryingChannel === 'email'}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs transition-colors disabled:opacity-50"
                    title="Retry sending confirmation email via Resend"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${retryingChannel === 'email' ? 'animate-spin text-[#D4B06A]' : ''}`} />
                  </button>
                </div>

                {/* Interakt WhatsApp Status */}
                <div className="p-3 rounded-xl bg-[#141414] border border-neutral-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-semibold text-neutral-200 flex items-center gap-1.5">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp (Interakt)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span
                        className={`font-medium px-1.5 py-0.5 rounded ${
                          selectedLead.whatsapp_status === 'SENT'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                            : selectedLead.whatsapp_status === 'FAILED'
                            ? 'bg-red-950/60 text-red-400 border border-red-800/50'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {selectedLead.whatsapp_status || 'PENDING'}
                      </span>
                      {selectedLead.whatsapp_sent_at && (
                        <span className="text-neutral-500">
                          {new Date(selectedLead.whatsapp_sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    {selectedLead.whatsapp_error && (
                      <p className="text-[10px] text-red-400 line-clamp-1 max-w-[200px]" title={selectedLead.whatsapp_error}>
                        {selectedLead.whatsapp_error}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleRetryCommunication('whatsapp')}
                    disabled={retryingChannel === 'whatsapp'}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs transition-colors disabled:opacity-50"
                    title="Retry sending WhatsApp message via Interakt"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${retryingChannel === 'whatsapp' ? 'animate-spin text-[#25D366]' : ''}`} />
                  </button>
                </div>
              </div>
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
