const mongoose = require('mongoose');
const updateVersioningPlugin = require('mongoose-update-versioning');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            products: [String],
        });

        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create([
                {
                    name: 'John',
                    products: ['Oranges'],
                },
            ]);

            const dataBeforeUpdate = await user.findOne({});

            console.log(dataBeforeUpdate);

            dataBeforeUpdate.products.push('Kiwis');
            await dataBeforeUpdate.save();

            // dataBeforeUpdate.set('name', 'Chuck');
            // dataBeforeUpdate.increment(); ← increment __v
            // await dataBeforeUpdate.save();

            // await user.update(
            //     { name: 'John' },
            //     { $addToSet: { products: 'Kiwis' } },
            //     { upsert: false },
            // );

            const dataAfterUpdate = await user.findOne({});

            console.log('============================================');
            console.log(dataAfterUpdate);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
