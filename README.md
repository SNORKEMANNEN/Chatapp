#  Min Chat App

Her er chat-appen jeg har laget! Målet var å lære hvordan man bygger en hel nettside fra bunnen av – altså både det du ser (frontend) og serveren som jobber i bakgrunnen (backend).

Den ser ganske clean ut (inspirert av Discord), og du kan bytte til **Dark Mode** så du ikke blir blind om kvelden. 😎

---

##  Hva kan den gjøre?

* **Lage rom:** Du kan lage egne kanaler (#generelt, #gaming, osv.) og bytte mellom dem.
* **Brukere:** Du velger deg et navn, og så er du i gang.
* **Sende bilder:** Ja, du kan faktisk sende bilder! 📸
* **Slette ting:** Angrer du på en melding? Eller vil du fjerne en kanal? Bare hold musa over og trykk på søppelbøtta.
* **Dark Mode:** Fordi lyst modus er pain.
* **Husker alt:** Alt lagres i en database, så meldingene er der selv om du restarter serveren.

---

##  Hva er den laget med?

Jeg holdt det enkelt og brukte ikke tunge frameworks som React. Bare ren koding for å skjønne hvordan ting funker.

* **Node.js:** Motoren som kjører serveren.
* **Express:** Hjelper oss å styre trafikken (API-et).
* **SQLite:** En superenkel database som bare er én fil. Slipper å sette opp masse styr.
* **HTML/CSS/JS:** Det du ser i nettleseren. Brukte litt tid på CSS-en for å få det til å se proft ut.

---

##  Hvordan kjøre den?

**1. Du må ha Node**
Sjekk at du har [Node.js](https://nodejs.org/) installert først.

**2. Fiks mappen**
Åpne terminalen (eller CMD) og skriv dette:

```bash
# Gå inn i mappen
cd min-chat-app

# Last ned pakkene som trengs
npm install express sqlite3 cors
