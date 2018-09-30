const Koa = require('koa')
const app = new Koa()
const PORT = 9000
const { routing, database } = require('./middleware')
const bodyParser = require('koa-bodyparser')

const appRouting = routing()

app
  .use(database())
  .use(bodyParser())
  .use(appRouting.routes())
  .use(appRouting.allowedMethods())

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
