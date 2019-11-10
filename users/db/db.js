import MongoDB from 'mongodb';

const uri = "mongodb+srv://admin:qwerty123456789@cluster0-rw70g.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "Planner";
const collectionName = "Users";
const client = new MongoDB.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const userTemplate = {
  name: null,
  surName: null,
  birthDate: null,
  balance: null,
  wage: null,
  necessaryMonthlyPayments: null,
  monthStats: {
    goalPayments: null,
    necessaryPayments: null,
    randomPayments: null,
    unscheduledIncome: null
  }
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

  getAmount(amount) {
    return this.dbPromise.then(db => {
      return db
        .find({})
        .limit(Number(amount))
        .toArray();
    });
  }

  insertOne(item) {
    const filteredItem = {};
    for (const field in userTemplate) {
      if (field === "monthStats") {
        filteredUpdates[field] = {};
        for (const field in userTemplate.monthStats) {
          filteredUpdates.monthStats[field] = item[field];
        }
      } else {
        filteredUpdates[field] = item[field];
      }
    }
    return this.dbPromise.then(db => db.insertOne(filterItem(filteredItem)));
  }

  updateById(id, updates) {
    if (!MongoDB.ObjectId.isValid(id)) {
      return Promise.reject(new Error(`BAD ID`));
    }
    const filteredUpdates = {};
    for (const field in userTemplate) {
      if (updates.hasOwnProperty(field)) {
        if (field === "monthStats") {
          filteredUpdates[field] = {};
          for (const field in userTemplate.monthStats) {
            if (updates.monthStats.hasOwnProperty(field)) {
              filteredUpdates.monthStats[field] = updates[field];
            }
          }
        } else {
          filteredUpdates[field] = updates[field];
        }
      }
    }
    return this.dbPromise
      .then((db) => {
        return db.updateOne({ "_id": MongoDB.ObjectId(id) }, { $set: filteredUpdates });
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
}