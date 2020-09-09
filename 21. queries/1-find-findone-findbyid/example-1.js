const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const user = mongoose.model('customers', userSchema);

        const query = user.find();

        console.log(query); // instance of Query

        console.log(query instanceof mongoose.Query); // true
    })
    .catch(error => {
        console.error('Error:', error);
    });
