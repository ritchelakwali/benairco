# Deploy-setup voor benairco.nl

Stap-voor-stap handleiding om Benairco live te krijgen op Firebase Hosting via de bestaande GitHub Actions workflows. Doe dit één keer; daarna deployt iedere push naar `main` automatisch.

## Stap 1 — Firebase-project aanmaken

1. Ga naar [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Add project** → projectnaam **Benairco**
3. Project-ID moet exact **`benairco`** worden (dit staat ook in `.firebaserc` en de GitHub workflows). Als Firebase de naam al claimt zegt hij "benairco-1234" — klik dan op het potlood-icoontje en pas terug naar `benairco`. Lukt dat niet, kies een eigen ID en pas `.firebaserc` + beide workflows daarna aan.
4. Google Analytics? Niet inschakelen — we willen geen tracking op deze site.
5. Project aangemaakt → **Build** in de linker zijbalk → **Hosting** → **Get started** → doorklikken (alle defaults zijn prima).

## Stap 2 — GitHub Secret voor de deploy-action

De workflows in deze repo deployen via een **service account** — een soort robot-gebruiker met enkel deploy-rechten op jouw Firebase project. Dat is een JSON-bestand met een privésleutel dat **nooit in je repo komt**; het hoort in GitHub Secrets, waar GitHub Actions het tijdens een run veilig ophaalt.

Twee paden — kies wat past.

### Pad A — `firebase init hosting:github` (snel, als je Firebase CLI lokaal hebt)

Lokaal in deze projectmap (op je laptop):

```bash
npm install -g firebase-tools   # alleen als je 'm nog niet hebt
firebase login                  # opent browser voor Google-login
firebase init hosting:github
```

De CLI stelt een rij vragen. Antwoorden:

| Vraag | Antwoord |
|------|------|
| `For which GitHub repository...?` | `ritchelakwali/benairco` |
| `Set up the workflow to run a build script before every deploy?` | **Yes** |
| `What script should be run before every deploy?` | druk Enter — accept default (`npm ci && npm run build`) |
| `Set up automatic deployment to your site's live channel...?` | **Yes** |
| `What is the name of the GitHub branch...?` | `main` |
| `firebase-hosting-merge.yml already exists. Overwrite?` | **No** (jouw workflows blijven) |
| `firebase-hosting-pull-request.yml already exists. Overwrite?` | **No** |

Wat de CLI achter de schermen doet:

- Opent OAuth-popup voor toestemming op je GitHub-account
- Maakt een service account aan in Firebase (zichtbaar in **Project Settings → Service Accounts → "github-action-…"**)
- Genereert de privésleutel
- Slaat hem op als GitHub repository secret onder de naam **`FIREBASE_SERVICE_ACCOUNT_BENAIRCO`**

Je krijgt de JSON zelf niet te zien — en dat is goed. De secret zit veilig in GitHub.

### Pad B — Handmatig (als je geen CLI wil, of pad A weigert)

**In de Firebase Console:**

1. Open je `benairco` project
2. Tandwiel-icoon naast "Project Overview" (linksboven) → **Project settings**
3. Tab **Service accounts**
4. Onderaan: knop **Generate new private key** → pop-up bevestigen → **Generate key**
5. Een JSON wordt automatisch gedownload (heet iets als `benairco-firebase-adminsdk-xxxxx.json`)

**In GitHub:**

6. Ga naar [https://github.com/ritchelakwali/benairco/settings/secrets/actions](https://github.com/ritchelakwali/benairco/settings/secrets/actions)
7. **New repository secret**
8. **Name** (exact, hoofdlettergevoelig): `FIREBASE_SERVICE_ACCOUNT_BENAIRCO`
9. **Secret**: open de gedownloade JSON in een editor, kopieer de **hele inhoud** (van `{` tot en met `}`), plak in dit veld
10. **Add secret**

**Daarna direct:**

11. Verplaats de JSON naar je prullenbak en leeg die. De sleutel blijft geldig totdat je hem revoke't in Firebase Console — een gelekte kopie is een groot risico. Niet bewaren "voor later"; je kunt altijd een nieuwe genereren.

### Welke pad?

Pad A is sneller (2 min) als je Firebase CLI al hebt en geen bezwaar hebt tegen een OAuth-popup. Pad B is transparanter (je ziet wat er gebeurt) en duurt ~5 min.

## Stap 3 — Custom domain koppelen (Firebase ↔ Strato)

Standaard krijgt je site een URL als `benairco.web.app`. Voor `benairco.nl` moet je Firebase vertellen welk domein erbij hoort, en hen toestaan een SSL-certificaat aan te vragen.

### 3a — Domein toevoegen in Firebase

1. Firebase Console → project `benairco` → **Build → Hosting** in de linker zijbalk
2. Op de Hosting-pagina, sectie **Custom domains** (onderaan) → **Add custom domain**
3. Vul in: `benairco.nl` (zonder `www`, zonder `https://`)
4. Vink **"Also set up redirect from www.benairco.nl"** aan — zo wordt `www` automatisch doorgestuurd naar het apex-domein
5. **Continue**

Firebase loopt nu door twee checks: domein-eigenaarschap (TXT-record) en hosting-routering (A-records).

### 3b — Het TXT-verificatie record noteren

Firebase toont in de wizard iets als:

```
Type: TXT
Host: @
Value: google-site-verification=AbCdEfGh1234567890iJkLmN...
```

**Noteer die `Value`-string.** Die heb je over een minuut nodig bij Strato.

> Klik nog niet op "Verify" in Firebase — eerst de records bij Strato zetten.

### 3c — De A-records noteren

Direct daaronder geeft Firebase **twee IP-adressen** voor hosting:

```
Type: A      Host: @      Value: 151.101.1.195    (voorbeeld!)
Type: A      Host: @      Value: 151.101.65.195   (voorbeeld!)
```

Noteer beide IP's exact zoals Firebase ze toont — gebruik **niet** de voorbeelden hierboven, Firebase kan een ander paar IP's geven.

### 3d — DNS instellen in Strato

1. Inloggen op [https://www.strato.nl/apps/CustomerService](https://www.strato.nl/apps/CustomerService)
2. **Domeinen** → klik op `benairco.nl`
3. Submenu **DNS-instellingen** (Duitse interface: "DNS verwalten")

Je ziet een tabel met huidige records. Strato heeft standaard parking-records die naar hun eigen IP wijzen — die gaan we vervangen.

4. **Verwijder bestaande A-records** voor `@` / `benairco.nl` die naar Strato's parking-page wijzen. Laat eventuele MX-records (voor e-mail) staan, die hebben niets met hosting te maken.

5. **Voeg deze vier records toe** (alle TTL: default / laat staan wat Strato voorstelt):

   | Type  | Host  | Waarde                                       |
   |-------|-------|----------------------------------------------|
   | TXT   | `@`   | `google-site-verification=...` (uit 3b)      |
   | A     | `@`   | IP-1 van Firebase (uit 3c)                   |
   | A     | `@`   | IP-2 van Firebase (uit 3c)                   |
   | CNAME | `www` | `benairco.nl`                                |

6. **Opslaan** in Strato. Propagatie duurt meestal 5–30 minuten, in het slechtste geval 24u.

> **Pas op met Strato-templates.** Sommige Strato-DNS-templates vervangen ALLES als je iets wijzigt, inclusief MX-records. Check na opslaan dat eventuele bestaande MX-records nog staan; als je via Strato e-mail gebruikt, voeg ze opnieuw toe.

### 3e — Terug naar Firebase, verificatie afmaken

1. Wacht 5 minuten zodat het TXT-record propageert (`nslookup -type=TXT benairco.nl` op je laptop laat zien of het er staat)
2. In de Firebase Hosting wizard: klik **Verify**
3. Firebase ziet het TXT-record → status van "Needs setup" → "Setup pending"
4. Hierna gaat Firebase wachten op de A-records én aanvragen van een SSL-certificaat (Let's Encrypt). Status loopt door:
   - **Needs setup** — DNS nog niet (helemaal) goed gevonden
   - **Setup pending** — Records zijn er, certificaat in aanvraag
   - **Connected** — Klaar. Live op `https://benairco.nl` en `https://www.benairco.nl`

SSL-uitgifte duurt typisch een paar minuten tot een paar uur. Tot het zover is werkt de site al wel op HTTP (kortstondige redirect-fout op HTTPS). Niets stuk; gewoon afwachten.

## Stap 4 — Eerste deploy triggeren

Als de eerste push naar `main` (de initial scaffold) is gepusht zonder dat de secret bestond, dan is die workflow-run gefaald. Geen probleem — je triggert een nieuwe met een lege commit:

```bash
git commit --allow-empty -m "ci: trigger first deploy"
git push
```

Open daarna [https://github.com/ritchelakwali/benairco/actions](https://github.com/ritchelakwali/benairco/actions) en kijk hoe **"Deploy to Firebase Hosting on merge"** door de stappen loopt. Bij succes verschijnt de live-URL onderaan de job-log.

## Veelvoorkomende problemen

- **Workflow faalt met "Error: Failed to authenticate"** — Secret ontbreekt of bevat een typo in de naam. Check spelling: `FIREBASE_SERVICE_ACCOUNT_BENAIRCO` (hoofdletters, underscore, geen koppelteken).
- **Firebase toont "Needs setup" na lang wachten** — Records niet correct opgeslagen. Check `nslookup benairco.nl` (moet de Firebase-IP's tonen, niet Strato's). Records kunnen tot 24u nodig hebben om wereldwijd te propageren, maar in Nederland gaat het meestal sneller.
- **www.benairco.nl laadt niet** — CNAME op `www` ontbreekt of wijst niet naar `benairco.nl`. Strato accepteert geen apex-CNAME (CNAME op `@`), maar `www` als CNAME werkt wel.
- **SSL blijft "Pending"** — Geduld. Let's Encrypt heeft soms een wachtrij. Als het na 6 uur nog hangt: in Firebase Console klik je op het domein en gebruik je "Retry SSL provisioning".
- **PR-preview deploy faalt op forks** — Workflow heeft een check ingebouwd: PR's van forks worden overgeslagen omdat ze geen secrets-toegang krijgen. Eigen branches in eigen repo werken normaal.

## Wat als ik later wil terug-draaien?

- **Service account-key intrekken** (bij verdenking lek): Firebase Console → Service Accounts → Manage service account permissions → vind het account → delete the key. Maak nieuwe key, update GitHub secret.
- **Workflow tijdelijk uitzetten**: GitHub repo → Actions → kies workflow → "..." rechtsboven → "Disable workflow". Re-enable wanneer je weer wil deployen.
- **Site offline halen**: `firebase hosting:disable --project benairco` (laat custom domain staan; je kunt 'm later weer aanzetten).
