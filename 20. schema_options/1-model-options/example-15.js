const mongoose = require('mongoose');
const { connection } = require('../common');

// For replica sets and sharding
connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String
            },
            { shardKey: { tag: 1, name: 1 } }
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John'
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
