const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String,
                socials: {
                    skype: String,
                    fb: String,
                    viber: String
                },
                scores: Array,
                age: Number
            },
            // default: true
            { minimize: false } // enable storing empty objects
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
            socials: {},
            scores: [],
            age: void 0 // undefined
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
