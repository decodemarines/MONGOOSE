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
                // balance: 10,
                // balance: '10',
                // balance: '10.3',
                // balance: '10a', // error
                // balance: true,
                // balance: false,
                // balance: {
                //     valueOf: () => 100,
                // },
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
