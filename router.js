import express from 'express';
import sets from './routes/sets.js';

const router = new express.Router();

router.use(express.json());
router.use(sets);

export default router;