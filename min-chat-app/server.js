const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// VIKTIG: Vi øker grensen til 10mb så vi kan sende bilder (som er lang tekst)
app.use(express.json({ limit: '10mb' }));

// Koble til databasen
const db = new sqlite3.Database('./chat.db');

// --- OPPSETT AV DATABASEN (Kjøres én gang når serveren starter) ---
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Personer (id INTEGER PRIMARY KEY, navn TEXT UNIQUE)");
    db.run("CREATE TABLE IF NOT EXISTS Rom (id INTEGER PRIMARY KEY, navn TEXT UNIQUE)");
    db.run(`CREATE TABLE IF NOT EXISTS melding (
        id INTEGER PRIMARY KEY, 
        person_id INTEGER, 
        rom_id INTEGER, 
        innhold TEXT, 
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// --- NETTSIDEN ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- API (Kommunikasjon med databasen) ---

// 1. Hent alle rom
app.get('/rooms', (req, res) => {
    db.all("SELECT * FROM Rom ORDER BY navn ASC", (err, rader) => {
        res.json({ "data": rader });
    });
});

// 2. Lag nytt rom
app.post('/room', (req, res) => {
    const navn = req.body.navn;
    db.run("INSERT INTO Rom (navn) VALUES (?)", [navn], function(err) {
        if (err) {
            res.status(409).json({ error: "Navnet finnes fra før" });
        } else {
            res.json({ id: this.lastID, navn: navn });
        }
    });
});

// 3. Slett et rom (NY)
app.delete('/room/:id', (req, res) => {
    db.run("DELETE FROM Rom WHERE id = ?", [req.params.id], function(err) {
        res.json({ "status": "slettet" });
    });
});

// 4. Hent meldinger i et rom
app.get('/messages/:rom_id', (req, res) => {
    const sql = `
        SELECT melding.innhold, melding.timestamp, Personer.navn, melding.id
        FROM melding 
        JOIN Personer ON melding.person_id = Personer.id
        WHERE melding.rom_id = ?
        ORDER BY melding.timestamp DESC LIMIT 50
    `;
    db.all(sql, [req.params.rom_id], (err, rader) => {
        res.json({ "data": rader.reverse() });
    });
});

// 5. Send en melding (Tekst eller Bilde)
app.post('/message', (req, res) => {
    const { user, message, rom } = req.body; 
    
    db.run("INSERT INTO melding (person_id, innhold, rom_id) VALUES (?, ?, ?)", 
        [user, message, rom], 
        function(err) {
            if(err) console.error(err);
            res.json({ "status": "ok" });
        }
    );
});

// 6. Slett melding
app.delete('/message/:id', (req, res) => {
    db.run("DELETE FROM melding WHERE id = ?", [req.params.id], function(err) {
        res.json({ "status": "slettet" });
    });
});

// --- BRUKERE ---

// 7. Hent alle brukere
app.get('/users', (req, res) => {
    db.all("SELECT * FROM Personer ORDER BY navn ASC", (err, rader) => {
        res.json({ "data": rader });
    });
});

// 8. Legg til ny bruker
app.post('/user', (req, res) => {
    const navn = req.body.navn;
    db.run("INSERT INTO Personer (navn) VALUES (?)", [navn], function(err) {
        if (err) {
            res.status(400).json({ error: "Navnet finnes allerede" });
        } else {
            res.json({ id: this.lastID, navn: navn });
        }
    });
});

// 9. Slett bruker
app.delete('/user/:id', (req, res) => {
    db.run("DELETE FROM Personer WHERE id = ?", [req.params.id], function(err) {
        res.json({ status: "deleted" });
    });
});

// Start serveren
app.listen(port, () => {
    console.log(`Serveren er oppe på http://localhost:${port}`);
});