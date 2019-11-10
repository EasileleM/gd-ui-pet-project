import express from 'express';
import {goalsRouter} from './goalsRouter';
import usersService from '../services/usersService';
import cors from 'cors';

const repassUserID = (req, res, next) => {
  req.userID = req.params.userID;
  next();
}

const usersServiceInstance = new usersService();

export const usersRouter = express.Router()

usersRouter.use(cors());

usersRouter.use(express.json());

usersRouter.use('/:userID/goals', repassUserID, goalsRouter);

// all users
usersRouter.get('/', usersServiceInstance.getAll);

// user by id
usersRouter.get('/:userID', usersServiceInstance.getById);

// delete user by id
usersRouter.delete('/remove/:userID', usersServiceInstance.delete);

// add user by id
usersRouter.post('/add', usersServiceInstance.add);

// update user by id
usersRouter.patch('/update/:userID', usersServiceInstance.update);
