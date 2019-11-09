import express from 'express';

export const goalsRouter = express.Router();

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
