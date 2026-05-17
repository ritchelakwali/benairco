# Eigenaarschap en toegang

Dit document beschrijft wie juridisch eigenaar is van wat, wie operationeel beheert, en hoe toegang geborgd blijft bij uitval van een partij. Wordt actief bijgehouden zolang RaconSoft het beheer uitvoert.

## Uitgangspunt

Ben Vrieze (eenmanszaak Aircoservice-Gelre, handelend onder Benairco) is **juridisch eigenaar** van alle bedrijfs-assets. RaconSoft is **operationeel beheerder** zolang het beheerabonnement loopt.

Belangrijke nuance: Ben is digitaal niet-zelfstandig — hij maakt geen accounts aan, beheert geen wachtwoorden en logt zelf nergens in. Dat is geen probleem, maar het betekent dat de toegangsstructuur **niet** mag bouwen op "Ben kan zelf inloggen als RaconSoft wegvalt". De structuur moet zo zijn dat een andere dienstverlener met behulp van Ben (en de noodcontact) binnen een dag operationeel kan overnemen.

## Status per onderdeel (mei 2026)

Update bij elke wijziging. Vink "Ben-eigenaar?" af zodra het op zijn juridische naam staat.

| Onderdeel | Locatie | Account | Ben-eigenaar? | Toegang Ritchel | Notitie |
|---|---|---|---|---|---|
| Domein benairco.nl | Strato | Ritchel's Strato | ❌ | Houder | Registrant-data wijzigen vóór hard-launch — gratis bij Strato, geen domein-verhuizing nodig |
| Firebase-project | Google Cloud | Ritchel's Google | ❌ | Owner | Ben toevoegen als Owner via IAM zodra hij Google-account heeft; Ritchel daarna naar Editor |
| GitHub-repo | github.com/ritchelakwali/benairco | Ritchel's GitHub | ❌ | Admin | Transfer naar Ben-owned GitHub-account óf naar nieuwe GitHub-org "Benairco" vóór hard-launch |
| GitHub Secrets (Firebase SA) | github.com/ritchelakwali/benairco/settings/secrets | Ritchel's GitHub | ❌ | Beheer | Wordt mee-overgedragen bij repo-transfer |
| Site-broncode | repo + lokaal | n.v.t. | Auteursrechtelijk Ben | Ritchel als auteur | In de samenwerkingsvoorwaarden opnemen dat IP overgaat naar Ben |
| Google Business Profile | Google Maps | Bestaat nog niet | n.v.t. | n.v.t. | Aanmaken onder Bens (nog te creëren) Google-account; Ritchel als Manager |
| LinkedIn bedrijfspagina | LinkedIn | Bestaat nog niet | n.v.t. | n.v.t. | Eerst Ben's persoonlijke LinkedIn aanmaken (gezamenlijk), dan bedrijfspagina; Ritchel als Content Admin |
| E-mail info@benairco.nl | Strato / forwarding | Bestaat nog niet | n.v.t. | n.v.t. | Bij Strato (waar het domein staat) inrichten als forwarding; later eventueel mailbox |
| Bitwarden vault "Benairco" | Bitwarden | Bestaat nog niet | n.v.t. | n.v.t. | Aanmaken zodra eerste echte wachtwoorden bestaan |

## Transitie-roadmap

Drie fasen — niet alles tegelijk, niet uitstellen tot het te laat is.

### Fase A — Soft-launch (mei–oktober 2026)

Werken in huidige opzet onder Ritchel's accounts. Geen blocker, alles bouwt waarde op zonder dat we vastlopen. Aandachtspunten:

- Geen onomkeerbare beslissingen nemen die later transitie bemoeilijken (bv. geen domein-verhuizing naar een registrar waar Ben geen account kan krijgen)
- Toegang tot alles wat we aanmaken wordt vanaf nu in een tijdelijke wachtwoorden-notitie bijgehouden (lokaal, encrypted) zodat we niets kwijtraken vóór Bitwarden-vault bestaat

### Fase B — Ownership-setup (4–6 weken vóór hard-launch, Q3 2026)

Dit is een gepland traject, niet een toevallig moment. Drie bezoeken aan Ben gepland:

**Bezoek 1 — Bens digitale identiteit aanmaken (~2 uur, samen aan tafel)**

1. Google-account aanmaken op Bens naam:
   - E-mailadres: `ben.vriezen.benairco@gmail.com` of `benairco.beheer@gmail.com`
   - Recovery-mail: Bens persoonlijke e-mail (bestaande Outlook/Hotmail/Ziggo)
   - Recovery-telefoon: Bens mobiel
   - 2FA aanzetten met authenticator-app op Bens telefoon
2. LinkedIn-account voor Ben Vrieze (persoonlijk profiel, niet bedrijf):
   - Met Bens echte naam, foto, achtergrond
   - Gekoppeld aan Bens persoonlijke e-mail
3. Bitwarden-account voor Ben:
   - Master-wachtwoord schrijft Ben op papier en bewaart hij in zijn kluis (of bij belangrijke papieren)
   - Recovery-codes printen en bewaren op dezelfde plek

**Bezoek 2 — Eigenaarschap overdragen (~3 uur)**

1. Firebase-project: Ben toevoegen als Owner via IAM (Console → IAM & Admin → Add → Bens Google-mail → Role: Owner). Ritchel verlaagt zelf naar Editor.
2. GitHub-repo: óf transferren naar een Ben-owned GitHub-account (`github.com/benvriezen/benairco`), óf nieuwe GitHub-organisatie "Benairco" aanmaken onder Ben en repo daar inplaatsen. Ritchel wordt admin in die org.
3. Strato domein: registrant-data wijzigen naar `Aircoservice-Gelre, t.n.v. Ben Vrieze, Akkerstraat 18`. Strato-account zelf mag bij Ritchel blijven (operationeel) maar de WHOIS-houder wordt Ben.
4. Bitwarden vault "Benairco" aanmaken; alle bestaande wachtwoorden importeren; Ben krijgt collection-toegang.
5. Google Business Profile claimen onder Bens Google-account → adres-verificatie aanvragen (kaartje per post, 5-14 dagen). Ritchel toevoegen als Manager zodra verificatie binnen is.
6. LinkedIn-bedrijfspagina aanmaken vanaf Bens persoonlijke LinkedIn. Ritchel toevoegen als Content Admin.

**Bezoek 3 — Noodprocedure inrichten (~1 uur)**

1. Noodcontact identificeren: iemand uit Bens directe omgeving (partner, kind, broer/zus) die in geval van calamiteit hem kan helpen bij toegang. Geen IT-kennis nodig, alleen vertrouwd-persoon.
2. Verzegelde envelop met Bens Bitwarden master-wachtwoord + recovery-codes wordt bij die noodcontact bewaard (of bij notaris als Ben dat liever wil).
3. Samenwerkingsvoorwaarden ondertekend door beide partijen, met noodcontact-clausule expliciet erin.

### Fase C — Steady state (na hard-launch)

- Maandelijkse check: alle accounts nog actief, geen rechten ten onrechte uitgevallen
- Halfjaarlijks: Bitwarden vault doorlopen, dode accounts opruimen, nieuwe toevoegen
- Jaarlijks: domein-verlenging Strato (Ben krijgt factuur direct van Strato als houder, niet via Ritchel)
- Jaarlijks: noodcontact bevestigen dat envelop nog op de juiste plek ligt

## Calamiteit-scenario's

Wat gebeurt er bij...

**Ritchel overlijdt / langdurig onbereikbaar**
1. Noodcontact opent verzegelde envelop met Bens Bitwarden master-wachtwoord
2. Met behulp van Bitwarden vault kan een andere dienstverlener binnen 1 dag operationeel inhaken
3. Bens GBP, LinkedIn en Firebase staan al op zijn naam — geen overdracht nodig, alleen Ritchel uit IAM/Admin halen door de nieuwe partij
4. Domein-verlenging loopt door bij Strato (op Bens naam)

**Ben overlijdt / bedrijf staakt**
1. RaconSoft-abonnement wordt opgezegd door erven/curator
2. RaconSoft levert binnen 14 dagen: site-broncode (in deze repo), alle content, eventuele exports
3. Erven beslissen over domein-verlenging — laten verlopen óf overdragen aan derde

**Klant-relatie eindigt in conflict**
1. Ben krijgt onmiddellijk volledige Owner-rechten waar nodig
2. RaconSoft wordt uit alle accounts verwijderd
3. Broncode + data wordt geleverd zoals contractueel afgesproken
4. Domein blijft bij Strato op Bens naam — geen blokkade-risico

## Wat NIET in dit document hoort

- Concrete wachtwoorden — die staan alléén in Bitwarden, nooit ergens op disk of in git
- Persoonlijke gegevens van Bens noodcontact — die staan in de fysieke envelop, niet hier
- Tariefafspraken en SLA's — zie samenwerkingsvoorwaarden (separaat document)

## Wijzigingslog

| Datum | Wijziging | Door |
|---|---|---|
| 2026-05-13 | Initiële versie | Ritchel |
