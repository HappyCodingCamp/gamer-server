const Sequelize = require('sequelize')

class Database {
  constructor (daoCollection) {
    this.sequelize = new Sequelize(
      'gamerDb',
      null,
      null,
      {
        dialect: 'sqlite',
        storage: './gamerDb.sqlite'
      }
    )

    this.context = {}
    this.daoCollection = daoCollection

    this.authenticate()
    this.defineModels()
  }

  async defineModels (force) {
    const { sequelize, daoCollection } = this

    console.log(daoCollection)

    console.log('Defining models')

    for (let daoName in daoCollection) {
      try {
        const dao = sequelize.define(daoName, daoCollection[daoName])

        await dao.sync({ force })

        this.context[daoName] = dao

        console.log(`Defined model ${daoName}`)
      } catch (e) {
        console.log(`Error occurred while defining model ${daoName}`, e)
      }
    }
  }

  async authenticate () {
    const { sequelize } = this

    try {
      await sequelize.authenticate()

      console.log('DB connection established successfully')
    } catch (e) {
      console.log('Failed to connect to DB: ', e)
    }
  }

  async purge () {
    this.defineModels(true)
  }
}

module.exports = Database
