const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
            },
            age: {
                type: Number,
                required: true,
            },
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                name: 'John',
                age: 36,
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
