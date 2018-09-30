const validateModel = (request, requestModel) => {
  for (let propName in requestModel) {
    const prop = requestModel[propName]

    validateRequired(request, requestModel, propName)

    if (typeof prop.type === 'object') {
      validateObjectProp(request, requestModel, propName)
    } else {
      validatePrimitiveProp(request, requestModel, propName)
    }
  }
}

const validateRequired = (request, requestModel, propName) => {
  if (requestModel[propName].required &&
    (request[propName] === null || request[propName] === undefined)) {
    throw new Error(`Required prop ${propName} is undefined`)
  }
}

const validatePrimitiveProp = (request, requestModel, propName) => {
  const modelType = requestModel[propName].type
  const requestType = typeof request[propName]

  if (modelType !== requestType) {
    throw new Error(`Prop ${propName} has invalid type, expected ${modelType} but got ${requestType}`)
  }
}

const validateObjectProp = (request, requestModel, propName) => {
  const modelProp = requestModel[propName].type
  const requestProp = request[propName]

  if (Array.isArray(modelProp) && !Array.isArray(requestProp)) {
    throw new Error(`Prop ${propName} has invalid type, expected Array but got Object`)
  } else if (!Array.isArray(modelProp) && Array.isArray(requestProp)) {
    throw new Error(`Prop ${propName} has invalid type, expected Object but got Array`)
  } else if (Array.isArray(modelProp) && Array.isArray(requestProp)) {
    validateArrayType(modelProp, requestProp)
  } else {
    validateModel(modelProp, requestProp)
  }
}

const validateArrayType = (modelArray, requestArray) => {
  requestArray.forEach(p => validateModel(p, modelArray[0]))
}

module.exports = validateModel
