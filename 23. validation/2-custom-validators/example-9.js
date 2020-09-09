const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            balance: {
                type: Number,
                validate: {
                    isAsync: true, // DeprecationWarning
                    validator(value, cb) {
                        setTimeout(() => {
                            if (value > 1000) {
                                cb(true);
                            }

                            // cb(false);
                            cb(false, 'Override default message');
                        }, 500);
                    },
                },
                message: 'Default error message',
            },
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                balance: 200,
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
