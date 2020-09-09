import express from 'express';
import router from './router.js';

const app = new express();
const port = 3000;

app.use(router);
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});