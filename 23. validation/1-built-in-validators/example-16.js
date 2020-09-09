const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
            },
            dateOfBirth: {
                type: Date,
                max: () => Date.now() - 5.6802514 * 1e11, // 5.6802514 * 1e11 ← 18 years in ms
            },
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John Doe',
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
