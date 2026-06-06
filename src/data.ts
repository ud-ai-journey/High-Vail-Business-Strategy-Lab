import { Project, Service, ComparisonRow } from './types';

export const portfolioProjects: Project[] = [
  {
    id: 'chils',
    title: 'CHILS & CO',
    subtitle: 'Premium apparel ecommerce experience',
    link: 'https://chilsandco.com',
    bgColor: 'from-neutral-900 via-neutral-950 to-amber-950/20',
    accentColor: '#c6a66b',
    stats: ['Premium Rebrand', 'Integrated Custom Shop', '350% Growth'],
    description: 'A comprehensive transformation of CHILS & CO from local boutique to national premium aesthetic statement.',
    challenge: 'Struggling with standard Shopify templates that commoditized their brand, and facing low digital retention because of generic social media messaging.',
    solution: 'Designed and engineered a custom high-performance headless commerce ecosystem. Positioned the brand around cinematic minimal photography, rich editorial layouts, and storytelling content engines.',
    impact: 'Increased average order value by 72%, drove organic social retention by 110%, and achieved full end-to-end operational automation.',
    category: 'E-commerce & Branding',
    imageSeed: 'apparel',
    videoUrl: 'https://res.cloudinary.com/ddatd5ruz/video/upload/v1780758486/Firefly_The_video_begins_in_complete_darkness_with_small_digital_snow_particles_slowly_appearing_an_ng6tae.mp4'
  },
  {
    id: 'mogalthur',
    title: 'MOGALTHUR MANGOES',
    subtitle: 'Digitized ultra-premium agricultural brand',
    link: 'https://mogalthur-mangoes.vercel.app',
    bgColor: 'from-stone-900 via-stone-950 to-yellow-950/20',
    accentColor: '#d4af37',
    stats: ['400K+ Views', 'Sold-out Season', 'Profits Tripled'],
    description: 'A revolutionary digital product release for legendary luxury mangoes, built from absolute zero.',
    challenge: 'High-quality premium crops sold through traditional wholesale brokers, resulting in low margins and lack of consumer brand awareness.',
    solution: 'Built an exclusive pre-order digital campaign with premium storytelling, highly crafted cinematic product landing pages, and micro-influencer content sequences.',
    impact: 'Drove over 400,000 views, sold out the entire harvest season in just 66 hours, and and bypassed middleman networks to triple net margins.',
    category: 'Growth & Launch Systems',
    imageSeed: 'mango',
    videoUrl: 'https://res.cloudinary.com/ddatd5ruz/video/upload/v1778477769/hailuo-2_3_Create_a_10_15_second_cinematic_luxury_logo_reveal_for_the_uploaded__MOGALTH-0_liener.mp4'
  },
  {
    id: 'swami-reddy',
    title: 'SWAMI REDDY MANGO FARM',
    subtitle: 'Traditional heritage farm transformed to digital',
    link: 'https://swami-reddy-mango-farm.vercel.app',
    bgColor: 'from-neutral-950 via-stone-900 to-amber-900/10',
    accentColor: '#c6a66b',
    stats: ['Heritage Positioned', '100% Direct-to-Consumer', 'Zero Middlemen'],
    description: 'Transforming a multi-decade heritage estate into a high-demand premium brand for digital-native customers.',
    challenge: 'Commoditization of legacy farms, dependency on outdated supply chains, and rising operation costs.',
    solution: 'Repositioned farm history as an artisanal legacy. Created clean, premium digital checkout pipelines and rich documentary-style social video series.',
    impact: 'Established a premium brand status, achieved 100% direct-to-consumer delivery, and secured 80% repeat custom subscription rate.',
    category: 'Digital Repositioning',
    imageSeed: 'farm',
    videoUrl: 'https://res.cloudinary.com/dhmasikjw/video/upload/v1779780110/Firefly_A_clean_premium_white_background_illuminated_by_soft_golden_morning_sunlight_entering_from_t_ar0lwp.mp4'
  },
  {
    id: 'cocoamrut',
    title: 'COCOAMRUT',
    subtitle: 'Natural cold-pressed coconut oil launch',
    link: 'https://cocoamrut.vercel.app',
    bgColor: 'from-neutral-900 via-neutral-950 to-emerald-950/10',
    accentColor: '#d4af37',
    stats: ['Branding from Scratch', 'Organic Sourcing Focus', 'Launch Systems'],
    description: 'A pure, organic, cold-pressed coconut oil brand launched into a crowded market with high-impact conviction.',
    challenge: 'Standing out in an organic oil segment saturated with greenwashed eco-marketing.',
    solution: 'Designed a striking minimal premium amber glass aesthetic, highly visual custom animations, and a high-efficiency single-product funnel.',
    impact: 'Established premium market positioning, captured 18,000 active subscribers, and secured placement in premium wellness outlets.',
    category: 'Branding & Launch Strategy',
    imageSeed: 'coconut',
    videoUrl: 'https://res.cloudinary.com/dhmasikjw/video/upload/v1778995894/Firefly_The_video_begins_with_a_soft_cream-to-golden_gradient_background_setting_a_luxurious_and_el_earsi2.mp4'
  },
  {
    id: 'kamakhya',
    title: 'SRI KAMAKHYA COLIVING',
    subtitle: 'Modern brand identity and premium presence',
    link: 'https://kamakhya-coliving.vercel.app',
    bgColor: 'from-stone-950 via-neutral-900 to-rose-950/10',
    accentColor: '#c6a66b',
    stats: ['Premium Spatial Brand', '100% Occupancy', 'Automated Funnels'],
    description: 'Elevating regional spatial hospitality into a highly recognized brand identity for modern tech professionals.',
    challenge: 'Low perceived value and visual noise relative to institutional co-living companies.',
    solution: 'Constructed an elite lifestyle brand around community, quiet luxury amenities, and immediate self-serve online reservation tools.',
    impact: 'Achieved 100% booked capacity within 4 weeks of relaunch, doubling high-margin corporate contracts.',
    category: 'Spatial Identity & Web',
    imageSeed: 'coliving'
  }
];

export const servicesList: Service[] = [
  { name: 'Brand Strategy', description: 'Deep market positioning, audience architecture, and scalable unit profitability modeling.', category: 'strategy' },
  { name: 'Brand Naming', description: 'Developing magnetic, unforgettable names designed to dominate search registers & build prestige.', category: 'strategy' },
  { name: 'Logo Design', description: 'Iconic custom vector marks that look immaculate at 16px on a phone or 100ft on a billboard.', category: 'creative' },
  { name: 'Logo Animation', description: 'Flawless 60fps micro-interaction and motion design assets for signature digital systems.', category: 'creative' },
  { name: 'Website Design', description: 'Cinematic, responsive, pixel-perfect user experiences that build authority and trust.', category: 'digital' },
  { name: 'Ecommerce Development', description: 'Custom headless architecture engineered for speed, conversion, and fluid operations.', category: 'digital' },
  { name: 'Script Writing', description: 'Narrative structures and video scripts designed to hold visual attention and drive conversion hooks.', category: 'creative' },
  { name: 'Content Creation', description: 'Cinematic studio photography, short-form and high-production content assets optimized for channels.', category: 'creative' },
  { name: 'Video Production', description: 'High-end color grading, documentary film standards, and rapid commercial cutdowns.', category: 'creative' },
  { name: 'Social Media Management', description: 'Systematized organic distribution and narrative positioning that converts views to capital.', category: 'operations' },
  { name: 'Growth Systems', description: 'Full-stack funnel pipelines matching automated pipelines, email marketing, and scale strategies.', category: 'operations' }
];

export const comparisonTable: ComparisonRow[] = [
  {
    aspect: 'Key Focus',
    traditional: 'Delivering deliverables (assets, posts, basic sites)',
    highVail: 'Scaling business enterprise value, conversion, and cash flows'
  },
  {
    aspect: 'Strategic Approach',
    traditional: 'Wait and execute what you ask for (reactive template-based work)',
    highVail: 'Proactive partner acting as an co-builder and growth operator'
  },
  {
    aspect: 'Aesthetic Standards',
    traditional: 'Generic corporate templates and uninspired visual design',
    highVail: 'World-class cinematic interfaces, custom typography, luxury minimalism'
  },
  {
    aspect: 'Core Expertise',
    traditional: 'Siloed departments with fragmented messaging',
    highVail: 'Cohesive blend of brand strategy, premium content, and dynamic engineering'
  },
  {
    aspect: 'Accountability',
    traditional: 'Vanity metrics like likes, impressions, and ad-spend bills',
    highVail: 'Tangible milestones (Tripled profits, direct-to-consumer sell-outs)'
  }
];
