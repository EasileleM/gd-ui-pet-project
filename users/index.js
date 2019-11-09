import express from 'express';
import {usersRouter} from './routers/usersRouter';
import {goalsRouter} from './routers/goalsRouter';

const app = express();
const port = 4500;

app.use('/users', usersRouter);

app.use('/users/:userID/goals', goalsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));