import { EnquiryRecord, ContactFormData } from '../types';

const ENQUIRIES_STORAGE_KEY = 'yugark_studio_enquiries_v1';

const INITIAL_SEED_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'ENQ-1001',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    fullName: 'Ananya Deshmukh',
    email: 'ananya@spicecraft.in',
    phone: '+91 98201 44521',
    businessName: 'SpiceCraft Bistro',
    businessCategory: 'Restaurant & Café',
    selectedService: 'Frontend Website (₹9,999)',
    selectedBundle: 'GROWTH Social Media Plan (₹14,999/mo)',
    projectRequirement: 'We are launching our second outlet in Bandra and need a fast mobile website with digital menu and weekly promotional reels for Instagram launch.',
    remarks: 'Preferred launch date in 10 days. Wants WhatsApp table booking button.',
    status: 'NEW',
    notes: 'Urgent requirement. Followed up on WhatsApp.'
  },
  {
    id: 'ENQ-1002',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 1 day ago
    fullName: 'Dr. Sameer Kapoor',
    email: 'dr.kapoor@apexorthoclinic.com',
    phone: '+91 94150 88712',
    businessName: 'Apex Orthopedic Clinic',
    businessCategory: 'Healthcare & Clinic',
    selectedService: 'Full Frontend + Backend Website (₹14,999)',
    selectedBundle: 'Short Advertisement Video (₹3,000)',
    projectRequirement: 'Need a professional doctor profile and appointment booking website with patient review integration.',
    status: 'IN_PROGRESS',
    notes: 'Shared sample healthcare template layout. Client reviewing.'
  },
  {
    id: 'ENQ-1003',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    fullName: 'Rajesh Mehra',
    email: 'rajesh@vaultfit.in',
    phone: '+91 98112 33490',
    businessName: 'Vault Fitness Gym',
    businessCategory: 'Gym & Fitness',
    selectedService: 'Meta Ads Management (₹15,000/mo)',
    selectedBundle: 'PRO Social Media Plan (₹19,999/mo)',
    projectRequirement: 'Opening high-end gym in South Delhi. Need complete launch campaign with website, meta ads and monthly reels package.',
    status: 'CONVERTED',
    notes: 'Advance received. Website wireframe submitted.'
  }
];

export function getStoredEnquiries(): EnquiryRecord[] {
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_SEED_ENQUIRIES));
      return INITIAL_SEED_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEED_ENQUIRIES;
  }
}

export function saveEnquiries(enquiries: EnquiryRecord[]): void {
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
  } catch (err) {
    console.error('Failed to save enquiries to localStorage', err);
  }
}

export function addEnquiry(formData: ContactFormData): EnquiryRecord {
  const existing = getStoredEnquiries();
  const newEnquiry: EnquiryRecord = {
    id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    businessName: formData.businessName,
    businessCategory: formData.businessCategory || 'Other',
    otherCategory: formData.otherCategory,
    selectedService: formData.selectedService,
    selectedBundle: formData.selectedBundle,
    projectRequirement: formData.projectRequirement,
    remarks: formData.remarks,
    status: 'NEW',
    notes: ''
  };

  const updated = [newEnquiry, ...existing];
  saveEnquiries(updated);
  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: EnquiryRecord['status'], notes?: string): EnquiryRecord[] {
  const existing = getStoredEnquiries();
  const updated = existing.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status,
        notes: notes !== undefined ? notes : item.notes
      };
    }
    return item;
  });
  saveEnquiries(updated);
  return updated;
}

export function deleteEnquiry(id: string): EnquiryRecord[] {
  const existing = getStoredEnquiries();
  const updated = existing.filter(item => item.id !== id);
  saveEnquiries(updated);
  return updated;
}
