const mongoose = require('mongoose');
const { connection } = require('../common');

// Чтобы небыло ошибки из примера 4
connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            orders: [
                {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'orders',
                },
            ],
        });
        // Order schema
        const orderSchema = new mongoose.Schema({
            product: String,
            count: Number
        });

        // User model
        const user = mongoose.model('customers', userSchema);
        // Order model
        const order = mongoose.model('orders', orderSchema);

        const orderData = await order.create({ product: 'Oranges', count: 10 });
        const userData = await user.create({
            name: 'John Doe',
            orders: [orderData._id],
        });

        const data = await user
            .findOne({ name: 'John Doe' })
            .populate('orders');

        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
