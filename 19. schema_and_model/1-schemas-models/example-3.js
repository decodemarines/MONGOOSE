const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({ name: String });
        const User = mongoose.model('customers', userSchema);

        const user = new User({ name: 'John' }); // not saved to db

        console.log(user);
    })
    .catch(error => {
        console.error('Connection error', error);
    });
