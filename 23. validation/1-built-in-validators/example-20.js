const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                minlength: [3, 'Some validation error'],
            },
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John Doe',
            });

            console.log(userData);

            userData.set('name', 'Jo');

            // Run validation
            await userData.validate();

            // await userData.save(); // will trigger validation and save doc if all is ok.
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
