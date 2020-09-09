const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const user = mongoose.model('customers', userSchema);

        user.findOne({ name: 'John1' }, 'name', (error, doc) => {
            console.log(doc); // { _id: 5ca1e8d838e641a3e498b210, name: 'John1' }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
