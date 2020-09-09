const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String,
            },
            { strict: false },
        );

        const User = mongoose.model('customers', userSchema);

        const user = new User({
            name: 'John',
        });

        user.set('age', 35);
        user.save();

        console.log(user); // no age field without strict: false
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
