
import { useState, useEffect, useCallback } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const TASKS = {
  0: {
    title: "הקמת אתר חדש מאפס",
    sections: [
      {
        name: "שלב 1 – מחקר ואסטרטגיה", tasks: [
          { id: "S1-01", cat: "מחקר מילות מפתח", freq: "חד-פעמי", explain: "מוצאים את כל הביטויים החשובים בנישה. מחלקים לארבע קטגוריות: מידע כללי, ניווט, השוואה, ורכישה. בכל ביטוי: כמות חיפושים, רמת תחרות, CPC.", tools: [{ n: "Google Keyword Planner", l: "https://ads.google.com/home/tools/keyword-planner/" }, { n: "Ahrefs / Semrush", l: "https://ahrefs.com" }, { n: "AnswerThePublic", l: "https://answerthepublic.com" }] },
          { id: "S1-02", cat: "שאלות ו-Long-tail", freq: "חד-פעמי", explain: "אוספים שאלות מה-People Also Ask, מפורומים ומביטויים ארוכים. כל שאלה = כותרת H2 פוטנציאלית או מאמר שלם. מנועי AI מציטטים תוכן שעונה על שאלות ספציפיות.", tools: [{ n: "AlsoAsked", l: "https://alsoasked.com" }, { n: "AnswerThePublic", l: "https://answerthepublic.com" }, { n: "Reddit (פורומים בנישה)", l: "https://reddit.com" }] },
          { id: "S1-03", cat: "ניתוח מתחרים", freq: "חד-פעמי", explain: "בוחנים 3-5 תוצאות ראשונות לכל ביטוי: כמות מילים, H2/H3, מדיה, קישורים נכנסים, DA/DR. אסור להעתיק — לנתח ולעשות טוב יותר.", tools: [{ n: "Ahrefs Site Explorer", l: "https://ahrefs.com/site-explorer" }, { n: "SimilarWeb", l: "https://similarweb.com" }, { n: "Semrush", l: "https://semrush.com" }] },
          { id: "S1-04", cat: "מבנה האתר (Silo)", freq: "חד-פעמי", explain: "ארכיטקטורת Silo = קיבוץ תוכן לנושאים מובחנים. כלל הזהב: מקסימום 3 קליקים מהדף הראשי לכל עמוד. /שירותים/ → /שירותים/בניית-אתרים/ → /וורדפרס/", tools: [{ n: "Whimsical (מפות חשיבה)", l: "https://whimsical.com" }, { n: "Miro", l: "https://miro.com" }, { n: "Google Sheets", l: "https://sheets.google.com" }] },
          { id: "S1-05", cat: "תכנון קישורים פנימיים", freq: "חד-פעמי", explain: "מאמרים בבלוג מקשרים תמיד כלפי מעלה לעמודי כסף. טקסט עוגן חשוב: 'לחץ כאן' = אפס ערך. 'בניית אתרי וורדפרס' = ערך SEO גבוה.", tools: [{ n: "Google Sheets (מטריצת קישורים)", l: "https://sheets.google.com" }, { n: "Ahrefs – Site Audit", l: "https://ahrefs.com" }] },
        ]
      },
      {
        name: "שלב 2 – הכנה לפני עלייה לאוויר", tasks: [
          { id: "S2-01", cat: "תגיות Meta לכל עמוד", freq: "חד-פעמי", explain: "כל URL: H1 אחד, Title עד 60 תווים (מילת מפתח + מותג), Description עד 155 תווים עם CTA. אין Title זהה לשני עמודים.", tools: [{ n: "RankMath / Yoast", l: "https://rankmath.com" }, { n: "SERP Simulator", l: "https://serpsim.com" }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }] },
          { id: "S2-02", cat: "בדיקת כותרות H בקוד", freq: "חד-פעמי", explain: "H1 אחד בלבד בכל עמוד. H2 = נושאי משנה. H3 = תת-נושאים. כותרות עיצוביות (פוטר, כפתורים) = div/p בלבד. בדיקה: F12 → חפשו <h2, <h3.", tools: [{ n: "HeadingsMap (Chrome)", l: "https://chrome.google.com/webstore" }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }] },
          { id: "S2-03", cat: "תמונות – אופטימיזציה", freq: "חד-פעמי", explain: "ממירים ל-WebP. רגילה <100kb, רקע <200kb. שמות קבצים: 'black-labrador-dog.webp' ולא 'IMG_4821.jpg'. Alt קצר ורלוונטי לכל תמונה.", tools: [{ n: "Squoosh (Google)", l: "https://squoosh.app" }, { n: "ShortPixel / Imagify", l: "https://shortpixel.com" }, { n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }] },
          { id: "S2-04", cat: "אלמנטים E-E-A-T", freq: "חד-פעמי", explain: "עמוד אודות עם תעודות וניסיון. תנאי שימוש + פרטיות. פרטי קשר מלאים בפוטר: טלפון, מייל, ח\"פ, כתובת. ללא זה — האתר נראה כספאם.", tools: [{ n: "Schema.org", l: "https://schema.org" }, { n: "Google QRG (PDF)", l: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf" }] },
          { id: "S2-05", cat: "סכמות (Structured Data)", freq: "חד-פעמי", explain: "JSON-LD לכל עמוד: Organization + LocalBusiness בדף הבית, Article לכל מאמר, Product לכל מוצר. מאפשר Rich Results (כוכבות, מחיר, FAQ) בתוצאות.", tools: [{ n: "Google Rich Results Test", l: "https://search.google.com/test/rich-results" }, { n: "Schema Markup Generator", l: "https://technicalseo.com/tools/schema-markup-generator/" }, { n: "RankMath Schema Module", l: "https://rankmath.com" }] },
        ]
      },
      {
        name: "שלב 3 – יום העלייה לאוויר", tasks: [
          { id: "S3-01", cat: "פותחים לסריקה", freq: "חד-פעמי", explain: "WP Admin → הגדרות → קריאה → הסירו 'מנע מנועי חיפוש'. טעות קלאסית: אתר עלה לאוויר אבל נשאר חסום לגוגל חודשים שלמים.", tools: [{ n: "GSC – URL Inspection", l: "https://search.google.com/search-console" }] },
          { id: "S3-02", cat: "הפניות 301", freq: "חד-פעמי", explain: "301 מעביר ~90% סמכות. הפנייה מדף ישן → לדף הנכון, לא לדף הבית. הפנייה לדף הבית = 'soft 404'. נהלו קובץ Sheets: URL ישן | URL חדש | סטטוס.", tools: [{ n: "Redirection (WordPress)", l: "https://wordpress.org/plugins/redirection/" }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }, { n: "Ahrefs – Broken Backlinks", l: "https://ahrefs.com" }] },
          { id: "S3-03", cat: "קובץ Robots.txt", freq: "חד-פעמי", explain: "חוסמים: /wp-admin/, /?s= (חיפוש פנימי), /tag/, /author/. robots.txt לא מונע אינדוקס — רק סריקה. לחסימת אינדוקס = meta noindex.", tools: [{ n: "GSC – robots.txt Tester", l: "https://search.google.com/search-console" }, { n: "RankMath", l: "https://rankmath.com" }, { n: "Robots.txt Generator", l: "https://www.seoptimer.com/robots-txt-generator" }] },
          { id: "S3-04", cat: "XML Sitemap", freq: "חד-פעמי", explain: "רק עמודי 200 OK, ללא noindex, ללא ארכיונים/תגיות. RankMath/Yoast יוצרים אוטומטית. חייבים להגיש ל-GSC.", tools: [{ n: "GSC – Sitemaps", l: "https://search.google.com/search-console" }, { n: "XML Sitemap Validator", l: "https://www.xml-sitemaps.com/validate-xml-sitemap.html" }] },
          { id: "S3-05", cat: "תעודת SSL", freq: "חד-פעמי", explain: "כל גרסאות האתר (http, http://www, https://www) → https:// ראשית. Cloudflare = SSL חינם + ניתוב אוטומטי.", tools: [{ n: "SSL Labs", l: "https://www.ssllabs.com/ssltest/" }, { n: "Cloudflare", l: "https://cloudflare.com" }, { n: "Really Simple SSL", l: "https://wordpress.org/plugins/really-simple-ssl/" }] },
        ]
      },
      {
        name: "שלב 4 – חיבור מערכות מעקב", tasks: [
          { id: "S4-01", cat: "Google Search Console", freq: "חד-פעמי", explain: "אימות ברמת DNS (מכסה כל הגרסאות). שלחו Sitemap מיד. GSC = הכלי החשוב ביותר ב-SEO.", tools: [{ n: "Google Search Console", l: "https://search.google.com/search-console" }] },
          { id: "S4-02", cat: "Google Tag Manager", freq: "חד-פעמי", explain: "קוד GTM אחד באתר → ניהול כל הכלים ממשק אחד. תוסף GTM4WP לוורדפרס = התקנה בלחיצה.", tools: [{ n: "Google Tag Manager", l: "https://tagmanager.google.com" }, { n: "GTM4WP", l: "https://wordpress.org/plugins/duracelltomi-google-tag-manager/" }, { n: "Tag Assistant (Chrome)", l: "https://chrome.google.com/webstore" }] },
          { id: "S4-03", cat: "Google Analytics 4", freq: "חד-פעמי", explain: "GA4 דרך GTM. הגדירו המרות: שליחת טופס, WhatsApp, חיוג, דף תודה. ללא המרות — לא יודעים מה עובד.", tools: [{ n: "Google Analytics 4", l: "https://analytics.google.com" }] },
          { id: "S4-04", cat: "חיבור בין מערכות", freq: "חד-פעמי", explain: "GA4 ↔ GSC: רואים ביטויים שהביאו תנועה. GA4 ↔ Google Ads: ROI משולב. GA4 → Admin → Product Links.", tools: [{ n: "GA4 – Product Links", l: "https://analytics.google.com" }] },
          { id: "S4-05", cat: "פרופיל עסק בגוגל (GBP)", freq: "חד-פעמי", explain: "עדכנו URL בפרופיל. NAP Consistency: שם, כתובת, טלפון זהים בדיוק בפרופיל ובאתר וגם בספריות חיצוניות.", tools: [{ n: "Google Business Profile", l: "https://business.google.com" }, { n: "BrightLocal (NAP)", l: "https://brightlocal.com" }] },
        ]
      },
      {
        name: "שלב 5 – בקרה ראשונית (14 ימים)", tasks: [
          { id: "S5-01", cat: "מעקב אינדוקס יומי", freq: "יומי / 14 יום", explain: "GSC → Pages → 'Indexed' לעמודי ליבה. 'Crawled but not indexed' = תוכן דל? 'Discovered but not indexed' = crawl budget נמוך. אפשר לבקש אינדוקס ידני.", tools: [{ n: "GSC – Pages Report", l: "https://search.google.com/search-console" }] },
          { id: "S5-02", cat: "בדיקת מהירות (PageSpeed)", freq: "שבועי / 14 יום", explain: "ציון 85+ במובייל = בסיס מינימלי. LCP <2.5s, CLS <0.1, INP <200ms. סיבות נפוצות לציון נמוך: תמונות כבדות, JS חוסם רינדור, שרת איטי.", tools: [{ n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }, { n: "GTmetrix", l: "https://gtmetrix.com" }] },
          { id: "S5-03", cat: "הזנה לכלי מעקב מיקומים", freq: "חד-פעמי", explain: "מזינים 20-50 ביטויים ראשיים עם מיקום התחלתי. ללא מעקב — לא יודעים אם ה-SEO עובד. GSC = ממוצע; כלי ייעודי = מיקום מדויק יומי.", tools: [{ n: "Ahrefs Rank Tracker", l: "https://ahrefs.com/rank-tracker" }, { n: "Semrush", l: "https://semrush.com" }, { n: "SerpRobot", l: "https://serprobot.com" }] },
        ]
      },
    ]
  },
  1: {
    title: "ריטיינר חודשי קבוע",
    sections: [
      {
        name: "שבוע 1 – בריאות טכנית", tasks: [
          { id: "W1-01", cat: "סריקה עם Screaming Frog", freq: "חודשי", explain: "מאתרים: 404 חדשים, הפניות שרשרתיות (A→B→C), תמונות שבורות, H1 חסר, כפילויות Title/Meta. חינמי עד 500 URL.", tools: [{ n: "Screaming Frog", l: "https://www.screamingfrog.co.uk/seo-spider/" }, { n: "Ahrefs – Site Audit", l: "https://ahrefs.com" }, { n: "GSC – Pages", l: "https://search.google.com/search-console" }] },
          { id: "W1-02", cat: "סריקת GSC – דוח Pages", freq: "חודשי", explain: "בדקו: 'Not indexed' (מה הסיבה?), 'Indexed, not in sitemap' (הוסיפו), 'Excluded by noindex' (בכוונה?). דוח Coverage = הכי חשוב.", tools: [{ n: "GSC – Pages Report", l: "https://search.google.com/search-console" }] },
          { id: "W1-03", cat: "Core Web Vitals", freq: "חודשי", explain: "נתוני שטח אמיתיים ממשתמשי Chrome. LCP <2.5s, CLS <0.1, INP <200ms. עמודים עם CWV טוב מקבלים תג 'Fast' בגוגל.", tools: [{ n: "GSC – Core Web Vitals", l: "https://search.google.com/search-console" }, { n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }] },
        ]
      },
      {
        name: "שבוע 2 – תוכן ואופטימיזציה", tasks: [
          { id: "W2-01", cat: "ביטויים 11-20 (פירות בגובה הרצוע)", freq: "חודשי", explain: "GSC → Performance → סנן Position 11-20 → מיין לפי Impressions. עמודים אלה: מוסיפים תוכן, מוסיפים H2, מוסיפים 2-3 קישורים פנימיים חזקים.", tools: [{ n: "GSC – Performance", l: "https://search.google.com/search-console" }, { n: "Ahrefs – Rank Tracker", l: "https://ahrefs.com" }, { n: "Surfer SEO", l: "https://surferseo.com" }] },
          { id: "W2-02", cat: "התאמה למנועי AI", freq: "חודשי", explain: "ב-3-5 עמודים מובילים: TL;DR בראש, טבלאות, רשימות ממוספרות, FAQ. כותרת 'מה זה X?' + תשובה ב-2 משפטים = הפורמט הכי נציטט ע\"י AI.", tools: [{ n: "Perplexity (בדיקת ציטוטים)", l: "https://perplexity.ai" }, { n: "RankMath – FAQ Block", l: "https://rankmath.com" }] },
          { id: "W2-03", cat: "שיפור CTR", freq: "חודשי", explain: "GSC → Performance → Impressions >500, CTR <3%. מוסיפים: מספרים, שנה, שאלה, הבטחה. Meta Description = טיזר. CTR גבוה = יותר תנועה באותו דירוג.", tools: [{ n: "GSC – Performance", l: "https://search.google.com/search-console" }, { n: "SERP Simulator", l: "https://serpsim.com" }, { n: "CoSchedule Headline Analyzer", l: "https://coschedule.com/headline-analyzer" }] },
        ]
      },
      {
        name: "שבוע 3 – קישורים ונוכחות חיצונית", tasks: [
          { id: "W3-01", cat: "קישורים נכנסים", freq: "חודשי", explain: "2-4 קישורים איכותיים בחודש > 50 זולים. גיוון עוגן: שם מותג (30%), URL (20%), מילת מפתח (30%), טבעי (20%). HARO = קישורים חינמיים מעיתונאים.", tools: [{ n: "Ahrefs – Content Explorer", l: "https://ahrefs.com/content-explorer" }, { n: "HARO / Connectively", l: "https://www.connectively.us" }, { n: "Google Alerts", l: "https://alerts.google.com" }] },
          { id: "W3-02", cat: "עדכון GBP", freq: "חודשי", explain: "2-3 תמונות אמיתיות. Google Post עם קישור לתוכן חדש (מופיע 7 ימים). מענה לביקורות עם מילות מפתח טבעיות: 'תודה שבחרתם ב[שם] לשירות [שירות] ב[עיר]'.", tools: [{ n: "Google Business Profile", l: "https://business.google.com" }, { n: "Canva (תמונות/פוסטים)", l: "https://canva.com" }] },
        ]
      },
      {
        name: "שבוע 4 – תוכן חדש ודיווח", tasks: [
          { id: "W4-01", cat: "מאמרים חדשים", freq: "חודשי", explain: "לפני פרסום: H1 עם מילת מפתח, Meta מלא, תמונה עם Alt, 2+ קישורים פנימיים, URL קצר עם מילת מפתח, 800+ מילים עם H2/H3.", tools: [{ n: "RankMath Content AI", l: "https://rankmath.com" }, { n: "Surfer SEO", l: "https://surferseo.com" }, { n: "Claude", l: "https://claude.ai" }] },
          { id: "W4-02", cat: "קישורים פנימיים מתוכן חדש", freq: "חודשי", explain: "מכל מאמר חדש: מינ' 2 קישורים לעמודי כסף. גם לאחור: מאמרים ישנים → קשרו לחדשים. Link Whisper מציע קישורים אוטומטית.", tools: [{ n: "Ahrefs – Internal Links", l: "https://ahrefs.com" }, { n: "Link Whisper", l: "https://linkwhisper.com" }] },
          { id: "W4-03", cat: "ניתוח נתונים ודיווח", freq: "חודשי", explain: "השוואה YoY (שנה לשנה) > MoM. הדוח כולל: תנועה אורגנית, מיקומים, המרות, מה בוצע, מה מתוכנן. Looker Studio = דשבורד אוטומטי חינמי.", tools: [{ n: "Google Looker Studio", l: "https://lookerstudio.google.com" }, { n: "AgencyAnalytics", l: "https://agencyanalytics.com" }] },
        ]
      },
    ]
  }
};

const STATUS_LABELS = ["לא התחלתי", "בתהליך", "בוצע ✓"];
const STATUS_COLORS = [
  { bg: "#F1EFE8", text: "#5F5E5A", border: "#B4B2A9" },
  { bg: "#FAEEDA", text: "#633806", border: "#EF9F27" },
  { bg: "#E1F5EE", text: "#085041", border: "#1D9E75" },
];

// ── STORAGE KEY ───────────────────────────────────────────────────────────────
function clientKey(name) { return `seo_client_${name.trim().toLowerCase().replace(/\s+/g, "_")}`; }

// ── COMPONENTS ────────────────────────────────────────────────────────────────
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
          <span style={{ marginRight: "auto", fontSize: 11, color: "#888780" }}>{t.l.replace("https://", "").split("/")[0]}</span>
        </a>
      ))}
    </div>
  );
}

function TaskRow({ task, taskState, onChange }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("explain");
  const st = taskState || { status: 0, checked: false, date: "", note: "" };

  function update(patch) { onChange({ ...st, ...patch }); }

  const sc = STATUS_COLORS[st.status];

  return (
    <div style={{ borderBottom: "0.5px solid #E5E3DC", padding: "10px 0", opacity: st.status === 2 ? 0.6 : 1 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        {/* Checkbox */}
        <button onClick={() => {
          const checked = !st.checked;
          update({ checked, status: checked ? 2 : st.status === 2 ? 0 : st.status });
        }}
          style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", border: st.checked ? "none" : "1.5px solid #B4B2A9", background: st.checked ? "#1D9E75" : "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
          {st.checked && <span style={{ color: "white", fontSize: 13 }}>✓</span>}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "#888780", fontFamily: "monospace" }}>{task.id}</span>
            <span style={{ fontSize: 14, fontWeight: 500, textDecoration: st.status === 2 ? "line-through" : "none", color: st.status === 2 ? "#888780" : "inherit" }}>{task.cat}</span>
            <Tag color={{ bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC" }}>{task.freq}</Tag>
            <button onClick={() => setOpen(o => !o)}
              style={{ marginRight: "auto", fontSize: 12, background: "none", border: "0.5px solid #D3D1C7", borderRadius: 6, padding: "2px 8px", cursor: "pointer", color: "#5F5E5A", display: "flex", alignItems: "center", gap: 4 }}>
              {open ? "▲ סגור" : "▼ פרטים"}
            </button>
          </div>

          {/* Controls */}
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

          {/* Detail panel */}
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

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home"); // home | checklist
  const [clientName, setClientName] = useState("");
  const [inputName, setInputName] = useState("");
  const [clients, setClients] = useState([]);
  const [tabIdx, setTabIdx] = useState(0);
  const [taskStates, setTaskStates] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load client list on mount
  useEffect(() => { loadClientList(); }, []);

  async function loadClientList() {
    try {
      const res = { keys: Object.keys(localStorage).filter(k => k.startsWith("seo_client_")) };
      if (res?.keys) {
        const names = res.keys.map(k => k.replace("seo_client_", "").replace(/_/g, " "));
        setClients(names);
      }
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

  // Stats
  function getStats(tabI) {
    const tab = TASKS[tabI];
    let done = 0, prog = 0, todo = 0, total = 0;
    tab.sections.forEach(s => s.tasks.forEach(t => {
      total++;
      const st = (taskStates[t.id] || {}).status || 0;
      if (st === 2) done++; else if (st === 1) prog++; else todo++;
    }));
    return { done, prog, todo, total };
  }

  // ── HOME ──
  if (screen === "home") {
    return (
      <div dir="rtl" style={{ padding: "2rem 1.5rem", maxWidth: 600, margin: "0 auto", fontFamily: "inherit" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 6 }}>צ׳קליסט SEO — ניהול לקוחות</div>
          <div style={{ fontSize: 14, color: "#5F5E5A" }}>כל הנתונים משותפים לכל הצוות ונשמרים אוטומטית</div>
        </div>

        {/* Open / New client */}
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

        {/* Existing clients */}
        {clients.length > 0 && (
          <div>
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
          <div style={{ fontSize: 13, color: "#888780", textAlign: "center", padding: "2rem 0" }}>
            עדיין אין לקוחות. הזן שם לקוח כדי להתחיל.
          </div>
        )}
      </div>
    );
  }

  // ── CHECKLIST ──
  const stats0 = getStats(0);
  const stats1 = getStats(1);
  const curStats = tabIdx === 0 ? stats0 : stats1;
  const pct = curStats.total ? Math.round(curStats.done / curStats.total * 100) : 0;

  return (
    <div dir="rtl" style={{ padding: "1rem 1rem 3rem", maxWidth: 700, margin: "0 auto", fontFamily: "inherit" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <button onClick={() => setScreen("home")}
          style={{ fontSize: 13, padding: "4px 10px", borderRadius: 6, border: "0.5px solid #D3D1C7", background: "none", cursor: "pointer", color: "#5F5E5A", fontFamily: "inherit" }}>
          ← חזרה
        </button>
        <span style={{ fontSize: 16, fontWeight: 500 }}>📁 {clientName}</span>
        {saving && <span style={{ fontSize: 12, color: "#888780", marginRight: "auto" }}>שומר...</span>}
        {!saving && lastSaved && <span style={{ fontSize: 12, color: "#1D9E75", marginRight: "auto" }}>✓ נשמר</span>}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, borderBottom: "0.5px solid #D3D1C7", marginBottom: "1rem" }}>
        {[
          { label: "🚀 הקמת אתר", stats: stats0 },
          { label: "📅 ריטיינר חודשי", stats: stats1 }
        ].map((t, i) => (
          <button key={i} onClick={() => setTabIdx(i)}
            style={{ padding: "8px 16px", fontSize: 13, border: "none", background: "none", cursor: "pointer", color: tabIdx === i ? "#2C2C2A" : "#888780", borderBottom: tabIdx === i ? "2px solid #7F77DD" : "2px solid transparent", fontWeight: tabIdx === i ? 500 : 400, fontFamily: "inherit" }}>
            {t.label}
            <span style={{ marginRight: 6, fontSize: 11, padding: "1px 6px", borderRadius: 10, background: tabIdx === i ? "#EEEDFE" : "#F1EFE8", color: tabIdx === i ? "#534AB7" : "#5F5E5A" }}>
              {t.stats.done}/{t.stats.total}
            </span>
          </button>
        ))}
      </div>

      {/* Stats */}
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

      {/* Progress bar */}
      <div style={{ height: 5, background: "#F1EFE8", borderRadius: 3, marginBottom: "1.5rem", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "#1D9E75", borderRadius: 3, transition: "width .3s" }} />
      </div>

      {loading ? <div style={{ textAlign: "center", color: "#888780", padding: "2rem" }}>טוען...</div> : (
        TASKS[tabIdx].sections.map((sec, si) => (
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
