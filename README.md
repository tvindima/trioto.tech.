# trioto.tech

Static website for `trioto.tech` (English + Portuguese) hosted on GitHub Pages (custom domain via `CNAME`).

## Pages

- `index.html` (EN)
- `index-pt.html` (PT)
- `challenge.html` (EN)
- `desafio.html` (PT)

## Local Preview

From this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Deploy Notes

- GitHub Pages serves the repository root.
- Domain configuration lives in `CNAME`.
- SEO helpers are in `robots.txt`, `sitemap.xml`, and `site.webmanifest`.

## Repo Cleanup (Optional)

This repo currently also contains `api/` and `mobile_app/` from an unrelated prototype. They are not used by the website pages above.

