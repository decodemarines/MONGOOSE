const mongoose = require('mongoose');
const updateVersioningPlugin = require('mongoose-update-versioning');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            products: [String],
        });

        userSchema.plugin(updateVersioningPlugin);

        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create([
                {
                    name: 'John',
                    products: ['Oranges'],
                },
            ]);

            const dataBeforeUpdate = await user
                .findOne({}, { _id: false })
                .lean();

            await user.findOneAndUpdate({ name: 'John' }, { __v: 123 });

            const dataAfterUpdate = await user
                .findOne({}, { _id: false })
                .lean();

            console.log(dataBeforeUpdate);
            console.log('============================================');
            console.log(dataAfterUpdate);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
