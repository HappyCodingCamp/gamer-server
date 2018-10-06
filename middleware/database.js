const { Database } = require('../db')
const { dao } = require('../models')

const database = () => {
  const db = new Database(dao)

  return async (ctx, next) => {
    ctx.dbContext = db.context

    await next()
  }
}

module.exports = database
