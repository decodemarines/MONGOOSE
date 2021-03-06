const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                minlength: 2,
                maxlength: 7,
            },
            created: Date,
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: null, // will not trigger validation
                created: new Date(),
            });
            console.log(`Validation does not work for 'null' filed!!!`);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
