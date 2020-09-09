const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema(
            {
                name: String,
                favorites: String,
            },
            { toObject: { virtuals: true }, id: false },
        );

        userSchema.virtual('proposals', {
            // Find users where `localField`
            localField: 'favorites',
            // The model to use
            ref: 'products',
            // From orders collection field genus is equal to `foreignField`
            foreignField: 'genus',
            justOne: false,
        });

        // Order schema
        const productsSchema = new mongoose.Schema({
            product: String,
            genus: String,
        });

        // User model
        const user = mongoose.model('customers', userSchema);
        // Order model
        const product = mongoose.model('products', productsSchema);

        await product.create([
            {
                product: 'Orange',
                genus: 'citrus', // favorites: 'citrus'
            },
            {
                product: 'Lemon',
                genus: 'citrus', // favorites: 'citrus'
            },
            {
                product: 'Clementine',
                genus: 'something', // favorites: 'citrus'
            },
        ]);

        const userData = await user.create({
            name: 'John Doe',
            favorites: 'citrus',
        });

        const usersSource = await user
            .findOne()
            .populate('proposals', '-_id -__v')
            .select('-__v -_id -id');

        console.log(usersSource);
    })
    .catch(error => {
        console.error('Error:', error);
    });
