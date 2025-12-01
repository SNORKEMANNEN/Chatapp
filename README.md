# Chatapplikasjon

Dette er en enkel, lokal chat-applikasjon bygget med Node.js, Express og SQLite. Applikasjonen lar brukere opprette chatterom, velge et brukernavn, og sende meldinger som lagres permanent i en lokal database.

Dette prosjektet er en øvelse i å bygge en "full-stack" applikasjon fra bunnen av, med fokus på hvordan en frontend (HTML/JS) kan kommunisere med en backend (Node.js API) som igjen snakker med en database (SQLite).

---

##  Funksjoner

* **Opprett rom:** Brukere kan dynamisk opprette nye chatterom.
* **Persistent lagring:** Alle rom, brukere og meldinger lagres i en SQLite-database (`chat.db`). Appen husker alt selv om serveren restartes.
* **"Sanntids"-oppdatering:** Chatten henter nye meldinger hvert 3. sekund (polling).
* **Smarte tidsstempler:** Viser klokkeslett for meldinger sendt i dag, og "dager/uker/måneder siden" for eldre meldinger.
* **Slett meldinger:** Enkeltmeldinger kan slettes ved å trykke på et (×) kryss.

---

##  Teknologier

* **Backend:**
    * [Node.js](https://nodejs.org/en/) - JavaScript-kjøremiljø
    * [Express.js](https://expressjs.com/) - Minimalistisk web-rammeverk for Node.js
    * [sqlite3](https://github.com/TryGhost/node-sqlite3) - Driver for SQLite-databasen
    * [cors](https://www.npmjs.com/package/cors) - For å håndtere Cross-Origin Resource Sharing
* **Frontend:**
    * HTML5
    * CSS3
    * "Vanilla" JavaScript (ES6+ med `async/await` og `fetch`)
* **Database:**
    * [SQLite](https://www.sqlite.org/index.html) - Enkel, filbasert SQL-database

---

##  Oppsett og Kjøring

For å kjøre dette prosjektet lokalt, følg disse stegene:

**1. Klargjør prosjektet**

Sørg for at du har [Node.js](https://nodejs.org/en/) installert.

```bash
# 1. Klon (eller last ned) dette prosjektet til din maskin
# git clone [DIN_GIT_URL]

# 2. Gå inn i prosjektmappen
cd min-chat-app

# 3. Installer alle nødvendige pakker (express, sqlite3, cors, etc.)
npm install
