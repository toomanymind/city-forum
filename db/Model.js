const db = require('./lowdb')
const shortid = require('shortid')


class Model {
  constructor({ tableName, model }) {
    this.tableName = tableName
    this.model = model
  }
  modelizeObject(props) {
    let result = {}
    for (let prop in props) {
      if (prop !== 'id' && this.model.hasOwnProperty(prop)) {
        result[prop] = props[prop]
      }
    }
    return result
  }
  getAll() {
    return db.get(this.tableName).value()
  }
  add(props) {
    props = this.modelizeObject(props)
    props.id = shortid.generate()
    db.get(this.tableName)
      .push(props)
      .write()
  }
  del({ id }) {
    db.get(this.tableName)
      .remove({ id })
      .write()
  }
  update({ id, ...props }) {
    props = this.modelizeObject(props)
    db.get(this.tableName)
      .find({ id })
      .assign(props)
      .write()
  }
  getById({ id }) {
    return db
      .get(this.tableName)
      .find({ id })
      .value()
  }
  where(props) {
    return db
      .get(this.tableName)
      .find(props)
      .value()
  }
}

module.exports = Model