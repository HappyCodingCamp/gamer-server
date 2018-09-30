const validateModel = require('./validateModel')

const validateRequest = (ctx, request, requestModel) => {
  try {
    validateModel(request, requestModel)

    return true
  } catch (e) {
    ctx.status = 400
    ctx.body = e.message

    return false
  }
}

module.exports = validateRequest
