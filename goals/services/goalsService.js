import db from '../db/db';

const dbInstance = new db();

export default class goalService {
  getAll(req, res) {
    return dbInstance
      .getAll()
      .then((items) => {
        res.status(200).send(JSON.stringify(items));
      })
      .catch((err) => {
        res.status(500).send(`INTERNAL SERVER ERROR`);
      })
  }

  getById(req, res) {
    return dbInstance
      .getById(req.params.goalID)
      .then((item) => {
        if (!item) {
          res.status(404).send(`NOT FOUND: ${req.params.goalID}`);
          return;
        }
        res.status(200).send(JSON.stringify(item));
      })
      .catch((err) => {
        if (err.message === `BAD ID`) {
          res.status(400).send(`BAD ID: ${req.params.goalID}`);
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send(`INTERNAL SERVER ERROR`);
      });
  }

  getByUsersId(req, res) {
    return dbInstance
      .getByUsersId(req.params.userID)
      .then((item) => {
        if (!item) {
          res.status(404).send(`NOT FOUND: ${req.params.goalID}`);
          return;
        }
        res.status(200).send(JSON.stringify(item));
      })
      .catch((err) => {
        if (err.message === `BAD ID`) {
          res.status(400).send(`BAD ID: ${req.params.userID}`);
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send(`INTERNAL SERVER ERROR`);
      });
  }

  getUserGoalById(req, res) {
    return dbInstance
      .getUserGoalById(req.params.goalID, req.params.userID)
      .then((item) => {
        if (!item) {
          res.status(404).send(`NOT FOUND: ${req.params.goalID}`);
          return;
        }
        res.status(200).send(JSON.stringify(item));
      })
      .catch((err) => {
        if (err.message === `BAD USER ID`) {
          res.status(400).send(`BAD ID: ${req.params.userID}`);
          return;
        }
        throw err;
      })
      .catch((err) => {
        if (err.message === `BAD GOAL ID`) {
          res.status(400).send(`BAD ID: ${req.params.goalID}`);
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send(`INTERNAL SERVER ERROR`);
      })
  }

  delete(req, res) {
    return dbInstance
      .deleteById(req.params.goalID)
      .then((result) => {
        if (!result.result.n) {
          res.status(404).send();
          return;
        }
        res.status(200).send();
      })
      .catch((err) => {
        if (err.message === `BAD ID`) {
          res.status(400).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send();
      });
  }

  deleteByUserId(req, res) {
    return dbInstance
      .deleteByUserId(req.params.goalID, req.params.userID)
      .then((result) => {
        if (!result.result.n) {
          res.status(404).send();
          return;
        }
        res.status(200).send();
      })
      .catch((err) => {
        if (err.message === `BAD USER ID`) {
          res.status(400).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        if (err.message === `BAD GOAL ID`) {
          res.status(400).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send();
      })
  }

  updateByUserId(req, res) {
    return dbInstance
      .updateByUserId(req.params.goalID, req.params.userID, req.body)
      .then((result) => {
        if (!result.result.n) {
          res.status(404).send();
          return;
        }
        res.status(200).send();
      })
      .catch((err) => {
        if (err.message === `BAD USER ID`) {
          res.status(400).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        if (err.message === `BAD GOAL ID`) {
          res.status(400).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send();
      })
  }

  add(req, res) {
    return dbInstance
      .insertOne(req.body, req.params.userID)
      .then((result) => {
        res.status(200).send();
      })
      .catch((err) => {
        if (err.message === `BAD USER ID`) {
          res.status(400).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send();
      });
  }

  update(req, res) {
    return dbInstance
      .updateById(req.params.goalID, req.body)
      .then((result) => {
        if(!result.result.n) {
          res.status(404).send();
          return;
        }
        res.status(200).send();
      })
      .catch((err) => {
        if (err.message === `BAD ID`) {
          res.status(400).send();
          return;
        }
        throw err;
      })
      .catch((err) => {
        res.status(500).send();
      });
  }
}