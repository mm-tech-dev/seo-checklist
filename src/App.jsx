
import { useState, useEffect } from "react";
import { TASKS as DEFAULT_TASKS } from "./checklist-data";

// ── תוכן ברירת המחדל בקובץ src/checklist-data.js. עריכה ויזואלית דרך "עריכת תוכן" ──

const CONTENT_KEY = "seo_checklist_content";

function deepClone(obj) {
  try { return structuredClone(obj); } catch { return JSON.parse(JSON.stringify(obj)); }
}

function loadContent() {
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return deepClone(DEFAULT_TASKS);
}

function hasDraft() {
  try { return !!localStorage.getItem(CONTENT_KEY); } catch { return false; }
}

function genId() {
  return "X-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

const STATUS_LABELS = ["לא התחלתי", "בתהליך", "בוצע ✓"];
const STATUS_COLORS = [
  { bg: "#F1EFE8", text: "#5F5E5A", border: "#B4B2A9" },
  { bg: "#FAEEDA", text: "#633806", border: "#EF9F27" },
  { bg: "#E1F5EE", text: "#085041", border: "#1D9E75" },
];

// ── STORAGE KEY ───────────────────────────────────────────────────────────────
function clientKey(name) { return `seo_client_${name.trim().toLowerCase().replace(/\s+/g, "_")}`; }

// ── SHARED UI ─────────────────────────────────────────────────────────────────
function Tag({ children, color }) {
  return (
    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: color?.bg || "#EEEDFE", color: color?.text || "#3C3489", border: `0.5px solid ${color?.border || "#AFA9EC"}`, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function ToolList({ tools }) {
  if (!tools?.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
      {tools.map((t, i) => (
        <a key={i} href={t.l} target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, background: "#F1EFE8", textDecoration: "none", fontSize: 13, color: "#185FA5", border: "0.5px solid #D3D1C7" }}>
          <span style={{ fontSize: 14 }}>🔗</span>
          <span style={{ fontWeight: 500 }}>{t.n}</span>
          <span style={{ marginRight: "auto", fontSize: 11, color: "#888780" }}>{(t.l || "").replace("https://", "").split("/")[0]}</span>
        </a>
      ))}
    </div>
  );
}

const btn = (bg, color, border) => ({ fontSize: 12, padding: "5px 10px", borderRadius: 6, background: bg, color, border: `0.5px solid ${border}`, cursor: "pointer", fontFamily: "inherit" });
const field = { width: "100%", padding: "6px 9px", fontSize: 13, borderRadius: 6, border: "0.5px solid #D3D1C7", background: "white", direction: "rtl", fontFamily: "inherit", boxSizing: "border-box" };

// ── VIEW: task row ────────────────────────────────────────────────────────────
function TaskRow({ task, taskState, onChange }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("explain");
  const st = taskState || { status: 0, checked: false, date: "", note: "" };

  function update(patch) { onChange({ ...st, ...patch }); }

  const sc = STATUS_COLORS[st.status];

  return (
    <div style={{ borderBottom: "0.5px solid #E5E3DC", padding: "10px 0", opacity: st.status === 2 ? 0.6 : 1 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <button onClick={() => {
          const checked = !st.checked;
          update({ checked, status: checked ? 2 : st.status === 2 ? 0 : st.status });
        }}
          style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", border: st.checked ? "none" : "1.5px solid #B4B2A9", background: st.checked ? "#1D9E75" : "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
          {st.checked && <span style={{ color: "white", fontSize: 13 }}>✓</span>}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "#888780", fontFamily: "monospace" }}>{task.id}</span>
            <span style={{ fontSize: 14, fontWeight: 500, textDecoration: st.status === 2 ? "line-through" : "none", color: st.status === 2 ? "#888780" : "inherit" }}>{task.cat}</span>
            <Tag color={{ bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC" }}>{task.freq}</Tag>
            <button onClick={() => setOpen(o => !o)}
              style={{ marginRight: "auto", fontSize: 12, background: "none", border: "0.5px solid #D3D1C7", borderRadius: 6, padding: "2px 8px", cursor: "pointer", color: "#5F5E5A", display: "flex", alignItems: "center", gap: 4 }}>
              {open ? "▲ סגור" : "▼ פרטים"}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <select value={st.status} onChange={e => { const v = +e.target.value; update({ status: v, checked: v === 2 }); }}
              style={{ fontSize: 12, padding: "3px 8px", borderRadius: 6, border: `0.5px solid ${sc.border}`, background: sc.bg, color: sc.text, cursor: "pointer" }}>
              {STATUS_LABELS.map((l, i) => <option key={i} value={i}>{l}</option>)}
            </select>
            <input type="date" value={st.date || ""} onChange={e => update({ date: e.target.value })}
              style={{ fontSize: 12, padding: "3px 8px", borderRadius: 6, border: "0.5px solid #D3D1C7", background: "white", color: "#2C2C2A" }} />
            <button onClick={() => update({ noteOpen: !st.noteOpen })}
              style={{ fontSize: 12, padding: "3px 8px", borderRadius: 6, border: "0.5px solid #D3D1C7", background: "none", cursor: "pointer", color: "#5F5E5A" }}>
              📝 הערה{st.note ? " ✓" : ""}
            </button>
          </div>

          {(st.noteOpen || st.note) && (
            <textarea value={st.note || ""} onChange={e => update({ note: e.target.value })}
              placeholder="הוסף הערה, קישור, תוצאה..."
              style={{ width: "100%", marginTop: 6, padding: "6px 10px", fontSize: 13, borderRadius: 6, border: "0.5px solid #D3D1C7", background: "#F8F7F4", resize: "vertical", minHeight: 50, direction: "rtl", fontFamily: "inherit" }} />
          )}

          {open && (
            <div style={{ marginTop: 8, border: "0.5px solid #D3D1C7", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ display: "flex", borderBottom: "0.5px solid #D3D1C7" }}>
                {["explain", "tools"].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ flex: 1, padding: "7px 12px", fontSize: 12, border: "none", cursor: "pointer", background: tab === t ? "white" : "#F8F7F4", borderBottom: tab === t ? "2px solid #7F77DD" : "none", fontWeight: tab === t ? 500 : 400, color: tab === t ? "#2C2C2A" : "#5F5E5A" }}>
                    {t === "explain" ? "📖 הסבר מקיף" : "🛠 כלים ומקורות"}
                  </button>
                ))}
              </div>
              <div style={{ padding: "12px 14px", fontSize: 13, lineHeight: 1.65 }}>
                {tab === "explain" ? <p>{task.explain}</p> : <ToolList tools={task.tools} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── EDIT: tools editor ────────────────────────────────────────────────────────
function ToolsEditor({ tools, onChange }) {
  const list = tools || [];
  const set = (i, k, v) => onChange(list.map((t, j) => j === i ? { ...t, [k]: v } : t));
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 11, color: "#888780", marginBottom: 4 }}>כלים וקישורים</div>
      {list.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
          <input value={t.n || ""} placeholder="שם הכלי" onChange={e => set(i, "n", e.target.value)} style={{ ...field, flex: "0 0 38%" }} />
          <input value={t.l || ""} placeholder="https://..." dir="ltr" onChange={e => set(i, "l", e.target.value)} style={{ ...field, flex: 1, textAlign: "left" }} />
          <button onClick={() => onChange(list.filter((_, j) => j !== i))} style={btn("#FCEDEC", "#A4231E", "#E9B7B4")}>✕</button>
        </div>
      ))}
      <button onClick={() => onChange([...list, { n: "", l: "https://" }])} style={btn("#F1EFE8", "#5F5E5A", "#D3D1C7")}>+ הוסף כלי</button>
    </div>
  );
}

// ── EDIT: single task card ────────────────────────────────────────────────────
function TaskEditor({ task, idx, count, onField, onTools, onDelete, onMove }) {
  return (
    <div style={{ border: "0.5px solid #D3D1C7", borderRadius: 10, padding: 12, marginBottom: 10, background: "white" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center", flexWrap: "wrap" }}>
        <input value={task.id} onChange={e => onField("id", e.target.value)} style={{ ...field, flex: "0 0 22%", fontFamily: "monospace", fontSize: 12 }} placeholder="מזהה" />
        <input value={task.freq} onChange={e => onField("freq", e.target.value)} style={{ ...field, flex: "0 0 30%" }} placeholder="תדירות" />
        <button onClick={() => onMove(-1)} disabled={idx === 0} style={{ ...btn("#F1EFE8", "#5F5E5A", "#D3D1C7"), marginRight: "auto", opacity: idx === 0 ? 0.4 : 1 }}>↑</button>
        <button onClick={() => onMove(1)} disabled={idx === count - 1} style={{ ...btn("#F1EFE8", "#5F5E5A", "#D3D1C7"), opacity: idx === count - 1 ? 0.4 : 1 }}>↓</button>
        <button onClick={onDelete} style={btn("#FCEDEC", "#A4231E", "#E9B7B4")}>🗑 מחק</button>
      </div>
      <input value={task.cat} onChange={e => onField("cat", e.target.value)} style={{ ...field, marginBottom: 8, fontWeight: 500 }} placeholder="שם הסעיף" />
      <textarea value={task.explain} onChange={e => onField("explain", e.target.value)} placeholder="הסבר מקיף ושלבי ביצוע..."
        style={{ ...field, minHeight: 90, resize: "vertical", lineHeight: 1.6 }} />
      <ToolsEditor tools={task.tools} onChange={onTools} />
    </div>
  );
}

// ── EDIT: full editor screen ──────────────────────────────────────────────────
function Editor({ content, tabIdx, setTabIdx, ops, onExit, onExport, onCopy, onReset, draft, copied }) {
  const track = content[tabIdx];
  return (
    <div dir="rtl" style={{ padding: "1rem 1rem 4rem", maxWidth: 760, margin: "0 auto", fontFamily: "inherit" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <button onClick={onExit} style={btn("none", "#5F5E5A", "#D3D1C7")}>← תצוגה</button>
        <span style={{ fontSize: 16, fontWeight: 500 }}>✏️ עריכת תוכן</span>
        <div style={{ marginRight: "auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={onCopy} style={btn("#F1EFE8", "#5F5E5A", "#D3D1C7")}>{copied ? "✓ הועתק" : "העתק JSON"}</button>
          <button onClick={onExport} style={btn("#E1F5EE", "#085041", "#1D9E75")}>⬇ ייצוא לפרסום</button>
          <button onClick={onReset} style={btn("#FCEDEC", "#A4231E", "#E9B7B4")}>איפוס טיוטה</button>
        </div>
      </div>

      <div style={{ background: draft ? "#FAEEDA" : "#F1EFE8", border: `0.5px solid ${draft ? "#EF9F27" : "#D3D1C7"}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#5F5E5A", marginBottom: 14, lineHeight: 1.6 }}>
        {draft
          ? "📝 יש טיוטה מקומית פעילה (נשמרת בדפדפן הזה בלבד). כשתסיים - לחץ 'ייצוא לפרסום', והקובץ שירד תשלח לפרסום באתר הציבורי."
          : "אין שינויים עדיין. כל עריכה נשמרת אוטומטית כטיוטה מקומית בדפדפן הזה."}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "0.5px solid #D3D1C7", marginBottom: 14 }}>
        {Object.keys(content).map(k => {
          const i = Number(k);
          return (
            <button key={i} onClick={() => setTabIdx(i)}
              style={{ padding: "8px 14px", fontSize: 13, border: "none", background: "none", cursor: "pointer", color: tabIdx === i ? "#2C2C2A" : "#888780", borderBottom: tabIdx === i ? "2px solid #7F77DD" : "2px solid transparent", fontWeight: tabIdx === i ? 500 : 400, fontFamily: "inherit" }}>
              {content[i].icon} {content[i].short}
            </button>
          );
        })}
      </div>

      {/* Track meta */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        <input value={track.icon} onChange={e => ops.setTrack(tabIdx, "icon", e.target.value)} style={{ ...field, flex: "0 0 60px", textAlign: "center" }} placeholder="🚀" />
        <input value={track.short} onChange={e => ops.setTrack(tabIdx, "short", e.target.value)} style={{ ...field, flex: 1 }} placeholder="שם קצר (tab)" />
        <input value={track.title} onChange={e => ops.setTrack(tabIdx, "title", e.target.value)} style={{ ...field, flex: 1.4 }} placeholder="שם מלא של המסלול" />
      </div>

      {/* Sections */}
      {track.sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10, background: "#F8F7F4", padding: 8, borderRadius: 8, border: "0.5px solid #E5E3DC" }}>
            <input value={sec.name} onChange={e => ops.setSectionName(tabIdx, si, e.target.value)} style={{ ...field, fontWeight: 500 }} placeholder="שם השלב" />
            <button onClick={() => ops.moveSection(tabIdx, si, -1)} disabled={si === 0} style={{ ...btn("white", "#5F5E5A", "#D3D1C7"), opacity: si === 0 ? 0.4 : 1 }}>↑</button>
            <button onClick={() => ops.moveSection(tabIdx, si, 1)} disabled={si === track.sections.length - 1} style={{ ...btn("white", "#5F5E5A", "#D3D1C7"), opacity: si === track.sections.length - 1 ? 0.4 : 1 }}>↓</button>
            <button onClick={() => { if (confirm("למחוק את כל השלב והסעיפים שבו?")) ops.delSection(tabIdx, si); }} style={btn("#FCEDEC", "#A4231E", "#E9B7B4")}>🗑</button>
          </div>

          {sec.tasks.map((task, k) => (
            <TaskEditor key={k} task={task} idx={k} count={sec.tasks.length}
              onField={(f, v) => ops.setTask(tabIdx, si, k, f, v)}
              onTools={(tools) => ops.setTools(tabIdx, si, k, tools)}
              onDelete={() => { if (confirm("למחוק את הסעיף?")) ops.delTask(tabIdx, si, k); }}
              onMove={(dir) => ops.moveTask(tabIdx, si, k, dir)} />
          ))}

          <button onClick={() => ops.addTask(tabIdx, si)} style={{ ...btn("#EEEDFE", "#3C3489", "#AFA9EC"), padding: "7px 14px" }}>+ הוסף סעיף לשלב זה</button>
        </div>
      ))}

      <button onClick={() => ops.addSection(tabIdx)} style={{ ...btn("#E1F5EE", "#085041", "#1D9E75"), padding: "9px 16px", fontSize: 13 }}>+ הוסף שלב חדש</button>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home"); // home | checklist | editor
  const [clientName, setClientName] = useState("");
  const [inputName, setInputName] = useState("");
  const [clients, setClients] = useState([]);
  const [tabIdx, setTabIdx] = useState(0);
  const [taskStates, setTaskStates] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // editable content
  const [content, setContent] = useState(loadContent);
  const [draft, setDraft] = useState(hasDraft);
  const [copied, setCopied] = useState(false);

  // Airtable sync
  const [webhookUrl, setWebhookUrl] = useState(() => { try { return localStorage.getItem("airtable_webhook_url") || ""; } catch { return ""; } });
  const [syncMsg, setSyncMsg] = useState("");
  function saveWebhook(v) { setWebhookUrl(v); try { localStorage.setItem("airtable_webhook_url", v); } catch {} }
  function overallStats() {
    let done = 0, total = 0;
    Object.keys(content).forEach(k => { const s = getStats(Number(k)); done += s.done; total += s.total; });
    return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
  }
  async function syncToAirtable() {
    if (!webhookUrl) { setSyncMsg("⚠ הגדר כתובת webhook במסך הבית"); setTimeout(() => setSyncMsg(""), 4000); return; }
    const o = overallStats();
    try {
      await fetch(webhookUrl, { method: "POST", mode: "no-cors", body: JSON.stringify({ client: clientName, done: o.done, total: o.total, pct: o.pct, completed: o.pct === 100, updatedAt: new Date().toISOString() }) });
      setSyncMsg(o.pct === 100 ? "✓ נשלח ל-Airtable - הלקוח סומן כהושלם" : `↗ נשלח ל-Airtable (${o.pct}%)`);
    } catch { setSyncMsg("✗ שליחה נכשלה - בדוק את כתובת ה-webhook"); }
    setTimeout(() => setSyncMsg(""), 4500);
  }

  useEffect(() => { loadClientList(); }, []);

  async function loadClientList() {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith("seo_client_"));
      setClients(keys.map(k => k.replace("seo_client_", "").replace(/_/g, " ")));
    } catch { setClients([]); }
  }

  async function openClient(name) {
    setLoading(true);
    setClientName(name);
    try {
      const raw = localStorage.getItem(clientKey(name));
      setTaskStates(raw ? JSON.parse(raw) : {});
    } catch { setTaskStates({}); }
    setLoading(false);
    setScreen("checklist");
  }

  async function save(states) {
    setSaving(true);
    try {
      localStorage.setItem(clientKey(clientName), JSON.stringify(states));
      setLastSaved(new Date());
      await loadClientList();
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  function updateTask(taskId, patch) {
    setTaskStates(prev => {
      const next = { ...prev, [taskId]: { ...(prev[taskId] || {}), ...patch } };
      save(next);
      return next;
    });
  }

  function getStats(tabI) {
    const tab = content[tabI];
    let done = 0, prog = 0, todo = 0, total = 0;
    tab.sections.forEach(s => s.tasks.forEach(t => {
      total++;
      const st = (taskStates[t.id] || {}).status || 0;
      if (st === 2) done++; else if (st === 1) prog++; else todo++;
    }));
    return { done, prog, todo, total };
  }

  // ── content editing ──
  function mutate(fn) {
    setContent(prev => {
      const next = deepClone(prev);
      fn(next);
      try { localStorage.setItem(CONTENT_KEY, JSON.stringify(next)); setDraft(true); } catch {}
      return next;
    });
  }
  const ops = {
    setTrack: (ti, f, v) => mutate(c => { c[ti][f] = v; }),
    setSectionName: (ti, si, v) => mutate(c => { c[ti].sections[si].name = v; }),
    addSection: (ti) => mutate(c => { c[ti].sections.push({ name: "שלב חדש", tasks: [] }); }),
    delSection: (ti, si) => mutate(c => { c[ti].sections.splice(si, 1); }),
    moveSection: (ti, si, d) => mutate(c => { const a = c[ti].sections, j = si + d; if (j < 0 || j >= a.length) return; [a[si], a[j]] = [a[j], a[si]]; }),
    addTask: (ti, si) => mutate(c => { c[ti].sections[si].tasks.push({ id: genId(), cat: "סעיף חדש", freq: "חד-פעמי", explain: "", tools: [] }); }),
    setTask: (ti, si, k, f, v) => mutate(c => { c[ti].sections[si].tasks[k][f] = v; }),
    delTask: (ti, si, k) => mutate(c => { c[ti].sections[si].tasks.splice(k, 1); }),
    moveTask: (ti, si, k, d) => mutate(c => { const a = c[ti].sections[si].tasks, j = k + d; if (j < 0 || j >= a.length) return; [a[k], a[j]] = [a[j], a[k]]; }),
    setTools: (ti, si, k, tools) => mutate(c => { c[ti].sections[si].tasks[k].tools = tools; }),
  };

  function exportContent() {
    const data = JSON.stringify(content, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "checklist-content.json";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  async function copyContent() {
    try { await navigator.clipboard.writeText(JSON.stringify(content, null, 2)); setCopied(true); setTimeout(() => setCopied(false), 1500); }
    catch { alert("ההעתקה נכשלה - השתמש בכפתור 'ייצוא לפרסום' במקום."); }
  }
  function resetContent() {
    if (!confirm("לאפס את כל הטיוטה ולחזור לתוכן שפורסם? פעולה זו לא ניתנת לביטול.")) return;
    try { localStorage.removeItem(CONTENT_KEY); } catch {}
    setContent(deepClone(DEFAULT_TASKS));
    setDraft(false);
  }

  // ── EDITOR SCREEN ──
  if (screen === "editor") {
    return <Editor content={content} tabIdx={tabIdx} setTabIdx={setTabIdx} ops={ops}
      onExit={() => setScreen("home")} onExport={exportContent} onCopy={copyContent} onReset={resetContent}
      draft={draft} copied={copied} />;
  }

  // ── HOME ──
  if (screen === "home") {
    return (
      <div dir="rtl" style={{ padding: "2rem 1.5rem", maxWidth: 600, margin: "0 auto", fontFamily: "inherit" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 6 }}>צ׳קליסט SEO — ניהול לקוחות</div>
          <div style={{ fontSize: 14, color: "#5F5E5A" }}>שלושה מסלולים: הקמת אתר חדש, אבחון אתר ותיק, וריטיינר חודשי. נשמר אוטומטית בדפדפן.</div>
        </div>

        <div style={{ background: "#F8F7F4", borderRadius: 12, border: "0.5px solid #D3D1C7", padding: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>פתיחת לקוח (חדש או קיים)</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={inputName} onChange={e => setInputName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && inputName.trim() && openClient(inputName.trim())}
              placeholder="שם הלקוח / דומיין..."
              style={{ flex: 1, padding: "8px 12px", fontSize: 14, borderRadius: 8, border: "0.5px solid #D3D1C7", background: "white", direction: "rtl" }} />
            <button onClick={() => inputName.trim() && openClient(inputName.trim())}
              disabled={!inputName.trim()}
              style={{ padding: "8px 18px", fontSize: 14, borderRadius: 8, background: "#7F77DD", color: "white", border: "none", cursor: inputName.trim() ? "pointer" : "not-allowed", opacity: inputName.trim() ? 1 : 0.5, fontFamily: "inherit" }}>
              פתח
            </button>
          </div>
        </div>

        {clients.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#5F5E5A", marginBottom: 8 }}>לקוחות קיימים</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {clients.map(c => (
                <button key={c} onClick={() => openClient(c)}
                  style={{ padding: "10px 14px", fontSize: 14, borderRadius: 8, border: "0.5px solid #D3D1C7", background: "white", cursor: "pointer", textAlign: "right", display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit" }}>
                  <span style={{ fontSize: 18 }}>📁</span>
                  <span style={{ fontWeight: 500 }}>{c}</span>
                  <span style={{ marginRight: "auto", fontSize: 12, color: "#888780" }}>לחץ לפתיחה ←</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {clients.length === 0 && (
          <div style={{ fontSize: 13, color: "#888780", textAlign: "center", padding: "1.5rem 0 2rem" }}>
            עדיין אין לקוחות. הזן שם לקוח כדי להתחיל.
          </div>
        )}

        <div style={{ borderTop: "0.5px solid #E5E3DC", paddingTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setScreen("editor")}
            style={{ padding: "8px 14px", fontSize: 13, borderRadius: 8, border: "0.5px solid #AFA9EC", background: "#EEEDFE", color: "#3C3489", cursor: "pointer", fontFamily: "inherit" }}>
            ✏️ עריכת תוכן הצ׳קליסט
          </button>
          {draft && <span style={{ fontSize: 12, color: "#BA7517" }}>📝 יש טיוטה לא מפורסמת</span>}
        </div>

        <div style={{ marginTop: 12, background: "#F8F7F4", borderRadius: 10, border: "0.5px solid #D3D1C7", padding: "10px 12px" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#5F5E5A", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
            🔗 סנכרון Airtable {webhookUrl ? <span style={{ color: "#1D9E75" }}>● מחובר</span> : <span style={{ color: "#BA7517" }}>● לא מוגדר</span>}
          </div>
          <input value={webhookUrl} onChange={e => saveWebhook(e.target.value)} dir="ltr"
            placeholder="הדבק כאן כתובת Airtable webhook..."
            style={{ width: "100%", padding: "7px 10px", fontSize: 12, borderRadius: 6, border: "0.5px solid #D3D1C7", background: "white", boxSizing: "border-box", textAlign: "left" }} />
          <div style={{ fontSize: 11, color: "#888780", marginTop: 5, lineHeight: 1.5 }}>
            הכתובת נשמרת בדפדפן הזה בלבד ולא נחשפת באתר. כשלקוח מגיע ל-100% - לחץ "סנכרן ל-Airtable" בתוך הצ׳קליסט.
          </div>
        </div>
      </div>
    );
  }

  // ── CHECKLIST ──
  const curStats = getStats(tabIdx);
  const pct = curStats.total ? Math.round(curStats.done / curStats.total * 100) : 0;

  return (
    <div dir="rtl" style={{ padding: "1rem 1rem 3rem", maxWidth: 700, margin: "0 auto", fontFamily: "inherit" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <button onClick={() => setScreen("home")}
          style={{ fontSize: 13, padding: "4px 10px", borderRadius: 6, border: "0.5px solid #D3D1C7", background: "none", cursor: "pointer", color: "#5F5E5A", fontFamily: "inherit" }}>
          ← חזרה
        </button>
        <span style={{ fontSize: 16, fontWeight: 500 }}>📁 {clientName}</span>
        <button onClick={syncToAirtable}
          style={{ marginRight: "auto", fontSize: 13, padding: "4px 10px", borderRadius: 6, border: `0.5px solid ${pct === 100 ? "#1D9E75" : "#D3D1C7"}`, background: pct === 100 ? "#E1F5EE" : "#F1EFE8", color: pct === 100 ? "#085041" : "#5F5E5A", cursor: "pointer", fontFamily: "inherit" }}>
          ↗ סנכרן ל-Airtable
        </button>
        <button onClick={() => setScreen("editor")}
          style={{ fontSize: 13, padding: "4px 10px", borderRadius: 6, border: "0.5px solid #AFA9EC", background: "#EEEDFE", color: "#3C3489", cursor: "pointer", fontFamily: "inherit" }}>
          ✏️ עריכה
        </button>
        {saving && <span style={{ fontSize: 12, color: "#888780" }}>שומר...</span>}
        {!saving && lastSaved && <span style={{ fontSize: 12, color: "#1D9E75" }}>✓ נשמר</span>}
      </div>
      {syncMsg && <div style={{ fontSize: 13, padding: "8px 12px", borderRadius: 8, background: "#F1EFE8", border: "0.5px solid #D3D1C7", marginBottom: 12, color: "#2C2C2A" }}>{syncMsg}</div>}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "0.5px solid #D3D1C7", marginBottom: "1rem" }}>
        {Object.keys(content).map(k => {
          const i = Number(k);
          const s = getStats(i);
          return (
            <button key={i} onClick={() => setTabIdx(i)}
              style={{ padding: "8px 16px", fontSize: 13, border: "none", background: "none", cursor: "pointer", color: tabIdx === i ? "#2C2C2A" : "#888780", borderBottom: tabIdx === i ? "2px solid #7F77DD" : "2px solid transparent", fontWeight: tabIdx === i ? 500 : 400, fontFamily: "inherit" }}>
              {content[i].icon} {content[i].short}
              <span style={{ marginRight: 6, fontSize: 11, padding: "1px 6px", borderRadius: 10, background: tabIdx === i ? "#EEEDFE" : "#F1EFE8", color: tabIdx === i ? "#534AB7" : "#5F5E5A" }}>
                {s.done}/{s.total}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: "1rem" }}>
        {[
          { label: "הושלמו", val: curStats.done, color: "#0F6E56" },
          { label: "בתהליך", val: curStats.prog, color: "#BA7517" },
          { label: "ממתינות", val: curStats.todo, color: "#888780" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#F8F7F4", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ fontSize: 12, color: "#888780", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 5, background: "#F1EFE8", borderRadius: 3, marginBottom: "1.5rem", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "#1D9E75", borderRadius: 3, transition: "width .3s" }} />
      </div>

      {loading ? <div style={{ textAlign: "center", color: "#888780", padding: "2rem" }}>טוען...</div> : (
        content[tabIdx].sections.map((sec, si) => (
          <div key={si}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#888780", padding: "10px 0 5px", borderBottom: "0.5px solid #D3D1C7", marginBottom: 4 }}>
              {sec.name}
            </div>
            {sec.tasks.map(task => (
              <TaskRow key={task.id} task={task}
                taskState={taskStates[task.id]}
                onChange={patch => updateTask(task.id, patch)} />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
