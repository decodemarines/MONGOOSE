const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
                last: String
            },
            dateOfBirth: Date
        });
        const user = mongoose.model('customers', userSchema);

        const data = await user.create({
            name: { first: 'Chuck', last: 'Norris' }
        });

        const { name } = await user.findOne({
            'name.first': 'Chuck'
        });

        // My full name is: Chuck Norris
        console.log(`My full name is: ${name.first} ${name.last}`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
