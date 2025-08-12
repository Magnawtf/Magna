# Magna.WTF — Static Site Starter

This is a fast, accessible, single‑repo website for **David Magna**. It’s plain HTML/CSS/JS so it deploys anywhere (GitHub Pages, Netlify, Vercel).

## What's inside
- **index.html** — single‑page layout with sections for About, Book, Media, Campaigns, Activists, Partners, Contact
- **assets/css/styles.css** — clean, modern, accessible styles with dark mode
- **assets/js/main.js** — small JS for dark mode, mobile menu, and an **Activist Directory** powered by JSON
- **assets/data/activists.json** — edit this file to add activist spotlights

## Edit content
- Most copy can be edited directly in `index.html`.
- Add activists by editing `assets/data/activists.json` (name, city/country, and links).

## Deploy (free)
### Option A — GitHub Pages
1. Create a new repo on GitHub called `magna-wtf`.
2. Upload all files in this folder to the repo root.
3. In **Settings → Pages**, set **Branch: `main`**, **/ (root)**, and **Save**.
4. Your site will be live at `https://<yourname>.github.io/magna-wtf/`.
5. Later, point **magna.wtf** at it with a custom domain in **Settings → Pages → Custom domain**.

### Option B — Netlify
1. Drag‑and‑drop this folder onto https://app.netlify.com/drop
2. Optional: add a `_redirects` file for pretty URLs, but not required for this single page.

### Option C — Vercel
1. `vercel deploy` with the CLI, or import the repo in the Vercel dashboard.
2. Framework preset: **Other**.

## Hook up forms & email
- Replace static forms with Formspree, Beehiiv, ConvertKit, or your ESP by updating the `action` and adding any hidden fields.
- Replace placeholder email `hello@magna.wtf` when the domain is active.

## Color & brand
Palette is inspired by bold, accessible contrasts:
- Brand Blue `#0e3a8a`
- Accent (action) `#e11d48`
- Dark text `#0f172a`
- Light card `#f8fafc`

Adjust CSS variables at the top of `assets/css/styles.css` to match your final brand.

## License
You own all rights to your customized content. This starter is unlicensed for your personal use.
