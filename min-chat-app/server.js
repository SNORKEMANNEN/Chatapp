const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Server statiske filer
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



// Databasetilkobling 
const db = new sqlite3.Database('./chat.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Koblet til chat.db-databasen.');
});

// Hent alle rom
app.get('/rooms', (req, res) => {
    const sql = "SELECT id, navn FROM Rom ORDER BY navn ASC";
    db.all(sql, [], (err, rows) => {
        if (err) { res.status(500).json({ "error": err.message }); return; }
        res.json({ "message": "success", "data": rows });
    });
});

// Opprett et nytt rom
app.post('/room', (req, res) => {
    const { navn } = req.body;
    if (!navn || navn.trim() === '') {
        return res.status(400).json({ "error": "Rom-navn kan ikke være tomt." });
    }

    const sql = "INSERT INTO Rom (navn) VALUES (?)";
    db.run(sql, [navn], function(err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                db.get("SELECT id, navn FROM Rom WHERE navn = ?", [navn], (e, row) => {
                    return res.status(409).json(row); 
                });
            } else {
                return res.status(500).json({ "error": err.message });
            }
        } else {
            res.status(201).json({ id: this.lastID, navn: navn });
        }
    });
});

// Hent meldinger for et spesifikt rom
app.get('/messages/:rom_id', (req, res) => {
    const rom_id = req.params.rom_id;
    
    const sql = `
        SELECT T1.id, T1.innhold, T2.navn, T1.timestamp 
        FROM melding AS T1
        JOIN Personer AS T2 ON T1.person_id = T2.id
        WHERE T1.rom_id = ? 
        ORDER BY T1.timestamp DESC 
        LIMIT 50`;

    db.all(sql, [rom_id], (err, rows) => {
        if (err) { res.status(500).json({ "error": err.message }); return; }
        res.json({ "message": "success", "data": rows.reverse() }); 
    });
});
// Post en ny melding
app.post('/message', (req, res) => {
    const { user, message, rom } = req.body; 
    
    if (!user || !message || !rom) {
        return res.status(400).json({ "error": "Mangler navn, melding eller rom-ID." });
    }
    
    const findUserSql = "SELECT id FROM Personer WHERE navn = ?";
    db.get(findUserSql, [user], (err, row) => {
        if (err) { return res.status(500).json({ "error": err.message }); }

        if (row) {
            insertMessage(row.id, message, rom, res);
        } else {
            const createUserSql = "INSERT INTO Personer (navn) VALUES (?)";
            db.run(createUserSql, [user], function(err) {
                if (err) { return res.status(500).json({ "error": err.message }); }
                insertMessage(this.lastID, message, rom, res);
            });
        }
    });
});

function insertMessage(person_id, innhold, rom_id, res) {
    const sql = "INSERT INTO melding (person_id, innhold, rom_id) VALUES (?, ?, ?)";
    db.run(sql, [person_id, innhold, rom_id], function (err) {
        if (err) { res.status(500).json({ "error": err.message }); return; }
        res.status(201).json({ "message": "success", "id": this.lastID });
    });
}

// Nytt endepunkt for å SLETTE en melding
app.delete('/message/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM melding WHERE id = ?";
    
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        // Bare for å være sikker på at vi faktisk slettet noe
        if (this.changes === 0) {
            return res.status(404).json({ "error": "Melding ikke funnet." });
        }
        res.status(200).json({ "message": "Melding slettet." });
    });
});

// Database-oppsett og Server-start
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Personer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            navn TEXT UNIQUE
        )
    `);
    
    db.run(`
        CREATE TABLE IF NOT EXISTS Rom (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            navn TEXT UNIQUE
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS melding (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            person_id INTEGER,
            rom_id INTEGER,
            innhold TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (person_id) REFERENCES Personer (id),
            FOREIGN KEY (rom_id) REFERENCES Rom (id)
        )
    `, (err) => {
        if (err) {
            console.error("KRITISK FEIL under oppretting av 'melding'-tabell:", err.message);
            return;
        }
        
        console.log("Databasestruktur er klar.");

        app.listen(port, () => {
            console.log(`Server kjører på http://localhost:${port}`);
        });
    });
});