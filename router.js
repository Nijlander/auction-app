import express from 'express';
import sets from './routes/sets.js';
import users from './routes/users.js';

const router = new express.Router();

router.use(express.json());
router.use(sets);
router.use(users);

export default router;