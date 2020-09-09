const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            balance: Number,
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                balance: NaN, // will trigger an error
                // balance: Infinity, // will not trigger an error
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
