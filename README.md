# 💬 Modern Chat Application

Dette er en komplett **Full-Stack Chat-applikasjon** bygget fra bunnen av. Prosjektet er designet for å lære bort kjerneprinsippene i webutvikling ved å koble sammen en **Frontend** (HTML/CSS/JS) med en **Backend** (Node.js) og en **Database** (SQLite).

Applikasjonen har et moderne, "clean" design inspirert av apper som Discord, med støtte for både **Dark Mode**, **Bildeopplasting** og **Administrasjon** (sletting).

---

##  Funksjonalitet

###  Design & Brukeropplevelse
* **Moderne UI:** Rent design med mye luft, runde hjørner og skygger.
* **Dark Mode / Light Mode:** Bytt tema med et knappetrykk. Fargene styres dynamisk via CSS-variabler.
* **Responsiv:** Fungerer fint på ulike skjermstørrelser.

###  Kjernefunksjoner
* **Kanaler (Rom):** Opprett nye chatterom (#kanaler) og bytt mellom dem.
* **Brukere:** Opprett en brukerprofil for å delta i samtalen.
* **Meldinger:** Send tekstmeldinger som lagres permanent.
* **Bildeopplasting:** Send bilder direkte i chatten! (Bildene konverteres til tekst og lagres i databasen).
* **Sletting:** Hold musen over en kanal, bruker eller melding for å se slette-ikonet (søppelbøtte/kryss).
* **Sanntids-følelse:** Chatten oppdaterer seg automatisk hvert 3. sekund (Polling).

---

##  Teknologier

Dette prosjektet bruker **ingen store rammeverk** (som React eller Angular) på frontend, for å holde koden enkel og lærerik.

### Backend (Server)
* **[Node.js](https://nodejs.org/):** JavaScript på serveren.
* **[Express](https://expressjs.com/):** Håndterer API-ruter (GET, POST, DELETE).
* **[SQLite3](https://github.com/TryGhost/node-sqlite3):** Enkel SQL-database som lagres i en fil.
* **[CORS](https://www.npmjs.com/package/cors):** Tillater kommunikasjon mellom frontend og backend.

### Frontend (Klient)
* **HTML5:** Struktur.
* **CSS3:** Flexbox, CSS Variables (`:root`) for theming.
* **JavaScript (ES6+):** `async/await` for API-kall og logikk.
* **Google Fonts & Icons:** "Inter" font og "Material Icons".

---

##  Installasjon og Kjøring

Følg disse stegene for å kjøre prosjektet lokalt på din maskin.

### 1. Forutsetninger
Du må ha [Node.js](https://nodejs.org/) installert.

### 2. Klargjør prosjektet
Åpne terminalen (eller command prompt) og naviger til mappen du vil ha prosjektet i.

```bash
# 1. Lag en ny mappe (hvis du ikke har en)
mkdir min-chat-app
cd min-chat-app

# 2. Initialiser prosjektet (hvis du ikke har package.json fra før)
npm init -y

# 3. Installer de nødvendige pakkene
npm install express sqlite3 cors
