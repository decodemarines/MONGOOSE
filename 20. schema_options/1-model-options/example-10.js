const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            socials: {
                skype: String,
                fb: String,
                viber: String
            }
        });

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
            socials: {} // will not store empty object
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
