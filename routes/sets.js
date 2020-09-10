import express from 'express';
import Joi from "joi";

const router = new express.Router();

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
 * schema for data validation
 * @type {Joi.ObjectSchema<any>}
 */
const schema = Joi.object({
    name: Joi.string().required(),
    release: Joi.number().required(),
    parts: Joi.number().required(),
    theme: Joi.string().required()
});

/**
 * route handler for GET /api/sets
 */
router.get('/api/sets', (req, res) => {
    res.send(sets);
});

/**
 * route handler for GET /api/sets/:id
 */
router.get('/api/sets/:id', (req, res) => {
    const set = sets.find(c => c.id === parseInt(req.params.id));

    if (!set) {
        res.status(404).send('set with specified id not found');
        return;
    }

    res.send(set);
});

/**
 * route handler for POST /api/sets
 */
router.post('/api/sets', (req, res) => {
    const {error, value} = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.message);
        return;
    }

    const set = {
        id: sets.length + 1,
        name: value.name,
        release: value.release,
        parts: value.parts,
        theme: value.theme
    };

    sets.push(set);
    res.send(set);
});

/**
 * route handler for PUT /api/sets/:id
 */
router.put('/api/sets/:id', (req, res) => {
    const set = sets.find(c => c.id === parseInt(req.params.id));

    if (!set) {
        res.status(404).send('set with specified id not found');
        return;
    }

    const {error, value} = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.message);
        return;
    }

    set.name = value.name;
    set.release = value.release;
    set.parts = value.parts;
    set.theme = value.theme;

    res.send(set);
});

/**
 * route handler for DELETE /api/sets/:id
 */
router.delete('/api/sets/:id', (req, res) => {
    const set = sets.find(c => c.id === parseInt(req.params.id));

    if (!set) {
        res.status(404).send('The set with the given ID was not found.');
    }

    const index = sets.indexOf(set);
    sets.splice(index, 1);

    res.send(set);
});

export default router;