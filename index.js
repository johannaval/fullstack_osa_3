const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
//app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :get_data'))
app.use(cors())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

morgan.token('get_data', function (req, res) {

    const body = req.body
    const method = req.method
    const dataobject = JSON.stringify(body);

    if (method === "POST") {
        return dataobject
    }
})

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }]

morgan.token('type', function (req, res) {
    return req.headers['content-type']
})


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (req, res) => {
    res.json(persons)
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

    if (persons.find(person => person.name === req.body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)

    res.json(person)
})


app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person.number)
    } else {
        res.status(404).end()
    }
})

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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})