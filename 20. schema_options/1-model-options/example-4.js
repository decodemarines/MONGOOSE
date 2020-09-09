const mongoose = require('mongoose');
const { connection } = require('../common');

let counter = 0;

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String,
                age: Number,
                counter: Number,
                created: {
                    type: Date,
                    default: () => new Date(),
                },
            },
            // in bytes
            { capped: 512 },
        );
        const user = mongoose.model('customers', userSchema);
        setInterval(async () => {
            try {
                await user.create({ name: 'John', age: 30, counter });
                counter++;
            } catch ({ message }) {
                console.error(message);
            }
        }, 1000);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
