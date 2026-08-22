import { Service, CaseStudy, PricingPackage, IndividualServiceItem, BusinessTemplate, BlogPost, PricingPlan } from './types';

// ONE-TIME SERVICES
export const ONE_TIME_SERVICES: Service[] = [
  {
    id: 'website-development',
    title: 'Frontend Website Development',
    shortDesc: 'Custom high-performance responsive frontend website engineered around business goals and conversion.',
    iconName: 'Globe',
    modelType: 'one-time',
    priceDisplay: 'Launch Offer: ₹9,999 (Reg. ₹15,999)',
    deliveryTime: 'Typical Delivery: ~7 Days',
    features: [
      'Mobile-first responsive architecture',
      'SEO-ready structure & fast loading',
      'Direct WhatsApp & enquiry lead routing',
      'Conversion-focused layout & typography'
    ],
    link: '/services/website-development',
    category: 'web',
    fullDescription: 'We build high-performance, custom digital platforms engineered for speed, conversion, and brand credibility. From modern business websites to high-converting product pages, every line of code is written with surgical precision.',
    deliverables: [
      'Custom React / Vite / Modern Web Architecture',
      'Fast UI Interactions & Smooth Transitions',
      'Technical & On-Page SEO Indexing Setup',
      'WhatsApp Direct Chat & Contact Form Integration',
      'High Core Web Vitals & Sub-second Speed',
      'Free Launch Hosting Guidance & Support'
    ],
    benefits: [
      'Elevate business status and build instant client trust',
      'Capture leads directly via WhatsApp & Email',
      'Delivered in approximately 7 days with zero bloat'
    ]
  },
  {
    id: 'fullstack-web',
    title: 'Full Frontend + Backend Website',
    shortDesc: 'End-to-end custom web system with frontend UI, backend server logic, database integration, and lead APIs.',
    iconName: 'Layers',
    modelType: 'one-time',
    priceDisplay: 'Launch Offer: ₹14,999 (Reg. ₹19,999)',
    deliveryTime: 'Typical Delivery: ~10–14 Days',
    features: [
      'Everything in Frontend Website package',
      'Secure backend API & database architecture',
      'Custom lead dashboard & CRM integrations',
      'Dynamic content management capabilities'
    ],
    link: '/services/website-development',
    category: 'web',
    fullDescription: 'Complete end-to-end digital infrastructure for businesses requiring custom backend logic, secure databases, user authentication, or automated CRM workflows.',
    deliverables: [
      'Fullstack React + Node.js / Server Architecture',
      'Cloud Database & API Route Setup',
      'Lead Management & Automated Notifications',
      'Custom Business Logic Implementation',
      'Comprehensive Security & Speed Hardening'
    ],
    benefits: [
      'Complete control over business workflows and data',
      'Zero monthly platform subscriptions'
    ]
  },
  {
    id: 'short-ad-video',
    title: 'Short Advertisement Video',
    shortDesc: 'High-impact 15–30 second promotional and social ad videos (AI-assisted, real, edited, or mixed).',
    iconName: 'Video',
    modelType: 'one-time',
    priceDisplay: '₹3,000 per video',
    deliveryTime: 'Typical Delivery: ~7 Days',
    features: [
      '15–30 second high-retention format',
      'AI-assisted, edited real footage, or mixed visuals',
      'Compelling hook scripting & call-to-action',
      'Optimized for Instagram Reels, Shorts & Meta Ads'
    ],
    link: '/services/ai-content-video',
    category: 'video',
    fullDescription: 'Stop the scroll with high-converting short promotional videos tailored for your business. Whether using AI visual generation, product animations, or crisp video editing, we produce ads designed to get inquiries.',
    deliverables: [
      'Strategic 3-Second Hook & Scripting',
      'Professional Motion Graphics & Typography',
      'Voiceover & Background Music Licensing',
      'Vertical 9:16 Format for Reels & TikTok',
      'Revisions for Brand Alignment'
    ],
    benefits: [
      'Attract new customers on Instagram & Facebook',
      'Cost-effective video production without studio overhead',
      'Ready to run as paid ads or organic reels'
    ]
  },
  {
    id: 'long-video',
    title: 'Long-Form Brand / Explainer Video',
    shortDesc: '3–5 minute in-depth company overview, service walkthrough, or educational brand video.',
    iconName: 'Film',
    modelType: 'one-time',
    priceDisplay: '₹5,000 per video',
    deliveryTime: 'Typical Delivery: ~15 Days',
    features: [
      '3–5 minute comprehensive storytelling',
      'Detailed script, narrative structure & pacing',
      'High-resolution editing, motion graphics & audio',
      'Ideal for YouTube, Website Hero & Client Presentations'
    ],
    link: '/services/content-strategy',
    category: 'video',
    fullDescription: 'For businesses that need to explain complex products, build deep founder authority, or showcase premium services, our long-form video production delivers cinematic clarity.',
    deliverables: [
      'Full Storyboard & Script Breakdown',
      'Motion Graphics, Chapter Titles & B-Roll Editing',
      'Studio-Quality Voiceover & Audio Mastering',
      'YouTube SEO Title, Description & Tags Guidance',
      'Horizontal 16:9 & Master Archive Delivery'
    ],
    benefits: [
      'Build unquestioned industry authority',
      'Educate high-ticket prospects before they ever speak to you',
      'Evergreen video asset for website, YouTube & sales decks'
    ]
  },
  {
    id: 'individual-post',
    title: 'Individual Social Media Post',
    shortDesc: 'Custom high-end graphic post or carousel designed for brand authority.',
    iconName: 'Image',
    modelType: 'one-time',
    priceDisplay: '₹500 per post',
    deliveryTime: 'Fast Turnaround: 24–48 Hours',
    features: [
      'Premium custom graphic design',
      'Copywriting & caption with hashtags',
      'Brand color & font consistency',
      'Single image or carousel slide'
    ],
    link: '/services/social-media-management',
    category: 'content',
    fullDescription: 'Need a specific announcement, festive campaign, offer graphic, or single high-status post? We design on-brand visual assets without requiring long-term lock-in.',
    deliverables: [
      'High-Resolution Graphic (1:1 and 4:5 format)',
      'Persuasive Caption & Targeted Hashtags',
      'Editable Template Master Assets'
    ],
    benefits: [
      'Flexibility to order only what you need',
      'Instant brand upgrade for special offers and milestones'
    ]
  }
];

// MONTHLY GROWTH SERVICES
export const MONTHLY_SERVICES: Service[] = [
  {
    id: 'starter-plan',
    title: 'STARTER Social Media Plan',
    shortDesc: '4 High-Retention Reels + 8 Branded Graphic Posts per month with strategic captions & scheduling.',
    iconName: 'BarChart3',
    modelType: 'monthly',
    priceDisplay: '₹9,999/month',
    deliveryTime: 'Ongoing Monthly Service',
    features: [
      '4 Custom High-Impact Reels / Shorts',
      '8 Branded Social Graphic Posts & Carousels',
      'Content Calendar & Topic Ideation',
      'Strategic Captions & Targeted Hashtags',
      'Monthly Performance Summary'
    ],
    link: '/services/social-media-management',
    category: 'social',
    fullDescription: 'Essential monthly social presence designed for consistent brand visibility, weekly reel engagement, and steady follower conversion.',
    deliverables: [
      '4 Ready-to-Publish Vertical Reels (15–30s)',
      '8 High-Resolution Branded Feed Graphics',
      'Complete Post Captions & Hashtag Bundles',
      'Monthly Content Publishing Calendar'
    ],
    benefits: [
      'Consistent weekly social visibility',
      'Save 30+ hours every month on creative production'
    ]
  },
  {
    id: 'growth-plan',
    title: 'GROWTH Social Media Plan',
    shortDesc: '8 High-Retention Reels + 12 Branded Graphic Posts per month + Strategic Content Calendar & Growth Review.',
    iconName: 'Sparkles',
    modelType: 'monthly',
    priceDisplay: '₹14,999/month',
    deliveryTime: 'Ongoing Monthly Service',
    features: [
      '8 Custom High-Impact Reels / Shorts (2/week)',
      '12 Branded Social Graphic Posts & Carousels',
      'Monthly Content Strategy & Editorial Calendar',
      'Strategic Captions & Viral Hook Variations',
      'Social Profile Optimization & Monthly Growth Review',
      'WhatsApp Direct Studio Support'
    ],
    link: '/services/social-media-management',
    category: 'social',
    fullDescription: 'Our most popular comprehensive monthly social system, delivering high video volume, high-aesthetic graphics, and compounding reach.',
    deliverables: [
      '8 Short-Form Videos with Dynamic Subtitles',
      '12 High-Converting Feed Posts & Multi-Slide Carousels',
      'Editorial Calendar & Trend Research',
      'Bi-Weekly Content Batches',
      'Monthly Analytics & Optimization Review'
    ],
    benefits: [
      '2 Reels published per week for compounding algorithm reach',
      'Unquestioned category authority in your local market'
    ]
  },
  {
    id: 'pro-plan',
    title: 'PRO Social Media Plan',
    shortDesc: '12 High-Retention Reels + 16 Graphic Posts + 1 Long-Form YouTube Video per month + Dedicated Growth Strategy.',
    iconName: 'Youtube',
    modelType: 'monthly',
    priceDisplay: '₹19,999/month',
    deliveryTime: 'Ongoing Monthly Service',
    features: [
      '12 Custom High-Impact Reels / Shorts (3/week)',
      '16 Branded Social Graphic Posts & Multi-Slide Carousels',
      '1 Long-Form YouTube Video per Month (~3–5 min)',
      'Complete Content Strategy & Competitor Benchmarking',
      'Dedicated Creative Direction by Mr. Radha Krishna',
      'Priority Turnaround & WhatsApp Support'
    ],
    link: '/services/social-media-management',
    category: 'social',
    fullDescription: 'Aggressive multi-channel dominance combining frequent short reels, long-form YouTube authority assets, and comprehensive brand storytelling.',
    deliverables: [
      '12 Edited Reels with Motion Graphics',
      '16 Carousel & Graphic Assets',
      '1 Long-Form 3–5 min YouTube Video with Thumbnail',
      'Omni-Channel Content Repurposing',
      'Priority Direct Communication'
    ],
    benefits: [
      'Maximum organic reach across Instagram, YouTube & Facebook',
      'Founder-level creative oversight'
    ]
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads Management',
    shortDesc: 'High-converting Meta, Facebook & Instagram paid ads campaign setup, targeting & creative optimization.',
    iconName: 'Megaphone',
    modelType: 'monthly',
    priceDisplay: '₹15,000/month',
    deliveryTime: 'Setup in 3–5 Days',
    features: [
      'Targeted ad campaign architecture & custom audiences',
      'High-converting ad creatives (reels & graphic carousels)',
      'Meta Pixel, Conversion API & lead form integration',
      'Weekly performance monitoring & budget optimization'
    ],
    link: '/services/social-media-advertising',
    category: 'ads',
    fullDescription: 'Targeted advertising campaigns built to acquire qualified leads and drive high-margin revenue with positive ROAS.',
    deliverables: [
      'High-Converting Ad Copywriting & Hook Variations',
      'Vertical 9:16 Video Ad Creatives & Static Graphics',
      'Meta Pixel & Conversion API Setup',
      'Retargeting & Lookalike Audience Building',
      'Weekly Spend & ROAS Reports'
    ],
    benefits: [
      'Generate direct client inquiries and sales',
      'Scale profitable ad funnels with predictable metrics'
    ]
  },
  {
    id: 'google-ads',
    title: 'Google Ads Management',
    shortDesc: 'High-intent Google Search, Performance Max, and YouTube Ads management to capture active customer demand.',
    iconName: 'Megaphone',
    modelType: 'monthly',
    priceDisplay: '₹15,000/month',
    deliveryTime: 'Setup in 3–5 Days',
    features: [
      'Search, Performance Max & YouTube Ads structure',
      'High-intent keyword research & negative keyword filtering',
      'Ad copy creation & conversion tracking setup',
      'Bid strategy optimization & negative keyword maintenance',
      'Weekly performance & conversion reporting'
    ],
    link: '/services/social-media-advertising',
    category: 'ads',
    fullDescription: 'Capture high-intent buyers the exact moment they search for your services with optimized Google Search and Performance Max campaigns.',
    deliverables: [
      'Keyword Research & Competitor Search Audit',
      'Ad Copywriting with Dynamic Extensions',
      'Conversion Tracking & Google Tag Manager Integration',
      'Weekly Search Term & Budget Optimization'
    ],
    benefits: [
      'Capture ready-to-buy customers actively searching for your service',
      'Maximize click-to-lead conversion rates'
    ]
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    shortDesc: 'Comprehensive monthly social presence, scheduling, and community oversight.',
    iconName: 'BarChart3',
    modelType: 'monthly',
    priceDisplay: 'From ₹9,999/month',
    deliveryTime: 'Ongoing Monthly Service',
    features: [
      'Content pillars & strategic monthly calendar',
      'Consistent publishing & caption writing',
      'Engagement monitoring & growth analysis'
    ],
    link: '/services/social-media-management',
    category: 'social',
    fullDescription: 'Transform social channels into automated organic acquisition systems. We craft high-retention short-form video, visual carousels, and strategic copy that positions your brand as the undisputed authority in your niche.',
    deliverables: [
      'Monthly Content Strategy & Calendar',
      'Post Scheduling & Hashtag Management',
      'Profile Optimization & Bio Enhancement',
      'Monthly Performance & Reach Reports'
    ],
    benefits: [
      'Maintain an active, authoritative social presence',
      'Save 40+ hours per month on content production and management',
      'Turn followers into loyal paying clients'
    ]
  },
  {
    id: 'social-media-advertising',
    title: 'Paid Advertising Management (Meta & Google)',
    shortDesc: 'High-converting Meta, Facebook, Instagram & Google paid ads setup, targeting & creative.',
    iconName: 'Megaphone',
    modelType: 'monthly',
    priceDisplay: '₹15,000/month',
    deliveryTime: 'Setup in 3–5 Days',
    features: [
      'Targeted ad campaign structure & custom audiences',
      'High-converting ad creatives (reels & graphic carousels)',
      'Pixel, Conversion API & lead form integration',
      'Weekly performance monitoring & budget optimization'
    ],
    link: '/services/social-media-advertising',
    category: 'ads',
    fullDescription: 'Targeted advertising campaigns built to acquire qualified leads and drive high-margin revenue with positive ROAS.',
    deliverables: [
      'High-Converting Ad Copywriting & Hook Variations',
      'Vertical 9:16 Video Ad Creatives & Static Graphics',
      'Conversion API & Pixel Tracking Setup',
      'Retargeting & Lookalike Audience Building',
      'Weekly Spend & ROAS Reports'
    ],
    benefits: [
      'Generate direct client inquiries and sales',
      'Scale profitable ad funnels with predictable metrics'
    ]
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy & Editorial Planning',
    shortDesc: 'Develop industry-specific content pillars, messaging blueprints and campaign concepts.',
    iconName: 'PenTool',
    modelType: 'monthly',
    priceDisplay: 'Strategic Retainer',
    deliveryTime: 'Monthly Planning Cycles',
    features: [
      'Customer persona & competitor messaging audit',
      'Monthly editorial calendars & content themes',
      'Cross-platform distribution workflows'
    ],
    link: '/services/content-strategy',
    category: 'content',
    fullDescription: 'A systematic roadmap that aligns content creation with revenue objectives. We research your industry, audit competitor messaging, and build an irresistible story framework.',
    deliverables: [
      'Brand Messaging Blueprint',
      'Monthly Editorial Content Calendars',
      'Multi-Format Repurposing Workflows',
      'Thought Leadership & Positioning'
    ],
    benefits: [
      'Eliminate topic ideation guesswork',
      'Unify all brand messaging across touchpoints'
    ]
  },
  {
    id: 'digital-growth-strategy',
    title: 'Digital Growth Strategy',
    shortDesc: 'End-to-end digital roadmap uniting website, content, and lead generation.',
    iconName: 'Compass',
    modelType: 'monthly',
    priceDisplay: 'Strategic Consultation',
    deliveryTime: 'Quarterly Roadmaps',
    features: [
      'Digital presence & conversion audit',
      'Positioning, pricing & offer optimization',
      'Multi-channel customer acquisition roadmap'
    ],
    link: '/services/digital-growth-strategy',
    category: 'growth',
    fullDescription: 'End-to-end digital architecture for scaling businesses. We analyze your digital footprint, spot leverage points, and unite website, content, ads, and automation into a compounding growth engine.',
    deliverables: [
      '360-Degree Digital Audit',
      'Competitive Positioning Matrix',
      'Multi-Channel Growth Roadmap',
      'Conversion Rate Optimization Reviews'
    ],
    benefits: [
      'Clarity on every marketing dollar spent',
      'Streamlined customer acquisition funnels'
    ]
  }
];

// Combined for universal access
export const SERVICES_DATA: Service[] = [...ONE_TIME_SERVICES, ...MONTHLY_SERVICES];

// PRICING PACKAGES (Synchronized with current approved packages)
export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'frontend-website',
    name: 'Frontend Website Development',
    tagline: 'Custom high-performance responsive frontend website built for conversion & credibility.',
    badge: 'LAUNCH OFFER',
    regularPrice: 15999,
    launchPrice: 9999,
    type: 'one-time',
    deliveryTime: 'Typical Delivery: ~7 Days',
    features: [
      'Custom React / Modern Responsive Website (Up to 5 Pages)',
      'Ultra-Fast Loading & Mobile-First Design',
      'SEO-Ready Code & Google Indexing Setup',
      'Direct WhatsApp Chat & Instant Lead Routing',
      'Enquiry Form with Instant Notification',
      '30 Days Free Technical Support'
    ],
    ctaText: 'Choose Frontend Website — ₹9,999'
  },
  {
    id: 'fullstack-website',
    name: 'Full Frontend + Backend Website',
    tagline: 'Complete custom web system with frontend UI, backend API server, database & lead flows.',
    badge: 'COMPREHENSIVE',
    regularPrice: 19999,
    launchPrice: 14999,
    type: 'one-time',
    deliveryTime: 'Typical Delivery: ~10–14 Days',
    features: [
      'Everything in Frontend Website package',
      'Full Backend API Architecture & Database Setup',
      'Custom Lead Management & CRM Integration',
      'Dynamic Content & Administration Capabilities',
      'Comprehensive Security & Speed Optimization',
      'Priority Delivery & Extended Support'
    ],
    ctaText: 'Choose Fullstack Website — ₹14,999',
    isPopular: true
  },
  {
    id: 'growth-social-plan',
    name: 'GROWTH Social Media & Content Plan',
    tagline: '8 High-Retention Reels + 12 Branded Graphic Posts per month + Strategic Content Calendar.',
    badge: 'MOST POPULAR PLAN',
    regularPrice: 19999,
    launchPrice: 14999,
    type: 'monthly',
    deliveryTime: 'Ongoing Monthly Service',
    features: [
      '8 Custom High-Impact Reels / Shorts (2 per week)',
      '12 Branded Social Graphic Posts & Carousels',
      'Monthly Content Strategy & Editorial Calendar',
      'Strategic Captions & Viral Hook Variations',
      'Social Profile Optimization & Monthly Growth Review',
      'WhatsApp Direct Studio Support'
    ],
    ctaText: 'Choose Growth Plan — ₹14,999/mo',
    isPopular: true
  },
  {
    id: 'paid-ads-management',
    name: 'Meta / Google Paid Ads Management',
    tagline: 'Targeted performance campaigns built for qualified leads, direct sales, and high ROAS.',
    badge: 'HIGH ROAS',
    regularPrice: 20000,
    launchPrice: 15000,
    type: 'monthly',
    deliveryTime: 'Setup in 3–5 Days',
    features: [
      'Targeted campaign architecture & custom audience building',
      'Ad creatives, hook variations & high-converting copy',
      'Pixel, Conversion API & tracking setup',
      'Weekly performance monitoring & budget optimization'
    ],
    ctaText: 'Choose Ads Management — ₹15,000/mo'
  }
];

// INDIVIDUAL SERVICES FOR CALCULATOR & A LA CARTE
export const INDIVIDUAL_SERVICES: IndividualServiceItem[] = [
  {
    id: 'calc-frontend-web',
    title: 'Frontend Website Development',
    price: 9999,
    unit: 'per website',
    deliveryTime: '~7 Days Delivery',
    description: 'High-performance responsive frontend website with WhatsApp & lead integration.',
    features: ['Mobile-first', 'SEO ready', 'WhatsApp chat', 'Sub-second speed']
  },
  {
    id: 'calc-fullstack-web',
    title: 'Full Frontend + Backend Website',
    price: 14999,
    unit: 'per website',
    deliveryTime: '~10–14 Days Delivery',
    description: 'Complete fullstack website with custom backend, database and lead management.',
    features: ['Fullstack React + Node', 'Database setup', 'Custom APIs', 'CRM routing']
  },
  {
    id: 'calc-starter-plan',
    title: 'STARTER Social Media Plan',
    price: 9999,
    unit: 'per month',
    deliveryTime: 'Ongoing Monthly Service',
    description: '4 Reels + 8 Graphic Posts per month with strategic captions & scheduling.',
    features: ['4 Reels/Shorts', '8 Graphic Posts', 'Content Calendar', 'Captions & Hashtags']
  },
  {
    id: 'calc-growth-plan',
    title: 'GROWTH Social Media Plan',
    price: 14999,
    unit: 'per month',
    deliveryTime: 'Ongoing Monthly Service',
    description: '8 Reels + 12 Graphic Posts per month + Strategy Calendar & Growth Review.',
    features: ['8 Reels (2/week)', '12 Graphic Posts', 'Strategy Calendar', 'Profile Optimization']
  },
  {
    id: 'calc-pro-plan',
    title: 'PRO Social Media Plan',
    price: 19999,
    unit: 'per month',
    deliveryTime: 'Ongoing Monthly Service',
    description: '12 Reels + 16 Posts + 1 Long-Form YouTube Video per month.',
    features: ['12 Reels (3/week)', '16 Posts/Carousels', '1 YouTube Video (~3–5 min)', 'Dedicated Strategy']
  },
  {
    id: 'calc-meta-ads',
    title: 'Meta Ads Management',
    price: 15000,
    unit: 'per month',
    deliveryTime: 'Setup in 3–5 Days',
    description: 'Targeted Meta/Facebook/Instagram campaign architecture, creatives & optimization.',
    features: ['Targeted structure', 'Ad creatives', 'Pixel & CAPI', 'Weekly optimization']
  },
  {
    id: 'calc-google-ads',
    title: 'Google Ads Management',
    price: 15000,
    unit: 'per month',
    deliveryTime: 'Setup in 3–5 Days',
    description: 'High-intent Google Search, Performance Max & YouTube Ads management.',
    features: ['Keyword research', 'Negative keywords', 'Search & PMax', 'Conversion tracking']
  },
  {
    id: 'calc-short-video',
    title: 'Short Advertisement Video',
    price: 3000,
    unit: 'per video',
    deliveryTime: '~7 Days Delivery',
    description: '15–30s high-retention promotional reel or paid social ad.',
    features: ['Hook script', 'Motion text', 'Voiceover', '9:16 format']
  },
  {
    id: 'calc-long-video',
    title: 'Long Brand / Explainer Video',
    price: 5000,
    unit: 'per video',
    deliveryTime: '~15 Days Delivery',
    description: '3–5 minute detailed brand overview or service walkthrough.',
    features: ['Storyboard', 'Deep narrative', 'YouTube SEO', '16:9 master']
  },
  {
    id: 'calc-single-post',
    title: 'Social Media Graphic Post',
    price: 500,
    unit: 'per post',
    deliveryTime: '24–48 Hours',
    description: 'Custom designed graphic or carousel slide with caption.',
    features: ['On-brand design', 'Written caption', 'Targeted hashtags']
  }
];

// MONTHLY RETAINER PLANS (Synchronized with current approved plans)
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter-plan',
    name: 'STARTER Social Media Plan',
    tagline: 'Essential monthly presence: 4 reels & 8 posts with captions & scheduling.',
    monthlyPrice: 9999,
    annualPrice: 89991, // 25% OFF equivalent
    ctaText: 'Start Starter Plan',
    features: [
      '4 Custom High-Impact Reels / Shorts (15–30s)',
      '8 Branded Social Media Graphic Posts & Carousels',
      'Strategic Captions & Targeted Hashtags',
      'Monthly Content Calendar & Topic Planning',
      'WhatsApp Direct Studio Support'
    ]
  },
  {
    id: 'growth-plan',
    name: 'GROWTH Social Media Plan',
    tagline: 'Most popular growth engine: 8 reels & 12 posts + full strategy & analytics.',
    monthlyPrice: 14999,
    annualPrice: 134991,
    isPopular: true,
    ctaText: 'Start Growth Plan',
    features: [
      '8 Custom High-Impact Reels / Shorts (2 per week)',
      '12 Branded Social Media Graphic Posts & Carousels',
      'Monthly Content Strategy & Editorial Calendar',
      'Viral Hook Variations & Dynamic Subtitles',
      'Social Profile Optimization & Monthly Growth Review',
      'WhatsApp Direct Studio Support'
    ]
  },
  {
    id: 'pro-plan',
    name: 'PRO Social Media Plan',
    tagline: 'Omni-channel dominance: 12 reels, 16 posts + 1 YouTube video + direct founder strategy.',
    monthlyPrice: 19999,
    annualPrice: 179991,
    ctaText: 'Start Pro Plan',
    features: [
      '12 Custom High-Impact Reels / Shorts (3 per week)',
      '16 Branded Social Graphic Posts & Multi-Slide Carousels',
      '1 Long-Form YouTube Video per Month (~3–5 min)',
      'Complete Content Strategy & Competitor Benchmarking',
      'Dedicated Creative Direction by Mr. Radha Krishna',
      'Priority Turnaround & WhatsApp Support'
    ]
  }
];

// BUSINESS TEMPLATES SHOWCASE (10 DEMO TEMPLATES)
export const BUSINESS_TEMPLATES: BusinessTemplate[] = [
  {
    id: 'restaurant-cafe',
    industry: 'Restaurant & Café',
    demoName: 'Bistro Royale & Artisan Café',
    tagline: 'Drive table bookings, weekend footfall, and food delivery orders.',
    iconName: 'Utensils',
    previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#D4B06A',
    liveBadge: 'Demo Template',
    pagesIncluded: '5 Pages + WhatsApp Table Booking',
    websiteIncludes: ['Visual digital menu with item highlights', '1-click WhatsApp table reservation', 'Location map & opening hours', 'Google Reviews showcase'],
    videoContent: ['15s mouth-watering dish teasers', 'Kitchen preparation & ambiance reels', 'Chef recommendation clips'],
    socialContent: ['Daily food specials & weekend event posts', 'Customer testimonial carousels', 'Festive combo promotions'],
    growthFocus: 'Local Google Maps optimization & Instagram food reels targeting food lovers within 10 km.'
  },
  {
    id: 'gym-fitness',
    industry: 'Gym & Fitness',
    demoName: 'Apex Fitness & Performance Club',
    tagline: 'Fill membership slots, showcase equipment, and convert trial passes.',
    iconName: 'Dumbbell',
    previewImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#EF4444',
    liveBadge: 'Demo Template',
    pagesIncluded: '5 Pages + Free Pass Lead Form',
    websiteIncludes: ['Membership tier breakdown', 'Trainer profiles & class schedules', 'Instant free trial pass booking', 'Transformation gallery'],
    videoContent: ['High-energy workout reels', 'Member transformation spotlight', 'Facility walkthrough videos'],
    socialContent: ['Workout tips of the week', 'Diet & protein guidance carousels', 'New batch enrollment alerts'],
    growthFocus: 'Hyper-local Meta ads promoting free 1-day guest passes and annual membership discounts.'
  },
  {
    id: 'real-estate',
    industry: 'Real Estate',
    demoName: 'Aura Luxury Living & Estates',
    tagline: 'Generate high-intent buyer inquiries for residential & commercial projects.',
    iconName: 'Building',
    previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#D4B06A',
    liveBadge: 'Demo Template',
    pagesIncluded: '6 Pages + Virtual Tour & Brochure',
    websiteIncludes: ['Floor plan & master layout viewer', 'Interactive virtual video tour integration', 'VIP brochure download with lead capture', 'Direct sales rep WhatsApp route'],
    videoContent: ['Cinematic property walk-throughs', 'Neighborhood & connectivity highlights', 'Investor ROI breakdown reels'],
    socialContent: ['Project milestone updates', 'Luxury lifestyle imagery', 'Pricing & payment plan carousels'],
    growthFocus: 'High-intent Google Search & Meta lead generation campaigns capturing qualified buyers.'
  },
  {
    id: 'healthcare-clinic',
    industry: 'Healthcare',
    demoName: 'CarePlus Specialty Dental & Ortho',
    tagline: 'Build patient trust, explain treatments, and streamline appointment booking.',
    iconName: 'HeartPulse',
    previewImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#0EA5E9',
    liveBadge: 'Demo Template',
    pagesIncluded: '5 Pages + Instant Appointment',
    websiteIncludes: ['Doctor qualifications & specialties', 'Treatment explanations & FAQ', 'Instant appointment booking via WhatsApp', 'Patient review showcase'],
    videoContent: ['Doctor advice & health tips (15–30s)', 'Clinic hygiene & technology tour', 'Treatment procedure explainers'],
    socialContent: ['Preventive care infocards', 'Seasonal illness prevention tips', 'Doctor Q&A carousels'],
    growthFocus: 'Local SEO for clinic specialty searches and educational video campaigns on WhatsApp & Instagram.'
  },
  {
    id: 'coaching-education',
    industry: 'Coaching / Education',
    demoName: 'Zenith Academy of Excellence',
    tagline: 'Enroll students, sell course batches, and showcase exam toppers.',
    iconName: 'GraduationCap',
    previewImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#F59E0B',
    liveBadge: 'Demo Template',
    pagesIncluded: '6 Pages + Demo Class Booking',
    websiteIncludes: ['Course curriculum & batch timings', 'Faculty bios & student results', 'Demo class registration form', 'Fee structure & scholarships'],
    videoContent: ['Concept explanation shorts', 'Topper interview snippets', 'Classroom environment reels'],
    socialContent: ['Daily practice questions & quiz', 'Exam alert announcements', 'Student success stories'],
    growthFocus: 'Targeted student and parent ad funnels driving demo class registrations.'
  },
  {
    id: 'ecommerce-retail',
    industry: 'E-commerce',
    demoName: 'Velvet & Co. Luxury Apparel',
    tagline: 'Convert website visitors into repeat buyers with frictionless shopping.',
    iconName: 'ShoppingBag',
    previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#EC4899',
    liveBadge: 'Demo Template',
    pagesIncluded: 'Catalog + Cart + Checkout',
    websiteIncludes: ['Catalog & collection showcases', 'UPI & card payment integration', 'Direct WhatsApp order support', 'Customer reviews & ratings'],
    videoContent: ['Product unboxing & styling reels', 'Before/After demonstration videos', 'Customer reaction clips'],
    socialContent: ['New arrival announcements', 'Limited-time discount carousels', 'Behind-the-scenes packaging'],
    growthFocus: 'Retargeting ads on Instagram and automated WhatsApp abandoned cart recovery.'
  },
  {
    id: 'salon-beauty',
    industry: 'Salon / Beauty',
    demoName: 'Luxe Glow Studio & Spa',
    tagline: 'Fill appointment slots and showcase bridal & styling packages.',
    iconName: 'Sparkles',
    previewImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#D946EF',
    liveBadge: 'Demo Template',
    pagesIncluded: '5 Pages + Bridal Rate Card',
    websiteIncludes: ['Service rate card & packages', 'Bridal & grooming portfolio', 'Online slot booking & WhatsApp appointment', 'Client reviews'],
    videoContent: ['Hair styling & makeover transformation reels', 'Skincare routine tips', 'Salon ambiance teasers'],
    socialContent: ['Before & after hair/skin carousels', 'Festive bridal booking offers', 'Client shoutout posts'],
    growthFocus: 'Local Instagram ads showcasing bridal transformations and seasonal grooming packages.'
  },
  {
    id: 'hotel-hospitality',
    industry: 'Hotel & Hospitality',
    demoName: 'Grand Horizon Resort & Suites',
    tagline: 'Boost direct room bookings and banquet / event reservations.',
    iconName: 'Hotel',
    previewImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#D4B06A',
    liveBadge: 'Demo Template',
    pagesIncluded: '6 Pages + Banquet Inquiry',
    websiteIncludes: ['Room gallery with amenities', 'Direct booking inquiry & WhatsApp concierge', 'Banquet & wedding event inquiry form', 'Traveler reviews'],
    videoContent: ['Scenic resort & room tour reels', 'Dining & culinary experience clips', 'Guest celebration highlights'],
    socialContent: ['Weekend getaway packages', 'Event space availability alerts', 'Seasonal travel inspiration'],
    growthFocus: 'Targeting travelers and corporate event planners with direct booking discounts.'
  },
  {
    id: 'local-business',
    industry: 'Local Business',
    demoName: 'PrimeTech Home & Auto Services',
    tagline: 'Dominate local Google search and get urgent service booking calls.',
    iconName: 'Wrench',
    previewImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#3B82F6',
    liveBadge: 'Demo Template',
    pagesIncluded: '4 Pages + Instant Call / WhatsApp',
    websiteIncludes: ['Emergency & scheduled service rate card', 'Service coverage area interactive map', '1-click WhatsApp quote request', 'Customer trust certifications'],
    videoContent: ['Fast service dispatch clips', 'Before & after repair transformations', 'Customer satisfaction feedback'],
    socialContent: ['Seasonal maintenance checklist', 'Discount coupon alerts', 'Emergency contact cards'],
    growthFocus: 'Google Local Services Ads and high-converting mobile call-only funnels.'
  },
  {
    id: 'corporate-professional',
    industry: 'Corporate',
    demoName: 'Vanguard Global Advisory',
    tagline: 'Establish undeniable executive authority and win B2B contracts.',
    iconName: 'Briefcase',
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#94A3B8',
    liveBadge: 'Demo Template',
    pagesIncluded: '6 Pages + Corporate Whitepapers',
    websiteIncludes: ['Service capability matrix', 'Client case studies & whitepapers', 'Founder / leadership profile', 'Consultation scheduler'],
    videoContent: ['Executive insight shorts', 'Industry trend breakdown videos', 'Client outcome overviews'],
    socialContent: ['Industry analysis infographics', 'Company achievements & news', 'Thought leadership quotes'],
    growthFocus: 'LinkedIn content distribution and Google B2B search visibility.'
  }
];

// PROCESS STEPS (6 STEPS)
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Connect',
    shortDesc: 'Client contacts YUGARK and shares requirement.',
    details: 'You connect with us via WhatsApp, phone, or website inquiry form and share your business background, timeline, and goals.'
  },
  {
    number: '02',
    title: 'Understand & Strategize',
    shortDesc: 'We understand your business, goals, audience & required services.',
    details: 'We audit your current digital footprint, analyze your target buyers, and recommend the exact website architecture and content package required.'
  },
  {
    number: '03',
    title: 'Create',
    shortDesc: 'Website, videos and content production begins.',
    details: 'Our design and development team creates your custom website and scripts, edits, and produces your promotional videos and graphics.'
  },
  {
    number: '04',
    title: 'Review',
    shortDesc: 'Client reviews work and provides feedback.',
    details: 'You test the website on mobile and desktop, review the video reels and graphics, and we fine-tune any adjustments to ensure 100% satisfaction.'
  },
  {
    number: '05',
    title: 'Launch',
    shortDesc: 'Website is deployed and content is delivered.',
    details: 'Your website goes live on your domain with Google Search indexing and WhatsApp lead routing, and master video files are delivered ready to publish.'
  },
  {
    number: '06',
    title: 'Grow',
    shortDesc: 'Optional monthly social media/content management begins.',
    details: 'For clients seeking compounding reach, we continue delivering weekly reels, monthly YouTube videos, and social graphics to accelerate business growth.'
  }
];

export const INDUSTRIES = [
  'Restaurant & Café',
  'Gym & Fitness',
  'Real Estate',
  'Healthcare',
  'Coaching & Education',
  'E-commerce & Retail',
  'Salon & Beauty',
  'Hotel & Hospitality',
  'Corporate & B2B',
  'Local Business'
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aethel-luxury-realestate',
    title: 'Aethel Living — Luxury Real Estate Showcase',
    client: 'Aethel Living',
    industry: 'Real Estate',
    summary: 'A complete website overhaul, property video walkthroughs, and targeted lead funnels resulting in ₹18M+ in qualified property inquiries.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Aethel Living had luxury developments but an outdated web presence that failed to convey premium quality to high-net-worth buyers.',
    solution: 'Engineered a modern black-and-gold digital showcase with interactive floorplans, video teaser reels, and automated WhatsApp VIP lead routing.',
    results: [
      { label: 'Inquiries', value: '340+' },
      { label: 'Pipeline Generated', value: '₹18.4 Cr' },
      { label: 'Conversion', value: '4.8%' }
    ],
    technology: ['React / Vite', 'Motion Design', 'Video Production', 'WhatsApp Routing'],
    category: 'Real Estate',
    testimonial: {
      quote: "YUGARK transformed how buyers perceive our developments. The digital platform and video reels generated serious client inquiries in our very first month.",
      author: 'Marcus Vance',
      role: 'Managing Director, Aethel Living'
    }
  },
  {
    id: 'lumina-health-clinic',
    industry: 'Healthcare',
    title: 'Lumina Health — Patient Growth via Modern Web & Video',
    client: 'Lumina Health Clinics',
    summary: 'Scaled clinic inquiries by 310% with a clean booking website, doctor advice reels, and local search visibility.',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Inconsistent branding across clinics and difficulty converting mobile visitors into booked appointments.',
    solution: 'Built a lightning-fast doctor booking platform with WhatsApp appointment scheduling and educational short video content.',
    results: [
      { label: 'Patient Inquiries', value: '+310%' },
      { label: 'Speed Score', value: '98/100' },
      { label: 'Direct Bookings', value: '180+/mo' }
    ],
    technology: ['Fast Web Architecture', 'Health Video Shorts', 'Local SEO', 'WhatsApp API'],
    category: 'Healthcare',
    testimonial: {
      quote: "The combination of a fast website and educational video content helped our clinic build immediate trust with prospective patients.",
      author: 'Dr. Elena Rostova',
      role: 'Chief Medical Officer'
    }
  },
  {
    id: 'solace-artisanal-coffee',
    title: 'Solace Coffee & Roastery — Digital Presence & Reels',
    client: 'Solace Coffee Co.',
    industry: 'Restaurant & Café',
    summary: 'Increased café footfall and monthly subscription orders with a dynamic menu website and viral Instagram reel campaigns.',
    heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Beloved regional café struggling to translate physical brand charm into online orders and subscription sales.',
    solution: 'Crafted a lifestyle website with digital menu and produced 8 short-form reels showcasing brewing methods and special blends.',
    results: [
      { label: 'Online Orders', value: '450+/mo' },
      { label: 'Footfall Growth', value: '+65%' },
      { label: 'Video Views', value: '120K+' }
    ],
    technology: ['Modern Web App', 'Reel Video Production', 'Menu Viewer', 'WhatsApp Orders'],
    category: 'Restaurant & Café',
    testimonial: {
      quote: "YUGARK gave our brand a modern look that customers love. Our online table queries and beans orders skyrocketed.",
      author: 'Julian Thorne',
      role: 'Co-Founder & CEO'
    }
  },
  {
    id: 'iron-vault-fitness-concept',
    title: 'Iron Vault Fitness — Premium Gym Launch Concept',
    client: 'Iron Vault Fitness',
    industry: 'Gym & Fitness',
    isConcept: true,
    summary: 'High-energy concept website and promotional video reels designed to fill 200 gym membership slots prior to grand opening.',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Need to generate early membership interest before facility opening without large marketing spend.',
    solution: 'Developed an interactive workout schedule preview, 1-day pass WhatsApp claim, and motivational trainer teaser reels.',
    results: [
      { label: 'Pass Claims', value: '420+' },
      { label: 'Pre-Signups', value: '185' },
      { label: 'Inquiry Rate', value: '12.4%' }
    ],
    technology: ['React', 'Short-form Video', 'Lead Automation', 'Concept Design'],
    category: 'Gym & Fitness'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'why-businesses-need-video-and-web',
    title: 'Why a Website Alone Is No Longer Enough: The Power of Short Video + Web',
    slug: 'why-businesses-need-video-and-web',
    excerpt: 'How combining a fast, high-converting website with regular short promotional video multiplies customer inquiries by 4x.',
    content: `In today's digital landscape, customer attention is earned on social feeds and converted on fast websites. Businesses that only have a website struggle to get consistent traffic, while businesses that only post on social media lose high-intent buyers who want proof of credibility.

At YUGARK Digital Studio, we engineer synchronized digital ecosystems where:
1. High-retention short videos capture initial interest on Instagram & YouTube.
2. A fast, modern website builds instant authority and answers buyer questions.
3. Direct WhatsApp integration closes inquiries within minutes.`,
    category: 'Growth',
    author: 'Mr. Radha Krishna',
    date: 'August 2026',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '7-day-website-delivery-framework',
    title: 'How YUGARK Delivers Custom Business Websites in ~7 Days Without Quality Loss',
    slug: '7-day-website-delivery-framework',
    excerpt: 'A behind-the-scenes look at our modular engineering framework that eliminates traditional agency delays.',
    content: `Traditional web agencies take 6 to 12 weeks to deliver standard business websites because of bloated processes and fragmented communication.

By establishing strict modular architectures, direct client alignment from Day 1, and zero-bloat codebases, YUGARK delivers production-ready, SEO-indexed business websites in approximately 7 days.`,
    category: 'Websites',
    author: 'Mr. Radha Krishna',
    date: 'August 2026',
    readTime: '3 min read',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'grand-opening-digital-growth-guide',
    title: 'The Local Business Growth Playbook for Indian Brands',
    slug: 'grand-opening-digital-growth-guide',
    excerpt: 'Step-by-step guidance for restaurants, clinics, gyms, and local services to dominate their local market in 30 days.',
    content: `Whether you run a café in Bangalore, a clinic in Delhi, or a fitness center in Mumbai, local buyer psychology is remarkably consistent: customers want to see real photos/videos, check opening hours, view pricing, and chat immediately on WhatsApp.

Discover how to connect Google Business Profile, WhatsApp automated routing, and short-form video ads into a continuous pipeline of paying customers.`,
    category: 'Social Media',
    author: 'Mr. Radha Krishna',
    date: 'August 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
  }
];
