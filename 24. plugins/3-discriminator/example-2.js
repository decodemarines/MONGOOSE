const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const options = { discriminatorKey: 'model' };

        const userSchema = new mongoose.Schema({ name: String }, options);

        // Parent model
        const User = mongoose.model('users', userSchema);

        // Child user model
        const users = User.discriminator(
            'user',
            new mongoose.Schema({ address: String }, options),
        );

        // Child staff model
        const staff = User.discriminator(
            'staff',
            new mongoose.Schema({ role: String }, options),
        );

        try {
            const userData = await users.create({
                name: 'John Doe',
                address: 'Lva Tolstogo 3',
            });

            const staffData = await staff.create({
                name: 'Chuck Norris',
                role: 'admin',
            });

            console.log(userData);
            console.log('============================================');
            console.log(staffData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
