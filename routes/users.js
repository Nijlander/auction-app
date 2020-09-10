import express from 'express';
import Joi from 'joi';

const router = new express.Router();

const users = [
    {
        id: 1,
        username: "admin",
        password: "admin",
        email: "test@test.test",
        currentAuctions: [],
        soldAuctions: []
    },
    {
        isd: 2,
        username: "admin",
        password: "admin",
        email: "test@test.test",
        currentAuctions: [],
        soldAuctions: []
    },
    {
        id: 3,
        username: "admin",
        password: "admin",
        email: "test@test.test",
        currentAuctions: [],
        soldAuctions: []
    }
];

/**
 * schema for data validation
 * @type {Joi.ObjectSchema<any>}
 */
const schema = Joi.object({
    username: Joi.string().required().min(5),
    password: Joi.string().required(),
    email: Joi.string().required().email()
});

/**
 * route handler for GET /api/users
 */
router.get('/api/users', (req, res) => {
    res.send(users);
})

/**
 * route handler for GET /api/users/:id
 */
router.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));

    if (!user) {
        res.status(404).send('user with specified id not found');
        return;
    }

    res.send(user);
});

/**
 * route handler for POST /api/users/
 */
router.post('/api/users', (req, res) => {
    const {error, value} = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.message);
    }

    const user = {
        id: users[users.length - 1].id + 1,
        username: value.username,
        password: value.password,
        email: value.email,
        currentAuctions: [],
        soldAuctions: []
    }

    users.push(user);
    res.send(user);
});

/**
 * route handler for PUT /api/users/:id
 */
router.put('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));

    if (!user) {
        res.status(404).send('user with specified id not found');
        return;
    }

    const {error, value} = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.message);
        return;
    }

    user.username = value.username;
    user.password = value.password;
    user.email = value.email;

    res.send(user);
});

/**
 * route handler for DELETE /api/users/:id
 */
router.delete('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));

    if (!user) {
        res.status(404).send('user with the specified id not found');
        return;
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});

export default router;