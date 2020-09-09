const mongoose = require('mongoose');
const { connection } = require('../common');

// Should be specified in connection options object
// { autoIndex: false }; // disable auto index creation globally

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                index: true,
            },
        });
        const user = mongoose.model('customers', userSchema);

        const data = await user.create({ name: 'John' });
    })
    .catch(error => {
        console.error('Error:', error);
    });
