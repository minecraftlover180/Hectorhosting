// ============================================
// HECTOR HOSTING — Admin JS
// ============================================

const DEFAULT_PASSWORD = 'hector2026';

function getPassword() {
  return localStorage.getItem('hh_admin_pw') || DEFAULT_PASSWORD;
}

// ── Auth ─────────────────────────────────────
function doLogin() {
  const input = document.getElementById('pwInput').value;
  const err   = document.getElementById('loginError');
  if (input === getPassword()) {
    sessionStorage.setItem('hh_auth', '1');
    document.getElementById('loginGate').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'flex';
    initAdmin();
  } else {
    err.textContent = 'Incorrect password. Try again.';
    document.getElementById('pwInput').value = '';
  }
}

function logout() {
  sessionStorage.removeItem('hh_auth');
  location.reload();
}

// Auto-check session
if (sessionStorage.getItem('hh_auth') === '1') {
  document.getElementById('loginGate').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'flex';
  window.addEventListener('DOMContentLoaded', initAdmin);
}

// ── Tabs ─────────────────────────────────────
function switchTab(name, el) {
  document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.snav').forEach(a => a.classList.remove('active'));
  document.getElementById('tab-' + name).style.display = 'block';
  if (el) el.classList.add('active');
  return false;
}

// ── Init ─────────────────────────────────────
function initAdmin() {
  renderPlansTable();
  renderCatList();
  renderLocList();
}

// ── Plans Table ──────────────────────────────
function renderPlansTable() {
  const plans = getPlans();
  const locs  = getLocations();
  const body  = document.getElementById('plansTableBody');
  if (!body) return;

  function locLabel(id) {
    const l = locs.find(x => x.id === id);
    return l ? `${l.flag} ${l.name}` : id;
  }
  function badgeClass(cat) {
    const c = (cat||'').toLowerCase();
    return c === 'budget' ? 'badge-budget' : c === 'performance' ? 'badge-performance' : 'badge-premium';
  }

  body.innerHTML = plans.length === 0
    ? '<tr><td colspan="9" style="text-align:center;color:var(--dim);padding:32px">No plans yet.</td></tr>'
    : plans.map((p, i) => `
      <tr>
        <td>${p.name}</td>
        <td><span class="tbl-badge ${badgeClass(p.category)}">${p.category}</span></td>
        <td>${p.currency || '₹'}${Number(p.price).toLocaleString()}</td>
        <td>${p.ram}</td>
        <td>${p.cpu}</td>
        <td>${p.storage}</td>
        <td>${locLabel(p.location)}</td>
        <td>${p.popular ? '⭐ Yes' : '—'}</td>
        <td><div class="tbl-actions">
          <button class="tbl-edit" onclick="editPlan(${i})">Edit</button>
          <button class="tbl-del"  onclick="deletePlan(${i})">Delete</button>
        </div></td>
      </tr>`).join('');
}

// ── Plan Modal ───────────────────────────────
let editingPlanIndex = -1;

function openPlanModal(plan, idx) {
  editingPlanIndex = idx !== undefined ? idx : -1;
  document.getElementById('planModalTitle').textContent = editingPlanIndex >= 0 ? 'Edit Plan' : 'Add Plan';

  // Fill category dropdown
  const cats = getCategories();
  document.getElementById('planCategory').innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');

  // Fill location dropdown
  const locs = getLocations();
  document.getElementById('planLocation').innerHTML = locs.map(l => `<option value="${l.id}">${l.flag} ${l.name}</option>`).join('');

  if (plan) {
    document.getElementById('planId').value         = plan.id || '';
    document.getElementById('planName').value       = plan.name || '';
    document.getElementById('planCategory').value   = plan.category || '';
    document.getElementById('planPrice').value      = plan.price || '';
    document.getElementById('planCurrency').value   = plan.currency || '₹';
    document.getElementById('planRam').value        = plan.ram || '';
    document.getElementById('planCpu').value        = plan.cpu || '';
    document.getElementById('planStorage').value    = plan.storage || '';
    document.getElementById('planNetwork').value    = plan.network || '1 Gbps Port';
    document.getElementById('planIp').value         = plan.ip || '1 Dedicated IPv4';
    document.getElementById('planLocation').value   = plan.location || '';
    document.getElementById('planDeployUrl').value  = plan.deployUrl || '';
    document.getElementById('planPopular').checked  = !!plan.popular;
  } else {
    document.getElementById('planId').value         = '';
    document.getElementById('planName').value       = '';
    document.getElementById('planPrice').value      = '';
    document.getElementById('planCurrency').value   = '₹';
    document.getElementById('planRam').value        = '';
    document.getElementById('planCpu').value        = '';
    document.getElementById('planStorage').value    = '';
    document.getElementById('planNetwork').value    = '1 Gbps Port';
    document.getElementById('planIp').value         = '1 Dedicated IPv4';
    document.getElementById('planDeployUrl').value  = '';
    document.getElementById('planPopular').checked  = false;
  }

  document.getElementById('planModalError').textContent = '';
  document.getElementById('planModal').style.display = 'flex';
}

function editPlan(idx) {
  const plans = getPlans();
  openPlanModal(plans[idx], idx);
}

function closePlanModal() {
  document.getElementById('planModal').style.display = 'none';
}

function savePlan() {
  const name     = document.getElementById('planName').value.trim();
  const category = document.getElementById('planCategory').value;
  const price    = document.getElementById('planPrice').value.trim();
  const ram      = document.getElementById('planRam').value.trim();
  const cpu      = document.getElementById('planCpu').value.trim();
  const storage  = document.getElementById('planStorage').value.trim();
  const errEl    = document.getElementById('planModalError');

  if (!name || !price || !ram || !cpu || !storage) {
    errEl.textContent = 'Please fill in all required fields.';
    return;
  }

  const plan = {
    id:        document.getElementById('planId').value || 'plan-' + Date.now(),
    name, category, price: Number(price),
    currency:  document.getElementById('planCurrency').value || '₹',
    ram, cpu, storage,
    network:   document.getElementById('planNetwork').value || '1 Gbps Port',
    ip:        document.getElementById('planIp').value || '1 Dedicated IPv4',
    location:  document.getElementById('planLocation').value,
    deployUrl: document.getElementById('planDeployUrl').value.trim() || '#',
    popular:   document.getElementById('planPopular').checked,
  };

  const plans = getPlans();
  if (editingPlanIndex >= 0) {
    plans[editingPlanIndex] = plan;
  } else {
    plans.push(plan);
  }
  savePlans(plans);
  closePlanModal();
  renderPlansTable();
}

function deletePlan(idx) {
  if (!confirm('Delete this plan? This cannot be undone.')) return;
  const plans = getPlans();
  plans.splice(idx, 1);
  savePlans(plans);
  renderPlansTable();
}

// ── Categories ───────────────────────────────
function renderCatList() {
  const cats = getCategories();
  const list = document.getElementById('catList');
  if (!list) return;
  list.innerHTML = cats.length === 0
    ? '<div style="color:var(--dim);padding:16px">No categories yet.</div>'
    : cats.map((c, i) => `
      <div class="admin-list-item">
        <span class="list-item-label">${c}</span>
        <button class="tbl-del" onclick="deleteCat(${i})">Delete</button>
      </div>`).join('');
}

function openCatModal() {
  document.getElementById('catName').value = '';
  document.getElementById('catModalError').textContent = '';
  document.getElementById('catModal').style.display = 'flex';
}
function closeCatModal() { document.getElementById('catModal').style.display = 'none'; }

function saveCat() {
  const name = document.getElementById('catName').value.trim();
  const err  = document.getElementById('catModalError');
  if (!name) { err.textContent = 'Please enter a category name.'; return; }
  const cats = getCategories();
  if (cats.includes(name)) { err.textContent = 'Category already exists.'; return; }
  cats.push(name);
  saveCategories(cats);
  closeCatModal();
  renderCatList();
}

function deleteCat(idx) {
  if (!confirm('Delete this category?')) return;
  const cats = getCategories();
  cats.splice(idx, 1);
  saveCategories(cats);
  renderCatList();
}

// ── Locations ────────────────────────────────
function renderLocList() {
  const locs = getLocations();
  const list = document.getElementById('locList');
  if (!list) return;
  list.innerHTML = locs.length === 0
    ? '<div style="color:var(--dim);padding:16px">No locations yet.</div>'
    : locs.map((l, i) => `
      <div class="admin-list-item">
        <span class="list-item-label">${l.flag} ${l.name}, ${l.country}</span>
        <button class="tbl-del" onclick="deleteLoc(${i})">Delete</button>
      </div>`).join('');
}

function openLocModal() {
  ['locId','locFlag','locName','locCountry'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('locModalError').textContent = '';
  document.getElementById('locModal').style.display = 'flex';
}
function closeLocModal() { document.getElementById('locModal').style.display = 'none'; }

function saveLoc() {
  const id      = document.getElementById('locId').value.trim().toLowerCase().replace(/\s+/g, '-');
  const flag    = document.getElementById('locFlag').value.trim();
  const name    = document.getElementById('locName').value.trim();
  const country = document.getElementById('locCountry').value.trim();
  const err     = document.getElementById('locModalError');

  if (!id || !flag || !name || !country) { err.textContent = 'All fields are required.'; return; }
  const locs = getLocations();
  if (locs.find(l => l.id === id)) { err.textContent = 'Location ID already exists.'; return; }
  locs.push({ id, flag, name, country });
  saveLocations(locs);
  closeLocModal();
  renderLocList();
}

function deleteLoc(idx) {
  if (!confirm('Delete this location?')) return;
  const locs = getLocations();
  locs.splice(idx, 1);
  saveLocations(locs);
  renderLocList();
}

// ── Password ─────────────────────────────────
function changePassword() {
  const cur     = document.getElementById('curPw').value;
  const newPw   = document.getElementById('newPw').value;
  const confirm = document.getElementById('confirmPw').value;
  const msg     = document.getElementById('pwChangeMsg');

  if (cur !== getPassword()) { msg.className = 'form-msg error'; msg.textContent = 'Current password is incorrect.'; return; }
  if (!newPw || newPw.length < 6) { msg.className = 'form-msg error'; msg.textContent = 'New password must be at least 6 characters.'; return; }
  if (newPw !== confirm) { msg.className = 'form-msg error'; msg.textContent = 'Passwords do not match.'; return; }

  localStorage.setItem('hh_admin_pw', newPw);
  msg.className = 'form-msg success';
  msg.textContent = 'Password updated successfully!';
  document.getElementById('curPw').value = '';
  document.getElementById('newPw').value = '';
  document.getElementById('confirmPw').value = '';
}

// ── Close modals on backdrop click ───────────
['planModal','catModal','locModal'].forEach(id => {
  document.getElementById(id).addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
  });
});
