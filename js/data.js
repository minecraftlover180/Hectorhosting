// ============================================
// HECTOR HOSTING — Data Layer
// Plans stored in localStorage so admin changes persist
// ============================================

const DEFAULT_LOCATIONS = [
  { id: 'in-mum', flag: '🇮🇳', name: 'Mumbai', country: 'India' },
  { id: 'in-del', flag: '🇮🇳', name: 'Delhi', country: 'India' },
  { id: 'sg',     flag: '🇸🇬', name: 'Singapore', country: 'Singapore' },
  { id: 'us-ny',  flag: '🇺🇸', name: 'New York', country: 'USA' },
  { id: 'de',     flag: '🇩🇪', name: 'Frankfurt', country: 'Germany' },
  { id: 'uk',     flag: '🇬🇧', name: 'London', country: 'UK' },
];

const DEFAULT_CATEGORIES = ['Budget', 'Performance', 'Premium'];

const DEFAULT_PLANS = [
  {
    id: 'starter', name: 'VLTN - STARTER', category: 'Budget',
    price: 299, currency: '₹',
    ram: '6 GB RAM', cpu: '1 vCore', storage: '40 GB NVMe',
    network: '1 Gbps Port', ip: '1 Dedicated IPv4',
    location: 'in-mum', popular: false,
    deployUrl: '#'
  },
  {
    id: 'basic', name: 'VLTN - BASIC', category: 'Budget',
    price: 459, currency: '₹',
    ram: '8 GB RAM', cpu: '2 vCores', storage: '50 GB NVMe',
    network: '1 Gbps Port', ip: '1 Dedicated IPv4',
    location: 'in-mum', popular: false,
    deployUrl: '#'
  },
  {
    id: 'standard', name: 'VLTN - STANDARD', category: 'Budget',
    price: 579, currency: '₹',
    ram: '12 GB RAM', cpu: '4 vCores', storage: '100 GB NVMe',
    network: '1 Gbps Port', ip: '1 Dedicated IPv4',
    location: 'in-del', popular: false,
    deployUrl: '#'
  },
  {
    id: 'plus', name: 'VLTN - PLUS', category: 'Performance',
    price: 829, currency: '₹',
    ram: '16 GB RAM', cpu: '4 vCores', storage: '150 GB NVMe',
    network: '1 Gbps Port', ip: '1 Dedicated IPv4',
    location: 'sg', popular: true,
    deployUrl: '#'
  },
  {
    id: 'pro', name: 'VLTN - PRO', category: 'Performance',
    price: 1199, currency: '₹',
    ram: '24 GB RAM', cpu: '6 vCores', storage: '200 GB NVMe',
    network: '1 Gbps Port', ip: '1 Dedicated IPv4',
    location: 'sg', popular: false,
    deployUrl: '#'
  },
  {
    id: 'elite', name: 'VLTN - ELITE', category: 'Premium',
    price: 1799, currency: '₹',
    ram: '36 GB RAM', cpu: '6 vCores', storage: '250 GB NVMe',
    network: '1 Gbps Port', ip: '1 Dedicated IPv4',
    location: 'us-ny', popular: false,
    deployUrl: '#'
  },
  {
    id: 'ultimate', name: 'VLTN - ULTIMATE', category: 'Premium',
    price: 2399, currency: '₹',
    ram: '48 GB RAM', cpu: '8 vCores', storage: '300 GB NVMe',
    network: '1 Gbps Port', ip: '1 Dedicated IPv4',
    location: 'us-ny', popular: false,
    deployUrl: '#'
  },
  {
    id: 'titan', name: 'VLTN - TITAN', category: 'Premium',
    price: 3799, currency: '₹',
    ram: '64 GB RAM', cpu: '8 vCores', storage: '350 GB NVMe',
    network: '1 Gbps Port', ip: '1 Dedicated IPv4',
    location: 'de', popular: false,
    deployUrl: '#'
  },
];

// ── Storage helpers ──────────────────────────
function getPlans() {
  try {
    const stored = localStorage.getItem('hh_plans');
    return stored ? JSON.parse(stored) : DEFAULT_PLANS;
  } catch { return DEFAULT_PLANS; }
}
function savePlans(plans) {
  localStorage.setItem('hh_plans', JSON.stringify(plans));
}
function getCategories() {
  try {
    const stored = localStorage.getItem('hh_categories');
    return stored ? JSON.parse(stored) : DEFAULT_CATEGORIES;
  } catch { return DEFAULT_CATEGORIES; }
}
function saveCategories(cats) {
  localStorage.setItem('hh_categories', JSON.stringify(cats));
}
function getLocations() {
  try {
    const stored = localStorage.getItem('hh_locations');
    return stored ? JSON.parse(stored) : DEFAULT_LOCATIONS;
  } catch { return DEFAULT_LOCATIONS; }
}
function saveLocations(locs) {
  localStorage.setItem('hh_locations', JSON.stringify(locs));
}

// Seed defaults if nothing stored
if (!localStorage.getItem('hh_plans')) savePlans(DEFAULT_PLANS);
if (!localStorage.getItem('hh_categories')) saveCategories(DEFAULT_CATEGORIES);
if (!localStorage.getItem('hh_locations')) saveLocations(DEFAULT_LOCATIONS);
