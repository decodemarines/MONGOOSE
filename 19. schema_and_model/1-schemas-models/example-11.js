const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            active: Boolean,
            subscribed: Boolean,
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                active: true,
                subscribed: 'yes', // not Yes YES
                // yes==true
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
