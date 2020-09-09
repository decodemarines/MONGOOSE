const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({ name: String });
        const user = mongoose.model('customers', userSchema);

        // global error handler for models
        user.events.on('error', ({ message }) => {
            console.error(`Events block message: ${message}`);
        });

        try {
            const data = await user.create({ _id: 'not_a_real_id' });

            console.log(data);
        } catch ({ message }) {
            console.error(`Catch block message: ${message}`);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
