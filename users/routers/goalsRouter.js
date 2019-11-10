import express from 'express';
import cors from 'cors';
import goalsService from '../services/goalsService';

export const goalsRouter = express.Router();

const goalsServiceInstance = new goalsService();

goalsRouter.use(cors());

goalsRouter.use(express.json());

// goals by user id
goalsRouter.get('/', goalsServiceInstance.getAll);

// goals by id by user id
goalsRouter.get('/:goalID', goalsServiceInstance.getById);

// delete user's goal
goalsRouter.delete('/remove/:goalID', goalsServiceInstance.deleteGoal);

// add user's goal
goalsRouter.post('/add', goalsServiceInstance.addGoal);

// update user's goal
goalsRouter.patch('/update/:goalID',  goalsServiceInstance.updateGoal);
