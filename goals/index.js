import express from 'express';
import {goalsRouter} from './routers/goalsRouter';

const app = express();
const port = 4000;

app.use('/goals', goalsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));