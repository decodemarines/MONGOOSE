const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            password: String,
        });

        userSchema.post('init', function(doc) {
            console.log(`${doc._id} has been initialized from the db`);
        });
        userSchema.post('validate', function(doc) {
            console.log(`${doc._id} has been validated (but not saved yet)`);
        });
        userSchema.post('save', function(doc) {
            console.log(`${doc._id} has been saved`);
        });
        userSchema.post('findOneAndDelete', function(doc) {
            console.log(`${doc._id} has been removed`);
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            // has been validated (but not saved yet)
            // has been saved
            const userData = await user.create({
                name: 'John',
                password: 123456,
            });

            // has been initialized from the db
            await user.findOne();

            // has been initialized from the db
            // has been removed
            await user.findOneAndDelete({ _id: userData._id });
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
