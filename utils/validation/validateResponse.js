const validateModel = require('./validateModel')

const validateResponse = (ctx, instance, schema) => {
  console.log(instance, schema)

  try {
    validateModel(instance, schema)

    return true
  } catch (e) {
    ctx.status = 500
    ctx.body = e.stack

    return false
  }
}

module.exports = validateResponse
