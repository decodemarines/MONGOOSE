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
            address: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'addresses',
            },
        });
        // Order schema
        const orderSchema = new mongoose.Schema({
            product: String,
            count: Number,
        });
        // Addresses schema
        const addressSchema = new mongoose.Schema({
            street: String,
            apt: Number,
        });

        // User model
        const user = mongoose.model('customers', userSchema);
        // Order model
        const order = mongoose.model('orders', orderSchema);
        // Address model
        const address = mongoose.model('addresses', addressSchema);

        // const orderData = await order.create({ product: 'Oranges', count: 2 });
        // const addressData = await address.create({
        //     street: 'Khreschatyk',
        //     apt: 12,
        // });

        const [orderData, addressData] = await Promise.all([
            order.create({ product: 'Oranges', count: 2 }),
            address.create({
                street: 'Khreschatyk',
                apt: 12,
            }),
        ]);

        const userData = await user.create({
            name: 'John Doe',
            orders: [orderData._id],
            address: addressData._id,
        });

        const data = await user
            .findOne()
            .populate('orders', '-__v -_id')
            .populate('address', '-__v -_id');

        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
