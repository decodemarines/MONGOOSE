const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // Order schema
        const orderSchema = new mongoose.Schema({
            product: String,
            count: String,
        });

        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            orders: [orderSchema],
        });

        orderSchema.path('count').validate(function(value) {
            console.log('Validate child schema', this);

            return true;
        });

        userSchema.path('orders').validate(function(value) {
            console.log('Validate parent schema', this);

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
