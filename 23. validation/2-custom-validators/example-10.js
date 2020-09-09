const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
            },
            orders: [
                {
                    product: String,
                    count: Number,
                },
            ],
        });

        userSchema.path('orders').validate(function(value) {
            const isValid = value.every(({ count }) => count >= 6);

            return isValid;
        }, 'Orders can not contain products with count lower than 6');

        userSchema.path('name.first').validate(function(value) {
            if (value !== 'John') {
                throw new Error('name must be a John');
            }

            return true;
        });

        // Does not work!!!
        // userSchema.path('orders.product').validate(function(value) {
        //     console.log('orders.product', value);

        //     return true;
        // });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: {
                    first: 'John',
                },
                orders: [
                    { product: 'Oranges', count: 6 },
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
