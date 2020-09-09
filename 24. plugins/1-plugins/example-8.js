const mongoose = require('mongoose');
const leanVirtuals = require('mongoose-lean-virtuals');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: {
                    first: String,
                    last: String,
                },
            },
            { toObject: { virtuals: true }, id: false },
        );

        userSchema.virtual('fullName').get(function() {
            const {
                name: { first, last },
            } = this;
            return `${first} ${last}`;
        });

        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: {
                    first: 'John',
                    last: 'Doe',
                },
            });

            const data = await user
                .findOne({ 'name.first': 'John' }, { _id: false, __v: false })
                .lean();

            console.log('toObject' in data); // false
            console.log(data);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
