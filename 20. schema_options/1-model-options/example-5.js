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
                    default: () => new Date()
                }
            },
            // size of the collection in bytes or number of documents
            { capped: { size: 1024, max: 3 } }
        );
        const user = mongoose.model('customers', userSchema);
        setInterval(async () => {
            try {
                await user.create({ name: 'John', counter });
                counter++;
            } catch ({ message }) {
                console.error(message);
            }
        }, 1000);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
