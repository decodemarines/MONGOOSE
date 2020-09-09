const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            order: {
                type: mongoose.Types.ObjectId,
                ref: 'orders',
            },
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
            order: new mongoose.Types.ObjectId(), // герерируем идентификатор который ни к чему не привязан
        });

        const data = await user.findOne({ name: 'John Doe' }).populate('order');

        console.log(data); // null
        console.log(data.order); // null
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // new mongoose.Types.ObjectId() можно использовать для генерации например в тестах
    // нет связки через _id
    // {
    //     _id: 5f4a27ea54fc9815a076186d,
    //     name: 'John Doe',
    //     order: null,
    //     __v: 0
    //   }
    //   null