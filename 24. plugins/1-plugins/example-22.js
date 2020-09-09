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

            const dataBeforeUpdate = await user.findOne({});
            console.log(dataBeforeUpdate);

            dataBeforeUpdate.set('name', 'Chuck');
            dataBeforeUpdate.increment();
            await dataBeforeUpdate.save();

            const dataAfterUpdate = await user.findOne({}, { _id: false });

            console.log('============================================');
            console.log(dataAfterUpdate);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
