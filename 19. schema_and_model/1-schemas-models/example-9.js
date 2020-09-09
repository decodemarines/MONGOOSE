const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            age: Number,
            score: Number,
            orders: Number
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                age: 35,
                score: 78.1,
                orders: false
            });
            // все нормально сохранит просто произойдет приведение к числу

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
