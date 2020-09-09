const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            age: Number,
            score: Number,
            orders: Number,
            balance: Number,
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                age: 35,
                score: 78.1,
                orders: false,
                balance: 'none', // will cause an ValidationError error
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
