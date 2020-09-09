const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({ name: String });
        const user = mongoose.model('customers', userSchema);

        try {
            // Create collection if it does not exists
            await user.createCollection();
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
