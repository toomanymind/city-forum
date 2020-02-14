const Model = require('./Model')
const db = require('./lowdb')





let connector = {
  db,
  models: {
    users: new Model({
      tableName: 'users',
      model: {
        id: '',
        name: '',
        password: '',
        avatar: ''
      }
    }),
    files: new Model({
      tableName: 'files',
      model: {
        id: '',
        fileId: '',
        url: ''
      }
    })
  }
}



module.exports = connector