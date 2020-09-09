const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const user = mongoose.model('customers', userSchema);

        user.findOne({ name: 'John' }, (error, document) => {
            if (error) {
                throw error;
            }

            console.log(document); // { _id: 5ca1e8d838e641a3e498b210, name: 'John' }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
