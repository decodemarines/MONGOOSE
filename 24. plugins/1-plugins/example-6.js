const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const { connection } = require('../common');

connection
    .then(async () => {
        const addressesSchema = new mongoose.Schema({
            city: String,
            street: String,
        });

        const userSchema = new mongoose.Schema({
            name: String,
            address: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'addresses',
                required: true,
                autopopulate: { select: '-_id -__v' },
            },
        });

        userSchema.plugin(autopopulate);

        const user = mongoose.model('customers', userSchema);
        const address = mongoose.model('addresses', addressesSchema);

        try {
            const addressData = await address.create({
                city: 'Kyiv',
                street: 'Lva Tolstogo',
            });
            const userData = await user.create({
                name: 'John',
                address: addressData._id,
            });

            // const data = await user.findOne(
            //     { name: 'John' },
            //     { _id: false, __v: false },
            //     { autopopulate: false },
            // );

            // not to use
            // const data = await user.findOne(
            //     { name: 'John' },
            //     { _id: false, __v: false, address: false },
            // );

            console.log(data);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
