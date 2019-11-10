import MongoDB from 'mongodb';

const uri = "mongodb+srv://admin:qwerty123456789@cluster0-rw70g.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "Planner";
const collectionName = "Goals";
const client = new MongoDB.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const goalTemplate = {
  userId: null,
  name: null,
  creationDate: null,
  duration: null,
  price: null,
  type: null,
  status: null
}

export default class db {
  constructor() {
    this.dbPromise = this.getDbPromise();
  }

  connectDB() {
    return client.connect().then(res => {
      console.log(`DB is connected.`);
    }).catch(err => {
      console.log(`DB is NOT connected. Error: ${err}`);
    });
  }

  async getDbPromise() {
    if (!client.isConnected()) {
      await this.connectDB();
    }
    return client.db(dbName).collection(collectionName);
  }

  getAll() {
    return this.dbPromise.then(db => {
      return db
        .find({})
        .toArray()
    })
  }

  getById(id) {
    if (!MongoDB.ObjectId.isValid(id)) {
      return Promise.reject(new Error(`BAD ID`));
    }
    return this.dbPromise.then(db => {
      return db.findOne({ "_id": MongoDB.ObjectId(id) })
    })
  }

  getByUsersId(id) {
    if (!MongoDB.ObjectId.isValid(id)) {
      return Promise.reject(new Error(`BAD ID`));
    }
    return this.dbPromise.then(db => {
      return db
        .find({ "userId": MongoDB.ObjectId(id) })
        .toArray();
    })
  }

  getUserGoalById(goalID, userID) {
    if (!MongoDB.ObjectId.isValid(userID)) {
      return Promise.reject(new Error(`BAD USER ID`));
    }
    if (!MongoDB.ObjectId.isValid(goalID)) {
      return Promise.reject(new Error(`BAD GOAL ID`));
    }
    return this.dbPromise.then(db => {
      return db
        .findOne({ "_id": MongoDB.ObjectId(goalID), "userId": MongoDB.ObjectId(userID) })
    })
  }

  getAmount(amount) {
    return this.dbPromise.then(db => {
      return db
        .find({})
        .limit(Number(amount))
        .toArray();
    });
  }

  insertOne(item, userID) {
    if (!MongoDB.ObjectId.isValid(userID)) {
      return Promise.reject(new Error(`BAD USER ID`));
    }
    const filteredItem = {};
    for (const field in goalTemplate) {
      filteredItem[field] = item[field];
    }
    filteredItem.userId = MongoDB.ObjectId(userID);
    filteredItem.creationDate = new Date();
    return this.dbPromise.then(db => db.insertOne(filteredItem));
  }

  updateById(id, updates) {
    if (!MongoDB.ObjectId.isValid(id)) {
      return Promise.reject(new Error(`BAD ID`));
    }
    const filteredUpdates = {};
    for (const field in goalTemplate) {
      if (updates.hasOwnProperty(field) && field != 'creationDate' && field != 'userId') {
        filteredUpdates[field] = updates[field];
      }
    }
    return this.dbPromise
      .then((db) => {
        return db.updateOne({ "_id": MongoDB.ObjectId(id) }, { $set: filteredUpdates });
      });
  }

  updateByUserId(goalID, userID, updates) {
    if (!MongoDB.ObjectId.isValid(userID)) {
      return Promise.reject(new Error(`BAD USER ID`));
    }
    if (!MongoDB.ObjectId.isValid(goalID)) {
      return Promise.reject(new Error(`BAD GOAL ID`));
    }
    const filteredUpdates = {};
    for (const field in goalTemplate) {
      if (updates.hasOwnProperty(field)) {
        filteredUpdates[field] = updates[field];
      }
    }
    return this.dbPromise
      .then((db) => {
        return db.updateOne({ "_id": MongoDB.ObjectId(goalID), "userId": MongoDB.ObjectId(userID) }, { $set: filteredUpdates });
      });
  }

  deleteById(id) {
    if (!MongoDB.ObjectId.isValid(id)) {
      return Promise.reject(new Error(`BAD ID`));
    }
    return this.dbPromise
      .then((db) => {
        return db.deleteOne({ "_id": MongoDB.ObjectId(id) });
      });
  }

  deleteByUserId(goalID, userID) {
    if (!MongoDB.ObjectId.isValid(userID)) {
      return Promise.reject(new Error(`BAD USER ID`));
    }
    if (!MongoDB.ObjectId.isValid(goalID)) {
      return Promise.reject(new Error(`BAD GOAL ID`));
    }
    return this.dbPromise
      .then((db) => {
        return db.deleteOne({ "_id": MongoDB.ObjectId(goalID), "userId": MongoDB.ObjectId(userID) });
      });
  }
}