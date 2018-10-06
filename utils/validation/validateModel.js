const validateModel = (instance, schema) => {
  if (instance === null || instance === undefined) {
    throw new Error('Instance is not defined')
  }

  if (schema === null || schema === undefined) {
    throw new Error('Instance is not defined')
  }

  if (Array.isArray(schema)) {
    validateArrayType(instance, schema)
  } else {
    for (let propName in schema) {
      const prop = schema[propName]

      validateRequired(instance, schema, propName)

      if (typeof prop.type === 'object') {
        validateObjectProp(instance, schema, propName)
      } else {
        validatePrimitiveProp(instance, schema, propName)
      }
    }
  }
}

const validateRequired = (instance, schema, propName) => {
  if (schema[propName].required &&
    (instance[propName] === null || instance[propName] === undefined)) {
    throw new Error(`Required prop ${propName} is undefined`)
  }
}

const validatePrimitiveProp = (instance, schema, propName) => {
  const shemaPropType = schema[propName].type
  const instanceProp = instance[propName]

  if (instanceProp === null || instanceProp === undefined) {
    return
  }

  const instancePropType = typeof instanceProp

  if (shemaPropType !== instancePropType) {
    throw new Error(`Prop ${propName} has invalid type, expected ${shemaPropType} but got ${instancePropType}`)
  }
}

const validateObjectProp = (instance, schema, propName) => {
  const schemaProp = schema[propName].type
  const instanceProp = instance[propName]

  if (instanceProp === null || instanceProp === undefined) {
    return
  }

  if (Array.isArray(schemaProp) && !Array.isArray(instanceProp)) {
    throw new Error(`Prop ${propName} has invalid type, expected Array but got Object`)
  } else if (!Array.isArray(schemaProp) && Array.isArray(instanceProp)) {
    throw new Error(`Prop ${propName} has invalid type, expected Object but got Array`)
  } else if (Array.isArray(schemaProp) && Array.isArray(instanceProp)) {
    validateArrayType(instanceProp, schemaProp)
  } else {
    validateModel(instanceProp, schemaProp)
  }
}

const validateArrayType = (instanceArray, schemaArray) => {
  instanceArray.forEach(p => validateModel(p, schemaArray[0]))
}

module.exports = validateModel
