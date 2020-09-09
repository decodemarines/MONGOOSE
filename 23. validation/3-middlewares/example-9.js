const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            password: String,
        });

        userSchema.pre('save', function() {
            console.log('this gets printed third ← 3');
        });

        userSchema.post('save', function() {
            console.log('this gets printed fourth ← 4');
        });

        userSchema.pre('validate', function() {
            console.log('this gets printed first ← 1');
        });

        userSchema.post('validate', function() {
            console.log('this gets printed second ← 2');
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                password: 123456,
            });
            await user.findOneAndDelete({ _id: userData._id });
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
