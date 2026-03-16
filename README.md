# glass-ui
A Glass Rendering engine for all your Web Apps (React.js/Tailwind). Supports multiple glass styles and is easily customizable.

## 📦 Preview the glass effects
A small preview app is included to explore the supported glass variants.

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## 🚀 Deploy the preview to GitHub Pages
This repo includes a simple static preview site built into the `docs/` folder.

1. Build the preview site:

   ```bash
   npm run build:preview
   ```

2. Commit and push the generated `docs/` folder:

   ```bash
   git add docs
   git commit -m "Deploy preview site"
   git push
   ```

3. In the GitHub repo settings, enable Pages and select the `main` branch + `/docs` folder as the source.

> ✅ Tip: If you want to deploy to a project page (e.g. `https://<user>.github.io/<repo>/`), the site is already built with relative URLs (`base = './'`), so it should work without extra configuration.
