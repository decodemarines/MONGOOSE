const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                index: true
            }
        });
        const user = mongoose.model('customers', userSchema);

        // Will trigger index creation
        const data = await user.create({ name: 'John' });
    })
    .catch(error => {
        console.error('Error:', error);
    });
