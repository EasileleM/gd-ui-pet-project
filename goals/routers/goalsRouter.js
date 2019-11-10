import express from 'express';
import cors from 'cors';
import goalService from '../services/goalsService';

const goalServiceInstance = new goalService();

export const goalsRouter = express.Router();

goalsRouter.use(cors());

goalsRouter.use(express.json())

// all goals
goalsRouter.get('/', goalServiceInstance.getAll);

// goal by id
goalsRouter.get('/:goalID', goalServiceInstance.getById);

// goals by user id
goalsRouter.get('/user/:userID', goalServiceInstance.getByUsersId);

// goals by id by user id
goalsRouter.get('/:goalID/user/:userID', goalServiceInstance.getUserGoalById);

// delete goal
goalsRouter.delete('/remove/:goalID', goalServiceInstance.deleteGoal);

// add user's goal
goalsRouter.post('/add/user/:userID', goalServiceInstance.add);

// update user's goal
goalsRouter.patch('/update/:goalID',  goalServiceInstance.update);
