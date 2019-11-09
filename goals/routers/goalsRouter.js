import express from 'express';

export const goalsRouter = express.Router();

// all goals
goalsRouter.get('/', (req, res) => res.send(req.params.id));

// goals by user id
goalsRouter.get('/users/:userID', (req, res) => res.send(req.params.id));

// goals by id by user id
goalsRouter.get('/:goalID/users/:userID', (req, res) => res.send(req.params.id));

// delete user's goal
goalsRouter.delete('/remove/:goalID/users/:userID', (req, res) => res.send(req.params.id));

// add user's goal
goalsRouter.post('/add/users/:userID', (req, res) => res.send(req.params.id));

// update user's goal
goalsRouter.patch('/update/:goalID/users/:userID',  (req, res) => res.send(req.params.id));
