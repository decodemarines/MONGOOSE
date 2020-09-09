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
            customers: [
                { type: mongoose.SchemaTypes.ObjectId, ref: 'customers' },
            ],
        });

        // User model
        const user = mongoose.model('customers', userSchema);
        // Order model
        const order = mongoose.model('orders', orderSchema);

        // Create DATA start
        const orderData1 = await order.create({ product: 'Oranges', count: 2 });
        const orderData2 = await order.create({ product: 'Kiwis', count: 5 });
        const orderData3 = await order.create({ product: 'Apples', count: 8 });
        const userData = await user.create({
            name: 'John Doe',
            orders: [orderData1._id, orderData2._id, orderData3._id],
        });
        orderData1.customers.push(userData._id);
        orderData2.customers.push(userData._id);
        orderData3.customers.push(userData._id);
        await orderData1.save();
        await orderData2.save();
        await orderData3.save();
        // Create DATA end

        const usersSource = await user
            .findOne()
            .populate({
                path: 'orders',
                select: 'product count -_id',
            })
            .select('-__v -_id');

        const ordersSource = await order
            .findOne()
            .populate({
                path: 'customers',
                select: 'name -_id',
            })
            .select('-__v -_id -count');

        console.log(usersSource);
        console.log('==================================');
        console.log(ordersSource);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // {
    //     orders: [
    //       { product: 'Oranges', count: 2 },
    //       { product: 'Kiwis', count: 5 },
    //       { product: 'Apples', count: 8 }
    //     ],
    //     name: 'John Doe'
    //   }
    //   ==================================
    //   { customers: [ { name: 'John Doe' } ], product: 'Oranges' }