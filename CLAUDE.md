# Werkafspraken voor Claude Code

`PROJECT.md` is leidend voor wát we bouwen. Dit document beschrijft hóé we werken.

## Lees-volgorde bij elke nieuwe sessie

1. `PROJECT.md` voor scope, fase en constraints
2. `src/config/site.ts` voor NAP, social en design-tokens (single source of truth)
3. Deze `CLAUDE.md`
4. Eventueel `README.md` voor build/deploy-commando's

## Stack-conventies

- **Astro 5 + TypeScript strict**. Geen client-side framework (React/Vue/Svelte) tenzij een onderdeel echt interactieve state vereist — eerst overleggen voor je een framework binnenhaalt.
- **Tailwind v4** via `@tailwindcss/vite`. Tokens (kleur, typografie, spacing) in `src/styles/global.css` met `@theme`. Geen inline styles.
- **Astro Content Collections** voor alle blog/locatie-content. Frontmatter strict gevalideerd via Zod-schema.
- **Pagina's** in `src/pages/` met kebab-case bestandsnamen. **Componenten** in `src/components/` met PascalCase.
- **Beelden** in `src/assets/` (geoptimaliseerd door Astro). Alleen statische bestanden in `public/` (favicon, og-image, robots.txt template).

## Code-stijl

- Geen comments tenzij het wáárom niet uit de naam blijkt. Geen "deze functie doet X" comments.
- Geen wrapper-componenten zonder duidelijke meerwaarde. Drie keer een Tailwind-classlijstje herhalen is beter dan een premature abstraction.
- Semantische HTML eerst: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`. Headings hiërarchisch (één `<h1>` per pagina).
- Toegankelijkheid is geen extra: alt-teksten, focus-states, contrast AA-niveau, `aria-label` waar nodig.
- Geen externe scripts of fonts via CDN. Alles self-hosted of via Astro bundling.

## STEK-constraint (hard)

Tot Ben STEK-erkenning heeft mag de site **geen claims** doen over installatiediensten. Als je twijfelt of een tekst over de grens gaat, herformuleer naar informatief in plaats van transactioneel. Voorbeelden:

- ✅ "Benairco wordt momenteel STEK-gecertificeerd zodat we vanaf [datum] kunnen installeren in de Achterhoek."
- ❌ "Vraag nu een offerte aan voor uw airco-installatie."

Pagina's die wél verwijzen naar installatie (`/diensten/*`, `/offerte`) bestaan in de codebase met `noindex` meta tags en staan niet in de navigatie of sitemap.

## NAP-consistentie

Telefoonnummer, adres en e-mail komen **alleen** uit `src/config/site.ts`. Nooit hardcoden in een component of pagina. Hetzelfde geldt voor de geschatte hard-launch-datum.

## Wanneer wél vragen

- Scope-wijzigingen ten opzichte van `PROJECT.md`
- Content-keuzes waar Bens input voor nodig is (definitieve tekst over hemzelf, prijzen, datums)
- Design-richtingen die niet uit de visuele guidance in `PROJECT.md` af te leiden zijn
- Beslissingen die kosten of externe accounts vereisen (domein-verhuizing, betaalde tools, mail-hosting)
- Niet-omkeerbare acties: `firebase deploy --only hosting:live`, DNS-wijzigingen bij Strato, GBP/LinkedIn live zetten
- Voordat je een dependency toevoegt die geen onderdeel is van de stack zoals beschreven in `PROJECT.md`

## Wanneer níét vragen

- Routine-implementatie binnen vastgestelde scope
- Tailwind-classes en kleine UI-tweaks
- Refactors binnen één bestand die de output gelijk laten
- Naamgeving van interne variabelen of helpers
- Placeholder-content invullen, mits duidelijk als `TODO: Ben` gemarkeerd

## Commit-conventies

- Conventional Commits in het Engels: `feat:`, `fix:`, `chore:`, `content:`, `style:`, `docs:`, `refactor:`
- Onderwerpregel onder 70 tekens. Body alleen als de wáárom niet uit de diff blijkt.
- Eén logische wijziging per commit. Geen "WIP" of "fixes" commits in de main branch.
- Nooit committen: `.env`, klantfoto's zonder toestemming, echte klantgegevens, API-keys, Firebase service account JSON.

## Deploy-discipline

- `firebase deploy` is een **risico-actie**: het zet het publieke product live. Niet zonder expliciete instructie van de gebruiker.
- Eerst altijd `firebase hosting:channel:deploy preview` voor een staging-link.
- DNS-wijzigingen bij Strato vragen om handmatige acties van de gebruiker. Lever instructies, voer ze niet automatisch uit.

## Performance-discipline

- Lighthouse mobile 95+ is het minimum, niet het doel. Bij elke nieuwe pagina/component: check of LCP, CLS en TBT niet verslechteren.
- Geen JS waar HTML/CSS volstaat. Geen animaties die layout shiften.
- Beelden altijd via Astro's `<Image>` component met expliciete breedtes.

## Memory en context

Persistente memory wordt door Claude Code zelf beheerd. Sla feitelijke veranderingen aan deze afspraken of het project op in memory, niet in dit document. Dit document is de stabiele baseline; memory is de drift over tijd.
