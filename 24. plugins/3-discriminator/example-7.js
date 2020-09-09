const mongoose = require('mongoose');
const { connection } = require('../common');

const test = (schema, options) => {
    schema.pre('save', next => {
        console.log('Plugin');
        next();
    });
};

connection
    .then(async () => {
        const options = { discriminatorKey: '_t' };

        const userSchema = new mongoose.Schema({ name: String }, options);

        userSchema.plugin(test);

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
            await users.create({
                name: 'John Doe',
                address: 'Lva Tolstogo 3',
            });

            await staff.create({
                name: 'John Doe',
                role: 'admin',
            });
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
