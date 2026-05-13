# Benairco.nl

Statische marketingsite voor Benairco — eenmanszaak Ben Vriezen, airco-installatie in de Achterhoek. Astro 5 + Tailwind v4 + TypeScript, gehost op Firebase Hosting.

`PROJECT.md` bevat de inhoudelijke spec. `CLAUDE.md` bevat de werkafspraken voor AI-assistentie. Begin daar als je nieuw bent.

## Lokaal draaien

```bash
npm install
npm run dev          # dev-server op http://localhost:4321
npm run build        # productie-build naar dist/
npm run preview      # serveer de productie-build lokaal
npm run check        # TypeScript + Astro check
```

## Project-structuur

```
src/
├── components/        Astro UI-componenten (PascalCase)
├── config/site.ts     Single source of truth: NAP, social, design-tokens
├── content/           MDX content (blog, locations)
├── content.config.ts  Zod-schema's voor content collections
├── layouts/           Pagina-layouts
├── pages/             Routes (kebab-case)
└── styles/global.css  Tailwind v4 entry + @theme tokens

public/                Statische bestanden (favicon, robots.txt, og-image)
```

## Inhoudelijke conventies

- **NAP-consistentie**: telefoon, adres, e-mail komen alleen uit `src/config/site.ts`.
- **STEK-constraint**: tot de STEK-erkenning rond is mogen we geen installatie-diensten claimen. Pagina's in `src/pages/diensten/` en `src/pages/offerte.astro` staan op `noindex` en zijn niet in de navigatie opgenomen.
- **Geen tracking**: geen Google Analytics, geen Facebook Pixel, geen cookies.

## Een blog-artikel toevoegen

1. Maak `src/content/blog/<slug>.mdx` met frontmatter conform `src/content.config.ts`.
2. Zet `draft: false` om te publiceren.
3. Categorie kiezen uit: `subsidie`, `techniek`, `onderhoud`, `kosten`, `verhaal`.

## Deploy naar Firebase Hosting

### Eerste keer setup (eenmalig)

1. **Firebase project aanmaken** in de [Firebase Console](https://console.firebase.google.com/) onder de naam `benairco` (of pas `.firebaserc` aan).
2. **Firebase CLI installeren**: `npm install -g firebase-tools`.
3. **Inloggen**: `firebase login`.
4. **Custom domain koppelen** in Firebase Hosting → Domeinen → benairco.nl toevoegen. Firebase geeft TXT- en A-records die je in het Strato DNS-paneel moet zetten (zie hieronder).

### Strato DNS-records (eenmalig)

Bij Strato DNS toevoegen wat Firebase Hosting opgeeft. Verwacht patroon:

| Type  | Naam       | Waarde                              |
|-------|------------|-------------------------------------|
| TXT   | @          | (verificatie-token van Firebase)    |
| A     | @          | (IP-adres 1 van Firebase Hosting)   |
| A     | @          | (IP-adres 2 van Firebase Hosting)   |
| CNAME | www        | benairco.nl                          |

HTTPS-certificaat wordt door Firebase automatisch geprovisioneerd (Let's Encrypt) zodra DNS klopt.

### Reguliere deploy

```bash
npm run build
firebase deploy --only hosting
```

Voor een preview-channel (staging-URL, niet live):

```bash
firebase hosting:channel:deploy preview --expires 7d
```

## Soft- vs hard-launch

- **Fase 0/1 (huidige status)**: noindex op `/diensten/*` en `/offerte`. Geen formulier actief.
- **Fase 2 (hard-launch)**: `noindex` verwijderen uit de betreffende pagina's, ze opnemen in `Header.astro` nav-array, formulier-endpoint koppelen, `site.business.stekStatus` op `'certified'` zetten en `expectedHardLaunch`-tekst op de homepage aanpassen.
