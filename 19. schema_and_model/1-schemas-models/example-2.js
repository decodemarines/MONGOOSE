const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({ name: String });
        const User = mongoose.model('customers', userSchema);

        console.log(User);
    })
    .catch(error => {
        console.error('Connection error', error);
    });
