const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            userOrders: [
                {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'orders',
                },
            ],
        });
        // Order schema
        const orderSchema = new mongoose.Schema({
            product: String,
        });

        // User model
        const user = mongoose.model('customers', userSchema);
        // Order model
        const order = mongoose.model('orders', orderSchema);

        const orderData1 = await order.create({ product: 'Oranges' });
        const orderData2 = await order.create({ product: 'Lemons' });
        const userData = await user.create({
            name: 'John Doe',
            userOrders: [orderData1._id, orderData2._id],
        });

        const data = await user
            .findOne({ name: 'John Doe' })
            .select('-_id -__v')
            .populate('userOrders');

        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
