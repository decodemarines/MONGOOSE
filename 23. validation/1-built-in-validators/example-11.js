const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                maxlength: 6, // will trigger first
                match: /^[a-zA-Z]+$/,
            },
        });

        // const userSchema = new mongoose.Schema({
        //     name: {
        //         type: String,
        //         match: /^[a-zA-Z]+$/, // will trigger first
        //         maxlength: 6,
        //     },
        // });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John Doe',
            });
            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
