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
  name: 'Benairco',
  legalName: 'Benairco', // TODO_BEN: definitieve handelsnaam zoals bij KvK
  tagline: 'Persoonlijke airco-installatie in de Achterhoek',

  owner: {
    name: 'Ben Vriezen',
    role: 'Eigenaar',
  },

  contact: {
    // TODO_BEN: definitief telefoonnummer in internationaal formaat
    phone: '+31 6 00000000',
    phoneDisplay: '06 - 00 00 00 00',
    // WhatsApp accepteert het nummer zonder + en zonder spaties
    whatsapp: '31600000000',
    // TODO_BEN: e-mailadres dat Ben beheert
    email: 'info@benairco.nl',
  },

  address: {
    // TODO_BEN: straatnaam + huisnummer in Gaanderen
    street: 'Straatnaam 0',
    postalCode: '7011 AA',
    city: 'Gaanderen',
    country: 'NL',
    // Approx. coördinaten voor Gaanderen — TODO_BEN: aanpassen naar exacte locatie
    geo: {
      latitude: 51.946,
      longitude: 6.323,
    },
  },

  business: {
    // TODO_BEN: KvK-nummer zodra inschrijving definitief is
    kvk: '00000000',
    // TODO_BEN: BTW-nummer
    vat: 'NL000000000B00',
    // Status t.o.v. STEK + F-gassen
    stekStatus: 'pending', // 'pending' | 'certified'
    expectedHardLaunch: '2026-09-01', // TODO_BEN: bijwerken als certificering datum bekend is
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
