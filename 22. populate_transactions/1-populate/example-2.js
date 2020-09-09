const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            orders: [mongoose.SchemaTypes.ObjectId],
        });
        // Order schema
        const orderSchema = new mongoose.Schema({
            product: String,
        });

        // User model
        const user = mongoose.model('customers', userSchema);
        // Order model
        const order = mongoose.model('orders', orderSchema);

        const orderData = await order.create({ product: 'Oranges' });
        const userData = await user.create({
            name: 'John Doe',
            orders: [orderData._id],
        });

        const sourceUser = await user
            .findOne()
            .select('-_id -__v')
            .lean();

        console.log('Without manual populate', sourceUser);

        const sourceOrders = await order
            .find({
                _id: { $in: sourceUser.orders },
            })
            .select('-_id -__v')
            .lean();

        sourceUser.orders = sourceOrders;

        console.log('=========================');
        console.log('With manual populate', sourceUser);
    })
    .catch(error => {
        console.error('Error:', error);
    });


//     Without manual populate { orders: [ 5f49e854d02d9b1cf49b43ac ], name: 'John Doe' }
// =========================
// With manual populate { orders: [ { product: 'Oranges' } ], name: 'John Doe' }