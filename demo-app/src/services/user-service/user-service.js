


const uuid = require('uuid/v4');
const fs = require('fs');
const utils = require('util');

const readFile = utils.promisify(fs.readFile);
const writeFile = utils.promisify(fs.writeFile);
const path = require('path');
const {EmailError} = require('./errors');


const dbPath = path.resolve(__dirname, '../..', 'db/users.json');

module.exports = {
  async getOne(id) {
    let users = await readFile(dbPath);
    users = JSON.parse(users);
    return users.list[id];
  },

  getAll() {
    return [
      {id: '1', name: 'stub'},
      {id: '2', name: 'stub'}
    ]
  },

  async create(user) {
    let users = await readFile(dbPath);
    users = JSON.parse(users);

    for (const id of Object.keys(users.list)) {
      if (users.list[id].email === user.email) {
        throw new EmailError(`unique constraint, email "${user.email}" already exist`);
      }
    }

    const id = uuid();
    user.id = id;
    users.list[id] = user;
    await writeFile(dbPath, JSON.stringify(users));

    return user;
  }
};