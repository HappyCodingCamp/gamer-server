const { validateRequest } = require('../utils/validation')
const { HappinessRequest } = require('../models/api')

const happinessController = (router) => {
  router.get('/api/happiness', async ctx => {
    const { Happiness } = ctx.dbContext

    ctx.body = await Happiness.findAll()
  })

  router.post('/api/happiness', async ctx => {
    const happinessRequest = ctx.request.body

    if (!validateRequest(ctx, happinessRequest, HappinessRequest)) {
      return
    }

    const { Happiness } = ctx.dbContext

    Happiness.create(happinessRequest)
  })
}

module.exports = happinessController
