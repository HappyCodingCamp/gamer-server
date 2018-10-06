const controllers = require('../controllers')
const koaRouter = require('koa-router')

const routing = () => {
  const router = koaRouter()

  for (let controllerName in controllers) {
    if (controllers[controllerName]) {
      console.log(`loading ${controllerName}`)
      controllers[controllerName](router)
      console.log(`${controllerName} loaded successfully`)
    }
  }
  console.log('finished loading controllers...')

  return router
}

module.exports = routing
