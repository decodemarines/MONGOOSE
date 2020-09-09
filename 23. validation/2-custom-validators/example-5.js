const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            orders: [
                {
                    product: String,
                    count: Number,
                },
            ],
        });

        userSchema.path('orders').validate(function(value) {
            const minCount = 7;
            const isValid = value.every(({ count }) => count >= minCount);

            if (!isValid) {
                throw new Error(
                    `Orders can not contain products with count lower than ${minCount}`,
                );
            }

            return true;
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                orders: [
                    { product: 'Oranges', count: 5 },
                    { product: 'Kiwis', count: 7 },
                ],
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
