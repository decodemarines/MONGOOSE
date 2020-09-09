const mongoose = require('mongoose');
const { connection } = require('../common');

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
            count: Number,
        });

        // User model
        const user = mongoose.model('customers', userSchema);
        // Order model
        const order = mongoose.model('orders', orderSchema);

        const orderData1 = await order.create({ product: 'Oranges', count: 2 });
        const orderData2 = await order.create({ product: 'Kiwis', count: 5 });
        const orderData3 = await order.create({ product: 'Apples', count: 8 });
        const orderData4 = await order.create({
            product: 'Potatoes',
            count: 10,
        });
        const userData = await user.create({
            name: 'John Doe',
            orders: [
                orderData1._id,
                orderData2._id,
                orderData3._id,
                orderData4._id,
            ],
        });

        const data = await user
            .findOne()
            .populate({
                path: 'orders',
                match: { count: { $gte: 5 } },
                select: 'product count -_id',
                options: { limit: 2 },
                // options: { sort: { product: 1 } },
            })
            .select('-__v -_id');

        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
