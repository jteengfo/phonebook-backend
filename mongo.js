// const mongoose = require('mongoose')

// // argument validation
// if (process.argv.length < 3) {
//     console.log('incorrect number of arguments, please include password, contact name, contact number.');
//     process.exit(1);
// } 

// // argument assignments
// const password = process.argv[2];
// const contactName = process.argv[3];
// const contactNumber = process.argv[4];

// // database url
// const url = `mongodb+srv://admin:${password}@fso2024-part3-cluster.skspp1h.mongodb.net/Contacts?
// retryWrites=true&w=majority&appName=fso2024-part3-cluster`;

// // db config
// mongoose.set("strictQuery", false);

// // connect to db
// mongoose.connect(url)

// // ini document Schema
// const contactSchema = new mongoose.Schema({
//     name: String,
//     number: String,
// });

// // ini model/constructor
// const Contact = mongoose.model('Contact', contactSchema);

// if (process.argv.length === 3){
//     Contact
//         .find({})
//         .then(result => {
//             result.forEach(contact => {
//                 console.log(contact)
//         });
//         mongoose.connection.close();
//     });
// } else {
//     // create a contact document
//     const contact = new Contact({
//         name: contactName,
//         number: contactNumber,
//     });

//     // save/send contact document to db
//     contact.save().then(result => {
//         console.log(`added ${contactName} ${contactNumber} to phonebook`);
//         mongoose.connection.close()
//     });
// }
