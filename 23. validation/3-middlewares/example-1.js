const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            password: String,
        });

        userSchema.pre('save', function(next) {
            this.password = Buffer.from(this.password).toString('base64');

            next();
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                password: 123456,
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
