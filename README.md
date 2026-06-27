# Hector Hosting Website

Premium VPS hosting website with admin panel.

## 🚀 Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `hector-hosting`)
2. Upload all these files to the repository
3. Go to **Settings → Pages**
4. Set source to **Deploy from a branch → main → / (root)**
5. Your site will be live at `https://yourusername.github.io/hector-hosting/`

## 🔐 Admin Panel

- Access at: `https://yourusername.github.io/hector-hosting/admin/`
- **Default password: `hector2026`**
- Change it immediately from the admin panel → Password tab

## 📋 Admin Features

- **Plans** — Add, edit, delete hosting plans with full spec control
- **Categories** — Create custom plan categories (Budget, Performance, Premium, etc.)
- **Locations** — Add VPS server locations with flag emoji and country
- **Password** — Change the admin password

## 📝 Notes

- All data is stored in **localStorage** in the visitor's browser (GitHub Pages has no backend)
- Plans you add in admin will only show for that browser session unless you edit `js/data.js` to update the DEFAULT_PLANS array
- For a production site with a real backend, consider Netlify + a database

## 🎨 Files

```
index.html          — Main website
css/style.css       — Main styles
js/data.js          — Data layer + default plans
js/main.js          — Front-end rendering
admin/
  index.html        — Admin panel
  admin.css         — Admin styles
  admin.js          — Admin logic
```
