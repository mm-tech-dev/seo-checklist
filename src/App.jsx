
import { useState, useEffect, useCallback } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const TASKS = {
  0: {
    title: "הקמת אתר חדש מאפס",
    icon: "🚀",
    short: "הקמת אתר חדש",
    sections: [
      {
        name: "שלב 1 - מחקר ואסטרטגיה", tasks: [
          { id: "NEW-01", cat: "מחקר מילות מפתח + כוונת חיפוש", freq: "חד-פעמי", explain: "ממפים את כל הביטויים בנישה ומסווגים לפי כוונת החיפוש: מידעי, ניווטי, מסחרי ורכישה. לכל ביטוי - נפח חיפוש, רמת תחרות ו-CPC. כוונת החיפוש קובעת את סוג העמוד: מאמר לכוונה מידעית, עמוד מכירה לכוונת רכישה. התאמה שגויה בין כוונה לעמוד = דירוג שלא יגיע לעולם.", tools: [{ n: "Google Keyword Planner", l: "https://ads.google.com/home/tools/keyword-planner/" }, { n: "Ahrefs / Semrush", l: "https://ahrefs.com" }, { n: "AnswerThePublic", l: "https://answerthepublic.com" }] },
          { id: "NEW-02", cat: "שאלות ו-Long-tail", freq: "חד-פעמי", explain: "אוספים שאלות מה-People Also Ask, מפורומים ומביטויים ארוכים. כל שאלה = כותרת H2 פוטנציאלית או מאמר שלם. מנועי AI מצטטים תוכן שעונה על שאלות ספציפיות, אז שאלה + תשובה ישירה = נכס כפול.", tools: [{ n: "AlsoAsked", l: "https://alsoasked.com" }, { n: "AnswerThePublic", l: "https://answerthepublic.com" }, { n: "Reddit (פורומים בנישה)", l: "https://reddit.com" }] },
          { id: "NEW-03", cat: "ניתוח מתחרים", freq: "חד-פעמי", explain: "בוחנים 3-5 תוצאות ראשונות לכל ביטוי: כמות מילים, H2/H3, מדיה, קישורים נכנסים, DA/DR. אסור להעתיק - לנתח, להבין למה הם מדרגים, ולעשות טוב יותר.", tools: [{ n: "Ahrefs Site Explorer", l: "https://ahrefs.com/site-explorer" }, { n: "SimilarWeb", l: "https://similarweb.com" }, { n: "Semrush", l: "https://semrush.com" }] },
          { id: "NEW-04", cat: "אשכולות תוכן (Topical Authority)", freq: "חד-פעמי", explain: "בונים אשכולות: עמוד עוגן (Pillar) רחב לכל נושא ליבה, ומסביבו 5-10 מאמרים תומכים שמקשרים אליו וזה לזה. כיסוי מלא של נושא מאותת לגוגל סמכות נושאית ומרים את כל האשכול יחד, לא עמוד בודד.", tools: [{ n: "Keyword Insights", l: "https://www.keywordinsights.ai" }, { n: "Whimsical", l: "https://whimsical.com" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
          { id: "NEW-05", cat: "מבנה האתר (Silo)", freq: "חד-פעמי", explain: "ארכיטקטורת Silo = קיבוץ תוכן לנושאים מובחנים. כלל הזהב: מקסימום 3 קליקים מהדף הראשי לכל עמוד. /שירותים/ ← /שירותים/בניית-אתרים/ ← /וורדפרס/.", tools: [{ n: "Whimsical (מפות חשיבה)", l: "https://whimsical.com" }, { n: "Miro", l: "https://miro.com" }, { n: "Google Sheets", l: "https://sheets.google.com" }] },
          { id: "NEW-06", cat: "תכנון קישורים פנימיים", freq: "חד-פעמי", explain: "מאמרים בבלוג מקשרים תמיד כלפי מעלה לעמודי כסף. טקסט עוגן חשוב: 'לחץ כאן' = אפס ערך. 'בניית אתרי וורדפרס' = ערך SEO גבוה.", tools: [{ n: "Google Sheets (מטריצת קישורים)", l: "https://sheets.google.com" }, { n: "Ahrefs - Site Audit", l: "https://ahrefs.com" }] },
          { id: "NEW-07", cat: "תכנון URL ומניעת קניבליזציה", freq: "חד-פעמי", explain: "מגדירים כתובת אחת לכל כוונת חיפוש, כדי ששני עמודים לא יתחרו על אותו ביטוי ויחלישו זה את זה. כתובות קצרות, עקביות, עם מילת המפתח. מתעדים הכל במפת אתר מתוכננת לפני שכותבים שורה.", tools: [{ n: "Google Sheets", l: "https://sheets.google.com" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
        ]
      },
      {
        name: "שלב 2 - תשתית טכנית", tasks: [
          { id: "NEW-08", cat: "דומיין ואחסון", freq: "חד-פעמי", explain: "בוחרים דומיין קצר וקל לזכירה, ואחסון מהיר (LiteSpeed / NVMe) הקרוב לקהל היעד. שרת איטי פוגע בקצב הסריקה ובחוויית המשתמש עוד לפני שכתבתם מילה אחת.", tools: [{ n: "Cloudways", l: "https://cloudways.com" }, { n: "Kinsta", l: "https://kinsta.com" }, { n: "SiteGround", l: "https://siteground.com" }] },
          { id: "NEW-09", cat: "סביבת Staging", freq: "חד-פעמי", explain: "מקימים סביבת בדיקה נפרדת לפיתוח ולשינויים, ועולים לאוויר רק אחרי בדיקה. סביבת staging חייבת להיות חסומה לאינדוקס (noindex), אחרת גוגל יאנדקס גרסת פיתוח כפולה.", tools: [{ n: "WP Staging", l: "https://wp-staging.com" }, { n: "Local by Flywheel", l: "https://localwp.com" }] },
          { id: "NEW-10", cat: "תעודת SSL / HTTPS", freq: "חד-פעמי", explain: "כל גרסאות האתר (http, http://www, https://www) מפנות ל-https:// הראשית. Cloudflare = SSL חינם וניתוב אוטומטי. מעורבת תוכן (mixed content) שוברת את מנעול האבטחה.", tools: [{ n: "SSL Labs", l: "https://www.ssllabs.com/ssltest/" }, { n: "Cloudflare", l: "https://cloudflare.com" }, { n: "Really Simple SSL", l: "https://wordpress.org/plugins/really-simple-ssl/" }] },
          { id: "NEW-11", cat: "מבנה Permalinks", freq: "חד-פעמי", explain: "WP ← הגדרות ← קישורים קבועים ← 'שם הפוסט'. נמנעים מ-?p=123 או מתאריכים בכתובת. קובעים את זה לפני עליית תוכן, אחרת תצטרכו מאות הפניות 301 בהמשך.", tools: [{ n: "WordPress", l: "https://wordpress.org" }] },
          { id: "NEW-12", cat: "התקנת תוסף SEO", freq: "חד-פעמי", explain: "מתקינים RankMath או Yoast ומגדירים: תבניות כותרות ברירת מחדל, חיבור ל-GSC, סכמת Organization. תוסף SEO אחד בלבד - שניים יוצרים תגיות כפולות והתנגשות.", tools: [{ n: "RankMath", l: "https://rankmath.com" }, { n: "Yoast SEO", l: "https://yoast.com" }] },
        ]
      },
      {
        name: "שלב 3 - תוכן ו-On-Page", tasks: [
          { id: "NEW-13", cat: "תגיות Meta לכל עמוד", freq: "חד-פעמי", explain: "כל URL: H1 אחד, Title עד 60 תווים (מילת מפתח + מותג), Description עד 155 תווים עם CTA. אין Title זהה לשני עמודים.", tools: [{ n: "RankMath / Yoast", l: "https://rankmath.com" }, { n: "SERP Simulator", l: "https://serpsim.com" }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }] },
          { id: "NEW-14", cat: "כותרות H בקוד", freq: "חד-פעמי", explain: "H1 אחד בלבד בכל עמוד. H2 = נושאי משנה. H3 = תת-נושאים. כותרות עיצוביות (פוטר, כפתורים) = div/p בלבד. בדיקה: F12 ← חפשו h2, h3.", tools: [{ n: "HeadingsMap (Chrome)", l: "https://chrome.google.com/webstore" }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }] },
          { id: "NEW-15", cat: "תגית Canonical", freq: "חד-פעמי", explain: "כל עמוד מצביע על עצמו כגרסה הראשית עם rel=canonical. מונע תוכן כפול מפרמטרים (?utm, ?sort, ?page) ומרכז את הסמכות בכתובת אחת במקום לפזר אותה.", tools: [{ n: "RankMath", l: "https://rankmath.com" }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }] },
          { id: "NEW-16", cat: "Open Graph + Twitter Cards", freq: "חד-פעמי", explain: "מגדירים תמונה, כותרת ותיאור לשיתוף ברשתות. בלי זה, שיתוף בפייסבוק או בוואטסאפ מציג קישור קירח בלי תמונה - והקליקים צונחים. בודקים בדיבאגר של פייסבוק.", tools: [{ n: "RankMath Social", l: "https://rankmath.com" }, { n: "Facebook Debugger", l: "https://developers.facebook.com/tools/debug/" }, { n: "OpenGraph.xyz", l: "https://www.opengraph.xyz" }] },
          { id: "NEW-17", cat: "תמונות - אופטימיזציה", freq: "חד-פעמי", explain: "ממירים ל-WebP. רגילה מתחת ל-100kb, רקע מתחת ל-200kb. שמות קבצים: 'black-labrador-dog.webp' ולא 'IMG_4821.jpg'. Alt קצר ורלוונטי לכל תמונה.", tools: [{ n: "Squoosh (Google)", l: "https://squoosh.app" }, { n: "ShortPixel / Imagify", l: "https://shortpixel.com" }, { n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }] },
          { id: "NEW-18", cat: "E-E-A-T וביו מחבר", freq: "חד-פעמי", explain: "עמוד אודות עם ניסיון ותעודות, ביו מחבר אמיתי לכל מאמר, פרטי קשר מלאים בפוטר (טלפון, מייל, ח\"פ, כתובת), תנאי שימוש ופרטיות. בלי אלה האתר נראה אנונימי וגוגל נותן בו פחות אמון.", tools: [{ n: "Schema.org", l: "https://schema.org" }, { n: "Google QRG (PDF)", l: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf" }] },
          { id: "NEW-19", cat: "Breadcrumbs + סכמה", freq: "חד-פעמי", explain: "פירורי לחם (בית ← קטגוריה ← עמוד) עם BreadcrumbList schema. משפר ניווט, מחזק את הקישור הפנימי, ומציג נתיב ברור בתוצאות החיפוש במקום כתובת ארוכה.", tools: [{ n: "RankMath", l: "https://rankmath.com" }, { n: "Rich Results Test", l: "https://search.google.com/test/rich-results" }] },
          { id: "NEW-20", cat: "סכמות (Structured Data)", freq: "חד-פעמי", explain: "JSON-LD לכל עמוד: Organization + LocalBusiness בדף הבית, Article לכל מאמר, Product לכל מוצר, FAQ היכן שרלוונטי. מאפשר Rich Results (כוכבות, מחיר, FAQ) בתוצאות.", tools: [{ n: "Rich Results Test", l: "https://search.google.com/test/rich-results" }, { n: "Schema Markup Generator", l: "https://technicalseo.com/tools/schema-markup-generator/" }, { n: "RankMath Schema", l: "https://rankmath.com" }] },
          { id: "NEW-21", cat: "נגישות (Accessibility)", freq: "חד-פעמי", explain: "אתר ישראלי מחויב בתקן נגישות (ת\"י 5568 / WCAG 2.0 AA): תגיות alt, ניגודיות צבעים, ניווט במקלדת, תפריט נגישות והצהרת נגישות. מעבר לחובה החוקית - נגישות תורמת ל-SEO וחוסכת תביעות.", tools: [{ n: "WAVE", l: "https://wave.webaim.org" }, { n: "axe DevTools", l: "https://www.deque.com/axe/devtools/" }, { n: "נגיש בקליק", l: "https://negishbaklick.co.il" }] },
        ]
      },
      {
        name: "שלב 4 - מוכנות AI / GEO", tasks: [
          { id: "NEW-22", cat: "קובץ llms.txt", freq: "חד-פעמי", explain: "מוסיפים llms.txt בשורש האתר שמפנה בוטים של AI לתוכן החשוב והמדויק. עם עליית ChatGPT ו-Perplexity כמקורות תנועה, נראות במנועי AI הופכת לערוץ בפני עצמו (GEO).", tools: [{ n: "llmstxt.org", l: "https://llmstxt.org" }, { n: "Google Search Console", l: "https://search.google.com/search-console" }] },
          { id: "NEW-23", cat: "הרשאות בוטים של AI", freq: "חד-פעמי", explain: "מחליטים מדעת אילו בוטים (GPTBot, ClaudeBot, PerplexityBot) מורשים לסרוק, דרך robots.txt. חסימה = אין ציטוט במנועי AI. פתיחה = נראות. זו החלטה עסקית, לא רק טכנית.", tools: [{ n: "Dark Visitors", l: "https://darkvisitors.com" }, { n: "robots.txt", l: "https://developers.google.com/search/docs/crawling-indexing/robots/intro" }] },
          { id: "NEW-24", cat: "תוכן מוכן לציטוט", freq: "חד-פעמי", explain: "בעמודי הליבה: תשובה ישירה בשני משפטים מתחת לכל כותרת שאלה, טבלאות, רשימות ממוספרות ו-FAQ. זה הפורמט שמנועי AI שולפים ומצטטים. בודקים אם Perplexity מצטט אתכם.", tools: [{ n: "Perplexity", l: "https://perplexity.ai" }, { n: "RankMath FAQ Block", l: "https://rankmath.com" }] },
        ]
      },
      {
        name: "שלב 5 - יום העלייה לאוויר", tasks: [
          { id: "NEW-25", cat: "פותחים לסריקה", freq: "חד-פעמי", explain: "WP Admin ← הגדרות ← קריאה ← הסירו 'מנע ממנועי חיפוש'. טעות קלאסית: אתר עלה לאוויר אבל נשאר חסום לגוגל חודשים שלמים.", tools: [{ n: "GSC - URL Inspection", l: "https://search.google.com/search-console" }] },
          { id: "NEW-26", cat: "הפניות 301", freq: "חד-פעמי", explain: "301 מעביר כ-90% מהסמכות. הפנייה מדף ישן לדף הנכון, לא לדף הבית. הפנייה לדף הבית = 'soft 404'. מנהלים קובץ Sheets: URL ישן | URL חדש | סטטוס.", tools: [{ n: "Redirection (WordPress)", l: "https://wordpress.org/plugins/redirection/" }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
          { id: "NEW-27", cat: "קובץ Robots.txt", freq: "חד-פעמי", explain: "חוסמים: /wp-admin/, /?s= (חיפוש פנימי), /tag/, /author/. robots.txt לא מונע אינדוקס - רק סריקה. לחסימת אינדוקס משתמשים ב-meta noindex.", tools: [{ n: "GSC - robots.txt Tester", l: "https://search.google.com/search-console" }, { n: "RankMath", l: "https://rankmath.com" }] },
          { id: "NEW-28", cat: "XML Sitemap", freq: "חד-פעמי", explain: "רק עמודי 200 OK, ללא noindex, ללא ארכיונים ותגיות. RankMath / Yoast יוצרים אוטומטית. חובה להגיש ל-GSC.", tools: [{ n: "GSC - Sitemaps", l: "https://search.google.com/search-console" }, { n: "XML Sitemap Validator", l: "https://www.xml-sitemaps.com/validate-xml-sitemap.html" }] },
          { id: "NEW-29", cat: "דף 404 מותאם", freq: "חד-פעמי", explain: "מעצבים דף 404 עם תיבת חיפוש, קישורים לעמודים מובילים וניווט ברור. דף 404 גנרי מבריח מבקרים; דף טוב מחזיר אותם למסע במקום לאבד אותם.", tools: [{ n: "WordPress Theme", l: "https://wordpress.org" }, { n: "GSC", l: "https://search.google.com/search-console" }] },
          { id: "NEW-30", cat: "בדיקת מובייל (Mobile-First)", freq: "חד-פעמי", explain: "גוגל מאנדקס לפי גרסת המובייל. בודקים שכל התוכן, הקישורים והסכמות קיימים גם במובייל, ושאין טקסט זעיר או כפתורים צפופים מדי. רוב התנועה היא ממובייל.", tools: [{ n: "Mobile-Friendly Test", l: "https://search.google.com/test/mobile-friendly" }, { n: "Chrome DevTools", l: "https://developer.chrome.com/docs/devtools/" }] },
        ]
      },
      {
        name: "שלב 6 - חיבור מערכות מעקב", tasks: [
          { id: "NEW-31", cat: "Google Search Console", freq: "חד-פעמי", explain: "אימות ברמת DNS (מכסה את כל הגרסאות). שולחים Sitemap מיד. GSC הוא הכלי החשוב ביותר ב-SEO - נתוני אמת מגוגל עצמו, בחינם.", tools: [{ n: "Google Search Console", l: "https://search.google.com/search-console" }] },
          { id: "NEW-32", cat: "Google Tag Manager", freq: "חד-פעמי", explain: "קוד GTM אחד באתר מאפשר ניהול כל הכלים מממשק אחד. תוסף GTM4WP לוורדפרס = התקנה בלחיצה.", tools: [{ n: "Google Tag Manager", l: "https://tagmanager.google.com" }, { n: "GTM4WP", l: "https://wordpress.org/plugins/duracelltomi-google-tag-manager/" }] },
          { id: "NEW-33", cat: "Google Analytics 4", freq: "חד-פעמי", explain: "GA4 דרך GTM. מגדירים המרות: שליחת טופס, וואטסאפ, חיוג, דף תודה. בלי המרות לא יודעים מה עובד ומה לא.", tools: [{ n: "Google Analytics 4", l: "https://analytics.google.com" }] },
          { id: "NEW-34", cat: "חיבור בין מערכות", freq: "חד-פעמי", explain: "GA4 עם GSC: רואים את הביטויים שהביאו תנועה. GA4 עם Google Ads: ROI משולב. GA4 ← Admin ← Product Links.", tools: [{ n: "GA4 - Product Links", l: "https://analytics.google.com" }] },
          { id: "NEW-35", cat: "פרופיל עסק בגוגל (GBP)", freq: "חד-פעמי", explain: "מעדכנים URL בפרופיל. NAP Consistency: שם, כתובת וטלפון זהים בדיוק בפרופיל, באתר ובספריות חיצוניות. חשוב במיוחד ל-SEO מקומי.", tools: [{ n: "Google Business Profile", l: "https://business.google.com" }, { n: "BrightLocal (NAP)", l: "https://brightlocal.com" }] },
          { id: "NEW-36", cat: "Bing Webmaster + IndexNow", freq: "חד-פעמי", explain: "מאמתים גם ב-Bing Webmaster Tools ומפעילים IndexNow לאינדוקס מהיר. Bing מזין גם את תוצאות ChatGPT ו-Copilot - אז זה ערוץ AI נוסף, לא רק מנוע משני.", tools: [{ n: "Bing Webmaster Tools", l: "https://www.bing.com/webmasters" }, { n: "IndexNow", l: "https://www.indexnow.org" }] },
        ]
      },
      {
        name: "שלב 7 - בקרה ראשונית (14 ימים)", tasks: [
          { id: "NEW-37", cat: "מעקב אינדוקס יומי", freq: "יומי / 14 יום", explain: "GSC ← Pages ← 'Indexed' לעמודי הליבה. 'Crawled but not indexed' = תוכן דל. 'Discovered but not indexed' = crawl budget נמוך. אפשר לבקש אינדוקס ידני.", tools: [{ n: "GSC - Pages Report", l: "https://search.google.com/search-console" }] },
          { id: "NEW-38", cat: "בדיקת מהירות (PageSpeed)", freq: "שבועי / 14 יום", explain: "ציון 85+ במובייל = בסיס מינימלי. LCP מתחת ל-2.5s, CLS מתחת ל-0.1, INP מתחת ל-200ms. סיבות נפוצות לציון נמוך: תמונות כבדות, JS שחוסם רינדור, שרת איטי.", tools: [{ n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }, { n: "GTmetrix", l: "https://gtmetrix.com" }] },
          { id: "NEW-39", cat: "הזנה לכלי מעקב מיקומים", freq: "חד-פעמי", explain: "מזינים 20-50 ביטויים ראשיים עם מיקום התחלתי. בלי מעקב לא יודעים אם ה-SEO עובד. GSC נותן ממוצע; כלי ייעודי נותן מיקום מדויק יומי.", tools: [{ n: "Ahrefs Rank Tracker", l: "https://ahrefs.com/rank-tracker" }, { n: "Semrush", l: "https://semrush.com" }, { n: "SerpRobot", l: "https://serprobot.com" }] },
        ]
      },
    ]
  },
  1: {
    title: "אתר ותיק - אבחון ושיקום",
    icon: "🔍",
    short: "אתר ותיק - אבחון",
    sections: [
      {
        name: "שלב 1 - אבחון טכני מקיף", tasks: [
          { id: "VET-01", cat: "סריקה מלאה של האתר", freq: "חד-פעמי / רבעוני", explain: "סורקים את כל האתר ב-Screaming Frog ומייצאים: 404, הפניות, כותרות חסרות או כפולות, עומק קליקים, עמודים דקים. זו תמונת המצב שממנה נגזרת כל תכנית השיקום.", tools: [{ n: "Screaming Frog", l: "https://www.screamingfrog.co.uk/seo-spider/" }, { n: "Sitebulb", l: "https://sitebulb.com" }, { n: "Ahrefs Site Audit", l: "https://ahrefs.com" }] },
          { id: "VET-02", cat: "אינדוקס ו-Index Bloat", freq: "חד-פעמי / רבעוני", explain: "ב-GSC בודקים כמה עמודים מאונדקסים מול כמה אמורים להיות. ניפוח אינדקס (תגיות, ארכיונים, פרמטרים, עמודי חיפוש) מבזבז את תקציב הסריקה על זבל. מנקים ב-noindex.", tools: [{ n: "GSC - Pages", l: "https://search.google.com/search-console" }, { n: "site: operator", l: "https://www.google.com" }] },
          { id: "VET-03", cat: "הפניות שרשרת ולולאות", freq: "חד-פעמי / רבעוני", explain: "מאתרים שרשראות A←B←C ולולאות 301. כל קפיצה מאבדת סמכות וזמן סריקה. מקצרים לכל היותר לקפיצה אחת ישירה ליעד הסופי.", tools: [{ n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }, { n: "Redirect Path (Chrome)", l: "https://chrome.google.com/webstore" }] },
          { id: "VET-04", cat: "עמודים יתומים", freq: "חד-פעמי", explain: "עמודים בלי אף קישור פנימי - גוגל בקושי מגיע אליהם והם נחלשים. מצליבים את ה-sitemap מול תוצאות הסריקה כדי לאתר אותם ולשלב בקישור הפנימי.", tools: [{ n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
          { id: "VET-05", cat: "קניבליזציה של מילות מפתח", freq: "חד-פעמי / רבעוני", explain: "מאתרים כמה עמודים שמדרגים לאותו ביטוי ומחלישים זה את זה. ב-GSC: ביטוי אחד עם כמה כתובות מתחלפות. פותרים במיזוג, ב-canonical או בהבחנת כוונת חיפוש.", tools: [{ n: "GSC - Performance", l: "https://search.google.com/search-console" }, { n: "Ahrefs", l: "https://ahrefs.com" }, { n: "Keyword Insights", l: "https://www.keywordinsights.ai" }] },
          { id: "VET-06", cat: "Core Web Vitals מעמיק", freq: "חד-פעמי / רבעוני", explain: "בודקים נתוני שטח אמיתיים (CrUX): LCP, CLS ו-INP לכל תבנית עמוד בנפרד. מתעדפים קודם את התבניות עם הכי הרבה תנועה, שם השיפור משפיע הכי הרבה.", tools: [{ n: "GSC - Core Web Vitals", l: "https://search.google.com/search-console" }, { n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }, { n: "Treo", l: "https://treo.sh" }] },
        ]
      },
      {
        name: "שלב 2 - אבחון תוכן", tasks: [
          { id: "VET-07", cat: "מצאי תוכן מלא", freq: "חד-פעמי", explain: "מייצאים את כל הכתובות עם המדדים: תנועה, מיקום, קישורים, תאריך עדכון אחרון, מספר מילים. זו הטבלה שעליה מחליטים לכל עמוד: לשמר, לרענן, למזג או למחוק.", tools: [{ n: "Screaming Frog + GA4/GSC", l: "https://www.screamingfrog.co.uk" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
          { id: "VET-08", cat: "תוכן דל ודועך (Decay)", freq: "חד-פעמי / רבעוני", explain: "מזהים עמודים עם אפס תנועה ב-12 חודשים ותוכן דק. content decay = עמודים שדירגו בעבר וירדו עם הזמן. מסמנים אותם לטיפול לפי גודל ההזדמנות.", tools: [{ n: "GSC", l: "https://search.google.com/search-console" }, { n: "GA4", l: "https://analytics.google.com" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
          { id: "VET-09", cat: "גיזום תוכן (Prune)", freq: "חד-פעמי", explain: "מחליטים פעולה לכל עמוד חלש: מיזוג לעמוד חזק (301), שכתוב או הסרה. מעט עמודים חזקים עדיפים על הרבה חלשים - זה מרכז את הסמכות ואת תקציב הסריקה היכן שחשוב.", tools: [{ n: "Google Sheets", l: "https://sheets.google.com" }, { n: "Redirection", l: "https://wordpress.org/plugins/redirection/" }] },
          { id: "VET-10", cat: "רענון תוכן ישן", freq: "חד-פעמי / חודשי", explain: "מעדכנים מאמרים שדירגו וירדו: נתונים עדכניים, כותרות חדשות, קישורים פנימיים, סכמה ותאריך עדכון. רענון לרוב מחזיר מיקומים מהר יותר מכתיבת תוכן חדש מאפס.", tools: [{ n: "GSC", l: "https://search.google.com/search-console" }, { n: "Surfer SEO", l: "https://surferseo.com" }, { n: "Clearscope", l: "https://www.clearscope.io" }] },
          { id: "VET-11", cat: "פערי תוכן מול מתחרים", freq: "חד-פעמי / רבעוני", explain: "מזהים ביטויים שמתחרים מדרגים עליהם ואתם לא, ונושאים חסרים באשכולות שלכם. כל פער = הזדמנות תוכן מתועדפת לפי נפח ותחרות.", tools: [{ n: "Ahrefs Content Gap", l: "https://ahrefs.com" }, { n: "Semrush", l: "https://semrush.com" }] },
        ]
      },
      {
        name: "שלב 3 - קישורים וסמכות", tasks: [
          { id: "VET-12", cat: "ביקורת פרופיל קישורים", freq: "חד-פעמי / רבעוני", explain: "ממפים את כל הקישורים הנכנסים: כמות דומיינים מפנים, איכותם וגיוון העוגנים. משווים למתחרים כדי להבין את פער הסמכות (Domain Rating) ולתעדף בנייה.", tools: [{ n: "Ahrefs", l: "https://ahrefs.com" }, { n: "Semrush", l: "https://semrush.com" }, { n: "GSC - Links", l: "https://search.google.com/search-console" }] },
          { id: "VET-13", cat: "ניקוי קישורים רעילים", freq: "חד-פעמי", explain: "מזהים קישורים ספאמיים מרשתות PBN או מספריות זבל. קודם מנסים הסרה ידנית, ורק לקישורים מזיקים באמת משתמשים ב-Disavow. כלי מסוכן - שימוש זהיר בלבד.", tools: [{ n: "Ahrefs", l: "https://ahrefs.com" }, { n: "Google Disavow Tool", l: "https://search.google.com/search-console/disavow-links" }] },
          { id: "VET-14", cat: "שחזור קישורים אבודים", freq: "חד-פעמי / רבעוני", explain: "מאתרים קישורים שהיו ונעלמו, או שמצביעים כעת ל-404. פונים לאתר המקשר, או מפנים 301 את הכתובת השבורה. זו סמכות שכבר הרווחתם ושזולגת לריק.", tools: [{ n: "Ahrefs - Lost/Broken", l: "https://ahrefs.com" }, { n: "GSC", l: "https://search.google.com/search-console" }] },
          { id: "VET-15", cat: "הזדמנויות קישור חדשות", freq: "חד-פעמי / חודשי", explain: "ממפים מקורות קישור איכותיים: אזכורי מותג בלי קישור, דפי משאבים, HARO. 2-4 קישורים איכותיים בחודש שווים יותר מ-50 זולים.", tools: [{ n: "Ahrefs Content Explorer", l: "https://ahrefs.com/content-explorer" }, { n: "Connectively (HARO)", l: "https://www.connectively.us" }, { n: "Google Alerts", l: "https://alerts.google.com" }] },
        ]
      },
      {
        name: "שלב 4 - שחזור ביצועים", tasks: [
          { id: "VET-16", cat: "עמודים בירידה", freq: "חד-פעמי / חודשי", explain: "ב-GSC משווים תקופה מול תקופה ומסמנים עמודים שאיבדו קליקים או מיקום. אלה הזוכים המהירים: עמוד שכבר דירג טוב צריך פחות מאמץ כדי לחזור.", tools: [{ n: "GSC - Performance", l: "https://search.google.com/search-console" }, { n: "Looker Studio", l: "https://lookerstudio.google.com" }] },
          { id: "VET-17", cat: "בדיקת פעולה ידנית", freq: "חד-פעמי", explain: "בודקים ב-GSC ← Security & Manual Actions אם הוטל עונש ידני. אם כן - מתקנים את הסיבה (קישורים, ספאם, תוכן) ומגישים בקשת בדיקה חוזרת מנומקת.", tools: [{ n: "GSC - Manual Actions", l: "https://search.google.com/search-console" }] },
          { id: "VET-18", cat: "השפעת עדכוני אלגוריתם", freq: "חד-פעמי", explain: "מצליבים ירידות תנועה מול תאריכי עדכוני ליבה של גוגל. ירידה שחופפת לעדכון מצביעה על בעיית איכות או E-E-A-T, לא על תקלה טכנית - והפתרון שונה לגמרי.", tools: [{ n: "Google Search Status", l: "https://status.search.google.com" }, { n: "Semrush Sensor", l: "https://www.semrush.com/sensor/" }] },
          { id: "VET-19", cat: "הזדמנויות SERP Features", freq: "חד-פעמי / רבעוני", explain: "מזהים ביטויים עם Featured Snippet, People Also Ask או Image Pack שאפשר לכבוש. מתאימים את הפורמט: תשובה קצרה לסניפט, רשימה או טבלה.", tools: [{ n: "Ahrefs", l: "https://ahrefs.com" }, { n: "Semrush", l: "https://semrush.com" }, { n: "AlsoAsked", l: "https://alsoasked.com" }] },
        ]
      },
      {
        name: "שלב 5 - תכנית צמיחה", tasks: [
          { id: "VET-20", cat: "תיעדוף לפי impact", freq: "חד-פעמי", explain: "מדרגים את כל הממצאים במטריצת השפעה מול מאמץ. מתחילים מ-Quick Wins: השפעה גבוהה ומאמץ נמוך. כך מראים תוצאות מהר ובונים מומנטום.", tools: [{ n: "Google Sheets", l: "https://sheets.google.com" }, { n: "Notion", l: "https://notion.so" }] },
          { id: "VET-21", cat: "מפת דרכים תוכן", freq: "חד-פעמי", explain: "בונים יומן תוכן ל-6-12 חודשים שסוגר את הפערים ומחזק אשכולות חלשים. עקביות לאורך זמן מנצחת ספרינטים קצרים וחד-פעמיים.", tools: [{ n: "Google Sheets", l: "https://sheets.google.com" }, { n: "Notion", l: "https://notion.so" }, { n: "Asana", l: "https://asana.com" }] },
          { id: "VET-22", cat: "חיזוק E-E-A-T", freq: "חד-פעמי", explain: "מחזקים אמון: ביו מחברים, מקורות וציטוטים, ביקורות, חותמת 'נכתב/עודכן בתאריך', עמוד אודות עשיר. קריטי במיוחד בנישות YMYL (בריאות, כסף, משפט).", tools: [{ n: "Schema.org", l: "https://schema.org" }, { n: "Google QRG", l: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf" }] },
        ]
      },
    ]
  },
  2: {
    title: "ריטיינר חודשי קבוע",
    icon: "📅",
    short: "ריטיינר חודשי",
    sections: [
      {
        name: "שבוע 1 - בריאות טכנית", tasks: [
          { id: "RET-01", cat: "סריקה עם Screaming Frog", freq: "חודשי", explain: "מאתרים: 404 חדשים, הפניות שרשרת (A←B←C), תמונות שבורות, H1 חסר, כפילויות Title/Meta. הגרסה החינמית עד 500 כתובות.", tools: [{ n: "Screaming Frog", l: "https://www.screamingfrog.co.uk/seo-spider/" }, { n: "Ahrefs - Site Audit", l: "https://ahrefs.com" }] },
          { id: "RET-02", cat: "סריקת GSC - דוח Pages", freq: "חודשי", explain: "בודקים: 'Not indexed' (מה הסיבה?), 'Indexed, not in sitemap' (להוסיף), 'Excluded by noindex' (בכוונה?). דוח Coverage = החשוב ביותר לבריאות האתר.", tools: [{ n: "GSC - Pages Report", l: "https://search.google.com/search-console" }] },
          { id: "RET-03", cat: "Core Web Vitals", freq: "חודשי", explain: "נתוני שטח אמיתיים ממשתמשי Chrome. LCP מתחת ל-2.5s, CLS מתחת ל-0.1, INP מתחת ל-200ms. עמודים עם CWV טוב מקבלים יתרון דירוג.", tools: [{ n: "GSC - Core Web Vitals", l: "https://search.google.com/search-console" }, { n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }] },
          { id: "RET-04", cat: "ניטור עדכוני אלגוריתם", freq: "חודשי", explain: "עוקבים אחרי הכרזות עדכוני ליבה ותנודות SERP. בזמן עדכון פעיל לא מבצעים שינויים דרסטיים - מתעדים את התנועה ומחכים שהמצב יתייצב לפני מסקנות.", tools: [{ n: "Google Search Status", l: "https://status.search.google.com" }, { n: "Semrush Sensor", l: "https://www.semrush.com/sensor/" }] },
        ]
      },
      {
        name: "שבוע 2 - תוכן ואופטימיזציה", tasks: [
          { id: "RET-05", cat: "ביטויים 11-20 (פירות בהישג יד)", freq: "חודשי", explain: "GSC ← Performance ← סינון Position 11-20 ← מיון לפי Impressions. בעמודים אלה: מוסיפים תוכן, מוסיפים H2 ומחזקים ב-2-3 קישורים פנימיים. דחיפה קטנה מקפיצה לעמוד הראשון.", tools: [{ n: "GSC - Performance", l: "https://search.google.com/search-console" }, { n: "Surfer SEO", l: "https://surferseo.com" }] },
          { id: "RET-06", cat: "התאמה למנועי AI (GEO)", freq: "חודשי", explain: "ב-3-5 עמודים מובילים: TL;DR בראש, טבלאות, רשימות ממוספרות ו-FAQ. כותרת 'מה זה X?' עם תשובה בשני משפטים = הפורמט שמנועי AI מצטטים. בודקים ציטוטים ב-Perplexity.", tools: [{ n: "Perplexity", l: "https://perplexity.ai" }, { n: "RankMath - FAQ Block", l: "https://rankmath.com" }] },
          { id: "RET-07", cat: "שיפור CTR", freq: "חודשי", explain: "GSC ← Performance ← Impressions מעל 500 עם CTR מתחת ל-3%. מוסיפים לכותרת: מספרים, שנה, שאלה או הבטחה. Meta Description = טיזר. CTR גבוה = יותר תנועה באותו דירוג.", tools: [{ n: "GSC - Performance", l: "https://search.google.com/search-console" }, { n: "SERP Simulator", l: "https://serpsim.com" }] },
          { id: "RET-08", cat: "רענון תוכן ישן", freq: "חודשי", explain: "כל חודש בוחרים 1-2 מאמרים שדירגו וירדו ומרעננים אותם: נתונים, כותרות, קישורים, סכמה ותאריך. שגרת רענון שומרת על הנכסים הקיימים, לא רק יוצרת חדשים.", tools: [{ n: "GSC", l: "https://search.google.com/search-console" }, { n: "Surfer SEO", l: "https://surferseo.com" }] },
        ]
      },
      {
        name: "שבוע 3 - קישורים ונוכחות חיצונית", tasks: [
          { id: "RET-09", cat: "קישורים נכנסים", freq: "חודשי", explain: "2-4 קישורים איכותיים בחודש שווים יותר מ-50 זולים. גיוון עוגן: שם מותג (30%), URL (20%), מילת מפתח (30%), טבעי (20%). HARO = קישורים חינמיים מעיתונאים.", tools: [{ n: "Ahrefs Content Explorer", l: "https://ahrefs.com/content-explorer" }, { n: "Connectively (HARO)", l: "https://www.connectively.us" }, { n: "Google Alerts", l: "https://alerts.google.com" }] },
          { id: "RET-10", cat: "עדכון GBP", freq: "חודשי", explain: "2-3 תמונות אמיתיות. Google Post עם קישור לתוכן חדש (מופיע 7 ימים). מענה לביקורות עם מילות מפתח טבעיות: 'תודה שבחרתם ב[שם] לשירות [שירות] ב[עיר]'.", tools: [{ n: "Google Business Profile", l: "https://business.google.com" }, { n: "Canva", l: "https://canva.com" }] },
          { id: "RET-11", cat: "ניטור אזכורי מותג", freq: "חודשי", explain: "עוקבים אחרי אזכורי המותג ברשת. אזכור בלי קישור = הזדמנות קישור בפנייה קצרה; ביקורת שלילית = טיפול מהיר במוניטין לפני שהיא מתפשטת.", tools: [{ n: "Google Alerts", l: "https://alerts.google.com" }, { n: "Ahrefs", l: "https://ahrefs.com" }, { n: "Brand24", l: "https://brand24.com" }] },
        ]
      },
      {
        name: "שבוע 4 - תוכן חדש ודיווח", tasks: [
          { id: "RET-12", cat: "מאמרים חדשים", freq: "חודשי", explain: "לפני פרסום: H1 עם מילת מפתח, Meta מלא, תמונה עם Alt, 2+ קישורים פנימיים, URL קצר עם מילת מפתח, תוכן שמכסה את הנושא במלואו עם H2/H3.", tools: [{ n: "RankMath Content AI", l: "https://rankmath.com" }, { n: "Surfer SEO", l: "https://surferseo.com" }, { n: "Claude", l: "https://claude.ai" }] },
          { id: "RET-13", cat: "קישורים פנימיים מתוכן חדש", freq: "חודשי", explain: "מכל מאמר חדש: מינימום 2 קישורים לעמודי כסף. גם לאחור: מאמרים ישנים מקשרים לחדשים. Link Whisper מציע קישורים אוטומטית.", tools: [{ n: "Ahrefs - Internal Links", l: "https://ahrefs.com" }, { n: "Link Whisper", l: "https://linkwhisper.com" }] },
          { id: "RET-14", cat: "ניתוח נתונים ודיווח", freq: "חודשי", explain: "השוואה YoY (שנה לשנה) עדיפה על MoM כי היא מנטרלת עונתיות. הדוח כולל: תנועה אורגנית, מיקומים, המרות, מה בוצע ומה מתוכנן. Looker Studio = דשבורד אוטומטי בחינם.", tools: [{ n: "Google Looker Studio", l: "https://lookerstudio.google.com" }, { n: "AgencyAnalytics", l: "https://agencyanalytics.com" }] },
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
          <div style={{ fontSize: 14, color: "#5F5E5A" }}>שלושה מסלולים: הקמת אתר חדש, אבחון אתר ותיק, וריטיינר חודשי. נשמר אוטומטית בדפדפן.</div>
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
  const curStats = getStats(tabIdx);
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
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "0.5px solid #D3D1C7", marginBottom: "1rem" }}>
        {Object.keys(TASKS).map(k => {
          const i = Number(k);
          const s = getStats(i);
          return (
            <button key={i} onClick={() => setTabIdx(i)}
              style={{ padding: "8px 16px", fontSize: 13, border: "none", background: "none", cursor: "pointer", color: tabIdx === i ? "#2C2C2A" : "#888780", borderBottom: tabIdx === i ? "2px solid #7F77DD" : "2px solid transparent", fontWeight: tabIdx === i ? 500 : 400, fontFamily: "inherit" }}>
              {TASKS[i].icon} {TASKS[i].short}
              <span style={{ marginRight: 6, fontSize: 11, padding: "1px 6px", borderRadius: 10, background: tabIdx === i ? "#EEEDFE" : "#F1EFE8", color: tabIdx === i ? "#534AB7" : "#5F5E5A" }}>
                {s.done}/{s.total}
              </span>
            </button>
          );
        })}
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
