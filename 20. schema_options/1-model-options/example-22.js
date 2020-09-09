const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: {
                    type: String,
                    get: function(v) {
                        return v + ' is my name!';
                    },
                },
            },
            {
                toObject: {
                    getters: true,
                    transform(doc, ret, options) {
                        delete ret._id;
                        delete ret.__v;
                    },
                },
            },
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
        });

        const doc = await user.findOne({});

        console.log(doc);
        console.log(JSON.stringify(doc));
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
