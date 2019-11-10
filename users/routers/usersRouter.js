import express from 'express';
import {goalsRouter} from './goalsRouter';
import cors from 'cors';

const repassUserID = (req, res, next) => {
  req.userID = req.params.userID;
  next();
}

export const usersRouter = express.Router()

usersRouter.use(cors());

usersRouter.use(express.json());

usersRouter.use('/:userID/goals', repassUserID, goalsRouter);

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
