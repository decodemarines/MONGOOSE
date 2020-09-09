const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
            },
            balance: {
                type: Number,
                min: [0, 'balance can not be lower than zero'],
                max: [100, 'balance can not be grater than 100'],
            },
            dateOfBirth: {
                type: Date,
                max: [
                    () => Date.now() - 5.6802514 * 1e11,
                    'user should be 18 years',
                ],
            },
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John Doe',
                balance: 101,
                dateOfBirth: new Date(2017, 3, 8),
            });
            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
