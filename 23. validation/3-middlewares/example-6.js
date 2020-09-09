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
            console.log('Pre save hook');
            next();
        });

        userSchema.pre('findOne', function(next) {
            console.log('Pre findOne hook');
            next();
        });

        userSchema.pre('find', function(next) {
            console.log('Pre find hook');
            next();
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                password: 123456,
            });

            await user.findOne();
            await user.find();
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
