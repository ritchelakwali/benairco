# Benairco.nl — Project spec

Leidend document voor de digitale aanwezigheid van Benairco. Wijzigingen worden eerst hier vastgelegd, dan uitgevoerd.

## Context

Benairco is een eenmanszaak van Ben Vrieze in Gaanderen, gespecialiseerd in airco-installatie voor particulieren in de Achterhoek en omstreken. Het bedrijf bestaat twee jaar, heeft tot nu toe ongeveer tien klanten via mond-tot-mond, en bevindt zich in de aanvraagfase voor STEK-erkenning en F-gassen-certificering. Tot die certificeringen binnen zijn mag Ben wettelijk geen koudemiddelhoudende installaties plaatsen of onderhouden, en mag er dus niet actief geadverteerd worden voor die dienst.

Doel: complete digitale aanwezigheid neerzetten — website, Google Business Profile, LinkedIn-bedrijfspagina — die nu in soft-launch gaat om domein-autoriteit en zoek-historie op te bouwen, en die naadloos overgaat in volledige operatie zodra de certificeringen binnen zijn.

Strategisch doel: van nul naar vier aanvragen per maand binnen zes maanden na hard-launch.

## Doelgroep en positionering

Ideale klant: oudere particulieren in de Achterhoek die rust willen, een nette installateur waarderen, en gevoelig zijn voor scherpe prijs. Werkgebied: één uur rijden vanaf Gaanderen, met uitzondering van Duiven.

Positionering die in de hele site moet doorklinken: persoonlijk, netheid, betaalbaar, vakkundig, lokaal. Niet: technische jargon, corporate, premium-luxe.

Belangrijkste concurrent in Bens perceptie: Tombergen Airco Service Gelderland (gevestigd en betrouwbaar). Onze onderscheiding: persoonlijker, dichterbij, scherper geprijsd, met focus op de mens achter het bedrijf.

## Constraints (hard)

1. **Geen claim van diensten die STEK vereisen** tot certificering binnen is. Geen "wij installeren," geen prijzen voor installatie, geen offerteformulier voor installatiediensten, geen calls-to-action die suggereren dat de dienst nu beschikbaar is.
2. **Wel toegestaan**: informatieve content over airco's, het bedrijfsverhaal, het werkgebied, een "aanstaande lancering"-framing met geschatte datum, contactopties voor algemene vragen, nieuwsbrief-inschrijving voor geïnteresseerden.
3. **NAP-consistentie**: naam, adres, telefoonnummer moeten exact identiek zijn op website, GBP, LinkedIn en alle bedrijvengidsen. Eén bron van waarheid: `src/config/site.ts`.
4. **Privacy en wetgeving**: geen cookies in fase 0 (dus geen cookiebanner). AVG-conform contactformulier indien later toegevoegd. Geen Google Analytics.

## Tech stack

- **Framework**: Astro 5 met TypeScript (strict)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Content**: Astro Content Collections (Markdown/MDX) voor blog en locaties
- **Hosting**: Firebase Hosting (statische export uit Astro `dist/`)
- **Registrar + DNS**: Strato (DNS-records voor Firebase Hosting toevoegen). Optioneel later nameservers naar Cloudflare DNS verhuizen voor gratis e-mail forwarding en betere DNS-tooling.
- **E-mail**: nog te beslissen (Strato mail-pakket, Migadu, of e-mail forwarding via Cloudflare DNS na eventuele verhuizing)
- **Analytics**: geen in fase 0. Optioneel later Umami Cloud (gratis, cookieless) of Plausible
- **Forms (post-launch)**: Formspree of een eenvoudige Firebase Functions endpoint
- **Beeldoptimalisatie**: Astro `<Image>` met AVIF + WebP fallback
- **Fonts**: zelfgehost (geen Google Fonts CDN), één serif voor headings + één sans-serif voor body
- **Repository**: Git + GitHub. Deploy via `firebase deploy` (handmatig in fase 0) of GitHub Action zodra de basis stabiel is

Rationale: Astro produceert statische HTML met sterke Lighthouse-defaults, heeft uitstekende SEO-defaults (auto-sitemap, RSS), is snel te bouwen, en blijft onderhoudbaar voor één persoon. Firebase Hosting is gratis voor dit volume, integreert met de bestaande Firebase-omgeving van de beheerder, en handelt HTTPS-certificaten automatisch af.

## Site-structuur

### Hoofdpagina's (indexeerbaar in fase 0)

- `/` Homepage — soft-launch framing, Ben in beeld, USP's, aanstaande dienst, blog teasers
- `/over-ben` — persoonlijk verhaal, foto, achtergrond, waarom airco
- `/werkgebied` — kaartweergave + lijst van gemeentes binnen 1 uur rijden vanaf Gaanderen, met uitzondering Duiven
- `/contact` — telefoon, WhatsApp, mail; géén formulier in fase 0–1
- `/kennisbank` — overzicht van blog-artikelen
- `/kennisbank/[slug]` — individuele artikel-pagina's

### Pagina's gereed maar `noindex` tot hard-launch

- `/diensten` — installatie, onderhoud, F-gassen-controle (overzicht)
- `/diensten/installatie` — uitleg, proces, prijsindicatie
- `/diensten/onderhoud` — uitleg jaarlijks onderhoud, F-gassen-controle, prijzen
- `/offerte` — aanvraagformulier (gereed maar niet gelinkt)

Deze pagina's hebben `<meta name="robots" content="noindex">` en staan niet in de sitemap.

### Systeempagina's

- `/sitemap.xml` (Astro auto-genereert via `@astrojs/sitemap`)
- `/robots.txt`
- `/404`
- `/privacy`
- `/voorwaarden` (boilerplate, te updaten bij hard-launch)

## Content collections

```
src/content/
├── blog/
│   ├── isde-subsidie-airco-2026.mdx
│   ├── welke-airco-past-bij-welk-huis.mdx
│   ├── airco-kosten-installatie-2026.mdx
│   ├── geluidsniveau-airco-plaatsing.mdx
│   ├── onderhoud-airco-jaarlijks.mdx
│   ├── mitsubishi-heavy-modellen-overzicht.mdx
│   └── ...
└── locations/
    ├── doetinchem.mdx
    ├── zevenaar.mdx
    ├── didam.mdx
    └── ...
```

Blog-frontmatter:

```yaml
---
title: "..."
description: "..."
pubDate: 2026-05-13
updatedDate: 2026-05-13
heroImage: "..."
category: "subsidie" | "techniek" | "onderhoud" | "kosten"
keywords: ["airco", "isde", ...]
---
```

Locatie-pagina's zijn een SEO-investering voor later (na hard-launch). In fase 0 alleen het template, niet alle gemeentes invullen.

## SEO-fundament

### Vereist op elke pagina

- Unieke `<title>` en `<meta description>`
- Canonical URL
- Open Graph + Twitter Card tags
- Schema.org structured data: `LocalBusiness` op alle pagina's, aangevuld met `Article` op blogs en `BreadcrumbList` waar relevant
- Auto-generated sitemap.xml die alleen indexeerbare pagina's bevat
- robots.txt die crawlers toestaat, met sitemap-verwijzing

### LocalBusiness JSON-LD baseline

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Benairco",
  "image": "https://benairco.nl/og-image.jpg",
  "@id": "https://benairco.nl/#localbusiness",
  "url": "https://benairco.nl",
  "telephone": "+31...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Gaanderen",
    "postalCode": "...",
    "addressCountry": "NL"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 0, "longitude": 0 },
  "areaServed": [{ "@type": "City", "name": "Doetinchem" }]
}
```

### Core Web Vitals doelen

- Lighthouse mobile score 95+ op alle metrics
- LCP < 2.0s
- CLS < 0.05
- Geen layout shift bij font-laden (`font-display: swap` met gereserveerde ruimte)
- Geen render-blocking JS

## Visueel ontwerp — design guidance

Stijl: schoon, ruim, vertrouwen-uitstralend. Niet glanzend, niet corporate. Denk aan een goede ZZP-aannemer in plaats van een SaaS-startup.

Kleurpalet:
- Primair: rustig blauw-grijs of warm groen (kies wat past bij toekomstig logo)
- Accent: één warme kleur voor CTAs
- Veel wit/ivoorwit als achtergrond
- Tekst donkergrijs (#1a1a1a), niet pure zwart

Typografie:
- Heading: neutraal-warme serif (Source Serif, Crimson, of vergelijkbaar)
- Body: leesbare sans-serif (Inter, Source Sans, of systeem-stack)
- Body size minimaal 17–18px op mobile

Component-stijl:
- Knoppen: ruime padding, geen overdreven schaduwen, duidelijke focus states
- Cards: lichte border, subtiele schaduw, geen 3D-effecten
- Beelden: afgeronde hoeken (8–12px), niet rond, niet hard
- Iconografie: één set, lijn-stijl, niet gemengd

Mobile-first overal. Fixed bottom-bar op mobile met "Bel direct" en "WhatsApp" knoppen, alleen zichtbaar onder breakpoint 768px.

## Fase-plan

### Fase 0 — Setup en soft-launch

- [ ] Repo opzetten met Astro + Tailwind v4 + TypeScript strict
- [ ] `src/config/site.ts` met alle bedrijfsdata (NAP, social, opening)
- [ ] Basis layout, header, footer, navigatie
- [ ] Homepage met "aanstaande lancering" framing — verwachte datum als variabele
- [ ] Over-Ben pagina (placeholder, Ben levert definitieve content)
- [ ] Werkgebied pagina met statische lijst gemeentes
- [ ] Contact pagina met tel/WhatsApp/mail, geen formulier
- [ ] Kennisbank index + één eerste blog ("ISDE-subsidie voor airco's in 2026")
- [ ] LocalBusiness schema op alle pagina's
- [ ] Sitemap + robots.txt
- [ ] 404 pagina
- [ ] Privacy + voorwaarden boilerplate
- [ ] Pre-launch pagina's klaar met `noindex` (diensten, offerte)
- [ ] Firebase Hosting config (`firebase.json`, `.firebaserc`)
- [ ] Strato-DNS: A-records naar Firebase Hosting + TXT-verificatie + www → apex redirect via Firebase
- [ ] Lighthouse-audit en optimaliseren tot 95+ op alle metrics

### Fase 1 — Content opbouw (weken 2–8)

- [ ] Eén nieuwe blogpost per week, in volgorde van zoekvolume:
  1. ISDE-subsidie voor airco's met warmtepompfunctie 2026
  2. Wat kost een airco-installatie in 2026 (richtprijzen, geen Ben-specifieke prijzen)
  3. Welke airco past bij welk type woning (single-split, multi-split, capaciteit)
  4. Geluidsniveau van airco's en plaatsing op buitenmuur
  5. Onderhoud aan een airco — wat, wanneer, hoe vaak
  6. Mitsubishi Heavy vs LG vs Daikin — overzicht voor consumenten
- [ ] Foto-shoot bij minimaal twee bestaande klanten (toestemming vereist), beelden in `src/assets/`
- [ ] Placeholder-beelden vervangen door echte foto's
- [ ] Over-Ben pagina definitief met portret en verhaal
- [ ] Google Business Profile aanmaken met identieke NAP-gegevens, foto's uploaden
- [ ] LinkedIn bedrijfspagina aanmaken met identieke gegevens
- [ ] Eerste reviews van bestaande klanten vragen voor GBP
- [ ] Sitemap automatisch geüpdatet, ingediend bij Google Search Console en Bing Webmaster Tools

### Fase 2 — Hard-launch bij STEK-erkenning

- [ ] **Ownership-transitie afronden** (zie `OWNERSHIP.md`): Firebase/GitHub/domein/GBP/LinkedIn onder Ben's account met Ritchel als operationeel beheerder + noodcontact-procedure ingericht
- [ ] Homepage update: "aanstaande" verwijderen, expliciet operationeel verklaren
- [ ] STEK-vermelding + certificeringen prominent in footer + op contact-pagina
- [ ] Diensten-pagina's activeren (`noindex` verwijderen, opnemen in nav en sitemap)
- [ ] Offerteformulier activeren met endpoint (Formspree of Firebase Functions)
- [ ] Prijsindicatie-pagina activeren (single-split vanaf X, multi-split vanaf Y)
- [ ] Aankondiging op LinkedIn bedrijfspagina
- [ ] GBP-bedrijfsstatus van "tijdelijk gesloten" naar "geopend"
- [ ] Voorwaarden updaten met STEK-vermelding en formele bedrijfsgegevens
- [ ] Lokale Facebook-groepen / persbericht in werkgebied

### Fase 3 — Meten en bijsturen (maanden 4–6 na hard-launch)

- [ ] Maandelijkse rapportage: GBP-impressies, GBP-acties, website-bezoek, aanvragen, conversies
- [ ] Top 10 zoektermen waarop site verschijnt
- [ ] Twee meest bezochte pagina's optimaliseren op conversie
- [ ] Twee minst presterende blog-onderwerpen vervangen of uitbreiden
- [ ] Locatie-pagina's voor de 5 belangrijkste gemeentes invullen (Doetinchem, Zevenaar, Didam, Wehl, Gaanderen)
- [ ] Backlink-strategie: lokale bedrijvengidsen, brancheverenigingen, partnerschap met aannemers

## Acceptatiecriteria fase 0

- Site bouwt lokaal foutloos en draait in `astro preview`
- Lighthouse mobile score 95+ op alle metrics (lokaal gemeten)
- Geen claims van diensten die STEK vereisen, geen prijzen voor installatie
- Volledige NAP-consistentie tussen site, robots, sitemap, schema
- "Aanstaande lancering" framing duidelijk maar professioneel
- Eén werkende blog-post live, indexeerbaar
- robots.txt en sitemap.xml correct
- Werkende telefoon- en WhatsApp-knoppen op mobile, fixed bottom-bar
- Repo netjes met README voor onderhoud, niets gevoeligs gecommit (geen API-keys, geen klantdata)
- Firebase Hosting deployt zonder fouten zodra `firebase login` is gedaan

## Verwachte vragen aan Ben

- Definitief telefoonnummer en e-mailadres voor de site
- KvK-nummer voor footer
- Postcode + huisnummer Gaanderen voor LocalBusiness schema
- Geschatte einddatum STEK-traject (voor "aanstaande lancering"-tekst)
- Twee bestaande klanten die toestemming geven voor foto-momenten
- Tien bestaande klanten die mogelijk een review willen schrijven (voor GBP-fase)
- Voorkeur logo-richting: woordmerk, beeldmerk, of combinatie

## Beheer-richtlijnen

Bij twijfel over een keuze: eenvoud boven uitgebreidheid, snelheid boven flexibiliteit, eerlijke framing boven marketing-overdrijving. De site moet ademen wat Ben is: nuchter, netjes, betaalbaar, betrouwbaar.
