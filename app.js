const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const sets = [
    {
        id: 1,
        name: "ARC-170 Starfighter",
        release: 2010,
        parts: 396,
        theme: "Star Wars"

    },
    {
        id: 2,
        name: "AT-AT",
        release: 2020,
        parts: 1267,
        theme: "Star Wars"
    },
    {
        id: 3,
        name: "4x4 X-treme Off-Roader",
        release: 2019,
        parts: 958,
        theme: "Technic"
    }
];

/**
 * read all sets
 */
app.get('/api/sets', (req, res) => {
    res.send(sets);
});

/**
 * read a set
 */
app.get('/api/sets/:id', (req, res) => {
    const set = sets.find(c => c.id === parseInt(req.params.id));

    if (!set) {
        res.status(404).send('The set with the given ID was not found.');
        return;
    }

    res.send(set);
});

/**
 * create a set
 */
app.post('/api/sets', (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Name is required.');
        return;
    }

    if (!req.body.release) {
        res.status(400).send('Release year is required.');
        return;
    }

    if (!req.body.parts) {
        res.status(400).send('Amount of parts is required.');
        return;
    }

    if (!req.body.theme) {
        res.status(400).send('Theme is required.');
        return;
    }

    const set = {
        id: sets.length + 1,
        name: req.body.name,
        release: req.body.release,
        parts: req.body.parts,
        theme: req.body.theme
    };

    sets.push(set);
    res.send(set);
});

/**
 * update a set
 */
app.put('/api/sets/:id', (req, res) => {
    const set = sets.find(c => c.id === parseInt(req.params.id));

    if (!set) {
        res.status(404).send('The set with the given ID was not found.');
        return;
    }

    if (!req.body.name) {
        res.status(400).send('Name is required.');
        return;
    }

    if (!req.body.release) {
        res.status(400).send('Release year is required.');
        return;
    }

    if (!req.body.parts) {
        res.status(400).send('Amount of parts is required.');
        return;
    }

    if (!req.body.theme) {
        res.status(400).send('Theme is required.');
        return;
    }

    set.name = req.body.name;
    set.release = req.body.release;
    set.parts = req.body.parts;
    set.theme = req.body.theme;

    res.send(set);
});

/**
 * delete a set
 */
app.delete('/api/sets/:id', (req, res) => {
    const set = sets.find(c => c.id === parseInt(req.params.id));

    if (!set) {
        res.status(404).send('The set with the given ID was not found.');
    }

    const index = sets.indexOf(set);
    sets.splice(index, 1);

    res.send(set);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});