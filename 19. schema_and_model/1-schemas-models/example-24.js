const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            balance: {
                type: Number,
                set: v => {
                    return v * 100;
                }
            }
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                name: 'John',
                balance: 250.09
            });

            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
