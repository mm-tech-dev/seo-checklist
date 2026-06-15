// ============================================================================
//  תוכן הצ'ק-ליסט - קובץ עריכה
//  ---------------------------------------------------------------------------
//  אפשר לערוך גם ויזואלית דרך כפתור "עריכת תוכן" באפליקציה (מומלץ),
//  או ידנית כאן. זה הקובץ היחיד שצריך לגעת בו לשינוי סעיפים.
//
//  מבנה של סעיף (הכל בשורה אחת):
//    { id: "מזהה", cat: "שם הסעיף", freq: "תדירות", explain: "הסבר", tools: [{ n: "שם כלי", l: "https://קישור" }] },
//
//  כללים: כל שורת סעיף מסתיימת בפסיק | טקסט במרכאות כפולות | מרכאה בתוך טקסט = \"
//         מקף רגיל בלבד ( - ) | id ייחודי לכל סעיף
//
//  שני מסלולים:  0 = הקמת אתר חדש  |  1 = אתר ותיק - אופטימיזציה
// ============================================================================

export const TASKS = {
  0: {
    title: "הקמת אתר חדש",
    icon: "🚀",
    short: "הקמת אתר חדש",
    sections: [
      {
        name: "שלב 1 - מחקר ואסטרטגיה", tasks: [
          { id: "NEW-01", cat: "ניתוח מתחרים", freq: "חד-פעמי", explain: "בוחנים 3-5 תוצאות ראשונות לכל ביטוי: כמות מילים, H2/H3, מדיה, קישורים נכנסים, DA/DR. אסור להעתיק - לנתח, להבין למה הם מדרגים, ולעשות טוב יותר.\nהבוט של מחקר מילות מפתח עושה את זה מדהים.", tools: [{ n: "Ahrefs Site Explorer", l: "https://ahrefs.com/site-explorer" }, { n: "הבוט של מחקר מילות מפתח", l: "" }] },
          { id: "NEW-02", cat: "מחקר מילות מפתח + כוונת חיפוש", freq: "חד-פעמי", explain: "ממפים את כל הביטויים בנישה ומסווגים לפי כוונת החיפוש: מידעי, ניווטי, מסחרי ורכישה. לכל ביטוי - נפח חיפוש, רמת תחרות ו-CPC. כוונת החיפוש קובעת את סוג העמוד: מאמר לכוונה מידעית, עמוד מכירה לכוונת רכישה. התאמה שגויה בין כוונה לעמוד = דירוג שלא יגיע לעולם.", tools: [{ n: "Google Keyword Planner", l: "https://ads.google.com/home/tools/keyword-planner/" }, { n: "Ahrefs / Semrush", l: "https://ahrefs.com" }, { n: "בוט מומחה מחקר מילות מפתח - GPT", l: "https://chatgpt.com/g/g-6a145d9556d0819192ce6255c0c346da-mvmkhh-mkhqr-mylvt-mptkh" }] },
          { id: "NEW-03", cat: "שאלות ו-Long-tail", freq: "חד-פעמי", explain: "אוספים שאלות מה-People Also Ask, מפורומים ומביטויים ארוכים. כל שאלה = כותרת H2 פוטנציאלית או מאמר שלם. מנועי AI מצטטים תוכן שעונה על שאלות ספציפיות, אז שאלה + תשובה ישירה = נכס כפול.", tools: [{ n: "AlsoAsked", l: "https://alsoasked.com" }, { n: "AnswerThePublic", l: "https://answerthepublic.com" }, { n: "GOOGLE", l: "" }] },
          { id: "NEW-04", cat: "אשכולות תוכן (Topical Authority) / מאמרי seo על פי הסכם", freq: "חד-פעמי", explain: "בונים אשכולות: עמוד עוגן (Pillar) רחב לכל נושא ליבה, ומסביבו 5-10 מאמרים תומכים שמקשרים אליו וזה לזה. כיסוי מלא של נושא מאותת לגוגל סמכות נושאית ומרים את כל האשכול יחד, לא עמוד בודד.\nאו מאמרי SEO רגילים.\nללקוחות GEO / גדולים ספציפיים מקבלים אשכולות תוכן,\nעושים בקלוד/ גוני הסוכן.", tools: [{ n: "claude", l: "" }] },
          { id: "NEW-05", cat: "מבנה האתר (Silo)", freq: "חד-פעמי", explain: "ארכיטקטורת Silo = קיבוץ תוכן לנושאים מובחנים. כלל הזהב: מקסימום 3 קליקים מהדף הראשי לכל עמוד. /שירותים/ ← /שירותים/בניית-אתרים/ ← /וורדפרס/.\nלוודא.", tools: [{ n: "Miro", l: "https://miro.com" }, { n: "Google Sheets", l: "https://sheets.google.com" }] },
          { id: "NEW-06", cat: "תכנון קישורים פנימיים", freq: "חד-פעמי", explain: "מאמרים בבלוג מקשרים תמיד כלפי מעלה לעמודי כסף. טקסט עוגן חשוב: 'לחץ כאן' = אפס ערך. 'בניית אתרי וורדפרס' = ערך SEO גבוה.\nלבדוק בכל המאמרים שהם תקינים גם קישורים וגם האנקור+ קישורים פנימיים בין קטגוריות.", tools: [] },
          { id: "NEW-07", cat: "תכנון URL ומניעת קניבליזציה", freq: "חד-פעמי", explain: "עושים בדיקת קניבליזציה כללית לאתר.", tools: [{ n: "Google Sheets", l: "https://sheets.google.com" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
          { id: "NEW-08", cat: "בלוג+ אודות", freq: "חד-פעמי", explain: "בדיקה שיש באתר עמוד בלוג + עמוד אודות.", tools: [] },
        ]
      },
      {
        name: "שלב 2 - תשתית טכנית", tasks: [
          { id: "NEW-09", cat: "תעודת SSL / HTTPS", freq: "חד-פעמי", explain: "כל גרסאות האתר (http, http://www, https://www) מפנות ל-https:// הראשית. Cloudflare = SSL חינם וניתוב אוטומטי.\nלבדוק בקישור שיש HTTPS.", tools: [] },
          { id: "NEW-10", cat: "סידור מבנה Permalinks", freq: "חד-פעמי", explain: "WP ← הגדרות ← קישורים קבועים ← 'שם הפוסט'. נמנעים מ-?p=123 או מתאריכים בכתובת. קובעים את זה לפני עליית תוכן, אחרת תצטרכו מאות הפניות 301 בהמשך.\nלוודא בהגדרות של וורדפרס.", tools: [{ n: "WordPress", l: "https://wordpress.org" }] },
          { id: "NEW-11", cat: "לוודא שישי תוסף SEO אחד בלבד.", freq: "חד-פעמי", explain: "מתקינים RankMath או Yoast מוודאים שיש רק אחד. \nכשיש שניים הם מתנגשים ויוצרים שגיאות.", tools: [{ n: "RankMath", l: "https://rankmath.com" }, { n: "Yoast SEO", l: "https://yoast.com" }] },
        ]
      },
      {
        name: "שלב 3 - תוכן ו-On-Page", tasks: [
          { id: "NEW-12", cat: "תגיות Meta לכל עמוד", freq: "חד-פעמי", explain: "מטא טייטל: בין 55 ל- 60 תווים, מבנה: מילת מפתח - 3 4 מילים להעלת אחוזי ההקלקה | ושם המותג \n מטא דסקריפשן: בין 150 ל- 160 תווים, מבנה: מילת מפתח... הסבר על המותג ומה מציעים לעורר סקרנות ... ובסוף הנעה לפעולה. ( בפסקה אחת) ", tools: [{ n: "RankMath / Yoast", l: "https://rankmath.com" }, { n: "SERP Simulator", l: "https://serpsim.com" }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }] },
          { id: "NEW-13", cat: "כותרות H1,H2,H3......", freq: "חד-פעמי", explain: "H1 אחד בלבד בכל עמוד. H2 = נושאי משנה. H3 = תת-נושאים. כותרות עיצוביות (פוטר, כפתורים) = div/p בלבד. בדיקה: F12 ← חפשו h2, h3.", tools: [{ n: "תוסף seo meta 1 click", l: "דפדפן " }, { n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }] },
          { id: "NEW-14", cat: "תגית Canonical", freq: "חד-פעמי", explain: "כל עמוד מצביע על עצמו כגרסה הראשית עם rel=canonical. מונע תוכן כפול מפרמטרים (?utm, ?sort, ?page) ומרכז את הסמכות בכתובת אחת במקום לפזר אותה.\nלוודא שהעמודים החשובים מוגדרים עם תגית קנוניקל.", tools: [{ n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }, { n: "בדיקה בקוד - ctrl U ואז CTRL F ", l: "https://" }] },
          { id: "NEW-15", cat: "תמונות - אופטימיזציה", freq: "חד-פעמי", explain: "ממירים ל-WebP. רגילה מתחת ל-100kb, רקע מתחת ל-200kb. שמות קבצים: 'black-labrador-dog.webp' ולא 'IMG_4821.jpg'. Alt קצר ורלוונטי לכל תמונה.", tools: [{ n: "Squoosh (Google)", l: "https://squoosh.app" }, { n: "ShortPixel / Imagify", l: "https://shortpixel.com" }, { n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }] },
          { id: "NEW-16", cat: "E-E-A-T וביו מחבר", freq: "חד-פעמי", explain: "עמוד אודות עם ניסיון ותעודות, ביו מחבר אמיתי לכל מאמר, פרטי קשר מלאים בפוטר (טלפון, מייל, ח\"פ, כתובת), תנאי שימוש ופרטיות. בלי אלה האתר נראה אנונימי וגוגל נותן בו פחות אמון.", tools: [] },
          { id: "NEW-17", cat: "Breadcrumbs + סכמה", freq: "חד-פעמי", explain: "פירורי לחם (בית ← קטגוריה ← עמוד) עם BreadcrumbList schema. משפר ניווט, מחזק את הקישור הפנימי, ומציג נתיב ברור בתוצאות החיפוש במקום כתובת ארוכה.", tools: [{ n: "Rich Results Test", l: "https://search.google.com/test/rich-results" }] },
          { id: "NEW-18", cat: "סכמות ", freq: "חד-פעמי", explain: "JSON-LD לכל עמוד: Organization + LocalBusiness בדף הבית, Article לכל מאמר, Product לכל מוצר, FAQ היכן שרלוונטי. מאפשר Rich Results (כוכבות, מחיר, FAQ) בתוצאות.\nמשתמשים בתוסף סכמות של אילן.", tools: [{ n: "Rich Results Test", l: "https://search.google.com/test/rich-results" }, { n: "התוסף סכמות של אילן", l: "https://" }] },
          { id: "NEW-19", cat: "נגישות (Accessibility)", freq: "חד-פעמי", explain: "רק לראות שיש נגישות.", tools: [] },
        ]
      },
      {
        name: "שלב 4 - חיבור מערכות מעקב", tasks: [
          { id: "NEW-20", cat: "חיבור Google Site Kit", freq: "חד-פעמי", explain: "מתקינים את תוסף Site Kit by Google ומחברים בלחיצה את GSC, את Analytics (GA4) ואת PageSpeed ללוח הבקרה של וורדפרס - כך כל הצוות רואה נתוני חיפוש, תנועה ומהירות במקום אחד בלי לעבור בין ממשקים. ביצוע: לוח בקרה ← תוספים ← הוסף חדש ← מחפשים 'Site Kit by Google' ← התקנה והפעלה ← Sign in with Google ← מאשרים הרשאות ← Connect Service לכל שירות. לאתר ניהול אצל סוכנות אפשר לשלב Site Kit לתצוגה מהירה לצד GTM לניהול מתקדם.", tools: [{ n: "Site Kit by Google", l: "https://sitekit.withgoogle.com" }, { n: "Google Search Console", l: "https://search.google.com/search-console" }, { n: "Google Analytics 4", l: "https://analytics.google.com" }] },
          { id: "NEW-21", cat: "Google Tag Manager", freq: "חד-פעמי", explain: "קוד GTM אחד באתר מאפשר ניהול כל הכלים מממשק אחד. תוסף GTM4WP לוורדפרס = התקנה בלחיצה.", tools: [{ n: "Google Tag Manager", l: "https://tagmanager.google.com" }, { n: "GTM4WP", l: "https://wordpress.org/plugins/duracelltomi-google-tag-manager/" }] },
          { id: "NEW-22", cat: "Google Analytics 4", freq: "חד-פעמי", explain: "GA4 דרך GTM. מגדירים המרות: שליחת טופס, וואטסאפ, חיוג, דף תודה. בלי המרות לא יודעים מה עובד ומה לא.", tools: [{ n: "Google Analytics 4", l: "https://analytics.google.com" }] },
          { id: "NEW-23", cat: "חיבור בין מערכות", freq: "חד-פעמי", explain: "GA4 עם GSC: רואים את הביטויים שהביאו תנועה. GA4 עם Google Ads: ROI משולב. GA4 ← Admin ← Product Links.", tools: [{ n: "GA4 - Product Links", l: "https://analytics.google.com" }] },
        ]
      },
      {
        name: "שלב 5 - GEO ואינדוקס", tasks: [
          { id: "NEW-24", cat: "תוכן מוכן לציטוט", freq: "חד-פעמי", explain: "בעמודי הליבה: תשובה ישירה בשני משפטים מתחת לכל כותרת שאלה, טבלאות, רשימות ממוספרות ו-FAQ. זה הפורמט שמנועי AI שולפים ומצטטים. \nבאתרי תוכן.\nבאתרי איקומרס פסקת פתיחה בעמוד מוצר שמתאר את מה שיש בעמוד עם קישור פנימי רלוונטי.", tools: [] },
          { id: "NEW-25", cat: "הפעלת llms.txt ב-Yoast", freq: "חד-פעמי", explain: "גרסאות Yoast SEO החדשות מייצרות קובץ llms.txt לוודא בהגדרות שמופעל.\n  ביצוע: Yoast SEO ← Settings ← Site features ← מפעילים את המתג 'llms.txt', שומרים, ואז מאמתים שהקובץ נטען בכתובת domain.com/llms.txt. זו דרך ההפעלה המעשית של מסלול ה-GEO והיא מגדילה את הסיכוי שמנוע AI יצטט את האתר עם ייחוס נכון.", tools: [{ n: "Yoast SEO", l: "https://yoast.com" }, { n: "בדיקה: domain.com/llms.txt", l: "https://llmstxt.org" }] },
          { id: "NEW-26", cat: "sitemap", freq: "חד-פעמי", explain: "בדיקה של קובץ ה sitemap שקיים ותקין+ לשלוח מפת אתר בגוגול סארץ קונסול, לא לשכוח !!", tools: [] },
          { id: "NEW-27", cat: "robots.txt", freq: "חד-פעמי", explain: "בדיקה של קובץ ה-robots.txt לוודא שאין עמודים חשובים חסומים .\nבמידת הצורך לשנות בvirtual robots.txt . ", tools: [{ n: "virtual robots.txt", l: "תוסף וורדפרס" }] },
        ]
      },
      {
        name: "שלב 6 - בקרה ראשונית (14 ימים)", tasks: [
          { id: "NEW-28", cat: "מעקב אינדוקס יומי", freq: "יומי / 14 יום", explain: "GSC ← Pages ← 'Indexed' לעמודי הליבה. 'Crawled but not indexed' = תוכן דל. 'Discovered but not indexed' = crawl budget נמוך. אפשר לבקש אינדוקס ידני.", tools: [{ n: "GSC - Pages Report", l: "https://search.google.com/search-console" }] },
          { id: "NEW-29", cat: "בדיקת מהירות (PageSpeed)", freq: "שבועי / 14 יום", explain: "ציון 85+ במובייל = בסיס מינימלי. LCP מתחת ל-2.5s, CLS מתחת ל-0.1, INP מתחת ל-200ms. סיבות נפוצות לציון נמוך: תמונות כבדות, JS שחוסם רינדור, שרת איטי.\nאפשר גם לבדוק דרך בדיקה .", tools: [{ n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }] },
          { id: "NEW-30", cat: "הזנה לכלי מעקב מיקומים", freq: "חד-פעמי", explain: "מזינים 20-50 ביטויים ראשיים עם מיקום התחלתי. בלי מעקב לא יודעים אם ה-SEO עובד. GSC נותן ממוצע; כלי ייעודי נותן מיקום מדויק יומי.", tools: [{ n: "Ahrefs Rank Tracker", l: "https://ahrefs.com/rank-tracker" }] },
        ]
      },
    ]
  },
  1: {
    title: "אתר ותיק - אופטימיזציה",
    icon: "🔧",
    short: "אתר ותיק - אופטימיזציה",
    sections: [
      {
        name: "שלב 1 - אבחון טכני", tasks: [
          { id: "VET-01", cat: "סריקה מלאה של האתר", freq: "כל חודשיים באופטימזציה", explain: "סורקים את כל האתר ב-Screaming Frog ומייצאים: 404, הפניות, כותרות חסרות או כפולות,שגיאות, עמודים דקים. זו תמונת המצב שממנה נגזרת כל תכנית השיקום.", tools: [{ n: "Screaming Frog", l: "https://www.screamingfrog.co.uk/seo-spider/" }, { n: "Ahrefs Site Audit", l: "https://ahrefs.com" }] },
          { id: "VET-02", cat: "אינדוקס ו-Index Bloat", freq: "כל חודשיים באופטימזצייה", explain: "ב-GSC בודקים כמה עמודים מאונדקסים מול כמה אמורים להיות. ניפוח אינדקס (תגיות, ארכיונים, פרמטרים, עמודי חיפוש) מבזבז את תקציב הסריקה על זבל. מנקים ב-noindex.", tools: [{ n: "GSC - Pages", l: "https://search.google.com/search-console" }, { n: "site: operator", l: "https://www.google.com" }] },
          { id: "VET-03", cat: "עמודים יתומים", freq: "חד-פעמי לבדוק טוב", explain: "עמודים בלי אף קישור פנימי - גוגל בקושי מגיע אליהם והם נחלשים. מצליבים את ה-sitemap מול תוצאות הסריקה כדי לאתר אותם ולשלב בקישור הפנימי.", tools: [{ n: "Screaming Frog", l: "https://www.screamingfrog.co.uk" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
          { id: "VET-04", cat: "קניבליזציה של מילות מפתח", freq: "כל חודשיים באופטימזציה", explain: "מאתרים כמה עמודים שמדרגים לאותו ביטוי ומחלישים זה את זה. ב-GSC: ביטוי אחד עם כמה כתובות מתחלפות. פותרים במיזוג, ב-canonical או בהבחנת כוונת חיפוש.", tools: [{ n: "GSC - Performance", l: "https://search.google.com/search-console" }, { n: "Ahrefs", l: "https://ahrefs.com" }, { n: "Keyword Insights", l: "https://www.keywordinsights.ai" }] },
          { id: "VET-05", cat: "Core Web Vitals מעמיק", freq: "כל חודשיים באופטימזציה", explain: "בודקים נתוני שטח אמיתיים LCP, CLS ו-INP לכל תבנית עמוד בנפרד. מתעדפים קודם את התבניות עם הכי הרבה תנועה, שם השיפור משפיע הכי הרבה.\nלבדוק מהירות אתר מלאה, זמן טעינת עמודים וכל מה שרלוונטי.", tools: [{ n: "GSC - Core Web Vitals", l: "https://search.google.com/search-console" }, { n: "PageSpeed Insights", l: "https://pagespeed.web.dev" }] },
        ]
      },
      {
        name: "שלב 2 - אבחון ואופטימיזציית תוכן", tasks: [
          { id: "VET-06", cat: "תוכן דל ", freq: "חד-פעמי / רבעוני", explain: "מזהים עמודים עם אפס תנועה ב-12 חודשים ותוכן דק. content decay = עמודים שדירגו בעבר וירדו עם הזמן. מסמנים אותם לטיפול .", tools: [{ n: "GSC", l: "https://search.google.com/search-console" }, { n: "GA4", l: "https://analytics.google.com" }, { n: "Ahrefs", l: "https://ahrefs.com" }] },
          { id: "VET-07", cat: "גיזום תוכן ", freq: "כל חצי שנה חייב", explain: "בודקים כל עמוד חלש: מיזוג לעמוד חזק (301), שכתוב או הסרה. מעט עמודים חזקים עדיפים על הרבה חלשים - זה מרכז את הסמכות ואת תקציב הסריקה היכן שחשוב.", tools: [{ n: "Google Sheets", l: "https://sheets.google.com" }, { n: "Redirection", l: "https://wordpress.org/plugins/redirection/" }] },
          { id: "VET-08", cat: "רענון תוכן ישן", freq: "כל רבעון ", explain: "מעדכנים מאמרים שדירגו וירדו: נתונים עדכניים, כותרות חדשות, קישורים פנימיים, סכמה ותאריך עדכון. רענון לרוב מחזיר מיקומים מהר יותר מכתיבת תוכן חדש מאפס.", tools: [{ n: "GSC", l: "https://search.google.com/search-console" }, { n: "Surfer SEO", l: "https://surferseo.com" }] },
          { id: "VET-09", cat: "פערי תוכן מול מתחרים", freq: "פעם ברבעון", explain: "מזהים ביטויים שמתחרים מדרגים עליהם ואתם לא, ונושאים חסרים באשכולות שלכם. כל פער = הזדמנות תוכן מתועדפת לפי נפח ותחרות.", tools: [{ n: "Ahrefs Content Gap", l: "https://ahrefs.com" }] },
          { id: "VET-10", cat: "ביטויים 11-20 (פירות בהישג יד)", freq: "חודשי", explain: "GSC ← Performance ← סינון Position 11-20 ← מיון לפי Impressions. בעמודים אלה: מוסיפים תוכן, מוסיפים H2 ומחזקים ב-2-3 קישורים פנימיים. דחיפה קטנה מקפיצה לעמוד הראשון.", tools: [{ n: "GSC - Performance", l: "https://search.google.com/search-console" }, { n: "Surfer SEO", l: "https://surferseo.com" }] },
          { id: "VET-11", cat: "שיפור CTR", freq: "חודשי", explain: "GSC ← Performance ← Impressions מעל 500 עם CTR מתחת ל-3%. מוסיפים לכותרת: מספרים, שנה, שאלה או הבטחה. Meta Description = טיזר. CTR גבוה = יותר תנועה באותו דירוג.", tools: [{ n: "GSC - Performance", l: "https://search.google.com/search-console" }, { n: "SERP Simulator", l: "https://serpsim.com" }] },
        ]
      },
      {
        name: "שלב 3 - קישורים וסמכות", tasks: [
          { id: "VET-12", cat: "ניקוי קישורים רעילים", freq: "פעם ברבעון עושים בדיקה ", explain: "מזהים קישורים ספאמיים מרשתות PBN או מספריות זבל. קודם מנסים הסרה ידנית, ורק לקישורים מזיקים באמת משתמשים ב-Disavow. כלי מסוכן - שימוש זהיר בלבד.", tools: [{ n: "Ahrefs", l: "https://ahrefs.com" }, { n: "Google Disavow Tool", l: "https://search.google.com/search-console/disavow-links" }] },
          { id: "VET-13", cat: "רכישת קישורים חודשית לפי ההסכם", freq: "חודשי / חוזי", explain: "מנהלים את מכסת הקישורים החודשית שסוכמה בחוזה הלקוח, עם דגש על איכות ורלוונטיות ולא על כמות. ביצוע: (1) בוחרים אתרים רלוונטיים לנישה עם תנועה אמיתית ו-DR סביר - לא רשתות PBN. (2) מגוונים את טקסט העוגן: מותג, URL, מילת מפתח וטבעי. (3) מפזרים את הקישורים על פני החודש, לא בבת אחת, כדי לשמור על פרופיל טבעי. (4) מתעדים ב-Sheet: אתר, URL יעד, עוגן, עלות ותאריך. (5) בסוף החודש מוודאים שכל קישור עלה, חי ומאונדקס. אזהרה: קישורים ממקורות זבל יזיקו - ראו את סעיף ניקוי הקישורים הרעילים (VET-12).", tools: [{ n: "Ahrefs (בדיקת DR/תנועה)", l: "https://ahrefs.com" }, { n: "Google Sheets (יומן קישורים)", l: "https://sheets.google.com" }, { n: "GSC - Links", l: "https://search.google.com/search-console" }, { n: "באסט לינקס", l: "https://" }] },
        ]
      },
      {
        name: "שלב 4 - שחזור ביצועים ודיווח", tasks: [
          { id: "VET-14", cat: "עמודים בירידה", freq: "כל שבועיים בעבר בסיסי ", explain: "ב-GSC משווים תקופה מול תקופה ומסמנים עמודים שאיבדו קליקים או מיקום. אלה הזוכים המהירים: עמוד שכבר דירג טוב צריך פחות מאמץ כדי לחזור.", tools: [{ n: "GSC - Performance", l: "https://search.google.com/search-console" }] },
          { id: "VET-15", cat: "השפעת עדכוני אלגוריתם", freq: "לאחר עדכון ליבה ", explain: "מצליבים ירידות תנועה מול תאריכי עדכוני ליבה של גוגל. ירידה שחופפת לעדכון מצביעה על בעיית איכות או E-E-A-T, לא על תקלה טכנית - והפתרון שונה לגמרי.", tools: [{ n: "Google Search Status", l: "https://status.search.google.com" }] },
          { id: "VET-16", cat: "מעקב המרות באתרי איקומרס", freq: "כל שבוע מעקב ", explain: "באתר איקומרס ותיק מוודאים שמעקב ההמרות מדויק, אחרת אי אפשר לדעת אילו עמודים אורגניים מייצרים הכנסה ובמה כדאי להשקיע. ביצוע: (1) ב-GA4 בודקים שאירועי ה-Ecommerce יורים עם ערך וכמות: view_item, add_to_cart, begin_checkout ו-purchase. (2) מאמתים בדוח Realtime תוך כדי רכישת בדיקה אמיתית. (3) מסמנים את purchase כ-Key Event. (4) ב-GA4 ← Reports ← Traffic acquisition מסננים Organic ורואים הכנסה . שם מתעדפים אופטימיזציה - העמודים שכבר מוכרים הם אלה שכדאי לחזק.\n\nחובה מעקב המרות אפשר גם לראות בינהול בוורדפרס.", tools: [{ n: "GA4 - Ecommerce", l: "https://analytics.google.com" }, { n: "Google Tag Manager", l: "https://tagmanager.google.com" }, { n: "Tag Assistant", l: "https://tagassistant.google.com" }] },
          { id: "VET-17", cat: "דוח רבעוני", freq: "כל רבעון", explain: "דוח seo מקיף ללקוח . ", tools: [] },
        ]
      },
    ]
  }
};
