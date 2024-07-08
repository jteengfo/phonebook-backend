
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
app.get('/api/persons', (request, response) => {
    // response.json(contacts)`
    Contact
      .find({})
      .then(contacts => {
        response.json(contacts)
      })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(request.body)

    if (!body.number || !body.name) {
        response.status(404).json({
            error: "number or name missing"
        }).end()
    }

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
})

const PORT = process.env.PORT || 3
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})
