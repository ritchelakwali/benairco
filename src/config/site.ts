/**
 * Single source of truth voor Benairco bedrijfsgegevens.
 *
 * Velden gemarkeerd met TODO_BEN moeten ingevuld worden door Ben Vriezen
 * voordat de site live gaat. Alles wat hieruit komt verschijnt op de site,
 * in JSON-LD schema, op GBP, LinkedIn en in bedrijvengidsen — wijzig alleen
 * hier zodat NAP-consistentie gegarandeerd blijft.
 */

export const site = {
  url: 'https://benairco.nl',
  // Publieke merk-naam (domein, marketing, GBP)
  name: 'Benairco',
  // Officiële handelsnaam zoals oorspronkelijk ingeschreven bij KvK.
  // Wordt getoond in footer/voorwaarden om aan de wettelijke
  // vermeldingsplicht voor eenmanszaken te voldoen.
  legalName: 'Aircoservice-Gelre',
  // Disclosure-zin voor footer/voorwaarden. Gaat uit van scenario 1:
  // Benairco wordt door Ben geregistreerd als tweede handelsnaam bij KvK.
  // TODO_BEN: handelsnaam-toevoeging indienen bij KvK (gratis via reguliere
  // wijzigingsmelding). Zodra dit is gedaan klopt deze tekst.
  legalNotice: 'Benairco en Aircoservice-Gelre zijn handelsnamen van dezelfde eenmanszaak (KvK 94749493).',
  tagline: 'Persoonlijke airco-installatie in de Achterhoek',

  owner: {
    name: 'Ben Vriezen',
    role: 'Eigenaar',
  },

  contact: {
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
    // Gemeentes binnen 1 uur rijden vanaf Gaanderen, met uitzondering van Duiven.
    // Volgorde: meest nabij eerst.
    cities: [
      'Gaanderen',
      'Doetinchem',
      'Wehl',
      'Didam',
      "'s-Heerenberg",
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
    excluded: ['Duiven'],
    radiusLabel: '1 uur rijden vanaf Gaanderen',
  },

  social: {
    // TODO_BEN: bijwerken zodra accounts live zijn
    linkedin: '',
    google: '', // Google Business Profile URL
    facebook: '',
    instagram: '',
  },

  brand: {
    // Kleur-tokens (ook gespiegeld in src/styles/global.css @theme)
    colors: {
      primary: '#2c4a52', // diep blauw-grijs, te tunen als logo er is
      accent: '#c47b3c', // warm terracotta voor CTAs
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
