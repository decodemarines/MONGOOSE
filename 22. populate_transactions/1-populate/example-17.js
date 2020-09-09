const mongoose = require('mongoose');
const { mongooseOptions } = require('../common');

const db1 = mongoose.createConnection(
    'mongodb://localhost:27017/users',
    mongooseOptions,
);
const db2 = mongoose.createConnection(
    'mongodb://lab.lectrum.io:37019/users',
    mongooseOptions,
);

// Cleaning
db1.dropDatabase();
db2.dropDatabase();

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
const user = db1.model('customers', userSchema);
// Order model
const order = db2.model('orders', orderSchema);

(async () => {
    // Create DATA start
    const orderData = await order.create({ product: 'Oranges', count: 2 });
    const userData = await user.create({
        name: 'John Doe',
        orders: [orderData._id],
    });
    // Create DATA end

    const usersSource = await user
        .findOne({ name: 'John Doe' })
        .populate({
            path: 'orders',
            // should be link to model not a string
            model: order, // !!! Important for populating across different DBs.
            select: '-_id -__v',
        })
        .select('-__v -_id');

    console.log(usersSource);
})();
