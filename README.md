# צ'קליסט SEO — הנחיות פריסה

## מבנה הפרויקט
```
seo-checklist/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── App.jsx
```

## שלב 1 — התקנה מקומית ובדיקה
```bash
npm install
npm run dev
# פתח http://localhost:5173/seo-checklist/ לבדיקה
```

## שלב 2 — פריסה על GitHub Pages

### 2א. צור Repository ב-GitHub
1. היכנס ל-github.com
2. לחץ New Repository
3. שם: `seo-checklist`
4. Public (חובה ל-GitHub Pages חינמי)
5. לחץ Create Repository

### 2ב. העלה את הקבצים
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/seo-checklist.git
git push -u origin main
```

### 2ג. פרוס
```bash
npm run deploy
```
המערכת תבנה ותעלה אוטומטית ל-GitHub Pages.

### 2ד. הפעל GitHub Pages בהגדרות
1. ב-GitHub → Repository → Settings → Pages
2. Source: Deploy from branch
3. Branch: `gh-pages` / `root`
4. שמור

### הקישור הסופי:
```
https://YOUR_USERNAME.github.io/seo-checklist/
```

---

## שלב 3 — הטמעה ב-Google Sites

1. פתח את ה-Google Site שלך
2. לחץ **Insert** (הכנס) בתפריט הימני
3. בחר **Embed** (הטמעה)
4. הדבק את הקישור: `https://YOUR_USERNAME.github.io/seo-checklist/`
5. לחץ **Insert**
6. שנה גובה ל-**900px** לתצוגה מיטבית

---

## הערות חשובות

- **נתונים**: כל עובד שומר את הנתונים שלו בדפדפן שלו (localStorage)
- **שיתוף**: אם רוצים שכולם יראו אותם נתונים — יש לשדרג ל-Google Sheets backend
- **עדכון**: לעדכן גרסה חדשה: ערוך את App.jsx ← הרץ `npm run deploy`
