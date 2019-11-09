import express from 'express';

export const usersRouter = express.Router()

// all users
usersRouter.get('/', (req, res) => res.send('Hello World!'));

// user by id
usersRouter.get('/:userID', (req, res) => res.send("da"));

// delete user by id
usersRouter.delete('/remove/:userID', (req, res) => res.send('da'));

// add user by id
usersRouter.post('/add/:userID', (req, res) => res.send('da'));

// update user by id
usersRouter.patch('/update/:userID', (req, res) => res.send('da'));
