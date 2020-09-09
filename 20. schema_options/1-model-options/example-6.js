const mongoose = require('mongoose');
const { connection } = require('../common');

let counter = 0;

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String,
                counter: Number,
                created: {
                    type: Date,
                    default: () => new Date(),
                },
            },
            // specify collection name
            { collection: 'customer' },
        );

        const user = mongoose.model('customers', userSchema);
        await user.create({ name: 'John', counter });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
