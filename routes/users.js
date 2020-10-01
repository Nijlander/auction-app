import express from 'express';
import Joi from 'joi';

const router = new express.Router();

const users = [
    {
        id: 1,
        username: "admin1",
        password: "password1",
        email: "jrnijland1@gmail.com"
    },
    {
        id: 2,
        username: "admin2",
        password: "password2",
        email: "jrnijland1@gmail.com"
    },
    {
        id: 3,
        username: "admin3",
        password: "password3",
        email: "jrnijland1@gmail.com"
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
        return;
    }

    const user = {
        id: users[users.length - 1].id + 1,
        username: value.username,
        password: value.password,
        email: value.email
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

/**
 * route handler for POST /api/login
 */
router.post('/api/login', (req, res) => {
    const user = users.find(c => c.username === req.body.username);

    if (!user) {
        res.status(404).send('user with the specified username not found');
        return;
    }

    if (user.password !== req.body.password) {
        res.status(401).send('wrong password');
        return;
    }

    res.send(true);
});

export default router;