import db from '../db/db';

const dbInstance = new db();

export default class usersService {
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
      .getById(req.params.userID)
      .then((item) => {
        if (!item) {
          res.status(404).send(`NOT FOUND: ${req.params.userID}`);
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

  delete(req, res) {
    return dbInstance
      .deleteById(req.params.userID)
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

  add(req, res) {
    return dbInstance
      .insertOne(req.body, req.params.userID)
      .then((result) => {
        res.status(200).send();
      })
      .catch((err) => {
        res.status(500).send();
      });
  }

  update(req, res) {
    return dbInstance
      .updateById(req.params.userID, req.body)
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