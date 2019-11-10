import db from '../db/db';
import axios from 'axios';

const dbInstance = new db();
const goalsServiceURI = `http://localhost:4000/goals`;

export default class goalService {
  getAll(req, res) {
    return axios.get(goalsServiceURI + `/users/${req.userID}`)
      .then((items) => {
        res.status(200).send(JSON.stringify(items.data));
      })
      .catch((err) => {
        if (err.response.status) {
          res.status(err.response.status).send(err.response.data);
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send(`INTERNAL SERVER ERROR`);
      })
  }

  getById(req, res) {
    return axios.get(goalsServiceURI + `/${req.params.goalID}/users/${req.userID}`)
      .then((items) => {
        res.status(200).send(JSON.stringify(items.data));
      })
      .catch((err) => {
        if (err.response.status) {
          res.status(err.response.status).send(err.response.data);
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send(`INTERNAL SERVER ERROR`);
      })
  }

  deleteGoal(req, res) {
    return axios.delete(goalsServiceURI + `/remove/${req.params.goalID}/users/${req.userID}`)
      .then((items) => {
        res.status(200).send();
      })
      .catch((err) => {
        if (err.response.status) {
          res.status(err.response.status).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send();
      })
  }

  addGoal(req, res) {
    return axios.post(goalsServiceURI + `/add/users/${req.userID}`, req.body)
      .then((items) => {
        res.status(200).send();
      })
      .catch((err) => {
        if (err.response.status) {
          res.status(err.response.status).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send();
      })
  }

  updateGoal(req, res) {
    return axios.patch(goalsServiceURI + `/update/${req.params.goalID}/users/${req.userID}`, req.body)
      .then((items) => {
        res.status(200).send();
      })
      .catch((err) => {
        if (err.response.status) {
          res.status(err.response.status).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send();
      })
  }
}