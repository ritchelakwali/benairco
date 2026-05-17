# Benairco.nl

Statische marketingsite voor Benairco — eenmanszaak Ben Vrieze, airco-installatie in de Achterhoek. Astro 5 + Tailwind v4 + TypeScript, gehost op Firebase Hosting.

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

Deploys zijn geautomatiseerd via GitHub Actions:

- **Push naar `main`** → deploy naar de live-channel (productie).
- **Pull request openen** → deploy naar een preview-channel met unieke URL, 7 dagen geldig. Link verschijnt automatisch als comment op de PR.

Workflows staan in `.github/workflows/` — beide gebruiken de officiële `FirebaseExtended/action-hosting-deploy@v0` action.

### Eerste keer setup (eenmalig)

1. **Firebase-project aanmaken** in de [Firebase Console](https://console.firebase.google.com/) met project-ID `benairco`. Hosting activeren onder Build → Hosting. Als je een andere project-ID kiest, pas dan `.firebaserc` aan én `projectId` in beide workflows.

2. **Repo naar GitHub pushen** (handmatig op je laptop):
   ```bash
   gh repo create benairco --private --source=. --push
   ```

3. **GitHub Action service account configureren.** Twee paden:

   **Pad A — Firebase doet het voor je** (aanbevolen):
   ```bash
   firebase init hosting:github
   ```
   Beantwoord de vragen, het commando maakt automatisch een service account in Firebase, slaat de JSON op in GitHub Secrets onder de naam `FIREBASE_SERVICE_ACCOUNT_BENAIRCO`, en herkent dat de workflows al bestaan (overschrijft ze niet als ze al kloppen).

   **Pad B — Handmatig:**
   1. Firebase Console → Project Settings → Service Accounts → "Generate new private key"
   2. Sla de JSON op
   3. GitHub repo → Settings → Secrets and variables → Actions → New secret:
      - Naam: `FIREBASE_SERVICE_ACCOUNT_BENAIRCO`
      - Waarde: volledige inhoud van de service-account JSON
   4. Verwijder de JSON van je laptop

4. **Custom domain koppelen** in Firebase Console → Hosting → "Custom domain". Vul `benairco.nl` in. Firebase geeft een TXT-verificatie-record + twee A-records die in Strato moeten landen — zie hieronder.

### Strato DNS-records (eenmalig)

Log in op het Strato Kunden-Login → Domeinverwaltung → benairco.nl → DNS-Einstellungen. Voeg toe wat Firebase opgeeft, verwacht patroon:

| Type  | Naam       | Waarde                              |
|-------|------------|-------------------------------------|
| TXT   | @          | (verificatie-token van Firebase)    |
| A     | @          | (IP-adres 1 van Firebase Hosting)   |
| A     | @          | (IP-adres 2 van Firebase Hosting)   |
| CNAME | www        | benairco.nl                         |

HTTPS-certificaat (Let's Encrypt) wordt automatisch geprovisioneerd door Firebase zodra DNS-verificatie lukt. Reken op 24u voor DNS-propagatie. Daarna is de site bereikbaar op zowel `https://benairco.nl` als `https://www.benairco.nl`.

### Handmatige deploy (als terugvaloptie)

```bash
firebase login                                           # eenmalig
npm run build && firebase deploy --only hosting          # live
firebase hosting:channel:deploy preview --expires 7d     # preview
```

## Soft- vs hard-launch

- **Fase 0/1 (huidige status)**: noindex op `/diensten/*` en `/offerte`. Geen formulier actief.
- **Fase 2 (hard-launch)**: `noindex` verwijderen uit de betreffende pagina's, ze opnemen in `Header.astro` nav-array, formulier-endpoint koppelen, `site.business.stekStatus` op `'certified'` zetten en `expectedHardLaunch`-tekst op de homepage aanpassen.
