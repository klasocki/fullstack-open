const morgan = require('morgan')

morgan.token('post', (request) => {
    if (request.method === 'POST')
        return JSON.stringify(request.body)
    else
        return ''
})
morgan.format('tinyPost', ':method :url :status :res[content-length] - :response-time ms :post')
const requestLogger =  morgan('tinyPost')

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError' || error.name === 'MongoServerError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}