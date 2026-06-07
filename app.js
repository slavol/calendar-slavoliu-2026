import { supabaseConfig, ADMIN_EMAILS, TABLE_NAME } from './supabase-config.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const seedEvents = [
  {
    title: 'Închidere proiect PW',
    startDate: '2026-06-08',
    endDate: '2026-06-08',
    category: 'proiect',
    priority: 'mare',
    description: 'Finalizează și verifică proiectul de PW înainte de examen.'
  },
  {
    title: 'Examen PW',
    startDate: '2026-06-09',
    endDate: '2026-06-09',
    category: 'examen',
    priority: 'mare',
    description: 'Zi de examen. Repetă rapid înainte, fără să te obosești inutil.'
  },
  {
    title: 'Examen ICS',
    startDate: '2026-06-11',
    endDate: '2026-06-11',
    category: 'examen',
    priority: 'mare',
    description: 'Examen ICS.'
  },
  {
    title: 'Proiect .NET',
    startDate: '2026-06-11',
    endDate: '2026-06-14',
    category: 'proiect',
    priority: 'mare',
    description: 'Perioadă dedicată proiectului .NET.'
  },
  {
    title: 'Proiect GIU',
    startDate: '2026-06-14',
    endDate: '2026-06-17',
    category: 'proiect',
    priority: 'mare',
    description: 'Perioadă dedicată proiectului GIU.'
  },
  {
    title: 'Examen GIU',
    startDate: '2026-06-18',
    endDate: '2026-06-18',
    category: 'examen',
    priority: 'mare',
    description: 'Zi de examen GIU.'
  },
  {
    title: 'Învățat pentru .NET / licență / timp liber',
    startDate: '2026-06-19',
    endDate: '2026-06-21',
    category: 'invatat',
    priority: 'medie',
    description: 'Dacă este cazul, înveți pentru .NET. Dacă nu, lucrezi la licență sau iei timp liber.'
  },
  {
    title: 'Examen .NET',
    startDate: '2026-06-22',
    endDate: '2026-06-22',
    category: 'examen',
    priority: 'mare',
    description: 'Zi de examen .NET.'
  },
  {
    title: 'Licență',
    startDate: '2026-06-23',
    endDate: '2026-06-25',
    category: 'licenta',
    priority: 'mare',
    description: 'Perioadă blocată pentru licență.'
  },
  {
    title: 'Examen CELL',
    startDate: '2026-06-26',
    endDate: '2026-06-26',
    category: 'examen',
    priority: 'mare',
    description: 'Zi de examen CELL.'
  },
  {
    title: 'Învățat pentru Sisteme de Operare',
    startDate: '2026-06-27',
    endDate: '2026-07-20',
    category: 'invatat',
    priority: 'mare',
    description: 'Bloc mare de pregătire pentru Sisteme de Operare.'
  },
  {
    title: 'Predare licență pentru sesiunea de toamnă',
    startDate: '2026-07-22',
    endDate: '2026-07-22',
    category: 'predare',
    priority: 'mare',
    description: 'Deadline de predare pentru sesiunea de toamnă.'
  },
  {
    title: 'Pregătire pentru examenul de licență',
    startDate: '2026-07-23',
    endDate: '2026-09-08',
    category: 'licenta',
    priority: 'mare',
    description: 'Pregătire susținută pentru examenul de licență.'
  }
];

const categoryLabels = {
  examen: 'Examen',
  proiect: 'Proiect',
  licenta: 'Licență',
  invatat: 'Învățat',
  predare: 'Predare',
  liber: 'Timp liber'
};

const categoryColors = {
  examen: '#ef4444',
  proiect: '#7c3aed',
  licenta: '#0f766e',
  invatat: '#2563eb',
  predare: '#d97706',
  liber: '#64748b'
};

const monthNames = [
  'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
  'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
];

const weekdayNames = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'];

const elements = {
  syncStatus: document.getElementById('syncStatus'),
  themeToggle: document.getElementById('themeToggle'),
  authButton: document.getElementById('authButton'),
  setupNotice: document.getElementById('setupNotice'),
  downloadSeed: document.getElementById('downloadSeed'),
  searchInput: document.getElementById('searchInput'),
  monthFilter: document.getElementById('monthFilter'),
  viewTimeline: document.getElementById('viewTimeline'),
  viewCalendar: document.getElementById('viewCalendar'),
  addEventBtn: document.getElementById('addEventBtn'),
  filterChips: [...document.querySelectorAll('.chip')],
  timelineView: document.getElementById('timelineView'),
  calendarView: document.getElementById('calendarView'),
  emptyState: document.getElementById('emptyState'),
  resultCount: document.getElementById('resultCount'),
  viewTitle: document.getElementById('viewTitle'),
  totalEvents: document.getElementById('totalEvents'),
  activeNow: document.getElementById('activeNow'),
  nextEventDays: document.getElementById('nextEventDays'),
  nextEventCard: document.getElementById('nextEventCard'),
  adminHint: document.getElementById('adminHint'),
  seedButton: document.getElementById('seedButton'),
  importButton: document.getElementById('importButton'),
  exportButton: document.getElementById('exportButton'),
  printButton: document.getElementById('printButton'),
  importFile: document.getElementById('importFile'),
  eventDialog: document.getElementById('eventDialog'),
  eventForm: document.getElementById('eventForm'),
  eventDialogTitle: document.getElementById('eventDialogTitle'),
  eventId: document.getElementById('eventId'),
  eventTitle: document.getElementById('eventTitle'),
  eventStart: document.getElementById('eventStart'),
  eventEnd: document.getElementById('eventEnd'),
  eventCategory: document.getElementById('eventCategory'),
  eventPriority: document.getElementById('eventPriority'),
  eventDescription: document.getElementById('eventDescription'),
  deleteEventBtn: document.getElementById('deleteEventBtn'),
  authDialog: document.getElementById('authDialog'),
  authForm: document.getElementById('authForm'),
  authEmail: document.getElementById('authEmail'),
  authPassword: document.getElementById('authPassword'),
  registerBtn: document.getElementById('registerBtn'),
  toast: document.getElementById('toast')
};

const state = {
  events: [],
  filteredEvents: [],
  categoryFilter: 'all',
  view: 'timeline',
  supabaseReady: false,
  user: null,
  isAdmin: false,
  supabase: null,
  channel: null
};

function hasSupabaseConfig() {
  return supabaseConfig &&
    supabaseConfig.url &&
    !supabaseConfig.url.includes('PASTE') &&
    supabaseConfig.anonKey &&
    !supabaseConfig.anonKey.includes('PASTE');
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove('show'), 3200);
}

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function toIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDate(dateString) {
  const date = parseLocalDate(dateString);
  return new Intl.DateTimeFormat('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function formatRange(event) {
  if (event.startDate === event.endDate) return formatDate(event.startDate);
  return `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`;
}

function getDurationDays(event) {
  const start = parseLocalDate(event.startDate);
  const end = parseLocalDate(event.endDate);
  return Math.round((end - start) / 86400000) + 1;
}

function todayAtMidnight() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function daysUntil(dateString) {
  const today = todayAtMidnight();
  const date = parseLocalDate(dateString);
  return Math.ceil((date - today) / 86400000);
}

function normalizeEvent(event) {
  return {
    id: event.id || crypto.randomUUID(),
    title: String(event.title || '').trim(),
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    category: event.category || 'invatat',
    priority: event.priority || 'medie',
    description: event.description || ''
  };
}

function sortEvents(events) {
  return [...events].sort((a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title));
}

function canEdit() {
  if (!state.supabaseReady) return true;
  return state.isAdmin;
}

function updateAdminUi() {
  const editable = canEdit();
  elements.addEventBtn.disabled = !editable;
  elements.seedButton.disabled = !editable;
  elements.importButton.disabled = !editable;

  if (!state.supabaseReady) {
    elements.adminHint.textContent = 'Mod local: poți edita aici, dar salvarea rămâne în browser. Conectează Supabase pentru cloud.';
    return;
  }

  if (!state.user) {
    elements.adminHint.textContent = 'Loghează-te cu emailul de admin ca să poți edita evenimentele.';
    return;
  }

  if (state.isAdmin) {
    elements.adminHint.textContent = `Conectat ca admin: ${state.user.email}.`;
  } else {
    elements.adminHint.textContent = `Conectat ca ${state.user.email}, dar emailul nu este în ADMIN_EMAILS.`;
  }
}

function setSyncStatus(type, text) {
  elements.syncStatus.className = `status-pill ${type}`;
  elements.syncStatus.textContent = text;
}

function saveLocalEvents() {
  localStorage.setItem('calendar_2026_events', JSON.stringify(state.events));
}

function loadLocalEvents() {
  const stored = localStorage.getItem('calendar_2026_events');
  if (!stored) {
    state.events = seedEvents.map(normalizeEvent);
    saveLocalEvents();
    return;
  }
  try {
    state.events = JSON.parse(stored).map(normalizeEvent);
  } catch {
    state.events = seedEvents.map(normalizeEvent);
    saveLocalEvents();
  }
}

async function initSupabase() {
  if (!hasSupabaseConfig()) {
    elements.setupNotice.classList.remove('hidden');
    setSyncStatus('local', 'Mod local');
    loadLocalEvents();
    render();
    updateAdminUi();
    return;
  }

  try {
    state.supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
    state.supabaseReady = true;
    setSyncStatus('cloud', 'Cloud conectat');
    elements.setupNotice.classList.add('hidden');

    const { data: { session } } = await state.supabase.auth.getSession();
    state.user = session?.user || null;
    state.isAdmin = Boolean(state.user && ADMIN_EMAILS.map(e => e.toLowerCase()).includes(state.user.email.toLowerCase()));
    elements.authButton.textContent = state.user ? 'Logout' : 'Login admin';
    updateAdminUi();

    state.supabase.auth.onAuthStateChange((_event, session) => {
      state.user = session?.user || null;
      state.isAdmin = Boolean(state.user && ADMIN_EMAILS.map(e => e.toLowerCase()).includes(state.user.email.toLowerCase()));
      elements.authButton.textContent = state.user ? 'Logout' : 'Login admin';
      updateAdminUi();
      render();
    });

    await fetchCloudEvents();

    state.channel = state.supabase
      .channel('calendar-events-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE_NAME }, async () => {
        await fetchCloudEvents();
        setSyncStatus('cloud', 'Sincronizat live');
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') setSyncStatus('cloud', 'Sincronizat live');
      });
  } catch (error) {
    console.error(error);
    elements.setupNotice.classList.remove('hidden');
    setSyncStatus('error', 'Supabase invalid');
    loadLocalEvents();
    render();
    updateAdminUi();
    showToast('Supabase nu este configurat corect. Rulez local.');
  }
}

function mapDbEvent(row) {
  return normalizeEvent({
    id: row.id,
    title: row.title,
    startDate: row.start_date,
    endDate: row.end_date,
    category: row.category,
    priority: row.priority,
    description: row.description
  });
}

function toDbPayload(event) {
  return {
    title: event.title,
    start_date: event.startDate,
    end_date: event.endDate,
    category: event.category,
    priority: event.priority,
    description: event.description,
    updated_at: new Date().toISOString(),
    updated_by: state.user?.email || null
  };
}

async function fetchCloudEvents() {
  const { data, error } = await state.supabase
    .from(TABLE_NAME)
    .select('*')
    .order('start_date', { ascending: true });

  if (error) throw error;
  state.events = (data || []).map(mapDbEvent);
  render();
}

function applyFilters() {
  const text = elements.searchInput.value.trim().toLowerCase();
  const month = elements.monthFilter.value;
  state.filteredEvents = sortEvents(state.events).filter(event => {
    const inCategory = state.categoryFilter === 'all' || event.category === state.categoryFilter;
    const haystack = `${event.title} ${event.description} ${categoryLabels[event.category]}`.toLowerCase();
    const inSearch = !text || haystack.includes(text);
    const inMonth = month === 'all' || event.startDate.startsWith(month) || event.endDate.startsWith(month) || rangeTouchesMonth(event, month);
    return inCategory && inSearch && inMonth;
  });
}

function rangeTouchesMonth(event, monthValue) {
  const monthStart = parseLocalDate(`${monthValue}-01`);
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
  const start = parseLocalDate(event.startDate);
  const end = parseLocalDate(event.endDate);
  return start <= monthEnd && end >= monthStart;
}

function updateStats() {
  elements.totalEvents.textContent = state.events.length;
  const today = todayAtMidnight();
  const active = state.events.filter(event => parseLocalDate(event.startDate) <= today && parseLocalDate(event.endDate) >= today);
  elements.activeNow.textContent = active.length;

  const upcoming = sortEvents(state.events).find(event => parseLocalDate(event.endDate) >= today);
  if (!upcoming) {
    elements.nextEventDays.textContent = '—';
    elements.nextEventCard.className = 'next-card empty';
    elements.nextEventCard.textContent = 'Nu există evenimente viitoare.';
    return;
  }

  const days = Math.max(0, daysUntil(upcoming.startDate));
  elements.nextEventDays.textContent = String(days);
  elements.nextEventCard.className = 'next-card';
  elements.nextEventCard.innerHTML = `
    <strong>${escapeHtml(upcoming.title)}</strong>
    <p>${formatRange(upcoming)}</p>
    <div class="badges">
      <span class="badge category" style="--event-color:${categoryColors[upcoming.category]}">${categoryLabels[upcoming.category]}</span>
      <span class="badge">${getDurationDays(upcoming)} zile</span>
    </div>
  `;
}

function render() {
  applyFilters();
  updateStats();
  elements.resultCount.textContent = `${state.filteredEvents.length} rezultate`;
  elements.viewTitle.textContent = state.view === 'timeline' ? 'Timeline complet' : 'Calendar pe luni';
  elements.timelineView.classList.toggle('hidden', state.view !== 'timeline');
  elements.calendarView.classList.toggle('hidden', state.view !== 'calendar');

  if (state.filteredEvents.length === 0) {
    elements.emptyState.classList.remove('hidden');
    elements.timelineView.innerHTML = '';
    elements.calendarView.innerHTML = '';
    return;
  }
  elements.emptyState.classList.add('hidden');

  if (state.view === 'timeline') renderTimeline();
  if (state.view === 'calendar') renderCalendar();
}

function renderTimeline() {
  const groups = new Map();
  state.filteredEvents.forEach(event => {
    const date = parseLocalDate(event.startDate);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  });

  elements.timelineView.innerHTML = [...groups.entries()].map(([key, events]) => {
    const [year, month] = key.split('-').map(Number);
    return `
      <div class="month-group">
        <h4 class="month-title">${monthNames[month - 1]} ${year}</h4>
        ${events.map(renderEventCard).join('')}
      </div>
    `;
  }).join('');

  elements.timelineView.querySelectorAll('[data-edit]').forEach(button => {
    button.addEventListener('click', () => openEventDialog(button.dataset.edit));
  });
}

function renderEventCard(event) {
  const color = categoryColors[event.category] || categoryColors.invatat;
  const duration = getDurationDays(event);
  const editable = canEdit();
  return `
    <article class="event-card" style="--event-color:${color}">
      <div class="event-date">
        <strong>${formatRange(event)}</strong>
        <span>${duration === 1 ? '1 zi' : `${duration} zile`}</span>
      </div>
      <div class="event-body">
        <h4>${escapeHtml(event.title)}</h4>
        <div class="event-meta">${categoryLabels[event.category]} • Prioritate ${event.priority}</div>
        ${event.description ? `<p class="event-desc">${escapeHtml(event.description)}</p>` : ''}
        <div class="badges">
          <span class="badge category">${categoryLabels[event.category]}</span>
          <span class="badge">${duration === 1 ? 'single day' : 'interval'}</span>
        </div>
      </div>
      <div class="event-actions">
        <button type="button" data-edit="${event.id}" ${editable ? '' : 'disabled'}>Editează</button>
      </div>
    </article>
  `;
}

function renderCalendar() {
  const months = elements.monthFilter.value === 'all'
    ? ['2026-06', '2026-07', '2026-08', '2026-09']
    : [elements.monthFilter.value];

  elements.calendarView.innerHTML = months.map(renderMonthCalendar).join('');
}

function renderMonthCalendar(monthValue) {
  const [year, month] = monthValue.split('-').map(Number);
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0);
  const startOffset = (first.getDay() + 6) % 7;
  const totalCells = Math.ceil((startOffset + last.getDate()) / 7) * 7;
  const cells = [];

  for (let i = 0; i < totalCells; i++) {
    const date = new Date(year, month - 1, 1 - startOffset + i);
    const iso = toIsoDate(date);
    const dim = date.getMonth() !== month - 1;
    const dayEvents = state.filteredEvents.filter(event => parseLocalDate(event.startDate) <= date && parseLocalDate(event.endDate) >= date);
    cells.push(`
      <div class="day-cell ${dim ? 'dim' : ''}">
        <div class="day-number">${date.getDate()}</div>
        <div class="day-events">
          ${dayEvents.slice(0, 3).map(event => `<span class="day-event" style="--event-color:${categoryColors[event.category]}" title="${escapeAttr(event.title)}">${escapeHtml(event.title)}</span>`).join('')}
          ${dayEvents.length > 3 ? `<span class="badge">+${dayEvents.length - 3}</span>` : ''}
        </div>
      </div>
    `);
  }

  return `
    <section class="month-calendar">
      <h4>${monthNames[month - 1]} ${year}</h4>
      <div class="weekdays">${weekdayNames.map(day => `<span>${day}</span>`).join('')}</div>
      <div class="days-grid">${cells.join('')}</div>
    </section>
  `;
}

function openEventDialog(id = null) {
  if (!canEdit()) {
    showToast('Trebuie să fii admin ca să editezi în cloud.');
    return;
  }

  const event = id ? state.events.find(item => item.id === id) : null;
  elements.eventDialogTitle.textContent = event ? 'Editează eveniment' : 'Adaugă eveniment';
  elements.eventId.value = event?.id || '';
  elements.eventTitle.value = event?.title || '';
  elements.eventStart.value = event?.startDate || '2026-06-08';
  elements.eventEnd.value = event?.endDate || elements.eventStart.value;
  elements.eventCategory.value = event?.category || 'examen';
  elements.eventPriority.value = event?.priority || 'medie';
  elements.eventDescription.value = event?.description || '';
  elements.deleteEventBtn.classList.toggle('hidden', !event);
  elements.eventDialog.showModal();
}

function closeEventDialog() {
  elements.eventDialog.close();
}

async function saveEventFromForm() {
  if (!canEdit()) return;
  const event = normalizeEvent({
    id: elements.eventId.value || undefined,
    title: elements.eventTitle.value,
    startDate: elements.eventStart.value,
    endDate: elements.eventEnd.value,
    category: elements.eventCategory.value,
    priority: elements.eventPriority.value,
    description: elements.eventDescription.value
  });

  if (parseLocalDate(event.endDate) < parseLocalDate(event.startDate)) {
    showToast('Data de final nu poate fi înainte de start.');
    return;
  }

  if (state.supabaseReady) {
    const payload = toDbPayload(event);
    if (elements.eventId.value) {
      const { error } = await state.supabase.from(TABLE_NAME).update(payload).eq('id', event.id);
      if (error) throw error;
    } else {
      const { error } = await state.supabase.from(TABLE_NAME).insert(payload);
      if (error) throw error;
    }
  } else {
    const index = state.events.findIndex(item => item.id === event.id);
    if (index >= 0) state.events[index] = event;
    else state.events.push(event);
    saveLocalEvents();
    render();
  }

  closeEventDialog();
  showToast('Eveniment salvat.');
}

async function deleteCurrentEvent() {
  const id = elements.eventId.value;
  if (!id || !canEdit()) return;
  const ok = confirm('Sigur vrei să ștergi evenimentul?');
  if (!ok) return;

  if (state.supabaseReady) {
    const { error } = await state.supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;
  } else {
    state.events = state.events.filter(event => event.id !== id);
    saveLocalEvents();
    render();
  }

  closeEventDialog();
  showToast('Eveniment șters.');
}

async function seedInitialEvents() {
  if (!canEdit()) return;
  const ok = confirm('Asta adaugă evenimentele inițiale. Continuăm?');
  if (!ok) return;

  if (state.supabaseReady) {
    const rows = seedEvents.map(event => ({
      ...toDbPayload(normalizeEvent(event)),
      created_at: new Date().toISOString()
    }));
    const { error } = await state.supabase.from(TABLE_NAME).insert(rows);
    if (error) throw error;
  } else {
    state.events = seedEvents.map(normalizeEvent);
    saveLocalEvents();
    render();
  }
  showToast('Evenimente inițiale încărcate.');
}

function exportJson(events = state.events) {
  const payload = JSON.stringify(sortEvents(events), null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'calendar-2026-events.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function importJson(file) {
  if (!canEdit()) return;
  const text = await file.text();
  const parsed = JSON.parse(text).map(normalizeEvent);
  if (!Array.isArray(parsed)) throw new Error('Invalid JSON');

  if (state.supabaseReady) {
    const rows = parsed.map(event => ({
      ...toDbPayload(event),
      created_at: new Date().toISOString()
    }));
    const { error } = await state.supabase.from(TABLE_NAME).insert(rows);
    if (error) throw error;
  } else {
    state.events = parsed;
    saveLocalEvents();
    render();
  }
  showToast('Import finalizat.');
}

async function login(email, password) {
  if (!state.supabaseReady) {
    showToast('Loginul funcționează după configurarea Supabase.');
    return;
  }
  const { error } = await state.supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  elements.authDialog.close();
  showToast('Ai intrat.');
}

async function register(email, password) {
  if (!state.supabaseReady) {
    showToast('Crearea contului funcționează după configurarea Supabase.');
    return;
  }
  const { error } = await state.supabase.auth.signUp({ email, password });
  if (error) throw error;
  elements.authDialog.close();
  showToast('Cont creat. Dacă Supabase cere confirmare email, verifică inboxul.');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function bindEvents() {
  elements.themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
    elements.themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('calendar_2026_theme', isDark ? 'light' : 'dark');
  });

  elements.authButton.addEventListener('click', async () => {
    if (!state.supabaseReady) {
      showToast('Completează mai întâi supabase-config.js pentru login cloud.');
      return;
    }
    if (state.user) {
      await state.supabase.auth.signOut();
      showToast('Ai ieșit din cont.');
      return;
    }
    elements.authDialog.showModal();
  });

  elements.authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await login(elements.authEmail.value, elements.authPassword.value);
    } catch (error) {
      console.error(error);
      showToast('Login eșuat. Verifică email/parolă și Auth provider.');
    }
  });

  elements.registerBtn.addEventListener('click', async () => {
    try {
      await register(elements.authEmail.value, elements.authPassword.value);
    } catch (error) {
      console.error(error);
      showToast('Nu pot crea contul. Verifică setările Auth din Supabase.');
    }
  });

  document.querySelectorAll('[data-close-auth]').forEach(button => button.addEventListener('click', () => elements.authDialog.close()));
  document.querySelectorAll('[data-close-event]').forEach(button => button.addEventListener('click', closeEventDialog));

  elements.searchInput.addEventListener('input', render);
  elements.monthFilter.addEventListener('change', render);

  elements.filterChips.forEach(chip => chip.addEventListener('click', () => {
    elements.filterChips.forEach(item => item.classList.remove('active'));
    chip.classList.add('active');
    state.categoryFilter = chip.dataset.filter;
    render();
  }));

  elements.viewTimeline.addEventListener('click', () => {
    state.view = 'timeline';
    elements.viewTimeline.classList.add('active');
    elements.viewCalendar.classList.remove('active');
    render();
  });

  elements.viewCalendar.addEventListener('click', () => {
    state.view = 'calendar';
    elements.viewCalendar.classList.add('active');
    elements.viewTimeline.classList.remove('active');
    render();
  });

  elements.addEventBtn.addEventListener('click', () => openEventDialog());

  elements.eventForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await saveEventFromForm();
    } catch (error) {
      console.error(error);
      showToast('Nu am putut salva evenimentul.');
    }
  });

  elements.deleteEventBtn.addEventListener('click', async () => {
    try {
      await deleteCurrentEvent();
    } catch (error) {
      console.error(error);
      showToast('Nu am putut șterge evenimentul.');
    }
  });

  elements.seedButton.addEventListener('click', seedInitialEvents);
  elements.downloadSeed.addEventListener('click', () => exportJson(seedEvents.map(normalizeEvent)));
  elements.exportButton.addEventListener('click', () => exportJson());
  elements.importButton.addEventListener('click', () => elements.importFile.click());
  elements.importFile.addEventListener('change', async () => {
    const file = elements.importFile.files?.[0];
    if (!file) return;
    try {
      await importJson(file);
    } catch (error) {
      console.error(error);
      showToast('Import eșuat. JSON invalid?');
    } finally {
      elements.importFile.value = '';
    }
  });

  elements.printButton.addEventListener('click', () => window.print());
}

function initTheme() {
  const theme = localStorage.getItem('calendar_2026_theme');
  if (theme === 'dark') {
    document.documentElement.dataset.theme = 'dark';
    elements.themeToggle.textContent = '☀️';
  }
}

initTheme();
bindEvents();
initSupabase();
