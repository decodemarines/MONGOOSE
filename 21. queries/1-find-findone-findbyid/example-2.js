const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const user = mongoose.model('customers', userSchema);

        user.find({ name: 'John' }, (error, documents) => {
            if (error) {
                throw error;
            }

            console.log(documents); // [{ _id: 5ca1e8d838e641a3e498b210, name: 'John' }]
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
