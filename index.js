require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :get_data'))
app.use(express.static('build'))
app.use(cors())
app.use(express.json())


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }
  next(error)
}

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}
app.use(requestLogger)

morgan.token('get_data', function (req) {
  const body = req.body
  const method = req.method
  const dataobject = JSON.stringify(body)

  if (method === 'POST') {
    return dataobject
  }
})

morgan.token('type', function (req) {
  return req.headers['content-type']
})


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res, next) => {

  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Name or number is missing'
    })
  }
  const name = body.name
  const number = body.number

  const person = new Person({
    name: name,
    number: number
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
}
)


app.put('/api/persons/:id', (req, res, next) => {

  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => updatedPerson.toJSON())
    .then(updatedAndFormattedPerson => {
      res.json(updatedAndFormattedPerson)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {

  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {

  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end()
      console.log(`k??ytt??j?? ${result.name} poistettiin`)
    })
    .catch(error => next(error))
  console.log('k??ytt??j???? ei voitu poistaa')

})

app.get('/info', (req, res) => {

  const time_now = new Date()

  Person.find({}).then(persons => {
    res.send(
      `<p> Phonebook has info for ${persons.length} people </p> 
            <p> ${time_now} </p>`
    )
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})