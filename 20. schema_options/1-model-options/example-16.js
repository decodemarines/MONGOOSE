const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String
            },
            // default: true
            { strict: false }
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
            // names: 'John',
            age: 35
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
