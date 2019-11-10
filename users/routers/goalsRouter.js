import express from 'express';
import cors from 'cors';

export const goalsRouter = express.Router();

goalsRouter.use(cors());

goalsRouter.use(express.json());

// goals by user id
goalsRouter.get('/', (req, res) => res.send('dvaa'));

// goals by id by user id
goalsRouter.get('/:goalID', (req, res) => res.send('dvasa'));

// delete user's goal
goalsRouter.delete('/remove/:goalID', (req, res) => res.send('dvaa'));

// add user's goal
goalsRouter.post('/add', (req, res) => res.send('dvaa'));

// update user's goal
goalsRouter.patch('/update/:goalID',  (req, res) => res.send('dvaa'));
