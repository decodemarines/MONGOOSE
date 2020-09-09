const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
            },
            created: {
                type: Date,
                default: () => new Date(),
            },
        });
        const user = mongoose.model('customers', userSchema);

        try {
            setInterval(async () => {
                await user.create({
                    name: 'John',
                });
            }, 1000);
        } catch (error) {
            console.error(error.message);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
