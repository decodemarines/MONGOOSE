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

        // Create DATA start
        const orderData = await order.create({ product: 'Oranges', count: 2 });
        const userData = await user.create({
            name: 'John Doe',
            orders: [orderData._id],
        });

        const usersSource = await user
            .findOne({ name: 'John Doe' })
            .select('-__v -_id');

        console.log(usersSource);

        if (true) {
            await usersSource.populate('orders', '-__v -_id').execPopulate();
            // await usersSource.populate({ path: 'orders', select: '-__v -_id' }).execPopulate();
        }

        console.log('==================================');
        console.log(usersSource);
    })
    .catch(error => {
        console.error('Error:', error);
    });
