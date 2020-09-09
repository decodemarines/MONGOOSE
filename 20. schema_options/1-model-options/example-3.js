const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: {
                    type: String,
                    index: true
                }
            },
            // default: true
            { autoIndex: false } // prevent auto index creation
        );
        const user = mongoose.model('customers', userSchema);
        const data = await user.create({ name: 'John' });

        setTimeout(() => {
            user.createIndexes();
        }, 10000); // started to create indexes in a 10s.
    })
    .catch(error => {
        console.error('Error:', error);
    });
