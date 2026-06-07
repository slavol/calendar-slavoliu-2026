import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { supabaseConfig, ADMIN_EMAILS, TABLE_NAME } from "./supabase-config.js";

const DEFAULT_EVENTS = [
  {
    id: "2026-06-08-inchidere-pw",
    title: "Închidere proiect PW",
    type: "proiect",
    start_date: "2026-06-08",
    end_date: "2026-06-08",
    notes: "Finalizare și predare proiect PW.",
    priority: 4
  },
  {
    id: "2026-06-09-examen-pw",
    title: "Examen PW",
    type: "examen",
    start_date: "2026-06-09",
    end_date: "2026-06-09",
    notes: "",
    priority: 5
  },
  {
    id: "2026-06-11-examen-ics",
    title: "Examen ICS",
    type: "examen",
    start_date: "2026-06-11",
    end_date: "2026-06-11",
    notes: "",
    priority: 5
  },
  {
    id: "2026-06-11-14-proiect-dotnet",
    title: "Proiect .NET",
    type: "proiect",
    start_date: "2026-06-11",
    end_date: "2026-06-14",
    notes: "Lucru concentrat pe proiectul .NET.",
    priority: 4
  },
  {
    id: "2026-06-14-17-proiect-giu",
    title: "Proiect GIU",
    type: "proiect",
    start_date: "2026-06-14",
    end_date: "2026-06-17",
    notes: "Lucru concentrat pe proiectul GIU.",
    priority: 4
  },
  {
    id: "2026-06-18-examen-giu",
    title: "Examen GIU",
    type: "examen",
    start_date: "2026-06-18",
    end_date: "2026-06-18",
    notes: "",
    priority: 5
  },
  {
    id: "2026-06-19-21-invatat-dotnet-licenta-liber",
    title: "Învățat pentru .NET / licență / timp liber",
    type: "invatat",
    start_date: "2026-06-19",
    end_date: "2026-06-21",
    notes: "Dacă e cazul: învățat pentru .NET. Dacă nu: licență sau timp liber.",
    priority: 3
  },
  {
    id: "2026-06-22-examen-dotnet",
    title: "Examen .NET",
    type: "examen",
    start_date: "2026-06-22",
    end_date: "2026-06-22",
    notes: "",
    priority: 5
  },
  {
    id: "2026-06-23-25-licenta",
    title: "Licență",
    type: "licenta",
    start_date: "2026-06-23",
    end_date: "2026-06-25",
    notes: "Perioadă principală pentru licență.",
    priority: 5
  },
  {
    id: "2026-06-26-examen-cell",
    title: "Examen CELL",
    type: "examen",
    start_date: "2026-06-26",
    end_date: "2026-06-26",
    notes: "",
    priority: 5
  },
  {
    id: "2026-06-27-2026-07-20-sisteme-operare",
    title: "Învățat pentru Sisteme de Operare",
    type: "invatat",
    start_date: "2026-06-27",
    end_date: "2026-07-20",
    notes: "Pregătire pentru restanță / examen la Sisteme de Operare.",
    priority: 4
  },
  {
    id: "2026-07-22-predare-licenta-toamna",
    title: "Predare licență pentru sesiunea de toamnă",
    type: "predare",
    start_date: "2026-07-22",
    end_date: "2026-07-22",
    notes: "",
    priority: 5
  },
  {
    id: "2026-07-23-2026-09-08-pregatire-licenta",
    title: "Pregătire pentru examenul de licență",
    type: "licenta",
    start_date: "2026-07-23",
    end_date: "2026-09-08",
    notes: "Pregătire susținută pentru examenul de licență.",
    priority: 5
  }
];

const CATEGORY_LABELS = {
  all: "Toate",
  examen: "Examen",
  proiect: "Proiect",
  licenta: "Licență",
  invatat: "Învățat",
  predare: "Predare",
  liber: "Timp liber"
};

const MONTHS = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
];

const WEEKDAYS = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];

const els = {
  body: document.body,
  authScreen: document.getElementById("authScreen"),
  appShell: document.getElementById("appShell"),
  loginForm: document.getElementById("loginForm"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  loginButton: document.getElementById("loginButton"),
  loginMessage: document.getElementById("loginMessage"),
  logoutButton: document.getElementById("logoutButton"),
  themeToggle: document.getElementById("themeToggle"),
  syncPill: document.getElementById("syncPill"),
  searchInput: document.getElementById("searchInput"),
  monthSelect: document.getElementById("monthSelect"),
  filterChips: document.getElementById("filterChips"),
  viewButtons: Array.from(document.querySelectorAll(".view-button")),
  addEventButton: document.getElementById("addEventButton"),
  systemNotice: document.getElementById("systemNotice"),
  statTotal: document.getElementById("statTotal"),
  statActive: document.getElementById("statActive"),
  statNext: document.getElementById("statNext"),
  nextEventBox: document.getElementById("nextEventBox"),
  resultCount: document.getElementById("resultCount"),
  viewTitle: document.getElementById("viewTitle"),
  timelineView: document.getElementById("timelineView"),
  calendarView: document.getElementById("calendarView"),
  listView: document.getElementById("listView"),
  refreshButton: document.getElementById("refreshButton"),
  exportButton: document.getElementById("exportButton"),
  importInput: document.getElementById("importInput"),
  dedupeButton: document.getElementById("dedupeButton"),
  seedButton: document.getElementById("seedButton"),
  dialog: document.getElementById("eventDialog"),
  eventForm: document.getElementById("eventForm"),
  dialogTitle: document.getElementById("dialogTitle"),
  eventId: document.getElementById("eventId"),
  eventTitle: document.getElementById("eventTitle"),
  eventType: document.getElementById("eventType"),
  eventPriority: document.getElementById("eventPriority"),
  eventStart: document.getElementById("eventStart"),
  eventEnd: document.getElementById("eventEnd"),
  eventNotes: document.getElementById("eventNotes"),
  formMessage: document.getElementById("formMessage"),
  deleteEventButton: document.getElementById("deleteEventButton"),
  closeDialogButton: document.getElementById("closeDialogButton"),
  cancelDialogButton: document.getElementById("cancelDialogButton"),
  saveEventButton: document.getElementById("saveEventButton"),
  emptyTemplate: document.getElementById("emptyStateTemplate")
};

const state = {
  supabase: null,
  session: null,
  userEmail: null,
  rawEvents: [],
  events: [],
  filter: "all",
  view: "timeline",
  month: "all",
  realtimeChannel: null,
  loading: false
};

init();

async function init() {
  applyStoredTheme();
  bindEvents();
  fillMonthSelect();

  try {
    validateConfig();
    state.supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });

    const { data, error } = await state.supabase.auth.getSession();
    if (error) throw error;

    await handleSession(data?.session ?? null);

    state.supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session).catch((err) => showLoginError(err.message));
    });
  } catch (err) {
    showOnlyLogin();
    showLoginError(`Configurația Supabase nu este validă: ${friendlyError(err)}`);
  } finally {
    document.body.classList.remove("loading");
  }
}

function validateConfig() {
  if (!supabaseConfig?.url || !supabaseConfig?.anonKey) {
    throw new Error("lipsește url sau anonKey în supabase-config.js");
  }

  if (!supabaseConfig.url.includes(".supabase.co")) {
    throw new Error("Project URL nu pare să fie URL Supabase");
  }

  if (!Array.isArray(ADMIN_EMAILS) || ADMIN_EMAILS.length === 0) {
    throw new Error("ADMIN_EMAILS este gol");
  }
}

function bindEvents() {
  els.loginEmail.value = ADMIN_EMAILS[0] ?? "";

  els.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await login();
  });

  els.logoutButton.addEventListener("click", logout);

  els.themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
  });

  els.searchInput.addEventListener("input", render);
  els.monthSelect.addEventListener("change", () => {
    state.month = els.monthSelect.value;
    render();
  });

  els.filterChips.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.filter = button.dataset.filter;
    document.querySelectorAll(".chip").forEach((chip) => chip.classList.toggle("active", chip === button));
    render();
  });

  els.viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      els.viewButtons.forEach((item) => item.classList.toggle("active", item === button));
      render();
    });
  });

  els.addEventButton.addEventListener("click", () => openEventDialog());
  els.refreshButton.addEventListener("click", () => loadEvents({ showSuccess: true }));
  els.exportButton.addEventListener("click", exportJson);
  els.importInput.addEventListener("change", importJson);
  els.dedupeButton.addEventListener("click", dedupeDatabase);
  els.seedButton.addEventListener("click", resetToDefaultPlan);

  els.eventForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveEvent();
  });

  els.deleteEventButton.addEventListener("click", deleteSelectedEvent);
  els.closeDialogButton.addEventListener("click", closeDialog);
  els.cancelDialogButton.addEventListener("click", closeDialog);
}

async function login() {
  hideMessage(els.loginMessage);
  els.loginButton.disabled = true;
  els.loginButton.textContent = "Se conectează...";

  try {
    const email = els.loginEmail.value.trim().toLowerCase();
    const password = els.loginPassword.value;

    if (!ADMIN_EMAILS.map((item) => item.toLowerCase()).includes(email)) {
      throw new Error("Emailul introdus nu este în lista de admini din supabase-config.js.");
    }

    const { error } = await state.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  } catch (err) {
    showLoginError(friendlyError(err));
  } finally {
    els.loginButton.disabled = false;
    els.loginButton.textContent = "Intră în calendar";
  }
}

async function logout() {
  clearRealtime();
  await state.supabase.auth.signOut();
  state.session = null;
  state.userEmail = null;
  state.rawEvents = [];
  state.events = [];
  showOnlyLogin();
}

async function handleSession(session) {
  state.session = session;
  const email = session?.user?.email?.toLowerCase() ?? null;
  state.userEmail = email;

  if (!session || !email) {
    clearRealtime();
    showOnlyLogin();
    return;
  }

  if (!ADMIN_EMAILS.map((item) => item.toLowerCase()).includes(email)) {
    await state.supabase.auth.signOut();
    showOnlyLogin();
    showLoginError("Contul este autentificat, dar nu este admin pentru acest calendar.");
    return;
  }

  hideMessage(els.loginMessage);
  showApp();
  await loadEvents();
  subscribeRealtime();
}

function showOnlyLogin() {
  els.authScreen.classList.remove("hidden");
  els.appShell.classList.add("hidden");
}

function showApp() {
  els.authScreen.classList.add("hidden");
  els.appShell.classList.remove("hidden");
  setSync("online", "Conectat");
}

async function loadEvents(options = {}) {
  if (!state.supabase || state.loading) return;
  state.loading = true;
  setSync("", "Se încarcă...");
  hideNotice();

  try {
    const { data, error } = await state.supabase
      .from(TABLE_NAME)
      .select("*")
      .order("start_date", { ascending: true })
      .order("end_date", { ascending: true });

    if (error) throw error;

    state.rawEvents = Array.isArray(data) ? data.map(normalizeEvent).filter(Boolean) : [];
    state.events = uniqueEvents(state.rawEvents);

    if (state.rawEvents.length !== state.events.length) {
      showNotice(`Am ascuns ${state.rawEvents.length - state.events.length} duplicate din afișare. Apasă „Curăță duplicate” ca să le ștergi și din baza de date.`, "error");
    } else if (state.events.length === 0) {
      showNotice("Nu există evenimente în baza de date. Apasă „Resetează planul inițial” ca să încarci planul din iunie-septembrie 2026.");
    } else if (options.showSuccess) {
      showNotice("Calendar reîncărcat din Supabase.", "success");
    }

    setSync("online", "Supabase live");
    render();
  } catch (err) {
    state.rawEvents = [];
    state.events = [];
    setSync("error", "Eroare Supabase");
    showNotice(`Nu pot citi calendarul din Supabase: ${friendlyError(err)}. Rulează fișierul supabase-reset.sql în SQL Editor și verifică userul din Authentication.`, "error");
    render();
  } finally {
    state.loading = false;
  }
}

function subscribeRealtime() {
  clearRealtime();
  try {
    state.realtimeChannel = state.supabase
      .channel("calendar_events_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: TABLE_NAME }, () => loadEvents())
      .subscribe();
  } catch {
    // Realtime este bonus. Aplicația rămâne funcțională și fără el.
  }
}

function clearRealtime() {
  if (state.realtimeChannel && state.supabase) {
    state.supabase.removeChannel(state.realtimeChannel);
  }
  state.realtimeChannel = null;
}

function normalizeEvent(event) {
  const start = event.start_date ?? event.start ?? event.startDate;
  const end = event.end_date ?? event.end ?? event.endDate ?? start;
  const title = String(event.title ?? "").trim();
  const type = String(event.type ?? event.category ?? "invatat").trim();

  if (!title || !start || !end) return null;

  return {
    id: String(event.id ?? makeId(title, start)),
    title,
    type: CATEGORY_LABELS[type] ? type : "invatat",
    start_date: toISODate(start),
    end_date: toISODate(end),
    notes: String(event.notes ?? event.description ?? "").trim(),
    priority: Number(event.priority ?? 3),
    created_at: event.created_at ?? null,
    updated_at: event.updated_at ?? null
  };
}

function uniqueEvents(events) {
  const map = new Map();
  for (const event of events) {
    const key = event.id || naturalKey(event);
    if (!map.has(key)) map.set(key, event);
  }

  const naturalMap = new Map();
  for (const event of map.values()) {
    const key = naturalKey(event);
    if (!naturalMap.has(key)) naturalMap.set(key, event);
  }

  return Array.from(naturalMap.values()).sort(compareEvents);
}

function naturalKey(event) {
  return [event.title.toLowerCase(), event.type, event.start_date, event.end_date].join("|");
}

function compareEvents(a, b) {
  return a.start_date.localeCompare(b.start_date)
    || b.priority - a.priority
    || a.title.localeCompare(b.title, "ro");
}

function getFilteredEvents() {
  const term = els.searchInput.value.trim().toLowerCase();

  return state.events.filter((event) => {
    const matchesType = state.filter === "all" || event.type === state.filter;
    const matchesSearch = !term || [event.title, event.notes, CATEGORY_LABELS[event.type]]
      .join(" ")
      .toLowerCase()
      .includes(term);
    const matchesMonth = state.month === "all" || eventTouchesMonth(event, state.month);
    return matchesType && matchesSearch && matchesMonth;
  }).sort(compareEvents);
}

function render() {
  const filtered = getFilteredEvents();
  updateStats();
  updateResultCount(filtered.length);
  updateViewsVisibility();

  if (state.view === "timeline") renderTimeline(filtered);
  if (state.view === "calendar") renderCalendar(filtered);
  if (state.view === "list") renderList(filtered);
}

function updateViewsVisibility() {
  els.timelineView.classList.toggle("hidden", state.view !== "timeline");
  els.calendarView.classList.toggle("hidden", state.view !== "calendar");
  els.listView.classList.toggle("hidden", state.view !== "list");

  els.viewTitle.textContent = {
    timeline: "Timeline complet",
    calendar: "Calendar pe luni",
    list: "Listă editabilă"
  }[state.view];
}

function updateResultCount(count) {
  els.resultCount.textContent = `${count} ${count === 1 ? "rezultat" : "rezultate"}`;
}

function updateStats() {
  const today = stripTime(new Date());
  const total = state.events.length;
  const active = state.events.filter((event) => dateInRange(today, parseDate(event.start_date), parseDate(event.end_date))).length;
  const next = state.events
    .filter((event) => parseDate(event.end_date) >= today)
    .sort(compareEvents)[0];

  els.statTotal.textContent = total;
  els.statActive.textContent = active;

  if (next) {
    const days = Math.max(0, diffDays(today, parseDate(next.start_date)));
    els.statNext.textContent = String(days);
    els.nextEventBox.innerHTML = `
      <strong>${escapeHtml(next.title)}</strong>
      <span>${formatRange(next)} · ${CATEGORY_LABELS[next.type]}</span>
    `;
  } else {
    els.statNext.textContent = "—";
    els.nextEventBox.textContent = "Nu există evenimente viitoare.";
  }
}

function renderTimeline(events) {
  els.timelineView.innerHTML = "";
  if (!events.length) return renderEmpty(els.timelineView);

  const groups = groupByMonth(events);
  for (const [monthKey, items] of groups) {
    const block = document.createElement("section");
    block.className = "month-block";
    block.innerHTML = `<h3 class="month-title">${monthNameFromKey(monthKey)}</h3>`;

    for (const event of items) {
      const item = document.createElement("article");
      item.className = "timeline-item";
      const start = parseDate(event.start_date);
      item.innerHTML = `
        <div class="timeline-date">
          <strong>${String(start.getDate()).padStart(2, "0")}</strong>
          <span>${MONTHS[start.getMonth()].slice(0, 3)} ${start.getFullYear()}</span>
        </div>
        ${eventCardHtml(event)}
      `;
      block.appendChild(item);
    }

    els.timelineView.appendChild(block);
  }

  bindEventCardActions(els.timelineView);
}

function renderCalendar(events) {
  els.calendarView.innerHTML = "";
  if (!events.length) return renderEmpty(els.calendarView);

  const months = getMonthsForCalendar(events);
  for (const key of months) {
    const [year, month] = key.split("-").map(Number);
    const monthWrap = document.createElement("section");
    monthWrap.className = "calendar-month";
    monthWrap.innerHTML = `
      <div class="calendar-header">
        <h3>${MONTHS[month - 1]} ${year}</h3>
        <span class="count-pill">${events.filter((event) => eventTouchesMonth(event, key)).length} evenimente</span>
      </div>
    `;

    const grid = document.createElement("div");
    grid.className = "calendar-grid";
    WEEKDAYS.forEach((day) => {
      const el = document.createElement("div");
      el.className = "weekday";
      el.textContent = day;
      grid.appendChild(el);
    });

    const first = new Date(year, month - 1, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const start = new Date(year, month - 1, 1 - startOffset);

    for (let i = 0; i < 42; i += 1) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dayISO = toISODate(day);
      const inCurrentMonth = day.getMonth() === month - 1;
      const dayEvents = events.filter((event) => dateInRange(day, parseDate(event.start_date), parseDate(event.end_date)));

      const cell = document.createElement("div");
      cell.className = `day-cell${inCurrentMonth ? "" : " muted"}${isSameDay(day, new Date()) ? " today" : ""}`;
      cell.innerHTML = `
        <div class="day-number">${day.getDate()}</div>
        <div class="day-events"></div>
      `;

      const holder = cell.querySelector(".day-events");
      dayEvents.forEach((event) => {
        const pill = document.createElement("button");
        pill.className = `calendar-pill ${event.type}`;
        pill.type = "button";
        pill.dataset.eventId = event.id;
        pill.title = `${event.title} · ${formatRange(event)}`;
        pill.textContent = event.title;
        holder.appendChild(pill);
      });

      grid.appendChild(cell);
    }

    monthWrap.appendChild(grid);
    els.calendarView.appendChild(monthWrap);
  }

  els.calendarView.querySelectorAll("[data-event-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const event = state.events.find((item) => item.id === button.dataset.eventId);
      if (event) openEventDialog(event);
    });
  });
}

function renderList(events) {
  els.listView.innerHTML = "";
  if (!events.length) return renderEmpty(els.listView);

  for (const event of events) {
    const row = document.createElement("article");
    row.className = "list-row";
    row.innerHTML = `
      <div class="list-date">${formatRange(event)}</div>
      <div>
        <strong>${escapeHtml(event.title)}</strong>
        <div class="event-meta">
          <span class="meta-pill">${CATEGORY_LABELS[event.type]}</span>
          <span class="meta-pill">Prioritate ${event.priority}</span>
        </div>
        ${event.notes ? `<p class="event-notes">${escapeHtml(event.notes)}</p>` : ""}
      </div>
      <div class="card-actions">
        <button class="small-button" data-edit="${escapeHtml(event.id)}" type="button">Editează</button>
      </div>
    `;
    els.listView.appendChild(row);
  }

  bindEventCardActions(els.listView);
}

function renderEmpty(container) {
  container.innerHTML = "";
  container.appendChild(els.emptyTemplate.content.cloneNode(true));
}

function eventCardHtml(event) {
  return `
    <article class="event-card ${event.type}">
      <div class="event-title-row">
        <div>
          <h3>${escapeHtml(event.title)}</h3>
          <div class="event-meta">
            <span class="meta-pill">${formatRange(event)}</span>
            <span class="meta-pill">${CATEGORY_LABELS[event.type]}</span>
            <span class="meta-pill">Prioritate ${event.priority}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="small-button" data-edit="${escapeHtml(event.id)}" type="button">Editează</button>
        </div>
      </div>
      ${event.notes ? `<p class="event-notes">${escapeHtml(event.notes)}</p>` : ""}
    </article>
  `;
}

function bindEventCardActions(root) {
  root.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const event = state.events.find((item) => item.id === button.dataset.edit);
      if (event) openEventDialog(event);
    });
  });
}

function openEventDialog(event = null) {
  hideMessage(els.formMessage);
  els.eventForm.reset();

  if (event) {
    els.dialogTitle.textContent = "Editează eveniment";
    els.eventId.value = event.id;
    els.eventTitle.value = event.title;
    els.eventType.value = event.type;
    els.eventPriority.value = String(event.priority ?? 3);
    els.eventStart.value = event.start_date;
    els.eventEnd.value = event.end_date;
    els.eventNotes.value = event.notes ?? "";
    els.deleteEventButton.classList.remove("hidden");
  } else {
    els.dialogTitle.textContent = "Adaugă eveniment";
    els.eventId.value = "";
    els.eventType.value = "invatat";
    els.eventPriority.value = "3";
    els.eventStart.value = "2026-06-01";
    els.eventEnd.value = "2026-06-01";
    els.deleteEventButton.classList.add("hidden");
  }

  els.dialog.showModal();
  setTimeout(() => els.eventTitle.focus(), 50);
}

function closeDialog() {
  els.dialog.close();
}

async function saveEvent() {
  hideMessage(els.formMessage);
  els.saveEventButton.disabled = true;
  els.saveEventButton.textContent = "Se salvează...";

  try {
    const event = {
      id: els.eventId.value || makeId(els.eventTitle.value, els.eventStart.value),
      title: els.eventTitle.value.trim(),
      type: els.eventType.value,
      start_date: els.eventStart.value,
      end_date: els.eventEnd.value,
      notes: els.eventNotes.value.trim(),
      priority: Number(els.eventPriority.value)
    };

    if (!event.title) throw new Error("Titlul este obligatoriu.");
    if (parseDate(event.start_date) > parseDate(event.end_date)) {
      throw new Error("Data de început nu poate fi după data de final.");
    }

    const { error } = await state.supabase
      .from(TABLE_NAME)
      .upsert(event, { onConflict: "id" });

    if (error) throw error;

    closeDialog();
    await loadEvents({ showSuccess: true });
  } catch (err) {
    showFormError(friendlyError(err));
  } finally {
    els.saveEventButton.disabled = false;
    els.saveEventButton.textContent = "Salvează";
  }
}

async function deleteSelectedEvent() {
  const id = els.eventId.value;
  if (!id) return;
  const ok = confirm("Sigur ștergi acest eveniment?");
  if (!ok) return;

  try {
    const { error } = await state.supabase.from(TABLE_NAME).delete().eq("id", id);
    if (error) throw error;
    closeDialog();
    await loadEvents({ showSuccess: true });
  } catch (err) {
    showFormError(friendlyError(err));
  }
}

async function dedupeDatabase() {
  const duplicates = getDuplicateIds(state.rawEvents);
  if (duplicates.length === 0) {
    showNotice("Nu există duplicate în baza de date.", "success");
    return;
  }

  const ok = confirm(`Șterg ${duplicates.length} duplicate din baza de date?`);
  if (!ok) return;

  try {
    const { error } = await state.supabase.from(TABLE_NAME).delete().in("id", duplicates);
    if (error) throw error;
    await loadEvents();
    showNotice(`Am șters ${duplicates.length} duplicate.`, "success");
  } catch (err) {
    showNotice(`Nu am putut șterge duplicatele: ${friendlyError(err)}`, "error");
  }
}

function getDuplicateIds(events) {
  const seen = new Set();
  const duplicateIds = [];
  for (const event of events) {
    const key = naturalKey(event);
    if (seen.has(key)) duplicateIds.push(event.id);
    else seen.add(key);
  }
  return duplicateIds;
}

async function resetToDefaultPlan() {
  const ok = confirm("Resetez calendarul la planul inițial? Evenimentele existente se șterg și se pun cele curate, fără duplicate.");
  if (!ok) return;

  try {
    setSync("", "Se resetează...");
    const { error: deleteError } = await state.supabase
      .from(TABLE_NAME)
      .delete()
      .neq("id", "__niciodata__");
    if (deleteError) throw deleteError;

    const { error: insertError } = await state.supabase
      .from(TABLE_NAME)
      .upsert(DEFAULT_EVENTS, { onConflict: "id" });
    if (insertError) throw insertError;

    await loadEvents();
    showNotice("Planul inițial a fost încărcat curat, fără duplicate.", "success");
  } catch (err) {
    showNotice(`Resetarea nu a reușit: ${friendlyError(err)}. Rulează supabase-reset.sql în Supabase SQL Editor.`, "error");
  }
}

function exportJson() {
  const payload = JSON.stringify(state.events, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `calendar-2026-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function importJson(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;

  try {
    const text = await file.text();
    const json = JSON.parse(text);
    if (!Array.isArray(json)) throw new Error("Fișierul JSON trebuie să conțină o listă de evenimente.");

    const imported = json.map(normalizeEvent).filter(Boolean);
    if (!imported.length) throw new Error("Nu am găsit evenimente valide în JSON.");

    const ok = confirm(`Import ${imported.length} evenimente? Evenimentele cu același id vor fi actualizate.`);
    if (!ok) return;

    const { error } = await state.supabase.from(TABLE_NAME).upsert(imported, { onConflict: "id" });
    if (error) throw error;

    await loadEvents();
    showNotice(`Am importat ${imported.length} evenimente.`, "success");
  } catch (err) {
    showNotice(`Importul nu a reușit: ${friendlyError(err)}`, "error");
  }
}

function groupByMonth(events) {
  const map = new Map();
  for (const event of events) {
    const key = event.start_date.slice(0, 7);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(event);
  }
  return map;
}

function getMonthsForCalendar(events) {
  if (state.month !== "all") return [state.month];
  const months = new Set();
  for (const event of events) {
    for (const key of monthsInRange(event.start_date, event.end_date)) months.add(key);
  }
  return Array.from(months).sort();
}

function fillMonthSelect() {
  const months = [
    ["all", "Toate lunile"],
    ["2026-06", "Iunie 2026"],
    ["2026-07", "Iulie 2026"],
    ["2026-08", "August 2026"],
    ["2026-09", "Septembrie 2026"]
  ];

  els.monthSelect.innerHTML = months
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
}

function monthsInRange(startISO, endISO) {
  const start = parseDate(startISO);
  const end = parseDate(endISO);
  const keys = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);

  while (cursor <= last) {
    keys.push(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`);
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return keys;
}

function eventTouchesMonth(event, monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0);
  return parseDate(event.start_date) <= monthEnd && parseDate(event.end_date) >= monthStart;
}

function monthNameFromKey(key) {
  const [year, month] = key.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

function formatRange(event) {
  const start = parseDate(event.start_date);
  const end = parseDate(event.end_date);
  const startText = formatDate(start);
  if (isSameDay(start, end)) return startText;
  return `${startText} – ${formatDate(end)}`;
}

function formatDate(date) {
  return `${String(date.getDate()).padStart(2, "0")} ${MONTHS[date.getMonth()].slice(0, 3).toLowerCase()} ${date.getFullYear()}`;
}

function parseDate(value) {
  if (value instanceof Date) return stripTime(value);
  const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toISODate(value) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.slice(0, 10))) {
    return value.slice(0, 10);
  }
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function dateInRange(date, start, end) {
  const value = stripTime(date);
  return value >= stripTime(start) && value <= stripTime(end);
}

function isSameDay(a, b) {
  return stripTime(a).getTime() === stripTime(b).getTime();
}

function diffDays(a, b) {
  const ms = stripTime(b).getTime() - stripTime(a).getTime();
  return Math.ceil(ms / 86400000);
}

function makeId(title, start) {
  const slug = String(title)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 52);
  const random = crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${start || toISODate(new Date())}-${slug || "eveniment"}-${random.slice(0, 8)}`;
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("calendar-theme", theme);
  els.themeToggle.textContent = theme === "dark" ? "☀" : "☾";
}

function applyStoredTheme() {
  const saved = localStorage.getItem("calendar-theme");
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  setTheme(saved || (prefersDark ? "dark" : "light"));
}

function setSync(type, text) {
  els.syncPill.className = `sync-pill ${type || ""}`.trim();
  els.syncPill.textContent = text;
}

function showNotice(text, type = "") {
  els.systemNotice.className = `notice ${type}`.trim();
  els.systemNotice.textContent = text;
  els.systemNotice.classList.remove("hidden");
}

function hideNotice() {
  els.systemNotice.classList.add("hidden");
  els.systemNotice.textContent = "";
}

function showLoginError(text) {
  els.loginMessage.textContent = text;
  els.loginMessage.className = "message";
}

function showFormError(text) {
  els.formMessage.textContent = text;
  els.formMessage.className = "message";
}

function hideMessage(element) {
  element.textContent = "";
  element.className = "message hidden";
}

function friendlyError(err) {
  const message = String(err?.message ?? err ?? "eroare necunoscută");

  if (message.includes("Invalid login credentials")) {
    return "emailul sau parola sunt greșite. Creează userul în Supabase → Authentication → Users sau schimbă parola.";
  }
  if (message.includes("Email not confirmed")) {
    return "emailul nu este confirmat. În Supabase poți confirma manual userul sau dezactiva confirmarea emailului.";
  }
  if (message.includes("relation") && message.includes("does not exist")) {
    return "tabelul calendar_events nu există. Rulează supabase-reset.sql în SQL Editor.";
  }
  if (message.includes("permission denied") || message.includes("violates row-level security")) {
    return "regulile RLS blochează operația. Rulează supabase-reset.sql și verifică emailul de admin din script.";
  }

  return message;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
