#  Chatapp

Her er chat-appen jeg har laget! Målet var å lære hvordan man bygger en hel nettside fra bunnen av med både frontend og backend.

Den er inspirert av Discord, og du kan bytte til **Dark Mode** så du ikke blir blind. 

---

##  Hva kan den gjøre?

* **Lage rom:** Du kan lage egne kanaler og bytte mellom dem.
* **Brukere:** Du velger deg et navn, og så er du i gang.
* **Sende bilder** 
* **Slette ting:** Du kan slette meldinger, kanaler og personer.
* **Dark Mode** 
* **Husker alt:** Alt lagres i en database, så meldingene er der selv om du restarter serveren.

---

##  Hva er den laget med?

Jeg holdt det enkelt og brukte ikke tunge frameworks. Bare ren koding for å skjønne hvordan ting funker.

* **Node.js** 
* **Express**
* **SQLite** 
* **HTML/CSS/JS:** Brukte litt tid på CSS-en for å få det til å se profesjonelt ut.

---

## Litt om koden

Her er noen av de viktigste delene i koden for å få ting til å funke.

### 1. Serveren tar imot meldinger
I `server.js` har vi denne delen. Når du trykker på "Send"-knappen, sender nettsiden data hit. Serveren tar imot bruker-ID, meldingen og rom-ID, og lagrer det i databasen.

```javascript
app.post('/message', (req, res) => {
    const { user, message, rom } = req.body;
    
    // Her skjer lagringen i databasen
    db.run("INSERT INTO melding (person_id, innhold, rom_id) VALUES (?, ?, ?)", 
        [user, message, rom], 
        function(err) {
            // Si ifra til nettsiden at det gikk bra
            res.json({ "status": "ok" });
        }
    );
});
```

### 2. Slik sender vi bilder
Vanligvis er bildeopplasting vanskelig. Jeg gjorde en "hack" i `index.html`. Jeg bruker `FileReader` til å gjøre bildet om til en kjempelang tekststreng (Base64). Da tror serveren at det bare er en vanlig tekstmelding!

```javascript
// Når du velger en fil...
filInput.addEventListener('change', function() {
    if (this.files[0]) {
        const leser = new FileReader();
        
        // Når filen er lest ferdig, send resultatet (teksten) til serveren
        leser.onload = (e) => send(e.target.result);
        
        // Start lesingen!
        leser.readAsDataURL(this.files[0]);
    }
});
```

### 3. Hente meldinger 
Siden jeg ikke bruker WebSockets (som er litt avansert), ba jeg nettsiden sjekke etter nye meldinger hvert 3. sekund.

```javascript
// Denne kjører automatisk hele tiden
setInterval(hentMld, 3000); 

async function hentMld() {
    // Hent data fra serveren for rommet vi er i
    const data = await (await fetch(API + '/messages/' + romId)).json();
    
    // Tegn opp meldingene på skjermen...
    // (Resten av koden oppdaterer HTML-en)
}
```

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
