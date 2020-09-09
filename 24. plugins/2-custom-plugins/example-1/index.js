const mongoose = require('mongoose');
const versioningPlugin = require('./versioning');
const { connection } = require('../../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            products: [String],
        });

        userSchema.plugin(versioningPlugin);

        const user = mongoose.model('customers', userSchema);

        try {
            const userBeforeUpdate = await user.create({
                name: 'John',
                products: ['Oranges'],
            });

            console.log(userBeforeUpdate);

            // await user.findOneAndUpdate(
            //     { name: 'John' },
            //     { $addToSet: { products: 'Kiwis' } },
            // );

            await user.findOneAndUpdate({ name: 'John' }, { name: 'Chuck' });

            const userAfterUpdate = await user.findOne({}, { _id: false });

            console.log('================================================');
            console.log(userAfterUpdate);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
