const express = require('express')
//const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')


//app.use(requestLogger)
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :get_data'))
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
//const mongoose = require('mongoose')
//const Person = mongoose.model('Person', personSchema)

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)
/*
morgan.token('get_data', function (req, res) {

    const body = req.body
    const method = req.method
    const dataobject = JSON.stringify(body);

    if (method === "POST") {
        return dataobject
    }
}) 

morgan.token('type', function (req, res) {
    return req.headers['content-type']
}) */


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {

    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }

    /* if (persons.find(person => person.name === req.body.name)) {
         return res.status(400).json({
             error: 'name must be unique'
         })
     } */

    const name = body.name
    const number = body.number

    const person = new Person({
        name: name,
        number: number,
    })

    /* persons = persons.concat(person) */

    person.save().then(response => {
        console.log(`added ${name} number ${number} to phonebook`)
        res.json(response)
        /*  mongoose.connection.close() */
    })
})


app.get('/api/persons/:id', (req, res) => {

    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})


/* if (person) {
     res.json(person.number)
 } else {
     res.status(404).end()
 }
}) */

app.delete('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})


app.get('/info', (req, res) => {

    const time_now = new Date();
    const count = persons.length

    res.send(
        `<p> Phonebook has info for ${count} people </p>
         <p> ${time_now} </p>`
    )
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})