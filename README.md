#  Chatapp

Her er chat-appen jeg har laget! Målet var å lære hvordan man bygger en hel nettside fra bunnen av med både frontend og backend.

Den er inspirert av Discord, og du kan bytte til **Dark Mode** så du ikke blir blind. 

---

##  Hva kan den gjøre?

* **Lage rom:** Du kan lage egne kanaler og bytte mellom dem.
* **Brukere:** Du velger deg et navn, og så er du i gang.
* **Sende bilder:** 
* **Slette ting:** Du kan slette meldinger, kanaler og personer.
* **Dark Mode:** 
* **Husker alt:** Alt lagres i en database, så meldingene er der selv om du restarter serveren.

---

##  Hva er den laget med?

Jeg holdt det enkelt og brukte ikke tunge frameworks. Bare ren koding for å skjønne hvordan ting funker.

* **Node.js:** 
* **Express:**
* **SQLite:** 
* **HTML/CSS/JS:** Brukte litt tid på CSS-en for å få det til å se profesjonelt ut.

---

##  Hvordan kjøre den?

**1. Du må ha Node**
Sjekk at du har [Node.js](https://nodejs.org/) installert først.

**2. Fiks mappen**
Åpne terminalen og skriv dette:

```bash
# Gå inn i mappen
cd min-chat-app

# Last ned pakkene som trengs
npm install express sqlite3 cors
