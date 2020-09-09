const mongoose = require('mongoose');
const hashPlugin = require('./addHash');
const { connection } = require('../../common');

mongoose.plugin(hashPlugin, { index: true });

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const productsSchema = new mongoose.Schema({
            product: String,
        });

        const user = mongoose.model('customers', userSchema);
        const product = mongoose.model('products', productsSchema);

        try {
            const userData = await user.create({
                name: 'John',
            });
            const productData = await product.create({
                product: 'Oranges',
            });

            console.log(userData);
            console.log('================================================');
            console.log(productData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
