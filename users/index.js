import express from 'express';
const app = express();
const port = 4000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:qwerty123456789@cluster0-rw70g.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  client.db("Test").collection("items").find({}).toArray()
  .then((res) => console.log(res))
  client.close();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/da/:id', (req, res) => res.send(req.params.id));

app.get('/da', (req, res) => res.send(req.query.id));

app.listen(port, () => console.log(`Listening on port ${port}`));