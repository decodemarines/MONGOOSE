const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({ name: String });
        const User = mongoose.model('customers', userSchema);

        const user = new User();

        try {
            user.set('name', 'Johns');
            user.set('age', 18); // no errors

            console.log(user);

            const data = await user.save(); // could not be saved

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
