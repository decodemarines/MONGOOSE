const mongoose = require('mongoose');
const { connection } = require('../common');
// const axios = require('axios');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            balance: {
                type: Number,
                // validate: axios.get(''),
                validate(value) {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            if (value > 1000) {
                                resolve(true);
                            }
                            resolve(false);
                        }, 1500);
                    });
                },
            },
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                balance: 2000,
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
