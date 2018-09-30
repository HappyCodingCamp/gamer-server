const { Database } = require('./db')
const { dao } = require('./models')

const db = new Database(dao)
db.purge()
