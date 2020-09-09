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
                    ref: 'Orders', //   const order = mongoose.model('orders', orderSchema);
                    // должно быть с большой  const order = mongoose.model('Orders', orderSchema);
                    // название модели и ссылка по имени должны совпадать иначе будет ошибка
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

        const orderData = await order.create({ product: 'Oranges' });
        const userData = await user.create({
            name: 'John Doe',
            userOrders: [orderData._id],
        });

        // MissingSchemaError: Schema hasn't been registered for model "Orders"
        const data = await user.findOne().populate('userOrders');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
