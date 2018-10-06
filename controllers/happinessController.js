const { validateRequest, validateResponse } = require('../utils/validation')
const { HappinessRequest, HappinessResponse } = require('../models/api')

const happinessController = (router) => {
  router.get('/api/happiness', async ctx => {
    const { Happiness } = ctx.dbContext

    const happinessResponses = (await Happiness.findAll())
      .map(({ id, level }) => ({ id, level }))

    if (!validateResponse(ctx, happinessResponses, [HappinessResponse])) {
      return
    }

    ctx.body = happinessResponses
  })

  router.post('/api/happiness', async ctx => {
    const happinessRequest = ctx.request.body

    if (!validateRequest(ctx, happinessRequest, HappinessRequest)) {
      return
    }

    const { Happiness } = ctx.dbContext

    const { id, level } = await (Happiness.create(happinessRequest))

    const happinessResponse = { id, level }

    if (!validateResponse(ctx, happinessResponse, HappinessResponse)) {
      return
    }

    ctx.body = happinessResponse
  })
}

module.exports = happinessController
