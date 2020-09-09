const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const options = { discriminatorKey: '_t' };

        const userSchema = new mongoose.Schema({ name: String }, options);

        // Parent model
        const User = mongoose.model('users', userSchema);

        // Child model
        const users = User.discriminator(
            'user',
            new mongoose.Schema({ address: String }, options),
        );

        // Staff model
        const staff = User.discriminator(
            'staff',
            new mongoose.Schema({ role: String }, options),
        );

        try {
            const data = await User.create([
                {
                    name: 'John Doe',
                    address: 'Lva Tolstogo 3',
                    _t: 'user',
                },
                {
                    name: 'Chuck Norris',
                    role: 'admin',
                    _t: 'staff',
                },
            ]);

            console.log(data);
            console.log('============================================');
            console.log(data[0] instanceof users); // true
            console.log(data[0] instanceof staff); // false
            console.log('============================================');
            console.log(data[1] instanceof staff); // true
            console.log(data[1] instanceof users); // false
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
