const mongoose = require('mongoose');
const { connection } = require('../common');

// For replica sets
connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String,
            },
            {
                writeConcern: {
                    // default 1: requests acknowledgment, can be 0,1,2...
                    w: 1,
                    // default true: returns only after the requested number of members, including the primary, have written to the journal
                    j: true,
                    // write timeout limit in ms
                    wtimeout: 1000,
                },
            },
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
