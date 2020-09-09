const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            orders: Array
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                orders: [
                    { product: 'Oranges', count: 3 },
                    { products: 'Kiwis', count: 3, price: 20 }
                ]
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
