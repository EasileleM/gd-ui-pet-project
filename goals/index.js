import express from 'express';
import db from './db/db';

const app = express();
const port = 4000;

const dbInstance = new db();

app.get('/', (req, res) => {
  dbInstance
    .deleteById("5dc6a2271c9d44000018f38b")
    .then((items) => {
      res.status(200).send(JSON.stringify(items))
    })
    .catch((err) => {
      if (err.message == 'BAD ID') {
        res.status(400).send(err.message);
        return;
      }
      res.status(500).send(err);
    })
});

app.get('/da/:id', (req, res) => res.send(req.params.id));

app.get('/da', (req, res) => res.send(req.query.id));

app.listen(port, () => console.log(`Listening on port ${port}`));