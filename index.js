
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Contact = require('./models/contact')

// middleware
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

// db
// let contacts = [
//       {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//       },
//       {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//       },
//       {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//       },
//       {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//       }
//     ]

// functions -- deprecated since mongoDB sets id automatically
// const generateID = () => {
//     const maxID = contacts.length > 0
//         ? Math.max(...contacts.map(p => p.id))
//         : 0;
//     return maxID + 1;
// }

// routes
app.get('/api/persons', (request, response, next) => {
  // response.json(contacts)`
  Contact
    .find({})
    .then(contacts => {
      response.json(contacts)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {

  Contact.findById(request.params.id)
    .then(result => {
      response.json(result)
      console.log('Found ID: ', result)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(request.body)

  // if (!body.number || !body.name) {
  //     response.status(404).json({
  //         error: "number or name missing"
  //     }).end()
  // }

  // const contact = {
  //     "name": body.name,
  //     "number": body.number,
  //     "id": generateID()
  // }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  // contacts = contacts.concat(contact)
  // response.json(contact)

  contact
    .save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {


  // create js object - not from constructor because
  // were updating an existing one already is my assumption


  Contact.findByIdAndUpdate(request.params.id,
    // eslint-disable-next-line no-undef
    { name, number },
    { new : true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      console.log('Updated contact: ', updatedContact)
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log('deletion result: ', result )
      return response.status(200).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformatted id' })
  } else if (error.name === 'SyntaxError') {
    return response.status(404).send({ error: 'missing number or name' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})
