/**
 * Single source of truth voor Benairco bedrijfsgegevens.
 *
 * Velden gemarkeerd met TODO_BEN moeten ingevuld worden door Ben Vrieze
 * voordat de site live gaat. Alles wat hieruit komt verschijnt op de site,
 * in JSON-LD schema, op GBP, LinkedIn en in bedrijvengidsen, wijzig alleen
 * hier zodat NAP-consistentie gegarandeerd blijft.
 */

export const site = {
  url: 'https://benairco.nl',
  // Publieke merk-naam (domein, marketing, GBP)
  name: 'Benairco',
  // Publiek getoonde naam voor de wettelijke vermeldingsplicht van
  // eenmanszaken (footer/voorwaarden/privacy). De eenmanszaak staat onder
  // een andere handelsnaam bij KvK ingeschreven (zie OWNERSHIP.md); die
  // wordt op verzoek niet publiek op de site getoond.
  legalName: 'Benairco',
  // Disclosure-zin voor footer/voorwaarden.
  // TODO_BEN: handelsnaam-toevoeging 'Benairco' indienen bij KvK (gratis via
  // reguliere wijzigingsmelding). Zodra dit is gedaan klopt deze tekst.
  legalNotice: 'Benairco is een handelsnaam van een eenmanszaak (KvK 94749493).',
  tagline: 'Persoonlijke airco-installatie in de Achterhoek en Twente',

  owner: {
    name: 'Ben Vrieze',
    role: 'Eigenaar',
  },

  contact: {
    // Telefoon en WhatsApp worden voorlopig NIET op de site getoond (op
    // verzoek weggehaald tot het nummer definitief live is). De waarden
    // blijven hier bewaard zodat de knoppen eenvoudig terug te zetten zijn.
    phone: '+31 6 18402285',
    phoneDisplay: '06 - 18 40 22 85',
    // WhatsApp accepteert het nummer zonder + en zonder spaties
    whatsapp: '31618402285',
    // TODO_BEN: e-mailadres dat Ben beheert (info@benairco.nl is logisch
    // zodra Strato-mail of forwarding is ingesteld)
    email: 'info@benairco.nl',
  },

  address: {
    street: 'Akkerstraat 18',
    postalCode: '7011 DB',
    city: 'Gaanderen',
    country: 'NL',
    // Coördinaten via OpenStreetMap Nominatim, mei 2026
    geo: {
      latitude: 51.9287346,
      longitude: 6.3502512,
    },
  },

  business: {
    kvk: '94749493',
    establishmentNr: '000060200855',
    // TODO_BEN: BTW-nummer ophalen bij Belastingdienst / KvK-extract
    vat: 'NL000000000B00',
    // Status t.o.v. STEK + F-gassen
    stekStatus: 'pending', // 'pending' | 'certified'
    // STEK-erkenning verwacht in Q4 2026. Datum geeft start dienstverlening
    // weer; UI rondt af naar "Q4 2026" of de maand.
    expectedHardLaunch: '2026-10-01',
    expectedHardLaunchLabel: 'Q4 2026',
  },

  hours: {
    // Openingstijden voor schema.org en eventueel contact-pagina
    monday: '08:00-18:00',
    tuesday: '08:00-18:00',
    wednesday: '08:00-18:00',
    thursday: '08:00-18:00',
    friday: '08:00-18:00',
    saturday: 'closed',
    sunday: 'closed',
  },

  serviceArea: {
    // Gemeentes binnen 1 uur rijden vanaf Gaanderen, met uitzondering van
    // Duiven, Didam en 's-Heerenberg. Volgorde: meest nabij eerst.
    cities: [
      'Gaanderen',
      'Doetinchem',
      'Wehl',
      'Zeddam',
      'Ulft',
      'Terborg',
      'Silvolde',
      'Varsseveld',
      'Aalten',
      'Lichtenvoorde',
      'Groenlo',
      'Winterswijk',
      'Zelhem',
      'Hengelo Gld',
      'Vorden',
      'Ruurlo',
      'Borculo',
      'Eibergen',
      'Neede',
      'Haaksbergen',
      'Goor',
      'Delden',
      'Enschede',
      'Hengelo (Ov)',
      'Oldenzaal',
      'Losser',
      'Zutphen',
      'Lochem',
      'Warnsveld',
      'Brummen',
      'Dieren',
      'Rheden',
      'Velp',
      'Arnhem',
      'Westervoort',
      'Zevenaar',
      'Babberich',
      'Loil',
      'Beek',
      'Nieuw-Dijk',
      'Azewijn',
      'Bocholt (DE)',
      'Emmerich (DE)',
      'Anholt (DE)',
    ],
    excluded: ['Duiven', 'Didam', "'s-Heerenberg"],
    radiusLabel: '1 uur rijden vanaf Gaanderen',
  },

  social: {
    // TODO_BEN: bijwerken zodra accounts live zijn
    linkedin: '',
    google: '', // Google Business Profile URL
    facebook: '',
    instagram: '',
  },

  // Verificatie-tokens voor zoekmachine-tools. Vul de waarde in zodra je de
  // tools koppelt — de meta-tags in <head> renderen alleen als deze velden
  // niet leeg zijn.
  verification: {
    // Google Search Console: kies bij setup 'HTML-tag' methode. Plak hier
    // alleen de content-waarde uit <meta name="google-site-verification" content="XXX">
    google: 'vOODJFcV20tXZfWw4mA3RVk2uNC4ZIPkPq5x3TX6dIw',
    // Bing Webmaster Tools: kies 'Meta tag' verificatie. Plak hier alleen
    // de content-waarde uit <meta name="msvalidate.01" content="XXX">
    bing: '',
  },

  brand: {
    // Kleur-tokens (ook gespiegeld in src/styles/global.css @theme)
    // Synchroon met het Benairco-logo: donker navy voor wordmark/body,
    // medium teal voor het schild-symbool en accent-vlakken.
    colors: {
      primaryNavy: '#1a3a5c', // wordmark, headings, donkere blokken
      primaryTeal: '#2c7da8', // schild-symbool, knop-accenten, links
      accent: '#c47b3c', // warm terracotta voor primaire CTAs
      ink: '#1a1a1a',
      paper: '#fbfaf6', // ivoorwit
      muted: '#6b7280',
      border: '#e5e3dc',
    },
    fonts: {
      heading: 'Source Serif 4',
      body: 'Inter',
    },
  },
} as const;

export type SiteConfig = typeof site;
