export interface ServiceFollowUpStep {
  day: number;
  label: string;
  topic: string;
  channel: 'email' | 'whatsapp' | 'all';
  description: string;
}

export interface ServiceConfigItem {
  serviceId: string;
  serviceName: string;
  category: string;
  tagline: string;
  emailSubject: string;
  emailHeadline: string;
  emailSummary: string;
  emailDeliverables: string[];
  whatsappTemplateId: string;
  whatsappMessage: (params: { name: string; business: string; requirement?: string }) => string;
  smsMessage?: (params: { name: string }) => string;
  internalNotificationText: (params: { name: string; business: string; phone: string }) => string;
  ctaText: string;
  ctaUrl: string;
  followUpSequence: ServiceFollowUpStep[];
}

export const SERVICE_CONFIG: Record<string, ServiceConfigItem> = {
  'website-development': {
    serviceId: 'website-development',
    serviceName: 'Custom Website Development',
    category: 'Website & Digital Experience',
    tagline: 'High-conversion, luxury-grade web engineering designed to turn visitors into paying clients.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Custom Website Development',
    emailHeadline: 'Your Custom Website Enquiry Has Been Received',
    emailSummary: 'We have received your enquiry for custom website engineering. Our team specializes in conversion-focused, lightning-fast web architectures tailored to scale your brand authority.',
    emailDeliverables: [
      'Bespoke Mobile-First & Desktop UI/UX Architecture',
      'Ultra-Fast Loading Speeds & Core Web Vitals Optimization',
      'Lead Capture, Direct WhatsApp & CRM Routing',
      'Full On-Page SEO Setup & Analytics Tracking'
    ],
    whatsappTemplateId: 'yugark_website_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for *Custom Website Development* for *${business || 'your business'}*.\n\nFounder Mr. Radha Krishna and our engineering team will review your requirements and prepare a custom blueprint.\n\nWe will get back to you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🔥 HIGH INTENT LEAD: Website Development for ${business} by ${name} (${phone}).`,
    ctaText: 'View Website Portfolio',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Immediate Acknowledgement & Scope Confirmation', channel: 'all', description: 'Personalized email + WhatsApp confirmation sent instantly.' },
      { day: 1, label: 'T+1', topic: 'Website Blueprint & Tech Stack Overview', channel: 'email', description: 'Educational breakdown on high-speed headless architecture and conversion triggers.' },
      { day: 2, label: 'T+2', topic: 'Relevant Industry Case Studies & Live Demos', channel: 'whatsapp', description: 'Curated link to industry template demonstrations.' },
      { day: 3, label: 'T+3', topic: 'Direct Founder Consultation Check-in', channel: 'all', description: 'Follow-up to schedule a 15-minute strategy call with Mr. Radha Krishna.' },
      { day: 5, label: 'T+5', topic: 'Final Launch Timeline & Proposal Window', channel: 'email', description: 'Final follow-up before closing pending enquiry queue.' }
    ]
  },

  'short-ad-video': {
    serviceId: 'short-ad-video',
    serviceName: 'Short Advertisement Video / AI Video',
    category: 'Content & Creative Production',
    tagline: 'High-impact 15–30 second promotional and social ad videos engineered for conversions.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Short Advertisement Video',
    emailHeadline: 'Your Short Video Ad Enquiry Has Been Received',
    emailSummary: 'We have received your enquiry for high-converting short video ads. Our production workflow combines viral hook scripting, dynamic motion design, and high-retention audio.',
    emailDeliverables: [
      '15–30s High-Retention Hook Scripting & Storyboarding',
      'AI-Assisted & High-Pace Dynamic Motion Editing',
      'Voiceover Mastering & Trending Audio Integration',
      '9:16 Vertical Delivery Optimized for Reels, Shorts & Meta Ads'
    ],
    whatsappTemplateId: 'yugark_reels_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for *Short Advertisement Video / AI Content* for *${business || 'your business'}*.\n\nOur creative production team will review your requirements and get in touch with you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🎬 VIDEO AD LEAD: Short Video Ad for ${business} from ${name} (${phone}).`,
    ctaText: 'Watch Video Work',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Video Ad Intake Confirmed', channel: 'all', description: 'Instant confirmation.' },
      { day: 1, label: 'T+1', topic: 'The 3-Second Hook Formula', channel: 'email', description: 'How high-retention editing boosts video ad ROAS.' },
      { day: 3, label: 'T+3', topic: 'Sample Script & Angle Ideas', channel: 'whatsapp', description: 'Personalized angle recommendation for your niche.' }
    ]
  },

  'long-video': {
    serviceId: 'long-video',
    serviceName: 'Long-Form Brand / Explainer Video',
    category: 'Content & Creative Production',
    tagline: '3–5 minute in-depth company overview, service walkthrough, or educational brand video.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Brand & Explainer Video',
    emailHeadline: 'Your Brand / Explainer Video Enquiry Is Logged',
    emailSummary: 'Thank you for reaching out regarding long-form brand video production. We craft deep narrative storytelling, motion graphics, and cinematic video assets.',
    emailDeliverables: [
      '3–5 Minute Comprehensive Narrative & Storyboard',
      'Motion Graphics, Chapter Titles & B-Roll Editing',
      'Studio-Quality Voiceover & Audio Mastering',
      'Horizontal 16:9 & Master Archive Delivery'
    ],
    whatsappTemplateId: 'yugark_long_video_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for *Long-Form Brand / Explainer Video* for *${business || 'your company'}*.\n\nOur video directors will review your brand story and get back to you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🎥 BRAND FILM LEAD: Long Explainer Video for ${business} by ${name} (${phone}).`,
    ctaText: 'View Video Portfolio',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Brand Film Brief Logged', channel: 'all', description: 'Instant confirmation.' },
      { day: 1, label: 'T+1', topic: 'Explainer Storyboarding Guide', channel: 'email', description: 'Cinematic pacing and retention structure.' },
      { day: 3, label: 'T+3', topic: 'Production Timeline & Script Intake', channel: 'whatsapp', description: 'Intake questions to prepare narrative draft.' }
    ]
  },

  'individual-post': {
    serviceId: 'individual-post',
    serviceName: 'Individual Social Media Post',
    category: 'Content & Creative Production',
    tagline: 'Precision graphic visuals and high-authority static design.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Individual Social Media Post',
    emailHeadline: 'Your Social Media Creative Enquiry is Confirmed',
    emailSummary: 'Thank you for reaching out regarding premium graphic posts. We craft bespoke visual assets engineered to stand out on crowded social feeds.',
    emailDeliverables: [
      'High-Resolution Feed-Optimized Visual Graphics',
      'Compelling Headline Hook & On-Brand Color Grading',
      'Targeted Copywriting & Engagement-Driven Caption',
      'Format Variations for Instagram, LinkedIn & Facebook'
    ],
    whatsappTemplateId: 'yugark_social_post_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for *Individual Social Media Creative* for *${business || 'your brand'}*.\n\nOur creative team will review your visual requirements and get back to you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🎨 CREATIVE LEAD: Individual Social Post for ${business} from ${name} (${phone}).`,
    ctaText: 'Explore Creative Work',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Creative Brief Acknowledgement', channel: 'all', description: 'Immediate confirmation with creative intake details.' },
      { day: 1, label: 'T+1', topic: 'Brand Aesthetics & Visual Identity Examples', channel: 'email', description: 'Sample moodboards and graphic design portfolio.' },
      { day: 3, label: 'T+3', topic: 'Package Upgrade to Monthly Creative Retainer', channel: 'whatsapp', description: 'Cost comparison between individual posts vs monthly retainer.' }
    ]
  },

  'social-media-management': {
    serviceId: 'social-media-management',
    serviceName: 'Social Media Management',
    category: 'Growth & Social Management',
    tagline: 'End-to-end editorial planning, community handling, and organic audience scaling.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Social Media Management',
    emailHeadline: 'Your Social Media Management Enquiry Has Been Logged',
    emailSummary: 'We have received your enquiry for comprehensive Social Media Management. Our system combines strategic content calendars, aesthetic consistency, and proactive audience engagement.',
    emailDeliverables: [
      'Monthly Content Calendar & Strategic Theme Planning',
      'High-Impact Posts, Carousels & Story Updates',
      'Caption Copywriting, Hashtag Strategy & Optimal Scheduling',
      'Monthly Performance Growth & Analytics Reporting'
    ],
    whatsappTemplateId: 'yugark_smm_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for reaching out to YUGARK Digital Studio.\n\nWe received your enquiry for *Social Media Management* for *${business || 'your business'}*.\n\nOur growth strategists will analyze your profile and outline a customized monthly roadmap.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `📈 SMM LEAD: Monthly Management for ${business} by ${name} (${phone}).`,
    ctaText: 'View Case Studies',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'SMM Enquiry Received', channel: 'all', description: 'Instant multi-channel acknowledgement.' },
      { day: 1, label: 'T+1', topic: '30-Day Social Growth Playbook', channel: 'email', description: 'Overview of our editorial and engagement framework.' },
      { day: 2, label: 'T+2', topic: 'Account Audit & Growth Opportunity Review', channel: 'whatsapp', description: 'Personalized observations regarding current feed metrics.' },
      { day: 4, label: 'T+4', topic: 'Strategy Call Invitation', channel: 'all', description: 'Direct call link with founder Mr. Radha Krishna.' }
    ]
  },

  'monthly-reels': {
    serviceId: 'monthly-reels',
    serviceName: 'Monthly Reels Package',
    category: 'Content & Creative Production',
    tagline: 'Short-form vertical video production engineered for viral retention and conversion.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Monthly Reels Package',
    emailHeadline: 'Your Monthly Reels Package Enquiry Is Confirmed',
    emailSummary: 'Thank you for your interest in our Monthly Reels Package. We script, edit, and optimize viral short-form video content designed to dominate Instagram Reels and YouTube Shorts.',
    emailDeliverables: [
      'Proven Viral Hook Scripting & Storyboarding',
      'High-Paced Cinematic Dynamic Motion Editing',
      'Custom Motion Graphics, Kinetic Typography & Sound Design',
      'Trending Audio Synchronization & Cover Thumbnail Design'
    ],
    whatsappTemplateId: 'yugark_reels_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for our *Monthly Reels Package* for *${business || 'your brand'}*.\n\nOur video editing and scripting specialists will review your industry niche and reach out shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🎬 REELS LEAD: Monthly Reels Package for ${business} from ${name} (${phone}).`,
    ctaText: 'Watch Video Samples',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Reels Package Received', channel: 'all', description: 'Instant confirmation with video production overview.' },
      { day: 1, label: 'T+1', topic: 'The 3-Second Hook Retention Guide', channel: 'email', description: 'Case study showing how kinetic editing boosts reach 4x.' },
      { day: 3, label: 'T+3', topic: 'Batch Production & Shooting Workflow', channel: 'whatsapp', description: 'Explanation of how we produce 15-30 reels in a single session.' }
    ]
  },

  'youtube-content': {
    serviceId: 'youtube-content',
    serviceName: 'YouTube Content Creation',
    category: 'Content & Creative Production',
    tagline: 'Long-form cinematic storytelling and channel optimization to build enduring brand authority.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — YouTube Content Creation',
    emailHeadline: 'Your YouTube Content Enquiry Has Been Logged',
    emailSummary: 'We have received your enquiry for YouTube Content Production. From research and scripting to cinematic editing and high-CTR thumbnails, we help you scale a loyal subscriber base.',
    emailDeliverables: [
      'In-Depth Keyword Research & High-CTR Title Engineering',
      'Full Long-Form Video Editing with Multi-Cam & B-Roll Integration',
      'Custom 3D / High-Contrast Clickable Thumbnails',
      'Full Video SEO (Descriptions, Chapters, Cards & Tags)'
    ],
    whatsappTemplateId: 'yugark_long_video_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for reaching out to YUGARK Digital Studio.\n\nWe received your enquiry for *YouTube Content Creation* for *${business || 'your channel/brand'}*.\n\nOur YouTube production team will review your channel requirements and get back to you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `📺 YOUTUBE LEAD: YouTube Creation for ${business} from ${name} (${phone}).`,
    ctaText: 'Explore YouTube Portfolio',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'YouTube Production Intake', channel: 'all', description: 'Instant confirmation with workflow details.' },
      { day: 1, label: 'T+1', topic: 'Channel Architecture & Thumbnail CTR Breakdown', channel: 'email', description: 'Analysis of top-performing long-form layouts.' },
      { day: 3, label: 'T+3', topic: 'Editing Demo & Turnaround Times', channel: 'whatsapp', description: 'Showcase of 4K color grading and pacing.' }
    ]
  },

  'monthly-posts': {
    serviceId: 'monthly-posts',
    serviceName: 'Monthly Posts Package',
    category: 'Content & Creative Production',
    tagline: 'Continuous brand visibility with consistent, high-authority visual design.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Monthly Posts Package',
    emailHeadline: 'Your Monthly Posts Package Enquiry Is Confirmed',
    emailSummary: 'Thank you for inquiring about our Monthly Posts Package. We keep your brand prominently visible across Instagram, Facebook, and LinkedIn with cohesive visual identities.',
    emailDeliverables: [
      'Curated Monthly Calendar of High-Value Branded Graphics',
      'Multi-Slide Educational & Storytelling Carousels',
      'Conversion-Focused Copywriting & Call-to-Actions',
      'Cohesive Grid Aesthetics & Color Harmony'
    ],
    whatsappTemplateId: 'yugark_social_post_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for our *Monthly Posts Package* for *${business || 'your brand'}*.\n\nOur visual design team will review your branding and get in touch with you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🖼️ POSTS BUNDLE LEAD: Monthly Posts for ${business} by ${name} (${phone}).`,
    ctaText: 'View Graphic Portfolio',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Monthly Posts Enquiry Received', channel: 'all', description: 'Immediate confirmation.' },
      { day: 1, label: 'T+1', topic: 'Brand Consistency & Visual Authority Framework', channel: 'email', description: 'How cohesive branding drives customer trust.' },
      { day: 3, label: 'T+3', topic: 'Sample Grid Mockup Preview', channel: 'whatsapp', description: 'Custom sample feed layout.' }
    ]
  },

  'social-media-advertising': {
    serviceId: 'social-media-advertising',
    serviceName: 'Social Media Advertising / Meta Ads',
    category: 'Growth & Automation',
    tagline: 'High-ROI paid advertising campaigns engineered to capture qualified buyer leads.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Meta & Instagram Ads',
    emailHeadline: 'Your Paid Advertising Enquiry Has Been Received',
    emailSummary: 'We have received your enquiry for Meta & Instagram Paid Ads. We construct precision audience targeting, high-converting video creatives, and instant WhatsApp lead capture funnels.',
    emailDeliverables: [
      'Laser-Targeted Meta Pixel & Conversions API Setup',
      'High-CTR Ad Creatives & Video Ad Hooks',
      'Instant WhatsApp Lead Gen & CRM Webhook Integration',
      'Weekly ROAS & Cost-Per-Lead (CPL) Optimization'
    ],
    whatsappTemplateId: 'yugark_meta_ads_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for reaching out to YUGARK Digital Studio.\n\nWe received your enquiry for *Social Media Advertising (Meta Ads)* for *${business || 'your business'}*.\n\nOur performance marketing team will analyze your target market and prepare a custom paid campaign forecast.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🎯 ADS LEAD: Paid Ads for ${business} from ${name} (${phone}).`,
    ctaText: 'View Ad Performance Data',
    ctaUrl: '/work',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Paid Ads Enquiry Confirmed', channel: 'all', description: 'Instant confirmation.' },
      { day: 1, label: 'T+1', topic: 'The YUGARK Lead Funnel Architecture', channel: 'email', description: 'How we lower CPL by routing leads straight to WhatsApp.' },
      { day: 2, label: 'T+2', topic: 'Ad Creative Best Practices for Your Industry', channel: 'whatsapp', description: 'Sample high-converting ad scripts.' },
      { day: 4, label: 'T+4', topic: 'Campaign Budget & ROAS Simulation', channel: 'all', description: 'Projected lead volume based on ad spend.' }
    ]
  },

  'ai-creative-strategy': {
    serviceId: 'ai-creative-strategy',
    serviceName: 'AI Creative Strategy',
    category: 'Content & Creative Production',
    tagline: 'Next-generation AI visual synthesis, intelligent workflow automation, and rapid asset scaling.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — AI Creative Strategy',
    emailHeadline: 'Your AI Creative Strategy Enquiry Is Logged',
    emailSummary: 'Thank you for inquiring about our AI Creative Strategy. We leverage cutting-edge AI visual pipelines, automated content generation, and intelligent workflows to multiply your output.',
    emailDeliverables: [
      'Custom Generative Visual Asset Pipeline Setup',
      'Automated Scripting & Multi-Variant Copy Generation',
      'Hyper-Realistic AI Voiceover & Avatar Synthesis',
      'Fast-Turnaround Content Scaling Workflow'
    ],
    whatsappTemplateId: 'yugark_ai_strategy_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for *AI Creative Strategy* for *${business || 'your brand'}*.\n\nOur AI production team will review your requirements and get back to you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `⚡ AI CREATIVE LEAD: AI Strategy for ${business} by ${name} (${phone}).`,
    ctaText: 'Discover AI Capabilities',
    ctaUrl: '/services/ai-content-video',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'AI Strategy Intake Confirmed', channel: 'all', description: 'Instant multi-channel acknowledgement.' },
      { day: 1, label: 'T+1', topic: 'AI Production Comparison: Speed & Cost', channel: 'email', description: 'Breakdown of AI vs traditional rendering timelines.' },
      { day: 3, label: 'T+3', topic: 'Live AI Prototype Showcase', channel: 'whatsapp', description: 'Interactive visual sample created for your niche.' }
    ]
  },

  'content-strategy': {
    serviceId: 'content-strategy',
    serviceName: 'Content Strategy & Editorial Planning',
    category: 'Growth & Social Management',
    tagline: 'Data-driven content architectures designed to build market authority and compound organic reach.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Content Strategy & Editorial Planning',
    emailHeadline: 'Your Content Strategy Enquiry Has Been Received',
    emailSummary: 'We have received your enquiry for Content Strategy & Editorial Planning. We identify high-intent search gaps, formulate positioning narratives, and construct quarterly distribution roadmaps.',
    emailDeliverables: [
      'Comprehensive Competitor & Audience Gap Analysis',
      'Quarterly Multi-Platform Editorial Calendar',
      'Brand Voice & Thought Leadership Framework',
      'Distribution & Repurposing Playbook'
    ],
    whatsappTemplateId: 'yugark_content_strategy_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for reaching out to YUGARK Digital Studio.\n\nWe received your enquiry for *Content Strategy & Editorial Planning* for *${business || 'your business'}*.\n\nOur chief strategist will review your market positioning and get back to you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `📝 STRATEGY LEAD: Content Strategy for ${business} from ${name} (${phone}).`,
    ctaText: 'Review Strategy Services',
    ctaUrl: '/services/content-strategy',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Strategy Brief Logged', channel: 'all', description: 'Instant confirmation.' },
      { day: 1, label: 'T+1', topic: 'The Content Matrix: Hook, Retain, Convert', channel: 'email', description: 'Overview of our 3-pillar content engine.' },
      { day: 3, label: 'T+3', topic: 'Strategic Framework Consultation', channel: 'whatsapp', description: 'Founder strategy session booking link.' }
    ]
  },

  'digital-growth-strategy': {
    serviceId: 'digital-growth-strategy',
    serviceName: 'Digital Growth Strategy',
    category: 'Growth & Automation',
    tagline: 'Comprehensive, full-funnel digital architecture uniting web, content, and paid acquisition.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Digital Growth Strategy',
    emailHeadline: 'Your Digital Growth Strategy Enquiry Is Confirmed',
    emailSummary: 'We have received your enquiry for our full-funnel Digital Growth Strategy. We connect web presence, creative video distribution, and lead capture automation into a unified revenue engine.',
    emailDeliverables: [
      'Holistic Full-Funnel Architecture & Conversion Audit',
      'Omnichannel Distribution Model (Web + Social + Ads)',
      'Automated Lead Routing, CRM & WhatsApp Integrations',
      'Executive KPI Dashboard & Revenue Scaling Roadmap'
    ],
    whatsappTemplateId: 'yugark_growth_strategy_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for a comprehensive *Digital Growth Strategy* for *${business || 'your brand'}*.\n\nFounder Mr. Radha Krishna will personally review your business profile to formulate an executive growth plan.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🚀 FULL GROWTH ENGINE LEAD: Digital Growth for ${business} by ${name} (${phone}).`,
    ctaText: 'Explore Growth Blueprint',
    ctaUrl: '/services/digital-growth-strategy',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Executive Strategy Intake', channel: 'all', description: 'Instant acknowledgement.' },
      { day: 1, label: 'T+1', topic: 'The 3 Pillars of Compounding Digital Revenue', channel: 'email', description: 'In-depth guide to unified web, content, and lead automation.' },
      { day: 2, label: 'T+2', topic: 'Industry Benchmark & Conversion Metrics', channel: 'whatsapp', description: 'Comparison of industry standard vs YUGARK client performance.' },
      { day: 4, label: 'T+4', topic: 'Executive Growth Session Booking', channel: 'all', description: 'Priority call slot with Founder Mr. Radha Krishna.' }
    ]
  },

  'package-1': {
    serviceId: 'package-1',
    serviceName: 'Package 1 — Website Development (₹12,999 / ~7 Days)',
    category: 'Launch Packages',
    tagline: '7-day rapid luxury website delivery designed for fast-launching businesses.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Package 1 Website Development',
    emailHeadline: 'Package 1 (Website Development) Enquiry Received',
    emailSummary: 'We have received your enquiry for Package 1 — Website Development (₹12,999). Our 7-day sprint takes your brand from concept to live production with zero delays.',
    emailDeliverables: [
      'Custom 5-Page Responsive High-Speed Website',
      'Mobile-Optimized Layout & WhatsApp Floating Action Button',
      'Contact Forms with Lead Storage & Instant Notifications',
      'Free 1-Year Cloud Hosting & SSL Certificate Setup'
    ],
    whatsappTemplateId: 'yugark_pkg1_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for *Package 1 — Website Development (₹12,999 / ~7 Days)* for *${business || 'your business'}*.\n\nOur team is ready to begin your 7-day launch sprint. We will reach out shortly with onboarding details.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `💰 PACKAGE 1 LEAD: Website (₹12,999) for ${business} by ${name} (${phone}).`,
    ctaText: 'View Pricing & Timeline',
    ctaUrl: '/pricing',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Package 1 Sprint Intake Confirmed', channel: 'all', description: 'Instant confirmation.' },
      { day: 1, label: 'T+1', topic: '7-Day Website Launch Timeline Breakdown', channel: 'email', description: 'Day-by-day deliverables from wireframe to deployment.' },
      { day: 3, label: 'T+3', topic: 'Domain & Asset Collection Checklist', channel: 'whatsapp', description: 'Simple 3-step checklist to prepare for kickoff.' }
    ]
  },

  'package-2': {
    serviceId: 'package-2',
    serviceName: 'Package 2 — Website + 5 Reels Bundle (₹19,999)',
    category: 'Launch Packages',
    tagline: 'Complete launch kit combining custom web engineering with 5 promotional short videos.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Package 2 Website + Reels Bundle',
    emailHeadline: 'Package 2 (Website + 5 Reels Bundle) Enquiry Received',
    emailSummary: 'We have received your enquiry for Package 2 — Website + 5 Reels Bundle (₹19,999). This powerhouse launch kit equips your business with both a conversion website and launch video assets.',
    emailDeliverables: [
      'Complete High-Speed Conversion Website (~7 Days Delivery)',
      '5 Custom Scripted & Edited Promotional Reels / Shorts',
      'Dynamic Motion Graphics, Sound Design & Thumbnail Covers',
      'Lead Capture Automation & Direct WhatsApp Integration'
    ],
    whatsappTemplateId: 'yugark_pkg2_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for *Package 2 — Website + 5 Reels Bundle (₹19,999)* for *${business || 'your business'}*.\n\nOur web and video teams will review your requirement and prepare a unified launch proposal.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `⭐ PACKAGE 2 POPULAR LEAD: Web + Reels Bundle (₹19,999) for ${business} from ${name} (${phone}).`,
    ctaText: 'View Bundle Details',
    ctaUrl: '/pricing',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Package 2 Intake Confirmed', channel: 'all', description: 'Instant multi-channel acknowledgement.' },
      { day: 1, label: 'T+1', topic: 'How Video + Web Doubles Launch Inquiries', channel: 'email', description: 'Case study demonstrating the synergy of video ads and fast landing pages.' },
      { day: 2, label: 'T+2', topic: 'Video Script Concepts Preview', channel: 'whatsapp', description: '3 hook ideas tailored to your industry.' }
    ]
  },

  'package-3': {
    serviceId: 'package-3',
    serviceName: 'Package 3 — Website + Complete Content System (₹24,999)',
    category: 'Launch Packages',
    tagline: 'Comprehensive digital ecosystem with website, reels, branded posts, and paid ad setup.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Package 3 Complete Content Ecosystem',
    emailHeadline: 'Package 3 (Website + Complete Content) Enquiry Received',
    emailSummary: 'We have received your enquiry for Package 3 — Website + Complete Content (₹24,999). This provides a complete 360-degree digital launch kit for rapid business expansion.',
    emailDeliverables: [
      'Custom Multi-Page Luxury Website with Instant WhatsApp Routing',
      '4 Custom Short Promotional Reels & Videos per Month',
      '1 Long-Form YouTube Brand Video per Month',
      '10–12 High-Authority Branded Social Media Graphics & Carousels'
    ],
    whatsappTemplateId: 'yugark_pkg3_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for *Package 3 — Website + Complete Content Ecosystem (₹24,999)* for *${business || 'your brand'}*.\n\nFounder Mr. Radha Krishna and our executive team will review your project and connect with you shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `🏆 PACKAGE 3 ENTERPRISE LEAD: Complete Ecosystem (₹24,999) for ${business} from ${name} (${phone}).`,
    ctaText: 'View Complete Ecosystem',
    ctaUrl: '/pricing',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Package 3 Executive Intake', channel: 'all', description: 'Instant confirmation.' },
      { day: 1, label: 'T+1', topic: 'Complete Launch Kit Roadmap', channel: 'email', description: 'Full breakdown of web, video, graphics, and ad rollout.' },
      { day: 2, label: 'T+2', topic: 'Executive Strategy Call Booking', channel: 'whatsapp', description: 'Direct call link with Founder Mr. Radha Krishna.' }
    ]
  },

  'starter-growth': {
    serviceId: 'starter-growth',
    serviceName: 'Essential Growth Retainer (₹5,000 / mo)',
    category: 'Growth Retainers',
    tagline: 'Ideal for local businesses maintaining active social presence and reels.',
    emailSubject: 'Thank You for Contacting YUGARK Digital Studio — Essential Growth Retainer',
    emailHeadline: 'Essential Growth Retainer Enquiry Received',
    emailSummary: 'We have received your enquiry for our Essential Growth Retainer. We provide 4 reels, 8 graphic posts, and active monthly social momentum.',
    emailDeliverables: [
      '4 Custom Promotional Reels / Shorts per Month',
      '8 High-Resolution Branded Social Media Posts',
      'Strategic Captions, Trend Audio & Hashtags',
      'Monthly Content Calendar & Topic Planning'
    ],
    whatsappTemplateId: 'yugark_retainer_ack',
    whatsappMessage: ({ name, business }) =>
      `Hi ${name} 👋\n\nThank you for contacting YUGARK Digital Studio.\n\nWe received your enquiry for the *Essential Growth Retainer* for *${business || 'your business'}*.\n\nOur team will review your requirements and share onboarding details shortly.\n\n— YUGARK Digital Studio`,
    internalNotificationText: ({ name, business, phone }) =>
      `⚡ RETAINER LEAD: Essential Plan (₹5,000/mo) for ${business} by ${name} (${phone}).`,
    ctaText: 'View Retainer Plans',
    ctaUrl: '/pricing',
    followUpSequence: [
      { day: 0, label: 'T+0', topic: 'Retainer Intake Received', channel: 'all', description: 'Instant confirmation.' },
      { day: 1, label: 'T+1', topic: '30-Day Content Production Workflow', channel: 'email', description: 'How we manage monthly production smoothly.' }
    ]
  }
};

/**
 * Helper to identify the exact package/service from an arbitrary string.
 * Supports fuzzy matching across IDs, titles, and bundle names.
 */
export function detectServiceConfig(inputString?: string): ServiceConfigItem {
  if (!inputString || !inputString.trim()) {
    return SERVICE_CONFIG['website-development'];
  }

  const str = inputString.toLowerCase().trim();

  // 1. Direct key match
  if (SERVICE_CONFIG[str]) {
    return SERVICE_CONFIG[str];
  }

  // 2. Specific bundle detection
  if (str.includes('package 3') || str.includes('package-3') || str.includes('24,999') || str.includes('complete content')) {
    return SERVICE_CONFIG['package-3'];
  }
  if (str.includes('package 2') || str.includes('package-2') || str.includes('19,999') || str.includes('5 reels') || str.includes('website + reels') || str.includes('website-reels')) {
    return SERVICE_CONFIG['package-2'];
  }
  if (str.includes('package 1') || str.includes('package-1') || str.includes('12,999') || str.includes('~7 days')) {
    return SERVICE_CONFIG['package-1'];
  }

  // 3. Retainer plans
  if (str.includes('essential') || str.includes('starter-growth') || str.includes('5,000') || str.includes('retainer')) {
    return SERVICE_CONFIG['starter-growth'];
  }

  // 4. Video services
  if (str.includes('short ad video') || str.includes('short video') || str.includes('ad video') || str.includes('calc-short-video')) {
    return SERVICE_CONFIG['short-ad-video'];
  }
  if (str.includes('long-form') || str.includes('long video') || str.includes('explainer') || str.includes('brand video') || str.includes('calc-long-video')) {
    return SERVICE_CONFIG['long-video'];
  }
  if (str.includes('youtube')) {
    return SERVICE_CONFIG['youtube-content'];
  }
  if (str.includes('reel')) {
    return SERVICE_CONFIG['monthly-reels'];
  }

  // 5. Social & Posts
  if (str.includes('individual post') || str.includes('single post') || str.includes('calc-single-post') || str.includes('graphic post')) {
    return SERVICE_CONFIG['individual-post'];
  }
  if (str.includes('monthly posts') || str.includes('posts package')) {
    return SERVICE_CONFIG['monthly-posts'];
  }
  if (str.includes('management') || str.includes('smm')) {
    return SERVICE_CONFIG['social-media-management'];
  }
  if (str.includes('meta ad') || str.includes('advertising') || str.includes('paid ad') || str.includes('facebook ad')) {
    return SERVICE_CONFIG['social-media-advertising'];
  }

  // 6. Strategy & AI
  if (str.includes('ai creative') || str.includes('ai content') || str.includes('ai strategy')) {
    return SERVICE_CONFIG['ai-creative-strategy'];
  }
  if (str.includes('content strategy') || str.includes('editorial')) {
    return SERVICE_CONFIG['content-strategy'];
  }
  if (str.includes('growth strategy') || str.includes('digital growth')) {
    return SERVICE_CONFIG['digital-growth-strategy'];
  }

  // 7. Web
  if (str.includes('web') || str.includes('landing page') || str.includes('ecommerce') || str.includes('catalog') || str.includes('calc-website')) {
    return SERVICE_CONFIG['website-development'];
  }

  // Fallback to default Website Development config
  return SERVICE_CONFIG['website-development'];
}
