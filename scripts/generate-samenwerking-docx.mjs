// One-off generator voor samenwerkingsvoorwaarden.docx
// Run vanuit project-root: node scripts/generate-samenwerking-docx.mjs
// Output: C:\Users\User\Downloads\Samenwerkingsvoorwaarden-Benairco.docx
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  AlignmentType,
} from 'docx';
import fs from 'node:fs';

const H = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, bold: true })],
  });

const P = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: 120 },
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: [new TextRun({ text, ...opts })],
  });

const Bullet = (text) =>
  new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [new TextRun(text)],
  });

const doc = new Document({
  creator: 'RaconSoft',
  title: 'Samenwerkingsvoorwaarden Benairco',
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22 },
        paragraph: { spacing: { line: 300 } },
      },
    },
  },
  sections: [
    {
      properties: { page: { margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } },
      children: [
        new Paragraph({
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: 'Samenwerkingsvoorwaarden', bold: true, size: 44 }),
          ],
        }),
        P('Bijlage bij het kostenoverzicht — RaconSoft × Benairco', {
          italics: true,
          center: true,
          color: '666666',
        }),
        P('Versie: mei 2026', { italics: true, center: true, color: '666666' }),

        H('1. Partijen'),
        Bullet(
          'Opdrachtgever: Aircoservice-Gelre, handelend onder Benairco, t.n.v. Ben Vriezen, Akkerstraat 18, 7011 DB Gaanderen, KvK 94749493 ("Benairco").',
        ),
        Bullet(
          'Opdrachtnemer: RaconSoft, t.n.v. Ritchel Akwali ("RaconSoft").',
        ),

        H('2. Onderwerp'),
        P(
          'Deze voorwaarden gelden voor de digitale dienstverlening van RaconSoft aan Benairco, waaronder begrepen maar niet beperkt tot: website-ontwikkeling, hostingbeheer, online aanwezigheid (Google Business Profile, LinkedIn, eventuele social media), e-mail-configuratie en periodiek onderhoud. Specifieke tarieven en omvang zijn beschreven in het bijbehorende kostenoverzicht.',
        ),

        H('3. Eigenaarschap'),
        P(
          'Alle digitale bedrijfs-assets die in opdracht van Benairco worden ontwikkeld of aangemaakt — waaronder broncode, content, foto’s, accounts (domeinnaam, hosting, GBP, LinkedIn, e-mail), data en klantgegevens — zijn juridisch eigendom van Benairco, ongeacht door welke partij ze zijn aangemaakt of beheerd.',
        ),
        P(
          'RaconSoft heeft gedurende de looptijd van het abonnement operationele toegang tot deze assets voor beheer en onderhoud. Deze toegang vervalt automatisch bij beëindiging van de samenwerking.',
        ),
        P(
          'Auteursrechten op door RaconSoft ontwikkelde broncode en grafische elementen worden bij oplevering overgedragen aan Benairco, met uitzondering van generieke componenten en tooling die RaconSoft hergebruikt over meerdere opdrachten.',
        ),

        H('4. Toegang en wachtwoordbeheer'),
        P(
          'Beide partijen erkennen dat Benairco zelf niet beschikt over de digitale vaardigheden om accounts dagelijks te beheren. De toegangsstructuur is daarom als volgt ingericht:',
        ),
        Bullet(
          'Alle inloggegevens voor onder artikel 3 genoemde accounts worden bewaard in een door Benairco beheerde wachtwoordkluis (Bitwarden of vergelijkbaar), met collection-toegang voor RaconSoft.',
        ),
        Bullet(
          'Bij wijziging van een kritisch wachtwoord (domein-registrar, hosting-provider, primair e-mailaccount, Google-account, GBP) wordt het nieuwe wachtwoord binnen 24 uur bijgewerkt in de kluis.',
        ),
        Bullet(
          'Benairco wijst een noodcontact aan uit zijn directe omgeving (familie, vertrouwd persoon). Het master-wachtwoord van Benairco’s wachtwoordkluis, plus recovery-codes, worden in verzegelde envelop bij deze noodcontact bewaard.',
        ),
        Bullet(
          'RaconSoft is verplicht Benairco te ondersteunen bij periodieke verificatie (jaarlijks) dat alle toegang nog werkt zoals beschreven.',
        ),

        H('5. Opzegging'),
        P(
          'Het beheerabonnement is opzegbaar door beide partijen met inachtneming van één kalendermaand opzegtermijn, schriftelijk (e-mail volstaat).',
        ),
        P('Binnen 14 dagen na het einde van de samenwerking worden:'),
        Bullet(
          'Alle RaconSoft-rechten, gebruikersaccounts en API-toegangen op Benairco-systemen verwijderd of overgedragen aan een door Benairco aangewezen partij;',
        ),
        Bullet(
          'De volledige website-broncode geleverd in een open, herbruikbaar formaat (Git-repository met volledige historie, of een complete export als zip-bestand);',
        ),
        Bullet(
          'Alle bedrijfs- en klantdata (content, beelden, eventuele analytics-historie, formulier-inzendingen, e-mailcorrespondentie via beheerde adressen) geleverd in een open en machineleesbaar formaat;',
        ),
        Bullet(
          'Domein-, hosting-, en account-eigenaarschap volledig bij Benairco gelaten zonder commerciële, technische of administratieve afhankelijkheden van RaconSoft.',
        ),
        P(
          'Geen enkele clausule in deze voorwaarden kan worden ingeroepen om bovenstaande overdracht te vertragen of te belemmeren.',
        ),

        H('6. Calamiteit RaconSoft'),
        P(
          'Bij overlijden, langdurige onbereikbaarheid (meer dan 14 aaneengesloten dagen zonder bericht) of arbeidsongeschiktheid van Ritchel Akwali, kan Benairco direct overstappen op een andere dienstverlener zonder dat RaconSoft’s actieve medewerking vereist is. Daartoe geldt:',
        ),
        Bullet(
          'Benairco heeft via de wachtwoordkluis permanente toegang tot alle benodigde accounts;',
        ),
        Bullet(
          'De noodcontact van Benairco kan namens hem operationele wijzigingen laten doorvoeren door een nieuwe dienstverlener;',
        ),
        Bullet(
          'Eventueel openstaande facturen of contractuele claims worden afgewikkeld via reguliere juridische weg en vormen geen blokkade voor het herstel van Benairco’s digitale werking.',
        ),

        H('7. Vertrouwelijkheid'),
        P(
          'RaconSoft behandelt alle bedrijfs- en klantgegevens van Benairco strikt vertrouwelijk en deelt deze niet met derden, behoudens wettelijke verplichting of expliciete schriftelijke toestemming van Benairco. Deze geheimhoudingsplicht overleeft het einde van de samenwerking.',
        ),

        H('8. Aansprakelijkheid'),
        P(
          'RaconSoft is uitsluitend aansprakelijk voor directe schade voortvloeiend uit aantoonbaar verwijtbaar handelen of nalaten. Aansprakelijkheid is in alle gevallen beperkt tot het bedrag van drie maanden abonnementskosten. Indirecte schade, gevolgschade, gederfde winst of reputatieschade vallen buiten deze aansprakelijkheid.',
        ),

        H('9. Tarieven en facturatie'),
        P(
          'Tarieven, facturatie-frequentie, betalingstermijn en eventuele meerwerk-uurtarieven zijn vastgelegd in een aparte tariefbijlage bij het kostenoverzicht. Wijziging van tarieven wordt minimaal één maand voorafgaand schriftelijk aangekondigd; Benairco heeft in dat geval het recht binnen die termijn op te zeggen zonder de gebruikelijke opzegtermijn van artikel 5.',
        ),

        H('10. Toepasselijk recht en geschillen'),
        P(
          'Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden zoveel mogelijk in onderling overleg opgelost. Lukt dit niet, dan worden zij voorgelegd aan de bevoegde rechter in het arrondissement waar Benairco is gevestigd.',
        ),

        H('Ondertekening'),
        P(
          'Voor akkoord met bovenstaande voorwaarden en met de daarin opgenomen noodcontact-procedure:',
        ),
        new Paragraph({ spacing: { before: 300, after: 100 }, children: [new TextRun('Ben Vriezen — namens Aircoservice-Gelre / Benairco')] }),
        new Paragraph({ children: [new TextRun({ text: 'Plaats: __________________________', color: '666666' })] }),
        new Paragraph({ children: [new TextRun({ text: 'Datum: __________________________', color: '666666' })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: 'Handtekening: __________________________', color: '666666' })] }),

        new Paragraph({ spacing: { before: 400, after: 100 }, children: [new TextRun('Ritchel Akwali — namens RaconSoft')] }),
        new Paragraph({ children: [new TextRun({ text: 'Plaats: __________________________', color: '666666' })] }),
        new Paragraph({ children: [new TextRun({ text: 'Datum: __________________________', color: '666666' })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: 'Handtekening: __________________________', color: '666666' })] }),
      ],
    },
  ],
});

const outPath = 'C:\\Users\\User\\Downloads\\Samenwerkingsvoorwaarden-Benairco.docx';
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log('OK:', outPath, '(' + (buffer.length / 1024).toFixed(0) + ' KB)');
