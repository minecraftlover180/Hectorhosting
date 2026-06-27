// ============================================
// HECTOR HOSTING — Main JS
// ============================================

// ── Splash ──────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
  }, 2600);
});

// ── Nav mobile toggle ─────────────────────
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navMobile').classList.toggle('open');
});

// ── Locations ───────────────────────────────
function renderLocations() {
  const locs = getLocations();
  const grid = document.getElementById('locationsGrid');
  if (!grid) return;
  grid.innerHTML = locs.map(l => `
    <div class="location-card">
      <span class="loc-flag">${l.flag}</span>
      <div class="loc-info">
        <span class="loc-name">${l.name}</span>
        <span class="loc-country">${l.country}</span>
      </div>
      <div class="loc-dot"></div>
    </div>
  `).join('');
}

// ── Plans ────────────────────────────────────
let activeCategory = 'All';

function renderCategoryTabs() {
  const cats = ['All', ...getCategories()];
  const tabs = document.getElementById('categoryTabs');
  if (!tabs) return;
  tabs.innerHTML = cats.map(c => `
    <button class="cat-tab${c === activeCategory ? ' active' : ''}"
            onclick="switchCategory('${c}')">${c.toUpperCase()}</button>
  `).join('');
}

function switchCategory(cat) {
  activeCategory = cat;
  renderCategoryTabs();
  renderPlans();
}

function getTierClass(category) {
  const c = (category || '').toLowerCase();
  if (c === 'budget') return 'tier-budget';
  if (c === 'performance') return 'tier-performance';
  if (c === 'premium') return 'tier-premium';
  return 'tier-budget';
}

function getLocationLabel(locId) {
  const locs = getLocations();
  const loc = locs.find(l => l.id === locId);
  return loc ? `${loc.flag} ${loc.name}` : locId;
}

const SPEC_ICONS = {
  ram:     '🧠',
  cpu:     '⚙️',
  storage: '💾',
  network: '🌐',
  ip:      '🔗',
};

function renderPlans() {
  const plans = getPlans();
  const grid = document.getElementById('plansGrid');
  const noPlans = document.getElementById('noPlans');
  if (!grid) return;

  const filtered = activeCategory === 'All'
    ? plans
    : plans.filter(p => p.category === activeCategory);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noPlans.style.display = 'block';
    return;
  }
  noPlans.style.display = 'none';

  grid.innerHTML = filtered.map(p => `
    <div class="plan-card ${getTierClass(p.category)}${p.popular ? ' popular' : ''}">
      <div class="plan-badge-row">
        <span class="plan-tier-badge">${p.category}</span>
        ${p.popular ? '<span class="popular-tag">MOST POPULAR</span>' : ''}
      </div>
      <div class="plan-name">${p.name}</div>
      <div class="plan-price-row">
        <span class="plan-currency">${p.currency || '₹'}</span>
        <span class="plan-price">${Number(p.price).toLocaleString()}</span>
        <span class="plan-period">/month</span>
      </div>
      <div class="plan-specs">
        <div class="spec-row">
          <span class="spec-label">${SPEC_ICONS.ram} Memory</span>
          <span class="spec-val">${p.ram}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">${SPEC_ICONS.cpu} Processor</span>
          <span class="spec-val">${p.cpu}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">${SPEC_ICONS.storage} Storage</span>
          <span class="spec-val">${p.storage}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">${SPEC_ICONS.network} Network</span>
          <span class="spec-val">${p.network}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">${SPEC_ICONS.ip} Address</span>
          <span class="spec-val">${p.ip}</span>
        </div>
      </div>
      <div class="plan-tags">
        <span class="plan-tag">🛡️ DDoS Protection</span>
        <span class="plan-tag">⚡ Instant Setup</span>
      </div>
      <div class="plan-location">📍 <span>${getLocationLabel(p.location)}</span></div>
      <button class="plan-deploy-btn" onclick="openDeployModal('${p.name}', '${p.currency || '₹'}${Number(p.price).toLocaleString()}')">DEPLOY NOW 🚀</button>
    </div>
  `).join('');
}

// ── Deploy Modal ─────────────────────────────
const DISCORD_INVITE = 'YOUR_DISCORD_INVITE_HERE'; // ← paste your Discord invite link here

function openDeployModal(planName, planPrice) {
  const infoEl = document.getElementById('deployPlanInfo');
  if (planName) {
    infoEl.textContent = `📋 Selected: ${planName} — ${planPrice}/month`;
    infoEl.style.display = 'block';
  } else {
    infoEl.style.display = 'none';
  }
  document.getElementById('discordBtn').href = DISCORD_INVITE;
  document.getElementById('deployModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeDeployModal() {
  document.getElementById('deployModal').style.display = 'none';
  document.body.style.overflow = '';
}

// ── Init ─────────────────────────────────────
renderLocations();
renderCategoryTabs();
renderPlans();

