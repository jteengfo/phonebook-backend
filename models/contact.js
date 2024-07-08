require('dotenv').config()
const mongoose = require('mongoose')

// config
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

// connect to db
mongoose.connect(url)
    .then(result => {
        console.log("Successfully connected to MongoDB");
    })
    .catch(error => {
        console.log("Error connecting to MongoDB: ", error.message);
    })

// initialize document schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
});

// configure schema to not show _id and __v during fetch
contactSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        // the id may look like a string but actually is obj, so we .toString()
        returnedObject.id = returnedObject._id.toString()
        // excluding _id and __v as planned
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// export schema to be used when imported
module.exports = mongoose.model('Contact', contactSchema)

