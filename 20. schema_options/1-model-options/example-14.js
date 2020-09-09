const mongoose = require('mongoose');
const { connection } = require('../common');

// For replica sets
connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String
            },
            // Danger
            { safe: false }
            // Similar as
            // {
            //     writeConcern: { w: 0 }
            // }
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John'
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
