import express from 'express';
import {usersRouter} from './routers/usersRouter';

const app = express();
const port = 4800;

app.use('/users', usersRouter);

app.listen(port, () => console.log(`Listening on port ${port}\nURL: http://localhost:${port}`));