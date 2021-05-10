const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    console.log("completing TOKEN")
    request.token = authorization.substring(7)
  }
  console.log("DONE TOKEN")
  next()
}

const userExtractor = async (request, response, next) => {
  console.log('USER EXTRACTOR')
  if (!request.token){
    console.log("token missing")
    return response.status(401).send({ error: 'token missing or invalid'})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    console.log('token cant decode')
    return response.status(401).send({ error: 'token missing or invalid'})
  }
  request.user = await User.findById(decodedToken.id)
  console.log('USER EXTRACTOR DONE')
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}